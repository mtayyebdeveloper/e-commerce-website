

(()=>{
    let auth_container =document.querySelector(".auth-container");

    if(localStorage.getItem("token")){
        auth_container.innerHTML =`
        <a onclick="logout()" style="cursor:pointer" class="nav-item nav-link">Logout</a>
        `
    }else{
        auth_container.innerHTML =`
        <a href="login.html" class="nav-item nav-link">Login</a>
        <a href="signup.html" class="nav-item nav-link">Register</a>
        `
    }

    logout=()=>{
        localStorage.removeItem("token")
        window.open("login.html","_self")
    }

})()