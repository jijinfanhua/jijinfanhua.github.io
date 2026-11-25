const matrix = document.querySelector(".matrix");
const matrixPanel = document.querySelector(".matrix-panel");
const cells = Array.from(matrix.children);
const promptLength = 6;
const matrixSize = Math.sqrt(cells.length);
const phaseButtons = document.querySelectorAll("[data-phase]");
const stepButton = document.querySelector(".step");
const explanation = document.querySelector(".explanation");
let length = promptLength;

function drawInference() {
  const isPrefill = length === promptLength;
  cells.forEach((cell, index) => {
    const row = Math.floor(index / matrixSize);
    const col = index % matrixSize;
    const visible = row < length && col <= row;
    const current = isPrefill || row === length - 1;
    cell.classList.toggle("computed", visible && current);
    cell.classList.toggle("prior", visible && !current);
  });
  for (const button of phaseButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.phase === (isPrefill ? "prefill" : "decode")));
  }
  stepButton.hidden = isPrefill;
  stepButton.textContent = length === matrixSize ? "Replay" : "Next token";
  explanation.textContent = isPrefill
    ? "Prefill processes the six prompt tokens together. Each query can attend only to its own position and earlier keys."
    : `Token ${length} uses one new query and reuses the keys and values for the previous ${length - 1} tokens.`;
  matrixPanel.setAttribute("aria-label", "Causal attention matrix. " + explanation.textContent);
}

for (const button of phaseButtons) {
  button.addEventListener("click", () => {
    length = button.dataset.phase === "prefill" ? promptLength : promptLength + 1;
    drawInference();
  });
}
stepButton.addEventListener("click", () => {
  length = length === matrixSize ? promptLength + 1 : length + 1;
  drawInference();
});
document.querySelector(".inference-controls").hidden = false;

const filters = document.querySelector(".paper-filters");
const papers = Array.from(document.querySelectorAll("#selected-list .work"));
for (const filter of filters.querySelectorAll("button")) {
  filter.addEventListener("click", () => {
    for (const paper of papers) {
      paper.hidden = filter.dataset.topic !== "all" && paper.dataset.topic !== filter.dataset.topic;
    }
    for (const button of filters.querySelectorAll("button")) {
      button.setAttribute("aria-pressed", String(button === filter));
    }
    document.querySelector("#paper-count").textContent = `Showing ${papers.filter(paper => !paper.hidden).length} publications.`;
  });
}
filters.hidden = false;
