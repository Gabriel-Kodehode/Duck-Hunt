const duck = document.getElementById("duck");
const StartScreen = document.getElementById("StartScreen");
const Dog = document.getElementById("Dog");
const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score-display");

let score = 0;
let movingUp = false; // Flag to track whether the duck is moving
let moveInterval = null; // Interval for duck's upward movement
let bottomPosition = 0; // Start at the bottom
let struk = false;
let id = null;
let up = true;
let rounds = 0;
let count = 0;
let lifeCount = 0;
let failed = 0;

// Set initial position of the duck at the bottom
function initializeDuck() {
  const gameAreaWidth = gameArea.clientWidth;
  const randomX = Math.random() * (gameAreaWidth - 60); // 60 is the width of the duck
  duck.style.left = `${randomX}px`;
  duck.style.bottom = `0px`; // Set the duck to the bottom of the game area
  duck.style.backgroundImage = "url(./Image/Duck.webp)";
  Fly();
}

// Function to animate the duck upwards
function moveDuckUp() {
  // If the duck is already moving, prevent starting a new movement
  if (movingUp) return;

  movingUp = true; // Set movingUp to true to indicate that the duck is in motion

  // Clear any previous movement interval to prevent conflicts
  if (moveInterval) {
    clearInterval(moveInterval);
  }

  // Start the interval for upward movement
  moveInterval = setInterval(() => {
    bottomPosition += (Math.random() * score) / 700 + 1;
    duck.style.bottom = `${bottomPosition}px`;
    // Stop the animation when the duck reaches the top
    if (bottomPosition >= gameArea.clientHeight - 50) {
      changeImage();
      reload();
      if (score <= 0) {
        score = 0;
      }

      function changeImage() {
        let img = document.getElementById("dynamicImage"); // Get the image by ID
        if (img) {
          const audio = new Audio("sounds/DogLaugh.mp3");
          audio.play();
          img.id = "RedDuckImage";
          img.src = "./Image/RedDuck.png";
        } else {
          Fail();
        }
      }
      scoreDisplay.innerHTML = `${score} <br> Score`;
      clearInterval(moveInterval); // Stop the upward movement
      movingUp = false; // Reset the flag to allow movement again
      bottomPosition = 0;

      // Reinitialize the duck position after reaching the top
      initializeDuck();

      // After resetting, start the movement again
      if (failed !== 1) {
        moveDuckUp();
      }
    }
  }, 20); // Update every 20ms
}

function Fly() {
  if (struk === false) {
    duck.style.backgroundImage = "url(./Image/Duck.webp)";
    setTimeout(Float, 150);
  }
}

function Float() {
  if (struk === false) {
    duck.style.backgroundImage = "url(./Image/DuckGlide.png)";
    setTimeout(Glide, 150);
  }
}

function Glide() {
  if (struk === false) {
    duck.style.backgroundImage = "url(./Image/DuckFly.png)";
    setTimeout(Fly, 150);
  }
}

function moveDuckDown() {
  duck.style.backgroundImage = "url(./Image/DuckFall.png)";
  moveInterval = setInterval(() => {
    bottomPosition -= (Math.random() * score) / 700 + 1;
    duck.style.bottom = `${bottomPosition}px`;
    if (bottomPosition <= 0) {
      struk = false;
      reload();
      initializeDuck();
      moveDuckUp();
      if (count === 5) {
        count = 0;

        if (lifeCount !== 15) {
          lifeCount++;
          up = true;
          Laugh();
        }
      }
    }
  }, 20); // Update every 20ms
}

// Function to update the score
function increaseScore() {
  count++;
  console.log(count);

  // if (count === 5) {
  //   count = 0;

  //   if (lifeCount !== 15) {
  //     lifeCount++;
  //     up = true;
  //     Laugh();
  //   }
  // }
  setTimeout(moveDuckDown, 500);
  // initializeDuck(); // Reinitialize position at the bottom
  // moveDuckUp();
}

function Laugh() {
  const Life = document.getElementById("Hit");
  for (let i = 0; i < 1; i++) {
    let img = document.createElement("img");
    img.src = "./Image/WhiteDuck.png";
    img.id = "dynamicImage";
    Life.appendChild(img);
  }

  let pos = 0;
  clearInterval(id);
  id = setInterval(frame, 10);
  Dog.style.left = `${Math.random() * (gameArea.clientWidth - 60)}px`;
  const audio = new Audio("sounds/Dog.mp3");
  audio.volume = 0.3;
  audio.play();
  function frame() {
    if ((pos !== 50) & (up === true)) {
      pos++;
      Dog.style.bottom = pos + "px";
    } else if ((up === false) & (pos !== -20)) {
      pos--;
      Dog.style.bottom = pos + "px";
    }
    if (pos == 50) {
      up = false;
    }
  }
}

const shots = document.getElementById("Ammo");
for (let i = 0; i < 3; i++) {
  let img = document.createElement("img");
  img.src = "./Image/Bullet.png";
  img.id = "Bullets";
  rounds++;
  shots.appendChild(img);
}

function reload() {
  if (rounds < 3) {
    rounds++;
    let img = document.createElement("img");
    img.src = "./Image/Bullet.png";
    img.id = "Bullets";
    shots.appendChild(img);
    reload();
  }
}

// Add event listener to the duck for when it is clicked
duck.addEventListener("click", () => {
  if (rounds !== 0 && struk === false) {
    struk = true;
    console.log(struk);
    score += 350;
    scoreDisplay.innerHTML = `${score} <br> Score`;
    duck.style.backgroundImage = "url(./Image/DuckHit.png)";
    movingUp = false;
    if (moveInterval) {
      clearInterval(moveInterval);
    }
    setTimeout(increaseScore, 500);

    // increaseScore(); // Increment the score on click
    // Start the upward movement if the duck isn't already moving
  }

  // Laugh();
  // up = true;
  // if (!movingUp) {
  //   moveDuckUp();
  // }
});

gameArea.addEventListener("click", () => {
  const imgToRemove = document.getElementById("Bullets");
  if (imgToRemove) {
    const Zapper = new Audio("sounds/Zapper.mp3");
    Zapper.play();
    imgToRemove.remove();
    console.log("music");
    rounds--;
    console.log(rounds);
  }
});

const container = document.getElementById("image-container");
for (let i = 0; i < 20; i++) {
  let img = document.createElement("img");
  img.src = "./Image/Grass.png";
  container.appendChild(img);
}

const Theme = new Audio("sounds/Retro Beyond.mp3");

function Play() {
  // Initialize the game on start
  Theme.play();
  Theme.volume = 0.3;
  moveDuckUp(); // Start the upward movement after initialization
  StartScreen.style.display = "none";
  failed = 0;
  score = 0;
  lifeCount = 0;
  count = 0;
  const Life = document.getElementById("Hit");
  Life.innerHTML = "";
  scoreDisplay.innerHTML = `${score} <br> Score`;
}

function Fail() {
  Theme.pause();
  Theme.currentTime = 0;
  const audio = new Audio("sounds/DogLaugh.mp3");
  audio.play();
  StartScreen.style.display = "";
  movingUp = false;
  failed = 1;
}

initializeDuck();
