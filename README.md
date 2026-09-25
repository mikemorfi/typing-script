# Zippies Typing Script

A JavaScript browser console script for the Zippies typing collection.

## Collection

Twitter/X:
https://x.com/zippieseth

## Author

Created by:
https://x.com/mike_morfii

## Website

https://zippies.xyz/typing

## How to Use

1. Open the typing page:

https://zippies.xyz/typing

2. Open browser Developer Tools:

```
F12 → Console
```

3. Paste the script below into Console and press Enter.

## Script

```javascript
(async () => {
  const input = document.querySelector('input[name="typing-test"]');
  input.focus();

  const wait = ms => new Promise(r => setTimeout(r, ms));

  const setter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value"
  ).set;

  function getWords() {
    let el = [...document.querySelectorAll("*")]
      .find(e => e.innerText?.startsWith("Next words:"));

    if (!el) return [];

    return el.innerText
      .replace("Next words:", "")
      .trim()
      .split(/\s+/);
  }

  async function typeText(txt) {
    for (const ch of txt) {
      setter.call(input, input.value + ch);

      input.dispatchEvent(new InputEvent("input", {
        bubbles: true,
        inputType: "insertText",
        data: ch
      }));

      await wait(60);
    }

    setter.call(input, input.value + " ");

    input.dispatchEvent(new InputEvent("input", {
      bubbles: true,
      inputType: "insertText",
      data: " "
    }));

    await wait(100);
  }

  let count = 0;

  while (true) {
    let words = getWords();

    if (!words.length) break;

    await typeText(words[0]);

    count++;

    if (count > 200) break;
  }

  console.log("finished");
})();
```

## Features

- JavaScript based
- Runs directly in browser console
- Reads words from the typing page
- Automates text input

## Disclaimer

This project is created for educational purposes and browser automation learning.
