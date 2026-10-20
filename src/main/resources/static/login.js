
const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    message.textContent = "Checking login...";

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    try {
        const user = await apiPost("/api/login", {
            username,
            password
        });

        saveUser(user);

        if (user.role === "ADMIN") {
            message.textContent = "Admin login successful.";
            window.location.href = "/admin-dashboard.html";
        } else {
            window.location.href = "/student-dashboard.html";
        }
    } catch (error) {
        message.textContent = error.message;
    }
});
