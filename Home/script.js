const loader = document.getElementById('loader');
const loaderCatch = document.getElementById('loaderCatch');
let propertyFilter=[];
let propertyDetails = document.getElementById("propertyDetails");
let propertyData = [];
let property;
let propertyList = document.getElementById("property-list");


//Acceder a la API
async function fetchPropertyData() {
    try {
        const response = await fetch('https://graco-api.onrender.com/propiedad-principales');
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
      const response = await fetch('https://graco-api.onrender.com/propiedad-principales', {
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
        propietyCard.innerHTML = `
          <div class="propietyCardUnknown">
          <img src="${property.imagenes}" alt="${property.imagenes} Art">
          <p>precio: ${property.precio}</p>
          <p>metroscuadrados: ${property.metroscuadrados}</p>
          </div>
          `;
      } 
    //
    propertyList.appendChild(propietyCard);
  }


  // Evento cargar Pokémon al cargar la página
  window.addEventListener('DOMContentLoaded', loadPropiety);