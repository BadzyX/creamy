document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("curved-buttons-container");
  const buttonWrappers = container.getElementsByClassName("button-wrapper");
  const totalButtons = buttonWrappers.length;

  const startPosition = 20;
  const endPosition = 90;
  const step = (endPosition - startPosition) / (totalButtons - 1);

  const verticalOffset = 60;

  const positions = Array.from({ length: totalButtons }, (_, index) => ({
    left: `${startPosition + step * index}%`,
    top: `calc(${
      -20 * Math.sin((index / (totalButtons - 1)) * Math.PI)
    }% + ${verticalOffset}px)`,
    rotation: -2 + (4 / (totalButtons - 1)) * index,
  }));

  const flavorColors = {
    cookie: "#d1b7a5",
    cacao: "#f5d0b5",
    verdure: "#dcf7dc",
    gascogne: "#dec3bf",
    vanille: "#FFFACD",
    banana: "#f5eab3",
    mango: "#fae1c5",
  };

  const flavorImages = {
    gascogne: "/assets/img/carousel/elixir_de_gascogne.png",
    vanille: "/assets/img/carousel/vanille_des_iles.png",
    cookie: "/assets/img/carousel/cookie_delice.png",
    banana: "/assets/img/carousel/banana_bonanza.png",
    mango: "/assets/img/carousel/mango_tango.png",
    cacao: "/assets/img/carousel/cacao_divin.png",
    verdure: "/assets/img/carousel/verdure_givree.png",
  };

  const iceCreamImages = document.querySelectorAll(".ice-cream-image");
  const flavors = Object.keys(flavorImages);
  let currentIndex = 0;

  function updateCarousel(newFlavorIndex) {
    const prevIndex = (newFlavorIndex - 1 + flavors.length) % flavors.length;
    const nextIndex = (newFlavorIndex + 1) % flavors.length;

    function loadImageWithEffect(img, src, position) {
      img.classList.remove("visible");
      img.classList.add("hidden");

      setTimeout(() => {
        img.src = src;
        img.dataset.position = position;
        img.classList.remove("hidden");
        img.classList.add("visible");
      }, 250);
    }

    loadImageWithEffect(
      iceCreamImages[0],
      flavorImages[flavors[prevIndex]],
      "left"
    );
    loadImageWithEffect(
      iceCreamImages[1],
      flavorImages[flavors[newFlavorIndex]],
      "center"
    );
    loadImageWithEffect(
      iceCreamImages[2],
      flavorImages[flavors[nextIndex]],
      "right"
    );

    iceCreamImages.forEach((img, index) => {
      img.classList.remove("slide-left", "slide-right");
      void img.offsetWidth; // Force reflow
      if (index === 0) img.classList.add("slide-left");
      if (index === 2) img.classList.add("slide-right");
    });

    currentIndex = newFlavorIndex;
  }

  for (let i = 0; i < totalButtons && i < positions.length; i++) {
    const wrapper = buttonWrappers[i];
    const button = wrapper.querySelector(".curved-button");
    const pos = positions[i];
    const flavor = button.getAttribute("data-flavor");

    wrapper.style.left = `calc(${pos.left} - 180px)`;
    wrapper.style.top = pos.top;
    wrapper.style.transform = `rotate(${pos.rotation}deg)`;

    if (flavor && flavorColors[flavor]) {
      button.style.backgroundColor = flavorColors[flavor];
    }

    button.addEventListener("click", function () {
      const flavor = this.getAttribute("data-flavor");
      const flavorIndex = flavors.indexOf(flavor);
      if (flavorIndex !== -1) {
        updateCarousel(flavorIndex);
      }
    });
  }

  updateCarousel(0);

  function hideLoader() {
    const loaderWrapper = document.getElementById("loader-wrapper");
    loaderWrapper.classList.add("melting");
    setTimeout(() => {
      loaderWrapper.style.display = "none";
    }, 1000);
  }

  window.addEventListener("load", function () {
    setTimeout(hideLoader, 1000);
  });
});
