//Gérer l'accès à cette page
handleAccess('manager')
window.addEventListener('load', () => {

   //Charger les classes
    loadClasses()
    //Charger les enseignants
    loadTeachers()

    //Charger les enseignants
    loadModules()

    //Gérer ajout module
    const addModuleForm = document.querySelector('#addModuleForm');
    addModuleForm.addEventListener('submit', (e) => handleaddModuleForm(e));

    //Gérer suppression module
    const deleteModuleForm = document.querySelector('#deleteModuleForm');
    deleteModuleForm.addEventListener('submit', (e) => handledeleteModuleForm(e));

    //Gérer affecrarionmodule
    const affectModuleForm = document.querySelector('#affectModuleForm');
    affectModuleForm.addEventListener('submit', (e) => handleaffectModuleForm(e));
})


function handleaddModuleForm(event) {

    event.preventDefault();

    const formElements = event.target.elements
    const data = {
        moduleName: formElements.moduleName.value
    }

    postData('http://localhost:3000/api/modules/add', data)
    .then(addedModule => {
      if(!addedModule.error){
        document.querySelector("#addModuleFormMessage").insertAdjacentHTML(
          'beforeend',
          `<div style="text-align: center">
            <h5 style="color: green; margin-bottom: 1em">Vous avez ajouté un nouveau module !</h5>
            <p>Nom du module : <strong>${addedModule.moduleName}</strong></p>
          </div>
          `);
          //Charger les enseignants
        loadModules()
      setTimeout(() => {
          document.querySelector("#addModuleFormMessage").innerHTML = ""
      }, 2000)
      }else{
        document.querySelector("#addModuleFormMessage").insertAdjacentHTML(
          'beforeend',
          `<div style="text-align: center">
            <h5 style="color: red; margin-bottom: 1em">Echec de création module !</h5>
            <p>${addedModule.error}</p>
          </div>
          `);
          setTimeout(() => {
              document.querySelector("#addModuleFormMessage").innerHTML = ""
          }, 2000)
      }
    })
    .catch(() => alert('Cette page ne fonctionne pas !'))
}

function handledeleteModuleForm(event) {

  event.preventDefault();

  const formElements = event.target.elements
  const data = {moduleName: formElements.moduleName.value}


  postData('http://localhost:3000/api/modules/delete', data, 'DELETE')
  .then(deletedModule => {
    if(!deletedModule.error){
      document.querySelector("#deleteModuleFormMessage").insertAdjacentHTML(
        'beforeend',
        `<div style="text-align: center">
          <h5 style="color: green; margin-bottom: 1em">Vous avez supprimé un module !</h5>
          <p>Nom du module: <strong>${deletedModule.moduleName}</strong></p>
        </div>
        `);

        //Charger les enseignants
        loadModules()

        setTimeout(() => {
            document.querySelector("#deleteModuleFormMessage").innerHTML = ""
        }, 2000)
    }else{
      document.querySelector("#deleteModuleFormMessage").insertAdjacentHTML(
        'beforeend',
        `<div style="text-align: center">
          <h5 style="color: red; margin-bottom: 1em">Echec de suppression module !</h5>
          <p>${deletedModule.error}</p>
        </div>
        `);

        setTimeout(() => {
            document.querySelector("#deleteModuleFormMessage").innerHTML = ""
        }, 2000)
    }
  })
  .catch(() => alert('Cette page ne fonctionne pas !'))
}

function handleaffectModuleForm(event) {

  event.preventDefault();
  const formElements = event.target.elements
    const data = {
      className: formElements.className.value,
      moduleName: formElements.moduleName.value,
      userId: formElements.teacherId.value
  }

  postData(`http://localhost:3000/api/modules/affect`, data)
    .then(affectedModule => {
      if(!affectedModule.error){
        document.querySelector("#affectModuleFormMessage").insertAdjacentHTML(
          'beforeend',
          `<div style="text-align: center">
            <h5 style="color: green; margin-bottom: 1em">Affectation réussie !</h5>
          </div>
          `);
      setTimeout(() => {
          document.querySelector("#affectModuleFormMessage").innerHTML = ""
      }, 2000)
      }else{
        document.querySelector("#affectModuleFormMessage").insertAdjacentHTML(
          'beforeend',
          `<div style="text-align: center">
            <h5 style="color: red; margin-bottom: 1em">Echec d'affectation !</h5>
            <p>${affectedModule.error}</p>
          </div>
          `);
          setTimeout(() => {
              document.querySelector("#affectModuleFormMessage").innerHTML = ""
          }, 2000)
      }
    })
    .catch(() => alert('Cette page ne fonctionne pas !'))
}