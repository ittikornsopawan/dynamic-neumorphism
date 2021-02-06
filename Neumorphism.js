class RGB {
  constructor(red, green, blue) {
    if (red <= 0) red = 0;
    if (green <= 0) green = 0;
    if (blue <= 0) blue = 0;

    if (red > 255) red = 255;
    if (green > 255) green = 255;
    if (blue > 255) blue = 255;

    this.red = red;
    this.green = green;
    this.blue = blue;
  }
}

this.Neumorphism =
  this.Neumorphism ||
  function () {
    document.addEventListener("DOMContentLoaded", function (event) {
      init();
    });

    const init = () => {
      const shadowEl = document.getElementsByClassName("shadow");
      if (shadowEl && shadowEl.length > 0) {
        Array.prototype.forEach.call(shadowEl, (el) => {
          const innerHeight = getElementInnerHeight(el);
          const positionXY = Math.ceil(innerHeight * 0.02);
          const blur = positionXY * 2;

          const baseColor = getElementBackground(el);

          const shadowColor = createShadow(baseColor);
          const lightColor = createLight(baseColor);

          let style = "";
          if (el.classList.contains("shadow-flat")) {
            style = `box-shadow:${positionXY}px ${positionXY}px ${blur}px rgb(${shadowColor.red}, ${shadowColor.green}, ${shadowColor.blue}), -${positionXY}px -${positionXY}px ${blur}px rgb(${lightColor.red}, ${lightColor.green}, ${lightColor.blue}) !important`;
          } else if (el.classList.contains("shadow-concave")) {
            const background = createGradient(baseColor, "concave");
            style = `box-shadow:${positionXY}px ${positionXY}px ${blur}px rgb(${shadowColor.red}, ${shadowColor.green}, ${shadowColor.blue}), -${positionXY}px -${positionXY}px ${blur}px rgb(${lightColor.red}, ${lightColor.green}, ${lightColor.blue}) !important; ${background};`;
          } else if (el.classList.contains("shadow-convex")) {
            const background = createGradient(baseColor, "convex");
            style = `box-shadow:${positionXY}px ${positionXY}px ${blur}px rgb(${shadowColor.red}, ${shadowColor.green}, ${shadowColor.blue}), -${positionXY}px -${positionXY}px ${blur}px rgb(${lightColor.red}, ${lightColor.green}, ${lightColor.blue}) !important; ${background};`;
          } else if (el.classList.contains("shadow-pressed")) {
            style = `box-shadow:inset ${positionXY}px ${positionXY}px ${blur}px rgb(${shadowColor.red}, ${shadowColor.green}, ${shadowColor.blue}), inset -${positionXY}px -${positionXY}px ${blur}px rgb(${lightColor.red}, ${lightColor.green}, ${lightColor.blue}) !important`;
          }
          el.style.cssText += style;
        });
      }

      const buttonsEl = document.getElementsByClassName("btn-nmp");
      if (buttonsEl && buttonsEl.length > 0) {
        Array.prototype.forEach.call(buttonsEl, (el) => {
          const innerHeight = getElementInnerHeight(el);
          const positionXY = Math.ceil(innerHeight * 0.02);
          const blur = positionXY * 2;

          const baseColor = getElementBackground(el);

          const shadowColor = createShadow(baseColor);
          const lightColor = createLight(baseColor);
          const style = `box-shadow:${positionXY}px ${positionXY}px ${blur}px rgb(${shadowColor.red}, ${shadowColor.green}, ${shadowColor.blue}), -${positionXY}px -${positionXY}px ${blur}px rgb(${lightColor.red}, ${lightColor.green}, ${lightColor.blue}) !important; background-color:rgb(${baseColor.red},${baseColor.green},${baseColor.blue}) !important`;
          el.style.cssText += style;

          el.addEventListener("mouseover", () => {
            let hoverStyle = `box-shadow:inset ${positionXY}px ${positionXY}px ${blur}px rgb(${shadowColor.red}, ${shadowColor.green}, ${shadowColor.blue}), inset -${positionXY}px -${positionXY}px ${blur}px rgb(${lightColor.red}, ${lightColor.green}, ${lightColor.blue})!important;background-color:rgb(${baseColor.red},${baseColor.green},${baseColor.blue}) !important`;
            el.removeAttribute("style");
            el.style.cssText += hoverStyle;
          });

          el.addEventListener("mouseleave", () => {
            el.removeAttribute("style");
            el.style.cssText += style;
          });
        });
      }
    };

    const createShadow = (baseColor) => {
      const red = baseColor.red - baseColor.red * 0.15;
      const green = baseColor.green - baseColor.green * 0.15;
      const blue = baseColor.blue - baseColor.blue * 0.15;

      return new RGB(red, green, blue);
    };

    const createLight = (baseColor) => {
      const red = baseColor.red + baseColor.red * 0.15;
      const green = baseColor.green + baseColor.green * 0.15;
      const blue = baseColor.blue + baseColor.blue * 0.15;

      return new RGB(red, green, blue);
    };

    const getElementBackground = (el) => {
      let rgb = window
        .getComputedStyle(el, null)
        .getPropertyValue("background-color");

      rgb = rgb.substring(rgb.lastIndexOf("(") + 1, rgb.lastIndexOf(")"));

      const red = parseInt(rgb.split(",")[0].trim());
      const green = parseInt(rgb.split(",")[1].trim());
      const blue = parseInt(rgb.split(",")[2].trim());

      return new RGB(red, green, blue);
    };

    const getElementInnerHeight = (el) => {
      var computed = getComputedStyle(el),
        padding =
          parseInt(computed.paddingTop) + parseInt(computed.paddingBottom);

      return el.clientHeight - padding;
    };

    const createGradient = (baseColor, type) => {
      const dRed = baseColor.red - baseColor.red * 0.1;
      const dGreen = baseColor.green - baseColor.green * 0.1;
      const dBlue = baseColor.blue - baseColor.blue * 0.1;
      let dark = new RGB(dRed, dGreen, dBlue);

      const lRed = baseColor.red + baseColor.red * 0.1;
      const lGreen = baseColor.green + baseColor.red * 0.1;
      const lBlue = baseColor.blue + baseColor.red * 0.1;
      let light = new RGB(lRed, lGreen, lBlue);

      console.log("baseColor", baseColor, "dark", dark);
      // console.log("light", light);

      if (type === "concave") {
        return `background: linear-gradient(145deg, rgb(${dark.red},${dark.green},${dark.blue}), rgb(${light.red},${light.green},${light.blue}));`;
      } else if (type === "convex") {
        return `background: linear-gradient(145deg, rgb(${light.red},${light.green},${light.blue}), rgb(${dark.red},${dark.green},${dark.blue}));`;
      }
    };
  };

this.Neumorphism();
