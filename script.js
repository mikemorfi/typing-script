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
