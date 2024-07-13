const wishlistFunction = () => {
  const productCardsContainer = document.querySelector(
    ".product-cards-container"
  );

  // Function to update the UI of all product cards based on wishlist status
  function updateProductCardsUI() {
    const productCards =
      productCardsContainer.querySelectorAll(".product-card");

    productCards.forEach((productCard) => {
      const title = productCard.querySelector(
        ".product-card__title"
      ).textContent;
      const wishlistButton = productCard.querySelector(
        ".product-card__wishlist"
      );

      if (isInWishlist(title)) {
        wishlistButton.classList.add("active");
      } else {
        wishlistButton.classList.remove("active");
      }
    });
  }

  // Function to check if a product is in the wishlist
  function isInWishlist(title) {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    return wishlist.some((item) => item.title === title);
  }

  // Event listener for wishlist buttons on product cards
  productCardsContainer.addEventListener("click", (event) => {
    let targetElement = event.target;

    // Traverse up the DOM to find the wishlist button
    while (
      targetElement &&
      !targetElement.classList.contains("product-card__wishlist")
    ) {
      targetElement = targetElement.parentElement;
    }

    // If the wishlist button or one of its children was clicked
    if (
      targetElement &&
      targetElement.classList.contains("product-card__wishlist")
    ) {
      // Getting all the wishlisted product data
      const productCard = targetElement.closest(".product-card");
      const title = productCard.querySelector(
        ".product-card__title"
      ).textContent;
      const image = productCard.querySelector(
        ".product-card__image-container img"
      ).src;
      // Extract the active price (discounted price if available or normal price)
      let priceElement = productCard.querySelector(".reduced-price");
      if (!priceElement) {
        priceElement = productCard.querySelector(".normal-price");
      }
      if (!priceElement) {
        priceElement = productCard.querySelector(".product-card__price");
      }
      const price = priceElement.textContent;
      const label = productCard.querySelector(".product-card__variant").dataset
        .label;

      const productData = { title, image, price, label };

      addToWishlist(productData);
    }
  });

  // Function to add a product to the wishlist
  function addToWishlist(productData) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Check if the product is already in the wishlist
    if (!wishlist.some((item) => item.title === productData.title)) {
      wishlist.push(productData);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }

    // Update the UI of product cards and the wishlist container
    updateProductCardsUI();
    renderWishlist();
  }

  // Function to render the wishlist items
  function renderWishlist() {
    const wishlistContainer = document.querySelector(".wishlist__content");
    wishlistContainer.innerHTML = ""; // Clear the container

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlist.forEach((product, index) => {
      const productElement = document.createElement("div");
      productElement.classList.add("wishlist-product");
      productElement.innerHTML = `
        <div class="wishlist-product__image-container">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="wishlist-product__details">
          <div class="wishlist-product__title-label">
            <h4 class="wishlist-product__title">${product.title}</h4>
            <h5 class="wishlist-product__label">${product.label}</h5>
          </div>
          <div class="wishlist-product__price-remove"> 
            <div class="wishlist-product__price">${product.price}</div>
            <button class="wishlist-product__remove" data-index="${index}">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5185 3.36842H11.2592V1.68421C11.2592 1.23753 11.0875 0.809144 10.7819 0.493294C10.4763 0.177443 10.0618 0 9.62959 0H6.37033C5.93813 0 5.52362 0.177443 5.21801 0.493294C4.91239 0.809144 4.7407 1.23753 4.7407 1.68421V3.36842H1.48144C1.26534 3.36842 1.05809 3.45714 0.90528 3.61507C0.752472 3.77299 0.666626 3.98719 0.666626 4.21053C0.666626 4.43387 0.752472 4.64806 0.90528 4.80598C1.05809 4.96391 1.26534 5.05263 1.48144 5.05263H2.29626V14.3158C2.29626 14.7625 2.46795 15.1909 2.77356 15.5067C3.07918 15.8226 3.49368 16 3.92589 16H12.074C12.5062 16 12.9207 15.8226 13.2264 15.5067C13.532 15.1909 13.7037 14.7625 13.7037 14.3158V5.05263H14.5185C14.7346 5.05263 14.9418 4.96391 15.0946 4.80598C15.2474 4.64806 15.3333 4.43387 15.3333 4.21053C15.3333 3.98719 15.2474 3.77299 15.0946 3.61507C14.9418 3.45714 14.7346 3.36842 14.5185 3.36842ZM6.37033 1.68421H9.62959V3.36842H6.37033V1.68421ZM12.074 14.3158H3.92589V5.05263H12.074V14.3158Z" fill="#838383"/>
                <path d="M6.37033 5.89474C6.15423 5.89474 5.94698 5.98346 5.79417 6.14138C5.64136 6.29931 5.55551 6.5135 5.55551 6.73684V12.6316C5.55551 12.8549 5.64136 13.0691 5.79417 13.227C5.94698 13.385 6.15423 13.4737 6.37033 13.4737C6.58643 13.4737 6.79368 13.385 6.94649 13.227C7.0993 13.0691 7.18514 12.8549 7.18514 12.6316V6.73684C7.18514 6.5135 7.0993 6.29931 6.94649 6.14138C6.79368 5.98346 6.58643 5.89474 6.37033 5.89474Z" fill="#838383"/>
                <path d="M9.62959 5.89474C9.41349 5.89474 9.20623 5.98346 9.05343 6.14138C8.90062 6.29931 8.81477 6.5135 8.81477 6.73684V12.6316C8.81477 12.8549 8.90062 13.0691 9.05343 13.227C9.20623 13.385 9.41349 13.4737 9.62959 13.4737C9.84569 13.4737 10.0529 13.385 10.2057 13.227C10.3586 13.0691 10.4444 12.8549 10.4444 12.6316V6.73684C10.4444 6.5135 10.3586 6.29931 10.2057 6.14138C10.0529 5.98346 9.84569 5.89474 9.62959 5.89474Z" fill="#838383"/>
              </svg>
            </button>
          </div>
        </div>
      `;

      wishlistContainer.appendChild(productElement);
    });

    // Update wishlist count
    const wishlistCount = document.querySelector(".wishlist-count");
    wishlistCount.textContent = wishlist.length;

    // Add event listeners for the remove buttons
    const removeButtons = wishlistContainer.querySelectorAll(
      ".wishlist-product__remove"
    );
    removeButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        removeFromWishlist(index);
      });
    });
  }

  // Function to remove a product from the wishlist
  function removeFromWishlist(index) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist.splice(index, 1); // Remove the item from the array
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    // Update the UI of product cards and the wishlist container
    updateProductCardsUI();
    renderWishlist();
  }

  // Initial rendering of wishlist items
  renderWishlist();

  // Initial update of product cards UI
  updateProductCardsUI();
};

export default wishlistFunction;
