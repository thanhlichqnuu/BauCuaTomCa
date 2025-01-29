const resultContainer = document.querySelector(".result-container");
const resultItem = document.querySelector(".result-item");
const volume = document.getElementById("volume");
const music = document.getElementById("music");
const effectAudio = document.getElementById("effect-audio");
const happyText = document.querySelector(".happy-text");
const title = document.querySelector(".title");
let isOpen = false;
let isAnimating = false;
let isShaking = false;

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
    volume.src = music.paused ? "/images/mute.png" : "/images/volume.png";
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

const openPlate = () => {
  resultContainer.style.backgroundImage = "url('/images/dia_mo.png')";
  const diaMoImg = new Image();
  diaMoImg.src = "/images/dia_mo.png";

  diaMoImg.onload = () => {
    const newItemList = [];
    const newItemListLength = 3;

    for (let i = 0; i < newItemListLength; i++) {
      const randomIndex = Math.floor(Math.random() * itemList.length);
      newItemList.push(itemList[randomIndex]);
    }
    const newItemListHTML = newItemList.map((item, index) => {
      return `<img src="${item}" class="item-${index + 1}">`;
    });
    resultItem.innerHTML = newItemListHTML.join("");
  };
  isOpen = true;
};

const handlePlate = () => {
  resultContainer.addEventListener("click", () => {
    if (isAnimating) return;

    if (!isShaking) {
      startShaking();
      isShaking = true;

      setTimeout(() => {
        stopShaking();
      }, 1500);
    } else {
      openPlate();
      isShaking = false;
    }
  });
};

const setCurrentYear = () => {
  const currentYear = new Date().getFullYear();
  happyText.innerHTML = `Happy New Year ${currentYear}`;
  title.innerHTML = `Bầu Cua Tết ${currentYear}`;
};

const startGame = () => {
  setCurrentYear();
  handlePlate()
  handleToggleAudio();
};

startGame();