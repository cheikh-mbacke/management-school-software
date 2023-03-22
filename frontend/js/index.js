//Vérifier si l'utilisateur est connecté
//handleAccess('public')

function displayTimetable(userNomberOfWeek) {
    

    let nomberOfWeek;
    
    if(userNomberOfWeek !== undefined){
        nomberOfWeek = userNomberOfWeek
    }else{
        nomberOfWeek = getNomberOfWeek();
    }

    const timetablebtn = document.querySelector('#timetablebtn')
    timetablebtn.dataset.weeknum = nomberOfWeek


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

    courses.forEach(cours => {

        events += `
        <div class="event" style="background: ${cours.descColor}">
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
                ${cours.description}
            </p>
        </div>
        `
    })

    return events
    
}


window.addEventListener('load', () => {

    displayTimetable()
    const timetablebtn = document.querySelector('#timetablebtn')
    timetablebtn.addEventListener('click', (e) => {
        const weekNum = Number(timetablebtn.dataset.weeknum) + 1
        displayTimetable(weekNum)

    })

    document.querySelector('#resetBtn').addEventListener('click', (e) => location.reload())

    document.querySelector('.date-title > p').textContent = new Date().getFullYear();

})




