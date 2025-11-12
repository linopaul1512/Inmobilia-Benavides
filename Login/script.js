document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    const loginAPI = 'https://apigracosoft.infinityfreeapp.com/controller/back.php?oper=login';

    var data = {
      email: email,
      password: password
    };

    // Validar que los campos no estén vacíos
    if (!email || !password) {
      alert('Por favor, complete todos los campos.');
      return;
    }
  
    fetch(loginAPI, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Guardar el token en el almacenamiento local
        localStorage.setItem('token', data.data.token);
  
        // Redirigir a la página de Home
        window.location = './../Home/index.html';
      } else {
        // Mostrar mensaje de error
        alert(data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });