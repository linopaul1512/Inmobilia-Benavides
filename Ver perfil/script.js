// Función para obtener y mostrar el perfil
function showProfile() {

    var name = document.getElementById('name');
    var lastname = document.getElementById('lastname');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var ID = document.getElementById('dni'); 
    var birthdate = document.getElementById('birthdate'); 
    var adress = document.getElementById('adress');
    const perfilAPI = 'https://graco-api.onrender.com/perfil';
  

    fetch(perfilAPI, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('token'),
        },
    })
    .then(response => response.json())
    .then(info => async () => {
        if (info.success) {
  
            let user = info.data;
            
            // Mostrar la información en los campos
            name.value = user.nombre;
            lastname.value = user.apellido;
            ID.value = user.dni;
            birthdate.value = user.nacimiento;
            adress.value = user.direccion;
            email.value = user.mail;
           

        } else {
            // Mostrar mensaje de error
            alert(info.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Ejecutar la función showProfile al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    showProfile();
});

//modificar perfil
document.getElementById('showPerfil').addEventListener('submit', function(e) { 
  e.preventDefault();
  var name = document.getElementById('name').value;
  var lastname = document.getElementById('lastname').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var ID = document.getElementById('dni').value; 
  var birthdate = document.getElementById('birthdate').value; 
  var adress = document.getElementById('adress').value;

  const updateAPI = 'https://graco-api.onrender.com/perfil';

  // Validar que los campos no estén vacíos
  if (!name || !lastname || !email || !password || !ID || !birthdate || !adress) {
    alert('Por favor, complete todos los campos.');
    return;
  }
    var data = {
      nombre: name,
      apellido: lastname,
      mail: email,
      clave: password,
      dni: ID,
      nacimiento: birthdate,
      direccion: adress
    };
  
    fetch(updateAPI, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem('token'),
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Mostrar mensaje de éxito
        alert(data.message);

      } else {
        // Mostrar mensaje de error
        alert(data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });

});
