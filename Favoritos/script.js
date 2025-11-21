document.addEventListener("DOMContentLoaded", loadFavorites);

async function loadFavorites() {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    const usuario = usuarioActivo?.id;

    if (!usuario) {
        alert("Debes iniciar sesión.");
        window.location.href = "../Login/index.html";
        return;
    }

    const propertyList = document.getElementById("property-list");
    propertyList.innerHTML = "<p>Cargando favoritos...</p>";

    try {
        const response = await fetch(
            `http://localhost/apitest/controller/back.php?oper=listFavorites&usuario=${usuario}`
        );

        const text = await response.text();  
        console.log("Respuesta de la API:", text);

        try {
            const data = JSON.parse(text);
            if (!Array.isArray(data) || data.length === 0) {
                propertyList.innerHTML = "<p>No tienes propiedades favoritas.</p>";
                return;
            }

            propertyList.innerHTML = "";
            data.forEach(fav => {
                const card = document.createElement("div");
                card.classList.add("propietyCard");

                card.innerHTML = `
                    <img src="${fav.imagen}" alt="Imagen propiedad">
                    <h3>${fav.nombre}</h3>
                    <p><strong>Precio:</strong> $${fav.precio}</p>
                    <p><strong>Status:</strong> ${fav.status}</p>
                    <span class="heart-icon" data-id="${fav.idLocacion}">
                      <img src="favorito.png" class="heart-img">
                    </span>
                `;

                propertyList.appendChild(card);
            });
            const heartIcons = document.querySelectorAll(".heart-icon");

            // eliminar favorito
            heartIcons.forEach(icon => {
                icon.addEventListener("click", async function() {
                    const id = icon.getAttribute("data-id");

                    const res = await fetch(`http://localhost/apitest/controller/back.php?oper=deleteFavorites&id=${id}&usuario=${usuario}`);
                    const result = await res.json();

                    alert(result.message);

                    const card = icon.closest(".propietyCard");
                    if (card) {
                        card.remove();
                    }
                });
            });
        } catch (jsonError) {
            console.error("Error al parsear JSON:", jsonError);
            propertyList.innerHTML = "<p>Respuesta de la API no válida. Verifica la URL y parámetros.</p>";
        }
    } catch (error) {
        console.error("Error cargando favoritos:", error);
        propertyList.innerHTML = "<p>Error al conectar con el servidor.</p>";
    }
}
