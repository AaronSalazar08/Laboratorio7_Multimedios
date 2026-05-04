class CartItem extends HTMLElement {
  static get observedAttributes() { return ['name', 'price', 'quantity', 'image', 'id', 'maxstock']; }

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
    const quantity = parseInt(this.getAttribute('quantity') || '1', 10);
    const image    = this.getAttribute('image')    || '';
    const id       = this.getAttribute('id')       || '';
    const maxstock = parseInt(this.getAttribute('maxstock') || '999', 10);

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .item {
          display: flex; gap: 10px; align-items: center;
          padding: 10px; background: #0d0d15;
          border: 1px solid #22222e; border-radius: 2px;
        }
        img {
          width: 52px; height: 52px;
          object-fit: cover; border-radius: 2px;
          flex-shrink: 0; background: #13131a;
        }
        .info { flex: 1; min-width: 0; }
        .name {
          font-size: 0.82rem; font-weight: 600;
          white-space: nowrap; overflow: hidden;
          text-overflow: ellipsis; color: #e5e5ed;
        }
        .sub { font-size: 0.75rem; color: #9090a0; margin-top: 3px; }
        .sub strong { color: #e5e5ed; }
        .controls {
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 6px; flex-shrink: 0;
        }
        .del {
          background: none; border: none; color: #9090a0;
          cursor: pointer; padding: 2px; display: flex;
          border-radius: 2px; transition: color 150ms;
        }
        .del:hover { color: #f87171; }
        .del:focus-visible { outline: 2px solid #6366f1; }
      </style>
      <div class="item">
        <img src="${image || `https://picsum.photos/seed/${id}/80/80`}" alt="${name}" loading="lazy">
        <div class="info">
          <div class="name">${name}</div>
          <div class="sub">
            $${price.toFixed(2)} × ${quantity} = <strong>$${(price * quantity).toFixed(2)}</strong>
          </div>
        </div>
        <div class="controls">
          <button class="del" aria-label="Eliminar ${name}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </button>
          <quantity-input value="${quantity}" min="1" max="${maxstock}"></quantity-input>
        </div>
      </div>`;

    this.shadowRoot.querySelector('.del').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('item-removed', { detail: { id }, bubbles: true, composed: true }));
    });

    this.shadowRoot.querySelector('quantity-input').addEventListener('quantity-changed', e => {
      this.dispatchEvent(new CustomEvent('quantity-changed', {
        detail: { id, quantity: e.detail.quantity },
        bubbles: true,
        composed: true,
      }));
    });
  }
}

customElements.define('cart-item', CartItem);
