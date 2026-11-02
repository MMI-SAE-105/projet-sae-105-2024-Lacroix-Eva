// *** MENU ***
const toggle = document.querySelector(".menu-btn");
const nav = document.querySelector(".menu");
const page = document.body;
const labelOpen = toggle.getAttribute("aria-label");
const labelClose = toggle.dataset.labelClose;


  toggle.addEventListener("click", () => {
    const isOpen = toggle.ariaExpanded === "true";
    const isClosed = !isOpen;

    nav.ariaHidden = isOpen;
    toggle.ariaExpanded = isClosed;
    toggle.setAttribute("aria-label", isClosed ? labelClose : labelOpen);
    page.classList.toggle("noscroll");
  });

// *** CONTACT FORM ***
const contactForm = document.querySelector(".contact__form");

if (contactForm) {
  const fields = contactForm.querySelectorAll(".contact__input");
  let submitted = false;

  const checkField = (field) => {
    const error = document.getElementById(field.getAttribute("aria-describedby"));
    let message = "";

    if (field.validity.valueMissing || field.value.trim() === "") {
      message = field.dataset.errorRequired;
    } else if (field.validity.typeMismatch) {
      message = field.dataset.errorFormat;
    }

    error.textContent = message;
    if (message) {
      field.setAttribute("aria-invalid", "true");
    } else {
      field.removeAttribute("aria-invalid");
    }
    return !message;
  };

  contactForm.addEventListener("submit", (event) => {
    submitted = true;
    const invalidFields = [...fields].filter((field) => !checkField(field));

    if (invalidFields.length > 0) {
      event.preventDefault();
      invalidFields[0].focus();
    }
  });

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      if (submitted) checkField(field);
    });
  });
}

// *** GALLERY ***
const gallery = document.querySelector(".gallery__ecran");
const prevButton = document.querySelector(".gallery__button--prev");
const nextButton = document.querySelector(".gallery__button--next");

if (gallery && prevButton && nextButton) {
  const items = document.querySelectorAll(".gallery__items");
  const itemWidth = items[0].clientWidth;

  
  prevButton.addEventListener("click", () => {
    gallery.scrollBy({ left: -itemWidth, behavior: "smooth" });
  });

  nextButton.addEventListener("click", () => {
    gallery.scrollBy({ left: itemWidth, behavior: "smooth" });
  });
}