
const examUser = getUser();
const examId = localStorage.getItem("currentExamId");
const questionContainer = document.getElementById("questions");
const timerDisplay = document.getElementById("timer");
const examForm = document.getElementById("examForm");
const submitButton = document.getElementById("submitButton");

let questions = [];
let remainingSeconds = 0;
let timerInterval = null;
let submitted = false;

async function startExam() {
    if (!examUser || examUser.role !== "STUDENT" || !examId) {
        window.location.href = "/login.html";
        return;
    }

    try {
        const exams = await apiGet("/api/exams");
        const exam = exams.find(item => String(item.id) === String(examId));

        if (!exam) {
            questionContainer.textContent = "Exam not found.";
            submitButton.disabled = true;
            return;
        }

        remainingSeconds = Math.max(1, Number(exam.durationMinutes) * 60);

        questions = await apiGet("/api/exams/" + examId + "/questions");

        if (questions.length === 0) {
            questionContainer.textContent = "No questions available.";
            submitButton.disabled = true;
            return;
        }

        renderQuestions();
        startTimer();
    } catch (error) {
        questionContainer.textContent =
            "Unable to load exam: " + error.message;
        submitButton.disabled = true;
    }
}

function renderQuestions() {
    questionContainer.replaceChildren();

    questions.forEach((question, index) => {
        const section = document.createElement("section");
        const heading = document.createElement("h3");

        heading.textContent =
            (index + 1) + ". " + question.questionText;
        section.appendChild(heading);

        ["A", "B", "C", "D"].forEach(letter => {
            const label = document.createElement("label");
            const radio = document.createElement("input");

            radio.type = "radio";
            radio.name = "question-" + question.id;
            radio.value = letter;

            label.append(radio, document.createTextNode(
                " " + letter + ". " + question["option" + letter]
            ));

            label.style.display = "block";
            label.style.margin = "12px 0";
            section.appendChild(label);
        });

        questionContainer.appendChild(section);
    });
}

function startTimer() {
    updateTimer();

    timerInterval = setInterval(() => {
        remainingSeconds--;
        updateTimer();

        if (remainingSeconds <= 0) {
            clearInterval(timerInterval);
            submitExam();
        }
    }, 1000);
}

function updateTimer() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    timerDisplay.textContent =
        minutes + ":" + String(seconds).padStart(2, "0");
}

examForm.addEventListener("submit", event => {
    event.preventDefault();
    submitExam();
});

async function submitExam() {
    if (submitted) return;

    submitted = true;
    submitButton.disabled = true;

    if (timerInterval) clearInterval(timerInterval);

    const answers = {};

    questions.forEach(question => {
        const selected = document.querySelector(
            'input[name="question-' + question.id + '"]:checked'
        );

        if (selected) {
            answers[String(question.id)] = selected.value;
        }
    });

    try {
        const result = await apiPost(
            "/api/results/submit/" + examId,
            {
                userId: examUser.id,
                answers,
                tabSwitches: getTabSwitchCount()
            }
        );

        sessionStorage.setItem("lastExamResult", JSON.stringify(result));
        window.location.href = "/result.html";
    } catch (error) {
        submitted = false;
        submitButton.disabled = false;
        alert("Could not submit exam: " + error.message);
    }
}

startExam();
