/* =========================================================
   TOOLNEST AI — V2 INTERACTIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const themeToggle = document.getElementById("themeToggle");
  const promptInput = document.getElementById("promptInput");
  const runAI = document.getElementById("runAI");

  const aiResponse = document.getElementById("aiResponse");
  const thinkingAnimation =
    document.getElementById("thinkingAnimation");

  const responseContent =
    document.getElementById("responseContent");

  const responseStatus =
    document.getElementById("responseStatus");

  const suggestions =
    document.querySelectorAll(".suggestion");


  /* =======================================================
     THEME
     ======================================================= */

  const savedTheme = localStorage.getItem("toolnest-theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "☀";
  } else {
    themeToggle.textContent = "☾";
  }


  themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight =
      document.body.classList.contains("light");

    localStorage.setItem(
      "toolnest-theme",
      isLight ? "light" : "dark"
    );

    themeToggle.textContent =
      isLight ? "☀" : "☾";
  });


  /* =======================================================
     SUGGESTION BUTTONS
     ======================================================= */

  suggestions.forEach((button) => {

    button.addEventListener("click", () => {

      const text =
        button.textContent.toLowerCase();

      if (text.includes("write")) {

        promptInput.value =
          "Write an engaging Facebook post for my business.";

      } else if (text.includes("idea")) {

        promptInput.value =
          "Give me 10 creative ideas for growing my small business.";

      } else if (text.includes("research")) {

        promptInput.value =
          "Help me research this topic and explain the important points simply.";

      }

      promptInput.focus();

    });

  });


  /* =======================================================
     AI WORKSPACE DEMO
     ======================================================= */

  runAI.addEventListener("click", () => {

    const prompt =
      promptInput.value.trim();

    if (!prompt) {

      promptInput.focus();

      promptInput.placeholder =
        "Tell ToolNest what you need...";

      return;
    }


    /* Show response area */

    aiResponse.classList.add("show");

    thinkingAnimation.style.display = "block";
    responseContent.style.display = "none";

    responseStatus.textContent =
      "Understanding your request";


    /* Scroll gently */

    setTimeout(() => {

      aiResponse.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });

    }, 100);


    /* AI thinking stages */

    setTimeout(() => {

      responseStatus.textContent =
        "Finding the right workflow";

    }, 900);


    setTimeout(() => {

      responseStatus.textContent =
        "Preparing your result";

    }, 1700);


    setTimeout(() => {

      thinkingAnimation.style.display =
        "none";

      responseContent.style.display =
        "block";

      responseStatus.textContent =
        "Result ready";

      responseContent.innerHTML =
        generateDemoResponse(prompt);

    }, 2400);

  });


  /* =======================================================
     DEMO RESPONSE ENGINE
     ======================================================= */

  function generateDemoResponse(prompt) {

    const lower =
      prompt.toLowerCase();


    if (
      lower.includes("facebook") ||
      lower.includes("caption") ||
      lower.includes("post")
    ) {

      return `
        <p><strong>Here's a polished version for you:</strong></p>

        <p>
          🍽️ Great food deserves a great story.
          Come and enjoy delicious flavors,
          a welcoming atmosphere, and moments
          worth sharing.
        </p>

        <p>
          ✨ Visit us today and make your next
          meal a memorable one.
        </p>
      `;

    }


    if (
      lower.includes("idea") ||
      lower.includes("ideas")
    ) {

      return `
        <p><strong>Here are a few ideas to start with:</strong></p>

        <p>
          1. Create a simple weekly content series.<br>
          2. Share customer stories and experiences.<br>
          3. Offer a limited-time promotion.<br>
          4. Create short educational videos.<br>
          5. Turn frequently asked questions into content.
        </p>
      `;

    }


    if (
      lower.includes("research") ||
      lower.includes("analyze") ||
      lower.includes("analysis")
    ) {

      return `
        <p><strong>Let's break your request into useful parts:</strong></p>

        <p>
          ToolNest can organize the topic,
          identify the important questions,
          compare relevant information,
          and turn the findings into a
          simple actionable summary.
        </p>
      `;

    }


    return `
      <p><strong>ToolNest understands your request.</strong></p>

      <p>
        Your request is:
        <em>“${escapeHTML(prompt)}”</em>
      </p>

      <p>
        This is the ToolNest AI workspace.
        Once the real AI engine is connected,
        this area will generate the actual
        result for your request.
      </p>

      <p>
        ✦ Analyze &nbsp; · &nbsp;
        ✦ Create &nbsp; · &nbsp;
        ✦ Improve
      </p>
    `;

  }


  /* =======================================================
     SAFE TEXT
     ======================================================= */

  function escapeHTML(text) {

    const div =
      document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

  }


  /* =======================================================
     ENTER KEY
     ======================================================= */

  promptInput.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Enter" &&
        !event.shiftKey
      ) {

        event.preventDefault();

        runAI.click();

      }

    }
  );


  /* =======================================================
     COPY / REGENERATE
     ======================================================= */

  const responseButtons =
    document.querySelectorAll(
      ".response-actions button"
    );


  if (responseButtons.length >= 2) {

    const copyButton =
      responseButtons[0];

    const regenerateButton =
      responseButtons[1];


    copyButton.addEventListener(
      "click",
      async () => {

        const text =
          responseContent.innerText.trim();

        if (!text) return;

        try {

          await navigator.clipboard.writeText(
            text
          );

          const oldText =
            copyButton.textContent;

          copyButton.textContent =
            "Copied ✓";

          setTimeout(() => {

            copyButton.textContent =
              oldText;

          }, 1500);

        } catch (error) {

          copyButton.textContent =
            "Copy failed";

          setTimeout(() => {

            copyButton.textContent =
              "Copy";

          }, 1500);

        }

      }
    );


    regenerateButton.addEventListener(
      "click",
      () => {

        if (!promptInput.value.trim()) {
          return;
        }

        runAI.click();

      }
    );

  }


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  const mobileMenu =
    document.getElementById("mobileMenu");

  const navLinks =
    document.querySelector(".nav-links");


  if (mobileMenu && navLinks) {

    mobileMenu.addEventListener(
      "click",
      () => {

        const visible =
          navLinks.style.display === "flex";

        navLinks.style.display =
          visible ? "" : "flex";

        if (!visible) {

          navLinks.style.position =
            "absolute";

          navLinks.style.top =
            "65px";

          navLinks.style.left =
            "0";

          navLinks.style.right =
            "0";

          navLinks.style.padding =
            "18px";

          navLinks.style.flexDirection =
            "column";

          navLinks.style.alignItems =
            "flex-start";

          navLinks.style.background =
            "rgba(10,10,16,.96)";

          navLinks.style.border =
            "1px solid rgba(255,255,255,.08)";

          navLinks.style.borderRadius =
            "14px";

          navLinks.style.backdropFilter =
            "blur(20px)";

        }

      }
    );

  }


});
