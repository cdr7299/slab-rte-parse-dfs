// import "./styles.css";
// import _ from "lodash";

const input = [
  { text: "One", indent: 0, type: "ordered" },
  { text: "Two", indent: 0, type: "ordered" },
  { text: "Alpha", indent: 1, type: "bullet" },
  { text: "Beta", indent: 1, type: "bullet" },
  { text: "I", indent: 2, type: "ordered" },
  { text: "II", indent: 2, type: "ordered" },
  { text: "Gamma", indent: 1, type: "bullet" },
  { text: "Three", indent: 0, type: "ordered" },
  { text: "bomb", indent: 1, type: "ordered" },
];

let r = "";

const dfs = (input, currIndent, start, visited) => {
  for (let i = start; i < input.length; i++) {
    const { text, indent, type } = input[i];
    if (indent === currIndent && !visited[i]) {
      visited[i] = true;
      if (type === "ordered" && i === 0) {
        r += `<ol><li>${text}`;
        dfs(input, indent, i + 1, visited);
        r += "</li></ol>";
      } else if (type !== "ordered" && i === 0) {
        r += `<ul><li>${text}`;
        dfs(input, indent, i + 1, visited);
        r += "</li></ul>";
      } else {
        r += `<li>${text}</li>`;
      }
    } else if (indent > currIndent && !visited[i]) {
      visited[i] = true;
      if (type === "ordered") {
        r += `<ol><li>${text}`;
        dfs(input, currIndent + 1, i + 1, visited);
        r += "</li></ol>";
      } else {
        r += `<ul><li>${text}</li>`;
        dfs(input, currIndent + 1, i + 1, visited);
        r += "</ul>";
      }
    } else if (indent < currIndent) return;
  }
};

const deltaToHtml = (parsedInput) => {
  const visited = Array(parsedInput.length).fill(false);
  dfs(parsedInput, 0, 0, visited);
  console.log(r);
  return r;
};

document.getElementById("root").innerHTML = deltaToHtml(input);
