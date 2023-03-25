//Vérifier si l'utilisateur est connecté
//handleAccess('public')

function displayTimetable(userNomberOfWeek) {
    

    let nomberOfWeek;
    
    if(userNomberOfWeek !== undefined){
        nomberOfWeek = userNomberOfWeek
    }else{
        nomberOfWeek = getNomberOfWeek();
    }




    const currentYear = new Date().getFullYear();
    const mondayDate = getDateOfISOWeek(currentYear, nomberOfWeek)
    mondayDate.setDate(mondayDate.getDate() + 1)

    const currentWeek = getWeekDates(new Date(mondayDate))

    document.querySelector('.days').innerHTML = ""

    for (let prop in currentWeek) {

        postData('http://localhost:3000/api/timetable/getSlots', {date: currentWeek[prop]})
        .then(courses => {
            if(!courses.error){
               let events = getEvents(courses);
               document.querySelector('.days').insertAdjacentHTML('beforeend', `
               <div class="day">
               <div class="date">
                   <p class="date-day">
                   ${currentWeek[prop].split('-')[2]}/${currentWeek[prop].split('-')[1]}
                   </p>
               </div>
               <div class="events">
                 ${events}
               </div>
             </div>
               `)
            }
          })
          .catch(() => alert('Cette page ne fonctionne pas !'))
       
       }

}


function getEvents(courses) {

    let events = ''

    if (courses.length == 0) {
        return `
        <div class="event">
        <p style="text-align: center">
            Rien de prévu !
        </p>
        </div>`
    }

    const user = JSON.parse(localStorage.getItem('user'))
    courses.forEach(cours => {

        const xmark = `<span class="xmark" data-id="${cours.id}" onclick="handledelete(this)">x</span>`
        events += `
        <div class="event" data-id="${cours.id}" style="position: relative;background: ${cours.descColor}">
            ${user.role == "manager" ? xmark : ''}
            <p class="title">
                ${cours.moduleName} 
            </p>
            <p>
                ${cours.firstName} ${cours.lastName}
            </p>
            <p>
            ${cours.startHour}H${cours.startMinute} - ${cours.endHour}H${cours.endMinute} 
            </p>
            <p>
                ${cours.description} - ${cours.classroom}
            </p>
        </div>
        `
    })

    return events
    
}


window.addEventListener('load', () => {

    const user = JSON.parse(localStorage.getItem('user'))
    if (user.role == "manager") {
        insertAddSlotForm()
    }

    displayTimetable()
    loadClasses()
    loadTeachers()
    loadModules()
    document.querySelector('.date-title > p').textContent = new Date().getFullYear();
    document.querySelector('#addSlotForm').addEventListener('submit', (e) => handleaddSlotForm(e))

})


function handleaddSlotForm(event) {

    event.preventDefault();

    const formElements = event.target.elements
    const data = {
        moduleName: formElements.moduleName.value,
        className: formElements.className.value,
        classRoom: formElements.classRoom.value,
        teacherId: formElements.teacherId.value,
        date: formElements.slotDate.value,
        startHour: formElements.startHour.value,
        startMinute: formElements.startMinute.value,
        endHour: formElements.endHour.value,
        endMinute: formElements.endMinute.value,
        description: formElements.description.value,
        descColor: formElements.descColor.value,
    }

    postData('http://localhost:3000/api/timetable/add', data)
    .then(addedSlot => {
      if(!addedSlot.error){
        document.querySelector("#addSlotFormMessage").insertAdjacentHTML(
          'beforeend',
          `<div style="text-align: center">
            <h5 style="color: green; margin-bottom: 1em">Réservation réussie !</h5>
            <p><strong>${addedSlot.message}</strong></p>
          </div>
          `);
      setTimeout(() => {
          document.querySelector("#addSlotFormMessage").innerHTML = ""
          document.location.href = "index.html"
      }, 2000)
      }else{
        document.querySelector("#addSlotFormMessage").insertAdjacentHTML(
          'beforeend',
          `<div style="text-align: center">
            <h5 style="color: red; margin-bottom: 1em">Echec de réservation !</h5>
            <p>${addedSlot.error}</p>
          </div>
          `);
          setTimeout(() => {
              document.querySelector("#addSlotFormMessage").innerHTML = ""
          }, 2000)
      }
    })
    .catch(() => alert('Cette page ne fonctionne pas !'))
}

function handledelete(xmarkElt) {

    const data = {id: xmarkElt.dataset.id}

    postData('http://localhost:3000/api/timetable/delete', data, 'DELETE')
    .then(deletedSlot => {
      if(!deletedSlot.error){
        document.location.href = "index.html"
      }else{
        alert(deletedSlot.error)
      }
    })
    .catch(() => alert('Cette page ne fonctionne pas !'))
}

function insertAddSlotForm(){

    document.querySelector('.addSlotSection').innerHTML = `
    
    <div class="form-w3layouts">
    <div class="row">
      <div class="col-lg-12">
        <section class="panel">
          <header class="panel-heading">
            Réserver une palge
          </header>
          <section class="panel">
            <div class="panel-body">
              <form class="form-horizontal bucket-form" id="addSlotForm" name="addSlotForm">
                <div class="form-group">
                    <br>
                    <label class="col-sm-3 control-label col-lg-3" for="inputSuccess">Sélectionne un (e) enseignant (e)</label>
                    <div class="col-lg-6">
                        <select class="form-control input-sm m-bot15 selectTeacher" name="teacherId" id="selectTeacher"></select>
                    </div>
                </div>
                <div class="form-group">
                  <br>
                  <label class="col-sm-3 control-label col-lg-3">Sélectionne une classe</label>
                  <div class="col-lg-6">
                    <select class="form-control input-sm m-bot15 selectClass" name="className"></select>
                  </div>
                </div>
                <div class="form-group">
                    <br>
                    <label class="col-sm-3 control-label col-lg-3">Sélectionne une salle</label>
                    <div class="col-lg-6">
                      <select class="form-control input-sm m-bot15" name="classRoom">
                        <option value="A112">A112</option>
                        <option value="B80">B80</option>
                        <option value="C73">C73</option>
                      </select>
                    </div>
                  </div>
                <div class="form-group">
                    <br>
                    <label class="col-sm-3 control-label col-lg-3">Sélectionne un module</label>
                    <div class="col-lg-6">
                      <select class="form-control input-sm m-bot15 selectModule" name="moduleName"></select>
                    </div>
                </div>
                <div class="form-group">
                    <br>
                    <label class="col-sm-3 control-label col-lg-3">Date</label>
                    <div class="col-lg-6">
                      <input class="form-control input-sm m-bot15" name="slotDate" type="date" required>
                    </div>
                </div>
                <div class="form-group">
                    <br>
                    <label class="col-sm-3 control-label col-lg-3">Début (Heure)</label>
                    <div class="col-lg-6">
                      <input class="form-control input-sm m-bot15" name="startHour" type="number" min="7" min="20" required>
                    </div>
                </div>
                <div class="form-group">
                    <br>
                    <label class="col-sm-3 control-label col-lg-3">Début (Minute)</label>
                    <div class="col-lg-6">
                      <input class="form-control input-sm m-bot15" name="startMinute" type="number" min="0" min="59" required>
                    </div>
                </div>
                <div class="form-group">
                    <br>
                    <label class="col-sm-3 control-label col-lg-3">Fin (Heure)</label>
                    <div class="col-lg-6">
                      <input class="form-control input-sm m-bot15" name="endHour" type="number" min="7" min="20" required>
                    </div>
                </div>
                <div class="form-group">
                    <br>
                    <label class="col-sm-3 control-label col-lg-3">Fin (Minutes)</label>
                    <div class="col-lg-6">
                      <input class="form-control input-sm m-bot15" name="endMinute" type="number" min="0" min="59" required>
                    </div>
                </div>
                <div class="form-group">
                    <br>
                    <label class="col-sm-3 control-label col-lg-3">Description</label>
                    <div class="col-lg-6">
                      <select class="form-control input-sm m-bot15" name="description">
                        <option value="Cours">Cours</option>
                        <option value="Exercices">Exercice</option>
                        <option value="Devoir">Devoir</option>
                      </select>
                    </div>
                </div>
                <div class="form-group">
                    <br>
                    <label class="col-sm-3 control-label col-lg-3">Couleur descriptive</label>
                    <div class="col-lg-6">
                      <select class="form-control input-sm m-bot15" name="descColor">
                        <option value="##e2f8ff">Couleur - Cours</option>
                        <option value="#fafaa3">Couleur - Exercice</option>
                        <option value="#ffd6d1">Couleur - Devoir</option>
                      </select>
                    </div>
                </div>
                <div class="col-lg-offset-3 col-lg-10">
                  <button type="submit" class="btn btn-success">Ajouter</button>
                </div>
                <div id="addSlotFormMessage"></div>
              </form>
            </div>
          </section>
        </section>
      </div>
    </div>
</div>

    `
}
