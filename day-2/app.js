let menuItems = [
  {
    name: `French Fries with Ketchup`,
    price: 2.75,
    image: 'plate__french-fries.png'
  },
  {
    name: `Bacon and Eggs`,
    price: 4.5,
    image: 'plate__bacon-eggs.png'
  },
  {
    name: `Chicken Salad`,
    price: 6.25,
    image: 'plate__chicken-salad.png'
  },
  {
    name: `Fish Sticks with French Fries`,
    price: 3.95,
    image: 'plate__fish-sticks-fries.png'
  },
  {
    name: `Ravioli`,
    price: 7.15,
    image: 'plate__ravioli.png'
  },
  {
    name: `Salmon with Vegetables`,
    price: 8.55,
    image: 'plate__salmon-vegetables.png'
  },
  {
    name: `Spaghetti with Meat Sauce`,
    price: 7.25,
    image: 'plate__spaghetti-meat-sauce.png'
  },
  {
    name: `Tortellini`,
    price: 9.75,
    image: 'plate__tortellini.png'
  }
]

let cartItems = []

const addToCart = (i) => {

  if (cartItems.some((item) => item.name === menuItems[i].name)) {
    cartItems[cartItems.findIndex((item) => item.name === menuItems[i].name)].quantity++
  } else {
    cartItems.push(menuItems[i])
    cartItems[cartItems.length - 1].quantity = 1
  }

  populateCart()
}

menuItems.forEach((item, i) => {

  let newItem = document.createElement('div')
  newItem.classList.add('item')
  newItem.innerHTML = `
  <img src="./images/${item.image}" />
  <div class="itemInfo">
  <h3>${item.name}</h3>
  <p>$${item.price.toFixed(2)}</p>
  <button id="${i}" class="addItemButton">Add To Cart</button>
  </div>
  `
  document.getElementById('menuItems').appendChild(newItem)
})

const populateCart = () => {
  document.getElementById('orderItems').innerHTML = ''
  cartItems.forEach((item, i) => {
    
    if (item.quantity > 0) {

    let newItem = document.createElement('div')
    newItem.classList.add('cartItem')
    newItem.innerHTML = `

    <img class="cartImage" src="./images/${item.image}" />
    <div class="quantityImageCover">${item.quantity}</div>
    <div class="cartItemInfo">
      <h3>${item.name}</h3>
      <p>$${item.price.toFixed(2)}</p>
      <div class="cartItemControls">
        <div class="cartButtons">
          <img id="sub-${i}" class="chevronLeft" src="./images/chevron.svg" />${item.quantity}<img id="add-${i}" class="chevronRight" src="./images/chevron.svg" />
        </div>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    </div>
    `
    document.getElementById('orderItems').appendChild(newItem)
    document.getElementById(`sub-${i}`).addEventListener('click', () => subItem(i))
    document.getElementById(`add-${i}`).addEventListener('click', () => addItem(i))
    }
  })

  let billTotal = cartItems.reduce((acc, cur) => {
    return acc += (cur.price * cur.quantity)
  }, 0)
  
  let totalDiv = document.createElement('div')
  totalDiv.classList.add('itemTotal')
  totalDiv.innerHTML = `$${(billTotal + (billTotal * 0.0975 )).toFixed(2)}`
  document.getElementById('orderItems').appendChild(totalDiv)

}

const subItem = (i) => {
  cartItems[i].quantity -= 1
  populateCart()
}

const addItem = (i) => {
  cartItems[i].quantity += 1
  populateCart()
}

document.querySelectorAll('.addItemButton').forEach((item) => {
  item.addEventListener('click', () => addToCart(item.id))
})

