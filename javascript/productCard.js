const productCardMaker = (productData) => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const productCardContainer = document.querySelector(
    ".js-product-cards-container"
  );
  if (!productCardContainer) return;

  // Construct HTML for product card variants
  let variantsHTML = productData.variants
    .map(
      (variant, index) => `
      <div class="product-card__variant ${index === 0 ? "selected" : ""}" 
           style="background-color: ${variant.color};" 
           data-label="${variant.label}">
      </div>
    `
    )
    .join("");

  const defaultVariant = productData.variants[0];
  const defaultImage = defaultVariant.image;

  // Formatting price for display
  const formatPrice = (price) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const defaultPriceDisplay = `€${formatPrice(defaultVariant.price)}`;
  const defaultReducedPriceDisplay = defaultVariant.reducedPrice
    ? `€${formatPrice(defaultVariant.reducedPrice)}`
    : null;

  let tagsHTML = "";
  if (productData.tags && productData.tags.length > 0) {
    tagsHTML = `<div class="product-card__tags">
      ${productData.tags
        .map((tag) => `<div class="product-card__tag">${tag}</div>`)
        .join("")}
    </div>`;
  }

  const productCard = document.createElement("div");
  productCard.classList.add("product-card");
  productCard.innerHTML = `
    <div class="product-card__image-container">
      ${tagsHTML}
      <img src="${defaultImage}" alt="${productData.title}"/>
    </div>
    <div class="product-card__details">
      <h4 class="product-card__title">${productData.title}</h4>
      <p class="product-card__description">${productData.description}</p>
      <div class="product-card__variants">${variantsHTML}</div>
      <div class="product-card__price-wishlist">
        <div class="product-card__price">
  
  ${formatPrice(defaultPriceDisplay)}
      ${
        defaultReducedPriceDisplay
          ? `<span class="reduced-price">€${formatPrice(
              defaultReducedPriceDisplay
            )}</span>`
          : ""
      }

        </div>
        <div class="product-card__wishlist ${
          wishlist.find((item) => item.title === productData.title)
            ? "active"
            : ""
        }">
          <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_239_106)">
                    <path
                      d="M19.8059 5.17574C19.2781 3.17137 17.7249 1.5917 15.7551 1.05495C13.8254 0.531454 11.7754 1.0631 10.0099 2.51852C8.72208 1.44809 7.29504 0.868572 5.83796 0.833944C4.2547 0.811537 2.7776 1.40124 1.66401 2.53278C-0.429979 4.66243 -0.88663 8.50822 2.2899 11.7389L9.2999 18.8682C9.49518 19.0669 9.75154 19.1667 10.0079 19.1667C10.2643 19.1667 10.5206 19.0669 10.7159 18.8682L17.7259 11.7389C19.6346 9.79762 20.3927 7.4052 19.8059 5.17574Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_239_106">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
        </div>
      </div>
    </div>
  `;

  productCardContainer.appendChild(productCard);

  // Add event listeners to update image and price based on variant selection
  const variants = productCard.querySelectorAll(".product-card__variant");
  variants.forEach((variant, index) => {
    variant.addEventListener("click", () => {
      variants.forEach((v) => v.classList.remove("selected"));
      variant.classList.add("selected");

      const selectedVariant = productData.variants[index];
      productCard.querySelector("img").src = `${selectedVariant.image}`;

      const selectedPrice = selectedVariant.price;
      const selectedReducedPrice = selectedVariant.reducedPrice;
      productCard.querySelector(".product-card__price").innerHTML = `${
        selectedReducedPrice
          ? `<span class="normal-price">€${formatPrice(selectedPrice)}</span>
           <span class="reduced-price">€${formatPrice(
             selectedReducedPrice
           )}</span>`
          : `€${formatPrice(selectedPrice)}`
      }`;
    });
  });
};

export default productCardMaker;
