// Navbar
const menuOpen = document.getElementById('menuOpen');
const links = document.querySelectorAll('.header__navbar__list__item a');
const list = document.getElementById('List');
const addNew = document.getElementById('AddNew');
const contact = document.getElementById('Contact');

const toggleMenu = () => {
  const navbar = document.querySelector('.header__navbar__list__container');
  navbar.classList.toggle('showNavbar');

  if (window.matchMedia('(max-width: 767px)').matches) {
    if (navbar.classList.contains('showNavbar')) {
      menuOpen.classList.add('fa-times');
      menuOpen.classList.remove('fa-bars');
      navbar.style.left = '0';
      document.body.style.overflow = 'hidden';
    } else {
      menuOpen.classList.remove('fa-times');
      menuOpen.classList.add('fa-bars');
      document.body.style.overflow = 'scroll';
      navbar.style.left = '-100%';
    }
  }
};
menuOpen.addEventListener('click', toggleMenu);

list.style.display = 'block';
addNew.style.display = 'none';
contact.style.display = 'none';

links.forEach((e) => {
  e.addEventListener('click', (el) => {
    toggleMenu();
    el.preventDefault();
    if (el.target.classList.contains('list')) {
      list.style.display = 'block';
      addNew.style.display = 'none';
      contact.style.display = 'none';
    } else if (el.target.classList.contains('add')) {
      list.style.display = 'none';
      addNew.style.display = 'block';
      contact.style.display = 'none';
    } else if (el.target.classList.contains('contact')) {
      list.style.display = 'none';
      addNew.style.display = 'none';
      contact.style.display = 'block';
    }
  });
});
