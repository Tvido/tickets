const preloader = document.querySelector('.preloader');
window.addEventListener('load', showPreloader);

function showPreloader() {
  preloader.classList.add('hide');
}
