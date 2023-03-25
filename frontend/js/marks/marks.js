//Gérer l'accès à cette page
handleAccess('manager')

window.addEventListener('load', () => {

    //Charger les classes
     loadClasses()
 
     //Charger les enseignants
     loadModules()
 
     //Charger les étudiants
     loadStudents()

     loadTeachers()

     //Gérer ajout note
     const addMarkForm = document.querySelector('#addMarkForm');
     addMarkForm.addEventListener('submit', (e) => handleaddMarkForm(e));

     //Gérer suppression note
     const deleteMarkForm = document.querySelector('#deleteMarkForm');
     deleteMarkForm.addEventListener('submit', (e) => handledeleteMarkForm(e));
 })

 function handleaddMarkForm(event) {
    
    event.preventDefault();
    const formElements = event.target.elements

    const data = {
        markValue: formElements.markValue.value,
        studentId: formElements.studentId.value,
        teacherId: formElements.teacherId.value,
        semestreValue: formElements.semestreValue.value,
        moduleName: formElements.moduleName.value,
        className: formElements.className.value,
    }

    postData('http://localhost:3000/api/grades/add', data)
    .then(addedMark => {
      if(!addedMark.error){
        document.querySelector("#addMarkFormMessage").insertAdjacentHTML(
          'beforeend',
          `<div style="text-align: center">
            <h5 style="color: green; margin-bottom: 1em">Note ajoutée !</h5>
          </div>
          `);
        setTimeout(() => {
            document.querySelector("#addMarkFormMessage").innerHTML = ""
        }, 2000)
      }else{
        document.querySelector("#addMarkFormMessage").insertAdjacentHTML(
          'beforeend',
          `<div style="text-align: center">
            <h5 style="color: red; margin-bottom: 1em">Echec ajout note !</h5>
            <p>${addedMark.error}</p>
          </div>
          `);
          setTimeout(() => {
              document.querySelector("#addMarkFormMessage").innerHTML = ""
          }, 2000)
      }
    })
    .catch(() => alert('Cette page ne fonctionne pas !'))
 }

 function handledeleteMarkForm(event) {
    
  event.preventDefault();

  const user = JSON.parse(localStorage.getItem('user'));
  const formElements = event.target.elements

  const data = {
      markValue: formElements.markValue.value,
      studentId: formElements.studentId.value,
      teacherId: user.userId,
      semestreValue: formElements.semestreValue.value,
      moduleName: formElements.moduleName.value,
      className: formElements.className.value,
  }

  postData('http://localhost:3000/api/grades/delete', data, 'DELETE')
  .then(deleteMark => {
    console.log(deleteMark);
    if(!deleteMark.error){
      document.querySelector("#deleteMarkFormMessage").insertAdjacentHTML(
        'beforeend',
        `<div style="text-align: center">
          <h5 style="color: green; margin-bottom: 1em">Note supprimée !</h5>
        </div>
        `);
      setTimeout(() => {
          document.querySelector("#deleteMarkFormMessage").innerHTML = ""
      }, 2000)
    }else{
      document.querySelector("#deleteMarkFormMessage").insertAdjacentHTML(
        'beforeend',
        `<div style="text-align: center">
          <h5 style="color: red; margin-bottom: 1em">Echec suppression note !</h5>
          <p>${deleteMark.error}</p>
        </div>
        `);
        setTimeout(() => {
            document.querySelector("#deleteMarkFormMessage").innerHTML = ""
        }, 2000)
    }
  })
  .catch(() => alert('Cette page ne fonctionne pas !'))
}