class QuantityInput extends HTMLElement {
  static get observedAttributes() { return ['value', 'min', 'max']; }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this._render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot) { this._render(); }
  }

  _render() {
    const value = parseInt(this.getAttribute('value') || '1', 10);
    const min   = parseInt(this.getAttribute('min')   || '1', 10);
    const max   = parseInt(this.getAttribute('max')   || '999', 10);

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-flex; }
        .wrap {
          display: flex;
          align-items: center;
          border: 1px solid #22222e;
          border-radius: 2px;
          overflow: hidden;
        }
        button {
          background: transparent;
          border: none;
          color: #e5e5ed;
          padding: 5px 9px;
          cursor: pointer;
          font-size: 1rem;
          line-height: 1;
          transition: background 150ms;
          font-family: inherit;
        }
        button:hover:not(:disabled) { background: rgba(255,255,255,0.07); }
        button:disabled { opacity: 0.35; cursor: not-allowed; }
        button:focus-visible { outline: 2px solid #6366f1; outline-offset: -2px; }
        input {
          width: 38px;
          text-align: center;
          background: transparent;
          border: none;
          border-left: 1px solid #22222e;
          border-right: 1px solid #22222e;
          color: #e5e5ed;
          font-size: 0.82rem;
          padding: 5px 2px;
          outline: none;
          -moz-appearance: textfield;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button { -webkit-appearance: none; }
      </style>
      <div class="wrap">
        <button class="dec" aria-label="Reducir" ${value <= min ? 'disabled' : ''}>−</button>
        <input type="number" value="${value}" min="${min}" max="${max}" aria-label="Cantidad">
        <button class="inc" aria-label="Aumentar" ${value >= max ? 'disabled' : ''}>+</button>
      </div>`;

    this.shadowRoot.querySelector('.dec').addEventListener('click', () => this._change(value - 1));
    this.shadowRoot.querySelector('.inc').addEventListener('click', () => this._change(value + 1));
    this.shadowRoot.querySelector('input').addEventListener('change', e => {
      this._change(parseInt(e.target.value, 10) || min);
    });
  }

  _change(next) {
    const min = parseInt(this.getAttribute('min') || '1', 10);
    const max = parseInt(this.getAttribute('max') || '999', 10);
    const clamped = Math.max(min, Math.min(max, next));
    this.setAttribute('value', clamped);
    this.dispatchEvent(new CustomEvent('quantity-changed', {
      detail: { quantity: clamped },
      bubbles: true,
      composed: true,
    }));
  }
}

customElements.define('quantity-input', QuantityInput);
