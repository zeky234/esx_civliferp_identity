const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    galleryItems.forEach((item) => {
      const show = filter === 'all' || item.dataset.category === filter;
      item.hidden = !show;
    });
  });
});

const editorials = {
  'luz-dorada': {
    title: 'Editorial Luz Dorada',
    date: 'Abril 2026',
    photos: [
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80'
    ],
    products: ['Base HD de larga duración', 'Iluminador champagne', 'Fijador profesional', 'Labial nude satinado']
  },
  'neon-drag': {
    title: 'Editorial Neon Drag',
    date: 'Marzo 2026',
    photos: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80'
    ],
    products: ['Paleta neón prensada', 'Pigmentos UV', 'Pestaña XL', 'Spray sellador escénico']
  },
  'bosque-fantasia': {
    title: 'Editorial Bosque Fantasía',
    date: 'Enero 2026',
    photos: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1525258946800-98cfd641d0de?auto=format&fit=crop&w=900&q=80'
    ],
    products: ['Bodypaint hipoalergénico', 'Gemas faciales', 'Sombra metálica verde', 'Laca de fijación flexible']
  }
};

const modal = document.getElementById('editorialModal');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalGallery = document.getElementById('modalGallery');
const modalProducts = document.getElementById('modalProducts');

document.querySelectorAll('.editorial-card').forEach((card) => {
  card.addEventListener('click', () => {
    const data = editorials[card.dataset.editorial];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalDate.textContent = data.date;
    modalGallery.innerHTML = data.photos.map((photo) => `<img src="${photo}" loading="lazy" alt="${data.title}" />`).join('');
    modalProducts.innerHTML = data.products.map((product) => `<li>${product}</li>`).join('');
    modal.showModal();
  });
});

document.getElementById('closeModal').addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => {
  const bounds = modal.getBoundingClientRect();
  const inDialog = bounds.top <= event.clientY && event.clientY <= bounds.top + bounds.height && bounds.left <= event.clientX && event.clientX <= bounds.left + bounds.width;
  if (!inDialog) modal.close();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
