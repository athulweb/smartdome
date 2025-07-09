let currentQuestion = 0;
let score = 0;
let questions = [];

// Load JSON from /data/questions.json
fetch("data/questions.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    showQuestion();
  })
  .catch(err => {
    document.getElementById("question").innerText = "❌ Failed to load questions.";
    console.error("Error loading JSON:", err);
  });

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").innerText = `Q${currentQuestion + 1}. ${q.question}`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.className = "channel-btn";
    btn.onclick = () => checkAnswer(option);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const correct = questions[currentQuestion].answer;

  // ✅ FIX: actually check and increase the score
  if (selected.trim().toLowerCase() === correct.trim().toLowerCase()) {
    score++;
  }

  const buttons = document.querySelectorAll("#options button");

  buttons.forEach(btn => {
    btn.disabled = true;

    if (btn.innerText.trim().toLowerCase() === correct.trim().toLowerCase()) {
      btn.style.backgroundColor = "#38a169"; // green
    } else if (btn.innerText === selected) {
      btn.style.backgroundColor = "#e53e3e"; // red
    }
  });

  document.getElementById("next-btn").style.display = "inline-block";
  document.getElementById("next-btn").onclick = nextQuestion;
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
    document.getElementById("next-btn").style.display = "none";
  } else {
    showResult();
  }
}

function showResult() {
  const container = document.getElementById("quiz-container");
  const result = document.getElementById("result");

  container.style.display = "none";
  result.style.display = "block";
  result.innerHTML = `
    <h2>🎉 Quiz Completed!</h2>
    <p>You scored <strong>${score}</strong> out of <strong>${questions.length}</strong>.</p>
    <button onclick="location.reload()" class="channel-btn">🔁 Try Again</button>
  `;
}
