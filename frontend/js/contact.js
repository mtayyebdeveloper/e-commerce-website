let api = "http://localhost:4000/api";
let storage = localStorage.getItem("token");

let sendMessageButton = document.getElementById("sendMessageButton");
sendMessageButton.onclick = async () => {
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let subject = document.getElementById("subject");
  let message = document.getElementById("message");

  if (!name || !email || !subject || !message) {
    alert("Please fill all the fields");
    return;
  }

  const data ={
    name: name.value,
    email: email.value,
    subject: subject.value,
    message: message.value
  }

  try {
    const response = await fetch(`${api}/contact/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${storage ? storage : ""}`,
      },
      body: JSON.stringify(data),
    });
    if (response.status == 200) {
      let data = await response.json();
      alert(data.message);
      window.open("index.html", "_self");
    } else if (response.status == 201) {
      let data = await response.json();
      alert(data.message);
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log("Server Error: ", error);
  }
};
