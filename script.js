const text = document.getElementById("text");
const mainBtn = document.getElementById("mainBtn");
const heartBtn = document.getElementById("heartBtn");
const tease = document.getElementById("tease");
const music = document.getElementById("bgMusic");
const question = document.getElementById("question");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const lines = [
  "Hey Shruti...",
  "I made something for you 😏",
  "Okay, small challenge.",
  "Try clicking the heart 💖"
];

const teases = [
  "Too slow 😌",
  "Almost… not really 😏",
  "You're cute when you try 💕",
  "Not happening 😎",
  "Okay okay… I give up 🙄"
];

let lineIndex = 0;
let charIndex = 0;
let misses = 0;
let stage = "intro";

mainBtn.style.display = "none";
heartBtn.style.display = "none";
question.style.display = "none";

/* ---------- TYPEWRITER ---------- */
function typeLine(callback) {
  text.innerHTML = "";
  charIndex = 0;

  function type() {
    if (charIndex < lines[lineIndex].length) {
      text.innerHTML += lines[lineIndex][charIndex++];
      setTimeout(type, 70);
    } else if (callback) {
      callback();
    }
  }
  type();
}

/* ---------- START ---------- */
typeLine(() => {
  mainBtn.style.display = "inline-block";
});

/* ---------- MAIN BUTTON ---------- */
mainBtn.onclick = () => {
  music.play();
  mainBtn.style.display = "none";
  stage = "story";
  nextLine();
};

/* ---------- STORY FLOW ---------- */
function nextLine() {
  lineIndex++;

  if (lineIndex < lines.length) {
    typeLine(() => {
      if (lineIndex === lines.length - 1) {
        startHeartGame(); // start ONCE
      } else {
        setTimeout(nextLine, 1500);
      }
    });
  }
}

/* ---------- HEART GAME ---------- */
function startHeartGame() {
  if (stage === "heart") return;

  stage = "heart";
  heartBtn.style.display = "inline-block";
  moveHeart();
}

function moveHeart() {
  const container = document.querySelector(".container");

  const maxX = container.offsetWidth - heartBtn.offsetWidth;
  const maxY = container.offsetHeight - heartBtn.offsetHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  heartBtn.style.position = "absolute";
  heartBtn.style.left = x + "px";
  heartBtn.style.top = y + "px";
}

heartBtn.onclick = () => {
  if (stage !== "heart") return;

  misses++;
  tease.innerText = teases[Math.min(misses - 1, teases.length - 1)];

  if (misses < 5) {
    moveHeart();
  } else {
    endHeartGame();
  }
};

function endHeartGame() {
  stage = "question";
  heartBtn.style.display = "none";
  tease.innerText = "";

  text.innerHTML =
    "Alright… I cheated 😌<br>I wanted to ask you something.";

  setTimeout(showQuestion, 2000);
}

/* ---------- QUESTION ---------- */
function showQuestion() {
  text.innerHTML = "";
  question.style.display = "block";
}

/* ---------- NO BUTTON ---------- */
noBtn.onmouseover = () => {
  noBtn.style.position = "absolute";
  noBtn.style.left = Math.random() * 80 + "%";
  noBtn.style.top = Math.random() * 80 + "%";
};

/* ---------- YES BUTTON ---------- */
yesBtn.onclick = () => {
  question.innerHTML =
    "<h2>You just made my Valentine perfect 💖</h2>";
};
