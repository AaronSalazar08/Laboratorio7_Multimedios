class CategoryChip extends HTMLElement {
  static get observedAttributes() { return ['label', 'active', 'count']; }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this._render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot) { this._render(); }
  }

  _render() {
    const label  = this.getAttribute('label')  || '';
    const active = this.getAttribute('active') === 'true';
    const count  = this.getAttribute('count')  || '0';

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        button {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; padding: 7px 10px;
          border: 1px solid ${active ? '#6366f1' : '#22222e'};
          border-radius: 2px;
          background: ${active ? 'rgba(99,102,241,0.12)' : 'transparent'};
          color: ${active ? '#e5e5ed' : '#9090a0'};
          cursor: pointer;
          font-size: 0.82rem;
          font-weight: ${active ? '600' : '400'};
          transition: all 150ms;
          text-align: left;
          font-family: inherit;
        }
        button:hover { border-color: #6366f1; color: #e5e5ed; }
        button:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }
        .count {
          font-size: 0.68rem; font-weight: 600;
          border-radius: 10px; padding: 1px 6px;
          background: ${active ? '#6366f1' : 'rgba(144,144,160,0.15)'};
          color: ${active ? '#fff' : '#9090a0'};
        }
      </style>
      <button role="checkbox" aria-checked="${active}" aria-label="${label}">
        <span>${label}</span>
        <span class="count">${count}</span>
      </button>`;

    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('category-toggled', {
        detail: { label },
        bubbles: true,
        composed: true,
      }));
    });
  }
}

customElements.define('category-chip', CategoryChip);
