function loadStudentClass(studentId) { 
    
    return new Promise((resolve, reject) => {

        postData('http://localhost:3000/api/class/studentClass', {userId: studentId})
        .then(data => {
        if(!data.error){
            resolve(data.className)
        }
        })
        .catch(() => alert('Cette page ne fonctionne pas !'))

    })
    
}
