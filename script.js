const button = document.querySelector('.button') 
const count = document.querySelector('.count')
const jpcCount = document.querySelector('.jpcCount')
const jpsCount = document.querySelector('.jpsCount')
const shopButtsClass = document.querySelector('.shopButton')
const resetButton = document.querySelector('.resetButton')
const larrow = document.querySelector('#larrow')
const rarrow = document.querySelector('#rarrow')
jps = JSON.parse(localStorage.getItem('JPS')) || 0;
johns = JSON.parse(localStorage.getItem('johns')) || 0;
jpc = JSON.parse(localStorage.getItem('JPC')) || 1;

rendershop()


setInterval(function () {johns += jps; count.innerHTML = `${johns.toLocaleString()} Johns`; localStorage.setItem('johns', JSON.stringify(johns));}, 1000);

count.innerHTML = `${johns.toLocaleString()} Johns`
jpcCount.innerHTML = `${jpc.toLocaleString()} JPC`
jpsCount.innerHTML = `${jps.toLocaleString()} JPS`

window.addEventListener('storage', function(event) {
  count.innerHTML = `${johns.toLocaleString()} Johns`
  jpcCount.innerHTML = `${jpc.toLocaleString()} JPC`
  jpsCount.innerHTML = `${jps.toLocaleString()} JPS`
})

document.addEventListener('dblclick', function (event) {
  event.preventDefault();
}, { passive: false });

rarrow.addEventListener('click', function(event) {
    currentWorld += 1
    console.log(currentWorld)
  johns = worlds[currentWorld].johns
})

larrow.addEventListener('click', function(event) {
  if (currentWorld > 0) {
    currentWorld -= 1
    console.log(currentWorld)
  }
  johns = worlds[currentWorld].johns
})

resetButton.addEventListener('click', function(event) {

   localStorage.clear()
  location.reload()
})

document.addEventListener('contextmenu', function(event) {
  //event.preventDefault()
})

button.addEventListener('click', function(event) {

  if (event.detail === 0) return;
  
  johns += jpc

  localStorage.setItem('johns', JSON.stringify(johns))
  localStorage.setItem('JPC', JSON.stringify(jpc))


  count.innerHTML = `${johns.toLocaleString()} Johns`
  jpcCount.innerHTML = `${jpc.toLocaleString()} JPC`
 
  //this.blur//

})
rendershop()

function rendershop() {
  let shopHtml = ''

  shopButtons.forEach((shopButton, index) => {

    if (shopButton.timesPurchased >= 30){
      shopButton.name = 'Sold Out!'
      shopButton.soldout = true
    }

    let storedPrice = localStorage.getItem(`${shopButton.iD}Price`);
    if (storedPrice !== null) {
      shopButton.price = JSON.parse(storedPrice);
    }

    let storedBenefit = localStorage.getItem(`${shopButton.iD}Benefit`);
    if (storedBenefit !== null) {
      shopButton.benefit = JSON.parse(storedBenefit)
    }

    let storedTimesPurchased = localStorage.getItem(`${shopButton.iD}TimesPurchased`);
    if (storedTimesPurchased !== null) {
      shopButton.timesPurchased = JSON.parse(storedTimesPurchased)
    }

    shopHtml += `
          <div ${shopButton.timesPurchased >= 30 ? 'style="opacity:0.4; scale:1;"' : ""} id="${shopButton.iD}"class="shopButton" onclick="
            purchaseJohn(${index})
          ">
          <img src="${shopButton.image}">

          <div class="shopInfo">
            <p class="shopButtName">${shopButton.name}</p>
            <p class="shopButtPrice">${shopButton.price.toLocaleString()} J</p>
            <p class="shopButtBenefit">+${shopButton.benefit.toLocaleString()} ${shopButton.type}</p>
            <p class="shopButtLevel">Level ${shopButton.timesPurchased >= 30 ? 'Max' : shopButton.timesPurchased}</p>
          </div>

        </div>
    `


})

  document.querySelector('.shopGrid').innerHTML = shopHtml
}

renderProgressBar()
function renderProgressBar() {
  let progressHtml = ''

  shopButtons.forEach((shopButton) => {
    progressHtml += `<div style="
      background-color: ${shopButton.name === 'Sold Out!' ? 'green' : 'black'};
    "class="progressPoint">
          
        </div>`

  })

  document.querySelector('.progressBar').innerHTML = progressHtml

}



function purchaseJohn(index) {
  const shopButt = shopButtons[index]
  if (shopButt.timesPurchased < 30) {
      if (johns >= shopButt.price ) {
        johns -= shopButt.price
        shopButt.timesPurchased += 1

        if (shopButt.type === 'JPC') {
          jpc += shopButt.benefit
        } else if (shopButt.type === 'JPS') {
          jps += shopButt.benefit
        }

        shopButt.price = Math.ceil(shopButt.price * 1.4)

        localStorage.setItem(`${shopButt.iD}TimesPurchased`, JSON.stringify(shopButt.timesPurchased))
        localStorage.setItem('JPS', JSON.stringify(jps))
        localStorage.setItem(`${shopButt.iD}Benefit`, JSON.stringify(shopButt.benefit))
        localStorage.setItem(`${shopButt.iD}Price`, JSON.stringify(shopButt.price))
        localStorage.setItem('johns', JSON.stringify(johns))
        localStorage.setItem('JPC', JSON.stringify(jpc))
        count.innerHTML = `${johns.toLocaleString()} Johns`
        jpcCount.innerHTML = `${jpc.toLocaleString()} JPC`
        jpsCount.innerHTML = `${jps.toLocaleString()} JPS`
        rendershop()
        renderProgressBar()
    
      } else {
        alert('Not enough Johns!')
      }
  } else {
    shopButt.name = 'Sold Out!'
    alert('Sold Out!')
    renderProgressBar()
    console.log(shopButt.timesPurchased < 30)
    rendershop()
  }

}



