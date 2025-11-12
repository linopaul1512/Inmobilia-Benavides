//Cambiar Contraseña
document.getElementById('updatePassword').addEventListener('submit', function (e) {
  e.preventDefault();

  // Obtener los valores de los campos
  var newpassword = document.getElementById('newpassword').value;
  var password = document.getElementById('password').value;

  // Validar que los campos no estén vacíos
  if (!newpassword || !password) {
    alert('Por favor, complete todos los campos.');
    return;
  }

  // Validar que la nueva contraseña sea diferente de la contraseña actual
  if (newpassword === password) {
    alert('La nueva contraseña no -- ser igual a la contraseña actual.');
    return;
  }

  // Realizar la solicitud para cambiar la contraseña
  const passwordAPI = 'https://graco-api.onrender.com/cambiarclave';

  var data = {
    claveAnterior: password,
    claveNueva: newpassword
  };

  fetch(passwordAPI, {
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
        console.log("Utilice una contraseña que no se ha usado");
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
