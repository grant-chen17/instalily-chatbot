import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

function extractInfo() {
  const text = document.querySelectorAll("li:not([class])");
  for (let i = 0; i < text.length; i++) {
      const elem = text[i];
      console.log(elem);
  }
  console.log("hello from react.js");
}

const root = document.createElement("div")
root.className = "container"
document.body.appendChild(root)
const rootDiv = ReactDOM.createRoot(root);
rootDiv.render(
    <App />
);
