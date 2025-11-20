document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const correo = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const mensaje = document.getElementById("mensaje");

  if (!correo || !password) {
    mensaje.innerHTML = `<p class="text-danger fw-semibold">Todos los campos son obligatorios.</p>`;
    return;
  }

  const data = {
    usuario: correo,
    clave: password,
  };

  jQuery.ajax({
    type: "POST",
    url: "http://localhost/apitest/controller/back.php?oper=login",
    data: data,
    dataType: "json",
    success: function (respuesta) {
      console.log("Respuesta backend:", respuesta);

      if (respuesta.status === "Activo") {
        mensaje.innerHTML = `<p class="text-success fw-semibold">Inicio de sesión exitoso. Redirigiendo...</p>`;
        
        const usuarioInfo = {
          id: respuesta.id,
          nombre: respuesta.nombre,
          apellido: respuesta.apellido,
          usuario: correo
        };

        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioInfo));

        setTimeout(() => {
          window.location.href = "../Catalogo/index.html";
        }, 1500);

      } else {
        mensaje.innerHTML = `<p class="text-danger fw-semibold">Credenciales inválidas.</p>`;
      }
    },
    error: function () {
      mensaje.innerHTML = `<p class="text-danger fw-semibold">Error al conectar con el servidor.</p>`;
    }
  });

});
