
const resultsList = document.getElementById("resultsList");
const resultsMessage = document.getElementById("resultsMessage");

if (checkLogin("ADMIN")) {
    document.getElementById("logoutButton")
        .addEventListener("click", logout);

    document.getElementById("refreshButton")
        .addEventListener("click", loadResults);

    loadResults();
}

async function loadResults() {
    resultsList.replaceChildren();
    resultsMessage.textContent = "Loading results...";

    try {
        const results = await apiGet("/api/results");

        if (!Array.isArray(results) || results.length === 0) {
            resultsMessage.textContent = "No student results available yet.";
            return;
        }

        resultsMessage.textContent =
            "Total submissions: " + results.length;

        const table = document.createElement("table");
        table.style.width = "100%";

        const header = document.createElement("tr");

        ["Result ID", "Student ID", "Exam ID", "Score", "Tab Switches"]
            .forEach(text => {
                const th = document.createElement("th");
                th.textContent = text;
                th.style.padding = "8px";
                header.appendChild(th);
            });

        table.appendChild(header);

        results.forEach(result => {
            const row = document.createElement("tr");

            const values = [
                result.id ?? "—",
                result.userId ?? result.user_id ?? "—",
                result.examId ?? result.exam_id ?? "—",
                result.score ?? "—",
                result.tabSwitches ?? result.tab_switches ?? "—"
            ];

            values.forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = String(value);
                cell.style.padding = "8px";
                row.appendChild(cell);
            });

            table.appendChild(row);
        });

        resultsList.appendChild(table);
    } catch (error) {
        resultsMessage.textContent =
            "Could not load results: " + error.message;
    }
}
