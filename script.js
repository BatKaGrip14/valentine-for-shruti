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

let line = 0;
let char = 0;
let misses = 0;
let stage = "intro";

mainBtn.style.display = "none";
heartBtn.style.display = "none";
question.style.display = "none";

/* TYPEWRITER */
function typeLine(callback) {
  text.innerHTML = "";
  char = 0;

  function type() {
    if (char < lines[line].length) {
      text.innerHTML += lines[line][char++];
      setTimeout(type, 70);
    } else if (callback) {
      callback();
    }
  }
  type();
}

typeLine(() => mainBtn.style.display = "inline-block");

/* START */
mainBtn.onclick = () => {
  music.currentTime = 0;
  music.play().catch(() => {
    console.log("Audio blocked until user interaction");
  });

  mainBtn.style.display = "none";
  stage = "story";
  nextLine();
};


/* STORY */
function nextLine() {
  line++;
  if (line < lines.length) {
    typeLine(() => {
      if (line === lines.length - 1) {
        startHeartGame();
      } else {
        setTimeout(nextLine, 1500);
      }
    });
  }
}

/* HEART GAME */
function startHeartGame() {
  stage = "heart";
  heartBtn.style.display = "inline-block";
  moveHeart();
}

function moveHeart() {
  const container = document.querySelector(".container");
  const maxX = container.offsetWidth - heartBtn.offsetWidth;
  const maxY = container.offsetHeight - heartBtn.offsetHeight;

  heartBtn.style.left = Math.random() * maxX + "px";
  heartBtn.style.top = Math.random() * maxY + "px";
}

heartBtn.onclick = () => {
  if (stage !== "heart") return;

  misses++;
  tease.innerText = teases[Math.min(misses - 1, teases.length - 1)];

  if (misses < 5) {
    moveHeart();
  } else {
    heartBtn.style.display = "none";
    tease.innerText = "";
    text.innerHTML = "Alright… I cheated 😌<br>I wanted to ask you something.";
    setTimeout(showQuestion, 2000);
  }
};

/* QUESTION */
function showQuestion() {
  text.innerHTML = "";
  question.style.display = "block";
}

/* NO = IMPOSSIBLE */
noBtn.onmouseover = noBtn.onclick = () => {
  noBtn.style.position = "absolute";
  noBtn.style.left = Math.random() * 80 + "%";
  noBtn.style.top = Math.random() * 80 + "%";
};

/* YES = BETTER ENDING */
yesBtn.onclick = () => {
  question.innerHTML = `
    <h2>Yayyy 💖</h2>
    <p>
      You just made my Valentine perfect.<br>
      I owe you chocolates, smiles, and bad jokes 😌
    </p>
    <p style="margin-top:15px;">
      See you on Valentine’s Day, Shruti 🌹
    </p>
  `;
};

