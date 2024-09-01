let api = "http://localhost:4000/api";

let profileimg = document.getElementById("profileimg");
let profileimglabel = document.getElementById("profileimglabel");

profileimglabel.src = "img/offer-1.png";
profileimg.onchange = () => {
  if (profileimg.files[0]) {
    profileimglabel.src = URL.createObjectURL(profileimg.files[0]);
  }
};

let fullName = document.getElementById("floating_fullname");
let username = document.getElementById("floating_username");
let email = document.getElementById("floating_email");
let number = document.getElementById("floating_phone");
let password = document.getElementById("floating_password");

let signup = async (e) => {
  e.preventDefault();
  if (profileimg.files[0] == null) {
    alert("Please select an image");
    return;
  }
  try {
    let formData = new FormData();
    formData.append("file", profileimg.files[0]);
    formData.append("name", fullName.value);
    formData.append("username", username.value);
    formData.append("email", email.value);
    formData.append("phone", number.value);
    formData.append("password", password.value);

    let response = await fetch(`${api}/auth/register`, {
      method: "POST",
      body: formData,
    });
    if (response.status == 200) {
      let data = await response.json();
      alert(data.message);
      window.open("login.html", "_self");
    } else if (response.status == 201) {
      let data = await response.json();
      alert(data.message);
    }else{
      console.log(response);
    }
  } catch (error) {
    console.log("Server Error:", error);
  }
};
