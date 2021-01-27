//lazy loading for images class
export default function initImgs() {
  let lazyImgs = document.querySelectorAll('.lazy-load');
  let lazyObserver = new IntersectionObserver(lazyLoad, { rootMargin: '200px' });
  lazyImgs.forEach(elem => lazyObserver.observe(elem));
  function lazyLoad(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let image = entry.target;
        image.src = image.dataset.src;
        image.classList.remove('lazy-load');
        lazyObserver.unobserve(image);
      }
    });
  }
}
