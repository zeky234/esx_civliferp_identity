const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    galleryItems.forEach((item) => {
      item.hidden = !(filter === 'all' || item.dataset.category === filter);
    });
  });
});

const editorials = {
  'luz-dorada': { title: 'Editorial Luz Dorada', date: 'Abril 2026', folder: 'assets/editoriales/luz-dorada', photos: ['01.jpg', '02.jpg', '03.jpg'], products: ['Base HD de larga duración', 'Iluminador champagne', 'Fijador profesional', 'Labial nude satinado'] },
  'neon-drag': { title: 'Editorial Neon Drag', date: 'Marzo 2026', folder: 'assets/editoriales/neon-drag', photos: ['01.jpg', '02.jpg', '03.jpg'], products: ['Paleta neón prensada', 'Pigmentos UV', 'Pestaña XL', 'Spray sellador escénico'] },
  'bosque-fantasia': { title: 'Editorial Bosque Fantasía', date: 'Enero 2026', folder: 'assets/editoriales/bosque-fantasia', photos: ['01.jpg', '02.jpg', '03.jpg'], products: ['Bodypaint hipoalergénico', 'Gemas faciales', 'Sombra metálica verde', 'Laca de fijación flexible'] }
};

const fallbackImages = [
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80'
];

const modal = document.getElementById('editorialModal');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalGallery = document.getElementById('modalGallery');
const modalProducts = document.getElementById('modalProducts');
const downloadSheet = document.getElementById('downloadSheet');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
let currentImages = [];
let currentIndex = 0;
let currentEditorial = null;

function resolveImagePath(editorial, fileName, idx) {
  return `${editorial.folder}/${fileName}` || fallbackImages[idx % fallbackImages.length];
}

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = currentImages[currentIndex];
  lightbox.showModal();
}

function stepLightbox(step) {
  currentIndex = (currentIndex + step + currentImages.length) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex];
}

document.querySelectorAll('.editorial-card').forEach((card) => {
  card.addEventListener('click', () => {
    const data = editorials[card.dataset.editorial];
    if (!data) return;
    currentEditorial = data;
    modalTitle.textContent = data.title;
    modalDate.textContent = data.date;
    currentImages = data.photos.map((file, idx) => resolveImagePath(data, file, idx));

    modalGallery.innerHTML = currentImages.map((photo, idx) => `<button class="lightbox-thumb" data-index="${idx}"><img src="${photo}" loading="lazy" onerror="this.src='${fallbackImages[idx % fallbackImages.length]}'" alt="${data.title} ${idx + 1}" /></button>`).join('');
    modalProducts.innerHTML = data.products.map((product) => `<li>${product}</li>`).join('');

    modal.showModal();
    modal.querySelectorAll('.lightbox-thumb').forEach((thumb) => {
      thumb.addEventListener('click', () => openLightbox(Number(thumb.dataset.index)));
    });
  });
});

downloadSheet.addEventListener('click', () => {
  if (!currentEditorial) return;
  const content = `${currentEditorial.title}\nFecha: ${currentEditorial.date}\n\nProductos utilizados:\n- ${currentEditorial.products.join('\n- ')}\n\nFotos:\n- ${currentEditorial.photos.join('\n- ')}`;
  const blob = new Blob([content], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${currentEditorial.title.toLowerCase().replace(/\s+/g, '-')}-ficha.pdf`;
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById('closeModal').addEventListener('click', () => modal.close());
document.getElementById('closeLightbox').addEventListener('click', () => lightbox.close());
document.getElementById('prevImg').addEventListener('click', () => stepLightbox(-1));
document.getElementById('nextImg').addEventListener('click', () => stepLightbox(1));

let touchStartX = 0;
lightbox.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
lightbox.addEventListener('touchend', (e) => {
  const delta = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(delta) > 40) stepLightbox(delta > 0 ? -1 : 1);
}, { passive: true });

document.addEventListener('keydown', (e) => {
  if (!lightbox.open) return;
  if (e.key === 'ArrowRight') stepLightbox(1);
  if (e.key === 'ArrowLeft') stepLightbox(-1);
  if (e.key === 'Escape') lightbox.close();
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
