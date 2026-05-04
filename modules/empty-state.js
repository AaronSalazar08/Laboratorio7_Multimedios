class EmptyState extends HTMLElement {
  static get observedAttributes() { return ['icon', 'title', 'message']; }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this._render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot) { this._render(); }
  }

  _render() {
    const icon    = this.getAttribute('icon')    || '📦';
    const title   = this.getAttribute('title')   || 'Sin resultados';
    const message = this.getAttribute('message') || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .wrap {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 48px 20px; text-align: center; gap: 10px;
        }
        .icon  { font-size: 2.5rem; opacity: 0.45; }
        .title { font-size: 0.95rem; font-weight: 600; color: #e5e5ed; }
        .msg   { font-size: 0.82rem; color: #9090a0; max-width: 240px; line-height: 1.5; }
      </style>
      <div class="wrap" role="status">
        <div class="icon" aria-hidden="true">${icon}</div>
        <div class="title">${title}</div>
        ${message ? `<div class="msg">${message}</div>` : ''}
      </div>`;
  }
}

customElements.define('empty-state', EmptyState);
