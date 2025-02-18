document.getElementById("toggleFilter").addEventListener("click", () => {
  chrome.storage.sync.get("filterEnabled", (data) => {
    const newState = !data.filterEnabled;
    chrome.storage.sync.set({ filterEnabled: newState });
    document.getElementById("toggleFilter").innerText = newState ? "Disable Filter" : "Enable Filter";
  });
});

// Set button text on load
chrome.storage.sync.get("filterEnabled", (data) => {
  document.getElementById("toggleFilter").innerText = data.filterEnabled ? "Disable Filter" : "Enable Filter";
});
