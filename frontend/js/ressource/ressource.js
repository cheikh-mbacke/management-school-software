//Gérer l'accès à cette page
handleAccess('teacher')
window.addEventListener('load', () => {
    //Charger les classes
     loadUserClasses()
     //Charger les enseignants
     document.querySelector('#courseSelectClass').addEventListener('change', (e) => {
        if (e.target.value !== "") {
        //Charger les modules correspondants à une classe
        loadUserModules(e.target.value)
        }

        document.querySelector('.selectModule').innerHTML = `<option value="">aucun module attribué</option>`
     })
 
     //Gérer ajout ressource
     const addRessourceForm = document.querySelector('#addRessourceForm');
     addRessourceForm.addEventListener('submit', (e) => handleaddRessourceForm(e));
 })
 
 function handleaddRessourceForm(event) {

    event.preventDefault();

    const formElements = event.target.elements
    const user = JSON.parse(localStorage.getItem('user'));
    const data = new FormData()
    data.append('moduleName', formElements.moduleName.value)
    data.append('className', formElements.className.value)
    data.append('type', formElements.type.value)
    data.append('intitule', formElements.intitule.value)
    data.append('file', formElements.ressource.files[0])
    data.append('userId', user.userId)
   
    fetch('http://localhost:3000/api/modules/addRessource', {
      method: 'POST',
      body: data
    })
    .then(ressource => {
        if(!ressource.error){
          document.querySelector("#addRessourceFormMessage").insertAdjacentHTML(
            'beforeend',
            `<div style="text-align: center">
              <h5 style="color: green; margin-bottom: 1em">Vous avez ajouté une nouvelle ressource</h5>
            </div>
            `);
        setTimeout(() => {
            document.querySelector("#addRessourceFormMessage").innerHTML = ""
        }, 2000)
        }else{
          document.querySelector("#addRessourceFormMessage").insertAdjacentHTML(
            'beforeend',
            `<div style="text-align: center">
              <h5 style="color: red; margin-bottom: 1em">Echec d'ajout ressource !</h5>
              <p>${ressource.error}</p>
            </div>
            `);
            setTimeout(() => {
                document.querySelector("#addRessourceFormMessage").innerHTML = ""
            }, 2000)
        }
      })
      .catch(() => alert('Cette page ne fonctionne pas !'))
}