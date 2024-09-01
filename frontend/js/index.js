window.addEventListener("DOMContentLoaded", async () => {
  let api = "http://localhost:4000/api";

//   get latest products...................................
  let latest_products = document.getElementById("latest_products_container");
  try {
    const response = await fetch(`${api}/product/allproducts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();

      data.products.reverse().splice(0, 6).forEach((product, index) => {
        latest_products.innerHTML += `
              <div class="col-lg-4 col-md-6 col-sm-12 pb-1" key="${index}">
                <div class="card product-item border-0 mb-4">
                  <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img class="img-fluid w-100" src="${product.image[0]}" alt="" style="height:250px;">
                  </div>
                  <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 class="text-truncate mb-3">${product.name}</h6>
                    <div class="d-flex justify-content-center">
                      <h6>$${product.price}</h6><h6 class="text-muted ml-2"><del>$${product.discount_price}</del></ h6>
                    </div>
                  </div>
                  <div class="card-footer d-flex justify-content-center bg-light border">
                    <a href="detail.html?id=${product._id}" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
                  </div>
                </div>
              </div>
            `;
      });
    } else {
      console.log(response);
    }
  } catch (error) {
    console.error("Error:", error);
  }


//   get popular products.....................................
  let popular_products = document.getElementById("tranding_products_container");

  try {
    const response = await fetch(`${api}/product/allproducts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();

      // sort products by sold............................
        data.products.sort((a, b) => b.sold - a.sold).splice(0, 6).forEach((product, index) => {
            popular_products.innerHTML += `
          <div class="col-lg-4 col-md-6 col-sm-12 pb-1" key="${index}">
            <div class="card product-item border-0 mb-4">
              <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                <img class="img-fluid w-100" src="${product.image[0]}" alt="" style="height:250px;">
              </div>
              <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                <h6 class="text-truncate mb-3">${product.name}</h6>
                <div class="d-flex justify-content-center">
                  <h6>$${product.price}</h6><h6 class="text-muted ml-2"><del>$${product.discount_price}</del></ h6>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-center bg-light border">
                <a href="detail.html?id=${product._id}" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
              </div>
            </div>
          </div>
        `;
        });
    } else {
      console.log(response);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
