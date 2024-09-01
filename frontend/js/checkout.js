const urlParams = new URLSearchParams(window.location.search);
const coupon_code = urlParams.get("dis");

let api = "http://localhost:4000";
let storage = localStorage.getItem("token");
let shipping_p = document.getElementById("Shipping_Price");
let subtotal_p = document.getElementById("Subtotal_Price");
let total_p = document.getElementById("Total_Price");
let discount_price = 0;
let subtotal_Price = 0;
let shipping_price = 10;

(async () => {
  // get coupon................................
  try {
    const response = await fetch(`${api}/api/coupon/getcoupon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${storage ? storage : ""}`,
      },
      body: JSON.stringify({
        name: coupon_code,
      }),
    });
    if (response.status == 200) {
      let data = await response.json();
      discount_price = data.data.discount;
    } else if (response.status == 201) {
      let data = await response.json();
      console.log(data.message);
    } else if (response.status == 401) {
      let data = await response.json();
      console.log(data);
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log("Error: ", error);
  }

  // get all carts.......................................
  const cartsContainer = document.getElementById("cart-container");
  const discount_p = document.getElementById("discount-p");
  let cartslist = [];
  let products_solds = [];

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
        let cart = {
          name: data.name,
          quantity: data.quantity,
          color: data.color,
          size: data.size,
          category: data.category,
          price: data.price,
          total_price: data.total,
        };
        cartslist.push(cart);

        let prducts = {
          _id: data.product,
          quantity: data.quantity,
        };

        products_solds.push(prducts);
        subtotal_Price += data.total;
        return (cartsContainer.innerHTML += `
          <div class="d-flex justify-content-between" key={${index}}>
                <p>${data.name}</p>
                <p>$${data.total}</p>
           </div>
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
  if (discount_price > 0) {
    discount_p.innerHTML = `$${total_price}`;
    let calculate_price = total_price / discount_price;
    total_price = total_price - calculate_price;
    total_p.innerHTML = `$${Math.round(total_price)}`;
  } else {
    total_p.innerHTML = `$${total_price}`;
  }

  // bill submit....................................
  let submit_btn = document.getElementById("submit_btn");

  submit_btn.onclick = async () => {
    let fName = document.getElementById("first_name");
    let lName = document.getElementById("last_name");
    let email = document.getElementById("email");
    let mobile = document.getElementById("mobile");
    let address1 = document.getElementById("address1");
    let address2 = document.getElementById("address2");
    let country = document.getElementById("country");
    let city = document.getElementById("city");
    let state = document.getElementById("state");
    let zip = document.getElementById("zip");
    let payment = document.querySelector('input[name="payment"]:checked');
    let newaccount = document.getElementById("newaccount");

    if (!newaccount.checked) {
      alert("Please Select Your Account Type");
      return;
    }

    try {
      const response = await fetch(`${api}/api/billing/createbill`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${storage ? storage : ""}`,
        },
        body: JSON.stringify({
          fName: fName.value,
          lName: lName.value,
          email: email.value,
          phone: mobile.value,
          address1: address1.value,
          address2: address2.value,
          country: country.value,
          city: city.value,
          state: state.value,
          zip: zip.value,
          paymentType: payment.value,
          total_price,
          carts: cartslist,
        }),
      });
      if (response.status == 200) {
        products_solds.forEach(async (data, index) => {
          try {
            const response =await fetch(`${api}/api/product/updateproduct/${data._id}`,{
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `token ${storage ? storage : ""}`,
              },
              body: JSON.stringify({
                sold: data.quantity
              })
            })
            if (response.status == 200) {
              const data = await response.json();
              console.log(data.message);
            } else {
              console.log(response);
            }
          } catch (error) {
            console.log("Error: ", error);
          }
        })
        let data = await response.json();
        alert(data.message);
        setTimeout(() => {
          window.location.reload();
        },1000)
      } else if (response.status == 201) {
        const data = await response.json();
        alert(data.message);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
})();
