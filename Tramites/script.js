const btnAlquilar = document.getElementById("btnAlquilar"); 
const modal = document.getElementById("modalAlquilar");
const cerrar = document.getElementById("cerrarModal");

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        alert("No se encontró la propiedad.");
        return;
    }

    loadProperty(id);
});

// Modal
btnAlquilar.addEventListener("click", () => modal.style.display = "block");
cerrar.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => { 
    if(e.target == modal) modal.style.display = "none"; 
});

// Alquilar
document.getElementById("formAlquiler").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fecha = document.getElementById("fecha").value;
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    const usuario = usuarioActivo?.id;

    if (!usuario) {
        alert("Debes iniciar sesión para alquilar una propiedad.");
        return;
    }

    if (fecha) {
        const res = await fetch(`http://localhost/apitest/controller/back.php?oper=rent&usuario=${usuario}&idlocacion=${id}&fecha=${fecha}`);
        const result = await res.json();

        alert(result.message);
        if(result.code === "ok") modal.style.display = "none";
    }
});

// Cargar propiedad
async function loadProperty(id) {
    try {
        const response = await fetch(`http://localhost/apitest/controller/back.php?oper=getLocation&id=${id}`);
        const result = await response.json();

        if (!result || !Array.isArray(result) || !result[0]) {
            alert("Propiedad no encontrada.");
            return;
        }

        const p = result[0];

        console.log("STATUS DEVUELTO:", p.status, typeof p.status);

        document.getElementById("propiedadNombre").textContent = p.nombre;
        document.getElementById("propiedadPrecio").textContent = `$${p.precio} USD/mes`;
        document.getElementById("propiedadCategoria").textContent = p.categoria;
        document.getElementById("propiedadLugar").textContent = p.lugar;

        document.getElementById("propiedadStatus").textContent =
        (p.status == 1 || p.status == "1" || p.status.toUpperCase() === "DISPONIBLE")
            ? "Disponible"
            : "No disponible";

        document.getElementById("propiedadRecord").textContent = p.record;

        const images = [p.imagen, p.imagen1, p.imagen2, p.imagen3].filter(img => img);
        setupCarousel(images);

        // Verificar si ya es favorito
        const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
        if (usuarioActivo?.id) {
            checkIfFavorite(id, usuarioActivo.id).then(esFavorito => {
                if (esFavorito) {
                    btnFavorito.classList.add("favorito");
                    btnFavorito.textContent = "♥ En favoritos";
                }
            });
        }

    } catch (error) {
        console.error(error);
    }
}

// Configurar carrusel
function setupCarousel(images) {
    const container = document.querySelector(".slides-container");
    const dotsContainer = document.querySelector(".dots-container");
    container.innerHTML = "";
    dotsContainer.innerHTML = "";

    images.forEach((img, i) => {
        const slide = document.createElement("div");
        slide.classList.add("slide");
        if(i === 0) slide.classList.add("active");
        slide.innerHTML = `<img src="${img}" alt="Propiedad ${i+1}">`;
        container.appendChild(slide);

        const dot = document.createElement("span");
        dot.classList.add("dot");
        if(i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => showSlide(i));
        dotsContainer.appendChild(dot);
    });

    let current = 0;

    function showSlide(n) {
        const slides = container.querySelectorAll(".slide");
        const dots = dotsContainer.querySelectorAll(".dot");

        slides.forEach(s => s.classList.remove("active"));
        dots.forEach(d => d.classList.remove("active"));

        slides[n].classList.add("active");
        dots[n].classList.add("active");

        current = n;
    }

    document.querySelector(".prev").addEventListener("click", () => {
        let next = (current - 1 + images.length) % images.length;
        showSlide(next);
    });

    document.querySelector(".next").addEventListener("click", () => {
        let next = (current + 1) % images.length;
        showSlide(next);
    });
}

// Detectar si ya es favorito al cargar la propiedad
async function checkIfFavorite(id, usuario) {
    const res = await fetch(`http://localhost/apitest/controller/back.php?oper=listFavorites&usuario=${usuario}`);
    const favsText = await res.text();
    
    try {
        const favs = JSON.parse(favsText);
        return favs.some(f => f.idLocacion == id);
    } catch {
        return false;
    }
}

// Alternar favorito
async function toggleFavorite(id) {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    const usuario = usuarioActivo?.id;

    if (!usuario) {
        alert("Debes iniciar sesión.");
        return;
    }

    const esFavorito = btnFavorito.classList.contains("favorito");
    const oper = esFavorito ? "deleteFavorites" : "addFavorites";

    const url = `http://localhost/apitest/controller/back.php?oper=${oper}&usuario=${usuario}&id=${id}`;

    const res = await fetch(url);
    const texto = await res.text();
    const result = JSON.parse(texto);

    alert(result.message);

    // Cambiar estado visual
    btnFavorito.classList.toggle("favorito");
    btnFavorito.textContent = btnFavorito.classList.contains("favorito")
        ? "♥ En favoritos"
        : "♡ Añadir a favoritos";
}

btnFavorito.addEventListener("click", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    toggleFavorite(id);
});
