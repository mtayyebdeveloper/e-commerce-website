let apis = "http://localhost:4000";
let storages = localStorage.getItem("token");


(async () => {
    let carts_length = document.querySelector(".carts_length");
  
    try {
      const response = await fetch(`${apis}/api/cart/allcarts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${storages ? storages : ""}`,
        },
      });
      if (response.ok) {
        const res = await response.json();
        carts_length.innerHTML = `${res.data.length}`
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  })();