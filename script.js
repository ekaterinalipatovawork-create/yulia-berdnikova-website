document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const processObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      processObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.scroll-card').forEach((card) => processObserver.observe(card));

const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox?.querySelector('img');
document.querySelectorAll('[data-lightbox]').forEach((button) => {
  button.addEventListener('click', () => {
    lightboxImage.src = button.dataset.lightbox;
    lightbox.showModal();
  });
});
lightbox?.querySelector('button').addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

const applicationDialog = document.querySelector('#application-dialog');
const applicationForm = document.querySelector('#application-form');
document.querySelectorAll('[data-application]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    applicationDialog.showModal();
  });
});
applicationDialog?.querySelector('.application-close').addEventListener('click', () => applicationDialog.close());
applicationDialog?.addEventListener('click', (event) => {
  if (event.target === applicationDialog) applicationDialog.close();
});
applicationForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  applicationForm.querySelector('.form-success').hidden = false;
});

document.querySelector('#year').textContent = new Date().getFullYear();
