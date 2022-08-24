let cart = []
let modalQtd = 1
let modalKey = 0
const singleItem = (el) => document.querySelector(el)
const allItem = (el) => document.querySelectorAll(el)


//listagem de pizzas
pizzaJson.map((item, index) => {
  let pizzaItem = singleItem('.models .pizza-item').cloneNode(true)

  pizzaItem.setAttribute('data-key', index)
  const pizzaArea = singleItem('.pizza-area')
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
  pizzaItem.querySelector('.pizza-item--img img').src = item.img
  pizzaItem.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault()
    let key = e.target.closest('.pizza-item').getAttribute('data-key')
    modalQtd = 1
    modalKey = key

    singleItem('.pizzaBig img').src = pizzaJson[key].img
    singleItem('.pizza-info h1').innerHTML = pizzaJson[key].name
    singleItem('.pizza-info--desc').innerHTML = pizzaJson[key].description
    singleItem('.pizza-info--desc').innerHTML = pizzaJson[key].description
    singleItem('.pizza-info--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`
    singleItem('.pizza-info--size.selected').classList.remove('selected')
    allItem('.pizza-info--size').forEach((size, sizeIndex) => {
      if (sizeIndex === 2) {
        size.classList.add('selected')
      }

      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
    })



    singleItem('.pizza-info--qt').innerHTML = modalQtd

    singleItem('.pizza-info--qtmenos').addEventListener('click', () => {
      modalQtd + modalQtd
    })

    singleItem('.pizza-modal').style.opacity = 0
    singleItem('.pizza-modal').style.display = 'flex'
    setTimeout(() => {
      singleItem('.pizza-modal').style.opacity = 1

    }, 200)
  })

  pizzaArea.append(pizzaItem)
})

let a = singleItem('.pizza-item a')

a.addEventListener('click', (e) => {
  console.log(e.target)
})

//eventos Modal
const closeModal = () => {
  singleItem('.pizza-modal').style.opacity = 0

  setTimeout(() => {
    singleItem('.pizza-modal').style.display = 'none'

  }, 200)

}
singleItem('.pizza-info--cancelButton').addEventListener('click', closeModal)
allItem('.pizza-info--cancelButton,.pizza-info--cancelMobileButton').forEach((item) => {
  item.addEventListener('click', closeModal)
})

singleItem('.pizza-info--qtmenos').addEventListener('click', () => {
  if (modalQtd > 1) {
    modalQtd--;

    singleItem('.pizza-info--qt').innerHTML = modalQtd
  }
})
singleItem('.pizza-info--qtmais').addEventListener('click', () => {
  modalQtd++;
  singleItem('.pizza-info--qt').innerHTML = modalQtd
})

allItem('.pizza-info--size').forEach((size, sizeIndex) => {
  size.addEventListener('click', (e) => {
    singleItem('.pizza-info--size.selected').classList.remove('selected')
    size.classList.add('selected')
  })
})

singleItem('.pizza-info--addButton').addEventListener('click', () => {
  let size = parseInt(singleItem('.pizza-info--size.selected').getAttribute('data-key'))

  let identifier = pizzaJson[modalKey].id + '@' + size

  let key = cart.findIndex((item) => item.identifier === identifier
  )
  if (key > -1) {
    cart[key].qtd += modalQtd
  } else {
    cart.push({
      identifier,
      id: pizzaJson[modalKey].id,
      size,
      qtd: modalQtd
    })
  }

  console.log(cart)
  closeModal()
})

