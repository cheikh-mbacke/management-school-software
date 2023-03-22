function handleAccess(role) {


    const logStatus = JSON.parse(localStorage.getItem('logStatus'));
    const user = JSON.parse(localStorage.getItem('user'));
    if (logStatus === null) {
        window.location.href = "login.html"
    }else if(role !== "public"){
        if(user.role !== role){
            window.location.href = "404.html"
        }
    }
    
}
