handleAccess('manager')
window.addEventListener('load', () => {

  loadClasses()
  loadTeachers()

  const addClassForm = document.querySelector('#addClassForm');
  addClassForm.addEventListener('submit', (e) => handleaddClassForm(e));

  const deleteClassForm = document.querySelector('#deleteClassForm');
  deleteClassForm.addEventListener('submit', (e) => deleteClass(e))

  const affectClassForm = document.querySelector('#affectClassForm');
  affectClassForm.addEventListener('submit', (e) => handleAffectClassForm(e))
})


function handleAffectClassForm(event) {

    event.preventDefault();

    const data = {
      className: event.target.elements.className.value,
      userId: event.target.elements.teacherId.value,
    }
    
    postData(`http://localhost:3000/api/class/affect`, data)
      .then(affectedClass => {
        if(!affectedClass.error){
          document.querySelector("#affectClassFormMessage").insertAdjacentHTML(
            'beforeend',
            `<div style="text-align: center">
              <h5 style="color: green; margin-bottom: 1em">Affectation réussie !</h5>
            </div>
            `);
        setTimeout(() => {
            document.querySelector("#affectClassFormMessage").innerHTML = ""
        }, 2000)
        }else{
          document.querySelector("#affectClassFormMessage").insertAdjacentHTML(
            'beforeend',
            `<div style="text-align: center">
              <h5 style="color: red; margin-bottom: 1em">Echec d'affectation !</h5>
              <p>${affectedClass.error}</p>
            </div>
            `);

            setTimeout(() => {
                document.querySelector("#affectClassFormMessage").innerHTML = ""
            }, 2000)
        }
      })
      .catch(() => alert('Cette page ne fonctionne pas !'))
}


function handleaddClassForm(event) {

    event.preventDefault();

    const data = {
      className: event.target.elements.className.value
    }
    
    postData(`http://localhost:3000/api/class/add`, data)
      .then(addedClass => {
        if(!addedClass.error){
          document.querySelector("#addClassFormMessage").insertAdjacentHTML(
            'beforeend',
            `<div style="text-align: center">
              <h5 style="color: green; margin-bottom: 1em">Vous avez ajouté une nouvelle classer !</h5>
              <p>Nom de la classe : <strong>${addedClass.className}</strong></p>
            </div>
            `);
            loadClasses()
        setTimeout(() => {
            document.querySelector("#addClassFormMessage").innerHTML = ""
        }, 2000)
        }else{
          document.querySelector("#addClassFormMessage").insertAdjacentHTML(
            'beforeend',
            `<div style="text-align: center">
              <h5 style="color: red; margin-bottom: 1em">Echec de création classe !</h5>
              <p>${addedClass.error}</p>
            </div>
            `);

            setTimeout(() => {
                document.querySelector("#addClassFormMessage").innerHTML = ""
            }, 2000)
        }
      })
      .catch(() => alert('Cette page ne fonctionne pas !'))
}


function deleteClass(event) {

    event.preventDefault()

    const data = {
      className: event.target.elements.deleteClassForm.value
    }

    postData(`http://localhost:3000/api/class/delete`, data, 'DELETE')
      .then(deletedClass => {
        if(!deletedClass.error){
          document.querySelector("#deleteClassFormMessage").insertAdjacentHTML(
            'beforeend',
            `<div style="text-align: center">
              <h5 style="color: green; margin-bottom: 1em">Vous avez supprimé une classe !</h5>
              <p>Nom de la classe : <strong>${deletedClass.className}</strong></p>
            </div>
            `);
            loadClasses()
        setTimeout(() => {
            document.querySelector("#deleteClassFormMessage").innerHTML = ""
        }, 2000)
        }else{
          document.querySelector("#deleteClassFormMessage").insertAdjacentHTML(
            'beforeend',
            `<div style="text-align: center">
              <h5 style="color: red; margin-bottom: 1em">Echec de suppression classe !</h5>
              <p>${deleteClass.error}</p>
            </div>
            `);

            setTimeout(() => {
                document.querySelector("#deleteClassFormMessage").innerHTML = ""
            }, 2000)
        }
      })
      .catch(() => alert('Cette page ne fonctionne pas !'))
}
