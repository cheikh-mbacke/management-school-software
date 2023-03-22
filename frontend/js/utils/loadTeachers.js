function loadTeachers() {
    const teacherElements = document.querySelectorAll('.selectTeacher')
    teacherElements.forEach(teacherElement => {
        getTeachers(teacherElement);
    });
}

function getTeachers(selectElement) {

    getData('http://localhost:3000/api/users/teachers')
    .then(teachers => {
        if(!teachers.error){
          selectElement.innerHTML = ""
          teachers.forEach(teacher => {
            selectElement.insertAdjacentHTML(
                  'beforeend',
                  `<option value="${teacher.id}" id="${teacher.id}">${teacher.firstName} ${teacher.lastName}</option>`
                );
          });
        }else{
            selectElement.innerHTML = `<option value="">....</option>`
        }
      })
      .catch(() => alert('Cette page ne fonctionne pas !'))
}