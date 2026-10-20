
let tabSwitchCount = Number(localStorage.getItem("tabSwitchCount") || 0);

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
        tabSwitchCount++;
        localStorage.setItem("tabSwitchCount", String(tabSwitchCount));
    } else {
        const warning = document.getElementById("warning");

        if (warning) {
            warning.textContent =
                "Tab-switch events recorded: " + tabSwitchCount;
        }
    }
});

function getTabSwitchCount() {
    return tabSwitchCount;
}
