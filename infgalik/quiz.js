const questions = [
    {
        question: "Kto stworzył Linuxa?",
        answers: ["Bill Gates", "Linus Torvalds", "Steve Jobs", "Mark Zuckerberg"],
        correct: 1
    },
    {
        question: "W którym roku powstał Linux?",
        answers: ["1985", "1991", "2001", "1999"],
        correct: 1
    },
    {
        question: "Który system dominuje na komputerach osobistych?",
        answers: ["Linux", "Windows", "macOS", "Unix"],
        correct: 1
    },
    {
        question: "Co jest sercem systemu operacyjnego?",
        answers: ["BIOS", "RAM", "Kernel", "Dysk"],
        correct: 2
    },
    {
        question: "Na czym bazuje Android?",
        answers: ["Windows", "Linux", "macOS", "DOS"],
        correct: 1
    },
    {
        question: "Który system jest otwartoźródłowy?",
        answers: ["Windows", "Linux", "macOS", "iOS"],
        correct: 1
    },
    {
        question: "Który system stworzyło Apple?",
        answers: ["Ubuntu", "Fedora", "macOS", "Debian"],
        correct: 2
    },
    {
        question: "Co oznacza GUI?",
        answers: [
            "Graficzny interfejs użytkownika",
            "Global User Internet",
            "General Utility Interface",
            "Graphic Unit Input"
        ],
        correct: 0
    },
    {
        question: "Który system jest najczęściej używany na serwerach?",
        answers: ["Windows XP", "Linux", "DOS", "Windows 7"],
        correct: 1
    },
    {
        question: "Który system bazuje na UNIX?",
        answers: ["macOS", "Windows", "MS-DOS", "Android tylko"],
        correct: 0
    }
];

// ===== STATE =====
let current = 0;
let score = 0;
let selected = null;

// ===== ELEMENTS =====
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progress");
const questionNumber = document.getElementById("questionNumber");
const resultBox = document.getElementById("result");

// ===== START =====
loadQuestion();

// ===== LOAD QUESTION =====
function loadQuestion() {

    selected = null;
    nextBtn.style.display = "none";

    const q = questions[current];

    questionNumber.innerText = `Pytanie ${current + 1} / ${questions.length}`;
    questionEl.innerText = q.question;

    answersEl.innerHTML = "";

    q.answers.forEach((ans, index) => {

        const btn = document.createElement("button");
        btn.classList.add("answer-btn");
        btn.innerText = ans;

        btn.addEventListener("click", () => {

            document.querySelectorAll(".answer-btn")
                .forEach(b => b.classList.remove("selected"));

            btn.classList.add("selected");

            selected = index;

            nextBtn.style.display = "block";
        });

        answersEl.appendChild(btn);
    });

    updateProgress();
}

// ===== NEXT =====
nextBtn.addEventListener("click", () => {

    if (selected === questions[current].correct) {
        score++;
    }

    current++;

    if (current < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

// ===== PROGRESS =====
function updateProgress() {

    const percent = ((current + 1) / questions.length) * 100;
    progress.style.width = percent + "%";
}

// ===== RESULT =====
function showResult() {

    const percent = Math.round((score / questions.length) * 100);

    let level = "";

    if (score === 10) level = "Ekspert";
    else if (score >= 8) level = "Zaawansowany";
    else if (score >= 5) level = "Średni";
    else level = "Początkujący";

    document.querySelector(".quiz-container").innerHTML = `
        <div class="result-box">
            <h2>Wynik końcowy</h2>
            <p><strong>Wynik:</strong> ${score} / ${questions.length}</p>
            <p><strong>Procent:</strong> ${percent}%</p>
            <p><strong>Poziom:</strong> ${level}</p>
            <button onclick="location.reload()" class="quiz-btn">Spróbuj ponownie</button>
        </div>
    `;
}