
let container2 = document.querySelector(".container2");
let itemContainer = document.querySelector(".itemContainer");
let moneys = document.querySelectorAll(".money");
let items = document.querySelectorAll(".item");
let srcMoney = null;
let btn = document.getElementById("btn");
let btn2 = document.getElementById("btn2");
let volume = document.getElementById("volume");
let music = document.getElementById("music");
let effectMusic = document.getElementById("effectMusic");
let isClick = false;
let itemlist = [
  "/image/nai.png",
  "/image/bau.png",
  "/image/ga.png",
  "/image/ca.png",
  "/image/cua.png",
  "/image/tom.png"
]

volume.addEventListener("click", function() {
  if (music.paused) {
    music.play();
    volume.src = "/image/volume.png"
  }
  else {
    music.pause();
    volume.src = "/image/mute.png"
  }
})

btn2.addEventListener("click", function() {
  if (isClick === false) {
    itemContainer.innerHTML = "";
    container2.classList.add("animation");
    setTimeout(function() {
      container2.classList.remove("animation");
    }, 2000)
    effectMusic.play(); 
    }
    isClick = true;
})

btn.addEventListener("click", function() {
  if (isClick === true) {
    let newItemList = [];
    for (let i = 0; i < 3; i++) {
      let random = Math.floor(Math.random() * itemlist.length);
      newItemList.push(itemlist[random])
    }
    let newItemListString = newItemList.map(function(arr) {
      return `<img src="${arr}">`;
    })
    itemContainer.innerHTML = newItemListString.join("");
  }
  isClick = false;
})

moneys.forEach(function(money) {
  money.addEventListener("click", function() {
    srcMoney = money.getAttribute("src");
  })
})

items.forEach(function(item) {
  item.addEventListener("click", function() {
    if (srcMoney !== null) {
      let randomWidth = Math.floor(Math.random() * 86);
      let randomHeight = Math.floor(Math.random() * 86);
      item.innerHTML += `<img src="${srcMoney}" width="75px" style="position: absolute; top: ${randomHeight}px; left: ${randomWidth}px;">`;
    }
  })
})















