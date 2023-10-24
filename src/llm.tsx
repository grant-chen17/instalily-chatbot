export function llmConnect() {
    const text = document.querySelectorAll("li:not([class])");
    for (let i = 0; i < text.length; i++) {
        const elem = text[i];
        console.log(elem);
    }
    console.log("hello from react.js");
}