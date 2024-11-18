//intially we are checheking if the hex value is given right or not for that we can caheck if it starts with # then
//replace it with a null string and if it has a length equal to 3 or 6 then it is a valid hex value (3 why bc it will replicate eg: 123=>112233)

const hexInput = document.getElementById("hex-color");
const colorInput = document.getElementById("input-color");
const sliderText = document.getElementById("sliderText");
const slider = document.getElementById("slider");
const altered = document.getElementById("altered-color");
const alteredColorText = document.getElementById("altered-colorText");
const lightenText = document.getElementById("lightenText");
const darkenText = document.getElementById("darkenText");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
  if (toggleBtn.classList.contains("toggled")) {
    toggleBtn.classList.remove("toggled");
    lightenText.classList.remove("unselected");
    darkenText.classList.add("unselected");
  } else {
    toggleBtn.classList.add("toggled");
    lightenText.classList.add("unselected");
    darkenText.classList.remove("unselected");
  }
  reset();
});

hexInput.addEventListener("keyup", () => {
  const hex = hexInput.value;
  if (!isValidHex(hex)) return;

  const strippedHex = hex.replace("#", "");
  colorInput.style.backgroundColor = "#" + strippedHex;
  reset();
});

const isValidHex = (hex) => {
  if (!hex) return false;

  const strippedHex = hex.replace("#", "");
  return strippedHex.length === 3 || strippedHex.length === 6;
};

const hexTorgb = (hex) => {
  if (!isValidHex(hex)) return;

  let strippedHex = hex.replace("#", "");

  if (strippedHex.length === 3) {
    strippedHex =
      strippedHex[0] +
      strippedHex[0] +
      strippedHex[1] +
      strippedHex[1] +
      strippedHex[2] +
      strippedHex[2];
  }

  const r = parseInt(strippedHex.substring(0, 2), 16);
  const g = parseInt(strippedHex.substring(2, 4), 16);
  const b = parseInt(strippedHex.substring(4, 6), 16);

  return { r, g, b };
};

const rgbTohex = (r, g, b) => {
  const first = ("0" + r.toString(16)).slice(-2);
  const second = ("0" + g.toString(16)).slice(-2);
  const third = ("0" + b.toString(16)).slice(-2);

  const hex = "#" + first + second + third;
  return hex;
};

const alteredColor = (hex, percentage) => {
  const { r, g, b } = hexTorgb(hex);

  const amount = Math.floor((percentage / 100) * 255);
  const newR = inRange0To255(r, amount);
  const newG = inRange0To255(g, amount);
  const newB = inRange0To255(b, amount);

  return rgbTohex(newR, newG, newB);
};

const inRange0To255 = (hex, amount) => {
  return Math.min(255, Math.max(0, hex + amount));
};
slider.addEventListener("input", () => {
  if (!isValidHex(hexInput.value)) return;

  sliderText.textContent = `${slider.value}%`;

  const sliderAddition = toggleBtn.classList.contains("toggled")
    ? -slider.value
    : slider.value;

  const alteredHex = alteredColor(hexInput.value, sliderAddition);
  altered.style.backgroundColor = alteredHex;
  alteredColorText.innerText = `Altered Color: ${alteredHex}`;
});

const reset = () => {
  slider.value = 0;
  sliderText.innerText = `0%`;
  altered.style.backgroundColor = hexInput.value;
  alteredColorText.innerText = `Altered Color: ${hexInput.value}`;
};
