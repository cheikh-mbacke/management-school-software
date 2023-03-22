//Vérifier si l'utilisateur est connecté
handleAccess('public')
window.addEventListener('load', () => {
	const user = JSON.parse(localStorage.getItem('user'));
	getData(`http://localhost:3000/api/users/students/${user.userId}`)
	.then(data => {
	  if(!data.error){
		 const word_matched = {
			 student: "étudiant",
			 teacher: "enseignant",
			 manager: "responsable formation"
		 }
		 data['role'] = word_matched[data['role']]
		 document.querySelector("#panel").insertAdjacentHTML(
			 'beforeend',
			 personal_informations(data)
		 );
	  }else{
		 document.querySelector("#panel").insertAdjacentHTML(
			 'beforeend',
			 '<p style="text-align: center">Aucune information trouvée ...</p>'
		 );
	  }
	})
	.catch(error => alert('Cette page ne fonctionne pas !'))
})



function personal_informations(data) {
    return `
    <div class="panel-body">
	<div class="col-md-12 stats-info stats-last widget-shadow">
		<div class="stats-last-agile">
			<table class="table stats-table ">
				<tbody>
					<tr>
						<td>
							<h5 id="h5.-bootstrap-heading">
								Prénom
								<a class="anchorjs-link" href="#h5.-bootstrap-heading"><span class="anchorjs-icon"></span></a>
							</h5>
						</td>
						<td class="type-info">
                            ${data.firstName}
						</td>
					</tr>
					<tr>
						<td>
							<h5 id="h5.-bootstrap-heading">
								Nom
								<a class="anchorjs-link" href="#h5.-bootstrap-heading"><span class="anchorjs-icon"></span></a>
							</h5>
						</td>
						<td class="type-info">
                            ${data.lastName}
						</td>
					</tr>
					<tr>
						<td>
							<h5 id="h5.-bootstrap-heading">
								Email
								<a class="anchorjs-link" href="#h5.-bootstrap-heading"><span class="anchorjs-icon"></span></a>
							</h5>
						</td>
						<td class="type-info">
                            ${data.email}
						</td>
					</tr>
					<tr>
						<td>
							<h5 id="h5.-bootstrap-heading">
								date de naissance
								<a class="anchorjs-link" href="#h5.-bootstrap-heading"><span class="anchorjs-icon"></span></a>
							</h5>
						</td>
						<td class="type-info">
                            ${data.date_of_birth}
						</td>
					</tr>
					<tr>
						<td>
							<h5 id="h5.-bootstrap-heading">
								Date inscription
								<a class="anchorjs-link" href="#h5.-bootstrap-heading"><span class="anchorjs-icon"></span></a>
							</h5>
						</td>
						<td class="type-info">
                            ${data.date_of_registration}
						</td>
					</tr>
					<tr>
						<td>
							<h5 id="h5.-bootstrap-heading">
								Status
								<a class="anchorjs-link" href="#h5.-bootstrap-heading"><span class="anchorjs-icon"></span></a>
							</h5>
						</td>
						<td class="type-info">
                            ${data.role}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
    `
}