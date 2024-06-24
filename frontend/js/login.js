let api = "http://localhost:4000/api";

let login =document.getElementById("login")
let login_email = document.getElementById("login_email");
let login_password = document.getElementById("login_password");



login.addEventListener("click",async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`${api}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: login_email.value,
        password: login_password.value,
      })
    });
    if (response.status == 200) {
      const res = await response.json();
      if(localStorage.getItem("token")){
        alert("user already login")
      }else{
        alert(res.message);
        localStorage.setItem("token",res.token)
        window.open("index.html","_self")
      }
    }else if(response.status == 201){
      const res = await response.json();
      alert(res.message);
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log("Server Error: ", error);
  }
});
