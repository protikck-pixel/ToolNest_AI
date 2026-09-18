document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     THEME
  ========================= */

  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");

  function updateThemeIcon() {
    if (!themeToggle) return;

    if (body.classList.contains("dark")) {
      themeToggle.textContent = "☀";
      themeToggle.setAttribute("aria-label", "Switch to light mode");
    } else {
      themeToggle.textContent = "☾";
      themeToggle.setAttribute("aria-label", "Switch to dark mode");
    }
  }

  const savedTheme = localStorage.getItem("toolnest-theme");

  if (savedTheme === "dark") {
    body.classList.add("dark");
  }

  updateThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {

      body.classList.toggle("dark");

      const newTheme = body.classList.contains("dark")
        ? "dark"
        : "light";

      localStorage.setItem("toolnest-theme", newTheme);

      updateThemeIcon();
    });
  }


  /* =========================
     MOBILE MENU
  ========================= */

  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", function (event) {

      event.stopPropagation();

      mobileMenu.classList.toggle("open");

    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {
        mobileMenu.classList.remove("open");
      });

    });

    document.addEventListener("click", function (event) {

      if (
        mobileMenu.classList.contains("open") &&
        !mobileMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        mobileMenu.classList.remove("open");
      }

    });
  }


  /* =========================
     ONE BOX
  ========================= */

  const oneBoxInput = document.getElementById("oneBoxInput");
  const oneBoxButton = document.getElementById("oneBoxButton");
  const oneBoxResult = document.getElementById("oneBoxResult");

  const suggestionButtons =
    document.querySelectorAll("[data-suggestion]");


  /* Suggestions */

  suggestionButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const suggestion =
        button.getAttribute("data-suggestion");

      if (!oneBoxInput) return;

      oneBoxInput.value = suggestion;

      oneBoxInput.focus();

    });

  });


  /* Escape HTML */

  function escapeHTML(value) {

    const element = document.createElement("div");

    element.textContent = value;

    return element.innerHTML;

  }


  /* One Box engine */

  function runOneBox() {

    if (!oneBoxInput || !oneBoxResult) return;

    const request = oneBoxInput.value.trim();

    if (!request) {

      oneBoxResult.innerHTML = `
        <div class="result-inner">
          <span class="result-label">TOOLNEST</span>
          <h3>Tell me what you need.</h3>
          <p>
            Try something like:
            "Write a Facebook caption for my restaurant."
          </p>
        </div>
      `;

      oneBoxResult.classList.add("show");

      return;
    }


    const text = request.toLowerCase();

    let tool = "ToolNest Assistant";

    let description =
      "Your request has been understood. ToolNest will help you find the right workflow.";


    if (
      text.includes("caption") ||
      text.includes("instagram") ||
      text.includes("facebook post")
    ) {

      tool = "Caption Generator";

      description =
        "Create engaging captions for Facebook, Instagram and other social platforms.";

    }

    else if (
      text.includes("summarize") ||
      text.includes("summary") ||
      text.includes("summarise")
    ) {

      tool = "Text Summarizer";

      description =
        "Turn long content into a shorter, clearer and easier-to-read summary.";

    }

    else if (
      text.includes("email") ||
      text.includes("mail")
    ) {

      tool = "Email Writer";

      description =
        "Create a professional email from your simple instructions.";

    }

    else if (
      text.includes("hook") ||
      text.includes("youtube") ||
      text.includes("video")
    ) {

      tool = "Video Hook Generator";

      description =
        "Create attention-grabbing opening lines for your videos.";

    }

    else if (
      text.includes("business name") ||
      text.includes("company name") ||
      text.includes("brand name")
    ) {

      tool = "Business Name Generator";

      description =
        "Generate memorable ideas for your business or brand.";

    }

    else if (
      text.includes("social") ||
      text.includes("linkedin")
    ) {

      tool = "Social Media Post Generator";

      description =
        "Turn your idea into a ready-to-use social media post.";

    }


    oneBoxResult.innerHTML = `
      <div class="result-inner">

        <span class="result-label">
          SUGGESTED TOOL
        </span>

        <h3>${escapeHTML(tool)}</h3>

        <p>
          ${escapeHTML(description)}
        </p>

        <div class="result-request">

          <strong>Your request:</strong>

          <span>
            ${escapeHTML(request)}
          </span>

        </div>

      </div>
    `;

    oneBoxResult.classList.add("show");

    oneBoxResult.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });

  }


  /* Ask button */

  if (oneBoxButton) {

    oneBoxButton.addEventListener("click", function () {
      runOneBox();
    });

  }


  /* Enter key */

  if (oneBoxInput) {

    oneBoxInput.addEventListener("keydown", function (event) {

      if (event.key === "Enter") {

        event.preventDefault();

        runOneBox();

      }

    });

  }


  /* =========================
     FOCUS ONE BOX
  ========================= */

  window.focusOneBox = function () {

    const heroBox = document.getElementById("oneBoxInput");

    if (!heroBox) return;

    heroBox.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    setTimeout(function () {
      heroBox.focus();
    }, 500);

  };


  /* =========================
     CTRL + K
  ========================= */

  document.addEventListener("keydown", function (event) {

    if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === "k"
    ) {

      event.preventDefault();

      if (oneBoxInput) {
        oneBoxInput.focus();
      }

    }

  });

});
