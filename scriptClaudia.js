/* Funzione per l'animazione della barra sotto i bottoni di navigazione */
const buttons = document.querySelectorAll(".menu button")
const indicator = document.getElementById("navIndicator")
const nav = document.getElementById("navMenu")

function moveIndicator(btn) {
  const navRect = nav.getBoundingClientRect()
  const btnRect = btn.getBoundingClientRect()
  const targetLeft = btnRect.left - navRect.left + nav.scrollLeft
  const targetWidth = btn.offsetWidth

  const currentLeft = parseFloat(
    indicator.style.transform?.replace("translateX(", "") || 0,
  )
  const currentWidth = parseFloat(indicator.style.width || 0)

  const goingRight = targetLeft > currentLeft

  if (goingRight) {
    const stretchWidth = targetLeft + targetWidth - currentLeft

    indicator.style.transition = "width 0.25s cubic-bezier(0.4, 0, 1, 1)"
    indicator.style.width = stretchWidth + "px"

    setTimeout(() => {
      indicator.style.transition =
        "transform 0.25s cubic-bezier(0, 0, 0.2, 1), width 0.25s cubic-bezier(0, 0, 0.2, 1)"
      indicator.style.transform = `translateX(${targetLeft}px)`
      indicator.style.width = targetWidth + "px"
    }, 220)
  } else {
    const stretchWidth = currentLeft + currentWidth - targetLeft

    indicator.style.transition =
      "transform 0.25s cubic-bezier(0.4, 0, 1, 1), width 0.25s cubic-bezier(0.4, 0, 1, 1)"
    indicator.style.transform = `translateX(${targetLeft}px)`
    indicator.style.width = stretchWidth + "px"

    setTimeout(() => {
      indicator.style.transition = "width 0.25s cubic-bezier(0, 0, 0.2, 1)"
      indicator.style.width = targetWidth + "px"
    }, 220)
  }
}

buttons.forEach((btn) => {
  btn.addEventListener("click", function () {
    buttons.forEach((item) => {
      item.classList.remove("active")
      item.setAttribute("aria-pressed", "false")
    });

    this.classList.add("active");
    this.setAttribute("aria-pressed", "true")

    moveIndicator(this)
  })
})

/* Funzione per mostrare più destinazioni */
const btn = document.getElementById("show-more")
const extra = document.getElementById("extra-destinations")
const showElement = document.getElementById("show-element")

btn.addEventListener("click", function (element) {
  element.preventDefault()

  extra.classList.remove("d-none")

  const li = this.closest("li")

  li.innerHTML = `
        <a href="#" class="text-decoration-none text-black">
        <span class="d-block mb-0 fw-medium">Catania</span>
                                        <span class="d-block mb-0 text-secondary">Stays in villas</span>
           
        </a>
    `
})

/* Funzione per la gestione delle frecce di scorrimento da mobile */
const arrowLeft = document.getElementById("arrowLeft")
const arrowRight = document.getElementById("arrowRight")
const fadeRight = document.getElementById("fadeRight")

const SCROLL_AMOUNT = 120

function updateArrows() {
  const scrollLeft = nav.scrollLeft
  const maxScroll = nav.scrollWidth - nav.clientWidth

  if (scrollLeft > 5) {
    arrowLeft.classList.add("visible")
  } else {
    arrowLeft.classList.remove("visible")
  }

  const atEnd = scrollLeft >= maxScroll - 5
  arrowRight.style.opacity = atEnd ? "0" : "1"
  arrowRight.style.pointerEvents = atEnd ? "none" : "auto"
  fadeRight.style.opacity = atEnd ? "0" : "1"
}

arrowRight.addEventListener("click", () => {
  nav.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" })
})

arrowLeft.addEventListener("click", () => {
  nav.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" })
})

nav.addEventListener("scroll", updateArrows)

updateArrows()