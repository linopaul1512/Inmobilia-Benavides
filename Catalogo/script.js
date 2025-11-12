const loader = document.getElementById('loader');
const loaderCatch = document.getElementById('loaderCatch');
let exit = document.getElementById('logo');
let propertyFilter=[];
let propertyDetails = document.getElementById("propertyDetails");
let propertyData = [];
let property;
let propertyList = document.getElementById("property-list");
let searchInput = document.getElementById("searchInput");

//Acceder a la API
async function fetchPropertyData() {
    try {
        const response = await fetch('https://graco-api.onrender.com/propiedad');
        const data = await response.json();
        console.log(response)
        return data;
    } catch (error) {
        console.log('Error:', error);
    }
}

//obtener las propiedades
async function getPropiety() {
    try {
      const response = await fetch('https://graco-api.onrender.com/propiedad', {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
  
      const data = await response.json();

      propertyData = data;
      propertyFilter=propertyData.data;
  
      return propertyData;
  
    } catch (error) {
      console.log('Error:', error);
    }
  }


  
  
  // Función cargar y mostrar
  async function loadPropiety() {
    const response = await getPropiety();
    propertyList.innerHTML = '';
  
    const propiedad = response.data;
  
    if (Array.isArray(propiedad)) {
      propiedad.forEach(property => {
        displaypropiety(property);
      });
    } else {
      console.log('La respuesta de la API no es array:', propiedad);
    }
  }


  





//mostrar los propiedades en la lista
function displaypropiety(property) {
  const propietyCard = document.createElement('div');
  propietyCard.classList.add('propietyCard');
  //
  if(property.estado == 1)
    {
      let date = new Date(property.antiguedad)
      let stri = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
      propietyCard.innerHTML = `
        <div class="propietyCardUnknown">
        <img src="${property.imagenes}" alt="${property.imagenes} Art">
        <p>precio: ${property.precio}</p>
        <p>habitaciones: ${property.habitaciones}</p>
        <p>antiguedad: ${stri}</p>
        </div>
        `;
        
    } 
  //

    
    propietyCard.addEventListener("click",() => {
      document.getElementById("modal").style.display = "block";

      let date = new Date(property.antiguedad)
      let stri = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
      let trainerModal = document.getElementById("modal-content");
      trainerModal.innerHTML = `
      <div class="propietyCardUnknown3">
      <img src="${property.imagenes}" alt="${property.imagenes} Art">
      <p>precio: ${property.precio}</p>
      <p>habitaciones: ${property.habitaciones}</p>
      <p>antiguedad: ${stri}</p>
      <p>metroscuadrados: ${property.metroscuadrados}</p>
      <p>estado: ${property.estado}</p>
      <p>tipo: ${property.tipo}</p>
      <p>baños: ${property.baños}</p>
      
      </div>
      `;
    });

  propertyList.appendChild(propietyCard);
}

//Funciones para controlar los tramites y las ventas
/*
function getPropertyIdFromURL() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const propertyId = urlParams.get('id');
  return propertyId;
}


// Obtener y cargar la información de una propiedad por ID
async function loadPropertyById(propertyId) {
  try {
    const propertyAPI = `https://graco-api.onrender.com/propiedadusuario/${propertyId}`;
  
    const response = await fetch(propertyAPI, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
    });

    const data = await response.json();

    if (data.success) {
      console.log('Propiedad cargada:', data.data);

      // Llamar a la función para mostrar la modal solo cuando se haga clic
      showPropertyModal(data.data);
    } else {
      // Mostrar mensaje de error
      console.error(data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Función para mostrar la ventana modal con la información de la propiedad
function showPropertyModal(property) {
  // Formatear la fecha
  let date = new Date(property.antiguedad);
  let formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

  // Llenar contenido modal
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `
  <div class="propietyCardUnknown3">
  <img src="${property.imagenes}" alt="${property.imagenes} Art">
  <p>precio: ${property.precio}</p>
  <p>habitaciones: ${property.habitaciones}</p>
  <p>antiguedad: ${formattedDate}</p>
  <p>metroscuadrados: ${property.metroscuadrados}</p>
  <p>estado: ${property.estado}</p>
  <p>tipo: ${property.tipo}</p>
  <p>baños: ${property.baños}</p>
</div>
  `;

  // Agregar manejadores de eventos a los botones
  const visitarBtn = document.getElementById("Visitar-Btn");
  const ComprarBtn = document.getElementById("tramite-Btn");

  visitarBtn.addEventListener("click", () => {
    visitProperty(property.id)
  });

  ComprarBtn.addEventListener("click", () => {
    window.location = './../Compra/index.html';
  });
}

// Realizar una petición para hacer una visita
async function visitProperty() {
  try {
    const response = await fetch('https://graco-api.onrender.com/visitar-propiedad', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      },
      body: JSON.stringify({
        "propiedad": 1
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert('Error al agendar visita a la propiedad');
      throw new Error(response.statusText);
    }

    alert('Propiedad agendada a visitar correctamente!!!');
    return data; 
  } catch (error) {
    console.error('Error:', error);
  }
}
*/

//Modal

let modal = document.getElementById("modal");

let trainerModal = document.getElementById("modal-content");


window.addEventListener("click", function(event) {
  if (event.target == modal) {
    // Cierra la ventana modal
    modal.style.display = "none";
  }
});



  // Evento cargar Pokémon al cargar la página
  window.addEventListener('DOMContentLoaded', loadPropiety);