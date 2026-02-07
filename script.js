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
function typeLine() {
  if (charIndex < lines[lineIndex].length) {
    text.innerHTML += lines[lineIndex][charIndex++];
    setTimeout(typeLine, 70);
  } else {
    if (stage === "intro") mainBtn.style.display = "inline-block";
  }
}

typeLine();

/* ---------- MAIN BUTTON ---------- */
mainBtn.onclick = () => {
  music.play();
  mainBtn.style.display = "none";
  stage = "story";
  nextLine();
};

/* ---------- STORY ---------- */
function nextLine() {
  lineIndex++;
  charIndex = 0;
  text.innerHTML = "";

  if (lineIndex < lines.length) {
    typeLine();

    if (lineIndex === lines.length - 1) {
      setTimeout(startHeartGame, 1200);
    } else {
      setTimeout(nextLine, 2000);
    }
  }
}

/* ---------- HEART GAME ---------- */
function startHeartGame() {
  stage = "heart";
  heartBtn.style.display = "inline-block";
  moveHeart();
}

function moveHeart() {
  heartBtn.style.position = "absolute";
  heartBtn.style.left = Math.random() * 80 + "%";
  heartBtn.style.top = Math.random() * 80 + "%";
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

  text.innerHTML = "Alright… I cheated 😌<br>I wanted to ask you something.";

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
  question.innerHTML = "<h2>You just made my Valentine perfect 💖</h2>";
  startConfetti();
};

/* ---------- CONFETTI ---------- */
function startConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 4 + 2
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "hotpink";

    pieces.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.y += p.d;
      if (p.y > canvas.height) p.y = 0;
    });

    requestAnimationFrame(draw);
  }

  draw();
}
