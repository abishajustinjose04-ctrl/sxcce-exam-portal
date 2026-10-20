
const API_BASE_URL = "";

function saveUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
}

function getUser() {
    try {
        return JSON.parse(localStorage.getItem("user"));
    } catch {
        return null;
    }
}

function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("currentExamId");
    localStorage.removeItem("examStartTime");
    localStorage.removeItem("tabSwitchCount");
    window.location.href = "/login.html";
}

async function apiGet(url) {
    const response = await fetch(API_BASE_URL + url);

    if (!response.ok) {
        throw new Error("Request failed: " + response.status);
    }

    return response.json();
}

async function apiPost(url, body) {
    const response = await fetch(API_BASE_URL + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || "Request failed: " + response.status);
    }

    return data;
}

function checkLogin(role) {
    const user = getUser();

    if (!user || (role && user.role !== role)) {
        window.location.href = "/login.html";
        return false;
    }

    return true;
}
