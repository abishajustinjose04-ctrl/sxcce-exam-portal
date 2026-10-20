
const user = getUser();

if (!user || user.role !== "STUDENT") {
    window.location.href = "/login.html";
} else {
    document.getElementById("studentName").textContent =
        "Welcome, " + user.name;

    loadExams();
}

document.getElementById("logoutButton").addEventListener("click", logout);

async function loadExams() {
    const examList = document.getElementById("examList");

    try {
        const exams = await apiGet("/api/exams");
        examList.replaceChildren();

        if (exams.length === 0) {
            examList.textContent = "No exams are available yet.";
            return;
        }

        exams.forEach(exam => {
            const card = document.createElement("section");
            const title = document.createElement("h3");
            const duration = document.createElement("p");
            const button = document.createElement("button");

            title.textContent = exam.title;
            duration.textContent =
                "Duration: " + exam.durationMinutes + " minutes";
            button.textContent = "Start Exam";

            button.addEventListener("click", () => {
                localStorage.setItem("currentExamId", exam.id);
                window.location.href = "/exam.html";
            });

            card.append(title, duration, button);
            examList.appendChild(card);
        });
    } catch (error) {
        examList.textContent = "Could not load exams: " + error.message;
    }
}
