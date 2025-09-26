 const track = document.getElementById("track");
    const slides = Array.from(track.children);
    const nextButton = document.getElementById("next");
    const prevButton = document.getElementById("prev");
    const dotsNav = document.getElementById("dots");

    let currentIndex = 0;

    // Crear dots
    slides.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(index));
      dotsNav.appendChild(dot);
    });
    const dots = Array.from(dotsNav.children);

    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach(dot => dot.classList.remove("active"));
      dots[currentIndex].classList.add("active");
    }

    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }

    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });

    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    // Auto-play
    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    }, 4000);