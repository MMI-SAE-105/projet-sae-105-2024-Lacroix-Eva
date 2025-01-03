// *** MENU ***
const toggle = document.querySelector(".menu-btn");
const nav = document.querySelector(".menu");
const page = document.body;


  toggle.addEventListener("click", () => {
    const isOpen = toggle.ariaExpanded === "true";
    const isClosed = !isOpen;
    console.log("isOpen : ", isOpen, "isClosed : ", isClosed);
    
    nav.ariaHidden = isOpen;
    toggle.ariaExpanded = isClosed;
    ajout_class.classList.toggle("noscroll");
  });

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