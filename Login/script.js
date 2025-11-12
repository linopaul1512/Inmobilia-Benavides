document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const mensaje = document.getElementById("mensaje");

  if (!email || !password) {
    mensaje.innerHTML = `<p class="text-danger fw-semibold">Todos los campos son obligatorios.</p>`;
    return;
  }

  // Simulación de autenticación local
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioEncontrado = usuarios.find(
    (u) => u.correo === email && u.contrasena === password
  );

  if (usuarioEncontrado) {
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
    mensaje.innerHTML = `<p class="text-success fw-semibold">Inicio de sesión exitoso. Redirigiendo...</p>`;

    setTimeout(() => {
      window.location.href = "../Home/index.html"; 
    }, 1500);
  } else {
    mensaje.innerHTML = `<p class="text-danger fw-semibold">Correo o contraseña incorrectos.</p>`;
  }
});
