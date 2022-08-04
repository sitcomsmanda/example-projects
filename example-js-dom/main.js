function romanToInt(str) {
  function charToInt(c) {
    switch (c) {
      case "I":
        return 1;
      case "V":
        return 5;
      case "X":
        return 10;
      case "L":
        return 50;
      case "C":
        return 100;
      case "D":
        return 500;
      case "M":
        return 1000;
      default:
        return -1;
    }
  }

  if (str == null) return -1;

  let num = charToInt(str.charAt(0));
  let pre, curr;

  for (let i = 1; i < str.length; i++) {
    curr = charToInt(str.charAt(i));
    pre = charToInt(str.charAt(i - 1));
    if (curr <= pre) {
      num += curr;
    } else {
      num = num - pre * 2 + curr;
    }
  }

  return num;
}

function intToRoman(num) {
  if (!num) return "invalid number";
  if (num <= 0) return "can't less than 0 (zero)";
  if (num >= 1000000) return "too much bro";
  const lookup = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  let roman = "";
  let i;
  for (i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

async function main() {
  const inputAngkaBiasa = document.querySelector(".angka-biasa");
  const inputAngkaRomawi = document.querySelector(".angka-romawi");
  const spinner = document.querySelector(".spinner");
  spinner.style.setProperty("--animate-duration", "0.1s");

  spinner.addEventListener("animationend", () => {
    spinner.classList.remove("animate__animated", "animate__shakeX");
  });

  document.querySelector("body").addEventListener("keyup", function (e) {
    // Untuk yang input angka-romawi
    if (e.target.classList.contains("angka-romawi")) {
      spinner.classList.add("animate__animated", "animate__shakeX");

      const inputVal = e.target.value;
      console.log(inputVal);
      if (inputVal) {
        const result = romanToInt(inputVal.toUpperCase());
        if (result > 0) {
          inputAngkaBiasa.value = result;
        } else {
          inputAngkaBiasa.value = "";
        }
      } else {
        inputAngkaBiasa.value = "";
      }
    }

    // Untuk yang input angka-biasa
    if (e.target.classList.contains("angka-biasa")) {
      spinner.classList.add("animate__animated", "animate__shakeX");

      const inputVal = e.target.value;
      if (inputVal) {
        inputAngkaRomawi.value = intToRoman(parseInt(inputVal));
      } else {
        inputAngkaRomawi.value = "";
      }
    }
  });
}

try {
  main();
} catch (e) {
  console.log(e);
}
