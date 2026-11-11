
// ===================================
// 1. HOMEPAGE HERO SLIDER
// ===================================

const hero = document.querySelector(".hero");

if (hero) {
  const slides = [
    {
      subtitle: "WELCOME TO BRIGHT FUTURE INTERNATIONAL SCHOOL",
      heading: "LEARN TODAY.",
      highlight: "LEAD TOMORROW.",
      image: "images/school-campus.jpg"
    },
    {
      subtitle: "DISCOVER YOUR POTENTIAL",
      heading: "DREAM BIG.",
      highlight: "ACHIEVE MORE.",
      image: "images/students-classroom.jpg"
    },
    {
      subtitle: "LEARNING BEYOND THE CLASSROOM",
      heading: "GROW THROUGH.",
      highlight: "EVERY EXPERIENCE.",
      image: "images/school-sports.jpg"
    },
    {
      subtitle: "PREPARING TOMORROW'S LEADERS",
      heading: "YOUR FUTURE.",
      highlight: "STARTS HERE.",
      image: "images/graduation.jpg"
    }
  ];

  const subtitle = document.querySelector(".hero-subtitle");
  const heading = document.querySelector(".hero-content h1");
  const slideItems = document.querySelectorAll(".slide-item");
  const nextButton = document.querySelector(".next-btn");
  const prevButton = document.querySelector(".prev-btn");

  let currentSlide = 0;

  function showSlide(index) {
    const slide = slides[index];

    subtitle.textContent = slide.subtitle;

    heading.innerHTML = `${slide.heading}<span>${slide.highlight}</span>`;

    hero.style.backgroundImage = `url("${slide.image}")`;

    slideItems.forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });
  }

  if (subtitle && heading) {
    if (nextButton) {
      nextButton.addEventListener("click", function () {
        currentSlide++;

        if (currentSlide >= slides.length) {
          currentSlide = 0;
        }

        showSlide(currentSlide);
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", function () {
        currentSlide--;

        if (currentSlide < 0) {
          currentSlide = slides.length - 1;
        }

        showSlide(currentSlide);
      });
    }

    slideItems.forEach((item) => {
      item.addEventListener("click", function () {
        currentSlide = Number(item.dataset.slide);
        showSlide(currentSlide);
      });
    });

    showSlide(currentSlide);
  }
}


// ===================================
// 2. STATISTICS COUNTERS
// ===================================

const statisticsSection = document.querySelector(".statistics");
const counters = document.querySelectorAll(".counter");

if (
  statisticsSection &&
  counters.length > 0 &&
  "IntersectionObserver" in window
) {
  let hasCounted = false;

  function startCounters() {
    if (hasCounted) return;

    counters.forEach((counter) => {
      const target = Number(counter.dataset.target);
      let currentNumber = 0;

      const increment = Math.ceil(target / 100);

      function updateCounter() {
        if (currentNumber < target) {
          currentNumber += increment;

          if (currentNumber > target) {
            currentNumber = target;
          }

          counter.textContent = currentNumber;

          setTimeout(updateCounter, 20);
        } else {
          counter.textContent = target;
        }
      }

      updateCounter();
    });

    hasCounted = true;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounters();
        observer.unobserve(statisticsSection);
      }
    });
  });

  observer.observe(statisticsSection);
}


// ===================================
// 3. NAVIGATION MENU
// ===================================

const menuButton = document.querySelector(".menu-btn");
const closeMenuButton = document.querySelector(".close-menu");
const menuOverlay = document.querySelector(".menu-overlay");

if (menuButton && closeMenuButton && menuOverlay) {

  // Open the menu
  menuButton.addEventListener("click", function () {
    menuOverlay.classList.add("show-menu");
  });

  // Close the menu using the close button
  closeMenuButton.addEventListener("click", function () {
    menuOverlay.classList.remove("show-menu");
  });

  // Close the menu when a navigation link is clicked
  const menuLinks = menuOverlay.querySelectorAll("a");

  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      menuOverlay.classList.remove("show-menu");
    });
  });

  // Close the menu when the Escape key is pressed
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      menuOverlay.classList.remove("show-menu");
    }
  });
}



// ===================================
// 4. ADMISSIONS FAQ
// ===================================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

  const question = item.querySelector(".faq-question");
  const icon = question.querySelector("span");

  question.addEventListener("click", function () {

    item.classList.toggle("active");

    if (item.classList.contains("active")) {
      icon.textContent = "−";
    } else {
      icon.textContent = "+";
    }

  });

});




// ==============================
// GALLERY CATEGORY FILTERS
// ==============================

const galleryFilters = document.querySelectorAll(".gallery-filter");
const galleryItems = document.querySelectorAll(".gallery-item");

galleryFilters.forEach((button) => {

  button.addEventListener("click", () => {

    // Remove active class from all buttons
    galleryFilters.forEach((filter) => {
      filter.classList.remove("active");
    });

    // Add active class to clicked button
    button.classList.add("active");

    // Get selected category
    const selectedCategory = button.dataset.filter;

    // Filter gallery images
    galleryItems.forEach((item) => {

      const itemCategory = item.dataset.category;

      if (
        selectedCategory === "all" ||
        selectedCategory === itemCategory
      ) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }

    });

  });

});



// ==============================
// GALLERY IMAGE PREVIEW
// ==============================

// Create lightbox
const lightbox = document.createElement("div");
lightbox.className = "gallery-lightbox";

lightbox.innerHTML = `
  <button class="lightbox-close" aria-label="Close image preview">
    &times;
  </button>

  <img src="" alt="">

  <p class="lightbox-caption"></p>
`;

document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");
const lightboxClose = lightbox.querySelector(".lightbox-close");

// Open image preview
galleryItems.forEach((item) => {

  item.addEventListener("click", () => {

    const image = item.querySelector("img");
    const heading = item.querySelector("h3");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightboxCaption.textContent = heading.textContent;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

  });

});

// Close image preview
function closeLightbox() {

  lightbox.classList.remove("active");

  document.body.style.overflow = "";

}

lightboxClose.addEventListener("click", closeLightbox);

// Close when clicking outside the image
lightbox.addEventListener("click", (event) => {

  if (event.target === lightbox) {
    closeLightbox();
  }

});

// Close with Escape key
document.addEventListener("keydown", (event) => {

  if (
    event.key === "Escape" &&
    lightbox.classList.contains("active")
  ) {
    closeLightbox();
  }

});



// ===================================
// CONTACT FORM SUBMISSION
// ===================================

const contactForm = document.querySelector("#contactForm");

if (contactForm) {

  contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const submitButton = contactForm.querySelector(".contact-submit-btn");

    const originalButtonText = submitButton.innerHTML;

    submitButton.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    submitButton.disabled = true;

    try {

      const response = await fetch(
        "https://formsubmit.co/ajax/brightfuturengg@gmail.com",
        {
          method: "POST",
          body: new FormData(contactForm),
          headers: {
            "Accept": "application/json"
          }
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {

        window.location.href = "thank-you.html";

      } else {

        alert("Sorry, your message could not be sent. Please try again.");

        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;

      }

    } catch (error) {

      alert("Something went wrong. Please check your internet connection and try again.");

      submitButton.innerHTML = originalButtonText;
      submitButton.disabled = false;

      console.error("Contact form error:", error);

    }

  });

}











// =====================================
// SCROLL REVEAL ANIMATIONS
// =====================================

document.documentElement.classList.add("js-animations");

const animatedElements = document.querySelectorAll("[data-animate]");

if ("IntersectionObserver" in window) {
  const animationObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  animatedElements.forEach((element) => {
    animationObserver.observe(element);
  });
} else {
  animatedElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}








// =====================================
// WEBSITE PAGE LOADER
// =====================================

const pageLoader = document.createElement("div");

pageLoader.className = "page-loader";

pageLoader.setAttribute("role", "status");
pageLoader.setAttribute("aria-label", "Loading website");

pageLoader.innerHTML = `
  <div class="loader-content">

    <div class="loader-logo">BF</div>

    <div class="loader-spinner"></div>

    <h2>BRIGHT FUTURE</h2>

    <p>INTERNATIONAL SCHOOL</p>

  </div>
`;

document.body.prepend(pageLoader);


// Hide loader after the page finishes loading

function hidePageLoader() {
  pageLoader.classList.add("is-hidden");

  setTimeout(() => {
    pageLoader.remove();
  }, 700);
}

if (document.readyState === "complete") {
  setTimeout(hidePageLoader, 400);
} else {
  window.addEventListener("load", () => {
    setTimeout(hidePageLoader, 400);
  }, { once: true });
}
