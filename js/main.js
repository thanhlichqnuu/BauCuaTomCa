let resultContainer = document.querySelector(".result-container");
const resultItem = document.querySelector(".result-item");
const volume = document.getElementById("volume");
const music = document.getElementById("music");
const effectAudio = document.getElementById("effect-audio");
const happyText = document.querySelector(".happy-text");
const title = document.querySelector(".title");
const modeToggle = document.getElementById("mode-toggle");

let isOpen = false;
let isAnimating = false;
let isShaking = false;
let isFirstTime = true;
let previousSum = 0;
let isModePlayer = true;
const NEW_ITEM_LIST_LENGTH = 3;

const itemList = [
  "/images/nai.png",
  "/images/bau.png",
  "/images/ga.png",
  "/images/ca.png",
  "/images/cua.png",
  "/images/tom.png",
];

const handleToggleAudio = () => {
  volume.addEventListener("click", () => {
    music.paused ? music.play() : music.pause();
    volume.src = music.paused ? "/images/am_luong_mute.png" : "/images/am_luong.png";
  });
};

const startShaking = () => {
  isOpen = false;
  isAnimating = true;
  resultContainer.style.backgroundImage = "url('/images/dia_up.png')";
  resultItem.innerHTML = "";
  resultContainer.classList.add("turnPlateAnimation");
  effectAudio.play();
};

const stopShaking = () => {
  isAnimating = false;
  resultContainer.classList.remove("turnPlateAnimation");
};

const openPlatePlayer = () => {
  resultContainer.style.backgroundImage = "url('/images/dia_mo.png')";
  const newItemList = [];
  let sum = 0;

  if (isFirstTime) {
    for (let i = 0; i < NEW_ITEM_LIST_LENGTH; i++) {
      const randomIndex = Math.floor(Math.random() * itemList.length);
      newItemList.push(itemList[randomIndex]);
      sum += randomIndex;
    }
    isFirstTime = false;
  } else {
    let fakeRandom;
    if (previousSum <= 5) {
      fakeRandom = previousSum;
    } else if (previousSum >= 6 && previousSum <= 11) {
      fakeRandom = previousSum - 6;
    } else {
      fakeRandom = previousSum - 12;
    }
    const randomPosition = Math.floor(Math.random() * NEW_ITEM_LIST_LENGTH);

    for (let i = 0; i < NEW_ITEM_LIST_LENGTH; i++) {
      const randomIndex = Math.floor(Math.random() * itemList.length);
      newItemList.push(itemList[randomIndex]);
    }
    newItemList[randomPosition] = itemList[fakeRandom];
    sum = newItemList.reduce((acc, item) => acc + itemList.indexOf(item), 0);
  }

  previousSum = sum;

  const newItemListHTML = newItemList.map((item, index) => {
    return `<img src="${item}" class="item-${index + 1}">`;
  });
  console.log(newItemList.map((item) => itemList.indexOf(item)));
  resultItem.innerHTML = newItemListHTML.join("");
  isOpen = true;
};

const handlePlatePlayer = () => {
  if (isAnimating) return;

  if (!isShaking) {
    startShaking();
    isShaking = true;
    setTimeout(() => {
      stopShaking();
    }, 1200);
  } else {
    openPlatePlayer();
    isShaking = false;
  }
};

const openPlateAdmin = (excludedItem = null) => {
  resultContainer.style.backgroundImage = "url('/images/dia_mo.png')";
  let availableItems = itemList;
  if (excludedItem) {
    availableItems = itemList.filter((item) => item !== excludedItem);
  }

  const newItemList = [];

  for (let i = 0; i < NEW_ITEM_LIST_LENGTH; i++) {
    const randomIndex = Math.floor(Math.random() * availableItems.length);
    newItemList.push(availableItems[randomIndex]);
  }
  console.log(newItemList.map((item) => itemList.indexOf(item)));
  const newItemListHTML = newItemList.map((item, index) => {
    return `<img src="${item}" class="item-${index + 1}">`;
  });
  resultItem.innerHTML = newItemListHTML.join("");

  isOpen = true;
};

const handlePlateAdmin = (event) => {
  if (isAnimating) return;

  const { offsetX, offsetY, target } = event;
  const width = target.clientWidth;
  const height = target.clientHeight;

  let excludedItem = null;

  if (offsetX < width / 3 && offsetY < height / 3) {
    excludedItem = "/images/nai.png";
  } else if (offsetX < width / 3 && offsetY < (2 * height) / 3) {
    excludedItem = "/images/bau.png";
  } else if (offsetX < width / 3) {
    excludedItem = "/images/ga.png";
  } else if (offsetX > (2 * width) / 3 && offsetY < height / 3) {
    excludedItem = "/images/ca.png";
  } else if (offsetX > (2 * width) / 3 && offsetY < (2 * height) / 3) {
    excludedItem = "/images/cua.png";
  } else if (offsetX > (2 * width) / 3) {
    excludedItem = "/images/tom.png";
  }

  if (!isShaking) {
    startShaking();
    isShaking = true;

    setTimeout(() => {
      stopShaking();
    }, 1200);
  } else {
    openPlateAdmin(excludedItem);
    isShaking = false;
  }
};

const setCurrentYear = () => {
  const currentYear = new Date().getFullYear();
  happyText.innerHTML = `Happy New Year ${currentYear}`;
  title.innerHTML = `Bầu Cua Tết ${currentYear}`;
};

const toggleMode = () => {
  isModePlayer = !isModePlayer;
  isOpen = false;
  isAnimating = false;
  isShaking = false;

  resultContainer.removeEventListener("click", handlePlatePlayer);
  resultContainer.removeEventListener("click", handlePlateAdmin);

  if (isModePlayer) {
    isFirstTime = true;
    resultContainer.addEventListener("click", handlePlatePlayer);
    happyText.classList.replace("happy-text-blue", "happy-text-red")
  } else {
    resultContainer.addEventListener("click", handlePlateAdmin);
    happyText.classList.replace("happy-text-red", "happy-text-blue")
  }
};

const startGame = () => {
  setCurrentYear();
  resultContainer.addEventListener("click", handlePlatePlayer);
  modeToggle.addEventListener("click", toggleMode);
  handleToggleAudio();
};

startGame();
