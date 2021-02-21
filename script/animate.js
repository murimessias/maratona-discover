document.addEventListener('DOMContentLoaded', () => {
  let tl = gsap.timeline();

  tl.fromTo(
    '.anim-0',
    0.75,
    {
      opacity: 1,
    },

    {
      opacity: 0,
      ease: 'expo.ease.inOut',
      delay: 2.5,
    }
  )

    .fromTo(
      '.anim-1',
      0.3,
      {
        opacity: 0,
        y: 10,
      },

      {
        opacity: 1,
        y: 0,
        ease: 'expo.ease.inOut',
      }
    )

    .fromTo(
      '.anim-2',
      0.3,
      {
        opacity: 0,
        y: 10,
      },

      {
        opacity: 1,
        y: 0,
        ease: 'expo.ease.inOut',
      }
    )

    .fromTo(
      '.anim-3',
      0.3,
      {
        opacity: 0,
        y: 10,
      },

      {
        opacity: 1,
        y: 0,
        ease: 'expo.ease.inOut',
      },
      '+=0.05'
    )

    .fromTo(
      '.anim-4',
      0.3,
      {
        opacity: 0,
        y: 10,
      },

      {
        opacity: 1,
        y: 0,
        ease: 'expo.ease.inOut',
      },
      '+=0.05'
    )

    .fromTo(
      '.anim-5',
      0.3,
      {
        opacity: 0,
        y: 10,
      },

      {
        opacity: 1,
        y: 0,
        ease: 'expo.ease.inOut',
      }
    );
});

function removeScreen() {
  const loadingScreen = document.querySelector('.loading-screen');
  loadingScreen.style.display = 'none';
  loadingScreen.style.visibility = 'hidden';
}

setTimeout(() => {
  removeScreen();
}, 5000);
