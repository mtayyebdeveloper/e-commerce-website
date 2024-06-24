const admin_url = window.location.pathname.includes("admin");
let storage = localStorage.getItem("token");
let api = "http://localhost:4000/api";

let container = document.getElementById("container");

let userImage = document.getElementById("user-image");
let userDataList = document.getElementById("userdata-list");
userImage.onclick = () => {
  if (userDataList.style.display == "block") {
    userDataList.style.display = "none";
  } else {
    userDataList.style.display = "block";
  }
};
let userName = document.getElementById("user-name");
let userEmail = document.getElementById("user-email");
let userLogout = document.getElementById("user-logout");
(async () => {
  // get user data..................
  try {
    const response = await fetch(`${api}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${storage ? storage : ""}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      if (admin_url) {
        if (storage) {
          if (data.user.isAdmin) {
            container.style.display = "block";
            userName.innerHTML = data.user.username;
            userImage.src = data.user.avatar.url;
            userEmail.innerHTML = data.user.email;
            userLogout.onclick = () => {
              localStorage.removeItem("token");
              window.open("index.html", "_self");
            };
          } else {
            window.open("index.html", "_self");
          }
        } else {
          window.open("index.html", "_self");
        }
      }
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log("Server Error: ", error);
  }
})();

// navbar open and close functions.................................
let navbar = document.getElementById("navbar");
let nav_openBtn = document.getElementById("nav-open");
let nav_closeBtn = document.getElementById("nav-close");

nav_closeBtn.onclick = () => {
  navbar.style.display = "none";
};
nav_openBtn.onclick = () => {
  if (navbar.style.display == "block") {
    navbar.style.display = "none";
  } else {
    navbar.style.display = "block";
  }
};

(async () => {
  let all_users = document.getElementById("all-users");
  let total_sales = document.getElementById("total-sales");
  let total_contacts = document.getElementById("total-contacts");
  let total_products = document.getElementById("total-products");
  let total_users = document.getElementById("total-users");
  let allSales = 0;

  // get sales products....................
  try {
    const response = await fetch(`${api}/admin/salesproducts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${storage ? storage : ""}`,
      },
    });
    if (response.status == 200) {
      const res = await response.json();
      res.data.map((data, index) => {
        allSales += data.quantity;
      });
      total_sales.innerHTML = allSales;
    } else if (response.status == 201) {
      let data = await response.json();
      console.log(data);
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log("Server Error: ", error);
  }

  // get all users..................................
  try {
    const response = await fetch(`${api}/admin/allusers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${storage ? storage : ""}`,
      },
    });
    if (response.status == 200) {
      const res = await response.json();
      total_users.innerHTML = res.data.length;
      res.data.map((data, index) => {
        return (all_users.innerHTML += `
            <tr
              class="bg-slate-900/75 border-b text-white" key={${index}}>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-graywhitespace-nowrap">
                ${data.username}
              </th>
              <td class="px-6 py-4">${data.email}</td>
              <td class="px-6 py-4">${data.phone}</td>
              <td class="px-6 py-4">${data.isAdmin.toString()}</td>
              <td class="px-6 py-4 hover:text-blue-800 cursor-pointer" onclick="getuserId('${
                data._id
              }')">Edit</td>
              <td class="px-6 py-4 hover:text-blue-800 cursor-pointer" onclick="deleteUser('${
                data._id
              }')">Delete</td>
              </tr>
            `);
      });
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log("Server Error: ", error);
  }

  // delete user..................................
  deleteUser = async (id) => {
    try {
      const response = await fetch(`${api}/admin/deleteuser/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${storage ? storage : ""}`,
        },
      });
      if (response.status == 200) {
        const res = await response.json();
        console.log(res.message);
        window.location.reload();
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log("Server Error: ", error);
    }
  };

  let userId;
  let update_user_form = document.getElementById("update-user-form");
  let close_form = document.getElementById("close-form");
  getuserId = async (id) => {
    userId = id;
    update_user_form.style.display = "flex";
  };

  close_form.onclick = () => {
    update_user_form.style.display = "none";
  };

  // update user................................
  let profileimg = document.getElementById("profileimg");
  let profileimglabel = document.getElementById("profileimglabel");

  profileimglabel.src = "img/cat-1.jpg";
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
  updateUser = async (event) => {
    event.preventDefault();

    const formdata = new FormData();
    formdata.append("file", profileimg.files[0]);
    formdata.append("name", fullName.value);
    formdata.append("username", username.value);
    formdata.append("email", email.value);
    formdata.append("phone", number.value);
    formdata.append("password", password.value);

    try {
      const response = await fetch(`${api}/admin/updateuser/${userId}`, {
        method: "PATCH",
        headers: {
          Authorization: `token ${storage ? storage : ""}`,
        },
        body:formdata,
      });
      if (response.status == 200) {
        const res = await response.json();
        alert(res.message)
        window.location.reload();
      } else if (response.status == 201) {
        const res = await response.json();
        alert(res.message)
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log("Server Error: ", error);
    }
  };
  // get all contacts..................................
  try {
    const response = await fetch(`${api}/admin/allcontacts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${storage ? storage : ""}`,
      },
    });
    if (response.status == 200) {
      const res = await response.json();
      total_contacts.innerHTML = res.data.length;
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log("Server Error: ", error);
  }

  // get all products..................................
  try {
    const response = await fetch(`${api}/admin/allproducts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${storage ? storage : ""}`,
      },
    });
    if (response.status == 200) {
      const res = await response.json();
      total_products.innerHTML = res.data.length;
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log("Server Error: ", error);
  }
})();
