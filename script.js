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

let line = 0, char = 0, misses = 0;

mainBtn.style.display = "none";
heartBtn.style.display = "none";

function typeText() {
  if (char < lines[line].length) {
    text.innerHTML += lines[line][char++];
    setTimeout(typeText, 70);
  } else {
    mainBtn.style.display = "inline-block";
  }
}

typeText();

mainBtn.onclick = () => {
  music.play();
  mainBtn.style.display = "none";

  const interval = setInterval(() => {
    nextLine();

    if (line >= lines.length - 1) {
      clearInterval(interval);
    }
  }, 2000);
};


function nextLine() {
  line++;
  char = 0;
  text.innerHTML = "";
  typeText();

  if (line === 3) {
    setTimeout(() => {
      heartBtn.style.display = "inline-block";
      moveHeart();
    }, 600);
  }
}

function moveHeart() {
  heartBtn.style.left = Math.random() * (window.innerWidth - 80) + "px";
  heartBtn.style.top = Math.random() * (window.innerHeight - 80) + "px";
}

heartBtn.onmouseover = () => {
  misses++;
  tease.innerText = teases[Math.min(misses - 1, teases.length - 1)];
  moveHeart();

  if (misses >= 5) {
    heartBtn.style.display = "none";
    tease.innerText = "";
    setTimeout(showQuestion, 800);
  }
};

function showQuestion() {
  text.innerHTML = "";
  question.style.display = "block";
}

noBtn.onmouseover = () => {
  noBtn.style.position = "absolute";
  noBtn.style.left = Math.random() * (window.innerWidth - 100) + "px";
  noBtn.style.top = Math.random() * (window.innerHeight - 100) + "px";
};

yesBtn.onclick = () => {
  question.innerHTML = "<h2>You just made my Valentine perfect 💖</h2>";
  startConfetti();
};

function startConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 5 + 1
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

