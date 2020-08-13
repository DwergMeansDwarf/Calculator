const calculator = document.querySelector(".calculator");
const keys = document.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");

keys.addEventListener("click", (event) => {
  if (event.target.matches("button")) {
    const key = event.target;
    const action = key.dataset.action;
    const keyNum = key.innerText;
    let displayNum = display.innerText;

    if (!action) {
      //Sets the display number to the number(s) pressed
      //if it is in its default state of zero, or if an
      //operator has been pressed
      if (
        displayNum == "0" ||
        calculator.dataset.previousKeyType === "operator" ||
        displayNum == "ERROR"
      ) {
        display.innerText = keyNum;
        //concatonates the string to return multi-digit numbers
      } else {
        display.innerText = displayNum + keyNum;
      }
      calculator.dataset.previousKey = "number";
    }
    //Handles concatonating the decimal when pressed
    if (action === "decimal") {
      //Makes sure only one decimal can exist on-screen
      if (!displayNum.includes(".")) {
        display.innerText = displayNum + ".";
      } else if (previousKeyType === "operator") {
        display.innerText = "0.";
      }
      calculator.dataset.previousKey = "decimal";
    }
    //Operations
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      //Highlights the operator button for better UX
      key.classList.add("is-depressed");
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.firstValue = displayNum;
      calculator.dataset.operator = action;
      // Calculates on subsequent operator presses
      if (firstValue && operator && previousKeyType !== "operator") {
        display.innerText = calculate(firstValue, operator, secondValue);
      }
    }
    //Sets the display to the result of the calculation
    if (action === "calculate") {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayNum;
      //Check to see if values are present
      if (firstValue) {
        display.innerText = calculate(firstValue, operator, secondValue);
      } else if (!firstValue) {
        display.innerText = "ERROR";
        //if result is Ininity then throw an error
        //Doesn't currently work for a reason I am unsure of.
      }
      if (displayNum === Infinity) {
        display.innerText = "ERROR";
      }
      calculator.dataset.previousKeyType = "calculate";
      //Un-highlights the operator buttons
      Array.from(key.parentNode.children).forEach((k) =>
        k.classList.remove("is-depressed")
      );
    }
    //Clears all saved values
    if (action === "clear") {
      firstValue = "";
      secondValue = "";
      operator = "";
      displayNum = "";
      display.innerText = "0";
      calculator.dataset.previousKeyType = "clear";
    }
  }
});

//Perform the calculations
const calculate = (num1, operator, num2) => {
  let result = "";
  if (operator === "add") {
    result = parseFloat(num1) + parseFloat(num2);
  } else if (operator === "subtract") {
    result = parseFloat(num1) - parseFloat(num2);
  } else if (operator === "multiply") {
    result = parseFloat(num1) * parseFloat(num2);
  } else if (operator === "divide") {
    result = parseFloat(num1) / parseFloat(num2);
  }
  console.log(result);
  return result;
};
