// List of common couple-related words and slang used on social media
const BLOCKED_WORDS = [
  "babe", "baby", "love", "honey", "sweetheart", "darling", "lovebug", "bae", "boo", "cutie", 
  "sweetie", "lover", "dear", "angel", "pumpkin", "sunshine", "snuggle", "sugar", "sweetums", 
  "pookie", "buttercup", "cuddlebug", "handsome", "gorgeous", "hot stuff", "dreamboat", 
  "mi amor", "mon amour", "amore", "mi vida", "mi corazón", "beloved", "prince", "princess", 
  "king", "queen", "heartthrob", "main squeeze", "other half", "better half", "significant other", 
  "soulmate", "peaches", "doll", "treasure", "snookums", "honeybun", "cupcake", "kitten", 
  "tiger", "stud muffin", "lovebird"
];

// Function to blur posts that contain blocked words
function blurPosts() {
  document.querySelectorAll("div").forEach((post) => {
    const text = post.innerText.toLowerCase();
    if (BLOCKED_WORDS.some((word) => text.includes(word))) {
      post.style.filter = "blur(10px)";
      post.querySelectorAll("img").forEach((img) => {
        img.style.filter = "blur(10px)";
      });

      // Add "Show Content" button if not already added
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

        button.addEventListener("click", () => {
          post.style.filter = "none";
          post.querySelectorAll("img").forEach((img) => {
            img.style.filter = "none";
          });
          button.remove(); // Remove button after unblurring
        });

        post.style.position = "relative"; // Ensure button is positioned correctly
        post.appendChild(button);
      }
    }
  });
}

// Check if filtering is enabled
chrome.storage.sync.get("filterEnabled", (data) => {
  if (data.filterEnabled) {
    setInterval(blurPosts, 3000); // Run every 3 seconds
  }
});
