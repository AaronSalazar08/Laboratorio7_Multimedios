class ProductCard extends HTMLElement {
  static get observedAttributes() { return ['name', 'price', 'category', 'image', 'stock', 'id']; }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this._render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot) { this._render(); }
  }

  _render() {
    const name     = this.getAttribute('name')     || '';
    const price    = parseFloat(this.getAttribute('price') || '0');
    const category = this.getAttribute('category') || '';
    const image    = this.getAttribute('image')    || '';
    const stock    = parseInt(this.getAttribute('stock') || '0', 10);
    const id       = this.getAttribute('id')       || '';

    const inStock    = stock > 0;
    const stockLabel = stock === 0 ? 'Sin stock' : stock < 5 ? `Últimas ${stock}` : 'En stock';
    const stockClass = stock === 0 ? 'out' : stock < 5 ? 'low' : 'ok';

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; height: 100%; }
        .card {
          background: #13131a;
          border: 1px solid #22222e;
          border-radius: 2px;
          overflow: hidden;
          cursor: pointer;
          transition: border-color 150ms, transform 150ms;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .card:hover { border-color: #6366f1; transform: translateY(-2px); }
        .card:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }

        .img-wrap {
          position: relative;
          aspect-ratio: 1;
          background: #0d0d15;
          overflow: hidden;
          flex-shrink: 0;
        }
        img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 200ms;
          display: block;
        }
        .card:hover img { transform: scale(1.04); }

        .badge {
          position: absolute; top: 8px; right: 8px;
          font-size: 0.62rem; font-weight: 700;
          padding: 2px 6px; border-radius: 2px;
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        .badge.ok  { background: rgba(52,211,153,0.15); color: #34d399; }
        .badge.low { background: rgba(245,158,11,0.15);  color: #f59e0b; }
        .badge.out { background: rgba(248,113,113,0.15); color: #f87171; }

        .del-btn {
          position: absolute; top: 8px; left: 8px;
          background: rgba(10,10,15,0.75);
          border: 1px solid rgba(248,113,113,0.4);
          color: #f87171; border-radius: 2px;
          padding: 4px 6px; cursor: pointer;
          display: flex; align-items: center;
          opacity: 0; transition: opacity 150ms, background 150ms;
          backdrop-filter: blur(4px);
        }
        .card:hover .del-btn { opacity: 1; }
        .del-btn:hover { background: #f87171; color: #fff; border-color: #f87171; }
        .del-btn:focus-visible { outline: 2px solid #f87171; opacity: 1; }

        .body { padding: 12px; flex: 1; display: flex; flex-direction: column; gap: 6px; }
        .cat {
          font-size: 0.62rem; text-transform: uppercase;
          letter-spacing: 1px; color: #6366f1; font-weight: 600;
        }
        .name {
          font-size: 0.88rem; font-weight: 600; line-height: 1.3;
          flex: 1; color: #e5e5ed;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .footer {
          display: flex; align-items: center;
          justify-content: space-between; margin-top: 4px;
        }
        .price { font-size: 1rem; font-weight: 700; color: #e5e5ed; }

        .add-btn {
          background: #6366f1; color: #fff;
          border: none; border-radius: 2px;
          padding: 6px 10px; font-size: 0.75rem; font-weight: 600;
          cursor: pointer; transition: background 150ms;
          display: flex; align-items: center; gap: 4px;
          font-family: inherit;
        }
        .add-btn:hover:not(:disabled) { background: #4f46e5; }
        .add-btn:disabled { background: #252530; color: #555; cursor: not-allowed; }
        .add-btn:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }
      </style>
      <article class="card" role="listitem" tabindex="0" aria-label="${name}">
        <div class="img-wrap">
          <img src="${image || `https://picsum.photos/seed/${id}/300/300`}" alt="${name}" loading="lazy">
          <span class="badge ${stockClass}">${stockLabel}</span>
          <button class="del-btn" aria-label="Eliminar ${name}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </button>
        </div>
        <div class="body">
          <div class="cat">${category}</div>
          <div class="name">${name}</div>
          <div class="footer">
            <span class="price">$${price.toFixed(2)}</span>
            <button class="add-btn" ${!inStock ? 'disabled' : ''} aria-label="Agregar ${name} al carrito">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Agregar
            </button>
          </div>
        </div>
      </article>`;

    const card   = this.shadowRoot.querySelector('.card');
    const addBtn = this.shadowRoot.querySelector('.add-btn');
    const delBtn = this.shadowRoot.querySelector('.del-btn');

    card.addEventListener('click', e => {
      if (!addBtn.contains(e.target) && !delBtn.contains(e.target)) {
        this.dispatchEvent(new CustomEvent('product-selected', { detail: { id }, bubbles: true, composed: true }));
      }
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.dispatchEvent(new CustomEvent('product-selected', { detail: { id }, bubbles: true, composed: true }));
      }
    });
    addBtn.addEventListener('click', e => {
      e.stopPropagation();
      this.dispatchEvent(new CustomEvent('add-to-cart', { detail: { id }, bubbles: true, composed: true }));
    });
    delBtn.addEventListener('click', e => {
      e.stopPropagation();
      this.dispatchEvent(new CustomEvent('product-deleted', { detail: { id }, bubbles: true, composed: true }));
    });
  }
}

customElements.define('product-card', ProductCard);
