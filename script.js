window.addEventListener("load", function() {
   let formSubmitBtn = document.getElementById("formSubmit");
   
   formSubmitBtn.addEventListener('click',function(event) {
      // text & number validation
      const pilotName = document.getElementById('pilotName');
      const copilotName = document.getElementById('copilotName');
      const fuelLevel = document.getElementById('fuelLevel');
      const cargoMass = document.getElementById('cargoMass');
      const formSubmit = document.getElementById('formSubmit');
      const pilotStatus = document.getElementById('pilotStatus');
      const copilotStatus= document.getElementById('copilotStatus');
      const fuelStatus = document.getElementById('fuelStatus');
      const cargoStatus = document.getElementById('cargoStatus');
      const faultyItems = document.getElementById('faultyItems');
      const launchStatus = document.getElementById('launchStatus');
      const missionTarget = document.getElementById('missionTarget');

      function isNameValid() {
         let valid = /^[A-Za-z]+$/;
         if (copilotName.value.match(valid) && pilotName.value.match(valid)) {
            return true;
         } else {
            alert('Please enter a valid name (letters A-Z only)');
            event.preventDefault();
            return false;
         };
      };
      
      if (pilotName.value ==='' || copilotName.value==='' || fuelLevel.value==='' || cargoMass.value==='') {
         alert('All field are required!');
         event.preventDefault();
      } 
      if (isNaN(fuelLevel.value) || isNaN(cargoMass.value)) {
         alert('Please enter a valid number');
         event.preventDefault();
      } 
      isNameValid();
      
      // updating shuttle requirements
      pilotStatus.innerHTML = `Pilot: ${pilotName.value} `;
      copilotStatus.innerHTML = `Copilot: ${copilotName.value} `;
      if (Number(fuelLevel.value) < 10000) {
         console.log('fuel level', fuelLevel);
         faultyItems.style.visibility = 'visible';
         fuelStatus.innerHTML = `WARNING! Not enough fuel`;
         launchStatus.innerHTML = `Shuttle not ready for launch`;
         launchStatus.style.color = 'red';
         event.preventDefault();
      } if (Number(cargoMass.value) > 10000) {
         console.log('cargo mass', cargoMass)
         faultyItems.style.visibility = 'visible';
         cargoStatus.innerHTML = `WARNING! Cargo mass too high for launch`;
         launchStatus.innerHTML = `Shuttle not ready for launch`;
         launchStatus.style.color = 'red';
         event.preventDefault();
      } if (Number(fuelLevel.value) >= 10000 && Number(cargoMass.value) <= 10000) {
         console.log('last if check')
         faultyItems.style.visibility = 'visible';
         cargoStatus.innerHTML = `Cargo mass low enough for launch`;
         launchStatus.innerHTML = `Shuttle ready for launch`;
         launchStatus.style.color = 'green';
         event.preventDefault();
      }
   });  
   let json = [];
   fetch('https://handlers.education.launchcode.org/static/planets.json').then(function(response) {
      response.json().then(function(json) {
         missionTarget.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[2].name}</li>
            <li>Diameter: ${json[2].diameter}</li>
            <li>Star: ${json[2].star}</li>
            <li>Distance from Earth: ${json[2].distance}</li>
            <li>Number of Moons: ${json[2].moons}</li>
         </ol>
         <img src="${json[2].image}">`
      });
   });
});
