/* =========================
   TOOLNEST AI
   MAIN JAVASCRIPT
========================= */


/* =========================
   THEME
========================= */

function applySavedTheme() {
  const savedTheme = localStorage.getItem("toolnest-theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  updateThemeIcon();
}


function toggleTheme() {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");

  localStorage.setItem(
    "toolnest-theme",
    isDark ? "dark" : "light"
  );

  updateThemeIcon();
}


function updateThemeIcon() {
  const button = document.getElementById("themeToggle");

  if (!button) return;

  const isDark = document.body.classList.contains("dark");

  button.textContent = isDark ? "☀️" : "🌙";
}


/* =========================
   MOBILE MENU
========================= */

function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");

  if (!menu) return;

  menu.classList.toggle("open");
}


function closeMobileMenu() {
  const menu = document.getElementById("mobileMenu");

  if (!menu) return;

  menu.classList.remove("open");
}


/* =========================
   ONE BOX
========================= */

function useSuggestion(text) {
  const input = document.getElementById("oneBoxInput");

  if (!input) return;

  input.value = text;

  input.focus();
}


function focusOneBox() {
  const input = document.getElementById("oneBoxInput");

  if (!input) return;

  window.scrollTo({
    top: document.querySelector(".hero").offsetTop - 70,
    behavior: "smooth"
  });

  setTimeout(() => {
    input.focus();
  }, 500);
}


function handleOneBox() {

  const input = document.getElementById("oneBoxInput");
  const result = document.getElementById("oneBoxResult");

  if (!input || !result) return;

  const task = input.value.trim();

  if (!task) {

    result.innerHTML = `
      <strong>Tell me what you need.</strong><br>
      <span>For example: "Write a professional email to my boss."</span>
    `;

    result.classList.add("show");

    return;
  }


  const lowerTask = task.toLowerCase();

  let toolName = "ToolNest Assistant";
  let icon = "✦";
  let description =
    "Your request looks like something ToolNest can help you with.";


  /* EMAIL */

  if (
    lowerTask.includes("email") ||
    lowerTask.includes("mail") ||
    lowerTask.includes("boss")
  ) {

    toolName = "Email Writer";
    icon = "📧";

    description =
      "Turn your idea into a clear and professional email.";

  }


  /* SUMMARY */

  else if (
    lowerTask.includes("summarize") ||
    lowerTask.includes("summary") ||
    lowerTask.includes("shorten")
  ) {

    toolName = "Text Summarizer";
    icon = "📝";

    description =
      "Turn long text into a shorter, easier-to-read summary.";

  }


  /* CAPTION */

  else if (
    lowerTask.includes("caption") ||
    lowerTask.includes("instagram") ||
    lowerTask.includes("facebook post")
  ) {

    toolName = "Caption Generator";
    icon = "✍️";

    description =
      "Create an engaging social media caption from your idea.";

  }


  /* VIDEO */

  else if (
    lowerTask.includes("video") ||
    lowerTask.includes("hook") ||
    lowerTask.includes("youtube")
  ) {

    toolName = "Video Hook Generator";
    icon = "🎬";

    description =
      "Create stronger opening hooks for your videos.";

  }


  /* BUSINESS */

  else if (
    lowerTask.includes("business name") ||
    lowerTask.includes("company name") ||
    lowerTask.includes("brand name")
  ) {

    toolName = "Business Name Generator";
    icon = "💼";

    description =
      "Generate fresh naming directions for your business.";

  }


  /* SOCIAL */

  else if (
    lowerTask.includes("social media") ||
    lowerTask.includes("social post") ||
    lowerTask.includes("post idea")
  ) {

    toolName = "Social Post Generator";
    icon = "📱";

    description =
      "Create social media content ideas faster.";

  }


  result.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;">
      <div style="
        width:38px;
        height:38px;
        border-radius:10px;
        display:grid;
        place-items:center;
        background:var(--accent-soft);
        font-size:19px;
      ">
        ${icon}
      </div>

      <div>
        <strong>${toolName}</strong>

        <div style="
          margin-top:3px;
          color:var(--text-soft);
          font-size:12px;
        ">
          ${description}
        </div>
      </div>
    </div>

    <div style="
      margin-top:13px;
      padding-top:12px;
      border-top:1px solid var(--border);
      color:var(--text-soft);
      font-size:12px;
    ">
      Your request: "${escapeHTML(task)}"
    </div>
  `;

  result.classList.add("show");
}


/* =========================
   SECURITY HELPER
========================= */

function escapeHTML(text) {

  const div = document.createElement("div");

  div.textContent = text;

  return div.innerHTML;
}


/* =========================
   COMING SOON
========================= */

function showComingSoon() {

  alert(
    "ToolNest Pro is coming soon. Free tools will remain available."
  );

}


/* =========================
   KEYBOARD SHORTCUT
========================= */

document.addEventListener("keydown", function(event) {

  if (
    (event.ctrlKey || event.metaKey) &&
    event.key === "k"
  ) {

    event.preventDefault();

    focusOneBox();

  }

});


/* =========================
   CLOSE MOBILE MENU
   WHEN CLICKING OUTSIDE
========================= */

document.addEventListener("click", function(event) {

  const menu = document.getElementById("mobileMenu");
  const button = document.querySelector(".mobile-menu-btn");

  if (!menu || !button) return;

  if (
    menu.classList.contains("open") &&
    !menu.contains(event.target) &&
    !button.contains(event.target)
  ) {

    closeMobileMenu();

  }

});


/* =========================
   START
========================= */

document.addEventListener("DOMContentLoaded", function() {

  applySavedTheme();

});
