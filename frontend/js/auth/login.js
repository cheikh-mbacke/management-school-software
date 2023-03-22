
//Vérifier si l'utilisateur est connecté
window.addEventListener('load', () => {

  const logStatus = JSON.parse(localStorage.getItem('logStatus'));

  if (logStatus === null) {
    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', (e) => handleLoginSubmit(e));
  }else{
    window.location.href = "index.html"
  }

})


//
const handleLoginSubmit = (event) => {

  event.preventDefault();

  const email = event.target.elements.email;     
  const password = event.target.elements.password;

  const errorMessage = document.querySelector("#errorMessage")
  errorMessage.textContent = "";

  const message = validateLoginForm(email, password)
  if (message !== ""){
    console.log();
    errorMessage.textContent = message 
  }else{
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    }
   fetch('http://localhost:3000/api/auth/signin', options)
      .then((response) =>  response.json())
      .then(loginInfos => {
        if(!loginInfos.error){
          localStorage.setItem('logStatus', JSON.stringify(true));
          localStorage.setItem('user', JSON.stringify(loginInfos));
          document.location.href = "index.html"
        }else{
          errorMessage.textContent = loginInfos.error;
        }
      })
      .catch(error => console.log(error))
    }
  
}

function validateEmail(email) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}

function validateLoginForm(email, password) {

  let message = "";

  if (!validateEmail(email.value)) {
    message = "Saisissez une adresse email valide";
    email.focus(); 
  }else if(password.value === ""){
    message = "Entrer votre mot de passe";
    password.focus(); 
  }

  return message
  
}