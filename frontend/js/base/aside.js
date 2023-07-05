handleAccess('public')
function insertAside() {

    const user = JSON.parse(localStorage.getItem('user'));
    const publicAccess = `
    <li>
        <a class="active" href="index.html">
        <i class=" fa fa-calendar"></i>
            <span>Emploi du temps</span>
        </a>
    </li>
    <li class="sub-menu">
        <a class="active">
            <i class="fa fa-user"></i>
            <span>Profil</span>
        </a>
        <ul class="sub">
            <li><a href="view_profile.html">Voir mon profil</a></li>
            <li><a href="update_profile.html">Modifier mon profil</a></li>
        </ul>
    </li>
    <li class="sub-menu">
    <a href="view_marks.html" class="active">
        <i class="fa fa-area-chart"></i>
        <span>Notes</span>
    </a>
    </li>
    `
    let studentAndTecherAcces = ''
    if (user.role === 'student' || user.role === 'teacher') {
        studentAndTecherAcces =  `
        <li class="sub-menu">
            <a class="active">
                <i class="fa fa-book"></i>
                <span>Mes cours</span>
            </a>
            <ul class="sub" id="courses">
            </ul>
        </li>
        `
    }
    let teacherAcces = ''
    if (user.role === 'teacher') {
        teacherAcces += `
        <li>
            <a href="ressource.html" class="active">
                <i class=" fa fa-folder"></i>
                <span>Ajouter une ressource</span>
            </a>
        </li>
        `
    }
    let managerAcces = ''
    if (user.role === 'manager') {
        managerAcces =  `
        <li class="sub-menu">
            <a href="marks.html" class="active">
                <i class="fa fa-area-chart"></i>
                <span>Gérer les notes</span>
            </a>
        </li>
        <li class="sub-menu">
            <a href="registration.html" class="active">
                <i class="fa fa-user-plus"></i>
                <span>Créer un utilisateur</span>
            </a>
        </li>
        <li class="sub-menu">
        <a href="module.html" class="active">
            <i class="fa fa-gears"></i>
            <span>Gérer les modules</span>
        </a>
        </li>
        <li class="sub-menu">
        <a href="class.html" class="active">
            <i class="fa fa-gears"></i>
            <span>Gérer les classes</span>
        </a>
        </li>

        `
    }
    

    document.querySelector('#aside').insertAdjacentHTML('beforeend', `
    <div id="sidebar" class="nav-collapse">
    <div class="leftside-navigation">
        <ul class="sidebar-menu" id="nav-accordion">
        ${publicAccess}
        ${studentAndTecherAcces}
        ${teacherAcces}
        ${managerAcces}
        </ul>
    </div>
    </div>
    `)

}

insertAside()

window.addEventListener('load', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.role == 'student') {
        postData('http://localhost:3000/api/class/studentClass', {userId: user.userId})
        .then(myclass => {
            postData('http://localhost:3000/api/modules/studentModules', {className: myclass.className})
            .then(modules => {
                modules.forEach(module => {
                    document.querySelector('#courses').insertAdjacentHTML('beforeend', 
                    `<li>
                        <a href="course.html?moduleName=${module.moduleName}&userId=${module.userId}&className=${myclass.className}">
                         ${module.moduleName}
                        </a>
                    </li>`)
                });
            })
            .catch(error => alert('Cette page ne fonctionne pas !')) 
        })
        .catch(error => alert('Cette page ne fonctionne pas !')) 
    } else if (user.role == 'teacher'){
        postData('http://localhost:3000/api/modules/teacherModules', {userId: user.userId})
        .then(modules => {
            modules.forEach(module => {
                document.querySelector('#courses').insertAdjacentHTML('beforeend', 
                `<li>
                    <a href="course.html?moduleName=${module.moduleName}&userId=${module.userId}&className=${module.className}">
                     ${module.moduleName} (${module.className})
                    </a>
                </li>`)
            });
        })
        .catch(error => alert('Cette page ne fonctionne pas !')) 
    }
   
})

