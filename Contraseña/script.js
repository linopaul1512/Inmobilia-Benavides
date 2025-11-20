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
      // Verificar contraseña actual
      const verifyRes = await fetch(`http://localhost/apitest/controller/back.php?oper=verifyPassword&id=${id}&clave=${passwordActual}`, {
        method: "GET"
      });

      const verifyText = await verifyRes.text();
      console.log("Respuesta cruda de verificación:", verifyText);

      let verifyData;
      try {
        verifyData = JSON.parse(verifyText);
      } catch (err) {
        alert("El servidor devolvió algo inesperado al verificar la contraseña:\n" + verifyText);
        return;
      }

      if (verifyData.failure) {
        alert("La contraseña actual no coincide.");
        return;
      }

      // Actualizar contraseña
      const params = new URLSearchParams({ id, clave: nuevaPassword });
      const updateRes = await fetch(`http://localhost/apitest/controller/back.php?oper=updatePassword&${params.toString()}`, {
        method: "GET"
      });

      const updateText = await updateRes.text();
      console.log("Respuesta cruda de actualización:", updateText);

      let updateData;
      try {
        updateData = JSON.parse(updateText);
      } catch (err) {
        alert("El servidor devolvió algo inesperado al actualizar la contraseña:\n" + updateText);
        return;
      }

      if (updateData.code === "ok") {
        alert(updateData.message);
        form.reset();
      } else {
        alert("Error: " + updateData.message);
      }

    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      alert("Error al conectar con el servidor.");
    }
  });
});
