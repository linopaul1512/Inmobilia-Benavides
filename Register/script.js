document.getElementById('RegistrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    var name = document.getElementById('name').value;
    var lastname = document.getElementById('lastname').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var ID = document.getElementById('ID').value; 
    var birthdate = document.getElementById('birthdate').value; 
    var adress = document.getElementById('adress').value;

    const registerApi = '//apigracosoft.infinityfreeapp.com/controller/back.php?oper=userRegister';

    var data = {
        nombre: name,
        apellido: lastname,
        mail: email,
        clave: password,
        dni: ID,
        nacimiento: birthdate,
        direccion: adress
    };

      // Validar que los campos no estén vacíos
    if (!name || !lastname || !email || !password || !ID || !birthdate || !adress) {
      alert('Por favor, complete todos los campos.');
      return;
  }

    fetch(registerApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json()) 
    .then(data => {
      if (data.success) {  
        
        // Mostrar mensaje de éxito
        alert(data.message);
  
        // Redirigir a la página de inicio de sesión
        window.location = './../Login/index.html';
      } else {
        // Mostrar mensaje de error
        alert(data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });