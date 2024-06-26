const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
let api = "http://localhost:4000/api";
let storage = localStorage.getItem("token");

(async () => {
  let product_img = document.querySelectorAll(".p-img");
  let product_name = document.getElementById("pname");
  let product_price = document.getElementById("pprice");
  let product_shortdesc = document.getElementById("pshortdesc");
  let color_form = document.getElementById("color-form");
  let size_form = document.getElementById("size-form");
  let pstars = document.getElementById("pstars");
  let product_quantity = document.getElementById("pquantity");
  let addtocart_btn = document.getElementById("addtocart");
  let product_longdesc = document.getElementById("plongdesc");
  let product_sold = document.getElementById("psold");
  let catagory;

  // get single product details...............................
  try {
    const response = await fetch(`${api}/product/product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      catagory =data.product.category;
      for (let i = 0; i < data.product.image.length; i++) {
        product_img[i].src = data.product.image[i];
      }
      product_name.innerHTML = data.product.name;
      product_sold.innerHTML = `${data.product.sold} sold`;
      product_price.innerHTML = `$${data.product.price}`;
      product_shortdesc.innerHTML = data.product.shortDescription;

      for (let i = 0; i < data.product.color.length; i++) {
        color_form.innerHTML += `
         <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" class="custom-control-input" value="${data.product.color[i]}" id="color-${i}" name="color">
                <label class="custom-control-label" for="color-${i}">${data.product.color[i]}</label>
        </div> `;
      }
      for (let i = 0; i < data.product.size.length; i++) {
        size_form.innerHTML += `
        <div class="custom-control custom-radio custom-control-inline">
              <input type="radio" class="custom-control-input" value="${data.product.size[i]}" id="size-${i}" name="size">
              <label class="custom-control-label" for="size-${i}">${data.product.size[i]}</label>
        </div>`;
      }
      product_longdesc.innerHTML = data.product.longDescription;
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log("Server Error: ", error);
  }

  // product add to cart...............................
  addtocart_btn.addEventListener("click", async () => {
    let color = document.querySelector('input[name="color"]:checked');
    let size = document.querySelector("input[name='size']:checked");
    let quantity = product_quantity.value;
    if (!color || !size || !quantity) {
      alert("Please select color, size and quantity");
      return;
    }
    let data = {
      color: color.value,
      size: size.value,
      quantity,
    };

    try {
      const response = await fetch(`${api}/cart/createcart/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${storage ? storage : ""}`,
        },
        body: JSON.stringify(data),
      });
      if (response.status == 200) {
        const data = await response.json();
        alert(data.message);
        window.location.reload();
      } else if (response.status == 201) {
        const data = await response.json();
        alert(data.message);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  });

  // get product reviews.............................
  let review_title = document.getElementById("review-title");
  let reviews_list = document.getElementById("reviews-list");
  let ptotalreviews = document.getElementById("ptotalreviews");

  try {
    const response = await fetch(`${api}/review/getreview/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      review_title.innerHTML = `${data.data.length} reviews for ${product_name.textContent}`;
      pstars.innerHTML =`(${data.data.length} Reviews)`;
      ptotalreviews.innerHTML =`Reviews (${data.data.length})`;

      let calculate_reviews =(rating)=>{
        let stars = "";
        for (let i = 1; i <= rating; i++) {
         stars += `<i class="fas fa-star text-warning"></i>`;
        }
        return stars;
      }

      data.data.map((review) => {
        reviews_list.innerHTML += `
        <div class="media mb-4">
              <img
                          src=${review.avatar}
                          alt="Image"
                          class="img-fluid rounded-circle mr-3 mt-1"
                          style="width: 45px; height: 45px;"
              />
              <div class="media-body">
                  <h6>
                      ${review.name}<small> - <i>${new Date(review.createdAt).toDateString()}</i></small>
                  </h6>
                  <div class="text-primary mb-2" id="rating-stars">
                      ${calculate_reviews(review.rating)}
                  </div>
                  <p>
                    ${review.comment}
                  </p>
              </div>
        </div>
        `;
      });
      
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log("Server Error: ", error);
  }

  // create product reviews.............................
  let massage_box = document.getElementById("message");
  let addReview_btn = document.getElementById("addreview");
  let rating_stars = document.querySelectorAll(".rating-stars");
  let rating_numbers = 0;

  rating_stars.forEach((star) => {
    star.addEventListener("click", () => {
      let index = Array.from(rating_stars).indexOf(star) + 1;
      let findindex = 5 - index;
      index = 5 - findindex;
      for (let i = 0; i < 5; i++) {
        rating_stars[i].classList.remove("text-warning");
        rating_stars[i].classList.remove("fas");
        rating_stars[i].classList.add("far");
      }
      for (let i = 1; i <= index; i++) {
        rating_stars[i - 1].classList.add("text-warning");
        rating_stars[i - 1].classList.add("fas");
        rating_stars[i - 1].classList.remove("far");
      }

      rating_numbers = index;
    });
  });

  addReview_btn.onclick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}/review/createreview/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${storage ? storage : ""}`,
        },
        body: JSON.stringify({
          rating: rating_numbers,
          comment: massage_box.value,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        window.location.reload();
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log("Server Error: ", error);
    }
  };

  // get all related products.............................
  let related_pruducts = document.getElementById("related-pruducts");
  try {
    const response =await fetch(`${api}/product/allproducts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    if(response.ok){
      const data = await response.json();
      data.products.filter((product) => product.category === catagory).forEach((product, index) => {
        related_pruducts.innerHTML += `
        <div class="card w-25 product-item border-0 mx-2" key="${index}">
              <div
                class="card-header product-img position-relative overflow-hidden bg-transparent border p-0"
              >
                <img class="img-fluid w-100" src="${product.image[0]}" alt="" style="height:250px;"/>
              </div>
              <div
                class="card-body border-left border-right text-center p-0 pt-4 pb-3"
              >
                <h6 class="text-truncate mb-3">${product.name}</h6>
                <div class="d-flex justify-content-center">
                  <h6>$${product.price}</h6>
                  <h6 class="text-muted ml-2"><del>$${product.discount_price}</del></h6>
                </div>
              </div>
              <div
                class="card-footer d-flex justify-content-center bg-light border"
              >
                <a href="detail.html?id=${product._id}" class="btn btn-sm text-dark p-0"
                  ><i class="fas fa-eye text-primary mr-1"></i>View Detail</a
                >
              </div>
            </div>
        `
      })

    }else{
      console.log(response);
    }
  } catch (error) {
    console.log("Server Error: ", error);
  }
})();
