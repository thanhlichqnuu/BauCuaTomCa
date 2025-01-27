const resultContainer = document.querySelector(".result-container");
const resultItem = document.querySelector(".result-item");
const items = document.querySelectorAll(".items");
const btnAction = document.querySelector(".btn-action");
const volume = document.getElementById("volume");
const music = document.getElementById("music");
const effectAudio = document.getElementById("effect-audio");
const happyText = document.querySelector(".happy-text");
const title = document.querySelector(".title");
let isOpen = false;
let isAnimating = false;
const itemList = [
  "/images/nai.png",
  "/images/bau.png",
  "/images/ga.png",
  "/images/ca.png",
  "/images/cua.png",
  "/images/tom.png",
];

const handleToggleAudio = () => {
  volume.addEventListener("click", function () {
    if (music.paused) {
      music.play();
      volume.src = "/images/volume.png";
    } else {
      music.pause();
      volume.src = "/images/mute.png";
    }
  });
};

const handleOpenPlate = () => {
  btnAction.addEventListener("click", () => {
    if (isAnimating) return;

    if (isOpen === true) {
      resultContainer.style.backgroundImage = "url('/images/diamo.png')";
      const diaMoImg = new Image();
      diaMoImg.src = "/images/diamo.png";

      diaMoImg.onload = () => {
        const newItemList = [];
        const newItemListLength = 3;

        for (let i = 0; i < newItemListLength; i++) {
          const randomIndex = Math.floor(Math.random() * itemList.length);
          newItemList.push(itemList[randomIndex]);
        }
        const newItemListHTML = newItemList.map((item) => {
          return `<img src="${item}">`;
        });
        resultItem.innerHTML = newItemListHTML.join("");
      };

      isOpen = false;
      btnAction.textContent = "Xóc dĩa";
      btnAction.classList.remove("btn-open");
      btnAction.classList.add("btn-close");
    } else {
      resultContainer.style.backgroundImage = "url('/images/diaup.png')";
      resultItem.innerHTML = "";
      resultContainer.classList.add("turnPlateAnimation");
      effectAudio.play();
      isAnimating = true;

      setTimeout(() => {
        resultContainer.classList.remove("turnPlateAnimation");
        isAnimating = false;
        isOpen = true;
        btnAction.textContent = "Mở dĩa";
        btnAction.classList.remove("btn-close");
        btnAction.classList.add("btn-open");
      }, 2000);  
    }
  });
};

const setCurrentYear = () => {
  const currentYear = new Date().getFullYear();
  happyText.innerHTML = `Happy New Year ${currentYear}`;
  title.innerHTML = `Bầu cua tôm cá ${currentYear}`;
};

const startGame = () => {
  setCurrentYear();
  handleOpenPlate();
  handleToggleAudio();
};

startGame();
