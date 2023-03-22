function loadClasses() {
    
    const classElements = document.querySelectorAll('.selectClass')
    classElements.forEach(classElement => {
      getClasses(classElement);
    });
}

function getClasses(selectElement) {

  getData('http://localhost:3000/api/class/getClasses')
      .then(classes => {
        if(!classes.error){
          selectElement.innerHTML = ""
          classes.forEach(onClass => {
            selectElement.insertAdjacentHTML(
                  'beforeend',
                  `<option value="${onClass.name}" id="${onClass.name}">${onClass.name}</option>`
                );
          });
        }
      })
     .catch(() => alert('Cette page ne fonctionne pas !'))
  
}