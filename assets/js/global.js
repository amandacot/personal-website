const currentTheme = localStorage.getItem("theme");
if (currentTheme == "light") {
  $("body").addClass("light");
  $(".moon").addClass('sun');
  $(".toggle-night").addClass('toggle-day');
  $(".navbar-dark").addClass('navbar-light');
  $(".bg-dark").addClass('bg-light');
}
$('.toggle-night').click(function() {
  $("body").toggleClass('light');
  $(".moon").toggleClass('sun');
  $(".toggle-night").toggleClass('toggle-day');
  $(".navbar-dark").toggleClass('navbar-light');
  $(".bg-dark").toggleClass('bg-light');

  let theme = "dark";
  // const navbar = document.querySelector("nav");
  // const navbarClasses = navbar.classList;
  if ($("body").hasClass("light")) {
    theme = "light";
    // navbar.classList.remove("navbar-dark", "bg-dark");
    // navbar.classList.add("navbar-light", "bg-light");
  }
  // else {
  //   navbar.classList.remove("navbar-light", "bg-light");
  //   navbar.classList.add("navbar-dark", "bg-dark");
  // }
  localStorage.setItem("theme", theme);

});