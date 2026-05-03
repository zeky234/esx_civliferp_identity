const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    galleryItems.forEach((item) => { item.hidden = !(filter === 'all' || item.dataset.category === filter); });
  });
});

const editorials = {
  'luz-dorada': { title: 'Editorial Luz Dorada', date: 'Abril 2026', folder: 'assets/editoriales/luz-dorada', photos: ['01.jpg', '02.jpg', '03.jpg', '04.jpg'], products: ['Base HD de larga duración', 'Iluminador champagne', 'Fijador profesional', 'Labial nude satinado'] },
  'neon-drag': { title: 'Editorial Neon Drag', date: 'Marzo 2026', folder: 'assets/editoriales/neon-drag', photos: ['01.jpg', '02.jpg', '03.jpg', '04.jpg'], products: ['Paleta neón prensada', 'Pigmentos UV', 'Pestaña XL', 'Spray sellador escénico'] },
  'bosque-fantasia': { title: 'Editorial Bosque Fantasía', date: 'Enero 2026', folder: 'assets/editoriales/bosque-fantasia', photos: ['01.jpg', '02.jpg', '03.jpg', '04.jpg'], products: ['Bodypaint hipoalergénico', 'Gemas faciales', 'Sombra metálica verde', 'Laca de fijación flexible'] }
};
const fallbackImages=['https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80'];
const modal=document.getElementById('editorialModal');
const modalTitle=document.getElementById('modalTitle');
const modalDate=document.getElementById('modalDate');
const modalGallery=document.getElementById('modalGallery');
const modalProducts=document.getElementById('modalProducts');
const downloadSheet=document.getElementById('downloadSheet');
let currentEditorial=null;

document.querySelectorAll('.editorial-card').forEach((card)=>{card.addEventListener('click',()=>{const data=editorials[card.dataset.editorial];if(!data)return;currentEditorial=data;modalTitle.textContent=data.title;modalDate.textContent=data.date;modalGallery.innerHTML=data.photos.map((f,i)=>`<img src="${data.folder}/${f}" loading="lazy" onerror="this.src='${fallbackImages[i%fallbackImages.length]}'" alt="${data.title} ${i+1}" />`).join('');modalProducts.innerHTML=data.products.map((p)=>`<li>${p}</li>`).join('');modal.showModal();});});

downloadSheet.addEventListener('click',()=>{if(!currentEditorial)return;const content=`${currentEditorial.title}\nFecha: ${currentEditorial.date}\n\nProductos utilizados:\n- ${currentEditorial.products.join('\n- ')}\n\nFotos:\n- ${currentEditorial.photos.join('\n- ')}`;const blob=new Blob([content],{type:'application/pdf'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`${currentEditorial.title.toLowerCase().replace(/\s+/g,'-')}-ficha.pdf`;a.click();});

document.getElementById('closeModal').addEventListener('click',()=>modal.close());
const observer = new IntersectionObserver((entries)=>{entries.forEach((e)=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:0.12});
document.querySelectorAll('.fade-in').forEach((el)=>observer.observe(el));
