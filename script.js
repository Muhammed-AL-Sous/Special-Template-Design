// Scroller Page

// Scroll Height Is : Content & Padding (Visible Or Not)
// Client Height Is : Just Visible Content & Padding

let scroller = document.querySelector(".scroller");
let height =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;
window.addEventListener("scroll", () => {
  let scrollTop = document.documentElement.scrollTop;
  scroller.style.width = `${(scrollTop / height) * 100}%`;
});

// Button Scroll To Top
let scrollToTopButtton = document.querySelector(".button-top");

window.addEventListener("scroll", () => {
  if (this.scrollY >= 1200) {
    scrollToTopButtton.classList.add("show");
  } else {
    scrollToTopButtton.classList.remove("show");
  }
});

scrollToTopButtton.addEventListener("click", () => {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
});

// ======================================================================= //

// Select Elements
let settingsIconBtn = document.querySelector(".settings-icon");
let settingsBox = document.querySelector(".settings-box");

// Check If There Is A Local Storage Color Option
let mainColor = window.localStorage.getItem("color_option");
const colorsLi = document.querySelectorAll(".colors-list li");
const randomBackEl = document.querySelectorAll(".random-background span");

// ======================================================================= //

settingsIconBtn.addEventListener("click", (e) => {
  // Toggle Class Fa-Spin For Rotation On Self
  e.target.classList.toggle("fa-spin");
  // Toggle Class Open On Main Settings Box
  settingsBox.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (
    e.target !== settingsIconBtn &&
    e.target !== settingsIconBtn &&
    !settingsBox.contains(e.target)
  ) {
    if (settingsIconBtn.classList.contains("fa-spin")) {
      settingsIconBtn.classList.remove("fa-spin");
    }
    if (settingsBox.classList.contains("open")) {
      settingsBox.classList.remove("open");
    }
  }
});

// ====================================================================== //

// Select All Links
const allLinks = document.querySelectorAll(".landing-page .links li a");

allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // To Not put # on the site, because element (a) is a link

    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// function scrollToSomewhere(elements) {
//   elements.forEach((ele) => {
//     ele.addEventListener("click", (e) => {
//       e.preventDefault();

//       document.querySelector(e.target.dataset.section).scrollIntoView({
//         behavior: "smooth",
//       });
//     });
//   });
// }

// scrollToSomewhere(allLinks);
// scrollToSomewhere(allBullets);

// ====================================================================== //

let toggleButton = document.querySelector(".toggle-menu");
let linksSmallScreens = document.querySelector(".links");

// Toggle menu open/close
toggleButton.addEventListener("click", (e) => {
  // We have margins between the span So if you click between them, the property won't work
  // So we say that the button is the span and the spaces inside it
  e.stopPropagation();
  toggleButton.classList.toggle("active");
  linksSmallScreens.classList.toggle("open");
});

// When Click On Any Link Will Close The Main Links & Reset The Toggle Button
document.querySelectorAll(".links li a").forEach((n) =>
  n.addEventListener("click", () => {
    toggleButton.classList.remove("active");
    linksSmallScreens.classList.remove("open");
  })
);

// Close menu if clicking outside
document.addEventListener("click", (e) => {
  if (!linksSmallScreens.contains(e.target) && e.target !== toggleButton) {
    // Close menu if open
    if (linksSmallScreens.classList.contains("open")) {
      toggleButton.classList.remove("active");
      linksSmallScreens.classList.remove("open");
    }
  }
});

// Prevent closing menu when clicking inside the menu
linksSmallScreens.addEventListener("click", (e) => {
  e.stopPropagation();
});

// ====================================================================== //

// Switch Colors

if (mainColor !== null) {
  // Local Storage Is Not Empty You Can Set It To Root Now
  // Set Color On Root From Local Storage
  document.documentElement.style.setProperty("--main-color", mainColor);

  colorsLi.forEach((li) => {
    // Remove Active Class From All Colors List Items
    li.classList.remove("active");

    // Add Active Class On Element With Data-color === Local Storage Item
    if (li.dataset.color === mainColor) {
      li.classList.add("active");
    }
  });
}

// Loop On All List Items
colorsLi.forEach((li) => {
  // Click On Every List Items
  li.addEventListener("click", (e) => {
    // Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // Set Color On Local Storage
    window.localStorage.setItem("color_option", e.target.dataset.color);

    // Remove Active Class From All Childrens
    // colorsLi.forEach((li) => {
    //   li.classList.remove("active");
    // });
    // Add Active Class On Target Element
    // e.target.classList.add("active");

    // OR
    handleActive(e);
  });
});

// ====================================================================== //

// Random Background Option
let backgroundOption = true;

// Variable To Control The Background Interval
let backgroundInterval;

// A Local Storage Random Background Item
let backgroundLocalItem = window.localStorage.getItem("background_option");

// Check If A Local Storage Random Background Is Not Empty
if (backgroundLocalItem !== null) {
  // console.log(typeof backgroundLocalItem); // string not boolean
  // The value returned from a local store whose type is a string,
  //  so we need to convert it to a boolean value
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  // Remove Active Class From All Childrens
  randomBackEl.forEach((span) => {
    span.classList.remove("active");
  });

  // Add Active Class On Target Element
  if (backgroundLocalItem === "true") {
    document
      .querySelector(".options-box .random-background .yes")
      .classList.add("active");
  } else {
    document
      .querySelector(".options-box .random-background .no")
      .classList.add("active");
  }
}

// Switch Random Background Option

// Loop On All Spans
randomBackEl.forEach((span) => {
  // Click On Every Span
  span.addEventListener("click", (e) => {
    // Remove Active Class From All Childrens
    // randomBackEl.forEach((span) => {
    //   span.classList.remove("active");
    // });
    // Add Active Class On Target Element
    // e.target.classList.add("active");

    // OR
    handleActive(e);

    // Clear Previous Interval Before Starting a New One
    clearInterval(backgroundInterval);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      window.localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      window.localStorage.setItem("background_option", false);
    }
  });
});

// ====================================================================== //

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of Imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Function Randomize Images
function randomizeImgs() {
  // Check Random Background Option Status
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // The random number must be inside the function
      // because its value is stored inside the variable if it is outside the function
      // it will repeat the same value every time Or you have to reload the page for the number to change
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // Change Background Image URL
      landingPage.style.backgroundImage = `url(../images/${imgsArray[randomNumber]})`;
      // OR
      // landingPage.style.backgroundImage ='url("../images/' + imgsArray[randomNumber] + '")';
    }, 5000);
  }
}

randomizeImgs();

// ====================================================================== //

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.addEventListener("scroll", () => {
  // offsetTop : The Distance Between The Beginning Of The Page And The Beginning Of The Selected Element
  let skillsOffSetTop = ourSkills.offsetTop;

  // Skills Outer Height : The Same Height Of Element With Padding And Margin
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height : interface returns the interior height of the window in pixels,
  // including the height of the horizontal scroll bar, if present.
  let windowHeight = window.innerHeight;

  // Window ScrollTop
  let windowScrollTop = window.pageYOffset;

  if (windowScrollTop >= skillsOffSetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skills .skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => (skill.style.width = skill.dataset.progress));
  }
});

// ====================================================================== //

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery .images-box img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Element
    let overlay = document.createElement("div");

    // Add Class To Overlay
    overlay.className = "popup-overlay";

    // Append Overlay To The Body
    document.body.appendChild(overlay);

    // Create The Popup Box
    let popupBox = document.createElement("div");

    // Add Class To The Popup Box
    popupBox.className = "popup-box";

    // Add The Alt To The Image
    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");

      // Create Text For Heading
      let imgText = document.createTextNode(img.alt);

      // Append The Text To The Heading
      imgHeading.appendChild(imgText);

      // Append The Heading To The Popup Box
      popupBox.appendChild(imgHeading);
    }

    // Create The Image
    let popupImage = document.createElement("img");

    // Set Image Source
    popupImage.src = img.src;

    // Add Image To The Popup Box
    popupBox.appendChild(popupImage);

    // Add The Popup Box To The Body
    document.body.appendChild(popupBox);

    // Create The Close Span
    let closeButton = document.createElement("span");

    // Create The Close Button Text
    let closeButtonText = document.createTextNode("X");

    // Append The Close Button Text To The Close Span
    closeButton.appendChild(closeButtonText);

    // Add Class To Close Button
    closeButton.className = "close-button";

    // Add Close Button To The Popup Box
    popupBox.appendChild(closeButton);
  });
});

// Close Popup

document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    // Remove The Current Popup
    e.target.parentNode.remove();

    // Remove The Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// ====================================================================== //

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

allBullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// ====================================================================== //

// Handle Active State

function handleActive(ev) {
  // Remove Active Class From All Childrens
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // Add Active Class On Target Element
  ev.target.classList.add("active");
}

// ====================================================================== //

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletsLocalStorage = window.localStorage.getItem("bullets_option");

if (bulletsLocalStorage !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");

    if (bulletsLocalStorage === "show") {
      bulletsContainer.style.display = "block";
      document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
      bulletsContainer.style.display = "none";
      document.querySelector(".bullets-option .no").classList.add("active");
    }
  });
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      window.localStorage.setItem("bullets_option", "show");
    } else {
      bulletsContainer.style.display = "none";
      window.localStorage.setItem("bullets_option", "hide");
    }
  });
});

// ====================================================================== //

// Reset Button Click

document
  .querySelector(".settings-box .reset-options")
  .addEventListener("click", () => {
    // Clear Local Storage Items
    window.localStorage.removeItem("background_option");
    window.localStorage.removeItem("color_option");
    window.localStorage.removeItem("bullets_option");

    // Reload Window
    window.location.reload();
  });

// ====================================================================== //

// Carousel Section ( Testimonials )
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper .buttons span");
const firstCardWidth = document.querySelector(".wrapper .card").offsetWidth;
const carouselChildren = [...carousel.children];

let isDragging = false;
let startX;
let startScrollLeft;
let timeOutId;

// Get The Number Of Cards That Can Fit In The Carousel At Once
let cardPreView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert Copies Of The Last Few Cards To Beginning Of Carousel For Infinite Scrolling
carouselChildren
  .slice(-cardPreView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// Insert Copies Of The First Few Cards To End Of Carousel For Infinite Scrolling
carouselChildren
  .slice(0, cardPreView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });

// add Event Listener To The Arrow Buttons To Scroll The Carousel Left And Right
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records The Initial Cursor And Scroll Position Of The Carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return; // If IsDragging Is False Return From Here
  // Updates The Scroll Position Of The Carousel Based On The Cursor Movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const autoPlay = () => {
  // Return If Window Is Smaller Than  800
  // if (window.innerWidth < 800) return;

  // Auto play The Carousel After Every 2500 ms
  timeOutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};

autoPlay();

const infiniteScroll = () => {
  // If The Carousel Is At The Beginning , Scroll To The End
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  } else if (
    // If The Carousel Is At The End , Scroll To The Beginning
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  // Clear Existing Timeout & Start AutoPlay If Mouse Is Not Hovering Over Carousel
  clearTimeout(timeOutId);
  if (!wrapper.matches(":hover")) {
    autoPlay();
  }
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", clearTimeout(timeOutId));
wrapper.addEventListener("mouseleave", autoPlay);

// ====================================================================== //
