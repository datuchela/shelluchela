const form = document.querySelector("form");
const input = document.querySelector("input");
const terminal = document.querySelector(".console");

form.addEventListener("submit", handleFormSubmit);

const cmdStyle = {
  color: "hsl(0, 100%, 64%)",
};

async function handleFormSubmit(e) {
  e.preventDefault();
  const payload = input.value;
  appendLine("cmd: " + payload, cmdStyle);
  input.value = "";
  const res = await fetch("/run", {
    headers: {
      "Content-Type": "text/plain;charset=UTF-8",
    },
    method: "POST",
    body: payload,
  });
  const data = await res.text();
  console.log(data);
  appendLine(data);
}

function appendLine(data, styling = {}) {
  const line = document.createElement("p");
  const dataNode = document.createTextNode(data);
  line.appendChild(dataNode);
  line.classList.add("terminal-line");
  line.style = { styling };
  terminal.appendChild(line);
}
