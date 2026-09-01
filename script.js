const body = document.body;

const header = document.getElementById("header");

const hamburger = document.getElementById("hamburger");

const navMenu = document.getElementById("nav-menu");

const navLinks = document.querySelectorAll(".nav-link");

const themeToggle = document.getElementById("theme-toggle");

const backToTop = document.getElementById("back-to-top");

const preloader = document.getElementById("preloader");

/* ===
   PRELOADER

   countdown
=== */

window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.classList.add("hidden");
  }, 500);
});

//  MOBILE NAVIGATION

hamburger.addEventListener("click", () => {
  const isOpen = hamburger.classList.toggle("active");

  navMenu.classList.toggle("active");

  hamburger.setAttribute("aria-expanded", isOpen);

  hamburger.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
});

/* Close navigation when link clicked */

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");

    navMenu.classList.remove("active");

    hamburger.setAttribute("aria-expanded", "false");

    hamburger.setAttribute("aria-label", "Open navigation menu");
  });
});

/* Close menu when clicking outside */

document.addEventListener("click", (event) => {
  if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
    navMenu.classList.remove("active");

    hamburger.classList.remove("active");

    hamburger.setAttribute("aria-expanded", "false");
  }
});

/* ===
   HEADER ON SCROLL
*/

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/*
 ACTIVE NAVIGATION
*/

const sections = document.querySelectorAll("main section[id]");

const updateActiveNav = () => {
  const scrollPosition = window.scrollY + 150;

  sections.forEach((section) => {
    const top = section.offsetTop;

    const height = section.offsetHeight;

    const id = section.getAttribute("id");

    if (scrollPosition >= top && scrollPosition < top + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);

      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
};

window.addEventListener("scroll", updateActiveNav);

/*
 DARK MODE */
const savedTheme = localStorage.getItem("bb-theme");

if (savedTheme === "dark") {
  body.classList.add("dark");
}

const updateThemeIcon = () => {
  const icon = themeToggle.querySelector("i");

  if (body.classList.contains("dark")) {
    icon.className = "fa-solid fa-sun";
  } else {
    icon.className = "fa-solid fa-moon";
  }
};

updateThemeIcon();

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");

  const isDark = body.classList.contains("dark");

  localStorage.setItem("bb-theme", isDark ? "dark" : "light");

  updateThemeIcon();
});

/* ===
   SCROLL REVEAL
=== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* ===
   BACK TO TOP
=== */

window.addEventListener("scroll", () => {
  if (window.scrollY > 600) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* ===
   COUNTDOWN
 */

const countdown = document.getElementById("countdown");

if (countdown) {
  const targetDate = new Date(countdown.dataset.date).getTime();

  const daysElement = document.getElementById("days");

  const hoursElement = document.getElementById("hours");

  const minutesElement = document.getElementById("minutes");

  const secondsElement = document.getElementById("seconds");

  const updateCountdown = () => {
    const now = new Date().getTime();

    const difference = targetDate - now;

    if (difference <= 0) {
      daysElement.textContent = "00";

      hoursElement.textContent = "00";

      minutesElement.textContent = "00";

      secondsElement.textContent = "00";

      return;
    }

    const days = Math.floor(difference / (1000 * 64 * 64 * 24));

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

    const minutes = Math.floor((difference / (1000 * 60)) % 60);

    const seconds = Math.floor((difference / 1000) % 60);

    daysElement.textContent = String(days).padStart(2, "0");

    hoursElement.textContent = String(hours).padStart(2, "0");

    minutesElement.textContent = String(minutes).padStart(2, "0");

    secondsElement.textContent = String(seconds).padStart(2, "0");
  };

  updateCountdown();

  setInterval(updateCountdown, 1000);
}

/* 
   ANIMATED COUNTERS
 */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const counter = entry.target;

      const target = Number(counter.dataset.target);

      let current = 0;

      const increment = Math.max(1, Math.ceil(target / 80));

      const updateCounter = () => {
        current += increment;

        if (current >= target) {
          counter.textContent = target.toLocaleString();

          return;
        }

        counter.textContent = current.toLocaleString();

        requestAnimationFrame(updateCounter);
      };

      updateCounter();

      observer.unobserve(counter);
    });
  },
  {
    threshold: 0.7,
  },
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

/* 
   GALLERY FILTER
 */

const filterButtons = document.querySelectorAll(".filter-btn");

const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    galleryItems.forEach((item) => {
      const category = item.dataset.category;

      if (filter === "all" || filter === category) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  });
});

/* ===
   GALLERY LIGHTBOX
=== */

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightbox-image");

const lightboxClose = document.getElementById("lightbox-close");

const lightboxPrev = document.getElementById("lightbox-prev");

const lightboxNext = document.getElementById("lightbox-next");

const galleryImages = Array.from(
  document.querySelectorAll(".gallery-item img"),
);

let currentImageIndex = 0;

const openLightbox = (index) => {
  currentImageIndex = index;

  const image = galleryImages[currentImageIndex];

  lightboxImage.src = image.src;

  lightboxImage.alt = image.alt;

  lightbox.classList.add("active");

  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  lightbox.classList.remove("active");

  document.body.style.overflow = "";
};

const showNextImage = () => {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;

  openLightbox(currentImageIndex);
};

const showPreviousImage = () => {
  currentImageIndex =
    (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;

  openLightbox(currentImageIndex);
};

galleryImages.forEach((image, index) => {
  const button = image.parentElement.querySelector(".gallery-open");

  button.addEventListener("click", () => {
    openLightbox(index);
  });
});

lightboxClose.addEventListener("click", closeLightbox);

lightboxNext.addEventListener("click", showNextImage);

lightboxPrev.addEventListener("click", showPreviousImage);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

/* Keyboard support */

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("active")) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowRight") {
    showNextImage();
  }

  if (event.key === "ArrowLeft") {
    showPreviousImage();
  }
});

/* ===
   TESTIMONIAL SLIDER
=== */

const testimonials = document.querySelectorAll(".testimonial");

const testimonialPrev = document.getElementById("testimonial-prev");

const testimonialNext = document.getElementById("testimonial-next");

const sliderDots = document.getElementById("slider-dots");

let testimonialIndex = 0;

/* Create dots */

testimonials.forEach((_, index) => {
  const dot = document.createElement("button");

  dot.className = "slider-dot";

  dot.setAttribute("aria-label", `View testimonial ${index + 1}`);

  dot.addEventListener("click", () => {
    showTestimonial(index);
  });

  sliderDots.appendChild(dot);
});

const dots = document.querySelectorAll(".slider-dot");

const showTestimonial = (index) => {
  testimonialIndex = index;

  testimonials.forEach((testimonial, i) => {
    testimonial.classList.toggle("active", i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
};

testimonialPrev.addEventListener("click", () => {
  testimonialIndex =
    (testimonialIndex - 1 + testimonials.length) % testimonials.length;

  showTestimonial(testimonialIndex);
});

testimonialNext.addEventListener("click", () => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;

  showTestimonial(testimonialIndex);
});

showTestimonial(0);

/* Automatic slider */

setInterval(() => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;

  showTestimonial(testimonialIndex);
}, 7000);

/* ===
   FAQ ACCORDION
=== */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((faq) => {
      faq.classList.remove("active");
    });

    if (!isActive) {
      item.classList.add("active");
    }
  });
});

/* ===
   VERSE OF THE WEEK
=== */

const verses = [
  {
    text: "Which hope we have as an anchor of the soul, both Sure and Steadfast, and which entereth into that within the veil.",

    reference: "Hebrews 6:19",
  },
  {
    text: "I can do all things through Christ who strengthens me.",

    reference: "Philippians 4:13",
  },
  {
    text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",

    reference: "Joshua 1:9",
  },

  {
    text: "Let no one despise your youth, but be an example to the believers.",

    reference: "1 Timothy 4:12",
  },

  {
    text: "Trust in the Lord with all your heart and lean not on your own understanding.",

    reference: "Proverbs 3:5",
  },
];

const verseElement = document.getElementById("verse");

const verseReference = verseElement.nextElementSibling;

const newVerseButton = document.getElementById("new-verse");

newVerseButton.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * verses.length);

  const selectedVerse = verses[randomIndex];

  verseElement.textContent = `"${selectedVerse.text}"`;

  verseReference.textContent = selectedVerse.reference;
});

/* ===
   CONTACT FORM VALIDATION
=== */

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name");

    const email = document.getElementById("email");

    const subject = document.getElementById("subject");

    const message = document.getElementById("message");

    const successMessage = document.getElementById("form-success");

    let isValid = true;

    /* Clear previous errors */

    document.querySelectorAll(".form-error").forEach((error) => {
      error.textContent = "";
    });

    /* Name */

    if (name.value.trim().length < 2) {
      name.nextElementSibling.textContent = "Please enter your name.";

      isValid = false;
    }

    /* Email */

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {
      email.nextElementSibling.textContent = "Please enter a valid email.";

      isValid = false;
    }

    /* Subject */

    if (subject.value.trim().length < 3) {
      subject.nextElementSibling.textContent = "Please enter a subject.";

      isValid = false;
    }

    /* Message */

    if (message.value.trim().length < 10) {
      message.nextElementSibling.textContent =
        "Message must be at least 10 characters.";

      isValid = false;
    }

    if (!isValid) {
      return;
    }

    /*
        FRONTEND DEMO ONLY

        Later connect this form to:

        - EmailJS
        - Formspree
        - Your own backend
      */

    successMessage.classList.add("show");

    contactForm.reset();

    setTimeout(() => {
      successMessage.classList.remove("show");
    }, 5000);
  });
}

/* ===
   CURRENT YEAR
 */

const currentYear = document.getElementById("current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* 
   SYSTEM DARK MODE
 */

if (!localStorage.getItem("bb-theme")) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (prefersDark) {
    body.classList.add("dark");

    updateThemeIcon();
  }
}

/* 
   ESCAPE KEY FOR MOBILE MENU
=== */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    navMenu.classList.remove("active");

    hamburger.classList.remove("active");

    hamburger.setAttribute("aria-expanded", "false");
  }
});
