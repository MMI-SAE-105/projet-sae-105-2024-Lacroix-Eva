// *** MENU ***
const toggle = document.querySelector(".menu-btn");
const nav = document.querySelector(".menu");
const page = document.body;
const labelOpen = toggle.getAttribute("aria-label");
const labelClose = toggle.dataset.labelClose;
const menuLinks = nav.querySelectorAll("a");
const lastMenuLink = menuLinks[menuLinks.length - 1];

const setMenu = (open) => {
  nav.ariaHidden = !open;
  toggle.ariaExpanded = open;
  toggle.setAttribute("aria-label", open ? labelClose : labelOpen);
  page.classList.toggle("noscroll", open);
};

  toggle.addEventListener("click", () => {
    const isOpen = toggle.ariaExpanded === "true";
    setMenu(!isOpen);
  });

  // Menu ouvert : le focus reste entre le bouton et les liens du menu, Échap le ferme
  document.addEventListener("keydown", (event) => {
    if (toggle.ariaExpanded !== "true") return;

    if (event.key === "Escape") {
      setMenu(false);
      toggle.focus();
    } else if (event.key === "Tab") {
      if (event.shiftKey && document.activeElement === toggle) {
        event.preventDefault();
        lastMenuLink.focus();
      } else if (!event.shiftKey && document.activeElement === lastMenuLink) {
        event.preventDefault();
        toggle.focus();
      }
    }
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

  // Annonce le film affiché aux lecteurs d'écran (message de statut, RGAA 7.5)
  const status = document.querySelector("[data-gallery-status]");
  if (status) {
    let current = 0;
    let timer;
    gallery.addEventListener("scroll", () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const index = Math.round(gallery.scrollLeft / items[0].offsetWidth);
        if (index === current || !items[index]) return;
        current = index;
        const title = items[index].querySelector("figcaption").textContent.trim();
        status.textContent = status.dataset.template
          .replace("{n}", index + 1)
          .replace("{total}", items.length)
          .replace("{title}", title);
      }, 200);
    });
  }
}