const STORAGE    = { products: 'techstore.products', cart: 'techstore.cart' };
const CATEGORIES = ['Laptops', 'Smartphones', 'Periféricos', 'Componentes', 'Audio', 'Gaming'];

// ===== STATE =====
const state = {
  products: [],
  cart: [],
  filters: { category: null, priceMin: '', priceMax: '', search: '', inStock: false },
};

// ===== PERSISTENCE =====

const SCHEMA_VERSION = 'v2';

function loadState() {
  // One-time migration: wipe old data if the schema version doesn't match
  if (localStorage.getItem('techstore.schema') !== SCHEMA_VERSION) {
    localStorage.removeItem(STORAGE.products);
    localStorage.removeItem(STORAGE.cart);
    localStorage.setItem('techstore.schema', SCHEMA_VERSION);
  }

  try {
    const p = localStorage.getItem(STORAGE.products);
    const c = localStorage.getItem(STORAGE.cart);
    state.products = p ? JSON.parse(p) : [];
    state.cart     = c ? JSON.parse(c) : [];
  } catch (_) {
    state.products = []; state.cart = [];
  }
  // No seeding — starts empty, persists whatever the user adds
}

function saveProducts() { localStorage.setItem(STORAGE.products, JSON.stringify(state.products)); }
function saveCart()     { localStorage.setItem(STORAGE.cart,     JSON.stringify(state.cart));     }

// ===== FILTERING =====
function filtered() {
  return state.products.filter(p => {
    if (state.filters.category && p.category !== state.filters.category) { return false; }
    if (state.filters.inStock && p.stock === 0) { return false; }
    const mn = parseFloat(state.filters.priceMin);
    const mx = parseFloat(state.filters.priceMax);
    if (!isNaN(mn) && p.price < mn) { return false; }
    if (!isNaN(mx) && mx > 0 && p.price > mx) { return false; }
    if (state.filters.search && !p.name.toLowerCase().includes(state.filters.search.toLowerCase())) { return false; }
    return true;
  });
}

function categoryCount(cat) { return state.products.filter(p => p.category === cat).length; }

// ===== CART HELPERS =====
function cartTotal() {
  return state.cart.reduce((sum, item) => {
    const p = state.products.find(x => x.id === item.id);
    return sum + (p ? p.price * item.quantity : 0);
  }, 0);
}

function cartCount() { return state.cart.reduce((s, i) => s + i.quantity, 0); }

function addToCart(id) {
  const product = state.products.find(p => p.id === id);
  if (!product || product.stock === 0) { return; }
  const existing = state.cart.find(i => i.id === id);
  if (existing) {
    if (existing.quantity >= product.stock) { showToast('Stock máximo alcanzado', 'warning'); return; }
    existing.quantity++;
  } else {
    state.cart.push({ id, quantity: 1 });
  }
  saveCart(); renderCart(); updateBadge();
  showToast(`${product.name} agregado`, 'success');
}

function removeFromCart(id) {
  state.cart = state.cart.filter(i => i.id !== id);
  saveCart(); renderCart(); updateBadge();
}

function changeQty(id, qty) {
  const item    = state.cart.find(i => i.id === id);
  const product = state.products.find(p => p.id === id);
  if (!item || !product) { return; }
  item.quantity = Math.max(1, Math.min(qty, product.stock));
  saveCart(); renderCart(); updateBadge();
}

function clearCart() {
  state.cart = []; saveCart(); renderCart(); updateBadge();
  showToast('Carrito vaciado', 'warning');
}

function deleteProduct(id) {
  const product = state.products.find(p => p.id === id);
  if (!product) { return; }
  // Also remove from cart if present
  state.cart = state.cart.filter(i => i.id !== id);
  state.products = state.products.filter(p => p.id !== id);
  saveProducts();
  saveCart();
  renderCatalog();
  renderCategories();
  updateBadge();
  showToast(`"${product.name}" eliminado`, 'warning');
}

// ===== DOM SHORTCUT =====
const $ = id => document.getElementById(id);

function updateBadge() { $('cart-badge').textContent = cartCount(); }

// ===== RENDERS =====
function renderCategories() {
  const list = $('category-list');
  list.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const chip = document.createElement('category-chip');
    chip.setAttribute('label',  cat);
    chip.setAttribute('count',  categoryCount(cat));
    chip.setAttribute('active', state.filters.category === cat ? 'true' : 'false');
    list.appendChild(chip);
  });
}

function renderCatalog() {
  const grid  = $('product-grid');
  const items = filtered();
  $('catalog-count').textContent = `${items.length} producto${items.length !== 1 ? 's' : ''}`;
  grid.innerHTML = '';

  if (items.length === 0) {
    const e = document.createElement('empty-state');
    e.setAttribute('icon',    '🔍');
    e.setAttribute('title',   'Sin resultados');
    e.setAttribute('message', 'Prueba con otros filtros o términos de búsqueda.');
    e.style.gridColumn = '1 / -1';
    grid.appendChild(e);
    return;
  }

  items.forEach(p => {
    const card = document.createElement('product-card');
    card.setAttribute('id',       p.id);
    card.setAttribute('name',     p.name);
    card.setAttribute('price',    p.price);
    card.setAttribute('category', p.category);
    card.setAttribute('image',    p.image);
    card.setAttribute('stock',    p.stock);
    grid.appendChild(card);
  });
}

function renderCart() {
  const container = $('cart-items');
  container.innerHTML = '';

  if (state.cart.length === 0) {
    const e = document.createElement('empty-state');
    e.setAttribute('icon',    '🛒');
    e.setAttribute('title',   'Carrito vacío');
    e.setAttribute('message', 'Agrega productos desde el catálogo.');
    container.appendChild(e);
  } else {
    state.cart.forEach(item => {
      const p = state.products.find(x => x.id === item.id);
      if (!p) { return; }
      const ci = document.createElement('cart-item');
      ci.setAttribute('id',       item.id);
      ci.setAttribute('name',     p.name);
      ci.setAttribute('price',    p.price);
      ci.setAttribute('quantity', item.quantity);
      ci.setAttribute('image',    p.image);
      ci.setAttribute('maxstock', p.stock);
      container.appendChild(ci);
    });
  }

  $('cart-total').textContent = `$${cartTotal().toFixed(2)}`;
}

// ===== MODALS =====
function openProductModal(id) {
  const p = state.products.find(x => x.id === id);
  if (!p) { return; }

  $('product-modal-title').textContent = p.name;
  const stockClass = p.stock === 0 ? 'out' : p.stock < 5 ? 'low' : '';
  const stockText  = p.stock === 0 ? 'Sin stock' : `${p.stock} disponibles`;
  const specsHtml  = p.specs
    ? Object.entries(p.specs).map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('')
    : '';

  $('product-modal-body').innerHTML = `
    <div class="product-detail-grid">
      <div>
        <img class="product-detail-img"
          src="${p.image || `https://picsum.photos/seed/${id}/400/400`}"
          alt="${p.name}">
      </div>
      <div class="product-detail-info">
        <div class="product-detail-category">${p.category}</div>
        <div class="product-detail-name">${p.name}</div>
        <div class="product-detail-price">$${parseFloat(p.price).toFixed(2)}</div>
        <div class="product-detail-stock ${stockClass}">${stockText}</div>
        ${p.description ? `<div class="product-detail-desc">${p.description}</div>` : ''}
        ${specsHtml ? `<table class="specs-table" aria-label="Especificaciones"><tbody>${specsHtml}</tbody></table>` : ''}
        <button class="btn btn-primary" id="detail-add-btn" style="margin-top:8px" ${p.stock === 0 ? 'disabled' : ''}>
          <svg width="13" height="13" aria-hidden="true"><use href="#icon-plus"/></svg>
          Agregar al carrito
        </button>
      </div>
    </div>`;

  $('detail-add-btn').addEventListener('click', () => { addToCart(id); closeProductModal(); });

  const overlay = $('product-modal-overlay');
  overlay.classList.add('visible');
  overlay.removeAttribute('aria-hidden');
  trapFocus($('product-modal'));
}

function closeProductModal() {
  $('product-modal-overlay').classList.remove('visible');
  $('product-modal-overlay').setAttribute('aria-hidden', 'true');
}

function openCart() {
  renderCart();
  $('cart-drawer').classList.add('open');
  $('cart-overlay').classList.add('visible');
  $('cart-overlay').removeAttribute('aria-hidden');
  trapFocus($('cart-drawer'));
}

function closeCart() {
  $('cart-drawer').classList.remove('open');
  $('cart-overlay').classList.remove('visible');
  $('cart-overlay').setAttribute('aria-hidden', 'true');
}

function openAddModal() {
  resetForm();
  $('add-modal-overlay').classList.add('visible');
  $('add-modal-overlay').removeAttribute('aria-hidden');
  trapFocus($('add-modal'));
  setTimeout(() => $('fp-name').focus(), 50);
}

function closeAddModal() {
  $('add-modal-overlay').classList.remove('visible');
  $('add-modal-overlay').setAttribute('aria-hidden', 'true');
}

// ===== FOCUS TRAP =====
function trapFocus(el) {
  const focusable = [...el.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
  )];
  if (!focusable.length) { return; }
  focusable[0].focus();

  function handler(e) {
    if (e.key !== 'Tab') { return; }
    if (e.shiftKey) {
      if (document.activeElement === focusable[0]) { e.preventDefault(); focusable[focusable.length - 1].focus(); }
    } else {
      if (document.activeElement === focusable[focusable.length - 1]) { e.preventDefault(); focusable[0].focus(); }
    }
  }

  el._trap && el.removeEventListener('keydown', el._trap);
  el._trap = handler;
  el.addEventListener('keydown', handler);
}

// ===== TOASTS =====
function showToast(msg, type = 'info') {
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  $('toast-container').appendChild(t);
  setTimeout(() => {
    t.classList.add('hiding');
    t.addEventListener('animationend', () => t.remove(), { once: true });
  }, 2800);
}

// ===== ADD PRODUCT FORM =====

// Holds the base64 data URL of the picked file (cleared on reset)
let _pendingImageDataUrl = null;

function resetForm() {
  $('add-product-form').reset();
  ['err-name', 'err-category', 'err-price', 'err-stock'].forEach(id => { $(id).textContent = ''; });
  $('specs-builder').innerHTML = '';
  addSpecRow();
  _clearImagePreview();
}

function _clearImagePreview() {
  _pendingImageDataUrl = null;
  $('img-upload-preview').hidden = true;
  $('img-upload-placeholder').hidden = false;
  $('fp-image-file').value = '';
  $('fp-image-url').value = '';
}

function _showImagePreview(dataUrl) {
  _pendingImageDataUrl = dataUrl;
  $('img-preview-el').src = dataUrl;
  $('img-upload-placeholder').hidden = true;
  $('img-upload-preview').hidden = false;
}

function addSpecRow(key = '', val = '') {
  const row = document.createElement('div');
  row.className = 'spec-row';
  row.innerHTML = `
    <input type="text" class="form-input spec-key" placeholder="Clave"  value="${key}" aria-label="Clave">
    <input type="text" class="form-input spec-val" placeholder="Valor"  value="${val}" aria-label="Valor">
    <button type="button" class="remove-spec-btn" aria-label="Eliminar fila">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>`;
  row.querySelector('.remove-spec-btn').addEventListener('click', () => row.remove());
  $('specs-builder').appendChild(row);
}

function validateAndSave() {
  const name     = $('fp-name').value.trim();
  const category = $('fp-category').value;
  const price    = parseFloat($('fp-price').value);
  const stock    = parseInt($('fp-stock').value, 10);
  const urlField = $('fp-image-url').value.trim();
  const desc     = $('fp-desc').value.trim();
  // Uploaded file takes priority; URL field is the fallback
  const image    = _pendingImageDataUrl || urlField;

  ['err-name', 'err-category', 'err-price', 'err-stock'].forEach(id => { $(id).textContent = ''; });

  let valid = true;
  if (!name)                      { $('err-name').textContent     = 'El nombre es requerido';      valid = false; }
  if (!category)                  { $('err-category').textContent = 'Selecciona una categoría';    valid = false; }
  if (isNaN(price) || price <= 0) { $('err-price').textContent    = 'Precio debe ser mayor que 0'; valid = false; }
  if (isNaN(stock) || stock < 0)  { $('err-stock').textContent    = 'Stock debe ser 0 o mayor';    valid = false; }
  if (!valid) { return; }

  const specs = {};
  $('specs-builder').querySelectorAll('.spec-row').forEach(row => {
    const k = row.querySelector('.spec-key').value.trim();
    const v = row.querySelector('.spec-val').value.trim();
    if (k && v) { specs[k] = v; }
  });

  const seed = Date.now();
  const product = {
    id: `p${seed}`,
    name, category, price, stock,
    image: image || `https://picsum.photos/seed/${seed}/400/400`,
    description: desc,
    specs,
  };

  state.products.push(product);
  saveProducts();
  renderCatalog();
  renderCategories();
  closeAddModal();
  showToast(`"${name}" agregado al catálogo`, 'success');
}

// ===== EVENT WIRING =====
function initEvents() {
  $('search-input').addEventListener('input', e => {
    state.filters.search = e.target.value;
    renderCatalog();
  });
  $('price-min').addEventListener('input', e => { state.filters.priceMin = e.target.value; renderCatalog(); });
  $('price-max').addEventListener('input', e => { state.filters.priceMax = e.target.value; renderCatalog(); });
  $('stock-filter').addEventListener('change', e => { state.filters.inStock = e.target.checked; renderCatalog(); });

  $('cart-toggle-btn').addEventListener('click', openCart);
  $('cart-close-btn').addEventListener('click', closeCart);
  $('cart-overlay').addEventListener('click', closeCart);

  $('clear-cart-btn').addEventListener('click', () => { if (state.cart.length) { clearCart(); } });
  $('checkout-btn').addEventListener('click', () => {
    if (!state.cart.length) { showToast('El carrito está vacío', 'warning'); return; }
    state.cart = []; saveCart(); renderCart(); updateBadge();
    closeCart();
    showToast('¡Compra finalizada! Gracias por tu pedido.', 'success');
  });

  $('add-product-btn').addEventListener('click', openAddModal);
  $('add-modal-close').addEventListener('click', closeAddModal);
  $('add-modal-cancel').addEventListener('click', closeAddModal);
  $('add-modal-overlay').addEventListener('click', e => {
    if (e.target === $('add-modal-overlay')) { closeAddModal(); }
  });
  $('add-spec-btn').addEventListener('click', () => addSpecRow());
  $('add-product-submit').addEventListener('click', validateAndSave);

  $('product-modal-close').addEventListener('click', closeProductModal);
  $('product-modal-overlay').addEventListener('click', e => {
    if (e.target === $('product-modal-overlay')) { closeProductModal(); }
  });

  // Delegated: category chips
  $('category-list').addEventListener('category-toggled', e => {
    const { label } = e.detail;
    state.filters.category = state.filters.category === label ? null : label;
    renderCategories();
    renderCatalog();
  });

  // Delegated: product grid
  $('product-grid').addEventListener('product-selected', e => openProductModal(e.detail.id));
  $('product-grid').addEventListener('add-to-cart',      e => addToCart(e.detail.id));
  $('product-grid').addEventListener('product-deleted',  e => deleteProduct(e.detail.id));

  // Delegated: cart items
  $('cart-items').addEventListener('item-removed',     e => removeFromCart(e.detail.id));
  $('cart-items').addEventListener('quantity-changed', e => changeQty(e.detail.id, e.detail.quantity));

  // Image upload: file picker
  $('fp-image-file').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) { return; }
    if (file.size > 5 * 1024 * 1024) { showToast('La imagen supera 5 MB', 'error'); return; }
    const reader = new FileReader();
    reader.onload = ev => _showImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  });

  // Image upload: keyboard trigger on the zone (Enter / Space)
  $('img-upload-zone').addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); $('fp-image-file').click(); }
  });

  // Image upload: drag-and-drop
  $('img-upload-zone').addEventListener('dragover', e => {
    e.preventDefault();
    $('img-upload-zone').classList.add('drag-over');
  });
  $('img-upload-zone').addEventListener('dragleave', () => {
    $('img-upload-zone').classList.remove('drag-over');
  });
  $('img-upload-zone').addEventListener('drop', e => {
    e.preventDefault();
    $('img-upload-zone').classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith('image/')) { showToast('Solo se aceptan imágenes', 'warning'); return; }
    if (file.size > 5 * 1024 * 1024) { showToast('La imagen supera 5 MB', 'error'); return; }
    const reader = new FileReader();
    reader.onload = ev => _showImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  });

  // Image upload: remove button
  $('img-remove-btn').addEventListener('click', e => {
    e.stopPropagation();
    _clearImagePreview();
  });

  // Escape key closes topmost open panel
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') { return; }
    if ($('product-modal-overlay').classList.contains('visible')) { closeProductModal(); return; }
    if ($('add-modal-overlay').classList.contains('visible'))     { closeAddModal();     return; }
    if ($('cart-drawer').classList.contains('open'))              { closeCart(); }
  });
}

// ===== INIT =====
function init() {
  loadState();
  renderCategories();
  renderCatalog();
  updateBadge();
  initEvents();
}

export const App = { init };
