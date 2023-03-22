function loadUserModules(_className) {
    const moduleElements = document.querySelectorAll('.selectModule')
    const user = JSON.parse(localStorage.getItem('user'));
    moduleElements.forEach(moduleElement => {
        getUserModules(moduleElement, {userId: user.userId, className: _className});
    });
}

function getUserModules(selectElement, data) {

    postData('http://localhost:3000/api/modules/userModules', data)
    .then(modules => {
        if(!modules.error){
          selectElement.innerHTML = ""
          modules.forEach(module => {
            selectElement.insertAdjacentHTML(
                  'beforeend',
                  `<option value="${module.moduleName}" id="${module.moduleName}}">${module.moduleName}</option>`
                );
          });
        }else{
            selectElement.innerHTML = `<option value="">aucun module attribué</option>`; 
        }
      })
    .catch(() => alert('Cette page ne fonctionne pas !'))
}