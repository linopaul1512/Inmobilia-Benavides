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
