/* Funzione per l'animazione della barra sotto i bottoni di navigazione */
function initFooter() {

  const buttons = document.querySelectorAll(".menu button");
  const indicator = document.getElementById("navIndicator");
  const nav = document.getElementById("navMenu");

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

      const category = this.textContent.trim();
      currentCategory = category;
      renderDestinations(category);
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


  /* Funzione per mostrare le destinazioni in base alla categoria selezionata */
  const destinations = {

    "Popular": [
      { city: "Ravenna", type: "Stays in villas" },
      { city: "Copenhagen", type: "Stays in apartments" },
      { city: "New York", type: "Holiday homes" },
      { city: "Giardini Naxos", type: "Stays in apartments" },
      { city: "Lecce", type: "Stays in houses" },
      { city: "Nice", type: "Stays in houses" },
      { city: "Sorrento", type: "Stays in houses" },
      { city: "Varazze", type: "Stays in villas" },
      { city: "Naples", type: "Holiday homes" },
      { city: "Riccione", type: "Stays in apartments" },
      { city: "Bucharest", type: "Stays in apartments" },
      { city: "Ostuni", type: "Holiday homes" },
      { city: "Los Angeles", type: "Stays in apartments" },
      { city: "Bologna", type: "Holiday homes" },
      { city: "Paris", type: "Holiday homes" },
      { city: "London", type: "Stays in apartments" },
      { city: "Rome", type: "Holiday homes" },
    ],

    "On the coast": [
      { city: "Positano", type: "Beach houses" },
      { city: "Amalfi", type: "Sea view apartments" },
      { city: "Malibu", type: "Luxury villas" },
      { city: "Santorini", type: "Holiday homes" },
      { city: "Mykonos", type: "Beach villas" },
      { city: "Cefalù", type: "Holiday homes" },
      { city: "Tropea", type: "Beach apartments" },
      { city: "Taormina", type: "Sea view houses" },
      { city: "Rimini", type: "Holiday homes" },
      { city: "Cinque Terre", type: "Apartments" },
      { city: "Split", type: "Beach villas" },
      { city: "Dubrovnik", type: "Holiday homes" },
      { city: "Ibiza", type: "Luxury villas" },
      { city: "Palma", type: "Beach houses" },
      { city: "Miami Beach", type: "Holiday homes" },
      { city: "Honolulu", type: "Beach apartments" },
      { city: "Gold Coast", type: "Luxury stays" },
    ],

    "Historic destinations": [
      { city: "Rome", type: "Historic homes" },
      { city: "Athens", type: "Historic centre stays" },
      { city: "Florence", type: "Apartments" },
      { city: "Prague", type: "Old town apartments" },
      { city: "Vienna", type: "Holiday homes" },
      { city: "Kyoto", type: "Traditional houses" },
      { city: "Jerusalem", type: "Historic stays" },
      { city: "Cairo", type: "Holiday homes" },
      { city: "Istanbul", type: "Historic apartments" },
      { city: "Matera", type: "Stone houses" },
      { city: "Siena", type: "Historic homes" },
      { city: "Verona", type: "Holiday homes" },
      { city: "Assisi", type: "Traditional stays" },
      { city: "Bruges", type: "Historic apartments" },
      { city: "Toledo", type: "Holiday homes" },
      { city: "Cusco", type: "Historic stays" },
      { city: "Edinburgh", type: "Old town homes" },

    ],

    Islands: [
      { city: "Sicily", type: "Holiday homes" },
      { city: "Sardinia", type: "Beach villas" },
      { city: "Capri", type: "Luxury stays" },
      { city: "Ischia", type: "Holiday homes" },
      { city: "Elba", type: "Apartments" },
      { city: "Corsica", type: "Beach houses" },
      { city: "Malta", type: "Holiday homes" },
      { city: "Gozo", type: "Traditional houses" },
      { city: "Madeira", type: "Holiday homes" },
      { city: "Tenerife", type: "Apartments" },
      { city: "Gran Canaria", type: "Beach villas" },
      { city: "Crete", type: "Holiday homes" },
      { city: "Bali", type: "Luxury villas" },
      { city: "Phuket", type: "Beach resorts" },
      { city: "Mauritius", type: "Luxury stays" },
      { city: "Zanzibar", type: "Beach houses" },
      { city: "Lampedusa", type: "Holiday homes" },
    ],

    Mountain: [
      { city: "Cortina d'Ampezzo", type: "Mountain chalets" },
      { city: "Livigno", type: "Cabins" },
      { city: "Ortisei", type: "Mountain homes" },
      { city: "Canazei", type: "Holiday chalets" },
      { city: "Courmayeur", type: "Luxury chalets" },
      { city: "Bormio", type: "Cabins" },
      { city: "Madonna di Campiglio", type: "Mountain homes" },
      { city: "Sestriere", type: "Holiday apartments" },
      { city: "Chamonix", type: "Ski chalets" },
      { city: "Zermatt", type: "Luxury chalets" },
      { city: "St. Moritz", type: "Mountain villas" },
      { city: "Interlaken", type: "Cabins" },
      { city: "Aspen", type: "Luxury homes" },
      { city: "Banff", type: "Cabins" },
      { city: "Whistler", type: "Holiday chalets" },
      { city: "Davos", type: "Mountain apartments" },
      { city: "Innsbruck", type: "Holiday homes" },
    ],

    Activity: [
      { city: "Dolomites", type: "Hiking stays" },
      { city: "Yosemite", type: "Nature cabins" },
      { city: "Lake Tahoe", type: "Adventure homes" },
      { city: "Queenstown", type: "Outdoor stays" },
      { city: "Moab", type: "Adventure cabins" },
      { city: "Costa Rica", type: "Eco lodges" },
      { city: "Patagonia", type: "Nature lodges" },
      { city: "Iceland", type: "Adventure homes" },
      { city: "Lapland", type: "Glass igloos" },
      { city: "Rotorua", type: "Nature stays" },
      { city: "Cape Town", type: "Surf houses" },
      { city: "Algarve", type: "Surf apartments" },
      { city: "Maui", type: "Beach activities" },
      { city: "Bali", type: "Surf villas" },
      { city: "Phuket", type: "Diving resorts" },
      { city: "Yellowstone", type: "Cabins" },
      { city: "Jasper", type: "Nature cabins" },
    ]
  };

  const row = document.getElementById("destinationsRow");

  const cities = document.querySelectorAll(".city");
  const types = document.querySelectorAll(".type");

  function renderDestinations(category) {

    const list = destinations[category];

    list.forEach((item, index) => {

      cities[index].textContent = item.city;
      types[index].textContent = item.type;

    });

  }
  renderDestinations(buttons[0].textContent.trim());


  (function search() {
    const nav = document.getElementById('mobileBottomNav');
    const tabs = document.querySelectorAll('.bottom-nav-item');
    let lastScrollY = window.scrollY;
    let ticking = false;


    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          const currentScrollY = window.scrollY;
          const delta = currentScrollY - lastScrollY;

          if (delta > 5) {
            // scroll verso il basso → nascondi
            nav.classList.add('hidden');
          } else if (delta < -5) {
            // scroll verso l'alto → mostra
            nav.classList.remove('hidden');
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    });

    // Gestione tab attivo al click
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function (e) {
        e.preventDefault();
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
      });
    });
  })();


}
