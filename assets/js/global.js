$('.toggle-night').click(function() {
  $("body").toggleClass('light-theme');
  $(".moon").toggleClass('sun');
  $(".toggle-night").toggleClass('toggle-day');
});