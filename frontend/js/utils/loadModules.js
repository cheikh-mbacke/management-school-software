function loadModules() {
    const moduleElements = document.querySelectorAll('.selectModule')
    moduleElements.forEach(moduleElement => {
        getModules(moduleElement);
    });
}

function getModules(selectElement) {

    getData('http://localhost:3000/api/modules/')
    .then(modules => {
        if(!modules.error){
          selectElement.innerHTML = ""
          modules.forEach(module => {
            selectElement.insertAdjacentHTML(
                  'beforeend',
                  `<option value="${module.name}" id="${module.name}">${module.name}</option>`
                );
          });
        }
      })
    .catch(() => alert('Cette page ne fonctionne pas !'))
}