
const examSelect = document.getElementById("examSelect");
const questionForm = document.getElementById("questionForm");
const questionMessage = document.getElementById("questionMessage");
const questionList = document.getElementById("questionList");

if (checkLogin("ADMIN")) {
    document.getElementById("logoutButton")
        .addEventListener("click", logout);

    questionForm.addEventListener("submit", saveQuestion);
    examSelect.addEventListener("change", loadQuestions);

    loadQuestionExams();
}

async function loadQuestionExams() {
    try {
        const exams = await apiGet("/api/exams");
        examSelect.replaceChildren();

        const placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.textContent = "Choose an exam";
        examSelect.appendChild(placeholder);

        exams.forEach(exam => {
            const option = document.createElement("option");
            option.value = exam.id;
            option.textContent = exam.title;
            examSelect.appendChild(option);
        });

        const requestedId =
            new URLSearchParams(window.location.search).get("examId");

        if (requestedId && exams.some(e => String(e.id) === requestedId)) {
            examSelect.value = requestedId;
            await loadQuestions();
        } else {
            questionList.textContent = "Choose an exam to view its questions.";
        }
    } catch (error) {
        examSelect.replaceChildren();
        questionList.textContent =
            "Could not load exams: " + error.message;
    }
}

async function saveQuestion(event) {
    event.preventDefault();

    const examId = Number(examSelect.value);
    if (!Number.isInteger(examId) || examId <= 0) {
        questionMessage.textContent = "Please select an exam first.";
        return;
    }

    const question = {
        examId,
        questionText: document.getElementById("questionText").value.trim(),
        optionA: document.getElementById("optionA").value.trim(),
        optionB: document.getElementById("optionB").value.trim(),
        optionC: document.getElementById("optionC").value.trim(),
        optionD: document.getElementById("optionD").value.trim(),
        correctOption: document.getElementById("correctOption").value
    };

    if (Object.values(question).some(value => value === "")) {
        questionMessage.textContent = "Please fill in every field.";
        return;
    }

    try {
        await apiPost("/api/questions", question);
        questionMessage.textContent = "Question saved successfully!";
        questionForm.reset();
        await loadQuestions();
    } catch (error) {
        questionMessage.textContent =
            "Could not save question: " + error.message;
    }
}

async function loadQuestions() {
    const examId = examSelect.value;

    if (!examId) {
        questionList.textContent = "Choose an exam to view its questions.";
        return;
    }

    questionList.textContent = "Loading questions...";

    try {
        const questions = await apiGet(
            "/api/admin/exams/" + encodeURIComponent(examId) + "/questions"
        );

        questionList.replaceChildren();

        if (!Array.isArray(questions) || questions.length === 0) {
            questionList.textContent = "No questions added to this exam yet.";
            return;
        }

        questions.forEach((question, index) => {
            const section = document.createElement("section");
            const heading = document.createElement("h3");
            const options = document.createElement("p");
            const answer = document.createElement("p");

            heading.textContent =
                (index + 1) + ". " + question.questionText;

            options.textContent =
                "A: " + question.optionA +
                " | B: " + question.optionB +
                " | C: " + question.optionC +
                " | D: " + question.optionD;

            answer.textContent =
                "Correct answer: " + question.correctOption;

            section.append(heading, options, answer);
            questionList.appendChild(section);
        });
    } catch (error) {
        questionList.textContent =
            "Could not load questions: " + error.message;
    }
}
