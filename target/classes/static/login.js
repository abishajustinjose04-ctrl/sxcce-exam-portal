
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        loginMessage.textContent = "Signing in...";

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                loginMessage.textContent =
                    data.message || "Login failed. Check your credentials.";
                return;
            }

            if (!data.role || !data.id) {
                loginMessage.textContent =
                    "Login response is missing the user ID or role.";
                return;
            }

            const role = String(data.role).toUpperCase();

            if (role !== "ADMIN" && role !== "STUDENT") {
                loginMessage.textContent = "Unknown account role.";
                return;
            }

            localStorage.setItem("user", JSON.stringify(data));

            if (role === "ADMIN") {
                window.location.href = "/admin-dashboard.html";
            } else {
                window.location.href = "/student-dashboard.html";
            }
        } catch (error) {
            console.error("Login error:", error);
            loginMessage.textContent =
                "Cannot connect to the server. Check that Spring Boot is running.";
        }
    });
}
