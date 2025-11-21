document.addEventListener("DOMContentLoaded", async () => {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  const id = usuarioActivo?.id;

  if (!id) {
    document.getElementById("property-list").innerHTML = "<p>Debes iniciar sesión.</p>";
    return;
  }

  const propertyList = document.getElementById("property-list");
  propertyList.innerHTML = "<p>Cargando historial...</p>";

  try {
    const response = await fetch(`http://localhost/apitest/controller/back.php?oper=listHistorial&id=${id}`);
    const result = await response.json();

    if (!result.data || result.data.length === 0) {
      propertyList.innerHTML = "<p>No hay propiedades en tu historial.</p>";
      return;
    }

    propertyList.innerHTML = "";
    result.data.forEach(prop => {
      const card = document.createElement("div");
      card.classList.add("propietyCard");

      card.innerHTML = `
        <img src="${prop.imagen || './placeholder.jpg'}" alt="${prop.nombre}">
        <h3>${prop.nombre}</h3>
        <p><strong>Precio:</strong> $${prop.precio}</p>
        <p><strong>Lugar:</strong> ${prop.lugar}</p>
        <p><strong>Categoría:</strong> ${prop.categoria}</p>
        <p><strong>Estado:</strong> ${prop.status}</p>
        <p><strong>Fecha de alquiler:</strong> ${prop.fecha_alquiler}</p>
      `;

      propertyList.appendChild(card);
    });

  } catch (error) {
    console.error("Error cargando historial:", error);
    propertyList.innerHTML = "<p>Error al cargar las propiedades.</p>";
  }
});
