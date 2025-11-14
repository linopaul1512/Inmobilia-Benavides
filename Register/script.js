document.getElementById('RegistrationForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const lastname = document.getElementById('lastname').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const cedula = document.getElementById('cedula').value.trim();
  const birthdate = document.getElementById('birthdate').value;

/*
  // Validación de campos vacíos
  if (!name || !lastname || !email || !password || !cedula || !birthdate ) {
    alert('Por favor, complete todos los campos.');
    return;
  }

  // Validar edad mínima de 18 años
  const birth = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }


  if (age < 18) {
    alert('Debe ser mayor de 18 años para registrarse.');
    return;
  }
*/

  //email, clave, nombre, apellido, cedula, fecha_nac
  const data = {
    nombre: name,
    apellido: lastname,
    email: email,
    cedula: cedula,
    clave: password,
    fecha_nac: birthdate,
  };



  jQuery.ajax({
                type: "POST",
                url: "http://localhost/apitest/controller/back.php?oper=userRegister",
                data: $.parseJSON(data),
                dataType: "json",
                beforeSend: function(){
                    
                },success: function(respuesta) {
                    console.log('---->',respuesta);
                        
                },error:function(err) {
                        console.log(err)
                }
            });

          
  //const registerApi = 'http://localhost/apitest/controller/back.php?oper=userRegister';

  /*
  fetch(registerApi, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data
  })
  .then(response => response.json())
  .then(result => {
    if (result.success) {
      alert('Registro exitoso. Redirigiendo al inicio de sesión...');
      window.location.href = '../Login/index.html';
    } else {
      alert(result.message || 'Error al registrarse.');
    }
  })
  .catch(error => {
    console.error('Error en la solicitud:', error);
    alert('Hubo un problema al conectar con el servidor.');
  });
*/
});


