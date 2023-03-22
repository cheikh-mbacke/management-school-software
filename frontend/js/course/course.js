//Gérer l'accès à cette page
handleAccess('public')
window.addEventListener('load', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const url = new URL(document.location);
  const searchParams = url.searchParams;
  const moduleName = searchParams.get('moduleName')
  const className = searchParams.get('className')
  const userId = searchParams.get('userId')

  const data = {
    moduleName: moduleName,
    className: className,
    userId: userId,
    role: user.role
  }
  
  if(moduleName && className && userId){
    getRessource(data)
  }else{
    document.querySelector('#coursePanel').innerHTML = `
      <h5 style="text-align: center; margin-top: 2em"><i>Aucune ressource trouvée !</i></h5>
    `
  }

 })
 
 function getRessource(data) {

   
    postData('http://localhost:3000/api/modules/getRessources', data)
    .then(ressources => {
        if(!ressources.error){
          console.log(ressources);
          insertCourseHTML(ressources)
        }else{
          document.querySelector('#coursePanel').innerHTML = `
            <h5 style="text-align: center; margin-top: 2em">
              <i>Aucune ressource trouvée !</i>
            </h5>`
        }
      })
      .catch(() => alert('Cette page ne fonctionne pas !'))

}

function insertCourseHTML(data) {

  const author = `${data[0]['firstName']} ${data[0]['lastName']}`
  const moduleName = data[0]['moduleName']
  const intitule = data[0]['intitule']
  const cms = data.filter(ressource => ressource.type === "CM")
  let cmHTML = ''
  if (cms.length == 0) {
    cmHTML = '<i>Aucun fichier<i/>'
  } else {
    cms.forEach(cm => {
      cmHTML += `<a href="${cm.path}" target="_blank">${cm.intitule}</a>`
    });
  }


  const exercises = data.filter(ressource => ressource.type === "exercise")
  let exerciseHTML = ''
  if (exercises.length == 0) {
    exerciseHTML = '<i>Aucun fichier<i/>'
  }else{
    exercises.forEach(exercise => {
      exerciseHTML += `<a href="${exercise.path}" target="_blank">${exercise.intitule}</a> `
    });
  }

  const homeworks = data.filter(ressource => ressource.type == "homework")
  let homeworkHTML = ''
  if (homeworks.length == 0) {
    homeworkHTML = '<i>Aucun fichier<i/>'
  } else {
    homeworks.forEach(homework => {
      homeworkHTML += `<a href="${homework.path}" target="_blank">${homework.intitule}</a>`
    });
  }


  document.querySelector('#coursePanel').insertAdjacentHTML(
    'afterbegin',
    `
    <div class="col-md-12 stats-info stats-last widget-shadow">
    <div class="stats-last-agile">
      <table class="table stats-table ">
        <tbody>
          <tr>
            <td>
              <h5 id="h5.-bootstrap-heading">
                Auteur
                <a class="anchorjs-link" href="#h5.-bootstrap-heading"><span class="anchorjs-icon"></span></a>
              </h5>
            </td>
            <td class="type-info">
              ${author}
            </td>
          </tr>
          <tr>
            <td>
              <h5 id="h5.-bootstrap-heading">
                Intitulé
                <a class="anchorjs-link" href="#h5.-bootstrap-heading"><span class="anchorjs-icon"></span></a>
              </h5>
            </td>
            <td class="type-info">
            ${intitule}
            </td>
          </tr>
          <tr>
            <td>
              <h5 id="h5.-bootstrap-heading">
                CM
                <a class="anchorjs-link" href="#h5.-bootstrap-heading"><span class="anchorjs-icon"></span></a>
              </h5>
            </td>
            <td class="type-info">
            ${cmHTML}
            </td>
          </tr>
          <tr>
            <td>
              <h5 id="h5.-bootstrap-heading">
                Exercies
                <a class="anchorjs-link" href="#h5.-bootstrap-heading"><span class="anchorjs-icon"></span></a>
              </h5>
            </td>
            <td class="type-info">
            ${exerciseHTML}
            </td>
          </tr>
          <tr>
            <td>
              <h5 id="h5.-bootstrap-heading">
                Devoirs
                <a class="anchorjs-link" href="#h5.-bootstrap-heading"><span class="anchorjs-icon"></span></a>
              </h5>
            </td>
            <td class="type-info">
            ${homeworkHTML}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
    `
  )
  
}