const data = [
    {
      id: 1,
      name: "Invicta Men's Pro Diver",
      img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
      price: 74,
      cat: "Dress",
    },
    {
      id: 11,
      name: "Invicta Men's Pro Diver 2",
      img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
      price: 74,
      cat: "Dress",
    },
    {
      id: 2,
      name: "Timex Men's Expedition Scout ",
      img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
      price: 40,
      cat: "Sport",
    },
    {
      id: 3,
      name: "Breitling Superocean Heritage",
      img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
      price: 200,
      cat: "Luxury",
    },
    {
      id: 4,
      name: "Casio Classic Resin Strap ",
      img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
      price: 16,
      cat: "Sport",
    },
    {
      id: 5,
      name: "Garmin Venu Smartwatch ",
      img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
      price: 74,
      cat: "Casual",
    },
  ];

  const productsContainer = document.querySelector(".products");
  const selectInput = document.querySelector(".search");
  const categoriesContainer = document.querySelector(".cats");
  const priceRange = document.querySelector(".priceRange");
  const priceValue = document.querySelector(".priceValue");

  const displayProduct = (filteredProduct) =>{
    productsContainer.innerHTML = filteredProduct.map(product=>
        `
        <div class="product">
        <img src=${product.img}>
        <span class="name">${product.name}</span>
        <span class="priceText">${product.price}</span>
    </div>

        `).join("");
  }

  displayProduct(data);

//   filter input
selectInput.addEventListener("keyup",(e)=>{
    const value = e.target.value.toLowerCase();

    if(value){

        displayProduct(data.filter(item=> item.name.toLowerCase().indexOf(value) !== -1 ))

    }else{
        displayProduct(data);
    }

});


// Create Categories

const setCats = ()=>{
    const allCat = data.map(item=> item.cat);
    const categories = ["All",...allCat.filter((item,i)=>{
        return allCat.indexOf(item)===i;
    })];
    // console.log(categories);
    categoriesContainer.innerHTML = categories.map(cat=> 
        `
        <span class="cat">${cat}</span>

        `).join("");


        // add event lister to each categories item
        categoriesContainer.addEventListener("click", (e)=>{
            const selectedCat = e.target.textContent;

            selectedCat === "All" ? displayProduct(data) : displayProduct(data.filter((item)=>
                item.cat === selectedCat
            ));

        })



};

const setPrice = ()=>{
const priceList = data.map((item)=> item.price);
// console.log(priceList);
const minPrice = Math.min(...priceList);
// console.log(minPrice);
const maxPrice = Math.max(...priceList);
// console.log(maxPrice);
priceRange.min= minPrice;
priceRange.max= maxPrice;
priceRange.value = maxPrice;
priceValue.textContent = "$" + maxPrice;

priceRange.addEventListener("input",(e)=>{
    priceValue.textContent = "$" + e.target.value;

    displayProduct(data.filter((item)=> item.price <= e.target.value));
})


}

setCats();
setPrice();