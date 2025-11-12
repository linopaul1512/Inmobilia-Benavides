document.addEventListener("DOMContentLoaded", loadProperties);

async function loadProperties() {
  const apiUrl = "https://apigracosoft.infinityfreeapp.com/controller/back.php?oper=listLocations";
  const propertyList = document.getElementById("property-list");

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!Array.isArray(data)) {
      propertyList.innerHTML = `<p class="text-danger text-center">Error: no se recibieron propiedades válidas.</p>`;
      return;
    }

    propertyList.innerHTML = "";

    data.forEach((prop) => {
      const card = document.createElement("div");
      card.className = "col-md-4 col-sm-6";
      card.innerHTML = `
        <div class="property-card shadow-sm">
          <img src="${prop.imagen || './placeholder.jpg'}" alt="Propiedad">
          <div class="property-info text-center">
            <h5>${prop.lugar || 'Ubicación desconocida'}</h5>
            <p class="mb-1"><strong>Categoría:</strong> ${prop.categoria || 'N/A'}</p>
            <p class="mb-1"><strong>Precio:</strong> $${prop.precio || '0'}</p>
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