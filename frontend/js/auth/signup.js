//Gérer l'accès à cette page
handleAccess('manager')
window.addEventListener('load', () => {

  loadClasses()

  const signupForm = document.querySelector('#signup-form');
  signupForm.addEventListener('submit', (e) => signup(e));

})

const signup = (event) => {

  event.preventDefault();


  const password = strRandom({
    includeUpperCase: true,
    includeNumbers: true,
    length: 8,
    startsWithLowerCase: true
  });
       
  const elements = event.target.elements

    const data = {
      firstName: elements.firstName.value,
      lastName: elements.lastName.value,
      email: elements.email.value,
      date_of_birth: Date.parse(elements.date_of_birth.value),
      password: password,
      role: elements.role.value,
      className: elements.class.value,
    }

    postData('http://localhost:3000/api/auth/signup', data)
      .then(user => {
        if(!user.error){
          document.querySelector("#signupMessage").insertAdjacentHTML(
            'afterbegin',
            `<p>Utilisateur créé avec succès !</p>
            <ul>
              <li>E-mail : ${user.email}</li>
              <li>Mot de passe : ${user.password}</li>
            </ul>
            `);
        }else{
          document.querySelector("#signupMessage").innerHTML = `
          <p>
            Echec de création utilisateur <br><br>
            ${user.error}
          </p>`

          setTimeout(() => {
            document.querySelector("#signupMessage").innerHTML = ""
        }, 3000)
        }
      })
      .catch(() => alert("Cette page ne fonctionne pas !"))
    
  
}

function strRandom (o) {
  var a = 10,
      b = 'abcdefghijklmnopqrstuvwxyz',
      c = '',
      d = 0,
      e = ''+b;
  if (o) {
    if (o.startsWithLowerCase) {
      c = b[Math.floor(Math.random() * b.length)];
      d = 1;
    }
    if (o.length) {
      a = o.length;
    }
    if (o.includeUpperCase) {
      e += b.toUpperCase();
    }
    if (o.includeNumbers) {
      e += '1234567890';
    }
  }
  for (; d < a; d++) {
    c += e[Math.floor(Math.random() * e.length)];
  }
  return c;
}

