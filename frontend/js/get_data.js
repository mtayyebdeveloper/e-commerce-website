window.addEventListener("DOMContentLoaded", async () => {
  let category = new window.URLSearchParams(window.location.search).get(
    "category"
  );
  let search_value = new window.URLSearchParams(window.location.search).get(
    "search"
  );
  let api = "http://localhost:4000/api";
  // get search data....................
  let productscontainer = document.getElementById("all-products");
  let search_input = document.getElementById("search-input");
  let search_btn = document.getElementById("search-btn");

  search_btn.onclick = () =>
    window.open(`shop.html?search=${search_input.value}`, "_self");
  if (search_value) {
    productscontainer.innerHTML = "";
    try {
      const response = await fetch(
        `${api}/search/search?keyword=${search_value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        data.products.forEach((product, index) => {
          productscontainer.innerHTML += `
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
      console.log("Server Error: ", error);
    }
  } else {
    // get all products.......................
    try {
      const response = await fetch(`${api}/product/allproducts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        let search_by_price = document.querySelectorAll("input[name=price]");
        search_by_price.forEach((price) => {
          price.onchange = (e) => {
            search_by_price.forEach(element =>element.checked=false)
            e.target.checked=true
            if (e.target.checked) {
              productscontainer.innerHTML = "";
              if (e.target.value == "all") {
                data.products.forEach((product, index) => {
                  productscontainer.innerHTML += `
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
              }else{
                data.products
                .filter((product) => product.price <= e.target.value)
                .forEach((product, index) => {
                  productscontainer.innerHTML += `
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
              }
            }
          };
        });

        let search_by_color = document.querySelectorAll("input[name=color]");
        search_by_color.forEach((color) => {
          color.onchange = (event) => {
            search_by_color.forEach(element =>element.checked=false)
            event.target.checked=true
            if (event.target.checked) {
              productscontainer.innerHTML = "";
              if (event.target.value == "all") {
                data.products.forEach((product, index) => {
                  productscontainer.innerHTML += `
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
              }else{
                data.products
                .filter((product) =>product.color.includes(event.target.value))
                .forEach((product, index) => {
                  productscontainer.innerHTML += `
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
              }
            }
          };
        });


        let search_by_size = document.querySelectorAll("input[name=size]");
        search_by_size.forEach((size) => {
          size.onchange = (e) => {
            search_by_size.forEach(element =>element.checked=false)
            e.target.checked=true
            if (e.target.checked) {
              productscontainer.innerHTML = "";
              if (e.target.value == "all") {
                data.products.forEach((product, index) => {
                  productscontainer.innerHTML += `
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
              }else{
                data.products
                .filter((product) =>product.size.includes(e.target.value))
                .forEach((product, index) => {
                  productscontainer.innerHTML += `
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
              }
            }
          };
        });
        if (category) {
          data.products
            .filter((product) => product.category == category)
            .forEach((product, index) => {
              productscontainer.innerHTML += `
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
          data.products.reverse().forEach((product, index) => {
            productscontainer.innerHTML += `
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
        }
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  let tranding_btn = document.getElementById("tranding_btn");

  tranding_btn.onclick = async () => {
    productscontainer.innerHTML = "";
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
        data.products
          .sort((a, b) => b.sold - a.sold)
          .splice(0, 6)
          .forEach((product, index) => {
            productscontainer.innerHTML += `
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
  };
});
