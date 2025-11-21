document.addEventListener("DOMContentLoaded", loadProperties);

async function loadProperties() {
  const apiUrl = "http://localhost/apitest/controller/back.php?oper=listLocations";
  const propertyList = document.getElementById("property-list");

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (!result || !Array.isArray(result.data)) {
      propertyList.innerHTML = `<p class="text-danger text-center">Error al recibir propiedades.</p>`;
      return;
    }

    const data = result.data;
    propertyList.innerHTML = "";

    data.forEach((prop) => {
      const card = document.createElement("div");
      card.className = "col-md-4 col-sm-6";

      card.innerHTML = `
        <div class="property-card shadow-sm">
          <img src="${prop.imagen || './placeholder.jpg'}" alt="Propiedad">
          <div class="property-info text-center">
            <h5>${prop.nombre || 'Sin nombre'}</h5>
            <p class="mb-1"><strong>Precio:</strong> $${prop.precio || '0'}</p>
            <p class="mb-1">
              <strong>Estado:</strong> 
              <span class="${prop.status === 'Activo' ? 'text-success' : 'text-danger'}">
                ${prop.status}
              </span>
            </p>
          </div>
        </div>
      `;

      propertyList.appendChild(card);
    });

  } catch (error) {
    console.error("Error al cargar las propiedades:", error);
    propertyList.innerHTML = `<p class="text-danger text-center">No se pudieron cargar las propiedades.</p>`;
  }
}



document.addEventListener("DOMContentLoaded", () => {
  actualizarNavbar();

  loadProperties();
});

function actualizarNavbar() {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  const navbarUl = document.querySelector(".navbar-nav");

  if (!navbarUl) return;

  navbarUl.innerHTML = `<li class="nav-item"><a class="nav-link" href="./../Catalogo/index.html">Ver todo</a></li>`;

  if (usuarioActivo && usuarioActivo.id) {
    const perfilLi = document.createElement("li");
    perfilLi.classList.add("nav-item");
    perfilLi.innerHTML = `<a class="nav-link" href="./../Ver perfil/index.html">Ver perfil</a>`;

    const cerrarLi = document.createElement("li");
    cerrarLi.classList.add("nav-item");
    cerrarLi.innerHTML = `<a class="nav-link" href="#" id="logoutBtn">Cerrar sesión</a>`;

    navbarUl.appendChild(perfilLi);
    navbarUl.appendChild(cerrarLi);

    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("usuarioActivo");
      location.reload();
    });

  } else {
    const loginLi = document.createElement("li");
    loginLi.classList.add("nav-item");
    loginLi.innerHTML = `<a class="nav-link" href="./../Login/index.html">Iniciar sesión</a>`;

    const registerLi = document.createElement("li");
    registerLi.classList.add("nav-item");
    registerLi.innerHTML = `<a class="btn btn-primary text-white px-3" href="./../Register/index.html">Registrarse</a>`;

    navbarUl.appendChild(loginLi);
    navbarUl.appendChild(registerLi);
  }
}
