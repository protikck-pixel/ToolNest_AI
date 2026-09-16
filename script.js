function generateCaption() {
  const input = document.getElementById("captionInput").value.trim();
  const output = document.getElementById("captionOutput");

  if (!input) {
    output.textContent = "Please enter a topic first.";
    return;
  }

  output.textContent =
    `☕ Fresh idea: ${input}\n\nMake it simple, useful and memorable. What would you add? #SmallBusiness #Content`;
}


function generateHooks() {
  const input = document.getElementById("hookInput").value.trim();
  const output = document.getElementById("hookOutput");

  if (!input) {
    output.textContent = "Please enter a video idea first.";
    return;
  }

  output.textContent =
    `🎬 Hook ideas for "${input}":\n\n` +
    `1. You won't believe what happens when you try this...\n` +
    `2. Here are 3 things you need to know about ${input}.\n` +
    `3. Stop scrolling — this could change the way you think about it.`;
}


function generateNames() {
  const input = document.getElementById("nameInput").value.trim();
  const output = document.getElementById("nameOutput");

  if (!input) {
    output.textContent = "Please enter a business type first.";
    return;
  }

  output.textContent =
    `💼 Business name ideas for "${input}":\n\n` +
    `1. NovaNest\n` +
    `2. BrightHive\n` +
    `3. Nexora\n` +
    `4. GrowNest\n` +
    `5. PrimeCraft`;
}


function summarizeText() {
  const input = document.getElementById("summaryInput").value.trim();
  const output = document.getElementById("summaryOutput");

  if (!input) {
    output.textContent = "Please paste some text first.";
    return;
  }

  const sentences = input
    .split(/[.!?]+/)
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 0);

  if (sentences.length <= 2) {
    output.textContent = "📝 Summary:\n\n" + input;
    return;
  }

  const summary = sentences.slice(0, 2).join(". ") + ".";

  output.textContent =
    "📝 Summary:\n\n" + summary;
}
