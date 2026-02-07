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
let typing = false;

mainBtn.style.display = "none";
heartBtn.style.display = "none";
question.style.display = "none";

/* ---------- TYPING ENGINE ---------- */
function typeLine(callback) {
  typing = true;
  text.innerHTML = "";
  char = 0;

  function type() {
    if (char < lines[line].length) {
      text.innerHTML += lines[line][char++];
      setTimeout(type, 70);
    } else {
      typing = false;
      if (callback) callback();
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
  advanceStory();
};

/* ---------- STORY FLOW ---------- */
function advanceStory() {
  line++;

  if (line < lines.length) {
    typeLine(() => {
      if (line === lines.length - 1) {
        setTimeout(startHeartGame, 800);
      } else {
        setTimeout(advanceStory, 1200);
      }
    });
  }
}

/* ---------- HEART GAME ---------- */
function startHeartGame() {
  heartBtn.style.display = "inline-block";
  moveHeart();
}

function moveHeart() {
  heartBtn.style.left = Math.random() * (window.innerWidth - 100) + "px";
  heartBtn.style.top = Math.random() * (window.innerHeight - 100) + "px";
}

heartBtn.onclick = () => {
  misses++;
  tease.innerText = teases[Math.min(misses - 1, teases.length - 1)];

  if (misses < 5) {
    moveHeart();
  } else {
    endHeartGame();
  }
};

function endHeartGame() {
  heartBtn.style.display = "none";
  tease.innerText = "";

  setTimeout(() => {
    text.innerHTML = "Alright… I cheated 😌<br>I wanted to ask you something.";
  }, 600);

  setTimeout(showQuestion, 2200);
}

/* ---------- QUESTION ---------- */
function showQuestion() {
  text.innerHTML = "";
  question.style.display = "block";
}

/* ---------- NO BUTTON ---------- */
noBtn.onmouseover = () => {
  noBtn.style.position = "absolute";
  noBtn.style.left = Math.random() * (window.innerWidth - 120) + "px";
  noBtn.style.top = Math.random() * (window.innerHeight - 120) + "px";
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

  const pieces = Array.from({ length: 160 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 5 + 2
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
