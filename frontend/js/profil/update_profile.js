//Vérifier si l'utilisateur est connecté
handleAccess('public')
window.addEventListener('load', () => {


    const user = JSON.parse(localStorage.getItem('user'));
    document.querySelector('#firstName').value = user.firstName
    document.querySelector('#lastName').value = user.lastName
    document.querySelector('#email').value = user.email
    document.querySelector('#date_of_birth').value = user.date_of_birth

    const loginForm = document.querySelector('#update_profil_form');
    loginForm.addEventListener('submit', (e) => handleUpdateProfilSubmit(e, user.userId));
  
  })

function handleUpdateProfilSubmit(event, userId) {

    event.preventDefault();

    const elements = event.target.elements
    const data = {
        oldPassword: elements.oldPassword.value,
        newPassword: elements.newPassword.value,
        userId: userId
      }
    
    
    postData(`http://localhost:3000/api/users/updatePass`, data, 'PUT')
      .then(user => {
        document.querySelector("#updatePanel").innerHTML = ""
        if(!user.error){
          document.querySelector("#updatePanel").insertAdjacentHTML(
            'beforeend',
            `<div style="text-align: center">
              <h5 style="color: green">Profil mis à jour !</h5>
              <p>Voic votre nouveau mot de passe : <strong>${user.password}</strong></p>
            </div>
            `);
            setTimeout(() => {
              document.querySelector("#updatePanel").innerHTML = ""
          }, 5000)
        }else{
          document.querySelector("#updatePanel").insertAdjacentHTML(
            'beforeend',
            `<div style="text-align: center">
              <h5 style="color: red">Echec de la mise à jour !</h5>
              <p>${user.error}</p>
            </div>
            `);
            setTimeout(() => {
              document.querySelector("#updatePanel").innerHTML = ""
          }, 2000)
        }
      })
      .catch(() => alert('Cette page ne fonctionne pas !'))
}
