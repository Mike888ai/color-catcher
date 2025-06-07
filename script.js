const bucket = document.getElementById("bucket");
const scoreDisplay = document.getElementById("score");
const gameOverText = document.getElementById("gameOver");

const popSound = document.getElementById("popSound");
const missSound = document.getElementById("missSound");
const gameOverSound = document.getElementById("gameOverSound");

let score = 0;
let missed = 0;

// Move bucket
document.addEventListener("keydown", e => {
  let left = parseInt(window.getComputedStyle(bucket).getPropertyValue("left"));
  if (e.key === "ArrowLeft" && left > 0) {
    bucket.style.left = left - 30 + "px";
  } else if (e.key === "ArrowRight" && left < window.innerWidth - 100) {
    bucket.style.left = left + 30 + "px";
  }
});

// Create falling circles
function createCircle() {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.style.left = Math.floor(Math.random() * (window.innerWidth - 30)) + "px";
  circle.style.background = \`hsl(\${Math.random() * 360}, 100%, 50%)\`;
  document.getElementById("game").appendChild(circle);

  let fallInterval = setInterval(() => {
    let top = parseInt(circle.style.top || 0);
    if (top > window.innerHeight - 60) {
      let bucketLeft = parseInt(window.getComputedStyle(bucket).getPropertyValue("left"));
      let circleLeft = parseInt(circle.style.left);
      if (circleLeft > bucketLeft - 30 && circleLeft < bucketLeft + 100) {
        score++;
        scoreDisplay.textContent = \`Score: \${score}\`;
        popSound.currentTime = 0;
        popSound.play();
      } else {
        missed++;
        missSound.currentTime = 0;
        missSound.play();
        if (missed >= 5) {
          gameOverText.style.display = "block";
          gameOverSound.play();
          clearInterval(gameLoop);
        }
      }
      circle.remove();
      clearInterval(fallInterval);
    } else {
      circle.style.top = top + 5 + "px";
    }
  }, 30);
}

let gameLoop = setInterval(createCircle, 800);
