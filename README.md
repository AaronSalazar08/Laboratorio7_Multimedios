<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TechStore</title>
  <style>
    /* ===== RESET & BASE ===== */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #0a0a0f;
      --panel: #13131a;
      --border: #22222e;
      --text: #e5e5ed;
      --text-muted: #9090a0;
      --accent-indigo: #6366f1;
      --accent-pink: #ff1493;
      --radius: 2px;
      --header-h: 60px;
      --sidebar-w: 240px;
      --transition: 150ms ease;
    }

    html { font-size: 14px; }

    body {
      font-family: -apple-system, "Segoe UI", Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* ===== HEADER ===== */
    .header {
      position: fixed;
      top: 0; left: 0; right: 0;
      height: var(--header-h);
      background: var(--panel);
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 0 20px;
      z-index: 100;
    }

    .logo {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text);
      white-space: nowrap;
      letter-spacing: -0.5px;
      flex-shrink: 0;
    }
    .logo span { color: var(--accent-indigo); }

    .search-bar {
      flex: 1;
      max-width: 480px;
      position: relative;
    }
    .search-bar input {
      width: 100%;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      color: var(--text);
      padding: 8px 12px 8px 36px;
      font-size: 0.875rem;
      outline: none;
      transition: border-color var(--transition);
    }
    .search-bar input:focus-visible { border-color: var(--accent-indigo); }
    .search-bar input::placeholder { color: var(--text-muted); }
    .search-icon {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      pointer-events: none;
    }

    .header-actions { display: flex; align-items: center; gap: 10px; margin-left: auto; }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 14px;
      border: 1px solid transparent;
      border-radius: var(--radius);
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition);
      font-family: inherit;
    }
    .btn:focus-visible { outline: 2px solid var(--accent-indigo); outline-offset: 2px; }
    .btn-primary { background: var(--accent-indigo); color: #fff; }
    .btn-primary:hover:not(:disabled) { background: #4f46e5; }
    .btn-primary:disabled { background: #333; color: #666; cursor: not-allowed; }
    .btn-ghost { background: transparent; color: var(--text-muted); border-color: var(--border); }
    .btn-ghost:hover { color: var(--text); border-color: var(--text-muted); }

    .cart-btn {
      position: relative;
      background: transparent;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      color: var(--text);
      padding: 7px 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all var(--transition);
      font-size: 0.8rem;
      font-family: inherit;
    }
    .cart-btn:hover { border-color: var(--accent-indigo); color: var(--accent-indigo); }
    .cart-btn:focus-visible { outline: 2px solid var(--accent-indigo); outline-offset: 2px; }

    .cart-badge {
      background: var(--accent-pink);
      color: #fff;
      font-size: 0.65rem;
      font-weight: 700;
      border-radius: 10px;
      padding: 1px 5px;
      min-width: 18px;
      text-align: center;
      line-height: 1.4;
    }

    /* ===== LAYOUT ===== */
    .layout { display: flex; margin-top: var(--header-h); min-height: calc(100vh - var(--header-h)); }

    /* ===== SIDEBAR ===== */
    .sidebar {
      width: var(--sidebar-w);
      background: var(--panel);
      border-right: 1px solid var(--border);
      padding: 20px 14px;
      position: sticky;
      top: var(--header-h);
      height: calc(100vh - var(--header-h));
      overflow-y: auto;
      flex-shrink: 0;
    }

    .sidebar-section { margin-bottom: 24px; }
    .sidebar-label {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--text-muted);
      margin-bottom: 10px;
    }

    .price-range { display: flex; gap: 8px; align-items: center; }
    .price-input {
      flex: 1;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      color: var(--text);
      padding: 6px 8px;
      font-size: 0.8rem;
      width: 100%;
      outline: none;
      font-family: inherit;
    }
    .price-input:focus-visible { border-color: var(--accent-indigo); }
    .price-separator { color: var(--text-muted); font-size: 0.75rem; flex-shrink: 0; }

    .stock-filter { display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 4px 0; }
    .stock-filter input { accent-color: var(--accent-indigo); }
    .stock-filter span { font-size: 0.85rem; color: var(--text-muted); }

    /* ===== MAIN ===== */
    .main { flex: 1; padding: 20px; overflow: hidden; }

    .catalog-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
    .catalog-count { font-size: 0.8rem; color: var(--text-muted); }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 14px;
    }

    /* ===== CART DRAWER ===== */
    .overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.6);
      z-index: 200;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--transition);
    }
    .overlay.visible { opacity: 1; pointer-events: all; }

    .cart-drawer {
      position: fixed;
      top: 0; right: 0;
      width: 380px;
      max-width: 90vw;
      height: 100vh;
      background: var(--panel);
      border-left: 1px solid var(--border);
      z-index: 201;
      display: flex;
      flex-direction: column;
      transform: translateX(100%);
      transition: transform 200ms ease;
    }
    .cart-drawer.open { transform: translateX(0); }

    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid var(--border);
      flex-shrink: 0;
    }
    .drawer-title { font-size: 1rem; font-weight: 700; }

    .close-btn {
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      border-radius: var(--radius);
      transition: color var(--transition);
    }
    .close-btn:hover { color: var(--text); }
    .close-btn:focus-visible { outline: 2px solid var(--accent-indigo); }

    .cart-items {
      flex: 1;
      overflow-y: auto;
      padding: 12px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .cart-footer { padding: 16px 20px; border-top: 1px solid var(--border); flex-shrink: 0; }
    .cart-total { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
    .cart-total-label { font-size: 0.85rem; color: var(--text-muted); }
    .cart-total-amount { font-size: 1.25rem; font-weight: 700; }
    .cart-actions { display: flex; gap: 8px; }
    .cart-actions .btn { flex: 1; justify-content: center; }

    /* ===== MODALS ===== */
    .modal-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.7);
      z-index: 300;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 150ms ease;
      padding: 20px;
    }
    .modal-overlay.visible { opacity: 1; pointer-events: all; }

    .modal {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      width: 100%;
      max-width: 680px;
      max-height: 90vh;
      overflow-y: auto;
      transform: translateY(10px);
      transition: transform 150ms ease;
    }
    .modal-overlay.visible .modal { transform: translateY(0); }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 22px;
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      background: var(--panel);
      z-index: 1;
    }
    .modal-title { font-size: 1rem; font-weight: 700; }
    .modal-body { padding: 22px; }
    .modal-footer {
      padding: 16px 22px;
      border-top: 1px solid var(--border);
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }

    /* Product detail */
    .product-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    @media (max-width: 560px) { .product-detail-grid { grid-template-columns: 1fr; } }
    .product-detail-img {
      width: 100%; aspect-ratio: 1;
      object-fit: cover;
      border-radius: var(--radius);
      border: 1px solid var(--border);
      background: var(--bg);
    }
    .product-detail-info { display: flex; flex-direction: column; gap: 12px; }
    .product-detail-name { font-size: 1.1rem; font-weight: 700; line-height: 1.3; }
    .product-detail-category { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 1px; color: var(--accent-indigo); font-weight: 600; }
    .product-detail-price { font-size: 1.5rem; font-weight: 700; }
    .product-detail-stock { font-size: 0.8rem; color: var(--text-muted); }
    .product-detail-stock.low { color: #f59e0b; }
    .product-detail-stock.out { color: #f87171; }
    .product-detail-desc { font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; }
    .specs-table { width: 100%; border-collapse: collapse; }
    .specs-table td { padding: 6px 8px; font-size: 0.8rem; border-bottom: 1px solid var(--border); }
    .specs-table td:first-child { color: var(--text-muted); width: 42%; }

    /* Add product form */
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .form-group { display: flex; flex-direction: column; gap: 6px; }
    .form-group.full { grid-column: 1 / -1; }
    .form-label { font-size: 0.75rem; font-weight: 600; color: var(--text-muted); }
    .form-input, .form-select, .form-textarea {
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      color: var(--text);
      padding: 8px 10px;
      font-size: 0.85rem;
      font-family: inherit;
      outline: none;
      transition: border-color var(--transition);
    }
    .form-input:focus-visible, .form-select:focus-visible, .form-textarea:focus-visible { border-color: var(--accent-indigo); }
    .form-textarea { resize: vertical; min-height: 70px; }
    .form-select option { background: var(--panel); }
    .form-error { font-size: 0.72rem; color: #f87171; min-height: 1em; }

    .specs-builder { display: flex; flex-direction: column; gap: 8px; }
    .spec-row { display: flex; gap: 8px; align-items: center; }
    .spec-row .form-input { flex: 1; }
    .remove-spec-btn {
      background: none; border: none;
      color: var(--text-muted); cursor: pointer;
      padding: 4px; display: flex; align-items: center;
      border-radius: var(--radius); flex-shrink: 0;
      transition: color var(--transition);
    }
    .remove-spec-btn:hover { color: #f87171; }
    .remove-spec-btn:focus-visible { outline: 2px solid var(--accent-indigo); }
    .add-spec-btn { align-self: flex-start; font-size: 0.78rem; padding: 5px 10px; margin-top: 4px; }

    /* ===== CATEGORY LIST ===== */
    .category-list { display: flex; flex-direction: column; gap: 6px; }

    /* ===== TOASTS ===== */
    .toast-container {
      position: fixed; bottom: 20px; right: 20px;
      z-index: 500;
      display: flex; flex-direction: column; gap: 8px;
      pointer-events: none;
    }
    .toast {
      background: var(--panel);
      border: 1px solid var(--border);
      border-left: 3px solid var(--accent-indigo);
      border-radius: var(--radius);
      padding: 10px 16px;
      font-size: 0.82rem;
      color: var(--text);
      pointer-events: all;
      animation: toastIn 200ms ease forwards;
      max-width: 280px;
    }
    .toast.success { border-left-color: #34d399; }
    .toast.warning { border-left-color: #f59e0b; }
    .toast.error   { border-left-color: #f87171; }
    .toast.hiding  { animation: toastOut 200ms ease forwards; }
    @keyframes toastIn  { from { transform: translateX(110%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes toastOut { to   { transform: translateX(110%); opacity: 0; } }

    /* ===== SCROLLBAR ===== */
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }
  </style>
</head>
<body>

<!-- SVG ICON SPRITE -->
<svg style="display:none" aria-hidden="true">
  <defs>
    <symbol id="icon-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </symbol>
    <symbol id="icon-cart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </symbol>
    <symbol id="icon-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </symbol>
    <symbol id="icon-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </symbol>
    <symbol id="icon-trash" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </symbol>
    <symbol id="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
      <polyline points="20 6 9 17 4 12"/>
    </symbol>
  </defs>
</svg>

<!-- HEADER -->
<header class="header">
  <div class="logo">Tech<span>Store</span></div>

  <div class="search-bar">
    <svg class="search-icon" width="14" height="14" aria-hidden="true"><use href="#icon-search"/></svg>
    <input type="search" id="search-input" placeholder="Buscar productos..." aria-label="Buscar productos">
  </div>

  <div class="header-actions">
    <button class="btn btn-primary" id="add-product-btn">
      <svg width="13" height="13" aria-hidden="true"><use href="#icon-plus"/></svg>
      Agregar producto
    </button>
    <button class="cart-btn" id="cart-toggle-btn" aria-label="Abrir carrito">
      <svg width="16" height="16" aria-hidden="true"><use href="#icon-cart"/></svg>
      Carrito
      <span class="cart-badge" id="cart-badge" aria-live="polite">0</span>
    </button>
  </div>
</header>

<!-- LAYOUT -->
<div class="layout">
  <aside class="sidebar" aria-label="Filtros">
    <div class="sidebar-section">
      <div class="sidebar-label">Categorías</div>
      <div class="category-list" id="category-list" role="group" aria-label="Filtrar por categoría"></div>
    </div>
    <div class="sidebar-section">
      <div class="sidebar-label">Precio (USD)</div>
      <div class="price-range">
        <input type="number" class="price-input" id="price-min" placeholder="Mín" min="0" aria-label="Precio mínimo">
        <span class="price-separator">—</span>
        <input type="number" class="price-input" id="price-max" placeholder="Máx" min="0" aria-label="Precio máximo">
      </div>
    </div>
    <div class="sidebar-section">
      <div class="sidebar-label">Disponibilidad</div>
      <label class="stock-filter">
        <input type="checkbox" id="stock-filter">
        <span>Solo en stock</span>
      </label>
    </div>
  </aside>

  <main class="main">
    <div class="catalog-header">
      <span class="catalog-count" id="catalog-count">0 productos</span>
    </div>
    <div class="product-grid" id="product-grid" role="list" aria-label="Catálogo de productos"></div>
  </main>
</div>

<!-- CART OVERLAY + DRAWER -->
<div class="overlay" id="cart-overlay" aria-hidden="true"></div>
<div class="cart-drawer" id="cart-drawer" role="dialog" aria-modal="true" aria-label="Carrito de compras">
  <div class="drawer-header">
    <span class="drawer-title">Carrito</span>
    <button class="close-btn" id="cart-close-btn" aria-label="Cerrar carrito">
      <svg width="18" height="18" aria-hidden="true"><use href="#icon-x"/></svg>
    </button>
  </div>
  <div class="cart-items" id="cart-items"></div>
  <div class="cart-footer">
    <div class="cart-total">
      <span class="cart-total-label">Total</span>
      <span class="cart-total-amount" id="cart-total">$0.00</span>
    </div>
    <div class="cart-actions">
      <button class="btn btn-ghost" id="clear-cart-btn">Vaciar</button>
      <button class="btn btn-primary" id="checkout-btn">
        <svg width="13" height="13" aria-hidden="true"><use href="#icon-check"/></svg>
        Finalizar compra
      </button>
    </div>
  </div>
</div>

<!-- PRODUCT DETAIL MODAL -->
<div class="modal-overlay" id="product-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
  <div class="modal" id="product-modal">
    <div class="modal-header">
      <span class="modal-title" id="product-modal-title">Detalle</span>
      <button class="close-btn" id="product-modal-close" aria-label="Cerrar">
        <svg width="18" height="18" aria-hidden="true"><use href="#icon-x"/></svg>
      </button>
    </div>
    <div class="modal-body" id="product-modal-body"></div>
  </div>
</div>

<!-- ADD PRODUCT MODAL -->
<div class="modal-overlay" id="add-modal-overlay" role="dialog" aria-modal="true" aria-label="Agregar producto">
  <div class="modal" id="add-modal">
    <div class="modal-header">
      <span class="modal-title">Agregar producto</span>
      <button class="close-btn" id="add-modal-close" aria-label="Cerrar">
        <svg width="18" height="18" aria-hidden="true"><use href="#icon-x"/></svg>
      </button>
    </div>
    <div class="modal-body">
      <form id="add-product-form" novalidate>
        <div class="form-grid">
          <div class="form-group full">
            <label class="form-label" for="fp-name">Nombre *</label>
            <input type="text" class="form-input" id="fp-name" placeholder="Ej: MacBook Pro 14&quot;">
            <span class="form-error" id="err-name"></span>
          </div>
          <div class="form-group">
            <label class="form-label" for="fp-category">Categoría *</label>
            <select class="form-select" id="fp-category">
              <option value="">Seleccionar...</option>
              <option value="Laptops">Laptops</option>
              <option value="Smartphones">Smartphones</option>
              <option value="Periféricos">Periféricos</option>
              <option value="Componentes">Componentes</option>
              <option value="Audio">Audio</option>
              <option value="Gaming">Gaming</option>
            </select>
            <span class="form-error" id="err-category"></span>
          </div>
          <div class="form-group">
            <label class="form-label" for="fp-price">Precio (USD) *</label>
            <input type="number" class="form-input" id="fp-price" placeholder="0.00" min="0.01" step="0.01">
            <span class="form-error" id="err-price"></span>
          </div>
          <div class="form-group">
            <label class="form-label" for="fp-stock">Stock *</label>
            <input type="number" class="form-input" id="fp-stock" placeholder="0" min="0" step="1">
            <span class="form-error" id="err-stock"></span>
          </div>
          <div class="form-group full">
            <label class="form-label" for="fp-image">URL de imagen</label>
            <input type="url" class="form-input" id="fp-image" placeholder="https://...">
          </div>
          <div class="form-group full">
            <label class="form-label" for="fp-desc">Descripción</label>
            <textarea class="form-textarea" id="fp-desc" placeholder="Descripción del producto..."></textarea>
          </div>
          <div class="form-group full">
            <label class="form-label">Especificaciones técnicas</label>
            <div class="specs-builder" id="specs-builder"></div>
            <button type="button" class="btn btn-ghost add-spec-btn" id="add-spec-btn">
              <svg width="12" height="12" aria-hidden="true"><use href="#icon-plus"/></svg>
              Agregar especificación
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" id="add-modal-cancel">Cancelar</button>
      <button class="btn btn-primary" id="add-product-submit">Guardar producto</button>
    </div>
  </div>
</div>

<!-- TOASTS -->
<div class="toast-container" id="toast-container" aria-live="polite" aria-atomic="true"></div>

<script>
// ===== WEB COMPONENTS =====

class QuantityInput extends HTMLElement {
  static get observedAttributes() { return ['value', 'min', 'max']; }
  connectedCallback() { this.attachShadow({ mode: 'open' }); this._render(); }
  attributeChangedCallback() { if (this.shadowRoot) { this._render(); } }

  _render() {
    const value = parseInt(this.getAttribute('value') || '1', 10);
    const min   = parseInt(this.getAttribute('min')   || '1', 10);
    const max   = parseInt(this.getAttribute('max')   || '999', 10);

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-flex; }
        .wrap { display: flex; align-items: center; border: 1px solid #22222e; border-radius: 2px; overflow: hidden; }
        button {
          background: transparent; border: none; color: #e5e5ed;
          padding: 5px 9px; cursor: pointer; font-size: 1rem; line-height: 1;
          transition: background 150ms; font-family: inherit;
        }
        button:hover:not(:disabled) { background: rgba(255,255,255,0.07); }
        button:disabled { opacity: 0.35; cursor: not-allowed; }
        button:focus-visible { outline: 2px solid #6366f1; outline-offset: -2px; }
        input {
          width: 38px; text-align: center;
          background: transparent; border: none;
          border-left: 1px solid #22222e; border-right: 1px solid #22222e;
          color: #e5e5ed; font-size: 0.82rem; padding: 5px 2px; outline: none;
          -moz-appearance: textfield;
        }
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; }
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
      detail: { quantity: clamped }, bubbles: true, composed: true
    }));
  }
}
customElements.define('quantity-input', QuantityInput);

// ---------------------------------------------------------------------------

class ProductCard extends HTMLElement {
  static get observedAttributes() { return ['name', 'price', 'category', 'image', 'stock', 'id']; }
  connectedCallback() { this.attachShadow({ mode: 'open' }); this._render(); }
  attributeChangedCallback() { if (this.shadowRoot) { this._render(); } }

  _render() {
    const name     = this.getAttribute('name')     || '';
    const price    = parseFloat(this.getAttribute('price') || '0');
    const category = this.getAttribute('category') || '';
    const image    = this.getAttribute('image')    || '';
    const stock    = parseInt(this.getAttribute('stock') || '0', 10);
    const id       = this.getAttribute('id')       || '';

    const inStock = stock > 0;
    const stockLabel = stock === 0 ? 'Sin stock' : stock < 5 ? `Últimas ${stock}` : 'En stock';
    const stockClass = stock === 0 ? 'out' : stock < 5 ? 'low' : 'ok';

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; height: 100%; }
        .card {
          background: #13131a; border: 1px solid #22222e; border-radius: 2px;
          overflow: hidden; cursor: pointer;
          transition: border-color 150ms, transform 150ms;
          height: 100%; display: flex; flex-direction: column;
        }
        .card:hover { border-color: #6366f1; transform: translateY(-2px); }
        .card:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }
        .img-wrap { position: relative; aspect-ratio: 1; background: #0d0d15; overflow: hidden; flex-shrink: 0; }
        img { width: 100%; height: 100%; object-fit: cover; transition: transform 200ms; display: block; }
        .card:hover img { transform: scale(1.04); }
        .badge {
          position: absolute; top: 8px; right: 8px;
          font-size: 0.62rem; font-weight: 700; padding: 2px 6px; border-radius: 2px;
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        .badge.ok  { background: rgba(52,211,153,0.15); color: #34d399; }
        .badge.low { background: rgba(245,158,11,0.15);  color: #f59e0b; }
        .badge.out { background: rgba(248,113,113,0.15); color: #f87171; }
        .body { padding: 12px; flex: 1; display: flex; flex-direction: column; gap: 6px; }
        .cat { font-size: 0.62rem; text-transform: uppercase; letter-spacing: 1px; color: #6366f1; font-weight: 600; }
        .name {
          font-size: 0.88rem; font-weight: 600; line-height: 1.3; flex: 1;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
          color: #e5e5ed;
        }
        .footer { display: flex; align-items: center; justify-content: space-between; margin-top: 4px; }
        .price { font-size: 1rem; font-weight: 700; color: #e5e5ed; }
        .add-btn {
          background: #6366f1; color: #fff; border: none; border-radius: 2px;
          padding: 6px 10px; font-size: 0.75rem; font-weight: 600; cursor: pointer;
          transition: background 150ms; display: flex; align-items: center; gap: 4px;
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

    card.addEventListener('click', e => {
      if (!addBtn.contains(e.target)) {
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
  }
}
customElements.define('product-card', ProductCard);

// ---------------------------------------------------------------------------

class CartItem extends HTMLElement {
  static get observedAttributes() { return ['name', 'price', 'quantity', 'image', 'id', 'maxstock']; }
  connectedCallback() { this.attachShadow({ mode: 'open' }); this._render(); }
  attributeChangedCallback() { if (this.shadowRoot) { this._render(); } }

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
        img { width: 52px; height: 52px; object-fit: cover; border-radius: 2px; flex-shrink: 0; background: #13131a; }
        .info { flex: 1; min-width: 0; }
        .name { font-size: 0.82rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #e5e5ed; }
        .sub  { font-size: 0.75rem; color: #9090a0; margin-top: 3px; }
        .sub strong { color: #e5e5ed; }
        .controls { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; flex-shrink: 0; }
        .del {
          background: none; border: none; color: #9090a0; cursor: pointer;
          padding: 2px; display: flex; border-radius: 2px; transition: color 150ms;
        }
        .del:hover { color: #f87171; }
        .del:focus-visible { outline: 2px solid #6366f1; }
      </style>
      <div class="item">
        <img src="${image || `https://picsum.photos/seed/${id}/80/80`}" alt="${name}" loading="lazy">
        <div class="info">
          <div class="name">${name}</div>
          <div class="sub">$${price.toFixed(2)} × ${quantity} = <strong>$${(price * quantity).toFixed(2)}</strong></div>
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
        detail: { id, quantity: e.detail.quantity }, bubbles: true, composed: true
      }));
    });
  }
}
customElements.define('cart-item', CartItem);

// ---------------------------------------------------------------------------

class CategoryChip extends HTMLElement {
  static get observedAttributes() { return ['label', 'active', 'count']; }
  connectedCallback() { this.attachShadow({ mode: 'open' }); this._render(); }
  attributeChangedCallback() { if (this.shadowRoot) { this._render(); } }

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
          cursor: pointer; font-size: 0.82rem; font-weight: ${active ? '600' : '400'};
          transition: all 150ms; text-align: left; font-family: inherit;
        }
        button:hover { border-color: #6366f1; color: #e5e5ed; }
        button:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }
        .count {
          font-size: 0.68rem; font-weight: 600; border-radius: 10px; padding: 1px 6px;
          background: ${active ? '#6366f1' : 'rgba(144,144,160,0.15)'};
          color: ${active ? '#fff' : '#9090a0'};
        }
      </style>
      <button role="checkbox" aria-checked="${active}" aria-label="${label}">
        <span>${label}</span><span class="count">${count}</span>
      </button>`;

    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('category-toggled', { detail: { label }, bubbles: true, composed: true }));
    });
  }
}
customElements.define('category-chip', CategoryChip);

// ---------------------------------------------------------------------------

class EmptyState extends HTMLElement {
  static get observedAttributes() { return ['icon', 'title', 'message']; }
  connectedCallback() { this.attachShadow({ mode: 'open' }); this._render(); }
  attributeChangedCallback() { if (this.shadowRoot) { this._render(); } }

  _render() {
    const icon    = this.getAttribute('icon')    || '📦';
    const title   = this.getAttribute('title')   || 'Sin resultados';
    const message = this.getAttribute('message') || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        .wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px 20px; text-align: center; gap: 10px; }
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

// ===== APP =====
const App = (() => {
  const STORAGE = { products: 'techstore.products', cart: 'techstore.cart' };
  const CATEGORIES = ['Laptops', 'Smartphones', 'Periféricos', 'Componentes', 'Audio', 'Gaming'];

  const DEMO = [
    {
      id: 'p1', name: 'MacBook Pro 14" M3', category: 'Laptops', price: 1999.99, stock: 8,
      image: 'https://picsum.photos/seed/macbookpro/400/400',
      description: 'El MacBook Pro 14" con chip M3 ofrece rendimiento excepcional para profesionales creativos, con hasta 18 horas de batería.',
      specs: { CPU: 'Apple M3 Pro', RAM: '18 GB unified', Almacenamiento: '512 GB SSD', Pantalla: '14.2" Liquid Retina XDR', Batería: '70 Wh' }
    },
    {
      id: 'p2', name: 'iPhone 15 Pro Max', category: 'Smartphones', price: 1299.99, stock: 12,
      image: 'https://picsum.photos/seed/iphone15pm/400/400',
      description: 'Titanio resistente, cámara de 48 MP con zoom óptico 5×, y el poderoso chip A17 Pro.',
      specs: { Chip: 'A17 Pro', Cámara: '48 MP + 12 MP + 12 MP', Pantalla: '6.7" Super Retina XDR', Almacenamiento: '256 GB', '5G': 'Sí' }
    },
    {
      id: 'p3', name: 'Logitech MX Master 3S', category: 'Periféricos', price: 99.99, stock: 25,
      image: 'https://picsum.photos/seed/mxmaster3s/400/400',
      description: 'El ratón inalámbrico definitivo para productividad. Rueda MagSpeed y hasta 70 días de batería.',
      specs: { DPI: '200–8000', Botones: '7 personalizables', Conectividad: 'Bluetooth / 2.4 GHz', Batería: '70 días', Peso: '141 g' }
    },
    {
      id: 'p4', name: 'RTX 4080 Super 16 GB', category: 'Componentes', price: 999.99, stock: 3,
      image: 'https://picsum.photos/seed/rtx4080s/400/400',
      description: 'GPU flagship con 16 GB GDDR6X, ray tracing de 3ª generación y DLSS 3.5.',
      specs: { VRAM: '16 GB GDDR6X', TDP: '320 W', 'Ray Tracing': 'Gen 3', DLSS: '3.5', Conectores: '3× DP, 1× HDMI 2.1' }
    },
    {
      id: 'p5', name: 'Sony WH-1000XM5', category: 'Audio', price: 349.99, stock: 0,
      image: 'https://picsum.photos/seed/sonymx5/400/400',
      description: 'Los mejores auriculares ANC del mercado. 30 h de autonomía y carga rápida USB-C.',
      specs: { ANC: 'Adaptativo 8 micrófonos', Batería: '30 h', Carga: 'USB-C (3 min = 3 h)', Drivers: '30 mm', Peso: '250 g' }
    },
    {
      id: 'p6', name: 'Samsung Odyssey G7 32"', category: 'Gaming', price: 699.99, stock: 5,
      image: 'https://picsum.photos/seed/odysseyg732/400/400',
      description: 'Monitor gaming curvo QHD a 240 Hz con 1 ms de respuesta y HDR600.',
      specs: { Panel: 'VA 1000R', Resolución: '2560×1440', Tasa: '240 Hz', Respuesta: '1 ms', HDR: 'DisplayHDR 600' }
    },
    {
      id: 'p7', name: 'Keychron Q3 Pro', category: 'Periféricos', price: 199.99, stock: 15,
      image: 'https://picsum.photos/seed/keychronq3/400/400',
      description: 'Teclado mecánico TKL en aluminio CNC, inalámbrico, con switches Gateron G Pro Red.',
      specs: { Layout: 'TKL 80%', Switches: 'Gateron G Pro Red', Conectividad: 'BT 5.1 / USB-C', Batería: '4000 mAh', Peso: '1.04 kg' }
    },
    {
      id: 'p8', name: 'AMD Ryzen 9 7950X', category: 'Componentes', price: 599.99, stock: 7,
      image: 'https://picsum.photos/seed/ryzen97950x/400/400',
      description: '16 núcleos y 32 hilos con arquitectura Zen 4. El procesador de escritorio más potente para workstations.',
      specs: { Núcleos: '16C / 32T', 'Clock base': '4.5 GHz', 'Clock boost': '5.7 GHz', TDP: '170 W', Socket: 'AM5' }
    }
  ];

  const state = {
    products: [],
    cart: [],
    filters: { category: null, priceMin: '', priceMax: '', search: '', inStock: false }
  };

  // --- persistence ---
  function loadState() {
    try {
      const p = localStorage.getItem(STORAGE.products);
      const c = localStorage.getItem(STORAGE.cart);
      state.products = p ? JSON.parse(p) : [];
      state.cart     = c ? JSON.parse(c) : [];
    } catch (_) {
      state.products = []; state.cart = [];
    }
    if (state.products.length === 0) { state.products = DEMO.map(d => ({ ...d })); saveProducts(); }
  }

  function saveProducts() { localStorage.setItem(STORAGE.products, JSON.stringify(state.products)); }
  function saveCart()     { localStorage.setItem(STORAGE.cart,     JSON.stringify(state.cart));     }

  // --- filtering ---
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

  // --- cart helpers ---
  function cartTotal() {
    return state.cart.reduce((s, item) => {
      const p = state.products.find(x => x.id === item.id);
      return s + (p ? p.price * item.quantity : 0);
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

  // --- shortcuts ---
  const $ = id => document.getElementById(id);

  function updateBadge() { $('cart-badge').textContent = cartCount(); }

  // --- renders ---
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
    const grid = $('product-grid');
    const items = filtered();
    $('catalog-count').textContent = `${items.length} producto${items.length !== 1 ? 's' : ''}`;
    grid.innerHTML = '';

    if (items.length === 0) {
      const e = document.createElement('empty-state');
      e.setAttribute('icon', '🔍');
      e.setAttribute('title', 'Sin resultados');
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
      e.setAttribute('icon', '🛒');
      e.setAttribute('title', 'Carrito vacío');
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

  // --- modals ---
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
          <img class="product-detail-img" src="${p.image || `https://picsum.photos/seed/${id}/400/400`}" alt="${p.name}">
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
    const overlay = $('product-modal-overlay');
    overlay.classList.remove('visible');
    overlay.setAttribute('aria-hidden', 'true');
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

  // --- focus trap (light DOM only; sufficient for standard modal elements) ---
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

  // --- toasts ---
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

  // --- add product form ---
  function resetForm() {
    $('add-product-form').reset();
    ['err-name', 'err-category', 'err-price', 'err-stock'].forEach(id => { $(id).textContent = ''; });
    $('specs-builder').innerHTML = '';
    addSpecRow();
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
    const image    = $('fp-image').value.trim();
    const desc     = $('fp-desc').value.trim();

    ['err-name', 'err-category', 'err-price', 'err-stock'].forEach(id => { $(id).textContent = ''; });

    let valid = true;
    if (!name)                        { $('err-name').textContent     = 'El nombre es requerido';       valid = false; }
    if (!category)                    { $('err-category').textContent = 'Selecciona una categoría';     valid = false; }
    if (isNaN(price) || price <= 0)   { $('err-price').textContent    = 'Precio debe ser mayor que 0';  valid = false; }
    if (isNaN(stock) || stock < 0)    { $('err-stock').textContent    = 'Stock debe ser 0 o mayor';     valid = false; }
    if (!valid) { return; }

    const specs = {};
    $('specs-builder').querySelectorAll('.spec-row').forEach(row => {
      const k = row.querySelector('.spec-key').value.trim();
      const v = row.querySelector('.spec-val').value.trim();
      if (k && v) { specs[k] = v; }
    });

    const product = {
      id: `p${Date.now()}`,
      name, category, price, stock,
      image: image || `https://picsum.photos/seed/${Date.now()}/400/400`,
      description: desc,
      specs
    };

    state.products.push(product);
    saveProducts();
    renderCatalog();
    renderCategories();
    closeAddModal();
    showToast(`"${name}" agregado al catálogo`, 'success');
  }

  // --- event wiring ---
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
    $('add-modal-overlay').addEventListener('click', e => { if (e.target === $('add-modal-overlay')) { closeAddModal(); } });
    $('add-spec-btn').addEventListener('click', () => addSpecRow());
    $('add-product-submit').addEventListener('click', validateAndSave);

    $('product-modal-close').addEventListener('click', closeProductModal);
    $('product-modal-overlay').addEventListener('click', e => {
      if (e.target === $('product-modal-overlay')) { closeProductModal(); }
    });

    // delegated: category chips
    $('category-list').addEventListener('category-toggled', e => {
      const label = e.detail.label;
      state.filters.category = state.filters.category === label ? null : label;
      renderCategories();
      renderCatalog();
    });

    // delegated: product grid
    $('product-grid').addEventListener('product-selected', e => openProductModal(e.detail.id));
    $('product-grid').addEventListener('add-to-cart',      e => addToCart(e.detail.id));

    // delegated: cart items
    $('cart-items').addEventListener('item-removed',    e => removeFromCart(e.detail.id));
    $('cart-items').addEventListener('quantity-changed', e => changeQty(e.detail.id, e.detail.quantity));

    // Escape key
    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape') { return; }
      if ($('product-modal-overlay').classList.contains('visible')) { closeProductModal(); return; }
      if ($('add-modal-overlay').classList.contains('visible'))     { closeAddModal();     return; }
      if ($('cart-drawer').classList.contains('open'))              { closeCart(); }
    });
  }

  function init() {
    loadState();
    renderCategories();
    renderCatalog();
    updateBadge();
    initEvents();
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => App.init());
</script>
</body>
</html>
