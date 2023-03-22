function loadStudents() {
    const studentElements = document.querySelectorAll('.selectStudent')
    studentElements.forEach(studentElement => {
        getStudents(studentElement);
    });
}

function getStudents(selectElement) {
    getData('http://localhost:3000/api/users/students')
    .then(students => {
        if(!students.error){
          selectElement.innerHTML = ""
          students.forEach(student => {
            selectElement.insertAdjacentHTML(
                  'beforeend',
                  `<option value="${student.id}" id="${student.id}">${student.firstName} ${student.lastName} (${student.email}) </option>`
                );
          });
        }
      })
    .catch(() => alert('Cette page ne fonctionne pas !'))
}