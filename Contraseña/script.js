document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('updatePassword');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    const id = usuarioActivo?.id;

    if (!id) {
      alert("Debes iniciar sesión para cambiar tu contraseña.");
      return;
    }

    const passwordActual = document.getElementById('password').value.trim();
    const nuevaPassword = document.getElementById('newpassword').value.trim();

    if (!passwordActual || !nuevaPassword) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (passwordActual === nuevaPassword) {
      alert("La nueva contraseña no puede ser igual a la actual.");
      return;
    }

    try {
      const params = new URLSearchParams({ id, clave: nuevaPassword });

      const response = await fetch(
        `http://localhost/apitest/controller/back.php?oper=updatePassword&${params.toString()}`
      );

      const textResponse = await response.text();
      console.log("Respuesta cruda:", textResponse);

      let data;
      try {
        data = JSON.parse(textResponse);
      } catch (err) {
        alert("El servidor devolvió algo inesperado:\n" + textResponse);
        return;
      }

      if (data.code === "ok") {
        alert(data.message);
        form.reset();
      } else {
        alert("Error: " + data.message);
      }

    } catch (error) {
      console.error("Error al actualizar contraseña:", error);
      alert("Error al conectar con el servidor.");
    }
  });
});
