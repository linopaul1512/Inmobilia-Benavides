document.addEventListener("DOMContentLoaded", () => {
    loadCategories();
    loadPlaces();
    loadProperties();
});

// Evento del botón Filtrar
document.getElementById("btnFiltrar").addEventListener("click", () => {
    const categoria = document.getElementById("categoria").value;
    const lugar = document.getElementById("lugar").value;
    loadProperties(categoria, lugar);
});


// Cargar categorías
async function loadCategories() {
    const selectCategoria = document.getElementById("categoria");
    const apiUrl = "http://localhost/apitest/controller/back.php?oper=listCategories";

    try {
        const response = await fetch(apiUrl);
        const result = await response.json();

        if (!result || !Array.isArray(result.data)) return;

        result.data.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat.id;
            option.textContent = cat.nombre;
            selectCategoria.appendChild(option);
        });

    } catch (error) {
        console.error("Error al cargar categorías:", error);
    }
}


// Cargar lugares
async function loadPlaces() {
    const selectLugar = document.getElementById("lugar");
    const apiUrl = "http://localhost/apitest/controller/back.php?oper=listPlaces";

    try {
        const response = await fetch(apiUrl);
        const result = await response.json();

        if (!result || !Array.isArray(result.data)) return;

        result.data.forEach(place => {
            const option = document.createElement("option");
            option.value = place.id;
            option.textContent = place.nombre;
            selectLugar.appendChild(option);
        });

    } catch (error) {
        console.error("Error al cargar lugares:", error);
    }
}


// Cargar tods las propiedades
async function loadProperties(categoria = "", lugar = "") {
    let apiUrl = "http://localhost/apitest/controller/back.php?oper=listLocations";

    if (categoria) apiUrl += `&categoria=${categoria}`;
    if (lugar) apiUrl += `&lugar=${lugar}`;

    const propertyList = document.getElementById("listaPropiedades");

    try {
        const response = await fetch(apiUrl);
        const result = await response.json();

        if (!result || !Array.isArray(result.data)) {
            propertyList.innerHTML = "<p>Error al recibir propiedades.</p>";
            return;
        }

        propertyList.innerHTML = "";

        result.data.forEach(prop => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="${prop.imagen}" alt="Imagen">
                <div class="card-info">
                    <h3>${prop.nombre}</h3>
                    <p><strong>Precio:</strong> $${prop.precio}</p>
                    <p><strong>Lugar:</strong> ${prop.lugar || "No definido"}</p>
                    <p><strong>Categoría:</strong> ${prop.categoria || "No definido"}</p>
                </div>
            `;

            card.addEventListener("click", () => {
            window.location.href = `../Tramites/index.html?id=${prop.id}`;
            });

            propertyList.appendChild(card);
        });

    } catch (error) {
        console.error("Error:", error);
        propertyList.innerHTML = "<p>No se pudieron cargar las propiedades.</p>";
    }

    
}
