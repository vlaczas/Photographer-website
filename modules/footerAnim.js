//footer animation
footerAnim();

export function footerAnim() {
  document.querySelectorAll('.footer__button').forEach(elem => elem.addEventListener('click', animRect));
  function animRect(event) {
    let target = event.target.parentElement;
    let animeRect = anime.timeline({
      targets: '.arrow-left',
      duration: 300,
      easing: 'easeInOutQuint',
    });
    animeRect.add({
      right: [10, -10],
    });
    animeRect.add(
      {
        targets: '.arrow-right',
        left: [10, -10],
      },
      0
    );
    animeRect.add({
      targets: '.arrow-left',
      translateX: 10,
      translateY: -10,
      rotate: 90,
    });
    animeRect.add(
      {
        targets: '.arrow-right',
        rotate: [180, 270],
        translateX: -10,
        translateY: -10,
        complete: () => leavePageDelayed(target),
      },
      300
    );
  }
}
export function leavePageDelayed(element) {
  let targetURL = element.getAttribute('href');
  drawMenuWrapper(true);
  setTimeout(() => (window.location = targetURL), 900);
}