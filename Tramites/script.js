const btnAlquilar = document.getElementById("btnAlquilar");
const modal = document.getElementById("modalAlquilar");
const cerrar = document.getElementById("cerrarModal");

// Mostrar modal
btnAlquilar.addEventListener("click", () => {
  modal.style.display = "block";
});

// Cerrar modal
cerrar.addEventListener("click", () => {
  modal.style.display = "none";
});

// Cerrar haciendo clic fuera del modal
window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});

// Formulario
document.getElementById("formAlquiler").addEventListener("submit", (e) => {
  e.preventDefault();
  const fecha = document.getElementById("fecha").value;
  if (fecha) {
    alert(`Alquiler reservado para la fecha: ${fecha}`);
    modal.style.display = "none";
  }
});
