//Gérer l'accès à cette page
//handleAccess('manager')

window.addEventListener('load', () => {

    const user = JSON.parse(localStorage.getItem('user'))
    if(user.role !== 'student'){
        insertFiltreForm()
        loadClasses()
        //Gérer filte note
        const filtreMarkForm = document.querySelector('#filtreMarkForm');
        filtreMarkForm.addEventListener('submit', (e) => handleFiltreMarkForm(e));
    }
    if(user.role == 'manager'){
        document.querySelector('#filtreMarkForm').insertAdjacentHTML('afterbegin', `
        <div class="form-group">
            <br>
            <label class="col-sm-3 control-label col-lg-3" for="inputSuccess">Sélectionne un (e) enseignant (e)</label>
            <div class="col-lg-6">
            <select class="form-control input-sm m-bot15 selectTeacher" name="teacherId" id="selectTeacher"></select>
            </div>
        </div>
        `)
        loadTeachers()
    }

    if(user.role = 'student'){
        handleStudentMark()
    }
 })

 function handleFiltreMarkForm(event) {
    
    event.preventDefault();
    const formElements = event.target.elements

    const user = JSON.parse(localStorage.getItem('user'))
    let teacherId;
    if (user.role == 'manager') {
       teacherId = formElements.teacherId.value
    }else{
       teacherId = user.userId 
    }
    const data = {
        teacherId: teacherId,
        semestreValue: formElements.semestreValue.value,
        className: formElements.className.value,
    }

    postData('http://localhost:3000/api/grades/getTeacherStudentsGrades', data)
    .then(marks => {
      if(!marks.error){
        document.querySelector('.stats-last-agile').innerHTML = insertTeacherMarks(marks)
      }else{
        alert(marks.error);
      }
    })
    .catch(() => alert('Cette page ne fonctionne pas !'))
 }

 function insertTeacherMarks(marks){

    let trValue = ``
    let thead = ``
    let tbody = ``
    if(marks.length !== 0){
        thead = `
        <thead>
        <tr>
            <th>
            Nom
            </th>
            <th>
            Email
            </th>
            <th>
            Module
            </th>
            <th>
            Note finale
            </th>
            <th>
            Classe
            </th>
        </tr>
        </thead>
        `
        marks.forEach(mark => {
            trValue += `
            <tr>
                <td>
                ${mark.firstName} ${mark.lastName}
                </td>
                <td>
                ${mark.email}
                </td>
                <td>
                ${mark.moduleName}
                </td>
                <td>
                ${mark.value}
                </td>
                <td>
                ${mark.className}
                </td>
            </tr>
            `
        });
        tbody +=  trValue
    }else{
        tbody += `
        <tbody>
            <p style="text-align: center"><i>Aucune note...</i></p>
        </tbody>`  
    }

    return `
    <table class="table stats-table ">
        ${thead}
        ${tbody}
  </table>

    `
 }


 async function handleStudentMark() {
    

    const user = JSON.parse(localStorage.getItem('user'))

    const className = await loadStudentClass(user.userId);


    const data = {
        studentId: user.userId,
        className: className,
    }

    postData('http://localhost:3000/api/grades/getStudentGrades', data)
    .then(marks => {
      if(!marks.error){
        document.querySelector('.stats-last-agile').innerHTML = insertTeachersMarks(marks)
      }else{
        alert(marks.error);
      }
    })
    .catch(() => alert('Cette page ne fonctionne pas !'))
 }

 function insertTeachersMarks(marks) {
    let trValue = ``
    let thead = ``
    let tbody = ``
    if(marks.length !== 0){
        thead = `
        <thead>
        <tr>
            <th>
            Module
            </th>
            <th>
            Classe
            </th>
            <th>
            Semestre
            </th>
            <th>
            Note finale
            </th>
        </tr>
        </thead>
        `
        marks.forEach(mark => {
            trValue += `
            <tr>
                <td>
                ${mark.moduleName}
                </td>
                <td>
                ${mark.className}
                </td>
                <td>
                ${mark.semestrevalue}
                </td>
                <td>
                ${mark.value}
                </td>
            </tr>
            `
        });
        tbody +=  trValue
    }else{
        tbody += `
        <tbody>
            <p style="text-align: center"><i>Aucune note...</i></p>
        </tbody>`  
    }

    return `
    <table class="table stats-table ">
        ${thead}
        ${tbody}
    </table>

    ` 
 }

 function insertFiltreForm() {
    document.querySelector('.wrapper').insertAdjacentHTML('beforeend', `
    <div class="form-w3layouts">
    <div class="row">
      <div class="col-lg-12">
        <section class="panel">
          <header class="panel-heading">
            Filtre
          </header>
          <section class="panel">
            <div class="panel-body">
              <form class="form-horizontal bucket-form" id="filtreMarkForm">
                <div class="form-group">
                  <br>
                  <label class="col-sm-3 control-label col-lg-3">Sélectionne une classe</label>
                  <div class="col-lg-6">
                    <select class="form-control input-sm m-bot15 selectClass" name="className"></select>
                  </div>
                </div>
                <div class="form-group">
                  <br>
                  <label class="col-sm-3 control-label col-lg-3" for="inputSuccess">Sélectionne un semestre</label>
                  <div class="col-lg-6">
                    <select class="form-control input-sm m-bot15" name="semestreValue">
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-offset-3 col-lg-10">
                  <button type="submit" class="btn btn-success">Voir</button>
                </div>
                <div id="affectModuleFormMessage"></div>
              </form>
            </div>
          </section>
        </section>
      </div>
    </div>
  </div>
    `)
 }