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
  let all_products = document.getElementById("all-products");
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
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log("Server Error: ", error);
  }

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
      res.data.map((data, index) => {
        return (all_products.innerHTML += `
        <tr
          class="bg-slate-900/75 border-b text-white" key={${index}}>
          <td class="px-6 py-4">
          <img src="${data.image[0]}" class="w-10 h-10 rounded-full" alt="product image"/>
          </td>
          <th
            scope="row"
            class="px-6 py-4 font-medium text-graywhitespace-nowrap">
            ${data.name}
          </th>
          <td class="px-6 py-4">${data.price}</td>
          <td class="px-6 py-4">${data.category}</td>
          <td class="px-6 py-4 hover:text-blue-800 cursor-pointer" onclick="editProduct('${data._id}')">Edit</td>
          <td class="px-6 py-4 hover:text-blue-800 cursor-pointer" onclick="deleteProduct('${data._id}')">Delete</td>
          </tr>
        `);
      });
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log("Server Error: ", error);
  }

  // delete product..................................
  deleteProduct = async (id) => {
    try {
      const response = await fetch(`${api}/admin/deleteproduct/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${storage ? storage : ""}`,
        },
      });
      if (response.status == 200) {
        const res = await response.json();
        alert(res.message);
        window.location.reload();
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log("Server Error: ", error);
    }
  };

  // create product..................................
  let product_form_open = document.getElementById("open-product-form");
  let createProduct_form = document.getElementById("createProduct-form");
  let close_form = document.getElementById("close-form");

  product_form_open.onclick = () => {
    createProduct_form.style.display = "flex";
  };

  close_form.onclick = () => {
    createProduct_form.style.display = "none";
  };

  let images = document.getElementById("products-images");
  let name = document.getElementById("name");
  let total_price = document.getElementById("total_price");
  let category = document.getElementById("category");
  let discount_price = document.getElementById("discount_price");
  let short_description = document.getElementById("short_description");
  let long_description = document.getElementById("long_description");

  let images_ary = [];
  images.onchange = () => {
    if (images_ary.length <= 4) {
      Array.from(images.files).forEach((file) => {
        if (images_ary.length < 5) {
          images_ary.push(file);
        }
      });
    } else {
      alert(`Image Array is full ${images_ary.length}`);
    }
  };

  createProduct = async (event) => {
    event.preventDefault();
    let color_ary = [];
    let size_ary = [];
    let color = document.querySelectorAll("input[name=color]:checked");
    let size = document.querySelectorAll("input[name=size]:checked");
    color.forEach((data, index) => {
      color_ary.push(data.value);
    });
    size.forEach((data, index) => {
      size_ary.push(data.value);
    });

    let formdata = new FormData();
    formdata.append("name", name.value);
    formdata.append("price", total_price.value);
    formdata.append("category", category.value);
    formdata.append("discount_price", discount_price.value);
    formdata.append("shortDescription", short_description.value);
    formdata.append("longDescription", long_description.value);
    color_ary.forEach((data, index) => {
      formdata.append("color", data);
    });
    size_ary.forEach((data, index) => {
      formdata.append("size", data);
    });
    images_ary.forEach((image, index) => {
      formdata.append("file", image);
    });
    try {
      const response = await fetch(`${api}/admin/createproduct`, {
        method: "POST",
        headers: {
          Authorization: `token ${storage ? storage : ""}`,
        },
        body: formdata,
      });
      if (response.status == 200) {
        const res = await response.json();
        alert(res.message);
        window.location.reload();
      } else if (response.status == 201) {
        const res = await response.json();
        alert(res.message);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log("Server Error: ", error);
    }
  };

  // update product..................................

  let updateProduct_form = document.getElementById("updateProduct-form");
  let close_update_form = document.getElementById("close-update-form");
  close_update_form.onclick = () => {
    updateProduct_form.style.display = "none";
  };

  let update_products_images = document.getElementById(
    "update-products-images"
  );
  let update_name = document.getElementById("update_name");
  let update_total_price = document.getElementById("update_total_price");
  let update_category = document.getElementById("update_category");
  let update_discount_price = document.getElementById("update_discount_price");
  let update_short_description = document.getElementById(
    "update_short_description"
  );
  let update_long_description = document.getElementById(
    "update_long_description"
  );

  let product_id;
  editProduct = async (id) => {
    product_id = id;
    updateProduct_form.style.display = "flex";
    try {
      const response = await fetch(`${api}/product/product/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${storage ? storage : ""}`,
        }
      });
      if(response.ok){
        let data =await response.json()
        update_discount_price.value =data.product.discount_price;
        update_long_description.value =data.product.longDescription;
        update_name.value =data.product.name;
        update_short_description.value =data.product.shortDescription;
        update_total_price.value =data.product.price        
      }else{
        console.log(response);
      }
    } catch (error) {
      console.log(("error", error));
    }
  };
  let update_images_ary = [];
  update_products_images.onchange = () => {
    if (update_images_ary.length <= 4) {
      Array.from(update_products_images.files).forEach((file) => {
        if (update_images_ary.length < 5) {
          update_images_ary.push(file);
        }
      });
    } else {
      alert(`Image Array is full ${update_images_ary.length}`);
    }
  };

  updateProduct = async (event) => {
    event.preventDefault();
    let color_ary = [];
    let size_ary = [];
    let color = document.querySelectorAll("input[name=color]:checked");
    let size = document.querySelectorAll("input[name=size]:checked");
    color.forEach((data, index) => {
      color_ary.push(data.value);
    });
    size.forEach((data, index) => {
      size_ary.push(data.value);
    });

    const formdata = new FormData();
    formdata.append("name", update_name.value);
    formdata.append("price", update_total_price.value);
    formdata.append("category", update_category.value);
    formdata.append("discount_price", update_discount_price.value);
    formdata.append("shortDescription", update_short_description.value);
    formdata.append("longDescription", update_long_description.value);
    color_ary.forEach((data, index) => {
      formdata.append("color", data);
    });
    size_ary.forEach((data, index) => {
      formdata.append("size", data);
    });
    update_images_ary.forEach((image, index) => {
      formdata.append("file", image);
    });

    try {
      const response = await fetch(`${api}/admin/updateproduct/${product_id}`, {
        method: "PATCH",
        headers: {
          Authorization: `token ${storage ? storage : ""}`,
        },
        body: formdata,
      });
      if (response.status == 200) {
        const res = await response.json();
        alert(res.message);
        window.location.reload();
      } else if (response.status == 201) {
        const res = await response.json();
        alert(res.message);
      } else {
        let data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log("Server Error: ", error);
    }
  };
})();
