fetch("navigation.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navigation").innerHTML = html;

    initNavigation();
  });
