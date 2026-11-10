const mobileNav = document.querySelector('.mobile-nav');
mobileNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) mobileNav.open = false;
});
mobileNav.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileNav.open) {
    mobileNav.open = false;
    mobileNav.querySelector('summary').focus();
  }
});

