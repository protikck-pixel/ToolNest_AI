document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // THEME
  // =========================

  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  function updateThemeIcon() {
    if (!themeToggle) return;

    const isDark = body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  const savedTheme = localStorage.getItem("toolnest-theme");

  if (savedTheme === "dark") {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }

  updateThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark");

      localStorage.setItem(
        "toolnest-theme",
        body.classList.contains("dark") ? "dark" : "light"
      );

      updateThemeIcon();
    });
  }

  // =========================
  // MOBILE MENU
  // =========================

  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
      });
    });
  }

  // =========================
  // ONE BOX
  // =========================

  const oneBoxInput = document.getElementById("oneBoxInput");
  const oneBoxButton = document.getElementById("oneBoxButton");
  const oneBoxResult = document.getElementById("oneBoxResult");

  const suggestions = document.querySelectorAll("[data-suggestion]");

  suggestions.forEach((button) => {
    button.addEventListener("click", () => {
      const text = button.getAttribute("data-suggestion");

      if (oneBoxInput) {
        oneBoxInput.value = text;
        oneBoxInput.focus();
      }
    });
  });

  function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function handleOneBox() {
    if (!oneBoxInput || !oneBoxResult) return;

    const request = oneBoxInput.value.trim();

    if (!request) {
      oneBoxResult.innerHTML = `
        <div class="result-inner">
          <strong>Tell me what you need.</strong>
          <p>For example: “Write a Facebook caption for my restaurant.”</p>
        </div>
      `;

      oneBoxResult.classList.add("show");
      return;
    }

    const text = request.toLowerCase();

    let toolName = "ToolNest Assistant";
    let message =
      "I understand what you need. ToolNest will help you find the right tool for this task.";

    if (
      text.includes("caption") ||
      text.includes("facebook caption") ||
      text.includes("instagram caption")
    ) {
      toolName = "Caption Generator";
      message =
        "Your request matches our Caption Generator. We can create engaging captions for Facebook, Instagram and other social platforms.";
    } else if (
      text.includes("summarize") ||
      text.includes("summary") ||
      text.includes("shorten this")
    ) {
      toolName = "Text Summarizer";
      message =
        "Your request matches our Text Summarizer. It can turn long text into a clear and shorter version.";
    } else if (
      text.includes("email") ||
      text.includes("mail") ||
      text.includes("email me")
    ) {
      toolName = "Email Writer";
      message =
        "Your request matches our Email Writer. It can help you create a professional email quickly.";
    } else if (
      text.includes("hook") ||
      text.includes("video hook") ||
      text.includes("youtube hook")
    ) {
      toolName = "Video Hook Generator";
      message =
        "Your request matches our Video Hook Generator. It can help create attention-grabbing opening lines for videos.";
    } else if (
      text.includes("business name") ||
      text.includes("company name") ||
      text.includes("brand name")
    ) {
      toolName = "Business Name Generator";
      message =
        "Your request matches our Business Name Generator. It can help generate memorable business and brand names.";
    } else if (
      text.includes("social post") ||
      text.includes("social media post") ||
      text.includes("linkedin post")
    ) {
      toolName = "Social Media Post Generator";
      message =
        "Your request matches our Social Media Post Generator. It can help turn your idea into a ready-to-use social post.";
    }

    oneBoxResult.innerHTML = `
      <div class="result-inner">
        <span class="result-label">SUGGESTED TOOL</span>
        <h3>${escapeHTML(toolName)}</h3>
        <p>${escapeHTML(message)}</p>
        <div class="result-request">
          <strong>Your request:</strong>
          <span>${escapeHTML(request)}</span>
        </div>
      </div>
    `;

    oneBoxResult.classList.add("show");

    oneBoxResult.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

  if (oneBoxButton) {
    oneBoxButton.addEventListener("click", handleOneBox);
  }

  if (oneBoxInput) {
    oneBoxInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleOneBox();
      }
    });
  }

  // =========================
  // KEYBOARD SHORTCUT
  // =========================

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();

      if (oneBoxInput) {
        oneBoxInput.focus();
      }
    }
  });

  // =========================
  // CLOSE MOBILE MENU
  // =========================

  document.addEventListener("click", (event) => {
    if (!mobileMenu || !menuToggle) return;

    if (
      mobileMenu.classList.contains("open") &&
      !mobileMenu.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      mobileMenu.classList.remove("open");
    }
  });
});
