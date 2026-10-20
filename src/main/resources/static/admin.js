
if (!checkLogin("ADMIN")) {
    // checkLogin redirects non-admin users to login.html
} else {
    const admin = getUser();
    document.getElementById("adminName").textContent =
        "Welcome, " + (admin.name || admin.username);

    document.getElementById("logoutButton")
        .addEventListener("click", logout);

    document.getElementById("examForm")
        .addEventListener("submit", createExam);

    loadAdminExams();
}

async function createExam(event) {
    event.preventDefault();

    const message = document.getElementById("examMessage");
    const title = document.getElementById("examTitle").value.trim();
    const durationMinutes =
        Number(document.getElementById("examDuration").value);

    if (!title || !Number.isInteger(durationMinutes) ||
        durationMinutes < 1 || durationMinutes > 300) {
        message.textContent = "Enter a title and a duration from 1 to 300 minutes.";
        return;
    }

    try {
        const exam = await apiPost("/api/exams", {
            title,
            durationMinutes
        });

        message.textContent =
            "Exam created successfully: " + (exam.title || title);

        document.getElementById("examForm").reset();
        document.getElementById("examDuration").value = "10";
        await loadAdminExams();
    } catch (error) {
        message.textContent =
            "Could not create exam: " + error.message;
    }
}

async function loadAdminExams() {
    const list = document.getElementById("adminExamList");
    list.textContent = "Loading exams...";

    try {
        const exams = await apiGet("/api/exams");
        list.replaceChildren();

        if (!Array.isArray(exams) || exams.length === 0) {
            list.textContent = "No exams created yet.";
            return;
        }

        exams.forEach(exam => {
            const section = document.createElement("section");
            const heading = document.createElement("h3");
            const duration = document.createElement("p");
            const questionLink = document.createElement("a");

            heading.textContent = exam.title;
            duration.textContent =
                "Duration: " + exam.durationMinutes + " minutes";

            questionLink.href = "/admin-questions.html?examId=" +
                encodeURIComponent(exam.id);
            questionLink.textContent = "Manage Questions";

            section.append(heading, duration, questionLink);
            list.appendChild(section);
        });
    } catch (error) {
        list.textContent = "Could not load exams: " + error.message;
    }
}
