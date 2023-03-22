function loadUserClasses() {
    const user = JSON.parse(localStorage.getItem('user'));
    const classElements = document.querySelectorAll('.selectClass')
    classElements.forEach(classElement => {
      getUserClasses(classElement, {userId: user.userId});
    });
}

function getUserClasses(selectElement, data) {

  postData('http://localhost:3000/api/class/userClasses', data)
      .then(classes => {
        if(!classes.error){
          selectElement.innerHTML = ""
          classes.forEach(onClass => {
            selectElement.insertAdjacentHTML(
                  'beforeend',
                  `<option value="${onClass.className}" id="${onClass.className}">${onClass.className}</option>`
                );
          });
          selectElement.insertAdjacentHTML(
            'afterbegin',
            `<option value="" selected></option>`
          );
        }else{
            selectElement.innerHTML =`<option value="">aucun classe attribuée</option>`
        }
      })
     .catch(() => alert('Cette page ne fonctionne pas !'))
  
}