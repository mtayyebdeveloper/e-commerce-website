let api = "http://localhost:4000";
let storage = localStorage.getItem("token");
let shipping_p = document.getElementById("Shipping_price");
let subtotal_p = document.getElementById("Subtotal_price");
let coupon_name = document.getElementById("coupon-name");
let coupon_btn = document.getElementById("coupon-btn");
let total_p = document.getElementById("Total_price");
let discount_price = 0;
let subtotal_Price = 0;
let shipping_price = 10;
let coupon = "";

// get coupon code......................................
coupon_btn.onclick = async () => {
  try {
    const response = await fetch(`${api}/api/coupon/getcoupon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${storage ? storage : ""}`,
      },
      body: JSON.stringify({
        name: coupon_name.value,
      }),
    });
    if (response.status == 200) {
      let data = await response.json();
      alert(data.message);
      discount_price = data.data.discount;
      coupon = data.data.name;
    } else if (response.status == 201) {
      let data = await response.json();
      alert(data.message);
    } else if (response.status == 401) {
      let data = await response.json();
      console.log(data);
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};
(async () => {
  // get cart.............................

  const cartsContainer = document.getElementById("allCarts");
  const discount_p = document.getElementById("discount-p");

  try {
    const response = await fetch(`${api}/api/cart/allcarts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${storage ? storage : ""}`,
      },
    });
    if (response.ok) {
      const res = await response.json();
      res.data.map((data, index) => {
        subtotal_Price += data.total;
        return (cartsContainer.innerHTML += `
        <tr key={${index}}>
            <th>${data.name}</th>
            <th>$${data.price}</th>
            <th>
            <select name="product-quantity" id="product-quantity">
                    <option value="${data.quantity}">${data.quantity}</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </th>
            <th>$${data.total}</th>
            <th><i class="fas fa-times" style="cursor:pointer" onclick="deletecart('${data._id}')"></i></th>
            <th><i class="fas fa-edit" style="cursor:pointer" onclick="updatecart('${data._id}')"></i></th>
        </tr>
        `);
      });
      subtotal_p.innerHTML = `$${subtotal_Price}`;
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
  if (subtotal_Price <= 0) {
    shipping_price = 0;
  } else {
    shipping_p.innerHTML = `$${shipping_price}`;
  }
  let total_price = subtotal_Price + shipping_price;
  let intervel = setInterval(() => {
    if (discount_price > 0) {
      discount_p.innerHTML = `$${total_price}`;
      let calculate_price = total_price / discount_price;
      total_price = total_price - calculate_price;
      total_p.innerHTML = `$${Math.round(total_price)}`;
      clearInterval(intervel);
    }
  }, 1000);
  total_p.innerHTML = `$${total_price}`;
})();

let checkout_btn = document.getElementById("checkout-btn");
checkout_btn.onclick = () => {
  checkout_btn.href = `checkout.html?dis=${coupon}`;
};

// // delete cart.........................
let deletecart = async (id) => {
  try {
    const response = await fetch(`${api}/api/cart/deletecart/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${storage ? storage : ""}`,
      },
    });
    if (response.ok) {
      const res = await response.json();
      window.location.reload();
      alert(res.message);
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

// update cart............................
let updatecart = async (id) => {
  let productquantity = document.getElementById("product-quantity");

  try {
    const response = await fetch(`${api}/api/cart/updatecart/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${storage ? storage : ""}`,
      },
      body: JSON.stringify({ quantity: productquantity.value }),
    });
    if (response.ok) {
      const res = await response.json();
      alert(res.message);
      window.location.reload();
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};
