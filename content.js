// List of common couple-related words and slang used on social media (Removed food-related words)
const BLOCKED_WORDS = [
  "babe", "baby", "love", "honey", "sweetheart", "darling", "lovebug", "bae", "boo", "cutie", 
  "sweetie", "lover", "dear", "angel", "snuggle", "sugar", "sweetums", "pookie", 
  "cuddlebug", "handsome", "gorgeous", "hot stuff", "dreamboat", "mi amor", "mon amour", 
  "amore", "mi vida", "mi corazón", "beloved", "prince", "princess", "king", "queen", 
  "heartthrob", "main squeeze", "other half", "better half", "significant other", 
  "soulmate", "doll", "treasure", "snookums", "honeybun", "kitten", "tiger", 
  "stud muffin", "lovebird", "happy" //testing purpose 
];

// Function to blur ONLY images in posts that contain blocked words
function blurTargetedImages(shouldBlur) {
  document.querySelectorAll("article").forEach((post) => {
    const text = post.innerText.toLowerCase();
    
    if (BLOCKED_WORDS.some((word) => text.includes(word))) {
      post.querySelectorAll("img").forEach((img) => {
        img.style.filter = shouldBlur ? "blur(10px)" : "none"; // Blur/unblur based on state
      });

      // Check if buttons already exist to avoid duplicates
      if (!post.querySelector(".unblur-button")) {
        let button = document.createElement("button");
        button.innerText = "Show Content";
        button.className = "unblur-button";
        button.style.position = "absolute";
        button.style.top = "10px";
        button.style.left = "10px";
        button.style.zIndex = "1000";
        button.style.padding = "5px 10px";
        button.style.background = "rgba(0, 0, 0, 0.6)";
        button.style.color = "white";
        button.style.border = "none";
        button.style.cursor = "pointer";

        let blurButton = document.createElement("button");
        blurButton.innerText = "Blur It Back";
        blurButton.className = "blur-back-button";
        blurButton.style.position = "absolute";
        blurButton.style.top = "40px";
        blurButton.style.left = "10px";
        blurButton.style.zIndex = "1000";
        blurButton.style.padding = "5px 10px";
        blurButton.style.background = "rgba(255, 0, 0, 0.7)";
        blurButton.style.color = "white";
        blurButton.style.border = "none";
        blurButton.style.cursor = "pointer";
        blurButton.style.display = "none"; // Hidden until "Show Content" is clicked

        button.addEventListener("click", () => {
          post.querySelectorAll("img").forEach((img) => {
            img.style.filter = "none"; // Unblur
          });
          button.style.display = "none"; // Hide "Show Content"
          blurButton.style.display = "block"; // Show "Blur It Back"
        });

        blurButton.addEventListener("click", () => {
          post.querySelectorAll("img").forEach((img) => {
            img.style.filter = "blur(10px)"; // Blur it again
          });
          blurButton.style.display = "none"; // Hide "Blur It Back"
          button.style.display = "block"; // Show "Show Content"
        });

        post.style.position = "relative";
        post.appendChild(button);
        post.appendChild(blurButton);
      }
    }
  });
}

// Listen for filter toggle and apply changes immediately
chrome.storage.sync.get("filterEnabled", (data) => {
  blurTargetedImages(data.filterEnabled);
});

// Detect changes to filter setting and update content instantly
chrome.storage.onChanged.addListener((changes) => {
  if (changes.filterEnabled) {
    blurTargetedImages(changes.filterEnabled.newValue);
  }
});