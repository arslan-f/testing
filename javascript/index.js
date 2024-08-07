import productCardMaker from "./productCard.js";
import wishlistFunction from "./wishlist.js";

const data = [
  {
    id: "clay-corner-sofa-longchair",
    title: "Clay Corner Sofa Longchair",
    description:
      "Clay looks like one big comfy pillow. Once you take a seat, you’ll never want to get up again.",
    vendor: "Furniture Co.",
    tags: ["new", "made to order"],
    variants: [
      {
        label: "royal pine",
        color: "#2d3d33",
        sku: "clay-corner-sofa-longchair-royal-pine",
        price: 2938,
        thumbnail: "thumbnail/clay-corner-sofa-longchair-royal-pine.png",
        image: "images/clay-corner-sofa-longchair-royal-pine.jpg",
      },
      {
        label: "cube blossom",
        color: "#d6b9b6",
        sku: "clay-corner-sofa-longchair-cube-blossom",
        price: 2338,
        reducedPrice: 2280,
        thumbnail: "thumbnail/clay-corner-sofa-longchair-cube-blossom.png",
        image: "images/clay-corner-sofa-longchair-cube-blossom.jpg",
      },
    ],
  },
  {
    id: "plateau-side-table",
    title: "Plateau Side table",
    description:
      "With its bent metal sheet base and wooden top, this elegant black side table is the perfect combination of lightness and stability. We loved it right from the start, and we hope you will love it just as much.",
    vendor: "Furniture Co.",
    variants: [
      {
        label: "sand",
        color: "#dcd0c7",
        sku: "plateau-side-table-sand",
        price: 249,
        thumbnail: "thumbnail/plateau-side-table-sand.png",
        image: "images/plateau-side-table-sand.png",
      },
      {
        label: "terra",
        color: "#F07741",
        sku: "plateau-side-table-terra",
        price: 299,
        reducedPrice: 249,
        thumbnail: "thumbnail/plateau-side-table-terra.png",
        image: "images/plateau-side-table-terra.png",
      },
      {
        label: "cobalt-blue",
        color: "#4b68b2",
        sku: "plateau-side-table-cobalt-blue",
        price: 249,
        thumbnail: "thumbnail/plateau-side-table-cobalt-blue.png",
        image: "images/plateau-side-table-cobalt-blue.png",
      },
      {
        label: "dark-khaki",
        color: "#bdb76b",
        sku: "plateau-side-table-dark-khaki",
        price: 299,
        reducedPrice: 249,
        thumbnail: "thumbnail/plateau-side-table-dark-khaki.png",
        image: "images/plateau-side-table-dark-khaki.png",
      },
    ],
  },
  {
    id: "sinclair-lounge-chair-swivel",
    title: "Sinclair Lounge chair - swivel",
    description:
      "With this round and soft design lounge chair, you will invite a true design piece into your home. And the best thing is: it's surprisingly comfortable.",
    vendor: "Furniture Co.",
    variants: [
      {
        label: "green",
        color: "#44594c",
        sku: "sinclair-lounge-chair-swivel-green",
        price: 989,
        thumbnail: "thumbnail/sinclair-lounge-chair-swivel-green.png",
        image: "images/sinclair-lounge-chair-swivel-green.png",
      },
    ],
  },
  {
    id: "monday-dining-chair-with-arms",
    title: "Monday dining chair with arms",
    description:
      "Who says dining chairs can't be comfortable? On this Monday dining chair, you can easily spend long evenings of dining with friends or working whole days from home. Its wide seat and back, filled with highly resilient foam make this chair super soft and comfortable. It might not surprise you that a lot of hotels and restaurants included this chair into their interior design.",
    vendor: "Furniture Co.",
    variants: [
      {
        label: "mustard",
        color: "#c78836",
        sku: "monday-dining-chair-with-arms-mustard",
        price: 659,
        reducedPrice: 695,
        thumbnail: "thumbnail/monday-dining-chair-with-arms-mustard.png",
        image: "images/monday-dining-chair-with-arms-mustard.png",
      },
    ],
  },
];

function showProducts(products) {
  for (var i = 0; i < products.length; i++) {
    productCardMaker(products[i]);
  }
}

var requestOptions = {
  method: "GET",
  redirect: "follow",
};

// Code commented because API is not available
// fetch("https://hiring-workspace.vercel.app/api/v1/furniture", requestOptions)
//   .then((response) => response.text())
//   .then((result) => {
//     showProducts(JSON.parse(result));

//     // wishlist function call
//     wishlistFunction();
//   })
//   .catch((error) => console.log("error", error));

// Check if wishlistContainer exists in the DOM
const wishlistContainer = document.querySelector(".wishlist__container");

if (wishlistContainer) {
  // Ensure it exists before adding event listener
  wishlistContainer.addEventListener("click", () => {
    wishlistContainer.classList.toggle("opened");
    wishlistContainer.classList.toggle("closed");
  });
}

// should be removed when API is available
showProducts(data);

// Should be removed when API is available
wishlistFunction();
