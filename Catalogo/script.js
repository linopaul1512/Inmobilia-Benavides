document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("listaPropiedades");
  const btnFiltrar = document.getElementById("btnFiltrar");

  // Cargar propiedades desde la API
  async function cargarPropiedades() {
    try {
      const response = await fetch("https://apigracosoft.infinityfreeapp.com/controller/back.php?oper=listLocations");
      const data = await response.json();

      // Limpia la lista antes de insertar nuevas tarjetas
      lista.innerHTML = "";

      if (Array.isArray(data)) {
        data.forEach(p => {
          const card = document.createElement("div");
          card.classList.add("card");

          card.innerHTML = `
            <img src="${p.imagen || '../Home/imagenes/ejemplo.jpg'}" alt="Propiedad">
            <div class="card-info">
              <h3>${p.nombre || 'Propiedad disponible'}</h3>
              <p><strong>Precio:</strong> $${p.precio || 'Consultar'}</p>
              <p><strong>Categoría:</strong> ${p.categoria || 'N/A'}</p>
              <p><strong>Ubicación:</strong> ${p.ubicacion || 'N/A'}</p>
            </div>
          `;
          lista.appendChild(card);
        });
      } else {
        lista.innerHTML = "<p>No se encontraron propiedades.</p>";
      }

    } catch (error) {
      console.error("Error al cargar las propiedades:", error);
      lista.innerHTML = "<p>Error al cargar propiedades.</p>";
    }
  }

  btnFiltrar.addEventListener("click", () => {
    alert("Función de filtro pendiente de conexión a backend");
  });

  // Cargar propiedades al abrir la página
  cargarPropiedades();
});
