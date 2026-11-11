/* ===================================================================
   Yapı Kredi Mobil — Prototip uygulama mantığı
   Saf JavaScript. İleride React/Vite'a taşınabilecek şekilde
   ekranlar fonksiyon (component) olarak, durum tek bir state'te.
   =================================================================== */

/* ---------- SVG ikonlar ---------- */
const I = {
  menu: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  search: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
  searchBig: '<svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
  mail: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  refresh: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 4v5h-5"/></svg>',
  user: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6v1H4z"/></svg>',
  calendar: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4.5" width="12.5" height="12.5" rx="2"/><path d="M2.5 8.5h12.5M6 3v3M11.5 3v3"/><circle cx="6" cy="12" r=".7" fill="currentColor" stroke="none"/><circle cx="9" cy="12" r=".7" fill="currentColor" stroke="none"/><path d="M13.5 11h7v10l-1.4-1-1.4 1-1.4-1-1.4 1V11z"/><path d="M15.3 14h3.4M15.3 16.5h3.4" stroke-width="1"/></svg>',
  // Yapı Kredi amblemi — ram-horns (koç boynuzu / lale). currentColor ile temaya uyar.
  yklogo: '<svg width="28" height="15" viewBox="0 0 120 64" fill="none" stroke="currentColor" stroke-width="11.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M60 17 C 71 5, 92 7, 99 24 C 106 40, 95 53, 83 47 C 73 43, 74 32, 83 32 C 90 32, 90 41, 83 41"/><path d="M60 17 C 49 5, 28 7, 21 24 C 14 40, 25 53, 37 47 C 47 43, 46 32, 37 32 C 30 32, 30 41, 37 41"/></svg>',
  bell: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
  back: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
  chevDown: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg>',
  chevR: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m9 18 6-6-6-6"/></svg>',
  trendUp: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17 9 11l4 4 8-8"/><path d="M17 4h4v4"/></svg>',
  target: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/></svg>',
  info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="12" r="9.2"/><path d="M12 11v5" stroke-linecap="round"/><circle cx="12" cy="7.8" r="1.1" fill="currentColor" stroke="none"/></svg>',
  arrowUp: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="m6 11 6-6 6 6"/></svg>',
  send: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.4 20.4l17.45-7.48a1 1 0 0 0 0-1.84L3.4 3.6a.993.993 0 0 0-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"/></svg>',
  stop: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="3"/></svg>',
  copy: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  thumbUp: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v11H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h3zm0 0 4.2-7.4a2 2 0 0 1 2.3-.9 2.3 2.3 0 0 1 1.5 2.6L14.3 8H19a2 2 0 0 1 2 2.4l-1.5 7.6a2 2 0 0 1-2 1.6H7"/></svg>',
  thumbDown: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="transform:rotate(180deg)"><path d="M7 10v11H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h3zm0 0 4.2-7.4a2 2 0 0 1 2.3-.9 2.3 2.3 0 0 1 1.5 2.6L14.3 8H19a2 2 0 0 1 2 2.4l-1.5 7.6a2 2 0 0 1-2 1.6H7"/></svg>',
  check: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  checkBig: '<svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  lock: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  card: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
  star: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.6-5.2 4.5 1.6 6.7L12 17l-6.2 3.6 1.6-6.7L2.2 8.9l6.9-.6z"/></svg>',
  bank: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 21h18M4 10h16M5 10l7-6 7 6M6 10v11M18 10v11M10 10v11M14 10v11"/></svg>',
  shield: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
  faceid: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2"/><path d="M9 9v1M15 9v1M12 9v3l-1 1"/><path d="M9 15s1 1 3 1 3-1 3-1"/></svg>',
  // Menü ikonları
  home: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l9-7 9 7v9a2 2 0 0 1-2 2h-3v-6H8v6H5a2 2 0 0 1-2-2z"/></svg>',
  wallet: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M16 12h.01M3 10h18"/></svg>',
  transfer: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h13l-3-3M17 17H4l3 3"/></svg>',
  invest: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l5-5 4 4 8-8M21 8v5h-5"/></svg>',
  payments: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M14.5 9.5C14 8.5 13 8 12 8c-1.5 0-2.5 1-2.5 2s1 1.6 2.5 2 2.5 1 2.5 2-1 2-2.5 2c-1 0-2-.5-2.5-1.5M12 6.5v11"/></svg>',
  loan: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/></svg>',
  insurance: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  world: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18"/></svg>',
  grid: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  gear: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H1a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 2.6 7a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H7a1.6 1.6 0 0 0 1-1.5V1a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V7a1.6 1.6 0 0 0 1.5 1H23a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/></svg>',
  power: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 3v9M6.4 6.4a8 8 0 1 0 11.2 0"/></svg>',
  pie: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8.5"/><path d="M12 12 L12 3.5 A8.5 8.5 0 0 1 19.4 8.2 Z" fill="currentColor" stroke="none"/></svg>',
  // Harcamalarım — yükselen çubuk grafiği + taban çizgisi (indirilen app-icon'un tema-uyarlı hali)
  bars: '<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="11" width="3.2" height="7" rx="1.6"/><rect x="10.4" y="7.3" width="3.2" height="10.7" rx="1.6"/><rect x="16.8" y="3.8" width="3.2" height="14.2" rx="1.6"/><rect x="3.4" y="20" width="17.2" height="2.2" rx="1.1"/></svg>',
  qr: '<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" fill-rule="evenodd"><path d="M3 3h7v7H3V3zm2 2v3h3V5H5z"/><path d="M14 3h7v7h-7V3zm2 2v3h3V5h-3z"/><path d="M3 14h7v7H3v-7zm2 2v3h3v-3H5z"/><path d="M12 12h2v2h-2zM16 12h2v2h-2zM20 12h1v2h-1zM14 14h2v2h-2zM18 14h2v2h-2zM12 16h2v2h-2zM16 16h2v2h-2zM20 16.5h1V18h-1zM14 18h2v2h-2zM18 18h2v2h-2zM12 20h2v1h-2zM20 20h1v1h-1z"/></svg>',
  // Karekod tarama — scan çerçevesi (köşe braketleri) + içte QR modülleri (glow için)
  qrScan: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><g stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17v-6a4 4 0 0 1 4-4h6"/><path d="M31 7h6a4 4 0 0 1 4 4v6"/><path d="M41 31v6a4 4 0 0 1-4 4h-6"/><path d="M17 41h-6a4 4 0 0 1-4-4v-6"/><rect x="15.4" y="15.4" width="7.4" height="7.4" rx="1.4"/><rect x="25.2" y="15.4" width="7.4" height="7.4" rx="1.4"/><rect x="15.4" y="25.2" width="7.4" height="7.4" rx="1.4"/></g><g fill="currentColor"><rect x="25.3" y="25.3" width="2.8" height="2.8" rx=".6"/><rect x="29.9" y="25.3" width="2.8" height="2.8" rx=".6"/><rect x="27.6" y="27.6" width="2.8" height="2.8" rx=".6"/><rect x="25.3" y="29.9" width="2.8" height="2.8" rx=".6"/><rect x="29.9" y="29.9" width="2.8" height="2.8" rx=".6"/></g></svg>',
  guide: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 17v.01M12 13.5a2.5 2.5 0 1 0-2.5-2.9"/></svg>',
  ext: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-8 8"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/></svg>',
  sun: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/></svg>',
  moon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  spark: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8z"/><path d="M19 14l.9 2.6L22.5 17l-2.6.9L19 20l-.9-2.6L15.5 17l2.6-.9z"/></svg>',
  pin: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  plus: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  doc: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>',
  close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  truck: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>',
  box: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>',
  receipt: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v18l2-1.5L9 21l2-1.5L13 21l2-1.5L17 21l2-1.5V3l-2 1.5L15 3l-2 1.5L11 3 9 4.5 7 3z"/><path d="M8 8h8M8 12h8"/></svg>',
  undo: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/></svg>',
  wallet2: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M16 12h.5M3 10h18"/></svg>',
  pause: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1.4"/><rect x="14" y="5" width="4" height="14" rx="1.4"/></svg>',
  play: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 8 5.5z"/></svg>',
  heart: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.6-10-9.2C.4 8.6 1.7 5 5 5c2 0 3.2 1.2 4 2.3C9.8 6.2 11 5 13 5c3.3 0 4.6 3.6 3 6.8-2.5 4.6-10 9.2-10 9.2z" transform="translate(1 0)"/></svg>',
  cashout: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5v.01M18 14.5v.01"/></svg>',
  // Kıymetli maden — üst üste altın külçesi (yamuk)
  ingot: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M2.5 18 6 11h12l3.5 7z"/><path d="M6.4 11 8.2 7.2h7.6L17.6 11"/></svg>',
  // Bağış — avuçta kalp (yardım)
  handHeart: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5.4c1-1.3 3.3-.9 3.3 1 0 1.4-1.9 2.6-3.3 3.5-1.4-.9-3.3-2.1-3.3-3.5 0-1.9 2.3-2.3 3.3-1z"/><path d="M4 13.6c1.2-.7 2.5-.5 3.6.3l2 1.5c.5.4 1.2.6 1.9.6h3c.9 0 1.7.7 1.7 1.6S15.4 19 14.5 19H10M4 12.9V19.6"/></svg>',
  salaryEarly: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7.5V12l3 2"/><path d="M20.5 12a8.5 8.5 0 1 1-2.5-6"/><path d="M20.5 3.5V8H16"/></svg>',   // early salary (clock + forward arrow)
  car: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17H3.8a1 1 0 0 1-1-1v-3.4a2 2 0 0 1 .5-1.3L5 9.5l1.9-3.4A2 2 0 0 1 8.6 5h6.5a2 2 0 0 1 1.6.8L19.3 9.5l1.4.6a2 2 0 0 1 1.2 1.8V16a1 1 0 0 1-1 1H19"/><path d="M9 17h6M5 10h14"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>',   // car (side view)
};

/* ---------- Veri ---------- */
const PRODUCTS = [
  {
    id: 'p1', emoji: '🤖', img: 'assets/fakir.webp',
    name: 'Fakir Robert RS 700 Robot Süpürge',
    desc: 'Paspaslama + güçlü emiş · 120 dk çalışma · sessiz mod',
    price: '2.199,00 TL', priceNum: '2.199', old: '2.799,00 TL',
    rating: '4.7', reviews: '1.284',
    inst: '6 Taksit', instSub: '6 x 366,50 TL',
    puan: '+220 Worldpuan', store: 'Koçtaş',
    stock: 'Son 4 ürün', delivery: 'Yarın kargoda', shipping: 'Ücretsiz kargo', warranty: '2 yıl garanti',
    specs: { tip: 'Robot süpürge', guc: '120 dk şarj', paspas: true },
  },
  {
    id: 'p2', emoji: '🧹', img: 'assets/arzum.webp',
    name: 'Arzum Cleanart Elegance Toz Torbalı Süpürge',
    desc: '2000 W güç · HEPA filtre · sessiz çalışma',
    price: '2.499,00 TL', priceNum: '2.499', old: '2.999,00 TL',
    rating: '4.5', reviews: '932',
    inst: '9 Taksit', instSub: '9 x 277,67 TL',
    puan: '+250 Worldpuan', store: 'Koçtaş',
    stock: 'Stokta', delivery: '2-3 iş günü', shipping: 'Ücretsiz kargo', warranty: '3 yıl garanti',
    specs: { tip: 'Toz torbalı', guc: '2000 W', paspas: false },
  },
  {
    id: 'p3', emoji: '🌀', img: 'assets/karcher.png',
    name: 'Kärcher VC 4s Cordless Dikey Şarjlı Süpürge',
    desc: 'Dikey + el tipi · hafif gövde · 40 dk çalışma',
    price: '1.899,00 TL', priceNum: '1.899', old: '2.299,00 TL',
    rating: '4.8', reviews: '2.041',
    inst: '3 Taksit', instSub: '3 x 633,00 TL',
    puan: '+190 Worldpuan', store: 'Koçtaş',
    stock: 'Son 2 ürün', delivery: 'Yarın kargoda', shipping: 'Ücretsiz kargo', warranty: '2 yıl garanti',
    specs: { tip: 'Dikey şarjlı', guc: '40 dk şarj', paspas: false },
  },
];

/* ---------- Otonom (agentic) Setur tatil akışı ----------
   Kullanıcı agent'a yetki verir; agent arka planda arar, uygun seçeneği
   bulduğunda BİLDİRİM gönderir, kullanıcı son onayı verince rezervasyon yapılır. */
const SETUR_AUTH = {
  dates: '15 – 20 Temmuz',
  nights: 5,
  guests: '2 yetişkin',
  budget: 40000,                 // üst bütçe (TL)
  region: 'Ege & Akdeniz kıyıları',
  criteria: ['Havuz', 'Deniz manzarası', 'Kahvaltı dahil', 'Ücretsiz iptal'],
  // Ödeme otonom: agent, kartlarım arasından en avantajlısını seçme yetkisi alır.
  cardPool: 'Kartlarım',           // ödeme yetkisinin kapsamı (sınır)
  maxInst: 9,                      // izin verilen en yüksek taksit
  match: 94,                       // bulunan teklifin kriterlerle uyum skoru (%)
  // Agent'ın yetkiyle seçtiği sonuç — teklif popup'ında gerekçesiyle gösterilir.
  card: 'Worldcard **** 3333',
  inst: '6 Taksit',
  cardWhy: 'Kartların arasından Worldcard’ı seçtim — Setur’da en yüksek Worldpuan ve 6 taksit avantajı bu kartta.',
  rule: 'Tutar 40.000 TL’yi aşmasın, ödemede en avantajlı kart/taksiti sen seç ve rezervasyon yapmadan önce mutlaka onayımı al.',
};
/* Otonom akış için sade kullanıcı talebi (Setur'u kullanıcı söylemez — agent bulur) */
const SETUR_REQUEST = 'Temmuzun ikinci haftası 5 gün, 2 kişi denize gitmek istiyoruz. Havuzu ve deniz manzarası olan, kahvaltı dahil bir otel olsun; bütçemiz 40 bin lira. Sen benim için uygun bir yer bulup ayarlar mısın?';
/* Setur'a özel KISA düşünme adımları (Koçtaş katalog taraması değil) */
const SETUR_THINK = [
  { t: 'Düşünüyor…', d: 450 },
  { t: 'Tatil tercihlerini çıkarıyorum…', d: 950 },
];
const SETUR_HOTELS = [
  {
    id: 's1', emoji: '🏖️', img: 'assets/bodrum-hotel.webp',
    name: 'Le Méridien Bodrum Beach Resort',
    loc: 'Torba, Bodrum · Muğla',
    rating: '4.6', reviews: '2.140',
    board: 'Yarım Pansiyon', view: 'Deniz manzarası',
    nights: 5, priceNum: 37500, old: '44.900',
    cancel: '13 Temmuz’a kadar ücretsiz iptal',
    inst: '6 Taksit', instSub: '6 x 6.250,00 TL', puan: '+1.875 Worldpuan',
  },
  {
    id: 's2', emoji: '🏝️',
    name: 'Çeşme Marina Hotel',
    loc: 'Ilıca, Çeşme · İzmir',
    rating: '4.7', reviews: '1.508',
    board: 'Oda & Kahvaltı', view: 'Deniz manzarası',
    nights: 5, priceNum: 39200, old: '46.500',
    cancel: '12 Temmuz’a kadar ücretsiz iptal',
    inst: '6 Taksit', instSub: '6 x 6.533,33 TL', puan: '+1.960 Worldpuan',
  },
];
function seturHotel() { return SETUR_HOTELS[state.seturOptionIdx % SETUR_HOTELS.length]; }

const WORLDCARD_IMG = 'assets/worldcard.png';

// Tutar formatı: "10.000" -> "10.000<span>,00 TL</span>" (büyük rakam + küçük kuruş/TL)
function money(intPart) {
  return `${intPart}<span class="kurus">,00 TL</span>`;
}

// Görsel + emoji fallback (dosya yoksa emoji'li gradient kutu gösterilir)
function imgOrFallback(src, emoji, cls) {
  return `<img src="${src}" alt="" class="${cls}" loading="lazy"
    onerror="this.style.display='none';this.nextElementSibling.style.display='grid';">
    <span class="img-fallback" style="display:none">${emoji}</span>`;
}

const ASSISTANT_PROMPT = 'Evim için güçlü ama sessiz çalışan, paspaslama özelliği de olan bir robot süpürge arıyorum. Bütçem 2.500 TL. World kampanyası ve taksit avantajı olan Koçtaş seçeneklerini gösterir misin?';

/* Asistan sohbet metinleri — animasyonlu akış ve anlık dolu görünüm (deeplink) aynı kaynağı kullanır */
const GREET = 'Merhaba! 👋 Ben Yapı Kredi Alışveriş Asistanı. World üye iş yerlerindeki kampanya ve taksit avantajlarıyla sana en uygun ürünleri buluyorum. Ne aramıştın?';
const CHAT_REPLY = 'Elbette! Bütçene uygun, World kampanyalı ve taksit avantajlı 3 seçenek buldum. Kartları sağa kaydırarak inceleyebilirsin 👇';
function recFollowup() {
  const rec = PRODUCTS.find(p => p.id === REC_ID);
  return `Önerim Fakir Robert RS 700 — paspaslama yapan tek model ve 2.500 TL bütçenin altında (${rec.price.replace(',00 TL', ' TL')}). 6 taksit imkanı ve ${rec.puan.replace('+', '')} hediyesi var. Hazır olduğunda "World Pay ile Al" ile ödemeye geçebilirsin 💳`;
}

/* Öneri çipleri — Koç Grubu markaları. Yalnızca robot süpürge akışı uçtan uca hazır. */
const CHIPS = [
  { key: 'robot', label: '🤖 Robot süpürge önerisi' },
  { key: 'setur', label: '🏖️ Setur ile tatil planla' },
  { key: 'boyner', label: '👕 Boyner kombin önerisi' },
  { key: 'opet', label: '⛽ Opet yakıt kampanyaları' },
];
const CHIP_FLOWS = {
  setur: {
    user: 'Setur ile yaz tatili planlamak istiyorum.',
    reply: 'Harika fikir! 🏖️ Setur ile tatil planlama deneyimi üzerinde çalışıyoruz, çok yakında burada olacak. Bu prototipte World kampanyalı robot süpürge alışverişini uçtan uca deneyimleyebilirsin — istersen hemen önerileri getireyim.',
  },
  boyner: {
    user: 'Boyner\'den kombin önerisi alabilir miyim?',
    reply: 'Stil önerileri yakında! 👕 Boyner kombin asistanı bu prototipte henüz aktif değil. Şimdilik sana Koçtaş\'tan World kampanyalı robot süpürge önerilerinde yardımcı olabilirim.',
  },
  opet: {
    user: 'Opet yakıt kampanyalarını gösterir misin?',
    reply: 'Opet kampanyaları çok yakında burada olacak! ⛽ Bu prototipte robot süpürge alışveriş akışını deneyimleyebilirsin — World\'e özel taksit ve Worldpuan avantajlarıyla.',
  },
};

/* Demo bölümleri — her biri kendi hash'iyle doğrudan açılır (bütün akışı tekrarlamadan) */
const SECTIONS = [
  { hash: 'home',      icon: 'home',     t: 'Ana Ekran',           d: 'Kartlar, hızlı işlemler, asistan girişi' },
  { hash: 'widgets',   icon: 'grid',     t: 'Widget Galerisi — tüm çeşitler', d: 'Yapı Kredi widget\'ları tek ekranda; kaydır, beğendiğini seç (karekodlu olanlar ödemeyi açar)' },
  { hash: 'springboard', icon: 'qr',     t: 'Karekod ile Öde — Ana ekran widget\'ı', d: 'Telefon ana ekranındaki YK widget\'ından tek dokunuşla TR Karekod okut, saniyeler içinde öde' },
  { hash: 'assistant', icon: 'spark',    t: 'Koçtaş Senaryosu — Tamamlandı', d: 'Robot süpürge sohbeti + öneriler (dolu görünüm)' },
  { hash: 'setur',     icon: 'sun',      t: 'Setur Senaryosu — Tamamlandı',  d: 'Otonom agent tatili buldu — sonucuyla dolu sohbet' },
  { hash: 'chat',      icon: 'guide',    t: 'Asistan — Boştan',    d: 'Sohbeti baştan, animasyonlu dene' },
  { hash: 'payment',   icon: 'card',     t: 'Ödeme Ekranı',        d: 'Adres, kargo, taksit, Worldpuan, sözleşme' },
  { hash: 'success',   icon: 'check',    t: 'Ödeme Başarılı',      d: 'Onay, Worldpuan, dekont' },
  { hash: 'tracking',  icon: 'box',      t: 'Sipariş Takibi',      d: 'Durum çizgisi, YK Kargo, fatura, iade/cayma' },
  { hash: 'birikim',    icon: 'wallet2', t: 'Birikim — Hub (tek özellik)', d: 'Ne biriktireyim (maden/hesap/fon/bağış) × nasıl (harcama/ekstre/talimat) seç' },
  { hash: 'birikim-manage', icon: 'pie', t: 'Birikim — Yönet', d: 'Seçilen kombinasyona göre kumbara, grafik, kural özeti, hareketler (dolu)' },
  { hash: 'birikim-history', icon: 'receipt', t: 'Birikim — Hareketler', d: 'Aya göre gruplu birikim hareketleri' },
  { hash: 'fayda',        icon: 'world',   t: 'Ödül Yolu — Hub', d: 'Ödülünü seç, sıralı level\'ları geç, ödülünü kap (Benim Dünyam)' },
  { hash: 'fayda-journey', icon: 'target', t: 'Ödül Yolu — Yolculuk', d: 'HUD + dikey level haritası + sonda ödül (Limit demo 2/5)' },
  { hash: 'fayda-wallet', icon: 'star',    t: 'Ödüllerim', d: 'Kazanılmış ve aktif ödüller (kupon kartları)' },
  { hash: 'split',      icon: 'transfer', t: 'Harcama Bölüştür — Hub', d: 'Gelen/Gönderilen ödeme istekleri, istek oluştur (Ödeme İste)' },
  { hash: 'split-pick', icon: 'receipt',  t: 'Harcama Bölüştür — Harcama seç', d: 'Kart hareketi/fatura/abonelik seçip böl' },
  { hash: 'split-form', icon: 'wallet2',  t: 'Harcama Bölüştür — Form',  d: 'Kişi başı, payım var, süreler, kısmi ödeme (dolu)' },
  { hash: 'split-pay',  icon: 'card',     t: 'Harcama Bölüştür — Gelen isteği öde', d: 'FAST ile tek dokunuş ödeme (ödeyen taraf)' },
  { hash: 'reward-goal', icon: 'world',   t: 'Birlikte Kazan — Hub', d: 'Grup harcama hedefi → Worldpuan iadesi → kişi başı bölüşüm' },
  { hash: 'reward-goal-new', icon: 'target', t: 'Birlikte Kazan — Yeni hedef', d: 'Grup, hedef tutar, dönem, eşit/katkı paylaşımı' },
  { hash: 'reward-goal-track', icon: 'pie', t: 'Birlikte Kazan — İlerleme', d: 'Kolektif ilerleme, üye katkıları, ödül havuzu (dolu)' },
  { hash: 'reward-goal-win', icon: 'star', t: 'Birlikte Kazan — Kutlama', d: 'Hedefe ulaşıldı, havuz kişi başı paylaşıldı, Ödüllerim' },
  { hash: 'sky-limit',  icon: 'loan',     t: 'Taslak — Sky Limit', d: 'Tek ortak kredi limiti: toplam limit, ürün bazında dağılım, son ödemeler' },
  { hash: 'sky-limit-manage', icon: 'transfer', t: 'Taslak — Sky Limit: Limit dağılımı', d: 'Ürünler arası limit aktarımı (kaydırma + tutar girişi, kurallarla)' },
  { hash: 'sky-limit-payment', icon: 'refresh', t: 'Taslak — Sky Limit: Ödeme sonrası açılan limit', d: '20.000 TL taksit ödendi → limit yeniden açıldı, başka üründe kullan' },
  { hash: 'insights',   icon: 'pie',      t: 'Harcama Analizi',      d: 'Aylık toplam, kategori dağılımı, işyeri kırılımı' },
  { hash: 'limits',     icon: 'target',   t: 'Harcama Limitlerim',   d: 'Kategoriye tutar girerek aylık limit koy' },
  { hash: 'kid',        icon: 'wallet2',  t: 'Çocuk Ek Kartı',       d: 'Limit, harçlık, birikim hedefi, veli eşleştirme, onaylar, rozetler' },
  { hash: 'toplu-borc', icon: 'payments', t: 'Taslak — Toplu Borç Ödeme', d: 'Kart, esnek hesap ve kredi borçları tek ekstrede: toplam borç, dağılım, toplu öde' },
  { hash: 'toplu-borc-ekstre', icon: 'doc', t: 'Taslak — Toplu Borç: Ekstre detayı', d: 'Ürün bazında borç, taksit ve son ödeme bilgileri' },
  { hash: 'toplu-borc-gecmis', icon: 'receipt', t: 'Taslak — Toplu Borç: Ödeme geçmişi', d: 'Önceki toplu ödemeler, durum ve işlem detayı' },
  { hash: 'erken-maas', icon: 'salaryEarly', t: 'Taslak — Erken Maaş Erişimi', d: 'Maaşın %25\'ine maaş gününü beklemeden eriş: limit, tutar seçimi, koşullar' },
  { hash: 'erken-maas-tutar', icon: 'wallet2', t: 'Taslak — Erken Maaş: Tutar belirle', d: 'Kaydırma + tutar girişi, limit üstü talep engeli' },
  { hash: 'erken-maas-gecmis', icon: 'receipt', t: 'Taslak — Erken Maaş: İşlem geçmişi', d: 'Önceki erişimler ve geri ödeme durumları' },
  { hash: 'arac', icon: 'car', t: 'Taslak — Marketplace Taşıt', d: 'Otokoç araçları: ara, karşılaştır, kredini ve kaskonu tek akışta tamamla, teslimi izle' },
  { hash: 'arac-liste', icon: 'search', t: 'Taslak — Marketplace Taşıt: İlanlar ve karşılaştırma', d: 'Filtre, sıralama, favoriler, 3 araca kadar yan yana karşılaştırma' },
  { hash: 'arac-detay', icon: 'car', t: 'Taslak — Marketplace Taşıt: Araç detayı', d: 'Galeri, özellikler, bayi bilgisi, kredi ön onayı başlangıcı' },
  { hash: 'arac-on-onay', icon: 'shield', t: 'Taslak — Marketplace Taşıt: Kredi ön onayı', d: 'Peşinat, vade, ön değerlendirme sonucu (kesin onay değildir)' },
  { hash: 'arac-kredi', icon: 'loan', t: 'Taslak — Marketplace Taşıt: Kredi ve ödeme planı', d: 'Peşinat ve vade değiştikçe canlı taksit, senaryo karşılaştırma' },
  { hash: 'arac-basvuru', icon: 'doc', t: 'Taslak — Marketplace Taşıt: Başvuru ve kullandırım', d: 'Özet, belgeler, sözleşmeler; kesin değerlendirme ve kullandırım ayrı adım' },
  { hash: 'arac-kasko', icon: 'insurance', t: 'Taslak — Marketplace Taşıt: Kasko teklifleri', d: 'Allianz Türkiye kasko paketleri: teminat karşılaştırma, poliçe onayı' },
  { hash: 'arac-takip', icon: 'truck', t: 'Taslak — Marketplace Taşıt: Teslim ve süreç takibi', d: 'Kredi, kullandırım, kasko ve teslim durumu tek ekranda' },
  { hash: 'konut', icon: 'home', t: 'Taslak — Marketplace Konut', d: 'Satılık konut ara ve karşılaştır; kredini planla, başvuru, ekspertiz ve tapuyu tek akışta izle' },
  { hash: 'konut-tanitim', icon: 'spark', t: 'Taslak — Marketplace Konut: İlk giriş tanıtımı', d: 'Hizmet tanıtımı; tahsis ve TAKBİS adımlarından önce (yalnızca ilk girişte)' },
  { hash: 'konut-tahsis', icon: 'user', t: 'Taslak — Marketplace Konut: Tahsis bilgileri', d: 'Salt okunur kimlik bilgileri; meslek ve gelir bilgisini onayla ya da düzenle' },
  { hash: 'konut-takbis', icon: 'shield', t: 'Taslak — Marketplace Konut: TAKBİS bilgileri', d: 'Adım adım konut sahipliği soruları; BSMV, LTV ve TAKBİS sorgu kapsamı' },
  { hash: 'konut-liste', icon: 'search', t: 'Taslak — Marketplace Konut: İlanlar ve karşılaştırma', d: 'Filtre, sıralama (fiyat, m², konum), favoriler, bölge ortalamasıyla fiyat karşılaştırma' },
  { hash: 'konut-detay', icon: 'home', t: 'Taslak — Marketplace Konut: Konut detayı', d: 'Geniş galeri, brüt/net m², kat, ısıtma, konum haritası, emlak ofisi' },
  { hash: 'konut-kredi', icon: 'loan', t: 'Taslak — Marketplace Konut: Kredi simülasyonu', d: 'Peşinat ve vadeyle canlı taksit, ödeme kapasitesi, senaryo karşılaştırma, masraflar' },
  { hash: 'konut-basvuru', icon: 'doc', t: 'Taslak — Marketplace Konut: Kredi başvurusu', d: 'Müşteri, gelir, konut ve kredi özeti; gerekli belgeler ve sözleşmeler' },
  { hash: 'konut-takip', icon: 'doc', t: 'Taslak — Marketplace Konut: Başvuru takibi ve nihai onay', d: 'İlk değerlendirme, ekspertiz durumu, ekspertiz raporu ve nihai kredi onayı' },
  { hash: 'konut-ekspertiz', icon: 'pin', t: 'Taslak — Marketplace Konut: Ekspertiz', d: 'Bankanın başlattığı ekspertiz: atanan kuruluş, randevu; sonraki girişte onaylı rapor' },
  { hash: 'konut-ipotek', icon: 'bank', t: 'Taslak — Marketplace Konut: Tapu ve ipotek', d: 'Şube randevusu, DASK ve tapu harcı, tapu devri, ipotek tesisi ve kullandırım' },
  { hash: 'konut-tamam', icon: 'check', t: 'Taslak — Marketplace Konut: Kredi kullandırıldı', d: 'Süreç tamamlandı ekranı' },
  { hash: 'isletme', icon: 'bars', t: 'Taslak — Akıllı İşletme Finansmanı', d: 'İşletmenin para giriş ve çıkışları, yapay zekâ analizi ve sana özel finansman teklifleri' },
  { hash: 'isletme-hareketler', icon: 'pie', t: 'Taslak — Akıllı İşletme Finansmanı: Finansal hareketler', d: 'Şirkete girenler / çıkanlar, kategori ve işlem detayı, dönem karşılaştırma' },
  { hash: 'isletme-analiz', icon: 'spark', t: 'Taslak — Akıllı İşletme Finansmanı: Yapay zekâ analizi', d: 'Finansal sağlık, nakit akışı eğilimi, olası nakit açıkları, finansman ihtiyacı' },
  { hash: 'isletme-oneriler', icon: 'loan', t: 'Taslak — Akıllı İşletme Finansmanı: Finansman önerileri', d: 'İşletmeye özel 5 alternatif, gerekçeleri ve uygunluk puanı' },
  { hash: 'isletme-karsilastir', icon: 'bars', t: 'Taslak — Akıllı İşletme Finansmanı: Teklif karşılaştırma', d: 'Tutar, maliyet, vade, aylık ödeme, toplam geri ödeme ve erken ödeme yan yana' },
  { hash: 'isletme-basvuru', icon: 'doc', t: 'Taslak — Akıllı İşletme Finansmanı: Detay ve başvuru', d: 'İşletme bilgileri, finansman koşulları, geri ödeme planı ve başvuru özeti' },
  { hash: 'isletme-takip', icon: 'doc', t: 'Taslak — Akıllı İşletme Finansmanı: Başvuru ve finansman takibi', d: 'Değerlendirme, onay, kullandırım ve geri ödeme planı' },
  { hash: 'search',    icon: 'search',   t: 'Arama',               d: 'Arama ekranı' },
  { hash: 'settings',  icon: 'gear',     t: 'Ayarlar',             d: 'Tema ve bildirimler' },
];

const MENU = [
  { id: 'home', label: 'Ana Sayfa', icon: 'home' },
  { id: 'accounts', label: 'Hesaplarım', icon: 'wallet' },
  { id: 'cards', label: 'Kartlarım', icon: 'card' },
  { id: 'transfer', label: 'Para Transferleri', icon: 'transfer' },
  { id: 'invest', label: 'Yatırımlar', icon: 'invest' },
  { id: 'payments', label: 'Ödemeler', icon: 'payments' },
  { id: 'loan', label: 'Krediler', icon: 'loan' },
  { id: 'insurance', label: 'Sigortalar ve BES', icon: 'insurance' },
  { id: 'world', label: 'Benim Dünyam', icon: 'world' },
  { id: 'other', label: 'Diğer İşlemler', icon: 'grid' },
];

/* ---------- Durum ---------- */
const state = {
  screen: 'home',
  chatStarted: false,
  selectedProduct: null,
  payMethod: null,      // 'worldcard' | 'worldpuan' | 'bank'
  installment: 'single', // 'single' | 't3' | 't6' — varsayılan tek çekim
  // Mesafeli ödeme deneyimi
  addressId: 'a1',           // seçili teslimat adresi
  billingSame: true,         // faturamı aynı adrese gönder (varsayılan açık)
  preInfoOk: false,          // Ön Bilgilendirme Formu onayı
  contractOk: false,         // Mesafeli Satış Sözleşmesi onayı
  usePuan: false,            // Worldpuan ile kısmi ödeme
  // Karekod ile Öde — ana ekran widget'ı (kendi bağımsız akışı)
  qr: { merchant: null, method: 'worldcard', order: null },
  nav: [],                   // geri (back) yığını — gerçek uygulama gibi geri davranışı
  theme: localStorage.getItem('ykm-theme') || 'dark',
  // Dinamik Güvenlik Kodu (dinamik CVV) — 5 dk geçerli, üretilince öncekini geçersiz kılar
  dcvv: { code: null, expires: 0 },   // code: '660' | null · expires: epoch ms
  // Otonom Setur akışı
  seturOptionIdx: 0,         // gösterilen tatil seçeneği (0/1 arası dönüşümlü)
  seturAuthorized: false,    // agent'a yetki verildi mi
  seturSeed: false,          // sohbeti Setur sonucuyla anında kur
  // Harcama analizi & limit
  spendCat: 'market',        // seçili kategori (detay ekranı)
  subId: null,               // seçili abonelik (detay ekranı)
  spendCard: 'all',          // harcama/limit filtresi: 'all' | 'worldcard' | 'tlcard'
  totalLimit: 20000,         // ayrı, düzenlenebilir toplam aylık limit
  limits: { market: 4000, yeme: 2000, giyim: 3000, akaryakit: 2500, eglence: 1500 },   // kategori → aylık limit (TL)
  // Yuvarla Biriktir (işlem başına round-up)
  roundup: {
    active: false,           // kural kurulu mu
    source: null,            // seçili kaynak kart: 'worldgold' | 'tlcard' | null
    account: null,           // seçili birikim hesabı: 'sav' | 'sav2' | null
    agreed: false,           // Yuvarla Biriktir Talimat Formu onayı
    goal: null,              // birikim hedefi: { id, emoji, name, amount } | null
    jar: 1842.35,            // toplam biriken (TL)
    monthChange: 15,         // geçen aya göre % değişim
    txns: [],                // {merchant, emoji, spent, add, date, month} — en yeni başta
  },
  // Ekstreden Biriktir (ekstre endeksli otomatik birikim) — Yuvarla Biriktir'in kardeşi
  spendup: {
    active: false,           // kural kurulu mu
    source: null,            // seçili kaynak kredi kartı: 'worldgold' | 'tlcard' | null
    account: null,           // seçili birikim hesabı: 'sav' | 'sav2' | null
    rate: 10,                // ekstre yüzdesi (hazır: 1/5/10 ya da özel)
    cap: 500,                // aylık aktarılacak maksimum tutar (TL) — null ise sınırsız
    agreed: false,           // Ekstreden Biriktir Talimat Formu onayı
    jar: 3184.60,            // toplam biriken (birikim + faiz)
    interest: 96.35,         // toplam kazanılan günlük faiz (round-up'ta olmayan fark)
    monthChange: 12,         // geçen aya göre % değişim
    txns: [],                // {label, statement, rate, add, interest, date, month} — en yeni başta
  },
  // Maden Biriktir (talimatlı değerli maden birikimi) — sabit tutarlı düzenli altın/gümüş alımı
  metal: {
    active: false,           // talimat kurulu mu
    source: null,            // ödeme kartı: 'worldgold' (kredi) | 'tlcard' (banka) | null
    kind: 'gold',            // seçili maden: 'gold' | 'silver'
    unit: 'try',             // talimat cinsi: 'try' (sabit TL) | 'gram' (sabit gram)
    tryAmt: 1000,            // sabit TL tutar (unit='try')
    gram: 0.5,               // sabit gram (unit='gram')
    agreed: false,           // Maden Biriktir Talimat Formu onayı
    monthChange: 9,          // güncel değerin geçen aya göre % değişimi (mock)
    txns: [],                // {gram, price, date, month} — en yeni başta (o ayki alım)
  },
  // Fayda Yolculukları (Benim Dünyam) — sıralı açılan level'lar; faydanı seç, adım adım kazan
  fayda: {
    view: null,              // görüntülenen fayda id
    prog: {                  // fayda başına level ilerlemesi (level index → sayaç değeri)
      limit: [1, 3, 0, 0, 0],           // L1 + L2 tamam (2/5) → Sıradaki: Level 3 (demo aktif yolculuk)
      eft:   [1, 1, 1, 1, 1],           // tümü tamam → kazanıldı (cüzdanda)
      faiz:  [1, 1, 1, 5000, 1],        // tümü tamam → kazanıldı (L4 bakiye hedefi dolu)
    },
    choice: { faiz: 'Tatil', worldpuan: '' },   // seçim gerektiren level'ların seçimi
    wallet: [                // kazanılmış/aktif faydalar (en yeni başta)
      { id: 'eft',  label: '10 ücretsiz EFT/FAST hakkı', meta: 'Kalan hak: 7 · 24 gün geçerli', status: 'active' },
      { id: 'faiz', label: '30 gün ek faiz fırsatı',      meta: '18 gün geçerli',                status: 'active' },
    ],
  },
  // Çocuk Ek Kartı (ebeveyn kontrollü) — Harcamalarım içinden yönetilir
  kid: {
    name: 'Elif',
    age: 12,
    card: '5218 90** **** 4417',
    frozen: false,           // kart donduruldu mu
    balance: 640,            // karttaki harçlık bakiyesi (TL)
    allowance: 500,          // haftalık düzenli harçlık (TL)
    matchRate: 0.5,          // veli eşleştirme: çocuk 1 TL biriktirince veli +0,5 TL
    monthLimit: 2000,        // aylık harcama limiti (TL)
    // Bu ayki harcamalar (limit ilerlemesi bunlardan türetilir)
    txns: [
      { m: 'Kantin',        s: 'Okul',       d: '18 Haz', a: 85.00 },
      { m: 'D&R',           s: 'Kitap',      d: '15 Haz', a: 240.00, img: 'assets/dr.jpg' },
      { m: 'Spotify',       s: 'Abonelik',   d: '12 Haz', a: 60.00,  img: 'assets/spotify.png' },
      { m: 'Migros',        s: 'Atıştırma',  d: '09 Haz', a: 130.00 },
      { m: 'BiletAll',      s: 'Sinema',     d: '05 Haz', a: 220.00 },
    ],
    // Hedefli birikim — kidSaved: çocuğun biriktirdiği, matched: veli katkısı
    goals: [
      { id: 'bisiklet', emoji: '🚲', name: 'Bisiklet',   target: 6000, kidSaved: 2600, matched: 1300 },
      { id: 'lego',     emoji: '🧩', name: 'Lego seti',  target: 2000, kidSaved: 900,  matched: 450  },
    ],
    // Ebeveyn onayı bekleyen istekler
    pending: [
      { id: 'p1', kind: 'harcama', merchant: 'App Store', note: 'Oyun içi satın alma', amount: 149.00, emoji: '🎮' },
      { id: 'p2', kind: 'harclik', merchant: 'Ek harçlık', note: 'Elif ek harçlık istedi', amount: 100.00, emoji: '💸' },
    ],
  },
  // Harcama Bölüştür / Ödeme İste — ortak harcamayı kişilere bölüp ödeme isteği gönderme
  split: {
    tab: 'in',            // hub sekmesi: 'in' (gelen) | 'out' (gönderilen)
    mode: 'pick',         // istek yolu: 'pick' (harcama seç) | 'amount' (tutar gir)
    pickTab: 'subs',      // harcama seç sekmesi: 'card' | 'bill' | 'subs'
    picked: [],           // seçili harcamalar: {id, name, sub, date, amount}
    amount: 0,            // tutar girerek modunda toplam
    peopleTab: 'people',  // 'people' | 'groups'
    people: [],           // seçili kişiler: {id, name, bank}
    myShare: true,        // "Harcamada payım var" — kişi başı hesaba beni de kat
    account: 'main',      // isteğin toplanacağı alıcı hesap
    purpose: 'Bireysel ödeme',
    note: '',
    valid: '1 ay',        // istek geçerlilik süresi
    due: 'Son ödeme gününü seç',  // son ödeme süresi
    partial: false,       // kısmi ödeme açık mı
    payId: null,          // #split-pay'de ödenen gelen istek id'si
  },
  // Birlikte Kazan — grup harcama hedefine ulaşınca kazanılan Worldpuan iadesini
  // katılımcılara bölüştürme. "Yeni hedef" sihirbazının taslağı (sade: süre/kategori yok).
  bk: {
    viewId: 'g-market',   // track/win'de görüntülenen hedef
    name: '',             // yeni hedef adı
    target: 30000,        // yeni hedef tutarı (TL)
    people: [],           // katılımcılar {id,name}
    share: 'equal',       // paylaşım modeli: 'equal' | 'contrib'
  },
  // Birikim (birleşik) — tek özellik, 4 birikim tipi × 3 başvuru tipi matrisi.
  // Kullanıcı hub'ta "ne biriktireyim" (dest) + "nasıl" (fund) seçer; tek uyarlanabilir
  // başvuru akışıyla plan oluşturur. Aktif planlar ana ekran hub'ında listelenir.
  sv: {
    dest: 'metal',        // birikim tipi (hub seçimi): 'account' | 'metal' | 'fund' | 'donation'
    fund: 'mandate',      // başvuru tipi (hub seçimi): 'roundup' | 'statement' | 'mandate'
    // — başvuru taslağı (ekranlar arası ortak) —
    card: null,           // 'worldgold' | 'tlcard'
    account: 'sav',       // dest=account hedef hesabı
    metalKind: 'gold',    // dest=metal seçili maden
    fundKind: 'para',     // dest=fund seçili yatırım fonu
    cause: 'egitim',      // dest=donation seçili kurum
    unit: 'try',          // mandate cinsi (yalnız metal'de gram anlamlı): 'try' | 'gram'
    tryAmt: 1000,         // mandate sabit TL
    gram: 0.5,            // mandate sabit gram (metal)
    rate: 10,             // statement ekstre yüzdesi
    cap: 500,             // statement aylık tavan (null = sınırsız)
    salaryPct: 10,        // salary maaş yüzdesi
    agreed: false,        // talimat formu onayı
    plans: [],            // aktifleştirilmiş planlar (svSeedPlan çıktısı)
    view: null,           // yönet/hareketler ekranında görüntülenen plan id'si
  },
};

/* Grup hedefleri — hub bunları listeler, track/win seçileni gösterir.
   Ödül = hedef tutarın %5'i Worldpuan (TL değeriyle gösterilir). */
const BK_RATE = 5;
const bkGoals = [
  { id: 'g-market', name: 'Market Alışverişi', icon: '🛒', target: 30000, spent: 18450, daysLeft: 12, rate: BK_RATE, share: 'equal', status: 'active', claimed: false,
    members: [
      { id: 'me', name: 'Selçuk İmre', contrib: 6200, me: true },
      { id: 'k8', name: 'Ayşe Yıldız', contrib: 5800 },
      { id: 'k3', name: 'Mert Demir',  contrib: 4000 },
      { id: 'k9', name: 'Ece Kaya',    contrib: 2450 },
    ] },
  { id: 'g-resto', name: 'Restoran Haftası', icon: '🍽️', target: 10000, spent: 6750, daysLeft: 5, rate: BK_RATE, share: 'equal', status: 'active', claimed: false,
    members: [
      { id: 'me', name: 'Selçuk İmre', contrib: 2600, me: true },
      { id: 'k2', name: 'Burak Ünal',  contrib: 2400 },
      { id: 'k4', name: 'Deniz Şahin', contrib: 1750 },
    ] },
  { id: 'g-yaz', name: 'Yaz Tatili', icon: '🏖️', target: 20000, spent: 20000, daysLeft: 0, rate: BK_RATE, share: 'equal', status: 'done', claimed: true,
    members: [
      { id: 'me', name: 'Selçuk İmre', contrib: 7000, me: true },
      { id: 'k8', name: 'Ayşe Yıldız', contrib: 6000 },
      { id: 'k3', name: 'Mert Demir',  contrib: 4500 },
      { id: 'k9', name: 'Ece Kaya',    contrib: 2500 },
    ] },
];

/* Örnek ödeme istekleri — gelen (ben öderim) ve gönderilen (ben istedim).
   Ödeme yapılınca durumları güncellenir; hub bunlardan beslenir. */
const splitIn = [
  { id: 'in1', from: 'Burak Ünal',       note: 'Konser bileti (2 kişi)', amount: 900.00, date: '6 Tem', status: 'pending' },
  { id: 'in2', from: 'Melih Söbücovalı', note: 'Hafta sonu villa', amount: 1450.00, date: '3 Tem', status: 'pending' },
];
const splitOut = [
  { id: 'out1', title: 'YouTube Premium', note: 'Aile aboneliği', total: 159.99, per: 53.33, date: '1 Tem',
    people: [
      { name: 'Burak Ünal',       status: 'paid' },
      { name: 'Melih Söbücovalı', status: 'pending' },
    ] },
];

/* ---------- Mock teslimat adresleri (kişisel veri yok, tamamen örnek) ---------- */
const ADDRESSES = [
  { id: 'a1', title: 'Ev',     name: 'Selçuk İmre', line: 'Zincirlidere Cad. No:1 Daire:1 Kat:1', city: 'Şişli / İstanbul',    phone: '0 (5••) ••• •• 24' },
  { id: 'a2', title: 'İş',     name: 'Selçuk İmre', line: 'Yapı Kredi Bankacılık Üssü, Rahmi Dibek Cad. No:1', city: 'Çayırova / Kocaeli', phone: '0 (5••) ••• •• 24' },
  { id: 'a3', title: 'Yazlık', name: 'Selçuk İmre', line: 'Güzeloba Mah. Lara Cad. No:42 D:7', city: 'Muratpaşa / Antalya', phone: '0 (5••) ••• •• 24' },
];
function getAddress() { return ADDRESSES.find(a => a.id === state.addressId) || ADDRESSES[0]; }

/* ---------- Mock kullanıcı finansal profili (örnek veriler) ---------- */
const USER = {
  name: 'Selçuk',
  limit: 18500,          // Worldcard kullanılabilir limit (TL)
  worldpuan: 1250,       // mevcut Worldpuan bakiyesi
  balance: 10000,        // Vadesiz TL hesap bakiyesi
};
const PUAN_VALUE = 0.1;  // 1 Worldpuan = 0,10 TL (örnek değerleme)

function fmtTL(n) { return n.toLocaleString('tr-TR') + ',00 TL'; }
// Küsuratlı TL biçimi — round-up tutarları için (ör. "0,50 TL")
function fmtTL2(n) { return n.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' TL'; }

/* ---------- Yuvarla Biriktir yardımcıları ---------- */
// Özelliğin logosu — dairesel oklar + ₺ jeton (tema-uyumlu, currentColor)
function ruLogo(size) {
  return `<svg class="ru-logo-svg" width="${size}" height="${size}" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <path d="M9 20.5 A16 16 0 0 1 33.5 11.2" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M33.5 11.2 l-6.2 -1.1 l3 5.5 z" fill="currentColor"/>
    <path d="M39 27.5 A16 16 0 0 1 14.5 36.8" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M14.5 36.8 l6.2 1.1 l-3 -5.5 z" fill="currentColor"/>
    <circle cx="24" cy="24" r="8.6" fill="currentColor"/>
    <text x="24" y="28.4" text-anchor="middle" font-size="12.5" font-weight="800" fill="#fff" font-family="Ubuntu, system-ui, sans-serif">₺</text>
  </svg>`;
}
// Kart seç alanının katalogu (Yapı Kredi kredi / banka kartları)
const RU_CARDS = [
  { id: 'worldgold', name: 'World Gold', num: '5400 61** **** 1234', kind: 'Kredi Kartı', detail: 'Kullanılabilir Limit 18.500 TL' },
  { id: 'tlcard',    name: 'TLcard',     num: '4506 34** **** 8842', kind: 'Banka Kartı', detail: 'Vadesiz TL · Bakiye 10.000 TL' },
];
function ruCard() { return RU_CARDS.find(c => c.id === state.roundup.source) || null; }
function ruCardLabel() { const c = ruCard(); return c ? `${c.name} ${c.num}` : 'Seçilmedi'; }
// Kart görseli — World Gold gerçek kart fotoğrafı, TLcard tema renkli çizilmiş mini kart
function ruCardArt(c) {
  if (c.id === 'worldgold') return `<img src="${WORLDCARD_IMG}" class="ru-card-img" alt="" onerror="this.outerHTML='💳'">`;
  return `<span class="ru-card-art"><i>TLcard</i><b></b></span>`;
}
// Birikim (hedef) hesabı katalogu — yalnızca getirili birikim hesapları
const RU_ACCOUNTS = [
  { id: 'sav',  name: 'Birikim Hesabım',     iban: 'TR•••• 1234', detail: 'Vadesiz TL · günlük getirili' },
  { id: 'sav2', name: 'Yardımcı Birikim',    iban: 'TR•••• 9012', detail: 'Vadesiz TL · günlük getirili' },
];
function ruAccount() { return RU_ACCOUNTS.find(a => a.id === state.roundup.account) || null; }
function ruAccountLabel() { const a = ruAccount(); return a ? `${a.name} ${a.iban}` : 'Seçilmedi'; }
// Yuvarlama kuralı sabit: her harcama sonraki 100 TL'ye tamamlanır
const RU_UNIT = 100;
const RU_EST = '~250 TL';               // kaba aylık birikim tahmini (mock)
const RU_SAMPLES = [225, 386];          // "Nasıl çalışır?" örnek harcamaları
function ruNextUnit(v, unit) { return Math.ceil(v / (unit || RU_UNIT)) * (unit || RU_UNIT); }
// Hedef önerileri (birikim hedefi sheet'i)
const RU_GOAL_PRESETS = [
  { id: 'tatil', emoji: '🏖️', name: 'Tatil',           amount: 10000 },
  { id: 'tech',  emoji: '📱', name: 'Yeni Telefon',    amount: 25000 },
  { id: 'fon',   emoji: '🛟', name: 'Acil Durum Fonu', amount: 20000 },
];
// Aylık birikim grafiği — geçmiş 5 ay sabit, içinde bulunulan ay state'ten türetilir
const RU_CUR_MONTH = 'Mayıs 2026';
const RU_MONTHS = [
  { m: 'Ara', v: 96.5 }, { m: 'Oca', v: 141.2 }, { m: 'Şub', v: 128.4 },
  { m: 'Mar', v: 189.75 }, { m: 'Nis', v: 214.6 },
];
// Bu ayın işlemleri / toplamı — hep hareket listesinden türetilir (tutarsızlık olmasın)
function ruMonthTxns() { return state.roundup.txns.filter(t => t.month === RU_CUR_MONTH); }
function ruMonthTotal() { return ruMonthTxns().reduce((s, t) => s + t.add, 0); }
// Kumbara ilk açıldığında geçmiş dolu görünsün diye örnek hareketler (add = birime tamamlanan fark)
const RU_SEED_TXNS = [
  { merchant: 'Market alışverişi', emoji: '🛒', spent: 225,  add: 75, date: '24 Mayıs 09:41',  month: 'Mayıs 2026' },
  { merchant: 'Kahve Dünyası',     emoji: '☕', spent: 390,  add: 10, date: '23 Mayıs 14:12',  month: 'Mayıs 2026' },
  { merchant: 'Trendyol',          emoji: '🛍️', spent: 645,  add: 55, date: '22 Mayıs 20:05',  month: 'Mayıs 2026' },
  { merchant: 'Opet',              emoji: '⛽', spent: 612,  add: 88, date: '21 Mayıs 08:30',  month: 'Mayıs 2026' },
  { merchant: 'Getir',             emoji: '🛵', spent: 269,  add: 31, date: '20 Mayıs 19:47',  month: 'Mayıs 2026' },
  { merchant: 'Migros',            emoji: '🛒', spent: 843,  add: 57, date: '17 Mayıs 12:20',  month: 'Mayıs 2026' },
  { merchant: 'BKM Kitap',         emoji: '📚', spent: 176,  add: 24, date: '14 Mayıs 21:03',  month: 'Mayıs 2026' },
  { merchant: 'Koçtaş',            emoji: '🔧', spent: 1240, add: 60, date: '29 Nisan 16:45',  month: 'Nisan 2026' },
  { merchant: 'Kahve Dünyası',     emoji: '☕', spent: 285,  add: 15, date: '26 Nisan 09:12',  month: 'Nisan 2026' },
  { merchant: 'A101',              emoji: '🛒', spent: 458,  add: 42, date: '22 Nisan 18:33',  month: 'Nisan 2026' },
  { merchant: 'Boyner',            emoji: '👕', spent: 2320, add: 80, date: '18 Nisan 15:27',  month: 'Nisan 2026' },
  { merchant: 'Opet',              emoji: '⛽', spent: 954,  add: 46, date: '12 Nisan 10:08',  month: 'Nisan 2026' },
];
function productTotal() { return parseInt(state.selectedProduct.priceNum.replace('.', '')); }
function puanDiscount() { return state.usePuan ? Math.round(USER.worldpuan * PUAN_VALUE) : 0; }
function payableNum() { return productTotal() - puanDiscount(); }
function payableStr() { return fmtTL(payableNum()); }
function earnedPuan() { return parseInt((state.selectedProduct.puan.match(/\d+/) || [0])[0]); }

/* ---------- DOM kısayolları ---------- */
const app = document.getElementById('app');
const drawerEl = document.getElementById('drawer');
const scrimEl = document.getElementById('scrim');
const sheetEl = document.getElementById('sheet');
const sheetScrimEl = document.getElementById('sheet-scrim');
const toastEl = document.getElementById('toast');
const lockEl = document.getElementById('lockscreen');

/* ===================================================================
   EKRANLAR
   =================================================================== */

function HomeScreen() {
  return `
  <div class="screen anim-fade">
    <div class="topbar">
      <div class="topbar-card">
        <button class="icon-btn menu-ico" data-action="open-drawer" aria-label="Menü">${I.menu}</button>
        <div class="search-pill" data-action="open-search"><span>Yapı Kredi Mobil'de Ara</span></div>
        <div class="icon-wrap"><button class="icon-btn bell-ico" data-action="toast" data-msg="Bildirimler prototipte aktif değil">${I.bell}</button></div>
        <button class="avatar-btn" data-action="toast" data-msg="Profil prototipte aktif değil">${I.user}</button>
      </div>
    </div>

    <div class="bank-tabs">
      <button class="bank-tab active">Yapı Kredi</button>
      <button class="bank-tab" data-action="toast" data-msg="Diğer Bankalarım prototipte aktif değil">Diğer Bankalarım<span class="tab-new">Yeni</span></button>
    </div>

    <div class="screen-scroll">
      <div class="section-title">Hesaplarım</div>
      <div class="acard-scroll">
        <div class="acard">
          <div class="acard-top">
            <div class="acard-logo wallet wallet-tl"><img src="assets/tl-white.png" class="tl-img" alt="₺" onerror="this.outerHTML='<span class=\\'wallet-glyph\\'>₺</span>'"><span class="wallet-dot"></span></div>
            <div>
              <div class="acard-name">Vadesiz TL Hesabım</div>
              <div class="acard-sub">12345678</div>
            </div>
            <div class="acard-more" data-action="toast" data-msg="Hesap detayı prototipte aktif değil">⋮</div>
          </div>
          <div class="acard-figs">
            <div class="acard-fig"><div class="val">${money('10.000')}</div><div class="lbl">Kullanılabilir Bakiye</div></div>
            <div class="acard-fig"><div class="val">${money('10.000')}</div><div class="lbl">Güncel Bakiye</div></div>
          </div>
        </div>

        <div class="acard">
          <div class="acard-top">
            <div class="acard-logo wallet wallet-eur"><span class="wallet-glyph">€</span><span class="wallet-dot"></span></div>
            <div>
              <div class="acard-name">Vadesiz Euro Hesabım</div>
              <div class="acard-sub">12345679</div>
            </div>
            <div class="acard-more" data-action="toast" data-msg="Hesap detayı prototipte aktif değil">⋮</div>
          </div>
          <div class="acard-figs">
            <div class="acard-fig"><div class="val">1.250<span class="kurus">,00 EUR</span></div><div class="lbl">Kullanılabilir Bakiye</div></div>
            <div class="acard-fig"><div class="val">1.250<span class="kurus">,00 EUR</span></div><div class="lbl">Güncel Bakiye</div></div>
          </div>
        </div>

        <div class="acard">
          <div class="acard-top">
            <div class="acard-logo wallet wallet-gold"><span class="wallet-bar"></span><span class="wallet-dot"></span></div>
            <div>
              <div class="acard-name">Altın Hesabım</div>
              <div class="acard-sub">12345680</div>
            </div>
            <div class="acard-more" data-action="toast" data-msg="Hesap detayı prototipte aktif değil">⋮</div>
          </div>
          <div class="acard-figs">
            <div class="acard-fig"><div class="val">25,40<span class="kurus"> gr</span></div><div class="lbl">Kullanılabilir Bakiye</div></div>
            <div class="acard-fig"><div class="val">25,40<span class="kurus"> gr</span></div><div class="lbl">Güncel Bakiye</div></div>
          </div>
        </div>
      </div>

      <div class="section-title">Kartlarım</div>
      <div class="acard-scroll">
        <div class="acard worldcard" data-action="card-open">
          <div class="acard-top">
            <div class="acard-cardimg">${imgOrFallback(WORLDCARD_IMG, '💳', 'wc-photo')}</div>
            <div>
              <div class="acard-name">Worldcard</div>
              <div class="acard-sub">1234 56** **** 3333</div>
            </div>
            <div class="acard-more">⋮</div>
          </div>
          <div class="acard-figs">
            <div class="acard-fig"><div class="val">${money('1.000')}</div><div class="lbl">Güncel Borç</div></div>
            <div class="acard-fig"><div class="val">${money('5.000')}</div><div class="lbl">Kullanılabilir Limit</div></div>
          </div>
        </div>

        <div class="acard worldcard" data-action="kid-open">
          <div class="acard-top">
            <div class="acard-cardimg kid-cardimg">${kidCardArt()}</div>
            <div>
              <div class="acard-name">Çocuk Ek Kartı <span class="kid-tag">${state.kid.name}</span></div>
              <div class="acard-sub">${state.kid.card}${state.kid.frozen ? ' · Donduruldu' : ''}</div>
            </div>
            <div class="acard-more">⋮</div>
          </div>
          <div class="acard-figs">
            <div class="acard-fig"><div class="val">${money(Math.round(state.kid.balance).toLocaleString('tr-TR'))}</div><div class="lbl">Harçlık Bakiyesi</div></div>
            <div class="acard-fig"><div class="val">${money(Math.max(0, state.kid.monthLimit - kidSpent()).toLocaleString('tr-TR'))}</div><div class="lbl">Kalan Aylık Limit</div></div>
          </div>
        </div>
      </div>

      ${HomeSavingsHub()}

      <div class="home-lower">
        <div class="quick-row4">
          <div class="quick4" data-action="sp-open"><div class="q4-ico">${I.bars}</div><span>Harcamalarım</span></div>
          <div class="quick4" data-action="toast" data-msg="Para Çek/Yatır prototipte aktif değil"><div class="q4-ico">${I.qr}</div><span>Para Çek/<br>Yatır</span></div>
          <div class="quick4" data-action="toast" data-msg="Son Hareketler prototipte aktif değil"><div class="q4-ico">${I.transfer}</div><span>Son<br>Hareketler</span></div>
          <div class="quick4" data-action="route" data-hash="reward-goal"><div class="q4-ico">${I.world}</div><span>Birlikte<br>Kazan</span></div>
        </div>

        <div class="limit-banner" data-action="toast" data-msg="Hazır Limit prototipte aktif değil">
          <span class="lb-ico">💵</span>
          <span class="lb-title">Hazır Limitim</span>
          <span class="lb-link">Limitini İncele ${I.chevR}</span>
        </div>

        <div class="section-title">Yapı Kredi Step</div>
        <div class="promo-scroll">
          <div class="step-card">
            <button class="step-x" data-action="step-close" aria-label="Kapat">✕</button>
            <div class="step-txt">Yeni sürdürülebilirlik programımız Step ile daha güzel bir geleceğe adım atalım.</div>
            <div class="step-art">🌱</div>
          </div>
          <div class="step-card" data-action="toast" data-msg="Otomatik talimat prototipte aktif değil">
            <div class="step-txt">Otomatik fatura talimatı verin, faturalarınız yerinize ödensin.</div>
            <div class="step-art">🧾</div>
          </div>
        </div>

        <div class="login-foot">
          <div class="lf-row">${I.lock}<span class="lf-lbl">Son Giriş</span><span class="lf-date">11/06/2026 09:41</span></div>
          <div class="lf-row">${I.lock}<span class="lf-lbl">Son Başarısız Giriş</span><span class="lf-date">—</span></div>
        </div>
      </div>
    </div>
  </div>`;
}

// Home'daki Yuvarla Biriktir kartı — kural yoksa promo, varsa durum kartı
// Ana ekran birikim hub'ı — tek "Birikim" özelliği: aktif planlar + yeni birikim girişi
function HomeSavingsHub() {
  const plans = state.sv.plans;
  return `
    <div class="section-title">Otomatik Birikim</div>
    <div class="ru-carousel">
      ${plans.map(svHomeCard).join('')}
      ${svHomeEntryCard(plans.length > 0)}
    </div>`;
}
function svHomeCard(p) {
  const d = SV_DEST[p.dest];
  return `
    <div class="ru-home-card active sv-${d.accent}" data-action="sv-manage" data-id="${p.id}">
      <div class="ru-home-top"><span class="ru-logo sv-home-ico primary">${d.icon}</span>
        <div><div class="ru-home-t">${d.name}</div><div class="ru-home-s">${SV_FUND[p.fund].short}</div></div>
        <span class="chev-r">${I.chevR}</span></div>
      <div class="ru-home-amt">${svPrimary(p)}</div>
      <div class="ru-home-mini"><span>${SV_FUND[p.fund].logo(16)} ${SV_FUND[p.fund].name}</span></div>
    </div>`;
}
function svHomeEntryCard(compact) {
  if (compact) return `
    <div class="ru-home-card promo sv-new" data-action="sv-open">
      <span class="ru-logo sv-new-plus">${I.plus}</span>
      <div class="ru-home-promo-txt"><div class="ru-home-t">Yeni Birikim Planı</div><div class="ru-home-s">Birikim türünü ve yöntemini seç</div></div>
      <span class="ru-home-cta">Oluştur ${I.chevR}</span>
    </div>`;
  return `
    <div class="ru-home-card promo" data-action="sv-open">
      <span class="ru-logo">${ruLogo(38)}</span>
      <div class="ru-home-promo-txt">
        <div class="ru-home-t">Birikim</div>
        <div class="ru-home-s">Kıymetli maden, birikim hesabı, fon ve bağış birikimlerini tek talimatla yönet.</div>
      </div>
      <span class="ru-home-cta">Başvur ${I.chevR}</span>
    </div>`;
}

function HomeRoundupCard() {
  const r = state.roundup;
  if (r.active) {
    const g = r.goal;
    const pct = g ? Math.min(100, Math.round(r.jar / g.amount * 100)) : 0;
    return `
      <div class="ru-home-card active" data-action="ru-open">
        <div class="ru-home-top"><span class="ru-logo">${ruLogo(30)}</span>
          <div><div class="ru-home-t">Yuvarla Biriktir</div><div class="ru-home-s">Toplam biriken</div></div>
          <span class="chev-r">${I.chevR}</span></div>
        <div class="ru-home-amt">${fmtTL2(r.jar)}</div>
        ${g ? `<div class="ru-goal-track home"><div class="ru-goal-fill" style="width:${pct}%"></div></div>
        <div class="ru-home-mini"><span>${g.emoji} ${g.name} hedefi</span><span><b>%${pct}</b></span></div>`
        : `<div class="ru-home-mini"><span>${I.trendUp} Bu ay <b>+${fmtTL2(ruMonthTotal())}</b></span><span>${ruMonthTxns().length} işlem</span></div>`}
      </div>`;
  }
  return `
    <div class="ru-home-card promo" data-action="ru-open">
      <span class="ru-logo">${ruLogo(38)}</span>
      <div class="ru-home-promo-txt">
        <div class="ru-home-t">Yuvarla Biriktir</div>
        <div class="ru-home-s">Her harcamanı bir sonraki 100 TL'ye yuvarla, aradaki farkı otomatik biriktir.</div>
      </div>
      <span class="ru-home-cta">Başvur ${I.chevR}</span>
    </div>`;
}

function SearchScreen() {
  return `
  <div class="screen anim-up">
    <div class="search-head">
      <div class="search-field">
        ${I.search}
        <input id="search-input" type="text" placeholder="Ara" autocomplete="off" />
      </div>
      <span class="search-cancel" data-action="close-search">Vazgeç</span>
    </div>
    <div class="screen-scroll" id="search-content">
      ${SearchEmpty()}
    </div>
  </div>`;
}

function SearchEmpty() {
  return `
    <div class="search-empty">
      <div class="big-ico">${I.searchBig}</div>
      <p>İşlemleri, akıllı rehber kayıtlarınızı, ödeme yapmak istediğiniz faturaların kurumlarını arayabilirsiniz ve arama sonuçlarından işlem yapabilirsiniz.</p>
    </div>
    <div class="result-group-title">Önerilenler</div>
    ${AssistantResult()}
    ${SEARCH_FEATURES.map(f => FeatureResult(f)).join('')}`;
}

function AssistantResult(query) {
  let name = 'Yapı Kredi Alışveriş Asistanı';
  if (query) {
    const re = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'i');
    name = name.replace(re, '<em>$1</em>');
  }
  return `
    <div class="result assistant" data-action="open-assistant">
      <div class="result-ico">${I.spark}</div>
      <div>
        <div class="result-name">${name}</div>
        <div><span class="ai-tag">YAPAY ZEKA</span></div>
        <div class="result-sub">Yapay zeka destekli alışveriş ve kampanya asistanı</div>
      </div>
      <span class="chev-r">${I.chevR}</span>
    </div>`;
}

/* Draft features reachable from search (also listed under "Önerilenler") */
const SEARCH_FEATURES = [
  { hash: 'sky-limit', name: 'Sky Limit', icon: I.loan, sub: 'Kredi limitlerini tek ortak limitte yönet',
    keys: ['limit', 'kredi limiti', 'ortak limit', 'limit aktarımı', 'limit dağılımı', 'kredi', 'ihtiyaç kredisi', 'taşıt kredisi', 'esnek hesap', 'kmh'] },
  { hash: 'toplu-borc', name: 'Toplu Borç Ödeme', icon: I.payments, sub: 'Kart, esnek hesap ve kredi borçların tek ekstrede',
    keys: ['borç', 'borç öde', 'toplu ödeme', 'ekstre', 'kredi kartı borcu', 'kart borcu', 'esnek hesap', 'kmh', 'taksit', 'konut kredisi', 'taşıt kredisi', 'kredi borcu'] },
  { hash: 'erken-maas', name: 'Erken Maaş Erişimi', icon: I.salaryEarly, sub: 'Maaşının %25\'ine maaş gününü beklemeden eriş',
    keys: ['erken maaş', 'maaş', 'maaş avansı', 'avans', 'erken erişim', 'maaş kredisi', 'kredi', 'nakit'] },
  { hash: 'arac', name: 'Marketplace Taşıt', icon: I.car, sub: 'Aracını bul, kredini ve kaskonu tek akışta tamamla',
    keys: ['araç', 'araba', 'otomobil', 'taşıt', 'taşıt kredisi', 'araç kredisi', 'oto kredi', 'kasko', 'galeri', 'bayi', 'ikinci el', 'sıfır araç', 'marketplace', 'otokoç', 'allianz', 'kredi'] },
  { hash: 'konut', name: 'Marketplace Konut', icon: I.home, sub: 'Evini bul, konut kredini planla; ekspertiz ve tapuyu takip et',
    keys: ['konut', 'ev al', 'ev kredisi', 'satılık ev', 'satılık daire', 'daire', 'konut kredisi', 'mortgage', 'ipotek', 'ekspertiz', 'emlak', 'tapu', 'dask', 'takbis', 'tahsis', 'marketplace', 'kredi'] },
  { hash: 'isletme', name: 'Akıllı İşletme Finansmanı', icon: I.bars, sub: 'İşletmenin nakit akışını analiz et, sana özel finansman tekliflerini gör',
    keys: ['işletme', 'işletme finansmanı', 'işletme sermayesi', 'sermaye', 'ticari', 'ticari kredi', 'kobi', 'şirket', 'finansman', 'nakit akışı', 'nakit açığı', 'tedarikçi', 'yapay zeka', 'yapay zekâ', 'analiz', 'kredi'] },
];
// Turkish-aware and accent-insensitive: "Borç", "borc" and "BORÇ" match alike (keeps string length)
function searchNorm(s) {
  return s.toLocaleLowerCase('tr').replace(/[çğıöşü]/g, c => ({ ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u' })[c]);
}
function searchFeatureMatches(q) {
  const n = searchNorm(q.trim());
  return SEARCH_FEATURES.filter(f => [f.name, ...f.keys].some(k => { const kn = searchNorm(k); return kn.includes(n) || n.includes(kn); }));
}
function searchHighlight(name, query) {
  const q = query.trim(), i = searchNorm(name).indexOf(searchNorm(q));
  return i < 0 ? name : name.slice(0, i) + '<em>' + name.slice(i, i + q.length) + '</em>' + name.slice(i + q.length);
}
function FeatureResult(f, query) {
  return `
    <div class="result feature" data-action="route" data-hash="${f.hash}">
      <div class="result-ico">${f.icon}</div>
      <div>
        <div class="result-name">${query ? searchHighlight(f.name, query) : f.name}</div>
        <div><span class="new-tag">YENİ</span></div>
        <div class="result-sub">${f.sub}</div>
      </div>
      <span class="chev-r">${I.chevR}</span>
    </div>`;
}

function searchResultsFor(q) {
  const query = q.trim();
  if (!query) return SearchEmpty();
  const keys = ['yapı kredi alışveriş asistanı', 'asistan', 'alışveriş', 'yapay zeka', 'kampanya', 'world', 'robot', 'koçtaş', 'asistanı'];
  const match = keys.some(k => k.includes(query.toLowerCase()) || query.toLowerCase().includes(k) || k.startsWith(query.toLowerCase()));
  const features = searchFeatureMatches(query);
  if (match || features.length) {
    return `<div class="result-group-title">Arama Sonuçları</div>${features.map(f => FeatureResult(f, query)).join('')}${match ? AssistantResult(query) : ''}`;
  }
  return `<div class="search-empty"><p>"${query}" için sonuç bulunamadı.</p></div>`;
}

function ChatScreen() {
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="ai-avatar">${I.spark}</div>
      <div>
        <div class="nav-title">Alışveriş Asistanı</div>
        <div class="nav-sub ai" id="chat-status">Yapay zeka destekli</div>
      </div>
    </div>

    <div class="chat-scroll" id="chat-scroll"></div>

    <div class="chat-foot">
      <div class="chat-input">
        <textarea id="chat-text" rows="1" placeholder="Mesaj yaz..."></textarea>
        <button class="send-btn" id="send-btn" data-action="chat-send">${I.send}</button>
      </div>
      <div class="ai-disclaimer">Alışveriş Asistanı yapay zekadır, hata yapabilir. Fiyat ve stok bilgisini satıcıdan doğrula.</div>
    </div>
  </div>`;
}

/* Stok rozeti — az stokta kırmızı (aciliyet), stokta sakin yeşil */
function stockBadge(p) {
  if (/^Son/.test(p.stock)) return `<span class="tag stock low">${p.stock}</span>`;
  return `<span class="tag stock ok">${I.box} Stokta</span>`;
}
function ProductCardHTML(p) {
  return `
    <div class="pcard">
      <div class="pcard-img">
        ${imgOrFallback(p.img, p.emoji, 'p-photo')}
        <span class="tag world">World'e Özel</span>
        ${stockBadge(p)}
      </div>
      <div class="pcard-body">
        <div class="pcard-store"><img src="assets/koctas.png" alt="Koçtaş" class="koctas-logo"
          onerror="this.outerHTML='<span class=\\'koctas-text\\'>Koçtaş</span>'"></div>
        <div class="pcard-name">${p.name}</div>
        <div class="pcard-rating">★ ${p.rating} <span>(${p.reviews} değerlendirme)</span></div>
        <div class="pcard-old">${p.old}</div>
        <div class="pcard-price">${p.price}</div>
        <div class="pcard-meta">
          <span class="mtag inst">${I.card} ${p.inst}</span>
          <span class="mtag puan"><img src="assets/world.webp" class="puan-logo" alt="World"> ${p.puan}</span>
        </div>
        <div class="pcard-ship">
          <span class="ship-i">${I.truck} ${p.delivery}</span>
          <span class="ship-dot">·</span>
          <span class="ship-i free">${p.shipping}</span>
        </div>
        <button class="pcard-buy" data-action="buy" data-id="${p.id}">${I.card} World Pay ile Al</button>
      </div>
    </div>`;
}

/* Taksit seçenekleri — varsayılan: Tek Çekim */
function instOptions(p) {
  const total = parseInt(p.priceNum.replace('.', ''));
  return [
    { id: 'single', label: 'Tek Çekim', badge: '', right: p.price },
    { id: 't3', label: '3 Taksit', badge: '', right: `3 x ${Math.round(total / 3).toLocaleString('tr-TR')},00 TL` },
    { id: 't6', label: p.inst, badge: `World'e Özel`, note: 'Vade farkı yok', right: p.instSub },
  ];
}
function instLabel() {
  const p = state.selectedProduct;
  if (state.payMethod === 'bank' || state.installment === 'single') return 'Tek Çekim';
  if (state.installment === 't3') return '3 Taksit';
  return p.inst;
}
function InstBoxHTML(p) {
  return instOptions(p).map(o => `
    <div class="inst-opt ${state.installment === o.id ? 'active' : ''}" data-action="select-inst" data-inst="${o.id}">
      <span class="io-l"><span class="io-radio"></span><span class="io-text"><span class="io-name">${o.label}${o.badge ? `<span class="io-badge">${o.badge}</span>` : ''}</span>${o.note ? `<span class="io-note">${I.check} ${o.note}</span>` : ''}</span></span>
      <span class="io-r">${o.right}</span>
    </div>`).join('');
}

/* Teslimat adresi kartı — başlık + seçili adres + "faturamı aynı adrese" tiki */
function AddressCardHTML() {
  const a = getAddress();
  return `
  <div class="addr-card" id="addr-card">
    <div class="addr-head">
      <span class="addr-title">Teslimat Adresi</span>
      <button class="addr-edit" data-action="open-address">Değiştir ${I.chevR}</button>
    </div>
    <div class="addr-body" data-action="open-address">
      <div class="addr-pin">${I.pin}</div>
      <div class="addr-info">
        <div class="addr-name"><span class="addr-tag">${a.title}</span>${a.name}</div>
        <div class="addr-line">${a.line}</div>
        <div class="addr-city">${a.city} · ${a.phone}</div>
      </div>
    </div>
    <div class="addr-billing ${state.billingSame ? 'on' : ''}" data-action="toggle-billing">
      <span class="cbx">${I.check}</span>
      <span>Faturamı aynı adrese gönder</span>
    </div>
  </div>`;
}

/* Hesap bilgisi kutusu — Vadesiz TL'den ödeme (Worldpuan indirimini de yansıtır) */
function BankBoxHTML() {
  const pay = payableNum();
  const after = USER.balance - pay;
  return `
  <div class="bank-box" id="bank-box">
    <div class="ib-title">Hesap Bilgisi</div>
    <div class="bb-row"><span class="bb-l">Kullanılabilir Bakiye</span><span class="bb-r">${fmtTL(USER.balance)}</span></div>
    <div class="bb-row"><span class="bb-l">Ödeme Tutarı</span><span class="bb-r">- ${fmtTL(pay)}</span></div>
    <div class="bb-row total"><span class="bb-l">İşlem Sonrası Bakiye</span><span class="bb-r">${fmtTL(after)}</span></div>
    <div class="bb-note">${I.lock} Tutar hesabından tek çekimde, masrafsız tahsil edilir.</div>
  </div>`;
}

/* Worldpuan ile öde — sade form tiki (puanın TL karşılığını gösterir) */
function FinanceBoxHTML() {
  const tl = fmtTL(Math.round(USER.worldpuan * PUAN_VALUE));
  return `
  <label class="puan-row ${state.usePuan ? 'on' : ''}" id="fin-box" data-action="toggle-puan">
    <span class="cbx">${I.check}</span>
    <span class="puan-txt">Worldpuan'larımı kullan <b>(${tl} indirim)</b></span>
  </label>`;
}

/* Mesafeli ödeme yasal onayları — iki ayrı checkbox (ön bilgilendirme + sözleşme) */
function ContractBoxHTML() {
  return `
  <div class="contract-box">
    <label class="contract-row ${state.preInfoOk ? 'on' : ''}" data-action="toggle-contract" data-key="preInfoOk">
      <span class="cbx">${I.check}</span>
      <span class="contract-txt"><a data-action="open-preinfo">Ön Bilgilendirme Formu</a>'nu okudum, onaylıyorum.</span>
    </label>
    <label class="contract-row ${state.contractOk ? 'on' : ''}" data-action="toggle-contract" data-key="contractOk">
      <span class="cbx">${I.check}</span>
      <span class="contract-txt"><a data-action="open-contract">Mesafeli Satış Sözleşmesi</a>'ni okudum, onaylıyorum.</span>
    </label>
  </div>`;
}

/* Tahmini teslimat tarih aralığı (bugünden +min/+max gün) */
const AYLAR = ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'];
function deliveryRange(minD, maxD) {
  const a = new Date(); a.setDate(a.getDate() + minD);
  const b = new Date(); b.setDate(b.getDate() + maxD);
  return `${a.getDate()} ${AYLAR[a.getMonth()]} - ${b.getDate()} ${AYLAR[b.getMonth()]}`;
}
function DeliveryStripHTML(p) {
  const range = p.delivery === 'Yarın kargoda' ? deliveryRange(1, 2) : deliveryRange(2, 4);
  return `
  <div class="del-line">
    <span class="del-i">${I.truck}</span>
    <span>Tahmini teslimat <b>${range}</b> · ${p.shipping} · YK Kargo</span>
  </div>`;
}

function PaymentScreen() {
  const p = state.selectedProduct;
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="wp-brand"><img src="assets/worldpay.png" alt="World Pay" class="wp-img wp-light"><img src="assets/worldpay-dark.png" alt="World Pay" class="wp-img wp-dark"></div>
    </div>

    <div class="screen-scroll">
      <div class="pay-summary">
        <div class="thumb">${imgOrFallback(p.img, p.emoji, 'ps-photo')}</div>
        <div>
          <div class="ps-name">${p.name}</div>
          <div class="ps-store">${p.store} · World üye iş yeri</div>
        </div>
        <div class="ps-price">${p.price}</div>
      </div>

      ${AddressCardHTML()}

      ${DeliveryStripHTML(p)}

      <div class="pay-section-title">Ödeme Yöntemi</div>

      <div class="method" data-action="select-method" data-method="worldcard">
        <div class="m-ico card-ico">${imgOrFallback(WORLDCARD_IMG, '💳', 'm-cardimg')}</div>
        <div><div class="m-name">Worldcard ile öde</div><div class="m-sub">**** 3333 · ${p.inst} imkanı · Worldpuan kazan</div></div>
        <div class="m-check">${I.check}</div>
      </div>

      <div class="method" data-action="select-method" data-method="bank">
        <div class="m-ico tl-ico"><img src="assets/tl-white.png" class="tl-img" alt="₺" onerror="this.outerHTML='<span class=\\'tl-glyph\\'>₺</span>'"></div>
        <div><div class="m-name">Vadesiz TL Hesabım'dan öde</div><div class="m-sub">Banka kartı · 12345678 · Tek çekim</div></div>
        <div class="m-check">${I.check}</div>
      </div>

      <div class="inst-box" id="inst-box">
        <div class="ib-title">Taksit Seçeneği</div>
        <div class="ib-note">Sana en uygun taksit seçeneğini seç</div>
        ${InstBoxHTML(p)}
      </div>

      ${BankBoxHTML()}

      ${FinanceBoxHTML()}

      ${ContractBoxHTML()}
    </div>

    <div class="pay-foot">
      <button class="pay-btn" id="pay-btn" data-action="pay" disabled>
        <span>Öde</span><span class="div"></span><span id="pay-amt">${payableStr()}</span>
      </button>
      <div class="secure-note">${I.lock} 256-bit güvenli ödeme</div>
    </div>
  </div>`;
}

/* Sipariş kaydı — yoksa (örn. derin bağlantı) anlık üretilir */
function getOrder() {
  if (!state.lastOrder) {
    state.lastOrder = {
      no: 'YKM' + String(Math.floor(100000000 + Math.random() * 900000000)),
      date: new Date(), productId: state.selectedProduct && state.selectedProduct.id,
      addressId: state.addressId, payable: payableStr(),
      bank: state.payMethod === 'bank', inst: instLabel(),
      cargo: 'YK Kargo', track: 'YK' + String(Math.floor(100000000000 + Math.random() * 899999999999)),
    };
  }
  return state.lastOrder;
}
function orderDateStr(d) {
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()} · ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

function SuccessScreen() {
  const p = state.selectedProduct;
  const bank = state.payMethod === 'bank';
  const order = getOrder();
  const dateStr = orderDateStr(order.date);
  const txnNo = order.no;
  const totalPuan = USER.worldpuan - (state.usePuan ? USER.worldpuan : 0) + earnedPuan();
  return `
  <div class="screen anim-fade">
    <div class="screen-scroll">
      <div class="success">
        <div class="success-check"><div class="ring">${I.checkBig}</div></div>
        <h2>Ödemeniz Başarıyla Gerçekleşti</h2>
        <div class="succ-date">${dateStr}</div>
        <div class="amt">${payableStr()}</div>
        <div class="prod">${p.name}</div>

        <div class="puan-card">
          <div class="pc-logo"><img src="assets/world.webp" alt="World" onerror="this.outerHTML='🎉'"></div>
          <div>
            <div class="pc-val">+${earnedPuan()} Worldpuan</div>
            <div class="pc-lbl">hesabına eklendi · Toplam: ${totalPuan.toLocaleString('tr-TR')} Worldpuan</div>
          </div>
        </div>

        ${order.ruAdd ? `
        <div class="puan-card ru-succ" data-action="ru-open">
          <div class="pc-logo ru-logo">${ruLogo(26)}</div>
          <div style="flex:1">
            <div class="pc-val">+${fmtTL2(order.ruAdd)}</div>
            <div class="pc-lbl">Yuvarla Biriktir kumbarana eklendi</div>
          </div>
          <span class="chev-r">${I.chevR}</span>
        </div>` : ''}

        <div class="receipt">
          <div class="r-row"><span class="r-l">İşlem No</span><span class="r-r">${txnNo}</span></div>
          <div class="r-row"><span class="r-l">İş Yeri</span><span class="r-r">${p.store} · World Pay</span></div>
          <div class="r-row"><span class="r-l">Ödeme Yöntemi</span><span class="r-r">${bank ? 'Vadesiz TL Hesabım · 12345678' : 'Worldcard **** 3333'}</span></div>
          <div class="r-row"><span class="r-l">Taksit</span><span class="r-r">${instLabel()}</span></div>
          <div class="r-row"><span class="r-l">Teslimat Adresi</span><span class="r-r">${getAddress().title} · ${getAddress().city}</span></div>
          ${state.usePuan ? `<div class="r-row"><span class="r-l">Worldpuan İndirimi</span><span class="r-r">- ${fmtTL(puanDiscount())}</span></div>` : ''}
          <div class="r-row"><span class="r-l">Tutar</span><span class="r-r">${payableStr()}</span></div>
        </div>

        <div class="success-actions">
          <button class="btn-primary" data-action="go-tracking">${I.box} Siparişimi Takip Et</button>
          <button class="btn-outline" data-action="go-home">Ana Sayfaya Dön</button>
        </div>
      </div>
    </div>
  </div>`;
}

/* Sipariş takibi — durum çizgisi (stepper) + kargo + fatura/iade aksiyonları */
function TrackingScreen() {
  const order = getOrder();
  const p = PRODUCTS.find(x => x.id === order.productId) || state.selectedProduct || PRODUCTS[0];
  const a = ADDRESSES.find(x => x.id === order.addressId) || getAddress();
  const range = p.delivery === 'Yarın kargoda' ? deliveryRange(1, 2) : deliveryRange(2, 4);
  // 4 adımlı durum: 2. adım (Hazırlanıyor) aktif
  const steps = [
    { t: 'Sipariş Alındı', s: 'done', d: orderDateStr(order.date) },
    { t: 'Hazırlanıyor', s: 'active', d: `${p.store} siparişini paketliyor` },
    { t: 'Kargoya Verildi', s: 'todo', d: order.cargo },
    { t: 'Teslim Edildi', s: 'todo', d: `Tahmini ${range}` },
  ];
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Sipariş Takibi</div>
    </div>
    <div class="screen-scroll">
      <div class="trk-head">
        <div class="trk-thumb">${imgOrFallback(p.img, p.emoji, 'ps-photo')}</div>
        <div>
          <div class="trk-name">${p.name}</div>
          <div class="trk-meta">Sipariş No: ${order.no}</div>
          <div class="trk-meta">${orderDateStr(order.date)}</div>
        </div>
      </div>

      <div class="trk-eta">
        <div class="del-ico">${I.truck}</div>
        <div><div class="del-main">Tahmini teslimat: <b>${range}</b></div>
        <div class="del-sub">${p.shipping} · ${order.bank ? 'Vadesiz TL Hesabı' : 'Worldcard'} ile ödendi</div></div>
      </div>

      <div class="cargo-row">
        <div class="cargo-logo"><img src="assets/yk-kargo.png" alt="YK Kargo" onerror="this.parentElement.textContent='YK Kargo'"></div>
        <div class="cargo-info">
          <div class="cargo-name">${order.cargo}</div>
          <div class="cargo-track">Takip No: ${order.track}</div>
        </div>
        <button class="cargo-btn" data-action="toast" data-msg="Kargo takibi prototipte aktif değil">Takip Et</button>
      </div>

      <div class="pay-section-title">Sipariş Durumu</div>
      <div class="stepper">
        ${steps.map((st, i) => `
          <div class="step ${st.s}">
            <div class="step-dot">${st.s === 'done' ? I.check : ''}</div>
            ${i < steps.length - 1 ? '<div class="step-line"></div>' : ''}
            <div class="step-body"><div class="step-t">${st.t}</div><div class="step-d">${st.d}</div></div>
          </div>`).join('')}
      </div>

      <div class="addr-card" style="margin-top:6px">
        <div class="addr-head"><span class="addr-title">Teslimat Adresi</span></div>
        <div class="addr-body" style="cursor:default">
          <div class="addr-pin">${I.pin}</div>
          <div class="addr-info">
            <div class="addr-name"><span class="addr-tag">${a.title}</span>${a.name}</div>
            <div class="addr-line">${a.line}</div>
            <div class="addr-city">${a.city} · ${a.phone}</div>
          </div>
        </div>
      </div>

      <div class="trk-actions">
        <button class="trk-btn" data-action="open-invoice">${I.receipt} Faturayı Görüntüle</button>
        <button class="trk-btn" data-action="open-return">${I.undo} İade / Cayma Talebi</button>
        <button class="trk-btn" data-action="toast" data-msg="Tekrar sipariş prototipte aktif değil">${I.refresh} Tekrar Sipariş Ver</button>
      </div>
    </div>
  </div>`;
}

/* Fatura görüntüleme sheet'i */
function openInvoiceSheet() {
  const order = getOrder();
  const p = PRODUCTS.find(x => x.id === order.productId) || PRODUCTS[0];
  const a = ADDRESSES.find(x => x.id === order.addressId) || getAddress();
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>e-Fatura</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="legal-scroll">
      <h4>${p.store} · World Pay</h4>
      <p>Fatura No: ${order.no.replace('YKM','FT')}<br>Tarih: ${orderDateStr(order.date)}</p>
      <h4>Alıcı</h4>
      <p>${a.name}<br>${a.line}, ${a.city}</p>
      <h4>Ürün</h4>
      <p>${p.name}<br>Ödeme: ${order.bank ? 'Vadesiz TL Hesabı · Tek Çekim' : 'Worldcard · ' + order.inst}</p>
      <div class="inv-total"><span>Genel Toplam (KDV dahil)</span><b>${order.payable}</b></div>
      <p style="margin-top:12px">Bu belge prototip amaçlı örnek bir e-faturadır.</p>
    </div>
    <button class="sheet-btn ghost" data-action="toast" data-msg="Fatura PDF indirme prototipte aktif değil">PDF Olarak İndir</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}

/* İade / cayma talebi sheet'i (14 günlük cayma hakkı) */
function openReturnSheet() {
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>İade / Cayma Talebi</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="sheet-ico" style="background:rgba(226,0,26,.12);color:var(--world)">${I.undo}</div>
    <p>Mesafeli Satış Sözleşmesi kapsamında, ürünü teslim aldıktan sonra <b>14 gün</b> içinde gerekçe göstermeden cayma hakkını kullanabilirsin. Talebin oluşturulduğunda kargo kodu tarafına iletilir, iade onayında ödemen aynı yönteme iade edilir.</p>
    <button class="sheet-btn" data-action="confirm-return">${I.undo} Cayma Talebi Oluştur</button>
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function confirmReturn() {
  closeSheet();
  toast('Cayma talebin alındı, e-posta ile bilgilendirileceksin 💙');
}

/* Bölümler hub'ı — tüm ekranlara tek dokunuşla atlama (demo için) */
function SectionsScreen() {
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Bölümler</div>
    </div>
    <div class="screen-scroll">
      <div class="sec-intro">Full prototip akışı aynen çalışır. Buradan herhangi bir bölümü tek dokunuşla, baştan akış yapmadan açabilirsin. Linkler paylaşılabilir — tarayıcı adresindeki <b>#etiketi</b> ile (ör. <b>#tracking</b>).</div>
      ${SECTIONS.map(s => `
        <a class="sec-card" href="#${s.hash}" data-action="route" data-hash="${s.hash}">
          <span class="sec-ico">${I[s.icon]}</span>
          <span class="sec-txt"><span class="sec-t">${s.t}</span><span class="sec-d">${s.d}</span></span>
          <span class="sec-hash">#${s.hash}</span>
          <span class="sec-chev">${I.chevR}</span>
        </a>`).join('')}
    </div>
  </div>`;
}

function SettingsScreen() {
  const dark = state.theme === 'dark';
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Ayarlarım</div>
    </div>
    <div class="screen-scroll">
      <div class="set-group-title">Görünüm</div>
      <div class="set-row">
        <span class="s-ico">${dark ? I.moon : I.sun}</span>
        <div><div class="s-name">Tema</div><div class="s-sub">Uygulama görünümünü seç</div></div>
        <div class="right theme-seg">
          <button class="${dark ? 'active' : ''}" data-action="set-theme" data-theme="dark">${I.moon} Koyu</button>
          <button class="${!dark ? 'active' : ''}" data-action="set-theme" data-theme="light">${I.sun} Açık</button>
        </div>
      </div>

      <div class="set-group-title">Bildirimler</div>
      <div class="set-row">
        <span class="s-ico">${I.bell}</span>
        <div><div class="s-name">Kampanya bildirimleri</div><div class="s-sub">World fırsatlarından haberdar ol</div></div>
        <div class="right switch on" data-action="toggle-switch"></div>
      </div>
      <div class="set-row">
        <span class="s-ico">${I.spark}</span>
        <div><div class="s-name">Asistan önerileri</div><div class="s-sub">Alışveriş asistanı önerileri göster</div></div>
        <div class="right switch on" data-action="toggle-switch"></div>
      </div>

      <div class="set-group-title">Güvenlik</div>
      <div class="set-row">
        <span class="s-ico">${I.faceid}</span>
        <div><div class="s-name">Face ID ile giriş</div><div class="s-sub">Giriş ve onaylarda Face ID kullan</div></div>
        <div class="right switch on" data-action="toggle-switch"></div>
      </div>
    </div>
  </div>`;
}

/* ===================================================================
   YUVARLA BİRİKTİR — ekranlar
   =================================================================== */

// Başvur — tek ekran: tanıtım + 1.Kart 2.Kural (10/50/100) 3.Birikim hesabı + talimat onayı + Aktifleştir
function RoundupApply() {
  const r = state.roundup;
  const c = ruCard();
  const a = ruAccount();
  const ready = r.source && r.account && r.agreed;
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Yuvarla Biriktir'e Başvur</div>
      <button class="icon-btn" data-action="toast" data-msg="Bilgilendirme prototipte aktif değil">${I.info}</button>
    </div>
    <div class="screen-scroll ru-form">
      <div class="ru-hero">
        <div class="ru-hero-logo ru-logo">${ruLogo(58)}</div>
        <h1 class="ru-hero-title">Yuvarla Biriktir ile<br>her harcamada biriktir.</h1>
        <p class="ru-hero-sub">Seçtiğin kartla yaptığın harcamalar bir sonraki ${RU_UNIT} TL'ye tamamlanır. Aradaki fark birikim hesabına aktarılır.</p>
      </div>

      <div class="ru-sec">
        <div class="ru-sec-h"><span class="ru-sec-n">1</span> Kart Seçimi</div>
        <div class="ru-select-field ${c ? 'filled' : 'empty'}" data-action="ru-open-cardpick">
          ${c
            ? `${ruCardArt(c)}<div class="ru-sf-mid"><div class="ru-sf-name">${c.name}</div><div class="ru-sf-sub">${c.num}</div></div><span class="ru-sf-tick">${I.check}</span>`
            : `<span class="ru-sf-ico">${I.card}</span><span class="ru-sf-label">Banka veya kredi kartı seçiniz</span>`}
          <span class="ru-sf-chev">${I.chevR}</span>
        </div>
      </div>

      <div class="ru-sec">
        <div class="ru-sec-h"><span class="ru-sec-n">2</span> Yuvarlama Kuralı</div>
        ${ruRuleBoxHTML()}
      </div>

      <div class="ru-sec">
        <div class="ru-sec-h"><span class="ru-sec-n">3</span> Birikim Hesabı Seç</div>
        <div class="ru-select-field ${a ? 'filled' : 'empty'}" data-action="ru-open-acctpick">
          ${a
            ? `<span class="ru-sf-ico">${I.bank}</span><div class="ru-sf-mid"><div class="ru-sf-name">${a.name}</div><div class="ru-sf-sub">${a.iban} · ${a.detail}</div></div><span class="ru-sf-tick">${I.check}</span>`
            : `<span class="ru-sf-ico">${I.bank}</span><span class="ru-sf-label">Birikim hesabı seçiniz</span>`}
          <span class="ru-sf-chev">${I.chevR}</span>
        </div>
        <div class="ru-lock-note">${I.lock} Birikimlerin seçtiğin hesapta güvenle birikir.</div>
      </div>

      <div class="ru-sec">
        <label class="contract-row ru-agree ${r.agreed ? 'on' : ''}" data-action="ru-agree">
          <span class="cbx">${I.check}</span>
          <span class="contract-txt"><a data-action="ru-open-form">Yuvarla Biriktir Talimat Formu</a>'nu okudum, onaylıyorum.</span>
        </label>
      </div>
    </div>
    <div class="screen-cta">
      <button class="btn-primary ${ready ? '' : 'disabled'}" id="ru-activate-btn" data-action="ru-activate">Aktifleştir</button>
      <div class="ru-ssl">${I.lock} Bilgilerin 256 bit SSL ile korunmaktadır.</div>
    </div>
  </div>`;
}

// Kural bölümü — sabit 100 TL kuralı, örnekler ve aylık tahmin tek kartta bütünleşik
function ruRuleBoxHTML() {
  return `
    <div class="ru-rule-card">
      <div class="ru-rule-head">
        <span class="ru-rule-badge">${RU_UNIT}${I.arrowUp}</span>
        <div class="ru-rule-mid"><div class="ru-rule-t">Sonraki ${RU_UNIT} TL'ye yuvarla</div><div class="ru-rule-s">Her uygun harcamada otomatik uygulanır.</div></div>
      </div>
      <div class="ru-rule-ex">
        ${RU_SAMPLES.map(s => {
          const to = ruNextUnit(s, RU_UNIT);
          return `<div class="ru-how-row"><span>${s} TL harcama</span><span class="ru-how-arw">→ ${to} TL'ye tamamlanır</span><b>+${to - s} TL</b></div>`;
        }).join('')}
      </div>
      <div class="ru-est">${I.trendUp} Bu kuralla ayda yaklaşık <b>${RU_EST}</b> biriktirebilirsin.</div>
    </div>
    <div class="ru-rule-note">${I.info} Nakit çekimler, kredi kartı ödemeleri ve bazı işlemler hariçtir. <b>Detaylar</b></div>`;
}

// Yönet — kumbara + aylık grafik + hedef + ayar özeti + hareketler + duraklat/durdur
function RoundupJar() {
  const r = state.roundup;
  const c = ruCard();
  const a = ruAccount();
  return `
  <div class="screen anim-right">
    <div class="nav-head ru-nav-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Yuvarla Biriktir</div>
      <button class="icon-btn" data-action="toast" data-msg="Bilgilendirme prototipte aktif değil">${I.info}</button>
    </div>
    <div class="screen-scroll">
      <div class="ru-statcard">
        <div class="ru-jar-label">Toplam Biriken</div>
        <div class="ru-jar-amt" id="ru-jar-amt" data-val="${r.jar}">${fmtTL2(r.jar)}</div>
        <div class="ru-statrow">
          <div class="ru-stat"><div class="ru-stat-l">Bu ay biriken</div><div class="ru-stat-v">+${fmtTL2(ruMonthTotal())}</div></div>
          <div class="ru-stat mid"><div class="ru-stat-l">Bu ay işlem</div><div class="ru-stat-v">${ruMonthTxns().length}</div></div>
          <div class="ru-stat"><div class="ru-stat-l">Geçen aya göre</div><div class="ru-stat-v up">${I.trendUp} %${r.monthChange}</div></div>
        </div>
      </div>

      <div class="ru-block">
        <div class="ru-block-h">Aylık birikim</div>
        ${ruChartHTML()}
      </div>

      ${ruGoalCard()}

      <div class="ru-info-card">
        <div class="ru-info-row"><span class="ru-info-ico">${I.target}</span><span class="ru-info-k">Kural</span><span class="ru-info-v">Sonraki ${RU_UNIT} TL'ye yuvarlanır</span></div>
        <div class="ru-info-row tap" data-action="ru-open-cardpick"><span class="ru-info-ico">${I.card}</span><span class="ru-info-k">Kart</span><span class="ru-info-v">${c ? c.name + '<br><i>' + c.num + '</i>' : 'Seçilmedi'}</span>${I.chevR}</div>
        <div class="ru-info-row tap" data-action="ru-open-acctpick"><span class="ru-info-ico">${I.bank}</span><span class="ru-info-k">Birikim hesabı</span><span class="ru-info-v">${a ? a.name + '<br><i>' + a.iban + '</i>' : 'Seçilmedi'}</span>${I.chevR}</div>
      </div>

      <div class="ru-txn-title">Son birikimler</div>
      <div class="ru-txns">${ruTxnRows()}</div>
      <div class="ru-seeall" data-action="ru-history">Tüm hareketleri gör ${I.chevR}</div>
    </div>
    <div class="screen-cta">
      <button class="btn-ghost-danger" data-action="ru-stop">Yuvarla Biriktir'i durdur</button>
    </div>
  </div>`;
}

// 6 aylık çubuk grafik — son 5 ay sabit veri, içinde bulunulan ay canlı (state'ten)
function ruChartHTML() {
  const months = [...RU_MONTHS, { m: 'May', v: ruMonthTotal(), cur: true }];
  const max = Math.max(...months.map(x => x.v), 1);
  return `
    <div class="ru-chart">
      ${months.map(x => `
        <div class="ru-bar-col">
          <div class="ru-bar-v">${Math.round(x.v)}</div>
          <div class="ru-bar-track"><div class="ru-bar ${x.cur ? 'cur' : ''}" style="height:${Math.max(9, Math.round(x.v / max * 100))}%"></div></div>
          <div class="ru-bar-m ${x.cur ? 'cur' : ''}">${x.m}</div>
        </div>`).join('')}
    </div>`;
}

// Hedef kartı — hedef yoksa çağrı, varsa ilerleme çubuğu
function ruGoalCard() {
  const r = state.roundup;
  const g = r.goal;
  if (!g) return `
    <div class="ru-goal-card empty" data-action="ru-open-goal">
      <span class="ru-goal-emoji">🎯</span>
      <div class="ru-goal-mid"><div class="ru-goal-t">Bir hedef belirle</div><div class="ru-goal-s">Hedefi olan birikim daha hızlı büyür.</div></div>
      <span class="ru-home-cta">Belirle ${I.chevR}</span>
    </div>`;
  const pct = Math.min(100, Math.round(r.jar / g.amount * 100));
  return `
    <div class="ru-goal-card" data-action="ru-open-goal">
      <span class="ru-goal-emoji">${g.emoji}</span>
      <div class="ru-goal-mid">
        <div class="ru-goal-row"><span class="ru-goal-t">${g.name}</span><b>%${pct}</b></div>
        <div class="ru-goal-track"><div class="ru-goal-fill" style="width:${pct}%"></div></div>
        <div class="ru-goal-s">${fmtTL2(r.jar)} / ${fmtTL(g.amount)}</div>
      </div>
      <span class="ru-txn-chev">${I.chevR}</span>
    </div>`;
}

// Tek hareket satırı — iki ekranda da (özet + geçmiş) aynı görünüm
function ruTxnRow(t) {
  const idx = state.roundup.txns.indexOf(t);
  return `
    <div class="ru-txn" data-action="ru-txn" data-idx="${idx}">
      <span class="ru-txn-ico">${t.emoji}</span>
      <div class="ru-txn-mid"><div class="ru-txn-m">${t.merchant}</div><div class="ru-txn-s">${fmtTL2(t.spent).replace(',00', '')} → ${fmtTL2(t.spent + t.add).replace(',00', '')}</div><div class="ru-txn-d">${t.date}</div></div>
      <span class="ru-txn-add">+${fmtTL2(t.add).replace(',00', '')}</span>
      <span class="ru-txn-chev">${I.chevR}</span>
    </div>`;
}

// Son birikim satırları (yönet ekranında ilk 3)
function ruTxnRows() {
  const r = state.roundup;
  if (!r.txns.length) return `<div class="ru-txn-empty">Henüz birikim yok. Kartını kullandıkça buraya düşecek.</div>`;
  return r.txns.slice(0, 3).map(ruTxnRow).join('');
}

// Tüm hareketler — aya göre gruplu, ay toplamı başlıkta
function RoundupHistory() {
  const r = state.roundup;
  const groups = [];
  r.txns.forEach(t => {
    let g = groups.find(x => x.m === t.month);
    if (!g) { g = { m: t.month, items: [], total: 0 }; groups.push(g); }
    g.items.push(t);
    g.total += t.add;
  });
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Birikim Hareketleri</div>
      <span class="icon-btn" style="visibility:hidden">${I.info}</span>
    </div>
    <div class="screen-scroll">
      ${groups.map(g => `
        <div class="ru-month-h"><span>${g.m}</span><b>+${fmtTL2(g.total)}</b></div>
        <div class="ru-txns">${g.items.map(ruTxnRow).join('')}</div>`).join('')}
      <div class="ru-hist-note">${I.info} Daha eski hareketler prototipte gösterilmiyor.</div>
    </div>
  </div>`;
}

/* ---- Yuvarla Biriktir akış mantığı ---- */
// Kumbarayı örnek geçmişle doldur (aktif değilse) — deeplink ve onay ortak kullanır
function ruSeedJar() {
  const r = state.roundup;
  r.active = true;
  if (!r.source) r.source = 'worldgold';
  if (!r.account) r.account = 'sav';
  if (!r.txns.length) r.txns = RU_SEED_TXNS.map(t => ({ ...t }));
}
// Talimat formu onayı — checkbox'ı ve Aktifleştir butonunu yerinde güncelle
function ruToggleAgree(el) {
  const r = state.roundup;
  r.agreed = !r.agreed;
  el.classList.toggle('on', r.agreed);
  const btn = document.getElementById('ru-activate-btn');
  if (btn) btn.classList.toggle('disabled', !(r.source && r.account && r.agreed));
}
// Talimat Formu — örnek yasal metin sheet'i
function ruOpenForm() {
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="ru-pick-t">Yuvarla Biriktir Talimat Formu</div>
    <div class="legal-scroll">
      <h4>1. Talimatın Kapsamı</h4>
      <p>Bu talimat ile seçtiğiniz kartla yapılan uygun harcama tutarları bir sonraki <b>${RU_UNIT} TL</b>'ye tamamlanır ve aradaki fark seçtiğiniz birikim hesabına aktarılır.</p>
      <h4>2. Kapsam Dışı İşlemler</h4>
      <p>Nakit çekim, kredi kartı borç ödemesi, para transferi, düzenli ödeme talimatları ve iade işlemlerinde yuvarlama uygulanmaz.</p>
      <h4>3. Durdurma ve Değişiklik</h4>
      <p>Talimatınızı dilediğiniz an durdurabilir veya kart/hesap bilgilerini güncelleyebilirsiniz. Biriken tutar hesabınızda kalır.</p>
      <p><b>Bu metin prototip amaçlı örnek bir sözleşme özetidir.</b></p>
    </div>
    <button class="sheet-btn" data-action="close-sheet">Okudum</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
// Aktifleştir → eksikleri söyle ya da onay sheet'ini aç
function ruActivate() {
  const r = state.roundup;
  if (!r.source) return toast('Önce bir kart seçmelisin');
  if (!r.account) return toast('Birikim hesabı seçmelisin');
  if (!r.agreed) return toast('Talimat Formu onayı gerekli');
  const c = ruCard(), a = ruAccount();
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="ru-pick-t">Talimatı Onayla</div>
    <div class="ru-cf-rows">
      <div class="ru-cf-row"><span>Kart</span><b>${c.name} ${c.num.slice(-4)}</b></div>
      <div class="ru-cf-row"><span>Kural</span><b>Sonraki ${RU_UNIT} TL'ye yuvarla</b></div>
      <div class="ru-cf-row"><span>Birikim hesabı</span><b>${a.name}</b></div>
      <div class="ru-cf-row"><span>Tahmini aylık birikim</span><b class="est">${RU_EST}</b></div>
    </div>
    <button class="sheet-btn" id="ru-confirm-btn" data-action="ru-confirm">${I.shield} Onayla ve Aktifleştir</button>
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
// Onay → kısa "talimat oluşturuluyor" bekleme → başarı durumu (aynı sheet içinde)
function ruConfirm() {
  const btn = document.getElementById('ru-confirm-btn');
  btn.innerHTML = `<span class="spinner"></span> Talimat oluşturuluyor…`;
  btn.style.pointerEvents = 'none';
  setTimeout(() => {
    ruSeedJar();
    sheetEl.innerHTML = `
      <div class="sheet-handle"></div>
      <div class="ru-done">
        <div class="ru-done-ring">${I.checkBig}</div>
        <div class="ru-done-t">Yuvarla Biriktir aktif! 🎉</div>
        <div class="ru-done-s">Artık ${ruCard().name} ile yaptığın her uygun harcamada aradaki fark otomatik birikecek.</div>
      </div>
      <button class="sheet-btn" data-action="ru-open-jar">Kumbaramı Gör</button>`;
  }, 1400);
}
// Kart seç alanına dokununca → kart listesi sheet'i (gerçek kart görselleriyle)
function ruOpenCardPick() {
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="ru-pick-t">Banka veya kredi kartı seçiniz</div>
    ${RU_CARDS.map(c => {
      const on = state.roundup.source === c.id;
      return `<div class="ru-pick-row ${on ? 'active' : ''}" data-action="ru-pick-card" data-val="${c.id}">
        ${ruCardArt(c)}
        <div class="ru-pick-mid"><div class="ru-pick-n">${c.name}</div><div class="ru-pick-s">${c.num} · ${c.kind}</div><div class="ru-pick-s2">${c.detail}</div></div>
        <span class="ru-pick-radio ${on ? 'on' : ''}">${on ? I.check : ''}</span>
      </div>`;
    }).join('')}
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function ruPickCard(id) { state.roundup.source = id; closeSheet(); render(); }
// Birikim hesabı seç alanına dokununca → hesap listesi sheet'i
function ruOpenAcctPick() {
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="ru-pick-t">Birikim hesabı seçiniz</div>
    ${RU_ACCOUNTS.map(a => {
      const on = state.roundup.account === a.id;
      return `<div class="ru-pick-row ${on ? 'active' : ''}" data-action="ru-pick-acct" data-val="${a.id}">
        <span class="ru-pick-ico">${I.bank}</span>
        <div class="ru-pick-mid"><div class="ru-pick-n">${a.name}</div><div class="ru-pick-s">${a.iban} · ${a.detail}</div></div>
        <span class="ru-pick-radio ${on ? 'on' : ''}">${on ? I.check : ''}</span>
      </div>`;
    }).join('')}
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function ruPickAcct(id) { state.roundup.account = id; closeSheet(); render(); }
// Hedef seç sheet'i — hazır hedefler + kaldırma
function ruOpenGoalPick() {
  const g = state.roundup.goal;
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="ru-pick-t">Birikim hedefini seç</div>
    ${RU_GOAL_PRESETS.map(p => {
      const on = g && g.id === p.id;
      return `<div class="ru-pick-row ${on ? 'active' : ''}" data-action="ru-pick-goal" data-val="${p.id}">
        <span class="ru-txn-ico">${p.emoji}</span>
        <div class="ru-pick-mid"><div class="ru-pick-n">${p.name}</div><div class="ru-pick-s">Hedef: ${fmtTL(p.amount)}</div></div>
        <span class="ru-pick-radio ${on ? 'on' : ''}">${on ? I.check : ''}</span>
      </div>`;
    }).join('')}
    ${g ? `<button class="sheet-btn ghost danger-txt" data-action="ru-clear-goal">Hedefi kaldır</button>` : ''}
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function ruPickGoal(id) {
  state.roundup.goal = { ...RU_GOAL_PRESETS.find(p => p.id === id) };
  closeSheet();
  render();
  setTimeout(() => toast('Hedefin belirlendi 🎯'), 150);
}
function ruClearGoal() {
  state.roundup.goal = null;
  closeSheet();
  render();
  setTimeout(() => toast('Hedef kaldırıldı'), 150);
}
// Hareket detayı sheet'i
function ruOpenTxn(i) {
  const t = state.roundup.txns[i];
  if (!t) return;
  const c = ruCard();
  const a = ruAccount();
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="ru-td-head">
      <span class="ru-txn-ico big">${t.emoji}</span>
      <div class="ru-td-m">${t.merchant}</div>
      <div class="ru-td-d">${t.date}</div>
    </div>
    <div class="ru-cf-rows">
      <div class="ru-cf-row"><span>Harcama</span><b>${fmtTL2(t.spent)}</b></div>
      <div class="ru-cf-row"><span>Yuvarlandı</span><b>${fmtTL2(t.spent + t.add)}</b></div>
      <div class="ru-cf-row"><span>Birikime eklenen</span><b class="est">+${fmtTL2(t.add)}</b></div>
      ${c ? `<div class="ru-cf-row"><span>Kart</span><b>${c.name} ${c.num.slice(-4)}</b></div>` : ''}
      ${a ? `<div class="ru-cf-row"><span>Birikim hesabı</span><b>${a.name}</b></div>` : ''}
    </div>
    <button class="sheet-btn ghost" data-action="close-sheet">Kapat</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
// Durdur — geri alınamaz aksiyon: önce onay sheet'i
function ruStop() {
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="ru-pick-t">Yuvarla Biriktir'i durdur</div>
    <p class="ru-stop-txt">Talimatın iptal edilir ve yeni harcamalarda birikim yapılmaz. Biriken <b>${fmtTL2(state.roundup.jar)}</b> hesabında kalır.</p>
    <button class="sheet-btn" data-action="ru-stop-confirm">Durdur</button>
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function ruStopConfirm() {
  const r = state.roundup;
  r.active = false;
  r.agreed = false;
  closeSheet();
  goHome();
  setTimeout(() => toast('Yuvarla Biriktir durduruldu. Biriken paran hesabında kalır.'), 300);
}
// Kumbara toplamı sayaç animasyonu — yönet ekranı her açılışta kısa bir count-up oynatır
function setupJar() {
  const el = document.getElementById('ru-jar-amt');
  if (!el) return;
  const target = parseFloat(el.dataset.val);
  const from = target * 0.55;
  const dur = 650;
  const t0 = performance.now();
  const tick = (now) => {
    const p = Math.min(1, (now - t0) / dur);
    const e = 1 - Math.pow(1 - p, 3); // ease-out
    el.textContent = fmtTL2(from + (target - from) * e);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ===================================================================
   HARCADIKÇA BİRİKTİR  (ekstre endeksli otomatik birikim)
   Kredi kartına tanımlanan kural: her hesap kesim döneminde ekstre
   tutarının belirlenen %'si (tavan varsa aşılmadan) birikim hesabına
   aktarılır ve günlük faizle değerlenir. Yuvarla Biriktir'in kardeşi.
   =================================================================== */
// Özelliğin logosu — yükselen çubuklar + ₺ jeton (Yuvarla Biriktir logosuyla aynı aile, farklı motif)
function suLogo(size) {
  return `<svg class="ru-logo-svg" width="${size}" height="${size}" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <rect x="8"  y="28" width="6.5" height="12" rx="2" fill="currentColor" opacity="0.55"/>
    <rect x="18" y="22" width="6.5" height="18" rx="2" fill="currentColor" opacity="0.78"/>
    <rect x="28" y="15" width="6.5" height="25" rx="2" fill="currentColor"/>
    <circle cx="36" cy="12" r="8.4" fill="currentColor"/>
    <text x="36" y="16.2" text-anchor="middle" font-size="11.5" font-weight="800" fill="#fff" font-family="Ubuntu, system-ui, sans-serif">₺</text>
  </svg>`;
}
const SU_STATEMENT = 8620;                       // bu dönemki tahmini ekstre tutarı (canlı örnek/beklenen için)
const SU_RATE_PRESETS = [1, 5, 10, 20];          // ekstre oranı çipleri (sabit)
const SU_CUR_MONTH = 'Mayıs 2026';               // içinde bulunulan dönem (RU ile hizalı)
const SU_NEXT_DATE = '10 Haziran';               // sıradaki aktarım (son ödeme) tarihi
function suCard() { return RU_CARDS.find(c => c.id === state.spendup.source) || null; }
function suAccount() { return RU_ACCOUNTS.find(a => a.id === state.spendup.account) || null; }
function suCapLabel(v) { return v.toLocaleString('tr-TR') + ' TL'; }
// Bir ekstre için ham (tavansız) ve aktarılacak (tavanlı) tutar
function suRaw(statement, rate) { return statement * (rate / 100); }
function suAmount(statement, rate, cap) {
  const raw = suRaw(statement, rate);
  return cap ? Math.min(raw, cap) : raw;
}
// Bu dönem beklenen aktarım (henüz kesilmemiş ekstre)
function suExpected() { return suAmount(SU_STATEMENT, state.spendup.rate, state.spendup.cap); }
function suExpectedRaw() { return suRaw(SU_STATEMENT, state.spendup.rate); }
function suIsCapped() { return state.spendup.cap != null && suExpectedRaw() > state.spendup.cap; }
// Toplam anapara (aktarılan birikimler) ve faizle birlikte toplam
function suPrincipal() { return state.spendup.txns.reduce((s, t) => s + t.add, 0); }
function suTotal() { return suPrincipal() + state.spendup.interest; }
// Kumbara ilk açıldığında dolu görünsün diye örnek ekstre aktarımları (en yeni başta; ~500 TL tavana göre)
const SU_SEED_TXNS = [
  { label: 'Nisan ekstresi',  statement: 4500, rate: 10, add: 450, interest: 12.40, date: '10 May · son ödeme', month: 'Nisan 2026' },
  { label: 'Mart ekstresi',   statement: 6200, rate: 10, add: 500, interest: 10.80, date: '10 Nis · son ödeme', month: 'Mart 2026'  },
  { label: 'Şubat ekstresi',  statement: 3750, rate: 10, add: 375, interest:  8.15, date: '10 Mar · son ödeme', month: 'Şubat 2026' },
  { label: 'Ocak ekstresi',   statement: 5000, rate: 10, add: 500, interest:  7.40, date: '10 Şub · son ödeme', month: 'Ocak 2026'  },
  { label: 'Aralık ekstresi', statement: 4100, rate: 10, add: 410, interest:  6.05, date: '10 Oca · son ödeme', month: 'Aralık 2025'},
];
// Aylık grafik — geçmiş aktarımlar + bu dönem beklenen (canlı)
const SU_MONTHS = [
  { m: 'Ara', v: 410 }, { m: 'Oca', v: 500 }, { m: 'Şub', v: 375 },
  { m: 'Mar', v: 500 }, { m: 'Nis', v: 450 },
];

// Ana ekran hub kartı — Ekstreden Biriktir (aktif/promo)
function HomeSpendupCard() {
  const s = state.spendup;
  if (s.active) {
    return `
      <div class="ru-home-card active su" data-action="su-open">
        <div class="ru-home-top"><span class="ru-logo su-logo">${suLogo(30)}</span>
          <div><div class="ru-home-t">Ekstreden Biriktir</div><div class="ru-home-s">Toplam biriken</div></div>
          <span class="chev-r">${I.chevR}</span></div>
        <div class="ru-home-amt">${fmtTL2(suTotal())}</div>
        <div class="ru-home-mini"><span>${I.trendUp} Ekstrenin <b>%${s.rate}</b>'i</span><span>faiz +${fmtTL2(s.interest).replace(',',',')}</span></div>
      </div>`;
  }
  return `
    <div class="ru-home-card promo su" data-action="su-open">
      <span class="ru-logo su-logo">${suLogo(38)}</span>
      <div class="ru-home-promo-txt">
        <div class="ru-home-t">Ekstreden Biriktir</div>
        <div class="ru-home-s">Ekstrenin belirlediğin %'si her ay birikim hesabına geçsin, günlük faiz kazan.</div>
      </div>
      <span class="ru-home-cta">Başvur ${I.chevR}</span>
    </div>`;
}

// Başvuru ekranı — kart, oran (%1/5/10/Özel), tavan, birikim hesabı, talimat onayı
function SpendupApply() {
  const s = state.spendup;
  const c = suCard();
  const a = suAccount();
  const ready = s.source && s.account && s.agreed;
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Ekstreden Biriktir'e Başvur</div>
      <button class="icon-btn" data-action="toast" data-msg="Bilgilendirme prototipte aktif değil">${I.info}</button>
    </div>
    <div class="screen-scroll ru-form">
      <div class="ru-hero">
        <div class="ru-hero-logo ru-logo su-logo">${suLogo(58)}</div>
        <h1 class="ru-hero-title">Ekstreden Biriktir ile<br>ekstren kadar biriktir.</h1>
        <p class="ru-hero-sub">Kredi kartına tanımlanan kuralla her hesap kesim döneminde ekstre tutarının belirlediğin %'si birikim hesabına aktarılır ve günlük faizle değerlenir.</p>
      </div>

      <div class="ru-sec">
        <div class="ru-sec-h"><span class="ru-sec-n">1</span> Kredi Kartı Seçimi</div>
        <div class="ru-select-field ${c ? 'filled' : 'empty'}" data-action="su-open-cardpick">
          ${c
            ? `${ruCardArt(c)}<div class="ru-sf-mid"><div class="ru-sf-name">${c.name}</div><div class="ru-sf-sub">${c.num}</div></div><span class="ru-sf-tick">${I.check}</span>`
            : `<span class="ru-sf-ico">${I.card}</span><span class="ru-sf-label">Kredi kartı seçiniz</span>`}
          <span class="ru-sf-chev">${I.chevR}</span>
        </div>
      </div>

      <div class="ru-sec">
        <div class="ru-sec-h"><span class="ru-sec-n">2</span> Birikim Kuralı</div>
        ${suRuleBoxHTML()}
      </div>

      <div class="ru-sec">
        <div class="ru-sec-h"><span class="ru-sec-n">3</span> Birikim Hesabı Seç</div>
        <div class="ru-select-field ${a ? 'filled' : 'empty'}" data-action="su-open-acctpick">
          ${a
            ? `<span class="ru-sf-ico">${I.bank}</span><div class="ru-sf-mid"><div class="ru-sf-name">${a.name}</div><div class="ru-sf-sub">${a.iban} · ${a.detail}</div></div><span class="ru-sf-tick">${I.check}</span>`
            : `<span class="ru-sf-ico">${I.bank}</span><span class="ru-sf-label">Birikim hesabı seçiniz</span>`}
          <span class="ru-sf-chev">${I.chevR}</span>
        </div>
        <div class="ru-lock-note">${I.lock} Aktarılan tutar günlük faizle değerlenir, dilediğinde çekebilirsin.</div>
      </div>

      <div class="ru-sec">
        <label class="contract-row ru-agree ${s.agreed ? 'on' : ''}" data-action="su-agree">
          <span class="cbx">${I.check}</span>
          <span class="contract-txt"><a data-action="su-open-form">Ekstreden Biriktir Talimat Formu</a>'nu okudum, onaylıyorum.</span>
        </label>
      </div>
    </div>
    <div class="screen-cta">
      <button class="btn-primary ${ready ? '' : 'disabled'}" id="su-activate-btn" data-action="su-activate">Aktifleştir</button>
      <div class="ru-ssl">${I.lock} Bilgilerin 256 bit SSL ile korunmaktadır.</div>
    </div>
  </div>`;
}

// Oran çip satırı — sabit oranlar %1 / %5 / %10 / %20
function suRateChips() {
  const s = state.spendup;
  return `<div class="su-chips">
    ${SU_RATE_PRESETS.map(r => `<button class="su-chip ${s.rate === r ? 'on' : ''}" data-action="su-rate" data-val="${r}">%${r}</button>`).join('')}
  </div>`;
}
// Üst limit — kullanıcı elle girer (boş bırakılırsa sınırsız)
function suCapInputHTML(id) {
  const s = state.spendup;
  return `<div class="su-cap-input">
      <input id="${id}" type="text" inputmode="numeric" value="${s.cap != null ? s.cap : ''}" placeholder="Sınırsız" autocomplete="off" />
      <span class="su-cap-suf">TL / ay</span>
    </div>
    <div class="su-cap-hint">Boş bırakırsan ekstrenin tamamına oran uygulanır.</div>`;
}
// Canlı örnek kartı — cap devredeyse "X yerine Y aktarılır" microcopy'siyle
function suExampleHTML() {
  const s = state.spendup;
  const raw = suExpectedRaw();
  return `
    <div class="su-ex-card">
      <div class="su-ex-main">
        <span>Tahmini aylık birikim</span>
        <b class="su-ex-amt">+${suCapLabel(Math.round(suExpected()))}</b>
      </div>
      ${suIsCapped()
        ? `<div class="su-ex-note">%${s.rate} × ~${suCapLabel(SU_STATEMENT)} ekstre = ${suCapLabel(Math.round(raw))}, üst limit <b>${suCapLabel(s.cap)}</b>.</div>`
        : `<div class="su-ex-note">Ekstrenin %${s.rate}'i · ~${suCapLabel(SU_STATEMENT)} tahmini ekstre üzerinden.</div>`}
    </div>`;
}
// Kural bölümü — "ne kadarı biriksin" + "aylık üst limit" çip grupları + canlı örnek
function suRuleBoxHTML() {
  return `
    <div class="su-field">
      <div class="su-field-l">Ekstrenin ne kadarı biriksin?</div>
      ${suRateChips()}
    </div>
    <div class="su-field">
      <div class="su-field-l">Aylık üst limit</div>
      ${suCapInputHTML('su-cap-input')}
    </div>
    <div id="su-ex-slot">${suExampleHTML()}</div>
    <div class="ru-rule-note">${I.info} Aktarım, kartının <b>son ödeme tarihinde</b> gerçekleşir; işlem puan/mil kazandırmaz. En az 100 TL ekstre şartı vardır.</div>`;
}
// Üst limit input'unu bağla — yazıldıkça state.cap ve canlı örnek güncellenir (odak kaybı yok)
function suBindCap(inputId, slotId) {
  const inp = document.getElementById(inputId);
  if (!inp) return;
  inp.addEventListener('input', () => {
    const d = inp.value.replace(/[^\d]/g, '');
    if (d !== inp.value) inp.value = d;
    state.spendup.cap = d ? parseInt(d, 10) : null;
    const slot = document.getElementById(slotId);
    if (slot) slot.innerHTML = suExampleHTML();
  });
}
function setupSpendupApply() { suBindCap('su-cap-input', 'su-ex-slot'); }

// Yönet ekranı — toplam biriken + kazanılan faiz + aylık grafik + kural özeti + hareketler + durdur
function SpendupJar() {
  const s = state.spendup;
  const c = suCard();
  const a = suAccount();
  return `
  <div class="screen anim-right">
    <div class="nav-head ru-nav-accent su-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Ekstreden Biriktir</div>
      <button class="icon-btn" data-action="toast" data-msg="Bilgilendirme prototipte aktif değil">${I.info}</button>
    </div>
    <div class="screen-scroll">
      <div class="ru-statcard su">
        <div class="ru-jar-label">Toplam Biriken</div>
        <div class="ru-jar-amt" id="su-jar-amt" data-val="${suTotal()}">${fmtTL2(suTotal())}</div>
        <div class="ru-statrow">
          <div class="ru-stat"><div class="ru-stat-l">Birikim</div><div class="ru-stat-v">${fmtTL2(suPrincipal())}</div></div>
          <div class="ru-stat mid"><div class="ru-stat-l">Kazanılan faiz</div><div class="ru-stat-v up">+${fmtTL2(s.interest)}</div></div>
          <div class="ru-stat"><div class="ru-stat-l">Geçen aya göre</div><div class="ru-stat-v up">${I.trendUp} %${s.monthChange}</div></div>
        </div>
      </div>

      <div class="su-next-card">
        <div class="su-next-head">
          <div><div class="su-next-k">Bu dönem tahmini birikim</div><div class="su-next-amt">+${suCapLabel(Math.round(suExpected()))}</div></div>
          <span class="su-next-rate">%${s.rate}</span>
        </div>
        ${suIsCapped()
          ? `<div class="su-next-note">Üst limit nedeniyle ${suCapLabel(Math.round(suExpectedRaw()))} yerine <b>${suCapLabel(s.cap)}</b> aktarılacak.</div>`
          : `<div class="su-next-note">${SU_CUR_MONTH} ekstresi (~${suCapLabel(SU_STATEMENT)}) üzerinden hesaplandı.</div>`}
        <div class="su-next-row"><span>${I.info} Sıradaki aktarım</span><b>${SU_NEXT_DATE}</b></div>
      </div>

      <div class="ru-block">
        <div class="ru-block-h">Aylık aktarım</div>
        ${suChartHTML()}
      </div>

      <div class="ru-info-card">
        <div class="ru-info-row tap" data-action="su-open-rule"><span class="ru-info-ico">${I.target}</span><span class="ru-info-k">Kural</span><span class="ru-info-v">Ekstrenin %${s.rate}'i${s.cap ? '<br><i>en çok ' + fmtTL2(s.cap).replace(',00','') + ' TL/ay</i>' : ''}</span>${I.chevR}</div>
        <div class="ru-info-row tap" data-action="su-open-cardpick"><span class="ru-info-ico">${I.card}</span><span class="ru-info-k">Kredi kartı</span><span class="ru-info-v">${c ? c.name + '<br><i>' + c.num + '</i>' : 'Seçilmedi'}</span>${I.chevR}</div>
        <div class="ru-info-row tap" data-action="su-open-acctpick"><span class="ru-info-ico">${I.bank}</span><span class="ru-info-k">Birikim hesabı</span><span class="ru-info-v">${a ? a.name + '<br><i>' + a.iban + '</i>' : 'Seçilmedi'}</span>${I.chevR}</div>
      </div>

      <div class="ru-txn-title">Son aktarımlar</div>
      <div class="ru-txns">${suTxnRows()}</div>
      <div class="ru-seeall" data-action="su-history">Tüm hareketleri gör ${I.chevR}</div>
    </div>
    <div class="screen-cta">
      <button class="btn-ghost-danger" data-action="su-stop">Ekstreden Biriktir'i durdur</button>
    </div>
  </div>`;
}

// 6 aylık çubuk grafik — 5 ay geçmiş + bu dönem beklenen (canlı)
function suChartHTML() {
  const months = [...SU_MONTHS, { m: 'May', v: suExpected(), cur: true }];
  const max = Math.max(...months.map(x => x.v), 1);
  return `
    <div class="ru-chart">
      ${months.map(x => `
        <div class="ru-bar-col">
          <div class="ru-bar-v">${Math.round(x.v)}</div>
          <div class="ru-bar-track"><div class="ru-bar su ${x.cur ? 'cur' : ''}" style="height:${Math.max(9, Math.round(x.v / max * 100))}%"></div></div>
          <div class="ru-bar-m ${x.cur ? 'cur' : ''}">${x.m}</div>
        </div>`).join('')}
    </div>`;
}

// Tek aktarım satırı — ekstre bazlı
function suTxnRow(t) {
  const idx = state.spendup.txns.indexOf(t);
  return `
    <div class="ru-txn" data-action="su-txn" data-idx="${idx}">
      <span class="ru-txn-ico su-ico">${I.receipt}</span>
      <div class="ru-txn-mid"><div class="ru-txn-m">${t.label}</div><div class="ru-txn-s">${fmtTL(t.statement).replace(',00 TL',' TL')} · %${t.rate}</div><div class="ru-txn-d">${t.date}</div></div>
      <span class="ru-txn-add">+${fmtTL2(t.add).replace(',00','')}</span>
      <span class="ru-txn-chev">${I.chevR}</span>
    </div>`;
}
function suTxnRows() {
  const s = state.spendup;
  if (!s.txns.length) return `<div class="ru-txn-empty">Henüz aktarım yok. İlk ekstre kesildiğinde buraya düşecek.</div>`;
  return s.txns.slice(0, 3).map(suTxnRow).join('');
}

// Tüm hareketler — aya göre gruplu
function SpendupHistory() {
  const s = state.spendup;
  const groups = [];
  s.txns.forEach(t => {
    let g = groups.find(x => x.m === t.month);
    if (!g) { g = { m: t.month, items: [], total: 0 }; groups.push(g); }
    g.items.push(t);
    g.total += t.add;
  });
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Aktarım Hareketleri</div>
      <span class="icon-btn" style="visibility:hidden">${I.info}</span>
    </div>
    <div class="screen-scroll">
      ${groups.map(g => `
        <div class="ru-month-h"><span>${g.m}</span><b>+${fmtTL2(g.total)}</b></div>
        <div class="ru-txns">${g.items.map(suTxnRow).join('')}</div>`).join('')}
      <div class="ru-hist-note">${I.info} Daha eski hareketler prototipte gösterilmiyor.</div>
    </div>
  </div>`;
}

/* ---- Ekstreden Biriktir akış mantığı ---- */
// Kumbarayı örnek geçmişle doldur (aktif değilse) — deeplink ve onay ortak kullanır
function suSeedJar() {
  const s = state.spendup;
  s.active = true;
  if (!s.source) s.source = 'worldgold';
  if (!s.account) s.account = 'sav';
  if (!s.txns.length) s.txns = SU_SEED_TXNS.map(t => ({ ...t }));
}
function suToggleAgree(el) {
  const s = state.spendup;
  s.agreed = !s.agreed;
  el.classList.toggle('on', s.agreed);
  const btn = document.getElementById('su-activate-btn');
  if (btn) btn.classList.toggle('disabled', !(s.source && s.account && s.agreed));
}
function suSetRate(r) { state.spendup.rate = +r; render(); }
// Talimat formu
function suOpenForm() {
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="ru-pick-t">Ekstreden Biriktir Talimat Formu</div>
    <div class="legal-scroll">
      <h4>1. Talimatın Kapsamı</h4>
      <p>Bu talimat ile seçtiğiniz kredi kartının her hesap kesim döneminde oluşan ekstre tutarının belirlediğiniz <b>%${state.spendup.rate}</b>'i, tanımladığınız tavan aşılmadan, seçtiğiniz birikim hesabına aktarılır.</p>
      <h4>2. Aktarım Zamanı ve Getiri</h4>
      <p>Aktarım kartınızın son ödeme tarihinde gerçekleşir. Aktarılan tutar birikim hesabınızda günlük faizle değerlenir. Bu işlemlerden puan/mil/MR kazanılmaz.</p>
      <h4>3. Koşullar</h4>
      <p>Kuralın işlemesi için ilgili dönem ekstre tutarının en az 100 TL olması gerekir. Talimatı dilediğiniz an durdurabilir ya da oran/kart/hesap bilgilerini güncelleyebilirsiniz.</p>
      <p><b>Bu metin prototip amaçlı örnek bir sözleşme özetidir.</b></p>
    </div>
    <button class="sheet-btn" data-action="close-sheet">Okudum</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
// Aktifleştir → özet onay sheet'i (Garanti ekran 2)
function suActivate() {
  const s = state.spendup;
  if (!s.source) return toast('Önce bir kredi kartı seçmelisin');
  if (!s.account) return toast('Birikim hesabı seçmelisin');
  if (!s.agreed) return toast('Talimat Formu onayı gerekli');
  const c = suCard(), a = suAccount();
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="ru-pick-t">Talimatı Onayla</div>
    <div class="su-cf-rows">
      <div class="su-cf-row"><span>KART</span><b>${c.num}</b></div>
      <div class="su-cf-row"><span>BİRİKİM ORANI (%)</span><b>${s.rate}</b></div>
      <div class="su-cf-row"><span>AYLIK AKTARILACAK MAKSİMUM TUTAR</span><b>${s.cap ? fmtTL2(s.cap) : 'Sınırsız'}</b></div>
      <div class="su-cf-row"><span>İLİŞKİLİ BİRİKİM HESABI</span><b>${a.name} · ${a.iban}</b></div>
    </div>
    <p class="su-cf-note">İşlemi onaylamanız ardından kuralınız kartınızın her hesap kesim tarihinde tekrarlanacaktır. Kuralın gerçekleşmesi için hesap kesim tarihinde kartınızın limiti yeterli olmalıdır.</p>
    <button class="sheet-btn" id="su-confirm-btn" data-action="su-confirm">${I.shield} Onayla</button>
    <button class="sheet-btn ghost" data-action="close-sheet">Düzenle</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
// Onay → kısa bekleme → başarı
function suConfirm() {
  const btn = document.getElementById('su-confirm-btn');
  btn.innerHTML = `<span class="spinner"></span> Talimat oluşturuluyor…`;
  btn.style.pointerEvents = 'none';
  setTimeout(() => {
    suSeedJar();
    sheetEl.innerHTML = `
      <div class="sheet-handle"></div>
      <div class="ru-done">
        <div class="ru-done-ring su">${I.checkBig}</div>
        <div class="ru-done-t">Ekstreden Biriktir aktif! 🎉</div>
        <div class="ru-done-s">Artık ${suCard().name} ekstrenin %${state.spendup.rate}'i her ay birikim hesabına aktarılacak ve günlük faizle değerlenecek.</div>
      </div>
      <button class="sheet-btn" data-action="su-open-jar">Birikimimi Gör</button>`;
  }, 1400);
}
function suOpenCardPick() {
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="ru-pick-t">Kredi kartı seçiniz</div>
    ${RU_CARDS.filter(c => c.kind === 'Kredi Kartı').map(c => {
      const on = state.spendup.source === c.id;
      return `<div class="ru-pick-row ${on ? 'active' : ''}" data-action="su-pick-card" data-val="${c.id}">
        ${ruCardArt(c)}
        <div class="ru-pick-mid"><div class="ru-pick-n">${c.name}</div><div class="ru-pick-s">${c.num} · ${c.kind}</div><div class="ru-pick-s2">${c.detail}</div></div>
        <span class="ru-pick-radio ${on ? 'on' : ''}">${on ? I.check : ''}</span>
      </div>`;
    }).join('')}
    <div class="su-pick-note">${I.info} Ekstreden Biriktir yalnızca kredi kartı ekstresi üzerinden çalışır.</div>
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function suPickCard(id) { state.spendup.source = id; closeSheet(); render(); }
function suOpenAcctPick() {
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="ru-pick-t">Birikim hesabı seçiniz</div>
    ${RU_ACCOUNTS.map(a => {
      const on = state.spendup.account === a.id;
      return `<div class="ru-pick-row ${on ? 'active' : ''}" data-action="su-pick-acct" data-val="${a.id}">
        <span class="ru-pick-ico">${I.bank}</span>
        <div class="ru-pick-mid"><div class="ru-pick-n">${a.name}</div><div class="ru-pick-s">${a.iban} · ${a.detail}</div></div>
        <span class="ru-pick-radio ${on ? 'on' : ''}">${on ? I.check : ''}</span>
      </div>`;
    }).join('')}
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function suPickAcct(id) { state.spendup.account = id; closeSheet(); render(); }
// Kuralı değiştir sheet'i (yönet ekranından) — sabit oran çipleri + elle girilen limit
function suOpenRule() {
  const s = state.spendup;
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="ru-pick-t">Kuralı değiştir</div>
    <div class="su-field sheet">
      <div class="su-field-l">Ekstrenin ne kadarı biriksin?</div>
      <div class="su-chips">
        ${SU_RATE_PRESETS.map(r => `<button class="su-chip ${s.rate === r ? 'on' : ''}" data-action="su-rule-rate" data-val="${r}">%${r}</button>`).join('')}
      </div>
    </div>
    <div class="su-field sheet">
      <div class="su-field-l">Aylık üst limit</div>
      ${suCapInputHTML('su-rule-cap-input')}
    </div>
    <div id="su-rule-ex-slot">${suExampleHTML()}</div>
    <button class="sheet-btn" data-action="su-rule-save">Kaydet</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
  suBindCap('su-rule-cap-input', 'su-rule-ex-slot');
}
function suRuleSetRate(v) { state.spendup.rate = +v; suOpenRule(); }
function suRuleSave() { closeSheet(); render(); }
function suOpenTxn(i) {
  const t = state.spendup.txns[i];
  if (!t) return;
  const c = suCard();
  const a = suAccount();
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="ru-td-head">
      <span class="ru-txn-ico su-ico big">${I.receipt}</span>
      <div class="ru-td-m">${t.label}</div>
      <div class="ru-td-d">${t.date}</div>
    </div>
    <div class="ru-cf-rows">
      <div class="ru-cf-row"><span>Ekstre tutarı</span><b>${fmtTL(t.statement).replace(',00 TL',' TL')}</b></div>
      <div class="ru-cf-row"><span>Oran</span><b>%${t.rate}</b></div>
      <div class="ru-cf-row"><span>Birikime aktarılan</span><b class="est">+${fmtTL2(t.add)}</b></div>
      <div class="ru-cf-row"><span>Kazanılan faiz</span><b class="est">+${fmtTL2(t.interest)}</b></div>
      ${c ? `<div class="ru-cf-row"><span>Kart</span><b>${c.name} ${c.num.slice(-4)}</b></div>` : ''}
      ${a ? `<div class="ru-cf-row"><span>Birikim hesabı</span><b>${a.name}</b></div>` : ''}
    </div>
    <button class="sheet-btn ghost" data-action="close-sheet">Kapat</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function suStop() {
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="ru-pick-t">Ekstreden Biriktir'i durdur</div>
    <p class="ru-stop-txt">Talimatın iptal edilir ve yeni ekstrelerde aktarım yapılmaz. Biriken <b>${fmtTL2(suTotal())}</b> hesabında kalır ve faizle değerlenmeye devam eder.</p>
    <button class="sheet-btn" data-action="su-stop-confirm">Durdur</button>
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function suStopConfirm() {
  const s = state.spendup;
  s.active = false;
  s.agreed = false;
  closeSheet();
  goHome();
  setTimeout(() => toast('Ekstreden Biriktir durduruldu. Biriken paran hesabında kalır.'), 300);
}
// Toplam biriken sayaç animasyonu (yönet ekranı)
function setupSuJar() {
  const el = document.getElementById('su-jar-amt');
  if (!el) return;
  const target = parseFloat(el.dataset.val);
  const from = target * 0.55;
  const dur = 650;
  const t0 = performance.now();
  const tick = (now) => {
    const p = Math.min(1, (now - t0) / dur);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = fmtTL2(from + (target - from) * e);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ===================================================================
   MADEN BİRİKTİR  (talimatlı değerli maden birikimi)
   Gram cinsinden düzenli altın/gümüş alımı: her ödeme gününde
   belirlenen gram kadar maden, karttan çekilip maden hesabına
   gram olarak geçer. Nakit değil varlık → değer/kazanç gösterilir.
   =================================================================== */
// Maden logosu — istiflenmiş külçeler (Yapı Kredi altın hesabı ikonu diliyle)
function mbLogo(size) {
  return `<svg class="ru-logo-svg" width="${size}" height="${size}" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <path d="M10 37 L38 37 L34 31 L14 31 Z" fill="currentColor" opacity="0.5"/>
    <path d="M13 30 L35 30 L31 24 L17 24 Z" fill="currentColor" opacity="0.78"/>
    <path d="M16 23 L32 23 L28.5 17 L19.5 17 Z" fill="currentColor"/>
  </svg>`;
}
// Madenler — anlık gram fiyatları (mock/örnek) + geçmiş fiyat serisi (maliyet ortalaması), YK birim kodu (XAU/XAG)
const MB_METALS = {
  gold:      { name: 'Altın',    code: 'XAU', price: 6850, series: [5900, 6150, 6380, 6560, 6720], change: 9 },
  silver:    { name: 'Gümüş',   code: 'XAG', price: 111,  series: [92, 97, 101, 105, 108],        change: 6 },
  platinum:  { name: 'Platin',   code: 'XPT', price: 2940, series: [2560, 2650, 2740, 2820, 2890], change: 5 },
  palladium: { name: 'Paladyum', code: 'XPD', price: 2415, series: [2680, 2600, 2520, 2470, 2440], change: -4 },
};
const MB_CUR_MONTH = 'Mayıs 2026';
const MB_SEED_DATES = ['14 Ara', '13 Oca', '15 Şub', '14 Mar', '13 Nis'];
const MB_SEED_MONTHS = ['Aralık 2025', 'Ocak 2026', 'Şubat 2026', 'Mart 2026', 'Nisan 2026'];
function mbMetal() { return MB_METALS[state.metal.kind]; }
function mbCard() { return RU_CARDS.find(c => c.id === state.metal.source) || null; }
function mbPrice() { return mbMetal().price; }
// Maden miktarı biçimi — YK'daki gibi kod ekli (ör. "2,84 XAU")
function mbFmtMetal(g) { return g.toLocaleString('tr-TR', { maximumFractionDigits: 2 }) + ' ' + mbMetal().code; }
// Talimatın okunur özeti (unit'e göre: "1.000 TL" ya da "0,50 XAU")
function mbInstrLabel() { return state.metal.unit === 'try' ? fmtTL(state.metal.tryAmt) : mbFmtMetal(state.metal.gram); }
// Bir dönemki alım: TL tutarı ve alınan gram (talimat cinsine göre)
function mbMonthlyTL() { return state.metal.unit === 'try' ? state.metal.tryAmt : state.metal.gram * mbPrice(); }
function mbMonthlyGram() { return state.metal.unit === 'try' ? (mbPrice() ? state.metal.tryAmt / mbPrice() : 0) : state.metal.gram; }
// Toplam biriken (gram/XAU) / maliyet / güncel değer / kazanç
function mbGrams() { return state.metal.txns.reduce((s, t) => s + t.gram, 0); }
function mbInvested() { return state.metal.txns.reduce((s, t) => s + t.gram * t.price, 0); }
function mbValue() { return mbGrams() * mbPrice(); }
function mbGain() { return mbValue() - mbInvested(); }
function mbGainPct() { const inv = mbInvested(); return inv ? Math.round(mbGain() / inv * 100) : 0; }
// Maden hesabı kurulunca dolu görünsün diye örnek alımlar (talimat cinsine göre her ay alınan gram)
function mbSeedTxns() {
  return mbMetal().series.map((price, i) => {
    const gram = state.metal.unit === 'try' ? state.metal.tryAmt / price : state.metal.gram;
    return { gram, price, date: MB_SEED_DATES[i], month: MB_SEED_MONTHS[i] };
  }).reverse();
}

// Ana ekran hub kartı — Maden Biriktir (aktif/promo)
function HomeMetalCard() {
  const mt = state.metal;
  if (mt.active) {
    const m = mbMetal();
    return `
      <div class="ru-home-card active mb" data-action="mb-open">
        <div class="ru-home-top"><span class="ru-logo mb-logo">${mbLogo(30)}</span>
          <div><div class="ru-home-t">Maden Biriktir</div><div class="ru-home-s">Toplam ${m.name.toLowerCase()}</div></div>
          <span class="chev-r">${I.chevR}</span></div>
        <div class="ru-home-amt">${mbFmtMetal(mbGrams())}</div>
        <div class="ru-home-mini"><span>≈ ${fmtTL(Math.round(mbValue()))}</span><span class="${mbGain() >= 0 ? 'up' : 'down'}">${mbGain() >= 0 ? '+' : ''}%${mbGainPct()}</span></div>
      </div>`;
  }
  return `
    <div class="ru-home-card promo mb" data-action="mb-open">
      <span class="ru-logo mb-logo">${mbLogo(38)}</span>
      <div class="ru-home-promo-txt">
        <div class="ru-home-t">Maden Biriktir</div>
        <div class="ru-home-s">Kartından her ay düzenli değerli maden biriktir; altın, gümüş, platin ya da paladyum otomatik alınsın.</div>
      </div>
      <span class="ru-home-cta">Başvur ${I.chevR}</span>
    </div>`;
}

// Maden kodu rozeti (XAU/XAG) — mavi tema
function mbBadge(kind) { return `<span class="mb-badge">${MB_METALS[kind].code}</span>`; }
// Gram fiyatını ondalıksız, net biçimle (ör. "6.850 TL")
function mbPriceStr(v) { return v.toLocaleString('tr-TR') + ' TL'; }
// Maden seçimi — tek "seçili maden" alanı (dokununca bottom sheet açılır)
function mbMetalField(action) {
  const m = mbMetal();
  return `<div class="ru-select-field filled" data-action="${action}">
    <span class="mb-badge">${m.code}</span>
    <div class="ru-sf-mid"><div class="ru-sf-name">${m.name}</div><div class="ru-sf-sub">Anlık gram fiyatı</div></div>
    <div class="mb-price"><b>${mbPriceStr(m.price)}</b><i>/gram</i></div>
    <span class="ru-sf-chev">${I.chevR}</span>
  </div>`;
}
// Talimat cinsi — segmented control (TL / Gram)
function mbUnitChips(action) {
  const u = state.metal.unit;
  return `<div class="mb-seg">
    <button class="mb-seg-b ${u === 'try' ? 'on' : ''}" data-action="${action}" data-val="try">TL</button>
    <button class="mb-seg-b ${u === 'gram' ? 'on' : ''}" data-action="${action}" data-val="gram">Gram</button>
  </div>`;
}
// Tutar alanı (unit'e göre TL ya da gram) — büyük, sade
function mbAmtInputVal() { return state.metal.unit === 'try' ? String(state.metal.tryAmt) : state.metal.gram.toLocaleString('tr-TR', { maximumFractionDigits: 2 }); }
function mbAmtInputHTML(id) {
  const u = state.metal.unit;
  return `<div class="mb-amount">
      <input id="${id}" type="text" inputmode="${u === 'try' ? 'numeric' : 'decimal'}" value="${mbAmtInputVal()}" placeholder="${u === 'try' ? '1.000' : '0,5'}" autocomplete="off" />
      <span class="mb-amount-unit">${u === 'try' ? 'TL' : mbMetal().code}<i>/ ay</i></span>
    </div>`;
}
// Tutar input'unu bağla — unit'e göre parse (sade, canlı örnek yok)
function mbBindAmount(inputId) {
  const inp = document.getElementById(inputId);
  if (!inp) return;
  inp.addEventListener('input', () => {
    if (state.metal.unit === 'try') {
      const d = inp.value.replace(/[^\d]/g, '');
      if (d !== inp.value) inp.value = d;
      state.metal.tryAmt = d ? parseInt(d, 10) : 0;
    } else {
      const v = inp.value.replace(/[^\d.,]/g, '');
      if (v !== inp.value) inp.value = v;
      const n = parseFloat(v.replace(',', '.'));
      state.metal.gram = isNaN(n) || n <= 0 ? 0.1 : n;
    }
  });
}

// Başvuru — kart, maden, sabit tutar (TL ya da gram), talimat (sıklık/gün yok)
function MetalApply() {
  const mt = state.metal;
  const c = mbCard();
  const ready = mt.source && mt.agreed;
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Maden Biriktir'e Başvur</div>
      <button class="icon-btn" data-action="toast" data-msg="Bilgilendirme prototipte aktif değil">${I.info}</button>
    </div>
    <div class="screen-scroll ru-form">
      <div class="ru-hero">
        <div class="ru-hero-logo ru-logo mb-logo">${mbLogo(58)}</div>
        <h1 class="ru-hero-title">Maden Biriktir ile<br>düzenli değerli maden.</h1>
        <p class="ru-hero-sub">Belirlediğin tutar her ay kartından alınıp seçtiğin değerli madene — altın, gümüş, platin ya da paladyum — o günkü fiyattan dönüşür. Küçük adımlarla düzenli biriktir.</p>
      </div>

      <div class="ru-sec">
        <div class="ru-sec-h"><span class="ru-sec-n">1</span> Ödeme Kartı Seçimi</div>
        <div class="ru-select-field ${c ? 'filled' : 'empty'}" data-action="mb-open-cardpick">
          ${c
            ? `${ruCardArt(c)}<div class="ru-sf-mid"><div class="ru-sf-name">${c.name}</div><div class="ru-sf-sub">${c.num}</div></div><span class="ru-sf-tick">${I.check}</span>`
            : `<span class="ru-sf-ico">${I.card}</span><span class="ru-sf-label">Banka veya kredi kartı seçiniz</span>`}
          <span class="ru-sf-chev">${I.chevR}</span>
        </div>
        <div class="ru-lock-note">${I.info} Kredi kartı seçersen işlem tutarı kart ekstrene yansır.</div>
      </div>

      <div class="ru-sec">
        <div class="ru-sec-h"><span class="ru-sec-n">2</span> Maden</div>
        ${mbMetalField('mb-open-metalpick')}
      </div>

      <div class="ru-sec">
        <div class="ru-sec-h"><span class="ru-sec-n">3</span> Aylık Tutar</div>
        <div class="mb-amount-row">${mbUnitChips('mb-unit')}${mbAmtInputHTML('mb-amt-input')}</div>
        <div class="ru-lock-note">${I.lock} Bu tutar her ay kartından çekilir; alınacak ${mbMetal().name.toLowerCase()} (${mbMetal().code}) miktarı işlem anındaki gram fiyatına göre belirlenir.</div>
      </div>

      <div class="ru-sec">
        <label class="contract-row ru-agree ${mt.agreed ? 'on' : ''}" data-action="mb-agree">
          <span class="cbx">${I.check}</span>
          <span class="contract-txt"><a data-action="mb-open-form">Maden Biriktir Talimat Formu</a>'nu okudum, onaylıyorum.</span>
        </label>
      </div>
    </div>
    <div class="screen-cta">
      <button class="btn-primary ${ready ? '' : 'disabled'}" id="mb-activate-btn" data-action="mb-activate">Aktifleştir</button>
      <div class="ru-ssl">${I.lock} Bilgilerin 256 bit SSL ile korunmaktadır.</div>
    </div>
  </div>`;
}
function setupMetalApply() { mbBindAmount('mb-amt-input'); }

// Yönet — toplam maden + güncel değer + kazanç + aylık grafik + kural + hareketler + durdur
function MetalJar() {
  const mt = state.metal;
  const m = mbMetal();
  const c = mbCard();
  const gain = mbGain();
  return `
  <div class="screen anim-right">
    <div class="nav-head ru-nav-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Maden Biriktir</div>
      <button class="icon-btn" data-action="toast" data-msg="Bilgilendirme prototipte aktif değil">${I.info}</button>
    </div>
    <div class="screen-scroll">
      <div class="ru-statcard">
        <div class="ru-jar-label">Toplam ${m.name}</div>
        <div class="ru-jar-amt mb-gram" id="mb-jar-amt" data-val="${mbGrams()}">${mbFmtMetal(mbGrams())}</div>
        <div class="ru-statrow">
          <div class="ru-stat"><div class="ru-stat-l">Yatırılan</div><div class="ru-stat-v">${fmtTL(Math.round(mbInvested()))}</div></div>
          <div class="ru-stat mid"><div class="ru-stat-l">Güncel değer</div><div class="ru-stat-v">${fmtTL(Math.round(mbValue()))}</div></div>
          <div class="ru-stat"><div class="ru-stat-l">Kazanç</div><div class="ru-stat-v ${gain >= 0 ? 'up' : 'down'}">${gain >= 0 ? '+' : ''}%${mbGainPct()}</div></div>
        </div>
      </div>

      <div class="mb-rule-card">
        <div class="mb-rule-h"><span>Talimatım</span><span class="mb-rule-edit" data-action="mb-open-rule">Değiştir ${I.chevR}</span></div>
        <div class="mb-rule-row"><span>Maden</span><b>${m.name} (${m.code})</b></div>
        <div class="mb-rule-row"><span>Her ay</span><b>${mbInstrLabel()}</b></div>
        <div class="mb-rule-row tap" data-action="mb-open-cardpick"><span>Ödeme kartı</span><b>${c ? c.name : 'Seçilmedi'} <span class="mb-rule-chev">${I.chevR}</span></b></div>
      </div>

      <div class="ru-txn-title">Son alımlar</div>
      <div class="ru-txns">${mbTxnRows()}</div>
      <div class="ru-seeall" data-action="mb-history">Tüm hareketleri gör ${I.chevR}</div>
    </div>
    <div class="screen-cta">
      <button class="btn-ghost-danger" data-action="mb-stop">Maden Biriktir'i durdur</button>
    </div>
  </div>`;
}
// Alım satırı — ödenen TL (title) + alınan maden (sağda, ana renk)
function mbTxnRow(t) {
  const idx = state.metal.txns.indexOf(t);
  const m = mbMetal();
  return `
    <div class="ru-txn" data-action="mb-txn" data-idx="${idx}">
      <span class="ru-txn-ico mb-ico">${mbBadge(state.metal.kind)}</span>
      <div class="ru-txn-mid"><div class="ru-txn-m">${fmtTL(Math.round(t.gram * t.price))}</div><div class="ru-txn-s">~${fmtTL(t.price)}/${m.code}</div><div class="ru-txn-d">${t.date}</div></div>
      <span class="ru-txn-add">+${mbFmtMetal(t.gram)}</span>
      <span class="ru-txn-chev">${I.chevR}</span>
    </div>`;
}
function mbTxnRows() {
  const mt = state.metal;
  if (!mt.txns.length) return `<div class="ru-txn-empty">Henüz alım yok. İlk alımda buraya düşecek.</div>`;
  return mt.txns.slice(0, 3).map(mbTxnRow).join('');
}
function MetalHistory() {
  const mt = state.metal;
  const groups = [];
  mt.txns.forEach(t => {
    let g = groups.find(x => x.m === t.month);
    if (!g) { g = { m: t.month, items: [], gram: 0 }; groups.push(g); }
    g.items.push(t);
    g.gram += t.gram;
  });
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Alım Hareketleri</div>
      <span class="icon-btn" style="visibility:hidden">${I.info}</span>
    </div>
    <div class="screen-scroll">
      ${groups.map(g => `
        <div class="ru-month-h"><span>${g.m}</span><b>+${mbFmtMetal(g.gram)}</b></div>
        <div class="ru-txns">${g.items.map(mbTxnRow).join('')}</div>`).join('')}
      <div class="ru-hist-note">${I.info} Daha eski hareketler prototipte gösterilmiyor.</div>
    </div>
  </div>`;
}

/* ---- Maden Biriktir akış mantığı ---- */
function mbSeedJar() {
  const mt = state.metal;
  mt.active = true;
  if (!mt.source) mt.source = 'worldgold';
  if (!mt.txns.length) mt.txns = mbSeedTxns();
}
function mbToggleAgree(el) {
  const mt = state.metal;
  mt.agreed = !mt.agreed;
  el.classList.toggle('on', mt.agreed);
  const btn = document.getElementById('mb-activate-btn');
  if (btn) btn.classList.toggle('disabled', !(mt.source && mt.agreed));
}
function mbSetUnit(u) { state.metal.unit = u; render(); }
// Maden seçim bottom sheet'i — apply ekranından ya da "Kuralı değiştir" sheet'inden açılır
let mbRuleOpen = false;   // metalpick "Kuralı değiştir"den mi açıldı (dönüş bağlamı)
function mbOpenMetalPick() {
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="ru-pick-t">Maden seçiniz</div>
    ${Object.keys(MB_METALS).map(k => {
      const m = MB_METALS[k]; const on = state.metal.kind === k;
      return `<div class="ru-pick-row ${on ? 'active' : ''}" data-action="mb-pick-metal" data-val="${k}">
        <span class="mb-badge">${m.code}</span>
        <div class="ru-pick-mid"><div class="ru-pick-n">${m.name}</div><div class="ru-pick-s">${m.code}</div></div>
        <div class="mb-price"><b>${mbPriceStr(m.price)}</b><i>/gram</i></div>
        <span class="ru-pick-radio ${on ? 'on' : ''}">${on ? I.check : ''}</span>
      </div>`;
    }).join('')}
    <button class="sheet-btn ghost" data-action="mb-metalpick-cancel">Vazgeç</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function mbPickMetal(k) {
  state.metal.kind = k;
  state.metal.monthChange = MB_METALS[k].change;
  if (mbRuleOpen) mbOpenRule(); else { closeSheet(); render(); }
}
function mbMetalpickCancel() { if (mbRuleOpen) mbOpenRule(); else closeSheet(); }
function mbOpenForm() {
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="ru-pick-t">Maden Biriktir Talimat Formu</div>
    <div class="legal-scroll">
      <h4>1. Talimatın Kapsamı</h4>
      <p>Bu talimat ile her ay belirlediğiniz sabit tutar (<b>${mbInstrLabel()}</b>) o günkü gram satış fiyatı üzerinden seçtiğiniz karttan tahsil edilerek ${mbMetal().name.toLowerCase()} olarak maden hesabınıza (${mbMetal().code}) aktarılır.</p>
      <h4>2. Fiyat ve Değer</h4>
      <p>Alım anındaki gram fiyatı esas alınır; maden fiyatları piyasa koşullarına göre değişir, birikiminizin değeri artabilir veya azalabilir. İşçilik/saklama ücreti alınmaz.</p>
      <h4>3. Koşullar ve Yönetim</h4>
      <p>Alımın gerçekleşmesi için kartınızın limiti/bakiyesi yeterli olmalıdır. Tutar, cins, maden ve kart bilgilerini dilediğiniz an değiştirebilir, talimatı durdurabilirsiniz.</p>
      <p><b>Bu metin prototip amaçlı örnek bir sözleşme özetidir.</b></p>
    </div>
    <button class="sheet-btn" data-action="close-sheet">Okudum</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function mbActivate() {
  const mt = state.metal;
  if (!mt.source) return toast('Önce bir kart seçmelisin');
  if (!mt.agreed) return toast('Talimat Formu onayı gerekli');
  const c = mbCard(), m = mbMetal();
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="ru-pick-t">Talimatı Onayla</div>
    <div class="su-cf-rows">
      <div class="su-cf-row"><span>KART</span><b>${c.num}</b></div>
      <div class="su-cf-row"><span>MADEN</span><b>${m.name} (${m.code})</b></div>
      <div class="su-cf-row"><span>AYLIK TALİMAT</span><b>${mbInstrLabel()} · ${mt.unit === 'try' ? 'sabit TL' : 'sabit gram'}</b></div>
      <div class="su-cf-row"><span>BUGÜNKÜ KURLA</span><b>≈ ${mt.unit === 'try' ? mbFmtMetal(mbMonthlyGram()) : fmtTL(Math.round(mbMonthlyTL()))}</b></div>
    </div>
    <p class="su-cf-note">İşlemi onaylamanız ardından maden hesabınız açılır ve talimatınız her ay tekrarlanır. Alımın gerçekleşmesi için kartınızın limiti yeterli olmalıdır.</p>
    <button class="sheet-btn" id="mb-confirm-btn" data-action="mb-confirm">${I.shield} Onayla</button>
    <button class="sheet-btn ghost" data-action="close-sheet">Düzenle</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function mbConfirm() {
  const btn = document.getElementById('mb-confirm-btn');
  btn.innerHTML = `<span class="spinner"></span> Talimat oluşturuluyor…`;
  btn.style.pointerEvents = 'none';
  setTimeout(() => {
    mbSeedJar();
    sheetEl.innerHTML = `
      <div class="sheet-handle"></div>
      <div class="ru-done">
        <div class="ru-done-ring">${I.checkBig}</div>
        <div class="ru-done-t">Maden Biriktir aktif! 🎉</div>
        <div class="ru-done-s">Talimatın hazır! Artık her ay otomatik olarak ${mbMetal().name.toLowerCase()} biriktireceksin.</div>
      </div>
      <button class="sheet-btn" data-action="mb-open-jar">Maden Hesabımı Gör</button>`;
  }, 1400);
}
function mbOpenCardPick() {
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="ru-pick-t">Banka veya kredi kartı seçiniz</div>
    ${RU_CARDS.map(c => {
      const on = state.metal.source === c.id;
      return `<div class="ru-pick-row ${on ? 'active' : ''}" data-action="mb-pick-card" data-val="${c.id}">
        ${ruCardArt(c)}
        <div class="ru-pick-mid"><div class="ru-pick-n">${c.name}</div><div class="ru-pick-s">${c.num} · ${c.kind}</div><div class="ru-pick-s2">${c.detail}</div></div>
        <span class="ru-pick-radio ${on ? 'on' : ''}">${on ? I.check : ''}</span>
      </div>`;
    }).join('')}
    <div class="su-pick-note">${I.info} Kredi kartı seçersen işlem tutarı kart ekstrene yansır; banka kartında hesabından çekilir.</div>
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function mbPickCard(id) { state.metal.source = id; closeSheet(); render(); }
// Kuralı değiştir sheet'i (yönet) — maden + talimat cinsi + tutar (sıklık/gün yok)
function mbOpenRule() {
  mbRuleOpen = true;
  const mt = state.metal;
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="ru-pick-t">Kuralı değiştir</div>
    <div class="su-field sheet"><div class="su-field-l">Maden</div>${mbMetalField('mb-open-metalpick')}</div>
    <div class="su-field sheet"><div class="su-field-l">Talimat cinsi</div>${mbUnitChips('mb-rule-unit')}</div>
    <div class="su-field sheet"><div class="su-field-l">Aylık ${mt.unit === 'try' ? 'tutar' : 'miktar'}</div>${mbAmtInputHTML('mb-rule-amt-input')}</div>
    <button class="sheet-btn" data-action="mb-rule-save">Kaydet</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
  mbBindAmount('mb-rule-amt-input');
}
function mbRuleSetUnit(u) { state.metal.unit = u; mbOpenRule(); }
function mbRuleSave() { mbRuleOpen = false; closeSheet(); render(); }
function mbOpenTxn(i) {
  const t = state.metal.txns[i];
  if (!t) return;
  const m = mbMetal(), c = mbCard();
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="ru-td-head">
      <span class="ru-txn-ico mb-ico big">${mbBadge(state.metal.kind)}</span>
      <div class="ru-td-m">+${mbFmtMetal(t.gram)}</div>
      <div class="ru-td-d">${t.date}</div>
    </div>
    <div class="ru-cf-rows">
      <div class="ru-cf-row"><span>Ödenen tutar</span><b>${fmtTL(Math.round(t.gram * t.price))}</b></div>
      <div class="ru-cf-row"><span>Alınan</span><b class="est">+${mbFmtMetal(t.gram)}</b></div>
      <div class="ru-cf-row"><span>İşlem günü gram fiyatı</span><b>~${fmtTL(t.price)}</b></div>
      ${c ? `<div class="ru-cf-row"><span>Kart</span><b>${c.name} ${c.num.slice(-4)}</b></div>` : ''}
      <div class="ru-cf-row"><span>Güncel gram fiyatı</span><b>~${fmtTL(m.price)}</b></div>
    </div>
    <button class="sheet-btn ghost" data-action="close-sheet">Kapat</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function mbStop() {
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="ru-pick-t">Maden Biriktir'i durdur</div>
    <p class="ru-stop-txt">Talimatın iptal edilir ve yeni alım yapılmaz. Biriken <b>${mbFmtMetal(mbGrams())}</b> ${mbMetal().name.toLowerCase()} maden hesabında kalır.</p>
    <button class="sheet-btn" data-action="mb-stop-confirm">Durdur</button>
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function mbStopConfirm() {
  const mt = state.metal;
  mt.active = false;
  mt.agreed = false;
  closeSheet();
  goHome();
  setTimeout(() => toast('Maden Biriktir durduruldu. Biriken madenin hesabında kalır.'), 300);
}
function setupMetalJar() {
  const el = document.getElementById('mb-jar-amt');
  if (!el) return;
  const target = parseFloat(el.dataset.val);
  const from = target * 0.55;
  const dur = 650;
  const t0 = performance.now();
  const tick = (now) => {
    const p = Math.min(1, (now - t0) / dur);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = mbFmtMetal(from + (target - from) * e);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ===================================================================
   FAYDA YOLCULUKLARI  (Benim Dünyam)
   Kullanıcı önce ulaşmak istediği finansal faydayı seçer; banka o
   faydaya götüren şeffaf, kişiselleştirilmiş görevleri verir. Kampanya
   değil; kişisel finansal yolculuk. Dil güvenli: "artacak" yok,
   "değerlendirme şansını güçlendir / uygun görülürse teklif açılır".
   =================================================================== */
const FAYDA_BENEFITS = [
  {
    id: 'limit', icon: 'card', title: 'Limitimi Güçlendir', dur: '5 level',
    short: 'Bilgilerini güncelle, kartını aktif kullan; limitini güncel verilerle yeniden değerlendir.',
    win: 'Limit değerlendirmesi',
    reward: 'Limitin güncel bilgilerinle yeniden değerlendirilir ve sonucu 24 saat içinde sana bildirilir.',
    wLabel: 'Limit değerlendirmen', wMeta: '24 saat içinde sonuçlanır', wStatus: 'pending',
    done: 'Limitin yeniden değerlendirmeye alındı. Sonucu 24 saat içinde sana bildireceğiz.',
    rewards: [
      { label: 'Limit yeniden değerlendirmesi', meta: 'Güncel bilgilerinle; 24 saat içinde sonuçlanır', status: 'pending' },
      { label: 'Alışverişe 3 taksit hakkı', meta: '3.000 TL üzeri tek harcamada geçerli', status: 'active' },
      { label: 'Nakit avans faiz indirimi', meta: '1 ay boyunca avantajlı avans oranı', status: 'active' },
    ],
    levels: [
      { t: 'Gelir ve meslek bilgilerini güncelle', cta: 'Bilgilerimi güncelle' },
      { t: 'Worldcard ile 3 farklı kategoride alışveriş yap', cta: 'Alışveriş ekle', goal: 3, unit: 'kategori', step: 1 },
      { t: 'Ekstre borcunu son ödeme tarihinden önce öde', cta: 'Ödememi yap' },
      { t: 'Başka bankadaki hesabını açık bankacılıkla bağla', cta: 'Hesap bağla' },
      { t: 'Limit değerlendirme talebini başlat', cta: 'Değerlendirmeyi başlat', final: true },
    ],
  },
  {
    id: 'kart', icon: 'undo', title: 'Kart Aidatını Worldpuan ile Öde', dur: '5 level',
    short: 'Worldpuan biriktir; yıllık kart aidatını puanınla ödet.',
    win: 'Kart aidatı muafiyeti',
    reward: 'Yıllık kart aidatın birikmiş Worldpuan\'ınla ödenir; bu dönem aidat ödemezsin.',
    wLabel: 'Kart aidatı muafiyeti', wMeta: 'Bu yıl için geçerli', wStatus: 'active',
    done: 'Aidat ödemen Worldpuan\'a bağlandı. Bu yılki kart aidatın puanlarınla karşılanacak.',
    rewards: [
      { label: 'Aidatın Worldpuan\'la ödensin', meta: 'Bu yılki kart aidatı puanınla kapanır', status: 'active' },
      { label: 'World Eko Kart\'a geçiş', meta: 'Aidatsız karta ücretsiz geç', status: 'active' },
      { label: '500 Worldpuan hediye', meta: 'Hesabına hemen tanımlanır', status: 'active' },
    ],
    levels: [
      { t: 'Kredi kartı ekstreni dijital ekstreye al', cta: 'Dijital ekstreye geç' },
      { t: 'World Pay ile ödemeyi aç', cta: 'World Pay\'i aç' },
      { t: 'Worldcard ile 5 alışveriş yaparak Worldpuan biriktir', cta: 'Alışveriş ekle', goal: 5, unit: 'alışveriş', step: 1 },
      { t: '"Puan ile ödeme" talimatını tanımla', cta: 'Talimat ver' },
      { t: 'Aidatını Worldpuan ile ödemeyi aktifleştir', cta: 'Aidatımı bağla', final: true },
    ],
  },
  {
    id: 'faiz', icon: 'invest', title: 'Birikimime Ek Faiz Ekle', dur: '5 level',
    short: 'Birikim hesabını kur, hedef belirle ve bakiyeni büyüt; 30 gün ek faiz fırsatını aç.',
    win: '30 gün ek faiz',
    reward: '30 gün boyunca birikimin avantajlı oranla değerlendirilir.',
    wLabel: '30 gün ek faiz fırsatı', wMeta: '18 gün kaldı', wStatus: 'active',
    done: 'Ek faiz fırsatın aktif. Birikimin 30 gün boyunca avantajlı oranla değerlendirilecek.',
    rewards: [
      { label: '30 gün ek faiz fırsatı', meta: 'Sınırsız Hesap bakiyene 30 gün avantajlı oran', status: 'active' },
      { label: 'Vadeli hesaba özel faiz', meta: 'İlk 32 gün vadede yüksek oran', status: 'active' },
      { label: 'Birikimine 250 TL başlangıç bonusu', meta: 'Hesabına hemen yatırılır', status: 'active' },
    ],
    levels: [
      { t: 'Sınırsız Hesap aç', cta: 'Hesap aç' },
      { t: 'Birikim hedefini seç', cta: 'Hedef seç', options: ['Acil durum', 'Tatil', 'Eğitim', 'Ev / taşınma', 'Altın / maden', 'Serbest hedef'] },
      { t: 'Kartopu ile otomatik birikim talimatı ver', cta: 'Talimat oluştur' },
      { t: 'Hesabında 5.000 TL bakiyeye ulaş', cta: 'Bakiye ekle', goal: 5000, unit: 'TL', step: 1500, money: true },
      { t: 'Ek faiz fırsatını aktifleştir', cta: 'Ek faizi aktifleştir', final: true },
    ],
  },
  {
    id: 'eft', icon: 'transfer', title: 'Ücretsiz Transfer Hakkı Kazan', dur: '5 level',
    short: 'Dijital transfer alışkanlığını kur; 10 ücretsiz EFT/FAST hakkı kazan.',
    win: '10 ücretsiz FAST',
    reward: '1 ay boyunca 10 adet ücretsiz EFT/FAST hakkı kazanırsın.',
    wLabel: '10 ücretsiz EFT/FAST hakkı', wMeta: '24 gün kaldı', wStatus: 'active',
    done: 'Transfer paketin aktif. 10 ücretsiz EFT/FAST hakkın Ödüllerim\'e eklendi.',
    rewards: [
      { label: '10 ücretsiz FAST/EFT hakkı', meta: '1 ay boyunca kullanılır', status: 'active' },
      { label: '3 ay transfer ücreti iadesi', meta: 'Ödediğin EFT/havale ücreti iade edilir', status: 'active' },
      { label: 'Düzenli ödeme ücret muafiyeti', meta: 'Kayıtlı fatura ve talimatlarda ücret yok', status: 'active' },
    ],
    levels: [
      { t: 'Sık işlem yaptığın kişiyi kayıtlı alıcı olarak ekle', cta: 'Alıcı ekle' },
      { t: 'Yapı Kredi Mobil\'den ilk FAST transferini yap', cta: 'Para gönder' },
      { t: 'QR ile para göndermeyi dene', cta: 'QR\'ı dene' },
      { t: 'Bir düzenli ödeme (fatura/kira) talimatı tanımla', cta: 'Talimat oluştur' },
      { t: 'Ücretsiz transfer paketini aktifleştir', cta: 'Paketimi aktifleştir', final: true },
    ],
  },
  {
    id: 'worldpuan', icon: 'star', title: 'Ekstra Worldpuan Kazan', dur: '5 level',
    short: 'Kategorini seç, kampanyanı aç ve işlemlerini tamamla; ekstra Worldpuan kazan.',
    win: 'Ekstra Worldpuan',
    reward: 'Seçtiğin kategoride 1 ay boyunca ekstra Worldpuan kazanırsın.',
    wLabel: 'Ekstra Worldpuan hakkı', wMeta: 'Bu dönem geçerli', wStatus: 'active',
    done: 'Ekstra Worldpuan hakkın aktif. Seçili kategoride yapacağın işlemlerde avantaj kazanabilirsin.',
    rewards: [
      { label: 'Kategoride 3 kat Worldpuan', meta: 'Seçtiğin kategoride 1 ay boyunca', status: 'active' },
      { label: '500 Worldpuan hediye', meta: 'Hesabına hemen tanımlanır', status: 'active' },
      { label: 'World Pay ek puan avantajı', meta: 'World Pay ödemelerinde ekstra Worldpuan', status: 'active' },
    ],
    levels: [
      { t: 'Worldpuan kazanmak istediğin kategoriyi seç', cta: 'Kategori seç', options: ['Market', 'Restoran', 'Giyim & kozmetik', 'Akaryakıt', 'Seyahat', 'E-ticaret'] },
      { t: 'World Pay ile ödemeyi aç', cta: 'World Pay\'i aç' },
      { t: 'Bu kategoride ilk alışverişini yap', cta: 'Alışveriş ekle', goal: 1, unit: 'alışveriş', step: 1 },
      { t: 'Aynı kategoride 3 alışverişe ulaş', cta: 'Alışveriş ekle', goal: 3, unit: 'alışveriş', step: 1 },
      { t: 'Ekstra Worldpuan kazanımını aktifleştir', cta: 'Aktifleştir', final: true },
    ],
  },
];
function faydaBenefit(id) { return FAYDA_BENEFITS.find(b => b.id === id) || null; }
function faydaLevels(id) { return faydaBenefit(id).levels; }
function faydaProg(id) { if (!state.fayda.prog[id]) state.fayda.prog[id] = faydaLevels(id).map(() => 0); return state.fayda.prog[id]; }
function faydaGoal(lv) { return lv.goal || 1; }
function faydaLevelDone(id, i) { return faydaProg(id)[i] >= faydaGoal(faydaLevels(id)[i]); }
function faydaFirstOpen(id) { const lv = faydaLevels(id); for (let i = 0; i < lv.length; i++) if (!faydaLevelDone(id, i)) return i; return -1; }
function faydaLevelStatus(id, i) { if (faydaLevelDone(id, i)) return 'done'; return i === faydaFirstOpen(id) ? 'active' : 'locked'; }
function faydaDoneCount(id) { return faydaLevels(id).reduce((n, _, i) => n + (faydaLevelDone(id, i) ? 1 : 0), 0); }
function faydaTotal(id) { return faydaLevels(id).length; }
function faydaCompleted(id) { return faydaFirstOpen(id) === -1; }
function faydaStarted(id) { return faydaDoneCount(id) > 0; }
function faydaInWallet(id) { return state.fayda.wallet.some(w => w.id === id); }
// Sayaç görev ilerleme metni (ör. "1 / 3 kategori" · "1.250 / 3.000 TL")
function faydaLevelProg(id, i) {
  const lv = faydaLevels(id)[i], cur = faydaProg(id)[i], goal = faydaGoal(lv);
  const fmt = lv.money ? (n) => n.toLocaleString('tr-TR') : (n) => n;
  return `${fmt(cur)} / ${fmt(goal)} ${lv.unit}`;
}

// Fayda türüne ince accent (yalnız ikon/ilerleme/çip; ekran gövdesi mavi)
const FAYDA_ACC = { limit: '#0e63b3', kart: '#7a5af0', faiz: '#0f9d8e', eft: '#00a9e0', worldpuan: '#c99a2e' };

// Hub — aktif yolculuk kartı + sade yolculuk listesi + Fayda Cüzdanım girişi
function FaydaHub() {
  const wc = state.fayda.wallet.length;
  const active = FAYDA_BENEFITS.find(b => faydaStarted(b.id) && !faydaCompleted(b.id) && !faydaInWallet(b.id));
  const activeCount = FAYDA_BENEFITS.filter(b => faydaStarted(b.id) && !faydaCompleted(b.id) && !faydaInWallet(b.id)).length;
  const notStarted = FAYDA_BENEFITS.filter(b => !faydaStarted(b.id) && !faydaInWallet(b.id)).length;
  const walletStack = state.fayda.wallet.slice(0, 3).map(w => {
    const wb = faydaBenefit(w.id);
    return `<span class="fy-we-chip" style="--fy-acc:${FAYDA_ACC[w.id] || 'var(--primary)'}">${wb ? I[wb.icon] : I.star}</span>`;
  }).join('');
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Ödül Yolu</div>
      <button class="icon-btn" data-action="toast" data-msg="Bilgilendirme prototipte aktif değil">${I.info}</button>
    </div>
    <div class="screen-scroll">
      <div class="fy-hero">
        <div class="fy-hero-glow"></div>
        <h1 class="fy-h1">Hedefini seç, ödülüne ulaş</h1>
        <p class="fy-sub">Her yol 5 level. Level'ları geçtikçe yolun sonundaki ödüle yaklaşır, o ödülü kazanırsın.</p>
        <div class="fy-stats">
          <div class="fy-stat"><div class="fy-stat-top"><span class="fy-stat-ic">🏆</span><b>${wc}</b></div><span>Kazanılan ödül</span></div>
          <div class="fy-stat"><div class="fy-stat-top"><span class="fy-stat-ic">🔥</span><b>${activeCount}</b></div><span>Devam eden</span></div>
          <div class="fy-stat"><div class="fy-stat-top"><span class="fy-stat-ic">🧭</span><b>${notStarted}</b></div><span>Yeni yol</span></div>
        </div>
      </div>
      <div class="fy-wallet-entry ${wc ? 'has' : ''}" data-action="fy-wallet">
        <span class="fy-we-ico">${I.star}</span>
        <div class="fy-we-mid"><div class="fy-we-t">Ödüllerim</div><div class="fy-we-s">${wc ? wc + ' ödül · kullanmaya hazır' : 'Kazandığın ödüller burada birikir'}</div></div>
        ${walletStack ? `<div class="fy-we-stack">${walletStack}</div>` : `<span class="chev-r">${I.chevR}</span>`}
      </div>
      <div class="fy-wallet-entry" data-action="route" data-hash="reward-goal">
        <span class="fy-we-ico">${I.world}</span>
        <div class="fy-we-mid"><div class="fy-we-t">Birlikte Kazan</div><div class="fy-we-s">Grup hedefine ulaş, Worldpuan iadesini bölüş</div></div>
        <span class="chev-r">${I.chevR}</span>
      </div>
      ${active ? `<div class="fy-sec-t">Devam eden yolun</div>${faydaActiveCardHTML(active)}` : ''}
      <div class="fy-sec-t">${active ? 'Diğer ödül yolları' : 'Ödül yolları'}</div>
      <div class="fy-cards">${FAYDA_BENEFITS.filter(b => !active || b.id !== active.id).map(faydaCardHTML).join('')}</div>
    </div>
  </div>`;
}
// Büyük aktif yolculuk kartı (ana ekranın üstünde: hemen devam et)
function faydaActiveCardHTML(b) {
  const done = faydaDoneCount(b.id), total = faydaTotal(b.id), pct = Math.round(done / total * 100);
  const next = b.levels[done];
  return `
    <div class="fy-active-card" style="--fy-acc:${FAYDA_ACC[b.id]}" data-action="fy-open" data-id="${b.id}">
      <div class="fy-ac-glow"></div>
      <div class="fy-ac-top">
        <span class="fy-card-ico">${I[b.icon]}</span>
        <div class="fy-ac-h"><div class="fy-ac-t">${b.title}</div><div class="fy-ac-s">Level ${done + 1} / ${total}</div></div>
        <span class="fy-ac-pct">%${pct}</span>
      </div>
      <div class="fy-lv-bar fy-ac-bar"><div class="fy-lv-fill" style="width:${pct}%"></div></div>
      ${next ? `<div class="fy-ac-next"><span class="fy-ac-next-k">Sıradaki</span>${next.t}</div>` : ''}
      <span class="fy-ac-cta">Kaldığın yerden devam et ${I.chevR}</span>
    </div>`;
}
// Ödül yolu kartı (liste) — yolculuğun mini patika-haritası: düğüm + bağlantı + sonda ödül
function faydaCardHTML(b) {
  const done = faydaDoneCount(b.id), total = faydaTotal(b.id);
  const earned = faydaInWallet(b.id);
  const pct = Math.round(done / total * 100);
  let track = '';
  for (let i = 0; i < total; i++) {
    const cls = i < done ? 'done' : (i === done && done < total && !earned ? 'active' : 'locked');
    track += `<span class="fy-tn ${cls}"></span><span class="fy-tl ${i < done ? 'on' : ''}"></span>`;
  }
  track += `<span class="fy-tn reward ${earned ? 'done' : ''}">🎁</span>`;
  return `
    <div class="fy-card ${earned ? 'earned' : ''}" style="--fy-acc:${FAYDA_ACC[b.id]}" data-action="fy-open" data-id="${b.id}">
      <div class="fy-card-top">
        <span class="fy-card-ico">${I[b.icon]}</span>
        <div class="fy-card-h">
          <div class="fy-card-t">${b.title}</div>
          <div class="fy-card-goal"><span class="fy-goal-gift">🎁</span>${b.win}</div>
        </div>
        <span class="fy-card-side">${earned
          ? `<span class="fy-badge-earned">${I.check}</span>`
          : `<span class="fy-card-pct">${done ? '%' + pct : 'Başla'}</span><span class="chev-r">${I.chevR}</span>`}</span>
      </div>
      <div class="fy-track">${track}</div>
      <div class="fy-card-foot">${earned ? 'Ödülün kazanıldı ✓' : (done ? `${done}/${total} level tamamlandı` : `${total} level · yeni yol`)}</div>
    </div>`;
}

// Yolculuk detayı — HUD + ödül hedefi + dikey ödül yolu (level haritası)
function FaydaJourney() {
  const b = faydaBenefit(state.fayda.view);
  if (!b) return FaydaHub();
  const done = faydaDoneCount(b.id), total = faydaTotal(b.id), pct = Math.round(done / total * 100);
  const earned = faydaInWallet(b.id), completed = faydaCompleted(b.id);
  return `
  <div class="screen anim-right" style="--fy-acc:${FAYDA_ACC[b.id]}">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">${b.title}</div>
      <span class="icon-btn" style="visibility:hidden">${I.info}</span>
    </div>
    <div class="screen-scroll fy-journey">
      <div class="fy-hud">
        <div class="fy-hud-lv">${completed ? 'Yol tamamlandı 🎉' : `Level ${Math.min(done + 1, total)} / ${total}`}</div>
        <div class="fy-hud-bar"><div class="fy-hud-fill" style="width:${pct}%"></div></div>
        <div class="fy-hud-pct">${pct}%</div>
      </div>
      <div class="fy-goal">
        <span class="fy-goal-ico">🎁</span>
        <div class="fy-goal-tx"><div class="fy-goal-k">Yolun sonundaki ödül</div><div class="fy-goal-v">3 ödülden birini seç</div></div>
      </div>
      ${faydaMapHTML(b)}
    </div>
    <div class="screen-cta">${faydaCTAHTML(earned, completed)}</div>
  </div>`;
}
// Yolculuk CTA'sı — hem tam render hem kısmi güncelleme aynı kaynağı kullansın
function faydaCTAHTML(earned, completed) {
  return earned
    ? `<button class="btn-primary" data-action="fy-wallet">Ödüllerime git</button>`
    : completed
      ? `<button class="btn-primary" data-action="fy-reward">🎁 Ödülünü seç</button>`
      : `<button class="btn-ghost" data-action="fy-change">Başka ödül seç</button>`;
}
// Dikey ödül yolu — büyük düğümler, bağlantı yolu, aktif level nabız + inline CTA, sonda ödül
function faydaMapHTML(b) {
  const rows = b.levels.map((lv, i) => {
    const st = faydaLevelStatus(b.id, i), counter = faydaGoal(lv) > 1;
    const node = st === 'done' ? `<span class="fy-mnode done">${I.check}</span>`
      : st === 'active' ? `<span class="fy-mnode active">${i + 1}</span>`
      : `<span class="fy-mnode locked">${I.lock}</span>`;
    let body;
    if (st === 'active') {
      body = `${counter ? `<div class="fy-mprog"><div class="fy-lv-bar"><div class="fy-lv-fill" style="width:${Math.round(faydaProg(b.id)[i] / faydaGoal(lv) * 100)}%"></div></div><span class="fy-lv-ct">${faydaLevelProg(b.id, i)}</span></div>` : ''}<button class="fy-mcta" data-action="${lv.options ? 'fy-openlevel' : 'fy-step'}" data-b="${b.id}" data-i="${i}">${lv.cta} ${I.chevR}</button>`;
    } else if (st === 'done') {
      body = `<div class="fy-msub">${lv.options ? (state.fayda.choice[b.id] || 'Seçildi') : 'Tamamlandı'}</div>`;
    } else {
      body = `<div class="fy-msub">Level ${i} bitince açılır</div>`;
    }
    return `
      <div class="fy-mrow ${st}">
        <div class="fy-mrail">${node}<span class="fy-mline"></span></div>
        <div class="fy-mbody"><div class="fy-mlv">Level ${i + 1}</div><div class="fy-mt">${lv.t}</div>${body}</div>
      </div>`;
  }).join('');
  return `
    <div class="fy-map">
      ${rows}
      <div class="fy-mrow goal ${faydaCompleted(b.id) ? 'done' : ''}">
        <div class="fy-mrail"><span class="fy-mnode goal">${I.star}</span></div>
        <div class="fy-mbody"><div class="fy-mlv acc">Ödülün</div><div class="fy-mt">Ödülünü seç</div><div class="fy-msub reward">Yolu tamamlayınca ödülün burada açılır.</div></div>
      </div>
    </div>`;
}

// Fayda Cüzdanım — kupon kartları (Aktif / Değerlendirmedekiler)
function FaydaWallet() {
  const w = state.fayda.wallet;
  const active = w.filter(x => x.status !== 'pending');
  const pending = w.filter(x => x.status === 'pending');
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Ödüllerim</div>
      <span class="icon-btn" style="visibility:hidden">${I.info}</span>
    </div>
    <div class="screen-scroll">
      ${w.length ? `
        ${active.length ? `<div class="fy-sec-t">Aktif ödüller</div><div class="fy-coupons">${active.map(faydaCouponHTML).join('')}</div>` : ''}
        ${pending.length ? `<div class="fy-sec-t">Sonucu beklenenler</div><div class="fy-coupons">${pending.map(faydaCouponHTML).join('')}</div>` : ''}
        <div class="fy-wallet-note">${I.info} Ödüllerin kullanım koşulları ve süresi ürün detayında yer alır. Bu ekran prototip amaçlıdır.</div>
      ` : `
      <div class="fy-empty">
        <div class="fy-empty-ico">${I.star}</div>
        <h3>Henüz ödül kazanmadın</h3>
        <p>Bir ödül yolu seç, level'ları tamamla; kazandığın ödüller burada birikir.</p>
        <button class="btn-primary" style="max-width:240px" data-action="fy-change">Ödül yollarını keşfet</button>
      </div>`}
    </div>
  </div>`;
}
function faydaCouponHTML(item) {
  const b = faydaBenefit(item.id), acc = FAYDA_ACC[item.id] || '#0098cb';
  const pending = item.status === 'pending';
  return `
    <div class="fy-coupon ${pending ? 'pending' : ''}" style="--fy-acc:${acc}" data-action="fy-open" data-id="${item.id}">
      <div class="fy-cp-top">
        <span class="fy-card-ico">${b ? I[b.icon] : I.star}</span>
        <div class="fy-cp-h"><div class="fy-cp-t">${item.label}</div><div class="fy-cp-s">${item.meta}</div></div>
        <span class="fy-wi-status ${item.status}">${pending ? 'Değerlendirmede' : 'Aktif'}</span>
      </div>
      <div class="fy-cp-cta">${pending ? 'Süreci takip et' : (item.id === 'eft' ? 'Kullan' : 'Detayı gör')} ${I.chevR}</div>
    </div>`;
}

/* ---- Fayda Yolculukları akış mantığı ---- */
function faydaOpen(id) { state.fayda.view = id; go('fayda-journey'); }
// Aktif level'ı bir adım ilerlet (binary → tamam, sayaç → +step). Sadece aktif level.
function faydaStep(bId, i) {
  if (i !== faydaFirstOpen(bId)) return;
  const lv = faydaLevels(bId)[i], goal = faydaGoal(lv), p = faydaProg(bId);
  p[i] = Math.min(goal, p[i] + (lv.step || goal));
  const doneNow = p[i] >= goal;
  if (doneNow && lv.final) return faydaUnlock(bId);
  faydaSyncJourney(bId, i, doneNow);
  toast(doneNow ? 'Level tamamlandı ✓' : `Eklendi · ${faydaLevelProg(bId, i)}`);
}
// Kısmi güncelleme — tüm ekranı yeniden çizmeden (titreme/scroll sıçraması yok) sadece
// değişen HUD + aktif level'ı tazeler. structureChanged=false ise yalnızca sayaç barı akar.
function faydaSyncJourney(bId, i, structureChanged) {
  const scr = document.querySelector('.fy-journey');
  const map = scr && scr.querySelector('.fy-map');
  if (state.screen !== 'fayda-journey' || !map) return render();   // ekran değiştiyse güvenli yol
  const b = faydaBenefit(bId);
  const done = faydaDoneCount(bId), total = faydaTotal(bId), pct = Math.round(done / total * 100);
  const completed = faydaCompleted(bId), earned = faydaInWallet(bId);

  // HUD — öğeler korunur, width transition'ı akıcı çalışır
  const fill = scr.querySelector('.fy-hud-fill'); if (fill) fill.style.width = pct + '%';
  const hudLv = scr.querySelector('.fy-hud-lv'); if (hudLv) hudLv.textContent = completed ? 'Yol tamamlandı 🎉' : `Level ${Math.min(done + 1, total)} / ${total}`;
  const hudPct = scr.querySelector('.fy-hud-pct'); if (hudPct) hudPct.textContent = pct + '%';

  if (!structureChanged) {
    // Sadece sayaç ilerledi: aktif level'ın barını yerinde güncelle → akıcı dolum
    const row = map.querySelector('.fy-mrow.active');
    const lv = faydaLevels(bId)[i];
    if (row) {
      const lvFill = row.querySelector('.fy-lv-fill');
      if (lvFill) lvFill.style.width = Math.round(faydaProg(bId)[i] / faydaGoal(lv) * 100) + '%';
      const ct = row.querySelector('.fy-lv-ct'); if (ct) ct.textContent = faydaLevelProg(bId, i);
    }
    return;
  }

  // Yapı değişti (level tamamlandı, sıradaki açıldı): sadece haritayı tazele — ekran kabuğu kalır
  const tmp = document.createElement('div');
  tmp.innerHTML = faydaMapHTML(b);
  map.replaceWith(tmp.firstElementChild);
  const cta = scr.parentElement && scr.parentElement.querySelector('.screen-cta');
  if (cta) cta.innerHTML = faydaCTAHTML(earned, completed);
}
// Seçim gerektiren level (kategori/hedef) — bottom sheet'te chip seçimi
function faydaOpenLevel(bId, i) {
  const lv = faydaLevels(bId)[i];
  if (!lv.options) return faydaStep(bId, i);
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="ru-pick-t">${lv.t}</div>
    <div class="fy-opts">
      ${lv.options.map(o => `<button class="fy-opt ${state.fayda.choice[bId] === o ? 'on' : ''}" data-action="fy-pick-opt" data-b="${bId}" data-i="${i}" data-opt="${o}">${o}</button>`).join('')}
    </div>
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function faydaPickOption(bId, i, opt) {
  state.fayda.choice[bId] = opt;
  const completes = i === faydaFirstOpen(bId);
  if (completes) faydaProg(bId)[i] = faydaGoal(faydaLevels(bId)[i]);   // aktifse level'ı tamamla
  closeSheet();
  faydaSyncJourney(bId, i, completes);
  setTimeout(() => toast('Seçildi ✓'), 150);
}
// Yol tamamlandı → tam ekran ödül seçim ekranına git (3 ödülden biri)
function faydaUnlock(bId) {
  state.fayda.view = bId;
  closeSheet();
  go('fayda-reward');
}
// Tam ekran ödül seçimi — 3 ödül hediye paketinden biri
function FaydaReward() {
  const b = faydaBenefit(state.fayda.view);
  if (!b) return FaydaHub();
  return `
  <div class="screen anim-up fy-rw" style="--fy-acc:${FAYDA_ACC[b.id]}">
    <div class="fy-rw-scroll">
      <div class="fy-rw-head">
        <div class="fy-rw-burst">🎁</div>
        <div class="fy-rw-h1">Yolu tamamladın!</div>
        <p class="fy-rw-sub"><b>${b.title}</b> yolunu bitirdin. Sana özel <b>3 ödülden birini</b> seç — yalnızca birini kazanırsın.</p>
      </div>
      <div class="fy-rw-list">
        ${b.rewards.map((r, i) => `
          <button class="fy-rw-card" style="animation-delay:${90 + i * 120}ms" data-action="fy-pick-reward" data-b="${b.id}" data-r="${i}">
            <span class="fy-rw-ico">${I.star}</span>
            <div class="fy-rw-tx"><div class="fy-rw-t">${r.label}</div><div class="fy-rw-s">${r.meta}</div></div>
            <span class="fy-rw-pick">Seç ${I.chevR}</span>
          </button>`).join('')}
      </div>
      <button class="fy-rw-later" data-action="nav-back">Sonra seçerim</button>
    </div>
  </div>`;
}
function faydaPickReward(bId, i) {
  const r = faydaBenefit(bId).rewards[i];
  if (!faydaInWallet(bId)) state.fayda.wallet.unshift({ id: bId, label: r.label, meta: r.meta, status: r.status });
  state.fayda.view = bId;
  state.nav = [];
  state.screen = 'fayda-wallet';
  render();
  setTimeout(() => toast('Ödülün kazanıldı 🎉'), 200);
}

/* ===================================================================
   HARCAMA ANALİZİ & LİMİT  (Harcamalarım)
   İki ekran: Analiz + Limit (üstte segment). Analiz'de dönem + kart filtresi.
   Limitler hesap geneli (tüm kartlar) hesaplanır; kart filtresi yalnız Analiz'de.
   =================================================================== */
const SPEND_MONTH = 'Bu ay';
const SPEND_DAY = 20, SPEND_DAYS = 30;   // ayın kaçıncı günü / toplam gün
const SPEND_CHANGE = 8;                   // toplamda geçen aya göre % (artış)

// Filtre kartları — 'all' + gerçek kartlar
const SP_CARDS = [
  { id: 'all',       name: 'Tüm kartlar', num: '' },
  { id: 'worldcard', name: 'Worldcard',   num: '1234 56** **** 3333', kind: 'Kredi Kartı' },
  { id: 'tlcard',    name: 'TLcard',       num: '4506 34** **** 8842', kind: 'Banka Kartı' },
];
function spCardObj() { return SP_CARDS.find(c => c.id === state.spendCard) || SP_CARDS[0]; }

// Kategoriler — tutar işyeri kırılımından türetilir. dn: gün, card: filtre, mom: geçen aya göre %
const SPEND_CATS = [
  { id: 'market', name: 'Market', emoji: '🛒', color: '#14A5A0', mom: 12, txns: [
    { m: 'CarrefourSA', s: 'Ataşehir',  d: '18 Haz', dn: 18, a: 902.70, card: 'tlcard' },
    { m: 'Migros',      s: 'Ataşehir',  d: '15 Haz', dn: 15, a: 845.30, card: 'tlcard' },
    { m: 'A101',        s: 'Kadıköy',   d: '11 Haz', dn: 11, a: 780.00, card: 'worldcard' },
    { m: 'Getir',       s: '2 işlem',   d: '06 Haz', dn: 6,  a: 712.50, card: 'worldcard' },
  ]},
  { id: 'giyim', name: 'Giyim', emoji: '👕', color: '#2F6FED', mom: 18, txns: [
    { m: 'Boyner',     s: 'Akasya AVM', d: '17 Haz', dn: 17, a: 1640.00, card: 'worldcard' },
    { m: 'Zara',       s: 'Online',     d: '12 Haz', dn: 12, a: 780.00,  card: 'worldcard' },
    { m: 'LC Waikiki', s: 'Kadıköy',    d: '08 Haz', dn: 8,  a: 520.00,  card: 'tlcard' },
  ]},
  { id: 'yeme', name: 'Yemek', emoji: '🍽️', color: '#F5883E', mom: 9, txns: [
    { m: 'Big Chefs',     s: 'Restoran', d: '19 Haz', dn: 19, a: 720.00, card: 'worldcard' },
    { m: 'Yemeksepeti',   s: '3 sipariş', d: '14 Haz', dn: 14, a: 640.00, card: 'worldcard' },
    { m: 'Kahve Dünyası', s: '4 işlem',  d: '10 Haz', dn: 10, a: 440.00, card: 'tlcard' },
    { m: 'Starbucks',     s: '2 işlem',  d: '07 Haz', dn: 7,  a: 380.00, card: 'worldcard' },
  ]},
  { id: 'fatura', name: 'Düzenli Ödemeler', emoji: '🧾', color: '#8B7FD6', mom: -6, txns: [
    { m: 'Enerjisa',     s: 'Elektrik', d: '13 Haz', dn: 13, a: 720.30, card: 'worldcard' },
    { m: 'İGDAŞ',        s: 'Doğalgaz', d: '13 Haz', dn: 13, a: 610.00, card: 'worldcard' },
    { m: 'Türk Telekom', s: 'İnternet', d: '05 Haz', dn: 5,  a: 540.00, card: 'worldcard' },
  ]},
  { id: 'sigorta', name: 'Sigorta & BES', emoji: '🛡️', color: '#34568B', mom: 4, txns: [
    { m: 'Allianz',           s: 'Tamamlayıcı sağlık', d: '12 Haz', dn: 12, a: 1180.00, card: 'worldcard' },
    { m: 'Allianz Emeklilik', s: 'BES katkı payı',     d: '05 Haz', dn: 5,  a: 750.00,  card: 'worldcard' },
    { m: 'Anadolu Sigorta',   s: 'Kasko',              d: '04 Haz', dn: 4,  a: 640.00,  card: 'tlcard' },
  ]},
  { id: 'akaryakit', name: 'Akaryakıt', emoji: '⛽', color: '#4A6FA5', mom: -11, txns: [
    { m: 'Opet',  s: 'Ataşehir', d: '16 Haz', dn: 16, a: 960.00, card: 'worldcard' },
    { m: 'Shell', s: 'E-5',      d: '09 Haz', dn: 9,  a: 600.00, card: 'tlcard' },
  ]},
  { id: 'saglik', name: 'Sağlık & Bakım', emoji: '💊', color: '#E86AA6', mom: 7, txns: [
    { m: 'Eczane Nur', s: 'Sağlık',        d: '15 Haz', dn: 15, a: 550.00, card: 'tlcard' },
    { m: 'Watsons',    s: 'Kişisel bakım', d: '08 Haz', dn: 8,  a: 430.00, card: 'worldcard' },
  ]},
  { id: 'ulasim', name: 'Ulaşım', emoji: '🚕', color: '#7B61C9', mom: -14, txns: [
    { m: 'Uber',         s: '5 yolculuk', d: '18 Haz', dn: 18, a: 400.00, card: 'worldcard' },
    { m: 'İstanbulkart', s: 'Dolum',      d: '10 Haz', dn: 10, a: 240.00, card: 'tlcard' },
  ]},
  { id: 'eglence', name: 'Eğlence', emoji: '🎬', color: '#7C4DFF', mom: 22, txns: [
    { m: 'Cinemaximum', s: 'Sinema',    d: '14 Haz', dn: 14, a: 510.00, card: 'worldcard' },
    { m: 'Netflix',     s: 'Abonelik',  d: '03 Haz', dn: 3,  a: 150.00, card: 'worldcard' },
    { m: 'Spotify',     s: 'Abonelik',  d: '03 Haz', dn: 3,  a: 60.00,  card: 'worldcard' },
  ]},
  { id: 'diger', name: 'Diğer', emoji: '🧩', color: '#8A8F98', mom: 3, txns: [
    { m: 'Trendyol', s: 'Online', d: '11 Haz', dn: 11, a: 430.00, card: 'worldcard' },
  ]},
];

/* =================== DİJİTAL ABONELİKLER ===================
   Banka gerçek kart hareketinden yinelenen ödemeleri tespit eder — üçüncü
   parti app'lerin aksine tahmin değil, kesin veri. day: ayın ödeme günü ·
   dleft: sonraki ödemeye kalan gün · remind: hatırlatıcı açık mı */
const SUBS = [
  { id: 'netflix', name: 'Netflix',        plan: 'Standart · Reklamsız', cat: 'Dizi & Film', price: 249.99, cycle: 'Aylık', day: 3,  next: '3 Tem',  last: '3 Tem',  dleft: 2,  card: 'worldcard', since: 'Mart 2021', remind: true,  color: '#E50914', logo: 'assets/netflix.png', logoBg: '#000', logoFit: 'cover' },
  { id: 'spotify', name: 'Spotify',        plan: 'Premium Bireysel',     cat: 'Müzik',       price: 59.99,  cycle: 'Aylık', day: 3,  next: '3 Tem',  last: '3 Tem',  dleft: 2,  card: 'worldcard', since: 'Eylül 2019', remind: true, color: '#1DB954', logo: 'assets/spotify.png', priceOld: 49.99 },
  { id: 'youtube', name: 'YouTube Premium', plan: 'Bireysel',            cat: 'Video',       price: 79.99,  cycle: 'Aylık', day: 8,  next: '8 Tem',  last: '8 Tem',  dleft: 7,  card: 'tlcard',    since: 'Ocak 2023', remind: true,  color: '#FF0000', logo: 'assets/youtube.png' },
  { id: 'chatgpt', name: 'ChatGPT Plus',   plan: 'Aylık üyelik',         cat: 'Yapay Zekâ',  price: 799.00, cycle: 'Aylık', day: 10, next: '10 Tem', last: '10 Haz', dleft: 9,  card: 'worldcard', since: 'Kasım 2024', remind: false, color: '#0F9D77', logo: 'assets/chatgpt.png' },
  { id: 'claude',  name: 'Claude Pro',     plan: 'Aylık üyelik',         cat: 'Yapay Zekâ',  price: 799.00, cycle: 'Aylık', day: 14, next: '14 Tem', last: '2 Tem',  dleft: 13, card: 'worldcard', since: 'Temmuz 2026', remind: false, color: '#D97757', logo: 'assets/claude.png', isNew: true },
  { id: 'xbox',    name: 'Xbox Game Pass', plan: 'Ultimate',            cat: 'Oyun',        price: 349.00, cycle: 'Aylık', day: 20, next: '20 Tem', last: '20 Haz', dleft: 19, card: 'tlcard',    since: 'Haziran 2022', remind: true, color: '#107C10', logo: 'assets/xbox.png' },
];
// Kısa tarihi ("3 Tem") uzun forma çevirir ("3 Temmuz 2026") — detay ekranı için
const SUB_MON_LONG = { Oca:'Ocak', Şub:'Şubat', Mar:'Mart', Nis:'Nisan', May:'Mayıs', Haz:'Haziran', Tem:'Temmuz', Ağu:'Ağustos', Eyl:'Eylül', Eki:'Ekim', Kas:'Kasım', Ara:'Aralık' };
function subLastLong(s) {
  if (!s.last) return '—';
  const [d, mon] = s.last.split(' ');
  return `${d} ${SUB_MON_LONG[mon] || mon} 2026`;
}
function subsActive() { return SUBS.filter(s => !s.canceled); }
function subsMonthly() { return subsActive().reduce((s, x) => s + x.price, 0); }
function subsYearly() { return subsMonthly() * 12; }
function subsSorted() { return SUBS.slice().sort((a, b) => (a.canceled ? 99 : 0) - (b.canceled ? 99 : 0) || a.dleft - b.dleft); }
function subsUpcoming() { return subsActive().filter(s => s.dleft <= 3).sort((a, b) => a.dleft - b.dleft); }
function subById(id) { return SUBS.find(s => s.id === id); }
function subStatus(s) {
  if (s.canceled) return { cls: 'off', lbl: 'İptal edildi' };
  return { cls: 'ok', lbl: 'Aktif' };
}
// Marka logosu — dosya varsa görsel, yoksa marka renginde baş harf rozeti
function subLogo(s, size) {
  const cls = 'sub-logo' + (size === 'big' ? ' big' : size === 'mini' ? ' mini' : '') + (s.canceled ? ' off' : '') + (s.logoFit === 'cover' ? ' cover' : '');
  const bg = s.logoBg ? `;--logo-bg:${s.logoBg}` : '';
  return `<span class="${cls}" style="--brand:${s.color}${bg}">
    <img src="${s.logo}" alt="" loading="lazy" onerror="this.parentElement.classList.add('fb');this.remove();">
    <i>${s.name[0]}</i></span>`;
}

/* ---- filtreli (Analiz) hesaplar ---- */
function spCat(id) { return SPEND_CATS.find(c => c.id === id); }
function spCatTxns(c) { return state.spendCard === 'all' ? c.txns : c.txns.filter(t => t.card === state.spendCard); }
function spCatAmt(c) { return spCatTxns(c).reduce((s, t) => s + t.a, 0); }
function spTotal() { return SPEND_CATS.reduce((s, c) => s + spCatAmt(c), 0); }
function spActive() { return SPEND_CATS.filter(c => spCatAmt(c) > 0); }
function spSorted() { return spActive().sort((a, b) => spCatAmt(b) - spCatAmt(a)); }
function spAllTxns() { const a = []; SPEND_CATS.forEach(c => spCatTxns(c).forEach(t => a.push(t))); return a; }
function spMerchants() { return new Set(spAllTxns().map(t => t.m)).size; }
/* ---- tüm-kartlar (Limit) hesaplar — limit hesap geneli bir bütçedir ---- */
function spCatAmtAll(c) { return c.txns.reduce((s, t) => s + t.a, 0); }
function spTotalAll() { return SPEND_CATS.reduce((s, c) => s + spCatAmtAll(c), 0); }
function spSortedAll() { return SPEND_CATS.filter(c => spCatAmtAll(c) > 0).sort((a, b) => spCatAmtAll(b) - spCatAmtAll(a)); }
function spLimit(id) { return state.limits[id] || null; }
function spLimitInfo(c) {
  const lim = spLimit(c.id); if (!lim) return null;
  const spent = spCatAmtAll(c);
  const pct = Math.round(spent / lim * 100);
  const proj = SPEND_DAY ? spent / SPEND_DAY * SPEND_DAYS : spent;
  return { lim, spent, pct, remaining: lim - spent, over: spent > lim, near: pct >= 80 && spent <= lim, proj, projOver: proj > lim };
}
function fmtShortTL(n) { return Math.round(n).toLocaleString('tr-TR') + ' TL'; }
function momTxt(n) { return (n >= 0 ? '+' : '−') + '%' + Math.abs(n); }

/* Standart kategori ikonları — tema-uyumlu monoline (currentColor). Her ekranda aynı. */
const CAT_ICO = {
  market:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.3"/><circle cx="17.5" cy="20" r="1.3"/><path d="M2.5 3.5h2L6.6 15h10.2l1.7-7.5H6.2"/></svg>',
  giyim:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M8.6 3.2 4 6l1.6 2.4L7.5 7v13.5h9V7l1.9 1.4L20 6l-4.6-2.8a3.4 3.4 0 0 1-6.8 0Z"/></svg>',
  yeme:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v6a2 2 0 0 0 4 0V3M8 11v10M15.5 3c-1.4 0-2.3 2-2.3 4.4S14.1 12 15.5 12v9"/></svg>',
  fatura:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 3v18l2-1.4 2 1.4 2-1.4 2 1.4 2-1.4 2 1.4V3l-2 1.4-2-1.4-2 1.4-2-1.4-2 1.4z"/><path d="M8.5 8.5h7M8.5 12.5h7"/></svg>',
  akaryakit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 21V5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v16M3.5 21h11M5.5 11h7M13.5 8l2.4 2.4V16a1.7 1.7 0 0 0 3.4 0V9.5L16.5 6.5"/></svg>',
  saglik:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.5S4.5 16 4.5 10.6A3.7 3.7 0 0 1 12 8.2a3.7 3.7 0 0 1 7.5 2.4c0 5.4-7.5 9.9-7.5 9.9Z"/></svg>',
  sigorta:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 5.5v5.2c0 4.4 3 7.6 7 9.3 4-1.7 7-4.9 7-9.3V5.5L12 3Z"/><path d="M9.2 12.2l2 2 3.6-3.9"/></svg>',
  ulasim:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13.5 4.8 8a2 2 0 0 1 1.9-1.3h10.6A2 2 0 0 1 19.2 8L21 13.5V18h-2.4M3 13.5V18h2.4M3 13.5h18"/><circle cx="7" cy="18" r="1.5"/><circle cx="17" cy="18" r="1.5"/></svg>',
  eglence:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M10.2 8.4v7.2l6-3.6z" fill="currentColor" stroke="none"/></svg>',
  diger:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.6"/></svg>',
};
function spIco(c, size) { const col = (c && c.color) || '#8A8F98'; return `<span class="sp-ico ${size || ''}" style="background:${col}">${(c && CAT_ICO[c.id]) || CAT_ICO.diger}</span>`; }

/* ---- Donut ---- */
function spDonutParts() {
  const cats = spSorted(); const total = spTotal() || 1;
  const parts = cats.slice(0, 4).map(c => ({ name: c.name, color: c.color, amt: spCatAmt(c) }));
  const rest = cats.slice(4).reduce((s, c) => s + spCatAmt(c), 0);
  if (rest > 0) parts.push({ name: 'Diğer', color: '#8A8F98', amt: rest });
  return parts.map(p => ({ ...p, pct: Math.round(p.amt / total * 100) }));
}
function spDonut() {
  const parts = spDonutParts();
  const total = parts.reduce((s, p) => s + p.amt, 0) || 1;
  let acc = 0; const stops = [];
  parts.forEach(p => { const f = acc / total * 100; acc += p.amt; const to = acc / total * 100; stops.push(`${p.color} ${f.toFixed(2)}% ${to.toFixed(2)}%`); });
  if (!stops.length) stops.push('#8A8F98 0% 100%');
  return `
    <div class="sp-donut" style="background:conic-gradient(${stops.join(',')})">
      <div class="sp-donut-hole"><div class="sp-donut-amt">${fmtShortTL(spTotal())}</div><div class="sp-donut-lbl">Toplam</div></div>
    </div>
    <div class="sp-legend">${parts.map(p => `<div class="sp-leg"><span class="sp-leg-dot" style="background:${p.color}"></span><span class="sp-leg-pct">%${p.pct}</span><span class="sp-leg-n">${p.name}</span></div>`).join('')}</div>`;
}

/* ---- Kümülatif çizgi + geçen ay hayalet eğrisi ---- */
function spLineChart() {
  const txns = spAllTxns().slice().sort((a, b) => a.dn - b.dn);
  const W = 300, H = 92;
  let cum = 0; const pts = [[0, 0]];
  txns.forEach(t => { cum += t.a; pts.push([t.dn, cum]); });
  const curTotal = cum;
  const prevTotal = curTotal / (1 + SPEND_CHANGE / 100);
  const maxV = Math.max(curTotal, prevTotal, 1);
  const X = d => d / SPEND_DAYS * W;
  const Y = v => H - (v / maxV) * (H - 8);
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${X(p[0]).toFixed(1)} ${Y(p[1]).toFixed(1)}`).join(' ');
  const last = pts[pts.length - 1];
  const area = `${line} L${X(last[0]).toFixed(1)} ${H} L0 ${H} Z`;
  const gf = [0, .28, .52, .76, 1], gd = [0, 8, 15, 22, 30];
  const ghost = gd.map((d, i) => `${i ? 'L' : 'M'}${X(d).toFixed(1)} ${Y(prevTotal * gf[i]).toFixed(1)}`).join(' ');
  return `
    <svg class="sp-line" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
      <defs><linearGradient id="spg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--primary)" stop-opacity=".22"/>
        <stop offset="1" stop-color="var(--primary)" stop-opacity="0"/>
      </linearGradient></defs>
      <path d="${ghost}" fill="none" stroke="var(--text-faint)" stroke-width="1.6" stroke-dasharray="4 4" opacity=".75" vector-effect="non-scaling-stroke"/>
      <path d="${area}" fill="url(#spg)"/>
      <path d="${line}" fill="none" stroke="var(--primary)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
      <line x1="${X(last[0]).toFixed(1)}" y1="0" x2="${X(last[0]).toFixed(1)}" y2="${H}" stroke="var(--primary)" stroke-width="1" stroke-dasharray="3 3" opacity=".45" vector-effect="non-scaling-stroke"/>
    </svg>`;
}

/* ---- Ortak üst başlık: segment + filtreler (kart yalnız Analiz'de) ---- */
function spHeader(active) {
  const card = spCardObj();
  const showCard = active === 'insights';
  return `
    <div class="nav-head sp-nav-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Harcamalarım</div>
      <button class="icon-btn" data-action="toast" data-msg="Bilgilendirme prototipte aktif değil">${I.info}</button>
    </div>
    <div class="sp-top">
      <div class="sp-seg">
        <button class="sp-seg-b ${active === 'insights' ? 'on' : ''}" data-action="sp-seg" data-seg="insights">Analiz</button>
        <button class="sp-seg-b ${active === 'limits' ? 'on' : ''}" data-action="sp-seg" data-seg="limits">Limit</button>
      </div>
      <div class="sp-filters ${showCard ? '' : 'solo'}">
        <button class="sp-fpill" data-action="sp-period"><span class="sp-fp-ic">${I.calendar}</span><span>${SPEND_MONTH}</span>${I.chevDown}</button>
        ${showCard ? `<button class="sp-fpill" data-action="sp-cardpick"><span class="sp-fp-ic">${I.card}</span><span>${card.name}</span>${I.chevDown}</button>` : ''}
      </div>
    </div>`;
}

/* =================== ANALİZ EKRANI =================== */
function InsightsScreen() {
  const total = spTotal();
  const cats = spSorted();
  const top = cats.slice(0, 4);
  const rest = cats.slice(4);
  const restSum = rest.reduce((s, c) => s + spCatAmt(c), 0);
  const inc = SPEND_CHANGE >= 0;
  return `
  <div class="screen anim-right sp-screen">
    ${spHeader('insights')}
    <div class="screen-scroll">
      <div class="sp-card">
        <div class="sp-sum-label">Toplam Harcama</div>
        <div class="sp-sum-amt">${fmtTL2(total)}</div>
        <div class="sp-chg ${inc ? 'inc' : 'dec'}"><span class="sp-chg-ic">${I.trendUp}</span><b>${momTxt(SPEND_CHANGE)}</b> geçen aya göre</div>
        <div class="sp-donut-wrap">${spDonut()}</div>
        <div class="sp-line-wrap">
          <span class="sp-today">Bugün</span>
          ${spLineChart()}
          <div class="sp-x"><span>1</span><span>8</span><span>15</span><span>22</span><span>30</span></div>
          <div class="sp-line-legend"><span class="ll cur">Bu ay</span><span class="ll prev">Geçen ay</span></div>
        </div>
      </div>

      <div class="sp-card pad0">
        <div class="sp-card-h row"><span>Kategoriye göre harcamalar</span><button class="sp-link" data-action="sp-allcats">Tümü ${I.chevR}</button></div>
        <div class="sp-cat-list">
          ${top.map(c => spCatRow(c, total)).join('')}
          ${rest.length ? `<div class="sp-cat" data-action="sp-allcats">
            <span class="sp-ico" style="background:#8A8F98">${I.grid}</span>
            <div class="sp-cat-mid"><div class="sp-cat-n">Diğer kategoriler</div><div class="sp-cat-sub">${rest.length} kategori</div></div>
            <span class="sp-cat-a">${fmtTL2(restSum)}</span>
            <span class="sp-cat-chev">${I.chevR}</span>
          </div>` : ''}
        </div>
      </div>

      <div class="sp-hab-head"><span>Harcama Alışkanlıkların</span><button class="sp-link" data-action="toast" data-msg="Tüm içgörüler prototipte aktif değil">Tümü ${I.chevR}</button></div>
      <div class="sp-hab-scroll">
        ${spHabitDay()}
        ${spHabitSubs()}
        ${spHabitConc()}
        ${spHabitBiggest()}
        ${spHabitDaily()}
        ${spHabitMerch()}
      </div>

      <div class="sp-foot-note">${I.lock} Veriler bu aya kadar günceldir.</div>
    </div>
  </div>`;
}

// Analiz kategori satırı — sade: ikon + isim + (%pay · geçen aya göre) + tutar
function spCatRow(c, total) {
  const amt = spCatAmt(c);
  const pct = total ? Math.round(amt / total * 100) : 0;
  return `
    <div class="sp-cat" data-action="sp-cat" data-id="${c.id}">
      ${spIco(c)}
      <div class="sp-cat-mid"><div class="sp-cat-n">${c.name}</div><div class="sp-cat-sub">%${pct} · geçen aya göre ${momTxt(c.mom)}</div></div>
      <span class="sp-cat-a">${fmtTL2(amt)}</span>
      <span class="sp-cat-chev">${I.chevR}</span>
    </div>`;
}

/* Tüm kategoriler (Tümü) */
function AllCatsScreen() {
  const total = spTotal();
  const cats = spSorted();
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Kategoriler</div>
      <span class="icon-btn" style="visibility:hidden">${I.info}</span>
    </div>
    <div class="screen-scroll">
      <div class="sp-card pad0" style="margin-top:14px"><div class="sp-cat-list">${cats.map(c => spCatRow(c, total)).join('')}</div></div>
      <div class="sp-foot-note">${I.lock} ${state.spendCard !== 'all' ? spCardObj().name + ' harcamaları' : 'Tüm kartlar'} · ${SPEND_MONTH}</div>
    </div>
  </div>`;
}

/* Alışkanlık kartları — çeşitli, çoğu canlı veriden (yatay kaydırma) */
const SP_WK_LBL = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cts', 'Paz'];
function spWeekday() { const s = [0, 0, 0, 0, 0, 0, 0]; spAllTxns().forEach(t => { s[(t.dn - 1) % 7] += t.a; }); return s; }
function spBiggest() { return spAllTxns().slice().sort((a, b) => b.a - a.a)[0]; }
function spSubs() { const s = spAllTxns().filter(t => t.s === 'Abonelik'); return { sum: s.reduce((x, t) => x + t.a, 0), count: s.length }; }
function spHabitDay() {
  const w = spWeekday(); const max = Math.max(...w, 1); const mi = w.indexOf(Math.max(...w));
  const full = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
  return `
    <div class="sp-hab">
      <div class="sp-hab-ico blue">${I.calendar}</div>
      <div class="sp-hab-lbl">En çok harcadığın gün</div>
      <div class="sp-hab-big">${full[mi]}</div>
      <div class="sp-hab-sub">O gün ${fmtShortTL(w[mi])}</div>
      <div class="sp-week">${w.map((v, i) => `<div class="sp-wk"><div class="sp-wk-track"><div class="sp-wk-bar ${i === mi ? 'on' : ''}" style="height:${Math.round(v / max * 100)}%"></div></div><div class="sp-wk-d ${i === mi ? 'on' : ''}">${SP_WK_LBL[i]}</div></div>`).join('')}</div>
    </div>`;
}
function spHabitConc() {
  const total = spTotal() || 1;
  const pct = Math.round((spCatAmt(spCat('market')) + spCatAmt(spCat('yeme'))) / total * 100);
  return `
    <div class="sp-hab">
      <div class="sp-hab-ico green">${I.pie}</div>
      <div class="sp-hab-lbl">Harcamalarının</div>
      <div class="sp-hab-big">%${pct}'i</div>
      <div class="sp-hab-sub">market ve yemek kategorilerinde</div>
      <button class="sp-hab-btn" data-action="toast" data-msg="Detay prototipte aktif değil">Detayları Gör</button>
    </div>`;
}
function spHabitBiggest() {
  const t = spBiggest();
  return `
    <div class="sp-hab">
      <div class="sp-hab-ico amber">${I.receipt}</div>
      <div class="sp-hab-lbl">En büyük tek harcama</div>
      <div class="sp-hab-big">${fmtShortTL(t ? t.a : 0)}</div>
      <div class="sp-hab-sub">${t ? t.m + ' · ' + t.d : '—'}</div>
    </div>`;
}
function spHabitDaily() {
  const avg = spTotal() / SPEND_DAY;
  return `
    <div class="sp-hab">
      <div class="sp-hab-ico teal">${I.wallet2}</div>
      <div class="sp-hab-lbl">Günlük ortalama</div>
      <div class="sp-hab-big">${fmtShortTL(avg)}</div>
      <div class="sp-hab-sub">bu ay · ${SPEND_DAY} gün</div>
    </div>`;
}
function spHabitSubs() {
  return `
    <div class="sp-hab tap" data-action="subs-open">
      <div class="sp-hab-ico purple">${I.refresh}</div>
      <div class="sp-hab-lbl">Abonelikler</div>
      <div class="sp-hab-big">${fmtShortTL(subsMonthly())}</div>
      <div class="sp-hab-sub">${subsActive().length} dijital abonelik · aylık yenilenen</div>
      <div class="sp-hab-cta">Yönet ${I.chevR}</div>
    </div>`;
}
function spHabitMerch() {
  return `
    <div class="sp-hab">
      <div class="sp-hab-ico blue">${I.bank}</div>
      <div class="sp-hab-lbl">Bu ay</div>
      <div class="sp-hab-big">${spMerchants()}</div>
      <div class="sp-hab-sub">farklı iş yeri ile alışveriş yaptın</div>
      <button class="sp-hab-btn" data-action="toast" data-msg="İş yerleri prototipte aktif değil">İş Yerlerini Gör</button>
    </div>`;
}

/* =================== ABONELİK EKRANI =================== */
// Bankanın gerçek kart verisinden türeyen içgörüler
function subsRaised() { return subsActive().find(s => s.priceOld); }              // ücreti artan abonelik
function subsNew() { return subsActive().find(s => s.isNew); }                    // bu ay ilk çekimi yapılan
function subsShare() { const t = spTotalAll(); return t ? Math.round(subsMonthly() / t * 100) : 0; }  // toplam harcamadaki pay
function subsInsights() {
  const out = [];
  const z = subsRaised();
  if (z) { const pct = Math.round((z.price - z.priceOld) / z.priceOld * 100);
    out.push({ id: z.id, cls: 'up', ic: I.trendUp, t: `${z.name} ücreti bu ay %${pct} arttı`, s: `${fmtTL2(z.priceOld)} → ${fmtTL2(z.price)} · kart hareketinden tespit edildi` }); }
  out.push({ cls: 'pie', ic: I.pie, t: `Abonelikler, kart harcamanın %${subsShare()}’i`, s: `Bu ay ${fmtTL2(subsMonthly())} · toplam harcaman ${fmtShortTL(spTotalAll())}` });
  const n = subsNew();
  if (n) out.push({ id: n.id, cls: 'new', ic: I.plus, t: `Yeni abonelik başladı: ${n.name}`, s: `Bu ay ilk çekim yapıldı · ${fmtTL2(n.price)}/ay` });
  return out;
}
function SubsScreen() {
  const up = subsUpcoming();
  const list = subsSorted();
  const ins = subsInsights();
  return `
  <div class="screen anim-right sp-screen">
    <div class="nav-head sp-nav-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Aboneliklerim</div>
      <button class="icon-btn" data-action="toast" data-msg="Abonelik ayarları prototipte aktif değil">${I.gear}</button>
    </div>
    <div class="sp-top">
      <div class="sp-filters">
        <button class="sp-fpill" data-action="toast" data-msg="Dönem seçimi prototipte aktif değil"><span class="sp-fp-ic">${I.calendar}</span><span>Bu ay</span>${I.chevDown}</button>
        <button class="sp-fpill" data-action="toast" data-msg="Kart seçimi prototipte aktif değil"><span class="sp-fp-ic">${I.card}</span><span>Tüm kartlar</span>${I.chevDown}</button>
      </div>
    </div>
    <div class="screen-scroll">

      <!-- Özet -->
      <div class="sp-card">
        <div class="sp-sum-label">Bu ay aboneliklerin</div>
        <div class="sp-sum-amt">${fmtTL2(subsMonthly())}</div>
        <div class="sub-hero-meta"><b>${subsActive().length}</b> aktif abonelik</div>
        <button class="sub-detect" data-action="toast" data-msg="Abonelikler World Pay ve kart hareketlerinden otomatik tespit edilir">Kart hareketlerinden tespit edildi ${I.info}</button>
      </div>

      ${up.length ? `
      <!-- Yaklaşan ödeme — tek satır sade özet -->
      <div class="sub-up">
        <div class="sub-up-logos">${up.slice(0, 3).map(s => subLogo(s, 'mini')).join('')}</div>
        <div class="sub-up-mid">
          <div class="sub-up-t">Yaklaşan ödeme</div>
          <div class="sub-up-s">${up.map(s => s.name).join(', ')} · ${up[0].next}</div>
        </div>
        <div class="sub-up-amt">${fmtTL2(up.reduce((a, s) => a + s.price, 0))}</div>
      </div>` : ''}

      <!-- Tüm abonelikler -->
      <div class="sp-card pad0">
        <div class="sp-card-h row"><span>Tüm aboneliklerin</span><button class="sp-link" data-action="toast" data-msg="Manuel abonelik ekleme prototipte aktif değil">Ekle ${I.plus}</button></div>
        <div class="sub-list">${list.map(subRow).join('')}</div>
      </div>

      <!-- Akıllı içgörü -->
      <div class="sub-insight-card">
        <div class="sub-ic-head">${I.spark}<span>Akıllı içgörü</span></div>
        <div class="sub-ins-list">
          ${ins.map(x => `
            <div class="sub-ins${x.id ? ' tap' : ''}"${x.id ? ` data-action="sub-open" data-id="${x.id}"` : ''}>
              <span class="sub-ins-ic ${x.cls}">${x.ic}</span>
              <div class="sub-ins-mid"><b>${x.t}</b><span>${x.s}</span></div>
              ${x.id ? `<span class="sp-cat-chev">${I.chevR}</span>` : ''}
            </div>`).join('')}
        </div>
      </div>

      <div class="sp-foot-note">${I.lock} Abonelikler kart hareketlerinden otomatik tespit edilir. İptal ettiğin çekim World Pay tarafında da durur.</div>
    </div>
  </div>`;
}

// Abonelik satırı — logo · ad/paket · son ödeme · tutar · durum rozeti
function subRow(s) {
  const st = subStatus(s);
  return `
    <div class="sub-row ${s.canceled ? 'off' : ''}" data-action="sub-open" data-id="${s.id}">
      ${subLogo(s)}
      <div class="sub-mid">
        <div class="sub-n">${s.name}</div>
        <div class="sub-s">${s.plan}</div>
        <div class="sub-next">${s.canceled ? 'Yenileme durduruldu' : 'Son ödeme · ' + s.last}</div>
      </div>
      <div class="sub-right">
        <div class="sub-a">${fmtTL2(s.price)}</div>
        <span class="sub-pill ${st.cls}">${st.lbl}</span>
      </div>
    </div>`;
}

/* =================== ABONELİK DETAY =================== */
function SubDetailScreen() {
  const s = subById(state.subId) || SUBS[0];
  const st = subStatus(s);
  const cardName = s.card === 'tlcard' ? 'TLcard' : 'Worldcard';
  const cardMask = s.card === 'tlcard' ? 'TLcard •••• 8842' : 'Worldcard •••• 3333';
  return `
  <div class="screen anim-right sp-screen">
    <div class="nav-head sp-nav-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">${s.name}</div>
      <span class="icon-btn" style="visibility:hidden">${I.info}</span>
    </div>
    <div class="screen-scroll">

      <!-- Hero -->
      <div class="sub-hero">
        ${subLogo(s, 'big')}
        <div class="sub-hero-name">${s.name}</div>
        <div class="sub-hero-plan">${s.plan} · ${s.cat}</div>
        <div class="sub-hero-price">${fmtTL2(s.price)}<span>/ay</span></div>
        <span class="sub-pill ${st.cls} lg">${st.lbl}</span>
      </div>

      ${s.canceled ? `<div class="sub-cancelled-note">${I.check} Bu karttan yenileme durduruldu. Sonraki çekim reddedilecek.</div>` : ''}

      <!-- Ödeme geçmişi -->
      <div class="sp-card">
        <div class="sp-card-h row" style="padding:0 0 12px"><span>Ödeme Geçmişi</span><span class="sub-card-sub">son 6 ay</span></div>
        ${subHistory(s)}
      </div>

      <!-- Ödeme bilgileri -->
      <div class="sp-card pad0">
        <div class="sp-card-h">Ödeme bilgileri</div>
        <div class="sub-info"><span>Son ödeme</span><b>${s.canceled ? '—' : subLastLong(s)}</b></div>
        <div class="sub-info tap" data-action="toast" data-msg="Kart detayı prototipte aktif değil"><span>Ödeme kartı</span><b class="sub-info-link">${cardMask} ${I.chevR}</b></div>
        <div class="sub-info"><span>Yenileme sıklığı</span><b>${s.cycle}</b></div>
        <div class="sub-info"><span>Üyelik başlangıcı</span><b>${s.since}</b></div>
      </div>

      <!-- Bildirimler ve işlemler -->
      <div class="sp-card pad0">
        <div class="sp-card-h">Bildirimler ve işlemler</div>
        ${s.canceled ? '' : `
        <div class="sub-act" data-action="sub-remind" data-id="${s.id}">
          <span class="sub-act-ic">${I.bell}</span>
          <div class="sub-act-mid"><b>Bildirimler</b><span>Yenileme öncesi ve ödeme sonrası bilgilendir</span></div>
          <span class="switch ${s.remind ? 'on' : ''}"><i></i></span>
        </div>`}
        <div class="sub-act" data-action="toast" data-msg="Kart değişikliği prototipte aktif değil">
          <span class="sub-act-ic">${I.card}</span>
          <div class="sub-act-mid"><b>Kartı değiştir</b><span>${cardName} ile ödeniyor</span></div>
          <span class="sp-cat-chev">${I.chevR}</span>
        </div>
        <div class="sub-act" data-action="toast" data-msg="${s.name} platformuna yönlendirme prototipte aktif değil">
          <span class="sub-act-ic">${I.ext}</span>
          <div class="sub-act-mid"><b>Platformda yönet</b><span>${s.name} hesabına yönlendirilirsin</span></div>
          <span class="sp-cat-chev">${I.chevR}</span>
        </div>
        ${s.canceled
          ? `<div class="sub-act" data-action="sub-resume" data-id="${s.id}">
              <span class="sub-act-ic green">${I.refresh}</span>
              <div class="sub-act-mid"><b>Yenilemeyi tekrar başlat</b><span>Ödeme yeniden aktif olur</span></div>
              <span class="sp-cat-chev">${I.chevR}</span>
            </div>`
          : `<div class="sub-act" data-action="sub-cancel" data-id="${s.id}">
              <span class="sub-act-ic">${I.close}</span>
              <div class="sub-act-mid"><b>İptal et</b><span>İptal adımları veya bu karttan ödemeyi durdur</span></div>
              <span class="sp-cat-chev">${I.chevR}</span>
            </div>`}
      </div>

      <div class="sp-foot-note">${I.lock} Ödeme bilgisi ${cardName} hareketlerinden alınır.</div>
    </div>
  </div>`;
}

// Ödeme geçmişi — son 6 ay. Ücret arttıysa basamaklı (eski→yeni), yoksa düz.
function subHistory(s) {
  const months = ['Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem'];
  const raised = !!s.priceOld;
  const last = months.length - 1;
  const oldH = raised ? Math.round(82 * s.priceOld / s.price) : 82;
  const pct = raised ? Math.round((s.price - s.priceOld) / s.priceOld * 100) : 0;
  return `
    <div class="sub-hist">
      ${months.map((m, i) => `
        <div class="sub-hist-col">
          <div class="sub-hist-track"><div class="sub-hist-bar ${i === last ? 'on' : ''}" style="height:${i === last ? 82 : oldH}%;--brand:${s.color}"></div></div>
          <span class="sub-hist-m">${m}</span>
        </div>`).join('')}
    </div>
    <div class="sub-hist-note">${raised
      ? `Bu ay <b>%${pct} arttı</b> · ${fmtTL2(s.priceOld)} → ${fmtTL2(s.price)}`
      : `Her ay ${fmtTL2(s.price)} · değişiklik yok`}</div>`;
}

/* İptal sheet'i — iki yol: servis rehberi + bankaya özel "ödemeyi durdur" */
function openSubCancelSheet(id) {
  const s = subById(id); if (!s) return;
  const cardName = s.card === 'tlcard' ? 'TLcard' : 'Worldcard';
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>${s.name} aboneliğini iptal et</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <p class="sub-sheet-lead">İki şekilde iptal edebilirsin. Bankadan durdurursan sonraki çekim ${cardName}’a hiç gelmez.</p>
    <div class="sub-cancel-opt" data-action="toast" data-msg="${s.name} iptal rehberi prototipte aktif değil">
      <span class="sub-act-ic">${I.guide}</span>
      <div class="sub-act-mid"><b>${s.name} üzerinden iptal et</b><span>Servisin iptal adımlarına yönlendirir</span></div>
      <span class="sp-cat-chev">${I.chevR}</span>
    </div>
    <div class="sub-cancel-opt danger" data-action="sub-cancel-confirm" data-id="${s.id}">
      <span class="sub-act-ic red">${I.shield}</span>
      <div class="sub-act-mid"><b>Bu karttan ödemeyi durdur</b><span>${cardName}’dan ${s.name}’e giden otomatik ödemeyi engelle</span></div>
      <span class="sp-cat-chev">${I.chevR}</span>
    </div>
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function subCancelConfirm(id) {
  const s = subById(id); if (!s) return;
  s.canceled = true;
  closeSheet();
  render();
  setTimeout(() => toast(`${s.name} ödemesi durduruldu 🛡️`), 200);
}
function subResume(id) {
  const s = subById(id); if (!s) return;
  s.canceled = false;
  render();
  setTimeout(() => toast(`${s.name} yenilemesi tekrar başladı`), 150);
}
function subRemind(id) {
  const s = subById(id); if (!s) return;
  s.remind = !s.remind;
  render();
  setTimeout(() => toast(s.remind ? `${s.name} için hatırlatıcı açıldı 🔔` : `${s.name} hatırlatıcısı kapatıldı`), 150);
}

/* =================== KATEGORİ DETAY =================== */
function InsightsCategoryScreen() {
  const c = spCat(state.spendCat) || SPEND_CATS[0];
  const amt = spCatAmt(c);
  const li = spLimitInfo(c);
  const txns = spCatTxns(c);
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">${c.name}</div>
      <span class="icon-btn" style="visibility:hidden">${I.info}</span>
    </div>
    <div class="screen-scroll">
      <div class="sp-cat-hero">
        ${spIco(c, 'big')}
        <div class="sp-cat-hero-amt">${fmtTL2(amt)}</div>
        <div class="sp-cat-hero-sub">${SPEND_MONTH} · ${txns.length} işlem${state.spendCard !== 'all' ? ' · ' + spCardObj().name : ''}</div>
      </div>

      ${spCatLimitBlock(c, li)}

      <div class="section-title">İşlemler</div>
      <div class="sp-txns">${txns.length ? txns.map(t => `
        <div class="sp-txn">
          <span class="sp-txn-ico" style="background:${c.color}22;color:${c.color}">${initials(t.m)}</span>
          <div class="sp-txn-mid"><div class="sp-txn-m">${t.m}</div><div class="sp-txn-s">${t.s}</div><div class="sp-txn-d">${t.d}</div></div>
          <span class="sp-txn-a">${fmtTL2(t.a)}</span>
        </div>`).join('') : '<div class="sp-empty">Bu kartta bu kategoride işlem yok.</div>'}
      </div>
    </div>
  </div>`;
}
/* Sakin limit çubuğu — near'da uyarı rengi yok (hep sakin); aşımda limit çentiği + minik taşma (mercan) */
function spBar(spent, lim, big) {
  const cls = big ? 'sp-limit-track big' : 'sp-limit-track';
  if (!lim || spent <= lim) {
    const pct = lim ? Math.min(100, Math.round(spent / lim * 100)) : 0;
    return `<div class="${cls}"><div class="sp-limit-fill calm" style="width:${pct}%"></div></div>`;
  }
  const notch = (lim / spent * 100).toFixed(1);
  return `<div class="${cls} over">
    <div class="sp-limit-fill calm" style="width:${notch}%"></div>
    <div class="sp-over-seg" style="left:${notch}%"></div>
    <div class="sp-notch" style="left:${notch}%"></div>
  </div>`;
}
function spCatLimitBlock(c, li) {
  if (!li) return `
    <div class="sp-setlimit" data-action="sp-set-limit" data-id="${c.id}">
      <span class="sp-sl-ico">${I.target}</span>
      <div class="sp-sl-mid"><div class="sp-sl-t">Bu kategoriye limit koy</div><div class="sp-sl-s">Aylık harcamanı kontrol altında tut.</div></div>
      <span class="sp-sl-cta">${I.plus} Ekle</span>
    </div>`;
  const over = li.over;
  return `
    <div class="sp-limit-card ${over ? 'over' : ''}">
      <div class="sp-limit-head"><span>Aylık limit${state.spendCard !== 'all' ? ' · tüm kartlar' : ''}</span><b>${fmtShortTL(li.lim)}</b></div>
      <div class="sp-lim-hero ${over ? 'over' : ''}">${over ? fmtShortTL(-li.remaining) + ' aşıldı' : fmtShortTL(li.remaining) + ' kaldı'}</div>
      ${spBar(li.spent, li.lim)}
      <div class="sp-lim-meta"><span>${fmtShortTL(li.spent)} harcandı</span><span class="sp-lim-pct ${over ? 'over' : ''}">%${li.pct}</span></div>
      <div class="sp-limit-proj">${I.trendUp} Bu hızla ay sonunda ~${fmtShortTL(li.proj)} ${li.projOver ? '· limiti aşabilirsin' : '· limit içinde'}</div>
      <div class="sp-limit-actions">
        <button class="sp-lim-btn" data-action="sp-set-limit" data-id="${c.id}">Limiti düzenle</button>
        <button class="sp-lim-btn ghost" data-action="sp-remove-limit" data-id="${c.id}">Kaldır</button>
      </div>
    </div>`;
}

/* =================== LİMİT EKRANI (hesap geneli) =================== */
function LimitsScreen() {
  const used = spTotalAll();
  const tl = state.totalLimit;
  const rem = tl - used;
  const pct = tl ? Math.round(used / tl * 100) : 0;
  const limited = SPEND_CATS.filter(c => spLimit(c.id)).sort((a, b) => spLimitInfo(b).pct - spLimitInfo(a).pct);
  const sugg = spSuggestion();
  return `
  <div class="screen anim-right sp-screen">
    ${spHeader('limits')}
    <div class="screen-scroll">
      <div class="sp-card sp-sum-card" data-action="sp-edit-total">
        <div class="sp-card-h row"><span>Aylık limit özeti</span><span class="sp-edit-link">Düzenle ${I.chevR}</span></div>
        <div class="sp-sum3">
          <div><div class="sp-s3-l">Toplam limit</div><div class="sp-s3-v">${fmtShortTL(tl)}</div></div>
          <div class="mid"><div class="sp-s3-l">Kullanılan</div><div class="sp-s3-v">${fmtShortTL(used)}</div></div>
          <div><div class="sp-s3-l">Kalan</div><div class="sp-s3-v ${rem < 0 ? 'over' : 'blue'}">${fmtShortTL(rem)}</div></div>
        </div>
        ${spBar(used, tl, true)}
        <div class="sp-sum-note">${I.trendUp} Genel aylık hedefinin <b>%${pct}</b>'i kullanıldı.</div>
      </div>

      <div class="sp-card pad0">
        <div class="sp-card-h">Kategori limitlerin</div>
        <div class="sp-lim-list">${limited.length ? limited.map(spLimRow).join('') : '<div class="sp-empty">Henüz kategori limiti yok. Aşağıdan ekleyebilirsin.</div>'}</div>
      </div>

      ${sugg ? `
      <div class="sp-sugg">
        <div class="sp-sugg-top"><span class="sp-sugg-ico">💡</span><span class="sp-sugg-t">Akıllı öneri</span></div>
        <div class="sp-sugg-s">${sugg.text}</div>
        <button class="sp-out-btn wide" data-action="sp-apply-sugg" data-id="${sugg.id}" data-val="${sugg.val}">${sugg.cta}</button>
      </div>` : ''}

      <div class="sp-foot-note">${I.lock} Limitler yalnızca bilgilendirme amaçlıdır, işlemleri engellemez.</div>
    </div>
    <div class="screen-cta">
      <button class="btn-primary" data-action="sp-add-limit">Yeni kategori limiti ekle ${I.plus}</button>
    </div>
  </div>`;
}
function spLimRow(c) {
  const li = spLimitInfo(c);
  const over = li.over;
  const badge = over ? '<span class="sp-badge over">Limit aşıldı</span>' : '';
  return `
    <div class="sp-lim" data-action="sp-set-limit" data-id="${c.id}">
      ${spIco(c)}
      <div class="sp-lim-mid">
        <div class="sp-lim-top"><span class="sp-lim-n">${c.name}</span>${badge}<span class="sp-cat-chev">${I.chevR}</span></div>
        <div class="sp-lim-hero ${over ? 'over' : ''}">${over ? fmtShortTL(-li.remaining) + ' aşıldı' : fmtShortTL(li.remaining) + ' kaldı'}</div>
        ${spBar(li.spent, li.lim)}
        <div class="sp-lim-meta"><span>${fmtShortTL(li.spent)} harcandı</span><span>Limit ${fmtShortTL(li.lim)}</span></div>
      </div>
    </div>`;
}
// Akıllı öneri — bağlama göre değişir (aşımı artır / limitsiz büyük kategoriye ekle / az kullanılanı düşür)
function spSuggestion() {
  const over = SPEND_CATS.find(c => { const li = spLimitInfo(c); return li && li.over; });
  if (over) { const v = Math.ceil(spCatAmtAll(over) / 500) * 500 + 1000; return { id: over.id, name: over.name, val: v, cta: 'Öneriyi uygula', text: `Geçen 3 ayın harcamalarına göre <b>${over.name}</b> limitini <b>${fmtShortTL(v)}</b> yapman daha uygun olabilir.` }; }
  const big = spSortedAll().find(c => !spLimit(c.id) && spCatAmtAll(c) > 800);
  if (big) { const v = Math.ceil(spCatAmtAll(big) * 1.15 / 500) * 500; return { id: big.id, name: big.name, val: v, cta: 'Limit ekle', text: `En çok harcadığın kategorilerden <b>${big.name}</b> için limit yok. <b>${fmtShortTL(v)}</b> ile başlayabilirsin.` }; }
  const low = SPEND_CATS.find(c => { const li = spLimitInfo(c); return li && li.pct < 45; });
  if (low) { const v = Math.ceil(spCatAmtAll(low) * 1.2 / 500) * 500; return { id: low.id, name: low.name, val: v, cta: 'Öneriyi uygula', text: `<b>${low.name}</b> limitinin çoğu boşta. <b>${fmtShortTL(v)}</b>'ye çekerek bütçeni sıkılaştırabilirsin.` }; }
  return null;
}

/* =================== SHEET'LER =================== */
const SP_PRESETS = [2000, 5000, 10000];
function openLimitSheet(id) {
  const c = spCat(id); if (!c) return;
  const cur = spLimit(id);
  const spent = spCatAmtAll(c);
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sp-sheet-head">
      ${spIco(c)}
      <div><div class="sp-sheet-t">${c.name} limiti</div><div class="sp-sheet-s">Bu ay harcanan: ${fmtShortTL(spent)}</div></div>
    </div>
    <div class="sp-amt-wrap"><input id="sp-limit-input" class="sp-amt-input" type="text" inputmode="numeric" placeholder="0" value="${cur || ''}" autocomplete="off" /><span class="sp-amt-cur">TL</span></div>
    <div class="sp-preset-row">${SP_PRESETS.map(p => `<button class="sp-preset" data-action="sp-limit-preset" data-val="${p}">${p.toLocaleString('tr-TR')} TL</button>`).join('')}</div>
    <div class="sp-sheet-hint">${I.info} Limite yaklaşınca (%80) ve aşınca bildirim gönderilir.</div>
    <button class="sheet-btn" data-action="sp-save-limit" data-id="${id}">${cur ? 'Limiti Güncelle' : 'Limiti Kaydet'}</button>
    ${cur ? `<button class="sheet-btn ghost danger-txt" data-action="sp-remove-limit" data-id="${id}">Limiti Kaldır</button>` : `<button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`}`;
  sheetEl.classList.add('open'); sheetScrimEl.classList.add('open');
  setTimeout(() => { const i = document.getElementById('sp-limit-input'); if (i) i.focus(); }, 250);
}
function openTotalLimitSheet() {
  const cur = state.totalLimit; const used = spTotalAll();
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sp-sheet-head">
      <span class="sp-ico" style="background:var(--navy)">${I.target}</span>
      <div><div class="sp-sheet-t">Toplam aylık limit</div><div class="sp-sheet-s">Bu ay kullanılan: ${fmtShortTL(used)}</div></div>
    </div>
    <div class="sp-amt-wrap"><input id="sp-limit-input" class="sp-amt-input" type="text" inputmode="numeric" placeholder="0" value="${cur || ''}" autocomplete="off" /><span class="sp-amt-cur">TL</span></div>
    <div class="sp-preset-row">${[10000, 20000, 30000].map(p => `<button class="sp-preset" data-action="sp-limit-preset" data-val="${p}">${p.toLocaleString('tr-TR')} TL</button>`).join('')}</div>
    <div class="sp-sheet-hint">${I.info} Genel aylık harcama hedefin. Kategori limitlerinden bağımsızdır.</div>
    <button class="sheet-btn" data-action="sp-save-total">Kaydet</button>
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open'); sheetScrimEl.classList.add('open');
  setTimeout(() => { const i = document.getElementById('sp-limit-input'); if (i) i.focus(); }, 250);
}
function spOpenCardPick() {
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="ru-pick-t">Kart seç</div>
    ${SP_CARDS.map(c => { const on = state.spendCard === c.id;
      return `<div class="ru-pick-row ${on ? 'active' : ''}" data-action="sp-pick-card" data-val="${c.id}">
        <span class="sp-pick-card">${I.card}</span>
        <div class="ru-pick-mid"><div class="ru-pick-n">${c.name}</div><div class="ru-pick-s">${c.num ? c.num + ' · ' + c.kind : 'Tüm kartların toplamı'}</div></div>
        <span class="ru-pick-radio ${on ? 'on' : ''}">${on ? I.check : ''}</span>
      </div>`; }).join('')}
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open'); sheetScrimEl.classList.add('open');
}
function spOpenAddPick() {
  const cats = spSortedAll().filter(c => !spLimit(c.id));
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="ru-pick-t">Limit eklenecek kategori</div>
    ${cats.length ? cats.map(c => `
      <div class="ru-pick-row" data-action="sp-set-limit" data-id="${c.id}">
        ${spIco(c, 'sm')}
        <div class="ru-pick-mid"><div class="ru-pick-n">${c.name}</div><div class="ru-pick-s">Bu ay ${fmtShortTL(spCatAmtAll(c))}</div></div>
        ${I.chevR}
      </div>`).join('') : '<div class="sp-empty">Tüm kategorilerde limit tanımlı.</div>'}
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open'); sheetScrimEl.classList.add('open');
}

/* ---- akış mantığı ---- */
function spSeg(seg) { const target = seg === 'limits' ? 'limits' : 'insights'; if (state.screen !== target) { state.screen = target; render(); } }
function spLimitPreset(val) { const i = document.getElementById('sp-limit-input'); if (i) i.value = val; }
function spSaveLimit(id) {
  const i = document.getElementById('sp-limit-input');
  const val = parseInt((i ? i.value : '').replace(/[^\d]/g, ''), 10);
  if (!val || val <= 0) return toast('Geçerli bir tutar gir');
  state.limits[id] = val; closeSheet(); render();
  setTimeout(() => toast(`${spCat(id).name} limiti ${fmtShortTL(val)} olarak ayarlandı 🎯`), 150);
}
function spSaveTotal() {
  const i = document.getElementById('sp-limit-input');
  const val = parseInt((i ? i.value : '').replace(/[^\d]/g, ''), 10);
  if (!val || val <= 0) return toast('Geçerli bir tutar gir');
  state.totalLimit = val; closeSheet(); render();
  setTimeout(() => toast(`Toplam aylık limit ${fmtShortTL(val)} olarak ayarlandı`), 150);
}
function spRemoveLimit(id) { delete state.limits[id]; closeSheet(); render(); setTimeout(() => toast('Limit kaldırıldı'), 150); }
function spPickCard(id) { state.spendCard = id; closeSheet(); render(); }
function spApplySugg(id, val) { state.limits[id] = val; render(); setTimeout(() => toast(`${spCat(id).name} limiti ${fmtShortTL(val)} yapıldı 💡`), 150); }
function initials(name) { return name.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase(); }

/* =================== ÇOCUK EK KARTI =================== */
function kid() { return state.kid; }
// Çizili mini çocuk kartı — TLcard'ın ru-card-art kalıbının çocuk varyantı (turkuaz + isim)
function kidCardArt() { return `<span class="ru-card-art kid"><i>ÇOCUK EK KART</i><b></b><u>${state.kid.name[0]}</u></span>`; }
function kidSpent() { return kid().txns.reduce((s, t) => s + t.a, 0); }
function kidGoalSaved(g) { return g.kidSaved + g.matched; }
function kidGoalPct(g) { return Math.min(100, Math.round(kidGoalSaved(g) / g.target * 100)); }
function kidGoal(id) { return kid().goals.find(g => g.id === id) || null; }

function KidScreen() {
  const k = kid();
  const spent = kidSpent();
  const lim = k.monthLimit;
  const rem = lim - spent;
  const pct = lim ? Math.min(100, Math.round(spent / lim * 100)) : 0;
  const over = spent > lim;
  return `
  <div class="screen anim-right sp-screen kid-screen">
    <div class="nav-head sp-nav-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Çocuk Ek Kartı</div>
      <button class="icon-btn" data-action="toast" data-msg="Kart ayarları prototipte aktif değil">${I.gear}</button>
    </div>
    <div class="screen-scroll">

      <!-- Kart özeti — Kartlarım kalıbında, sade -->
      <div class="sp-card">
        <div class="acard-top">
          <div class="acard-cardimg kid-cardimg">${kidCardArt()}</div>
          <div>
            <div class="acard-name">Çocuk Ek Kartı <span class="kid-tag">${k.name}</span></div>
            <div class="acard-sub">${k.card} · ${k.age} yaş</div>
          </div>
          ${k.frozen ? '<span class="kid-frozen-pill">Donduruldu</span>' : ''}
        </div>
        <div class="acard-figs">
          <div class="acard-fig"><div class="val">${money(Math.round(k.balance).toLocaleString('tr-TR'))}</div><div class="lbl">Harçlık Bakiyesi</div></div>
          <div class="acard-fig"><div class="val">${money(Math.max(0, rem).toLocaleString('tr-TR'))}</div><div class="lbl">Kalan Aylık Limit</div></div>
        </div>
        <div class="sp-limit-actions">
          <button class="sp-lim-btn" data-action="kid-addmoney">Para Yükle</button>
          <button class="sp-lim-btn ghost" data-action="kid-freeze">${k.frozen ? 'Dondurmayı Kaldır' : 'Kartı Dondur'}</button>
        </div>
      </div>

      <!-- Onay bekleyen — satıra dokun, sheet'ten onayla/reddet (uygulama geneli kalıp) -->
      ${k.pending.length ? `
      <div class="sp-card pad0">
        <div class="sp-card-h row"><span>Onay Bekleyen İşlemler</span><span class="kid-pill">${k.pending.length}</span></div>
        <div class="kid-approve-list">
          ${k.pending.map(p => `
            <div class="kid-approve" data-action="kid-req" data-id="${p.id}">
              <div class="kid-ap-mid">
                <div class="kid-ap-t">${p.merchant}</div>
                <div class="kid-ap-s">${p.note}</div>
              </div>
              <span class="kid-ap-amt">${fmtTL2(p.amount)}</span>
              <span class="sp-cat-chev">${I.chevR}</span>
            </div>`).join('')}
        </div>
      </div>` : ''}

      <!-- Aylık harcama limiti -->
      <div class="sp-card">
        <div class="sp-card-h row"><span>Aylık Harcama Limiti</span><button class="sp-link" data-action="kid-editlimit">Düzenle ${I.chevR}</button></div>
        <div class="sp-lim-hero ${over ? 'over' : ''}">${over ? fmtShortTL(-rem) + ' aşıldı' : fmtShortTL(rem) + ' kaldı'}</div>
        ${spBar(spent, lim)}
        <div class="sp-lim-meta"><span>${fmtShortTL(spent)} harcandı</span><span class="sp-lim-pct ${over ? 'over' : ''}">%${pct} · limit ${fmtShortTL(lim)}</span></div>
      </div>

      <!-- Birikim hedefleri -->
      <div class="sp-card pad0">
        <div class="sp-card-h row"><span>Birikim Hedefleri</span><button class="sp-link" data-action="kid-addgoal">Yeni ${I.plus}</button></div>
        <div class="kid-goal-list">
          ${k.goals.map(kidGoalRow).join('')}
        </div>
        <div class="kid-match-row" data-action="kid-editmatch">
          <div class="kid-ap-mid">
            <div class="kid-ap-t">Veli eşleştirme</div>
            <div class="kid-ap-s">${k.name} 10 TL biriktirince sen ${Math.round(k.matchRate * 10)} TL eklersin</div>
          </div>
          <span class="sp-cat-chev">${I.chevR}</span>
        </div>
      </div>

      <!-- Son harcamalar — ilk 3, tümü sheet'te -->
      <div class="sp-card pad0">
        <div class="sp-card-h row"><span>Son Harcamalar</span><button class="sp-link" data-action="kid-alltxns">Tümü ${I.chevR}</button></div>
        <div class="kid-txns">
          ${k.txns.slice(0, 3).map(kidTxnRow).join('')}
        </div>
      </div>

      <div class="sp-foot-note">${I.lock} Ek kart ${k.name} adına, senin hesabına bağlı çalışır. Limite yaklaşınca ikinize de bildirim gider.</div>
    </div>
  </div>`;
}

function kidGoalRow(g) {
  const saved = kidGoalSaved(g);
  const pct = kidGoalPct(g);
  const done = saved >= g.target;
  return `
    <div class="kid-goal ${done ? 'done' : ''}">
      <span class="kid-goal-emoji">${g.emoji}</span>
      <div class="kid-goal-mid">
        <div class="kid-goal-top"><span class="kid-goal-n">${g.name}</span><span class="kid-goal-a">${fmtShortTL(saved)} / ${fmtShortTL(g.target)}</span></div>
        <div class="sp-limit-track"><div class="sp-limit-fill calm" style="width:${pct}%"></div></div>
        <div class="kid-goal-meta">
          <span>${done ? 'Hedefe ulaşıldı 🎉' : '%' + pct}</span>
          <span>Senin katkın ${fmtShortTL(g.matched)}</span>
        </div>
      </div>
      <button class="kid-goal-add" data-action="kid-contribute" data-id="${g.id}" ${done ? 'disabled' : ''}>${done ? I.check : I.plus}</button>
    </div>`;
}

// İşlem satırı — Harcamalarım işlem kalıbı; logosu olan işyerinde logo, yoksa baş harfler
function kidTxnRow(t) {
  const ico = t.img
    ? `<span class="sp-txn-ico kid-txn-ico logo">${imgOrFallback(t.img, initials(t.m), 'kid-txn-img')}</span>`
    : `<span class="sp-txn-ico kid-txn-ico">${initials(t.m)}</span>`;
  return `
    <div class="sp-txn">
      ${ico}
      <div class="sp-txn-mid"><div class="sp-txn-m">${t.m}</div><div class="sp-txn-s">${t.s}</div><div class="sp-txn-d">${t.d}</div></div>
      <span class="sp-txn-a">${fmtTL2(t.a)}</span>
    </div>`;
}

/* Onay isteği sheet'i — detay + Onayla / Reddet */
function kidOpenReq(id) {
  const p = state.kid.pending.find(x => x.id === id); if (!p) return;
  const isTopup = p.kind === 'harclik';
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>Onay Bekleyen İşlem</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="kid-req-amt">${fmtTL2(p.amount)}</div>
    <div class="kid-req-sub">${p.merchant} · ${p.note}</div>
    <div class="kid-req-rows">
      <div class="r-row"><span class="r-l">İsteyen</span><span class="r-r">${state.kid.name} · Ek Kart</span></div>
      <div class="r-row"><span class="r-l">İşlem</span><span class="r-r">${isTopup ? 'Harçlık talebi' : 'Kart harcaması'}</span></div>
      <div class="r-row"><span class="r-l">${isTopup ? 'Yüklenecek hesap' : 'Ödenecek kart'}</span><span class="r-r">Ek Kart ${state.kid.card.slice(-4)}</span></div>
    </div>
    <button class="sheet-btn" data-action="kid-approve" data-id="${p.id}">Onayla</button>
    <button class="sheet-btn ghost danger-txt" data-action="kid-deny" data-id="${p.id}">Reddet</button>`;
  sheetEl.classList.add('open'); sheetScrimEl.classList.add('open');
}

/* Tüm harcamalar sheet'i */
function kidOpenAllTxns() {
  const k = state.kid;
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>${k.name} · Tüm Harcamalar</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="kid-alltxns">${k.txns.map(kidTxnRow).join('')}</div>
    <button class="sheet-btn ghost" data-action="close-sheet">Kapat</button>`;
  sheetEl.classList.add('open'); sheetScrimEl.classList.add('open');
}

/* ---- Çocuk kartı akış mantığı ---- */
function kidFreeze() {
  state.kid.frozen = !state.kid.frozen;
  render();
  setTimeout(() => toast(state.kid.frozen ? 'Kart donduruldu ❄️ İşlem yapılamaz.' : 'Kart yeniden aktif 💳'), 150);
}
function kidApprove(id) {
  const k = state.kid; const p = k.pending.find(x => x.id === id); if (!p) return;
  k.pending = k.pending.filter(x => x.id !== id);
  if (p.kind === 'harclik') { k.balance += p.amount; }
  else { k.balance = Math.max(0, k.balance - p.amount); k.txns.unshift({ m: p.merchant, s: p.note, d: 'Bugün', a: p.amount }); }
  closeSheet(); render();
  setTimeout(() => toast(`${p.merchant} · ${fmtShortTL(p.amount)} onaylandı`), 150);
}
function kidDeny(id) {
  const k = state.kid; const p = k.pending.find(x => x.id === id); if (!p) return;
  k.pending = k.pending.filter(x => x.id !== id);
  closeSheet(); render();
  setTimeout(() => toast(`${p.merchant} isteği reddedildi`), 150);
}
function kidOpenAddMoney() {
  kidAmountSheet({ title: `${state.kid.name}'e para yükle`, sub: `Bakiye: ${fmtShortTL(state.kid.balance)}`, ico: I.plus, presets: [100, 250, 500], save: 'kid-save-addmoney', cta: 'Yükle' });
}
function kidSaveAddMoney() {
  const v = kidReadAmount(); if (!v) return;
  state.kid.balance += v; closeSheet(); render();
  setTimeout(() => toast(`${fmtShortTL(v)} yüklendi 💳 ${state.kid.name}'in bakiyesi ${fmtShortTL(state.kid.balance)}`), 150);
}
function kidOpenEditLimit() {
  kidAmountSheet({ title: 'Aylık harcama limiti', sub: `${state.kid.name} · bu ay ${fmtShortTL(kidSpent())}`, ico: I.target, presets: [1000, 2000, 3000], save: 'kid-save-limit', cta: 'Kaydet', value: state.kid.monthLimit });
}
function kidSaveLimit() {
  const v = kidReadAmount(); if (!v) return;
  state.kid.monthLimit = v; closeSheet(); render();
  setTimeout(() => toast(`Aylık limit ${fmtShortTL(v)} olarak ayarlandı 🎯`), 150);
}
function kidOpenContribute(id) {
  const g = kidGoal(id); if (!g) return;
  state.kidGoalPick = id;
  kidAmountSheet({ title: `${g.name} hedefine katkı`, sub: `${fmtShortTL(kidGoalSaved(g))} / ${fmtShortTL(g.target)} · veli eşleştirme %${Math.round(state.kid.matchRate * 100)}`, ico: g.emoji, presets: [100, 250, 500], save: 'kid-save-contribute', cta: 'Katkı yap', emoji: true });
}
function kidSaveContribute() {
  const v = kidReadAmount(); if (!v) return;
  const g = kidGoal(state.kidGoalPick); if (!g) return;
  const match = Math.round(v * state.kid.matchRate);
  g.kidSaved += v;
  g.matched += match;
  const done = kidGoalSaved(g) >= g.target;
  closeSheet(); render();
  setTimeout(() => toast(done ? `${g.name} hedefi tamamlandı 🎉` : `${fmtShortTL(v)} + eşleştirme ${fmtShortTL(match)} eklendi`), 150);
}
function kidOpenAddGoal() {
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="ru-pick-t">Yeni birikim hedefi</div>
    ${RU_GOAL_PRESETS.map(g => `
      <div class="ru-pick-row" data-action="kid-newgoal" data-id="${g.id}" data-emoji="${g.emoji}" data-name="${g.name}" data-amount="${g.amount}">
        <span class="kid-goal-emoji">${g.emoji}</span>
        <div class="ru-pick-mid"><div class="ru-pick-n">${g.name}</div><div class="ru-pick-s">Hedef ${fmtShortTL(g.amount)}</div></div>
        ${I.plus}
      </div>`).join('')}
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open'); sheetScrimEl.classList.add('open');
}
function kidNewGoal(el) {
  const id = el.dataset.id;
  if (state.kid.goals.some(g => g.id === id)) { closeSheet(); return toast('Bu hedef zaten var'); }
  state.kid.goals.push({ id, emoji: el.dataset.emoji, name: el.dataset.name, target: +el.dataset.amount, kidSaved: 0, matched: 0 });
  closeSheet(); render();
  setTimeout(() => toast(`${el.dataset.name} hedefi eklendi 🎯`), 150);
}
function kidEditMatch() {
  kidAmountSheet({ title: 'Veli eşleştirme oranı', sub: 'Çocuk 10 TL biriktirince ekleyeceğin tutar', ico: '🤝', presets: [3, 5, 10], save: 'kid-save-match', cta: 'Kaydet', value: Math.round(state.kid.matchRate * 10), unit: 'TL / 10 TL' });
}
function kidSaveMatch() {
  const v = kidReadAmount(); if (v === null) return;
  state.kid.matchRate = Math.max(0, Math.min(1, v / 10)); closeSheet(); render();
  setTimeout(() => toast(`Eşleştirme: her 10 TL'ye +${v} TL 🤝`), 150);
}
/* Ortak tutar sheet'i (çocuk kartı) */
function kidAmountSheet(o) {
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sp-sheet-head">
      <span class="sp-ico" style="background:var(--navy)">${o.emoji ? `<span style="font-size:18px">${o.ico}</span>` : o.ico}</span>
      <div><div class="sp-sheet-t">${o.title}</div><div class="sp-sheet-s">${o.sub}</div></div>
    </div>
    <div class="sp-amt-wrap"><input id="kid-amt-input" class="sp-amt-input" type="text" inputmode="numeric" placeholder="0" value="${o.value || ''}" autocomplete="off" /><span class="sp-amt-cur">${o.unit || 'TL'}</span></div>
    <div class="sp-preset-row">${o.presets.map(p => `<button class="sp-preset" data-action="kid-amt-preset" data-val="${p}">${p.toLocaleString('tr-TR')}</button>`).join('')}</div>
    <button class="sheet-btn" data-action="${o.save}">${o.cta}</button>
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open'); sheetScrimEl.classList.add('open');
  setTimeout(() => { const i = document.getElementById('kid-amt-input'); if (i) i.focus(); }, 250);
}
function kidAmtPreset(val) { const i = document.getElementById('kid-amt-input'); if (i) i.value = val; }
function kidReadAmount() {
  const i = document.getElementById('kid-amt-input');
  const val = parseInt((i ? i.value : '').replace(/[^\d]/g, ''), 10);
  if (isNaN(val) || val < 0) { toast('Geçerli bir tutar gir'); return null; }
  return val;
}

/* ===================================================================
   KART BİLGİLERİ + DİNAMİK GÜVENLİK KODU (dinamik CVV)
   Ana ekrandaki Worldcard'a dokununca açılır. Kart bilgileri + 5 dk
   geçerli tek kullanımlık güvenlik kodu üretimi (İş Bankası kalıbı).
   =================================================================== */
const CARD_IBAN = 'TR68 0006 7010 0000 0012 3456 78';

function CardDetailScreen() {
  const d = state.dcvv;
  const active = d.code && Date.now() < d.expires;
  const expired = d.code && Date.now() >= d.expires;   // üretilmiş ama süresi dolmuş

  let dcvvBody;
  if (active) {
    // Aktif: kod öne çıkar, sayaç kodun hemen altında, kopyala yakında
    dcvvBody = `
      <div class="dcvv-dial">
        <svg viewBox="0 0 120 120" class="dcvv-ring-svg" aria-hidden="true">
          <circle class="dcvv-ring-bg" cx="60" cy="60" r="52"/>
          <circle id="dcvv-ring" class="dcvv-ring-fg" cx="60" cy="60" r="52"/>
        </svg>
        <div class="dcvv-dial-mid">
          <div class="dcvv-code">${d.code}</div>
          <div class="dcvv-clock" id="dcvv-clock">05:00 kaldı</div>
        </div>
      </div>
      <p class="dcvv-hint">Bu kodu online alışverişlerde CVV2 alanına girebilirsiniz.</p>
      <button class="dcvv-copy" data-action="dcvv-copy" data-val="${d.code}" data-msg="Güvenlik kodu kopyalandı">${I.copy}<span>Kodu Kopyala</span></button>
      <div class="dcvv-foot">
        <span class="dcvv-subnote">Yeni kod oluşturulduğunda önceki kod geçersiz olur.</span>
        <button class="dcvv-regen" data-action="dcvv-gen">Yeni kod oluştur</button>
      </div>`;
  } else if (expired) {
    // Süre doldu: sönük kadran + net yönlendirme
    dcvvBody = `
      <div class="dcvv-dial expired">
        <svg viewBox="0 0 120 120" class="dcvv-ring-svg" aria-hidden="true">
          <circle class="dcvv-ring-bg" cx="60" cy="60" r="52"/>
        </svg>
        <div class="dcvv-dial-mid"><div class="dcvv-code muted">• • •</div></div>
      </div>
      <div class="dcvv-exp-title">Kodun süresi doldu</div>
      <p class="dcvv-info center">Yeni bir güvenlik kodu oluşturarak alışverişinize devam edebilirsiniz.</p>
      <button class="btn-primary dcvv-gen" data-action="dcvv-gen">Yeni Kod Oluştur</button>`;
  } else {
    // Boş: net ve güçlü — sabit CVV2 yerine anlık, tek kullanımlık kod
    dcvvBody = `
      <p class="dcvv-info center strong">Kartınızın arkasındaki sabit CVV2 yerine; <b>anlık üretilen, 5 dakika geçerli tek kullanımlık</b> güvenlik koduyla online alışveriş yapın.</p>
      <button class="btn-primary dcvv-gen" data-action="dcvv-gen">Güvenlik Kodu Oluştur</button>`;
  }

  return `
  <div class="screen anim-right cd-screen">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Kart Bilgileri</div>
      <button class="icon-btn" data-action="toast" data-msg="Kart ayarları prototipte aktif değil">${I.gear}</button>
    </div>
    <div class="screen-scroll">

      <div class="cd-cardart">${imgOrFallback(WORLDCARD_IMG, '💳', 'cd-cardimg')}</div>

      <div class="sp-card cd-info">
        <button class="cd-row tap" data-action="cd-copy" data-val="${CARD_IBAN.replace(/\s/g, '')}" data-msg="IBAN kopyalandı">
          <span class="cd-k">IBAN</span>
          <span class="cd-v">${CARD_IBAN}</span>
          <span class="cd-copyico">${I.copy}</span>
        </button>
        <div class="cd-row"><span class="cd-k">Kart Numarası</span><span class="cd-v">1234 56** **** 3333</span></div>
        <div class="cd-row"><span class="cd-k">Son Kullanma Tarihi</span><span class="cd-v">09/29</span></div>
      </div>

      <div class="sp-card dcvv-card ${active ? 'on' : ''}">
        <div class="dcvv-h"><span class="dcvv-sh">${I.lock || ''}</span>Dinamik Güvenlik Kodu</div>
        ${dcvvBody}
      </div>

    </div>
  </div>`;
}

let dcvvTimer = null;
function setupDcvv() {
  clearInterval(dcvvTimer);
  if (!document.getElementById('dcvv-ring')) return;   // aktif kod yok / ekran değişti
  const C = 2 * Math.PI * 52;
  const TOTAL = 5 * 60 * 1000;
  const tick = () => {
    const ring = document.getElementById('dcvv-ring');
    if (!ring) { clearInterval(dcvvTimer); return; }    // ekrandan çıkıldı
    const rem = state.dcvv.expires - Date.now();
    if (rem <= 0) { clearInterval(dcvvTimer); if (state.screen === 'card-detail') render(); return; }
    const frac = Math.max(0, Math.min(1, rem / TOTAL));
    ring.style.strokeDasharray = C;
    ring.style.strokeDashoffset = C * (1 - frac);
    const s = Math.ceil(rem / 1000);
    const clock = document.getElementById('dcvv-clock');
    if (clock) clock.textContent = `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')} kaldı`;
    const warn = rem <= 60000;   // son 1 dk
    ring.classList.toggle('warn', warn);
    if (clock) clock.classList.toggle('warn', warn);
  };
  tick();
  dcvvTimer = setInterval(tick, 250);
}
function dcvvGenerate() {
  state.dcvv = { code: String(Math.floor(100 + Math.random() * 900)), expires: Date.now() + 5 * 60 * 1000 };
  render();
  toast('Dinamik güvenlik kodu oluşturuldu');
}

function PlaceholderScreen(title) {
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">${title}</div>
    </div>
    <div class="placeholder">
      <div class="ph-ico">🚧</div>
      <h3>${title}</h3>
      <p>Bu bölüm prototip kapsamında tasarlanmadı.<br/>Demo akışı için <b>Arama → Alışveriş Asistanı</b> adımını kullanabilirsin.</p>
      <button class="btn-primary" style="max-width:220px" data-action="go-home">Ana Sayfaya Dön</button>
    </div>
  </div>`;
}

/* ======================================================================
   TOPLU BORÇ ÖDEME (draft)
   Debts from several products (credit card, flexible account, loans) are
   combined into one monthly statement and paid in a single transaction.
   It is NOT a new loan, a debt transfer or a restructuring: products keep
   their own terms. Mock data + local UI state only.
   ====================================================================== */

const DEBT_ICO_CAR = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17H3.6a1 1 0 0 1-1-1v-3.1a2 2 0 0 1 .6-1.4L5 9.7l1.6-3.4A2 2 0 0 1 8.4 5.2h7.2a2 2 0 0 1 1.8 1.1L19 9.7l1.8 1.8a2 2 0 0 1 .6 1.4V16a1 1 0 0 1-1 1H19M9 17h6M5 9.7h14"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>';
const DEBT_PERIOD = {
  label: 'Kasım 2026', cut: '31 Ekim 2026', due: '15 Kasım 2026', dueShort: '15 Kasım',
  dueDate: new Date(2026, 10, 15), nextCut: '30 Kasım 2026',
};
// Ordered by amount (largest first) — the same order in the bar and in every list.
// Hues: checked as a categorical set (colour-blind separation of neighbours + contrast)
// on both theme card surfaces (#1c1c1f dark, #ffffff light).
const DEBT_ITEMS = [
  { id: 'card',     name: 'Kredi Kartı',     sub: 'World Gold •••• 1234', kind: 'Dönem borcu',      amount: 24500, color: '#D9772F', icon: I.card,
    rows: [['Hesap kesim', '31 Ekim 2026'], ['Son ödeme', '15 Kasım 2026']] },
  { id: 'mortgage', name: 'Konut Kredisi',   sub: 'Kredi no 4402 1187',   kind: 'Kasım taksiti',    amount: 18000, color: '#14A5A0', icon: I.home,
    rows: [['Taksit', '23 / 120 · kalan 97'], ['Son ödeme', '15 Kasım 2026']] },
  { id: 'auto',     name: 'Taşıt Kredisi',   sub: 'Kredi no 4402 3391',   kind: 'Kasım taksiti',    amount: 15000, color: '#C08A1E', icon: DEBT_ICO_CAR,
    rows: [['Taksit', '11 / 48 · kalan 37'], ['Son ödeme', '15 Kasım 2026']] },
  { id: 'personal', name: 'İhtiyaç Kredisi', sub: 'Kredi no 4402 5520',   kind: 'Kasım taksiti',    amount: 12500, color: '#0098cb', icon: I.loan,
    rows: [['Taksit', '8 / 36 · kalan 28'], ['Son ödeme', '15 Kasım 2026']] },
  { id: 'flex',     name: 'Esnek Hesap',     sub: 'KMH · Limit 25.000 TL', kind: 'Kullanılan tutar', amount: 8000,  color: '#7B61C9', icon: I.bank,
    rows: [['Esnek hesap limiti', '25.000,00 TL'], ['Son ödeme', 'Sabit tarih yok']],
    note: 'Esnek hesapta sabit bir son ödeme tarihi yoktur; borç, ödemeyle kapanır.' },
];
// Payable TL accounts. "Vadesiz TL Hesabım" keeps the home screen balance (10.000 TL), so it cannot cover the statement.
const DEBT_ACCTS = [
  { id: 'salary', name: 'Maaş Hesabım',       no: 'Vadesiz TL · 8765 4321', balance: 96750 },
  { id: 'main',   name: 'Vadesiz TL Hesabım', no: 'Vadesiz TL · 12345678',  balance: USER.balance },
];
const DEBT_LOANS = { mortgage: 18000, auto: 15000, personal: 12500 };   // fixed monthly installments (history)

state.debt = {
  account: 'salary',   // selected payment account
  paid: false,
  payment: null,       // { amount, acct, ref, date, dateShort }
  history: [           // previous consolidated payments (newest first); card / flex vary, loans are fixed
    { id: 'h10',  period: 'Ekim 2026',    date: '14.10.2026 · 10:42', amount: 76450, acct: 'Maaş Hesabım',       ok: true,  ref: 'TBO20261014204731', card: 23950, flex: 7000 },
    { id: 'h09',  period: 'Eylül 2026',   date: '15.09.2026 · 09:18', amount: 79120, acct: 'Maaş Hesabım',       ok: true,  ref: 'TBO20260915118640', card: 26120, flex: 7500 },
    { id: 'h08',  period: 'Ağustos 2026', date: '14.08.2026 · 18:05', amount: 77300, acct: 'Maaş Hesabım',       ok: true,  ref: 'TBO20260814390215', card: 25300, flex: 6500 },
    { id: 'h07b', period: 'Temmuz 2026',  date: '15.07.2026 · 13:40', amount: 75880, acct: 'Maaş Hesabım',       ok: true,  ref: 'TBO20260715551902', card: 24380, flex: 6000 },
    { id: 'h07a', period: 'Temmuz 2026',  date: '15.07.2026 · 09:12', amount: 75880, acct: 'Vadesiz TL Hesabım', ok: false, ref: 'TBO20260715092047', card: 24380, flex: 6000, reason: 'Yetersiz bakiye' },
    { id: 'h06',  period: 'Haziran 2026', date: '13.06.2026 · 11:27', amount: 74600, acct: 'Maaş Hesabım',       ok: true,  ref: 'TBO20260613472298', card: 23100, flex: 6000 },
  ],
};

/* -------------------- helpers -------------------- */
function debtTotal() { return DEBT_ITEMS.reduce((a, d) => a + d.amount, 0); }
function debtAcct(id = state.debt.account) { return DEBT_ACCTS.find(a => a.id === id) || DEBT_ACCTS[0]; }
function debtTint(hex, a) { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; }
function debtDaysLeft() {
  const t = new Date(); t.setHours(0, 0, 0, 0);
  return Math.round((DEBT_PERIOD.dueDate - t) / 86400000);
}
function debtDaysLabel() {
  const n = debtDaysLeft();
  return n > 0 ? `${n} gün` : n === 0 ? 'Bugün' : 'Süresi geçti';
}
function debtNow() {
  const d = new Date(), p2 = n => String(n).padStart(2, '0');
  return {
    full: `${p2(d.getDate())}.${p2(d.getMonth() + 1)}.${d.getFullYear()} · ${p2(d.getHours())}:${p2(d.getMinutes())}`,
    short: `${d.getDate()} ${AYLAR_UZUN[d.getMonth()]}`,
    ref: `TBO${d.getFullYear()}${p2(d.getMonth() + 1)}${p2(d.getDate())}${String(Math.floor(100000 + Math.random() * 900000))}`,
  };
}
const AYLAR_UZUN = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
function debtIcoHTML(d, cls = '') { return `<span class="debt-ico ${cls}" style="--c:${d.color}">${d.icon}</span>`; }
function debtTLImg() { return `<img src="assets/tl-white.png" class="tl-img" alt="₺" onerror="this.outerHTML='<span class=\\'tl-glyph\\'>₺</span>'">`; }
/* Part-to-whole bar: one segment per product, width = share of the statement */
function debtBarHTML() {
  return `<div class="debt-bar" role="img" aria-label="Ürünlere göre borç dağılımı">${DEBT_ITEMS.map(d =>
    `<span class="debt-seg" style="flex:${d.amount} 1 0;background:${d.color}"></span>`).join('')}</div>`;
}
function debtPaidChip(txt = 'Ödendi') { return `<span class="debt-chip ok">${I.check}${txt}</span>`; }

/* -------------------- Screen 1 — dashboard -------------------- */
function DebtHome() {
  const s = state.debt, total = debtTotal(), pm = s.payment;
  return `
  <div class="screen anim-right">
    <div class="nav-head ru-nav-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Toplu Borç Ödeme</div>
      <button class="icon-btn" data-action="debt-info" aria-label="Toplu Borç Ödeme nedir?">${I.info}</button>
    </div>
    <div class="screen-scroll">
      <div class="ru-statcard debt-hero">
        <div class="ru-jar-label">${DEBT_PERIOD.label} ekstresi · ${s.paid ? 'Kalan borç' : 'Toplam borç'}</div>
        <div class="ru-jar-amt">${fmtTL2(s.paid ? 0 : total)}</div>
        ${s.paid
          ? `<div class="debt-hero-pill ok">${I.check} ${pm.dateShort} tarihinde ${fmtTL2(pm.amount)} ödendi</div>`
          : `<div class="debt-hero-pill">${I.calendar} Son ödeme ${DEBT_PERIOD.due}</div>`}
        <div class="ru-statrow">
          ${s.paid ? `
          <div class="ru-stat"><div class="ru-stat-l">Ödenen</div><div class="ru-stat-v">${fmtShortTL(pm.amount)}</div></div>
          <div class="ru-stat mid"><div class="ru-stat-l">Ödeme tarihi</div><div class="ru-stat-v">${pm.dateShort}</div></div>
          <div class="ru-stat"><div class="ru-stat-l">Sonraki kesim</div><div class="ru-stat-v">30 Kasım</div></div>` : `
          <div class="ru-stat"><div class="ru-stat-l">Hesap kesim</div><div class="ru-stat-v">31 Ekim</div></div>
          <div class="ru-stat mid"><div class="ru-stat-l">Son ödeme</div><div class="ru-stat-v">${DEBT_PERIOD.dueShort}</div></div>
          <div class="ru-stat"><div class="ru-stat-l">Kalan süre</div><div class="ru-stat-v">${debtDaysLabel()}</div></div>`}
        </div>
      </div>

      <div class="debt-card">
        <div class="debt-card-h"><span>Borç dağılımı</span><span class="debt-card-sub">${DEBT_ITEMS.length} ürün</span></div>
        ${debtBarHTML()}
        <div class="debt-rows">${DEBT_ITEMS.map(d => debtRowHTML(d, total)).join('')}</div>
        <div class="debt-total"><span>${s.paid ? 'Ödenen toplam' : 'Toplam ödenecek tutar'}</span><b>${fmtTL2(total)}</b></div>
      </div>

      <div class="ru-info-card debt-links">
        <div class="ru-info-row tap" data-action="debt-statement"><span class="ru-info-ico">${I.doc}</span><span class="ru-info-k">Ekstre detayları</span><span class="ru-info-v">${DEBT_PERIOD.label}</span>${I.chevR}</div>
        <div class="ru-info-row tap" data-action="debt-history"><span class="ru-info-ico">${I.receipt}</span><span class="ru-info-k">Ödeme geçmişi</span><span class="ru-info-v">${s.history.length} işlem</span>${I.chevR}</div>
      </div>
    </div>
    <div class="pay-foot">
      ${s.paid
        ? `<button class="btn-outline" data-action="debt-history">Ödeme Geçmişini Gör</button>`
        : `<button class="pay-btn" data-action="debt-pay"><span>Toplu Öde</span><span class="div"></span><span>${fmtTL2(total)}</span></button>`}
    </div>
  </div>`;
}
function debtRowHTML(d, total) {
  return `<div class="debt-row">
    ${debtIcoHTML(d)}
    <div class="debt-row-mid"><b>${d.name}</b><span>${d.kind}</span></div>
    <div class="debt-row-r"><b>${fmtTL2(d.amount)}</b>${state.debt.paid ? debtPaidChip() : `<span>%${Math.round(d.amount / total * 100)}</span>`}</div>
  </div>`;
}
function debtInfoSheet() {
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>Toplu Borç Ödeme nedir?</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="debt-how">
      <div class="debt-how-row"><span class="debt-how-ico">${I.doc}</span><div><b>Tek ekstre</b><span>Kredi kartı, esnek hesap ve kredi taksitlerin her ay sonunda tek bir ekstrede birleşir.</span></div></div>
      <div class="debt-how-row"><span class="debt-how-ico">${I.calendar}</span><div><b>Tek tarih, tek işlem</b><span>Tüm ürünlerin borcunu aynı son ödeme tarihinde, tek bir ödemeyle kapatırsın.</span></div></div>
      <div class="debt-how-row"><span class="debt-how-ico">${I.shield}</span><div><b>Ürünlerin değişmez</b><span>Bu yeni bir kredi ya da borç yapılandırması değildir; kredilerinin faiz, vade ve taksit koşulları aynen devam eder.</span></div></div>
    </div>
    <button class="sheet-btn" data-action="close-sheet">Anladım</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}

/* -------------------- Screen 2 — statement details -------------------- */
function DebtStatement() {
  const s = state.debt, total = debtTotal();
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Ekstre Detayı</div>
      <button class="icon-btn debt-nav-r" data-action="toast" data-msg="Ekstre PDF'i prototipte aktif değil" aria-label="Ekstreyi indir">${I.doc}</button>
    </div>
    <div class="screen-scroll">
      <div class="debt-card debt-st-head">
        <div class="debt-card-h"><span>${DEBT_PERIOD.label} Toplu Ekstresi</span>${s.paid ? debtPaidChip() : ''}</div>
        <div class="debt-st-grid">
          <div><span>Hesap kesim</span><b>${DEBT_PERIOD.cut}</b></div>
          <div><span>Son ödeme</span><b>${DEBT_PERIOD.due}</b></div>
          <div><span>Ürün</span><b>${DEBT_ITEMS.length}</b></div>
        </div>
      </div>
      ${DEBT_ITEMS.map(debtStatementCardHTML).join('')}
      <div class="debt-card debt-st-total">
        <div><span>Toplam borç</span><em>${DEBT_ITEMS.length} ürün · ${DEBT_PERIOD.label} dönemi</em></div>
        <b>${fmtTL2(total)}</b>
      </div>
    </div>
    ${s.paid ? '' : `<div class="pay-foot"><button class="pay-btn" data-action="debt-pay"><span>Toplu Öde</span><span class="div"></span><span>${fmtTL2(total)}</span></button></div>`}
  </div>`;
}
function debtStatementCardHTML(d) {
  return `<div class="debt-st" style="--c:${d.color}">
    <div class="debt-st-top">
      ${debtIcoHTML(d)}
      <div class="debt-st-mid"><b>${d.name}</b><span>${d.sub}</span></div>
      <div class="debt-st-amt"><b>${fmtTL2(d.amount)}</b>${state.debt.paid ? debtPaidChip() : `<span>${d.kind}</span>`}</div>
    </div>
    <div class="debt-st-rows">${d.rows.map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join('')}</div>
    ${d.note ? `<div class="debt-st-note">${I.info}<span>${d.note}</span></div>` : ''}
  </div>`;
}

/* -------------------- Screen 3 — consolidated payment -------------------- */
function DebtPay() {
  const s = state.debt;
  if (s.paid) { state.screen = 'toplu-borc'; return DebtHome(); }
  const total = debtTotal();
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Toplu Ödeme</div>
    </div>
    <div class="screen-scroll">
      <div class="debt-card debt-owed">
        <div><span>Toplam ekstre borcu</span><em>${DEBT_PERIOD.label} · Son ödeme ${DEBT_PERIOD.due}</em></div>
        <b>${fmtTL2(total)}</b>
      </div>
      <div class="qr-amt-box debt-amt-box">
        <div class="qr-amt-lbl">Ödenecek tutar</div>
        <div class="qr-amt">${fmtTL2(total)}</div>
        <div class="qr-amt-sub">Ekstredeki ${DEBT_ITEMS.length} ürünün borcunun tamamı · tek işlem</div>
      </div>

      <div class="pay-section-title">Ödeme hesabı</div>
      ${DEBT_ACCTS.map(a => debtAcctHTML(a, total)).join('')}
      <div class="debt-warn" id="debt-warn">${debtWarnHTML()}</div>

      <div class="pay-section-title">Ödeme özeti</div>
      <div class="receipt debt-receipt" id="debt-summary">${debtSummaryHTML()}</div>
    </div>
    <div class="pay-foot">
      <button class="pay-btn" id="debt-continue" data-action="debt-continue" ${debtAcct().balance < total ? 'disabled' : ''}><span>Devam Et</span><span class="div"></span><span>${fmtTL2(total)}</span></button>
      <div class="secure-note">${I.lock} Bilgilerin 256 bit SSL ile korunur</div>
    </div>
  </div>`;
}
function debtAcctHTML(a, total) {
  const short = a.balance < total;
  return `<div class="method debt-acct ${a.id === state.debt.account ? 'selected' : ''} ${short ? 'short' : ''}" data-action="debt-acct" data-id="${a.id}">
    <div class="m-ico tl-ico">${debtTLImg()}</div>
    <div class="debt-acct-mid">
      <div class="m-name">${a.name}</div>
      <div class="m-sub">${a.no}</div>
      <div class="debt-bal">Kullanılabilir bakiye <b>${fmtTL2(a.balance)}</b>${short ? '<span class="debt-chip warn">Yetersiz</span>' : ''}</div>
    </div>
    <div class="m-check">${I.check}</div>
  </div>`;
}
function debtWarnHTML() {
  const a = debtAcct(), gap = debtTotal() - a.balance;
  return gap > 0 ? `${I.info}<span><b>${a.name}</b> bakiyesi bu ödeme için yeterli değil (${fmtTL2(gap)} eksik). Başka bir hesap seç.</span>` : '';
}
function debtSummaryHTML() {
  const a = debtAcct(), total = debtTotal(), after = a.balance - total;
  return `
    <div class="r-row"><span class="r-l">Ekstre dönemi</span><span class="r-r">${DEBT_PERIOD.label}</span></div>
    <div class="r-row"><span class="r-l">Ödenecek tutar</span><span class="r-r">${fmtTL2(total)}</span></div>
    <div class="r-row"><span class="r-l">Ödeme hesabı</span><span class="r-r">${a.name}</span></div>
    <div class="r-row"><span class="r-l">Ödeme sonrası bakiye</span><span class="r-r ${after < 0 ? 'debt-neg' : ''}">${after < 0 ? 'Yetersiz bakiye' : fmtTL2(after)}</span></div>`;
}
/* Account choice: partial DOM update (no re-render → no slide-in replay) */
function debtSelectAcct(id) {
  state.debt.account = id;
  document.querySelectorAll('.debt-acct').forEach(el => el.classList.toggle('selected', el.dataset.id === id));
  const w = document.getElementById('debt-warn'); if (w) w.innerHTML = debtWarnHTML();
  const sm = document.getElementById('debt-summary'); if (sm) sm.innerHTML = debtSummaryHTML();
  const b = document.getElementById('debt-continue'); if (b) b.disabled = debtAcct().balance < debtTotal();
}

/* -------------------- Screen 4 — confirm -------------------- */
function DebtConfirm() {
  const s = state.debt, total = debtTotal(), a = debtAcct();
  if (s.paid || a.balance < total) { state.screen = 'toplu-borc'; return DebtHome(); }
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Ödemeyi Onayla</div>
    </div>
    <div class="screen-scroll">
      <div class="debt-confirm-amt">
        <span>Toplam ödeme tutarı</span>
        <b>${fmtTL2(total)}</b>
        <em>${DEBT_PERIOD.label} toplu ekstresi</em>
      </div>
      <div class="receipt debt-receipt">
        <div class="r-row"><span class="r-l">Ödeme yapılacak hesap</span><span class="r-r">${a.name}<br><i class="debt-sub">${a.no}</i></span></div>
        <div class="r-row"><span class="r-l">Ekstre dönemi</span><span class="r-r">${DEBT_PERIOD.label}</span></div>
        <div class="r-row"><span class="r-l">Son ödeme tarihi</span><span class="r-r">${DEBT_PERIOD.due}</span></div>
        <div class="r-row"><span class="r-l">Ödeme sonrası bakiye</span><span class="r-r">${fmtTL2(a.balance - total)}</span></div>
      </div>
      <div class="debt-card pad0 debt-list">
        <div class="debt-card-h"><span>Borcu oluşturan ürünler</span><span class="debt-card-sub">${DEBT_ITEMS.length} ürün</span></div>
        ${DEBT_ITEMS.map(d => `<div class="debt-li">${debtIcoHTML(d, 'sm')}<div class="debt-li-mid"><b>${d.name}</b><span>${d.kind}</span></div><b class="debt-li-a">${fmtTL2(d.amount)}</b></div>`).join('')}
        <div class="debt-li total"><span>Toplam</span><b class="debt-li-a">${fmtTL2(total)}</b></div>
      </div>
      <div class="debt-note">${I.info}<span>Onayladığında ${fmtTL2(total)} hesabından çekilir ve ekstredeki ${DEBT_ITEMS.length} ürünün ${DEBT_PERIOD.label} borcu kapanır. Kredilerinin vade ve taksit koşulları değişmez.</span></div>
    </div>
    <div class="screen-cta">
      <button class="btn-primary debt-approve" id="debt-approve" data-action="debt-approve">${I.faceid} Onayla</button>
      <button class="btn-ghost" data-action="debt-cancel">Vazgeç</button>
    </div>
  </div>`;
}
function debtApprove() {
  const btn = document.getElementById('debt-approve');
  if (!btn) return;
  btn.innerHTML = '<span class="spinner"></span> Ödeme Onaylanıyor…';
  btn.style.pointerEvents = 'none';
  setTimeout(() => { debtApplyPayment(); go('toplu-borc-sonuc'); }, 1500);
}
function debtApplyPayment() {
  const s = state.debt, a = debtAcct(), total = debtTotal(), now = debtNow();
  a.balance -= total;
  s.paid = true;
  s.payment = { amount: total, acct: a.name, acctNo: a.no, balanceAfter: a.balance, ref: now.ref, date: now.full, dateShort: now.short };
  s.history.unshift({
    id: 'h11', period: DEBT_PERIOD.label, date: now.full, amount: total, acct: a.name, ok: true, ref: now.ref, isNew: true,
    card: DEBT_ITEMS.find(d => d.id === 'card').amount, flex: DEBT_ITEMS.find(d => d.id === 'flex').amount,
  });
}

/* -------------------- Screen 5 — result -------------------- */
function DebtResult() {
  const s = state.debt, pm = s.payment;
  if (!pm) { state.screen = 'toplu-borc'; return DebtHome(); }
  return `
  <div class="screen anim-fade">
    <div class="screen-scroll">
      <div class="success debt-success">
        <div class="success-check"><div class="ring">${I.checkBig}</div></div>
        <h2>Ödemen Başarıyla Gerçekleşti</h2>
        <div class="succ-date">${pm.date}</div>
        <div class="amt">${fmtTL2(pm.amount)}</div>
        <div class="prod">${DEBT_PERIOD.label} toplu ekstresi</div>

        <div class="debt-card flat">
          <div class="debt-card-h"><span>Güncel ekstre durumu</span>${debtPaidChip()}</div>
          <div class="debt-left"><span>Kalan borç</span><b>${fmtTL2(0)}</b></div>
          ${DEBT_ITEMS.map(d => `<div class="debt-li">${debtIcoHTML(d, 'sm')}<div class="debt-li-mid"><b>${d.name}</b><span>${fmtTL2(d.amount)} ödendi</span></div><span class="debt-li-ok">${I.check}</span></div>`).join('')}
          <div class="debt-next">${I.calendar}<span>Sonraki ekstre ${DEBT_PERIOD.nextCut} tarihinde kesilecek.</span></div>
        </div>

        <div class="receipt">
          <div class="r-row"><span class="r-l">İşlem referans no</span><span class="r-r">${pm.ref}</span></div>
          <div class="r-row"><span class="r-l">Ödeme tarihi</span><span class="r-r">${pm.date}</span></div>
          <div class="r-row"><span class="r-l">Ödeme hesabı</span><span class="r-r">${pm.acct}</span></div>
          <div class="r-row"><span class="r-l">Hesap bakiyesi</span><span class="r-r">${fmtTL2(pm.balanceAfter)}</span></div>
        </div>
        <div class="success-actions">
          <button class="btn-primary" data-action="debt-home">Ana Ekrana Dön</button>
          <button class="btn-outline" data-action="debt-history-after">Ödeme Geçmişi</button>
        </div>
      </div>
    </div>
  </div>`;
}

/* -------------------- Screen 6 — payment history -------------------- */
function DebtHistory() {
  const h = state.debt.history, ok = h.filter(x => x.ok);
  const paidSum = ok.reduce((a, x) => a + x.amount, 0);
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Ödeme Geçmişi</div>
    </div>
    <div class="screen-scroll">
      <div class="debt-card debt-hist-sum">
        <div><span>2026'da toplu ödemeler</span><b>${fmtTL2(paidSum)}</b></div>
        <div class="debt-hist-counts"><span class="debt-chip ok">${I.check}${ok.length} başarılı</span>${h.length > ok.length ? `<span class="debt-chip fail">${I.close}${h.length - ok.length} başarısız</span>` : ''}</div>
      </div>
      <div class="ru-txn-title">2026</div>
      <div class="debt-hist">${h.map(debtHistRowHTML).join('')}</div>
    </div>
  </div>`;
}
function debtHistRowHTML(x) {
  return `<div class="debt-h ${x.isNew ? 'new' : ''}" data-action="debt-hist-open" data-id="${x.id}">
    <span class="debt-h-ico ${x.ok ? 'ok' : 'fail'}">${x.ok ? I.check : I.close}</span>
    <div class="debt-h-mid"><b>${x.period} ekstresi${x.isNew ? ' <em class="debt-new">Yeni</em>' : ''}</b><span>${x.date}</span></div>
    <div class="debt-h-r"><b>${fmtTL2(x.amount)}</b><span class="debt-status ${x.ok ? 'ok' : 'fail'}">${x.ok ? 'Başarılı' : 'Başarısız'}</span></div>
    <span class="debt-h-chev">${I.chevR}</span>
  </div>`;
}
function debtHistSheet(id) {
  const x = state.debt.history.find(h => h.id === id);
  if (!x) return;
  const amounts = { card: x.card, flex: x.flex, ...DEBT_LOANS };
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>İşlem Detayı</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="debt-sh-head">
      <span class="debt-status big ${x.ok ? 'ok' : 'fail'}">${x.ok ? I.check : I.close}${x.ok ? 'Başarılı' : 'Başarısız'}</span>
      <b>${fmtTL2(x.amount)}</b>
      <span>${x.period} toplu ekstresi</span>
    </div>
    <div class="receipt debt-sh-receipt">
      <div class="r-row"><span class="r-l">İşlem tarihi</span><span class="r-r">${x.date}</span></div>
      <div class="r-row"><span class="r-l">Referans no</span><span class="r-r">${x.ref}</span></div>
      <div class="r-row"><span class="r-l">Ödeme hesabı</span><span class="r-r">${x.acct}</span></div>
      ${x.ok ? '' : `<div class="r-row"><span class="r-l">Neden</span><span class="r-r">${x.reason}</span></div>`}
    </div>
    ${x.ok
      ? `<div class="debt-sh-prods">${DEBT_ITEMS.map(d => `<div><i style="background:${d.color}"></i><span>${d.name}</span><b>${fmtTL2(amounts[d.id])}</b></div>`).join('')}</div>`
      : `<div class="debt-note in">${I.info}<span>Ödeme gerçekleşmedi; ekstre borcu değişmedi. Aynı gün başka bir hesaptan ödendi.</span></div>`}
    <button class="sheet-btn ghost" data-action="toast" data-msg="Dekont paylaşımı prototipte aktif değil">Dekontu Paylaş</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}

/* -------------------- navigation -------------------- */
// Drop the flow screens from the back stack so "back" lands where the feature was opened from
function debtUnwind() {
  const i = state.nav.map(f => f.screen).lastIndexOf('toplu-borc');
  if (i >= 0) state.nav = state.nav.slice(0, i);
}
function debtGoHome() {
  debtUnwind();
  state.chatSeed = false;
  state.screen = 'toplu-borc';
  render();
}
function debtHistoryAfterPay() {
  debtUnwind();
  state.nav.push({ screen: 'toplu-borc', chatSeed: false });
  state.screen = 'toplu-borc-gecmis';
  render();
}
function debtCancel() {
  debtGoHome();
  toast('Ödeme iptal edildi');
}
// Deep links (#toplu-borc-…) prepare the state they need without replaying the flow
function debtSeed(h) {
  const s = state.debt;
  if ((h === 'toplu-borc-odeme' || h === 'toplu-borc-onay') && debtAcct().balance < debtTotal()) s.account = 'salary';
  if (h === 'toplu-borc-sonuc' && !s.paid) debtApplyPayment();
}

/* ======================================================================
   ERKEN MAAŞ ERİŞİMİ (draft) — early wage access credit
   Payroll customers draw up to 25% of this month's net salary before
   payday; the amount is repaid automatically when the salary arrives.
   Pricing below is NOT a final business rule: the reference document
   leaves interest, fees and the repayment model open, so every value in
   EWA_TERMS is an example and can be changed here. Mock data + local UI
   state only.
   ====================================================================== */

const EWA_TERMS = {
  ratio: 25,          // % of net salary available early (reference business model)
  monthlyRate: 2.49,  // % monthly interest — EXAMPLE
  taxRate: 30,        // KKDF 15% + BSMV 15% on interest — EXAMPLE
  feeRate: 0.5,       // % allocation fee, deducted from the credited amount — EXAMPLE
  min: 500,           // minimum request (TL) — EXAMPLE
  step: 500,          // slider / stepper increment (TL)
};
const EWA_SALARY = 60000;   // net monthly salary (mock; paid into Maaş Hesabım)
const EWA_PAYDAY = { label: '30 Kasım 2026', short: '30 Kasım', dotted: '30.11.2026', month: 'Kasım 2026', date: new Date(2026, 10, 30) };
const EWA_ACCT = { name: 'Maaş Hesabım', no: 'Vadesiz TL · 8765 4321' };

state.ewa = {
  amount: 10000,        // amount being requested (TL)
  agreePre: false,      // Ön Bilgilendirme Formu read
  agreeContract: false, // Kredi Sözleşmesi accepted
  last: null,           // last completed request
  history: [            // previous months were repaid on payday (newest first)
    { id: 'e10', month: 'Ekim 2026',   date: '12.10.2026 · 14:05', amount: 8000,  repay: '31.10.2026', days: 19, status: 'paid', ref: 'EMA20261012418205' },
    { id: 'e09', month: 'Eylül 2026',  date: '18.09.2026 · 09:41', amount: 5000,  repay: '30.09.2026', days: 12, status: 'paid', ref: 'EMA20260918093317' },
    { id: 'e07', month: 'Temmuz 2026', date: '09.07.2026 · 19:22', amount: 15000, repay: '31.07.2026', days: 22, status: 'paid', ref: 'EMA20260709772640' },
  ],
};
let ewaWarnTimer = null;

/* -------------------- helpers -------------------- */
function ewaLimit() { return Math.round(EWA_SALARY * EWA_TERMS.ratio / 100); }
function ewaUsed() { return state.ewa.history.filter(x => x.status === 'open').reduce((a, x) => a + x.amount, 0); }   // this month
function ewaAvail() { return Math.max(0, ewaLimit() - ewaUsed()); }
function ewaDaysToPayday() {
  const t = new Date(); t.setHours(0, 0, 0, 0);
  return Math.max(1, Math.round((EWA_PAYDAY.date - t) / 86400000));
}
function ewaRound(n) { return Math.round(n * 100) / 100; }
function ewaPct(n) { return String(n).replace('.', ','); }
/* Example quote: fee is deducted at disbursement, interest (+ taxes) accrues until payday */
function ewaQuote(amount, days = ewaDaysToPayday()) {
  const fee = ewaRound(amount * EWA_TERMS.feeRate / 100);
  const interest = ewaRound(amount * EWA_TERMS.monthlyRate / 100 * days / 30);
  const tax = ewaRound(interest * EWA_TERMS.taxRate / 100);
  return { amount, fee, credited: ewaRound(amount - fee), interest, tax, total: ewaRound(amount + interest + tax), days };
}
function ewaNow() {
  const d = new Date(), p2 = n => String(n).padStart(2, '0');
  return {
    full: `${p2(d.getDate())}.${p2(d.getMonth() + 1)}.${d.getFullYear()} · ${p2(d.getHours())}:${p2(d.getMinutes())}`,
    ref: `EMA${d.getFullYear()}${p2(d.getMonth() + 1)}${p2(d.getDate())}${String(Math.floor(100000 + Math.random() * 900000))}`,
  };
}
function ewaClampDefault() {   // keep the selected amount valid for the remaining limit
  const s = state.ewa, avail = ewaAvail();
  if (s.amount > avail) s.amount = Math.floor(avail / EWA_TERMS.step) * EWA_TERMS.step;
  if (s.amount < EWA_TERMS.min) s.amount = Math.min(avail, EWA_TERMS.min);
}
function ewaExampleTag() { return '<span class="ewa-ex">Örnek</span>'; }

/* -------------------- Screen 1 — dashboard -------------------- */
function EwaHome() {
  const used = ewaUsed(), limit = ewaLimit(), avail = ewaAvail(), pct = Math.round(used / limit * 100);
  return `
  <div class="screen anim-right">
    <div class="nav-head ru-nav-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Erken Maaş Erişimi</div>
      <button class="icon-btn" data-action="ewa-info" aria-label="Erken Maaş Erişimi nedir?">${I.info}</button>
    </div>
    <div class="screen-scroll">
      <div class="ru-statcard ewa-hero">
        <div class="ru-jar-label">${EWA_PAYDAY.month.split(' ')[0]} maaşından hemen erişebileceğin tutar</div>
        <div class="ru-jar-amt">${fmtTL2(avail)}</div>
        <div class="ewa-hero-meter" role="img" aria-label="Limitin yüzde ${pct} kısmı kullanıldı"><i style="width:${pct}%"></i></div>
        <div class="ru-statrow">
          <div class="ru-stat"><div class="ru-stat-l">Net maaş</div><div class="ru-stat-v">${fmtShortTL(EWA_SALARY)}</div></div>
          <div class="ru-stat mid"><div class="ru-stat-l">Erişim oranı</div><div class="ru-stat-v">%${EWA_TERMS.ratio}</div></div>
          <div class="ru-stat"><div class="ru-stat-l">Maaş günü</div><div class="ru-stat-v">${EWA_PAYDAY.short}</div></div>
        </div>
      </div>

      <div class="ewa-card">
        <div class="ewa-card-h"><span>Limit durumu</span><span class="ewa-ok">${I.shield} İşveren bilgin doğrulandı</span></div>
        <div class="ewa-rows">
          <div><span>Erken erişim üst limiti</span><b>${fmtTL2(limit)}</b></div>
          <div><span>Kullanılan tutar</span><b>${fmtTL2(used)}</b></div>
          <div class="hl"><span>Kalan kullanılabilir</span><b>${fmtTL2(avail)}</b></div>
          <div><span>Beklenen maaş ödeme tarihi</span><b>${EWA_PAYDAY.label}</b></div>
        </div>
      </div>

      <div class="ewa-card ewa-about">
        <div class="ewa-card-h"><span>Erken Maaş Erişimi nedir?</span><button class="sp-link" data-action="ewa-info">Detaylı bilgi ${I.chevR}</button></div>
        <p>Maaş günün gelmeden, bu ayki net maaşının %${EWA_TERMS.ratio}'ine kadarını ihtiyacın olduğu anda Maaş Hesabına aktarabilirsin.</p>
        <div class="ewa-steps">
          <div><span class="n">1</span>Tutarı seç</div>
          <div><span class="n">2</span>Hesabına anında geçsin</div>
          <div><span class="n">3</span>Maaş gününde otomatik ödensin</div>
        </div>
      </div>

      <div class="ru-info-card ewa-links">
        <div class="ru-info-row tap" data-action="ewa-history"><span class="ru-info-ico">${I.receipt}</span><span class="ru-info-k">İşlem geçmişi ve geri ödemeler</span><span class="ru-info-v">${state.ewa.history.length} işlem</span>${I.chevR}</div>
      </div>
    </div>
    <div class="screen-cta">
      <button class="btn-primary ${avail < EWA_TERMS.min ? 'disabled' : ''}" data-action="ewa-start">${avail < EWA_TERMS.min ? 'Bu ayki limitin doldu' : 'Erken Erişimi Başlat'}</button>
    </div>
  </div>`;
}
function ewaInfoSheet() {
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>Erken Maaş Erişimi nedir?</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="ewa-how">
      <div class="ewa-how-row"><span class="ewa-how-ico">${I.salaryEarly}</span><div><b>Maaşına ay sonunu beklemeden eriş</b><span>Bankamızdan maaş alıyorsan, bu ayki net maaşının %${EWA_TERMS.ratio}'ine kadarını istediğin an kullanabilirsin.</span></div></div>
      <div class="ewa-how-row"><span class="ewa-how-ico">${I.shield}</span><div><b>İşverenle entegre</b><span>Kullanabileceğin tutar, işvereninden alınan maaş bilgine göre hesaplanır.</span></div></div>
      <div class="ewa-how-row"><span class="ewa-how-ico">${I.calendar}</span><div><b>Maaş gününde otomatik geri ödeme</b><span>Toplam geri ödeme tutarı, maaşın Maaş Hesabına yattığı gün otomatik tahsil edilir.</span></div></div>
    </div>
    <div class="ewa-note">${I.info}<span>Erken Maaş Erişimi bir kredi ürünüdür; faiz, vergi ve masraf uygulanabilir. Prototipteki koşullar örnektir.</span></div>
    <button class="sheet-btn" data-action="close-sheet">Anladım</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}

/* -------------------- Screen 2 — amount -------------------- */
function EwaAmount() {
  ewaClampDefault();
  const s = state.ewa, avail = ewaAvail(), used = ewaUsed();
  if (avail < EWA_TERMS.min) { state.screen = 'erken-maas'; return EwaHome(); }
  const chips = [2500, 5000, 10000].filter(v => v < avail).concat([avail]);
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Tutar Belirle</div>
    </div>
    <div class="screen-scroll">
      <div class="ewa-card ewa-lim3">
        <div><span>Erken erişim limiti</span><b>${fmtShortTL(ewaLimit())}</b></div>
        <div><span>Kullanılan</span><b>${fmtShortTL(used)}</b></div>
        <div><span>Kalan limit</span><b>${fmtShortTL(avail)}</b></div>
      </div>
      <div class="ewa-card ewa-amt-card">
        <div class="ewa-amt-lbl">Talep edilecek tutar</div>
        <div class="ewa-amt-row">
          <button class="ewa-step" data-action="ewa-step" data-dir="-1" aria-label="Tutarı azalt"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 12h14"/></svg></button>
          <label class="ewa-amt"><input id="ewa-input" class="ewa-amt-input" inputmode="numeric" enterkeyhint="done" autocomplete="off" value="${s.amount.toLocaleString('tr-TR')}" aria-label="Talep edilecek tutar"><span>TL</span></label>
          <button class="ewa-step" data-action="ewa-step" data-dir="1" aria-label="Tutarı artır">${I.plus}</button>
        </div>
        <div class="ewa-slider" id="ewa-slider" style="--v:${ewaSliderPct(s.amount)}%">
          <div class="ewa-track"><i></i></div>
          <input type="range" class="ewa-range" id="ewa-range" min="${EWA_TERMS.min}" max="${avail}" step="${EWA_TERMS.step}" value="${s.amount}" aria-label="Talep edilecek tutar">
        </div>
        <div class="ewa-scale"><span>${fmtShortTL(EWA_TERMS.min)}</span><span>${fmtShortTL(avail)}</span></div>
        <div class="ewa-chips">${chips.map(v => `<button class="ewa-chip ${v === s.amount ? 'on' : ''}" data-action="ewa-chip" data-v="${v}">${v === avail ? 'Tümü' : fmtShortTL(v)}</button>`).join('')}</div>
        <div class="ewa-after"><span>Talep sonrası kalan limit</span><b id="ewa-left">${fmtTL2(avail - s.amount)}</b></div>
        <div class="ewa-warn" id="ewa-warn" role="status" aria-live="polite"></div>
      </div>
      <div class="ewa-note">${I.info}<span>Tutar, onaydan sonra ${EWA_ACCT.name}'a aktarılır ve ${EWA_PAYDAY.label} tarihinde maaşından otomatik geri ödenir.</span></div>
    </div>
    <div class="screen-cta">
      <button class="btn-primary" id="ewa-next" data-action="ewa-terms">Devam</button>
    </div>
  </div>`;
}
function ewaSliderPct(v) {
  const lo = EWA_TERMS.min, hi = ewaAvail();
  return hi > lo ? Math.max(0, Math.min(100, (v - lo) / (hi - lo) * 100)) : 100;
}
function ewaFitInput(inp) {
  const v = inp.value || '0', digits = v.replace(/\D/g, '').length, dots = (v.match(/\./g) || []).length;
  inp.style.width = (Math.max(1, digits) + dots * 0.45 + 0.4) + 'ch';
}
function ewaSetupAmount() {
  const r = document.getElementById('ewa-range'), inp = document.getElementById('ewa-input');
  if (r) r.addEventListener('input', () => ewaSetAmount(+r.value));
  if (inp) {
    ewaFitInput(inp);
    inp.addEventListener('focus', () => inp.select());
    inp.addEventListener('input', () => {
      const d = inp.value.replace(/\D/g, '').slice(0, 7);
      inp.value = d ? (+d).toLocaleString('tr-TR') : '';
      ewaFitInput(inp);
    });
    inp.addEventListener('change', () => ewaSetAmount(+inp.value.replace(/\D/g, '')));
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') inp.blur(); });
  }
}
/* Enforce min / remaining limit, then update the screen in place (no re-render while dragging) */
function ewaSetAmount(raw) {
  const s = state.ewa, avail = ewaAvail();
  let v = Math.round(raw) || 0, warn = '';
  if (v > avail) { v = avail; warn = `En fazla ${fmtTL2(avail)} talep edebilirsin; bu ayki erken erişim limitin bu kadar.`; }
  else if (v < EWA_TERMS.min) { v = EWA_TERMS.min; warn = `En az ${fmtTL2(EWA_TERMS.min)} talep edebilirsin.`; }
  s.amount = v;
  const inp = document.getElementById('ewa-input');
  if (inp && document.activeElement !== inp) { inp.value = v.toLocaleString('tr-TR'); ewaFitInput(inp); }
  const r = document.getElementById('ewa-range'); if (r && +r.value !== v) r.value = v;
  const sl = document.getElementById('ewa-slider'); if (sl) sl.style.setProperty('--v', ewaSliderPct(v) + '%');
  const left = document.getElementById('ewa-left'); if (left) left.textContent = fmtTL2(avail - v);
  document.querySelectorAll('.ewa-chip').forEach(c => c.classList.toggle('on', +c.dataset.v === v));
  const w = document.getElementById('ewa-warn');
  if (w) {
    clearTimeout(ewaWarnTimer);
    w.innerHTML = warn ? `${I.info}<span>${warn}</span>` : '';
    w.classList.toggle('show', !!warn);
    if (warn) ewaWarnTimer = setTimeout(() => w.classList.remove('show'), 3500);
  }
}
function ewaStep(dir) {
  const v = state.ewa.amount, st = EWA_TERMS.step;
  ewaSetAmount(dir > 0 ? Math.floor(v / st) * st + st : Math.ceil(v / st) * st - st);
}
function ewaToTerms() {
  const a = document.activeElement;
  if (a && a.id === 'ewa-input') a.blur();   // commit a typed amount first
  go('erken-maas-kosullar');
}

/* -------------------- Screen 3 — terms & repayment -------------------- */
function EwaTerms() {
  const s = state.ewa;
  if (ewaAvail() < EWA_TERMS.min) { state.screen = 'erken-maas'; return EwaHome(); }
  const q = ewaQuote(s.amount);
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Koşullar ve Geri Ödeme</div>
    </div>
    <div class="screen-scroll">
      <div class="ewa-banner">${I.info}<span><b>Örnek koşullar.</b> Faiz, masraf ve geri ödeme modeli henüz kesinleşmedi; aşağıdaki değerler yapılandırılabilir örneklerdir.</span></div>

      <div class="ewa-sec-t">Tutar</div>
      <div class="receipt ewa-receipt">
        <div class="r-row"><span class="r-l">Talep edilen tutar</span><span class="r-r">${fmtTL2(q.amount)}</span></div>
        <div class="r-row"><span class="r-l">Tahsis ücreti ${ewaExampleTag()}<i class="ewa-sub">%${ewaPct(EWA_TERMS.feeRate)} · aktarımda kesilir</i></span><span class="r-r">−${fmtTL2(q.fee)}</span></div>
        <div class="r-row hl"><span class="r-l">Hesaba aktarılacak tutar</span><span class="r-r">${fmtTL2(q.credited)}</span></div>
      </div>

      <div class="ewa-sec-t">Geri ödeme</div>
      <div class="receipt ewa-receipt">
        <div class="r-row"><span class="r-l">Anapara</span><span class="r-r">${fmtTL2(q.amount)}</span></div>
        <div class="r-row"><span class="r-l">Faiz ${ewaExampleTag()}<i class="ewa-sub">Aylık %${ewaPct(EWA_TERMS.monthlyRate)} · ${q.days} gün</i></span><span class="r-r">${fmtTL2(q.interest)}</span></div>
        <div class="r-row"><span class="r-l">KKDF + BSMV ${ewaExampleTag()}<i class="ewa-sub">Faiz üzerinden %${EWA_TERMS.taxRate}</i></span><span class="r-r">${fmtTL2(q.tax)}</span></div>
        <div class="r-row hl"><span class="r-l">Toplam geri ödeme tutarı</span><span class="r-r">${fmtTL2(q.total)}</span></div>
        <div class="r-row"><span class="r-l">Geri ödeme tarihi</span><span class="r-r">${EWA_PAYDAY.label}</span></div>
        <div class="r-row"><span class="r-l">Geri ödeme yöntemi</span><span class="r-r">Maaşından otomatik tahsil<i class="ewa-sub r">${EWA_ACCT.name} · ${EWA_ACCT.no.split('· ')[1]}</i></span></div>
      </div>

      <div class="ewa-sec-t">Bilgilendirme ve sözleşme</div>
      <div class="ewa-docs">
        <label class="contract-row ${s.agreePre ? 'on' : ''}" data-action="ewa-agree" data-key="agreePre">
          <span class="cbx">${I.check}</span>
          <span class="contract-txt"><a data-action="ewa-doc" data-doc="pre">Ön Bilgilendirme Formu</a>'nu okudum.</span>
        </label>
        <label class="contract-row ${s.agreeContract ? 'on' : ''}" data-action="ewa-agree" data-key="agreeContract">
          <span class="cbx">${I.check}</span>
          <span class="contract-txt"><a data-action="ewa-doc" data-doc="contract">Erken Maaş Erişim Kredisi Sözleşmesi</a>'ni okudum, onaylıyorum.</span>
        </label>
      </div>
    </div>
    <div class="screen-cta">
      <button class="btn-primary ${s.agreePre && s.agreeContract ? '' : 'disabled'}" id="ewa-terms-next" data-action="ewa-review">Devam</button>
    </div>
  </div>`;
}
function ewaToggleAgree(el) {
  const s = state.ewa, k = el.dataset.key;
  s[k] = !s[k];
  el.classList.toggle('on', s[k]);
  const b = document.getElementById('ewa-terms-next');
  if (b) b.classList.toggle('disabled', !(s.agreePre && s.agreeContract));
}
function ewaDocSheet(kind) {
  const q = ewaQuote(state.ewa.amount);
  const title = kind === 'pre' ? 'Ön Bilgilendirme Formu' : 'Erken Maaş Erişim Kredisi Sözleşmesi';
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>${title}</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="legal-scroll">
      <p>Bu metin prototip amaçlı örnek bir metindir; gerçek ürün koşullarını yansıtmaz.</p>
      <h4>1. Kredinin konusu</h4>
      <p>Banka, maaş müşterisine bu ayki net maaşının %${EWA_TERMS.ratio}'ine kadar kredi kullandırır. Talep edilen tutar <b>${fmtTL2(q.amount)}</b>, hesaba aktarılacak tutar <b>${fmtTL2(q.credited)}</b>.</p>
      <h4>2. Maliyetler (örnek)</h4>
      <p>Tahsis ücreti %${ewaPct(EWA_TERMS.feeRate)}, aylık faiz %${ewaPct(EWA_TERMS.monthlyRate)}; faiz üzerinden KKDF ve BSMV. Toplam geri ödeme <b>${fmtTL2(q.total)}</b>.</p>
      <h4>3. Geri ödeme</h4>
      <p>Toplam geri ödeme tutarı ${EWA_PAYDAY.label} tarihinde maaşın ${EWA_ACCT.name}'a yattığında otomatik tahsil edilir. Maaş yatmazsa ilgili tutar hesaptan tahsil edilir.</p>
      <h4>4. Cayma hakkı</h4>
      <p>Müşteri, sözleşmenin kurulduğu tarihten itibaren 14 gün içinde gerekçe göstermeksizin cayma hakkına sahiptir.</p>
    </div>
    <button class="sheet-btn ghost" data-action="close-sheet">Kapat</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}

/* -------------------- Screen 4 — summary & approval -------------------- */
function EwaConfirm() {
  const s = state.ewa;
  if (ewaAvail() < EWA_TERMS.min || !(s.agreePre && s.agreeContract)) { state.screen = 'erken-maas'; return EwaHome(); }
  const q = ewaQuote(s.amount);
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Başvuru Özeti</div>
    </div>
    <div class="screen-scroll">
      <div class="ewa-confirm-amt">
        <span>Erken maaş erişim tutarı</span>
        <b>${fmtTL2(q.amount)}</b>
        <em>${EWA_PAYDAY.month} maaşından</em>
      </div>
      <div class="receipt ewa-receipt">
        <div class="r-row"><span class="r-l">Hesaba aktarılacak tutar</span><span class="r-r">${fmtTL2(q.credited)}<i class="ewa-sub r">${EWA_ACCT.name}</i></span></div>
        <div class="r-row"><span class="r-l">Toplam geri ödeme tutarı</span><span class="r-r">${fmtTL2(q.total)}</span></div>
        <div class="r-row"><span class="r-l">Geri ödeme tarihi</span><span class="r-r">${EWA_PAYDAY.label}</span></div>
        <div class="r-row"><span class="r-l">Talep sonrası kalan limit</span><span class="r-r">${fmtTL2(ewaAvail() - q.amount)}</span></div>
      </div>
      <div class="ewa-card ewa-terms-sum">
        <div class="ewa-card-h"><span>Ödeme koşulları</span>${ewaExampleTag()}</div>
        <ul>
          <li>Toplam geri ödeme tutarı, ${EWA_PAYDAY.label} tarihinde maaşın ${EWA_ACCT.name}'a yattığında otomatik tahsil edilir.</li>
          <li>Tahsis ücreti (${fmtTL2(q.fee)}) aktarım sırasında kesilir; faiz ve vergiler (${fmtTL2(q.interest + q.tax)}) geri ödemeye eklenir.</li>
          <li>Ön bilgilendirme formu ve kredi sözleşmesi onaylandı.</li>
        </ul>
      </div>
    </div>
    <div class="screen-cta">
      <button class="btn-primary ewa-approve" id="ewa-approve" data-action="ewa-approve">${I.faceid} Başvuruyu Onayla</button>
      <button class="btn-ghost" data-action="ewa-cancel">Vazgeç</button>
    </div>
  </div>`;
}
function ewaApprove() {
  const btn = document.getElementById('ewa-approve');
  if (!btn) return;
  btn.innerHTML = '<span class="spinner"></span> Başvuru Onaylanıyor…';
  btn.style.pointerEvents = 'none';
  setTimeout(() => { ewaApply(); go('erken-maas-sonuc'); }, 1500);
}
function ewaApply() {
  const s = state.ewa, q = ewaQuote(s.amount), now = ewaNow();
  const rec = { id: 'e' + Date.now(), month: EWA_PAYDAY.month, date: now.full, amount: q.amount, repay: EWA_PAYDAY.dotted, days: q.days, status: 'open', ref: now.ref, isNew: true };
  s.history.forEach(x => { x.isNew = false; });
  s.history.unshift(rec);
  s.last = rec;
  s.agreePre = false; s.agreeContract = false;
  ewaClampDefault();
}

/* -------------------- Screen 5 — result -------------------- */
function EwaResult() {
  const s = state.ewa, r = s.last;
  if (!r) { state.screen = 'erken-maas'; return EwaHome(); }
  const q = ewaQuote(r.amount, r.days), limit = ewaLimit(), used = ewaUsed();
  return `
  <div class="screen anim-fade">
    <div class="screen-scroll">
      <div class="success ewa-success">
        <div class="success-check"><div class="ring">${I.checkBig}</div></div>
        <h2>Tutar Hesabına Aktarıldı</h2>
        <div class="succ-date">${r.date}</div>
        <div class="amt">${fmtTL2(q.credited)}</div>
        <div class="prod">${EWA_ACCT.name} · ${EWA_ACCT.no.split('· ')[1]}</div>

        <div class="ewa-card flat">
          <div class="ewa-card-h"><span>Güncel erken erişim limitin</span></div>
          <div class="ewa-left-big"><b>${fmtTL2(limit - used)}</b><span>kullanılabilir</span></div>
          <div class="ewa-meter"><i style="width:${Math.round(used / limit * 100)}%"></i></div>
          <div class="ewa-meter-l"><span>Kullanılan ${fmtTL2(used)}</span><span>Limit ${fmtTL2(limit)}</span></div>
        </div>

        <div class="receipt">
          <div class="r-row"><span class="r-l">İşlem no</span><span class="r-r">${r.ref}</span></div>
          <div class="r-row"><span class="r-l">İşlem tarihi</span><span class="r-r">${r.date}</span></div>
          <div class="r-row"><span class="r-l">Talep edilen tutar</span><span class="r-r">${fmtTL2(q.amount)}</span></div>
          <div class="r-row"><span class="r-l">Geri ödeme tarihi</span><span class="r-r">${EWA_PAYDAY.label}</span></div>
          <div class="r-row"><span class="r-l">Toplam geri ödeme</span><span class="r-r">${fmtTL2(q.total)}</span></div>
        </div>
        <div class="success-actions">
          <button class="btn-primary" data-action="ewa-home">Ana Ekrana Dön</button>
          <button class="btn-outline" data-action="ewa-history-after">İşlem Geçmişi</button>
        </div>
      </div>
    </div>
  </div>`;
}

/* -------------------- Screen 6 — history & repayment tracking -------------------- */
function EwaHistory() {
  const h = state.ewa.history, open = h.filter(x => x.status === 'open');
  const openTotal = open.reduce((a, x) => a + ewaQuote(x.amount, x.days).total, 0);
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">İşlem Geçmişi</div>
    </div>
    <div class="screen-scroll">
      <div class="ewa-card ewa-open">
        ${open.length
          ? `<div><span>Açık geri ödeme</span><b>${fmtTL2(openTotal)}</b><em>${EWA_PAYDAY.label} · maaşından otomatik tahsil edilecek</em></div><span class="ewa-status open big">${I.calendar}Bekliyor</span>`
          : `<div><span>Açık geri ödemen yok</span><b>${fmtTL2(0)}</b><em>Önceki tüm erken erişimler maaş gününde geri ödendi</em></div><span class="ewa-status paid big">${I.check}Güncel</span>`}
      </div>
      <div class="ru-txn-title">İşlemler</div>
      <div class="ewa-hist">${h.map(ewaHistRowHTML).join('')}</div>
    </div>
  </div>`;
}
function ewaHistRowHTML(x) {
  const open = x.status === 'open';
  return `<div class="ewa-h" data-action="ewa-hist-open" data-id="${x.id}">
    <span class="ewa-h-ico ${open ? 'open' : 'paid'}">${I.salaryEarly}</span>
    <div class="ewa-h-mid"><b>${x.month}${x.isNew ? ' <em class="ewa-new">Yeni</em>' : ''}</b><span>İşlem ${x.date.split(' · ')[0]}</span><span>Geri ödeme ${x.repay}</span></div>
    <div class="ewa-h-r"><b>${fmtTL2(x.amount)}</b><span class="ewa-status ${open ? 'open' : 'paid'}">${open ? 'Geri ödeme bekliyor' : 'Geri ödendi'}</span></div>
    <span class="ewa-h-chev">${I.chevR}</span>
  </div>`;
}
function ewaHistSheet(id) {
  const x = state.ewa.history.find(h => h.id === id);
  if (!x) return;
  const q = ewaQuote(x.amount, x.days), open = x.status === 'open';
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>İşlem Detayı</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="ewa-sh-head">
      <span class="ewa-status big ${open ? 'open' : 'paid'}">${open ? I.calendar : I.check}${open ? 'Geri ödeme bekliyor' : 'Geri ödendi'}</span>
      <b>${fmtTL2(q.amount)}</b>
      <span>${x.month} maaşından erken erişim</span>
    </div>
    <div class="receipt ewa-sh-receipt">
      <div class="r-row"><span class="r-l">İşlem tarihi</span><span class="r-r">${x.date}</span></div>
      <div class="r-row"><span class="r-l">Hesaba aktarılan</span><span class="r-r">${fmtTL2(q.credited)}</span></div>
      <div class="r-row"><span class="r-l">Faiz + vergiler (örnek)</span><span class="r-r">${fmtTL2(q.interest + q.tax)}</span></div>
      <div class="r-row"><span class="r-l">Toplam geri ödeme</span><span class="r-r">${fmtTL2(q.total)}</span></div>
      <div class="r-row"><span class="r-l">${open ? 'Geri ödeme tarihi' : 'Tahsil tarihi'}</span><span class="r-r">${x.repay}</span></div>
      <div class="r-row"><span class="r-l">İşlem no</span><span class="r-r">${x.ref}</span></div>
    </div>
    <button class="sheet-btn ghost" data-action="toast" data-msg="Dekont paylaşımı prototipte aktif değil">Dekontu Paylaş</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}

/* -------------------- navigation -------------------- */
// Drop the flow screens from the back stack so "back" lands where the feature was opened from
function ewaUnwind() {
  const i = state.nav.map(f => f.screen).lastIndexOf('erken-maas');
  if (i >= 0) state.nav = state.nav.slice(0, i);
}
function ewaGoHome() {
  ewaUnwind();
  state.chatSeed = false;
  state.screen = 'erken-maas';
  render();
}
function ewaHistoryAfter() {
  ewaUnwind();
  state.nav.push({ screen: 'erken-maas', chatSeed: false });
  state.screen = 'erken-maas-gecmis';
  render();
}
function ewaStart() {
  if (ewaAvail() < EWA_TERMS.min) return;
  state.ewa.agreePre = false; state.ewa.agreeContract = false;
  ewaClampDefault();
  go('erken-maas-tutar');
}
function ewaCancel() {
  state.ewa.agreePre = false; state.ewa.agreeContract = false;
  ewaGoHome();
  toast('Başvuru iptal edildi');
}
// Deep links (#erken-maas-…) prepare the state they need without replaying the flow
function ewaSeed(h) {
  const s = state.ewa;
  ewaClampDefault();
  if (h === 'erken-maas-onay') { s.agreePre = true; s.agreeContract = true; }
  if (h === 'erken-maas-sonuc' && !s.last && ewaAvail() >= EWA_TERMS.min) ewaApply();
}

/* ======================================================================
   MARKETPLACE TAŞIT (draft) — vehicle loan marketplace
   Car search → listing & price comparison → details → loan pre-approval →
   loan & payment plan → final application & disbursement → kasko →
   delivery tracking, in one journey. Sellers are Otokoç Otomotiv (Koç
   Topluluğu) locations and kasko comes from Allianz Türkiye; listings,
   rates, instalments, coverages and premiums are EXAMPLE figures that do
   not represent real terms. Car pictures are representative vector
   illustrations (real photos can be added per car via `photos`).
   ====================================================================== */

const VM_RATE = { monthly: 2.19, tax: 30 };   // EXAMPLE: monthly interest %, KKDF + BSMV % on interest
const VM_PRE_LIMIT = 1250000;                 // EXAMPLE pre-approved amount for the demo customer
const VM_MIN_DOWN = 20;                       // EXAMPLE minimum down payment (% of price)
const VM_MIN_LOAN = 100000;                   // EXAMPLE minimum loan amount (TL)
const VM_TERMS = [12, 24, 36, 48];
const VM_EST = { downPct: 40, term: 36 };     // basis of the "aylık ~" estimates on cards
const VM_AY = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const VM_TYPES = ['Sedan', 'Hatchback', 'SUV', 'Station Wagon'];
const VM_CITIES = ['İstanbul', 'Ankara', 'İzmir', 'Bursa'];
const VM_ICO = {
  filter: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg>',
  sort: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4v16M3.5 16.5 7 20l3.5-3.5M17 20V4M13.5 7.5 17 4l3.5 3.5"/></svg>',
  phone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 12l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>',
  route: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11 21 3l-8 18-2-8z"/></svg>',
  key: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3M15 8l2 2"/></svg>',
  clock: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
  compare: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="7" height="16" rx="2"/><rect x="14" y="4" width="7" height="16" rx="2"/><path d="M6.5 9h0M17.5 9h0"/></svg>',
};
// Mock customer data used in the pre-evaluation (masked; no real personal data)
const VM_PROFILE = { name: 'Selçuk İmre', tckn: '•••••••••42', phone: '0 (5••) ••• •• 24', job: 'Özel sektör · Ücretli', income: 150000 };
// Every listing is sold by an Otokoç Otomotiv (Koç Topluluğu) location: new cars by Otokoç
// authorized dealers, used cars by Otokoç 2. El. Locations are DEMO data; no third-party sellers.
const VM_PAYEE = { short: 'Otokoç Otomotiv', legal: 'Otokoç Otomotiv Tic. ve San. A.Ş.' };   // loan is paid to the seller
const VM_DEALERS = {
  d1: { name: 'Otokoç 2. El',            kind: '2. El',        city: 'İstanbul', district: 'Sarıyer' },
  d2: { name: 'Otokoç 2. El',            kind: '2. El',        city: 'İstanbul', district: 'Ataşehir' },
  d3: { name: 'Otokoç 2. El',            kind: '2. El',        city: 'Ankara',   district: 'Çankaya' },
  d4: { name: 'Otokoç 2. El',            kind: '2. El',        city: 'İzmir',    district: 'Bornova' },
  d5: { name: 'Otokoç 2. El',            kind: '2. El',        city: 'Bursa',    district: 'Nilüfer' },
  d6: { name: 'Otokoç Sultanbeyli Ford', kind: 'Yetkili bayi', city: 'İstanbul', district: 'Sultanbeyli' },
  d7: { name: 'Otokoç İstinye Fiat',     kind: 'Yetkili bayi', city: 'İstanbul', district: 'Sarıyer' },
};
const VM_EQUIP_PREMIUM = ['Matrix LED farlar', 'Dijital gösterge paneli', 'Geri görüş kamerası', 'Adaptif hız sabitleyici', 'Kablosuz CarPlay / Android Auto', 'Çift bölgeli otomatik klima', 'Elektrikli bagaj kapağı', 'Isıtmalı ön koltuklar'];
const VM_EQUIP_BASIC = ['LED gündüz farları', 'Geri görüş kamerası', 'Hız sabitleyici', 'CarPlay / Android Auto', 'Otomatik klima', 'Park sensörleri'];
// Cars are DEMO listings. `photos: ['assets/arac/a4-1.jpg', …]` replaces the illustration when real photos are added.
const VM_CARS = [
  { id: 'a4',      brand: 'Audi',          model: 'A4',      trim: 'Sedan 40 TFSI Advanced',     year: 2022, km: 45000, price: 2000000, cond: 'used', type: 'Sedan',         fuel: 'Benzin', gear: 'Otomatik (S tronic)', engine: '2.0 TFSI · 204 PS', drive: 'Önden çekiş', colorName: 'Lacivert', color: '#22385f', dealer: 'd1', featured: true, equip: VM_EQUIP_PREMIUM },
  { id: 'bmw3',    brand: 'BMW',           model: '3 Serisi', trim: '320i M Sport',              year: 2021, km: 62000, price: 2150000, cond: 'used', type: 'Sedan',         fuel: 'Benzin', gear: 'Otomatik (Steptronic)', engine: '1.6 · 170 PS', drive: 'Arkadan itiş', colorName: 'Siyah', color: '#1b1d22', dealer: 'd2', featured: true, equip: VM_EQUIP_PREMIUM },
  { id: 'xc40',    brand: 'Volvo',         model: 'XC40',    trim: 'B4 Plus Dark',               year: 2022, km: 41000, price: 2280000, cond: 'used', type: 'SUV',           fuel: 'Benzin (hafif hibrit)', gear: 'Otomatik', engine: '2.0 · 197 PS', drive: 'Önden çekiş', colorName: 'Beyaz', color: '#e9ecef', dealer: 'd1', featured: true, equip: VM_EQUIP_PREMIUM },
  { id: 'tucson',  brand: 'Hyundai',       model: 'Tucson',  trim: '1.6 T-GDI Elite Plus',       year: 2023, km: 25000, price: 1780000, cond: 'used', type: 'SUV',           fuel: 'Benzin', gear: 'Otomatik (DCT)', engine: '1.6 T-GDI · 180 PS', drive: 'Önden çekiş', colorName: 'Yeşil', color: '#3e5a4b', dealer: 'd3', featured: true, equip: VM_EQUIP_BASIC },
  { id: 'c200',    brand: 'Mercedes-Benz', model: 'C 200',   trim: 'AMG',                        year: 2021, km: 58000, price: 2450000, cond: 'used', type: 'Sedan',         fuel: 'Benzin (hafif hibrit)', gear: 'Otomatik (9G-Tronic)', engine: '1.5 · 204 PS', drive: 'Arkadan itiş', colorName: 'Gri', color: '#7d858e', dealer: 'd3', equip: VM_EQUIP_PREMIUM },
  { id: 'a3',      brand: 'Audi',          model: 'A3',      trim: 'Sportback 35 TFSI S line',   year: 2023, km: 21000, price: 1850000, cond: 'used', type: 'Hatchback',     fuel: 'Benzin', gear: 'Otomatik (S tronic)', engine: '1.5 TFSI · 150 PS', drive: 'Önden çekiş', colorName: 'Kırmızı', color: '#a8232c', dealer: 'd2', equip: VM_EQUIP_PREMIUM },
  { id: 'puma',    brand: 'Ford',          model: 'Puma',    trim: '1.0 EcoBoost Hibrit ST-Line', year: 2026, km: 0,     price: 1890000, cond: 'new',  type: 'SUV',           fuel: 'Benzin (hafif hibrit)', gear: 'Otomatik (7 ileri)', engine: '1.0 EcoBoost · 155 PS', drive: 'Önden çekiş', colorName: 'Mavi', color: '#2f5f9e', dealer: 'd6', equip: VM_EQUIP_BASIC },
  { id: 'passat',  brand: 'Volkswagen',    model: 'Passat',  trim: '1.5 TSI Elegance',           year: 2022, km: 38000, price: 1550000, cond: 'used', type: 'Sedan',         fuel: 'Benzin', gear: 'Otomatik (DSG)', engine: '1.5 TSI · 150 PS', drive: 'Önden çekiş', colorName: 'Mavi', color: '#2a4e86', dealer: 'd4', equip: VM_EQUIP_BASIC },
  { id: 'p3008',   brand: 'Peugeot',       model: '3008',    trim: '1.2 PureTech GT',            year: 2022, km: 47000, price: 1420000, cond: 'used', type: 'SUV',           fuel: 'Benzin', gear: 'Otomatik (EAT8)', engine: '1.2 PureTech · 130 PS', drive: 'Önden çekiş', colorName: 'Gri', color: '#5f6873', dealer: 'd5', equip: VM_EQUIP_BASIC },
  { id: 'corolla', brand: 'Toyota',        model: 'Corolla', trim: '1.5 Dream',                  year: 2023, km: 22000, price: 1120000, cond: 'used', type: 'Sedan',         fuel: 'Benzin', gear: 'Otomatik (Multidrive S)', engine: '1.5 · 125 PS', drive: 'Önden çekiş', colorName: 'Beyaz', color: '#eceff2', dealer: 'd4', equip: VM_EQUIP_BASIC },
  { id: 'egea',    brand: 'Fiat',          model: 'Egea',    trim: 'SW 1.4 Fire Urban Plus',     year: 2026, km: 0,     price: 1090000, cond: 'new',  type: 'Station Wagon', fuel: 'Benzin', gear: 'Manuel', engine: '1.4 Fire · 95 PS', drive: 'Önden çekiş', colorName: 'Bordo', color: '#6e1f2b', dealer: 'd7', equip: VM_EQUIP_BASIC },
  { id: 'clio',    brand: 'Renault',       model: 'Clio',    trim: '1.0 TCe Touch',              year: 2023, km: 18000, price: 890000,  cond: 'used', type: 'Hatchback',     fuel: 'Benzin', gear: 'Manuel', engine: '1.0 TCe · 90 PS', drive: 'Önden çekiş', colorName: 'Turuncu', color: '#c9622a', dealer: 'd4', equip: VM_EQUIP_BASIC },
];
// Kasko offers come from Allianz Türkiye. Package names follow Allianz's kasko packages (Eko, Kapsamlı);
// coverage details, add-ons and premiums here are EXAMPLE figures.
const VM_KASKO = [
  { id: 'k1', ins: 'Allianz Türkiye', pkg: 'Eko Paket', short: 'Eko', tag: 'Uygun fiyatlı', premium: 44900, color: '#003781',
    cover: { carpma: true, deprem: 'İsteğe bağlı', sel: true, cam: true, mini: true, yol: true, ikame: '7 gün', ferdi: true, hukuk: true, hasarsiz: false, yurtdisi: false } },
  { id: 'k2', ins: 'Allianz Türkiye', pkg: 'Kapsamlı Paket', short: 'Kapsamlı', tag: 'Önerilen', premium: 52300, color: '#003781',
    cover: { carpma: true, deprem: true, sel: true, cam: true, mini: true, yol: true, ikame: '15 gün', ferdi: true, hukuk: true, hasarsiz: false, yurtdisi: false } },
  { id: 'k3', ins: 'Allianz Türkiye', pkg: 'Kapsamlı Paket + Ek Teminatlar', short: 'Kapsamlı +', tag: 'En geniş kapsam', premium: 61900, color: '#003781',
    cover: { carpma: true, deprem: true, sel: true, cam: true, mini: true, yol: true, ikame: '30 gün', ferdi: true, hukuk: true, hasarsiz: true, yurtdisi: true } },
];
const VM_COVERS = [['carpma', 'Çarpma, çarpışma, hırsızlık'], ['deprem', 'Deprem'], ['sel', 'Sel ve su baskını'], ['cam', 'Cam kırılması'], ['mini', 'Mini onarım (kaporta, boya, döşeme)'], ['yol', 'Yol yardım ve çekici'], ['ikame', 'Yedek (ikame) araç'], ['ferdi', 'Ferdi kaza'], ['hukuk', 'Hukuksal koruma'], ['hasarsiz', 'Hasarsızlık koruma'], ['yurtdisi', 'Yurt dışı teminatı']];

state.vm = {
  f: { cond: 'all', brand: null, model: null, pmin: null, pmax: null, types: [], year: null, km: null, city: null, seller: null },
  more: false,        // detailed filters open
  sort: 'rec',
  favs: [],
  favOnly: false,
  cmp: [],            // listing comparison (max 3)
  car: 'a4',          // car being viewed (detail) and, before the application, financed
  flowCar: 'a4',      // car the down payment / term below were set up for
  down: 800000,       // down payment (TL)
  term: 36,           // months
  consent: false,     // KKB / KVKK consent for pre-evaluation
  preBusy: false,     // pre-evaluation running
  preStep: 0,         // completed pre-evaluation checks
  pre: null,          // pre-approval { car, amount, req, at, until, ref }
  scen: [],           // saved financing scenarios [{ label, down, term }] (max 3)
  agree: { pre: false, contract: false, pledge: false },
  app: null,          // final application { car, status: 'review' | 'approved', step, ref, at, down, term, loan, pay, total, first }
  kasko: 'k2',        // selected kasko offer
  kInst: 1,           // kasko premium instalments (1 = Tek Çekim, the default)
  kAgree: false,      // kasko information form read
  policy: null,       // { offer, no, at, inst, start, end }
  disb: null,         // disbursement { at, ref, noter, eta }
  stage: 0,           // after disbursement: 0 notary & pledge, 1 preparing for delivery, 2 ready, 3 delivered
  justDone: false,    // tracking opened right after policy + disbursement
};
let vmSvgSeq = 0;
let vmAnimNext = null;   // one-shot animation for in-place screen updates (mode switches)
let vmWarnTimer = null;
function vmAnim() { const a = vmAnimNext || 'anim-right'; vmAnimNext = null; return a; }
function vmRerender(anim = 'anim-fade') { vmAnimNext = anim; render(); }

/* -------------------- helpers -------------------- */
function vmCar(id = state.vm.car) { return VM_CARS.find(c => c.id === id) || VM_CARS[0]; }
function vmDealer(c) { return VM_DEALERS[c.dealer]; }
function vmTL(n) { return Math.round(n).toLocaleString('tr-TR') + ' TL'; }
function vmKm(n) { return n ? n.toLocaleString('tr-TR') + ' km' : '0 km'; }
function vmCondLabel(c) { return c.cond === 'new' ? 'Sıfır' : 'İkinci el'; }
function vmI() { return VM_RATE.monthly / 100 * (1 + VM_RATE.tax / 100); }   // monthly cost rate incl. taxes
function vmPay(P, n) { const i = vmI(); return P <= 0 ? 0 : P * i / (1 - Math.pow(1 + i, -n)); }
function vmEstimate(c) { return vmPay(c.price * (1 - VM_EST.downPct / 100), VM_EST.term); }
function vmLoan() { return Math.max(0, vmCar().price - state.vm.down); }
function vmPreFor(c = vmCar()) { const p = state.vm.pre; return p && p.car === c.id ? p : null; }
function vmDownMinRule(c) { return Math.ceil(c.price * VM_MIN_DOWN / 100 / 10000) * 10000; }
/* Lowest down payment: the minimum ratio, or what the pre-approved amount leaves uncovered */
function vmDownMin(c = vmCar()) {
  const pre = vmPreFor(c);
  return pre ? Math.max(vmDownMinRule(c), Math.ceil((c.price - pre.amount) / 10000) * 10000) : vmDownMinRule(c);
}
function vmDownMax(c = vmCar()) { return Math.floor((c.price - VM_MIN_LOAN) / 10000) * 10000; }
function vmPct(a, b) { return b ? Math.round(a / b * 100) : 0; }
function vmPctStr(n) { return String(n).replace('.', ','); }
function vmDateIn(days) { const d = new Date(); d.setDate(d.getDate() + days); return `${d.getDate()} ${VM_AY[d.getMonth()]} ${d.getFullYear()}`; }
function vmFirstDue() { const d = new Date(); return `${Math.min(d.getDate(), 28)} ${VM_AY[(d.getMonth() + 1) % 12]} ${d.getFullYear() + (d.getMonth() === 11 ? 1 : 0)}`; }
/* Example quote: KKDF + BSMV are charged on the interest part of every instalment */
function vmQuote(loan = vmLoan(), n = state.vm.term) {
  const pay = vmPay(loan, n), total = pay * n, cost = total - loan;
  const interest = cost / (1 + VM_RATE.tax / 100);
  return { loan, n, pay, total, interest, tax: cost - interest };
}
function vmNowStr() {
  const d = new Date(), p2 = n => String(n).padStart(2, '0');
  return `${p2(d.getDate())}.${p2(d.getMonth() + 1)}.${d.getFullYear()} · ${p2(d.getHours())}:${p2(d.getMinutes())}`;
}
function vmRef(prefix) { return prefix + String(Math.floor(100000000 + Math.random() * 900000000)); }
function vmPlanRows(P, n) {
  const i = vmI(), pay = vmPay(P, n), rows = [], now = new Date(), day = Math.min(now.getDate(), 28);
  const p2 = x => String(x).padStart(2, '0');
  let bal = P;
  for (let k = 1; k <= n; k++) {
    const cost = bal * i, princ = pay - cost;
    bal = Math.max(0, bal - princ);
    const d = new Date(now.getFullYear(), now.getMonth() + k, day);
    rows.push({ k, date: `${p2(d.getDate())}.${p2(d.getMonth() + 1)}.${d.getFullYear()}`, pay, princ, cost, bal });
  }
  return rows;
}
function vmShade(hex, f) {   // f > 0 lighten, f < 0 darken
  const n = parseInt(hex.slice(1), 16), ch = [n >> 16, (n >> 8) & 255, n & 255];
  return '#' + ch.map(v => Math.round(f > 0 ? v + (255 - v) * f : v * (1 + f)).toString(16).padStart(2, '0')).join('');
}

/* -------------------- car illustration (side profile, studio look) -------------------- */
const VM_BODY = {
  Sedan: {
    body: 'M34,146 C32,134 34,122 42,116 L58,108 L118,104 C140,84 162,70 196,66 L246,65 C268,66 288,80 308,96 L352,104 C366,107 372,116 372,128 L372,142 C372,148 368,150 362,150 L330,150 A30,30 0 0 0 270,150 L140,150 A30,30 0 0 0 80,150 L42,150 C37,150 34,149 34,146 Z',
    win: 'M127,102 C146,86 167,74 197,71 L244,70 C262,71 278,82 294,96 Z', pillars: [[213, 71, 99, 6]],
    doors: 'M213,100 L211,147 M293,97 C297,118 297,134 295,147 M132,103 C128,120 128,136 130,147', handles: [[186, 112], [264, 110]],
    head: 'M350,108 L369,112 L368,119 L348,115 Z', tail: 'M37,120 L56,111 L59,117 L39,126 Z', wheels: [110, 300], wy: 150, wr: 27, mirror: [290, 94],
  },
  Hatchback: {
    body: 'M56,146 C54,132 55,114 60,104 L68,82 C72,72 80,68 96,67 L232,64 C256,66 276,80 296,96 L340,104 C354,107 360,116 360,128 L360,142 C360,148 356,150 350,150 L326,150 A30,30 0 0 0 266,150 L150,150 A30,30 0 0 0 90,150 L64,150 C59,150 56,149 56,146 Z',
    win: 'M74,100 C76,86 82,74 98,72 L230,69 C250,71 266,82 282,96 Z', pillars: [[112, 72, 99, 9], [190, 70, 98, 6]],
    doors: 'M190,99 L188,147 M281,96 C285,118 285,134 283,147 M118,101 C115,120 115,136 117,147', handles: [[166, 112], [252, 110]],
    head: 'M338,108 L357,112 L356,119 L336,115 Z', tail: 'M57,108 L66,104 L67,118 L58,122 Z', wheels: [120, 296], wy: 150, wr: 27, mirror: [278, 94],
  },
  SUV: {
    body: 'M30,140 C28,124 30,104 36,96 L44,66 C48,56 56,51 70,50 L250,48 C270,49 290,64 310,84 L356,92 C368,95 374,104 374,118 L374,138 C374,145 370,148 364,148 L338,148 A34,34 0 0 0 270,148 L148,148 A34,34 0 0 0 80,148 L40,148 C34,148 30,146 30,140 Z',
    win: 'M50,90 L57,63 C59,58 65,56 73,56 L248,54 C264,56 280,68 296,86 Z', pillars: [[100, 57, 89, 10], [178, 55, 88, 7]],
    doors: 'M178,89 L177,145 M296,87 C300,110 300,128 298,145 M104,90 C101,110 101,128 103,145', handles: [[154, 102], [262, 100]],
    head: 'M352,96 L372,101 L371,108 L350,104 Z', tail: 'M31,104 L42,100 L43,114 L32,118 Z', wheels: [114, 304], wy: 148, wr: 30, mirror: [290, 84], rails: 'M72,46 L246,44', clad: true,
  },
  'Station Wagon': {
    body: 'M34,146 C32,132 34,112 40,104 L46,80 C49,72 56,68 70,67 L246,65 C268,66 288,80 308,96 L352,104 C366,107 372,116 372,128 L372,142 C372,148 368,150 362,150 L330,150 A30,30 0 0 0 270,150 L140,150 A30,30 0 0 0 80,150 L42,150 C37,150 34,149 34,146 Z',
    win: 'M56,101 L60,82 C62,76 66,73 74,73 L244,70 C262,71 278,82 294,96 Z', pillars: [[96, 73, 100, 9], [205, 71, 99, 6]],
    doors: 'M205,100 L203,147 M293,97 C297,118 297,134 295,147 M124,101 C121,120 121,136 123,147', handles: [[180, 112], [262, 110]],
    head: 'M350,108 L369,112 L368,119 L348,115 Z', tail: 'M35,106 L45,102 L46,116 L36,120 Z', wheels: [110, 300], wy: 150, wr: 27, mirror: [290, 94], rails: 'M74,63 L240,61',
  },
};
function vmWheelSVG(x, y, r, uid) {
  const spokes = [0, 72, 144, 216, 288].map(a => `<rect x="-2.4" y="${-(r * 0.62).toFixed(1)}" width="4.8" height="${(r * 0.5).toFixed(1)}" rx="2.2" transform="rotate(${a})"/>`).join('');
  return `<g transform="translate(${x},${y})"><circle r="${r}" fill="#111316"/><circle r="${r - 3}" fill="#1b1e22"/><circle r="${(r * 0.66).toFixed(1)}" fill="url(#rim${uid})"/>
    <g fill="#5a626c">${spokes}</g><circle r="${(r * 0.17).toFixed(1)}" fill="#2a2f35"/><circle r="${(r * 0.66).toFixed(1)}" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="1"/></g>`;
}
/* variant: side | front | rear | mirror; bg: studio | dark | none */
function vmCarSVG(c, variant = 'side', bg = 'studio') {
  const b = VM_BODY[c.type] || VM_BODY.Sedan, u = ++vmSvgSeq, col = c.color;
  const light = parseInt(col.slice(1, 3), 16) > 200;
  const vb = variant === 'front' ? '215 52 185 116' : variant === 'rear' ? '0 52 185 116' : '0 0 400 200';
  const bgSvg = bg === 'none' ? '' : bg === 'dark'
    ? `<rect width="400" height="200" fill="url(#bg${u})"/><rect y="150" width="400" height="50" fill="url(#fl${u})"/>`
    : `<rect width="400" height="200" fill="url(#bg${u})"/><rect y="150" width="400" height="50" fill="url(#fl${u})"/>`;
  const bgStops = bg === 'dark' ? ['#3a4553', '#1a2028', '#161b21', '#0f1318'] : ['#f3f6f9', '#d5dde6', '#cdd5de', '#eef1f5'];
  const car = `
    <ellipse cx="${(b.wheels[0] + b.wheels[1]) / 2}" cy="${b.wy + b.wr - 4}" rx="${(b.wheels[1] - b.wheels[0]) / 2 + 92}" ry="10" fill="url(#sh${u})"/>
    ${b.rails ? `<path d="${b.rails}" stroke="${vmShade(col, -0.55)}" stroke-width="4" stroke-linecap="round"/>` : ''}
    <path d="${b.body}" fill="url(#bd${u})" stroke="${light ? 'rgba(0,0,0,.28)' : 'rgba(0,0,0,.35)'}" stroke-width="1"/>
    ${b.clad ? '<rect x="34" y="132" width="336" height="16" rx="6" fill="rgba(20,22,26,.55)"/>' : ''}
    <path d="${b.win}" fill="url(#gl${u})"/>
    <path d="${b.win}" fill="url(#rf${u})" opacity=".9"/>
    ${b.pillars.map(([x, y1, y2, w]) => `<rect x="${x - w / 2}" y="${y1}" width="${w}" height="${y2 - y1}" fill="${vmShade(col, -0.25)}"/>`).join('')}
    <path d="${b.doors}" fill="none" stroke="rgba(0,0,0,.32)" stroke-width="1.2"/>
    ${b.handles.map(([x, y]) => `<rect x="${x - 8}" y="${y - 1.8}" width="16" height="3.6" rx="1.8" fill="${vmShade(col, -0.4)}"/>`).join('')}
    <path d="M${b.mirror[0]},${b.mirror[1]} l13,-2 l2,8 l-13,2 z" fill="${vmShade(col, -0.2)}"/>
    <path d="${b.head}" fill="url(#hl${u})"/>
    <path d="${b.tail}" fill="#b3121e"/>
    <path d="M40,${b.wy - 2} L370,${b.wy - 2}" stroke="rgba(0,0,0,.18)" stroke-width="3"/>
    ${vmWheelSVG(b.wheels[0], b.wy, b.wr, u)}${vmWheelSVG(b.wheels[1], b.wy, b.wr, u)}`;
  return `<svg class="vm-svg" viewBox="${vb}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${c.brand} ${c.model} (temsilî görsel)">
    <defs>
      <linearGradient id="bg${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bgStops[0]}"/><stop offset="1" stop-color="${bgStops[1]}"/></linearGradient>
      <linearGradient id="fl${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bgStops[2]}"/><stop offset="1" stop-color="${bgStops[3]}"/></linearGradient>
      <radialGradient id="sh${u}"><stop offset="0" stop-color="#000" stop-opacity=".5"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
      <linearGradient id="bd${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${vmShade(col, light ? -0.02 : 0.38)}"/><stop offset=".45" stop-color="${col}"/><stop offset="1" stop-color="${vmShade(col, light ? -0.28 : -0.45)}"/></linearGradient>
      <linearGradient id="gl${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4757"/><stop offset="1" stop-color="#10161d"/></linearGradient>
      <linearGradient id="rf${u}" x1="0" y1="0" x2="1" y2="1"><stop offset=".25" stop-color="#fff" stop-opacity="0"/><stop offset=".45" stop-color="#fff" stop-opacity=".22"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <radialGradient id="rim${u}" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#eef1f4"/><stop offset="1" stop-color="#7d868f"/></radialGradient>
      <linearGradient id="hl${u}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#cfe9ff"/><stop offset="1" stop-color="#ffffff"/></linearGradient>
    </defs>
    ${bgSvg}
    <g${variant === 'mirror' ? ' transform="translate(400,0) scale(-1,1)"' : ''}>${car}</g>
  </svg>`;
}
/* One picture slot: a real photo when provided, otherwise the illustration */
function vmPicHTML(c, variant = 'side', bg = 'studio', idx = 0) {
  if (c.photos && c.photos[idx]) return `<img class="vm-photo" src="${c.photos[idx]}" alt="${c.brand} ${c.model}">`;
  return vmCarSVG(c, variant, bg);
}

/* -------------------- filtering & sorting -------------------- */
const VM_SORTS = [['rec', 'Önerilen'], ['price-asc', 'Fiyat (artan)'], ['price-desc', 'Fiyat (azalan)'], ['year-desc', 'Model yılı (yeni)'], ['km-asc', 'Kilometre (düşük)']];
function vmMatches(c, f = state.vm.f) {
  const d = vmDealer(c);
  if (f.cond !== 'all' && c.cond !== f.cond) return false;
  if (f.brand && c.brand !== f.brand) return false;
  if (f.model && c.model !== f.model) return false;
  if (f.pmin && c.price < f.pmin) return false;
  if (f.pmax && c.price > f.pmax) return false;
  if (f.types.length && !f.types.includes(c.type)) return false;
  if (f.year && c.year < f.year) return false;
  if (f.km && c.km > f.km) return false;
  if (f.city && d.city !== f.city) return false;
  if (f.seller && d.name !== f.seller) return false;
  return true;
}
function vmResults() {
  const v = state.vm;
  let r = VM_CARS.filter(c => vmMatches(c));
  if (v.favOnly) r = r.filter(c => v.favs.includes(c.id));
  const by = {
    rec: (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || VM_CARS.indexOf(a) - VM_CARS.indexOf(b),
    'price-asc': (a, b) => a.price - b.price, 'price-desc': (a, b) => b.price - a.price,
    'year-desc': (a, b) => b.year - a.year || a.km - b.km, 'km-asc': (a, b) => a.km - b.km,
  }[v.sort];
  return r.slice().sort(by);
}
function vmActiveFilters() {
  const f = state.vm.f, out = [];
  if (f.cond !== 'all') out.push(['cond', f.cond === 'new' ? 'Sıfır' : 'İkinci el']);
  if (f.brand) out.push(['brand', f.brand]);
  if (f.model) out.push(['model', f.model]);
  if (f.pmin) out.push(['pmin', 'En az ' + vmTL(f.pmin)]);
  if (f.pmax) out.push(['pmax', 'En çok ' + vmTL(f.pmax)]);
  f.types.forEach(t => out.push(['type:' + t, t]));
  if (f.year) out.push(['year', f.year + ' ve sonrası']);
  if (f.km) out.push(['km', vmKm(f.km) + '\'ye kadar']);
  if (f.city) out.push(['city', f.city]);
  if (f.seller) out.push(['seller', f.seller]);
  return out;
}
function vmUnset(key) {
  const f = state.vm.f;
  if (key.startsWith('type:')) f.types = f.types.filter(t => t !== key.slice(5));
  else if (key === 'cond') f.cond = 'all';
  else if (key === 'brand') { f.brand = null; f.model = null; }
  else f[key] = null;
}

/* -------------------- Screen 1 — search (marketplace home) -------------------- */
function VmHome() {
  const v = state.vm, feat = VM_CARS.filter(c => c.featured);
  const brands = [...new Set(VM_CARS.map(c => c.brand))];
  return `
  <div class="screen ${vmAnim()} vm">
    <div class="nav-head ru-nav-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Marketplace Taşıt</div>
      <button class="vm-favs-btn" data-action="vm-favs" aria-label="Favoriler">${I.heart}<span id="vm-fav-n">${v.favs.length}</span></button>
    </div>
    <div class="screen-scroll">
      <div class="vm-hero">
        <div class="vm-hero-t">Hayalindeki aracı bul,<br>finansmanını burada tamamla</div>
        <div class="vm-hero-s">Otokoç'tan sıfır ve ikinci el araçlar; kredi, kasko ve teslim tek akışta</div>
        <div class="vm-hero-car" id="vm-hero-anim" role="img" aria-label="Yolda ilerleyen araç animasyonu"></div>
      </div>
      <div class="vm-search" id="vm-search">${vmSearchHTML()}</div>
      ${v.app || v.pre ? vmOngoingHTML() : ''}
      <div class="vm-sec-h"><span>Popüler markalar</span></div>
      <div class="vm-brands">${brands.map(b => `<button class="vm-brand" data-action="vm-brand-go" data-v="${b}"><i>${b[0]}</i><span>${b}</span><em>${VM_CARS.filter(c => c.brand === b).length} ilan</em></button>`).join('')}</div>
      <div class="vm-sec-h"><span>Öne çıkan araçlar</span><button class="sp-link" data-action="vm-show-all">Tümü ${I.chevR}</button></div>
      <div class="vm-feat">${feat.map((c, i) => vmFeatCardHTML(c, i)).join('')}</div>
      <div class="vm-sec-h"><span>Aracını tek uygulamada al</span></div>
      <div class="vm-journey">
        <div><span class="n">1</span><b>Bul ve karşılaştır</b><em>Otokoç ilanları tek aramada</em></div>
        <div><span class="n">2</span><b>Ön onayını gör</b><em>Ödeme planını kendin kur</em></div>
        <div><span class="n">3</span><b>Kredi ve kasko</b><em>Başvuru ve poliçe aynı akışta</em></div>
        <div><span class="n">4</span><b>Teslim al</b><em>Her adımı buradan izle</em></div>
      </div>
      <div class="vm-note">${I.info}<span>İlanlar, fiyatlar ve kasko primleri demo verisidir; taksitler örnek hesaplamadır, gerçek kredi koşullarını yansıtmaz.</span></div>
    </div>
  </div>`;
}
function vmSearchHTML() {
  const v = state.vm, f = v.f, n = VM_CARS.filter(c => vmMatches(c)).length;
  const adv = [f.types.length, f.year, f.km, f.city, f.seller].filter(Boolean).length;
  const chip = (k, val, label, on) => `<button class="vm-chip ${on ? 'on' : ''}" data-action="vm-f" data-k="${k}" data-v="${val}">${label}</button>`;
  return `
    <div class="vm-seg">${[['all', 'Tümü'], ['new', 'Sıfır'], ['used', 'İkinci el']].map(([k, l]) => `<button class="${f.cond === k ? 'on' : ''}" data-action="vm-f" data-k="cond" data-v="${k}">${l}</button>`).join('')}</div>
    <div class="vm-fields">
      <button class="vm-field" data-action="vm-pick-brand"><span>Marka</span><b>${f.brand || 'Tüm markalar'}</b>${I.chevDown}</button>
      <button class="vm-field ${f.brand ? '' : 'off'}" data-action="vm-pick-model"><span>Model</span><b>${f.model || 'Tüm modeller'}</b>${I.chevDown}</button>
    </div>
    <div class="vm-fields">
      <label class="vm-in"><span>En az fiyat</span><input id="vm-pmin" inputmode="numeric" autocomplete="off" placeholder="0" value="${f.pmin ? f.pmin.toLocaleString('tr-TR') : ''}"><em>TL</em></label>
      <label class="vm-in"><span>En çok fiyat</span><input id="vm-pmax" inputmode="numeric" autocomplete="off" placeholder="Sınırsız" value="${f.pmax ? f.pmax.toLocaleString('tr-TR') : ''}"><em>TL</em></label>
    </div>
    <button class="vm-more ${v.more ? 'open' : ''}" data-action="vm-more">${VM_ICO.filter}<span>Detaylı filtreler${adv ? ` · ${adv}` : ''}</span>${I.chevDown}</button>
    ${v.more ? `<div class="vm-adv">
      <div class="vm-adv-t">Araç tipi</div>
      <div class="vm-chips">${VM_TYPES.map(t => `<button class="vm-chip ${f.types.includes(t) ? 'on' : ''}" data-action="vm-type" data-v="${t}">${t}</button>`).join('')}</div>
      <div class="vm-adv-t">Model yılı</div>
      <div class="vm-chips">${chip('year', '', 'Tümü', !f.year)}${[2021, 2022, 2023, 2025].map(y => chip('year', y, y + '+', f.year === y)).join('')}</div>
      <div class="vm-adv-t">Kilometre</div>
      <div class="vm-chips">${chip('km', '', 'Tümü', !f.km)}${[20000, 50000, 100000].map(k => chip('km', k, (k / 1000) + ' bin km\'ye kadar', f.km === k)).join('')}</div>
      <div class="vm-adv-t">Konum</div>
      <div class="vm-chips">${chip('city', '', 'Tümü', !f.city)}${VM_CITIES.map(c => chip('city', c, c, f.city === c)).join('')}</div>
      <div class="vm-adv-t">Otokoç satış noktası</div>
      <div class="vm-chips">${chip('seller', '', 'Tümü', !f.seller)}${[...new Set(Object.values(VM_DEALERS).map(d => d.name))].map(s => chip('seller', s, s, f.seller === s)).join('')}</div>
    </div>` : ''}
    <div class="vm-search-foot">
      <button class="vm-clear" data-action="vm-clear">Temizle</button>
      <button class="btn-primary vm-go ${n ? '' : 'disabled'}" id="vm-go" data-action="vm-show">${n ? `${n} aracı göster` : 'Uygun araç yok'}</button>
    </div>`;
}
/* On the listing screen the filter sheet sits over the results: keep them in sync behind it */
function vmRefreshSearch() {
  const el = document.getElementById('vm-search');
  if (el) { el.innerHTML = vmSearchHTML(); vmSetupSearch(); }
  if (state.screen === 'arac-liste') vmRefreshList();
}
/* Hero animation (Lottie, assets/arac-hero.json). lottie-web is loaded on first use, and the
   animation only runs while the marketplace home is on screen (vmHeroSync runs after every render). */
const VM_HERO_ANIM = { path: 'assets/arac-hero.json', lib: 'vendor/lottie_light.min.js', viewBox: '18 92 364 158' };   // viewBox crops the empty sky above the car
let vmHeroAnim = null, vmLottieP = null;
function vmLoadLottie() {
  if (window.lottie) return Promise.resolve(window.lottie);
  vmLottieP = vmLottieP || new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = VM_HERO_ANIM.lib;
    s.onload = () => (window.lottie ? resolve(window.lottie) : reject(new Error('lottie')));
    s.onerror = () => reject(new Error('lottie'));
    document.head.appendChild(s);
  }).catch(err => { vmLottieP = null; throw err; });
  return vmLottieP;
}
function vmHeroStatic(box) {   // fallback when the animation cannot load: the vector illustration
  if (!box.isConnected) return;
  box.innerHTML = vmCarSVG({ ...vmCar('a4'), color: '#dfe5ec' }, 'side', 'none');
  box.classList.add('ready', 'static');
}
function vmHeroSync() {
  const box = state.screen === 'arac' ? document.getElementById('vm-hero-anim') : null;
  if (vmHeroAnim && (!box || !box.contains(vmHeroAnim.wrapper))) { vmHeroAnim.destroy(); vmHeroAnim = null; }
  if (!box || vmHeroAnim || box.dataset.started) return;
  box.dataset.started = '1';
  vmLoadLottie().then(lottie => {
    if (!box.isConnected) return;
    const still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const anim = lottie.loadAnimation({
      container: box, renderer: 'svg', loop: !still, autoplay: !still, path: VM_HERO_ANIM.path,
      rendererSettings: { viewBoxSize: VM_HERO_ANIM.viewBox, preserveAspectRatio: 'xMidYMid meet' },
    });
    vmHeroAnim = anim;
    anim.addEventListener('DOMLoaded', () => box.classList.add('ready'));
    anim.addEventListener('data_failed', () => {
      anim.destroy();
      if (vmHeroAnim === anim) vmHeroAnim = null;
      vmHeroStatic(box);
    });
  }).catch(() => vmHeroStatic(box));
}
/* Price fields only update the result count: re-rendering the card here would swallow the click that blurred them */
function vmRefreshCount() {
  const n = VM_CARS.filter(c => vmMatches(c)).length, b = document.getElementById('vm-go');
  if (b) { b.textContent = n ? `${n} aracı göster` : 'Uygun araç yok'; b.classList.toggle('disabled', !n); }
  if (state.screen === 'arac-liste') vmRefreshList();
}
function vmSetupSearch() {
  [['vm-pmin', 'pmin'], ['vm-pmax', 'pmax']].forEach(([id, k]) => {
    const inp = document.getElementById(id);
    if (!inp) return;
    inp.addEventListener('input', () => { const d = inp.value.replace(/\D/g, '').slice(0, 9); inp.value = d ? (+d).toLocaleString('tr-TR') : ''; });
    inp.addEventListener('change', () => {
      const f = state.vm.f, d = +inp.value.replace(/\D/g, '');
      f[k] = d || null;
      if (f.pmin && f.pmax && f.pmin > f.pmax) [f.pmin, f.pmax] = [f.pmax, f.pmin];
      ['pmin', 'pmax'].forEach(x => { const el = document.getElementById('vm-' + x); if (el) el.value = f[x] ? f[x].toLocaleString('tr-TR') : ''; });
      vmRefreshCount();
    });
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') inp.blur(); });
  });
}
function vmCommitInputs() {   // commit a typed value before acting on a button
  const a = document.activeElement;
  if (a && a.tagName === 'INPUT' && a.closest('.vm')) a.blur();
}
/* Filters on the listing screen: the same search card, inside a sheet */
function vmFilterSheet() {
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>Filtrele</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="vm-search in-sheet vm" id="vm-search">${vmSearchHTML()}</div>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
  vmSetupSearch();
}
function vmShow() {
  vmCommitInputs();
  if (!VM_CARS.some(c => vmMatches(c))) return;
  state.vm.favOnly = false;
  if (state.screen !== 'arac-liste') return go('arac-liste');
  closeSheet();
  vmRefreshList();
  const sc = document.querySelector('#app .screen-scroll'); if (sc) sc.scrollTop = 0;
}
function vmPickDone() {   // brand / model chosen in its sheet
  if (state.screen === 'arac-liste') { vmRefreshList(); return vmFilterSheet(); }
  closeSheet();
  vmRefreshSearch();
}
function vmClearFilters() {
  state.vm.f = { cond: 'all', brand: null, model: null, pmin: null, pmax: null, types: [], year: null, km: null, city: null, seller: null };
}
function vmSetF(k, val) {
  const f = state.vm.f;
  if (k === 'cond') f.cond = val;
  else f[k] = val === '' ? null : (isNaN(+val) ? val : +val);
}
function vmToggleType(t) { const f = state.vm.f; f.types = f.types.includes(t) ? f.types.filter(x => x !== t) : f.types.concat(t); }
function vmChoiceSheet(title, opts, action) {
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>${title}</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="vm-choices">${opts.map(o => `<button class="vm-choice ${o.on ? 'on' : ''}" data-action="${action}" data-v="${o.v}"><span>${o.label}</span>${o.sub ? `<em>${o.sub}</em>` : ''}${o.on ? `<i>${I.check}</i>` : ''}</button>`).join('')}</div>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function vmBrandSheet() {
  const f = state.vm.f, brands = [...new Set(VM_CARS.map(c => c.brand))].sort((a, b) => a.localeCompare(b, 'tr'));
  vmChoiceSheet('Marka seç', [{ v: '', label: 'Tüm markalar', on: !f.brand }].concat(brands.map(b => ({ v: b, label: b, sub: VM_CARS.filter(c => c.brand === b).length + ' ilan', on: f.brand === b }))), 'vm-set-brand');
}
function vmModelSheet() {
  const f = state.vm.f;
  if (!f.brand) return toast('Önce marka seç');
  const models = [...new Set(VM_CARS.filter(c => c.brand === f.brand).map(c => c.model))];
  vmChoiceSheet(f.brand + ' modeli', [{ v: '', label: 'Tüm modeller', on: !f.model }].concat(models.map(m => ({ v: m, label: m, on: f.model === m }))), 'vm-set-model');
}
function vmFeatCardHTML(c, i) {
  return `<div class="vm-fcard" data-action="vm-open" data-id="${c.id}">
    <div class="vm-fimg">${vmPicHTML(c, i % 2 ? 'mirror' : 'side', i % 2 ? 'dark' : 'studio')}<span class="vm-badge ${c.cond}">${vmCondLabel(c)}</span></div>
    <div class="vm-fbody"><b>${c.brand} ${c.model}</b><span>${c.year} · ${vmKm(c.km)}</span><div class="vm-fprice">${vmTL(c.price)}</div><em>aylık ~${vmTL(vmEstimate(c))}'den</em></div>
  </div>`;
}
function vmOngoingHTML() {
  const v = state.vm;
  if (!v.app) {   // pre-approved but not applied yet
    const c = vmCar(v.pre.car);
    return `<div class="vm-ongoing" data-action="vm-continue">
      <div class="vm-og-img">${vmPicHTML(c, 'side', 'studio')}</div>
      <div class="vm-og-mid"><span>Ön onaylı aracın</span><b>${c.brand} ${c.model}</b><em>${vmTL(v.pre.amount)} · ${v.pre.until} tarihine kadar</em></div>
      ${I.chevR}
    </div>`;
  }
  const c = vmCar(v.app.car);
  const step = v.disb ? (v.stage >= 3 ? 'Teslim edildi' : 'Teslim süreci') : v.app.status === 'approved' ? 'Kasko adımı bekleniyor' : 'Kredi değerlendiriliyor';
  return `<div class="vm-ongoing" data-action="vm-track">
    <div class="vm-og-img">${vmPicHTML(c, 'side', 'studio')}</div>
    <div class="vm-og-mid"><span>Devam eden satın alman</span><b>${c.brand} ${c.model}</b><em>${step}</em></div>
    ${I.chevR}
  </div>`;
}

/* -------------------- Screen 2 — listing & price comparison -------------------- */
function VmList() {
  const v = state.vm, r = vmResults(), act = vmActiveFilters();
  return `
  <div class="screen ${vmAnim()} vm">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-head-titles"><div class="nav-title">Araçlar</div><div class="nav-sub vm-count" id="vm-count">${r.length} ilan</div></div>
      <div class="nav-spacer"></div>
    </div>
    <div class="vm-listbar">
      <button class="vm-lb" data-action="vm-filters">${VM_ICO.filter}Filtrele<i id="vm-fcount" ${act.length ? '' : 'hidden'}>${act.length}</i></button>
      <button class="vm-lb" data-action="vm-sort">${VM_ICO.sort}<span id="vm-sort-l">${VM_SORTS.find(s => s[0] === v.sort)[1]}</span></button>
      <button class="vm-lb ${v.favOnly ? 'on' : ''}" data-action="vm-favonly" id="vm-favonly">${I.heart}Favoriler</button>
    </div>
    <div id="vm-active-wrap">${vmActiveHTML()}</div>
    <div class="screen-scroll">
      <div id="vm-list">${vmListHTML(r)}</div>
      <div class="vm-note">${I.info}<span>Aylık taksitler %${VM_EST.downPct} peşinat, ${VM_EST.term} ay vade ve örnek faiz oranıyla hesaplanmıştır; gerçek kredi koşullarını yansıtmaz.</span></div>
    </div>
    <div class="vm-cmpbar ${v.cmp.length ? 'show' : ''}" id="vm-cmpbar">${vmCmpBarHTML()}</div>
  </div>`;
}
function vmListHTML(r) {
  if (!r.length && state.vm.favOnly) return `<div class="vm-empty">${I.heart}<b>${state.vm.favs.length ? 'Bu filtrelerde favori aracın yok' : 'Henüz favori aracın yok'}</b><span>Beğendiğin ilanları kalp simgesiyle kaydet, burada topla.</span><button class="sp-link" data-action="vm-favonly">Tüm ilanları göster</button></div>`;
  if (!r.length) return `<div class="vm-empty">${I.search}<b>Bu kriterlere uygun araç yok</b><span>Filtreleri değiştirerek tekrar dene.</span><button class="sp-link" data-action="vm-clear-list">Filtreleri temizle</button></div>`;
  return r.map(c => vmCardHTML(c)).join('');
}
function vmCardHTML(c) {
  const v = state.vm, d = vmDealer(c), fav = v.favs.includes(c.id), cmp = v.cmp.includes(c.id);
  return `<div class="vm-card" data-action="vm-open" data-id="${c.id}">
    <div class="vm-cimg">${vmPicHTML(c, 'side', VM_CARS.indexOf(c) % 3 === 1 ? 'dark' : 'studio')}
      <span class="vm-badge ${c.cond}">${vmCondLabel(c)}</span>
      <button class="vm-heart ${fav ? 'on' : ''}" data-action="vm-fav" data-id="${c.id}" aria-label="Favorilere ekle">${I.heart}</button>
    </div>
    <div class="vm-cbody">
      <div class="vm-ctitle"><b>${c.brand} ${c.model}</b><span>${c.trim}</span></div>
      <div class="vm-cspec">${c.year} · ${vmKm(c.km)} · ${c.fuel.split(' ')[0]} · ${c.gear.split(' ')[0]}</div>
      <div class="vm-cprice"><b>${vmTL(c.price)}</b><span>aylık ~${vmTL(vmEstimate(c))}</span></div>
      <div class="vm-cfoot">
        <div class="vm-cdealer">${I.pin}<span>${d.name}</span><em>${d.district}, ${d.city}</em></div>
        <button class="vm-cmp ${cmp ? 'on' : ''}" data-action="vm-cmp" data-id="${c.id}"><span class="cbx">${I.check}</span>Karşılaştır</button>
      </div>
    </div>
  </div>`;
}
function vmCmpBarHTML() {
  const n = state.vm.cmp.length;
  return `<span><b>${n}</b> araç seçildi${n < 2 ? ' · en az 2 seç' : ''}</span><button class="vm-cmp-go ${n < 2 ? 'off' : ''}" data-action="vm-compare">Karşılaştır</button>`;
}
function vmActiveHTML() {
  const act = vmActiveFilters();
  return act.length ? `<div class="vm-active">${act.map(([k, l]) => `<button class="vm-achip" data-action="vm-unset" data-k="${k}">${l}${I.close}</button>`).join('')}</div>` : '';
}
function vmRefreshList() {
  const r = vmResults(), n = vmActiveFilters().length;
  const list = document.getElementById('vm-list'); if (list) list.innerHTML = vmListHTML(r);
  const cnt = document.getElementById('vm-count'); if (cnt) cnt.textContent = r.length + ' ilan';
  const bar = document.getElementById('vm-cmpbar'); if (bar) { bar.innerHTML = vmCmpBarHTML(); bar.classList.toggle('show', state.vm.cmp.length > 0); }
  const sl = document.getElementById('vm-sort-l'); if (sl) sl.textContent = VM_SORTS.find(s => s[0] === state.vm.sort)[1];
  const fo = document.getElementById('vm-favonly'); if (fo) fo.classList.toggle('on', state.vm.favOnly);
  const aw = document.getElementById('vm-active-wrap'); if (aw) aw.innerHTML = vmActiveHTML();
  const fc = document.getElementById('vm-fcount'); if (fc) { fc.textContent = n; fc.hidden = !n; }
}
function vmToggleFav(id, btn) {
  const v = state.vm;
  v.favs = v.favs.includes(id) ? v.favs.filter(x => x !== id) : v.favs.concat(id);
  const on = v.favs.includes(id);
  document.querySelectorAll(`[data-action="vm-fav"][data-id="${id}"]`).forEach(b => b.classList.toggle('on', on));
  const n = document.getElementById('vm-fav-n'); if (n) n.textContent = v.favs.length;
  toast(on ? 'Favorilere eklendi' : 'Favorilerden çıkarıldı');
  if (v.favOnly && state.screen === 'arac-liste') vmRefreshList();
}
function vmToggleCmp(id) {
  const v = state.vm;
  if (v.cmp.includes(id)) v.cmp = v.cmp.filter(x => x !== id);
  else if (v.cmp.length >= 3) return toast('En fazla 3 aracı karşılaştırabilirsin');
  else v.cmp = v.cmp.concat(id);
  document.querySelectorAll('[data-action="vm-cmp"]').forEach(b => b.classList.toggle('on', v.cmp.includes(b.dataset.id)));
  const bar = document.getElementById('vm-cmpbar'); if (bar) { bar.innerHTML = vmCmpBarHTML(); bar.classList.toggle('show', v.cmp.length > 0); }
}
function vmSortSheet() {
  vmChoiceSheet('Sırala', VM_SORTS.map(([k, l]) => ({ v: k, label: l, on: state.vm.sort === k })), 'vm-set-sort');
}
function vmCompareSheet() {
  const cars = state.vm.cmp.map(id => vmCar(id));
  if (cars.length < 2) return toast('Karşılaştırmak için en az 2 araç seç');
  const minPrice = Math.min(...cars.map(c => c.price)), minKm = Math.min(...cars.map(c => c.km)), maxYear = Math.max(...cars.map(c => c.year));
  const row = (label, fn, best) => `<tr><th>${label}</th>${cars.map(c => `<td class="${best && best(c) ? 'best' : ''}">${fn(c)}</td>`).join('')}</tr>`;
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>Araç karşılaştırma</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="vm-cmp-scroll"><table class="vm-cmp-t">
      <thead><tr><th></th>${cars.map(c => `<td><div class="vm-cmp-img">${vmPicHTML(c, 'side', 'studio')}</div><b>${c.brand} ${c.model}</b></td>`).join('')}</tr></thead>
      <tbody>
        ${row('Fiyat', c => vmTL(c.price), c => c.price === minPrice)}
        ${row('Aylık taksit*', c => vmTL(vmEstimate(c)), c => c.price === minPrice)}
        ${row('Model yılı', c => c.year, c => c.year === maxYear)}
        ${row('Kilometre', c => vmKm(c.km), c => c.km === minKm)}
        ${row('Yakıt', c => c.fuel)}
        ${row('Vites', c => c.gear)}
        ${row('Motor', c => c.engine)}
        ${row('Kasa tipi', c => c.type)}
        ${row('Satıcı', c => vmDealer(c).name + '<br><i>' + vmDealer(c).district + ', ' + vmDealer(c).city + '</i>')}
      </tbody>
    </table></div>
    <div class="vm-cmp-note">* %${VM_EST.downPct} peşinat, ${VM_EST.term} ay, örnek faiz. Yeşil: en avantajlı değer.</div>
    <button class="sheet-btn ghost" data-action="close-sheet">Kapat</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}

/* -------------------- Screen 3 — car details -------------------- */
function VmDetail() {
  const v = state.vm, c = vmCar(), d = vmDealer(c), fav = v.favs.includes(c.id);
  const slides = [['side', 'studio'], ['mirror', 'dark'], ['front', 'studio'], ['rear', 'dark']];
  return `
  <div class="screen ${vmAnim()} vm">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Araç Detayı</div>
      <button class="vm-heart-nav ${fav ? 'on' : ''}" data-action="vm-fav" data-id="${c.id}" aria-label="Favorilere ekle">${I.heart}</button>
    </div>
    <div class="screen-scroll">
      <div class="vm-gal-wrap">
        <div class="vm-gal" id="vm-gal">${slides.map(([va, bg], i) => `<div class="vm-slide">${vmPicHTML(c, va, bg, i)}</div>`).join('')}</div>
        <span class="vm-gal-n" id="vm-gal-n">1 / ${slides.length}</span>
        ${c.photos ? '' : '<span class="vm-gal-tag">Temsilî görsel</span>'}
        <div class="vm-dots" id="vm-dots">${slides.map((_, i) => `<i class="${i ? '' : 'on'}"></i>`).join('')}</div>
      </div>
      <div class="vm-d-head">
        <div class="vm-d-badges"><span class="vm-badge inline ${c.cond}">${vmCondLabel(c)}</span><span class="vm-d-loc">${I.pin}${d.district}, ${d.city}</span></div>
        <h2>${c.brand} ${c.model}</h2>
        <div class="vm-d-trim">${c.trim}</div>
        <div class="vm-d-price"><b>${vmTL(c.price)}</b><span>${c.year} · ${vmKm(c.km)}</span></div>
        <button class="vm-d-fin" data-action="vm-start-pre"><span>aylık <b>~${vmTL(vmEstimate(c))}</b>'den</span><em>%${VM_EST.downPct} peşinat · ${VM_EST.term} ay · örnek</em>${I.chevR}</button>
      </div>
      <div class="vm-box">
        <div class="vm-box-h">Araç özellikleri</div>
        <div class="vm-specs">
          ${[['Model yılı', c.year], ['Kilometre', vmKm(c.km)], ['Yakıt', c.fuel], ['Vites', c.gear], ['Motor', c.engine], ['Kasa tipi', c.type], ['Renk', c.colorName], ['Çekiş', c.drive]].map(([k, val]) => `<div><span>${k}</span><b>${val}</b></div>`).join('')}
        </div>
      </div>
      <div class="vm-box">
        <div class="vm-box-h">Donanım paketi · ${c.trim.split(' ').slice(-1)[0]}</div>
        <div class="vm-equip">${c.equip.map(e => `<span>${I.check}${e}</span>`).join('')}</div>
      </div>
      ${vmDealerBoxHTML(d)}
    </div>
    <div class="screen-cta vm-d-cta">
      <button class="vm-heart-lg ${fav ? 'on' : ''}" data-action="vm-fav" data-id="${c.id}" aria-label="Favorilere ekle">${I.heart}</button>
      <button class="btn-primary" data-action="vm-start-pre">${v.app && v.app.car === c.id ? 'Satın Alma Sürecini Gör' : vmPreFor(c) ? 'Ön Onayına Devam Et' : 'Kredi Ön Onayı Başlat'}</button>
    </div>
  </div>`;
}
function vmDealerBoxHTML(d, title) {
  return `<div class="vm-box">
    <div class="vm-box-h">${title || 'Satış noktası'}</div>
    <div class="vm-dealer">
      <div class="vm-dealer-ico">${d.name[0]}</div>
      <div class="vm-dealer-mid"><b>${d.name}</b><span>${d.kind === '2. El' ? 'İkinci el satış noktası' : 'Yetkili bayi'} · Koç Topluluğu</span></div>
    </div>
    <div class="vm-dealer-addr">${I.pin}<span>${d.district} / ${d.city}</span></div>
    <div class="vm-dealer-btns">
      <button data-action="toast" data-msg="Arama prototipte aktif değil">${VM_ICO.phone}Bayiyi ara</button>
      <button data-action="toast" data-msg="Yol tarifi prototipte aktif değil">${VM_ICO.route}Yol tarifi</button>
    </div>
  </div>`;
}
function vmSetupDetail() {
  const g = document.getElementById('vm-gal');
  if (!g) return;
  g.addEventListener('scroll', () => {
    const i = Math.round(g.scrollLeft / g.clientWidth), n = g.children.length;
    const lbl = document.getElementById('vm-gal-n'); if (lbl) lbl.textContent = `${i + 1} / ${n}`;
    document.querySelectorAll('#vm-dots i').forEach((d, k) => d.classList.toggle('on', k === i));
  }, { passive: true });
}

/* -------------------- shared: flow steps, car strip, stages, checks -------------------- */
const VM_FLOW = ['Ön onay', 'Ödeme planı', 'Başvuru', 'Kasko', 'Teslim'];
function vmFlowHTML(cur) {
  return `<div class="vm-flow" role="list" aria-label="Satın alma adımları">${VM_FLOW.map((t, i) =>
    `<div class="vm-flow-s ${i < cur ? 'done' : i === cur ? 'on' : ''}" role="listitem"><i>${i < cur ? I.check : i + 1}</i><span>${t}</span></div>`).join('<b></b>')}</div>`;
}
function vmMiniHTML(c, right) {
  return `<div class="vm-mini">
    <div class="vm-mini-img">${vmPicHTML(c, 'side', 'studio')}</div>
    <div class="vm-mini-mid"><b>${c.brand} ${c.model}</b><span>${c.year} · ${vmKm(c.km)}</span><em>${vmDealer(c).name} · ${vmDealer(c).district}</em></div>
    <div class="vm-mini-r">${right || `<span>Araç bedeli</span><b>${vmTL(c.price)}</b>`}</div>
  </div>`;
}
/* st: [{ t, d, s: 'done' | 'on' | 'wait' | 'todo' }] — final evaluation and disbursement stay separate stages */
function vmStagesHTML(st) {
  const ico = (x, i) => x.s === 'done' ? I.check : x.s === 'on' ? '<span class="vm-spin"></span>' : x.s === 'wait' ? VM_ICO.clock : i + 1;
  return `<div class="vm-stages">${st.map((x, i) => `<div class="vm-stg ${x.s}"><i>${ico(x, i)}</i><b>${x.t}</b><span>${x.d}</span></div>`).join('')}</div>`;
}
function vmChkRowHTML(t, k, step, pfx) {
  return `<div class="vm-chk-r ${k < step ? 'done' : k === step ? 'run' : ''}" id="${pfx}${k}"><i><span class="vm-spin"></span>${I.check}</i><span>${t}</span></div>`;
}
/* Runs a check list row by row (unequal durations), updating rows in place; obj[key] keeps progress across re-renders.
   onStep (optional) runs after each finished row. */
function vmRunChecks(obj, key, n, pfx, durs, done, onStep) {
  const next = () => {
    if (obj[key] >= n) return setTimeout(done, 380);
    setTimeout(() => {
      const k = obj[key];
      const row = document.getElementById(pfx + k);
      if (row) { row.classList.remove('run'); row.classList.add('done'); }
      obj[key] = k + 1;
      const nx = document.getElementById(pfx + (k + 1));
      if (nx) nx.classList.add('run');
      if (onStep) onStep(obj[key]);
      next();
    }, durs[obj[key]] || 800);
  };
  next();
}
function vmEx() { return '<i class="vm-ex">Örnek</i>'; }
/* Inline amber warning under an input (auto hides) */
function vmWarn(id, msg) {
  const w = document.getElementById(id);
  if (!w) return;
  clearTimeout(vmWarnTimer);
  w.innerHTML = msg ? `${I.info}<span>${msg}</span>` : '';
  w.classList.toggle('show', !!msg);
  if (msg) vmWarnTimer = setTimeout(() => w.classList.remove('show'), 4000);
}
function vmNav(title) {
  return `<div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">${title}</div>
    </div>`;
}
/* Down payment & term set-up for a car (kept while the same car is being financed) */
function vmInitFlow(c) {
  const v = state.vm;
  if (v.flowCar === c.id) return;
  v.flowCar = c.id;
  v.down = Math.min(vmDownMax(c), Math.max(vmDownMinRule(c), Math.round(c.price * VM_EST.downPct / 100 / 10000) * 10000));
  v.term = VM_EST.term;
  v.consent = false; v.preBusy = false; v.scen = [];
  v.agree = { pre: false, contract: false, pledge: false };
}
function vmSetDown(raw) {
  const v = state.vm, c = vmCar(), lo = vmDownMin(c), hi = vmDownMax(c), pre = vmPreFor(c);
  let d = Math.round(raw) || 0, warn = '';
  if (d < lo) {
    d = lo;
    warn = pre && lo > vmDownMinRule(c)
      ? `Ön onaylı tutarın ${vmTL(pre.amount)} olduğu için peşinat en az ${vmTL(lo)} olmalı.`
      : `Peşinat en az ${vmTL(lo)} olabilir; asgari peşinat oranı %${VM_MIN_DOWN}.`;
  } else if (d > hi) {
    d = hi;
    warn = `Peşinat en fazla ${vmTL(hi)} olabilir; en düşük kredi tutarı ${vmTL(VM_MIN_LOAN)}.`;
  }
  v.down = d;
  if (state.screen === 'arac-kredi') { vmPlanUpdate(); vmWarn('vm-down-warn', warn); }
  else { vmPreUpdate(); vmWarn('vm-pre-warn', warn); }
}
function vmSetTerm(n) {
  state.vm.term = n;
  if (state.screen === 'arac-kredi') return vmPlanUpdate();
  document.querySelectorAll('#vm-pre-terms .vm-pct').forEach(b => b.classList.toggle('on', +b.dataset.v === n));
}
function vmPrePct(p) { const c = vmCar(); vmSetDown(Math.ceil(c.price * p / 100 / 10000) * 10000); }
function vmMoneyInput(inp, onCommit) {
  inp.addEventListener('focus', () => inp.select());
  inp.addEventListener('input', () => { const d = inp.value.replace(/\D/g, '').slice(0, 9); inp.value = d ? (+d).toLocaleString('tr-TR') : ''; });
  inp.addEventListener('change', () => onCommit(+inp.value.replace(/\D/g, '')));
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') inp.blur(); });
}

/* -------------------- Screen 4 — loan pre-approval -------------------- */
const VM_CHECKS = ['Kimlik ve iletişim bilgilerin doğrulanıyor', 'Gelir bilgin kontrol ediliyor', 'Kredi geçmişin (KKB) inceleniyor', 'Araç değeri ve kredi oranı hesaplanıyor'];
function VmPre() {
  const v = state.vm, c = vmCar();
  if (v.app) { state.screen = 'arac-basvuru'; return VmApply(); }
  vmInitFlow(c);
  if (v.preBusy) return vmPreChecking(c);
  const pre = vmPreFor(c);
  return pre ? vmPreResult(c, pre) : vmPreForm(c);
}
function vmPreForm(c) {
  const v = state.vm, p = VM_PROFILE;
  return `
  <div class="screen ${vmAnim()} vm">
    ${vmNav('Kredi Ön Onayı')}
    <div class="screen-scroll">
      ${vmFlowHTML(0)}
      ${vmMiniHTML(c)}
      <div class="vm-sec-t">Kredi talebin</div>
      <div class="vm-box vm-form">
        <label class="vm-money"><span>Peşinat</span><input id="vm-pre-down" inputmode="numeric" enterkeyhint="done" autocomplete="off" value="${v.down.toLocaleString('tr-TR')}" aria-label="Peşinat"><em>TL</em></label>
        <div class="vm-pcts" id="vm-pre-pcts">${[20, 30, 40, 50].map(x => `<button class="vm-pct ${vmPct(v.down, c.price) === x ? 'on' : ''}" data-action="vm-pre-pct" data-v="${x}">%${x}</button>`).join('')}</div>
        <div class="vm-warn-inline" id="vm-pre-warn" role="status" aria-live="polite"></div>
        <div class="vm-frow hl"><span>Talep edilen kredi</span><b id="vm-pre-loan">${vmTL(c.price - v.down)}</b></div>
        <div class="vm-frow"><span>Kredi / araç bedeli oranı</span><b id="vm-pre-ltv">%${vmPct(c.price - v.down, c.price)}</b></div>
        <div class="vm-flabel">Vade</div>
        <div class="vm-pcts" id="vm-pre-terms">${VM_TERMS.map(n => `<button class="vm-pct ${v.term === n ? 'on' : ''}" data-action="vm-term" data-v="${n}">${n} ay</button>`).join('')}</div>
        <div class="vm-hint">Peşinatı ve vadeyi ödeme planı adımında da değiştirebilirsin.</div>
      </div>
      <div class="vm-sec-t">Değerlendirmede kullanılacak bilgiler</div>
      <div class="vm-box vm-prof">
        <div class="vm-frow"><span>Ad soyad</span><b>${p.name}</b></div>
        <div class="vm-frow"><span>T.C. kimlik no</span><b>${p.tckn}</b></div>
        <div class="vm-frow"><span>Cep telefonu</span><b>${p.phone}</b></div>
        <div class="vm-frow"><span>Çalışma durumu</span><b>${p.job}</b></div>
        <div class="vm-frow"><span>Aylık net gelir (beyan)</span><b>${vmTL(p.income)}</b></div>
        <button class="sp-link vm-prof-edit" data-action="toast" data-msg="Bilgi güncelleme prototipte aktif değil">Bilgilerimi güncelle ${I.chevR}</button>
      </div>
      <div class="vm-docs">
        <label class="contract-row ${v.consent ? 'on' : ''}" data-action="vm-consent">
          <span class="cbx">${I.check}</span>
          <span class="contract-txt"><a data-action="vm-doc" data-doc="kvkk">Aydınlatma Metni</a>'ni okudum; ön değerlendirme için KKB sorgusu yapılmasını onaylıyorum.</span>
        </label>
      </div>
      <div class="vm-note">${I.info}<span>Ön değerlendirme bağlayıcı değildir; kesin kredi kararı başvurunu tamamladıktan sonra verilir.</span></div>
    </div>
    <div class="screen-cta">
      <button class="btn-primary ${v.consent ? '' : 'disabled'}" id="vm-pre-go" data-action="vm-pre-run">Ön Değerlendirme Yap</button>
    </div>
  </div>`;
}
function vmSetupPre() {
  const inp = document.getElementById('vm-pre-down');
  if (inp) vmMoneyInput(inp, vmSetDown);
}
function vmPreUpdate() {
  const v = state.vm, c = vmCar();
  const inp = document.getElementById('vm-pre-down');
  if (inp && document.activeElement !== inp) inp.value = v.down.toLocaleString('tr-TR');
  const loan = document.getElementById('vm-pre-loan'); if (loan) loan.textContent = vmTL(c.price - v.down);
  const ltv = document.getElementById('vm-pre-ltv'); if (ltv) ltv.textContent = '%' + vmPct(c.price - v.down, c.price);
  document.querySelectorAll('#vm-pre-pcts .vm-pct').forEach(b => b.classList.toggle('on', +b.dataset.v === vmPct(v.down, c.price)));
}
function vmToggleConsent(el) {
  const v = state.vm;
  v.consent = !v.consent;
  el.classList.toggle('on', v.consent);
  const b = document.getElementById('vm-pre-go'); if (b) b.classList.toggle('disabled', !v.consent);
}
function vmPreRun() {
  const v = state.vm, c = vmCar();
  vmCommitInputs();
  if (!v.consent || v.preBusy) return;
  v.preBusy = true; v.preStep = 0;
  vmRerender();
  vmRunChecks(v, 'preStep', VM_CHECKS.length, 'vm-chk-', [800, 1000, 1300, 900], () => {
    v.preBusy = false;
    v.pre = vmMakePre(c);
    if (state.screen === 'arac-on-onay') return vmRerender();
    toast('Ön değerlendirmen tamamlandı');   // finished while the customer browsed elsewhere
    const cta = document.querySelector('.vm-d-cta .btn-primary');
    if (cta && state.screen === 'arac-detay' && state.vm.car === c.id) cta.textContent = 'Ön Onayına Devam Et';
  });
}
/* EXAMPLE decision: the customer's pre-approved limit, capped by the car's maximum loan */
function vmMakePre(c) {
  const v = state.vm, amount = Math.min(VM_PRE_LIMIT, c.price - vmDownMinRule(c)), req = c.price - v.down;
  if (req > amount) v.down = Math.ceil((c.price - amount) / 10000) * 10000;
  return { car: c.id, amount, req, at: vmNowStr(), until: vmDateIn(30), ref: vmRef('ON') };
}
function vmPreChecking(c) {
  const v = state.vm;
  return `
  <div class="screen ${vmAnim()} vm">
    ${vmNav('Kredi Ön Onayı')}
    <div class="screen-scroll">
      ${vmFlowHTML(0)}
      <div class="vm-checking">
        <div class="vm-check-ico"><span class="vm-ring"></span>${I.shield}</div>
        <h3>Ön değerlendirme yapılıyor</h3>
        <p>${c.brand} ${c.model} için ${vmTL(c.price - v.down)} kredi talebin inceleniyor.</p>
        <div class="vm-chk">${VM_CHECKS.map((t, k) => vmChkRowHTML(t, k, v.preStep, 'vm-chk-')).join('')}</div>
      </div>
    </div>
    <div class="screen-cta"><button class="btn-primary disabled">Lütfen bekle…</button></div>
  </div>`;
}
function vmPreResult(c, pre) {
  const v = state.vm, partial = pre.req > pre.amount, loan = c.price - v.down;
  return `
  <div class="screen ${vmAnim()} vm">
    ${vmNav('Kredi Ön Onayı')}
    <div class="screen-scroll">
      ${vmFlowHTML(0)}
      <div class="vm-pre-res">
        <span class="vm-pill ok">${I.check}Ön değerlendirme ${partial ? 'kısmen ' : ''}olumlu</span>
        <span class="vm-pre-l">${c.brand} ${c.model} için ön onaylı kredi tutarın</span>
        <b>${vmTL(pre.amount)}</b>
        <em>${pre.until} tarihine kadar geçerli</em>
      </div>
      ${partial ? `<div class="vm-warn">${I.info}<span><b>Talebinin bir kısmı için ön onay verildi.</b> İstediğin ${vmTL(pre.req)} yerine en fazla ${vmTL(pre.amount)} kredi kullanabilirsin; peşinatın bu yüzden ${vmTL(v.down)} olarak güncellendi.</span></div>` : ''}
      <div class="vm-warn">${I.info}<span><b>Bu bir kesin kredi onayı değildir.</b> Ön onay, beyan ettiğin bilgiler ve kredi geçmişine göre yapılan bir ön değerlendirmedir. Kesin karar başvurunu tamamladıktan sonra belgeler ve aracın değeri incelenerek verilir; kredinin kullandırılacağını garanti etmez.</span></div>
      <div class="vm-sec-t">Ön değerlendirme özeti</div>
      <div class="receipt vm-receipt">
        <div class="r-row"><span class="r-l">Talep edilen kredi</span><span class="r-r">${vmTL(pre.req)}</span></div>
        <div class="r-row"><span class="r-l">Peşinat</span><span class="r-r">${vmTL(v.down)}</span></div>
        ${partial ? `<div class="r-row"><span class="r-l">Kullanılacak kredi</span><span class="r-r">${vmTL(loan)}</span></div>` : ''}
        <div class="r-row"><span class="r-l">Vade</span><span class="r-r">${v.term} ay</span></div>
        <div class="r-row"><span class="r-l">Tahmini aylık taksit ${vmEx()}</span><span class="r-r">~${vmTL(vmPay(loan, v.term))}</span></div>
        <div class="r-row"><span class="r-l">Değerlendirme tarihi</span><span class="r-r">${pre.at}</span></div>
        <div class="r-row"><span class="r-l">Referans no</span><span class="r-r">${pre.ref}</span></div>
      </div>
      <div class="vm-sec-t">Sonraki adımlar</div>
      ${vmStagesHTML([
        { t: 'Ön onay', d: 'Tamamlandı', s: 'done' },
        { t: 'Kesin değerlendirme', d: 'Başvurundan sonra', s: 'todo' },
        { t: 'Kullandırım', d: 'Sözleşme ve kasko sonrası', s: 'todo' },
      ])}
    </div>
    <div class="screen-cta">
      <button class="btn-primary" data-action="vm-to-plan">Ödeme Planını Oluştur</button>
      <button class="btn-ghost" data-action="vm-pre-edit">Talebi Düzenle</button>
    </div>
  </div>`;
}

/* -------------------- Screen 5 — loan & payment plan -------------------- */
function VmPlan() {
  const v = state.vm, c = vmCar(), pre = vmPreFor(c);
  if (v.app) { state.screen = 'arac-basvuru'; return VmApply(); }
  if (!pre) { state.screen = 'arac-on-onay'; return VmPre(); }
  const lo = vmDownMin(c), hi = vmDownMax(c);
  v.down = Math.min(hi, Math.max(lo, v.down));
  const use = vmPct(vmLoan(), pre.amount);
  return `
  <div class="screen ${vmAnim()} vm">
    ${vmNav('Kredi ve Ödeme Planı')}
    <div class="screen-scroll">
      ${vmFlowHTML(1)}
      ${vmMiniHTML(c)}
      <div class="vm-box vm-calc">
        <div class="vm-calc-h"><span>Peşinat</span><b id="vm-down-pct">Araç bedelinin %${vmPct(v.down, c.price)}</b></div>
        <label class="vm-money lg"><input id="vm-down-in" inputmode="numeric" enterkeyhint="done" autocomplete="off" value="${v.down.toLocaleString('tr-TR')}" aria-label="Peşinat"><em>TL</em></label>
        <div class="vm-slider" id="vm-down-sl" style="--v:${vmSlPct(v.down, lo, hi)}%">
          <div class="vm-track"><i></i></div>
          <input type="range" class="vm-range" id="vm-down-range" min="${lo}" max="${hi}" step="10000" value="${v.down}" aria-label="Peşinat">
        </div>
        <div class="vm-scale"><span>${vmTL(lo)}</span><span>${vmTL(hi)}</span></div>
        <div class="vm-warn-inline" id="vm-down-warn" role="status" aria-live="polite"></div>
        <div class="vm-loanrow"><span>Kredi tutarı</span><b id="vm-loan-v">${vmTL(vmLoan())}</b></div>
        <div class="vm-preuse">
          <div class="vm-preuse-bar"><i id="vm-preuse-i" style="width:${Math.min(100, use)}%"></i></div>
          <div class="vm-preuse-l"><span>Ön onay kullanımı <b id="vm-preuse-p">%${use}</b></span><span>Ön onaylı tutar ${vmTL(pre.amount)}</span></div>
        </div>
      </div>
      <div class="vm-sec-t">Vade</div>
      <div class="vm-terms" id="vm-terms">${vmTermsHTML()}</div>
      <div class="vm-box vm-res" id="vm-res">${vmResHTML()}</div>
      <div class="vm-sec-t vm-sec-row"><span>Finansman senaryoları</span><button class="sp-link" data-action="vm-scen-save">${I.plus}Bu planı kaydet</button></div>
      <div id="vm-scen">${vmScenHTML()}</div>
      <div class="vm-sec-t">Ödeme planı</div>
      <div class="vm-box vm-plan" id="vm-plan-prev">${vmPlanPrevHTML()}</div>
      <div class="vm-note">${I.info}<span>Hesaplamalar örnek faiz oranıyla (aylık %${vmPctStr(VM_RATE.monthly)}, faiz üzerinden KKDF ve BSMV) yapılmıştır; gerçek kredi koşullarını yansıtmaz.</span></div>
    </div>
    <div class="screen-cta">
      <button class="btn-primary" data-action="vm-to-apply">Kredi Başvurusuna Geç</button>
    </div>
  </div>`;
}
function vmSlPct(x, lo, hi) { return hi > lo ? Math.max(0, Math.min(100, (x - lo) / (hi - lo) * 100)) : 100; }
function vmTermsHTML() {
  const v = state.vm, loan = vmLoan();
  return VM_TERMS.map(n => `<button class="vm-term ${v.term === n ? 'on' : ''}" data-action="vm-term" data-v="${n}"><b>${n} ay</b><span>${vmTL(vmPay(loan, n))}</span></button>`).join('');
}
function vmResHTML() {
  const v = state.vm, q = vmQuote(), dti = vmPct(q.pay, VM_PROFILE.income);
  return `
    <div class="vm-res-top"><span>Aylık taksit</span><b>${vmTL(q.pay)}</b><em>${v.term} ay · ilk taksit ${vmFirstDue()}</em></div>
    <div class="vm-rows">
      <div><span>Kredi tutarı</span><b>${vmTL(q.loan)}</b></div>
      <div><span>Aylık faiz oranı ${vmEx()}</span><b>%${vmPctStr(VM_RATE.monthly)}</b></div>
      <div><span>Toplam faiz</span><b>${vmTL(q.interest)}</b></div>
      <div><span>KKDF + BSMV</span><b>${vmTL(q.tax)}</b></div>
      <div class="hl"><span>Toplam geri ödeme</span><b>${vmTL(q.total)}</b></div>
      <div><span>Araç için toplam ödeme<i class="vm-sub">Peşinat + toplam geri ödeme</i></span><b>${vmTL(v.down + q.total)}</b></div>
    </div>
    <div class="vm-dti ${dti > 50 ? 'bad' : ''}">${I.info}<span>Taksit / gelir oranı <b>%${dti}</b> · beyan ettiğin aylık net gelire göre.${dti > 50 ? ' Gelirinin yarısını aştığı için kesin değerlendirmede onay alamayabilirsin.' : ''}</span></div>`;
}
function vmScenHTML() {
  const v = state.vm, c = vmCar();
  if (!v.scen.length) return `<div class="vm-box vm-scen-empty">${VM_ICO.compare}<span>Farklı peşinat ve vade seçeneklerini kaydet; en fazla 3 senaryoyu yan yana karşılaştır.</span></div>`;
  const qs = v.scen.map(s => ({ ...s, q: vmQuote(c.price - s.down, s.term) }));
  const minPay = Math.min(...qs.map(x => x.q.pay)), minAll = Math.min(...qs.map(x => x.down + x.q.total));
  const cur = s => s.down === v.down && s.term === v.term;
  const row = (label, fn, best) => `<tr><th>${label}</th>${qs.map(s => `<td class="${best && best(s) && qs.length > 1 ? 'best' : ''}">${fn(s)}</td>`).join('')}</tr>`;
  return `<div class="vm-box vm-scen"><table class="vm-scen-t">
    <thead><tr><th></th>${qs.map(s => `<td class="${cur(s) ? 'cur' : ''}"><span class="vm-scen-n">${s.label}</span><button class="vm-scen-x" data-action="vm-scen-del" data-v="${s.label}" aria-label="Senaryoyu kaldır: ${s.label}">${I.close}</button></td>`).join('')}</tr></thead>
    <tbody>
      ${row('Peşinat', s => vmTL(s.down))}
      ${row('Vade', s => s.term + ' ay')}
      ${row('Aylık taksit', s => vmTL(s.q.pay), s => s.q.pay === minPay)}
      ${row('Toplam geri ödeme', s => vmTL(s.q.total))}
      ${row('Araç için toplam', s => vmTL(s.down + s.q.total), s => s.down + s.q.total === minAll)}
    </tbody>
    <tfoot><tr><th></th>${qs.map(s => `<td>${cur(s) ? '<span class="vm-scen-cur">Seçili plan</span>' : `<button class="vm-scen-ap" data-action="vm-scen-apply" data-v="${s.label}">Uygula</button>`}</td>`).join('')}</tr></tfoot>
  </table>${qs.length > 1 ? '<div class="vm-scen-note">Yeşil: en düşük aylık taksit ve en düşük toplam ödeme.</div>' : ''}</div>`;
}
function vmPlanPrevHTML() {
  const v = state.vm, rows = vmPlanRows(vmLoan(), v.term), show = rows.slice(0, 3).concat(rows.slice(-1));
  return `<div class="vm-pt">
      <div class="vm-pt-h"><span>No</span><span>Tarih</span><span>Taksit</span><span>Kalan anapara</span></div>
      ${show.map((r, i) => `${i === 3 ? '<div class="vm-pt-gap">···</div>' : ''}<div class="vm-pt-r"><span>${r.k}</span><span>${r.date}</span><span>${vmTL(r.pay)}</span><span>${vmTL(r.bal)}</span></div>`).join('')}
    </div>
    <button class="vm-pt-all" data-action="vm-plan-all">Tüm ödeme planını gör · ${v.term} taksit ${I.chevR}</button>`;
}
function vmSetupPlan() {
  const r = document.getElementById('vm-down-range'), inp = document.getElementById('vm-down-in');
  if (r) r.addEventListener('input', () => vmSetDown(+r.value));
  if (inp) vmMoneyInput(inp, vmSetDown);
}
/* Live update without re-rendering the screen (slider keeps its drag) */
function vmPlanUpdate() {
  const v = state.vm, c = vmCar(), pre = vmPreFor(c), lo = vmDownMin(c), hi = vmDownMax(c);
  if (!pre) return;
  const set = (id, h) => { const el = document.getElementById(id); if (el) el.innerHTML = h; };
  const inp = document.getElementById('vm-down-in');
  if (inp && document.activeElement !== inp) inp.value = v.down.toLocaleString('tr-TR');
  const r = document.getElementById('vm-down-range'); if (r && +r.value !== v.down) r.value = v.down;
  const sl = document.getElementById('vm-down-sl'); if (sl) sl.style.setProperty('--v', vmSlPct(v.down, lo, hi) + '%');
  const use = vmPct(vmLoan(), pre.amount);
  const bar = document.getElementById('vm-preuse-i'); if (bar) bar.style.width = Math.min(100, use) + '%';
  set('vm-down-pct', `Araç bedelinin %${vmPct(v.down, c.price)}`);
  set('vm-loan-v', vmTL(vmLoan()));
  set('vm-preuse-p', '%' + use);
  set('vm-terms', vmTermsHTML());
  set('vm-res', vmResHTML());
  set('vm-scen', vmScenHTML());
  set('vm-plan-prev', vmPlanPrevHTML());
}
function vmSaveScen() {
  const v = state.vm;
  if (v.scen.some(s => s.down === v.down && s.term === v.term)) return toast('Bu plan zaten kayıtlı');
  if (v.scen.length >= 3) return toast('En fazla 3 senaryo kaydedebilirsin');
  const label = ['A', 'B', 'C'].find(l => !v.scen.some(s => s.label === l));
  v.scen = v.scen.concat({ label, down: v.down, term: v.term }).sort((a, b) => a.label.localeCompare(b.label));
  const el = document.getElementById('vm-scen'); if (el) el.innerHTML = vmScenHTML();
  toast(`Senaryo ${label} kaydedildi`);
}
function vmApplyScen(label) {
  const v = state.vm, s = v.scen.find(x => x.label === label);
  if (!s) return;
  v.term = s.term;
  vmSetDown(s.down);
  toast(`Senaryo ${label} uygulandı`);
}
function vmDelScen(label) {
  const v = state.vm;
  v.scen = v.scen.filter(x => x.label !== label);
  const el = document.getElementById('vm-scen'); if (el) el.innerHTML = vmScenHTML();
}
function vmPlanSheet() {
  const v = state.vm, a = v.app, loan = a ? a.loan : vmLoan(), n = a ? a.term : v.term, rows = vmPlanRows(loan, n), q = vmQuote(loan, n);
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>Ödeme planı</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="vm-ps-sum"><div><span>Kredi tutarı</span><b>${vmTL(loan)}</b></div><div><span>Aylık taksit</span><b>${vmTL(q.pay)}</b></div><div><span>Toplam geri ödeme</span><b>${vmTL(q.total)}</b></div></div>
    <div class="vm-ps">${rows.map(r => `<div class="vm-ps-r"><span class="vm-ps-n">${r.k}</span><div><b>${r.date}</b><span>Anapara ${vmTL(r.princ)}</span><span>Faiz ve vergi ${vmTL(r.cost)}</span></div><div class="vm-ps-amt"><b>${vmTL(r.pay)}</b><span>Kalan ${vmTL(r.bal)}</span></div></div>`).join('')}</div>
    <div class="vm-cmp-note">Örnek faiz oranıyla hesaplanmıştır.</div>
    <button class="sheet-btn ghost" data-action="close-sheet">Kapat</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}

/* -------------------- Screen 6 — application & disbursement -------------------- */
const VM_REVIEW = ['Belgelerin kontrol ediliyor', 'Araç değeri ve rehin uygunluğu doğrulanıyor', 'Kredi kararı veriliyor'];
const VM_CONDS = [
  'Kredi tutarı doğrudan satıcının hesabına aktarılır; nakit olarak ödenmez.',
  'Araç, noter satışında bankamız lehine rehinlenir; rehin kredi kapanınca kaldırılır.',
  'Kredi süresince bankamızın dain-i mürtehin olarak yer aldığı kasko poliçesi gerekir.',
  'Kredini vadesinden önce kapatabilirsin; erken ödeme koşulları sözleşmede yer alır.',
];
function vmDocsFor(c) {
  return [
    ['Kimlik bilgileri', 'Nüfus kayıtlarından doğrulandı'],
    ['Gelir bilgisi', 'Beyanın ve hesap hareketlerinle doğrulandı'],
    c.cond === 'new' ? ['Proforma fatura', 'Otokoç tarafından iletildi'] : ['Satış sözleşmesi taslağı', 'Otokoç tarafından iletildi'],
    c.cond === 'new' ? ['Araç bilgileri (şasi ve motor no)', 'Otokoç tarafından iletildi'] : ['Ruhsat ve ekspertiz raporu', 'Otokoç 2. El tarafından iletildi'],
  ];
}
function VmApply() {
  const v = state.vm, a = v.app;
  const c = a ? vmCar(a.car) : vmCar(), pre = a ? v.pre : vmPreFor(c), d = vmDealer(c);
  if (!a && !pre) { state.screen = 'arac-on-onay'; return VmPre(); }
  const q = a ? { loan: a.loan, pay: a.pay, total: a.total, n: a.term } : vmQuote();
  const down = a ? a.down : v.down, term = a ? a.term : v.term, approved = a && a.status === 'approved';
  const ag = v.agree, all = ag.pre && ag.contract && ag.pledge;
  const stages = [
    { t: 'Ön onay', d: pre ? pre.at.split(' · ')[0] : 'Tamamlandı', s: 'done' },
    { t: 'Kesin değerlendirme', d: !a ? 'Başvurundan sonra' : approved ? 'Onaylandı' : 'İnceleniyor', s: !a ? 'todo' : approved ? 'done' : 'on' },
    { t: 'Kullandırım', d: v.disb ? 'Bayiye ödendi' : approved ? 'Kasko poliçesi bekleniyor' : 'Onaydan sonra', s: v.disb ? 'done' : approved ? 'wait' : 'todo' },
  ];
  let banner = '';
  if (a && !approved) banner = `
      <div class="vm-box vm-review">
        <div class="vm-review-h"><span class="vm-spin"></span><div><b>Kesin değerlendirme sürüyor</b><span>Başvuru no ${a.ref} · Sonuç bildirim olarak da gelir</span></div></div>
        <div class="vm-chk">${VM_REVIEW.map((t, k) => vmChkRowHTML(t, k, a.step, 'vm-rv-')).join('')}</div>
      </div>`;
  else if (v.disb) banner = `<div class="vm-okbar">${I.check}<span><b>Kredin kullandırıldı</b>${vmTL(q.loan)} ${VM_PAYEE.short} hesabına aktarıldı · ${v.disb.at}</span></div>`;
  else if (approved) banner = `<div class="vm-okbar">${I.check}<span><b>Kredi başvurun onaylandı</b>Kullandırım için son adım kasko poliçen. Poliçe düzenlendiğinde kredi tutarı bayinin hesabına aktarılır.</span></div>`;
  const cta = !a ? `<button class="btn-primary vm-approve ${all ? '' : 'disabled'}" id="vm-submit" data-action="vm-submit">${I.faceid} Başvuruyu Tamamla</button>`
    : !approved ? '<button class="btn-primary disabled">Değerlendiriliyor…</button>'
    : v.disb ? '<button class="btn-primary" data-action="vm-track">Süreci Takip Et</button>'
    : '<button class="btn-primary" data-action="vm-to-kasko">Kasko Tekliflerine Geç</button>';
  return `
  <div class="screen ${vmAnim()} vm">
    ${vmNav('Kredi Başvurusu')}
    <div class="screen-scroll">
      ${vmFlowHTML(2)}
      ${vmStagesHTML(stages)}
      ${banner}
      ${vmMiniHTML(c)}
      <div class="vm-sec-t vm-sec-row"><span>Başvuru özeti</span>${a ? `<span class="vm-sec-ref">No ${a.ref}</span>` : '<button class="sp-link" data-action="vm-edit-plan">Planı düzenle</button>'}</div>
      <div class="receipt vm-receipt">
        <div class="r-row"><span class="r-l">Araç bedeli</span><span class="r-r">${vmTL(c.price)}</span></div>
        <div class="r-row"><span class="r-l">Peşinat<i class="vm-sub">Bayiye senin tarafından ödenir</i></span><span class="r-r">${vmTL(down)}</span></div>
        <div class="r-row hl"><span class="r-l">Kredi tutarı</span><span class="r-r">${vmTL(q.loan)}</span></div>
        <div class="r-row"><span class="r-l">Vade</span><span class="r-r">${term} ay</span></div>
        <div class="r-row"><span class="r-l">Aylık taksit ${vmEx()}</span><span class="r-r">${vmTL(q.pay)}</span></div>
        <div class="r-row"><span class="r-l">Toplam geri ödeme</span><span class="r-r">${vmTL(q.total)}</span></div>
        <div class="r-row"><span class="r-l">Aylık faiz oranı ${vmEx()}</span><span class="r-r">%${vmPctStr(VM_RATE.monthly)}</span></div>
        <div class="r-row"><span class="r-l">İlk taksit tarihi</span><span class="r-r">${a ? a.first : vmFirstDue()}</span></div>
        <div class="r-row"><span class="r-l">Kullandırım</span><span class="r-r">${VM_PAYEE.short} hesabına</span></div>
      </div>
      <div class="vm-sec-t">Kredi koşulları</div>
      <div class="vm-box vm-conds"><ul>${VM_CONDS.map(x => `<li>${x}</li>`).join('')}</ul></div>
      <div class="vm-sec-t">Gerekli belgeler</div>
      <div class="vm-box vm-docl">${vmDocsFor(c).map(([t, s]) => `<div><span class="vm-docl-ico">${I.doc}</span><div><b>${t}</b><span>${s}</span></div><span class="vm-pill ok sm">${I.check}Hazır</span></div>`).join('')}</div>
      <div class="vm-sec-t">Sözleşmeler</div>
      <div class="vm-docs ${a ? 'locked' : ''}">
        ${[['pre', 'Kredi Ön Bilgilendirme Formu', '\'nu okudum.'], ['contract', 'Taşıt Kredisi Sözleşmesi', '\'ni okudum, onaylıyorum.'], ['pledge', 'Araç Rehni ve Kasko Taahhütnamesi', '\'ni kabul ediyorum.']].map(([k, t, tail]) => `
        <label class="contract-row ${a || ag[k] ? 'on' : ''}" ${a ? '' : `data-action="vm-agree" data-key="${k}"`}>
          <span class="cbx">${I.check}</span>
          <span class="contract-txt"><a data-action="vm-doc" data-doc="${k}">${t}</a>${tail}</span>
        </label>`).join('')}
      </div>
      ${a ? '' : `<div class="vm-note">${I.info}<span>Başvurunu tamamladığında kesin değerlendirme başlar; kredi, onay ve kasko poliçesinden sonra kullandırılır.</span></div>`}
    </div>
    <div class="screen-cta">${cta}</div>
  </div>`;
}
function vmToggleAgree(el) {
  const v = state.vm, k = el.dataset.key;
  v.agree[k] = !v.agree[k];
  el.classList.toggle('on', v.agree[k]);
  const b = document.getElementById('vm-submit');
  if (b) b.classList.toggle('disabled', !(v.agree.pre && v.agree.contract && v.agree.pledge));
}
function vmEditPlan() {
  const prev = state.nav[state.nav.length - 1];
  if (prev && prev.screen === 'arac-kredi') return navBack();
  go('arac-kredi');
}
function vmSubmit() {
  const v = state.vm, g = v.agree, btn = document.getElementById('vm-submit');
  if (!btn || v.app || !(g.pre && g.contract && g.pledge)) return;
  btn.innerHTML = '<span class="spinner"></span> Başvurun gönderiliyor…';
  btn.style.pointerEvents = 'none';
  setTimeout(() => {
    const c = vmCar(), q = vmQuote();
    v.app = { car: c.id, status: 'review', step: 0, ref: vmRef('TK'), at: vmNowStr(), down: v.down, term: v.term, loan: q.loan, pay: q.pay, total: q.total, first: vmFirstDue() };
    if (state.screen === 'arac-basvuru') { vmUnwind(); vmRerender(); }
    vmStartReview();
  }, 1300);
}
function vmStartReview() {
  const a = state.vm.app;
  if (!a || a.status !== 'review' || a.running) return;
  a.running = true;
  vmRunChecks(a, 'step', VM_REVIEW.length, 'vm-rv-', [1200, 1500, 1100], () => {
    a.running = false;
    if (state.vm.app !== a) return;   // demo was reset meanwhile
    a.status = 'approved';
    a.approvedAt = vmNowStr();
    if (state.screen === 'arac-basvuru') vmRerender();
    toast('Kredi başvurun onaylandı');
  });
}
/* -------------------- Screen 7 — kasko offers -------------------- */
const VM_K_INSTS = [1, 3, 6, 9];
function vmK() { return VM_KASKO.find(k => k.id === state.vm.kasko) || VM_KASKO[1]; }
function vmCoverVal(x) { return x === true ? `<span class="vm-yes">${I.check}</span>` : x === false ? '<span class="vm-no">Yok</span>' : x; }
function VmKasko() {
  const v = state.vm, a = v.app;
  if (!a || a.status !== 'approved') { state.screen = 'arac-basvuru'; return VmApply(); }
  const c = vmCar(a.car), done = !!v.policy, sel = done ? VM_KASKO.find(k => k.id === v.policy.offer) : vmK();
  return `
  <div class="screen ${vmAnim()} vm">
    ${vmNav('Kasko Teklifleri')}
    <div class="screen-scroll">
      ${vmFlowHTML(3)}
      ${done
        ? `<div class="vm-okbar">${I.check}<span><b>Poliçen düzenlendi</b>${sel.ins} · ${sel.pkg} · Poliçe no ${v.policy.no}</span></div>`
        : `<div class="vm-infobar">${I.shield}<span>Kredinin kullandırılması için bankamızın <b>dain-i mürtehin</b> olarak yer aldığı bir kasko poliçesi gerekir. Teklifler Allianz Türkiye'den, aracının bilgilerine göre hazırlandı.</span></div>`}
      ${vmMiniHTML(c, `<span>Kasko değeri ${vmEx()}</span><b>${vmTL(c.price)}</b>`)}
      <div class="vm-sec-t vm-sec-row"><span>Allianz Türkiye · ${VM_KASKO.length} paket</span><button class="sp-link" data-action="vm-k-compare">Karşılaştır ${I.chevR}</button></div>
      <div class="vm-ks">${VM_KASKO.map(k => vmKCardHTML(k, done, sel)).join('')}</div>
      ${done ? '' : `
      <div class="vm-sec-t">Prim ödemesi</div>
      <div class="method selected vm-k-method">
        <div class="m-ico card-ico">${imgOrFallback(WORLDCARD_IMG, '💳', 'm-cardimg')}</div>
        <div><div class="m-name">Worldcard ile öde</div><div class="m-sub">**** 3333 · 9 taksite kadar · Worldpuan kazan</div></div>
        <div class="m-check">${I.check}</div>
      </div>
      <div class="vm-box vm-k-inst" id="vm-k-inst">${vmKInstHTML()}</div>
      <div class="receipt vm-receipt">
        <div class="r-row"><span class="r-l">Sigortalı</span><span class="r-r">${VM_PROFILE.name}</span></div>
        <div class="r-row"><span class="r-l">Poliçe süresi</span><span class="r-r">1 yıl · kullandırım gününden</span></div>
        <div class="r-row"><span class="r-l">Dain-i mürtehin</span><span class="r-r">Yapı Kredi Bankası A.Ş.</span></div>
      </div>
      <div class="vm-docs">
        <label class="contract-row ${v.kAgree ? 'on' : ''}" data-action="vm-k-agree">
          <span class="cbx">${I.check}</span>
          <span class="contract-txt"><a data-action="vm-doc" data-doc="kasko">Kasko Bilgilendirme Formu</a>'nu okudum; poliçenin düzenlenmesini onaylıyorum.</span>
        </label>
      </div>`}
      <div class="vm-note">${I.info}<span>Paket adları Allianz Türkiye'nin kasko paketlerinden alınmıştır; teminat ayrıntıları ve primler örnektir.</span></div>
    </div>
    <div class="screen-cta">
      ${done ? '<button class="btn-primary" data-action="vm-track">Süreci Takip Et</button>'
        : `<button class="btn-primary ${v.kAgree ? '' : 'disabled'}" id="vm-k-buy" data-action="vm-k-buy">Poliçeyi Onayla · <span id="vm-k-amt">${vmTL(sel.premium)}</span></button>`}
    </div>
  </div>`;
}
function vmKCardHTML(k, done, sel) {
  const on = sel.id === k.id, cv = k.cover;
  return `<div class="vm-k ${on ? 'on' : ''} ${done && !on ? 'dim' : ''}" data-id="${k.id}" ${done ? '' : `data-action="vm-k-pick"`}>
    <span class="vm-k-tag t-${k.id}">${k.tag}</span>
    <div class="vm-k-top">
      <span class="vm-k-logo" style="background:${k.color}">${k.ins[0]}</span>
      <div class="vm-k-name"><b>${k.pkg}</b><span>${k.ins} · Kasko</span></div>
      <span class="vm-k-radio"></span>
    </div>
    <div class="vm-k-covs">
      <span>Yedek araç<b>${cv.ikame}</b></span><span>Deprem<b>${cv.deprem === true ? 'Dahil' : cv.deprem}</b></span>
      <span>Hasarsızlık koruma<b>${cv.hasarsiz ? 'Var' : 'Yok'}</b></span><span>Yurt dışı<b>${cv.yurtdisi ? 'Var' : 'Yok'}</b></span>
    </div>
    <div class="vm-k-foot">
      <div class="vm-k-price"><b>${vmTL(k.premium)}</b><span>yıllık · 9 taksitte aylık ${vmTL(k.premium / 9)}</span></div>
      <button class="sp-link" data-action="vm-k-detail" data-id="${k.id}">Teminatlar ${I.chevR}</button>
    </div>
  </div>`;
}
function vmKInstHTML() {
  const v = state.vm, p = vmK().premium;
  return VM_K_INSTS.map(n => `<div class="inst-opt ${v.kInst === n ? 'active' : ''}" data-action="vm-k-inst" data-n="${n}">
      <span class="io-l"><span class="io-radio"></span><span class="io-text"><span class="io-name">${n === 1 ? 'Tek Çekim' : n + ' Taksit'}</span></span></span>
      <span class="io-r">${n === 1 ? vmTL(p) : `${n} × ${vmTL(p / n)}`}</span>
    </div>`).join('');
}
function vmKPick(id) {
  const v = state.vm;
  if (v.policy) return;
  v.kasko = id;
  document.querySelectorAll('.vm-k').forEach(el => el.classList.toggle('on', el.dataset.id === id));
  const ins = document.getElementById('vm-k-inst'); if (ins) ins.innerHTML = vmKInstHTML();
  const amt = document.getElementById('vm-k-amt'); if (amt) amt.textContent = vmTL(vmK().premium);
}
function vmKInst(n) {
  state.vm.kInst = n;
  const ins = document.getElementById('vm-k-inst'); if (ins) ins.innerHTML = vmKInstHTML();
}
function vmKAgree(el) {
  const v = state.vm;
  v.kAgree = !v.kAgree;
  el.classList.toggle('on', v.kAgree);
  const b = document.getElementById('vm-k-buy'); if (b) b.classList.toggle('disabled', !v.kAgree);
}
function vmKDetailSheet(id) {
  const k = VM_KASKO.find(x => x.id === id), done = !!state.vm.policy;
  if (!k) return;
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>Teminatlar</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="vm-kd-head"><span class="vm-k-logo" style="background:${k.color}">${k.ins[0]}</span><div><b>${k.pkg}</b><span>${k.ins} · ${k.tag}</span></div><em>${vmTL(k.premium)}<i>yıllık</i></em></div>
    <div class="vm-covl">${VM_COVERS.map(([key, label]) => `<div><span>${label}</span>${vmCoverVal(k.cover[key])}</div>`).join('')}</div>
    <div class="vm-cmp-note">Teminat ve primler örnektir.</div>
    ${done ? '<button class="sheet-btn ghost" data-action="close-sheet">Kapat</button>'
      : `<button class="sheet-btn" data-action="vm-k-choose" data-id="${k.id}">Bu Teklifi Seç</button><button class="sheet-btn ghost" data-action="close-sheet">Kapat</button>`}`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function vmKCompareSheet() {
  const minP = Math.min(...VM_KASKO.map(k => k.premium));
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>Teklif karşılaştırma</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="vm-cmp-scroll"><table class="vm-cmp-t vm-kcmp">
      <thead><tr><th></th>${VM_KASKO.map(k => `<td><span class="vm-k-logo sm" style="background:${k.color}">${k.ins[0]}</span><b>${k.short}</b></td>`).join('')}</tr></thead>
      <tbody>
        <tr><th>Yıllık prim</th>${VM_KASKO.map(k => `<td class="${k.premium === minP ? 'best' : ''}">${vmTL(k.premium)}</td>`).join('')}</tr>
        ${VM_COVERS.map(([key, label]) => `<tr><th>${label}</th>${VM_KASKO.map(k => `<td>${vmCoverVal(k.cover[key])}</td>`).join('')}</tr>`).join('')}
      </tbody>
    </table></div>
    <div class="vm-cmp-note">Yeşil: en düşük prim. Teminat ve primler örnektir.</div>
    <button class="sheet-btn ghost" data-action="close-sheet">Kapat</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function vmKBuy() {
  const v = state.vm, k = vmK(), c = vmCar(v.app.car), d = vmDealer(c);
  if (!v.kAgree || v.policy) return;
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-amount-label">Kasko primi</div>
    <div class="sheet-amount">${vmTL(k.premium)}</div>
    <div class="sheet-pay-row"><span>${k.ins} · ${k.short}</span><span class="spr-r">Worldcard **** 3333 · ${v.kInst === 1 ? 'Tek Çekim' : v.kInst + ' Taksit'}</span></div>
    <div class="vm-sheet-note">${I.info}<span>Poliçe düzenlendiğinde ${vmTL(v.app.loan)} kredi tutarın ${VM_PAYEE.short} hesabına aktarılır.</span></div>
    <button class="sheet-btn" id="vm-k-approve" data-action="vm-k-approve">${I.faceid} Yapı Kredi Mobil ile Onayla</button>
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function vmKApprove() {
  const btn = document.getElementById('vm-k-approve');
  if (!btn || btn.dataset.busy) return;
  btn.dataset.busy = '1';
  btn.style.pointerEvents = 'none';
  btn.innerHTML = '<span class="spinner"></span> Poliçe düzenleniyor…';
  setTimeout(() => { btn.innerHTML = '<span class="spinner"></span> Kredi kullandırılıyor…'; }, 1300);
  setTimeout(() => {
    vmIssuePolicy();
    closeSheet();
    setTimeout(() => {
      if (state.screen !== 'arac-kasko') return;
      vmUnwind();
      state.chatSeed = false;
      state.screen = 'arac-takip';
      vmRerender('anim-right');
    }, 250);
  }, 2700);
}
function vmIssuePolicy() {
  const v = state.vm, k = vmK();
  v.policy = { offer: k.id, no: vmRef('KSK'), at: vmNowStr(), inst: v.kInst, start: vmDateIn(0), end: vmDateIn(365) };
  v.disb = { at: vmNowStr(), ref: vmRef('KLD'), noter: vmDateIn(2), eta: vmDateIn(6), done: null };
  v.stage = 0;
  v.justDone = true;
}

/* -------------------- Screen 8 — delivery & process tracking -------------------- */
/* Delivery steps after disbursement: [title, done, active, waiting] */
function vmDelivSteps() {
  const b = state.vm.disb;
  return [
    ['Noter satışı ve rehin', `Satış ve rehin tescili tamamlandı · ${b ? b.noter : ''}`, `Noter randevusu ${b ? b.noter : ''}`, 'Kullandırımdan sonra'],
    ['Teslime hazırlık', 'Plaka ve ruhsat hazır', 'Plaka, ruhsat ve son kontroller yapılıyor', 'Noter işlemlerinden sonra'],
    ['Teslim', `Teslim edildi · ${b && b.done ? b.done : ''}`, 'Aracın hazır · bayiden teslim alabilirsin', b ? `Tahmini ${b.eta}` : 'Tarih kullandırımdan sonra netleşir'],
  ];
}
function vmDelivStatus() {
  const v = state.vm;
  if (!v.disb) return ['Kullandırım bekleniyor', 'wait'];
  return [['Noter işlemleri sürüyor', 'on'], ['Teslime hazırlanıyor', 'on'], ['Teslime hazır', 'ok'], ['Teslim edildi', 'ok']][v.stage];
}
function VmTrack() {
  const v = state.vm, a = v.app;
  if (!a) return vmTrackEmpty();
  const c = vmCar(a.car), d = vmDealer(c), pre = v.pre, approved = a.status === 'approved';
  const k = v.policy ? VM_KASKO.find(x => x.id === v.policy.offer) : null;
  const fresh = v.justDone; v.justDone = false;
  const [dst, dcls] = vmDelivStatus();
  const eta = v.disb ? (v.stage >= 3 ? v.disb.done : v.disb.eta) : null;
  const steps = [
    { t: 'Araç seçimi', d: `${c.brand} ${c.model} · ${d.name}`, s: 'done' },
    { t: 'Kredi ön onayı', d: pre ? `${vmTL(pre.amount)} ön onaylı tutar` : 'Tamamlandı', s: 'done' },
    { t: 'Kredi başvurusu', d: approved ? 'Kesin değerlendirme olumlu' : 'Kesin değerlendirme sürüyor', s: approved ? 'done' : 'active' },
    { t: 'Kasko poliçesi', d: k ? `${k.ins} · ${k.short} · ${v.policy.no}` : approved ? 'Teklif seçimini bekliyor' : 'Kredi onayından sonra', s: k ? 'done' : approved ? 'active' : 'todo' },
    { t: 'Kredi kullandırımı', d: v.disb ? `${vmTL(a.loan)} bayi hesabına aktarıldı` : 'Kasko poliçesinden sonra', s: v.disb ? 'done' : 'todo' },
    ...vmDelivSteps().map(([t, dn, on, wait], i) => {
      const s = !v.disb ? 'todo' : v.stage > i ? 'done' : v.stage === i ? 'active' : 'todo';
      return { t, d: s === 'done' ? dn : s === 'active' ? on : wait, s };
    }),
  ];
  const doneN = steps.filter(s => s.s === 'done').length, pct = vmPct(doneN, steps.length), next = steps.find(s => s.s !== 'done');
  const tiles = [
    { ico: I.car, l: 'Satın alma', val: !v.disb ? 'Ödeme bekleniyor' : v.stage >= 1 ? 'Satış tamamlandı' : 'Noter satışı bekleniyor', s: v.disb && v.stage >= 1 ? 'ok' : 'wait' },
    { ico: I.doc, l: 'Kredi başvurusu', val: approved ? 'Onaylandı' : 'Değerlendiriliyor', s: approved ? 'ok' : 'wait', act: 'vm-open-apply' },
    { ico: I.bank, l: 'Kullandırım', val: v.disb ? 'Bayiye ödendi' : 'Kasko bekleniyor', s: v.disb ? 'ok' : 'wait', act: v.disb ? 'vm-disb' : '' },
    { ico: I.insurance, l: 'Kasko', val: k ? 'Poliçe aktif' : approved ? 'Teklif seç' : 'Onaydan sonra', s: k ? 'ok' : approved ? 'act' : 'todo', act: k ? 'vm-policy' : approved ? 'vm-to-kasko' : '' },
  ];
  const cta = approved && !k ? '<button class="btn-primary" data-action="vm-to-kasko">Kasko Tekliflerine Geç</button>'
    : v.stage >= 3 ? '<button class="btn-primary" data-action="vm-home">Marketplace\'e Dön</button>' : '';
  return `
  <div class="screen ${vmAnim()} vm">
    ${vmNav('Satın Alma Takibi')}
    <div class="screen-scroll">
      <div class="vm-trk-hero">
        <div class="vm-trk-img">${vmPicHTML(c, 'side', 'dark')}${c.photos ? '' : '<span class="vm-gal-tag">Temsilî görsel</span>'}</div>
        <div class="vm-trk-hd">
          <div><b>${c.brand} ${c.model}</b><span>${c.trim} · ${c.year}</span></div>
          <span class="vm-pill ${dcls}">${dst}</span>
        </div>
        <div class="vm-prog">
          <div class="vm-prog-top"><span>Süreç ilerlemesi</span><b>%${pct}</b></div>
          <div class="vm-prog-bar" role="img" aria-label="${steps.length} adımdan ${doneN} tanesi tamamlandı">${steps.map(s => `<i class="${s.s}"></i>`).join('')}</div>
          <div class="vm-prog-sub">${doneN}/${steps.length} adım tamamlandı${next ? ` · Sıradaki: ${next.t}` : ''}</div>
        </div>
      </div>
      ${fresh ? `<div class="vm-okbar">${I.check}<span><b>Poliçen düzenlendi, kredin kullandırıldı</b>${vmTL(a.loan)} ${VM_PAYEE.short} hesabına aktarıldı. Noter randevun ${v.disb.noter}.</span></div>` : ''}
      ${v.stage >= 3 ? `<div class="vm-okbar">${VM_ICO.key}<span><b>Aracın teslim edildi</b>İyi yolculuklar! İlk taksit tarihin ${a.first}.</span></div>` : ''}
      <div class="vm-tiles">${tiles.map(t => `<div class="vm-tile ${t.s} ${t.act ? 'tap' : ''}" ${t.act ? `data-action="${t.act}"` : ''}>
        <span class="vm-tile-ico">${t.ico}</span><span class="vm-tile-l">${t.l}</span><b>${t.val}</b>${t.act ? `<span class="vm-tile-chev">${I.chevR}</span>` : ''}
      </div>`).join('')}</div>
      <div class="vm-box vm-deliv">
        <div class="vm-deliv-top">
          <span class="vm-deliv-ico">${VM_ICO.key}</span>
          <div><span>${v.stage >= 3 ? 'Teslim tarihi' : 'Tahmini teslim tarihi'}</span><b>${eta || 'Kullandırımdan sonra netleşir'}</b></div>
        </div>
        <div class="vm-deliv-pt">${I.pin}<span><b>Teslim noktası</b>${d.name}, ${d.district} / ${d.city}</span></div>
        <div class="vm-hint">${v.stage >= 3 ? 'Ruhsatın ve poliçe belgelerin teslimde sana verildi.' : 'Teslimde kimliğini yanında bulundur; ruhsat ve poliçe belgelerin bayide hazır olacak.'}</div>
      </div>
      <div class="vm-sec-t">Süreç adımları</div>
      <div class="stepper vm-stepper">
        ${steps.map((st, i) => `
          <div class="step ${st.s}">
            <div class="step-dot">${st.s === 'done' ? I.check : ''}</div>
            ${i < steps.length - 1 ? '<div class="step-line"></div>' : ''}
            <div class="step-body"><div class="step-t">${st.t}</div><div class="step-d">${st.d}</div></div>
          </div>`).join('')}
      </div>
      ${vmDealerBoxHTML(d)}
      <div class="vm-sec-t">Belgeler</div>
      <div class="ru-info-card vm-links">
        <div class="ru-info-row tap" data-action="vm-plan-all"><span class="ru-info-ico">${I.doc}</span><span class="ru-info-k">Kredi ödeme planı</span><span class="ru-info-v">${a.term} taksit</span>${I.chevR}</div>
        ${k ? `<div class="ru-info-row tap" data-action="vm-policy"><span class="ru-info-ico">${I.insurance}</span><span class="ru-info-k">Kasko poliçesi</span><span class="ru-info-v">Allianz · ${k.short}</span>${I.chevR}</div>` : ''}
        ${v.disb ? `<div class="ru-info-row tap" data-action="vm-disb"><span class="ru-info-ico">${I.receipt}</span><span class="ru-info-k">Kullandırım dekontu</span><span class="ru-info-v">${vmShortDate(v.disb.at)}</span>${I.chevR}</div>` : ''}
      </div>
      <div class="vm-demo">
        <div class="vm-demo-h">${I.info}<span>Demo kontrolleri · Gerçek süreçte bu adımlar bayi ve noterden gelen bilgilerle güncellenir.</span></div>
        <div class="vm-demo-btns">
          ${v.disb && v.stage < 3 ? '<button class="vm-demo-btn main" data-action="vm-adv">Sonraki adıma geç</button>' : ''}
          <button class="vm-demo-btn" data-action="vm-reset">Demoyu sıfırla</button>
        </div>
      </div>
    </div>
    ${cta ? `<div class="screen-cta">${cta}</div>` : ''}
  </div>`;
}
function vmShortDate(s) { return s.split(' · ')[0]; }
function vmTrackEmpty() {
  return `
  <div class="screen ${vmAnim()} vm">
    ${vmNav('Satın Alma Takibi')}
    <div class="screen-scroll">
      <div class="vm-empty big">${I.car}<b>Devam eden satın alman yok</b><span>Bir araç seçip kredi başvurunu tamamladığında kredi, kasko ve teslim adımlarını buradan takip edebilirsin.</span>
        <button class="btn-primary" data-action="vm-home">Araç Ara</button></div>
    </div>
  </div>`;
}
function vmAdvance() {
  const v = state.vm;
  if (!v.disb || v.stage >= 3) return;
  v.stage += 1;
  if (v.stage === 3) v.disb.done = v.disb.eta;   // demo fast-forwards to the planned date
  vmRerender();
  toast(['', 'Noter satışı tamamlandı, rehin tescil edildi', 'Aracın teslime hazır', 'Aracın teslim edildi'][v.stage]);
}
function vmPolicySheet() {
  const v = state.vm, p = v.policy;
  if (!p) return;
  const k = VM_KASKO.find(x => x.id === p.offer), c = vmCar(v.app.car);
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>Kasko poliçesi</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="vm-kd-head"><span class="vm-k-logo" style="background:${k.color}">${k.ins[0]}</span><div><b>${k.ins}</b><span>${k.pkg} · ${p.no}</span></div><span class="vm-pill ok sm">${I.check}Aktif</span></div>
    <div class="receipt vm-sh-receipt">
      <div class="r-row"><span class="r-l">Sigortalı araç</span><span class="r-r">${c.brand} ${c.model} · ${c.year}</span></div>
      <div class="r-row"><span class="r-l">Poliçe süresi</span><span class="r-r">${p.start} – ${p.end}</span></div>
      <div class="r-row"><span class="r-l">Yıllık prim</span><span class="r-r">${vmTL(k.premium)} · ${p.inst === 1 ? 'Tek Çekim' : p.inst + ' Taksit'}</span></div>
      <div class="r-row"><span class="r-l">Dain-i mürtehin</span><span class="r-r">Yapı Kredi Bankası A.Ş.</span></div>
    </div>
    <div class="vm-covl compact">${VM_COVERS.map(([key, label]) => `<div><span>${label}</span>${vmCoverVal(k.cover[key])}</div>`).join('')}</div>
    <button class="sheet-btn ghost" data-action="toast" data-msg="Poliçe paylaşımı prototipte aktif değil">Poliçeyi Paylaş</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function vmDisbSheet() {
  const v = state.vm, b = v.disb;
  if (!b) return;
  const c = vmCar(v.app.car), d = vmDealer(c);
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>Kullandırım dekontu</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="vm-sh-head"><span class="vm-pill ok">${I.check}Bayiye ödendi</span><b>${vmTL(v.app.loan)}</b><span>${c.brand} ${c.model} taşıt kredisi kullandırımı</span></div>
    <div class="receipt vm-sh-receipt">
      <div class="r-row"><span class="r-l">Alıcı</span><span class="r-r">${VM_PAYEE.legal}</span></div>
      <div class="r-row"><span class="r-l">Satış noktası</span><span class="r-r">${d.name} · ${d.district}</span></div>
      <div class="r-row"><span class="r-l">Alıcı IBAN</span><span class="r-r">TR•• •••• •••• •••• 2034</span></div>
      <div class="r-row"><span class="r-l">Kredi başvuru no</span><span class="r-r">${v.app.ref}</span></div>
      <div class="r-row"><span class="r-l">İşlem tarihi</span><span class="r-r">${b.at}</span></div>
      <div class="r-row"><span class="r-l">İşlem no</span><span class="r-r">${b.ref}</span></div>
    </div>
    <button class="sheet-btn ghost" data-action="toast" data-msg="Dekont paylaşımı prototipte aktif değil">Dekontu Paylaş</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}

/* -------------------- legal texts (example copy) -------------------- */
function vmDocSheet(kind) {
  const v = state.vm, a = v.app, c = a ? vmCar(a.car) : vmCar(), q = a ? { loan: a.loan, pay: a.pay, total: a.total } : vmQuote(), term = a ? a.term : v.term;
  const docs = {
    kvkk: ['Aydınlatma Metni', `
      <h4>Hangi verileri işliyoruz?</h4><p>Kimlik, iletişim, gelir ve kredi geçmişi bilgilerin, taşıt kredisi ön değerlendirmesi için işlenir.</p>
      <h4>KKB sorgusu</h4><p>Ön değerlendirme sırasında Kredi Kayıt Bürosu üzerinden kredi geçmişin sorgulanır.</p>
      <h4>Hakların</h4><p>Verilerinin işlenip işlenmediğini öğrenme, düzeltilmesini ve silinmesini isteme hakkına sahipsin.</p>`],
    pre: ['Kredi Ön Bilgilendirme Formu', `
      <h4>1. Kredinin konusu</h4><p>${c.brand} ${c.model} (${c.year}) aracının alımı için <b>${vmTL(q.loan)}</b> taşıt kredisi, ${term} ay vade.</p>
      <h4>2. Maliyetler (örnek)</h4><p>Aylık faiz %${vmPctStr(VM_RATE.monthly)}; faiz üzerinden KKDF ve BSMV. Aylık taksit <b>${vmTL(q.pay)}</b>, toplam geri ödeme <b>${vmTL(q.total)}</b>.</p>
      <h4>3. Teminat</h4><p>Araç üzerinde banka lehine rehin ve bankanın dain-i mürtehin olduğu kasko poliçesi.</p>`],
    contract: ['Taşıt Kredisi Sözleşmesi', `
      <h4>1. Kullandırım</h4><p>Kredi tutarı, kesin onay ve kasko poliçesinin düzenlenmesinden sonra doğrudan satıcının hesabına aktarılır.</p>
      <h4>2. Geri ödeme</h4><p>Taksitler ödeme planındaki tarihlerde hesabından tahsil edilir. Gecikmede sözleşmedeki gecikme faizi uygulanır.</p>
      <h4>3. Erken ödeme ve cayma</h4><p>Krediyi vadesinden önce kapatabilirsin. Sözleşmenin kurulmasından itibaren 14 gün içinde cayma hakkın vardır.</p>`],
    pledge: ['Araç Rehni ve Kasko Taahhütnamesi', `
      <h4>1. Rehin</h4><p>${c.brand} ${c.model} aracı, noter satışı sırasında kredi borcu karşılığında bankamız lehine rehinlenir. Kredi kapandığında rehin kaldırılır.</p>
      <h4>2. Kasko</h4><p>Kredi süresince, bankamızın dain-i mürtehin olarak yer aldığı kasko poliçesinin her yıl yenilenmesini taahhüt edersin.</p>`],
    kasko: ['Kasko Bilgilendirme Formu', `
      <h4>1. Poliçe</h4><p>Seçtiğin paketle Allianz Türkiye tarafından 1 yıl süreli kasko poliçesi düzenlenir; bankamız dain-i mürtehindir.</p>
      <h4>2. Prim ödemesi</h4><p>Prim, seçtiğin taksit sayısına göre Worldcard'ından tahsil edilir.</p>
      <h4>3. Hasar</h4><p>Hasar durumunda sigorta şirketinin hasar hattını araman yeterlidir; muafiyet tutarı teklifte belirtilir.</p>`],
  };
  const [title, body] = docs[kind] || docs.kvkk;
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>${title}</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="legal-scroll"><p>Bu metin prototip amaçlı örnek bir metindir; gerçek ürün koşullarını yansıtmaz.</p>${body}</div>
    <button class="sheet-btn ghost" data-action="close-sheet">Kapat</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}

/* -------------------- navigation -------------------- */
// After submitting / paying, "back" should land on the marketplace, not on screens that can no longer change
function vmUnwind() {
  const i = state.nav.map(f => f.screen).lastIndexOf('arac');
  if (i >= 0) state.nav = state.nav.slice(0, i);
  else while (state.nav.length && state.nav[state.nav.length - 1].screen.startsWith('arac')) state.nav.pop();
  state.nav.push({ screen: 'arac', chatSeed: false });
}
function vmGoMarket() {
  const i = state.nav.map(f => f.screen).lastIndexOf('arac');
  if (i >= 0) state.nav = state.nav.slice(0, i);
  closeSheet();
  state.chatSeed = false;
  state.screen = 'arac';
  vmRerender();
}
function vmGoTrack() {
  closeSheet();
  if (state.screen !== 'arac-takip') go('arac-takip');
}
function vmOpen(id) { state.vm.car = id; go('arac-detay'); }
function vmOpenFavs() { state.vm.favOnly = true; go('arac-liste'); }
function vmContinue() { const v = state.vm; if (!v.pre) return; v.car = v.pre.car; go('arac-on-onay'); }
function vmStartPre() {
  const v = state.vm, c = vmCar();
  if (v.app) return v.app.car === c.id ? vmGoTrack() : vmBusySheet(c);
  vmInitFlow(c);
  go('arac-on-onay');
}
function vmBusySheet(c) {
  const cur = vmCar(state.vm.app.car);
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-ico vm-sheet-ico">${I.car}</div>
    <h3>Devam eden satın alman var</h3>
    <p>${cur.brand} ${cur.model} için kredi ve teslim sürecin devam ediyor. ${c.brand} ${c.model} için yeni bir ön onay başlatırsan bu demo süreci sıfırlanır.</p>
    <button class="sheet-btn" data-action="vm-track">Mevcut Süreci Gör</button>
    <button class="sheet-btn ghost" data-action="vm-reset-start" data-id="${c.id}">Yeni Süreç Başlat</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function vmResetPurchase() {
  Object.assign(state.vm, { pre: null, preBusy: false, preStep: 0, app: null, policy: null, disb: null, stage: 0, kasko: 'k2', kInst: 1, kAgree: false, justDone: false, flowCar: null });
}
function vmResetStart(id) { vmResetPurchase(); closeSheet(); state.vm.car = id; vmStartPre(); }
function vmReset() { vmResetPurchase(); vmGoMarket(); toast('Demo süreci sıfırlandı'); }
function vmMakeApp(status) {
  const v = state.vm, c = vmCar(), q = vmQuote();
  return { car: c.id, status, step: status === 'approved' ? VM_REVIEW.length : 0, ref: vmRef('TK'), at: vmNowStr(), approvedAt: status === 'approved' ? vmNowStr() : null, down: v.down, term: v.term, loan: q.loan, pay: q.pay, total: q.total, first: vmFirstDue() };
}
// Deep links (#arac-…) prepare the state they need without replaying the flow
function vmSeed(h) {
  const v = state.vm;
  if (!VM_CARS.some(c => c.id === v.car)) v.car = 'a4';
  if (v.app) return;   // an ongoing purchase keeps its own state
  if (['arac-on-onay', 'arac-kredi', 'arac-basvuru', 'arac-kasko', 'arac-takip'].includes(h)) vmInitFlow(vmCar());
  if (['arac-kredi', 'arac-basvuru', 'arac-kasko', 'arac-takip'].includes(h) && !vmPreFor()) {
    v.consent = true; v.preBusy = false;
    v.pre = vmMakePre(vmCar());
  }
  if (h === 'arac-kasko' || h === 'arac-takip') {
    v.agree = { pre: true, contract: true, pledge: true };
    v.app = vmMakeApp('approved');
  }
  if (h === 'arac-takip') { v.kAgree = true; vmIssuePolicy(); v.justDone = false; }
}

/* ======================================================================
   MARKETPLACE KONUT (draft) — housing loan marketplace
   Home search → listing & price comparison → details → loan simulation →
   application → approval tracking → ekspertiz → branch disbursement & ipotek.
   Listings, agencies, the valuation firm and every rate / fee here are DEMO
   or EXAMPLE data. Reuses the marketplace kit (vm-* helpers and styles) of
   Marketplace Taşıt. Home pictures are representative vector illustrations
   (real photos can be added per listing via `photos`).
   ====================================================================== */
const KN_RATE = { monthly: 2.29 };      // EXAMPLE monthly interest %; KKDF and BSMV do not apply to housing loans
const KN_MIN_LOAN = 250000;             // EXAMPLE minimum loan (TL)
const KN_TERMS = [36, 60, 96, 120];
const KN_EST = { downPct: 40, term: 120 };   // basis of the "aylık ~" estimates on cards
const KN_CAP = 50;                      // EXAMPLE: total monthly debt payments should stay under this % of income
const KN_FEES = { alloc: 0.5, expertise: 4750, deedPct: 2, dask: 2150 };   // EXAMPLE costs: tahsis %, ekspertiz TL, tapu harcı alıcı %, DASK TL
const KN_FLOW = ['Simülasyon', 'Başvuru', 'Ekspertiz', 'Onay', 'Tapu'];
const KN_TYPES = ['Daire', 'Rezidans', 'Müstakil ev', 'Villa'];
const KN_ROOMS = ['1+1', '2+1', '3+1', '4+1'];   // "4+1" = 4+1 and larger
const KN_AGES = [['0-5', '0–5 yıl', 0, 5], ['5-10', '6–10 yıl', 6, 10], ['10-20', '11–20 yıl', 11, 20], ['20+', '20 yıl üzeri', 21, 999]];
const KN_CITIES = { 'İstanbul': ['Kadıköy', 'Ataşehir', 'Üsküdar', 'Beşiktaş', 'Sarıyer', 'Beylikdüzü'], 'Ankara': ['Çankaya'], 'İzmir': ['Karşıyaka', 'Urla'], 'Bursa': ['Nilüfer'], 'Antalya': ['Muratpaşa'] };
const KN_AVG_M2 = { 'Kadıköy': 64000, 'Ataşehir': 62000, 'Üsküdar': 56000, 'Beşiktaş': 92000, 'Sarıyer': 88000, 'Beylikdüzü': 37000, 'Çankaya': 43000, 'Karşıyaka': 49000, 'Urla': 64000, 'Nilüfer': 35000, 'Muratpaşa': 45000 };   // DEMO district averages (TL per gross m²)
const KN_COAST = ['Kadıköy', 'Üsküdar', 'Beşiktaş', 'Sarıyer', 'Karşıyaka', 'Urla', 'Muratpaşa'];
// Sellers are DEMO data (fictional agencies, developers and an owner)
const KN_SELLERS = {
  s1: { name: 'Moda Gayrimenkul',          kind: 'Emlak ofisi',     agent: 'Elif Demir',  city: 'İstanbul', district: 'Kadıköy' },
  s2: { name: 'Doğa Emlak Danışmanlık',    kind: 'Emlak ofisi',     agent: 'Can Yıldız',  city: 'İstanbul', district: 'Ataşehir' },
  s3: { name: 'Mavi Kule Konut Projesi',   kind: 'İnşaat firması',  agent: 'Satış ofisi', city: 'İstanbul', district: 'Beylikdüzü' },
  s4: { name: 'Murat K.',                  kind: 'Ev sahibi',       agent: 'Murat K.',    city: 'İstanbul', district: 'Üsküdar' },
  s5: { name: 'Boğaziçi Emlak',            kind: 'Emlak ofisi',     agent: 'Deniz Aydın', city: 'İstanbul', district: 'Beşiktaş' },
  s6: { name: 'Çankaya Gayrimenkul',       kind: 'Emlak ofisi',     agent: 'Burak Şen',   city: 'Ankara',   district: 'Çankaya' },
  s7: { name: 'Körfez Emlak',              kind: 'Emlak ofisi',     agent: 'Ece Kaya',    city: 'İzmir',    district: 'Karşıyaka' },
  s8: { name: 'Ege Bahçe Evleri',          kind: 'İnşaat firması',  agent: 'Satış ofisi', city: 'İzmir',    district: 'Urla' },
  s9: { name: 'Nilüfer Yapı',              kind: 'İnşaat firması',  agent: 'Satış ofisi', city: 'Bursa',    district: 'Nilüfer' },
  s10: { name: 'Lara Emlak',               kind: 'Emlak ofisi',     agent: 'Selin Ak',    city: 'Antalya',  district: 'Muratpaşa' },
};
// Listings are DEMO data. `photos: ['assets/konut/h1-1.jpg', …]` replaces the illustrations (gallery order).
const KN_HOMES = [
  { id: 'h1', title: 'Metroya yürüme mesafesinde 3+1 daire', city: 'İstanbul', district: 'Kadıköy', hood: 'Caferağa Mah.', type: 'Daire', rooms: '3+1', gross: 135, net: 115, year: 2020, cond: 'used', price: 8000000, floor: '4. kat', floors: 6, heating: 'Kombi (doğalgaz)', bath: 2, balcony: true, parking: 'Kapalı otopark', site: false, elevator: true, furnished: false, energy: 'B', seller: 's1', featured: true, days: 2, scene: 'apartment', pal: { facade: '#efe3d3', trim: '#b4835d', sofa: '#5f7a99', accent: '#d98f5f', cab: '#e9e1d4' }, value: 8150000,
    desc: 'Caferağa\'da, 2020 yapımı 6 katlı binanın 4. katında, güney cepheli 3+1 daire. Salon ve mutfak ayrı, ebeveyn banyolu; kapalı otopark ve asansör var. Metro ve vapur iskelesine yürüme mesafesinde.',
    near: [['Metro', '650 m'], ['Vapur iskelesi', '1,2 km'], ['İlkokul', '400 m'], ['Hastane', '1,8 km']] },
  { id: 'h2', title: 'Site içinde havuzlu rezidans, 2+1', city: 'İstanbul', district: 'Ataşehir', hood: 'Atatürk Mah.', type: 'Rezidans', rooms: '2+1', gross: 105, net: 88, year: 2018, cond: 'used', price: 6750000, floor: '14. kat', floors: 28, heating: 'Merkezi (pay ölçer)', bath: 2, balcony: true, parking: 'Kapalı otopark', site: true, elevator: true, furnished: false, energy: 'B', seller: 's2', featured: true, days: 4, scene: 'tower', pal: { facade: '#6f97c4', trim: '#2e4d78', sofa: '#8a6f5c', accent: '#4d8fa6', cab: '#f2f2f0' },
    desc: '7/24 güvenlikli, açık ve kapalı havuzlu sitede, şehir manzaralı 2+1 rezidans dairesi. Spor salonu ve otopark site içinde.',
    near: [['Metro', '900 m'], ['AVM', '700 m'], ['Okul', '1,1 km'], ['Hastane', '2,3 km']] },
  { id: 'h3', title: 'Altunizade\'de geniş 3+1, bakımlı bina', city: 'İstanbul', district: 'Üsküdar', hood: 'Altunizade Mah.', type: 'Daire', rooms: '3+1', gross: 140, net: 120, year: 2012, cond: 'used', price: 7400000, floor: '2. kat', floors: 5, heating: 'Kombi (doğalgaz)', bath: 1, balcony: true, parking: 'Açık otopark', site: false, elevator: true, furnished: false, energy: 'C', seller: 's4', days: 6, scene: 'apartment', pal: { facade: '#e3e7eb', trim: '#7b8896', sofa: '#7d8a6a', accent: '#c46e52', cab: '#f4f1ec' },
    desc: 'Sahibinden, bakımlı binada geniş salonlu 3+1. Metrobüse ve Marmaray\'a yakın, okul ve hastanelere kısa mesafede.',
    near: [['Metrobüs', '800 m'], ['Marmaray', '1,5 km'], ['Okul', '350 m'], ['Hastane', '1,2 km']] },
  { id: 'h4', title: 'Beşiktaş merkezde 2+1, yenilenmiş', city: 'İstanbul', district: 'Beşiktaş', hood: 'Sinanpaşa Mah.', type: 'Daire', rooms: '2+1', gross: 95, net: 80, year: 1998, cond: 'used', price: 9200000, floor: '3. kat', floors: 5, heating: 'Kombi (doğalgaz)', bath: 1, balcony: false, parking: 'Yok', site: false, elevator: false, furnished: false, energy: 'D', seller: 's5', days: 9, scene: 'apartment', pal: { facade: '#f0d9c3', trim: '#93684a', sofa: '#9a5b4f', accent: '#5f8a8b', cab: '#ece5da' },
    desc: 'Çarşıya ve iskeleye yürüme mesafesinde, tamamen yenilenmiş 2+1. Mutfak ve banyo yeni.',
    near: [['Vapur iskelesi', '450 m'], ['Metro', '1,4 km'], ['Okul', '600 m'], ['Hastane', '1,1 km']] },
  { id: 'h5', title: 'Zekeriyaköy\'de havuzlu müstakil villa', city: 'İstanbul', district: 'Sarıyer', hood: 'Zekeriyaköy', type: 'Villa', rooms: '5+2', gross: 380, net: 320, year: 2016, cond: 'used', price: 32500000, floor: 'Villa (3 kat)', floors: 3, heating: 'Yerden ısıtma', bath: 4, balcony: true, parking: 'Kapalı garaj (2 araç)', site: true, elevator: false, furnished: false, energy: 'B', seller: 's5', featured: true, days: 12, scene: 'villa', pal: { facade: '#f4f3ef', trim: '#a8754a', sofa: '#4f5d6e', accent: '#c9a36a', cab: '#3f4650' },
    desc: 'Güvenlikli villa sitesinde, özel havuzlu ve bahçeli 5+2 villa. Geniş teraslar, yerden ısıtma ve iki araçlık garaj.',
    near: [['Okul', '1,6 km'], ['Market', '900 m'], ['Hastane', '6,5 km'], ['Otoyol bağlantısı', '3 km']] },
  { id: 'h6', title: 'Yeni projede sıfır 3+1, site içinde', city: 'İstanbul', district: 'Beylikdüzü', hood: 'Yakuplu Mah.', type: 'Daire', rooms: '3+1', gross: 150, net: 125, year: 2026, cond: 'new', price: 5450000, floor: '7. kat', floors: 15, heating: 'Yerden ısıtma', bath: 2, balcony: true, parking: 'Kapalı otopark', site: true, elevator: true, furnished: false, energy: 'A', seller: 's3', days: 1, scene: 'apartment', pal: { facade: '#f3f5f7', trim: '#2f6f8f', sofa: '#6c7a8a', accent: '#2f8fa8', cab: '#ffffff' },
    desc: 'İskânı alınmış yeni projede, A enerji sınıfı sıfır 3+1. Sosyal tesis, çocuk parkı ve kapalı otopark.',
    near: [['Metrobüs', '1,1 km'], ['AVM', '1,3 km'], ['Okul', '500 m'], ['Sahil', '2 km']] },
  { id: 'h7', title: 'Çukurambar\'da 4+1 aile dairesi', city: 'Ankara', district: 'Çankaya', hood: 'Çukurambar', type: 'Daire', rooms: '4+1', gross: 190, net: 165, year: 2015, cond: 'used', price: 7900000, floor: '6. kat', floors: 12, heating: 'Kombi (doğalgaz)', bath: 2, balcony: true, parking: 'Kapalı otopark', site: true, elevator: true, furnished: false, energy: 'C', seller: 's6', days: 3, scene: 'apartment', pal: { facade: '#dde6ee', trim: '#5c7a98', sofa: '#6b6f80', accent: '#b5835a', cab: '#efe9df' },
    desc: 'Site içinde, şehir manzaralı geniş 4+1. Okullara ve alışveriş merkezlerine yakın.',
    near: [['Metro', '1,2 km'], ['AVM', '800 m'], ['Okul', '450 m'], ['Hastane', '2 km']] },
  { id: 'h8', title: 'Bostanlı\'da deniz manzaralı 3+1', city: 'İzmir', district: 'Karşıyaka', hood: 'Bostanlı', type: 'Daire', rooms: '3+1', gross: 130, net: 110, year: 2019, cond: 'used', price: 6200000, floor: '3. kat', floors: 6, heating: 'Kombi (doğalgaz)', bath: 2, balcony: true, parking: 'Açık otopark', site: false, elevator: true, furnished: false, energy: 'B', seller: 's7', days: 5, scene: 'apartment', pal: { facade: '#f5f1ea', trim: '#4c8aa0', sofa: '#4f7f86', accent: '#e0a458', cab: '#f6f3ee' },
    desc: 'Sahile ve vapur iskelesine yakın, deniz manzaralı 3+1. Geniş balkon, ebeveyn banyosu.',
    near: [['Vapur iskelesi', '700 m'], ['Tramvay', '300 m'], ['Okul', '500 m'], ['Hastane', '1,9 km']] },
  { id: 'h9', title: 'Urla\'da bahçeli müstakil ev', city: 'İzmir', district: 'Urla', hood: 'Kuşçular', type: 'Müstakil ev', rooms: '4+1', gross: 220, net: 180, year: 2021, cond: 'used', price: 14800000, floor: 'Müstakil (2 kat)', floors: 2, heating: 'Yerden ısıtma', bath: 3, balcony: true, parking: 'Bahçe içi otopark', site: false, elevator: false, furnished: false, energy: 'A', seller: 's8', featured: true, days: 7, scene: 'house', pal: { facade: '#f4eee4', trim: '#b5533c', sofa: '#7a8b6c', accent: '#c47b4f', cab: '#e4dccd' },
    desc: 'Zeytin ağaçlı bahçe içinde, 2 katlı 4+1 müstakil ev. Şömine, geniş teras ve yerden ısıtma.',
    near: [['Merkez', '4 km'], ['Market', '1,2 km'], ['Okul', '2,5 km'], ['Hastane', '8 km']] },
  { id: 'h10', title: 'Nilüfer\'de sıfır 3+1, sosyal tesisli', city: 'Bursa', district: 'Nilüfer', hood: 'Görükle', type: 'Daire', rooms: '3+1', gross: 145, net: 120, year: 2026, cond: 'new', price: 4950000, floor: '5. kat', floors: 10, heating: 'Kombi (doğalgaz)', bath: 2, balcony: true, parking: 'Kapalı otopark', site: true, elevator: true, furnished: false, energy: 'A', seller: 's9', days: 2, scene: 'apartment', pal: { facade: '#ebe7f1', trim: '#6f63a3', sofa: '#5f6b8a', accent: '#d08b6a', cab: '#ffffff' },
    desc: 'Yeni teslim projede sıfır 3+1. Kapalı havuz, spor salonu ve çocuk oyun alanı.',
    near: [['Metro', '1,6 km'], ['Üniversite', '1 km'], ['Okul', '600 m'], ['AVM', '2,1 km']] },
  { id: 'h11', title: 'Lara\'da havuzlu sitede 2+1', city: 'Antalya', district: 'Muratpaşa', hood: 'Lara', type: 'Daire', rooms: '2+1', gross: 100, net: 85, year: 2017, cond: 'used', price: 4600000, floor: '2. kat', floors: 5, heating: 'Klima', bath: 1, balcony: true, parking: 'Açık otopark', site: true, elevator: true, furnished: true, energy: 'C', seller: 's10', days: 10, scene: 'apartment', pal: { facade: '#f7eedf', trim: '#c08848', sofa: '#4f8a8b', accent: '#e0b05a', cab: '#f4efe6' },
    desc: 'Denize 900 metre, havuzlu sitede eşyalı 2+1. Klima ve güneş enerjili sıcak su.',
    near: [['Plaj', '900 m'], ['Market', '300 m'], ['Okul', '700 m'], ['Havalimanı', '12 km']] },
  { id: 'h12', title: 'Göztepe\'de yeni binada 1+1', city: 'İstanbul', district: 'Kadıköy', hood: 'Göztepe Mah.', type: 'Daire', rooms: '1+1', gross: 65, net: 52, year: 2022, cond: 'used', price: 4250000, floor: '2. kat', floors: 6, heating: 'Kombi (doğalgaz)', bath: 1, balcony: true, parking: 'Yok', site: false, elevator: true, furnished: false, energy: 'B', seller: 's1', days: 3, scene: 'apartment', pal: { facade: '#e8e0d6', trim: '#8a6c57', sofa: '#7f6a8f', accent: '#5f9a8b', cab: '#f2ede6' },
    desc: 'Bağdat Caddesi\'ne yakın, 2022 yapımı binada 1+1. İlk ev ve yatırım için uygun.',
    near: [['Metro', '500 m'], ['Bağdat Cd.', '600 m'], ['Okul', '450 m'], ['Hastane', '1,5 km']] },
];
// Mock customer shown unmasked inside the bank's secure channel. Fictional data: the T.C. number fails the
// official checksum and the phone prefix / e-mail domain are not in use, so none of it can belong to a real person.
const KN_PROFILE = { name: 'Selçuk İmre', tckn: '26419837542', birth: '14.03.1992', birthPlace: 'İstanbul', marital: 'Evli', nationality: 'T.C.', phone: '0 (500) 000 12 24', email: 'selcuk.imre@example.com', address: 'Zincirlidere Cad. No:1 Daire:1 Kat:1, Şişli / İstanbul', account: 'Vadesiz TL Hesabım · TR•••• 4521' };
// Tahsis (credit allocation) data registered at the bank — editable part (test data: özel sektör, 150.000 TL)
const KN_TAHSIS0 = { job: 'Özel sektör çalışanı', title: 'Yazılım mühendisi', work: 'Ücretli · tam zamanlı', employer: 'Mavi Bulut Yazılım A.Ş.', sector: 'Bilişim ve teknoloji', tenure: '5 yıldan fazla', income: 150000, spouse: 150000, other: 0 };
const KN_BRANCH = { name: 'Yapı Kredi Kadıköy Şubesi', district: 'Kadıköy', city: 'İstanbul' };
const KN_VALUER = { firm: 'Anadolu Gayrimenkul Değerleme A.Ş.', kind: 'SPK lisanslı değerleme kuruluşu', expert: 'Murat Aksoy', title: 'Gayrimenkul değerleme uzmanı' };   // DEMO

state.kn = {
  f: { cond: 'all', city: null, district: null, pmin: null, pmax: null, rooms: null, types: [], amin: null, amax: null, age: null },
  more: false,
  sort: 'rec',
  favs: [],
  favOnly: false,
  cmp: [],
  home: 'h1',          // listing being viewed and, before the application, financed
  flowHome: 'h1',
  down: 3000000,
  term: 120,
  income: 300000,      // monthly net household income in the simulation (from tahsis; editable there)
  incomeEdited: false, // simulation income typed by hand → tahsis changes no longer overwrite it
  debts: 10000,        // existing monthly loan / card instalments (editable, simulation)
  scen: [],            // saved scenarios [{ label, down, term }]
  agree: { pre: false, contract: false, kvkk: false },
  ob: { done: false },                     // first-entry onboarding (tanıtım → tahsis → TAKBİS) completed
  tahsis: { ...KN_TAHSIS0 }, tahsisAt: null, // confirmed tahsis data and time
  thEdit: false, thDraft: null, thChanged: [], thPrev: null, thPickKey: null,
  tk: { s1: null, s2: null, s3: null, cur: 's1', at: null, shareDraft: null },   // TAKBİS answers (S3 = share %)
  app: null,           // { home, ref, at, status: 'review' | 'pre' (first evaluation passed) | 'approved' (final), step, down, term, loan, pay, total, first, events }
  eks: null,           // ekspertiz, started by the bank { stage 1 appointment set, 4 report uploaded & approved; slot, seen, away, reportNo }
  ipt: null,           // ipotek { stage 0 sign, 1 tapu appointment, 2 tapu & ipotek, 3 disbursement, 4 done; slot, dask, harc, done }
  clock: null,         // demo clock (ms): steps jump to their appointment dates; null = real time
};
let knSvgSeq = 0;

/* -------------------- helpers -------------------- */
function knHome(id = state.kn.home) { return KN_HOMES.find(h => h.id === id) || KN_HOMES[0]; }
function knSeller(h) { return KN_SELLERS[h.seller]; }
function knAge(h) { return Math.max(0, new Date().getFullYear() - h.year); }
function knAgeLabel(h) { const a = knAge(h); return a === 0 ? 'Sıfır bina' : a + ' yıllık bina'; }
function knRoomsN(h) { return parseInt(h.rooms, 10); }
function knM2(h) { return Math.round(h.price / h.gross); }
function knVsAvg(h) { const avg = KN_AVG_M2[h.district]; return avg ? Math.round((knM2(h) / avg - 1) * 100) : 0; }
function knVsHTML(h, cls = '') {
  const d = knVsAvg(h);
  if (Math.abs(d) <= 2) return `<span class="kn-vs eq ${cls}">Bölge ortalamasında</span>`;
  return d < 0 ? `<span class="kn-vs good ${cls}">Bölge ortalamasının %${-d} altında</span>` : `<span class="kn-vs high ${cls}">Bölge ortalamasının %${d} üstünde</span>`;
}
function knMn(n) { return (n / 1e6).toLocaleString('tr-TR', { maximumFractionDigits: 2 }) + ' Mn TL'; }
function knI() { const r = KN_RATE.monthly / 100; return knTkEff().bsmv ? r * (1 + KN_BSMV / 100) : r; }   // monthly cost incl. BSMV when TAKBİS applies it
function knLtvMax() { return knTkEff().ltvMax; }
function knEstDown() { return Math.max(KN_EST.downPct, 100 - knLtvMax()); }
function knPay(P, n) { const i = knI(); return P <= 0 ? 0 : P * i / (1 - Math.pow(1 + i, -n)); }
function knEstimate(h) { return knPay(h.price * (1 - knEstDown() / 100), KN_EST.term); }
function knLoan() { return Math.max(0, knHome().price - state.kn.down); }
function knDownMin(h = knHome()) { return Math.ceil(h.price * (100 - knLtvMax()) / 100 / 10000) * 10000; }
function knDownMax(h = knHome()) { return Math.floor((h.price - KN_MIN_LOAN) / 10000) * 10000; }
function knQuote(loan = knLoan(), n = state.kn.term) {
  const pay = knPay(loan, n), total = pay * n, cost = total - loan;
  const tax = knTkEff().bsmv ? cost - cost / (1 + KN_BSMV / 100) : 0;   // BSMV is charged on the interest part
  return { loan, n, pay, total, interest: cost - tax, tax };
}
function knPlanRows(P, n, first) {   // first: Date of the first instalment (default: a month from today)
  const i = knI(), pay = knPay(P, n), rows = [], now = new Date(), day = Math.min((first || now).getDate(), 28);
  const p2 = x => String(x).padStart(2, '0');
  let bal = P;
  for (let k = 1; k <= n; k++) {
    const cost = bal * i, princ = pay - cost;
    bal = Math.max(0, bal - princ);
    const d = first ? new Date(first.getFullYear(), first.getMonth() + k - 1, day) : new Date(now.getFullYear(), now.getMonth() + k, day);
    rows.push({ k, date: `${p2(d.getDate())}.${p2(d.getMonth() + 1)}.${d.getFullYear()}`, pay, princ, cost, bal });
  }
  return rows;
}
/* Payment capacity: existing debt payments + the new instalment against monthly income (EXAMPLE rule) */
function knCapacity(pay) {
  const v = state.kn, inc = Math.max(0, v.income), total = pay + v.debts;
  const ratio = inc ? Math.round(total / inc * 100) : 999;
  const room = Math.max(0, Math.round(inc * KN_CAP / 100 - v.debts));
  const level = ratio <= KN_CAP - 5 ? 'ok' : ratio <= KN_CAP ? 'edge' : 'over';
  return { ratio, room, level, total };
}
function knFees(h = knHome(), loan = knLoan()) {
  const rows = [
    ['Kredi tahsis ücreti', `binde ${vmPctStr(KN_FEES.alloc * 10)}`, Math.round(loan * KN_FEES.alloc / 100)],
    ['Ekspertiz ücreti', 'değerleme raporu', KN_FEES.expertise],
    ['Tapu harcı (alıcı payı)', `satış bedeli üzerinden %${vmPctStr(KN_FEES.deedPct)}`, Math.round(h.price * KN_FEES.deedPct / 100)],
    ['DASK (zorunlu deprem sigortası)', 'yıllık', KN_FEES.dask],
  ];
  return { rows, total: rows.reduce((a, r) => a + r[2], 0) };
}
function knValue(h) { return h.value || Math.round(h.price * 1.02 / 50000) * 50000; }   // DEMO ekspertiz value

/* -------------------- illustrations (exteriors, interiors, floor plan, map) -------------------- */
function knShade(hex, f) { return vmShade(hex, f); }
function knWin(x, y, w, h, u, lit) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5" fill="${lit ? `url(#kl${u})` : `url(#kg${u})`}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M${x + w / 2} ${y}v${h}" stroke="#fff" stroke-width="1.2"/>`;
}
function knTree(x, y, s = 1, c1 = '#6fae72', c2 = '#4f8f5c') {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-2.5" y="-6" width="5" height="26" rx="2" fill="#7a5a40"/><circle cx="0" cy="-22" r="18" fill="${c2}"/><circle cx="-9" cy="-14" r="13" fill="${c1}"/><circle cx="10" cy="-16" r="12" fill="${c1}"/><circle cx="2" cy="-30" r="11" fill="${c1}"/></g>`;
}
function knPalm(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})" fill="none"><path d="M0 0 C 2 -20, 4 -40, 2 -62" stroke="#8a6a4a" stroke-width="5" stroke-linecap="round"/>
    <g stroke="#3f8a5a" stroke-width="5" stroke-linecap="round"><path d="M2 -62 C -10 -70, -24 -66, -32 -56"/><path d="M2 -62 C 14 -72, 28 -68, 36 -58"/><path d="M2 -62 C -4 -76, -14 -84, -24 -86"/><path d="M2 -62 C 10 -78, 20 -84, 30 -84"/><path d="M2 -62 C 0 -74, 2 -84, 6 -92"/></g></g>`;
}
function knDefs(u, h, sky) {
  const skies = { day: ['#8fc3ea', '#e9f4fb'], dusk: ['#36507f', '#f3b67f'], warm: ['#7fa3d6', '#f6d2ae'] };
  const [s1, s2] = skies[sky] || skies.day;
  return `<defs>
    <linearGradient id="ks${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s1}"/><stop offset="1" stop-color="${s2}"/></linearGradient>
    <linearGradient id="kg${u}" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stop-color="#b8d4ea"/><stop offset=".55" stop-color="#7ea6c9"/><stop offset="1" stop-color="#5b84ab"/></linearGradient>
    <linearGradient id="kl${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe7b5"/><stop offset="1" stop-color="#f3b45f"/></linearGradient>
    <linearGradient id="kf${u}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${h.pal.facade}"/><stop offset=".78" stop-color="${h.pal.facade}"/><stop offset="1" stop-color="${knShade(h.pal.facade, -0.14)}"/></linearGradient>
    <linearGradient id="kw${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fc7e6"/><stop offset="1" stop-color="#3f93c4"/></linearGradient>
  </defs>`;
}
function knExteriorSVG(h, u) {
  const p = h.pal;
  if (h.scene === 'tower') {
    const lit = (r, c) => ((r * 7 + c * 3) % 5 === 0);
    let grid = '';
    for (let r = 0; r < 16; r++) for (let c = 0; c < 8; c++) if (lit(r, c)) grid += `<rect x="${152 + c * 12}" y="${24 + r * 11}" width="9" height="7" fill="#ffd98a" opacity=".85"/>`;
    return `${knDefs(u, h, 'dusk')}<rect width="400" height="250" fill="url(#ks${u})"/>
      <g fill="#4a5f86" opacity=".55"><rect x="0" y="120" width="60" height="100"/><rect x="40" y="96" width="44" height="124"/><rect x="318" y="104" width="50" height="116"/><rect x="356" y="130" width="44" height="90"/></g>
      <rect x="252" y="66" width="52" height="150" fill="${knShade(p.trim, -0.15)}"/>
      <g stroke="rgba(255,255,255,.12)">${Array.from({ length: 13 }, (_, i) => `<path d="M252 ${76 + i * 11}h52"/>`).join('')}</g>
      <rect x="146" y="14" width="104" height="202" fill="url(#kg${u})"/>
      <rect x="146" y="14" width="104" height="202" fill="${p.trim}" opacity=".35"/>
      <g stroke="rgba(255,255,255,.2)">${Array.from({ length: 9 }, (_, i) => `<path d="M${149 + i * 12} 14v202"/>`).join('')}${Array.from({ length: 18 }, (_, i) => `<path d="M146 ${22 + i * 11}h104"/>`).join('')}</g>
      ${grid}
      <path d="M146 14 L250 14 L250 60 Z" fill="#fff" opacity=".12"/>
      <rect x="140" y="8" width="116" height="8" fill="${knShade(p.trim, -0.25)}"/>
      <rect x="96" y="182" width="214" height="36" fill="#dfe4ea"/><rect x="96" y="182" width="214" height="5" fill="#c7cfd8"/>
      <rect x="176" y="192" width="54" height="26" fill="url(#kl${u})" opacity=".9"/>
      <rect y="216" width="400" height="34" fill="#cfd6de"/><rect y="236" width="400" height="14" fill="#b9c2cc"/>
      ${knPalm(98, 220, 0.9)}${knPalm(318, 222, 1)}${knTree(60, 226, 0.9)}`;
  }
  if (h.scene === 'house') {
    return `${knDefs(u, h, 'day')}<rect width="400" height="250" fill="url(#ks${u})"/>
      <g fill="#fff" opacity=".85"><ellipse cx="74" cy="38" rx="26" ry="8"/><ellipse cx="94" cy="34" rx="16" ry="7"/><ellipse cx="318" cy="30" rx="22" ry="7"/></g>
      <path d="M0 150 C 80 118, 150 132, 220 140 S 340 120, 400 136 V 250 H 0 Z" fill="#b9d6b0"/>
      <rect y="182" width="400" height="68" fill="#9ccc86"/>
      <rect x="128" y="112" width="160" height="94" fill="url(#kf${u})"/>
      <path d="M114 116 L208 60 L302 116 Z" fill="${p.trim}"/><path d="M114 116 L208 60 L302 116" fill="none" stroke="${knShade(p.trim, -0.25)}" stroke-width="3"/>
      <rect x="248" y="70" width="16" height="30" fill="${knShade(p.trim, -0.2)}"/>
      ${knWin(146, 126, 34, 26, u)}${knWin(236, 126, 34, 26, u)}${knWin(146, 166, 34, 28, u, true)}${knWin(236, 166, 34, 28, u)}
      <rect x="196" y="160" width="26" height="46" rx="2" fill="#7a4e2d"/><circle cx="216" cy="184" r="1.8" fill="#e8c98a"/>
      <rect x="190" y="204" width="38" height="5" fill="#d9d2c4"/>
      <path d="M200 209 L188 250 H230 L218 209 Z" fill="#e7ddcb"/>
      <g fill="#fff">${Array.from({ length: 20 }, (_, i) => `<rect x="${4 + i * 20}" y="${i === 9 || i === 10 ? 999 : 212}" width="5" height="22" rx="1.5"/>`).join('')}<rect y="218" width="180" height="3"/><rect x="236" y="218" width="164" height="3"/></g>
      ${knTree(66, 204, 1.25)}${knTree(338, 206, 1.05, '#7dba7c', '#5a9a62')}
      <g fill="#6aa36a"><circle cx="130" cy="206" r="9"/><circle cx="292" cy="206" r="9"/></g>`;
  }
  if (h.scene === 'villa') {
    return `${knDefs(u, h, 'warm')}<rect width="400" height="250" fill="url(#ks${u})"/>
      <rect y="176" width="400" height="74" fill="#8fbf7e"/>
      <rect x="56" y="134" width="288" height="74" fill="${p.facade}"/><rect x="48" y="128" width="304" height="8" fill="#d8d4cc"/>
      <rect x="140" y="88" width="170" height="46" fill="${p.facade}"/><rect x="132" y="82" width="186" height="8" fill="#d8d4cc"/>
      <rect x="140" y="88" width="44" height="46" fill="${p.trim}"/>
      <g stroke="${knShade(p.trim, -0.2)}" stroke-width="1">${Array.from({ length: 5 }, (_, i) => `<path d="M${144 + i * 9} 88v46"/>`).join('')}</g>
      <rect x="194" y="96" width="104" height="32" fill="url(#kl${u})"/><path d="M228 96v32M262 96v32" stroke="#fff" stroke-width="2"/>
      <rect x="72" y="146" width="120" height="56" fill="url(#kl${u})"/><path d="M112 146v56M152 146v56" stroke="#fff" stroke-width="2"/>
      <rect x="206" y="146" width="60" height="56" fill="url(#kg${u})"/><rect x="280" y="146" width="52" height="56" fill="url(#kl${u})" opacity=".9"/>
      <rect x="40" y="210" width="320" height="30" rx="3" fill="url(#kw${u})"/>
      <g stroke="#fff" stroke-width="1.5" opacity=".55"><path d="M70 220h40M150 228h60M250 219h50"/></g>
      ${knPalm(24, 214, 1.05)}${knPalm(378, 212, 0.95)}`;
  }
  // apartment (mid-rise)
  const cols = [112, 160, 212, 260], lit = (f, c) => (f + c) % 4 === 1;
  let floorsSvg = '';
  for (let f = 0; f < 5; f++) {
    const y = 52 + f * 26;
    floorsSvg += cols.map((x, c) => knWin(x, y + 3, 28, 16, u, lit(f, c))).join('');
    if (f % 2 === 0) floorsSvg += [1, 2].map(c => `<rect x="${cols[c] - 6}" y="${y + 18}" width="40" height="3" fill="${knShade(p.facade, -0.18)}"/><rect x="${cols[c] - 6}" y="${y + 11}" width="40" height="8" fill="rgba(255,255,255,.55)" stroke="${p.trim}" stroke-width="1"/>`).join('');
  }
  return `${knDefs(u, h, 'day')}<rect width="400" height="250" fill="url(#ks${u})"/>
    <g fill="#fff" opacity=".85"><ellipse cx="64" cy="34" rx="24" ry="7.5"/><ellipse cx="84" cy="30" rx="15" ry="6.5"/><ellipse cx="336" cy="26" rx="22" ry="6.5"/></g>
    <rect x="0" y="94" width="80" height="124" fill="#c3d0dc"/><rect x="20" y="74" width="40" height="22" fill="#c3d0dc"/>
    <rect x="320" y="80" width="80" height="138" fill="#cbd6e1"/>
    <g fill="#e6edf3" opacity=".9">${[0, 1, 2, 3].map(r => [0, 1, 2].map(c => `<rect x="${10 + c * 22}" y="${104 + r * 26}" width="12" height="12"/>`).join('')).join('')}${[0, 1, 2, 3, 4].map(r => [0, 1, 2].map(c => `<rect x="${330 + c * 22}" y="${92 + r * 24}" width="12" height="12"/>`).join('')).join('')}</g>
    <rect x="98" y="42" width="204" height="176" fill="url(#kf${u})"/>
    <rect x="92" y="36" width="216" height="9" rx="2" fill="${p.trim}"/>
    ${floorsSvg}
    <rect x="98" y="182" width="204" height="36" fill="${knShade(p.facade, -0.06)}"/><rect x="98" y="180" width="204" height="4" fill="${p.trim}"/>
    <rect x="176" y="190" width="48" height="28" fill="url(#kg${u})"/><path d="M200 190v28" stroke="#fff" stroke-width="1.5"/><rect x="170" y="185" width="60" height="5" fill="${knShade(p.trim, -0.15)}"/>
    <rect x="110" y="192" width="52" height="20" fill="url(#kl${u})" opacity=".85"/><rect x="238" y="192" width="52" height="20" fill="url(#kg${u})"/>
    <rect y="218" width="400" height="32" fill="#dde2e7"/><rect y="236" width="400" height="14" fill="#c6ccd4"/>
    <g stroke="#fff" stroke-width="2" stroke-dasharray="14 12" opacity=".8"><path d="M0 243h400"/></g>
    ${knTree(66, 222, 1.05)}${knTree(340, 224, 0.95, '#79b47a', '#56925f')}`;
}
function knLivingSVG(h, u) {
  const p = h.pal;
  return `${knDefs(u, h, 'day')}
    <rect width="400" height="250" fill="#efe9e1"/>
    <linearGradient id="kfl${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d3a978"/><stop offset="1" stop-color="#b5845a"/></linearGradient>
    <rect y="176" width="400" height="74" fill="url(#kfl${u})"/>
    <g stroke="rgba(0,0,0,.08)">${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 48} 176 L${i * 48 - 30} 250"/>`).join('')}</g>
    <rect x="30" y="22" width="122" height="132" fill="#fff"/><rect x="36" y="28" width="110" height="120" fill="url(#ks${u})"/>
    <g fill="#9db8d0"><rect x="36" y="106" width="22" height="42"/><rect x="60" y="94" width="18" height="54"/><rect x="80" y="112" width="26" height="36"/><rect x="108" y="100" width="18" height="48"/><rect x="128" y="116" width="18" height="32"/></g>
    <path d="M91 28v120M36 88h110" stroke="#fff" stroke-width="4"/>
    <rect x="24" y="16" width="134" height="6" rx="3" fill="#cbbfae"/>
    <rect x="206" y="34" width="66" height="48" fill="#fff"/><rect x="211" y="39" width="56" height="38" fill="${knShade(p.accent, 0.55)}"/><circle cx="229" cy="58" r="10" fill="${p.accent}"/><path d="M211 77 L240 55 L267 77 Z" fill="${knShade(p.sofa, 0.25)}"/>
    <rect x="282" y="44" width="40" height="40" fill="#fff"/><rect x="287" y="49" width="30" height="30" fill="${knShade(p.sofa, 0.5)}"/>
    <ellipse cx="270" cy="222" rx="118" ry="16" fill="${knShade(p.accent, 0.35)}" opacity=".75"/>
    <rect x="180" y="122" width="190" height="36" rx="10" fill="${knShade(p.sofa, -0.12)}"/>
    <rect x="172" y="146" width="206" height="44" rx="10" fill="${p.sofa}"/>
    <rect x="166" y="132" width="22" height="60" rx="9" fill="${knShade(p.sofa, -0.18)}"/><rect x="362" y="132" width="22" height="60" rx="9" fill="${knShade(p.sofa, -0.18)}"/>
    <rect x="196" y="128" width="40" height="28" rx="7" fill="${knShade(p.accent, 0.15)}"/><rect x="316" y="128" width="40" height="28" rx="7" fill="${knShade(p.sofa, 0.35)}"/>
    <rect x="182" y="190" width="6" height="10" fill="#4a3a2c"/><rect x="360" y="190" width="6" height="10" fill="#4a3a2c"/>
    <rect x="226" y="204" width="96" height="9" rx="4" fill="#7b5a3d"/><rect x="236" y="212" width="5" height="14" fill="#5d432d"/><rect x="306" y="212" width="5" height="14" fill="#5d432d"/>
    <path d="M162 60 v128" stroke="#3d3f44" stroke-width="3"/><path d="M148 52 h28 l-6 -16 h-16 Z" fill="#f2e0b8"/><ellipse cx="162" cy="190" rx="12" ry="3" fill="#3d3f44"/>
    <rect x="368" y="198" width="22" height="24" rx="3" fill="#c9b49a"/><g fill="#5d9a63"><ellipse cx="372" cy="186" rx="7" ry="16" transform="rotate(-20 372 186)"/><ellipse cx="386" cy="184" rx="7" ry="17" transform="rotate(18 386 184)"/><ellipse cx="379" cy="178" rx="6" ry="18"/></g>`;
}
function knKitchenSVG(h, u) {
  const p = h.pal, cab = p.cab, dark = knShade(cab, -0.18);
  return `${knDefs(u, h, 'day')}
    <rect width="400" height="250" fill="#f4f1ec"/>
    <rect x="14" y="20" width="372" height="64" fill="${cab}" stroke="${dark}" stroke-width="1"/>
    <g stroke="${dark}" stroke-width="1">${Array.from({ length: 7 }, (_, i) => `<path d="M${14 + (i + 1) * 53} 20v64"/>`).join('')}</g>
    <g fill="${knShade(dark, -0.2)}">${Array.from({ length: 7 }, (_, i) => `<rect x="${58 + i * 53}" y="70" width="2.5" height="10" rx="1"/>`).join('')}</g>
    <rect x="14" y="84" width="372" height="48" fill="#e9eef1"/>
    <g stroke="#d6dde2" stroke-width="1">${Array.from({ length: 15 }, (_, i) => `<path d="M${14 + (i + 1) * 24.8} 84v48"/>`).join('')}<path d="M14 100h372M14 116h372"/></g>
    <rect x="120" y="88" width="62" height="40" fill="url(#ks${u})" stroke="#fff" stroke-width="3"/>
    <rect x="10" y="130" width="380" height="10" fill="#3b3f46"/>
    <rect x="14" y="140" width="372" height="62" fill="${cab}" stroke="${dark}" stroke-width="1"/>
    <g stroke="${dark}" stroke-width="1">${Array.from({ length: 6 }, (_, i) => `<path d="M${14 + (i + 1) * 62} 140v62"/>`).join('')}</g>
    <rect x="262" y="146" width="56" height="48" rx="3" fill="#2f3237"/><rect x="268" y="154" width="44" height="26" rx="2" fill="#4b5058"/>
    <path d="M144 130 v-16 a8 8 0 0 1 16 0" fill="none" stroke="#9aa3ad" stroke-width="3"/>
    <rect y="202" width="400" height="48" fill="#ddd5ca"/>
    <g stroke="rgba(0,0,0,.06)">${Array.from({ length: 8 }, (_, i) => `<path d="M${i * 52} 202v48"/>`).join('')}<path d="M0 226h400"/></g>
    <rect x="96" y="176" width="208" height="10" rx="2" fill="#efebe5"/><rect x="104" y="186" width="192" height="44" fill="${knShade(cab, -0.1)}"/>
    <g fill="#3d3f44">${[130, 200, 270].map(x => `<rect x="${x - 10}" y="214" width="20" height="5" rx="2"/><rect x="${x - 2}" y="219" width="4" height="24"/>`).join('')}</g>
    <g>${[150, 200, 250].map(x => `<path d="M${x} 0 v48" stroke="#3d3f44" stroke-width="1.5"/><path d="M${x - 12} 60 a12 12 0 0 1 24 0 Z" fill="${p.accent}"/><ellipse cx="${x}" cy="62" rx="7" ry="3" fill="#ffe7a8"/>`).join('')}</g>`;
}
function knBedroomSVG(h, u) {
  const p = h.pal;
  return `${knDefs(u, h, 'day')}
    <rect width="400" height="250" fill="#e8edf2"/>
    <rect y="184" width="400" height="66" fill="#c9a985"/>
    <g stroke="rgba(0,0,0,.07)">${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 50} 184 L${i * 50 - 28} 250"/>`).join('')}</g>
    <rect x="262" y="26" width="110" height="118" fill="#fff"/><rect x="268" y="32" width="98" height="106" fill="url(#ks${u})"/><path d="M317 32v106" stroke="#fff" stroke-width="4"/>
    <path d="M254 20 h20 v146 h-14 Z" fill="${knShade(p.accent, 0.35)}"/><path d="M380 20 h-20 v146 h14 Z" fill="${knShade(p.accent, 0.35)}"/>
    <rect x="248" y="14" width="140" height="6" rx="3" fill="#b9b1a4"/>
    <ellipse cx="150" cy="226" rx="128" ry="14" fill="${knShade(p.sofa, 0.45)}" opacity=".8"/>
    <rect x="58" y="84" width="184" height="66" rx="10" fill="${knShade(p.sofa, -0.05)}"/>
    <rect x="50" y="138" width="200" height="58" rx="8" fill="#fbfbfb"/><rect x="50" y="170" width="200" height="22" rx="6" fill="${p.accent}"/>
    <rect x="70" y="122" width="62" height="26" rx="9" fill="#fff" stroke="#e1e5ea"/><rect x="168" y="122" width="62" height="26" rx="9" fill="#fff" stroke="#e1e5ea"/>
    <rect x="12" y="140" width="34" height="40" rx="3" fill="#b28a63"/><rect x="254" y="140" width="34" height="40" rx="3" fill="#b28a63"/>
    <path d="M29 140 v-14" stroke="#555" stroke-width="2"/><path d="M19 126 h20 l-4 -14 h-12 Z" fill="#f2e0b8"/>
    <path d="M271 140 v-14" stroke="#555" stroke-width="2"/><path d="M261 126 h20 l-4 -14 h-12 Z" fill="#f2e0b8"/>`;
}
/* Floor plan: rooms laid out from the room count, areas shared out of the net m² */
function knPlanSVG(h, u) {
  const n = Math.min(5, knRoomsN(h)), net = h.net;
  const a = k => Math.max(4, Math.round(net * k));
  const W = '#3a4552';
  const room = (x, y, w, hh, name, m2, fill = '#fff') => `<rect x="${x}" y="${y}" width="${w}" height="${hh}" fill="${fill}" stroke="${W}" stroke-width="2"/>
    <text x="${x + w / 2}" y="${y + hh / 2 - 2}" text-anchor="middle" font-size="${w < 70 ? 9.5 : 11}" font-weight="700" fill="#2b3440">${name}</text>
    <text x="${x + w / 2}" y="${y + hh / 2 + 11}" text-anchor="middle" font-size="9.5" fill="#6b7785">${m2} m²</text>`;
  const bedW = 300 / n;
  const beds = Array.from({ length: n }, (_, i) => room(50 + i * bedW, 150, bedW, 76, i === n - 1 && n > 1 ? 'Ebeveyn' : 'Yatak odası', a(i === n - 1 ? 0.13 : 0.1))).join('');
  return `<rect width="400" height="250" fill="#f6f8fa"/>
    <g stroke="#e6ebf0" stroke-width="1">${Array.from({ length: 21 }, (_, i) => `<path d="M${i * 20} 0v250"/>`).join('')}${Array.from({ length: 13 }, (_, i) => `<path d="M0 ${i * 20}h400"/>`).join('')}</g>
    ${room(50, 24, 160, 92, 'Salon', a(0.27))}${room(210, 24, 86, 66, 'Mutfak', a(0.1))}
    ${room(296, 24, 54, 66, 'Balkon', a(0.05), '#eef3f7')}${room(210, 90, 70, 60, 'Banyo', a(0.05))}${room(280, 90, 70, 60, 'Antre', a(0.07), '#fafbfc')}
    ${room(50, 116, 160, 34, 'Koridor', a(0.06), '#fafbfc')}${beds}
    <rect x="50" y="24" width="300" height="202" fill="none" stroke="${W}" stroke-width="5"/>
    <g fill="none" stroke="${W}" stroke-width="1.2"><path d="M120 116 a16 16 0 0 1 16 -16"/><path d="M230 90 a14 14 0 0 0 14 14"/></g>
    <text x="200" y="244" text-anchor="middle" font-size="9.5" fill="#6b7785">Kat planı · ${h.rooms} · net ${h.net} m² (temsilî)</text>`;
}
/* variant: ext | living | kitchen | bedroom | plan */
function knSceneSVG(h, variant = 'ext') {
  const u = ++knSvgSeq;
  const body = variant === 'living' ? knLivingSVG(h, u) : variant === 'kitchen' ? knKitchenSVG(h, u) : variant === 'bedroom' ? knBedroomSVG(h, u) : variant === 'plan' ? knPlanSVG(h, u) : knExteriorSVG(h, u);
  const label = { ext: 'Bina dış görünüm', living: 'Salon', kitchen: 'Mutfak', bedroom: 'Yatak odası', plan: 'Kat planı' }[variant];
  return `<svg class="kn-svg" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${h.title}: ${label} (temsilî görsel)">${body}</svg>`;
}
const KN_SLIDES = ['ext', 'living', 'kitchen', 'bedroom', 'plan'];
function knPicHTML(h, variant = 'ext', idx = 0) {
  if (h.photos && h.photos[idx]) return `<img class="vm-photo" src="${h.photos[idx]}" alt="${h.title}">`;
  return knSceneSVG(h, variant);
}
/* Schematic location map (representative, not to scale) */
function knMapSVG(h) {
  const u = ++knSvgSeq, coast = KN_COAST.includes(h.district);
  return `<svg class="kn-svg" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${h.district} konum haritası (temsilî)">
    <rect width="400" height="200" fill="#eef1ec"/>
    ${coast ? '<path d="M0 0 H120 C 100 40, 80 70, 92 110 C 104 150, 70 180, 40 200 H0 Z" fill="#b9dcef"/><path d="M120 0 C 100 40, 80 70, 92 110 C 104 150, 70 180, 40 200" fill="none" stroke="#a5cfe6" stroke-width="3"/>' : ''}
    <g fill="#d4ebc9"><rect x="${coast ? 150 : 40}" y="20" width="70" height="44" rx="6"/><rect x="300" y="130" width="76" height="50" rx="6"/></g>
    <g stroke="#d9dfe5" stroke-width="12" stroke-linecap="round" fill="none"><path d="M${coast ? 110 : 0} 100 H400"/><path d="M250 0 V200"/><path d="M${coast ? 130 : 20} 160 L400 40"/></g>
    <g stroke="#fff" stroke-width="9" stroke-linecap="round" fill="none"><path d="M${coast ? 110 : 0} 100 H400"/><path d="M250 0 V200"/><path d="M${coast ? 130 : 20} 160 L400 40"/></g>
    <g stroke="#f6e3a8" stroke-width="5" stroke-linecap="round" fill="none"><path d="M${coast ? 110 : 0} 100 H400"/></g>
    <g stroke="#e3e8ec" stroke-width="5" fill="none"><path d="M${coast ? 160 : 60} 40 V180"/><path d="M330 10 V100"/><path d="M${coast ? 150 : 50} 140 H240"/><path d="M270 60 H390"/></g>
    <g font-size="10" fill="#8a96a3" font-weight="700" letter-spacing="1"><text x="${coast ? 300 : 120}" y="${coast ? 180 : 186}">${h.district.toLocaleUpperCase('tr')}</text></g>
    ${coast ? '<text x="26" y="96" font-size="9" fill="#6f9fbd" font-style="italic">Deniz</text>' : ''}
    <g transform="translate(272,124)"><circle r="7" fill="#fff" stroke="#e2001a" stroke-width="2"/><text x="11" y="4" font-size="9" fill="#5d6873">${h.near[0][0]}</text></g>
    <g transform="translate(220,92)"><ellipse cx="0" cy="22" rx="10" ry="3" fill="rgba(0,0,0,.18)"/><path d="M0 22 C -12 6, -14 -2, -14 -8 a14 14 0 0 1 28 0 c0 6 -2 14 -14 30 Z" fill="#0a3d7a"/><circle cx="0" cy="-8" r="5.5" fill="#fff"/></g>
    <g transform="translate(220,46)"><rect x="-38" y="-14" width="76" height="22" rx="11" fill="#0a3d7a"/><text x="0" y="1" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">${knMn(h.price)}</text></g>
  </svg>`;
}
/* -------------------- filtering & sorting -------------------- */
const KN_SORTS = [['rec', 'Önerilen'], ['price-asc', 'Fiyat (artan)'], ['price-desc', 'Fiyat (azalan)'], ['area-desc', 'Metrekare (büyükten)'], ['m2-asc', 'm² fiyatı (en uygun)'], ['loc', 'Konum (A–Z)'], ['new', 'En yeni']];
function knMatches(h, f = state.kn.f) {
  if (f.cond !== 'all' && h.cond !== f.cond) return false;
  if (f.city && h.city !== f.city) return false;
  if (f.district && h.district !== f.district) return false;
  if (f.pmin && h.price < f.pmin) return false;
  if (f.pmax && h.price > f.pmax) return false;
  if (f.rooms && (f.rooms === '4+1' ? knRoomsN(h) < 4 : h.rooms !== f.rooms)) return false;
  if (f.types.length && !f.types.includes(h.type)) return false;
  if (f.amin && h.gross < f.amin) return false;
  if (f.amax && h.gross > f.amax) return false;
  if (f.age) { const a = KN_AGES.find(x => x[0] === f.age), ag = knAge(h); if (a && (ag < a[2] || ag > a[3])) return false; }
  return true;
}
function knResults() {
  const v = state.kn, cmpTR = (a, b) => a.localeCompare(b, 'tr');
  let r = KN_HOMES.filter(h => knMatches(h));
  if (v.favOnly) r = r.filter(h => v.favs.includes(h.id));
  const by = {
    rec: (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || KN_HOMES.indexOf(a) - KN_HOMES.indexOf(b),
    'price-asc': (a, b) => a.price - b.price, 'price-desc': (a, b) => b.price - a.price,
    'area-desc': (a, b) => b.gross - a.gross, 'm2-asc': (a, b) => knM2(a) - knM2(b),
    loc: (a, b) => cmpTR(a.city, b.city) || cmpTR(a.district, b.district) || a.price - b.price,
    new: (a, b) => a.days - b.days,
  }[v.sort];
  return r.slice().sort(by);
}
function knActiveFilters() {
  const f = state.kn.f, out = [];
  if (f.cond !== 'all') out.push(['cond', f.cond === 'new' ? 'Sıfır' : 'İkinci el']);
  if (f.city) out.push(['city', f.city]);
  if (f.district) out.push(['district', f.district]);
  if (f.pmin) out.push(['pmin', 'En az ' + vmTL(f.pmin)]);
  if (f.pmax) out.push(['pmax', 'En çok ' + vmTL(f.pmax)]);
  if (f.rooms) out.push(['rooms', f.rooms === '4+1' ? '4+1 ve üzeri' : f.rooms]);
  f.types.forEach(t => out.push(['type:' + t, t]));
  if (f.amin) out.push(['amin', 'En az ' + f.amin + ' m²']);
  if (f.amax) out.push(['amax', 'En çok ' + f.amax + ' m²']);
  if (f.age) out.push(['age', 'Bina yaşı ' + KN_AGES.find(a => a[0] === f.age)[1]]);
  return out;
}
function knUnset(key) {
  const f = state.kn.f;
  if (key.startsWith('type:')) f.types = f.types.filter(t => t !== key.slice(5));
  else if (key === 'cond') f.cond = 'all';
  else if (key === 'city') { f.city = null; f.district = null; }
  else f[key] = null;
}
function knClearFilters() {
  state.kn.f = { cond: 'all', city: null, district: null, pmin: null, pmax: null, rooms: null, types: [], amin: null, amax: null, age: null };
}
function knSetF(k, val) {
  const f = state.kn.f;
  if (k === 'cond') f.cond = val;
  else f[k] = val === '' ? null : val;
}
function knToggleType(t) { const f = state.kn.f; f.types = f.types.includes(t) ? f.types.filter(x => x !== t) : f.types.concat(t); }
const KN_POPULAR = ['Kadıköy', 'Beşiktaş', 'Ataşehir', 'Çankaya', 'Karşıyaka', 'Nilüfer', 'Muratpaşa'];
function knPopularLocs() {
  return KN_POPULAR.map(d => { const hs = KN_HOMES.filter(h => h.district === d); return { district: d, city: hs[0].city, count: hs.length }; });
}
function knDaysLabel(d) { return d === 0 ? 'Bugün' : d === 1 ? 'Dün' : d + ' gün önce'; }
function knNo(h) { return String(40218537 + KN_HOMES.indexOf(h) * 7319); }
/* Faint line-art skyline behind the hero text */
function knSkylineSVG() {
  return `<svg class="kn-skyline" viewBox="0 0 220 110" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">
    <path d="M2 108V70h26v38M28 108V44h30v64M58 108V58l18-14 18 14v50M94 108V30h24v78M118 108V64h34v44M152 108V48l16-10 16 10v60M184 108V76h34v32"/>
    <path d="M36 54h6M46 54h6M36 66h6M46 66h6M36 78h6M46 78h6M100 40h4M108 40h4M100 52h4M108 52h4M100 64h4M108 64h4M126 74h6M138 74h6M160 58h6M170 58h6M160 72h6M170 72h6"/>
    <path d="M70 108V90h12v18M0 108h220"/>
  </svg>`;
}

/* -------------------- Screen 1 — home search (marketplace home) -------------------- */
function KnHome() {
  if (!state.kn.ob.done) { state.screen = 'konut-tanitim'; return KnIntro(); }   // first entry: onboarding first
  const v = state.kn, feat = KN_HOMES.filter(h => h.featured);
  const newest = KN_HOMES.slice().sort((a, b) => a.days - b.days).slice(0, 3);
  return `
  <div class="screen ${vmAnim()} vm kn">
    <div class="nav-head ru-nav-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Marketplace Konut</div>
      <button class="vm-favs-btn" data-action="kn-favs" aria-label="Favori konutlar">${I.heart}<span id="kn-fav-n">${v.favs.length}</span></button>
    </div>
    <div class="screen-scroll">
      <div class="vm-hero kn-hero">
        ${knSkylineSVG()}
        <div class="vm-hero-t">Hayalindeki evi bul,<br>finansmanını planla</div>
        <div class="vm-hero-s">Satılık konutlar, kredi simülasyonu, ekspertiz ve tapu süreci tek uygulamada</div>
        <div class="kn-hero-stats"><span><b>${KN_HOMES.length}</b> satılık ilan</span><span><b>${Object.keys(KN_CITIES).length}</b> şehir</span><span><b>${Math.max(...KN_TERMS)}</b> aya kadar vade</span></div>
      </div>
      <div class="vm-search kn-search" id="kn-search">${knSearchHTML()}</div>
      <div id="kn-og">${v.app ? knOngoingHTML() : ''}</div>
      <div class="vm-sec-h"><span>Popüler lokasyonlar</span></div>
      <div class="kn-locs">${knPopularLocs().map(l => `<button class="kn-loc" data-action="kn-loc-go" data-city="${l.city}" data-district="${l.district}">
        <b>${l.district}</b><span>${l.city} · ${l.count} ilan</span><em>Ort. ${vmTL(KN_AVG_M2[l.district])}/m²</em></button>`).join('')}</div>
      <div class="vm-sec-h"><span>Öne çıkan konutlar</span><button class="sp-link" data-action="kn-show-all">Tümü ${I.chevR}</button></div>
      <div class="kn-feat">${feat.map(knFeatCardHTML).join('')}</div>
      <div class="vm-sec-h"><span>Yeni ilanlar</span><button class="sp-link" data-action="kn-show-new">Tümü ${I.chevR}</button></div>
      <div class="kn-news">${newest.map(knRowHTML).join('')}</div>
      <div class="vm-sec-h"><span>Ev alma yolculuğun</span></div>
      <div class="vm-journey">
        <div><span class="n">1</span><b>Evini bul</b><em>Fiyat, m² ve bölge ortalamasıyla karşılaştır</em></div>
        <div><span class="n">2</span><b>Kredini planla</b><em>Peşinat, vade ve ödeme kapasiteni gör</em></div>
        <div><span class="n">3</span><b>Başvur, takip et</b><em>Eksik belgeyi uygulamadan yükle</em></div>
        <div><span class="n">4</span><b>Ekspertiz ve tapu</b><em>Randevudan ipoteğe her adım burada</em></div>
      </div>
      <div class="vm-note">${I.info}<span>İlanlar, satıcılar ve bölge ortalamaları demo verisidir; taksitler örnek hesaplamadır, gerçek kredi koşullarını yansıtmaz.</span></div>
    </div>
  </div>`;
}
function knSearchHTML() {
  const v = state.kn, f = v.f, n = KN_HOMES.filter(h => knMatches(h)).length;
  const adv = [f.types.length, f.amin, f.amax, f.age].filter(Boolean).length;
  const chip = (k, val, label, on) => `<button class="vm-chip ${on ? 'on' : ''}" data-action="kn-f" data-k="${k}" data-v="${val}">${label}</button>`;
  const num = (x, money) => x ? (money ? x.toLocaleString('tr-TR') : x) : '';
  return `
    <div class="vm-seg">${[['all', 'Tümü'], ['new', 'Sıfır'], ['used', 'İkinci el']].map(([k, l]) => `<button class="${f.cond === k ? 'on' : ''}" data-action="kn-f" data-k="cond" data-v="${k}">${l}</button>`).join('')}</div>
    <div class="vm-fields">
      <button class="vm-field" data-action="kn-pick-city"><span>Şehir</span><b>${f.city || 'Tüm şehirler'}</b>${I.chevDown}</button>
      <button class="vm-field ${f.city ? '' : 'off'}" data-action="kn-pick-district"><span>İlçe</span><b>${f.district || 'Tüm ilçeler'}</b>${I.chevDown}</button>
    </div>
    <div class="vm-fields">
      <label class="vm-in"><span>En az fiyat</span><input id="kn-pmin" inputmode="numeric" autocomplete="off" placeholder="0" value="${num(f.pmin, 1)}"><em>TL</em></label>
      <label class="vm-in"><span>En çok fiyat</span><input id="kn-pmax" inputmode="numeric" autocomplete="off" placeholder="Sınırsız" value="${num(f.pmax, 1)}"><em>TL</em></label>
    </div>
    <div class="vm-adv-t">Oda sayısı</div>
    <div class="vm-chips">${chip('rooms', '', 'Tümü', !f.rooms)}${KN_ROOMS.map(r => chip('rooms', r, r === '4+1' ? '4+1 ve üzeri' : r, f.rooms === r)).join('')}</div>
    <button class="vm-more ${v.more ? 'open' : ''}" data-action="kn-more">${VM_ICO.filter}<span>Detaylı filtreler${adv ? ` · ${adv}` : ''}</span>${I.chevDown}</button>
    ${v.more ? `<div class="vm-adv">
      <div class="vm-adv-t">Konut tipi</div>
      <div class="vm-chips">${KN_TYPES.map(t => `<button class="vm-chip ${f.types.includes(t) ? 'on' : ''}" data-action="kn-type" data-v="${t}">${t}</button>`).join('')}</div>
      <div class="vm-adv-t">Brüt metrekare</div>
      <div class="vm-fields">
        <label class="vm-in"><span>En az</span><input id="kn-amin" inputmode="numeric" autocomplete="off" placeholder="0" value="${num(f.amin)}"><em>m²</em></label>
        <label class="vm-in"><span>En çok</span><input id="kn-amax" inputmode="numeric" autocomplete="off" placeholder="Sınırsız" value="${num(f.amax)}"><em>m²</em></label>
      </div>
      <div class="vm-adv-t">Bina yaşı</div>
      <div class="vm-chips">${chip('age', '', 'Tümü', !f.age)}${KN_AGES.map(([k, l]) => chip('age', k, l, f.age === k)).join('')}</div>
    </div>` : ''}
    <div class="vm-search-foot">
      <button class="vm-clear" data-action="kn-clear">Temizle</button>
      <button class="btn-primary vm-go ${n ? '' : 'disabled'}" id="kn-go" data-action="kn-show">${n ? `${n} ilanı göster` : 'Uygun ilan yok'}</button>
    </div>`;
}
function knRefreshSearch() {
  const el = document.getElementById('kn-search');
  if (el) { el.innerHTML = knSearchHTML(); knSetupSearch(); }
  if (state.screen === 'konut-liste') knRefreshList();
}
function knRefreshCount() {
  const n = KN_HOMES.filter(h => knMatches(h)).length, b = document.getElementById('kn-go');
  if (b) { b.textContent = n ? `${n} ilanı göster` : 'Uygun ilan yok'; b.classList.toggle('disabled', !n); }
  if (state.screen === 'konut-liste') knRefreshList();
}
/* Number fields update only the count: re-rendering the card would swallow the tap that blurred them */
function knSetupSearch() {
  [['kn-pmin', 'pmin', 'pmax', 9], ['kn-pmax', 'pmax', 'pmin', 9], ['kn-amin', 'amin', 'amax', 4], ['kn-amax', 'amax', 'amin', 4]].forEach(([id, k, pair, len]) => {
    const inp = document.getElementById(id);
    if (!inp) return;
    inp.addEventListener('input', () => { const d = inp.value.replace(/\D/g, '').slice(0, len); inp.value = d ? (len > 4 ? (+d).toLocaleString('tr-TR') : d) : ''; });
    inp.addEventListener('change', () => {
      const f = state.kn.f, d = +inp.value.replace(/\D/g, '');
      f[k] = d || null;
      const lo = k.endsWith('min') ? k : pair, hi = k.endsWith('max') ? k : pair;
      if (f[lo] && f[hi] && f[lo] > f[hi]) [f[lo], f[hi]] = [f[hi], f[lo]];
      [lo, hi].forEach(x => { const el = document.getElementById('kn-' + x); if (el) el.value = f[x] ? (len > 4 ? f[x].toLocaleString('tr-TR') : f[x]) : ''; });
      knRefreshCount();
    });
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') inp.blur(); });
  });
}
function knFilterSheet() {
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>Filtrele</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="vm-search in-sheet vm kn" id="kn-search">${knSearchHTML()}</div>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
  knSetupSearch();
}
function knShow() {
  vmCommitInputs();
  if (!KN_HOMES.some(h => knMatches(h))) return;
  state.kn.favOnly = false;
  if (state.screen !== 'konut-liste') return go('konut-liste');
  closeSheet();
  knRefreshList();
  const sc = document.querySelector('#app .screen-scroll'); if (sc) sc.scrollTop = 0;
}
function knPickDone() {
  if (state.screen === 'konut-liste') { knRefreshList(); return knFilterSheet(); }
  closeSheet();
  knRefreshSearch();
}
function knCitySheet() {
  const f = state.kn.f;
  vmChoiceSheet('Şehir seç', [{ v: '', label: 'Tüm şehirler', on: !f.city }].concat(Object.keys(KN_CITIES).map(c => ({ v: c, label: c, sub: KN_HOMES.filter(h => h.city === c).length + ' ilan', on: f.city === c }))), 'kn-set-city');
}
function knDistrictSheet() {
  const f = state.kn.f;
  if (!f.city) return toast('Önce şehir seç');
  vmChoiceSheet(f.city + ' · ilçe', [{ v: '', label: 'Tüm ilçeler', on: !f.district }].concat(KN_CITIES[f.city].map(d => ({ v: d, label: d, sub: KN_HOMES.filter(h => h.district === d).length + ' ilan', on: f.district === d }))), 'kn-set-district');
}
function knFeatCardHTML(h) {
  return `<div class="kn-fcard" data-action="kn-open" data-id="${h.id}">
    <div class="kn-fimg">${knPicHTML(h, 'ext')}${h.cond === 'new' ? '<span class="vm-badge new">Sıfır</span>' : ''}<span class="kn-fprice">${vmTL(h.price)}</span></div>
    <div class="kn-fbody"><b>${h.title}</b><span>${h.district}, ${h.city}</span><em>${h.rooms} · ${h.gross} m² · ${knAgeLabel(h)}</em></div>
  </div>`;
}
function knRowHTML(h) {
  return `<div class="kn-row" data-action="kn-open" data-id="${h.id}">
    <div class="kn-row-img">${knPicHTML(h, 'ext')}</div>
    <div class="kn-row-mid"><b>${vmTL(h.price)}</b><span>${h.title}</span><em>${h.district}, ${h.city} · ${knDaysLabel(h.days)}</em></div>
    ${I.chevR}
  </div>`;
}
function knStageLabel() {
  const v = state.kn, a = v.app;
  if (!a) return '';
  if (a.status === 'review') return 'Başvurun değerlendiriliyor';
  if (a.status === 'pre') return v.eks && v.eks.seen ? 'Ekspertiz raporun yüklendi' : 'Ekspertiz devam ediyor';
  if (!v.ipt || v.ipt.stage < 4) return 'Nihai onay verildi · tapu ve ipotek süreci';
  return 'Süreç tamamlandı';
}
function knOngoingHTML() {
  const h = knHome(state.kn.app.home);
  return `<div class="vm-ongoing" data-action="kn-track">
    <div class="vm-og-img">${knPicHTML(h, 'ext')}</div>
    <div class="vm-og-mid"><span>Devam eden konut kredisi başvurun</span><b>${h.district} · ${h.rooms} ${h.type.toLocaleLowerCase('tr')}</b><em>${knStageLabel()}</em></div>
    ${I.chevR}
  </div>`;
}

/* -------------------- Screen 2 — listing & price comparison -------------------- */
function KnList() {
  const v = state.kn, r = knResults(), act = knActiveFilters();
  return `
  <div class="screen ${vmAnim()} vm kn">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-head-titles"><div class="nav-title">Satılık Konutlar</div><div class="nav-sub vm-count" id="kn-count">${r.length} ilan</div></div>
      <div class="nav-spacer"></div>
    </div>
    <div class="vm-listbar">
      <button class="vm-lb" data-action="kn-filters">${VM_ICO.filter}Filtrele<i id="kn-fcount" ${act.length ? '' : 'hidden'}>${act.length}</i></button>
      <button class="vm-lb" data-action="kn-sort">${VM_ICO.sort}<span id="kn-sort-l">${KN_SORTS.find(s => s[0] === v.sort)[1]}</span></button>
      <button class="vm-lb ${v.favOnly ? 'on' : ''}" data-action="kn-favonly" id="kn-favonly">${I.heart}Favoriler</button>
    </div>
    <div id="kn-active-wrap">${knActiveHTML()}</div>
    <div class="screen-scroll">
      <div id="kn-list">${knListHTML(r)}</div>
      <div class="vm-note">${I.info}<span>Aylık taksitler %${knEstDown()} peşinat, ${KN_EST.term} ay vade ve örnek faiz oranıyla hesaplanmıştır. Bölge ortalamaları brüt m² fiyatına göre demo verisidir.</span></div>
    </div>
    <div class="vm-cmpbar ${v.cmp.length ? 'show' : ''}" id="kn-cmpbar">${knCmpBarHTML()}</div>
  </div>`;
}
function knActiveHTML() {
  const act = knActiveFilters();
  return act.length ? `<div class="vm-active">${act.map(([k, l]) => `<button class="vm-achip" data-action="kn-unset" data-k="${k}">${l}${I.close}</button>`).join('')}</div>` : '';
}
function knListHTML(r) {
  const v = state.kn;
  if (!r.length && v.favOnly) return `<div class="vm-empty">${I.heart}<b>${v.favs.length ? 'Bu filtrelerde favori konutun yok' : 'Henüz favori konutun yok'}</b><span>Beğendiğin ilanları kalp simgesiyle kaydet, burada topla.</span><button class="sp-link" data-action="kn-favonly">Tüm ilanları göster</button></div>`;
  if (!r.length) return `<div class="vm-empty">${I.search}<b>Bu kriterlere uygun ilan yok</b><span>Fiyat aralığını genişletmeyi ya da filtreleri azaltmayı dene.</span><button class="sp-link" data-action="kn-clear-list">Filtreleri temizle</button></div>`;
  return r.map(knCardHTML).join('');
}
function knCardHTML(h) {
  const v = state.kn, s = knSeller(h), fav = v.favs.includes(h.id), cmp = v.cmp.includes(h.id);
  return `<div class="kn-card" data-action="kn-open" data-id="${h.id}">
    <div class="kn-cimg">${knPicHTML(h, 'ext')}
      <span class="kn-badges">${h.cond === 'new' ? '<i class="new">Sıfır</i>' : ''}${h.featured ? '<i>Öne çıkan</i>' : ''}</span>
      <button class="vm-heart ${fav ? 'on' : ''}" data-action="kn-fav" data-id="${h.id}" aria-label="Favorilere ekle">${I.heart}</button>
      <span class="kn-cprice"><b>${vmTL(h.price)}</b><em>${vmTL(knM2(h))}/m²</em></span>
    </div>
    <div class="kn-cbody">
      <div class="kn-ctitle">${h.title}</div>
      <div class="kn-cloc">${I.pin}<span>${h.hood}, ${h.district} / ${h.city}</span></div>
      <div class="kn-specs"><span><b>${h.gross}</b> m²</span><span><b>${h.rooms}</b></span><span>${knAgeLabel(h)}</span><span>${h.floor}</span></div>
      <div class="kn-cmid">${knVsHTML(h)}<span class="kn-cpay">aylık ~${vmTL(knEstimate(h))}</span></div>
      <div class="vm-cfoot">
        <div class="vm-cdealer"><span class="kn-sel-ico">${s.name[0]}</span><span>${s.name}</span><em>${s.kind}</em></div>
        <button class="vm-cmp ${cmp ? 'on' : ''}" data-action="kn-cmp" data-id="${h.id}"><span class="cbx">${I.check}</span>Karşılaştır</button>
      </div>
    </div>
  </div>`;
}
function knCmpBarHTML() {
  const n = state.kn.cmp.length;
  return `<span><b>${n}</b> konut seçildi${n < 2 ? ' · en az 2 seç' : ''}</span><button class="vm-cmp-go ${n < 2 ? 'off' : ''}" data-action="kn-compare">Karşılaştır</button>`;
}
function knRefreshList() {
  const r = knResults(), n = knActiveFilters().length, v = state.kn;
  const set = (id, h) => { const el = document.getElementById(id); if (el) el.innerHTML = h; };
  set('kn-list', knListHTML(r));
  set('kn-count', r.length + ' ilan');
  const bar = document.getElementById('kn-cmpbar'); if (bar) { bar.innerHTML = knCmpBarHTML(); bar.classList.toggle('show', v.cmp.length > 0); }
  set('kn-sort-l', KN_SORTS.find(s => s[0] === v.sort)[1]);
  const fo = document.getElementById('kn-favonly'); if (fo) fo.classList.toggle('on', v.favOnly);
  set('kn-active-wrap', knActiveHTML());
  const fc = document.getElementById('kn-fcount'); if (fc) { fc.textContent = n; fc.hidden = !n; }
}
function knToggleFav(id) {
  const v = state.kn;
  v.favs = v.favs.includes(id) ? v.favs.filter(x => x !== id) : v.favs.concat(id);
  const on = v.favs.includes(id);
  document.querySelectorAll(`[data-action="kn-fav"][data-id="${id}"]`).forEach(b => b.classList.toggle('on', on));
  const n = document.getElementById('kn-fav-n'); if (n) n.textContent = v.favs.length;
  toast(on ? 'Favorilere eklendi' : 'Favorilerden çıkarıldı');
  if (v.favOnly && state.screen === 'konut-liste') knRefreshList();
}
function knToggleCmp(id) {
  const v = state.kn;
  if (v.cmp.includes(id)) v.cmp = v.cmp.filter(x => x !== id);
  else if (v.cmp.length >= 3) return toast('En fazla 3 konutu karşılaştırabilirsin');
  else v.cmp = v.cmp.concat(id);
  document.querySelectorAll('[data-action="kn-cmp"]').forEach(b => b.classList.toggle('on', v.cmp.includes(b.dataset.id)));
  const bar = document.getElementById('kn-cmpbar'); if (bar) { bar.innerHTML = knCmpBarHTML(); bar.classList.toggle('show', v.cmp.length > 0); }
}
function knSortSheet() { vmChoiceSheet('Sırala', KN_SORTS.map(([k, l]) => ({ v: k, label: l, on: state.kn.sort === k })), 'kn-set-sort'); }
function knCompareSheet() {
  const hs = state.kn.cmp.map(id => knHome(id));
  if (hs.length < 2) return toast('Karşılaştırmak için en az 2 konut seç');
  const min = fn => Math.min(...hs.map(fn)), max = fn => Math.max(...hs.map(fn));
  const row = (label, fn, best) => `<tr><th>${label}</th>${hs.map(h => `<td class="${best && best(h) ? 'best' : ''}">${fn(h)}</td>`).join('')}</tr>`;
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>Konut karşılaştırma</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="vm-cmp-scroll"><table class="vm-cmp-t">
      <thead><tr><th></th>${hs.map(h => `<td><div class="vm-cmp-img kn-cmp-img">${knPicHTML(h, 'ext')}</div><b>${h.district} ${h.rooms}</b></td>`).join('')}</tr></thead>
      <tbody>
        ${row('Fiyat', h => vmTL(h.price), h => h.price === min(x => x.price))}
        ${row('m² fiyatı', h => vmTL(knM2(h)), h => knM2(h) === min(knM2))}
        ${row('Bölge ortalamasına göre', h => { const d = knVsAvg(h); return Math.abs(d) <= 2 ? 'Ortalamada' : d < 0 ? `%${-d} altında` : `%${d} üstünde`; }, h => knVsAvg(h) === min(knVsAvg))}
        ${row('Brüt / net m²', h => `${h.gross} / ${h.net}`, h => h.gross === max(x => x.gross))}
        ${row('Oda sayısı', h => h.rooms)}
        ${row('Bina yaşı', h => knAgeShort(h), h => knAge(h) === min(knAge))}
        ${row('Kat', h => h.floor)}
        ${row('Isıtma', h => h.heating)}
        ${row('Aylık taksit*', h => vmTL(knEstimate(h)), h => h.price === min(x => x.price))}
        ${row('Satıcı', h => knSeller(h).name + '<br><i>' + knSeller(h).kind + '</i>')}
      </tbody>
    </table></div>
    <div class="vm-cmp-note">* %${knEstDown()} peşinat, ${KN_EST.term} ay, örnek faiz. Yeşil: en avantajlı değer.</div>
    <button class="sheet-btn ghost" data-action="close-sheet">Kapat</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}

/* -------------------- Screen 3 — home details -------------------- */
const KN_SLIDE_LABELS = ['Dış görünüm', 'Salon', 'Mutfak', 'Yatak odası', 'Kat planı'];
function KnDetail() {
  const v = state.kn, h = knHome(), s = knSeller(h), fav = v.favs.includes(h.id);
  const yes = b => b ? 'Var' : 'Yok';
  const specs = [['Konut tipi', h.type], ['Oda sayısı', h.rooms], ['Brüt metrekare', h.gross + ' m²'], ['Net metrekare', h.net + ' m²'], ['Bina yaşı', `${knAgeShort(h)} · ${h.year} yapımı`], ['Bulunduğu kat', h.floor],
    ['Kat sayısı', h.floors], ['Isıtma', h.heating], ['Banyo sayısı', h.bath], ['Balkon', yes(h.balcony)], ['Asansör', yes(h.elevator)], ['Otopark', h.parking],
    ['Site içerisinde', h.site ? 'Evet' : 'Hayır'], ['Eşyalı', h.furnished ? 'Evet' : 'Hayır'], ['Tapu durumu', 'Kat mülkiyeti'], ['Enerji sınıfı', h.energy]];
  return `
  <div class="screen ${vmAnim()} vm kn">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">İlan Detayı</div>
      <button class="vm-heart-nav ${fav ? 'on' : ''}" data-action="kn-fav" data-id="${h.id}" aria-label="Favorilere ekle">${I.heart}</button>
    </div>
    <div class="screen-scroll">
      <div class="vm-gal-wrap kn-gal">
        <div class="vm-gal" id="kn-gal">${KN_SLIDES.map((va, i) => `<div class="vm-slide kn-slide">${knPicHTML(h, va, i)}</div>`).join('')}</div>
        <span class="vm-gal-n" id="kn-gal-n">1 / ${KN_SLIDES.length}</span>
        ${h.photos ? '' : '<span class="vm-gal-tag">Temsilî görsel</span>'}
        <span class="kn-gal-cap" id="kn-gal-cap">${KN_SLIDE_LABELS[0]}</span>
        <div class="vm-dots" id="kn-dots">${KN_SLIDES.map((_, i) => `<i class="${i ? '' : 'on'}"></i>`).join('')}</div>
      </div>
      <div class="kn-thumbs" id="kn-thumbs">${KN_SLIDES.map((va, i) => `<button class="kn-thumb ${i ? '' : 'on'}" data-action="kn-gal-go" data-i="${i}" aria-label="${KN_SLIDE_LABELS[i]}">${knPicHTML(h, va, i)}</button>`).join('')}</div>
      <div class="kn-d-head">
        <div class="kn-d-badges"><span class="kn-tag">Satılık</span><span class="kn-tag">${h.type}</span>${h.cond === 'new' ? '<span class="kn-tag new">Sıfır</span>' : ''}<span class="kn-d-no">İlan no ${knNo(h)}</span></div>
        <h2>${h.title}</h2>
        <div class="kn-d-loc">${I.pin}<span>${h.hood}, ${h.district} / ${h.city}</span></div>
        <div class="kn-d-price"><b>${vmTL(h.price)}</b><span>${vmTL(knM2(h))}/m²</span></div>
        ${knVsHTML(h, 'lg')}
        <div class="kn-facts">
          <div><span>Brüt</span><b>${h.gross} m²</b></div>
          <div><span>Net</span><b>${h.net} m²</b></div>
          <div><span>Oda</span><b>${h.rooms}</b></div>
          <div><span>Bina yaşı</span><b>${knAge(h) || 'Sıfır'}</b></div>
        </div>
        <button class="vm-d-fin" data-action="kn-start-sim"><span>Konut kredisiyle aylık <b>~${vmTL(knEstimate(h))}</b>'den</span><em>%${knEstDown()} peşinat · ${KN_EST.term} ay · örnek</em>${I.chevR}</button>
      </div>
      <div class="vm-box">
        <div class="vm-box-h">Konut bilgileri</div>
        <div class="vm-specs">${specs.map(([k, val]) => `<div><span>${k}</span><b>${val}</b></div>`).join('')}</div>
      </div>
      <div class="vm-box">
        <div class="vm-box-h">Açıklama</div>
        <p class="kn-desc">${h.desc}</p>
        <div class="vm-equip">${[h.elevator && 'Asansör', h.parking !== 'Yok' && h.parking, h.site && 'Site içinde', h.balcony && 'Balkon', 'Krediye uygun'].filter(Boolean).map(e => `<span>${I.check}${e}</span>`).join('')}</div>
      </div>
      <div class="vm-box">
        <div class="vm-box-h">Konum</div>
        <div class="kn-map">${knMapSVG(h)}<span class="vm-gal-tag">Temsilî harita</span></div>
        <div class="kn-near">${h.near.map(([k, d]) => `<div><span>${k}</span><b>${d}</b></div>`).join('')}</div>
        <button class="sp-link kn-maplink" data-action="toast" data-msg="Harita uygulaması prototipte aktif değil">Haritada aç ${I.chevR}</button>
      </div>
      <div class="vm-box">
        <div class="vm-box-h">${s.kind === 'Ev sahibi' ? 'Satıcı' : s.kind === 'İnşaat firması' ? 'Proje satış ofisi' : 'Emlak ofisi'}</div>
        <div class="vm-dealer">
          <div class="vm-dealer-ico">${s.name[0]}</div>
          <div class="vm-dealer-mid"><b>${s.name}</b><span>${s.kind}${s.kind === 'Ev sahibi' ? ' · sahibinden' : ' · ' + s.agent}</span></div>
        </div>
        <div class="vm-dealer-addr">${I.pin}<span>${s.district} / ${s.city} · İlan tarihi: ${knDaysLabel(h.days)}</span></div>
        <div class="vm-dealer-btns">
          <button data-action="toast" data-msg="Arama prototipte aktif değil">${VM_ICO.phone}Ara</button>
          <button data-action="toast" data-msg="Mesajlaşma prototipte aktif değil">${I.mail}Mesaj gönder</button>
        </div>
      </div>
    </div>
    <div class="screen-cta vm-d-cta">
      <button class="vm-heart-lg ${fav ? 'on' : ''}" data-action="kn-fav" data-id="${h.id}" aria-label="Favorilere ekle">${I.heart}</button>
      <button class="btn-primary" id="kn-d-go" data-action="kn-start-sim">${knDetailCta()}</button>
    </div>
  </div>`;
}
function knSetupDetail() {
  const g = document.getElementById('kn-gal');
  if (!g) return;
  g.addEventListener('scroll', () => {
    const i = Math.round(g.scrollLeft / g.clientWidth), n = g.children.length;
    const lbl = document.getElementById('kn-gal-n'); if (lbl) lbl.textContent = `${i + 1} / ${n}`;
    const cap = document.getElementById('kn-gal-cap'); if (cap) cap.textContent = KN_SLIDE_LABELS[i] || '';
    document.querySelectorAll('#kn-dots i').forEach((d, k) => d.classList.toggle('on', k === i));
    document.querySelectorAll('#kn-thumbs .kn-thumb').forEach((t, k) => t.classList.toggle('on', k === i));
  }, { passive: true });
}
/* -------------------- shared: flow steps, home strip, icons -------------------- */
const KN_ICO = {
  cal: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',
  upload: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V4M7.5 8.5 12 4l4.5 4.5"/><path d="M4 15v3.5A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5V15"/></svg>',
  pen: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4z"/><path d="m13.5 6.5 4 4"/></svg>',
  clip: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="17" rx="2.5"/><path d="M9 4.5V3h6v1.5"/><path d="m9 13 2 2 4-4"/></svg>',
  person: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5"/></svg>',
  deed: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6.5A2.5 2.5 0 0 0 4 5.5v13A2.5 2.5 0 0 0 6.5 21H11"/><path d="M14 3l5 5v3"/><path d="M14 3v5h5M8 12h5M8 16h3"/><circle cx="17" cy="16.5" r="3"/><path d="m15.6 19.2-.6 2.8 2-1 2 1-.6-2.8"/></svg>',
};
const KN_DEMO = { home: 'h1', down: 3000000, term: 120 };   // test scenario of the brief (Kadıköy 3+1)
const KN_GUN = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
function knAgeShort(h) { const a = knAge(h); return a ? a + ' yıl' : 'Sıfır'; }
/* Demo clock: completing a step moves the journey's time to that step's appointment, so dates stay in order */
function knClock() { return new Date(state.kn.clock || Date.now()); }
function knSetClock(d) { state.kn.clock = d.getTime(); }
function knAddMin(min) { const d = knClock(); d.setMinutes(d.getMinutes() + min); knSetClock(d); }
function knAddBiz(d, n) { const x = new Date(d); let k = 0; while (k < n) { x.setDate(x.getDate() + 1); if (x.getDay() % 6) k++; } return x; }
function knAt(d, hhmm) { const [h, m] = hhmm.split(':'); const x = new Date(d); x.setHours(+h, +m, 0, 0); return x; }
function knStamp(d = knClock()) { const p2 = n => String(n).padStart(2, '0'); return `${p2(d.getDate())}.${p2(d.getMonth() + 1)}.${d.getFullYear()} · ${p2(d.getHours())}:${p2(d.getMinutes())}`; }
function knDay(d) { return `${d.getDate()} ${VM_AY[d.getMonth()]} ${d.getFullYear()}`; }
function knMoneyC(n) { return n >= 1e6 ? knMn(n) : vmTL(n); }   // compact amounts for narrow table cells
function knFlowHTML(cur) {
  return `<div class="vm-flow kn-flow" role="list" aria-label="Konut kredisi adımları">${KN_FLOW.map((t, i) =>
    `<div class="vm-flow-s ${i < cur ? 'done' : i === cur ? 'on' : ''}" role="listitem"><i>${i < cur ? I.check : i + 1}</i><span>${t}</span></div>`).join('<b></b>')}</div>`;
}
function knTitle(h) { return `${h.district} · ${h.rooms} ${h.type.toLocaleLowerCase('tr')}`; }
function knMiniHTML(h, right) {
  return `<div class="vm-mini">
    <div class="vm-mini-img">${knPicHTML(h, 'ext')}</div>
    <div class="vm-mini-mid"><b>${knTitle(h)}</b><span>${h.gross} m² · ${knAge(h) ? 'Bina yaşı ' + knAge(h) : 'Sıfır bina'}</span><em>${knSeller(h).name}</em></div>
    <div class="vm-mini-r">${right || `<span>Konut fiyatı</span><b>${vmTL(h.price)}</b>`}</div>
  </div>`;
}
/* Down payment & term set-up for a home (kept while the same home is being financed) */
function knInitFlow(h) {
  const v = state.kn;
  if (v.flowHome === h.id) return;
  v.flowHome = h.id;
  const demo = h.id === KN_DEMO.home;
  v.down = Math.min(knDownMax(h), Math.max(knDownMin(h), demo ? KN_DEMO.down : Math.round(h.price * knEstDown() / 100 / 10000) * 10000));
  v.term = demo ? KN_DEMO.term : KN_EST.term;
  v.scen = [];
  v.agree = { pre: false, contract: false, kvkk: false };
}
/* Highest loan the stated income carries over n months (EXAMPLE rule, see KN_CAP) */
function knMaxLoan(n = state.kn.term) {
  const room = knCapacity(0).room, i = knI();
  return room <= 0 ? 0 : Math.floor(room * (1 - Math.pow(1 + i, -n)) / i / 10000) * 10000;
}
/* Smallest change that brings the plan within capacity: more down payment, then a longer term */
function knSuggest() {
  const v = state.kn, h = knHome(), lo = knDownMin(h), hi = knDownMax(h);
  for (const n of [v.term, ...KN_TERMS.filter(t => t > v.term)]) {
    const down = Math.max(lo, Math.ceil((h.price - knMaxLoan(n)) / 10000) * 10000);
    if (down <= hi) return { down, term: n };
  }
  return null;
}

/* -------------------- Screen 4 — housing loan simulation -------------------- */
function KnSim() {
  const v = state.kn, h = knHome();
  if (v.app) { state.screen = 'konut-takip'; return KnTrack(); }
  knInitFlow(h);
  const lo = knDownMin(h), hi = knDownMax(h);
  v.down = Math.min(hi, Math.max(lo, v.down));
  const money = (id, label, val) => `<label class="vm-in"><span>${label}</span><input id="${id}" inputmode="numeric" enterkeyhint="done" autocomplete="off" placeholder="0" value="${val ? val.toLocaleString('tr-TR') : (id === 'kn-debt' ? '0' : '')}"><em>TL</em></label>`;
  return `
  <div class="screen ${vmAnim()} vm kn">
    ${vmNav('Konut Kredisi Simülasyonu')}
    <div class="screen-scroll">
      ${knFlowHTML(0)}
      ${knMiniHTML(h)}
      <div class="vm-box vm-calc">
        <div class="vm-calc-h"><span>Peşinat</span><b id="kn-down-pct">Konut fiyatının %${vmPct(v.down, h.price)}</b></div>
        <label class="vm-money lg"><input id="kn-down-in" inputmode="numeric" enterkeyhint="done" autocomplete="off" value="${v.down.toLocaleString('tr-TR')}" aria-label="Peşinat"><em>TL</em></label>
        <div class="vm-slider" id="kn-down-sl" style="--v:${vmSlPct(v.down, lo, hi)}%">
          <div class="vm-track"><i></i></div>
          <input type="range" class="vm-range" id="kn-down-range" min="${lo}" max="${hi}" step="10000" value="${v.down}" aria-label="Peşinat">
        </div>
        <div class="vm-scale"><span>${vmTL(lo)}</span><span>${vmTL(hi)}</span></div>
        <div class="vm-pcts" id="kn-pcts">${knPctsHTML()}</div>
        <div class="vm-warn-inline" id="kn-down-warn" role="status" aria-live="polite"></div>
        <div class="vm-loanrow"><span>Kredi tutarı</span><b id="kn-loan-v">${vmTL(knLoan())}</b></div>
        <div class="kn-ltv" id="kn-ltv">${knLtvHTML()}</div>
      </div>
      <div class="vm-sec-t">Vade</div>
      <div class="vm-terms" id="kn-terms">${knTermsHTML()}</div>
      <div class="vm-box vm-res" id="kn-res">${knResHTML()}</div>
      <div class="vm-sec-t">Ödeme kapasiten</div>
      <div class="vm-box kn-cap">
        <div class="kn-cap-in">${money('kn-inc', 'Aylık net hane geliri', v.income)}${money('kn-debt', 'Mevcut aylık kredi ve kart taksitleri', v.debts)}</div>
        <div class="kn-cap-src" id="kn-cap-src">${knCapSrcHTML()}</div>
        <div id="kn-cap-res" aria-live="polite">${knCapHTML()}</div>
      </div>
      <div class="vm-sec-t vm-sec-row"><span>Senaryo karşılaştırma</span><button class="sp-link" data-action="kn-scen-save">${I.plus}Bu planı kaydet</button></div>
      <div id="kn-scen">${knScenHTML()}</div>
      <div class="vm-sec-t">Ödeme planı</div>
      <div class="vm-box vm-plan" id="kn-plan-prev">${knPlanPrevHTML()}</div>
      <div class="vm-sec-t">Tahmini masraflar</div>
      <div class="vm-box kn-fees" id="kn-fees">${knFeesHTML()}</div>
      <div class="vm-note">${I.info}<span>Hesaplamalar örnek faiz oranıyla (aylık %${vmPctStr(KN_RATE.monthly)}) yapılmıştır; konut kredilerinde KKDF alınmaz, BSMV ve kredi / değer sınırı TAKBİS sonucuna göre belirlenir. Sonuçlar gerçek kredi koşullarını yansıtmaz.</span></div>
    </div>
    <div class="screen-cta">
      <button class="btn-primary" data-action="kn-to-apply">Kredi Başvurusuna Geç</button>
    </div>
  </div>`;
}
function knPctsHTML() {
  const v = state.kn, h = knHome();
  const m = 100 - knLtvMax();
  return [m, m + 5, m + 15, m + 25].map(x => `<button class="vm-pct ${vmPct(v.down, h.price) === x ? 'on' : ''}" data-action="kn-pct" data-v="${x}">%${x}</button>`).join('');
}
function knLtvHTML() {
  const h = knHome(), ltv = vmPct(knLoan(), h.price), max = knLtvMax(), eff = knTkEff();
  return `<div class="kn-meter"><i style="width:${Math.min(100, ltv)}%"></i><b style="left:${max}%"></b></div>
    <div class="kn-meter-l"><span>Kredi / konut fiyatı <b>%${ltv}</b></span><span>En fazla %${max} · LTV ${eff.manual ? 'manuel' : eff.ltv.toLocaleLowerCase('tr')} ${vmEx()}</span></div>`;
}
function knTermsHTML() {
  const v = state.kn, loan = knLoan();
  return KN_TERMS.map(n => `<button class="vm-term ${v.term === n ? 'on' : ''}" data-action="kn-term" data-v="${n}"><b>${n} ay</b><span>${knMoneyC(knPay(loan, n))}</span></button>`).join('');
}
function knResHTML() {
  const v = state.kn, h = knHome(), q = knQuote();
  return `
    <div class="vm-res-top"><span>Aylık taksit</span><b>${vmTL(q.pay)}</b><em>${v.term} ay · ilk taksit kullandırımdan 1 ay sonra</em></div>
    <div class="vm-rows">
      <div><span>Konut fiyatı</span><b>${vmTL(h.price)}</b></div>
      <div><span>Peşinat</span><b>${vmTL(v.down)}</b></div>
      <div><span>Kredi tutarı</span><b>${vmTL(q.loan)}</b></div>
      <div><span>Aylık faiz oranı ${vmEx()}</span><b>%${vmPctStr(KN_RATE.monthly)}</b></div>
      <div><span>Toplam faiz</span><b>${vmTL(q.interest)}</b></div>
      <div><span>KKDF</span><b>Alınmaz</b></div>
      <div><span>BSMV<i class="vm-sub">TAKBİS sonucu${knTkEff().manual ? ' · manuel değerlendirme' : ''}</i></span><b>${q.tax ? vmTL(q.tax) : 'Alınmaz'}</b></div>
      <div class="hl"><span>Toplam geri ödeme</span><b>${vmTL(q.total)}</b></div>
      <div><span>Konut için toplam ödeme<i class="vm-sub">Peşinat + toplam geri ödeme</i></span><b>${vmTL(v.down + q.total)}</b></div>
    </div>`;
}
function knCapHTML() {
  const v = state.kn, q = knQuote(), c = knCapacity(q.pay);
  if (!v.income) return `<div class="kn-cap-v over">${I.info}<span><b>Gelir bilgini gir.</b> Ödeme kapasiteni hesaplamak için aylık net hane gelirine ihtiyaç var.</span></div>`;
  const msg = {
    ok: `<b>Ödeme kapasiten bu plan için uygun görünüyor.</b> Yeni taksitle birlikte borç ödemelerin gelirinin %${c.ratio} seviyesinde.`,
    edge: `<b>Sınırdasın.</b> Borç ödemelerin gelirinin %${c.ratio} seviyesinde; peşinatı artırmak ya da vadeyi uzatmak oranı düşürür.`,
    over: `<b>Bu taksit ödeme kapasitenin üzerinde.</b> Borç ödemelerin gelirinin %${c.ratio} seviyesine çıkıyor; başvurmadan önce planı düzenle.`,
  }[c.level];
  return `
    <div class="kn-meter ${c.level}"><i style="width:${Math.min(100, c.ratio)}%"></i><b style="left:${KN_CAP}%"></b></div>
    <div class="kn-meter-l"><span>Borç / gelir <b>%${c.ratio}</b></span><span>Üst sınır %${KN_CAP} ${vmEx()}</span></div>
    <div class="kn-cap-v ${c.level}">${c.level === 'ok' ? I.check : I.info}<span>${msg}</span></div>
    <div class="vm-rows kn-cap-rows">
      <div><span>Yeni taksit + mevcut taksitler</span><b>${vmTL(c.total)}</b></div>
      <div><span>Önerilen en yüksek yeni taksit</span><b>${vmTL(c.room)}</b></div>
      <div><span>Bu gelirle en yüksek kredi · ${v.term} ay</span><b>${vmTL(knMaxLoan())}</b></div>
    </div>`;
}
/* Where the household income comes from: the confirmed tahsis data (unless typed here) */
function knCapSrcHTML() {
  const v = state.kn, t = v.tahsis;
  if (v.incomeEdited) return `${I.info}<span>Hane gelirini bu simülasyon için değiştirdin; tahsis bilgilerine göre ${vmTL(knHouseIncome())}.</span>`;
  return `${I.info}<span>Tahsis bilgilerinden: gelirin ${vmTL(t.income)}${t.spouse ? ` + eşinin geliri ${vmTL(t.spouse)}` : ''}${t.other ? ` + diğer gelir ${vmTL(t.other)}` : ''}.</span>`;
}
function knScenHTML() {
  const v = state.kn, h = knHome();
  if (!v.scen.length) return `<div class="vm-box vm-scen-empty">${VM_ICO.compare}<span>Farklı peşinat ve vade seçeneklerini kaydet; en fazla 3 senaryoyu yan yana karşılaştır.</span></div>`;
  const qs = v.scen.map(s => { const q = knQuote(h.price - s.down, s.term); return { ...s, q, cap: knCapacity(q.pay) }; });
  const minPay = Math.min(...qs.map(x => x.q.pay)), minAll = Math.min(...qs.map(x => x.down + x.q.total));
  const cur = s => s.down === v.down && s.term === v.term;
  const row = (label, fn, best) => `<tr><th>${label}</th>${qs.map(s => `<td class="${best && best(s) && qs.length > 1 ? 'best' : ''}">${fn(s)}</td>`).join('')}</tr>`;
  return `<div class="vm-box vm-scen"><table class="vm-scen-t">
    <thead><tr><th></th>${qs.map(s => `<td class="${cur(s) ? 'cur' : ''}"><span class="vm-scen-n">${s.label}</span><button class="vm-scen-x" data-action="kn-scen-del" data-v="${s.label}" aria-label="Senaryoyu kaldır: ${s.label}">${I.close}</button></td>`).join('')}</tr></thead>
    <tbody>
      ${row('Peşinat', s => knMoneyC(s.down))}
      ${row('Vade', s => s.term + ' ay')}
      ${row('Aylık taksit', s => vmTL(s.q.pay), s => s.q.pay === minPay)}
      ${row('Toplam geri ödeme', s => knMoneyC(s.q.total))}
      ${row('Konut için toplam', s => knMoneyC(s.down + s.q.total), s => s.down + s.q.total === minAll)}
      ${row('Borç / gelir', s => `<span class="kn-lv ${v.income ? s.cap.level : 'over'}">%${v.income ? s.cap.ratio : '–'}</span>`)}
    </tbody>
    <tfoot><tr><th></th>${qs.map(s => `<td>${cur(s) ? '<span class="vm-scen-cur">Seçili plan</span>' : `<button class="vm-scen-ap" data-action="kn-scen-apply" data-v="${s.label}">Uygula</button>`}</td>`).join('')}</tr></tfoot>
  </table>${qs.length > 1 ? '<div class="vm-scen-note">Yeşil: en düşük aylık taksit ve konut için en düşük toplam ödeme. Borç / gelir oranı mevcut gelir bilgine göre hesaplanır.</div>' : ''}</div>`;
}
function knPlanPrevHTML() {
  const v = state.kn, rows = knPlanRows(knLoan(), v.term), show = rows.slice(0, 3).concat(rows.slice(-1));
  return `<div class="vm-pt">
      <div class="vm-pt-h"><span>No</span><span>Tarih</span><span>Taksit</span><span>Kalan anapara</span></div>
      ${show.map((r, i) => `${i === 3 ? '<div class="vm-pt-gap">···</div>' : ''}<div class="vm-pt-r"><span>${r.k}</span><span>${r.date}</span><span>${vmTL(r.pay)}</span><span>${vmTL(r.bal)}</span></div>`).join('')}
    </div>
    <button class="vm-pt-all" data-action="kn-plan-all">Tüm ödeme planını gör · ${v.term} taksit ${I.chevR}</button>`;
}
function knFeesHTML() {
  const v = state.kn, h = knHome(), fees = knFees(h, knLoan());
  return `<div class="vm-rows">
      ${fees.rows.map(([l, sub, amt]) => `<div><span>${l}<i class="vm-sub">${sub}</i></span><b>${vmTL(amt)}</b></div>`).join('')}
      <div class="hl"><span>Toplam tahmini masraf ${vmEx()}</span><b>${vmTL(fees.total)}</b></div>
    </div>
    <div class="kn-cash">${I.wallet}<span>Peşinat ve masraflarla başlangıçta gereken nakit<b>${vmTL(v.down + fees.total)}</b></span></div>`;
}
function knSetupSim() {
  const r = document.getElementById('kn-down-range'), inp = document.getElementById('kn-down-in');
  if (r) r.addEventListener('input', () => knSetDown(+r.value));
  if (inp) vmMoneyInput(inp, knSetDown);
  [['kn-inc', 'income'], ['kn-debt', 'debts']].forEach(([id, k]) => {
    const el = document.getElementById(id);
    if (!el) return;
    vmMoneyInput(el, val => {
      state.kn[k] = val;
      if (k === 'income') state.kn.incomeEdited = val !== knHouseIncome();
      el.value = val ? val.toLocaleString('tr-TR') : (k === 'debts' ? '0' : '');
      knSimUpdate();
    });
  });
}
function knSetDown(raw) {
  const v = state.kn, h = knHome(), lo = knDownMin(h), hi = knDownMax(h);
  let d = Math.round(raw) || 0, warn = '';
  if (d < lo) { d = lo; warn = `Peşinat en az ${vmTL(lo)} olabilir; TAKBİS sonucuna göre asgari peşinat oranı %${100 - knLtvMax()}.`; }
  else if (d > hi) { d = hi; warn = `Peşinat en fazla ${vmTL(hi)} olabilir; en düşük kredi tutarı ${vmTL(KN_MIN_LOAN)}.`; }
  v.down = d;
  knSimUpdate();
  vmWarn('kn-down-warn', warn);
}
function knSetTerm(n) { state.kn.term = n; knSimUpdate(); }
function knPct(p) { const h = knHome(); knSetDown(Math.ceil(h.price * p / 100 / 10000) * 10000); }
/* Live update without re-rendering the screen (the slider keeps its drag, inputs keep focus) */
function knSimUpdate() {
  if (state.screen !== 'konut-kredi') return;
  const v = state.kn, h = knHome(), lo = knDownMin(h), hi = knDownMax(h);
  const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
  const inp = document.getElementById('kn-down-in');
  if (inp && document.activeElement !== inp) inp.value = v.down.toLocaleString('tr-TR');
  const r = document.getElementById('kn-down-range'); if (r && +r.value !== v.down) r.value = v.down;
  const sl = document.getElementById('kn-down-sl'); if (sl) sl.style.setProperty('--v', vmSlPct(v.down, lo, hi) + '%');
  set('kn-down-pct', `Konut fiyatının %${vmPct(v.down, h.price)}`);
  set('kn-pcts', knPctsHTML());
  set('kn-loan-v', vmTL(knLoan()));
  set('kn-ltv', knLtvHTML());
  set('kn-terms', knTermsHTML());
  set('kn-res', knResHTML());
  set('kn-cap-res', knCapHTML());
  set('kn-cap-src', knCapSrcHTML());
  set('kn-scen', knScenHTML());
  set('kn-plan-prev', knPlanPrevHTML());
  set('kn-fees', knFeesHTML());
}
function knSaveScen() {
  const v = state.kn;
  if (v.scen.some(s => s.down === v.down && s.term === v.term)) return toast('Bu plan zaten kayıtlı');
  if (v.scen.length >= 3) return toast('En fazla 3 senaryo kaydedebilirsin');
  const label = ['A', 'B', 'C'].find(l => !v.scen.some(s => s.label === l));
  v.scen = v.scen.concat({ label, down: v.down, term: v.term }).sort((a, b) => a.label.localeCompare(b.label));
  const el = document.getElementById('kn-scen'); if (el) el.innerHTML = knScenHTML();
  toast(`Senaryo ${label} kaydedildi`);
}
function knApplyScen(label) {
  const v = state.kn, s = v.scen.find(x => x.label === label);
  if (!s) return;
  v.term = s.term;
  knSetDown(s.down);
  toast(`Senaryo ${label} uygulandı`);
}
function knDelScen(label) {
  const v = state.kn;
  v.scen = v.scen.filter(x => x.label !== label);
  const el = document.getElementById('kn-scen'); if (el) el.innerHTML = knScenHTML();
}
function knPlanSheet() {
  const v = state.kn, a = v.app, loan = a ? a.loan : knLoan(), n = a ? a.term : v.term, q = knQuote(loan, n);
  const rows = knPlanRows(loan, n, a && a.firstTs ? new Date(a.firstTs) : null);
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>Ödeme planı</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="vm-ps-sum"><div><span>Kredi tutarı</span><b>${vmTL(loan)}</b></div><div><span>Aylık taksit</span><b>${vmTL(q.pay)}</b></div><div><span>Toplam geri ödeme</span><b>${vmTL(q.total)}</b></div></div>
    <div class="vm-ps">${rows.map(r => `<div class="vm-ps-r"><span class="vm-ps-n">${r.k}</span><div><b>${r.date}</b><span>Anapara ${vmTL(r.princ)}</span><span>Faiz${knTkEff().bsmv ? ' ve BSMV' : ''} ${vmTL(r.cost)}</span></div><div class="vm-ps-amt"><b>${vmTL(r.pay)}</b><span>Kalan ${vmTL(r.bal)}</span></div></div>`).join('')}</div>
    <div class="vm-cmp-note">Örnek faiz oranıyla hesaplanmıştır; konut kredilerinde KKDF alınmaz${knTkEff().bsmv ? `, faize %${KN_BSMV} BSMV eklenir (TAKBİS)` : ', BSMV alınmaz (TAKBİS)'}. ${a && a.first ? `İlk taksit ${a.first}.` : 'Tarihler kullandırım gününe göre kesinleşir.'}</div>
    <button class="sheet-btn ghost" data-action="close-sheet">Kapat</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function knToApply() {
  vmCommitInputs();
  const v = state.kn;
  if (!v.income || knCapacity(knQuote().pay).level === 'over') return knCapSheet();
  go('konut-basvuru');
}
function knCapSheet() {
  const v = state.kn, h = knHome(), c = knCapacity(knQuote().pay), s = v.income ? knSuggest() : null;
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-ico vm-sheet-ico kn-sheet-warn">${I.info}</div>
    <h3>${v.income ? 'Taksit ödeme kapasitenin üzerinde' : 'Gelir bilgin eksik'}</h3>
    <p>${v.income ? `Bu planda borç ödemelerin gelirinin %${c.ratio} seviyesine çıkıyor; önerilen üst sınır %${KN_CAP}. Başvurun bu haliyle olumsuz sonuçlanabilir.${s ? '' : ' Bu konut için gelirine uygun bir plan bulunamadı.'}` : 'Ödeme kapasiteni değerlendirebilmemiz için aylık net hane gelirini gir.'}</p>
    ${s ? `<div class="kn-sug"><span>Önerilen plan</span><b>${vmTL(s.down)} peşinat · ${s.term} ay</b><em>Aylık taksit ~${vmTL(knPay(h.price - s.down, s.term))}</em></div>
    <button class="sheet-btn" data-action="kn-sug-apply" data-down="${s.down}" data-term="${s.term}">Önerilen Planı Uygula</button>` : ''}
    <button class="sheet-btn ${s ? 'ghost' : ''}" data-action="close-sheet">Planı Düzenle</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function knSugApply(down, term) {
  closeSheet();
  state.kn.term = term;
  knSetDown(down);
  toast('Önerilen plan uygulandı');
}

/* -------------------- Screen 5 — loan application -------------------- */
const KN_AGREE = [
  ['pre', 'Konut Kredisi Ön Bilgilendirme Formu', '\'nu okudum.'],
  ['contract', 'Konut Kredisi Sözleşmesi', '\'ni okudum, onaylıyorum.'],
  ['kvkk', 'Aydınlatma Metni', '\'ni okudum; değerlendirme için KKB ve TAKBİS sorgusu yapılmasını onaylıyorum.'],
];
function KnApply() {
  const v = state.kn, h = knHome(), p = KN_PROFILE, s = knSeller(h), t = v.tahsis;
  if (v.app) { state.screen = 'konut-takip'; return KnTrack(); }
  if (!v.ob.done) { state.screen = 'konut-tanitim'; return KnIntro(); }
  knInitFlow(h);
  const q = knQuote(), g = v.agree, all = g.pre && g.contract && g.kvkk, r = knTkResult(), eff = knTkEff();
  const ro = [['Ad soyad', p.name], ['T.C. kimlik no', p.tckn], ['Doğum tarihi', p.birth], ['Medeni durum', p.marital], ['Cep telefonu', p.phone], ['E-posta', p.email], ['İkamet adresi', p.address]];
  return `
  <div class="screen ${vmAnim()} vm kn">
    ${vmNav('Konut Kredisi Başvurusu')}
    <div class="screen-scroll">
      ${knFlowHTML(1)}
      ${knMiniHTML(h)}
      <div class="vm-sec-t">Müşteri bilgileri</div>
      <div class="kn-secure">${I.lock}<span>Yapı Kredi Mobil'in güvenli kanalındasın; bilgilerin maskelenmeden gösterilir.</span></div>
      <div class="vm-box vm-prof">${ro.map(([k, val]) => `<div class="vm-frow"><span>${k}</span><b>${val}</b></div>`).join('')}</div>
      <div class="vm-sec-t vm-sec-row"><span>Tahsis bilgileri</span><button class="sp-link" data-action="kn-th-open-edit">Düzenle</button></div>
      <div class="vm-box vm-prof">
        <div class="kn-src">${I.check}<span>Onayladığın bilgiler${v.tahsisAt ? ` · ${v.tahsisAt}` : ''}</span></div>
        ${KN_TH_FIELDS.map(([k, label]) => `<div class="vm-frow"><span>${label}</span><b>${knThVal(k, t[k])}</b></div>`).join('')}
        <div class="vm-frow kn-th-sum"><span>Aylık net hane geliri</span><b>${vmTL(knHouseIncome(t))}</b></div>
        <div class="vm-frow"><span>Mevcut aylık taksitler<i class="vm-sub">Simülasyonda belirttiğin</i></span><b>${vmTL(v.debts)}</b></div>
      </div>
      <div class="vm-sec-t">TAKBİS bilgileri</div>
      <div class="vm-box vm-prof kn-tk-app">
        <div class="kn-src">${I.check}<span>İlk girişte alındı${v.tk.at ? ` · ${v.tk.at}` : ''} · tekrar sorulmaz</span></div>
        <div class="vm-frow"><span>Kendi konut sahipliği<i class="vm-sub">‘Hasarlı’ tipi dışındaki evler</i></span><b>${knTkAns('s1')}</b></div>
        <div class="vm-frow"><span>Eş / çocuk konut sahipliği</span><b>${knTkAns('s2')}</b></div>
        <div class="vm-frow"><span>Hisse oranı</span><b>${knTkAns('s3')}</b></div>
        ${knTkResultRows(r).map(([k, val]) => `<div class="vm-frow ${r && r.manual ? 'kn-man' : 'kn-res-row'}"><span>${k}</span><b>${val}</b></div>`).join('')}
        ${r && r.manual ? `<div class="kn-cap-v edge">${I.info}<span><b>TAKBİS sonucu manuel değerlendirmede.</b> Başvurun bu bilgiyle değerlendirmeye alınır; simülasyon düşük LTV varsayımıyla yapıldı.</span></div>` : ''}
      </div>
      <div class="vm-sec-t">Konut bilgileri</div>
      <div class="vm-box vm-prof">
        <div class="vm-frow"><span>Adres</span><b>${h.hood}, ${h.district} / ${h.city}</b></div>
        <div class="vm-frow"><span>Konut tipi</span><b>${h.type} · ${h.rooms}</b></div>
        <div class="vm-frow"><span>Brüt / net alan</span><b>${h.gross} / ${h.net} m²</b></div>
        <div class="vm-frow"><span>Bina yaşı</span><b>${knAgeShort(h)} · ${h.year} yapımı</b></div>
        <div class="vm-frow"><span>Bulunduğu kat</span><b>${h.floor}</b></div>
        <div class="vm-frow"><span>Satıcı</span><b>${s.name} · ${s.kind}</b></div>
      </div>
      <div class="vm-sec-t vm-sec-row"><span>Başvuru özeti</span><button class="sp-link" data-action="kn-edit-plan">Planı düzenle</button></div>
      <div class="receipt vm-receipt">
        <div class="r-row"><span class="r-l">Konut fiyatı</span><span class="r-r">${vmTL(h.price)}</span></div>
        <div class="r-row"><span class="r-l">Peşinat<i class="vm-sub">Satıcıya senin tarafından ödenir</i></span><span class="r-r">${vmTL(v.down)}</span></div>
        <div class="r-row hl"><span class="r-l">Kredi tutarı</span><span class="r-r">${vmTL(q.loan)}</span></div>
        <div class="r-row"><span class="r-l">Kredi / konut fiyatı</span><span class="r-r">%${vmPct(q.loan, h.price)} · en fazla %${eff.ltvMax}</span></div>
        <div class="r-row"><span class="r-l">Vade</span><span class="r-r">${v.term} ay</span></div>
        <div class="r-row"><span class="r-l">Aylık taksit ${vmEx()}</span><span class="r-r">${vmTL(q.pay)}</span></div>
        <div class="r-row"><span class="r-l">Toplam geri ödeme</span><span class="r-r">${vmTL(q.total)}</span></div>
        <div class="r-row"><span class="r-l">Aylık faiz oranı ${vmEx()}</span><span class="r-r">%${vmPctStr(KN_RATE.monthly)}</span></div>
        <div class="r-row"><span class="r-l">BSMV</span><span class="r-r">${eff.bsmv ? `Uygulanır · %${KN_BSMV}` : 'Alınmaz'}</span></div>
        <div class="r-row"><span class="r-l">Taksit ödemesi</span><span class="r-r">Vadesiz TL Hesabım'dan otomatik</span></div>
        <div class="r-row"><span class="r-l">Kullandırım</span><span class="r-r">Tapuda ipotek tesisinden sonra satıcıya</span></div>
      </div>
      <div class="vm-sec-t">Gerekli belgeler</div>
      <div class="vm-box vm-docl" id="kn-docs">${knDocsHTML()}</div>
      <div class="vm-sec-t">Sözleşmeler ve onaylar</div>
      <div class="vm-docs">${KN_AGREE.map(([k, tt, tail]) => `
        <label class="contract-row ${g[k] ? 'on' : ''}" data-action="kn-agree" data-key="${k}">
          <span class="cbx">${I.check}</span>
          <span class="contract-txt"><a data-action="kn-doc" data-doc="${k}">${tt}</a>${tail}</span>
        </label>`).join('')}</div>
      <div class="vm-note">${I.info}<span>Başvurunu tamamladığında ilk kredi değerlendirmesi başlar. Olumlu sonuçlanırsa bankamız ekspertizi başlatır; nihai onay ekspertiz raporundan sonra verilir. Kredi, şubede sözleşme imzası ve tapuda ipotek tesisinden sonra satıcıya ödenir.</span></div>
    </div>
    <div class="screen-cta">
      <button class="btn-primary vm-approve ${all ? '' : 'disabled'}" id="kn-submit" data-action="kn-submit">${I.faceid} Başvuruyu Tamamla</button>
    </div>
  </div>`;
}
/* Documents of the journey with their state: ok · seller (uploaded by the seller, viewable) · req (requested) · later */
function knDocs() {
  const v = state.kn, a = v.app, e = v.eks, p = v.ipt, h = a ? knHome(a.home) : knHome();
  return [
    { k: 'id', t: 'Kimlik bilgileri', d: 'Nüfus kayıtlarından doğrulandı', s: 'ok' },
    { k: 'inc', t: 'Gelir bilgisi', d: 'Onayladığın tahsis bilgileri · SGK kaydıyla doğrulanır', s: 'ok' },
    { k: 'tapu', t: 'Tapu fotokopisi', d: `Satıcı tarafından yüklendi · ${knTapuDoc(h).at}`, s: 'seller' },
    { k: 'eks', t: 'Ekspertiz raporu', d: e && e.stage >= 4 ? `Yüklendi, bankamızca onaylandı · ${e.reportNo}` : e ? 'Değerleme kuruluşu hazırlıyor' : 'İlk değerlendirmeden sonra bankamız talep eder', s: e && e.stage >= 4 ? 'ok' : e ? 'req' : 'later' },
    { k: 'dask', t: 'DASK poliçesi', d: p && p.dask ? `Allianz Türkiye · ${p.dask.no}` : 'Tapu işleminden önce gerekir', s: p && p.dask ? 'ok' : 'later' },
  ];
}
function knDocsHTML() {
  const pill = x => x.s === 'ok' ? `<span class="vm-pill ok sm">${I.check}Hazır</span>`
    : x.s === 'seller' ? '<button class="kn-view" data-action="kn-tapu-doc">Görüntüle</button>'
    : x.s === 'req' ? '<span class="vm-pill on sm">Talep edildi</span>'
    : '<span class="vm-pill sm kn-later">Sonra</span>';
  return knDocs().map(x => `<div><span class="vm-docl-ico">${I.doc}</span><div><b>${x.t}${x.s === 'seller' ? '<em class="kn-insys">Sistemde mevcut</em>' : ''}</b><span>${x.d}</span></div>${pill(x)}</div>`).join('');
}
function knToggleAgree(el) {
  const v = state.kn, k = el.dataset.key;
  v.agree[k] = !v.agree[k];
  el.classList.toggle('on', v.agree[k]);
  const b = document.getElementById('kn-submit');
  if (b) b.classList.toggle('disabled', !(v.agree.pre && v.agree.contract && v.agree.kvkk));
}
function knEditPlan() {
  const prev = state.nav[state.nav.length - 1];
  if (prev && prev.screen === 'konut-kredi') return navBack();
  go('konut-kredi');
}
function knEvent(a, t, d, kind = 'info') { a.events.unshift({ t, d, kind, at: knStamp() }); }
/* The application keeps a copy of the confirmed tahsis data and the TAKBİS answers and results */
function knMakeApp(status) {
  const v = state.kn, h = knHome(), q = knQuote();
  const a = { home: h.id, status, step: 0, ref: vmRef('KK'), at: knStamp(), preAt: null, approvedAt: null, until: null, first: null, firstTs: null, finalSeen: false,
    down: v.down, term: v.term, loan: q.loan, pay: q.pay, total: q.total, tax: q.tax, tahsis: { ...v.tahsis }, tk: { s1: v.tk.s1, s2: v.tk.s2, s3: v.tk.s3 }, tkResult: knTkResult(), events: [] };
  knEvent(a, 'Başvurun alındı', `Konut kredisi başvurusu · ${a.ref}`);
  return a;
}
function knSubmit() {
  const v = state.kn, g = v.agree, btn = document.getElementById('kn-submit');
  if (!btn || v.app || !(g.pre && g.contract && g.kvkk)) return;
  btn.innerHTML = '<span class="spinner"></span> Başvurun gönderiliyor…';
  btn.style.pointerEvents = 'none';
  setTimeout(() => {
    v.app = knMakeApp('review');
    if (state.screen === 'konut-basvuru') {
      knUnwind();
      state.chatSeed = false;
      state.screen = 'konut-takip';
      vmRerender('anim-right');
    }
    knStartReview();
  }, 1300);
}
/* -------------------- Screen 6 — evaluation, ekspertiz status, final approval (application tracking) -------------------- */
const KN_REVIEW = ['Kimlik ve tahsis bilgilerin doğrulanıyor', 'Kredi geçmişin (KKB) inceleniyor', 'Konut, tapu ve TAKBİS bilgileri kontrol ediliyor', 'İlk kredi değerlendirmesi yapılıyor'];
const KN_PHASES = ['Kimlik ve tahsis kontrolü', 'Kredi geçmişi (KKB)', 'Konut, tapu ve TAKBİS', 'İlk kredi değerlendirmesi'];
const KN_REVIEW_MS = [1100, 1500, 1300, 1200];
function knStartReview() {
  const a = state.kn.app;
  if (!a || a.status !== 'review' || a.running) return;
  a.running = true;
  vmRunChecks(a, 'step', KN_REVIEW.length, 'kn-rv-', KN_REVIEW_MS, () => {
    a.running = false;
    if (state.kn.app !== a) return;   // demo was reset meanwhile
    knPreApprove(a);
  }, () => { const el = document.getElementById('kn-phase'); if (el) el.textContent = knPhase(); });
}
/* The bank creates the ekspertiz request itself: valuer assigned, appointment set (no choice for the customer) */
function knNewEks() {
  const slot = knAt(knBizDays(1, 2)[0], '10:30');
  return { stage: 1, ref: vmRef('EKS'), at: knStamp(), slot: knSlotLabel(slot, '10:30'), slotTs: slot.getTime(), seen: false, away: false, fresh: false, reportNo: null, reportAt: null, okAt: null };
}
function knNewIpt() { return { stage: 0, slot: null, slotTs: null, pick: null, pickTs: null, signedAt: null, dask: null, daskInst: 1, harc: null, tslot: null, tslotTs: null, tpick: null, tpickTs: null, tapuAt: null, disbAt: null, disbRef: null }; }
function knPreApprove(a, quiet) {
  a.status = 'pre';
  a.preAt = knStamp();
  knEvent(a, 'İlk kredi değerlendirmen olumlu', `${vmTL(a.loan)} · ${a.term} ay · nihai onay ekspertizden sonra verilir`, 'ok');
  knAddMin(20);
  const e = state.kn.eks = knNewEks();
  knEvent(a, 'Ekspertiz talebin oluşturuldu', `Bankamız talebi değerleme kuruluşuna iletti: ${KN_VALUER.firm}`);
  knEvent(a, 'Ekspertiz randevun belirlendi', `${e.slot} · ${KN_VALUER.expert}`);
  if (quiet) return;
  knRefresh();
  toast('İlk değerlendirmen olumlu, ekspertiz başlatıldı');
}
/* "Later": once the customer has seen the appointment and left, the report arrives — uploaded, approved by the bank —
   and the final credit approval follows. The demo clock moves to those dates. */
function knEksComplete() {
  const v = state.kn, e = v.eks, a = v.app;
  if (!e || e.stage >= 4 || !a) return;
  const slot = new Date(e.slotTs), h = knHome(a.home);
  knSetClock(slot); knAddMin(80);
  knEvent(a, 'Yerinde inceleme yapıldı', `${KN_VALUER.expert} · ${KN_VALUER.firm}`);
  knSetClock(knAt(knAddBiz(slot, 2), '11:00'));
  e.reportNo = knReportNo(); e.reportAt = knStamp();
  knEvent(a, 'Ekspertiz raporun yüklendi', `Ekspertiz değeri ${vmTL(knValue(h))} · ${e.reportNo}`, 'ok');
  knAddMin(150);
  e.okAt = knStamp();
  knEvent(a, 'Ekspertiz raporun bankamızca onaylandı', knEksFit(h, a) ? 'Konut krediye uygun bulundu' : 'Kredi tutarı ekspertiz değerine göre sınırlandı', 'ok');
  knAddMin(40);
  a.status = 'approved';
  a.approvedAt = knStamp();
  a.until = knDay(new Date(knClock().getTime() + 90 * 864e5));
  knEvent(a, 'Nihai kredi onayın verildi', `${vmTL(a.loan)} · ${a.term} ay · aylık ${vmTL(a.pay)}`, 'ok');
  e.stage = 4; e.fresh = true;
  v.ipt = v.ipt || knNewIpt();
}
function knEksFit(h, a) { return a.loan <= knEksMaxLoan(h); }
function knEksMaxLoan(h) { return Math.floor(Math.min(knValue(h), h.price) * knLtvMax() / 100 / 10000) * 10000; }
function knPhase() {
  const a = state.kn.app;
  if (a.status === 'pre') return 'Ekspertiz';
  if (a.status === 'approved') return 'Tamamlandı · nihai onay';
  return KN_PHASES[Math.min(a.step, KN_PHASES.length - 1)];
}
function knStatus() {
  const v = state.kn, a = v.app;
  if (a.status === 'review') return ['Değerlendiriliyor', 'on'];
  if (a.status === 'pre') return ['Ekspertiz sürüyor', 'on'];
  return v.ipt && v.ipt.stage >= 4 ? ['Kullandırıldı', 'ok'] : ['Nihai onay', 'ok'];
}
function knShortSlot(ts) { const d = new Date(ts); return `${d.getDate()} ${VM_AY[d.getMonth()].slice(0, 3)} · ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; }
function KnTrack() {
  const v = state.kn, a = v.app;
  if (!a) return knTrackEmpty();
  if (v.eks && v.eks.stage === 1 && v.eks.seen) knEksComplete();   // re-entry after seeing the appointment
  const h = knHome(a.home), e = v.eks, p = v.ipt, [st, cls] = knStatus();
  const rev = a.status === 'review', pre = a.status === 'pre', appr = a.status === 'approved', done = p && p.stage >= 4;
  const fresh = e && e.fresh; if (fresh) e.fresh = false;
  if (appr) a.finalSeen = true;
  const stages = [
    { t: 'Başvuru', d: vmShortDate(a.at), s: 'done' },
    { t: 'Değer&shy;lendirme', d: rev ? 'Sürüyor' : 'Olumlu', s: rev ? 'on' : 'done' },
    { t: 'Ekspertiz', d: rev ? 'Değerlendirmeden sonra' : appr ? 'Rapor onaylandı' : `Randevu ${knShortSlot(e.slotTs).split(' · ')[0]}`, s: rev ? 'todo' : appr ? 'done' : 'on' },
    { t: 'Nihai onay', d: appr ? vmShortDate(a.approvedAt) : 'Ekspertizden sonra', s: appr ? 'done' : 'todo' },
  ];
  const next = rev ? { ico: VM_ICO.clock, t: 'Değerlendirme sonucunu bekle', d: 'Sonuç bildirim olarak da gelir; gerçek süreçte genellikle 1–2 iş günü sürer.' }
    : pre ? { ico: VM_ICO.clock, t: 'Ekspertiz raporunu bekle', d: 'Rapor bankamıza ulaşıp onaylandığında burada görünür ve nihai onay verilir; senin bir işlem yapman gerekmiyor.' }
    : done ? { ico: VM_ICO.key, t: 'Süreç tamamlandı', d: 'Tapu devri ve ipotek tesisi tamamlandı, kredin satıcıya aktarıldı.', act: 'kn-to-ipt' }
    : { ico: I.bank, t: 'Tapu ve ipotek işlemleri', d: 'Şube randevusu ve sözleşme imzası, DASK, tapu harcı ve tapu randevusu.', act: 'kn-to-ipt' };
  const cta = rev ? '<button class="btn-primary disabled">Değerlendiriliyor…</button>'
    : pre ? '<button class="btn-primary" data-action="kn-to-eks">Ekspertiz Detaylarını Gör</button>'
    : done ? '<button class="btn-primary" data-action="kn-home">Marketplace Konut\'a Dön</button>'
    : '<button class="btn-primary" data-action="kn-to-ipt">Tapu ve İpotek Adımlarına Geç</button>';
  const tr = a.tkResult;
  return `
  <div class="screen ${vmAnim()} vm kn">
    ${vmNav('Başvuru Takibi')}
    <div class="screen-scroll">
      ${knFlowHTML(rev ? 1 : pre ? 2 : done ? 5 : 4)}
      <div class="vm-box kn-ahead">
        <div class="kn-ahead-top"><div><span>Konut kredisi başvurusu</span><b>No ${a.ref}</b></div><span class="vm-pill ${cls}">${st}</span></div>
        <div class="vm-frow"><span>Başvuru tarihi</span><b>${a.at}</b></div>
        <div class="vm-frow"><span>Değerlendirme aşaması</span><b id="kn-phase">${knPhase()}</b></div>
        <div class="vm-frow"><span>${appr ? 'Onaylanan kredi' : 'Talep edilen kredi'}</span><b>${vmTL(a.loan)}</b></div>
      </div>
      <div class="kn-st4">${vmStagesHTML(stages)}</div>
      ${fresh ? `<div class="vm-okbar kn-fresh">${I.check}<span><b>Ekspertiz raporun yüklendi ve onaylandı</b>Değerleme raporu bankamıza iletildi, incelenip onaylandı; nihai kredi onayın verildi.</span></div>` : ''}
      ${rev ? `<div class="vm-box vm-review">
        <div class="vm-review-h"><span class="vm-spin"></span><div><b>İlk kredi değerlendirmesi sürüyor</b><span>Sonuç bildirim olarak da gelir</span></div></div>
        <div class="vm-chk">${KN_REVIEW.map((t, k) => vmChkRowHTML(t, k, a.step, 'kn-rv-')).join('')}</div>
      </div>` : ''}
      ${pre ? `<div class="vm-pre-res kn-appr">
        <span class="vm-pill ok">${I.check}İlk değerlendirme olumlu</span>
        <span class="vm-pre-l">Talep edilen kredi tutarı</span>
        <b>${vmTL(a.loan)}</b>
        <em>Nihai onay, ekspertiz raporu bankamızca onaylandıktan sonra verilir</em>
      </div>
      <div class="vm-box kn-eks-card tap" data-action="kn-to-eks">
        <span class="kn-next-ico">${KN_ICO.clip}</span>
        <div><span>Ekspertiz devam ediyor</span><b>${e.slot}</b><em>${KN_VALUER.firm} · ${KN_VALUER.expert}</em></div>
        <span class="kn-next-chev">${I.chevR}</span>
      </div>` : ''}
      ${appr ? `<div class="vm-sec-t vm-sec-row"><span>Ekspertiz raporu</span><button class="sp-link" data-action="kn-to-eks">Ekspertiz detayı</button></div>
      <div class="vm-box vm-prof kn-eks-sum">
        <div class="vm-frow"><span>Ekspertiz değeri</span><b>${vmTL(knValue(h))}</b></div>
        <div class="vm-frow"><span>Rapor tarihi</span><b>${vmShortDate(e.reportAt)}</b></div>
        <div class="vm-frow"><span>Krediye uygunluk</span><b class="kn-okv">${knEksFit(h, a) ? 'Uygun' : 'Sınırlı uygun'}</b></div>
        <div class="vm-frow"><span>Rapor onay durumu</span><b class="kn-okv">Onaylandı · ${vmShortDate(e.okAt)}</b></div>
        <button class="vm-pt-all" data-action="kn-report">Rapor özetini gör ${I.chevR}</button>
      </div>
      <div class="vm-sec-t">Nihai kredi onayı</div>
      <div class="vm-pre-res kn-appr">
        <span class="vm-pill ok">${I.check}Nihai onay verildi</span>
        <span class="vm-pre-l">Onaylanan kredi tutarı</span>
        <b>${vmTL(a.loan)}</b>
        <em>Onay ${a.until} tarihine kadar geçerli</em>
      </div>
      <div class="vm-box vm-prof kn-final">
        <div class="vm-frow"><span>Kredi vadesi</span><b>${a.term} ay</b></div>
        <div class="vm-frow"><span>Faiz oranı ${vmEx()}</span><b>Aylık %${vmPctStr(KN_RATE.monthly)}</b></div>
        <div class="vm-frow"><span>BSMV</span><b>${a.tax ? `Uygulanır · %${KN_BSMV}` : 'Alınmaz'}</b></div>
        <div class="vm-frow"><span>Aylık taksit</span><b>${vmTL(a.pay)}</b></div>
        <div class="vm-frow"><span>Toplam geri ödeme</span><b>${vmTL(a.total)}</b></div>
        <div class="vm-frow"><span>Nihai onay durumu</span><b class="kn-okv">Onaylandı · ${vmShortDate(a.approvedAt)}</b></div>
      </div>` : ''}
      <div class="vm-box kn-next ${next.act ? 'tap' : ''}" ${next.act ? `data-action="${next.act}"` : ''}>
        <span class="kn-next-ico">${next.ico}</span>
        <div><span>Sonraki adım</span><b>${next.t}</b><em>${next.d}</em></div>
        ${next.act ? `<span class="kn-next-chev">${I.chevR}</span>` : ''}
      </div>
      <div class="vm-sec-t">Başvuru detayları</div>
      ${knMiniHTML(h)}
      <div class="receipt vm-receipt kn-gap">
        <div class="r-row"><span class="r-l">Konut fiyatı</span><span class="r-r">${vmTL(h.price)}</span></div>
        <div class="r-row"><span class="r-l">Peşinat</span><span class="r-r">${vmTL(a.down)}</span></div>
        <div class="r-row hl"><span class="r-l">${appr ? 'Onaylanan kredi' : 'Kredi tutarı'}</span><span class="r-r">${vmTL(a.loan)}</span></div>
        <div class="r-row"><span class="r-l">Vade</span><span class="r-r">${a.term} ay</span></div>
        <div class="r-row"><span class="r-l">Aylık taksit ${vmEx()}</span><span class="r-r">${vmTL(a.pay)}</span></div>
        <div class="r-row"><span class="r-l">Toplam geri ödeme</span><span class="r-r">${vmTL(a.total)}</span></div>
        <div class="r-row"><span class="r-l">İlk taksit</span><span class="r-r">${a.first || 'Kullandırımdan 1 ay sonra'}</span></div>
        <div class="r-row"><span class="r-l">Tahsis bilgileri</span><span class="r-r">${a.tahsis.job} · ${vmTL(a.tahsis.income)}</span></div>
        <div class="r-row"><span class="r-l">TAKBİS</span><span class="r-r">${tr && !tr.manual ? `BSMV ${tr.bsmv} · LTV ${tr.ltv} · ${tr.scope}` : 'Manuel değerlendirme'}</span></div>
      </div>
      <div class="vm-sec-t">Belgeler</div>
      <div class="vm-box vm-docl" id="kn-docs">${knDocsHTML()}</div>
      <div class="vm-sec-t">Bildirimler</div>
      ${knEventsHTML(a)}
      <div class="ru-info-card vm-links">
        <div class="ru-info-row tap" data-action="kn-plan-all"><span class="ru-info-ico">${I.doc}</span><span class="ru-info-k">Kredi ödeme planı</span><span class="ru-info-v">${a.term} taksit</span>${I.chevR}</div>
        <div class="ru-info-row tap" data-action="kn-open" data-id="${h.id}"><span class="ru-info-ico">${I.home}</span><span class="ru-info-k">Konut ilanı</span><span class="ru-info-v">İlan no ${knNo(h)}</span>${I.chevR}</div>
      </div>
      ${knDemoHTML(false, pre ? (e.seen ? 'Ekspertiz raporu bu ekrana bir sonraki girişinde görünür.' : 'Ekspertiz detaylarını açıp bu ekrana geri döndüğünde rapor yüklenmiş ve onaylanmış görünür.') : '')}
    </div>
    <div class="screen-cta">${cta}</div>
  </div>`;
}
function knEventsHTML(a) {
  const ico = { ok: I.check, warn: I.info, info: I.bell };
  return `<div class="vm-box kn-evs">${a.events.map(ev => `<div class="kn-ev ${ev.kind}"><i>${ico[ev.kind] || I.bell}</i><div><b>${ev.t}</b><span>${ev.d}</span><em>${ev.at}</em></div></div>`).join('')}</div>`;
}
function knDemoHTML(adv, tip) {
  return `<div class="vm-demo">
    <div class="vm-demo-h">${I.info}<span>Demo kontrolleri · ${tip || 'Gerçek süreçte bu adımlar değerleme kuruluşu, şube ve tapu müdürlüğünden gelen bilgilerle güncellenir.'}</span></div>
    <div class="vm-demo-btns">
      ${adv ? '<button class="vm-demo-btn main" data-action="kn-adv">Sonraki adıma geç</button>' : ''}
      <button class="vm-demo-btn" data-action="kn-reset">Demoyu sıfırla</button>
    </div>
  </div>`;
}
function knTrackEmpty() {
  return `
  <div class="screen ${vmAnim()} vm kn">
    ${vmNav('Başvuru Takibi')}
    <div class="screen-scroll">
      <div class="vm-empty big">${I.home}<b>Devam eden konut kredisi başvurun yok</b><span>Bir konut seçip kredi başvurunu tamamladığında değerlendirme, ekspertiz ve tapu adımlarını buradan takip edebilirsin.</span>
        <button class="btn-primary" data-action="kn-home">Konut Ara</button></div>
    </div>
  </div>`;
}

/* -------------------- appointments (business days, offered slots) -------------------- */
const KN_BRANCH_TIMES = ['09:30', '11:00', '14:30'];
const KN_TAPU_TIMES = ['10:30', '13:00', '15:30'];
function knBizDays(n, from) {
  const out = [], d = knClock();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + from);
  while (out.length < n) { if (d.getDay() % 6) out.push(new Date(d)); d.setDate(d.getDate() + 1); }
  return out;
}
function knSlotLabel(d, t) { return `${KN_GUN[d.getDay()]}, ${d.getDate()} ${VM_AY[d.getMonth()]} · ${t}`; }
function knSlotsHTML(kind, pick, from, times) {
  return `<div class="kn-slots">${knBizDays(3, from).map(d => `<div class="kn-day"><b>${KN_GUN[d.getDay()]}</b><span>${d.getDate()} ${VM_AY[d.getMonth()].slice(0, 3)}</span>
    ${times.map(t => { const val = knSlotLabel(d, t); return `<button class="kn-slot ${pick === val ? 'on' : ''}" data-action="kn-slot" data-kind="${kind}" data-v="${val}" data-ts="${knAt(d, t).getTime()}">${t}</button>`; }).join('')}</div>`).join('')}</div>`;
}
function knPickedHTML(val) {
  return val ? `${KN_ICO.cal}<span>Seçilen randevu <b>${val}</b></span>` : `${KN_ICO.cal}<span>Uygun gün ve saati seç</span>`;
}
function knPickSlot(kind, val, ts) {
  const v = state.kn, o = v.ipt, k = kind === 'tapu' ? 'tpick' : 'pick';
  if (!o) return;
  o[k] = val;
  o[k + 'Ts'] = ts;
  document.querySelectorAll(`.kn-slot[data-kind="${kind}"]`).forEach(b => b.classList.toggle('on', b.dataset.v === val));
  const sel = document.getElementById('kn-pick-' + kind); if (sel) { sel.innerHTML = knPickedHTML(val); sel.classList.add('on'); }
  const cta = document.getElementById('kn-cta'); if (cta) cta.classList.toggle('disabled', !knCtaReady());
}
function knCtaReady() {
  const p = state.kn.ipt;
  if (state.screen === 'konut-ipotek') return p.stage === 0 ? !!p.pick : p.stage === 1 ? !!(p.dask && p.harc && p.tpick) : true;
  return true;
}

/* -------------------- Screen 7 — ekspertiz (started by the bank) -------------------- */
function knEksAway() {   // render hook: leaving the ekspertiz screen after seeing the appointment
  const e = state.kn.eks;
  if (e && e.stage === 1 && e.seen && state.screen !== 'konut-ekspertiz') e.away = true;
}
function KnEks() {
  const v = state.kn, a = v.app;
  if (!a || a.status === 'review' || !v.eks) { state.screen = 'konut-takip'; return KnTrack(); }
  const e = v.eks;
  if (e.stage === 1 && e.away) knEksComplete();   // back on this screen later: the report has arrived
  e.seen = true;
  const h = knHome(a.home), s = knSeller(h), done = e.stage >= 4;
  const fresh = e.fresh; if (fresh) e.fresh = false;
  const who = s.kind === 'Ev sahibi' ? `${s.name} · ev sahibi` : `${s.agent} · ${s.name}`;
  const steps = [
    { t: 'Ekspertiz talebi', d: `Bankamız tarafından oluşturuldu · ${vmShortDate(e.at)}`, s: 'done' },
    { t: 'Değerleme kuruluşu ve randevu', d: `${KN_VALUER.firm} · ${e.slot}`, s: 'done' },
    { t: 'Yerinde inceleme', d: done ? 'Konut incelendi; ölçüm ve fotoğraflar alındı' : 'Uzman konutu randevu günü yerinde inceleyecek', s: done ? 'done' : 'active' },
    { t: 'Kayıt kontrolü ve piyasa değeri', d: done ? 'Tapu, imar ve iskân kayıtları kontrol edildi; emsallerle değer belirlendi' : 'Tapu, imar ve iskân kayıtları; bölgedeki emsal satışlar', s: done ? 'done' : 'todo' },
    { t: 'Krediye uygunluk ve rapor', d: done ? `Rapor bankamıza iletildi · ${e.reportNo}` : 'Rapor hazırlanıp bankamıza iletilir', s: done ? 'done' : 'todo' },
    { t: 'Bankamızın onayı', d: done ? `Rapor onaylandı · ${vmShortDate(e.okAt)}` : 'Rapor incelenip onaylanır', s: done ? 'done' : 'todo' },
  ];
  return `
  <div class="screen ${vmAnim()} vm kn">
    ${vmNav('Ekspertiz')}
    <div class="screen-scroll">
      ${knFlowHTML(done ? 4 : 2)}
      <div class="vm-box kn-ahead">
        <div class="kn-ahead-top"><div><span>Ekspertiz talebi</span><b>No ${e.ref}</b></div><span class="vm-pill ${done ? 'ok' : 'on'}">${done ? 'Tamamlandı' : 'Devam ediyor'}</span></div>
        <div class="vm-frow"><span>Talebi oluşturan</span><b>Yapı Kredi · ${vmShortDate(e.at)}</b></div>
        <div class="vm-frow"><span>Konut</span><b>${h.hood}, ${h.district}</b></div>
        <div class="vm-frow"><span>Ekspertiz ücreti</span><b>${vmTL(KN_FEES.expertise)} · hesabından tahsil edildi</b></div>
      </div>
      ${done ? `<div class="vm-okbar ${fresh ? 'kn-fresh' : ''}">${I.check}<span><b>Ekspertiz tamamlandı</b>Raporun yüklendi ve bankamız tarafından onaylandı; nihai kredi onayın verildi.</span></div>`
        : `<div class="vm-infobar">${KN_ICO.clip}<span><b>Ekspertizin devam ediyor.</b> Bankamız ekspertiz talebini değerleme kuruluşuna iletti ve randevunu belirledi; senin bir işlem yapman gerekmiyor.</span></div>`}
      <div class="vm-sec-t">Randevu</div>
      <div class="vm-box">
        <div class="vm-deliv-top"><span class="vm-deliv-ico">${KN_ICO.cal}</span><div><span>${done ? 'İnceleme yapıldı' : 'Ekspertiz randevun'}</span><b>${e.slot}</b></div></div>
        <div class="vm-deliv-pt">${I.pin}<span><b>İnceleme adresi</b>${h.hood}, ${h.district} / ${h.city}</span></div>
        <div class="vm-deliv-pt">${KN_ICO.person}<span><b>Konutta bulunacak kişi</b>${who}</span></div>
        ${done ? '' : '<div class="vm-hint">Randevu bankamız ve değerleme kuruluşu tarafından belirlendi. Değişiklik gerekirse değerleme uzmanı seninle ve satıcıyla iletişime geçer.</div>'}
      </div>
      <div class="vm-sec-t">Atanan değerleme kuruluşu</div>
      <div class="vm-box">
        <div class="vm-dealer"><div class="vm-dealer-ico">${KN_ICO.clip}</div><div class="vm-dealer-mid"><b>${KN_VALUER.firm}</b><span>${KN_VALUER.kind}</span></div></div>
        <div class="vm-deliv-pt">${KN_ICO.person}<span><b>${KN_VALUER.expert}</b>${KN_VALUER.title}</span></div>
        <div class="vm-dealer-btns"><button data-action="toast" data-msg="Arama prototipte aktif değil">${VM_ICO.phone}Uzmanı ara</button><button data-action="toast" data-msg="Mesajlaşma prototipte aktif değil">${I.mail}Mesaj gönder</button></div>
      </div>
      <div class="vm-sec-t">Değerleme süreci</div>
      <div class="stepper vm-stepper">${steps.map((x, i) => `
        <div class="step ${x.s}">
          <div class="step-dot">${x.s === 'done' ? I.check : ''}</div>
          ${i < steps.length - 1 ? '<div class="step-line"></div>' : ''}
          <div class="step-body"><div class="step-t">${x.t}</div><div class="step-d">${x.d}</div></div>
        </div>`).join('')}</div>
      <div class="vm-sec-t">Rapor durumu</div>
      <div class="vm-box kn-rep">
        <div class="kn-rep-top"><span class="vm-docl-ico">${I.doc}</span><div><b>Ekspertiz raporu</b><span>${done ? `${e.reportNo} · yüklendi ${vmShortDate(e.reportAt)}` : 'Yerinde incelemeden sonra hazırlanır'}</span></div>
          <span class="vm-pill sm ${done ? 'ok' : 'kn-later'}">${done ? 'Onaylandı' : 'Bekleniyor'}</span></div>
      </div>
      ${done ? `
      <div class="vm-sec-t">Değerleme sonucu</div>
      ${knValHTML(h, a)}
      <div class="vm-sec-t vm-sec-row"><span>Rapor özeti</span><button class="sp-link" data-action="kn-report">Tamamını gör</button></div>
      <div class="receipt vm-receipt">${knReportRows(h, e).slice(4, 10).map(([k, val]) => `<div class="r-row"><span class="r-l">${k}</span><span class="r-r">${val}</span></div>`).join('')}</div>` : ''}
      ${knDemoHTML(false, done ? '' : 'Bu ekrandan çıkıp başvuru takibine döndüğünde ekspertiz raporu yüklenmiş ve bankamızca onaylanmış görünür.')}
    </div>
    <div class="screen-cta"><button class="btn-primary" data-action="kn-open-track">Başvuru Takibine Dön</button></div>
  </div>`;
}
function knValHTML(h, a) {
  const val = knValue(h), diff = Math.round((val / h.price - 1) * 100), maxL = knEksMaxLoan(h), ok = a.loan <= maxL;
  return `<div class="vm-box kn-val">
    <div class="kn-val-top"><span>Ekspertiz değeri</span><b>${vmTL(val)}</b>${diff === 0 ? '<em class="kn-vs eq">Satış fiyatıyla aynı</em>' : diff > 0 ? `<em class="kn-vs good">Satış fiyatının %${diff} üzerinde</em>` : `<em class="kn-vs high">Satış fiyatının %${-diff} altında</em>`}</div>
    <div class="kn-val-grid">
      <div><span>Satış fiyatı</span><b>${vmTL(h.price)}</b></div>
      <div><span>Kredi tutarı</span><b>${vmTL(a.loan)}</b></div>
      <div><span>Kredi / ekspertiz değeri</span><b>%${vmPct(a.loan, val)}</b></div>
      <div><span>Krediye uygunluk</span><b class="kn-okv">${ok ? 'Uygun' : 'Sınırlı uygun'}</b></div>
    </div>
    <div class="kn-cap-v ${ok ? 'ok' : 'edge'}">${ok ? I.check : I.info}<span>${ok ? `<b>Kredi tutarın değişmedi.</b> Kredi, değerin %${knLtvMax()} sınırı içinde kalıyor.` : `<b>Kredi tutarın en fazla ${vmTL(maxL)} olabilir.</b> Fark peşinata eklenir.`}</span></div>
  </div>`;
}
function knReportRows(h, e) {
  const det = h.type === 'Villa' || h.type === 'Müstakil ev';
  return [
    ['Rapor no', e.reportNo], ['Rapor tarihi', vmShortDate(e.reportAt)], ['Değerleme kuruluşu', KN_VALUER.firm], ['Değerleme yöntemi', 'Emsal karşılaştırma'],
    ['Tapu niteliği', det ? 'Müstakil konut · arsa üzerinde' : 'Kat mülkiyeti · mesken'],
    ['Yapı ruhsatı ve iskân', 'Mevcut'],
    ['İmar durumu', 'Konut alanı'],
    ['Ölçülen brüt alan', `${h.gross + 1} m² · tapuda ${h.gross} m²`],
    ['Takyidat', 'Yok · ipotek tesisine engel bulunmuyor'],
    ['Bölge emsal m² fiyatı', `${vmTL(KN_AVG_M2[h.district])}/m²`],
    ['Yapı kalitesi', `Betonarme · ${knAge(h) > 15 ? 'orta' : 'iyi'}`],
    ['Ekspertiz değeri', vmTL(knValue(h))],
  ];
}
function knReportSheet() {
  const v = state.kn, e = v.eks;
  if (!e || e.stage < 4) return;
  const h = knHome(v.app.home);
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>Ekspertiz raporu özeti</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="receipt vm-sh-receipt kn-sh-scroll">${knReportRows(h, e).map(([k, val]) => `<div class="r-row"><span class="r-l">${k}</span><span class="r-r">${val}</span></div>`).join('')}
      <div class="r-row"><span class="r-l">Krediye uygunluk</span><span class="r-r">${knEksFit(h, v.app) ? 'Uygun' : 'Sınırlı uygun'}</span></div>
      <div class="r-row"><span class="r-l">Rapor onay durumu</span><span class="r-r">Bankamızca onaylandı · ${vmShortDate(e.okAt)}</span></div></div>
    <div class="vm-cmp-note">Örnek rapor özetidir. Gerçek süreçte rapor, SPK lisanslı değerleme kuruluşu tarafından hazırlanır ve bankaya elektronik olarak iletilir.</div>
    <button class="sheet-btn ghost" data-action="toast" data-msg="Rapor paylaşımı prototipte aktif değil">Raporu Paylaş</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function knBusyBtn(id, text) {
  const b = document.getElementById(id);
  if (!b || b.dataset.busy) return null;
  b.dataset.busy = '1';
  b.style.pointerEvents = 'none';
  b.innerHTML = `<span class="spinner"></span> ${text}`;
  return b;
}
function knReportNo() { return `DR-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`; }

/* -------------------- Screen 8 — branch disbursement & ipotek -------------------- */
function KnIpotek() {
  const v = state.kn, a = v.app;
  if (!a || a.status !== 'approved') { state.screen = 'konut-takip'; return KnTrack(); }
  if (!v.eks || v.eks.stage < 4 || !v.ipt) { state.screen = 'konut-takip'; return KnTrack(); }
  const p = v.ipt, h = knHome(a.home), st = p.stage, done = st >= 4, harc = Math.round(h.price * KN_FEES.deedPct / 100), ready = p.dask && p.harc;
  const pill = ['Sözleşme imzası bekleniyor', 'Tapu hazırlığı', 'Tapu randevusu planlandı', 'Kullandırılıyor'][st];
  const sg = i => st > i ? 'done' : st < i ? 'todo' : (i === 0 && !p.slot) || i === 1 ? 'wait' : 'on';
  const stages = [
    { t: 'Şube', d: st > 0 ? 'İmzalandı' : p.slot ? 'Randevu planlandı' : 'Randevu seç', s: sg(0) },
    { t: 'Tapu hazırlığı', d: st > 1 ? 'Tamamlandı' : st === 1 ? 'DASK, harç, randevu' : 'İmzadan sonra', s: sg(1) },
    { t: 'Tapu ve ipotek', d: st > 2 ? 'Tamamlandı' : st === 2 ? p.tslot.split(' · ')[0] : 'Randevu günü', s: sg(2) },
    { t: 'Kullan&shy;dırım', d: st > 3 ? 'Satıcıya ödendi' : st === 3 ? 'Aktarılıyor' : 'İpotekten sonra', s: sg(3) },
  ];
  const todos = [
    { t: 'Şube randevusu', d: p.slot || 'Sözleşme imzası için gün ve saat seç', s: p.slot ? 'done' : 'act' },
    { t: 'Kredi sözleşmesi imzası', d: p.signedAt ? `Şubede imzalandı · ${vmShortDate(p.signedAt)}` : p.slot ? 'Randevu günü şubede imzalanır' : 'Randevudan sonra', s: p.signedAt ? 'done' : p.slot ? 'wait' : 'todo' },
    { t: 'DASK poliçesi', d: p.dask ? `Allianz Türkiye · ${p.dask.no}` : `Zorunlu deprem sigortası · ${vmTL(KN_FEES.dask)}`, s: p.dask ? 'done' : st >= 1 ? 'act' : 'todo', act: 'kn-dask', btn: 'Düzenle' },
    { t: 'Tapu harcı', d: p.harc ? `Ödendi · ${vmTL(p.harc.amount)}` : `Alıcı payı · ${vmTL(harc)}`, s: p.harc ? 'done' : st >= 1 ? 'act' : 'todo', act: 'kn-harc', btn: 'Öde' },
    { t: 'Tapu randevusu', d: p.tslot || (st >= 1 && ready ? 'Gün ve saat seç' : 'DASK ve harçtan sonra'), s: p.tslot ? 'done' : st >= 1 && ready ? 'act' : 'todo' },
    { t: 'Tapu devri ve ipotek tesisi', d: p.tapuAt ? `Tamamlandı · ${vmShortDate(p.tapuAt)}` : st === 2 ? 'Randevu günü tapu müdürlüğünde' : 'Tapu randevusunda', s: p.tapuAt ? 'done' : st === 2 ? 'wait' : 'todo' },
    { t: 'Kredi kullandırımı', d: p.disbAt ? `${vmTL(a.loan)} satıcıya aktarıldı` : st === 3 ? 'Satıcının hesabına aktarılıyor' : 'İpotek tesisinden sonra', s: p.disbAt ? 'done' : st === 3 ? 'run' : 'todo' },
  ];
  const doneN = todos.filter(x => x.s === 'done').length;
  const need = [
    ['T.C. kimlik kartı', 'Şube ve tapu randevusunda yanında olmalı', 'bring'],
    ['Vesikalık fotoğraf (2 adet)', 'Tapu işlemi için, son 6 ay içinde çekilmiş', 'bring'],
    ['DASK poliçesi', p.dask ? `Poliçe no ${p.dask.no}` : 'Tapu randevusundan önce düzenlenmeli', p.dask ? 'ok' : 'miss'],
    ['Tapu harcı ödemesi', p.harc ? `Dekont no ${p.harc.ref}` : 'Tapu randevusundan önce ödenmeli', p.harc ? 'ok' : 'miss'],
    ['Tapu fotokopisi', 'Satıcı tarafından yüklendi · sistemde mevcut', 'ok'],
    ['Ekspertiz raporu', `Bankamızca onaylandı · ${v.eks.reportNo}`, 'ok'],
  ];
  const needPill = s => s === 'ok' ? `<span class="vm-pill ok sm">${I.check}Hazır</span>` : s === 'miss' ? '<span class="vm-pill wait sm">Gerekli</span>' : '<span class="vm-pill sm kn-later">Yanında getir</span>';
  const cta = st === 0 && !p.slot ? `<button class="btn-primary ${p.pick ? '' : 'disabled'}" id="kn-cta" data-action="kn-ipt-book">Şube Randevusunu Onayla</button>`
    : st === 1 ? `<button class="btn-primary ${knCtaReady() ? '' : 'disabled'}" id="kn-cta" data-action="kn-tapu-book">Tapu Randevusunu Onayla</button>`
    : done ? '<button class="btn-primary" data-action="kn-home">Marketplace Konut\'a Dön</button>' : '';
  return `
  <div class="screen ${vmAnim()} vm kn">
    ${vmNav('Kullandırım ve İpotek')}
    <div class="screen-scroll">
      ${knFlowHTML(done ? 5 : 4)}
      <div class="vm-pre-res kn-ipt-hero">
        <span class="vm-pill ${done ? 'ok' : 'kn-pill-nv'}">${done ? I.check + 'Kullandırıldı' : pill}</span>
        <span class="vm-pre-l">Onaylanan kredi tutarı</span>
        <b>${vmTL(a.loan)}</b>
        <em>${a.term} ay · aylık ${vmTL(a.pay)} · ${done ? `ilk taksit ${a.first}` : 'tapuda ipotek tesisinden sonra satıcıya ödenir'}</em>
        <span class="kn-hero-note">${I.check}Nihai kredi onayı · ${vmShortDate(a.approvedAt)}</span>
      </div>
      ${done ? `<div class="kn-done" role="status">
        <span class="kn-done-ico">${VM_ICO.key}</span>
        <b>Süreç tamamlandı, yeni evin hayırlı olsun!</b>
        <span>Tapu devri ve ipotek tesisi tamamlandı; ${vmTL(a.loan)} kredin satıcının hesabına aktarıldı. Tapu kaydını e-Devlet üzerinden görüntüleyebilirsin.</span>
      </div>` : ''}
      <div class="kn-st4">${vmStagesHTML(stages)}</div>
      <div class="vm-sec-t vm-sec-row"><span>Tamamlanacak işlemler</span><span class="vm-sec-ref">${doneN}/${todos.length} tamamlandı</span></div>
      <div class="vm-box kn-todo">${todos.map(x => `<div class="kn-td ${x.s}"><i>${x.s === 'done' ? I.check : x.s === 'run' ? '<span class="vm-spin"></span>' : x.s === 'wait' ? VM_ICO.clock : ''}</i><div><b>${x.t}</b><span>${x.d}</span></div>${x.s === 'act' && x.act ? `<button class="kn-td-btn" data-action="${x.act}">${x.btn}</button>` : ''}</div>`).join('')}</div>
      <div class="vm-sec-t">Şube</div>
      <div class="vm-box">
        <div class="vm-dealer"><div class="vm-dealer-ico">${I.bank}</div><div class="vm-dealer-mid"><b>${KN_BRANCH.name}</b><span>${KN_BRANCH.district} / ${KN_BRANCH.city} · Bireysel krediler</span></div></div>
        ${st === 0 && !p.slot ? `<div class="vm-adv-t">Sözleşme imzası için randevu seç</div>
        ${knSlotsHTML('branch', p.pick, 1, KN_BRANCH_TIMES)}
        <div class="kn-picked ${p.pick ? 'on' : ''}" id="kn-pick-branch">${knPickedHTML(p.pick)}</div>`
        : `<div class="vm-deliv-pt">${KN_ICO.pen}<span><b>${p.signedAt ? 'Kredi sözleşmesi imzalandı' : 'Şube randevun'}</b>${p.signedAt ? vmShortDate(p.signedAt) : p.slot}</span></div>`}
        <div class="vm-dealer-btns"><button data-action="toast" data-msg="Yol tarifi prototipte aktif değil">${VM_ICO.route}Yol tarifi</button><button data-action="toast" data-msg="Arama prototipte aktif değil">${VM_ICO.phone}Şubeyi ara</button></div>
      </div>
      ${st >= 1 ? `<div class="vm-sec-t">Tapu randevusu</div>
      <div class="vm-box">
        <div class="vm-dealer"><div class="vm-dealer-ico">${KN_ICO.deed}</div><div class="vm-dealer-mid"><b>${h.district} Tapu Müdürlüğü</b><span>Satış ve ipotek aynı randevuda tescil edilir</span></div></div>
        ${st === 1 ? (ready ? `<div class="vm-adv-t">Tapu işlemi için randevu seç</div>
        ${knSlotsHTML('tapu', p.tpick, 2, KN_TAPU_TIMES)}
        <div class="kn-picked ${p.tpick ? 'on' : ''}" id="kn-pick-tapu">${knPickedHTML(p.tpick)}</div>`
        : `<div class="kn-lock">${I.lock}<span>DASK poliçesi ve tapu harcı tamamlanınca randevu seçebilirsin.</span></div>`)
        : `<div class="vm-deliv-pt">${KN_ICO.cal}<span><b>${p.tapuAt ? 'Tapu işlemi tamamlandı' : 'Randevun'}</b>${p.tapuAt ? vmShortDate(p.tapuAt) : p.tslot}</span></div>`}
        <div class="vm-hint">Randevuya alıcı ve satıcı katılır; ipotek, bankamız tarafından elektronik ortamda tesis edilir.</div>
      </div>` : ''}
      <div class="vm-sec-t">Gerekli belgeler</div>
      <div class="vm-box vm-docl">${need.map(([t, d, s]) => `<div><span class="vm-docl-ico">${I.doc}</span><div><b>${t}</b><span>${d}</span></div>${needPill(s)}</div>`).join('')}</div>
      <div class="vm-sec-t">İpotek ve kullandırım</div>
      <div class="vm-box kn-rep">
        <div class="kn-rep-top"><span class="vm-docl-ico">${KN_ICO.deed}</span><div><b>İpotek tesis durumu</b><span>${p.tapuAt ? `Tesis edildi · ${vmShortDate(p.tapuAt)}` : 'Tapu randevusunda tesis edilecek'}</span></div><span class="vm-pill sm ${p.tapuAt ? 'ok' : 'wait'}">${p.tapuAt ? 'Tesis edildi' : 'Bekleniyor'}</span></div>
        <div class="vm-frow"><span>Lehine</span><b>Yapı Kredi Bankası A.Ş.</b></div>
        <div class="vm-frow"><span>Derece</span><b>1. derece</b></div>
        <div class="vm-frow"><span>İpotek tutarı ${vmEx()}</span><b>${vmTL(a.loan)}</b></div>
        <div class="vm-frow"><span>Taşınmaz</span><b>${h.hood}, ${h.district}</b></div>
      </div>
      <div class="vm-box kn-rep">
        <div class="kn-rep-top"><span class="vm-docl-ico">${I.transfer}</span><div><b>Kredi kullandırımı</b><span>${p.disbAt ? `Satıcıya aktarıldı · ${vmShortDate(p.disbAt)}` : st === 3 ? 'Satıcının hesabına aktarılıyor' : 'İpotek tesisinden sonra satıcıya ödenir'}</span></div><span class="vm-pill sm ${p.disbAt ? 'ok' : st === 3 ? 'on' : 'kn-later'}">${p.disbAt ? 'Ödendi' : st === 3 ? 'Aktarılıyor' : 'Bekleniyor'}</span></div>
        <div class="vm-frow"><span>Tutar</span><b>${vmTL(a.loan)}</b></div>
        <div class="vm-frow"><span>Alıcı</span><b>Konut satıcısı (tapu maliki)</b></div>
        <div class="vm-frow"><span>İlk taksit</span><b>${a.first || 'Kullandırımdan 1 ay sonra'}</b></div>
        ${p.disbAt ? `<button class="vm-pt-all" data-action="kn-disb">Kullandırım dekontunu gör ${I.chevR}</button>` : ''}
      </div>
      <div class="ru-info-card vm-links kn-gap">
        <div class="ru-info-row tap" data-action="kn-plan-all"><span class="ru-info-ico">${I.doc}</span><span class="ru-info-k">Kredi ödeme planı</span><span class="ru-info-v">${a.term} taksit</span>${I.chevR}</div>
        <div class="ru-info-row tap" data-action="kn-report"><span class="ru-info-ico">${KN_ICO.clip}</span><span class="ru-info-k">Ekspertiz raporu</span><span class="ru-info-v">${v.eks.reportNo}</span>${I.chevR}</div>
        <div class="ru-info-row tap" data-action="kn-open-track"><span class="ru-info-ico">${I.bell}</span><span class="ru-info-k">Başvuru takibi</span><span class="ru-info-v">No ${a.ref}</span>${I.chevR}</div>
      </div>
      ${knDemoHTML((st === 0 && !!p.slot) || st === 2)}
    </div>
    ${cta ? `<div class="screen-cta">${cta}</div>` : ''}
  </div>`;
}
function knIptBook() {
  const v = state.kn, p = v.ipt;
  if (!p || p.stage !== 0 || p.slot || !p.pick || !knBusyBtn('kn-cta', 'Randevu oluşturuluyor…')) return;
  setTimeout(() => {
    if (state.kn.ipt !== p) return;
    p.slot = p.pick; p.slotTs = p.pickTs;
    knEvent(v.app, 'Şube randevun oluşturuldu', `${KN_BRANCH.name} · ${p.slot}`);
    knRefresh();
    toast('Şube randevun oluşturuldu');
  }, 1100);
}
function knTapuBook() {
  const v = state.kn, p = v.ipt;
  if (!p || p.stage !== 1 || !p.dask || !p.harc || !p.tpick || !knBusyBtn('kn-cta', 'Randevu oluşturuluyor…')) return;
  setTimeout(() => {
    if (state.kn.ipt !== p) return;
    p.tslot = p.tpick; p.tslotTs = p.tpickTs; p.stage = 2;
    knEvent(v.app, 'Tapu randevun oluşturuldu', `${knHome(v.app.home).district} Tapu Müdürlüğü · ${p.tslot}`);
    knRefresh();
    toast('Tapu randevun oluşturuldu');
  }, 1200);
}
function knDaskSheet() {
  const v = state.kn, p = v.ipt;
  if (!p || p.dask || p.stage < 1) return;
  const h = knHome(v.app.home);
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-amount-label">DASK primi · yıllık</div>
    <div class="sheet-amount">${vmTL(KN_FEES.dask)}</div>
    <div class="sheet-pay-row"><span>Allianz Türkiye · DASK</span><span class="spr-r">Worldcard **** 3333</span></div>
    <div class="vm-adv-t">Taksit</div>
    <div class="vm-pcts kn-insts" id="kn-dask-inst">${knDaskInstHTML()}</div>
    <div class="vm-sheet-note kn-sh-note">${I.info}<span>${h.hood}, ${h.district} adresindeki konut için 1 yıllık poliçe düzenlenir. DASK poliçesi tapu işleminden önce zorunludur.</span></div>
    <button class="sheet-btn" id="kn-dask-ok" data-action="kn-dask-approve">${I.faceid} Yapı Kredi Mobil ile Onayla</button>
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function knDaskInstHTML() {
  const n = state.kn.ipt.daskInst;
  return [1, 2, 3].map(x => `<button class="vm-pct ${n === x ? 'on' : ''}" data-action="kn-dask-inst" data-n="${x}">${x === 1 ? 'Tek Çekim' : x + ' Taksit'}</button>`).join('');
}
function knDaskInst(n) {
  const p = state.kn.ipt;
  if (!p) return;
  p.daskInst = n;
  const el = document.getElementById('kn-dask-inst'); if (el) el.innerHTML = knDaskInstHTML();
}
function knDaskApprove() {
  const v = state.kn, p = v.ipt;
  if (!p || !knBusyBtn('kn-dask-ok', 'Poliçe düzenleniyor…')) return;
  setTimeout(() => {
    if (state.kn.ipt !== p) return closeSheet();
    knAddMin(15);
    p.dask = { no: vmRef('DSK'), at: knStamp(), inst: p.daskInst };
    knEvent(v.app, 'DASK poliçen düzenlendi', `Allianz Türkiye · ${p.dask.no}`, 'ok');
    closeSheet();
    knRefresh();
    toast('DASK poliçen düzenlendi');
  }, 1500);
}
function knHarcSheet() {
  const v = state.kn, p = v.ipt;
  if (!p || p.harc || p.stage < 1) return;
  const h = knHome(v.app.home), amt = Math.round(h.price * KN_FEES.deedPct / 100);
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-amount-label">Tapu harcı · alıcı payı</div>
    <div class="sheet-amount">${vmTL(amt)}</div>
    <div class="sheet-pay-row"><span>${h.district} Tapu Müdürlüğü</span><span class="spr-r">Vadesiz TL Hesabım</span></div>
    <div class="vm-sheet-note">${I.info}<span>Harç, ${vmTL(h.price)} satış bedeli üzerinden hesaplanır; satıcı payını satıcı ayrıca öder. Ödemen tapu müdürlüğüne elektronik olarak iletilir.</span></div>
    <button class="sheet-btn" id="kn-harc-ok" data-action="kn-harc-approve">${I.faceid} Yapı Kredi Mobil ile Onayla</button>
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function knHarcApprove() {
  const v = state.kn, p = v.ipt;
  if (!p || !knBusyBtn('kn-harc-ok', 'Harç ödeniyor…')) return;
  setTimeout(() => {
    if (state.kn.ipt !== p) return closeSheet();
    const h = knHome(v.app.home);
    knAddMin(15);
    p.harc = { ref: vmRef('HRC'), at: knStamp(), amount: Math.round(h.price * KN_FEES.deedPct / 100) };
    knEvent(v.app, 'Tapu harcın ödendi', `${vmTL(p.harc.amount)} · dekont ${p.harc.ref}`, 'ok');
    closeSheet();
    knRefresh();
    toast('Tapu harcın ödendi');
  }, 1500);
}
function knIptAdvance() {
  const v = state.kn, p = v.ipt, a = v.app;
  if (!p) return;
  if (p.stage === 0 && p.slot) {
    knSetClock(new Date(p.slotTs)); knAddMin(40);   // the demo moves to the branch appointment
    p.stage = 1; p.signedAt = knStamp();
    knEvent(a, 'Kredi sözleşmen imzalandı', KN_BRANCH.name, 'ok');
    knRefresh();
    return toast('Kredi sözleşmen şubede imzalandı');
  }
  if (p.stage === 2) {
    knSetClock(new Date(p.tslotTs)); knAddMin(50);   // the demo moves to the tapu appointment
    p.stage = 3; p.tapuAt = knStamp();
    knEvent(a, 'Tapu devri yapıldı, ipotek tesis edildi', `${knHome(a.home).district} Tapu Müdürlüğü`, 'ok');
    knRefresh();
    toast('Tapu devri yapıldı, ipotek tesis edildi');
    setTimeout(() => knIptFinish(p), 2600);
  }
}
function knIptFinish(p, quiet) {
  const v = state.kn, a = v.app;
  if (v.ipt !== p || p.stage !== 3) return;   // demo was reset meanwhile
  knAddMin(70);
  p.stage = 4; p.disbAt = knStamp(); p.disbRef = vmRef('KLD');
  const c = knClock();
  a.firstTs = new Date(c.getFullYear(), c.getMonth() + 1, Math.min(c.getDate(), 28)).getTime();
  a.first = knDay(new Date(a.firstTs));
  knEvent(a, 'Kredin kullandırıldı', `${vmTL(a.loan)} satıcının hesabına aktarıldı`, 'ok');
  knEvent(a, 'Süreç tamamlandı', 'Yeni evin hayırlı olsun!', 'ok');
  if (quiet) return;
  if (state.screen === 'konut-ipotek') { closeSheet(); return go('konut-tamam'); }   // success screen
  knRefresh();
  toast('Kredin kullandırıldı, süreç tamamlandı');
}
function knAdvance() { if (state.screen === 'konut-ipotek') knIptAdvance(); }
function knDisbSheet() {
  const v = state.kn, p = v.ipt;
  if (!p || !p.disbAt) return;
  const a = v.app, h = knHome(a.home);
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>Kullandırım dekontu</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="vm-sh-head"><span class="vm-pill ok">${I.check}Satıcıya ödendi</span><b>${vmTL(a.loan)}</b><span>${knTitle(h)} konut kredisi kullandırımı</span></div>
    <div class="receipt vm-sh-receipt">
      <div class="r-row"><span class="r-l">Alıcı</span><span class="r-r">Konut satıcısı (tapu maliki)</span></div>
      <div class="r-row"><span class="r-l">Alıcı IBAN</span><span class="r-r">TR•• •••• •••• •••• 7716</span></div>
      <div class="r-row"><span class="r-l">Taşınmaz</span><span class="r-r">${h.hood}, ${h.district} / ${h.city}</span></div>
      <div class="r-row"><span class="r-l">Kredi başvuru no</span><span class="r-r">${a.ref}</span></div>
      <div class="r-row"><span class="r-l">İşlem tarihi</span><span class="r-r">${p.disbAt}</span></div>
      <div class="r-row"><span class="r-l">İşlem no</span><span class="r-r">${p.disbRef}</span></div>
    </div>
    <button class="sheet-btn ghost" data-action="toast" data-msg="Dekont paylaşımı prototipte aktif değil">Dekontu Paylaş</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}

/* -------------------- legal texts (example copy) -------------------- */
function knDocSheet(kind) {
  const v = state.kn, a = v.app, h = a ? knHome(a.home) : knHome(), q = a ? { loan: a.loan, pay: a.pay, total: a.total } : knQuote(), term = a ? a.term : v.term;
  const docs = {
    kvkk: ['Aydınlatma Metni', `
      <h4>Hangi verileri işliyoruz?</h4><p>Kimlik, iletişim, gelir ve kredi geçmişi bilgilerin ile satın alınacak konutun bilgileri, konut kredisi değerlendirmesi için işlenir.</p>
      <h4>KKB sorgusu</h4><p>Değerlendirme sırasında Kredi Kayıt Bürosu üzerinden kredi geçmişin sorgulanır.</p>
      <h4>Paylaşım</h4><p>Konut bilgileri ekspertiz için değerleme kuruluşuyla, tapu işlemleri için ilgili tapu müdürlüğüyle paylaşılır.</p>`],
    pre: ['Konut Kredisi Ön Bilgilendirme Formu', `
      <h4>1. Kredinin konusu</h4><p>${h.hood}, ${h.district} adresindeki ${h.rooms} konutun alımı için <b>${vmTL(q.loan)}</b> konut kredisi, ${term} ay vade.</p>
      <h4>2. Maliyetler (örnek)</h4><p>Aylık faiz %${vmPctStr(KN_RATE.monthly)}; konut kredilerinde KKDF alınmaz, BSMV ${knTkEff().bsmv ? `faiz üzerinden %${KN_BSMV} uygulanır` : 'alınmaz'} (TAKBİS sonucu). Aylık taksit <b>${vmTL(q.pay)}</b>, toplam geri ödeme <b>${vmTL(q.total)}</b>. Kredi tahsis ücreti binde ${vmPctStr(KN_FEES.alloc * 10)}, ekspertiz ücreti ${vmTL(KN_FEES.expertise)}.</p>
      <h4>3. Teminat</h4><p>Konut üzerinde bankamız lehine 1. derece ipotek tesis edilir; DASK poliçesi zorunludur.</p>`],
    contract: ['Konut Kredisi Sözleşmesi', `
      <h4>1. Kullandırım</h4><p>Kredi tutarı; ekspertiz raporu, şubede sözleşme imzası ve tapuda ipotek tesisinden sonra satıcının hesabına aktarılır.</p>
      <h4>2. Geri ödeme</h4><p>Taksitler ödeme planındaki tarihlerde hesabından tahsil edilir. Gecikmede sözleşmedeki gecikme faizi uygulanır.</p>
      <h4>3. Erken ödeme</h4><p>Krediyi vadesinden önce kapatabilirsin. Sabit faizli konut kredilerinde erken ödeme tazminatı, kalan vadesi 36 ayı aşmayan kredilerde erken ödenen tutarın %1'ini, aşanlarda %2'sini geçemez.</p>
      <h4>4. İpotek</h4><p>İpotek, kredi borcunun tamamı ödendiğinde bankamız tarafından kaldırılır.</p>`],
  };
  const [title, body] = docs[kind] || docs.kvkk;
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>${title}</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="legal-scroll"><p>Bu metin prototip amaçlı örnek bir metindir; gerçek ürün koşullarını yansıtmaz.</p>${body}</div>
    <button class="sheet-btn ghost" data-action="close-sheet">Kapat</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}

/* -------------------- navigation, refresh, demo reset, deep links -------------------- */
// After submitting, "back" should land on the marketplace, not on screens that can no longer change
function knUnwind() {
  const i = state.nav.map(f => f.screen).lastIndexOf('konut');
  if (i >= 0) state.nav = state.nav.slice(0, i);
  else while (state.nav.length && state.nav[state.nav.length - 1].screen.startsWith('konut')) state.nav.pop();
  state.nav.push({ screen: 'konut', chatSeed: false });
}
function knGoMarket() {
  const i = state.nav.map(f => f.screen).lastIndexOf('konut');
  if (i >= 0) state.nav = state.nav.slice(0, i);
  closeSheet();
  state.chatSeed = false;
  state.screen = 'konut';
  vmRerender();
}
/* The most relevant screen of an ongoing journey */
function knGoTrack() {
  closeSheet();
  const v = state.kn, a = v.app;
  const to = !a || a.status === 'review' ? 'konut-takip'
    : a.status === 'pre' ? (v.eks && !v.eks.seen ? 'konut-ekspertiz' : 'konut-takip')
    : !a.finalSeen ? 'konut-takip' : 'konut-ipotek';
  if (state.screen !== to) go(to);
}
function knOpenTrack() {
  const prev = state.nav[state.nav.length - 1];
  if (state.screen === 'konut-takip') return;
  if (prev && prev.screen === 'konut-takip') return navBack();
  go('konut-takip');
}
function knOpen(id) { closeSheet(); state.kn.home = id; go('konut-detay'); }
function knOpenFavs() { state.kn.favOnly = true; go('konut-liste'); }
function knGalGo(i) {
  const g = document.getElementById('kn-gal');
  if (g) g.scrollTo({ left: i * g.clientWidth, behavior: 'smooth' });
}
function knDetailCta() {
  const a = state.kn.app;
  return a && a.home === knHome().id ? 'Başvurunu Takip Et' : 'Kredi Simülasyonu Yap';
}
function knStartSim() {
  const v = state.kn, h = knHome();
  if (v.app) return v.app.home === h.id ? knGoTrack() : knBusySheet(h);
  knInitFlow(h);
  go('konut-kredi');
}
function knBusySheet(h) {
  const cur = knHome(state.kn.app.home);
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-ico vm-sheet-ico">${I.home}</div>
    <h3>Devam eden başvurun var</h3>
    <p>${knTitle(cur)} için konut kredisi sürecin devam ediyor. ${knTitle(h)} için yeni bir simülasyon başlatırsan bu demo süreci sıfırlanır.</p>
    <button class="sheet-btn" data-action="kn-track">Mevcut Süreci Gör</button>
    <button class="sheet-btn ghost" data-action="kn-reset-start" data-id="${h.id}">Yeni Süreç Başlat</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
/* Re-render in place after a state change (scroll position kept); other screens update only their own bits */
function knRefresh() {
  const s = state.screen;
  if (s === 'konut') { const el = document.getElementById('kn-og'); if (el) el.innerHTML = state.kn.app ? knOngoingHTML() : ''; return; }
  if (s === 'konut-detay') { const b = document.getElementById('kn-d-go'); if (b) b.textContent = knDetailCta(); return; }
  if (!['konut-takip', 'konut-ekspertiz', 'konut-ipotek'].includes(s)) return;
  const sc = document.querySelector('#app .screen-scroll'), y = sc ? sc.scrollTop : 0;
  vmRerender('kn-still');
  const sc2 = document.querySelector('#app .screen-scroll');
  if (sc2) sc2.scrollTop = y;
}
/* Demo reset clears the loan journey; onboarding answers (tahsis, TAKBİS) stay */
function knResetFlow() {
  Object.assign(state.kn, { app: null, eks: null, ipt: null, flowHome: null, scen: [], clock: null, agree: { pre: false, contract: false, kvkk: false } });
}
function knResetStart(id) { knResetFlow(); closeSheet(); state.kn.home = id; knStartSim(); }
function knReset() { knResetFlow(); knGoMarket(); toast('Demo süreci sıfırlandı'); }
function knPastBizDay(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  while (!(d.getDay() % 6)) d.setDate(d.getDate() - 1);
  return d;
}
// Deep links (#konut-…) prepare the state they need without replaying the flow
function knSeed(hash) {
  const v = state.kn;
  if (!KN_HOMES.some(x => x.id === v.home)) v.home = 'h1';
  if (hash === 'konut-tanitim') { if (!v.app) knResetOnboarding(); return; }   // the first entry again (demo)
  if (hash === 'konut-tahsis') { if (!v.ob.done) v.tk = { s1: null, s2: null, s3: null, cur: 's1', at: null, shareDraft: null }; return; }
  if (hash === 'konut-takbis' || hash === 'konut') return;   // #konut shows the onboarding on the first entry
  const past = ['konut-ipotek', 'konut-tamam'].includes(hash) && !v.app;
  if (past) knSetClock(knAt(knPastBizDay(12), '09:40'));   // a past timeline that ends before today
  if (!v.ob.done) knSeedOnboarding();
  if (v.app) { v.clock = null; return; }   // an ongoing journey keeps its own state
  if (['konut-kredi', 'konut-basvuru', 'konut-takip', 'konut-ekspertiz', 'konut-ipotek', 'konut-tamam'].includes(hash)) knInitFlow(knHome());
  if (!['konut-takip', 'konut-ekspertiz', 'konut-ipotek', 'konut-tamam'].includes(hash)) return;
  v.agree = { pre: true, contract: true, kvkk: true };
  if (past) knAddMin(25);
  const a = v.app = knMakeApp('review');
  if (hash === 'konut-takip') { setTimeout(knStartReview, 400); return; }   // shows the first evaluation running
  a.step = KN_REVIEW.length;
  if (past) knAddMin(300);
  knPreApprove(a, true);
  if (hash === 'konut-ekspertiz') return;
  knEksComplete();
  v.eks.fresh = false;
  a.finalSeen = true;
  if (hash === 'konut-tamam') {   // the whole tapu & ipotek part, in the past
    const p = v.ipt, sign = knAt(knAddBiz(knClock(), 1), '09:30'), tapu = knAt(knAddBiz(sign, 2), '10:30');
    Object.assign(p, { slot: knSlotLabel(sign, '09:30'), slotTs: sign.getTime() });
    knEvent(a, 'Şube randevun oluşturuldu', `${KN_BRANCH.name} · ${p.slot}`);
    knSetClock(sign); knAddMin(40); p.stage = 1; p.signedAt = knStamp();
    knEvent(a, 'Kredi sözleşmen imzalandı', KN_BRANCH.name, 'ok');
    knAddMin(15); p.dask = { no: vmRef('DSK'), at: knStamp(), inst: 1 };
    knEvent(a, 'DASK poliçen düzenlendi', `Allianz Türkiye · ${p.dask.no}`, 'ok');
    knAddMin(15); p.harc = { ref: vmRef('HRC'), at: knStamp(), amount: Math.round(knHome().price * KN_FEES.deedPct / 100) };
    knEvent(a, 'Tapu harcın ödendi', `${vmTL(p.harc.amount)} · dekont ${p.harc.ref}`, 'ok');
    Object.assign(p, { tslot: knSlotLabel(tapu, '10:30'), tslotTs: tapu.getTime(), stage: 3 });
    knEvent(a, 'Tapu randevun oluşturuldu', `${knHome().district} Tapu Müdürlüğü · ${p.tslot}`);
    knSetClock(tapu); knAddMin(50); p.tapuAt = knStamp();
    knEvent(a, 'Tapu devri yapıldı, ipotek tesis edildi', `${knHome().district} Tapu Müdürlüğü`, 'ok');
    knIptFinish(p, true);
  }
  v.clock = null;   // from here on the demo runs on real time again
}
/* -------------------- first entry: onboarding → tahsis → TAKBİS -------------------- */
const KN_OB_FLOW = ['Tanıtım', 'Tahsis', 'TAKBİS'];
function knObFlowHTML(cur) {
  return `<div class="vm-flow kn-flow kn-obflow" role="list" aria-label="İlk giriş adımları">${KN_OB_FLOW.map((t, i) =>
    `<div class="vm-flow-s ${i < cur ? 'done' : i === cur ? 'on' : ''}" role="listitem"><i>${i < cur ? I.check : i + 1}</i><span>${t}</span></div>`).join('<b></b>')}</div>`;
}
/* Onboarding — shown once, before the marketplace home */
function KnIntro() {
  const feats = [
    [I.search, 'Ev ara', 'Şehir, ilçe, fiyat, oda sayısı ve metrekareye göre satılık konutları incele.'],
    [VM_ICO.compare, 'Konutları karşılaştır', 'Fiyatı, m² fiyatını ve bölge ortalamasını yan yana gör.'],
    [I.loan, 'Kredi simülasyonu yap', 'Peşinat ve vadeye göre taksitini ve ödeme kapasiteni hesapla.'],
    [KN_ICO.clip, 'Başvurunu takip et', 'Kredi değerlendirmesini, ekspertizi ve tapu sürecini adım adım izle.'],
  ];
  return `
  <div class="screen ${vmAnim()} vm kn">
    <div class="nav-head ru-nav-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Marketplace Konut</div>
    </div>
    <div class="screen-scroll">
      <div class="vm-hero kn-hero kn-intro-hero">
        ${knSkylineSVG()}
        <div class="vm-hero-t">Marketplace Konut'a<br>hoş geldin</div>
        <div class="vm-hero-s">Evini bul, konut kredini planla; başvurunu ve tapu sürecini tek yerden takip et.</div>
      </div>
      <div class="vm-sec-h"><span>Neler yapabilirsin?</span></div>
      <div class="vm-box kn-feats">${feats.map(([ico, t, d]) => `<div><span class="kn-feat-ico">${ico}</span><div><b>${t}</b><em>${d}</em></div></div>`).join('')}</div>
      <div class="vm-sec-h"><span>Başlamadan önce</span></div>
      <div class="vm-box kn-pre">
        <p>Konut kredisi başvurundan önce iki kısa adımı birlikte tamamlayacağız:</p>
        <div class="kn-pre-step"><span class="n">1</span><div><b>Tahsis bilgilerin güncellenecek</b><em>Bankamızda kayıtlı meslek ve gelir bilgilerini kontrol edip onaylayacak ya da düzenleyeceksin.</em></div></div>
        <div class="kn-pre-step"><span class="n">2</span><div><b>TAKBİS bilgilerin ilk kez alınacak</b><em>Sahip olduğun konutlarla ilgili 2–3 kısa soru. Cevaplarına göre BSMV, kredi / değer oranı (LTV) ve TAKBİS sorgu kapsamın belirlenir.</em></div></div>
        <div class="kn-pre-time">${VM_ICO.clock}<span>Yaklaşık 2 dakika sürer · yalnızca ilk girişte gösterilir</span></div>
      </div>
    </div>
    <div class="screen-cta"><button class="btn-primary" data-action="kn-ob-start">Başla</button></div>
  </div>`;
}

/* -------------------- tahsis (allocation) information -------------------- */
// Editable employment & income fields: [key, label, options | 'text' | 'money']
const KN_TH_FIELDS = [
  ['job', 'Meslek', ['Özel sektör çalışanı', 'Kamu çalışanı', 'Serbest meslek', 'Şirket sahibi / esnaf', 'Emekli']],
  ['title', 'Unvan / pozisyon', 'text'],
  ['work', 'Çalışma durumu', ['Ücretli · tam zamanlı', 'Ücretli · yarı zamanlı', 'Kendi işi', 'Emekli']],
  ['employer', 'İşveren', 'text'],
  ['sector', 'Sektör', ['Bilişim ve teknoloji', 'Finans', 'Üretim', 'Sağlık', 'Eğitim', 'Ticaret ve hizmet', 'Kamu']],
  ['tenure', 'Bu işyerinde çalışma süresi', ['1 yıldan az', '1–3 yıl', '3–5 yıl', '5 yıldan fazla']],
  ['income', 'Aylık net gelir', 'money'],
  ['spouse', 'Eşinin aylık net geliri', 'money'],
  ['other', 'Diğer aylık gelir (kira vb.)', 'money'],
];
function knThVal(k, x) { return KN_TH_FIELDS.find(f => f[0] === k)[2] === 'money' ? vmTL(x || 0) : (x || '—'); }
function knHouseIncome(t = state.kn.tahsis) { return (t.income || 0) + (t.spouse || 0) + (t.other || 0); }
function KnTahsis() {
  const v = state.kn, p = KN_PROFILE, t = v.tahsis, ed = v.thEdit, ob = !v.ob.done;
  const ro = [['Ad soyad', p.name], ['T.C. kimlik no', p.tckn], ['Doğum tarihi', p.birth], ['Doğum yeri', p.birthPlace], ['Medeni durum', p.marital], ['Uyruk', p.nationality], ['Cep telefonu', p.phone], ['E-posta', p.email], ['İkamet adresi', p.address]];
  const changed = !ed && v.thChanged.length;
  const cta = ed
    ? `<button class="btn-outline" data-action="kn-th-cancel">Vazgeç</button><button class="btn-primary" data-action="kn-th-save">Kaydet</button>`
    : `<button class="btn-outline" data-action="kn-th-edit">Düzenle</button><button class="btn-primary" id="kn-th-ok" data-action="kn-th-confirm">Onayla</button>`;
  return `
  <div class="screen ${vmAnim()} vm kn">
    ${vmNav('Tahsis Bilgileri')}
    <div class="screen-scroll">
      ${ob ? knObFlowHTML(1) : ''}
      ${changed ? `<div class="vm-okbar">${I.check}<span><b>Bilgilerin güncellendi</b>Güncel bilgilerini aşağıda kontrol et; doğruysa onayla.</span></div>`
        : `<div class="vm-infobar">${I.info}<span>${ed ? '<b>Yalnızca meslek ve gelir bilgilerin düzenlenebilir.</b> Değişiklikleri kaydettikten sonra güncel bilgilerini onaylaman istenecek.' : '<b>Bankamızda kayıtlı bilgilerin.</b> Konut kredisi değerlendirmesinde kullanılır; güncelse onayla, meslek ya da gelir bilgin değiştiyse düzenle.'}</span></div>`}
      ${changed ? `<div class="vm-sec-t">Güncellenen bilgiler</div>
      <div class="vm-box vm-prof kn-chg-box">${v.thChanged.map(k => { const f = KN_TH_FIELDS.find(x => x[0] === k); return `<div class="vm-frow kn-chg"><span>${f[1]}<i class="vm-sub">Önceki: ${knThVal(k, v.thPrev[k])}</i></span><b>${knThVal(k, t[k])}</b></div>`; }).join('')}</div>` : ''}
      <div class="vm-sec-t vm-sec-row"><span>Kimlik ve temel bilgiler</span><span class="kn-lockt">${I.lock}Değiştirilemez</span></div>
      <div class="vm-box vm-prof kn-ro">${ro.map(([k, val]) => `<div class="vm-frow"><span>${k}</span><b>${val}</b></div>`).join('')}</div>
      <div class="vm-sec-t vm-sec-row"><span>Meslek ve gelir</span><span class="kn-edt">${ed ? 'Düzenleniyor' : 'Güncellenebilir'}</span></div>
      <div class="vm-box ${ed ? 'kn-th-form' : 'vm-prof'}" id="kn-th-box">${ed ? knThFormHTML() : knThViewHTML()}</div>
      ${ed ? '' : `<div class="vm-note">${I.info}<span>Kimlik ve iletişim bilgilerin nüfus kayıtlarından ve müşteri kaydından gelir; değişiklik için şubemize başvurabilirsin.</span></div>`}
    </div>
    <div class="screen-cta kn-cta2">${cta}</div>
  </div>`;
}
function knThViewHTML() {
  const v = state.kn, t = v.tahsis;
  return KN_TH_FIELDS.map(([k, label]) => {
    const chg = v.thChanged.includes(k);
    return `<div class="vm-frow ${chg ? 'kn-chg' : ''}"><span>${label}${chg ? `<i class="vm-sub">Önceki: ${knThVal(k, v.thPrev[k])}</i>` : ''}</span><b>${knThVal(k, t[k])}${chg ? '<em class="kn-chg-tag">Güncellendi</em>' : ''}</b></div>`;
  }).join('') + `<div class="vm-frow kn-th-sum"><span>Aylık net hane geliri</span><b>${vmTL(knHouseIncome(t))}</b></div>`;
}
function knThFormHTML() {
  const d = state.kn.thDraft;
  return KN_TH_FIELDS.map(([k, label, type]) => {
    if (Array.isArray(type)) return `<button class="vm-field kn-th-f" data-action="kn-th-pick" data-k="${k}"><span>${label}</span><b>${d[k]}</b>${I.chevDown}</button>`;
    const money = type === 'money';
    return `<label class="vm-in kn-th-f"><span>${label}</span><input id="kn-th-${k}" ${money ? 'inputmode="numeric"' : 'type="text"'} enterkeyhint="done" autocomplete="off" placeholder="${money ? '0' : ''}" value="${money ? (d[k] ? d[k].toLocaleString('tr-TR') : '0') : d[k]}" maxlength="${money ? 11 : 60}">${money ? '<em>TL</em>' : ''}</label>`;
  }).join('') + '<div class="vm-warn-inline" id="kn-th-warn" role="status" aria-live="polite"></div>';
}
/* Typed values go straight into the draft, so a re-render (choice sheets) never loses them */
function knSetupTahsis() {
  const v = state.kn;
  if (!v.thEdit) return;
  KN_TH_FIELDS.forEach(([k, , type]) => {
    const inp = document.getElementById('kn-th-' + k);
    if (!inp) return;
    inp.addEventListener('input', () => {
      if (type === 'money') {
        const dg = inp.value.replace(/\D/g, '').slice(0, 9);
        inp.value = dg ? (+dg).toLocaleString('tr-TR') : '';
        v.thDraft[k] = +dg || 0;
      } else v.thDraft[k] = inp.value;
    });
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') inp.blur(); });
  });
}
function knThRefreshForm() { const el = document.getElementById('kn-th-box'); if (el) { el.innerHTML = knThFormHTML(); knSetupTahsis(); } }
function knThEdit() { const v = state.kn; v.thEdit = true; v.thDraft = { ...v.tahsis }; vmRerender('anim-fade'); }
function knThOpenEdit() { const v = state.kn; v.thEdit = true; v.thDraft = { ...v.tahsis }; go('konut-tahsis'); }
function knThCancel() { const v = state.kn; v.thEdit = false; v.thDraft = null; vmRerender('anim-fade'); }
function knThPick(k) {
  const v = state.kn, f = KN_TH_FIELDS.find(x => x[0] === k);
  v.thPickKey = k;
  vmChoiceSheet(f[1], f[2].map(o => ({ v: o, label: o, on: v.thDraft[k] === o })), 'kn-th-set');
}
function knThSet(val) {
  const v = state.kn;
  v.thDraft[v.thPickKey] = val;
  if (v.thPickKey === 'job' && val === 'Emekli') v.thDraft.work = 'Emekli';
  closeSheet();
  knThRefreshForm();
}
function knThSave() {
  vmCommitInputs();
  const v = state.kn, d = v.thDraft;
  d.employer = String(d.employer || '').trim(); d.title = String(d.title || '').trim();
  const retired = d.job === 'Emekli' || d.work === 'Emekli';
  if (!d.income) return vmWarn('kn-th-warn', 'Aylık net gelirini gir.');
  if (!retired && !d.employer) return vmWarn('kn-th-warn', 'İşveren bilgisini gir.');
  const keys = KN_TH_FIELDS.map(f => f[0]).filter(k => d[k] !== v.tahsis[k]);
  v.thEdit = false; v.thDraft = null;
  if (!keys.length) { vmRerender('anim-fade'); return toast('Bilgilerinde değişiklik yapılmadı'); }
  v.thPrev = { ...v.tahsis };
  v.tahsis = { ...d };
  v.thChanged = keys;
  if (!v.incomeEdited) v.income = knHouseIncome();
  vmRerender('anim-fade');
  const sc = document.querySelector('#app .screen-scroll'); if (sc) sc.scrollTop = 0;
  toast('Bilgilerin kaydedildi');
}
function knThConfirm() {
  const v = state.kn;
  if (!knBusyBtn('kn-th-ok', 'Onaylanıyor…')) return;
  setTimeout(() => {
    v.tahsisAt = knStamp();
    v.thChanged = [];
    if (!v.incomeEdited) v.income = knHouseIncome();
    if (!v.ob.done) return go('konut-takbis');
    navBack();
    toast('Tahsis bilgilerin onaylandı');
  }, 700);
}

/* -------------------- TAKBİS (first time) — step-by-step questions + decision tree -------------------- */
const KN_TK_OPTS = [['0', 'Yok'], ['1', '1 adet'], ['2', '2 ve üzeri']];
const KN_LTV = { 'Yüksek': 75, 'Düşük': 50 };   // EXAMPLE maximum loan / value (%) per LTV level
const KN_BSMV = 15;                             // EXAMPLE BSMV % on interest when it applies
// Decision table of the brief: S1 | S2 | S3 (< or > %50) → case number
const KN_TK_CASES = { '0|0|-': 1, '0|1|<': 2, '0|1|>': 3, '0|2|-': 4, '1|0|<': 5, '1|0|>': 6, '1|1|-': 7, '2|-|-': 8 };
const KN_TK_Q = {
  s1: { n: 'Kendi konutun', t: '‘Hasarlı’ tipi dışında bir evin var mı?', d: 'Adına kayıtlı konutları say; tapuda ‘hasarlı’ tipiyle kayıtlı olanlar sayılmaz.' },
  s2: { n: 'Eşinin / çocuğunun konutu', t: 'Eşinin ya da çocuğunun ‘hasarlı’ tipi dışında bir evi var mı?', d: 'Eşinin ve çocuklarının adına kayıtlı konutları say; ‘hasarlı’ tipindekiler sayılmaz.' },
  s3: { n: 'Hisse oranı', t: 'Evin hisse oranı yüzde kaç?' },
};
/* Questions that apply for the given answers (conditional display rules of the brief) */
function knTkQs(tk) {
  if (tk.s1 == null || tk.s1 === '2') return ['s1'];
  if (tk.s2 == null) return ['s1', 's2'];
  return (tk.s1 === '0' && tk.s2 === '1') || (tk.s1 === '1' && tk.s2 === '0') ? ['s1', 's2', 's3'] : ['s1', 's2'];
}
function knTkTotal(tk) { return tk.s1 === '2' ? 1 : tk.s1 == null || tk.s2 == null ? 3 : knTkQs(tk).length; }
function knTkNext(tk) { return knTkQs(tk).find(q => tk[q] == null) || null; }
/* BSMV: own home → Var. LTV: no home in the household, or a single home with a share under %50 → Yüksek.
   TAKBİS: LTV Yüksek → Herkese; BSMV Yok + LTV Düşük → Müşteriye; BSMV Var + LTV Düşük → N/A. Exactly %50 → manual. */
function knTkResult(tk = state.kn.tk) {
  const qs = knTkQs(tk);
  if (qs.some(q => tk[q] == null)) return null;
  const share = qs.includes('s3') ? tk.s3 : null;
  if (share === 50) return { manual: true, case: null };
  const own = +tk.s1, fam = qs.includes('s2') ? +tk.s2 : 0, homes = own === 2 ? 2 : own + fam;
  const bsmv = own > 0 ? 'Var' : 'Yok';
  const ltv = homes === 0 || (homes === 1 && share !== null && share < 50) ? 'Yüksek' : 'Düşük';
  const scope = ltv === 'Yüksek' ? 'Herkese' : bsmv === 'Yok' ? 'Müşteriye' : 'N/A';
  const key = `${tk.s1}|${qs.includes('s2') ? tk.s2 : '-'}|${share === null ? '-' : share < 50 ? '<' : '>'}`;
  return { manual: false, bsmv, ltv, scope, case: KN_TK_CASES[key] || null };
}
/* What the calculations use: a manual case is priced conservatively (low LTV; BSMV if the customer owns a home) */
function knTkEff() {
  const r = knTkResult();
  if (!r) return { bsmv: false, ltv: 'Yüksek', ltvMax: KN_LTV['Yüksek'] };
  if (r.manual) return { bsmv: state.kn.tk.s1 !== '0', ltv: 'Düşük', ltvMax: KN_LTV['Düşük'], manual: true };
  return { bsmv: r.bsmv === 'Var', ltv: r.ltv, ltvMax: KN_LTV[r.ltv] };
}
function knTkAns(q, tk = state.kn.tk) {
  if (!knTkQs(tk).includes(q) || tk[q] == null) return 'Sorulmadı';
  return q === 's3' ? '%' + vmPctStr(tk.s3) : KN_TK_OPTS.find(o => o[0] === tk[q])[1];
}
const KN_SCOPE_TXT = { 'Herkese': 'Sorgu senin, eşinin ve çocuklarının adına yapılır', 'Müşteriye': 'Sorgu yalnızca senin adına yapılır', 'N/A': 'TAKBİS sorgusu gerekmiyor' };
function knTkResultRows(r) {
  if (!r) return [];
  if (r.manual) return [['BSMV', 'Manuel değerlendirme', ''], ['LTV', 'Manuel değerlendirme', ''], ['TAKBİS sorgu kapsamı', 'Manuel değerlendirme', '']];
  return [
    ['BSMV', r.bsmv, r.bsmv === 'Var' ? `Adına kayıtlı konut olduğu için kredi faizine BSMV uygulanır (%${KN_BSMV} örnek)` : 'Kredi faizine BSMV uygulanmaz'],
    ['LTV', r.ltv, `Kredi / konut değeri en fazla %${KN_LTV[r.ltv]} (örnek)`],
    ['TAKBİS sorgu kapsamı', r.scope, KN_SCOPE_TXT[r.scope]],
  ];
}
function KnTakbis() {
  const v = state.kn, tk = v.tk;
  if (!tk.cur && knTkResult(tk)) return knTkResultView();
  const q = tk.cur || knTkNext(tk) || 's1';
  tk.cur = q;
  const qs = knTkQs(tk), pos = qs.indexOf(q) + 1, total = knTkTotal(tk), Q = KN_TK_Q[q];
  const before = qs.slice(0, qs.indexOf(q)).filter(k => tk[k] != null);
  const helper = q === 's3' ? (tk.s1 === '1' ? 'Adına kayıtlı evdeki hisse oranını gir.' : 'Eşinin ya da çocuğunun adına kayıtlı evdeki hisse oranını gir.') : Q.d;
  const share = tk.shareDraft != null ? tk.shareDraft : (tk.s3 != null ? vmPctStr(tk.s3) : '');
  return `
  <div class="screen ${vmAnim()} vm kn">
    ${vmNav('TAKBİS Bilgileri')}
    <div class="screen-scroll">
      ${v.ob.done ? '' : knObFlowHTML(2)}
      ${pos === 1 && !before.length ? `<div class="vm-infobar">${I.info}<span><b>TAKBİS bilgilerin ilk kez alınıyor.</b> Tapu ve Kadastro Bilgi Sistemi'ne göre sahip olduğun konutları soruyoruz; cevaplarına göre BSMV, LTV ve TAKBİS sorgu kapsamın belirlenir.</span></div>` : ''}
      ${before.length ? `<div class="vm-box kn-tk-done">${before.map(k => `<div><span class="kn-tk-n">${I.check}</span><div><span>${KN_TK_Q[k].n}</span><b>${knTkAns(k)}</b></div><button class="sp-link" data-action="kn-tk-edit" data-q="${k}">Değiştir</button></div>`).join('')}</div>` : ''}
      <div class="kn-tk-prog"><span>Soru ${pos} / ${total}</span><div class="kn-tk-bar">${Array.from({ length: total }, (_, i) => `<i class="${i < pos - 1 ? 'done' : i === pos - 1 ? 'on' : ''}"></i>`).join('')}</div></div>
      <div class="vm-box kn-tk-q">
        <span class="kn-tk-qn">${Q.n}</span>
        <h3>${Q.t}</h3>
        <p>${helper}</p>
        ${q === 's3' ? `
        <label class="vm-money kn-tk-share"><input id="kn-tk-share" inputmode="decimal" enterkeyhint="done" autocomplete="off" placeholder="0" value="${share}" aria-label="Hisse oranı (yüzde)"><em>%</em></label>
        <div class="vm-chips kn-tk-chips">${[25, 40, 50, 75, 100].map(x => `<button class="vm-chip" data-action="kn-tk-chip" data-v="${x}">%${x}</button>`).join('')}</div>
        <div class="vm-warn-inline" id="kn-tk-warn" role="status" aria-live="polite"></div>`
        : `<div class="kn-tk-opts">${KN_TK_OPTS.map(([val, label]) => `<button class="kn-tk-opt ${tk[q] === val ? 'on' : ''}" data-action="kn-tk-opt" data-q="${q}" data-v="${val}"><span class="kn-tk-radio"></span><b>${label}</b></button>`).join('')}</div>`}
      </div>
      ${pos > 1 ? '<button class="sp-link kn-tk-prev" data-action="kn-tk-back">‹ Önceki soru</button>' : ''}
    </div>
    ${q === 's3' ? `<div class="screen-cta"><button class="btn-primary ${knTkShareVal(share) ? '' : 'disabled'}" id="kn-tk-go" data-action="kn-tk-share">Devam</button></div>` : ''}
  </div>`;
}
function knTkShareVal(s) {
  const n = Number(String(s).replace(',', '.'));
  return String(s).trim() !== '' && isFinite(n) && n > 0 && n <= 100 ? Math.round(n * 10) / 10 : null;
}
function knSetupTakbis() {
  const inp = document.getElementById('kn-tk-share');
  if (!inp) return;
  inp.addEventListener('input', () => {
    inp.value = inp.value.replace(/[^\d,.]/g, '').replace('.', ',').slice(0, 5);
    state.kn.tk.shareDraft = inp.value;
    const b = document.getElementById('kn-tk-go'); if (b) b.classList.toggle('disabled', !knTkShareVal(inp.value));
    vmWarn('kn-tk-warn', inp.value && !knTkShareVal(inp.value) ? 'Hisse oranı %0 ile %100 arasında olmalı.' : '');
  });
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') knTkShareSubmit(); });
}
/* Recording an answer drops answers of questions that no longer apply; the result is recomputed */
function knTkAnswer(q, val) {
  const tk = state.kn.tk;
  tk[q] = val;
  if (q !== 's3') tk.shareDraft = null;
  const qs = knTkQs(tk);
  ['s2', 's3'].forEach(k => { if (!qs.includes(k)) tk[k] = null; });
  tk.cur = knTkNext(tk);
  if (!tk.cur) tk.at = knStamp();
  document.querySelectorAll(`.kn-tk-opt[data-q="${q}"]`).forEach(b => b.classList.toggle('on', b.dataset.v === val));
  setTimeout(() => vmRerender('anim-fade'), 160);
}
function knTkShareChip(x) {
  const inp = document.getElementById('kn-tk-share');
  if (!inp) return;
  inp.value = String(x);
  inp.dispatchEvent(new Event('input'));
}
function knTkShareSubmit() {
  const tk = state.kn.tk, inp = document.getElementById('kn-tk-share'), val = knTkShareVal(inp ? inp.value : '');
  if (val === null) return vmWarn('kn-tk-warn', 'Hisse oranını yüzde olarak gir (ör. 40).');
  tk.shareDraft = null;
  knTkAnswer('s3', val);
}
function knTkEdit(q) { const tk = state.kn.tk; tk.cur = q; tk.shareDraft = null; vmRerender('anim-fade'); }
function knTkBack() {
  const tk = state.kn.tk, qs = knTkQs(tk), i = qs.indexOf(tk.cur);
  if (i > 0) knTkEdit(qs[i - 1]);
}
function knTkResultView() {
  const v = state.kn, tk = v.tk, r = knTkResult(tk), qs = knTkQs(tk);
  return `
  <div class="screen ${vmAnim()} vm kn">
    ${vmNav('TAKBİS Bilgileri')}
    <div class="screen-scroll">
      ${v.ob.done ? '' : knObFlowHTML(3)}
      ${r.manual
        ? `<div class="kn-miss" role="status"><span class="kn-miss-ico">${I.info}</span><div><b>Manuel değerlendirme gerekli</b><span>Hisse oranı tam %50 olduğu için BSMV, LTV ve TAKBİS sorgu kapsamı otomatik belirlenmedi. Cevapların kaydedildi; bilgilerin bankamız tarafından ayrıca değerlendirilecek.</span></div></div>`
        : `<div class="vm-okbar">${I.check}<span><b>TAKBİS bilgilerin başarıyla alındı</b>Cevaplarına göre BSMV durumun, LTV seviyen ve TAKBİS sorgu kapsamın belirlendi. Bu bilgiler kredi başvurunda kullanılacak.</span></div>`}
      <div class="vm-sec-t">Cevapların</div>
      <div class="vm-box kn-tk-sum">${['s1', 's2', 's3'].map(k => `<div><div><span>${KN_TK_Q[k].n}</span><b class="${qs.includes(k) ? '' : 'na'}">${knTkAns(k)}</b></div>${qs.includes(k) ? `<button class="sp-link" data-action="kn-tk-edit" data-q="${k}">Değiştir</button>` : ''}</div>`).join('')}</div>
      <div class="vm-sec-t">Sonuç</div>
      <div class="vm-box kn-tk-res">${knTkResultRows(r).map(([k, val, d]) => `<div class="${r.manual ? 'man' : ''}"><span>${k}</span><b>${val}</b>${d ? `<em>${d}</em>` : ''}</div>`).join('')}</div>
      <div class="vm-note">${I.info}<span>${tk.at ? `Bilgiler ${tk.at} tarihinde alındı. ` : ''}Kredi başvurunda tekrar sorulmaz; başvuru ekranına otomatik taşınır.</span></div>
      <div class="vm-demo"><div class="vm-demo-h">${I.info}<span>Demo · Karar ağacı: ${r.manual ? 'tam %50 hisse — tanımlı case yok, manuel değerlendirme' : r.case ? `Case ${r.case}` : 'tabloda olmayan kombinasyon — iş kurallarından hesaplandı'}</span></div></div>
    </div>
    <div class="screen-cta"><button class="btn-primary" data-action="kn-ob-finish">${v.ob.done ? 'Kaydet ve Dön' : 'Marketplace\'e Geç'}</button></div>
  </div>`;
}
/* Onboarding done: the marketplace home replaces the onboarding screens in the back stack */
function knObFinish() {
  const v = state.kn;
  if (!knTkResult(v.tk)) return;
  const first = !v.ob.done;
  v.ob.done = true;
  if (!v.incomeEdited) v.income = knHouseIncome();
  if (!first) return navBack();
  while (state.nav.length && ['konut-tanitim', 'konut-tahsis', 'konut-takbis', 'konut'].includes(state.nav[state.nav.length - 1].screen)) state.nav.pop();
  closeSheet();
  state.chatSeed = false;
  state.screen = 'konut';
  vmRerender('anim-right');
  toast('TAKBİS bilgilerin kaydedildi');
}
function knSeedOnboarding() {   // test answers of the brief: Özel sektör, 150.000 TL; S1 Yok, S2 1 adet, S3 %40
  const v = state.kn;
  v.tahsis = { ...KN_TAHSIS0 };
  v.tahsisAt = knStamp();
  v.tk = { s1: '0', s2: '1', s3: 40, cur: null, at: knStamp(), shareDraft: null };
  v.ob.done = true;
  if (!v.incomeEdited) v.income = knHouseIncome();
}
function knResetOnboarding() {
  Object.assign(state.kn, { ob: { done: false }, tahsis: { ...KN_TAHSIS0 }, tahsisAt: null, thEdit: false, thDraft: null, thChanged: [], thPrev: null, tk: { s1: null, s2: null, s3: null, cur: 's1', at: null, shareDraft: null } });
}

/* -------------------- tapu copy uploaded by the seller -------------------- */
function knTapuDoc(h) {
  const i = KN_HOMES.indexOf(h), s = knSeller(h), up = new Date(); up.setDate(up.getDate() - h.days - 1);
  return { by: s.kind === 'Ev sahibi' ? `${s.name} (ev sahibi)` : `${s.name} · ${s.kind.toLocaleLowerCase('tr')}`, at: knDay(up), ada: 1180 + i * 37, parsel: 4 + i * 3, share: `${80 + i * 5}/2400` };
}
function knTapuSheet() {
  const v = state.kn, h = v.app ? knHome(v.app.home) : knHome(), d = knTapuDoc(h), a = v.app;
  const checked = a && a.status !== 'review';
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>Tapu fotokopisi</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="kn-deed">
      <div class="kn-deed-h"><b>TAPU SENEDİ</b><span>Fotokopi · satıcı tarafından yüklendi</span></div>
      <div class="kn-deed-g">
        <div><span>İl / İlçe</span><b>${h.city} / ${h.district}</b></div><div><span>Mahalle</span><b>${h.hood}</b></div>
        <div><span>Ada / Parsel</span><b>${d.ada} / ${d.parsel}</b></div><div><span>Niteliği</span><b>${h.type === 'Villa' || h.type === 'Müstakil ev' ? 'Kargir ev ve arsası' : 'Mesken · kat mülkiyeti'}</b></div>
        <div><span>Bağımsız bölüm</span><b>${h.floor}</b></div><div><span>Arsa payı</span><b>${d.share}</b></div>
        <div class="w"><span>Malik</span><b>Satıcı · kişisel bilgiler gizlendi</b></div>
      </div>
      <i class="kn-deed-stamp">Örnek</i>
    </div>
    <div class="receipt vm-sh-receipt">
      <div class="r-row"><span class="r-l">Belge durumu</span><span class="r-r"><span class="vm-pill ok sm">${I.check}Sistemde mevcut</span></span></div>
      <div class="r-row"><span class="r-l">Yükleyen</span><span class="r-r">${d.by}</span></div>
      <div class="r-row"><span class="r-l">Yüklenme tarihi</span><span class="r-r">${d.at}</span></div>
      <div class="r-row"><span class="r-l">Banka kontrolü</span><span class="r-r">${checked ? 'TAKBİS kaydıyla doğrulandı' : 'Başvuru değerlendirmesinde yapılır'}</span></div>
    </div>
    <div class="vm-cmp-note">Tapu fotokopisi satıcı tarafından ilan aşamasında sisteme yüklenir; senden ayrıca belge istenmez.</div>
    <button class="sheet-btn ghost" data-action="close-sheet">Kapat</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}

/* -------------------- success — loan disbursed -------------------- */
function KnDone() {
  const v = state.kn, a = v.app, p = v.ipt;
  if (!a || !p || p.stage < 4) { state.screen = 'konut-ipotek'; return KnIpotek(); }
  const h = knHome(a.home);
  return `
  <div class="screen anim-fade vm kn">
    <div class="screen-scroll">
      <div class="success kn-success">
        <div class="success-check"><div class="ring">${I.checkBig}</div></div>
        <h2>Konut kredin kullandırıldı</h2>
        <div class="succ-date">${p.disbAt}</div>
        <div class="amt">${vmTL(a.loan)}</div>
        <div class="prod">${knTitle(h)} · satıcının hesabına aktarıldı</div>
        <div class="kn-done kn-done-in"><span class="kn-done-ico">${VM_ICO.key}</span><b>Yeni evin hayırlı olsun!</b><span>Tapu devri ve ipotek tesisi tamamlandı. Tapu kaydını e-Devlet üzerinden görüntüleyebilirsin.</span></div>
        <div class="receipt">
          <div class="r-row"><span class="r-l">Taşınmaz</span><span class="r-r">${h.hood}, ${h.district}</span></div>
          <div class="r-row"><span class="r-l">Tapu devri</span><span class="r-r">${vmShortDate(p.tapuAt)} · ${h.district} Tapu Müdürlüğü</span></div>
          <div class="r-row"><span class="r-l">İpotek</span><span class="r-r">1. derece · Yapı Kredi lehine</span></div>
          <div class="r-row"><span class="r-l">Vade · aylık taksit</span><span class="r-r">${a.term} ay · ${vmTL(a.pay)}</span></div>
          <div class="r-row"><span class="r-l">İlk taksit</span><span class="r-r">${a.first}</span></div>
          <div class="r-row"><span class="r-l">İşlem no</span><span class="r-r">${p.disbRef}</span></div>
        </div>
        <div class="success-actions">
          <button class="btn-primary" data-action="kn-home">Marketplace Konut'a Dön</button>
          <button class="btn-outline" data-action="kn-open-track">Başvuru Özetini Gör</button>
        </div>
      </div>
    </div>
  </div>`;
}

/* ======================================================================
   AKILLI İŞLETME SERMAYESİ FİNANSMANI (draft) — AI-assisted business finance
   Business cash-flow dashboard → inflow / outflow details → AI financial
   analysis → personalised financing offers → comparison → application →
   application & financing tracking. Not a loan product page: a platform that
   reads the business's money in / money out and proposes financing.
   The business, every amount, the "AI" analysis and all offers are DEMO /
   EXAMPLE data computed locally — no real account, POS, AI model, offer or
   credit process is involved. Reuses the vm-* kit of Marketplace Taşıt.
   ====================================================================== */
const BF_BIZ = {   // DEMO business (fictional)
  name: 'ABC Teknoloji ve Ticaret A.Ş.', short: 'ABC Teknoloji', initials: 'ABC',
  sector: 'Perakende', activity: 'Elektronik ve teknoloji ürünleri perakende satışı',
  taxNo: '0123456789', taxOffice: 'Kadıköy Vergi Dairesi', founded: 2016, employees: 19,
  stores: '2 mağaza (Kadıköy, Ataşehir) ve online satış', segment: 'KOBİ',
  rep: 'Selçuk İmre', repRole: 'Genel Müdür · imza yetkilisi',
  address: 'Caferağa Mah. Moda Cad. No:12, Kadıköy / İstanbul',
  account: 'İşletme Vadesiz TL Hesabı', iban: 'TR•• •••• •••• •••• 7310',
  balance: 320000,   // available balance in the business accounts on the demo date
};
const BF_ASOF = '10 Kasım 2026';            // data is current as of this (demo) date
const BF_TODAY = new Date(2026, 10, 11);    // demo "today": the analysis and the forecast start here
const BF_AY3 = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
const BF_N = 24;                            // months of data: index 0 = Kasım 2024 … 23 = Ekim 2026
const BF_LAST = BF_N - 1;
/* Monthly totals per category (TL). The last three months (Ağustos–Ekim 2026) average exactly to
   the brief's test data; "Nakit girişleri" is not in the brief's test data and is an EXAMPLE value. */
const BF_K = 1000;
const BF_SERIES = {
  pos:   [747, 773, 726, 592, 697, 732, 777, 815, 775, 810, 859, 925, 1010, 1076, 950, 803, 942, 1013, 1073, 1090, 1092, 1100, 1180, 1320],
  order: [249, 246, 207, 189, 211, 229, 260, 251, 260, 270, 288, 327, 376, 349, 310, 298, 327, 347, 386, 387, 384, 400, 440, 510],
  cash:  [121, 122, 103, 87, 97, 103, 107, 102, 103, 94, 102, 110, 108, 114, 97, 84, 95, 96, 103, 97, 96, 105, 98, 97],
  oin:   [86, 87, 87, 97, 101, 92, 98, 86, 103, 104, 115, 113, 101, 106, 115, 100, 114, 108, 109, 110, 133, 160, 130, 160],
  bill:  [169, 191, 203, 206, 186, 181, 180, 199, 220, 231, 214, 216, 230, 264, 279, 269, 252, 241, 239, 264, 294, 310, 290, 300],
  sal:   [299, 447, 344, 344, 345, 348, 346, 345, 373, 373, 369, 375, 374, 561, 441, 437, 437, 435, 439, 434, 466, 480, 500, 520],
  sup:   [675, 620, 222, 251, 311, 342, 349, 349, 324, 356, 446, 639, 911, 847, 299, 340, 448, 492, 484, 475, 438, 455, 595, 900],
  oout:  [57, 61, 61, 69, 62, 61, 75, 71, 67, 74, 68, 77, 85, 85, 84, 79, 82, 80, 93, 90, 96, 90, 95, 115],
};
Object.keys(BF_SERIES).forEach(k => { BF_SERIES[k] = BF_SERIES[k].map(v => v * BF_K); });
const BF_STAFF = [14, 14, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 18, 18, 18, 19];
const BF_COL = { in: '#14A5A0', out: '#F5883E' };   // money in / money out (palette of the spending analysis)
const BF_IN = [
  { id: 'pos', name: 'POS satışları', short: 'POS', icon: 'card', color: '#14A5A0', unit: 'kart işlemi', ticket: 245, d: 'Mağaza POS cihazlarından hesaba geçen kart satışları' },
  { id: 'order', name: 'Sipariş gelirleri', short: 'Sipariş', icon: 'box', color: '#2F6FED', unit: 'sipariş', ticket: 1850, d: 'Online mağaza, pazaryeri ve kurumsal sipariş tahsilatları' },
  { id: 'cash', name: 'Nakit girişleri', short: 'Nakit', icon: 'cashout', color: '#4A6FA5', d: 'Mağaza kasalarından hesaba yatırılan nakit' },
  { id: 'oin', name: 'Diğer tahsilatlar', short: 'Diğer', icon: 'receipt', color: '#8A8F98', d: 'Prim iadeleri, servis ve kira gelirleri, çek tahsilatları' },
];
const BF_OUT = [
  { id: 'bill', name: 'Fatura ödemeleri', short: 'Fatura', icon: 'doc', color: '#8B7FD6', d: 'Kira, enerji, iletişim, lojistik ve hizmet faturaları' },
  { id: 'sal', name: 'Maaş ödemeleri', short: 'Maaş', icon: 'user', color: '#C08A1E', d: 'Çalışan maaşları ve ikramiyeler' },
  { id: 'sup', name: 'Tedarikçi ödemeleri', short: 'Tedarikçi', icon: 'truck', color: '#F5883E', d: 'Stok ve ürün alımları için tedarikçilere yapılan ödemeler' },
  { id: 'oout', name: 'Diğer giderler', short: 'Diğer', icon: 'grid', color: '#8A8F98', d: 'Kargo, reklam, sigorta, bakım, banka ve müşavirlik giderleri' },
];
const BF_CATS = [...BF_IN, ...BF_OUT];
const BF_PERIODS = [['1m', 1, 'Son 1 ay'], ['3m', 3, 'Son 3 ay'], ['6m', 6, 'Son 6 ay'], ['12m', 12, 'Son 12 ay']];
/* 120-day projected balance of the business accounts from BF_TODAY (thousand TL) — the demo "AI forecast" */
const BF_FC = [320, 335, 351, 366, 501, 630, 676, 721, 766, 384, 430, 475, 604, 649, 765, 810, 855, 1021, 1066, 1195, 588, 631, 675, 718, -430, -387, -267, -223, -180, -104, -97, -91, -84, -1, 116, 159, 202, 246, 289, -117, 3, 46, 89, 133, 246, 289, 332, 562, 606, 649, 692, 72, 111, 151, 256, -136, -96, -56, -17, 23, 94, 161, 163, 164, 165, 261, 300, 340, 445, 485, 376, 416, 456, 495, 535, 710, 750, 790, 923, 963, 1003, 1042, 402, 442, 481, 521, 352, 391, 431, 530, 570, 643, 646, 649, 652, 655, 804, 844, 883, 923, 963, 831, 871, 970, 1010, 1050, 1159, 1199, 1239, 1364, 731, 772, 813, 854, 664, 705, 746, 852, 893, 971].map(v => v * BF_K);
const BF_FC_MONTHS = [['Kasım', 320000], ['Aralık', -480000], ['Ocak', 370000], ['Şubat', 340000]];   // projected net flow per month (demo)
const BF_BUFFER = 15;              // EXAMPLE safety margin (%) on top of the deepest projected gap
const BF_BSMV = 5;                 // BSMV on the interest of business loans (%)
const BF_FEE = 0.5;                // EXAMPLE allocation fee (% of the amount)
const BF_DRAW_IDX = 1;             // forecast index of the day the recommended financing would be used (12 Kasım)
/* Financing alternatives — every rate, amount and condition is EXAMPLE data */
const BF_OFFERS = [
  { id: 'wc', type: 'Kısa vadeli işletme sermayesi finansmanı', short: 'İşletme sermayesi', icon: 'loan', tag: 'Yapay zekâ önerisi', best: true, fit: 96,
    amount: 500000, min: 100000, max: 750000, term: 6, terms: [3, 6, 9, 12], rate: 3.19, kind: 'annuity',
    pay: 'Aylık eşit taksit', periodTxt: 'Aylık', early: 'Kalan anaparanın %1’i', earlyFree: false,
    use: 'Maaş, kira, tedarikçi ve fatura ödemeleri dahil tüm işletme giderleri',
    reason: 'Aralık başındaki tahmini 430.000 TL’lik nakit açığını %15 güvenlik payıyla karşılar. Aylık taksit, Ocak’tan itibaren beklenen aylık nakit fazlasının en fazla %30’u kadar; sabit faiz ve taksitle bütçeni önceden planlarsın.' },
  { id: 'line', type: 'Nakit akışı destek finansmanı', short: 'Nakit akışı desteği', icon: 'refresh', tag: 'Esnek kullanım', fit: 88,
    amount: 600000, min: 200000, max: 800000, term: 12, terms: [12], rate: 3.89, kind: 'revolving',
    pay: 'Kullandıkça; her ay yalnızca faiz', periodTxt: 'Aylık (faiz)', early: 'Ücretsiz · istediğin an', earlyFree: true,
    use: 'Ayın ilk günlerindeki maaş, kira ve tedarikçi ödemeleri',
    reason: 'Tahmin edilen açık dönemlerinde kullanır, tahsilat gelince kapatırsın; yalnızca kullandığın tutar ve gün için faiz ödersin. Faiz oranı değişkendir ve limit her yıl yeniden değerlendirilir.' },
  { id: 'flex', type: 'Esnek geri ödemeli işletme finansmanı', short: 'Esnek ödemeli', icon: 'calendar', tag: 'Sezona uyumlu', fit: 85,
    amount: 500000, min: 100000, max: 750000, term: 9, terms: [9, 12], grace: 2, rate: 3.39, kind: 'grace',
    pay: 'İlk 2 ay yalnızca faiz, sonra eşit taksit', periodTxt: 'Aylık', early: 'Ücretsiz (3. aydan sonra)', earlyFree: true,
    use: 'Sezon dönemi işletme giderleri',
    reason: 'Aralık ve Ocak’ta yalnızca faiz ödersin; anapara taksitleri sezon tahsilatları geldikten sonra, Şubat’ta başlar. Vade uzadığı için toplam maliyet daha yüksektir.' },
  { id: 'sup', type: 'Tedarikçi ödeme finansmanı', short: 'Tedarikçi finansmanı', icon: 'truck', tag: 'Stok dönemine özel', fit: 81,
    amount: 450000, min: 100000, max: 600000, term: 3, terms: [1, 2, 3], rate: 2.99, kind: 'bullet',
    pay: 'Vade sonunda tek ödeme', periodTxt: 'Vade sonunda', early: 'Ücretsiz', earlyFree: true,
    use: 'Yalnızca tedarikçi ödemeleri; tutar doğrudan tedarikçine ödenir',
    reason: '5 Aralık’taki sezon stok ödemesinin bir kısmını 90 gün öteler; ödemeyi Aralık satışlarının tahsilatı geldikten sonra yaparsın. Yalnızca tedarikçi ödemesinde kullanılabildiği için maaş ve kira açığını kapatmaz.' },
  { id: 'bill', type: 'Fatura ödeme finansmanı', short: 'Fatura finansmanı', icon: 'doc', tag: null, fit: 64,
    amount: 300000, min: 50000, max: 400000, term: 3, terms: [3, 6], rate: 3.29, kind: 'annuity',
    pay: 'Aylık eşit taksit', periodTxt: 'Aylık', early: 'Kalan anaparanın %1’i', earlyFree: false,
    use: 'Kira, enerji ve hizmet faturaları',
    reason: 'Aralık’taki kira ve fatura ödemelerini 3 aya yayar. Tutarı açığın tamamını karşılamadığı için tek başına yeterli değildir.' },
];
const BF_STAGES = ['Başvuru', 'Değer&shy;lendirme', 'Onay', 'Kullan&shy;dırım', 'Geri ödeme'];
const BF_REVIEW = ['Başvuru ve işletme bilgileri doğrulanıyor', 'Hesap, POS ve e-fatura hareketleri inceleniyor', 'Ticari kredi geçmişi (KKB) kontrol ediliyor', 'Kredi değerlendirmesi yapılıyor'];
const BF_AI_STEPS = ['Hesap hareketlerin sınıflandırılıyor', 'POS ve sipariş tahsilatların inceleniyor', 'Maaş, kira ve tedarikçi ödeme takvimin çıkarılıyor', 'Önümüzdeki 120 günün nakit akışı tahmin ediliyor', 'Finansman ihtiyacın ve risk göstergelerin hesaplanıyor'];
const BF_AI_DUR = [900, 1300, 1100, 1700, 1200];   // unequal step durations (ms)
const BF_AGREE = [
  ['pre', 'Ticari Kredi Ön Bilgilendirme Formu', '’nu okudum, anladım.'],
  ['data', 'Finansal Verilerin Kullanımı Onayı', '’nı veriyorum (hesap, POS ve e-fatura hareketleri).'],
  ['kkb', 'KKB Ticari Risk Raporu Sorgu İzni', '’ni veriyorum.'],
];

state.bf = {
  period: { id: '3m', from: 21, to: 23 },
  side: 'in', cat: null, shown: 20, cmp: false,
  pick: null,                                   // custom range being picked in the period sheet
  ai: { status: 'idle', step: 0, at: null, timer: null },
  sel: ['wc', 'line', 'flex'],                  // offers in the comparison (max 3)
  offer: 'wc', draft: null,
  agree: { pre: false, data: false, kkb: false },
  app: null,
};

/* -------------------- helpers -------------------- */
function bfMonth(i) { const m = (10 + i) % 12; return { m, y: 2024 + Math.floor((10 + i) / 12) }; }
function bfMonLong(i) { const x = bfMonth(i); return `${VM_AY[x.m]} ${x.y}`; }
function bfMonShort(i) { return BF_AY3[bfMonth(i).m]; }
function bfRangeTxt(from, to) {
  const a = bfMonth(from), b = bfMonth(to);
  if (from === to) return bfMonLong(from);
  return a.y === b.y ? `${VM_AY[a.m]} – ${VM_AY[b.m]} ${b.y}` : `${VM_AY[a.m]} ${a.y} – ${VM_AY[b.m]} ${b.y}`;
}
function bfRangeShort(from, to) {
  const a = bfMonth(from), b = bfMonth(to);
  return from === to ? `${BF_AY3[a.m]} ${a.y}` : a.y === b.y ? `${BF_AY3[a.m]}–${BF_AY3[b.m]} ${b.y}` : `${BF_AY3[a.m]} ${String(a.y).slice(2)} – ${BF_AY3[b.m]} ${String(b.y).slice(2)}`;
}
function bfPer() { return state.bf.period; }
function bfLen(p = bfPer()) { return p.to - p.from + 1; }
function bfPerLabel(p = bfPer()) { const x = BF_PERIODS.find(q => q[0] === p.id); return x ? x[2] : 'Özel aralık'; }
function bfPrev(p = bfPer()) { const n = bfLen(p); return { from: p.from - n, to: p.to - n }; }
function bfCat(id) { return BF_CATS.find(c => c.id === id); }
function bfSideCats(side) { return side === 'in' ? BF_IN : BF_OUT; }
function bfSum(id, from, to) { let s = 0; for (let i = from; i <= to; i++) s += BF_SERIES[id][i]; return s; }
function bfTot(side, from, to) { return bfSideCats(side).reduce((s, c) => s + bfSum(c.id, from, to), 0); }
function bfMIn(i) { return bfTot('in', i, i); }
function bfMOut(i) { return bfTot('out', i, i); }
function bfChg(a, b) { return b ? (a - b) / b * 100 : 0; }
function bfChgTxt(p, dec = 0) { const r = Math.abs(p) < 0.5 && !dec ? 0 : +p.toFixed(dec); return (r > 0 ? '+%' : r < 0 ? '−%' : '%') + vmPctStr(Math.abs(r)); }
function bfSign(n) { return n > 0 ? '+' : n < 0 ? '−' : ''; }
function bfTLs(n) { return bfSign(n) + vmTL(Math.abs(n)); }
function bfCompact(n) {   // 1,77 mn · 430 bin
  const a = Math.abs(n);
  if (a >= 1e6) return (a / 1e6).toLocaleString('tr-TR', { maximumFractionDigits: a >= 1e7 ? 1 : 2 }) + ' mn';
  if (a >= 1e3) return Math.round(a / 1e3).toLocaleString('tr-TR') + ' bin';
  return Math.round(a).toLocaleString('tr-TR');
}
function bfCompactS(n) { return bfSign(n) + bfCompact(n); }
function bfFcDate(k) { const d = new Date(BF_TODAY); d.setDate(d.getDate() + k); return d; }
function bfDayTxt(d) { return `${d.getDate()} ${VM_AY[d.getMonth()]}`; }
function bfAddMonths(d, n) { const x = new Date(d); x.setMonth(x.getMonth() + n); return x; }
function bfDateTxt(d) { return `${d.getDate()} ${VM_AY[d.getMonth()]} ${d.getFullYear()}`; }
function bfNumDate(d) { return d.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' }); }
function bfIco(c, cls = '') { return `<span class="bf-ico ${cls}" style="--c:${c.color}">${I[c.icon]}</span>`; }
function bfOffer(id = state.bf.offer) { return BF_OFFERS.find(o => o.id === id) || BF_OFFERS[0]; }

/* Deterministic pseudo-random numbers (same transactions on every visit) */
function bfRng(seed) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const BF_SUPPLIERS = [['Ege Elektronik Dağıtım A.Ş.', 5, 26], ['Ege Elektronik Dağıtım A.Ş.', 20, 20], ['Marmara Teknoloji Ürünleri Ltd. Şti.', 5, 12], ['Marmara Teknoloji Ürünleri Ltd. Şti.', 20, 10], ['Bilge Bilişim Toptan A.Ş.', 12, 16], ['Anka Aksesuar Tic. Ltd. Şti.', 25, 10], ['Kuzey Ambalaj San. Ltd. Şti.', 8, 6]];
const BF_BILLS = [['Mağaza kirası · Kadıköy', 1, 22], ['Mağaza kirası · Ataşehir', 1, 20], ['Güvenlik ve temizlik hizmeti', 6, 10], ['Yazılım ve bulut abonelikleri', 8, 5], ['İnternet ve telefon', 10, 3], ['Elektrik faturası', 12, 14], ['Doğalgaz faturası', 13, 6], ['Su faturası', 14, 2], ['Lojistik hizmet faturası', 15, 18]];
const BF_OOUT = [['Dijital reklam', 3, 25], ['Kargo ve kurye', 9, 30], ['Bakım ve onarım', 17, 12], ['İşyeri sigortası', 21, 10], ['Muhasebe ve müşavirlik', 27, 13], ['Banka ve POS masrafları', 30, 10]];
const BF_CORP = ['Delta Ofis Çözümleri A.Ş.', 'Nova Eğitim Kurumları', 'Lale Otel İşletmeleri A.Ş.', 'Atlas Lojistik A.Ş.'];
const BF_OIN = [['Tedarikçi prim iadesi', 'Ege Elektronik Dağıtım A.Ş.'], ['Garanti servis tahsilatı', 'Yetkili servis hak edişi'], ['Depo alt kira geliri', 'Atlas Lojistik A.Ş.'], ['Çek tahsilatı', 'Delta Ofis Çözümleri A.Ş.']];
const bfTxCache = {};
/* Transactions of one category in month i — lines add up exactly to the month's total */
function bfTxns(id, i) {
  const key = id + i;
  if (bfTxCache[key]) return bfTxCache[key];
  const r = bfRng((i + 1) * 7919 + id.length * 104729 + id.charCodeAt(0) * 31), { m, y } = bfMonth(i);
  const days = new Date(y, m + 1, 0).getDate(), mon = VM_AY[m];
  const lines = [];   // [day, weight, title, sub]
  if (id === 'pos') [2, 5, 8, 12, 15, 19, 22, 26, 29].forEach((d, k) => lines.push([d, 0.8 + r() * 0.5, 'POS tahsilatı', k % 3 === 2 ? 'Ataşehir Mağaza' : 'Kadıköy Mağaza']));
  if (id === 'order') {
    [4, 11, 18, 25].forEach(d => lines.push([d, 1.4 + r() * 0.5, 'Online mağaza tahsilatı', 'Sanal POS']));
    [9, 23].forEach(d => lines.push([d, 0.9 + r() * 0.4, 'Pazaryeri hak ediş ödemesi', 'Pazaryeri satışları']));
    [15, 28].forEach((d, k) => lines.push([d, 0.8 + r() * 0.6, 'Kurumsal sipariş tahsilatı', BF_CORP[(i + k) % BF_CORP.length]]));
  }
  if (id === 'cash') [3, 7, 10, 14, 17, 21, 24, 28].forEach((d, k) => lines.push([d, 0.8 + r() * 0.5, 'Nakit yatırma', k % 2 ? 'Ataşehir Mağaza kasası · ATM' : 'Kadıköy Mağaza kasası · şube']));
  if (id === 'oin') [[10, 0], [18, 1 + (i % 2)], [25, 3]].forEach(([d, k]) => lines.push([d, 0.7 + r() * 0.6, BF_OIN[k][0], BF_OIN[k][1]]));
  if (id === 'bill') BF_BILLS.forEach(([t, d, w]) => lines.push([d, w * (0.9 + r() * 0.2), t, t.startsWith('Mağaza') ? 'Kira ödemesi' : 'Fatura ödemesi']));
  if (id === 'sal') {
    const prev = VM_AY[(m + 11) % 12], staff = BF_STAFF[i];
    if (m === 11) { lines.push([1, 2, 'Maaş ödemesi', `${staff} çalışan · ${prev} dönemi`]); lines.push([18, 1, 'Yılsonu ikramiyesi', `${staff} çalışan`]); }
    else lines.push([1, 1, 'Maaş ödemesi', `${staff} çalışan · ${prev} dönemi`]);
  }
  if (id === 'sup') BF_SUPPLIERS.forEach(([t, d, w]) => lines.push([d, w * (0.92 + r() * 0.16), t, m >= 9 || m === 11 ? 'Sezon stok alımı' : 'Ürün alımı · fatura ödemesi']));
  if (id === 'oout') BF_OOUT.forEach(([t, d, w]) => lines.push([d, w * (0.85 + r() * 0.3), t, 'Gider ödemesi']));
  const total = BF_SERIES[id][i], wsum = lines.reduce((s, l) => s + l[1], 0);
  let acc = 0;
  const out = lines.map((l, k) => {
    const a = k === lines.length - 1 ? Math.round((total - acc) * 100) / 100 : Math.round(total * l[1] / wsum * 100 + (r() - 0.5) * 900) / 100;
    acc += a;
    return { d: Math.min(l[0], days), mon, i, a, t: l[2], s: l[3], cat: id };
  });
  out.forEach(x => {   // card transactions / orders as the count shown next to POS and order lines
    const c = bfCat(id);
    if (c.ticket && !x.t.startsWith('Kurumsal')) x.n = Math.max(1, Math.round(x.a / c.ticket));
  });
  return (bfTxCache[key] = out.sort((a, b) => b.d - a.d));
}
function bfCount(id, from, to) {
  let n = 0;
  for (let i = from; i <= to; i++) n += bfTxns(id, i).reduce((s, x) => s + (x.n || 1), 0);
  return n;
}
function bfSideCount(side, from, to) { return bfSideCats(side).reduce((s, c) => s + bfCount(c.id, from, to), 0); }

/* -------------------- financing maths (EXAMPLE rates) -------------------- */
function bfI(o) { return o.rate / 100 * (1 + BF_BSMV / 100); }   // monthly cost incl. BSMV
function bfAnnuity(P, i, n) { return P * i / (1 - Math.pow(1 + i, -n)); }
/* Quote + repayment plan for an offer. Dates start from the disbursement date `d0`. */
function bfQuote(o, P = o.amount, n = o.term, d0 = bfDisbDate()) {
  const r = o.rate / 100, rows = [];
  const fee = Math.round(P * BF_FEE / 100);
  let rest = P;
  const row = (k, prin, int) => { const tax = int * BF_BSMV / 100; rest = Math.max(0, rest - prin); rows.push({ n: k, date: bfAddMonths(d0, k), prin, int, tax, pay: prin + int + tax, rest }); };
  if (o.kind === 'annuity' || o.kind === 'grace') {
    const g = o.kind === 'grace' ? o.grace : 0;
    for (let k = 1; k <= g; k++) row(k, 0, rest * r);
    const pay = bfAnnuity(P, bfI(o), n - g);
    for (let k = g + 1; k <= n; k++) { const int = rest * r; row(k, k === n ? rest : pay - int * (1 + BF_BSMV / 100), int); }
  } else if (o.kind === 'bullet') {
    row(n, P, P * r * n);
  } else {   // revolving: interest on the example usage from the forecast (only the days it is needed)
    const use = bfLineUse(P);
    use.forEach((u, k) => row(k + 1, 0, u.int));
    rows.forEach(x => { x.rest = 0; });
  }
  const int = rows.reduce((s, x) => s + x.int, 0), tax = rows.reduce((s, x) => s + x.tax, 0);
  const regular = o.kind === 'grace' ? rows[rows.length - 1].pay : rows[0].pay;
  return { P, n, rows, fee, int, tax, cost: int + tax + fee, total: (o.kind === 'revolving' ? bfLineUsed(P) : P) + int + tax,
    monthly: o.kind === 'bullet' ? 0 : regular, first: rows[0], last: rows[rows.length - 1] };
}
/* Revolving line: use only what the forecast says is missing (capped at the limit) */
function bfLineUse(limit) {
  const months = {};
  BF_FC.forEach((b, k) => {
    if (b >= 0) return;
    const d = bfFcDate(k), key = d.getFullYear() * 12 + d.getMonth();
    const use = Math.min(limit, -b);
    (months[key] = months[key] || { key, sum: 0, max: 0 });
    months[key].sum += use; months[key].max = Math.max(months[key].max, use);
  });
  const o = BF_OFFERS.find(x => x.id === 'line');
  return Object.values(months).sort((a, b) => a.key - b.key).map(x => ({ ...x, int: x.sum * o.rate / 100 / 30 }));
}
function bfLineUsed(limit) { return Math.max(...bfLineUse(limit).map(x => x.max)); }   // peak usage
function bfDisbDate() { const a = state.bf.app; return a && a.disbTs ? new Date(a.disbTs) : bfFcDate(BF_DRAW_IDX); }
/* Terms of the application (amount / term chosen by the customer; defaults to the offer) */
function bfDraft() {
  const v = state.bf, o = bfOffer();
  if (!v.draft || v.draft.id !== o.id) v.draft = { id: o.id, amount: o.amount, term: o.term };
  return v.draft;
}
function bfTermTxt(o, n) { return o.kind === 'bullet' ? `${n * 30} gün` : o.kind === 'revolving' ? `${n} ay (limit süresi)` : `${n} ay`; }

/* -------------------- analysis results (derived from the demo data) -------------------- */
function bfGaps() {   // contiguous negative windows of the forecast
  const out = [];
  let cur = null;
  BF_FC.forEach((b, k) => {
    if (b < 0) {
      if (!cur) cur = { from: k, to: k, min: b, minK: k };
      cur.to = k;
      if (b < cur.min) { cur.min = b; cur.minK = k; }
    } else if (cur) { out.push(cur); cur = null; }
  });
  if (cur) out.push(cur);
  return out;
}
const BF_GAP_WHY = [
  'Maaş ve kira (1 Aralık) ile sezon stok ödemesi (5 Aralık) aynı haftaya denk geliyor; POS tahsilatları ay boyunca yayılarak geliyor.',
  'Yılsonu ikramiyesi ve tedarikçi ödemesi 20 Aralık’ta birlikte çıkıyor.',
  'Maaş ve kira sonrası, sezon stok alımının ikinci ödemesi 5 Ocak’ta.',
];
function bfNeed() {
  const min = Math.min(...BF_FC);
  return { min, minK: BF_FC.indexOf(min), amount: Math.ceil(-min * (1 + BF_BUFFER / 100) / 50000) * 50000 };
}
function bfAvg(side) { return bfTot(side, 21, 23) / 3; }
function bfAI() {
  const a = 21, c = 23, inA = bfMIn(a), inC = bfMIn(c), outA = bfMOut(a), outC = bfMOut(c);
  const sup = bfChg(BF_SERIES.sup[c], BF_SERIES.sup[a]);
  const posShare = bfSum('pos', a, c) / bfTot('in', a, c) * 100;
  const days = BF_BIZ.balance / (bfAvg('out') / 30);
  const need = bfNeed(), lastDec = bfMIn(13) - bfMOut(13);
  const supYoY = bfChg(BF_SERIES.sup[c], BF_SERIES.sup[c - 12]);
  const top = bfTxns('sup', c).filter(x => x.t.startsWith('Ege')).reduce((s, x) => s + x.a, 0) / BF_SERIES.sup[c] * 100;
  return { inG: bfChg(inC, inA), outG: bfChg(outC, outA), netA: inA - outA, netC: inC - outC, sup, posShare, days, need, lastDec, supYoY, top };
}
function bfScores() {
  return [
    ['Gelir büyümesi', 88, 'Girişler üç ayda istikrarlı artıyor'],
    ['Nakit marjı', 74, 'Girişlerin yaklaşık %18’i nete kalıyor'],
    ['Gider dengesi', 62, 'Giderler girişlerden hızlı artıyor'],
    ['Nakit tamponu', 40, 'Bakiye birkaç günlük gidere yetiyor'],
  ];
}
function bfScore() { const s = bfScores(); return Math.round(s.reduce((x, y) => x + y[1], 0) / s.length); }
function bfScoreLabel(n) { return n >= 75 ? 'Güçlü' : n >= 60 ? 'İyi' : n >= 45 ? 'Orta' : 'Zayıf'; }

/* -------------------- charts (inline SVG, theme-aware via CSS classes) -------------------- */
function bfNiceMax(v) {
  const mag = Math.pow(10, Math.floor(Math.log10(v || 1)));
  for (const m of [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) if (m * mag >= v * 1.04) return m * mag;
  return 10 * mag;
}
/* Money in vs money out per month (grouped bars) with the month's net (thousand TL) under each month */
function bfBarsSVG(from, to, focus = null) {
  const n = to - from + 1, W = 340, H = 176, L = 34, R = 4, T = 10, B = 40;
  const ins = [], outs = [];
  for (let i = from; i <= to; i++) { ins.push(bfMIn(i)); outs.push(bfMOut(i)); }
  const top = bfNiceMax(Math.max(...ins, ...outs)), ph = H - T - B, cw = (W - L - R) / n;
  const bw = Math.max(4, Math.min(18, cw * 0.32)), gap = n > 6 ? 1.5 : 3;
  const y = v => T + ph * (1 - v / top);
  const grid = [0, top / 2, top].map(g => `<line class="bf-grid" x1="${L}" x2="${W - R}" y1="${y(g)}" y2="${y(g)}"/><text class="bf-axis" x="${L - 5}" y="${y(g) + 3.5}" text-anchor="end">${g ? bfCompact(g) : '0'}</text>`).join('');
  const bars = ins.map((a, k) => {
    const cx = L + cw * k + cw / 2, b = outs[k], net = a - b, i = from + k;
    return `<g class="bf-bar-g ${focus ? 'f-' + focus : ''}">
      <rect class="bf-b-in" x="${cx - bw - gap / 2}" y="${y(a)}" width="${bw}" height="${ph * a / top}" rx="${Math.min(3, bw / 3)}"><title>${bfMonLong(i)} · giriş ${vmTL(a)}</title></rect>
      <rect class="bf-b-out" x="${cx + gap / 2}" y="${y(b)}" width="${bw}" height="${ph * b / top}" rx="${Math.min(3, bw / 3)}"><title>${bfMonLong(i)} · çıkış ${vmTL(b)}</title></rect>
      <text class="bf-axis m" x="${cx}" y="${H - B + 14}" text-anchor="middle">${bfMonShort(i)}</text>
      <text class="bf-axis net ${net < 0 ? 'neg' : 'pos'}" x="${cx}" y="${H - B + 30}" text-anchor="middle">${bfSign(net)}${Math.round(Math.abs(net) / 1000).toLocaleString('tr-TR')}</text>
    </g>`;
  }).join('');
  return `<svg class="bf-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Aylık para girişi ve çıkışı">${grid}${bars}
    <text class="bf-axis" x="${L - 5}" y="${H - B + 30}" text-anchor="end">Net</text></svg>
    <div class="bf-svg-cap">Net satırı bin TL</div>`;
}
/* Monthly net flow: actual months (+ optional projected months, hatched) */
function bfNetSVG(from, to, proj = []) {
  const vals = [];
  for (let i = from; i <= to; i++) vals.push({ v: bfMIn(i) - bfMOut(i), l: bfMonShort(i) });
  proj.forEach(([m, v]) => vals.push({ v, l: m.slice(0, 3), p: true }));
  const W = 340, H = 160, L = 6, R = 6, T = 18, B = 34, n = vals.length, cw = (W - L - R) / n, bw = Math.min(26, cw * 0.56);
  const mx = Math.max(...vals.map(x => Math.abs(x.v))) * 1.1, pos = Math.max(...vals.map(x => x.v), 0), neg = -Math.min(...vals.map(x => x.v), 0);
  const ph = H - T - B, zero = T + ph * pos / (pos + neg || 1), sc = ph / (pos + neg || mx);
  const first = proj.length ? vals.length - proj.length : -1;
  return `<svg class="bf-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Aylık net nakit akışı">
    ${first > 0 ? `<rect class="bf-proj-bg" x="${L + cw * first}" y="2" width="${cw * proj.length}" height="${H - 4}" rx="8"/><text class="bf-axis proj" x="${L + cw * first + cw * proj.length / 2}" y="12" text-anchor="middle">Tahmin</text>` : ''}
    <line class="bf-zero" x1="${L}" x2="${W - R}" y1="${zero}" y2="${zero}"/>
    ${vals.map((x, k) => {
      const cx = L + cw * k + cw / 2, h = Math.max(2, Math.abs(x.v) * sc), yy = x.v >= 0 ? zero - h : zero;
      return `<rect class="bf-nb ${x.v < 0 ? 'neg' : 'pos'} ${x.p ? 'p' : ''}" x="${cx - bw / 2}" y="${yy}" width="${bw}" height="${h}" rx="3"/>
        <text class="bf-axis v ${x.v < 0 ? 'neg' : 'pos'}" x="${cx}" y="${x.v >= 0 ? yy - 4 : yy + h + 11}" text-anchor="middle">${bfCompactS(x.v).replace(' bin', 'b').replace(' mn', 'm')}</text>
        <text class="bf-axis m" x="${cx}" y="${H - 6}" text-anchor="middle">${x.l}</text>`;
    }).join('')}
  </svg>`;
}
/* 120-day projected balance; optional second line with the recommended financing */
function bfFcSVG(withFin) {
  const W = 340, H = 190, L = 40, R = 6, T = 14, B = 24, n = BF_FC.length;
  const fin = withFin ? bfFcWithFin() : null;
  const all = BF_FC.concat(fin || []), hi = bfNiceMax(Math.max(...all)), lo = -bfNiceMax(-Math.min(...all));
  const x = k => L + (W - L - R) * k / (n - 1), y = v => T + (H - T - B) * (hi - v) / (hi - lo);
  const path = arr => arr.map((v, k) => `${k ? 'L' : 'M'}${x(k).toFixed(1)},${y(v).toFixed(1)}`).join('');
  const need = bfNeed(), gaps = bfGaps();
  const ticks = [0, 20, 51, 82, 110].filter(k => k < n);   // 11 Kas, 1 Ara, 1 Oca, 1 Şub, 1 Mar
  return `<svg class="bf-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Önümüzdeki 120 günün tahmini hesap bakiyesi">
    <defs><clipPath id="bf-below"><rect x="${L}" y="${y(0)}" width="${W - L - R}" height="${H}"/></clipPath><clipPath id="bf-above"><rect x="${L}" y="0" width="${W - L - R}" height="${y(0)}"/></clipPath></defs>
    ${gaps.map(g => `<rect class="bf-gap-band" x="${x(g.from) - 1.5}" y="${T}" width="${x(g.to) - x(g.from) + 3}" height="${H - T - B}"/>`).join('')}
    ${[hi, hi / 2, 0, lo].map(g => `<line class="${g ? 'bf-grid' : 'bf-zero'}" x1="${L}" x2="${W - R}" y1="${y(g)}" y2="${y(g)}"/><text class="bf-axis" x="${L - 5}" y="${y(g) + 3.5}" text-anchor="end">${g ? bfCompactS(g).replace(' bin', 'b').replace(' mn', 'm') : '0'}</text>`).join('')}
    <path class="bf-fc-area" d="${path(BF_FC)}L${x(n - 1)},${y(0)}L${x(0)},${y(0)}Z" clip-path="url(#bf-above)"/>
    <path class="bf-fc-area neg" d="${path(BF_FC)}L${x(n - 1)},${y(0)}L${x(0)},${y(0)}Z" clip-path="url(#bf-below)"/>
    <path class="bf-fc-line" d="${path(BF_FC)}"/>
    ${fin ? `<path class="bf-fc-line fin" d="${path(fin)}"/>` : ''}
    <circle class="bf-fc-min" cx="${x(need.minK)}" cy="${y(need.min)}" r="4.5"/>
    <text class="bf-axis minl" x="${x(need.minK) + 7}" y="${y(need.min) + 4}">${bfCompactS(need.min)} · ${bfDayTxt(bfFcDate(need.minK))}</text>
    ${ticks.map(k => `<text class="bf-axis m" x="${x(k)}" y="${H - 7}" text-anchor="${k ? 'middle' : 'start'}">${bfFcDate(k).getDate()} ${BF_AY3[bfFcDate(k).getMonth()]}</text>`).join('')}
  </svg>`;
}
/* Balance path when the recommended financing is used (disbursed on BF_DRAW_IDX, monthly instalments after) */
function bfFcWithFin() {
  const o = BF_OFFERS[0], q = bfQuote(o, bfNeed().amount, o.term, bfFcDate(BF_DRAW_IDX));
  return BF_FC.map((b, k) => {
    if (k < BF_DRAW_IDX) return b;
    const d = bfFcDate(k);
    return b + q.P - q.rows.filter(r => r.date <= d).reduce((s, r) => s + r.pay, 0);
  });
}
function bfGauge(score) {
  const r = 46, c = Math.PI * r, f = c * score / 100;
  return `<svg class="bf-gauge" viewBox="0 0 120 70" role="img" aria-label="Finansal sağlık puanı ${score}">
    <path d="M14 62 A46 46 0 0 1 106 62" class="bf-g-bg"/>
    <path d="M14 62 A46 46 0 0 1 106 62" class="bf-g-fg" stroke-dasharray="${f.toFixed(1)} ${c.toFixed(1)}"/>
    <text x="60" y="54" text-anchor="middle" class="bf-g-n">${score}</text><text x="60" y="67" text-anchor="middle" class="bf-g-s">/ 100</text>
  </svg>`;
}

/* -------------------- Screen 1 — İşletme Finansmanı home (dashboard) -------------------- */
function BfHome() {
  const v = state.bf, p = bfPer(), tin = bfTot('in', p.from, p.to), tout = bfTot('out', p.from, p.to), net = tin - tout, n = bfLen(p);
  return `
  <div class="screen ${vmAnim()} vm bf">
    <div class="nav-head ru-nav-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">İşletme Finansmanı</div>
      <button class="icon-btn" data-action="bf-info" aria-label="Akıllı İşletme Sermayesi Finansmanı nedir?">${I.info}</button>
    </div>
    <div class="screen-scroll">
      <div class="ru-statcard bf-hero">
        <div class="bf-biz">
          <span class="bf-biz-av">${BF_BIZ.initials}</span>
          <div class="bf-biz-t"><b>${BF_BIZ.name}</b><span>${BF_BIZ.sector} · ${BF_BIZ.segment} · ${BF_BIZ.employees} çalışan</span></div>
        </div>
        <button class="bf-per-btn" data-action="bf-period">${I.calendar}<span>Analiz dönemi: ${bfPerLabel()} · ${bfRangeShort(p.from, p.to)}</span>${I.chevDown}</button>
        <div class="ru-jar-label">Net nakit akışı</div>
        <div class="ru-jar-amt bf-net">${bfTLs(net)}</div>
        <div class="bf-hero-sub">${n > 1 ? `Aylık ortalama ${bfTLs(net / n)}` : bfRangeTxt(p.from, p.to)}</div>
        <div class="ru-statrow">
          <div class="ru-stat tap" data-action="bf-flows-side" data-side="in"><div class="ru-stat-l"><i class="bf-dot in"></i>Toplam giriş</div><div class="ru-stat-v">${bfCompact(tin)} TL</div></div>
          <div class="ru-stat mid tap" data-action="bf-flows-side" data-side="out"><div class="ru-stat-l"><i class="bf-dot out"></i>Toplam çıkış</div><div class="ru-stat-v">${bfCompact(tout)} TL</div></div>
          <div class="ru-stat"><div class="ru-stat-l">Net marj</div><div class="ru-stat-v">%${vmPctStr((net / tin * 100).toFixed(1))}</div></div>
        </div>
      </div>
      ${bfOngoingHTML()}
      <div id="bf-ai-card">${bfAiCardHTML()}</div>
      <div class="vm-sec-h"><span>Aylık finansal durum</span><span class="bf-legend"><i class="in"></i>Giriş<i class="out"></i>Çıkış</span></div>
      <div class="vm-box bf-chart-box">${bfBarsSVG(p.from, p.to)}${bfMonthStatusHTML(p)}</div>
      <div class="vm-sec-h"><span>Finansal hareketlerin özeti</span><button class="sp-link" data-action="bf-flows">Tümü ${I.chevR}</button></div>
      <div class="vm-box bf-sum">${bfSumSideHTML('in', p)}${bfSumSideHTML('out', p)}</div>
      <div class="vm-sec-h"><span>Sana özel finansman önerileri</span>${v.ai.status === 'done' ? `<button class="sp-link" data-action="bf-offers">Tümü ${I.chevR}</button>` : ''}</div>
      <div id="bf-home-offers">${bfHomeOffersHTML()}</div>
      <div class="sp-foot-note">${I.lock} Veriler ${BF_ASOF} itibarıyla günceldir · demo veri</div>
    </div>
  </div>`;
}
function bfMonthStatusHTML(p) {
  const ms = [];
  for (let i = p.from; i <= p.to; i++) ms.push({ i, net: bfMIn(i) - bfMOut(i) });
  const plus = ms.filter(m => m.net >= 0).length, best = ms.reduce((a, b) => b.net > a.net ? b : a), worst = ms.reduce((a, b) => b.net < a.net ? b : a);
  return `<div class="bf-mstat">
    <div><span>Nakit fazlası veren ay</span><b>${plus} / ${ms.length}</b></div>
    ${ms.length > 1 ? `<div><span>En güçlü ay</span><b class="pos">${VM_AY[bfMonth(best.i).m]} · ${bfCompactS(best.net)}</b></div>
    <div><span>En zayıf ay</span><b class="${worst.net < 0 ? 'neg' : ''}">${VM_AY[bfMonth(worst.i).m]} · ${bfCompactS(worst.net)}</b></div>` : ''}
  </div>`;
}
function bfSumSideHTML(side, p) {
  const cats = bfSideCats(side), tot = bfTot(side, p.from, p.to);
  const rows = cats.map(c => ({ c, a: bfSum(c.id, p.from, p.to) }));
  return `<div class="bf-sum-side">
    <div class="bf-sum-h"><span><i class="bf-dot ${side}"></i>${side === 'in' ? 'Şirkete girenler' : 'Şirketten çıkanlar'}</span><b>${vmTL(tot)}</b></div>
    <div class="debt-bar bf-dist" role="img" aria-label="Kategorilere göre dağılım">${rows.map(x => `<span class="debt-seg" style="flex:${x.a} 1 0;background:${x.c.color}"></span>`).join('')}</div>
    ${rows.map(x => `<div class="bf-sum-row tap" data-action="bf-flows-cat" data-side="${side}" data-cat="${x.c.id}">
      ${bfIco(x.c, 'sm')}<span class="bf-sum-n">${x.c.name}</span><span class="bf-sum-p">%${Math.round(x.a / tot * 100)}</span><b>${bfCompact(x.a)} TL</b>${I.chevR}
    </div>`).join('')}
  </div>`;
}
function bfAiCardHTML() {
  const ai = state.bf.ai;
  if (ai.status === 'done') {
    const need = bfNeed(), g = bfGaps()[0], sc = bfScore();
    return `<div class="bf-ai-card done tap" data-action="bf-analysis">
      <div class="bf-ai-top"><span class="bf-ai-ico">${I.spark}</span><div><b>Yapay zekâ analizin hazır</b><span>${ai.at || ''} · son 3 ay</span></div>${I.chevR}</div>
      <div class="bf-ai-kpis">
        <div><span>Finansal sağlık</span><b>${sc} <em>${bfScoreLabel(sc)}</em></b></div>
        <div><span>Finansman ihtiyacı</span><b>${vmTL(need.amount)}</b></div>
        <div><span>Riskli dönem</span><b class="neg">${bfFcDate(g.from).getDate()}–${bfDayTxt(bfFcDate(g.to))}</b></div>
      </div>
    </div>`;
  }
  if (ai.status === 'run') {
    return `<div class="bf-ai-card run tap" data-action="bf-analysis">
      <div class="bf-ai-top"><span class="bf-ai-ico spin">${I.spark}</span><div><b>Finansal verilerin analiz ediliyor</b><span class="bf-shim">${BF_AI_STEPS[Math.min(ai.step, BF_AI_STEPS.length - 1)]}…</span></div>${I.chevR}</div>
    </div>`;
  }
  return `<div class="bf-ai-card">
    <div class="bf-ai-top"><span class="bf-ai-ico">${I.spark}</span><div><b>Yapay zekâ ile finansal analiz</b><span>Son 3 ayın para giriş ve çıkışlarını inceler; nakit açığı risklerini ve finansman ihtiyacını önceden belirler.</span></div></div>
    <button class="btn-primary bf-ai-btn" data-action="bf-analyze">${I.spark} Yapay Zekâ ile Finansal Analiz Et</button>
  </div>`;
}
function bfHomeOffersHTML() {
  if (state.bf.ai.status !== 'done') {
    return `<div class="vm-box bf-locked">
      <div class="bf-ghosts"><i></i><i></i><i></i></div>
      <p>${I.lock} Yapay zekâ analizinden sonra işletmenin nakit akışına göre kişiselleştirilmiş finansman teklifleri burada listelenir.</p>
    </div>`;
  }
  return `<div class="bf-hoffers">${BF_OFFERS.slice(0, 3).map(o => {
    const q = bfQuote(o);
    return `<div class="bf-hoffer tap ${o.best ? 'best' : ''}" data-action="bf-offer-focus" data-id="${o.id}">
      <span class="bf-tag ${o.best ? 'ai' : ''}">${o.best ? I.spark : ''}${o.tag}</span>
      <b>${o.short}</b>
      <em>${o.kind === 'revolving' ? 'Limit ' : ''}${vmTL(o.amount)}</em>
      <span>${bfTermTxt(o, o.term)} · ${o.kind === 'revolving' ? 'kullandıkça faiz' : o.kind === 'bullet' ? 'vade sonunda tek ödeme' : `aylık ${vmTL(q.monthly)}`}</span>
    </div>`;
  }).join('')}</div>`;
}
function bfOngoingHTML() {
  const a = state.bf.app;
  if (!a) return '';
  const o = bfOffer(a.offer);
  return `<div class="vm-ongoing bf-ongoing tap" data-action="bf-track">
    <span class="bf-ico" style="--c:var(--primary)">${I[o.icon]}</span>
    <div class="vm-og-mid"><span>Finansman başvurun</span><b>${o.short} · ${vmTL(a.amount)}</b><em>${bfStatusTxt(a)}</em></div>
    ${I.chevR}
  </div>`;
}
function bfInfoSheet() {
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>Akıllı İşletme Sermayesi Finansmanı</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="debt-how">
      <p class="bf-how-lead">Kredi değil, işletme finansman platformu.</p>
      <div class="debt-how-row"><span class="debt-how-ico">${I.bars}</span><div><b>Para giriş ve çıkışların tek ekranda</b><span>POS satışları, siparişler, nakit ve diğer tahsilatlar; fatura, maaş, tedarikçi ve diğer ödemeler aylık olarak karşılaştırılır.</span></div></div>
      <div class="debt-how-row"><span class="debt-how-ico">${I.spark}</span><div><b>Yapay zekâ destekli analiz</b><span>Nakit akışı eğilimi, olası nakit açığı dönemleri ve risk göstergeleri doğal dilde açıklanır.</span></div></div>
      <div class="debt-how-row"><span class="debt-how-ico">${I.loan}</span><div><b>Doğru zamanda, sana özel finansman</b><span>İhtiyacın ve zamanlaması belirlenir; uygun alternatifler karşılaştırılarak tek akışta başvurulur.</span></div></div>
    </div>
    <div class="vm-sheet-note">${I.info}<span>Prototip: işletme, tutarlar, analiz ve teklifler demo veridir; gerçek hesap, POS veya yapay zekâ bağlantısı yoktur.</span></div>
    <button class="sheet-btn" data-action="close-sheet">Anladım</button>`;
  sheetEl.classList.add('open'); sheetScrimEl.classList.add('open');
}

/* -------------------- period selection (shared by the dashboard and the movements screen) -------------------- */
function bfPeriodSheet() {
  const v = state.bf, p = v.period;
  v.pick = p.id === 'custom' ? { from: p.from, to: p.to } : null;
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>Analiz dönemi</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="vm-choices bf-per-list">
      ${BF_PERIODS.map(([id, n, t]) => `<button class="vm-choice ${p.id === id ? 'on' : ''}" data-action="bf-per-set" data-v="${id}"><span>${t}<em>${bfRangeTxt(BF_LAST - n + 1, BF_LAST)}</em></span>${p.id === id ? `<i>${I.check}</i>` : ''}</button>`).join('')}
      <button class="vm-choice ${p.id === 'custom' ? 'on' : ''}" data-action="bf-per-custom"><span>Özel aralık<em id="bf-pick-txt">${p.id === 'custom' ? bfRangeTxt(p.from, p.to) : 'Başlangıç ve bitiş ayını seç'}</em></span><i class="${p.id === 'custom' ? '' : 'dim'}">${p.id === 'custom' ? I.check : I.chevDown}</i></button>
    </div>
    <div class="bf-mgrid-wrap ${p.id === 'custom' ? '' : 'hide'}" id="bf-mgrid-wrap">
      <div class="bf-mgrid" id="bf-mgrid">${bfMonthGridHTML()}</div>
      <button class="sheet-btn" data-action="bf-per-apply">Uygula</button>
    </div>
    <div class="vm-sheet-note">${I.info}<span>Karşılaştırma, seçtiğin dönemi hemen önceki eşit uzunluktaki dönemle yapar.</span></div>`;
  sheetEl.classList.add('open'); sheetScrimEl.classList.add('open');
}
function bfMonthGridHTML() {
  const pk = state.bf.pick, out = [];
  for (let i = BF_LAST - 11; i <= BF_LAST; i++) {
    const on = pk && (i === pk.from || i === pk.to), inr = pk && pk.to != null && i > pk.from && i < pk.to;
    out.push(`<button class="bf-mcell ${on ? 'on' : ''} ${inr ? 'in' : ''}" data-action="bf-per-month" data-i="${i}">${bfMonShort(i)}<em>${bfMonth(i).y}</em></button>`);
  }
  return out.join('');
}
function bfPerCustom() {
  document.getElementById('bf-mgrid-wrap')?.classList.remove('hide');
  if (!state.bf.pick) { state.bf.pick = { from: BF_LAST - 2, to: BF_LAST }; bfPickRefresh(); }
}
function bfPerMonth(i) {
  const v = state.bf;
  if (!v.pick || v.pick.to != null) v.pick = { from: i, to: null };
  else if (i < v.pick.from) v.pick = { from: i, to: v.pick.from };
  else v.pick.to = i;
  bfPickRefresh();
}
function bfPickRefresh() {
  const g = document.getElementById('bf-mgrid'), t = document.getElementById('bf-pick-txt'), pk = state.bf.pick;
  if (g) g.innerHTML = bfMonthGridHTML();
  if (t) t.textContent = pk.to == null ? `${bfMonLong(pk.from)} · bitiş ayını seç` : bfRangeTxt(pk.from, pk.to);
}
function bfPerSet(id) {
  const n = BF_PERIODS.find(x => x[0] === id)[1];
  bfApplyPeriod({ id, from: BF_LAST - n + 1, to: BF_LAST });
}
function bfPerApply() {
  const pk = state.bf.pick;
  if (!pk) return;
  bfApplyPeriod({ id: 'custom', from: pk.from, to: pk.to == null ? pk.from : pk.to });
}
function bfApplyPeriod(p) {
  const v = state.bf;
  v.period = p; v.shown = 20;
  closeSheet();
  vmRerender();
}

/* -------------------- Screen 2 — money in / money out details -------------------- */
function BfFlows() {
  const v = state.bf, p = bfPer(), side = v.side, q = bfPrev(p), n = bfLen(p);
  const tot = bfTot(side, p.from, p.to), cnt = bfSideCount(side, p.from, p.to), ptot = bfTot(side, q.from, q.to);
  return `
  <div class="screen ${vmAnim()} vm bf sp-screen">
    <div class="nav-head sp-nav-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Finansal Hareketler</div>
      <span class="icon-btn" style="visibility:hidden">${I.info}</span>
    </div>
    <div class="sp-top">
      <div class="sp-seg">
        <button class="sp-seg-b ${side === 'in' ? 'on' : ''}" data-action="bf-side" data-side="in">Şirkete Girenler</button>
        <button class="sp-seg-b ${side === 'out' ? 'on' : ''}" data-action="bf-side" data-side="out">Şirketten Çıkanlar</button>
      </div>
      <div class="sp-filters">
        <button class="sp-fpill" data-action="bf-period"><span class="sp-fp-ic">${I.calendar}</span><span>${p.id === 'custom' ? bfRangeShort(p.from, p.to) : bfPerLabel()}</span>${I.chevDown}</button>
        <button class="sp-fpill bf-cmp-pill ${v.cmp ? 'on' : ''}" data-action="bf-cmp" aria-pressed="${v.cmp}"><span class="sp-fp-ic">${I.bars}</span><span>Karşılaştır</span><i class="bf-sw ${v.cmp ? 'on' : ''}"></i></button>
      </div>
    </div>
    <div class="screen-scroll">
      <div class="sp-card bf-flow-sum">
        <div class="sp-sum-label">${side === 'in' ? 'Şirkete giren para' : 'Şirketten çıkan para'} · ${bfRangeTxt(p.from, p.to)}</div>
        <div class="sp-sum-amt bf-amt-${side}">${vmTL(tot)}</div>
        <div class="bf-flow-meta"><span>${cnt.toLocaleString('tr-TR')} işlem</span>${n > 1 ? `<span>Aylık ort. ${vmTL(tot / n)}</span>` : ''}
          ${v.cmp ? `<span class="bf-chip ${bfGood(side, tot - ptot) ? 'good' : 'bad'}">${bfChgTxt(bfChg(tot, ptot))} önceki döneme göre</span>` : ''}</div>
      </div>
      ${v.cmp ? bfCmpHTML(p, q) : ''}
      <div class="sp-card bf-chart-card">
        <div class="bf-card-h"><span>Giriş ve çıkış karşılaştırması</span><span class="bf-legend"><i class="in"></i>Giriş<i class="out"></i>Çıkış</span></div>
        ${bfBarsSVG(p.from, p.to, side)}
      </div>
      <div class="vm-sec-h"><span>Kategoriler</span><span class="bf-sec-sub">${bfRangeShort(p.from, p.to)}</span></div>
      <div class="bf-cats">${bfSideCats(side).map(c => bfCatCardHTML(c, p, q)).join('')}</div>
      <div class="vm-sec-h" id="bf-tx-h"><span>İşlemler</span><span class="bf-sec-sub">${v.cat ? bfCat(v.cat).name : 'Tüm kategoriler'}</span></div>
      <div class="bf-txchips vm-chips">
        <button class="vm-chip ${!v.cat ? 'on' : ''}" data-action="bf-cat" data-cat="">Tümü</button>
        ${bfSideCats(side).map(c => `<button class="vm-chip ${v.cat === c.id ? 'on' : ''}" data-action="bf-cat" data-cat="${c.id}">${c.short}</button>`).join('')}
      </div>
      <div id="bf-tx">${bfTxListHTML()}</div>
      <div class="sp-foot-note">${I.lock} Veriler ${BF_ASOF} itibarıyla günceldir · demo veri</div>
    </div>
  </div>`;
}
function bfGood(side, delta) { return side === 'in' ? delta >= 0 : delta <= 0; }
function bfCatCardHTML(c, p, q) {
  const v = state.bf, side = BF_IN.includes(c) ? 'in' : 'out', tot = bfSum(c.id, p.from, p.to), stot = bfTot(side, p.from, p.to);
  const last = BF_SERIES[c.id][p.to], prevM = BF_SERIES[c.id][p.to - 1], mom = bfChg(last, prevM);
  const cnt = bfCount(c.id, p.from, p.to), ptot = bfSum(c.id, q.from, q.to);
  return `<div class="bf-cat tap ${v.cat === c.id ? 'on' : ''}" data-action="bf-cat" data-cat="${c.id}">
    <div class="bf-cat-top">${bfIco(c)}<div class="bf-cat-mid"><b>${c.name}</b><span>${cnt.toLocaleString('tr-TR')} ${c.unit || 'işlem'}</span></div><b class="bf-cat-a">${vmTL(tot)}</b></div>
    <div class="bf-cat-bar"><i style="width:${Math.round(tot / stot * 100)}%;background:${c.color}"></i></div>
    <div class="bf-cat-foot">
      <span>Payı %${Math.round(tot / stot * 100)}</span>
      <span class="bf-chip ${bfGood(side, mom) ? 'good' : 'bad'}" title="${bfMonLong(p.to)} / ${bfMonLong(p.to - 1)}">Aylık ${bfChgTxt(mom)}</span>
      ${v.cmp ? `<span class="bf-chip ${bfGood(side, tot - ptot) ? 'good' : 'bad'}">Dönem ${bfChgTxt(bfChg(tot, ptot))}</span>` : ''}
    </div>
  </div>`;
}
function bfCmpHTML(p, q) {
  const row = (t, a, b, side) => {
    const mx = Math.max(Math.abs(a), Math.abs(b)) || 1;
    return `<div class="bf-cmp-row">
      <div class="bf-cmp-h"><span>${t}</span><b class="bf-chip ${side ? (bfGood(side, a - b) ? 'good' : 'bad') : (a >= b ? 'good' : 'bad')}">${bfChgTxt(bfChg(a, Math.abs(b)))}</b></div>
      <div class="bf-cmp-bars">
        <div><i class="${side || 'net'}" style="width:${Math.max(2, Math.abs(a) / mx * 100)}%"></i><span>${bfTLs(a).replace('+', '')}</span></div>
        <div class="prev"><i class="${side || 'net'}" style="width:${Math.max(2, Math.abs(b) / mx * 100)}%"></i><span>${bfTLs(b).replace('+', '')}</span></div>
      </div>
    </div>`;
  };
  const ia = bfTot('in', p.from, p.to), ib = bfTot('in', q.from, q.to), oa = bfTot('out', p.from, p.to), ob = bfTot('out', q.from, q.to);
  return `<div class="sp-card bf-cmp">
    <div class="bf-card-h"><span>Dönem karşılaştırması</span></div>
    <div class="bf-cmp-legend"><span><i></i>${bfRangeShort(p.from, p.to)}</span><span class="prev"><i></i>${bfRangeShort(q.from, q.to)}</span></div>
    ${row('Para girişi', ia, ib, 'in')}${row('Para çıkışı', oa, ob, 'out')}${row('Net nakit akışı', ia - oa, ib - ob, null)}
  </div>`;
}
function bfTxListHTML() {
  const v = state.bf, p = bfPer(), ids = v.cat ? [v.cat] : bfSideCats(v.side).map(c => c.id);
  const months = [];
  for (let i = p.to; i >= p.from; i--) {
    const list = ids.flatMap(id => bfTxns(id, i)).sort((a, b) => b.d - a.d || b.a - a.a);
    months.push({ i, list });
  }
  const all = months.reduce((s, m) => s + m.list.length, 0);
  let left = v.shown, html = '';
  for (const m of months) {
    if (left <= 0) break;
    const part = m.list.slice(0, left);
    left -= part.length;
    const sum = m.list.reduce((s, x) => s + x.a, 0);
    html += `<div class="bf-tx-month"><span>${bfMonLong(m.i)}</span><b>${v.side === 'in' ? '+' : '−'}${fmtTL2(sum)}</b></div>
      <div class="vm-box bf-txs">${part.map(x => bfTxRowHTML(x)).join('')}</div>`;
  }
  return html + (all > v.shown ? `<button class="bf-more" data-action="bf-more">Daha fazla göster <em>${all - v.shown} işlem daha</em></button>` : '');
}
function bfTxRowHTML(x) {
  const c = bfCat(x.cat), inSide = BF_IN.includes(c);
  return `<div class="bf-tx">
    ${bfIco(c, 'sm')}
    <div class="bf-tx-mid"><b>${x.t}</b><span>${x.d} ${x.mon} · ${x.s}${x.n && x.n > 1 ? ` · ${x.n.toLocaleString('tr-TR')} ${c.unit}` : ''}</span></div>
    <b class="bf-tx-a ${inSide ? 'in' : ''}">${inSide ? '+' : '−'}${fmtTL2(x.a)}</b>
  </div>`;
}
function bfSetSide(side) { const v = state.bf; v.side = side; v.cat = null; v.shown = 20; vmRerender(); }
function bfSetCat(id) {
  const v = state.bf;
  v.cat = id && v.cat !== id ? id : null; v.shown = 20;
  vmRerender();
  if (v.cat) setTimeout(() => document.getElementById('bf-tx-h')?.scrollIntoView({ block: 'start', behavior: 'smooth' }), 60);
}
function bfMore() {
  state.bf.shown += 20;
  const box = document.getElementById('bf-tx');
  if (box) box.innerHTML = bfTxListHTML();
}
function bfOpenFlows(side, cat) {
  const v = state.bf;
  v.side = side || v.side; v.cat = cat || null; v.shown = 20;
  go('isletme-hareketler');
  if (cat) setTimeout(() => document.getElementById('bf-tx-h')?.scrollIntoView({ block: 'start' }), 80);
}

/* -------------------- Screen 3 — AI financial analysis -------------------- */
function bfWords(n) {   // 1,9 milyon · 430 bin (for sentences)
  const a = Math.abs(n);
  if (a >= 1e6) return (a / 1e6).toLocaleString('tr-TR', { maximumFractionDigits: 2 }) + ' milyon';
  if (a >= 1e3) return Math.round(a / 1e3).toLocaleString('tr-TR') + ' bin';
  return Math.round(a).toLocaleString('tr-TR');
}
function bfDemoNow() {   // the demo date with the current time of day
  const n = new Date();
  return new Date(BF_TODAY.getFullYear(), BF_TODAY.getMonth(), BF_TODAY.getDate(), n.getHours(), n.getMinutes());
}
function bfStamp(d) { return `${bfNumDate(d)} · ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; }
function bfGapTxt(g) {
  const a = bfFcDate(g.from), b = bfFcDate(g.to);
  if (g.from === g.to) return bfDayTxt(a);
  return a.getMonth() === b.getMonth() ? `${a.getDate()}–${b.getDate()} ${VM_AY[b.getMonth()]}` : `${bfDayTxt(a)} – ${bfDayTxt(b)}`;
}
function bfSummaryHTML() {
  const x = bfAI(), g = bfGaps(), need = x.need;
  return `<p>Son üç ayda (${bfRangeTxt(21, 23)}) işletmenin para girişleri %${Math.round(x.inG)} artarak aylık ortalama ${bfWords(bfAvg('in'))} TL’ye ulaştı; artışı POS satışları ve online siparişler sürüklüyor. Aynı dönemde tedarikçi ödemeleri yılbaşı sezonu stok alımlarıyla neredeyse iki katına çıktı ve toplam giderler %${Math.round(x.outG)} arttı. Bu nedenle aylık net nakit akışı Ağustos’taki ${bfWords(x.netA)} TL’den Ekim’de ${bfWords(x.netC)} TL’ye geriledi.</p>
    <p>Maaş, kira ve sezon stok ödemelerinin aynı haftaya denk geldiği <b>${bfGapTxt(g[0])}</b> arasında hesap bakiyesinin yaklaşık <b>${bfWords(need.min)} TL eksiye</b> düşmesi bekleniyor; ${g.length > 1 ? `${bfGapTxt(g[1])} ve ${bfGapTxt(g[g.length - 1])} tarihlerinde de kısa süreli açıklar var. ` : ''}Geçen yıl Aralık’ta da net nakit akışı ${bfWords(x.lastDec)} TL ekside kalmıştı.</p>
    <p>Bu açığı %${BF_BUFFER} güvenlik payıyla karşılamak için Aralık başından önce <b>${bfWords(need.amount)} TL tutarında, 6 ay vadeli</b> kısa vadeli işletme sermayesi finansmanı uygun görünüyor. Ocak’tan itibaren beklenen aylık nakit fazlası taksitleri rahatça karşılıyor.</p>`;
}
function bfRisks() {
  const x = bfAI(), g = bfGaps()[0];
  return [
    ['Nakit tamponu', 'hi', `Kullanılabilir bakiye (${vmTL(BF_BIZ.balance)}) yaklaşık ${Math.round(x.days)} günlük gidere yetiyor.`],
    ['Mevsimsel nakit açığı', 'hi', `${bfGapTxt(g)} arasında tahmini en düşük bakiye ${bfTLs(x.need.min)}; geçen yıl Aralık’ta net akış ${bfTLs(x.lastDec)} olmuştu.`],
    ['Gider artış hızı', 'mid', `Son üç ayda giderler %${Math.round(x.outG)}, girişler %${Math.round(x.inG)} arttı.`],
    ['Tedarikçi yoğunlaşması', 'mid', `Ekim’de tedarikçi ödemelerinde tek tedarikçinin (Ege Elektronik) payı %${Math.round(x.top)}.`],
    ['Tahsilat düzenliliği', 'lo', `Girişlerde POS satışlarının payı %${Math.round(x.posShare)}; tahsilatlar her gün düzenli geliyor.`],
  ];
}
const BF_RISK_LBL = { hi: 'Yüksek', mid: 'Orta', lo: 'Düşük' };
function bfRecs() {
  const need = bfNeed();
  return [
    [`Aralık başından önce ${vmTL(need.amount)} işletme sermayesi finansmanı kullan`, 'Tahmini açığı güvenlik payıyla kapatır; taksitler Ocak’tan itibaren nakit fazlasından ödenir.', 'wc'],
    ['Sezon stok ödemesinin bir kısmını 90 güne yay', 'Tedarikçi ödeme finansmanıyla 5 Aralık’taki ödemenin bir bölümünü Aralık satışlarının tahsilatından sonraya bırakabilirsin.', 'sup'],
    ['Tedarikçi ödeme günlerini ayın ortasına kaydırmayı konuş', 'Maaş ve kira ile aynı haftaya denk gelmeyen ödemeler, açığın büyük bölümünü finansman gerektirmeden azaltabilir.', null],
  ];
}
function BfAnalysis() {
  const ai = state.bf.ai;
  const nav = `<div class="nav-head ru-nav-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Yapay Zekâ Analizi</div>
      <button class="icon-btn" data-action="bf-info" aria-label="Bilgi">${I.info}</button>
    </div>`;
  if (ai.status !== 'done') {
    const run = ai.status === 'run';
    return `
    <div class="screen ${vmAnim()} vm bf">
      ${nav}
      <div class="screen-scroll">
        <div class="bf-ai-run">
          <div class="bf-ai-orb ${run ? 'run' : ''}">${I.spark}</div>
          <b>${run ? 'Finansal verilerin analiz ediliyor' : ai.stopped ? 'Analiz durduruldu' : 'Yapay zekâ ile finansal analiz'}</b>
          ${run ? `<div class="think-line"><span class="shimmer" id="bf-think">${BF_AI_STEPS[Math.min(ai.step, BF_AI_STEPS.length - 1)]}…</span></div>`
            : `<p>${ai.stopped ? 'Analizi istediğin zaman yeniden başlatabilirsin. ' : ''}Son 3 ayın para giriş ve çıkışları incelenir, önümüzdeki 120 günün nakit akışı tahmin edilir; finansman ihtiyacın ve sana özel teklifler belirlenir.</p>`}
          <div class="bf-ai-src">${I.lock} Kullanılan veriler: 3 işletme hesabı, 2 POS cihazı, e-fatura kayıtları · ${bfRangeTxt(21, 23)} (demo)</div>
        </div>
        ${run ? `<div class="bf-skel"><i></i><i></i><i class="s"></i></div><div class="bf-skel"><i></i><i class="s"></i></div><div class="bf-skel"><i></i><i></i><i class="s"></i></div>` : ''}
      </div>
      <div class="screen-cta">
        ${run ? `<button class="btn-outline bf-stop" data-action="bf-ai-stop">${I.stop} Analizi Durdur</button>`
          : `<button class="btn-primary" data-action="bf-analyze">${I.spark} ${ai.stopped ? 'Analizi Yeniden Başlat' : 'Yapay Zekâ ile Finansal Analiz Et'}</button>`}
      </div>
    </div>`;
  }
  const x = bfAI(), need = x.need, sc = bfScore(), gaps = bfGaps(), fin = state.bf.fcFin !== false;
  return `
  <div class="screen ${vmAnim()} vm bf">
    ${nav}
    <div class="screen-scroll">
      <div class="bf-ai-sum">
        <div class="bf-ai-sum-h"><span class="bf-ai-ico">${I.spark}</span><div><b>Yapay zekâ özeti</b><span>${bfRangeTxt(21, 23)} · ${ai.at}</span></div></div>
        <div class="bf-ai-txt" id="bf-ai-txt">${bfSummaryHTML()}</div>
        <div class="msg-actions bf-ai-acts">
          <button class="ma-btn" data-action="bf-copy" aria-label="Kopyala">${I.copy}</button>
          <button class="ma-btn" data-action="msg-like" aria-label="Beğen">${I.thumbUp}</button>
          <button class="ma-btn" data-action="msg-dislike" aria-label="Beğenme">${I.thumbDown}</button>
        </div>
        <div class="ai-disclaimer bf-disc">Yapay zekâ hata yapabilir. Bu analiz demo verilerle oluşturulmuş örnek bir çıktıdır; finansal tavsiye değildir.</div>
      </div>

      <div class="vm-sec-h"><span>Finansal sağlık</span></div>
      <div class="vm-box bf-health">
        <div class="bf-health-top">${bfGauge(sc)}<div><b>${bfScoreLabel(sc)}</b><span>Büyüme ve kârlılık güçlü; nakit tamponu ve gider dengesi zayıflıyor.</span></div></div>
        ${bfScores().map(([t, v, d]) => `<div class="bf-score"><div><span>${t}</span><b>${v}</b></div><div class="bf-score-bar"><i class="${v >= 75 ? 'g' : v >= 55 ? 'm' : 'w'}" style="width:${v}%"></i></div><em>${d}</em></div>`).join('')}
      </div>

      <div class="vm-sec-h"><span>Gelir – gider dengesi</span><span class="bf-legend"><i class="in"></i>Giriş<i class="out"></i>Çıkış</span></div>
      <div class="vm-box bf-bal">
        <div class="bf-kpis">
          <div><span>Ortalama aylık gelir</span><b class="bf-amt-in">${vmTL(bfAvg('in'))}</b></div>
          <div><span>Ortalama aylık gider</span><b class="bf-amt-out">${vmTL(bfAvg('out'))}</b></div>
          <div><span>Aylık ortalama net</span><b>${bfTLs(bfAvg('in') - bfAvg('out'))}</b></div>
          <div><span>Gelir / gider oranı</span><b>${(bfAvg('in') / bfAvg('out')).toFixed(2).replace('.', ',')}</b></div>
        </div>
        ${bfBarsSVG(21, 23)}
      </div>

      <div class="vm-sec-h"><span>Nakit akışı eğilimi</span><span class="bf-pill-dn">Azalan</span></div>
      <div class="vm-box bf-trend">
        ${bfNetSVG(18, 23, BF_FC_MONTHS)}
        <div class="bf-trend-chips">
          <span class="bf-chip good">Girişler ${bfChgTxt(x.inG)}</span>
          <span class="bf-chip bad">Giderler ${bfChgTxt(x.outG)}</span>
          <span class="bf-chip bad">Net ${bfChgTxt(bfChg(x.netC, x.netA))}</span>
        </div>
        <p class="bf-trend-txt">Gerçekleşen son 6 ay ve önümüzdeki 4 ayın tahmini net nakit akışı. Aralık’ta sezon stok ödemesi ve yılsonu ikramiyesiyle net akışın eksiye dönmesi bekleniyor.</p>
      </div>

      <div class="vm-sec-h"><span>Finansman ihtiyacı</span></div>
      <div class="bf-need">
        <div class="bf-need-top"><span>Tahmini ihtiyaç</span><b>${vmTL(need.amount)}</b><em>${I.calendar} Aralık başından önce · önerilen vade 6 ay</em></div>
        <div class="bf-need-rows">
          <div><span>En düşük tahmini bakiye</span><b>${bfTLs(need.min)} · ${bfDayTxt(bfFcDate(need.minK))}</b></div>
          <div><span>Güvenlik payı</span><b>%${BF_BUFFER}</b></div>
          <div><span>Geri ödeme kaynağı</span><b>Ocak–Mart nakit fazlası</b></div>
        </div>
      </div>

      <div class="vm-sec-h"><span>Olası nakit açığı dönemleri</span></div>
      <div class="vm-box bf-fc">
        <div class="bf-fc-h"><span>Tahmini hesap bakiyesi · 120 gün</span>
          <button class="bf-fc-tg ${fin ? 'on' : ''}" data-action="bf-fc-fin"><i class="bf-sw ${fin ? 'on' : ''}"></i>${bfCompact(need.amount)} TL finansmanla</button></div>
        <div id="bf-fc-chart">${bfFcSVG(fin)}</div>
        <div class="bf-fc-legend"><span><i class="cur"></i>Mevcut tahmin</span><span class="${fin ? '' : 'hide'}"><i class="fin"></i>Finansmanla</span><span><i class="gap"></i>Açık dönemi</span></div>
        <div class="bf-gaps">${gaps.map((g, k) => `<div class="bf-gap">
          <span class="bf-gap-n">${k + 1}</span>
          <div><b>${bfGapTxt(g)}</b><em>${BF_GAP_WHY[k] || ''}</em></div>
          <span class="bf-gap-min">${bfCompactS(g.min)}</span>
        </div>`).join('')}</div>
      </div>

      <div class="vm-sec-h"><span>Finansal risk göstergeleri</span></div>
      <div class="vm-box bf-risks">${bfRisks().map(([t, l, d]) => `<div class="bf-risk"><div><b>${t}</b><em>${d}</em></div><span class="bf-lvl ${l}">${BF_RISK_LBL[l]}</span></div>`).join('')}</div>

      <div class="vm-sec-h"><span>Finansman ihtiyacına yönelik öneriler</span></div>
      <div class="vm-box bf-recs">${bfRecs().map(([t, d, id], k) => `<div class="bf-rec">
        <span class="bf-rec-n">${k + 1}</span>
        <div><b>${t}</b><em>${d}</em>${id ? `<button class="sp-link" data-action="bf-offer-focus" data-id="${id}">Teklifi incele ${I.chevR}</button>` : ''}</div>
      </div>`).join('')}</div>
      <div class="vm-note">${I.info}<span>Tahminler geçmiş hareketlerin, düzenli ödeme günlerinin ve mevsimselliğin modellenmesiyle oluşturulan demo çıktılardır; gerçek hesap verisi kullanılmaz.</span></div>
    </div>
    <div class="screen-cta"><button class="btn-primary" data-action="bf-offers">Finansman Önerilerini Gör</button></div>
  </div>`;
}
/* Analysis run: one shimmer line, unequal step durations; stoppable */
function bfAnalyze() {
  const ai = state.bf.ai;
  if (ai.status === 'done') return go('isletme-analiz');
  if (ai.status !== 'run') { ai.status = 'run'; ai.step = 0; ai.stopped = false; }
  if (state.screen === 'isletme-analiz') vmRerender('anim-fade'); else go('isletme-analiz');
  bfRunAI();
}
function bfRunAI() {
  const ai = state.bf.ai, run = ai.run = (ai.run || 0) + 1;
  clearTimeout(ai.timer);
  const next = () => {
    if (ai.status !== 'run' || ai.run !== run) return;
    if (ai.step >= BF_AI_STEPS.length) return bfAIDone();
    bfThink();
    ai.timer = setTimeout(() => { ai.step++; next(); }, BF_AI_DUR[ai.step]);
  };
  next();
}
function bfThink() {
  const ai = state.bf.ai, t = BF_AI_STEPS[Math.min(ai.step, BF_AI_STEPS.length - 1)] + '…';
  const el = document.getElementById('bf-think');
  if (el && el.textContent !== t) { el.textContent = t; el.classList.remove('step-in'); void el.offsetWidth; el.classList.add('step-in'); }
  const card = document.getElementById('bf-ai-card');
  if (card && state.screen === 'isletme') card.innerHTML = bfAiCardHTML();
}
function bfAIDone(quiet) {
  const ai = state.bf.ai;
  ai.status = 'done'; ai.step = BF_AI_STEPS.length; ai.at = bfStamp(bfDemoNow());
  if (quiet) return;
  if (state.screen === 'isletme-analiz') vmRerender('anim-fade');
  else {
    if (state.screen === 'isletme') vmRerender('anim-fade');
    toast('Yapay zekâ analizin hazır');
  }
}
function bfAIStop() {
  const ai = state.bf.ai;
  clearTimeout(ai.timer);
  ai.run = (ai.run || 0) + 1;
  ai.status = 'idle'; ai.step = 0; ai.stopped = true;
  if (state.screen === 'isletme-analiz') vmRerender('anim-fade');
}
function bfFcFin() {
  const v = state.bf, fin = v.fcFin = v.fcFin === false;
  const c = document.getElementById('bf-fc-chart');
  if (!c) return vmRerender('anim-fade');
  c.innerHTML = bfFcSVG(fin);
  document.querySelector('[data-action="bf-fc-fin"]')?.classList.toggle('on', fin);
  document.querySelector('[data-action="bf-fc-fin"] .bf-sw')?.classList.toggle('on', fin);
  document.querySelector('.bf-fc-legend .fin')?.parentElement.classList.toggle('hide', !fin);
}
function bfCopy() {
  const txt = document.getElementById('bf-ai-txt')?.innerText || '';
  if (txt && navigator.clipboard) navigator.clipboard.writeText(txt).then(() => toast('Analiz özeti kopyalandı'), () => toast('Kopyalama desteklenmiyor'));
  else toast('Analiz özeti kopyalandı');
}

/* -------------------- Screen 4 — personalised financing offers -------------------- */
function bfCostTxt(o, q) { return (o.kind === 'revolving' ? '~' : '') + vmTL(q.cost); }
function bfMonthlyTxt(o, q) {
  if (o.kind === 'bullet') return `Vade sonunda ${vmTL(q.total)}`;
  if (o.kind === 'revolving') return `Faiz ~${vmTL(q.first.pay)} <small>${VM_AY[bfLineUse(q.P)[0].key % 12]}</small>`;
  if (o.kind === 'grace') return `${vmTL(q.first.pay)} → ${vmTL(q.monthly)}`;
  return vmTL(q.monthly);
}
function bfFitRing(n) {
  const r = 17, c = 2 * Math.PI * r;
  return `<svg viewBox="0 0 44 44" class="bf-ring"><circle cx="22" cy="22" r="${r}" class="bg"/><circle cx="22" cy="22" r="${r}" class="fg" stroke-dasharray="${(c * n / 100).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 22 22)"/><text x="22" y="26" text-anchor="middle">%${n}</text></svg>`;
}
function bfOfferCardHTML(o) {
  const v = state.bf, q = bfQuote(o), sel = v.sel.includes(o.id);
  return `<div class="bf-offer ${o.best ? 'best' : ''} ${v.focus === o.id ? 'focus' : ''}" id="bf-of-${o.id}">
    <div class="bf-of-top">
      ${bfIco({ icon: o.icon, color: o.best ? 'var(--primary)' : '#4A6FA5' }, 'lg')}
      <div class="bf-of-t">${o.tag ? `<span class="bf-tag ${o.best ? 'ai' : ''}">${o.best ? I.spark : ''}${o.tag}</span>` : ''}<b>${o.type}</b></div>
      <div class="bf-fit">${bfFitRing(o.fit)}<span>Uygunluk</span></div>
    </div>
    <div class="bf-of-amt"><span>${o.kind === 'revolving' ? 'Önerilen limit' : 'Önerilen tutar'}</span><b>${vmTL(o.amount)}</b></div>
    <div class="bf-of-grid">
      <div><span>Vade</span><b>${bfTermTxt(o, o.term)}</b></div>
      <div><span>Tahmini maliyet ${vmEx()}</span><b>${bfCostTxt(o, q)}</b></div>
      <div><span>${o.kind === 'bullet' ? 'Ödeme' : 'Aylık ödeme'}</span><b>${bfMonthlyTxt(o, q)}</b></div>
      <div><span>Geri ödeme</span><b>${o.pay}</b></div>
    </div>
    <div class="bf-why"><div class="bf-why-h">${I.spark}<span>Neden bu öneri?</span></div><p>${o.reason}</p></div>
    <div class="bf-of-act">
      <button class="bf-cmp-tg ${sel ? 'on' : ''}" data-action="bf-sel" data-id="${o.id}"><span class="cbx">${I.check}</span>Karşılaştır</button>
      <button class="btn-primary bf-sm" data-action="bf-choose" data-id="${o.id}">Bu Teklifi Seç</button>
    </div>
  </div>`;
}
function BfOffers() {
  const v = state.bf, need = bfNeed();
  if (v.ai.status !== 'done') { state.screen = 'isletme-analiz'; return BfAnalysis(); }
  return `
  <div class="screen ${vmAnim()} vm bf">
    ${vmNav('Finansman Önerileri')}
    <div class="screen-scroll">
      <div class="bf-need-strip">
        <span class="bf-ai-ico">${I.spark}</span>
        <div><span>Yapay zekâ analizine göre ihtiyacın</span><b>${vmTL(need.amount)} · Aralık başından önce</b><em>${BF_OFFERS.length} alternatif, işletmenin nakit akışına uygunluğuna göre sıralandı</em></div>
      </div>
      ${v.app ? `<div class="vm-warn bf-warn tap" data-action="bf-track">${I.info}<span><b>Devam eden başvurun var.</b> Yeni başvuru için önce mevcut başvurunu takip ekranından tamamla ya da demoyu sıfırla.</span></div>` : ''}
      <div class="bf-offers">${BF_OFFERS.map(bfOfferCardHTML).join('')}</div>
      <div class="vm-note">${I.info}<span>Teklifler, oranlar ve tutarlar demo verisidir; gerçek banka teklifi veya kredi kararı değildir. Maliyete faiz, BSMV (%${BF_BSMV}) ve kredi tahsis ücreti (binde ${vmPctStr(BF_FEE * 10)}) dahildir.</span></div>
    </div>
    <div class="screen-cta"><button class="btn-primary" id="bf-cmp-go" data-action="bf-compare">${bfCmpBtnTxt()}</button></div>
  </div>`;
}
function bfCmpBtnTxt() { const n = state.bf.sel.length; return n >= 2 ? `Teklifleri Karşılaştır (${n})` : 'Karşılaştırmak için en az 2 teklif seç'; }
function bfToggleSel(id) {
  const v = state.bf, on = v.sel.includes(id);
  if (!on && v.sel.length >= 3) return toast('En fazla 3 teklifi karşılaştırabilirsin');
  v.sel = on ? v.sel.filter(x => x !== id) : [...v.sel, id];
  document.querySelectorAll(`[data-action="bf-sel"][data-id="${id}"]`).forEach(b => b.classList.toggle('on', !on));
  const b = document.getElementById('bf-cmp-go');
  if (b) { b.textContent = bfCmpBtnTxt(); b.classList.toggle('disabled', v.sel.length < 2); }
  if (state.screen === 'isletme-karsilastir') vmRerender('anim-fade');
}
function bfCompare() {
  if (state.bf.sel.length < 2) return toast('Karşılaştırmak için en az 2 teklif seç');
  go('isletme-karsilastir');
}
function bfFocus(id) {
  const v = state.bf;
  if (v.ai.status !== 'done') return bfAnalyze();
  v.focus = id;
  if (state.screen !== 'isletme-oneriler') go('isletme-oneriler');
  setTimeout(() => {
    document.getElementById('bf-of-' + id)?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    setTimeout(() => { if (state.bf.focus === id) { state.bf.focus = null; document.getElementById('bf-of-' + id)?.classList.remove('focus'); } }, 1800);
  }, 120);
}
function bfChoose(id) {
  const v = state.bf;
  if (v.app) return bfGoTrack();
  v.offer = id; v.draft = null;
  go('isletme-basvuru');
}

/* -------------------- Screen 5 — compare offers -------------------- */
function BfCompare() {
  const v = state.bf;
  if (v.ai.status !== 'done') { state.screen = 'isletme-analiz'; return BfAnalysis(); }
  const cols = v.sel.map(id => bfOffer(id)), qs = cols.map(o => bfQuote(o));
  const minOf = (vals) => { const nums = vals.filter(x => x != null); return nums.length > 1 ? Math.min(...nums) : null; };
  const cost = qs.map((q, k) => cols[k].kind === 'revolving' ? null : q.cost), bestCost = minOf(cost);
  const mon = qs.map((q, k) => ['annuity', 'grace'].includes(cols[k].kind) ? q.monthly : null), bestMon = minOf(mon);
  const tot = qs.map((q, k) => cols[k].kind === 'revolving' ? null : q.total), bestTot = minOf(tot);
  const bestFit = Math.max(...cols.map(o => o.fit));
  const cell = (val, best) => `<td class="${best ? 'best' : ''}">${val}</td>`;
  const rows = [
    ['Finansman tutarı', cols.map(o => cell(`${o.kind === 'revolving' ? 'Limit ' : ''}${vmTL(o.amount)}`))],
    ['Finansman maliyeti', qs.map((q, k) => cell(`${bfCostTxt(cols[k], q)}${cols[k].kind === 'revolving' ? '<sup>*</sup>' : ''}`, cost[k] != null && cost[k] === bestCost))],
    ['Aylık faiz oranı', cols.map(o => cell(`%${vmPctStr(o.rate)}`, false))],
    ['Vade', cols.map(o => cell(bfTermTxt(o, o.term)))],
    ['Ödeme periyodu', cols.map(o => cell(o.periodTxt))],
    ['Aylık ödeme', qs.map((q, k) => cell(cols[k].kind === 'bullet' ? '—' : cols[k].kind === 'revolving' ? 'Yalnızca faiz' : cols[k].kind === 'grace' ? `${vmTL(q.first.pay)}<i>ilk 2 ay</i>${vmTL(q.monthly)}` : vmTL(q.monthly), mon[k] != null && mon[k] === bestMon))],
    ['Toplam geri ödeme', qs.map((q, k) => cell(cols[k].kind === 'revolving' ? `Kullanım + ~${vmTL(q.int + q.tax)}<sup>*</sup>` : vmTL(q.total), tot[k] != null && tot[k] === bestTot))],
    ['Erken ödeme', cols.map(o => cell(o.early, o.earlyFree))],
    ['Kullanım alanı', cols.map(o => cell(o.use))],
    ['Uygunluk', cols.map(o => cell(`%${o.fit}`, o.fit === bestFit))],
  ];
  const cheap = cols[cost.indexOf(bestCost)], lowMon = cols[mon.indexOf(bestMon)], ai = cols.find(o => o.best);
  return `
  <div class="screen ${vmAnim()} vm bf">
    ${vmNav('Teklifleri Karşılaştır')}
    <div class="screen-scroll">
      <div class="bf-pickrow">
        <span>Karşılaştırılan teklifler (en fazla 3)</span>
        <div class="vm-chips">${BF_OFFERS.map(o => `<button class="vm-chip ${v.sel.includes(o.id) ? 'on' : ''}" data-action="bf-sel" data-id="${o.id}">${o.short}</button>`).join('')}</div>
      </div>
      ${cols.length < 2 ? `<div class="vm-box bf-empty">Karşılaştırmak için en az 2 teklif seç.</div>` : `
      <div class="bf-ctable-wrap"><table class="bf-ctable c${cols.length}">
        <thead><tr><th></th>${cols.map(o => `<th class="${v.offer === o.id ? 'sel' : ''}"><span class="bf-ttag ${o.best ? 'ai' : ''}">${o.best ? I.spark : ''}${o.tag || '&nbsp;'}</span><b>${o.short}</b></th>`).join('')}</tr></thead>
        <tbody>${rows.map(([t, cells]) => `<tr><th>${t}</th>${cells.join('')}</tr>`).join('')}</tbody>
        <tfoot><tr><th></th>${cols.map(o => `<td><button class="bf-pick ${v.offer === o.id ? 'on' : ''}" data-action="bf-pick" data-id="${o.id}">${v.offer === o.id ? `${I.check} Seçildi` : 'Seç'}</button></td>`).join('')}</tr></tfoot>
      </table></div>
      <div class="bf-why bf-cmp-ai"><div class="bf-why-h">${I.spark}<span>Yapay zekâ yorumu</span></div>
        <p>${cheap ? `Seçtiklerin içinde en düşük maliyet <b>${cheap.short}</b> (${vmTL(bfQuote(cheap).cost)}); ancak tutarlar ve kullanım alanları farklı. ` : ''}${lowMon ? `En düşük aylık ödeme <b>${lowMon.short}</b>. ` : ''}${cols.some(o => o.kind === 'revolving') ? 'Nakit akışı desteği, tahmin edildiği gibi yalnızca açık günlerinde kullanılırsa en ucuz seçenek olabilir; faizi değişkendir. ' : ''}${ai ? `Açığın tamamını sabit faiz ve öngörülebilir taksitle karşılayan seçenek <b>${ai.short}</b>.` : ''}</p>
      </div>`}
      <div class="vm-note">${I.info}<span>Değerler örnektir. Maliyete faiz, BSMV ve tahsis ücreti dahildir. * Nakit akışı desteğinde maliyet, tahmini nakit açığı günlerinde kullanıma göre hesaplanmıştır.</span></div>
    </div>
    <div class="screen-cta"><button class="btn-primary" data-action="bf-apply">${bfOffer().short} ile Devam Et</button></div>
  </div>`;
}
function bfPick(id) { state.bf.offer = id; state.bf.draft = null; vmRerender('anim-fade'); }
function bfToApply() {
  if (state.bf.app) return bfGoTrack();
  go('isletme-basvuru');
}

/* -------------------- Screen 6 — financing details & application -------------------- */
const BF_FLOW = ['Analiz', 'Teklif', 'Başvuru', 'Değerlen&shy;dirme', 'Kullan&shy;dırım'];
function bfFlowHTML(cur) {
  return `<div class="vm-flow" role="list" aria-label="Finansman adımları">${BF_FLOW.map((t, i) =>
    `<div class="vm-flow-s ${i < cur ? 'done' : i === cur ? 'on' : ''}" role="listitem"><i>${i < cur ? I.check : i + 1}</i><span>${t}</span></div>`).join('<b></b>')}</div>`;
}
function BfApply() {
  const v = state.bf;
  if (v.app) { state.screen = 'isletme-takip'; return BfTrack(); }
  const o = bfOffer(), g = v.agree, all = BF_AGREE.every(([k]) => g[k]);
  bfDraft();
  return `
  <div class="screen ${vmAnim()} vm bf">
    ${vmNav('Finansman Başvurusu')}
    <div class="screen-scroll">
      ${bfFlowHTML(2)}
      <div class="bf-selof">
        ${bfIco({ icon: o.icon, color: 'var(--primary)' }, 'lg')}
        <div><span>Seçilen finansman</span><b>${o.type}</b>${o.tag ? `<em class="bf-tag ${o.best ? 'ai' : ''}">${o.best ? I.spark : ''}${o.tag}</em>` : ''}</div>
        <button class="sp-link" data-action="bf-change">Değiştir</button>
      </div>

      <div class="vm-sec-h"><span>İşletme bilgileri</span></div>
      <div class="vm-box bf-rows">
        <div class="vm-frow"><span>Ticari unvan</span><b>${BF_BIZ.name}</b></div>
        <div class="vm-frow"><span>Vergi no · dairesi</span><b>${BF_BIZ.taxNo} · ${BF_BIZ.taxOffice}</b></div>
        <div class="vm-frow"><span>Faaliyet</span><b>${BF_BIZ.sector} · ${BF_BIZ.activity}</b></div>
        <div class="vm-frow"><span>Kuruluş · çalışan</span><b>${BF_BIZ.founded} · ${BF_BIZ.employees} çalışan</b></div>
        <div class="vm-frow"><span>Satış kanalları</span><b>${BF_BIZ.stores}</b></div>
        <div class="vm-frow"><span>Yetkili</span><b>${BF_BIZ.rep} · ${BF_BIZ.repRole}</b></div>
        <div class="vm-frow"><span>Adres</span><b>${BF_BIZ.address}</b></div>
        <div class="vm-frow"><span>Kullandırım hesabı</span><b>${BF_BIZ.account}<br><small>${BF_BIZ.iban}</small></b></div>
      </div>
      <div class="vm-sec-h"><span>Finansal görünüm</span><span class="bf-sec-sub">${bfRangeShort(21, 23)} · aylık ort.</span></div>
      <div class="vm-box bf-rows">
        <div class="vm-frow"><span>Para girişi</span><b class="bf-amt-in">${vmTL(bfAvg('in'))}</b></div>
        <div class="vm-frow"><span>Para çıkışı</span><b class="bf-amt-out">${vmTL(bfAvg('out'))}</b></div>
        <div class="vm-frow"><span>Net nakit akışı</span><b>${bfTLs(bfAvg('in') - bfAvg('out'))}</b></div>
        <div class="vm-frow"><span>Yapay zekâ finansal sağlık puanı</span><b>${bfScore()} / 100 · ${bfScoreLabel(bfScore())}</b></div>
      </div>

      <div class="vm-sec-h"><span>Finansman koşulları</span></div>
      <div class="vm-box bf-terms" id="bf-terms">${bfTermsHTML()}</div>

      <div class="vm-sec-h"><span>${o.kind === 'revolving' ? 'Örnek kullanım ve faiz planı' : 'Geri ödeme planı'}</span><button class="sp-link" data-action="bf-plan">Tümü ${I.chevR}</button></div>
      <div class="vm-box bf-plan" id="bf-plan">${bfPlanHTML(3)}</div>

      <div class="vm-sec-h"><span>Başvuru özeti</span></div>
      <div class="vm-box vm-receipt" id="bf-summary">${bfSummaryRowsHTML()}</div>

      <div class="vm-sec-t">Sözleşmeler ve onaylar</div>
      <div class="vm-docs">${BF_AGREE.map(([k, tt, tail]) => `
        <label class="contract-row ${g[k] ? 'on' : ''}" data-action="bf-agree" data-key="${k}">
          <span class="cbx">${I.check}</span>
          <span class="contract-txt"><a data-action="bf-doc" data-doc="${k}">${tt}</a>${tail}</span>
        </label>`).join('')}</div>
      <div class="vm-note">${I.info}<span>Başvurun önce finansal verilerin ve ticari kredi geçmişinle otomatik olarak değerlendirilir. Onaylanırsa sözleşmeyi dijital olarak onaylar, tutarı işletme hesabına alırsın. Prototipte gerçek başvuru veya kullandırım yapılmaz.</span></div>
    </div>
    <div class="screen-cta">
      <button class="btn-primary vm-approve ${all ? '' : 'disabled'}" id="bf-submit" data-action="bf-submit">${I.faceid} Başvuruyu Tamamla</button>
    </div>
  </div>`;
}
function bfTermsHTML() {
  const o = bfOffer(), d = bfDraft(), q = bfQuote(o, d.amount, d.term), need = bfNeed().amount, rev = o.kind === 'revolving';
  const diff = d.amount - (o.best ? need : o.amount);
  return `
    <div class="bf-amt-edit">
      <span>${rev ? 'Talep edilen limit' : 'Talep edilen tutar'}</span>
      <div class="bf-stepper">
        <button class="bf-stp" data-action="bf-amt" data-d="-1" aria-label="Azalt" ${d.amount <= o.min ? 'disabled' : ''}>−</button>
        <b>${vmTL(d.amount)}</b>
        <button class="bf-stp" data-action="bf-amt" data-d="1" aria-label="Artır" ${d.amount >= o.max ? 'disabled' : ''}>+</button>
      </div>
      <em class="${diff ? 'warn' : ''}">${I.spark}${diff === 0 ? (o.best ? 'Yapay zekâ önerisiyle aynı' : 'Önerilen tutar') : `Önerilen: ${vmTL(o.best ? need : o.amount)} · ${diff > 0 ? 'fazla tutar maliyeti artırır' : 'tahmini açığı tam karşılamayabilir'}`} · ${vmTL(o.min)}–${vmTL(o.max)}</em>
    </div>
    ${o.terms.length > 1 ? `<div class="bf-terms-pick"><span>Vade</span><div class="vm-chips">${o.terms.map(n => `<button class="vm-chip ${d.term === n ? 'on' : ''}" data-action="bf-term" data-v="${n}">${bfTermTxt(o, n)}</button>`).join('')}</div></div>` : ''}
    ${o.terms.length > 1 ? '' : `<div class="vm-frow"><span>Vade</span><b>${bfTermTxt(o, d.term)}</b></div>`}
    <div class="vm-frow"><span>Aylık faiz oranı ${vmEx()}</span><b>%${vmPctStr(o.rate)}</b></div>
    <div class="vm-frow"><span>BSMV</span><b>Faiz üzerinden %${BF_BSMV}</b></div>
    <div class="vm-frow"><span>Geri ödeme</span><b>${o.pay}</b></div>
    ${rev ? `<div class="vm-frow"><span>Tahmini faiz + BSMV <small>örnek kullanım</small></span><b>${vmTL(q.int + q.tax)}</b></div>`
      : `<div class="vm-frow"><span>${o.kind === 'bullet' ? 'Vade sonunda ödeme' : o.kind === 'grace' ? 'Aylık ödeme (ilk 2 ay / sonra)' : 'Aylık taksit'}</span><b>${o.kind === 'bullet' ? vmTL(q.total) : o.kind === 'grace' ? `${vmTL(q.first.pay)} / ${vmTL(q.monthly)}` : vmTL(q.monthly)}</b></div>
         <div class="vm-frow"><span>Toplam faiz + BSMV</span><b>${vmTL(q.int + q.tax)}</b></div>`}
    <div class="vm-frow"><span>Kredi tahsis ücreti <small>binde ${vmPctStr(BF_FEE * 10)}</small></span><b>${vmTL(q.fee)}</b></div>
    <div class="vm-frow hl"><span>Toplam finansman maliyeti</span><b>${rev ? '~' : ''}${vmTL(q.cost)}</b></div>
    ${rev ? '' : `<div class="vm-frow hl"><span>Toplam geri ödeme</span><b>${vmTL(q.total)}</b></div>`}
    <div class="vm-frow"><span>Erken ödeme</span><b>${o.early}</b></div>`;
}
function bfPlanHTML(limit) {
  const o = bfOffer(), d = bfDraft(), q = bfQuote(o, d.amount, d.term), a = state.bf.app, paid = a ? a.paid : 0;
  const rows = limit ? q.rows.slice(0, limit) : q.rows;
  if (o.kind === 'revolving') {
    const use = bfLineUse(d.amount);
    return `<div class="bf-plan-h"><span>Ay</span><span>En yüksek kullanım</span><span>Faiz + BSMV</span></div>
      ${use.map((u, k) => `<div class="bf-plan-r"><span>${VM_AY[u.key % 12]}</span><span>${vmTL(u.max)}</span><b>${vmTL(q.rows[k].int + q.rows[k].tax)}</b></div>`).join('')}
      <div class="bf-plan-note">Anapara, tahsilatlar geldikçe istediğin zaman kapatılır; faiz yalnızca kullanılan gün için işler.</div>`;
  }
  return `<div class="bf-plan-h"><span>Taksit</span><span>Tarih</span><span>Tutar</span><span>Kalan</span></div>
    ${rows.map(r => `<div class="bf-plan-r ${a && a.status === 'active' ? (r.n <= paid ? 'paid' : r.n === paid + 1 ? 'next' : '') : ''}">
      <span>${r.n}${a && a.status === 'active' && r.n <= paid ? ` ${I.check}` : ''}</span><span>${bfNumDate(r.date)}</span><b>${vmTL(r.pay)}</b><span>${vmTL(r.rest)}</span></div>`).join('')}
    ${limit && q.rows.length > limit ? `<button class="bf-more sm" data-action="bf-plan">${q.rows.length - limit} taksit daha</button>` : ''}`;
}
function bfSummaryRowsHTML() {
  const o = bfOffer(), d = bfDraft(), q = bfQuote(o, d.amount, d.term), rev = o.kind === 'revolving';
  const r = (l, val, hl) => `<div class="r-row ${hl ? 'hl' : ''}"><span class="r-l">${l}</span><span class="r-r">${val}</span></div>`;
  return r('İşletme', BF_BIZ.name)
    + r('Finansman türü', o.type)
    + r(rev ? 'Talep edilen limit' : 'Talep edilen tutar', vmTL(d.amount), true)
    + r('Vade', bfTermTxt(o, d.term))
    + r(o.kind === 'bullet' ? 'Ödeme tarihi' : 'İlk ödeme tarihi', `${bfDateTxt(q.rows[0].date)} ${vmEx()}`)
    + (rev ? r('Tahmini maliyet', `~${vmTL(q.cost)}`) : r('Toplam finansman maliyeti', vmTL(q.cost)) + r('Toplam geri ödeme', vmTL(q.total), true))
    + r('Kullandırım hesabı', `${BF_BIZ.account} · ${BF_BIZ.iban.slice(-4)}`)
    + r('Başvuran', `${BF_BIZ.rep} (yetkili)`);
}
function bfRefreshTerms() {
  const t = document.getElementById('bf-terms'), p = document.getElementById('bf-plan'), s = document.getElementById('bf-summary');
  if (t) t.innerHTML = bfTermsHTML();
  if (p) p.innerHTML = bfPlanHTML(3);
  if (s) s.innerHTML = bfSummaryRowsHTML();
}
function bfAmt(dir) {
  const o = bfOffer(), d = bfDraft(), step = o.max - o.min > 400000 ? 50000 : 25000;
  d.amount = Math.min(o.max, Math.max(o.min, d.amount + dir * step));
  bfRefreshTerms();
}
function bfTerm(n) { bfDraft().term = n; bfRefreshTerms(); }
function bfPlanSheet() {
  const o = bfOffer(), d = bfDraft(), q = bfQuote(o, d.amount, d.term);
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>${o.kind === 'revolving' ? 'Örnek kullanım planı' : 'Geri ödeme planı'}</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="bf-plan-sheet">${bfPlanHTML(0)}</div>
    <div class="vm-sheet-note">${I.info}<span>${o.short} · ${vmTL(d.amount)} · ${bfTermTxt(o, d.term)}. ${o.kind === 'revolving' ? '' : `Toplam geri ödeme ${vmTL(q.total)}. `}Tutarlara BSMV dahildir; değerler örnektir.</span></div>
    <button class="sheet-btn" data-action="close-sheet">Kapat</button>`;
  sheetEl.classList.add('open'); sheetScrimEl.classList.add('open');
}
function bfToggleAgree(el) {
  const g = state.bf.agree, k = el.dataset.key;
  g[k] = !g[k];
  el.classList.toggle('on', g[k]);
  document.getElementById('bf-submit')?.classList.toggle('disabled', !BF_AGREE.every(([x]) => g[x]));
}
function bfDocSheet(k) {
  const o = bfOffer(), d = bfDraft(), q = bfQuote(o, d.amount, d.term);
  const body = {
    pre: `<h4>1. Taraflar</h4><p>${BF_BIZ.name} (kredi kullanan) ile Yapı Kredi Bankası A.Ş.</p><h4>2. Finansman</h4><p>${o.type}; ${o.kind === 'revolving' ? 'limit' : 'tutar'} ${vmTL(d.amount)}, vade ${bfTermTxt(o, d.term)}, aylık faiz %${vmPctStr(o.rate)} (örnek), BSMV faiz üzerinden %${BF_BSMV}, kredi tahsis ücreti ${vmTL(q.fee)}.</p><h4>3. Geri ödeme</h4><p>${o.pay}. Erken ödeme: ${o.early}.</p><h4>4. Teminat</h4><p>Prototipte teminat koşulları gösterilmez; gerçek süreçte kredi değerlendirmesine göre belirlenir.</p>`,
    data: `<p>Hesap hareketlerin, üye işyeri (POS) tahsilatların ve e-fatura kayıtların; finansman ihtiyacının belirlenmesi, teklif hazırlanması ve kredi değerlendirmesi amacıyla işlenir. Onayını istediğin zaman geri alabilirsin.</p><p>Prototipte gerçek veri kullanılmaz; tüm hareketler demo veridir.</p>`,
    kkb: `<p>Başvurunun değerlendirilmesi için Kredi Kayıt Bürosu (KKB) üzerinden işletmenin ticari risk raporu ve kredi geçmişi sorgulanır.</p><p>Prototipte sorgu yapılmaz.</p>`,
  }[k];
  const t = BF_AGREE.find(x => x[0] === k)[1];
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>${t}</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="legal-scroll"><p>Bu metin prototip amaçlı örnek bir metindir; gerçek ürün koşullarını yansıtmaz.</p>${body}</div>
    <button class="sheet-btn ghost" data-action="close-sheet">Kapat</button>`;
  sheetEl.classList.add('open'); sheetScrimEl.classList.add('open');
}
function bfChange() {
  const prev = state.nav[state.nav.length - 1];
  if (prev && ['isletme-oneriler', 'isletme-karsilastir'].includes(prev.screen)) return navBack();
  go('isletme-oneriler');
}
function bfMakeApp(status) {
  const o = bfOffer(), d = bfDraft(), at = bfDemoNow();
  return { no: vmRef('IF'), offer: o.id, amount: d.amount, term: d.term, at: at.getTime(), status, step: 0,
    approvedAt: null, disbTs: null, paid: 0, used: o.kind === 'revolving' ? 0 : null,
    events: [{ t: 'Finansman başvurun alındı', d: `${o.short} · ${vmTL(d.amount)}`, at: bfStamp(at), k: 'ok' }] };
}
function bfSubmit() {
  const v = state.bf, btn = document.getElementById('bf-submit');
  if (!btn || v.app || !BF_AGREE.every(([k]) => v.agree[k])) return;
  btn.innerHTML = '<span class="spinner"></span> Başvurun gönderiliyor…';
  btn.style.pointerEvents = 'none';
  setTimeout(() => {
    v.app = bfMakeApp('review');
    if (state.screen === 'isletme-basvuru') {
      bfUnwind();
      state.chatSeed = false;
      state.screen = 'isletme-takip';
      vmRerender('anim-right');
    }
    bfStartReview();
  }, 1300);
}

/* -------------------- Screen 7 — application & financing tracking -------------------- */
const BF_REVIEW_MS = [1100, 1600, 1300, 1500];
function bfAppTime(a, min) { return bfStamp(new Date(a.at + min * 60000)); }
function bfStatusTxt(a) {
  if (a.status === 'review') return 'Başvurun değerlendiriliyor';
  if (a.status === 'approved') return 'Onaylandı · sözleşme onayını bekliyor';
  const o = bfOffer(a.offer), q = bfQuote(o, a.amount, a.term);
  if (o.kind === 'revolving') return a.used ? `Limit kullanımda · ${vmTL(a.used)}` : 'Limit tanımlandı · kullanıma hazır';
  return a.paid >= q.rows.length ? 'Finansman kapandı' : `Kullandırıldı · ${a.paid}/${q.rows.length} ödeme yapıldı`;
}
function bfStageList(a) {
  const st = a.status, done = st === 'active';
  const o = bfOffer(a.offer), q = bfQuote(o, a.amount, a.term), closed = o.kind !== 'revolving' && a.paid >= q.rows.length;
  return [
    { s: 'done', d: bfAppTime(a, 0).split(' · ')[0] },
    { s: st === 'review' ? 'on' : 'done', d: st === 'review' ? 'Sürüyor' : 'Olumlu' },
    { s: st === 'review' ? '' : 'done', d: a.approvedAt || 'Bekliyor' },
    { s: done ? 'done' : st === 'approved' ? 'on' : '', d: done ? 'Tamamlandı' : st === 'approved' ? 'Sözleşme onayı' : 'Bekliyor' },
    { s: closed ? 'done' : done ? 'on' : '', d: done ? (o.kind === 'revolving' ? 'Kullandıkça' : `${a.paid}/${q.rows.length} ödeme`) : 'Bekliyor' },
  ];
}
function bfProgHTML(a) {
  const list = bfStageList(a);
  return `<div class="bf-prog">${list.map((x, k) => `<div class="bf-prog-s ${x.s}">
    <i>${x.s === 'done' ? I.check : x.s === 'on' && k === 1 ? '<span class="vm-spin"></span>' : k + 1}</i><b>${BF_STAGES[k]}</b><span>${x.d}</span></div>`).join('')}</div>`;
}
function BfTrack() {
  const v = state.bf, a = v.app;
  if (!a) return bfTrackEmpty();
  const o = bfOffer(a.offer), q = bfQuote(o, a.amount, a.term), rev = o.kind === 'revolving';
  const pill = a.status === 'review' ? `<span class="vm-pill sm bf-pill-run">Değerlendiriliyor</span>` : a.status === 'approved' ? `<span class="vm-pill sm bf-pill-ok">Onaylandı</span>` : `<span class="vm-pill sm bf-pill-ok">${rev ? 'Limit aktif' : 'Kullandırıldı'}</span>`;
  return `
  <div class="screen ${vmAnim()} vm bf">
    ${vmNav('Başvuru Takibi')}
    <div class="screen-scroll">
      <div class="vm-box bf-trk-head">
        <div class="bf-trk-top"><div><span>Finansman başvurusu</span><b>No ${a.no}</b></div>${pill}</div>
        <div class="vm-frow"><span>Başvuru tarihi</span><b>${bfAppTime(a, 0)}</b></div>
        <div class="vm-frow"><span>Talep edilen finansman</span><b>${o.short}<br><small>${rev ? 'Limit ' : ''}${vmTL(a.amount)} · ${bfTermTxt(o, a.term)}</small></b></div>
        <div class="vm-frow"><span>Başvuru durumu</span><b id="bf-status">${bfStatusTxt(a)}</b></div>
      </div>
      ${bfProgHTML(a)}
      ${a.fresh ? `<div class="vm-okbar bf-fresh">${I.check}<span><b>${a.fresh}</b></span></div>` : ''}
      ${a.status === 'review' ? `
        <div class="vm-sec-h"><span>Değerlendirme aşaması</span><span class="bf-sec-sub" id="bf-phase">${a.step}/${BF_REVIEW.length}</span></div>
        <div class="vm-box vm-chk">${BF_REVIEW.map((t, k) => vmChkRowHTML(t, k, a.step, 'bf-rv-')).join('')}</div>
        <div class="vm-note">${I.info}<span>Ön değerlendirme finansal verilerinle otomatik yapılır; gerçek süreçte genellikle 1 iş günü sürer. Prototipte birkaç saniye.</span></div>` : ''}
      ${a.status === 'approved' ? `
        <div class="vm-sec-h"><span>Onay detayları</span></div>
        <div class="vm-box bf-rows">
          <div class="vm-frow"><span>Onay durumu</span><b class="bf-ok">Onaylandı · ${a.approvedAt}</b></div>
          <div class="vm-frow"><span>${rev ? 'Onaylanan limit' : 'Onaylanan tutar'}</span><b>${vmTL(a.amount)}</b></div>
          <div class="vm-frow"><span>Vade</span><b>${bfTermTxt(o, a.term)}</b></div>
          <div class="vm-frow"><span>Aylık faiz oranı ${vmEx()}</span><b>%${vmPctStr(o.rate)}</b></div>
          ${rev ? '' : `<div class="vm-frow"><span>${o.kind === 'bullet' ? 'Vade sonunda ödeme' : 'Aylık ödeme'}</span><b>${o.kind === 'bullet' ? vmTL(q.total) : o.kind === 'grace' ? `${vmTL(q.first.pay)} / ${vmTL(q.monthly)}` : vmTL(q.monthly)}</b></div>
          <div class="vm-frow"><span>Toplam geri ödeme</span><b>${vmTL(q.total)}</b></div>`}
          <div class="vm-frow"><span>Teklif geçerliliği</span><b>15 gün</b></div>
        </div>` : ''}
      ${a.status === 'active' ? bfUseHTML(a, o, q) : ''}
      ${a.status !== 'review' ? `
        <div class="vm-sec-h"><span>${rev ? 'Faiz ödemeleri' : 'Geri ödeme planı'}</span>${rev ? '' : `<button class="sp-link" data-action="bf-plan">Tümü ${I.chevR}</button>`}</div>
        <div class="vm-box bf-plan">${bfTrackPlanHTML(a, o, q)}</div>` : ''}
      <div class="vm-sec-h"><span>Bildirimler</span></div>
      <div class="vm-box bf-events">${a.events.slice().reverse().map(e => `<div class="bf-ev ${e.k || ''}"><i>${e.k === 'ok' ? I.check : I.info}</i><div><b>${e.t}</b><span>${e.d ? e.d + ' · ' : ''}${e.at}</span></div></div>`).join('')}</div>
      ${bfDemoHTML(a)}
    </div>
    <div class="screen-cta">
      ${a.status === 'approved' ? `<button class="btn-primary" data-action="bf-contract">${rev ? 'Sözleşmeyi Onayla ve Limiti Aç' : 'Sözleşmeyi Onayla ve Kullan'}</button>`
        : a.status === 'active' && rev ? `<div class="bf-cta2"><button class="btn-outline" data-action="bf-home">Ana Ekran</button><button class="btn-primary" data-action="bf-draw">Limitten Kullan</button></div>`
        : `<button class="${a.status === 'review' ? 'btn-outline' : 'btn-primary'}" data-action="bf-home">İşletme Finansmanı’na Dön</button>`}
    </div>
  </div>`;
}
function bfUseHTML(a, o, q) {
  const rev = o.kind === 'revolving';
  if (rev) {
    return `<div class="vm-sec-h"><span>Finansman kullanımı</span></div>
      <div class="vm-box bf-rows">
        <div class="bf-use-top"><span>Kullanılan finansman tutarı</span><b>${vmTL(a.used || 0)}</b><div class="bf-score-bar"><i class="g" style="width:${Math.round((a.used || 0) / a.amount * 100)}%"></i></div><em>Limit ${vmTL(a.amount)} · kalan ${vmTL(a.amount - (a.used || 0))}</em></div>
        <div class="vm-frow"><span>Limit açılış tarihi</span><b>${a.disbAt}</b></div>
        <div class="vm-frow"><span>Hesap</span><b>${BF_BIZ.account} · ${BF_BIZ.iban.slice(-4)}</b></div>
        <div class="vm-frow"><span>Tahmini aylık faiz (mevcut kullanım)</span><b>${vmTL((a.used || 0) * bfI(o))}</b></div>
      </div>`;
  }
  const paidRows = q.rows.slice(0, a.paid), restP = a.paid ? paidRows[paidRows.length - 1].rest : a.amount, next = q.rows[a.paid];
  return `<div class="vm-sec-h"><span>Finansman kullanımı</span></div>
    <div class="vm-box bf-rows">
      <div class="bf-use-top"><span>Kullanılan finansman tutarı</span><b>${vmTL(a.amount)}</b><div class="bf-score-bar"><i class="g" style="width:${Math.round(a.paid / q.rows.length * 100)}%"></i></div><em>${a.paid} / ${q.rows.length} ödeme yapıldı · kalan anapara ${vmTL(restP)}</em></div>
      <div class="vm-frow"><span>Kullandırım tarihi</span><b>${a.disbAt}</b></div>
      <div class="vm-frow"><span>${o.kind === 'sup' || o.id === 'sup' ? 'Ödeme yapılan tedarikçi' : 'Aktarılan hesap'}</span><b>${o.id === 'sup' ? 'Ege Elektronik Dağıtım A.Ş.' : `${BF_BIZ.account} · ${BF_BIZ.iban.slice(-4)}`}</b></div>
      ${next ? `<div class="vm-frow"><span>Sıradaki ödeme</span><b>${bfDateTxt(next.date)} · ${vmTL(next.pay)}</b></div>` : `<div class="vm-frow"><span>Durum</span><b class="bf-ok">Tüm ödemeler tamamlandı</b></div>`}
    </div>`;
}
function bfTrackPlanHTML(a, o, q) {
  if (o.kind === 'revolving') {
    return `<div class="bf-plan-h"><span>Ay</span><span>Kullanım</span><span>Faiz + BSMV</span></div>
      <div class="bf-plan-r next"><span>${VM_AY[bfAddMonths(new Date(a.disbTs || a.at), 1).getMonth()]}</span><span>${vmTL(a.used || 0)}</span><b>${vmTL((a.used || 0) * bfI(o))}</b></div>
      <div class="bf-plan-note">Faiz her ay kullanılan tutar ve gün üzerinden tahsil edilir; anaparayı istediğin zaman kapatabilirsin.</div>`;
  }
  const show = q.rows.slice(Math.max(0, Math.min(a.paid - 1, q.rows.length - 3)), Math.max(0, Math.min(a.paid - 1, q.rows.length - 3)) + 3);
  return `<div class="bf-plan-h"><span>Taksit</span><span>Tarih</span><span>Tutar</span><span>Durum</span></div>
    ${show.map(r => {
      const st = a.status !== 'active' ? 'Bekliyor' : r.n <= a.paid ? 'Ödendi' : r.n === a.paid + 1 ? 'Sıradaki' : 'Bekliyor';
      return `<div class="bf-plan-r ${st === 'Ödendi' ? 'paid' : st === 'Sıradaki' ? 'next' : ''}"><span>${r.n}</span><span>${bfNumDate(r.date)}</span><b>${vmTL(r.pay)}</b><span class="bf-st">${st}</span></div>`;
    }).join('')}`;
}
function bfDemoHTML(a) {
  const o = bfOffer(a.offer), q = bfQuote(o, a.amount, a.term);
  const adv = a.status === 'review' ? 'Değerlendirmeyi tamamla' : a.status === 'active' && o.kind !== 'revolving' && a.paid < q.rows.length ? 'Sonraki ödemeyi yap (1 ay ileri)' : '';
  return `<div class="vm-demo">
    <div class="vm-demo-h">${I.info}<span>Demo kontrolleri · Gerçek süreçte durumlar banka sistemlerinden gelen bilgilerle güncellenir.</span></div>
    <div class="vm-demo-btns">
      ${adv ? `<button class="vm-demo-btn main" data-action="bf-adv">${adv}</button>` : ''}
      <button class="vm-demo-btn" data-action="bf-reset">Demoyu sıfırla</button>
    </div>
  </div>`;
}
function bfTrackEmpty() {
  return `
  <div class="screen ${vmAnim()} vm bf">
    ${vmNav('Başvuru Takibi')}
    <div class="screen-scroll">
      <div class="vm-empty big">${I.doc}<b>Henüz finansman başvurun yok</b><span>Yapay zekâ analizinden sonra sana özel teklifleri inceleyip başvurabilirsin.</span>
        <button class="btn-primary" data-action="${state.bf.ai.status === 'done' ? 'bf-offers' : 'bf-analyze'}">${state.bf.ai.status === 'done' ? 'Finansman Önerilerini Gör' : 'Yapay Zekâ ile Analiz Et'}</button></div>
    </div>
  </div>`;
}
function bfStartReview() {
  const a = state.bf.app;
  if (!a || a.status !== 'review' || a.running) return;
  a.running = true;
  vmRunChecks(a, 'step', BF_REVIEW.length, 'bf-rv-', BF_REVIEW_MS, () => {
    a.running = false;
    if (state.bf.app !== a || a.status !== 'review') return;
    bfApprove(a);
  }, () => { const el = document.getElementById('bf-phase'); if (el) el.textContent = `${a.step}/${BF_REVIEW.length}`; });
}
function bfApprove(a, quiet) {
  a.status = 'approved'; a.step = BF_REVIEW.length;
  const t = bfAppTime(a, 4);
  a.approvedAt = t;
  a.events.push({ t: 'Ön değerlendirme tamamlandı', d: 'Finansal veriler ve ticari kredi geçmişi', at: bfAppTime(a, 3), k: 'ok' });
  a.events.push({ t: 'Başvurun onaylandı', d: `${vmTL(a.amount)} · sözleşme onayını bekliyor`, at: t, k: 'ok' });
  a.fresh = quiet ? null : 'Başvurun onaylandı. Sözleşmeyi onaylayınca tutar işletme hesabına aktarılır.';
  if (quiet) return;
  if (state.screen === 'isletme-takip') vmRerender('anim-fade'); else toast('Finansman başvurun onaylandı');
}
function bfContractSheet() {
  const a = state.bf.app, o = bfOffer(a.offer), q = bfQuote(o, a.amount, a.term), rev = o.kind === 'revolving';
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>Sözleşme onayı</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="receipt vm-sh-receipt">
      <div class="r-row"><span class="r-l">Finansman</span><span class="r-r">${o.short}</span></div>
      <div class="r-row hl"><span class="r-l">${rev ? 'Limit' : 'Tutar'}</span><span class="r-r">${vmTL(a.amount)}</span></div>
      <div class="r-row"><span class="r-l">Vade</span><span class="r-r">${bfTermTxt(o, a.term)}</span></div>
      ${rev ? '' : `<div class="r-row"><span class="r-l">Toplam geri ödeme</span><span class="r-r">${vmTL(q.total)}</span></div>`}
      <div class="r-row"><span class="r-l">${o.id === 'sup' ? 'Ödenecek tedarikçi' : 'Aktarılacak hesap'}</span><span class="r-r">${o.id === 'sup' ? 'Ege Elektronik Dağıtım A.Ş.' : `${BF_BIZ.account} · ${BF_BIZ.iban.slice(-4)}`}</span></div>
    </div>
    <div class="vm-sheet-note">${I.info}<span>Ticari kredi sözleşmesini ${BF_BIZ.rep} (imza yetkilisi) olarak dijital onaylıyorsun. Prototipte gerçek sözleşme veya kullandırım yapılmaz.</span></div>
    <button class="sheet-btn vm-approve" id="bf-sign" data-action="bf-sign">${I.faceid} Onaylıyorum</button>`;
  sheetEl.classList.add('open'); sheetScrimEl.classList.add('open');
}
function bfSignContract() {
  const btn = document.getElementById('bf-sign'), a = state.bf.app;
  if (!btn || btn.dataset.busy || !a) return;
  const o = bfOffer(a.offer);
  btn.dataset.busy = '1'; btn.style.pointerEvents = 'none';
  btn.innerHTML = '<span class="spinner"></span> Face ID ile doğrulanıyor…';
  setTimeout(() => { btn.innerHTML = `<span class="spinner"></span> ${o.kind === 'revolving' ? 'Limit açılıyor…' : o.id === 'sup' ? 'Tedarikçiye ödeniyor…' : 'Tutar hesabına aktarılıyor…'}`; }, 900);
  setTimeout(() => {
    bfActivate(a);
    closeSheet();
    if (state.screen === 'isletme-takip') vmRerender('anim-fade');
  }, 2200);
}
function bfActivate(a, quiet) {
  const o = bfOffer(a.offer);
  a.status = 'active';
  a.disbTs = a.at + 7 * 60000;
  a.disbAt = bfAppTime(a, 7);
  a.events.push({ t: 'Sözleşme dijital olarak onaylandı', d: BF_BIZ.rep, at: bfAppTime(a, 6), k: 'ok' });
  a.events.push({ t: o.kind === 'revolving' ? `${vmTL(a.amount)} limit açıldı` : o.id === 'sup' ? `${vmTL(a.amount)} tedarikçine ödendi` : `${vmTL(a.amount)} işletme hesabına aktarıldı`, d: o.id === 'sup' ? 'Ege Elektronik Dağıtım A.Ş.' : BF_BIZ.account, at: a.disbAt, k: 'ok' });
  a.fresh = quiet ? null : o.kind === 'revolving' ? 'Limitin açıldı; ihtiyaç duyduğunda kullanabilirsin.' : o.id === 'sup' ? 'Tutar tedarikçine ödendi.' : `${vmTL(a.amount)} işletme hesabına aktarıldı.`;
}
function bfDrawSheet() {
  const a = state.bf.app, o = bfOffer(a.offer), free = a.amount - (a.used || 0);
  const opts = [100000, 250000, -bfNeed().min, free].filter((x, k, arr) => x > 0 && x <= free && arr.indexOf(x) === k);
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>Limitten kullan</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="vm-choices">${opts.map(x => `<button class="vm-choice" data-action="bf-draw-set" data-v="${x}"><span>${vmTL(x)}${x === -bfNeed().min ? '<em>Yapay zekâ: Aralık başındaki tahmini açık</em>' : x === free ? '<em>Kalan limitin tamamı</em>' : ''}</span></button>`).join('')}</div>
    <div class="vm-sheet-note">${I.info}<span>Kullanılabilir limit ${vmTL(free)}. Tutar ${BF_BIZ.account} hesabına aktarılır; faiz kullandığın gün kadar işler (aylık %${vmPctStr(o.rate)}, örnek).</span></div>`;
  sheetEl.classList.add('open'); sheetScrimEl.classList.add('open');
}
function bfDraw(x) {
  const a = state.bf.app;
  a.used = (a.used || 0) + x;
  a.events.push({ t: `Limitten ${vmTL(x)} kullanıldı`, d: BF_BIZ.account, at: bfStamp(bfDemoNow()), k: 'ok' });
  a.fresh = `${vmTL(x)} işletme hesabına aktarıldı.`;
  closeSheet();
  vmRerender('anim-fade');
}
function bfAdvance() {
  const a = state.bf.app;
  if (!a) return;
  if (a.status === 'review') { a.running = false; a.step = BF_REVIEW.length; return bfApprove(a); }
  const o = bfOffer(a.offer), q = bfQuote(o, a.amount, a.term);
  if (a.status !== 'active' || o.kind === 'revolving' || a.paid >= q.rows.length) return;
  const r = q.rows[a.paid];
  a.paid++;
  a.events.push({ t: a.paid === q.rows.length ? 'Son ödeme yapıldı · finansman kapandı' : `${a.paid}. ödeme yapıldı`, d: vmTL(r.pay), at: `${bfNumDate(r.date)} · 10:00`, k: 'ok' });
  a.fresh = a.paid === q.rows.length ? 'Tüm ödemeler tamamlandı; finansman kapandı.' : `${a.paid}. ödeme işletme hesabından alındı.`;
  vmRerender('anim-fade');
}
function bfUnwind() {
  const i = state.nav.map(f => f.screen).lastIndexOf('isletme');
  if (i >= 0) state.nav = state.nav.slice(0, i);
  else while (state.nav.length && state.nav[state.nav.length - 1].screen.startsWith('isletme')) state.nav.pop();
  state.nav.push({ screen: 'isletme', chatSeed: false });
}
function bfGoHome() {
  const i = state.nav.map(f => f.screen).lastIndexOf('isletme');
  if (i >= 0) state.nav = state.nav.slice(0, i);
  closeSheet();
  state.chatSeed = false;
  state.screen = 'isletme';
  vmRerender();
}
function bfGoTrack() {
  const prev = state.nav[state.nav.length - 1];
  if (state.screen === 'isletme-takip') return;
  if (prev && prev.screen === 'isletme-takip') return navBack();
  go('isletme-takip');
}
function bfResetFlow() {
  const v = state.bf;
  v.app = null; v.draft = null; v.offer = 'wc';
  v.agree = { pre: false, data: false, kkb: false };
}
function bfReset() { bfResetFlow(); bfGoHome(); toast('Demo süreci sıfırlandı'); }
/* Clears the "fresh" banner of the tracking screen once it has been seen */
function bfSeen() { const a = state.bf.app; if (a && a.fresh && state.screen !== 'isletme-takip') a.fresh = null; }
// Deep links (#isletme-…) prepare the state they need without replaying the flow
function bfSeed(hash) {
  const v = state.bf;
  if (hash === 'isletme' || hash === 'isletme-hareketler') return;
  if (v.ai.status !== 'done') { clearTimeout(v.ai.timer); bfAIDone(true); }
  if (hash !== 'isletme-takip' || v.app) return;
  v.offer = 'wc'; v.draft = null;
  v.agree = { pre: true, data: true, kkb: true };
  v.app = bfMakeApp('review');
  setTimeout(bfStartReview, 400);   // shows the evaluation running
}

/* ===================================================================
   RENDER & NAVİGASYON
   =================================================================== */

/* ======================================================================
   HARCAMA BÖLÜŞTÜR / ÖDEME İSTE
   Ortak bir harcamayı kişi sayısına bölüp (IBAN/telefon/TCKN/karekod ile)
   ödeme isteği gönderme. İki yol: harcama seçerek ya da tutar girerek.
   ====================================================================== */

// Rehber kişileri — banka rozetli (gerçek uygulamadaki gibi farklı bankalar)
const SPLIT_CONTACTS = [
  { id: 'k1', name: 'Elif Yılmaz', bank: 'Yapı Kredi',   yk: true },
  { id: 'k2', name: 'Burak Ünal',  bank: 'Papara' },
  { id: 'k3', name: 'Mert Demir',  bank: 'Garanti BBVA' },
  { id: 'k4', name: 'Zeynep Kaya', bank: 'İş Bankası' },
  { id: 'k5', name: 'Can Aksoy',   bank: 'Enpara' },
  { id: 'k6', name: 'Deniz Şahin', bank: 'VakıfBank' },
  { id: 'k7', name: 'Ada Korkmaz', bank: 'Yapı Kredi',   yk: true },
  { id: 'k8', name: 'Ayşe Yıldız', bank: 'Yapı Kredi',   yk: true },
  { id: 'k9', name: 'Ece Kaya',    bank: 'Akbank' },
];
// Gruplar — seçilince tüm üyeleri toplu eklenir
const SPLIT_GROUPS = [
  { id: 'g1', name: 'Ev Arkadaşları', members: ['k2', 'k4', 'k6'] },
  { id: 'g2', name: 'Antalya Tatili', members: ['k1', 'k3', 'k5', 'k7'] },
];
// İsteğin toplanacağı hesaplar
const SPLIT_ACCTS = [
  { id: 'main', name: 'Vadesiz TL Hesabım', iban: 'TR•••• 4521', detail: 'Ana hesap · Bakiye 10.000 TL' },
  { id: 'sav',  name: 'Birikim Hesabım',    iban: 'TR•••• 1234', detail: 'Vadesiz TL · günlük getirili' },
];
const SPLIT_PURPOSES = ['Konut kirası', 'İşyeri kirası', 'Diğer kiralar', 'E-Ticaret ödemeleri', 'Çalışan ödemesi', 'Ticari ödeme', 'Bireysel ödeme'];
const SPLIT_VALIDS = ['7 gün', '14 gün', '1 ay', '2 ay', '3 ay', '6 ay'];
const SPLIT_DUES = ['Hemen öde', '7 gün', '14 gün', '1 ay', '2 ay', '3 ay', '6 ay'];

function splAcct() { return SPLIT_ACCTS.find(a => a.id === state.split.account) || SPLIT_ACCTS[0]; }
function splContact(id) { return SPLIT_CONTACTS.find(c => c.id === id); }
function splInitials(name) { const p = name.trim().split(/\s+/); return ((p[0]?.[0] || '') + (p[1]?.[0] || '')).toLocaleUpperCase('tr'); }
const SPL_COLORS = ['#0098cb', '#0a3d7a', '#7C4DFF', '#F5883E', '#14A5A0', '#E86AA6', '#2F6FED', '#8B7FD6'];
function splColor(name) { let h = 0; for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return SPL_COLORS[h % SPL_COLORS.length]; }
function splAvatar(name, cls) { return `<span class="spl-av ${cls || ''}" style="background:${splColor(name)}">${splInitials(name)}</span>`; }
function splTotal() { const s = state.split; return s.mode === 'amount' ? s.amount : s.picked.reduce((a, p) => a + p.amount, 0); }
function splHeads() { return state.split.people.length + (state.split.myShare ? 1 : 0); }
function splPer() { const h = splHeads(); return h ? splTotal() / h : splTotal(); }
function splPicked(id) { return state.split.picked.some(p => p.id === id); }
function splPeopleSel(id) { return state.split.people.some(p => p.id === id); }

// Harcama seç — sekmeye göre gerçek prototip verisinden liste (abonelik/fatura/kart hareketi)
function splPickItems() {
  const tab = state.split.pickTab;
  if (tab === 'subs') {
    return subsActive().map(s => ({ id: 'sub:' + s.id, name: s.name, sub: s.plan, date: '01.07.2026', amount: s.price }));
  }
  if (tab === 'bill') {
    const c = SPEND_CATS.find(x => x.id === 'fatura');
    return c.txns.map((t, i) => ({ id: 'bill:' + i, name: t.m, sub: t.s, date: t.d, amount: t.a }));
  }
  const out = [];
  ['yeme', 'market', 'ulasim', 'eglence'].forEach(cid => {
    const c = SPEND_CATS.find(x => x.id === cid);
    c.txns.forEach((t, i) => out.push({ id: 'txn:' + cid + ':' + i, name: t.m, sub: t.s, date: t.d, amount: t.a }));
  });
  return out;
}

/* -------------------- Hub: Gelen / Gönderilen -------------------- */
function SplitHub() {
  const tab = state.split.tab;
  return `
  <div class="screen anim-right sp-screen">
    <div class="nav-head sp-nav-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Ödeme İste</div>
      <button class="icon-btn" data-action="toast" data-msg="Ödeme iste ayarları prototipte aktif değil">${I.gear}</button>
    </div>
    <div class="sp-top">
      <div class="sp-seg">
        <button class="sp-seg-b ${tab === 'in' ? 'on' : ''}" data-action="spl-tab" data-tab="in">Gelen istekler</button>
        <button class="sp-seg-b ${tab === 'out' ? 'on' : ''}" data-action="spl-tab" data-tab="out">Gönderilen istekler</button>
      </div>
    </div>
    <div class="screen-scroll">
      ${tab === 'in' ? splInList() : splOutList()}
      <div class="sp-foot-note">${I.lock} Ödeme istekleri FAST altyapısıyla 7/24 anında ve güvenle iletilir.</div>
    </div>
    <div class="spl-footbar">
      <button class="spl-cta" data-action="spl-create">${I.plus} Ödeme İsteği Oluştur</button>
    </div>
  </div>`;
}
function splEmpty(t, s) {
  return `<div class="spl-empty"><div class="spl-empty-ic">${I.receipt}</div><div class="spl-empty-t">${t}</div><div class="spl-empty-s">${s}</div></div>`;
}
function splInList() {
  if (!splitIn.length) return splEmpty('Henüz gelen bir ödeme isteğin yok.', 'Sana gelen ödeme istekleri burada gösterilecek.');
  return `<div class="spl-list">${splitIn.map(r => {
    const paid = r.status === 'paid';
    return `<div class="spl-req">
      <div class="spl-req-top">
        ${splAvatar(r.from)}
        <div class="spl-req-mid"><div class="spl-req-n">${r.from}</div><div class="spl-req-s">${r.date}</div></div>
        <div class="spl-req-amt">${fmtTL2(r.amount)}</div>
      </div>
      <div class="spl-req-note">${r.note}</div>
      ${paid
        ? `<div class="spl-req-paid">${I.check} Ödendi</div>`
        : `<button class="spl-cta sm" data-action="spl-pay-open" data-id="${r.id}">${I.transfer} FAST ile Öde</button>`}
    </div>`;
  }).join('')}</div>`;
}
function splOutList() {
  if (!splitOut.length) return splEmpty('Henüz gönderdiğin bir istek yok.', 'Oluşturduğun ödeme istekleri burada listelenir.');
  return `<div class="spl-list">${splitOut.map(r => {
    const paid = r.people.filter(p => p.status === 'paid').length;
    const done = paid === r.people.length;
    return `<div class="spl-req">
      <div class="spl-req-top">
        <span class="spl-req-ico">${I.receipt}</span>
        <div class="spl-req-mid"><div class="spl-req-n">${r.title}</div><div class="spl-req-s">${r.note} · ${r.date}</div></div>
        <div class="spl-req-amt">${fmtTL2(r.total)}</div>
      </div>
      <div class="spl-prog"><div class="spl-prog-bar"><i style="width:${paid / r.people.length * 100}%"></i></div>
        <span>${paid}/${r.people.length} ödendi · kişi başı ${fmtTL2(r.per)}</span></div>
      <div class="spl-ppl">${r.people.map(p => `
        <div class="spl-pp">
          <div class="spl-pp-l">${splAvatar(p.name, 'sm')}<div class="spl-pp-mid"><b>${p.name}</b></div></div>
          <span class="spl-pp-st ${p.status}">${p.status === 'paid' ? I.check + ' Ödedi' : 'Bekliyor'}</span>
        </div>`).join('')}</div>
      ${done ? '' : `<button class="spl-cta ghost sm" data-action="toast" data-msg="Hatırlatma gönderildi 🔔">Ödemeyenlere hatırlat</button>`}
    </div>`;
  }).join('')}</div>`;
}

/* İstek oluştur — iki yol */
function splCreateSheet() {
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>İstek oluştur</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="spl-opt" data-action="spl-start" data-mode="amount">
      <span class="spl-opt-ic">${I.bars}</span>
      <div class="spl-opt-mid"><b>Tutar girerek ödeme isteği gönder</b><span>Tutar girerek bir ya da birden fazla kişiye istek gönder</span></div>
      <span class="spl-opt-chev">${I.chevR}</span>
    </div>
    <div class="spl-opt" data-action="spl-start" data-mode="pick">
      <span class="spl-opt-ic">${I.receipt}</span>
      <div class="spl-opt-mid"><b>Seçtiğin harcamayı bölüştür</b><span>Yaptığın ya da yaklaşan harcamaların için bir ya da birden fazla kişiye istek gönder</span></div>
      <span class="spl-opt-chev">${I.chevR}</span>
    </div>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function splStart(mode) {
  closeSheet();
  const s = state.split;
  s.mode = mode; s.picked = []; s.amount = 0; s.people = []; s.note = '';
  s.myShare = true; s.purpose = 'Bireysel ödeme'; s.valid = '1 ay';
  s.due = 'Son ödeme gününü seç'; s.partial = false; s.account = 'main';
  go(mode === 'amount' ? 'split-amount' : 'split-pick');
}

/* -------------------- Harcama seç -------------------- */
function SplitPick() {
  const items = splPickItems();
  const total = state.split.picked.reduce((a, p) => a + p.amount, 0);
  const n = state.split.picked.length;
  const tabs = [['card', 'Kart hareketleri'], ['bill', 'Faturalar'], ['subs', 'Abonelikler']];
  return `
  <div class="screen anim-right sp-screen">
    <div class="nav-head sp-nav-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Harcama Bölüştür</div><div class="nav-spacer"></div>
    </div>
    <div class="screen-scroll">
      <div class="spl-sec-lbl">YAPILAN HARCAMALAR</div>
      <div class="spl-chips">${tabs.map(([k, l]) => `<button class="spl-chip ${state.split.pickTab === k ? 'on' : ''}" data-action="spl-picktab" data-tab="${k}">${l}</button>`).join('')}</div>
      ${n ? `<div class="spl-added"><span class="spl-added-ic">${I.transfer}</span><div class="spl-added-mid"><b>Eklenen harcamalar</b><span>${n} harcama seçili · ${fmtTL2(total)}</span></div></div>` : ''}
      <div class="spl-picklist">${items.map(it => {
        const on = splPicked(it.id);
        return `<div class="spl-pickrow ${on ? 'on' : ''}" data-action="spl-pick-item" data-id="${it.id}">
          <div class="spl-pickrow-mid"><div class="spl-pickrow-n">${it.name}</div><div class="spl-pickrow-s">${it.sub} · ${it.date}</div></div>
          <div class="spl-pickrow-a">${fmtTL2(it.amount)}</div>
          <span class="spl-check ${on ? 'on' : ''}">${on ? I.check : ''}</span>
        </div>`;
      }).join('')}</div>
    </div>
    <div class="spl-footbar">
      <button class="spl-cta" ${n ? '' : 'disabled'} data-action="spl-pick-next">Devam${n ? ` · ${fmtTL2(total)}` : ''}</button>
    </div>
  </div>`;
}

/* -------------------- Tutar girerek -------------------- */
function SplitAmount() {
  const s = state.split;
  return `
  <div class="screen anim-right sp-screen">
    <div class="nav-head sp-nav-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Ödeme İste</div><div class="nav-spacer"></div>
    </div>
    <div class="screen-scroll">
      <div class="spl-amt-wrap">
        <div class="spl-amt-lbl">İstenecek tutar</div>
        <div class="spl-amt-field"><input id="spl-amt-input" inputmode="decimal" placeholder="0,00" value="${s.amount ? s.amount : ''}"><span>TL</span></div>
        <div class="spl-amt-hint">Girdiğin tutarı bir ya da birden fazla kişiyle bölüşebilirsin.</div>
      </div>
      <div class="spl-field"><label>Açıklama <i>(opsiyonel)</i></label><input id="spl-amt-note" placeholder="Örn. Akşam yemeği" value="${s.note || ''}"></div>
    </div>
    <div class="spl-footbar">
      <button class="spl-cta" data-action="spl-amount-next">Devam</button>
    </div>
  </div>`;
}

/* -------------------- Kişi seç -------------------- */
function SplitPeople() {
  const s = state.split;
  const n = s.people.length;
  return `
  <div class="screen anim-right sp-screen">
    <div class="nav-head sp-nav-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Ödeme İste</div>
      <button class="icon-btn" data-action="toast" data-msg="Kişi arama prototipte aktif değil">${I.search}</button>
    </div>
    <div class="screen-scroll">
      <button class="spl-create" data-action="spl-newcontact">
        <span class="spl-create-ic">${I.plus}</span><span class="spl-create-t">Yeni kişiye istek gönder</span><span class="spl-create-chev">${I.chevR}</span>
      </button>
      <div class="spl-ptabs">
        <button class="spl-ptab ${s.peopleTab === 'people' ? 'on' : ''}" data-action="spl-peopletab" data-tab="people">Kişiler</button>
        <button class="spl-ptab ${s.peopleTab === 'groups' ? 'on' : ''}" data-action="spl-peopletab" data-tab="groups">Gruplar</button>
      </div>
      ${s.peopleTab === 'people' ? `<div class="spl-picklist">${SPLIT_CONTACTS.map(c => {
        const on = splPeopleSel(c.id);
        return `<div class="spl-pickrow ${on ? 'on' : ''}" data-action="spl-toggle-person" data-id="${c.id}">
          ${splAvatar(c.name)}
          <div class="spl-pickrow-mid"><div class="spl-pickrow-n">${c.name}</div>${c.id.startsWith('new') ? `<div class="spl-pickrow-s">${c.bank}</div>` : ''}</div>
          <span class="spl-check ${on ? 'on' : ''}">${on ? I.check : ''}</span>
        </div>`;
      }).join('')}</div>` : `<div class="spl-picklist">${SPLIT_GROUPS.map(g => `
        <div class="spl-pickrow" data-action="spl-pick-group" data-id="${g.id}">
          <span class="spl-group-ic">${I.world}</span>
          <div class="spl-pickrow-mid"><div class="spl-pickrow-n">${g.name}</div><div class="spl-pickrow-s">${g.members.length} kişi · dokun, hepsini ekle</div></div>
          <span class="spl-create-chev">${I.chevR}</span>
        </div>`).join('')}</div>`}
    </div>
    <div class="spl-footbar">
      <button class="spl-cta" ${n ? '' : 'disabled'} data-action="spl-people-next">Devam${n ? ` · ${n} kişi` : ''}</button>
    </div>
  </div>`;
}
function splMethodSheet() {
  const methods = [['iban', 'IBAN ile', I.card], ['phone', 'Telefon no ile', I.transfer], ['qr', 'TR karekod ile', I.qr], ['tckn', 'TCKN/Pasaport/VKN ile', I.user]];
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>Yeni alıcıya istek</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    ${methods.map(([k, l, ic]) => `<div class="spl-method" data-action="spl-method" data-m="${k}"><span class="spl-method-ic">${ic}</span><b>${l}</b><span class="spl-opt-chev">${I.chevR}</span></div>`).join('')}`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function splMethodInput(m) {
  if (m === 'qr') { closeSheet(); return toast('TR karekod okuyucu prototipte aktif değil'); }
  const cfg = {
    iban:  { t: 'IBAN ile', lbl: 'IBAN', ph: 'TR__ ____ ____ ____ ____ __', mode: 'text' },
    phone: { t: 'Telefon no ile', lbl: 'Telefon numarası', ph: '5__ ___ __ __', mode: 'tel' },
    tckn:  { t: 'TCKN / Pasaport / VKN ile', lbl: 'Kimlik numarası', ph: '___________', mode: 'numeric' },
  }[m];
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>${cfg.t}</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="spl-field sheet"><label>${cfg.lbl}</label><input id="spl-new-input" inputmode="${cfg.mode}" placeholder="${cfg.ph}"></div>
    <button class="spl-cta" data-action="spl-add-newcontact" data-m="${m}">Kişiyi ekle</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
  setTimeout(() => { const i = document.getElementById('spl-new-input'); i && i.focus(); }, 250);
}
function splAddNewContact(m) {
  const el = document.getElementById('spl-new-input');
  const v = (el && el.value.trim()) || '';
  if (!v) { toast('Lütfen bilgi girin'); return; }
  const label = { iban: 'IBAN', phone: 'Telefon', tckn: 'TCKN' }[m] || 'Alıcı';
  const mask = v.length > 6 ? v.slice(0, 4) + '••••' + v.slice(-2) : v;
  const id = 'new' + Date.now();
  const c = { id, name: 'Yeni alıcı', bank: label + ' · ' + mask };
  SPLIT_CONTACTS.push(c);
  state.split.people.push({ id, name: c.name, bank: c.bank });
  closeSheet();
  toast('Kişi eklendi');
  render();
}

/* -------------------- Bölüştür formu -------------------- */
function splCaptureNote() {
  const el = document.getElementById('spl-form-note') || document.getElementById('spl-amt-note');
  if (el) state.split.note = el.value;
}
function SplitForm() {
  const s = state.split;
  const total = splTotal();
  const per = splPer();
  const acct = splAcct();
  const items = s.mode === 'pick' ? s.picked : [{ name: s.note || 'Tutar girerek istek', sub: 'Elle girilen tutar', date: '', amount: s.amount }];
  return `
  <div class="screen anim-right sp-screen">
    <div class="nav-head sp-nav-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-head-titles"><div class="nav-title">Harcama Bölüştür</div><div class="nav-sub">${s.people.length} kişi</div></div>
      <div class="nav-spacer"></div>
    </div>
    <div class="screen-scroll">
      <div class="sp-card">
        ${items.map(it => `<div class="spl-sumrow"><div class="spl-sumrow-mid"><b>${it.name}</b><span>${it.date || it.sub}</span></div><div class="spl-sumrow-a">${fmtTL2(it.amount)}</div></div>`).join('')}
        <div class="spl-sumtot"><span>Toplam tutar</span><b>${fmtTL2(total)}</b></div>
        <div class="spl-switch">
          <div class="spl-switch-mid"><b>Harcamada payım var</b><span>Kişi başı hesaplanırken sen de sayılırsın; yalnızca diğerlerinden istenir.</span></div>
          <button class="spl-toggle ${s.myShare ? 'on' : ''}" data-action="spl-toggle-myshare"><i></i></button>
        </div>
      </div>

      <div class="spl-perhead">
        <div class="spl-perhead-l">Kişi başı düşen</div>
        <div class="spl-perhead-a">${fmtTL2(per)}</div>
        <div class="spl-perhead-s">${splHeads()} kişiye bölündü${s.myShare ? ' (sen dahil)' : ''} · ${s.people.length} kişiye istek</div>
      </div>

      <div class="sp-card pad0">
        <div class="sp-card-h">İstek gönderilecek kişiler</div>
        <div class="spl-formppl">${s.people.map(p => `<div class="spl-pp"><div class="spl-pp-l">${splAvatar(p.name, 'sm')}<div class="spl-pp-mid"><b>${p.name}</b></div></div><div class="spl-pp-a">${fmtTL2(per)}</div></div>`).join('')}</div>
      </div>

      <div class="sp-card pad0">
        <div class="spl-formrow" data-action="spl-pick-acct"><div class="spl-formrow-l"><span class="spl-formrow-lbl">Alıcı hesap</span><span class="spl-formrow-val">${acct.name} · ${acct.iban}</span></div><span class="spl-formrow-chev">${I.chevDown}</span></div>
        <div class="spl-formrow" data-action="spl-pick-purpose"><div class="spl-formrow-l"><span class="spl-formrow-lbl">İşlem amacı</span><span class="spl-formrow-val">${s.purpose}</span></div><span class="spl-formrow-chev">${I.chevDown}</span></div>
        <div class="spl-formrow noarrow"><div class="spl-formrow-l"><span class="spl-formrow-lbl">Açıklama</span></div><input class="spl-inline-input" id="spl-form-note" placeholder="Opsiyonel" value="${s.note || ''}"></div>
      </div>

      <div class="spl-sec-lbl">ÖDEME ZAMANI</div>
      <div class="sp-card pad0">
        <div class="spl-formrow" data-action="spl-pick-valid"><div class="spl-formrow-l"><span class="spl-formrow-lbl">İstek geçerlilik süresi</span><span class="spl-formrow-val">${s.valid}</span></div><span class="spl-formrow-chev">${I.chevDown}</span></div>
        <div class="spl-formrow" data-action="spl-pick-due"><div class="spl-formrow-l"><span class="spl-formrow-lbl">Son ödeme süresi</span><span class="spl-formrow-val ${s.due.includes('seç') ? 'dim' : ''}">${s.due}</span></div><span class="spl-formrow-chev">${I.chevDown}</span></div>
      </div>

      <div class="sp-card">
        <div class="spl-switch">
          <div class="spl-switch-mid"><b>Kısmi Ödeme</b><span>Tutarın belirlenen bir kısmının ödenmesine izin ver.</span></div>
          <button class="spl-toggle ${s.partial ? 'on' : ''}" data-action="spl-toggle-partial"><i></i></button>
        </div>
      </div>
    </div>
    <div class="spl-footbar">
      <button class="spl-cta" data-action="spl-send">Devam et</button>
    </div>
  </div>`;
}
function splChoiceSheet(title, opts, action) {
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>${title}</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="spl-choicelist">${opts.map(o => `<div class="spl-choice ${o.on ? 'on' : ''}" data-action="${action}" data-val="${o.val}"><span>${o.label}</span>${o.on ? `<span class="spl-choice-ck">${I.check}</span>` : ''}</div>`).join('')}</div>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}

/* -------------------- Başarı -------------------- */
function splSend() {
  splCaptureNote();
  const s = state.split;
  const per = splPer();
  const title = s.mode === 'pick'
    ? (s.picked.length === 1 ? s.picked[0].name : s.picked.length + ' harcama')
    : (s.note || 'Ödeme isteği');
  const req = {
    id: 'out' + Date.now(),
    title,
    note: s.note || (s.mode === 'pick' ? 'Harcama bölüşümü' : 'Tutar isteği'),
    total: splTotal(),
    per,
    date: 'Bugün',
    people: s.people.map(p => ({ name: p.name, bank: p.bank, status: 'pending' })),
  };
  splitOut.unshift(req);
  state.split.lastReq = req;
  go('split-success');
}
function SplitSuccess() {
  const r = state.split.lastReq;
  if (!r) { state.split.tab = 'out'; state.screen = 'split'; return SplitHub(); }
  const asked = r.per * r.people.length;
  return `
  <div class="screen anim-right spl-success">
    <div class="spl-suc-check">${I.checkBig}</div>
    <div class="spl-suc-t">İstek gönderildi</div>
    <div class="spl-suc-s">${r.people.length} kişiye toplam ${fmtTL2(asked)} tutarında ödeme isteği iletildi.</div>
    <div class="sp-card">
      <div class="spl-suc-row"><span>Kişi başı</span><b>${fmtTL2(r.per)}</b></div>
      <div class="spl-suc-row"><span>Kişi sayısı</span><b>${r.people.length}</b></div>
      <div class="spl-suc-row"><span>Toplam istenen</span><b>${fmtTL2(asked)}</b></div>
      <div class="spl-suc-ppl">${r.people.map(p => splAvatar(p.name, 'sm')).join('')}</div>
    </div>
    <div class="spl-suc-hint">${I.info} Yapı Kredi kullanmayan kişilere istek, ödeme bağlantısı olarak SMS/WhatsApp ile iletilir.</div>
    <div class="spl-suc-btns">
      <button class="spl-cta ghost" data-action="toast" data-msg="WhatsApp paylaşımı prototipte aktif değil">WhatsApp ile paylaş</button>
      <button class="spl-cta" data-action="spl-go-out">Gönderilen isteklere git</button>
    </div>
  </div>`;
}

/* -------------------- Gelen isteği öde (FAST) -------------------- */
function SplitPay() {
  const r = splitIn.find(x => x.id === state.split.payId);
  if (!r) { state.screen = 'split'; return SplitHub(); }
  const acct = splAcct();
  return `
  <div class="screen anim-right sp-screen">
    <div class="nav-head sp-nav-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">İsteği Öde</div><div class="nav-spacer"></div>
    </div>
    <div class="screen-scroll">
      <div class="spl-pay-hero">
        ${splAvatar(r.from, 'big')}
        <div class="spl-pay-from">${r.from}</div>
        <div class="spl-pay-note">${r.note}</div>
        <div class="spl-pay-amt">${fmtTL2(r.amount)}</div>
        <span class="spl-fast">${I.transfer} FAST · anında</span>
      </div>
      <div class="sp-card pad0">
        <div class="spl-formrow noarrow"><div class="spl-formrow-l"><span class="spl-formrow-lbl">Gönderen</span><span class="spl-formrow-val">${r.from}</span></div></div>
        <div class="spl-formrow" data-action="spl-pick-acct"><div class="spl-formrow-l"><span class="spl-formrow-lbl">Ödenecek hesap</span><span class="spl-formrow-val">${acct.name} · ${acct.iban}</span></div><span class="spl-formrow-chev">${I.chevDown}</span></div>
        <div class="spl-formrow noarrow"><div class="spl-formrow-l"><span class="spl-formrow-lbl">Tutar</span><span class="spl-formrow-val">${fmtTL2(r.amount)}</span></div></div>
      </div>
      <div class="sp-foot-note">${I.lock} FAST ile 7/24 anında transfer. Onaylayınca tutar hesabından çekilir.</div>
    </div>
    <div class="spl-footbar">
      <button class="spl-cta" id="spl-pay-btn" data-action="spl-pay-confirm" data-id="${r.id}">FAST ile Öde · ${fmtTL2(r.amount)}</button>
    </div>
  </div>`;
}
function splPayConfirm(id) {
  const btn = document.getElementById('spl-pay-btn');
  if (btn) { btn.innerHTML = `<span class="spinner"></span> Ödeniyor…`; btn.style.pointerEvents = 'none'; }
  const r = splitIn.find(x => x.id === id);
  setTimeout(() => {
    if (r) r.status = 'paid';
    state.split.tab = 'in';
    navBack();
    toast('Ödeme başarılı · ' + (r ? fmtTL2(r.amount) : ''));
  }, 1400);
}

/* -------------------- Split etkileşimleri -------------------- */
function splToggleItem(id) {
  const s = state.split;
  const i = s.picked.findIndex(p => p.id === id);
  if (i >= 0) s.picked.splice(i, 1);
  else { const it = splPickItems().find(x => x.id === id); if (it) s.picked.push({ id: it.id, name: it.name, sub: it.sub, date: it.date, amount: it.amount }); }
  render();
}
function splTogglePerson(id) {
  const s = state.split;
  const i = s.people.findIndex(p => p.id === id);
  if (i >= 0) s.people.splice(i, 1);
  else { const c = splContact(id); if (c) s.people.push({ id: c.id, name: c.name, bank: c.bank }); }
  render();
}
function splPickGroup(id) {
  const g = SPLIT_GROUPS.find(x => x.id === id); if (!g) return;
  const s = state.split;
  g.members.forEach(mid => { if (!s.people.some(p => p.id === mid)) { const c = splContact(mid); if (c) s.people.push({ id: c.id, name: c.name, bank: c.bank }); } });
  s.peopleTab = 'people';
  render();
}
function splAmountNext() {
  const el = document.getElementById('spl-amt-input');
  const noteEl = document.getElementById('spl-amt-note');
  const v = el ? parseFloat(String(el.value).replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.')) : 0;
  if (!v || v <= 0) { toast('Lütfen tutar girin'); return; }
  state.split.amount = v;
  if (noteEl) state.split.note = noteEl.value;
  go('split-people');
}

/* ======================================================================
   BİRLİKTE KAZAN — grup harcama hedefi → Worldpuan iadesi → kişi başı bölüşüm
   ====================================================================== */
function bkTL(n) { return n.toLocaleString('tr-TR') + ' TL'; }
function bkById(id) { return bkGoals.find(g => g.id === id); }
function bkView() { return bkById(state.bk.viewId) || bkGoals[0]; }
function bkReward(g) { return Math.round(g.target * g.rate / 100); }   // ödül havuzu (TL)
function bkTotalContrib(g) { return g.members.reduce((a, m) => a + m.contrib, 0); }
function bkPct(g) { return Math.min(100, Math.round(g.spent / g.target * 100)); }
function bkRemain(g) { return Math.max(0, g.target - g.spent); }
function bkShareFor(g, m) {                     // kişi payı (TL)
  const pool = bkReward(g);
  if (g.share === 'contrib') { const t = bkTotalContrib(g) || 1; return Math.round(pool * m.contrib / t); }
  return Math.round(pool / g.members.length);
}
function bkFirstName(n) { return n.split(' ')[0]; }
function bkMkPerson(id) { const c = splContact(id); return c ? { id: c.id, name: c.name } : null; }

/* -------------------- Hub (çoklu hedef) -------------------- */
function BkHub() {
  const featured = bkGoals.find(g => g.status === 'active') || bkGoals[0];
  const others = bkGoals.filter(g => g.id !== featured.id);
  const pct = bkPct(featured);
  return `
  <div class="screen anim-right sp-screen">
    <div class="nav-head sp-nav-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Birlikte Kazan</div><div class="nav-spacer"></div>
    </div>
    <div class="screen-scroll">
      <div class="bk-hero2">
        <div class="bk-hero2-txt">
          <div class="bk-hero2-t">Birlikte harca, birlikte kazan</div>
          <div class="bk-hero2-s">Grup olarak belirlediğiniz harcama hedeflerine ulaşın, Worldpuan ödülünü birlikte kazanın.</div>
        </div>
        <div class="bk-hero2-gift">🎁</div>
      </div>

      <button class="bk-feat" data-action="bk-view" data-id="${featured.id}">
        <div class="bk-feat-top">
          <span class="bk-feat-ic">${featured.icon}</span>
          <div class="bk-feat-h"><div class="bk-feat-k">AKTİF HEDEF</div><div class="bk-feat-name">${featured.name}</div></div>
          <span class="bk-feat-days">${I.calendar} ${featured.daysLeft} gün</span>
        </div>
        <div class="bk-stats3">
          <div class="bk-stat"><div class="bk-stat-l">Hedef Tutar</div><div class="bk-stat-v">${bkTL(featured.target)}</div></div>
          <div class="bk-stat"><div class="bk-stat-l">Mevcut Harcama</div><div class="bk-stat-v accent">${bkTL(featured.spent)}</div></div>
          <div class="bk-stat"><div class="bk-stat-l">Kazanılacak Ödül</div><div class="bk-stat-v puan">${bkTL(bkReward(featured))}<span>Worldpuan</span></div></div>
        </div>
        <div class="bk-bar"><i style="width:${pct}%"></i></div>
        <div class="bk-feat-row"><span class="bk-feat-pct">%${pct}</span><span>${bkTL(featured.target)}</span></div>
        <div class="bk-feat-info">${I.info} ${featured.share === 'equal' ? 'Hedefe ulaşıldığında ödül tüm katılımcılar arasında eşit paylaştırılır.' : 'Ödül katkı oranına göre paylaştırılır.'}</div>
        <div class="bk-feat-sec">Katılımcılar ve Katkıları</div>
        <div class="bk-contrib-grid">${featured.members.map(m => `
          <div class="bk-cc">${splAvatar(m.name, 'sm')}<div class="bk-cc-mid"><b>${bkFirstName(m.name)}${m.me ? ' (Sen)' : ''}</b><span>${bkTL(m.contrib)}</span></div></div>`).join('')}</div>
      </button>

      ${others.length ? `<div class="bk-sec-h"><span>Aktif Hedeflerin</span><button class="sp-link" data-action="toast" data-msg="Tümü prototipte aktif değil">Tümünü Gör ${I.chevR}</button></div>
      <div class="bk-minis">${others.map(bkMiniCard).join('')}</div>` : ''}

      <div class="bk-how">
        <div class="bk-how-h">${I.spark} Nasıl çalışır?</div>
        <div class="bk-how-step"><span>1</span> Bir harcama hedefi belirle ve detayları gir</div>
        <div class="bk-how-step"><span>2</span> Grubunu oluştur, arkadaşlarını davet et</div>
        <div class="bk-how-step"><span>3</span> Hedefe ulaşınca Worldpuan ödülünü paylaş</div>
      </div>
      <div class="sp-foot-note">${I.lock} Katkılar kart hareketlerinden otomatik toplanır; ödül World kampanyası kapsamındadır ve Ödüllerim'e aktarılır.</div>
    </div>
    <div class="spl-footbar">
      <button class="spl-cta" data-action="bk-new">${I.plus} Yeni Hedef Oluştur</button>
    </div>
  </div>`;
}
function bkMiniCard(g) {
  const pct = bkPct(g); const done = g.status === 'done';
  return `<button class="bk-mini ${done ? 'done' : ''}" data-action="bk-view" data-id="${g.id}">
    <div class="bk-mini-top"><span class="bk-mini-ic">${g.icon}</span><span class="bk-mini-badge ${done ? 'done' : ''}">${done ? I.check + ' Tamamlandı' : 'Aktif'}</span></div>
    <div class="bk-mini-name">${g.name}</div>
    <div class="bk-mini-figs"><span>${bkTL(g.target)}</span><span class="bk-mini-spent ${done ? 'done' : ''}">${bkTL(g.spent)}</span></div>
    <div class="bk-bar sm ${done ? 'done' : ''}"><i style="width:${pct}%"></i></div>
    <div class="bk-mini-foot">${done ? '<span class="bk-mini-shared">Ödül paylaştırıldı</span>' : `<span class="bk-mini-reward">Ödül: ${bkTL(bkReward(g))}</span>`}<span class="spl-create-chev">${I.chevR}</span></div>
  </button>`;
}

/* -------------------- Yeni hedef oluştur (sade) -------------------- */
function bkCaptureNewInputs() {
  const nm = document.getElementById('bk-name-input');
  if (nm) state.bk.name = nm.value;
  const tg = document.getElementById('bk-target-input');
  if (tg) { const v = parseFloat(String(tg.value).replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.')); if (v > 0) state.bk.target = Math.round(v); }
}
function BkNew() {
  const d = state.bk;
  const n = d.people.length;
  const heads = n + 1;                         // katılımcılar + sen
  const pool = Math.round(d.target * BK_RATE / 100);
  const perEqual = heads ? Math.round(pool / heads) : 0;
  return `
  <div class="screen anim-right sp-screen">
    <div class="nav-head sp-nav-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Yeni Hedef Oluştur</div><div class="nav-spacer"></div>
    </div>
    <div class="screen-scroll">
      <div class="bk-new-sub">Grubunla bir harcama hedefi belirle, ödülü birlikte paylaş.</div>

      <div class="sp-card">
        <div class="bk-field"><label>Hedef adı</label><input id="bk-name-input" placeholder="Örn. Market Alışverişi" value="${d.name || ''}"></div>
      </div>
      <div class="sp-card">
        <div class="bk-field"><label>Toplam hedef tutar</label><div class="bk-target-field"><input id="bk-target-input" inputmode="decimal" value="${d.target}"><span>TL</span></div></div>
      </div>

      <div class="spl-sec-lbl">KATILIMCILAR</div>
      <div class="bk-chips">
        <span class="bk-pchip you">${splAvatar('Selçuk İmre', 'sm')}<b>Sen</b></span>
        ${d.people.map(p => `<span class="bk-pchip">${splAvatar(p.name, 'sm')}<b>${bkFirstName(p.name)}</b><button class="bk-pchip-x" data-action="bk-remove-person" data-id="${p.id}">✕</button></span>`).join('')}
        <button class="bk-pchip add" data-action="bk-add-person"><span class="bk-pchip-plus">${I.plus}</span>Kişi Ekle</button>
      </div>

      <div class="spl-sec-lbl">ÖDÜL PAYLAŞIMI</div>
      <div class="bk-seg">
        <button class="bk-seg-b ${d.share === 'equal' ? 'on' : ''}" data-action="bk-share" data-val="equal"><b>Eşit paylaşım</b><span>Ödül herkese eşit</span></button>
        <button class="bk-seg-b ${d.share === 'contrib' ? 'on' : ''}" data-action="bk-share" data-val="contrib"><b>Katkı oranına göre</b><span>Çok harcayan çok alır</span></button>
      </div>

      <div class="bk-preview">
        <div class="bk-preview-gift">🎁</div>
        <div class="bk-preview-mid">
          <div class="bk-preview-l">Hedef tamamlanırsa ${d.share === 'equal' ? 'kişi başı' : 'ödül havuzu'}</div>
          <div class="bk-preview-a">${d.share === 'equal' ? bkTL(perEqual) : bkTL(pool)} <span>Worldpuan</span></div>
        </div>
      </div>
    </div>
    <div class="spl-footbar">
      <button class="spl-cta" ${n ? '' : 'disabled'} data-action="bk-start">Hedefi Oluştur</button>
    </div>
  </div>`;
}
function bkAddPersonSheet() {
  bkCaptureNewInputs();
  const avail = SPLIT_CONTACTS.filter(c => !state.bk.people.some(p => p.id === c.id));
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>Kişi ekle</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="spl-choicelist">${avail.length ? avail.map(c => `<div class="spl-choice" data-action="bk-add-person-do" data-id="${c.id}"><span>${c.name}</span><span class="spl-create-chev">${I.plus}</span></div>`).join('') : '<div class="bk-hint-empty" style="margin:12px 4px">Eklenecek başka kişi yok.</div>'}</div>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}

/* -------------------- İlerleme -------------------- */
function BkTrack() {
  const g = bkView();
  const pct = bkPct(g);
  const total = bkTotalContrib(g);
  const reached = g.spent >= g.target;
  const done = g.status === 'done';
  const miles = [50, 80, 100];
  return `
  <div class="screen anim-right sp-screen">
    <div class="nav-head sp-nav-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-head-titles"><div class="nav-title">Birlikte Kazan</div><div class="nav-sub">${g.name}</div></div>
      <div class="nav-spacer"></div>
    </div>
    <div class="screen-scroll">
      <div class="bk-stats3 card">
        <div class="bk-stat"><div class="bk-stat-l">Hedef Tutar</div><div class="bk-stat-v">${bkTL(g.target)}</div></div>
        <div class="bk-stat"><div class="bk-stat-l">Mevcut Harcama</div><div class="bk-stat-v accent">${bkTL(g.spent)}</div></div>
        <div class="bk-stat"><div class="bk-stat-l">${done ? 'Kazanılan Ödül' : 'Kazanılacak Ödül'}</div><div class="bk-stat-v puan">${bkTL(bkReward(g))}<span>Worldpuan</span></div></div>
      </div>

      <div class="bk-hero">
        <div class="bk-hero-pct">%${pct}</div>
        <div class="bk-hero-sub">${reached ? 'Hedefe ulaşıldı! 🎉' : `Hedefe ${bkTL(bkRemain(g))} kaldı`}</div>
        <div class="bk-bar big"><i style="width:${pct}%"></i>${miles.map(m => `<span class="bk-mile ${pct >= m ? 'on' : ''}" style="left:${m}%"></span>`).join('')}</div>
        <div class="bk-hero-row"><span><b>${bkTL(g.spent)}</b> harcandı</span><span>Hedef ${bkTL(g.target)}</span></div>
        ${done ? '' : `<div class="bk-hero-days">${I.calendar} ${g.daysLeft} gün kaldı · bu ay</div>`}
      </div>

      ${reached ? '' : `<div class="bk-nudge">${I.spark} Hedefe <b>${bkTL(bkRemain(g))}</b> kaldı — senin ${bkTL(Math.min(bkRemain(g), 1500))} harcaman grubu hedefe taşıyabilir.</div>`}

      <div class="sp-card pad0">
        <div class="sp-card-h">Katılımcılar ve Katkıları</div>
        <div class="bk-contriblist">${g.members.slice().sort((a, b) => b.contrib - a.contrib).map(m => `
          <div class="bk-contrib">
            <div class="bk-contrib-l">${splAvatar(m.name, 'sm')}<div class="bk-contrib-mid"><b>${bkFirstName(m.name)}${m.me ? ' (Sen)' : ''}</b><span>${done ? 'Payı: ' + bkTL(bkShareFor(g, m)) + ' Worldpuan' : (g.share === 'equal' ? 'eşit pay' : 'katkı payı')}</span></div></div>
            <div class="bk-contrib-r">
              <div class="bk-contrib-a">${bkTL(m.contrib)}</div>
              <div class="bk-contrib-bar"><i style="width:${total ? Math.round(m.contrib / total * 100) : 0}%"></i></div>
            </div>
          </div>`).join('')}</div>
      </div>
      <div class="sp-foot-note">${I.lock} Katkılar kart hareketlerinden otomatik güncellenir. Hedefe ulaşınca havuz ${g.share === 'equal' ? 'eşit' : 'katkıya göre'} paylaşılır.</div>
    </div>
    <div class="spl-footbar">
      <button class="spl-cta" data-action="bk-claim">${done ? 'Ödül Dağılımını Gör' : (reached ? 'Ödülü Paylaştır' : 'Ödülü Paylaştır (demo)')}</button>
    </div>
  </div>`;
}

/* -------------------- Kutlama + dağıtım -------------------- */
function bkAwardOnce(g) {
  if (g._awarded || state.fayda.wallet.some(w => w.id === 'bk-' + g.id)) { g._awarded = true; g.claimed = true; return; }
  g._awarded = true;
  g.claimed = true;
  const me = g.members.find(m => m.me) || g.members[0];
  const share = bkShareFor(g, me);
  state.fayda.wallet.unshift({ id: 'bk-' + g.id, label: 'Birlikte Kazan ödülü', meta: bkTL(share) + ' Worldpuan · ' + g.name, status: 'active' });
}
function BkWin() {
  const g = bkView();
  const rows = g.members.slice().sort((a, b) => bkShareFor(g, b) - bkShareFor(g, a));
  return `
  <div class="screen anim-right spl-success">
    <div class="spl-suc-check">${I.checkBig}</div>
    <div class="spl-suc-t">Hedefe ulaşıldı!</div>
    <div class="spl-suc-s">${g.name} grubu ${bkTL(g.target)} hedefini tamamladı. ${bkTL(bkReward(g))} Worldpuan ödülü ${g.share === 'equal' ? 'eşit olarak' : 'katkı oranına göre'} paylaşıldı.</div>
    <div class="sp-card">
      <div class="bk-win-pool">🎁<div><div class="bk-win-pool-a">${bkTL(bkReward(g))} Worldpuan</div><div class="bk-win-pool-s">Toplam ödül havuzu</div></div></div>
      <div class="bk-win-list">${rows.map(m => `
        <div class="bk-win-row ${m.me ? 'me' : ''}">
          <div class="bk-contrib-l">${splAvatar(m.name, 'sm')}<div class="bk-contrib-mid"><b>${bkFirstName(m.name)}${m.me ? ' (Sen)' : ''}</b><span>${g.share === 'contrib' ? bkTL(m.contrib) + ' katkı' : 'eşit pay'}</span></div></div>
          <div class="bk-win-share">+${bkTL(bkShareFor(g, m))}</div>
        </div>`).join('')}</div>
    </div>
    <div class="spl-suc-hint">${I.info} Payına düşen Worldpuan Ödüllerim'e aktarıldı; bir sonraki harcamanda kullanabilirsin.</div>
    <div class="spl-suc-btns">
      <button class="spl-cta ghost" data-action="bk-done">Bitti</button>
      <button class="spl-cta" data-action="bk-to-wallet">Ödüllerime git</button>
    </div>
  </div>`;
}

/* -------------------- Etkileşimler -------------------- */
function bkOpenNew() {
  const d = state.bk;
  d.name = ''; d.target = 30000; d.share = 'equal';
  d.people = ['k8', 'k3', 'k9'].map(bkMkPerson).filter(Boolean);   // Ayşe, Mert, Ece
  go('reward-goal-new');
}
function bkOpenGoal(id) { state.bk.viewId = id; go('reward-goal-track'); }
function bkAddPerson(id) {
  const c = splContact(id); if (!c) return;
  if (!state.bk.people.some(p => p.id === id)) state.bk.people.push({ id: c.id, name: c.name });
  closeSheet();
  render();
}
function bkRemovePerson(id) {
  bkCaptureNewInputs();
  state.bk.people = state.bk.people.filter(p => p.id !== id);
  render();
}
function bkStart() {
  bkCaptureNewInputs();
  const d = state.bk;
  const members = [{ id: 'me', name: 'Selçuk İmre', contrib: 0, me: true }, ...d.people.map(p => ({ id: p.id, name: p.name, contrib: 0 }))];
  const spent = Math.round(d.target * 0.55);
  const n = members.length;
  const base = Math.floor(spent / n);
  members.forEach((m, i) => { m.contrib = base + (i === 0 ? spent - base * n : 0); });
  const g = { id: 'g-' + Date.now(), name: d.name || 'Grup Hedefi', icon: '🎯', target: d.target, spent, daysLeft: 15, rate: BK_RATE, share: d.share, status: 'active', claimed: false, members };
  bkGoals.unshift(g);
  state.bk.viewId = g.id;
  go('reward-goal-track');
}
function bkClaim() {
  const g = bkView();
  g.spent = g.target; g.status = 'done';
  bkAwardOnce(g);
  go('reward-goal-win');
}

/* =========================================================================
   Karekod ile Öde — Ana ekran widget'ı (springboard)
   Telefon ana ekranındaki YK widget'ından tek dokunuşla TR Karekod okut,
   uygulamayı açmadan saniyeler içinde öde. Ürün-tabanlı ödeme akışından
   bağımsız, kendi state'i (state.qr) ile çalışır.
   ========================================================================= */
const QR_MERCHANT = {
  name: 'Koçtaş', branch: 'Bahçeşehir AVM',
  amount: 1249.90, logo: 'assets/koctas.png', emoji: '🛠️',
};
function qrPuan() { return Math.max(1, Math.round(QR_MERCHANT.amount / 100)); }
// Basit ama gerçekçi bir TR Karekod görseli (deterministik desen)
function qrPattern(size) {
  const N = 21, cell = size / N;
  let rects = '';
  const finder = (ox, oy) => {
    rects += `<rect x="${ox*cell}" y="${oy*cell}" width="${7*cell}" height="${7*cell}" fill="#000"/>`;
    rects += `<rect x="${(ox+1)*cell}" y="${(oy+1)*cell}" width="${5*cell}" height="${5*cell}" fill="#fff"/>`;
    rects += `<rect x="${(ox+2)*cell}" y="${(oy+2)*cell}" width="${3*cell}" height="${3*cell}" fill="#000"/>`;
  };
  let seed = 7;
  const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return (seed >> 8) & 1; };
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const inFinder = (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
    if (inFinder) continue;
    if (rnd()) rects += `<rect x="${x*cell}" y="${y*cell}" width="${cell}" height="${cell}" fill="#000"/>`;
  }
  finder(0, 0); finder(14, 0); finder(0, 14);
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><rect width="${size}" height="${size}" fill="#fff"/>${rects}</svg>`;
}
function qrSeed() {
  if (!state.qr.method) state.qr.method = 'worldcard';
  state.qr.merchant = { ...QR_MERCHANT };
}
function qrStart() { qrSeed(); go('qr-scan'); }

/* Telefon ana ekranı (springboard) — duvar kağıdı, YK widget'ı, app ikonları, dock */
function SpringboardScreen() {
  const apps = [
    { e: '📷', n: 'Kamera', bg: 'linear-gradient(135deg,#3a3a3c,#1c1c1e)' },
    { e: '💬', n: 'Mesajlar', bg: 'linear-gradient(135deg,#3bd15f,#22a544)' },
    { e: '📅', n: 'Takvim', bg: 'linear-gradient(135deg,#ffffff,#ececec)' },
    { e: '🗺️', n: 'Haritalar', bg: 'linear-gradient(135deg,#8ee08e,#4fb04f)' },
    { e: '🌤️', n: 'Hava', bg: 'linear-gradient(135deg,#3aa0ff,#1667d6)' },
    { e: '🎵', n: 'Müzik', bg: 'linear-gradient(135deg,#fb5c74,#e0224f)' },
    { e: '📸', n: 'Fotoğraf', bg: 'linear-gradient(135deg,#ffffff,#ececec)' },
    { e: '⚙️', n: 'Ayarlar', bg: 'linear-gradient(135deg,#c9ccd2,#8a8f98)' },
  ];
  return `
  <div class="screen sb-screen anim-fade">
    <div class="sb-wall">
      <div class="sb-clockblock">
        <div class="sb-clock-date">Cuma, 10 Temmuz</div>
        <div class="sb-clock-time">09:41</div>
      </div>

      <div class="sb-widget" data-action="qr-start">
        <div class="sb-w-head">
          <img src="assets/yk-app-icon.jpg" class="sb-w-ico" alt="">
          <div class="sb-w-titles"><div class="sb-w-title">Yapı Kredi</div><div class="sb-w-sub">Worldcard · **** 3333</div></div>
          <span class="sb-w-widgetlbl">Widget</span>
        </div>
        <button class="sb-w-qr" data-action="qr-start">
          <span class="sb-w-qr-ico">${I.qr}</span>
          <span class="sb-w-qr-txt"><b>Karekod ile Öde</b><small>Kasada saniyeler içinde</small></span>
          <span class="sb-w-qr-chev">${I.chevR}</span>
        </button>
        <div class="sb-w-row">
          <button class="sb-w-mini" data-action="launch-app"><span class="sb-w-mini-ico">${I.transfer}</span>Para Gönder</button>
          <button class="sb-w-mini" data-action="launch-app"><span class="sb-w-mini-ico">${I.pie}</span>Hesabım</button>
        </div>
      </div>

      <button class="sb-gallery-link" data-action="open-widgets">${I.grid} Tüm widget çeşitlerini gör ${I.chevR}</button>

      <div class="sb-grid">
        ${apps.map(a => `
          <div class="sb-app">
            <div class="sb-app-ico" style="background:${a.bg}">${a.e}</div>
            <span class="sb-app-lbl">${a.n}</span>
          </div>`).join('')}
        <div class="sb-app" data-action="launch-app">
          <div class="sb-app-ico sb-app-yk"><img src="assets/yk-app-icon.jpg" alt=""></div>
          <span class="sb-app-lbl">Yapı Kredi</span>
        </div>
      </div>

      <div class="sb-dock">
        <div class="sb-app dock"><div class="sb-app-ico" style="background:linear-gradient(135deg,#4a90e2,#1667d6)">🧭</div></div>
        <div class="sb-app dock"><div class="sb-app-ico" style="background:linear-gradient(135deg,#3bd15f,#22a544)">📞</div></div>
        <div class="sb-app dock"><div class="sb-app-ico" style="background:linear-gradient(135deg,#5ac8fa,#0a84ff)">✉️</div></div>
        <div class="sb-app dock" data-action="launch-app"><div class="sb-app-ico sb-app-yk"><img src="assets/yk-app-icon.jpg" alt=""></div></div>
      </div>
      <div class="sb-homebar" data-action="launch-app"></div>
    </div>
  </div>`;
}

/* QR tarayıcı — kamera görünümü, çerçeve + tarama çizgisi; ~1,7 sn sonra otomatik okur */
function QrScanScreen() {
  return `
  <div class="screen qr-scan anim-fade">
    <div class="qr-cam-top">
      <button class="qr-x" data-action="qr-close" aria-label="Kapat">✕</button>
      <div class="qr-cam-title">Karekod ile Öde</div>
      <span class="qr-flash" data-action="toast" data-msg="Flaş prototipte aktif değil">🔦</span>
    </div>
    <div class="qr-view">
      <div class="qr-code-inview">${qrPattern(150)}</div>
      <div class="qr-frame">
        <span class="qc tl"></span><span class="qc tr"></span><span class="qc bl"></span><span class="qc br"></span>
        <div class="qr-laser"></div>
      </div>
      <div class="qr-hint" id="qr-hint">TR Karekod'u çerçeveye getir</div>
    </div>
    <div class="qr-cam-foot">
      <div class="qr-foot-tab active">Karekod Okut</div>
      <div class="qr-foot-tab" data-action="toast" data-msg="Karekodumu Göster prototipte aktif değil">Karekodumu Göster</div>
    </div>
  </div>`;
}
function setupQrScan() {
  clearTimeout(state._qrTimer);
  state._qrTimer = setTimeout(() => {
    if (state.screen !== 'qr-scan') return;
    const frame = document.querySelector('.qr-frame');
    const hint = document.getElementById('qr-hint');
    if (frame) frame.classList.add('locked');
    if (hint) { hint.textContent = '✓ Karekod okundu'; hint.classList.add('ok'); }
    setTimeout(() => { if (state.screen === 'qr-scan') { state.screen = 'qr-pay'; render(); } }, 640);
  }, 1700);
}

/* Okunan karekod → tutar + ödeme yöntemi + Öde */
function QrPayScreen() {
  const m = state.qr.merchant || QR_MERCHANT;
  const wc = state.qr.method === 'worldcard';
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="qr-close">${I.back}</button>
      <div class="nav-title">Karekod ile Öde</div>
    </div>
    <div class="screen-scroll">
      <div class="qr-merchant">
        <div class="qr-m-logo">${imgOrFallback(m.logo, m.emoji, 'qr-m-img')}</div>
        <div class="qr-m-name">${m.name}<span>${m.branch}</span></div>
        <div class="qr-m-tag">${I.check} TR Karekod · World üye iş yeri</div>
      </div>

      <div class="qr-amt-box">
        <div class="qr-amt-lbl">Ödenecek tutar</div>
        <div class="qr-amt">${fmtTL2(m.amount)}</div>
        <div class="qr-amt-sub">İşyeri karekodundan geldi · tutar değiştirilemez</div>
      </div>

      <div class="pay-section-title">Ödeme Yöntemi</div>
      <div class="method ${wc ? 'selected' : ''}" data-action="qr-method" data-method="worldcard">
        <div class="m-ico card-ico">${imgOrFallback(WORLDCARD_IMG, '💳', 'm-cardimg')}</div>
        <div><div class="m-name">Worldcard ile öde</div><div class="m-sub">**** 3333 · Tek çekim · Worldpuan kazan</div></div>
        <div class="m-check">${I.check}</div>
      </div>
      <div class="method ${!wc ? 'selected' : ''}" data-action="qr-method" data-method="bank">
        <div class="m-ico tl-ico"><img src="assets/tl-white.png" class="tl-img" alt="₺" onerror="this.outerHTML='<span class=\\'tl-glyph\\'>₺</span>'"></div>
        <div><div class="m-name">Vadesiz TL Hesabım'dan öde</div><div class="m-sub">Banka kartı · 12345678 · Anında</div></div>
        <div class="m-check">${I.check}</div>
      </div>

      ${wc ? `<div class="qr-puan-hint">${I.star} Bu ödemeden yaklaşık <b>${qrPuan()} Worldpuan</b> kazanacaksın</div>` : ''}
    </div>

    <div class="pay-foot">
      <button class="pay-btn" data-action="qr-pay-open"><span>Öde</span><span class="div"></span><span>${fmtTL2(m.amount)}</span></button>
      <div class="secure-note">${I.lock} FAST · 256-bit güvenli ödeme</div>
    </div>
  </div>`;
}
function qrMethod(m) { state.qr.method = m; render(); }
function openQrConfirm() {
  const m = state.qr.merchant || QR_MERCHANT;
  const methodLbl = state.qr.method === 'bank' ? 'Vadesiz TL Hesabım · Anında' : 'Worldcard **** 3333 · Tek çekim';
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-amount-label">Ödenecek tutar</div>
    <div class="sheet-amount">${fmtTL2(m.amount)}</div>
    <div class="sheet-pay-row"><span>${m.name} · ${m.branch}</span><span class="spr-r">${methodLbl}</span></div>
    <button class="sheet-btn" id="qr-approve-btn" data-action="qr-approve">${I.faceid || I.shield} Yapı Kredi Mobil ile Onayla</button>
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function qrApprove() {
  const btn = document.getElementById('qr-approve-btn');
  if (btn) { btn.innerHTML = `<span class="spinner"></span> Ödeme Onaylanıyor…`; btn.style.pointerEvents = 'none'; }
  const m = state.qr.merchant || QR_MERCHANT;
  state.qr.order = {
    no: 'FAST' + String(Math.floor(100000000 + Math.random() * 900000000)),
    date: new Date(), bank: state.qr.method === 'bank',
  };
  setTimeout(() => { closeSheet(); setTimeout(() => go('qr-success'), 250); }, 1500);
}

/* Karekod ödeme başarılı — Worldpuan + dekont, sonra telefon ana ekranına dön */
function QrSuccessScreen() {
  const m = state.qr.merchant || QR_MERCHANT;
  const o = state.qr.order || { no: 'FAST' + String(Math.floor(100000000 + Math.random() * 900000000)), date: new Date(), bank: false };
  const dateStr = orderDateStr(o.date);
  const earn = o.bank ? 0 : qrPuan();
  return `
  <div class="screen anim-fade">
    <div class="screen-scroll">
      <div class="success">
        <div class="success-check"><div class="ring">${I.checkBig}</div></div>
        <h2>Ödemen Başarıyla Gerçekleşti</h2>
        <div class="succ-date">${dateStr}</div>
        <div class="amt">${fmtTL2(m.amount)}</div>
        <div class="prod">${m.name} · ${m.branch}</div>

        ${earn ? `
        <div class="puan-card">
          <div class="pc-logo"><img src="assets/world.webp" alt="World" onerror="this.outerHTML='🎉'"></div>
          <div>
            <div class="pc-val">+${earn} Worldpuan</div>
            <div class="pc-lbl">hesabına eklendi · Toplam: ${(USER.worldpuan + earn).toLocaleString('tr-TR')} Worldpuan</div>
          </div>
        </div>` : ''}

        <div class="receipt">
          <div class="r-row"><span class="r-l">İşlem No</span><span class="r-r">${o.no}</span></div>
          <div class="r-row"><span class="r-l">İş Yeri</span><span class="r-r">${m.name} · TR Karekod</span></div>
          <div class="r-row"><span class="r-l">Ödeme Yöntemi</span><span class="r-r">${o.bank ? 'Vadesiz TL Hesabım · 12345678' : 'Worldcard **** 3333'}</span></div>
          <div class="r-row"><span class="r-l">Kanal</span><span class="r-r">Ana ekran widget'ı · FAST</span></div>
          <div class="r-row"><span class="r-l">Tutar</span><span class="r-r">${fmtTL2(m.amount)}</span></div>
        </div>

        <div class="success-actions">
          <button class="btn-outline" data-action="qr-home">Ana Ekrana Dön</button>
        </div>
      </div>
    </div>
  </div>`;
}
function qrHome() { state.nav = []; state.qr.order = null; closeDrawer(); state.screen = 'springboard'; render(); }

/* =========================================================================
   Widget Galerisi — tüm YK widget çeşitleri tek bir ana-ekran yüzeyinde
   Hem İşCep tarzı (koyu kart + logo + aksiyon tile'ları) hem N26 tarzı
   (renkli, görsel, tek amaçlı) çeşitler. Kaydırarak hepsini gör, seç.
   Karekodlu widget'lar QR ödeme akışını başlatır.
   ========================================================================= */
const WG_APPICON = 'assets/yk-app-icon.jpg';
function wgLogo() { return `<img src="${WG_APPICON}" class="wgt-ico" alt="">`; }
// Köşe YK amblemi — gerçek Yapı Kredi app ikonu (küçük rozet)
function wgMark() { return `<img src="${WG_APPICON}" class="wgt-mark-ico" alt="Yapı Kredi">`; }
function wgDot(n, a) { return `<div class="wg-dots">${Array.from({length:n}).map((_,i)=>`<span class="${i===a?'on':''}"></span>`).join('')}</div>`; }
function wgCap(t, s) { return `<div class="wg-cap"><b>${t}</b><span>${s}</span></div>`; }

function WidgetGalleryScreen() {
  return `
  <div class="screen wg-screen anim-fade">
    <div class="wg-wall">
      <div class="wg-scroll">
        <!-- Karekod (orta) -->
        <div class="wg-item">
          <div class="wgt iscep wgt-md">
            <div class="wgt-head">${wgLogo()}<span class="wgt-title">Karekod</span><span class="wgt-dots"><i></i><i></i><i></i></span></div>
            <button class="wgt-tile accent" data-action="qr-start"><span class="wgt-tile-ico">${I.qr}</span>Karekod ile Öde</button>
            <button class="wgt-tile" data-action="launch-app"><span class="wgt-tile-ico">${I.transfer}</span>Karekod ile Para Gönder / İste</button>
          </div>
          ${wgCap('Karekod', 'Orta boy')}
        </div>

        <!-- Kısayollarım (büyük, 4 ikon) -->
        <div class="wg-item">
          <div class="wgt iscep wgt-lg">
            <div class="wgt-head">${wgLogo()}<span class="wgt-title">Kısayollarım</span><span class="wgt-dots"><i></i><i></i><i></i></span></div>
            <div class="wgt-icontiles">
              <button class="wgt-icontile" data-action="qr-start"><span class="wgt-it-ico accent">${I.qr}</span><span>Karekod ile Öde</span></button>
              <button class="wgt-icontile" data-action="launch-app"><span class="wgt-it-ico">${I.transfer}</span><span>Para Gönder</span></button>
              <button class="wgt-icontile" data-action="launch-app"><span class="wgt-it-ico">${I.wallet || I.card}</span><span>Para İste</span></button>
              <button class="wgt-icontile" data-action="launch-app"><span class="wgt-it-ico">${I.pie}</span><span>Hesabım</span></button>
            </div>
          </div>
          ${wgCap('Kısayollarım', 'Büyük')}
        </div>

        <!-- Karekod ile Öde aksiyon kartı (orta) -->
        <div class="wg-item">
          <div class="wgt n26 wgt-md wgt-qrpay row" data-action="qr-start">
            <span class="wgt-dots wgt-dots-tr"><i></i><i></i><i></i></span>
            <div class="wgt-qrpay-scan"><span class="wgt-scan-ico lg">${I.qrScan}</span></div>
            <div class="wgt-qrpay-txt">
              <span class="wgt-brand"><img src="${WG_APPICON}" class="wgt-brand-ico" alt="">Yapı Kredi</span>
              <div class="wgt-qrpay-t">Karekod ile Öde</div>
            </div>
          </div>
          ${wgCap('Karekod ile Öde', 'Orta boy')}
        </div>

        <!-- Döviz & Altın (orta) — kişisel veri yok, piyasa görünümü -->
        <div class="wg-item">
          <div class="wgt n26 wgt-md wgt-rates" data-action="launch-app">
            <div class="wgt-head">${wgLogo()}<span class="wgt-title">Döviz & Altın</span><span class="wgt-dots"><i></i><i></i><i></i></span></div>
            <div class="wgt-rate"><span class="wgt-rate-ico">$</span><span class="wgt-rate-k">Dolar</span><span class="wgt-rate-v">40,2140</span><span class="wgt-rate-c up">${I.trendUp} %0,3</span></div>
            <div class="wgt-rate"><span class="wgt-rate-ico">€</span><span class="wgt-rate-k">Euro</span><span class="wgt-rate-v">43,5580</span><span class="wgt-rate-c up">${I.trendUp} %0,2</span></div>
            <div class="wgt-rate"><span class="wgt-rate-ico gold">XAU</span><span class="wgt-rate-k">Gram Altın</span><span class="wgt-rate-v">6.850,00</span><span class="wgt-rate-c down">${I.trendUp} %0,4</span></div>
          </div>
          ${wgCap('Döviz & Altın', 'Orta boy')}
        </div>

        <!-- Kartsız ATM / QR ile Para Çek (orta) — aksiyon, kişisel veri yok -->
        <div class="wg-item">
          <div class="wgt n26 wgt-md wgt-atm" data-action="launch-app">
            <span class="wgt-dots wgt-dots-tr"><i></i><i></i><i></i></span>
            <div class="wgt-atm-ico">${I.cashout}</div>
            <div class="wgt-atm-txt">
              <span class="wgt-brand"><img src="${WG_APPICON}" class="wgt-brand-ico" alt="">Yapı Kredi</span>
              <div class="wgt-qrpay-t">QR ile Para Çek</div>
              <div class="wgt-atm-sub">Kartsız — ATM'de karekod okut</div>
            </div>
          </div>
          ${wgCap('Kartsız ATM', 'Orta boy')}
        </div>

        <!-- Küçük ikili sıra: Worldpuan + Karekod -->
        <div class="wg-row2">
          <div class="wg-item">
            <div class="wgt n26 wgt-sm wgt-puan" data-action="launch-app">
              <div class="wgt-sm-top"><span>Worldpuan</span>${wgMark()}</div>
              <div class="wgt-sm-mid">
                <div class="wgt-sm-lbl">Puan bakiyem</div>
                <div class="wgt-sm-amt">${USER.worldpuan.toLocaleString('tr-TR')}</div>
              </div>
            </div>
            ${wgCap('Worldpuan', 'Küçük')}
          </div>
          <div class="wg-item">
            <div class="wgt n26 wgt-sm wgt-qrsmall" data-action="qr-start">
              <span class="wgt-sm-mark">${wgMark()}</span>
              <div class="wgt-scan-ico sm">${I.qrScan}</div>
              <div class="wgt-qrsmall-lbl">Karekod<br>ile Öde</div>
            </div>
            ${wgCap('Karekod', 'Küçük')}
          </div>
        </div>

      </div>
    </div>
  </div>`;
}

/* ===================================================================
   BİRİKİM (birleşik) — tek özellik: 4 birikim tipi × 3 başvuru tipi.
   Hub'ta "ne biriktireyim" (dest) + "nasıl" (fund) seçilir → tek uyarlanabilir
   başvuru akışı → plan. Aktif planlar ana ekran hub'ında listelenir.
   =================================================================== */

// Başvuru tipleri (nasıl fonlanır) — mevcut motorların logolarını paylaşır
const SV_FUND = {
  roundup:   { id:'roundup',   name:'Harcama Yuvarla',              short:'Harcama', logo: ruLogo,  tag:'Her harcamada',
    desc:'Her harcamanı belirlediğin tutara yuvarla' },
  statement: { id:'statement', name:'Ekstre Yuvarla',              short:'Ekstre',  logo: suLogo,  tag:'Her dönem',
    desc:'Ekstrenin belirlediğin %\'si ayrılsın' },
  salary:    { id:'salary',    name:'Maaşımdan Transfer Et',       short:'Maaş',    logo: salLogo, tag:'Her maaş günü',
    desc:'Maaşından her ay otomatik ayrılsın' },
  mandate:   { id:'mandate',   name:'Talimatıma Göre Transfer Et', short:'Talimat', logo: mbLogo,  tag:'Her ay',
    desc:'Her ay sabit tutar ayrılsın' },
};
const SV_FUND_ORDER = ['roundup', 'statement', 'salary', 'mandate'];
// Hub'da "Transfer Et" tek satır; seçilince altında Maaşımdan / Talimatıma göre alt-seçimi çıkar
const SV_TRANSFER = { name: 'Transfer Et', short: 'Transfer', logo: salLogo, desc: 'Maaşından ya da talimatınla düzenli aktar' };
function isTransfer(f) { return f === 'salary' || f === 'mandate'; }
const MAAS = 45000;                       // mock net aylık maaş (maaştan transfer hesaplaması)
const SAL_PCT_PRESETS = [5, 10, 15, 20];  // maaş oranı çipleri
// Maaştan transfer yöntemi logosu — banknot + ₺ (özellik logosu ailesiyle uyumlu)
function salLogo(size) {
  return `<svg class="ru-logo-svg" width="${size}" height="${size}" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <rect x="7" y="14" width="34" height="20" rx="4" fill="currentColor" opacity="0.16"/>
    <rect x="7" y="14" width="34" height="20" rx="4" stroke="currentColor" stroke-width="2.6"/>
    <circle cx="24" cy="24" r="6.3" fill="currentColor"/>
    <text x="24" y="27.9" text-anchor="middle" font-size="9.5" font-weight="800" fill="#fff" font-family="Ubuntu, system-ui, sans-serif">₺</text>
    <path d="M12 20h2.6M33.4 28H36" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
  </svg>`;
}

// Birikim tipleri (ne biriktirilir) — accent: CSS renk sınıfı
const SV_DEST = {
  account:  { id:'account',  name:'Sınırsız Hesap', short:'Hesap', icon: I.bank,      accent:'acct',
    desc:'Günlük getirili TL hesabı' },
  metal:    { id:'metal',    name:'Kıymetli Maden', short:'Maden', icon: I.ingot,     accent:'metal',
    desc:'Altın, gümüş, platin, paladyum' },
  fund:     { id:'fund',     name:'Fon',            short:'Fon',   icon: I.invest,    accent:'fund',
    desc:'Yatırım fonu paylarına yatırılır' },
  donation: { id:'donation', name:'Bağış',          short:'Bağış', icon: I.handHeart, accent:'don',
    desc:'Seçtiğin kuruma düzenli bağış' },
};
const SV_DEST_ORDER = ['account', 'metal', 'fund', 'donation'];

// Yatırım fonları (dest=fund) — mock oran/risk + dönem getirisi (maliyet ortalamasına oranla)
const SV_FUNDS = {
  para:  { id:'para',  name:'Para Piyasası Fonu', code:'YKP', risk:'Düşük risk',  ret:'%42', gain:0.06 },
  altin: { id:'altin', name:'Altın Fonu',         code:'YAF', risk:'Orta risk',   ret:'%55', gain:0.11 },
  hisse: { id:'hisse', name:'Hisse Senedi Fonu',  code:'YHS', risk:'Yüksek risk', ret:'%68', gain:0.14 },
};
const SV_FUNDS_ORDER = ['para', 'altin', 'hisse'];

// Bağış kurumları (dest=donation)
const SV_CAUSES = {
  egitim: { id:'egitim', name:'Eğitime Destek', org:'Darüşşafaka Cemiyeti', emoji:'📚' },
  orman:  { id:'orman',  name:'Geleceğe Nefes', org:'TEMA Vakfı',           emoji:'🌳' },
  gida:   { id:'gida',   name:'Gıda Bankası',   org:'TİDER',                emoji:'🍞' },
  hayvan: { id:'hayvan', name:'Pati Dostları',  org:'HAYTAP',               emoji:'🐾' },
};
const SV_CAUSE_ORDER = ['egitim', 'orman', 'gida', 'hayvan'];

// Dönem etiketleri (mock geçmiş 5 ay) — maden serisiyle hizalı
const SV_MONTHS = MB_SEED_MONTHS;   // ['Aralık 2025' ... 'Nisan 2026']
const SV_SHORT  = ['Ara', 'Oca', 'Şub', 'Mar', 'Nis'];
const SV_DATES  = MB_SEED_DATES;
const SV_CUR    = MB_CUR_MONTH;     // 'Mayıs 2026'
const SV_VAR    = [0.9, 1.12, 0.85, 1.05, 1.0];   // aylık dalgalanma (harcama/hesap hissi)

/* ---- taslak/plan yardımcıları ---- */
function svCard(id) { return RU_CARDS.find(x => x.id === (id || state.sv.card)) || null; }
function svAcct(id) { return RU_ACCOUNTS.find(a => a.id === (id || state.sv.account)) || null; }
function svPlan() { return state.sv.plans.find(p => p.id === state.sv.view) || state.sv.plans[0] || null; }
function mbBadgeCode(code) { return `<span class="mb-badge">${code}</span>`; }
function svFmtMetal(g, code) { return g.toLocaleString('tr-TR', { maximumFractionDigits: 2 }) + ' ' + code; }

// Bir konfigürasyonun aylık TL katkısı (tahmini)
function svMonthlyTL(cfg) {
  if (cfg.fund === 'roundup')   return 250;
  if (cfg.fund === 'statement') return Math.round(suAmount(SU_STATEMENT, cfg.rate, cfg.cap));
  if (cfg.fund === 'salary')    return Math.round(MAAS * cfg.salaryPct / 100);
  if (cfg.dest === 'metal' && cfg.unit === 'gram') return Math.round(cfg.gram * MB_METALS[cfg.metalKind].price);
  return cfg.tryAmt;
}

// Aktifleştirmede planın mock geçmişini dondur (ekranlar bunu okur)
function svSeedPlan(cfg) {
  const p = { id: 'sv' + Date.now() + Math.floor(Math.random() * 1000), ...cfg, txns: [] };
  const mcTL = svMonthlyTL(cfg);
  if (cfg.dest === 'metal') {
    MB_METALS[cfg.metalKind].series.forEach((price, i) => {
      const tl = (cfg.fund === 'mandate' && cfg.unit === 'gram') ? Math.round(cfg.gram * price) : Math.round(mcTL * SV_VAR[i]);
      p.txns.push({ month: SV_MONTHS[i], short: SV_SHORT[i], date: SV_DATES[i], tl, gram: tl / price, price });
    });
  } else {
    for (let i = 0; i < 5; i++) p.txns.push({ month: SV_MONTHS[i], short: SV_SHORT[i], date: SV_DATES[i], tl: Math.round(mcTL * SV_VAR[i]) });
  }
  p.txns.reverse();   // en yeni başta
  p.monthChange = cfg.dest === 'metal' ? MB_METALS[cfg.metalKind].change
                : cfg.dest === 'fund'  ? Math.round(SV_FUNDS[cfg.fundKind].gain * 100)
                : 8;
  return p;
}

/* ---- plan hesap getter'ları ---- */
function svPrincipal(p) { return p.txns.reduce((s, t) => s + t.tl, 0); }
function svGrams(p) { return p.txns.reduce((s, t) => s + (t.gram || 0), 0); }
function svMetalM(p) { return MB_METALS[p.metalKind]; }
function svMetalValue(p) { return svGrams(p) * svMetalM(p).price; }
function svFundP(p) { return SV_FUNDS[p.fundKind]; }
function svFundValue(p) { return Math.round(svPrincipal(p) * (1 + svFundP(p).gain)); }
function svAcctInterest(p) { return Math.round(svPrincipal(p) * 0.032 * 100) / 100; }
function svAcctTotal(p) { return svPrincipal(p) + svAcctInterest(p); }
function svCauseC(p) { return SV_CAUSES[p.cause]; }
// Ana ekran/kart birincil gösterimi (birikim tipine göre)
function svPrimary(p) {
  if (p.dest === 'metal')    return svFmtMetal(svGrams(p), svMetalM(p).code);
  if (p.dest === 'fund')     return fmtTL(svFundValue(p));
  if (p.dest === 'donation') return fmtTL(svPrincipal(p));
  return fmtTL2(svAcctTotal(p));
}

/* =================== HUB — iki seçici =================== */
function BirikimHub() {
  const s = state.sv;
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Birikim</div>
      <button class="icon-btn" data-action="toast" data-msg="Bilgilendirme prototipte aktif değil">${I.info}</button>
    </div>
    <div class="screen-scroll ru-form sv-hub">
      <div class="ru-hero sv-hero-tight">
        <div class="ru-hero-logo ru-logo">${ruLogo(42)}</div>
        <h1 class="ru-hero-title">Hesabının birikim planını oluştur</h1>
        <p class="ru-hero-sub">Birikim türünü ve yöntemini seç.</p>
      </div>

      <div class="ru-sec sv-sec-tight">
        <div class="ru-sec-h"><span class="ru-sec-n">1</span> Birikimlerin nasıl değerlensin?</div>
        <div class="sv-fund-list">
          ${SV_DEST_ORDER.map(k => { const x = SV_DEST[k], on = s.dest === k;
            return `<button class="sv-fund ${on ? 'on' : ''}" data-action="sv-set-dest" data-val="${k}">
              <span class="sv-fund-logo">${x.icon}</span>
              <span class="sv-fund-mid"><span class="sv-fund-t">${x.name}</span><span class="sv-fund-s">${x.desc}</span></span>
              <span class="sv-fund-tick">${I.check}</span>
            </button>`; }).join('')}
        </div>
      </div>

      <div class="ru-sec sv-sec-tight">
        <div class="ru-sec-h"><span class="ru-sec-n">2</span> Birikim Yöntemi</div>
        <div class="sv-fund-list">
          ${['roundup', 'statement'].map(k => { const x = SV_FUND[k], on = s.fund === k;
            return `<button class="sv-fund ${on ? 'on' : ''}" data-action="sv-set-fund" data-val="${k}">
              <span class="sv-fund-logo">${x.logo(22)}</span>
              <span class="sv-fund-mid"><span class="sv-fund-t">${x.name}</span><span class="sv-fund-s">${x.desc}</span></span>
              <span class="sv-fund-tick">${I.check}</span>
            </button>`; }).join('')}
          <button class="sv-fund ${isTransfer(s.fund) ? 'on' : ''}" data-action="sv-set-fund" data-val="transfer">
            <span class="sv-fund-logo">${SV_TRANSFER.logo(22)}</span>
            <span class="sv-fund-mid"><span class="sv-fund-t">${SV_TRANSFER.name}</span><span class="sv-fund-s">${SV_TRANSFER.desc}</span></span>
            <span class="sv-fund-tick">${I.check}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="screen-cta">
      <button class="btn-primary" data-action="sv-apply">Devam</button>
      <div class="ru-ssl">${I.lock} Talimatların 256 bit SSL ile korunur.</div>
    </div>
  </div>`;
}

/* =================== BAŞVURU — uyarlanabilir =================== */
function svApplyTitle() {
  const dl = SV_DEST[state.sv.dest].name.toLowerCase();
  return { roundup: `Harcadıkça ${dl} biriktir.`, statement: `Ekstrenle ${dl} biriktir.`, salary: `Maaşından ${dl} biriktir.`, mandate: `Her ay düzenli ${dl} biriktir.` }[state.sv.fund];
}
function svApplySub() {
  const s = state.sv;
  const destTxt = { account: 'birikim hesabında toplanır', metal: 'seçtiğin değerli madene dönüşür', fund: 'seçtiğin yatırım fonuna yatırılır', donation: 'seçtiğin kuruma bağışlanır' }[s.dest];
  const fundTxt = { roundup: `Seçtiğin kartla her harcaman sonraki ${RU_UNIT} TL'ye tamamlanır; aradaki fark`, statement: `Kredi kartı ekstrenin belirlediğin %'si her kesim döneminde`, salary: `Maaşının belirlediğin %'si maaş gününde`, mandate: `Belirlediğin tutar her ay kartından çekilip` }[s.fund];
  return `${fundTxt} ${destTxt}.`;
}
function svFundSecTitle() { return { roundup: 'Yuvarlama Kuralı', statement: 'Ekstre Kuralı', salary: 'Transfer Kuralı', mandate: 'Transfer Kuralı' }[state.sv.fund]; }
// Fon kaynağı etiketi (başvuru kaynağı) — maaşta hesap, ekstrede kredi kartı
function svSourceLabel() { return { salary: 'Maaş Hesabı', statement: 'Kredi Kartı' }[state.sv.fund] || 'Kart'; }
function svDestSecTitle() { return { account: 'Birikim Hesabı', metal: 'Maden Seçimi', fund: 'Fon Seçimi', donation: 'Bağış Kurumu' }[state.sv.dest]; }

function BirikimApply() {
  const s = state.sv, d = SV_DEST[s.dest], f = SV_FUND[s.fund];
  const c = svCard();
  const ready = s.card && s.agreed;
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">${d.name}'e Başvur</div>
      <button class="icon-btn" data-action="toast" data-msg="Bilgilendirme prototipte aktif değil">${I.info}</button>
    </div>
    <div class="screen-scroll ru-form">
      <div class="ru-hero">
        <div class="ru-hero-logo ru-logo">${f.logo(52)}</div>
        <h1 class="ru-hero-title">${svApplyTitle()}</h1>
        <p class="ru-hero-sub">${svApplySub()}</p>
      </div>

      <div class="ru-sec">
        <div class="ru-sec-h"><span class="ru-sec-n">1</span> ${svSourceLabel()} Seçimi</div>
        <div class="ru-select-field ${c ? 'filled' : 'empty'}" data-action="sv-open-cardpick">
          ${c
            ? `${ruCardArt(c)}<div class="ru-sf-mid"><div class="ru-sf-name">${c.name}</div><div class="ru-sf-sub">${c.num}</div></div><span class="ru-sf-tick">${I.check}</span>`
            : `<span class="ru-sf-ico">${s.fund === 'salary' ? I.bank : I.card}</span><span class="ru-sf-label">${s.fund === 'statement' ? 'Kredi kartı seçiniz' : s.fund === 'salary' ? 'Maaş hesabı seçiniz' : 'Banka veya kredi kartı seçiniz'}</span>`}
          <span class="ru-sf-chev">${I.chevR}</span>
        </div>
      </div>

      <div class="ru-sec">
        <div class="ru-sec-h"><span class="ru-sec-n">2</span> ${svFundSecTitle()}</div>
        ${svFundConfigHTML()}
      </div>

      <div class="ru-sec">
        <div class="ru-sec-h"><span class="ru-sec-n">3</span> ${svDestSecTitle()}</div>
        ${svDestConfigHTML()}
      </div>

      <div class="ru-sec">
        <label class="contract-row ru-agree ${s.agreed ? 'on' : ''}" data-action="sv-agree">
          <span class="cbx">${I.check}</span>
          <span class="contract-txt"><a data-action="sv-open-form">${d.name} Talimat Formu</a>'nu okudum, onaylıyorum.</span>
        </label>
      </div>
    </div>
    <div class="screen-cta">
      <button class="btn-primary ${ready ? '' : 'disabled'}" id="sv-activate-btn" data-action="sv-activate">Aktifleştir</button>
      <div class="ru-ssl">${I.lock} Bilgilerin 256 bit SSL ile korunmaktadır.</div>
    </div>
  </div>`;
}

/* -- fon (başvuru) kural bölümleri -- */
function svFundConfigHTML() {
  if (state.sv.fund === 'roundup')   return ruRuleBoxHTML();   // saf/sabit — yeniden kullanım
  if (state.sv.fund === 'statement') return svStatementRuleHTML();
  // Transfer (salary | mandate) — üstte alt-seçim segmenti, altında ilgili kural
  return svTransferSeg() + (state.sv.fund === 'salary' ? svSalaryRuleHTML() : svMandateRuleHTML());
}
function svTransferSeg() {
  return `<div class="sv-subseg apply">
    <button class="sv-subseg-b ${state.sv.fund === 'salary' ? 'on' : ''}" data-action="sv-set-fund" data-val="salary">Maaşımdan</button>
    <button class="sv-subseg-b ${state.sv.fund === 'mandate' ? 'on' : ''}" data-action="sv-set-fund" data-val="mandate">Talimatıma göre</button>
  </div>`;
}
function svSalaryChips() {
  return `<div class="su-chips">${SAL_PCT_PRESETS.map(r => `<button class="su-chip ${state.sv.salaryPct === r ? 'on' : ''}" data-action="sv-salpct" data-val="${r}">%${r}</button>`).join('')}</div>`;
}
function svSalaryExampleHTML() {
  const amt = Math.round(MAAS * state.sv.salaryPct / 100);
  return `<div class="su-ex-card"><div class="su-ex-main"><span>Tahmini aylık birikim</span><b class="su-ex-amt">+${amt.toLocaleString('tr-TR')} TL</b></div>
    <div class="su-ex-note">Maaşının %${state.sv.salaryPct}'i · ~${MAAS.toLocaleString('tr-TR')} TL net maaş üzerinden.</div></div>`;
}
function svSalaryRuleHTML() {
  return `<div class="su-field"><div class="su-field-l">Maaşının ne kadarı ayrılsın?</div>${svSalaryChips()}</div>
    <div id="sv-ex-slot">${svSalaryExampleHTML()}</div>
    <div class="ru-rule-note">${I.info} Maaşın hesabına geçtiği gün belirlediğin oran otomatik olarak birikime aktarılır.</div>`;
}
function svRateChips() {
  return `<div class="su-chips">${SU_RATE_PRESETS.map(r => `<button class="su-chip ${state.sv.rate === r ? 'on' : ''}" data-action="sv-rate" data-val="${r}">%${r}</button>`).join('')}</div>`;
}
function svExampleHTML() {
  const s = state.sv, raw = suRaw(SU_STATEMENT, s.rate), amt = suAmount(SU_STATEMENT, s.rate, s.cap);
  const capped = s.cap != null && raw > s.cap;
  return `<div class="su-ex-card"><div class="su-ex-main"><span>Tahmini aylık birikim</span><b class="su-ex-amt">+${Math.round(amt).toLocaleString('tr-TR')} TL</b></div>
    ${capped
      ? `<div class="su-ex-note">%${s.rate} × ~${SU_STATEMENT.toLocaleString('tr-TR')} TL ekstre = ${Math.round(raw).toLocaleString('tr-TR')} TL, üst limit <b>${s.cap.toLocaleString('tr-TR')} TL</b>.</div>`
      : `<div class="su-ex-note">Ekstrenin %${s.rate}'i · ~${SU_STATEMENT.toLocaleString('tr-TR')} TL tahmini ekstre üzerinden.</div>`}</div>`;
}
function svStatementRuleHTML() {
  const s = state.sv;
  return `<div class="su-field"><div class="su-field-l">Ekstrenin ne kadarı biriksin?</div>${svRateChips()}</div>
    <div class="su-field"><div class="su-field-l">Aylık üst limit</div>
      <div class="su-cap-input"><input id="sv-cap-input" type="text" inputmode="numeric" value="${s.cap != null ? s.cap : ''}" placeholder="Sınırsız" autocomplete="off"><span class="su-cap-suf">TL / ay</span></div>
      <div class="su-cap-hint">Boş bırakırsan ekstrenin tamamına oran uygulanır.</div></div>
    <div id="sv-ex-slot">${svExampleHTML()}</div>
    <div class="ru-rule-note">${I.info} Aktarım kartının <b>son ödeme tarihinde</b> gerçekleşir. En az 100 TL ekstre şartı vardır.</div>`;
}
function svMandateRuleHTML() {
  const s = state.sv;
  if (s.dest === 'metal') {
    const m = MB_METALS[s.metalKind];
    return `<div class="mb-amount-row">
      <div class="mb-seg">
        <button class="mb-seg-b ${s.unit === 'try' ? 'on' : ''}" data-action="sv-unit" data-val="try">TL</button>
        <button class="mb-seg-b ${s.unit === 'gram' ? 'on' : ''}" data-action="sv-unit" data-val="gram">Gram</button>
      </div>
      <div class="mb-amount">
        <input id="sv-amt-input" type="text" inputmode="${s.unit === 'try' ? 'numeric' : 'decimal'}" value="${s.unit === 'try' ? s.tryAmt.toLocaleString('tr-TR') : s.gram.toLocaleString('tr-TR', { maximumFractionDigits: 2 })}" placeholder="${s.unit === 'try' ? '1.000' : '0,5'}" autocomplete="off">
        <span class="mb-amount-unit">${s.unit === 'try' ? 'TL' : m.code}<i>/ ay</i></span>
      </div></div>
      <div class="ru-lock-note">${I.lock} Bu tutar her ay kartından çekilir; alınacak ${m.name.toLowerCase()} (${m.code}) miktarı işlem anındaki gram fiyatına göre belirlenir.</div>`;
  }
  const note = { account: 'birikim hesabına aktarılır', fund: 'seçtiğin fona yatırılır', donation: 'seçtiğin kuruma bağışlanır' }[s.dest];
  return `<div class="mb-amount-row"><div class="mb-amount">
      <input id="sv-amt-input" type="text" inputmode="numeric" value="${s.tryAmt.toLocaleString('tr-TR')}" placeholder="1.000" autocomplete="off">
      <span class="mb-amount-unit">TL<i>/ ay</i></span>
    </div></div>
    <div class="ru-lock-note">${I.lock} Bu tutar her ay kartından çekilip ${note}.</div>`;
}

/* -- hedef (birikim tipi) seçim bölümleri -- */
function svDestConfigHTML() {
  const s = state.sv;
  if (s.dest === 'account') {
    const a = svAcct();
    return `<div class="ru-select-field ${a ? 'filled' : 'empty'}" data-action="sv-open-acctpick">
      ${a ? `<span class="ru-sf-ico">${I.bank}</span><div class="ru-sf-mid"><div class="ru-sf-name">${a.name}</div><div class="ru-sf-sub">${a.iban} · ${a.detail}</div></div><span class="ru-sf-tick">${I.check}</span>`
          : `<span class="ru-sf-ico">${I.bank}</span><span class="ru-sf-label">Birikim hesabı seçiniz</span>`}
      <span class="ru-sf-chev">${I.chevR}</span></div>
      <div class="ru-lock-note">${I.lock} Birikimlerin günlük getirili hesapta güvenle birikir.</div>`;
  }
  if (s.dest === 'metal') {
    const m = MB_METALS[s.metalKind];
    return `<div class="ru-select-field filled" data-action="sv-open-metalpick">
      <span class="mb-badge">${m.code}</span>
      <div class="ru-sf-mid"><div class="ru-sf-name">${m.name}</div><div class="ru-sf-sub">Anlık gram fiyatı</div></div>
      <div class="mb-price"><b>${mbPriceStr(m.price)}</b><i>/gram</i></div>
      <span class="ru-sf-chev">${I.chevR}</span></div>`;
  }
  if (s.dest === 'fund') {
    const fp = SV_FUNDS[s.fundKind];
    return `<div class="ru-select-field filled" data-action="sv-open-fundpick">
      <span class="mb-badge">${fp.code}</span>
      <div class="ru-sf-mid"><div class="ru-sf-name">${fp.name}</div><div class="ru-sf-sub">${fp.risk} · son 1 yıl ${fp.ret}</div></div>
      <span class="ru-sf-chev">${I.chevR}</span></div>
      <div class="ru-lock-note">${I.info} Geçmiş getiri gelecek getirinin garantisi değildir.</div>`;
  }
  const cz = SV_CAUSES[s.cause];
  return `<div class="ru-select-field filled" data-action="sv-open-causepick">
    <span class="sv-cause-emoji">${cz.emoji}</span>
    <div class="ru-sf-mid"><div class="ru-sf-name">${cz.name}</div><div class="ru-sf-sub">${cz.org}</div></div>
    <span class="ru-sf-chev">${I.chevR}</span></div>
    <div class="ru-lock-note">${I.heart} Bağışların doğrudan kuruma iletilir; makbuz e-postana gelir.</div>`;
}
function setupBirikimApply() {
  const cap = document.getElementById('sv-cap-input');
  if (cap) cap.addEventListener('input', () => {
    const d = cap.value.replace(/[^\d]/g, ''); if (d !== cap.value) cap.value = d;
    state.sv.cap = d ? parseInt(d, 10) : null;
    const slot = document.getElementById('sv-ex-slot'); if (slot) slot.innerHTML = svExampleHTML();
  });
  const amt = document.getElementById('sv-amt-input');
  if (amt) amt.addEventListener('input', () => {
    if (state.sv.dest === 'metal' && state.sv.unit === 'gram') {
      const v = amt.value.replace(/[^\d.,]/g, ''); if (v !== amt.value) amt.value = v;
      const n = parseFloat(v.replace(',', '.')); state.sv.gram = isNaN(n) || n <= 0 ? 0.1 : n;
    } else {
      const d = amt.value.replace(/[^\d]/g, ''); if (d !== amt.value) amt.value = d;
      state.sv.tryAmt = d ? parseInt(d, 10) : 0;
    }
  });
}

/* -- aktifleştirme -- */
function svToggleAgree(el) {
  state.sv.agreed = !state.sv.agreed;
  el.classList.toggle('on', state.sv.agreed);
  const btn = document.getElementById('sv-activate-btn');
  if (btn) btn.classList.toggle('disabled', !(state.sv.card && state.sv.agreed));
}
function svRuleLabel() {
  const s = state.sv;
  if (s.fund === 'roundup')   return `Sonraki ${RU_UNIT} TL'ye yuvarla`;
  if (s.fund === 'statement') return `Ekstrenin %${s.rate}'i${s.cap ? ` (en çok ${s.cap.toLocaleString('tr-TR')} TL)` : ''}`;
  if (s.fund === 'salary')    return `Maaşının %${s.salaryPct}'i`;
  return (s.dest === 'metal' && s.unit === 'gram') ? `${s.gram.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ${MB_METALS[s.metalKind].code}/ay` : `${s.tryAmt.toLocaleString('tr-TR')} TL/ay`;
}
function svDestDetailLabel() {
  const s = state.sv;
  if (s.dest === 'metal')    return ' · ' + MB_METALS[s.metalKind].name;
  if (s.dest === 'fund')     return ' · ' + SV_FUNDS[s.fundKind].name;
  if (s.dest === 'donation') return ' · ' + SV_CAUSES[s.cause].name;
  return ' · ' + (svAcct() ? svAcct().name : 'Birikim Hesabı');
}
function svActivate() {
  if (!state.sv.card)  return toast('Önce bir kart seçmelisin');
  if (!state.sv.agreed) return toast('Talimat Formu onayı gerekli');
  const s = state.sv, d = SV_DEST[s.dest], f = SV_FUND[s.fund], c = svCard();
  sheetEl.innerHTML = `<div class="sheet-handle"></div>
    <div class="ru-pick-t">Talimatı Onayla</div>
    <div class="ru-cf-rows">
      <div class="ru-cf-row"><span>Ne biriktiriyorum</span><b>${d.name}${svDestDetailLabel()}</b></div>
      <div class="ru-cf-row"><span>Nasıl</span><b>${f.name}</b></div>
      <div class="ru-cf-row"><span>Kural</span><b>${svRuleLabel()}</b></div>
      <div class="ru-cf-row"><span>${svSourceLabel()}</span><b>${c.name} ${c.num.slice(-4)}</b></div>
      <div class="ru-cf-row"><span>Tahmini aylık</span><b class="est">~${svMonthlyTL(s).toLocaleString('tr-TR')} TL</b></div>
    </div>
    <button class="sheet-btn" id="sv-confirm-btn" data-action="sv-confirm">${I.shield} Onayla ve Aktifleştir</button>
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open'); sheetScrimEl.classList.add('open');
}
function svConfirm() {
  const btn = document.getElementById('sv-confirm-btn');
  btn.innerHTML = `<span class="spinner"></span> Talimat oluşturuluyor…`;
  btn.style.pointerEvents = 'none';
  setTimeout(() => {
    const s = state.sv;
    const cfg = { dest: s.dest, fund: s.fund, card: s.card, account: s.account, metalKind: s.metalKind, fundKind: s.fundKind, cause: s.cause, unit: s.dest === 'metal' ? s.unit : 'try', tryAmt: s.tryAmt, gram: s.gram, rate: s.rate, cap: s.cap, salaryPct: s.salaryPct };
    const plan = svSeedPlan(cfg);
    state.sv.plans.unshift(plan);
    state.sv.view = plan.id;
    state.sv.agreed = false;   // taslağı sıradaki başvuru için tazele
    closeSheet();
    state.nav = [{ screen: 'home', chatSeed: false }];
    state.screen = 'birikim-manage';
    render();
  }, 1500);
}

/* =================== YÖNET =================== */
function BirikimManage() {
  const p = svPlan();
  if (!p) return PlaceholderScreen('Birikim');
  const d = SV_DEST[p.dest], f = SV_FUND[p.fund], c = svCard(p.card);
  return `
  <div class="screen anim-right">
    <div class="nav-head ru-nav-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">${d.name}</div>
      <button class="icon-btn" data-action="toast" data-msg="Bilgilendirme prototipte aktif değil">${I.info}</button>
    </div>
    <div class="screen-scroll">
      ${svStatCard(p)}
      <div class="ru-block"><div class="ru-block-h">Aylık ${p.fund === 'roundup' ? 'birikim' : p.fund === 'statement' ? 'aktarım' : p.fund === 'salary' ? 'transfer' : (p.dest === 'metal' ? 'alım' : 'birikim')}</div>${svChart(p)}</div>
      <div class="ru-info-card">
        <div class="ru-info-row"><span class="ru-info-ico">${f.logo(20)}</span><span class="ru-info-k">Yöntem</span><span class="ru-info-v">${f.name}</span></div>
        <div class="ru-info-row"><span class="ru-info-ico">${I.target}</span><span class="ru-info-k">Kural</span><span class="ru-info-v">${svPlanRuleLabel(p)}</span></div>
        <div class="ru-info-row"><span class="ru-info-ico">${d.icon}</span><span class="ru-info-k">Hedef</span><span class="ru-info-v">${svDestTargetLabel(p)}</span></div>
        <div class="ru-info-row"><span class="ru-info-ico">${p.fund === 'salary' ? I.bank : I.card}</span><span class="ru-info-k">${p.fund === 'salary' ? 'Maaş hesabı' : p.fund === 'statement' ? 'Kredi kartı' : 'Kart'}</span><span class="ru-info-v">${c ? c.name + '<br><i>' + c.num + '</i>' : 'Seçilmedi'}</span></div>
      </div>
      <div class="ru-txn-title">Son hareketler</div>
      <div class="ru-txns">${p.txns.slice(0, 3).map(t => svTxnRow(p, t)).join('')}</div>
      <div class="ru-seeall" data-action="sv-history">Tüm hareketleri gör ${I.chevR}</div>
    </div>
    <div class="screen-cta">
      <button class="btn-ghost-danger" data-action="sv-stop">${d.name} birikimini durdur</button>
    </div>
  </div>`;
}
function svStatCard(p) {
  const d = SV_DEST[p.dest];
  if (p.dest === 'metal') {
    const m = svMetalM(p), inv = svPrincipal(p), gain = svMetalValue(p) - inv, gpct = inv ? Math.round(gain / inv * 100) : 0;
    return `<div class="ru-statcard"><div class="ru-jar-label">Toplam ${m.name}</div>
      <div class="ru-jar-amt">${svFmtMetal(svGrams(p), m.code)}</div>
      <div class="ru-statrow">
        <div class="ru-stat"><div class="ru-stat-l">Yatırılan</div><div class="ru-stat-v">${fmtTL(Math.round(inv))}</div></div>
        <div class="ru-stat mid"><div class="ru-stat-l">Güncel değer</div><div class="ru-stat-v">${fmtTL(Math.round(svMetalValue(p)))}</div></div>
        <div class="ru-stat"><div class="ru-stat-l">Kazanç</div><div class="ru-stat-v ${gain >= 0 ? 'up' : 'down'}">${gain >= 0 ? '+' : ''}%${gpct}</div></div>
      </div></div>`;
  }
  if (p.dest === 'fund') {
    const inv = svPrincipal(p), val = svFundValue(p), gain = val - inv, gpct = inv ? Math.round(gain / inv * 100) : 0;
    return `<div class="ru-statcard"><div class="ru-jar-label">Güncel Değer</div>
      <div class="ru-jar-amt">${fmtTL(val)}</div>
      <div class="ru-statrow">
        <div class="ru-stat"><div class="ru-stat-l">Yatırılan</div><div class="ru-stat-v">${fmtTL(inv)}</div></div>
        <div class="ru-stat mid"><div class="ru-stat-l">Fon</div><div class="ru-stat-v">${svFundP(p).code}</div></div>
        <div class="ru-stat"><div class="ru-stat-l">Kazanç</div><div class="ru-stat-v ${gain >= 0 ? 'up' : 'down'}">${gain >= 0 ? '+' : ''}%${gpct}</div></div>
      </div></div>`;
  }
  if (p.dest === 'donation') {
    return `<div class="ru-statcard"><div class="ru-jar-label">Toplam Bağış</div>
      <div class="ru-jar-amt">${fmtTL(svPrincipal(p))}</div>
      <div class="ru-statrow">
        <div class="ru-stat"><div class="ru-stat-l">Bu ay</div><div class="ru-stat-v">+${p.txns[0] ? Math.round(p.txns[0].tl).toLocaleString('tr-TR') : 0} TL</div></div>
        <div class="ru-stat mid"><div class="ru-stat-l">Bağış sayısı</div><div class="ru-stat-v">${p.txns.length}</div></div>
        <div class="ru-stat"><div class="ru-stat-l">Kurum</div><div class="ru-stat-v">${svCauseC(p).emoji}</div></div>
      </div></div>`;
  }
  return `<div class="ru-statcard"><div class="ru-jar-label">Toplam Biriken</div>
    <div class="ru-jar-amt">${fmtTL2(svAcctTotal(p))}</div>
    <div class="ru-statrow">
      <div class="ru-stat"><div class="ru-stat-l">Anapara</div><div class="ru-stat-v">${fmtTL(Math.round(svPrincipal(p)))}</div></div>
      <div class="ru-stat mid"><div class="ru-stat-l">Kazanılan faiz</div><div class="ru-stat-v up">+${fmtTL2(svAcctInterest(p))}</div></div>
      <div class="ru-stat"><div class="ru-stat-l">Geçen aya göre</div><div class="ru-stat-v up">${I.trendUp} %${p.monthChange}</div></div>
    </div></div>`;
}
function svChart(p) {
  const past = p.txns.slice().reverse();   // eski→yeni
  const cols = past.map((t, i) => ({ m: SV_SHORT[i], v: t.tl }));
  cols.push({ m: 'May', v: svMonthlyTL(p), cur: true });
  const max = Math.max(...cols.map(x => x.v), 1);
  return `<div class="ru-chart">${cols.map(x => `<div class="ru-bar-col"><div class="ru-bar-v">${Math.round(x.v)}</div><div class="ru-bar-track"><div class="ru-bar ${x.cur ? 'cur' : ''}" style="height:${Math.max(9, Math.round(x.v / max * 100))}%"></div></div><div class="ru-bar-m ${x.cur ? 'cur' : ''}">${x.m}</div></div>`).join('')}</div>`;
}
function svPlanRuleLabel(p) {
  if (p.fund === 'roundup')   return `Sonraki ${RU_UNIT} TL'ye yuvarla`;
  if (p.fund === 'statement') return `Ekstrenin %${p.rate}'i${p.cap ? '<br><i>en çok ' + p.cap.toLocaleString('tr-TR') + ' TL/ay</i>' : ''}`;
  if (p.fund === 'salary')    return `Maaşının %${p.salaryPct}'i`;
  return (p.dest === 'metal' && p.unit === 'gram') ? `${p.gram.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ${svMetalM(p).code}/ay` : `${p.tryAmt.toLocaleString('tr-TR')} TL/ay`;
}
function svDestTargetLabel(p) {
  if (p.dest === 'account')  return (svAcct(p.account) || {}).name || 'Birikim Hesabı';
  if (p.dest === 'metal')    return `${svMetalM(p).name} (${svMetalM(p).code})`;
  if (p.dest === 'fund')     return SV_FUNDS[p.fundKind].name;
  return SV_CAUSES[p.cause].name;
}
function svTxnRow(p, t) {
  if (p.dest === 'metal') {
    const m = svMetalM(p);
    return `<div class="ru-txn"><span class="ru-txn-ico mb-ico">${mbBadgeCode(m.code)}</span>
      <div class="ru-txn-mid"><div class="ru-txn-m">${fmtTL(Math.round(t.tl))}</div><div class="ru-txn-s">~${fmtTL(t.price)}/${m.code}</div><div class="ru-txn-d">${t.date}</div></div>
      <span class="ru-txn-add">+${svFmtMetal(t.gram, m.code)}</span></div>`;
  }
  const label = p.fund === 'statement' ? `${t.month.split(' ')[0]} ekstresi` : p.fund === 'salary' ? 'Maaş transferi' : (p.dest === 'donation' ? SV_CAUSES[p.cause].name : 'Aylık birikim');
  const ico = p.dest === 'donation' ? `<span class="ru-txn-ico">${SV_CAUSES[p.cause].emoji}</span>`
            : p.fund === 'statement' ? `<span class="ru-txn-ico su-ico">${I.receipt}</span>`
            : `<span class="ru-txn-ico su-ico">${SV_FUND[p.fund].logo(18)}</span>`;
  return `<div class="ru-txn">${ico}
    <div class="ru-txn-mid"><div class="ru-txn-m">${label}</div><div class="ru-txn-s">${t.month}</div><div class="ru-txn-d">${t.date}</div></div>
    <span class="ru-txn-add">+${fmtTL2(t.tl).replace(',00', '')}</span></div>`;
}

/* =================== HAREKETLER =================== */
function BirikimHistory() {
  const p = svPlan();
  if (!p) return PlaceholderScreen('Birikim');
  const m = p.dest === 'metal' ? svMetalM(p) : null;
  const groups = [];
  p.txns.forEach(t => { let g = groups.find(x => x.m === t.month); if (!g) { g = { m: t.month, items: [], tl: 0, gram: 0 }; groups.push(g); } g.items.push(t); g.tl += t.tl; g.gram += (t.gram || 0); });
  return `
  <div class="screen anim-right">
    <div class="nav-head"><button class="icon-btn" data-action="nav-back">${I.back}</button><div class="nav-title">Birikim Hareketleri</div><span class="icon-btn" style="visibility:hidden">${I.info}</span></div>
    <div class="screen-scroll">
      ${groups.map(g => `<div class="ru-month-h"><span>${g.m}</span><b>+${m ? svFmtMetal(g.gram, m.code) : fmtTL2(g.tl)}</b></div><div class="ru-txns">${g.items.map(t => svTxnRow(p, t)).join('')}</div>`).join('')}
      <div class="ru-hist-note">${I.info} Daha eski hareketler prototipte gösterilmiyor.</div>
    </div>
  </div>`;
}

/* =================== SHEET'ler & seçiciler =================== */
function svOpenDestPick() {
  sheetEl.innerHTML = `<div class="sheet-handle"></div><div class="ru-pick-t">Birikim türü seçiniz</div>
    ${SV_DEST_ORDER.map(k => { const x = SV_DEST[k], on = state.sv.dest === k;
      return `<div class="ru-pick-row ${on ? 'active' : ''}" data-action="sv-pick-dest" data-val="${k}"><span class="ru-pick-ico">${x.icon}</span><div class="ru-pick-mid"><div class="ru-pick-n">${x.name}</div><div class="ru-pick-s">${x.desc}</div></div><span class="ru-pick-radio ${on ? 'on' : ''}">${on ? I.check : ''}</span></div>`; }).join('')}
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open'); sheetScrimEl.classList.add('open');
}
function svPickDest(k) { state.sv.dest = k; if (k !== 'metal') state.sv.unit = 'try'; closeSheet(); render(); }
function svOpenMethodPick() {
  sheetEl.innerHTML = `<div class="sheet-handle"></div><div class="ru-pick-t">Birikim yöntemi seçiniz</div>
    ${SV_FUND_ORDER.map(k => { const x = SV_FUND[k], on = state.sv.fund === k;
      return `<div class="ru-pick-row ${on ? 'active' : ''}" data-action="sv-pick-method" data-val="${k}"><span class="ru-pick-ico">${x.logo(24)}</span><div class="ru-pick-mid"><div class="ru-pick-n">${x.name}</div><div class="ru-pick-s">${x.desc}</div></div><span class="ru-pick-radio ${on ? 'on' : ''}">${on ? I.check : ''}</span></div>`; }).join('')}
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open'); sheetScrimEl.classList.add('open');
}
function svPickMethod(k) { state.sv.fund = k; closeSheet(); render(); }
function svOpenCardPick() {
  const list = RU_CARDS.filter(c => {
    if (state.sv.fund === 'statement') return c.kind === 'Kredi Kartı';
    if (state.sv.fund === 'salary')    return c.kind === 'Banka Kartı';
    return true;
  });
  sheetEl.innerHTML = `<div class="sheet-handle"></div><div class="ru-pick-t">${svSourceLabel()} seçiniz</div>
    ${list.map(c => { const on = state.sv.card === c.id;
      return `<div class="ru-pick-row ${on ? 'active' : ''}" data-action="sv-pick-card" data-val="${c.id}">${ruCardArt(c)}<div class="ru-pick-mid"><div class="ru-pick-n">${c.name}</div><div class="ru-pick-s">${c.kind} · ${c.detail}</div></div><span class="ru-pick-radio ${on ? 'on' : ''}">${on ? I.check : ''}</span></div>`; }).join('')}
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open'); sheetScrimEl.classList.add('open');
}
function svPickCard(id) { state.sv.card = id; closeSheet(); render(); }
function svOpenAcctPick() {
  sheetEl.innerHTML = `<div class="sheet-handle"></div><div class="ru-pick-t">Birikim hesabı seçiniz</div>
    ${RU_ACCOUNTS.map(a => { const on = state.sv.account === a.id;
      return `<div class="ru-pick-row ${on ? 'active' : ''}" data-action="sv-pick-acct" data-val="${a.id}"><span class="ru-pick-ico">${I.bank}</span><div class="ru-pick-mid"><div class="ru-pick-n">${a.name}</div><div class="ru-pick-s">${a.iban} · ${a.detail}</div></div><span class="ru-pick-radio ${on ? 'on' : ''}">${on ? I.check : ''}</span></div>`; }).join('')}
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open'); sheetScrimEl.classList.add('open');
}
function svPickAcct(id) { state.sv.account = id; closeSheet(); render(); }
function svOpenMetalPick() {
  sheetEl.innerHTML = `<div class="sheet-handle"></div><div class="ru-pick-t">Maden seçiniz</div>
    ${Object.keys(MB_METALS).map(k => { const m = MB_METALS[k], on = state.sv.metalKind === k;
      return `<div class="ru-pick-row ${on ? 'active' : ''}" data-action="sv-pick-metal" data-val="${k}"><span class="mb-badge">${m.code}</span><div class="ru-pick-mid"><div class="ru-pick-n">${m.name}</div><div class="ru-pick-s">${m.code}</div></div><div class="mb-price"><b>${mbPriceStr(m.price)}</b><i>/gram</i></div><span class="ru-pick-radio ${on ? 'on' : ''}">${on ? I.check : ''}</span></div>`; }).join('')}
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open'); sheetScrimEl.classList.add('open');
}
function svPickMetal(k) { state.sv.metalKind = k; closeSheet(); render(); }
function svOpenFundPick() {
  sheetEl.innerHTML = `<div class="sheet-handle"></div><div class="ru-pick-t">Fon seçiniz</div>
    ${SV_FUNDS_ORDER.map(k => { const fp = SV_FUNDS[k], on = state.sv.fundKind === k;
      return `<div class="ru-pick-row ${on ? 'active' : ''}" data-action="sv-pick-fund" data-val="${k}"><span class="mb-badge">${fp.code}</span><div class="ru-pick-mid"><div class="ru-pick-n">${fp.name}</div><div class="ru-pick-s">${fp.risk} · son 1 yıl ${fp.ret}</div></div><span class="ru-pick-radio ${on ? 'on' : ''}">${on ? I.check : ''}</span></div>`; }).join('')}
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open'); sheetScrimEl.classList.add('open');
}
function svPickFund(k) { state.sv.fundKind = k; closeSheet(); render(); }
function svOpenCausePick() {
  sheetEl.innerHTML = `<div class="sheet-handle"></div><div class="ru-pick-t">Bağış kurumu seçiniz</div>
    ${SV_CAUSE_ORDER.map(k => { const cz = SV_CAUSES[k], on = state.sv.cause === k;
      return `<div class="ru-pick-row ${on ? 'active' : ''}" data-action="sv-pick-cause" data-val="${k}"><span class="sv-cause-emoji">${cz.emoji}</span><div class="ru-pick-mid"><div class="ru-pick-n">${cz.name}</div><div class="ru-pick-s">${cz.org}</div></div><span class="ru-pick-radio ${on ? 'on' : ''}">${on ? I.check : ''}</span></div>`; }).join('')}
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open'); sheetScrimEl.classList.add('open');
}
function svPickCause(k) { state.sv.cause = k; closeSheet(); render(); }
function svOpenForm() {
  const d = SV_DEST[state.sv.dest];
  sheetEl.innerHTML = `<div class="sheet-handle"></div><div class="ru-pick-t">${d.name} Talimat Formu</div>
    <div class="legal-scroll">
      <h4>1. Talimatın Kapsamı</h4><p>Bu talimat ile ${svApplySub()}</p>
      <h4>2. Durdurma ve Değişiklik</h4><p>Talimatınızı dilediğiniz an durdurabilir, kart/hedef bilgilerini güncelleyebilirsiniz. Biriken tutar/varlık sizde kalır.</p>
      <h4>3. Bilgilendirme</h4><p>Yatırım fonu ve değerli maden birikimlerinde geçmiş getiri gelecek getiriyi garanti etmez. Bağış işlemlerinde tutar doğrudan kuruma iletilir.</p>
      <p><b>Bu metin prototip amaçlı örnek bir sözleşme özetidir.</b></p>
    </div>
    <button class="sheet-btn" data-action="close-sheet">Okudum</button>`;
  sheetEl.classList.add('open'); sheetScrimEl.classList.add('open');
}
function svStop() {
  const p = svPlan(), d = SV_DEST[p.dest];
  sheetEl.innerHTML = `<div class="sheet-handle"></div>
    <div class="ru-pick-t">${d.name} birikimini durdur</div>
    <p class="ru-stop-txt">Talimatın iptal edilir ve yeni birikim yapılmaz. Biriken tutar/varlık sende kalır.</p>
    <button class="sheet-btn" data-action="sv-stop-confirm">Durdur</button>
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open'); sheetScrimEl.classList.add('open');
}
function svStopConfirm() {
  state.sv.plans = state.sv.plans.filter(p => p.id !== state.sv.view);
  closeSheet(); goHome();
  setTimeout(() => toast('Birikim talimatı durduruldu. Biriken değerin sende kalır.'), 300);
}

/* -- hub/plan giriş aksiyonları -- */
function svSetDest(k) { state.sv.dest = k; if (k !== 'metal') state.sv.unit = 'try'; render(); }
function svSetFund(k) {
  if (k === 'transfer') { if (!isTransfer(state.sv.fund)) state.sv.fund = 'salary'; }
  else state.sv.fund = k;
  render();
}
function svSetRate(r) { state.sv.rate = +r; render(); }
function svSetSalPct(r) { state.sv.salaryPct = +r; render(); }
function svSetUnit(u) { state.sv.unit = u; render(); }
function svApply() { go('birikim-apply'); }
function svOpen() { go('birikim'); }
function svManage(id) { state.sv.view = id; go('birikim-manage'); }

// Round-up ödemesi: aktif "harcamadan yuvarla" planlarını da besle
function svCreditRoundup(spent) {
  const add = ruNextUnit(spent, RU_UNIT) - spent;
  if (add <= 0) return;
  const now = new Date();
  const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  state.sv.plans.filter(p => p.fund === 'roundup').forEach(p => {
    const t = { month: SV_CUR, short: 'May', date: `25 Mayıs ${hhmm}`, tl: add };
    if (p.dest === 'metal') { const price = svMetalM(p).price; t.price = price; t.gram = add / price; }
    p.txns.unshift(t);
  });
}

/* ======================================================================
   SKY LIMIT (draft)
   One shared credit limit split across several credit products. The
   customer moves limit between eligible products (never below the used
   amount, never above the Sky Limit total); repayments re-open limit that
   can be reused in another product. Mock data + local UI state only.
   ====================================================================== */

const SKY_TOTAL = 500000;   // total Sky Limit (TL)
const SKY_STEP = 5000;      // slider / stepper increment (TL)
const SKY_ICO_CAR = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17H3.6a1 1 0 0 1-1-1v-3.1a2 2 0 0 1 .6-1.4L5 9.7l1.6-3.4A2 2 0 0 1 8.4 5.2h7.2a2 2 0 0 1 1.8 1.1L19 9.7l1.8 1.8a2 2 0 0 1 .6 1.4V16a1 1 0 0 1-1 1H19M9 17h6M5 9.7h14"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>';
const SKY_ICO_MINUS = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 12h14"/></svg>';
const SKY_ICO_UNLOCK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.6-1.7"/></svg>';
const SKY_ICO_ARROW = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

// Product hues: checked as a categorical set (colour-blind separation + contrast)
// on both theme card surfaces (#1c1c1f dark, #ffffff light). Order = bar order.
// Same hue per product as in Toplu Borç Ödeme (İhtiyaç blue, Taşıt gold, Esnek Hesap violet).
const SKY_PRODUCTS = [
  { id: 'personal',   name: 'İhtiyaç Kredisi',       sub: 'Bireysel · Taksitli', color: '#0098cb', icon: I.loan },
  { id: 'auto',       name: 'Taşıt Kredisi',         sub: 'Araç · Taksitli',     color: '#C08A1E', icon: SKY_ICO_CAR },
  { id: 'flex',       name: 'Esnek Hesap (KMH)',     sub: 'Hesaba bağlı',        color: '#7B61C9', icon: I.bank },
];

state.sky = {
  limits: { personal: 200000, auto: 200000, flex: 100000 },   // allocated limit per product
  used:   { personal: 100000, auto: 150000, flex: 50000 },    // used (outstanding) per product
  draft: null,        // limits being edited on the management screen
  change: null,       // last confirmed re-distribution { before, after, no, date }
  payment: null,      // last installment payment that re-opened limit
  nextInst: { product: 'personal', amount: 20000, dates: ['10 Kasım', '10 Aralık', '10 Ocak', '10 Şubat'], i: 0 },
  history: [          // recent repayments that re-opened limit (newest first)
    { product: 'flex',       title: 'Esnek Hesap (KMH) ödemesi',     amount: 8000,  date: '28 Ekim 2026' },
    { product: 'personal',   title: 'İhtiyaç Kredisi taksiti',       amount: 20000, date: '10 Ekim 2026' },
    { product: 'auto',       title: 'Taşıt Kredisi taksiti',         amount: 25000, date: '5 Ekim 2026' },
  ],
};
let skyWarnTimers = {};

/* -------------------- helpers -------------------- */
function skyP(id) { return SKY_PRODUCTS.find(p => p.id === id); }
function skyTL(n) { return Math.round(n).toLocaleString('tr-TR') + ' TL'; }
function skySum(o) { return SKY_PRODUCTS.reduce((a, p) => a + (o[p.id] || 0), 0); }
function skyFree(limits) { return SKY_TOTAL - skySum(limits); }              // not allocated to any product
function skyUsedTotal() { return skySum(state.sky.used); }
function skyAvailTotal() { return SKY_TOTAL - skyUsedTotal(); }
function skyPct(n, of) { return of ? Math.max(0, Math.min(100, n / of * 100)) : 0; }
function skyTint(hex, a) { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; }
function skyVars(p) { return `--c:${p.color};--ct:${skyTint(p.color, .34)};--cs:${skyTint(p.color, .15)}`; }
function skyDeltaHTML(d, cls = '') {
  if (!d) return '';
  return `<span class="sky-delta ${d > 0 ? 'up' : 'down'} ${cls}">${d > 0 ? '+' : '−'}${skyTL(Math.abs(d))}</span>`;
}
function skyNow() {
  const d = new Date(), p2 = n => String(n).padStart(2, '0');
  return `${p2(d.getDate())}.${p2(d.getMonth() + 1)}.${d.getFullYear()} · ${p2(d.getHours())}:${p2(d.getMinutes())}`;
}
function skyTxnNo() { return 'SKY' + String(Math.floor(100000000 + Math.random() * 900000000)); }
function skyHasChange() { const s = state.sky; return !!s.draft && SKY_PRODUCTS.some(p => s.draft[p.id] !== s.limits[p.id]); }
function skyMoved(before, after) { return SKY_PRODUCTS.reduce((a, p) => a + Math.max(0, after[p.id] - before[p.id]), 0); }

/* Allocation bar: one segment per product (width = limit share), solid = used, tint = available.
   Unallocated limit (if any) is drawn as a hatched segment at the end. */
function skyBarHTML(limits, used) {
  const free = skyFree(limits);
  const segs = SKY_PRODUCTS.filter(p => limits[p.id] > 0).map(p => {
    const lim = limits[p.id], u = Math.min(used[p.id], lim);
    return `<span class="sky-seg" style="flex:${lim} 1 0;${skyVars(p)}"><i style="width:${skyPct(u, lim).toFixed(2)}%"></i></span>`;
  }).join('');
  return `<div class="sky-bar" role="img" aria-label="Ürünlere göre limit dağılımı">${segs}${free > 0 ? `<span class="sky-seg free" style="flex:${free} 1 0"></span>` : ''}</div>`;
}
function skyKeysHTML(limits) {
  return `<div class="sky-keys">
    <span class="sky-key"><i class="sw"></i>Kullanılan</span>
    <span class="sky-key"><i class="sw avail"></i>Kullanılabilir</span>
    ${skyFree(limits) > 0 ? '<span class="sky-key"><i class="sw free"></i>Dağıtılmamış</span>' : ''}
  </div>`;
}

/* -------------------- Screen 1 — Sky Limit home (dashboard) -------------------- */
function SkyHome() {
  const s = state.sky, used = skyUsedTotal(), avail = skyAvailTotal(), free = skyFree(s.limits);
  const pct = Math.round(used / SKY_TOTAL * 100);
  const ni = s.nextInst, nip = skyP(ni.product);
  return `
  <div class="screen anim-right">
    <div class="nav-head ru-nav-accent">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Sky Limit</div>
      <button class="icon-btn" data-action="sky-info" aria-label="Sky Limit nasıl çalışır?">${I.info}</button>
    </div>
    <div class="screen-scroll">
      <div class="ru-statcard sky-hero">
        <div class="ru-jar-label">Toplam Sky Limit</div>
        <div class="ru-jar-amt">${skyTL(SKY_TOTAL)}</div>
        <div class="sky-hero-meter" role="img" aria-label="Kullanım oranı yüzde ${pct}"><i style="width:${pct}%"></i></div>
        <div class="ru-statrow">
          <div class="ru-stat"><div class="ru-stat-l">Kullanılan</div><div class="ru-stat-v">${skyTL(used)}</div></div>
          <div class="ru-stat mid"><div class="ru-stat-l">Kullanılabilir</div><div class="ru-stat-v">${skyTL(avail)}</div></div>
          <div class="ru-stat"><div class="ru-stat-l">Kullanım oranı</div><div class="ru-stat-v">%${pct}</div></div>
        </div>
      </div>

      <div class="sky-card">
        <div class="sky-card-h"><span>Limit dağılımı</span><button class="sp-link" data-action="sky-manage">Değiştir ${I.chevR}</button></div>
        ${skyBarHTML(s.limits, s.used)}
        ${skyKeysHTML(s.limits)}
        <div class="sky-prods">${SKY_PRODUCTS.map(skyProdRowHTML).join('')}</div>
        ${free > 0 ? `<div class="sky-free-row" data-action="sky-manage"><span>Dağıtılmamış limit <b>${skyTL(free)}</b></span><em>Bir ürüne ata ${I.chevR}</em></div>` : ''}
      </div>

      <div class="sky-card sky-next" style="${skyVars(nip)}">
        <span class="sky-ico">${I.calendar}</span>
        <div class="sky-next-mid"><b>Yaklaşan taksit · ${ni.dates[ni.i]}</b><span>${nip.name} · ödediğinde ${skyTL(ni.amount)} limitin yeniden açılır</span></div>
        <div class="sky-next-r"><b>${skyTL(ni.amount)}</b><button class="sky-pill" data-action="sky-pay">Öde</button></div>
      </div>

      <div class="ru-txn-title">Son ödemeler ve açılan limitler</div>
      <div class="ru-txns">${s.history.slice(0, 4).map(skyHistRowHTML).join('')}</div>
    </div>
    <div class="screen-cta">
      <button class="btn-primary" data-action="sky-manage">Limit Dağılımını Değiştir</button>
    </div>
  </div>`;
}
function skyProdRowHTML(p) {
  const s = state.sky, lim = s.limits[p.id], u = s.used[p.id];
  return `<div class="sky-prod" style="${skyVars(p)}">
    <div class="sky-prod-top">
      <span class="sky-ico">${p.icon}</span>
      <div class="sky-prod-mid"><b>${p.name}</b><span>${p.sub} · Pay %${Math.round(lim / SKY_TOTAL * 100)}</span></div>
      <div class="sky-prod-r"><b>${skyTL(lim)}</b><span>Tanımlı limit</span></div>
    </div>
    <div class="sky-meter"><i style="width:${skyPct(u, lim).toFixed(2)}%"></i></div>
    <div class="sky-prod-foot"><span>Kullanılan <b>${skyTL(u)}</b></span><span>Kullanılabilir <b>${skyTL(lim - u)}</b></span></div>
  </div>`;
}
function skyHistRowHTML(h) {
  const p = skyP(h.product);
  return `<div class="ru-txn">
    <span class="ru-txn-ico sky-txn-ico" style="${skyVars(p)}">${I.refresh}</span>
    <div class="ru-txn-mid"><div class="ru-txn-m">${h.title}</div><div class="ru-txn-s">${skyTL(h.amount)} ödendi</div><div class="ru-txn-d">${h.date}</div></div>
    <div class="sky-txn-r"><span class="ru-txn-add">+${skyTL(h.amount)}</span><span>limit açıldı</span></div>
  </div>`;
}
function skyInfoSheet() {
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>Sky Limit nasıl çalışır?</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="sky-how">
      <div class="sky-how-row"><span class="sky-how-ico">${I.grid}</span><div><b>Tek limit, birden fazla ürün</b><span>İhtiyaç kredisi, taşıt kredisi ve esnek hesap (KMH) limitlerin tek bir Sky Limit altında toplanır.</span></div></div>
      <div class="sky-how-row"><span class="sky-how-ico">${I.transfer}</span><div><b>Dağılımı sen belirle</b><span>Tahsis koşulların çerçevesinde limitini uygun ürünler arasında dilediğin zaman aktarabilirsin.</span></div></div>
      <div class="sky-how-row"><span class="sky-how-ico">${I.refresh}</span><div><b>Ödedikçe limitin açılır</b><span>Taksit ve esnek hesap ödemelerin kadar limitin yeniden açılır; bu limiti uygun başka bir üründe de kullanabilirsin.</span></div></div>
    </div>
    ${skyRulesHTML('in')}
    <button class="sheet-btn" data-action="close-sheet">Anladım</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function skyRulesHTML(cls = '') {
  return `<div class="sky-rules ${cls}">
    <div>${I.lock}<span>Bir ürünün limiti, o üründe kullanılan tutarın altına indirilemez.</span></div>
    <div>${I.info}<span>Ürünlere dağıtılan toplam limit, ${skyTL(SKY_TOTAL)} Sky Limit tutarını aşamaz.</span></div>
  </div>`;
}

/* -------------------- Screen 2 — limit management -------------------- */
function SkyManage() {
  const s = state.sky;
  if (!s.draft) s.draft = { ...s.limits };
  const free = skyFree(s.draft);
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Limit Dağılımı</div>
      <button class="sky-reset" data-action="sky-reset">${I.undo} Sıfırla</button>
    </div>
    <div class="screen-scroll sky-manage">
      <div class="sky-sum">
        <div class="sky-sum-top">
          <div class="sky-sum-t"><span>Toplam Sky Limit</span><b>${skyTL(SKY_TOTAL)}</b></div>
          <div class="sky-free ${free > 0 ? 'on' : ''}" id="sky-free"><span>Dağıtılabilir limit</span><b>${skyTL(free)}</b></div>
        </div>
        <div id="sky-sum-bar">${skyBarHTML(s.draft, s.used)}</div>
        <div id="sky-sum-keys">${skyKeysHTML(s.draft)}</div>
      </div>
      <p class="sky-lead">Kaydırarak ya da tutarı yazarak ürünler arasında limit aktarabilirsin. Bir üründen azalttığın limit dağıtılabilir limite eklenir; oradan başka bir ürüne verebilirsin.</p>
      ${SKY_PRODUCTS.map(skyEditCardHTML).join('')}
      ${skyRulesHTML()}
    </div>
    <div class="screen-cta">
      <button class="btn-primary ${skyHasChange() ? '' : 'disabled'}" id="sky-next" data-action="sky-review">Devam</button>
    </div>
  </div>`;
}
function skyEditCardHTML(p) {
  const s = state.sky, v = s.draft[p.id], cur = s.limits[p.id], u = s.used[p.id];
  return `<div class="sky-edit ${v !== cur ? 'changed' : ''}" id="sky-e-${p.id}" style="${skyVars(p)}">
    <div class="sky-edit-top">
      <span class="sky-ico">${p.icon}</span>
      <div class="sky-edit-mid"><b>${p.name}</b><span>Mevcut limit ${skyTL(cur)}</span></div>
      <span id="sky-d-${p.id}">${skyDeltaHTML(v - cur)}</span>
    </div>
    <div class="sky-amt-row">
      <button class="sky-step" data-action="sky-step" data-id="${p.id}" data-dir="-1" aria-label="${p.name} limitini azalt">${SKY_ICO_MINUS}</button>
      <label class="sky-amt"><input class="sky-amt-input" id="sky-in-${p.id}" data-id="${p.id}" inputmode="numeric" enterkeyhint="done" autocomplete="off" value="${v.toLocaleString('tr-TR')}" aria-label="${p.name} yeni limit"><span>TL</span></label>
      <button class="sky-step" data-action="sky-step" data-id="${p.id}" data-dir="1" aria-label="${p.name} limitini artır">${I.plus}</button>
    </div>
    <div class="sky-slider" id="sky-sl-${p.id}" style="${skySliderVars(p.id)}">
      <div class="sky-track"><span class="t-used"></span><span class="t-avail"></span><span class="t-reach"></span></div>
      <input type="range" class="sky-range" data-id="${p.id}" min="0" max="${SKY_TOTAL}" step="${SKY_STEP}" value="${v}" aria-label="${p.name} limiti">
    </div>
    <div class="sky-edit-meta">
      <span class="sky-min">${I.lock} Kullanılan <b>${skyTL(u)}</b></span>
      <span>Kullanılabilir <b id="sky-av-${p.id}">${skyTL(v - u)}</b></span>
    </div>
    <div class="sky-warn" id="sky-w-${p.id}" role="status" aria-live="polite"></div>
  </div>`;
}
function skySliderVars(id) {
  const s = state.sky, d = s.draft, free = skyFree(d);
  return `--u:${skyPct(s.used[id], SKY_TOTAL)}%;--v:${skyPct(d[id], SKY_TOTAL)}%;--r:${skyPct(d[id] + free, SKY_TOTAL)}%`;
}
function skyFitInput(inp) {       // keep the amount centred next to "TL"
  const v = inp.value || '0', digits = v.replace(/\D/g, '').length, dots = (v.match(/\./g) || []).length;
  inp.style.width = (Math.max(1, digits) + dots * 0.45 + 0.4) + 'ch';
}
function skySetupManage() {
  document.querySelectorAll('.sky-range').forEach(r => {
    r.addEventListener('input', () => skySetDraft(r.dataset.id, +r.value));
  });
  document.querySelectorAll('.sky-amt-input').forEach(inp => {
    skyFitInput(inp);
    inp.addEventListener('focus', () => inp.select());
    inp.addEventListener('input', () => {
      const digits = inp.value.replace(/\D/g, '').slice(0, 7);
      inp.value = digits ? (+digits).toLocaleString('tr-TR') : '';
      skyFitInput(inp);
    });
    inp.addEventListener('change', () => skySetDraft(inp.dataset.id, +inp.value.replace(/\D/g, '')));
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') inp.blur(); });
  });
}
/* Apply a new value for one product, enforcing the two rules:
   1) never below the product's used amount, 2) total allocation never above SKY_TOTAL. */
function skySetDraft(id, raw) {
  const s = state.sky, d = s.draft;
  if (!d) return;
  const min = s.used[id], free = skyFree(d), max = d[id] + free;
  let v = Math.round(raw) || 0, warn = '';
  if (v < min) {
    v = min; warn = `Kullanılan limitin (${skyTL(min)}) altına inemezsin.`;
  } else if (v > max) {
    v = max;
    warn = free > 0
      ? `En fazla ${skyTL(max)} tanımlayabilirsin; dağıtılabilir limitin ${skyTL(free)}.`
      : 'Dağıtılabilir limitin yok. Artırmak için önce başka bir ürünün limitini azalt.';
  }
  d[id] = v;
  skyRefreshManage();
  skyWarn(id, warn);
}
function skyStep(id, dir) {
  const v = state.sky.draft[id];
  skySetDraft(id, dir > 0 ? Math.floor(v / SKY_STEP) * SKY_STEP + SKY_STEP : Math.ceil(v / SKY_STEP) * SKY_STEP - SKY_STEP);
}
function skyReset() {
  state.sky.draft = { ...state.sky.limits };
  skyRefreshManage();
  SKY_PRODUCTS.forEach(p => skyWarn(p.id, ''));
}
/* Partial DOM update while editing (no full render → no flicker, slider keeps its drag) */
function skyRefreshManage() {
  const s = state.sky, d = s.draft, free = skyFree(d);
  SKY_PRODUCTS.forEach(p => {
    const sl = document.getElementById('sky-sl-' + p.id);
    if (!sl) return;
    sl.style.setProperty('--v', skyPct(d[p.id], SKY_TOTAL) + '%');
    sl.style.setProperty('--r', skyPct(d[p.id] + free, SKY_TOTAL) + '%');
    const rng = sl.querySelector('.sky-range');
    if (+rng.value !== d[p.id]) rng.value = d[p.id];
    const inp = document.getElementById('sky-in-' + p.id);
    if (inp && document.activeElement !== inp) { inp.value = d[p.id].toLocaleString('tr-TR'); skyFitInput(inp); }
    document.getElementById('sky-d-' + p.id).innerHTML = skyDeltaHTML(d[p.id] - s.limits[p.id]);
    document.getElementById('sky-av-' + p.id).textContent = skyTL(d[p.id] - s.used[p.id]);
    document.getElementById('sky-e-' + p.id).classList.toggle('changed', d[p.id] !== s.limits[p.id]);
  });
  const fr = document.getElementById('sky-free');
  if (fr) { fr.classList.toggle('on', free > 0); fr.querySelector('b').textContent = skyTL(free); }
  document.getElementById('sky-sum-bar').innerHTML = skyBarHTML(d, s.used);
  document.getElementById('sky-sum-keys').innerHTML = skyKeysHTML(d);
  document.getElementById('sky-next').classList.toggle('disabled', !skyHasChange());
}
function skyWarn(id, msg) {
  const el = document.getElementById('sky-w-' + id);
  if (!el) return;
  clearTimeout(skyWarnTimers[id]);
  if (!msg) { el.classList.remove('show'); return; }
  el.innerHTML = `${I.info}<span>${msg}</span>`;
  el.classList.add('show');
  skyWarnTimers[id] = setTimeout(() => el.classList.remove('show'), 3500);
}
function skyReview() {
  const a = document.activeElement;
  if (a && a.classList.contains('sky-amt-input')) a.blur();   // commit a typed amount first
  if (skyHasChange()) go('sky-limit-confirm');
}

/* -------------------- Screen 3 — confirm the change -------------------- */
function SkyConfirm() {
  const s = state.sky;
  if (!skyHasChange()) { state.screen = 'sky-limit'; return SkyHome(); }
  const before = s.limits, after = s.draft, moved = skyMoved(before, after), freeAfter = skyFree(after);
  return `
  <div class="screen anim-right">
    <div class="nav-head">
      <button class="icon-btn" data-action="nav-back">${I.back}</button>
      <div class="nav-title">Değişikliği Onayla</div>
    </div>
    <div class="screen-scroll">
      <div class="sky-card sky-first">
        <div class="sky-card-h"><span>Limit dağılımı</span></div>
        <div class="sky-cmp"><span class="sky-cmp-l">Önceki</span>${skyBarHTML(before, s.used)}</div>
        <div class="sky-cmp"><span class="sky-cmp-l">Yeni</span>${skyBarHTML(after, s.used)}</div>
        ${skyKeysHTML(after)}
      </div>
      <div class="sky-card pad0">
        <div class="sky-card-h">Ürün bazında değişiklikler</div>
        ${SKY_PRODUCTS.map(p => skyKVRowHTML(p, before, after, true)).join('')}
      </div>
      <div class="sky-card pad0">
        <div class="sky-card-h">İşlem özeti</div>
        <div class="sky-rows">
          <div class="r-row"><span class="r-l">Toplam Sky Limit</span><span class="r-r">${skyTL(SKY_TOTAL)}</span></div>
          ${moved ? `<div class="r-row"><span class="r-l">Ürünler arası aktarılan limit</span><span class="r-r">${skyTL(moved)}</span></div>` : ''}
          ${freeAfter > 0 ? `<div class="r-row"><span class="r-l">Dağıtılmamış kalacak limit</span><span class="r-r">${skyTL(freeAfter)}</span></div>` : ''}
          <div class="r-row"><span class="r-l">Kullanılan limit</span><span class="r-r">${skyTL(skyUsedTotal())} <i class="sky-same">değişmez</i></span></div>
          <div class="r-row"><span class="r-l">Toplam kullanılabilir limit</span><span class="r-r">${skyTL(skyAvailTotal())}</span></div>
        </div>
      </div>
      <div class="sky-note">${I.info}<span>Kullandığın krediler ve taksitlerin bu değişiklikten etkilenmez; yalnızca ürünlere ayrılan limitler güncellenir.${freeAfter > 0 ? ' Dağıtılmamış limit Sky Limit\'inde bekler, istediğin zaman bir ürüne verebilirsin.' : ''}</span></div>
    </div>
    <div class="screen-cta">
      <button class="btn-primary" id="sky-approve" data-action="sky-approve">Onayla</button>
      <button class="btn-ghost" data-action="sky-cancel">Vazgeç</button>
    </div>
  </div>`;
}
/* Product row with "Limit" and "Kullanılabilir" lines; showBefore → "eski → yeni" (confirm screen) */
function skyKVRowHTML(p, before, after, showBefore) {
  const u = state.sky.used[p.id], b = before[p.id], a = after[p.id], diff = a - b;
  const val = (x, y) => (showBefore && diff ? `<s>${x.toLocaleString('tr-TR')}</s>${SKY_ICO_ARROW}` : '') + `<b>${skyTL(y)}</b>`;
  const tag = diff ? skyDeltaHTML(diff, 'sm') : (showBefore ? '<span class="sky-kv-same">Değişiklik yok</span>' : '');
  return `<div class="sky-kv ${showBefore && !diff ? 'same' : ''}" style="${skyVars(p)}">
    <span class="sky-ico sm">${p.icon}</span>
    <div class="sky-kv-body">
      <div class="sky-kv-head"><b>${p.name}</b>${tag}</div>
      <div class="sky-kv-line"><span>Limit</span><span>${val(b, a)}</span></div>
      <div class="sky-kv-line"><span>Kullanılabilir</span><span>${val(b - u, a - u)}</span></div>
    </div>
  </div>`;
}
function skyApprove() {
  const btn = document.getElementById('sky-approve');
  if (!btn) return;
  btn.classList.add('sky-busy');
  btn.innerHTML = '<span class="spinner"></span> Onaylanıyor…';
  btn.style.pointerEvents = 'none';
  setTimeout(() => {
    const s = state.sky;
    s.change = { before: { ...s.limits }, after: { ...s.draft }, no: skyTxnNo(), date: skyNow() };
    s.limits = { ...s.draft };
    s.draft = null;
    go('sky-limit-success');
  }, 1300);
}

/* -------------------- Screen 4 — result -------------------- */
function SkySuccess() {
  const s = state.sky, c = s.change;
  if (!c) { state.screen = 'sky-limit'; return SkyHome(); }
  return `
  <div class="screen anim-fade">
    <div class="screen-scroll">
      <div class="success sky-success">
        <div class="success-check"><div class="ring">${I.checkBig}</div></div>
        <h2>Limit dağılımın güncellendi</h2>
        <div class="succ-date">${c.date}</div>
        <p class="sky-succ-sub">Yeni limitlerin hemen kullanıma hazır.</p>
        <div class="sky-card flat">
          <div class="sky-card-h"><span>Yeni limit dağılımı</span></div>
          ${skyBarHTML(c.after, s.used)}
          ${skyKeysHTML(c.after)}
          <div class="sky-prods">${SKY_PRODUCTS.map(p => skyKVRowHTML(p, c.before, c.after, false)).join('')}</div>
        </div>
        <div class="receipt">
          <div class="r-row"><span class="r-l">İşlem No</span><span class="r-r">${c.no}</span></div>
          <div class="r-row"><span class="r-l">İşlem tarihi</span><span class="r-r">${c.date}</span></div>
          <div class="r-row"><span class="r-l">Aktarılan limit</span><span class="r-r">${skyTL(skyMoved(c.before, c.after))}</span></div>
          <div class="r-row"><span class="r-l">Toplam kullanılabilir limit</span><span class="r-r">${skyTL(skyAvailTotal())}</span></div>
        </div>
        <div class="success-actions">
          <button class="btn-primary" data-action="sky-home">Sky Limit'e Dön</button>
          <button class="btn-outline" data-action="go-home">Ana Sayfaya Dön</button>
        </div>
      </div>
    </div>
  </div>`;
}

/* -------------------- Installment payment → limit re-opens -------------------- */
function skyPaySheet() {
  const ni = state.sky.nextInst, p = skyP(ni.product);
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-amount-label">${p.name} · ${ni.dates[ni.i]} taksiti</div>
    <div class="sheet-amount">${fmtTL(ni.amount)}</div>
    <div class="sky-sheet-gain">${I.refresh}<span>Ödemeden sonra <b>${skyTL(ni.amount)}</b> limitin yeniden açılır.</span></div>
    <div class="sheet-pay-row"><span>Ödeme hesabı</span><span class="spr-r">Vadesiz TL Hesabım · 12345678</span></div>
    <button class="sheet-btn" id="sky-pay-btn" data-action="sky-pay-approve">${I.shield} Ödemeyi Onaylıyorum</button>
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function skyPayApprove() {
  const btn = document.getElementById('sky-pay-btn');
  if (!btn) return;
  btn.innerHTML = '<span class="spinner"></span> Ödeme yapılıyor…';
  btn.style.pointerEvents = 'none';
  setTimeout(() => {
    skyApplyPayment();
    closeSheet();
    setTimeout(() => go('sky-limit-payment'), 250);
  }, 1400);
}
function skyApplyPayment() {
  const s = state.sky, ni = s.nextInst, id = ni.product;
  const amt = Math.min(ni.amount, s.used[id]);
  const beforeAvail = skyAvailTotal();
  s.used[id] -= amt;
  s.payment = {
    product: id, amount: amt, inst: ni.dates[ni.i], next: ni.dates[Math.min(ni.i + 1, ni.dates.length - 1)],
    beforeAvail, afterAvail: skyAvailTotal(), no: skyTxnNo(), date: skyNow(),
  };
  s.history.unshift({ product: id, title: `${skyP(id).name} taksiti`, amount: amt, date: 'Bugün' });
  ni.i = Math.min(ni.i + 1, ni.dates.length - 1);
}

/* -------------------- Screen 5 — limit re-opened after payment -------------------- */
function SkyPaid() {
  const s = state.sky, pm = s.payment;
  if (!pm) { state.screen = 'sky-limit'; return SkyHome(); }
  const p = skyP(pm.product);
  return `
  <div class="screen anim-fade">
    <div class="screen-scroll">
      <div class="success sky-success">
        <div class="success-check"><div class="ring">${I.checkBig}</div></div>
        <h2>Taksitin ödendi</h2>
        <div class="succ-date">${p.name} · ${pm.inst} taksiti · ${pm.date}</div>

        <div class="sky-reopen">
          <div class="sky-reopen-l">${SKY_ICO_UNLOCK} Yeniden açılan limit</div>
          <div class="sky-reopen-amt">+${skyTL(pm.amount)}</div>
          <div class="sky-reopen-meter" role="img" aria-label="Kullanılabilir limit ${skyTL(pm.afterAvail)}"><i id="sky-reopen-fill" style="width:${skyPct(pm.beforeAvail, SKY_TOTAL)}%"></i></div>
          <div class="sky-reopen-row">
            <span>Kullanılabilir limit</span>
            <span class="sky-reopen-v"><s>${skyTL(pm.beforeAvail)}</s>${SKY_ICO_ARROW}<b id="sky-count">${skyTL(pm.beforeAvail)}</b></span>
          </div>
        </div>

        <div class="sky-flow">
          <div class="sky-flow-s"><span class="n">1</span><b>Taksit ödendi</b><em>${skyTL(pm.amount)}</em></div>
          <div class="sky-flow-s"><span class="n">2</span><b>Limit açıldı</b><em>+${skyTL(pm.amount)}</em></div>
          <div class="sky-flow-s"><span class="n">3</span><b>Yeniden kullan</b><em>Uygun ürünlerde</em></div>
        </div>

        <div class="sky-card flat">
          <div class="sky-card-h"><span>Bu limiti nerede kullanabilirsin?</span></div>
          <div class="sky-prods">${SKY_PRODUCTS.map(q => skyUseRowHTML(q, pm)).join('')}</div>
          <div class="sky-note in">${I.info}<span>Açılan tutar ${p.name} limitine geri eklendi. Başka bir üründe kullanmak için limit dağılımını değiştirebilirsin.</span></div>
        </div>

        <div class="receipt">
          <div class="r-row"><span class="r-l">Ödenen tutar</span><span class="r-r">${fmtTL(pm.amount)}</span></div>
          <div class="r-row"><span class="r-l">Ödeme hesabı</span><span class="r-r">Vadesiz TL Hesabım</span></div>
          <div class="r-row"><span class="r-l">Sıradaki taksit</span><span class="r-r">${pm.next}</span></div>
          <div class="r-row"><span class="r-l">İşlem No</span><span class="r-r">${pm.no}</span></div>
        </div>
        <div class="success-actions">
          <button class="btn-primary" data-action="sky-manage-after-pay">${I.transfer} Limiti Başka Ürüne Aktar</button>
          <button class="btn-outline" data-action="sky-home">Sky Limit'e Dön</button>
        </div>
      </div>
    </div>
  </div>`;
}
function skyUseRowHTML(q, pm) {
  const s = state.sky, avail = s.limits[q.id] - s.used[q.id], paid = q.id === pm.product;
  const act = paid
    ? `<button class="sky-pill" data-action="toast" data-msg="Kredi kullanımı prototipte aktif değil">Kullan</button>`
    : `<button class="sky-pill ghost" data-action="sky-manage-after-pay">Aktar</button>`;
  return `<div class="sky-res" style="${skyVars(q)}">
    <span class="sky-ico sm">${q.icon}</span>
    <div class="sky-res-mid"><b>${q.name}</b><span>Kullanılabilir ${skyTL(avail)}</span>${paid ? `<em class="sky-opened">+${skyTL(pm.amount)} açıldı</em>` : ''}</div>
    ${act}
  </div>`;
}
function skySetupPaid() {
  const pm = state.sky.payment;
  if (!pm) return;
  const el = document.getElementById('sky-count'), fill = document.getElementById('sky-reopen-fill');
  setTimeout(() => { if (fill) fill.style.width = skyPct(pm.afterAvail, SKY_TOTAL) + '%'; }, 150);
  const from = pm.beforeAvail, to = pm.afterAvail, dur = 900;
  let t0 = null;
  const tick = now => {
    if (!document.body.contains(el)) return;
    if (t0 === null) t0 = now;
    const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
    el.textContent = skyTL(from + (to - from) * e);
    if (k < 1) requestAnimationFrame(tick);
  };
  setTimeout(() => requestAnimationFrame(tick), 250);
}

/* -------------------- navigation helpers -------------------- */
// Drop the flow screens from the back stack so "back" lands where Sky Limit was opened from
function skyUnwind() {
  const i = state.nav.map(f => f.screen).lastIndexOf('sky-limit');
  if (i >= 0) state.nav = state.nav.slice(0, i);
}
function skyGoHome() {
  skyUnwind();
  state.sky.draft = null;
  state.chatSeed = false;
  state.screen = 'sky-limit';
  render();
}
function skyOpenManage(fromFlow) {
  if (fromFlow) {              // from a result screen: back from management should return to Sky Limit home
    skyUnwind();
    state.nav.push({ screen: 'sky-limit', chatSeed: false });
    state.sky.draft = { ...state.sky.limits };
    state.screen = 'sky-limit-manage';
    return render();
  }
  state.sky.draft = { ...state.sky.limits };
  go('sky-limit-manage');
}
function skyCancel() {
  skyGoHome();
  toast('Limit değişikliği iptal edildi');
}
// Deep links (#sky-limit-…) prepare the state they need without replaying the flow
function skyDemoDraft() {      // demo change: move 50.000 TL from İhtiyaç Kredisi to Esnek Hesap (KMH)
  const s = state.sky, d = { ...s.limits };
  const amt = Math.min(50000, d.personal - s.used.personal);
  d.personal -= amt; d.flex += amt;
  return d;
}
function skySeed(h) {
  const s = state.sky;
  if (h === 'sky-limit') s.draft = null;
  if (h === 'sky-limit-manage') s.draft = { ...s.limits };
  if (h === 'sky-limit-confirm' && !skyHasChange()) s.draft = skyDemoDraft();
  if (h === 'sky-limit-success' && !s.change) {
    const after = skyDemoDraft();
    s.change = { before: { ...s.limits }, after, no: skyTxnNo(), date: skyNow() };
    s.limits = { ...after };
    s.draft = null;
  }
  if (h === 'sky-limit-payment' && !s.payment) skyApplyPayment();
}

function render() {
  let html = '';
  switch (state.screen) {
    case 'home': html = HomeScreen(); break;
    case 'springboard': html = SpringboardScreen(); break;
    case 'widgets': html = WidgetGalleryScreen(); break;
    case 'qr-scan': html = QrScanScreen(); break;
    case 'qr-pay': html = QrPayScreen(); break;
    case 'qr-success': html = QrSuccessScreen(); break;
    case 'search': html = SearchScreen(); break;
    case 'chat': html = ChatScreen(); break;
    case 'payment': html = PaymentScreen(); break;
    case 'success': html = SuccessScreen(); break;
    case 'tracking': html = TrackingScreen(); break;
    case 'sections': html = SectionsScreen(); break;
    case 'settings': html = SettingsScreen(); break;
    case 'roundup-apply': html = RoundupApply(); break;
    case 'roundup-jar': html = RoundupJar(); break;
    case 'roundup-history': html = RoundupHistory(); break;
    case 'spendup-apply': html = SpendupApply(); break;
    case 'spendup-jar': html = SpendupJar(); break;
    case 'spendup-history': html = SpendupHistory(); break;
    case 'metal-apply': html = MetalApply(); break;
    case 'metal-jar': html = MetalJar(); break;
    case 'metal-history': html = MetalHistory(); break;
    case 'fayda': html = FaydaHub(); break;
    case 'fayda-journey': html = FaydaJourney(); break;
    case 'fayda-reward': html = FaydaReward(); break;
    case 'fayda-wallet': html = FaydaWallet(); break;
    case 'insights': html = InsightsScreen(); break;
    case 'subs': html = SubsScreen(); break;
    case 'sub-detail': html = SubDetailScreen(); break;
    case 'insights-category': html = InsightsCategoryScreen(); break;
    case 'insights-cats': html = AllCatsScreen(); break;
    case 'limits': html = LimitsScreen(); break;
    case 'kid': html = KidScreen(); break;
    case 'toplu-borc': html = DebtHome(); break;
    case 'toplu-borc-ekstre': html = DebtStatement(); break;
    case 'toplu-borc-odeme': html = DebtPay(); break;
    case 'toplu-borc-onay': html = DebtConfirm(); break;
    case 'toplu-borc-sonuc': html = DebtResult(); break;
    case 'toplu-borc-gecmis': html = DebtHistory(); break;
    case 'erken-maas': html = EwaHome(); break;
    case 'erken-maas-tutar': html = EwaAmount(); break;
    case 'erken-maas-kosullar': html = EwaTerms(); break;
    case 'erken-maas-onay': html = EwaConfirm(); break;
    case 'erken-maas-sonuc': html = EwaResult(); break;
    case 'erken-maas-gecmis': html = EwaHistory(); break;
    case 'arac': html = VmHome(); break;
    case 'arac-liste': html = VmList(); break;
    case 'arac-detay': html = VmDetail(); break;
    case 'arac-on-onay': html = VmPre(); break;
    case 'arac-kredi': html = VmPlan(); break;
    case 'arac-basvuru': html = VmApply(); break;
    case 'arac-kasko': html = VmKasko(); break;
    case 'arac-takip': html = VmTrack(); break;
    case 'konut': html = KnHome(); break;
    case 'konut-liste': html = KnList(); break;
    case 'konut-detay': html = KnDetail(); break;
    case 'konut-kredi': html = KnSim(); break;
    case 'konut-basvuru': html = KnApply(); break;
    case 'konut-takip': html = KnTrack(); break;
    case 'konut-ekspertiz': html = KnEks(); break;
    case 'konut-ipotek': html = KnIpotek(); break;
    case 'konut-tanitim': html = KnIntro(); break;
    case 'konut-tahsis': html = KnTahsis(); break;
    case 'konut-takbis': html = KnTakbis(); break;
    case 'konut-tamam': html = KnDone(); break;
    case 'isletme': html = BfHome(); break;
    case 'isletme-hareketler': html = BfFlows(); break;
    case 'isletme-analiz': html = BfAnalysis(); break;
    case 'isletme-oneriler': html = BfOffers(); break;
    case 'isletme-karsilastir': html = BfCompare(); break;
    case 'isletme-basvuru': html = BfApply(); break;
    case 'isletme-takip': html = BfTrack(); break;
    case 'card-detail': html = CardDetailScreen(); break;
    case 'split': html = SplitHub(); break;
    case 'split-pick': html = SplitPick(); break;
    case 'split-amount': html = SplitAmount(); break;
    case 'split-people': html = SplitPeople(); break;
    case 'split-form': html = SplitForm(); break;
    case 'split-success': html = SplitSuccess(); break;
    case 'split-pay': html = SplitPay(); break;
    case 'reward-goal': html = BkHub(); break;
    case 'reward-goal-new': html = BkNew(); break;
    case 'reward-goal-track': html = BkTrack(); break;
    case 'reward-goal-win': html = BkWin(); break;
    case 'birikim': html = BirikimHub(); break;
    case 'birikim-apply': html = BirikimApply(); break;
    case 'birikim-manage': html = BirikimManage(); break;
    case 'birikim-history': html = BirikimHistory(); break;
    case 'sky-limit': html = SkyHome(); break;
    case 'sky-limit-manage': html = SkyManage(); break;
    case 'sky-limit-confirm': html = SkyConfirm(); break;
    case 'sky-limit-success': html = SkySuccess(); break;
    case 'sky-limit-payment': html = SkyPaid(); break;
    default: html = PlaceholderScreen(state.placeholderTitle || 'Yakında'); break;
  }
  app.innerHTML = html;

  // Ekrana özel kurulum
  if (state.screen === 'search') setupSearch();
  if (state.screen === 'qr-scan') setupQrScan();
  if (state.screen === 'chat') setupChat();
  if (state.screen === 'roundup-jar') setupJar();
  if (state.screen === 'spendup-apply') setupSpendupApply();
  if (state.screen === 'spendup-jar') setupSuJar();
  if (state.screen === 'metal-apply') setupMetalApply();
  if (state.screen === 'metal-jar') setupMetalJar();
  if (state.screen === 'birikim-apply') setupBirikimApply();
  if (state.screen === 'card-detail') setupDcvv();
  if (state.screen === 'sky-limit-manage') skySetupManage();
  if (state.screen === 'sky-limit-payment') skySetupPaid();
  if (state.screen === 'erken-maas-tutar') ewaSetupAmount();
  if (state.screen === 'arac') vmSetupSearch();
  vmHeroSync();   // Marketplace Taşıt hero animation: starts on its screen, stops everywhere else
  if (state.screen === 'arac-detay') vmSetupDetail();
  if (state.screen === 'arac-on-onay') vmSetupPre();
  if (state.screen === 'arac-kredi') vmSetupPlan();
  if (state.screen === 'konut') knSetupSearch();
  if (state.screen === 'konut-detay') knSetupDetail();
  if (state.screen === 'konut-kredi') knSetupSim();
  if (state.screen === 'konut-tahsis') knSetupTahsis();
  if (state.screen === 'konut-takbis') knSetupTakbis();
  knEksAway();   // Marketplace Konut: the ekspertiz result arrives after the customer has left that screen
  bfSeen();      // İşletme Finansmanı: the tracking screen's "fresh" banner is shown once
  if (state.screen === 'split-amount') setTimeout(() => { const i = document.getElementById('spl-amt-input'); i && i.focus(); }, 280);
}

/* İleri navigasyon — mevcut ekranı geri yığınına ekler (gerçek uygulama gibi) */
function go(screen) {
  state.nav.push(curFrame());
  closeDrawer();
  state.chatSeed = false;
  state.screen = screen;
  render();
}
/* O anki ekranın geri-frame'i. Chat'e geri dönülürse tamamlanmış haliyle gelsin. */
function curFrame() {
  return { screen: state.screen, chatSeed: state.screen === 'chat' };
}
/* Geri (back) — yığından bir önceki ekrana dön; boşsa ana sayfa */
function navBack() {
  closeDrawer();
  const f = state.nav.pop();
  if (!f) { state.chatSeed = false; state.screen = 'home'; return render(); }
  state.chatSeed = !!f.chatSeed;
  state.screen = f.screen;
  render();
}
/* Ana sayfaya dön — geri yığınını temizler (taze başlangıç) */
function goHome() {
  state.nav = [];
  state.chatSeed = false;
  closeDrawer();
  state.screen = 'home';
  render();
}

/* ---------- Drawer ---------- */
function openDrawer() {
  drawerEl.innerHTML = DrawerHTML();
  drawerEl.classList.add('open');
  scrimEl.classList.add('open');
}
function closeDrawer() {
  drawerEl.classList.remove('open');
  scrimEl.classList.remove('open');
}

function DrawerHTML() {
  return `
    <div class="drawer-scroll">
      <div class="promo" data-action="toast" data-msg="Otomatik talimat prototipte aktif değil">
        <div class="p-ico">🧾</div>
        <div><div class="p-title">Tek talimat yeter!</div><div class="p-sub">Faturalarını biz takip edelim.</div></div>
        <span class="chev-r">${I.chevR}</span>
      </div>
      ${MENU.map(m => `
        <div class="menu-item ${m.id === 'home' && state.screen === 'home' ? 'active' : ''}" data-action="menu-nav" data-id="${m.id}" data-label="${m.label}">
          ${I[m.icon]}<span>${m.label}</span>
        </div>`).join('')}
    </div>
    <div class="drawer-foot">
      <button class="settings" data-action="route" data-hash="sections">${I.grid} Bölümler</button>
      <button class="settings" data-action="go-settings">${I.gear} Ayarlarım</button>
      <button class="logout" data-action="toast" data-msg="Çıkış prototipte aktif değil">${I.power} Çıkış</button>
    </div>`;
}

/* ---------- Arama kurulumu ---------- */
function setupSearch() {
  const input = document.getElementById('search-input');
  const content = document.getElementById('search-content');
  setTimeout(() => input && input.focus(), 280);
  input.addEventListener('input', () => {
    content.innerHTML = searchResultsFor(input.value);
  });
}

/* ---------- Chat kurulumu ---------- */
function setupChat() {
  const ta = document.getElementById('chat-text');
  if (!ta) return;
  const autosize = () => { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 96) + 'px'; };
  ta.addEventListener('input', autosize);
  ta.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); chatSend(); }
  });
  setTimeout(autosize, 0);

  const scroll = document.getElementById('chat-scroll');

  // Deeplink (#assistant): tüm sohbeti animasyonsuz, anında dolu göster
  if (state.chatSeed) {
    state.chatSeed = false;
    seedChatInstant(scroll);
    return;
  }

  // "Asistanda aç": Setur konuşmasını sonucuyla anında kur
  if (state.seturSeed) {
    state.seturSeed = false;
    seedSeturChat(scroll);
    return;
  }

  // Gün ayracı + açılış mesajı + öneri çipleri (yazma efektiyle)
  const divider = document.createElement('div');
  divider.className = 'day-divider';
  divider.innerHTML = '<span>Bugün</span>';
  scroll.appendChild(divider);
  const gen = startGen();
  setStatus('typing');
  const typing = addTyping(scroll);
  gen.cleanup.push(() => typing.remove());
  setTimeout(() => {
    if (gen.aborted) return;
    typing.remove();
    const bubble = addBotBubble(scroll);
    typeText(bubble, GREET, 14, () => {
      addChips(scroll);
      endGen(gen);
    }, gen);
  }, 650);
}

/* Asistan sohbetini anında dolu kurar (deeplink ile bölüm görüntüleme) */
function seedChatInstant(scroll) {
  const divider = document.createElement('div');
  divider.className = 'day-divider';
  divider.innerHTML = '<span>Bugün</span>';
  scroll.appendChild(divider);
  const setMsg = (txt) => { const b = addBotBubble(scroll); b.classList.remove('typing-caret'); b.textContent = txt; return b; };
  setMsg(GREET);
  addUserMessage(scroll, ASSISTANT_PROMPT);
  setMsg(CHAT_REPLY);
  const wrap = document.createElement('div');
  wrap.className = 'products';
  PRODUCTS.forEach(p => { const h = document.createElement('div'); h.innerHTML = ProductCardHTML(p); wrap.appendChild(h.firstElementChild); });
  scroll.appendChild(wrap);
  const b2 = setMsg(recFollowup());
  addMsgActions(b2);
  scrollChatBottom();
}

/* Öneri çiplerini ekle (yatay kaydırılabilir) */
function addChips(scroll) {
  const chips = document.createElement('div');
  chips.className = 'chip-row anim-in';
  chips.innerHTML = CHIPS.map(c => {
    if (c.key === 'robot') return `<div class="chip" data-action="use-prompt">${c.label}</div>`;
    if (c.key === 'setur') return `<div class="chip" data-action="setur-start">${c.label}</div>`;
    return `<div class="chip" data-action="chip-other" data-key="${c.key}">${c.label}</div>`;
  }).join('');
  scroll.appendChild(chips);
  scrollChatBottom();
}

function scrollChatBottom() {
  const s = document.getElementById('chat-scroll');
  if (s) s.scrollTop = s.scrollHeight;
}

/* ---------- Üretim (generation) yaşam döngüsü ----------
   Gerçek LLM arayüzleri gibi: üretim sürerken gönder butonu
   "durdur"a dönüşür; durdurunca yazılan kısım yarım kalır. */
let activeGen = null;

function setSendMode(mode) {
  const btn = document.getElementById('send-btn');
  if (!btn) return;
  if (mode === 'stop') {
    btn.dataset.action = 'chat-stop';
    btn.classList.add('stop');
    btn.innerHTML = I.stop;
    btn.disabled = false;
  } else {
    btn.dataset.action = 'chat-send';
    btn.classList.remove('stop');
    btn.innerHTML = I.send;
    btn.disabled = false;
  }
}

function startGen() {
  const gen = { aborted: false, cleanup: [] };
  activeGen = gen;
  const ta = document.getElementById('chat-text');
  if (ta) ta.disabled = true;
  setSendMode('stop');
  return gen;
}

function endGen(gen) {
  if (activeGen === gen) activeGen = null;
  const ta = document.getElementById('chat-text');
  if (ta) ta.disabled = false;
  setSendMode('send');
  setStatus('idle');
}

function abortGen() {
  const gen = activeGen;
  if (!gen) return;
  gen.aborted = true;
  gen.cleanup.forEach(fn => { try { fn(); } catch (e) { /* yoksay */ } });
  endGen(gen);
  scrollChatBottom();
}

function nowTime() {
  const d = new Date();
  return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
}

/* Başlık durumu: gerçek LLM arayüzleri gibi — "çevrimiçi" yok,
   boştayken nötr açıklama, çalışırken "düşünüyor / yanıt yazıyor" */
function setStatus(mode) {
  const el = document.getElementById('chat-status');
  if (!el) return;
  if (mode === 'typing') {
    el.innerHTML = `<span class="typing-mini"><i></i><i></i><i></i></span> yanıt yazıyor…`;
  } else if (mode === 'thinking') {
    el.innerHTML = `<span class="typing-mini"><i></i><i></i><i></i></span> düşünüyor…`;
  } else {
    el.innerHTML = `Yapay zeka destekli`;
  }
}

/* Kullanıcı mesaj satırı */
function addUserMessage(scroll, text) {
  const row = document.createElement('div');
  row.className = 'msg-row user anim-in';
  row.innerHTML = `<div class="msg-col"><div class="msg user"></div><div class="msg-time">${nowTime()}</div></div>`;
  row.querySelector('.msg.user').textContent = text;
  scroll.appendChild(row);
  scrollChatBottom();
}

/* Bot mesaj balonu (boş) döndürür; içine typeText ile yazılır */
function addBotBubble(scroll) {
  const row = document.createElement('div');
  row.className = 'msg-row bot anim-in';
  row.innerHTML = `<div class="bot-avatar">${I.spark}</div><div class="msg-col"><div class="msg bot typing-caret"></div><div class="msg-time">${nowTime()}</div></div>`;
  scroll.appendChild(row);
  scrollChatBottom();
  return row.querySelector('.msg.bot');
}

/* Yazıyor göstergesi (üç nokta balonu) */
function addTyping(scroll) {
  const row = document.createElement('div');
  row.className = 'msg-row bot anim-in';
  row.innerHTML = `<div class="bot-avatar">${I.spark}</div><div class="msg bot typing-bubble"><i></i><i></i><i></i></div>`;
  scroll.appendChild(row);
  scrollChatBottom();
  return row;
}

/* Düşünme göstergesi — ChatGPT/Claude tarzı: tek satır shimmer metin,
   adımlar arasında yumuşak geçiş yapar, cevap gelince sohbetten kaybolur.
   Süreler kasıtlı olarak eşit değil: analiz ve katalog taraması daha uzun. */
const THINK_STEPS = [
  { t: 'Düşünüyor…', d: 450 },
  { t: 'İhtiyacın analiz ediliyor…', d: 1050 },
  { t: 'Koçtaş kataloğu taranıyor…', d: 1250 },
  { t: 'World kampanyaları kontrol ediliyor…', d: 650 },
];
function addThinking(scroll) {
  const row = document.createElement('div');
  row.className = 'msg-row bot anim-in';
  row.innerHTML = `<div class="bot-avatar">${I.spark}</div><div class="think-line"><span class="shimmer"></span></div>`;
  scroll.appendChild(row);
  scrollChatBottom();
  return row;
}
function runThinking(row, done, gen, steps) {
  const S = steps || THINK_STEPS;
  const el = row.querySelector('.shimmer');
  let i = 0;
  const next = () => {
    if (gen && gen.aborted) return;
    if (i >= S.length) {
      // iz bırakmadan kaybol
      row.classList.add('fade-out');
      setTimeout(() => { row.remove(); if (done) done(); }, 240);
      return;
    }
    el.classList.remove('step-in');
    void el.offsetWidth; // animasyonu yeniden tetikle
    el.textContent = S[i].t;
    el.classList.add('step-in');
    scrollChatBottom();
    const wait = S[i].d + Math.random() * 200;
    i++;
    setTimeout(next, wait);
  };
  next();
}

/* AI metin akışı — gerçek LLM gibi KELİME KELİME stream eder (tek tek harf değil).
   gen verilirse durdurulunca yarım bırakır. */
function typeText(el, text, speed, done, gen) {
  el.classList.add('typing-caret');
  const tokens = text.match(/\S+\s*/g) || [text];
  let i = 0;
  const tick = () => {
    if (gen && gen.aborted) { el.classList.remove('typing-caret'); return; }
    el.textContent = tokens.slice(0, i).join('');
    scrollChatBottom();
    if (i++ < tokens.length) {
      // kelime başına ~34–82ms; arada çift kelimelik küçük sıçramalar (token hissi)
      setTimeout(tick, 34 + Math.random() * 48);
    } else {
      el.classList.remove('typing-caret');
      if (done) done();
    }
  };
  tick();
}

/* Bot mesajı altına aksiyon ikonları: kopyala + 👍/👎 (gerçek LLM arayüzleri gibi) */
function addMsgActions(bubble) {
  const col = bubble.closest('.msg-col');
  if (!col) return;
  const div = document.createElement('div');
  div.className = 'msg-actions anim-in';
  div.innerHTML = `
    <button class="ma-btn" data-action="msg-copy" aria-label="Kopyala">${I.copy}</button>
    <button class="ma-btn" data-action="msg-like" aria-label="Beğen">${I.thumbUp}</button>
    <button class="ma-btn" data-action="msg-dislike" aria-label="Beğenme">${I.thumbDown}</button>`;
  col.appendChild(div);
  scrollChatBottom();
}

/* Kullanıcı mesajını giriş kutusuna sanki elle yazıyormuş gibi harf harf yazar,
   sonra verilen gönderme fonksiyonunu çağırır (insan yazışı hissi). */
function typeInInput(text, onSend) {
  const ta = document.getElementById('chat-text');
  if (!ta) return;
  document.querySelectorAll('.chip-row').forEach(c => c.remove());
  ta.disabled = false;
  let i = 0;
  const type = () => {
    ta.value = text.slice(0, i);
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 96) + 'px';
    scrollChatBottom();
    if (i++ < text.length) {
      setTimeout(type, 24 + Math.random() * 22);
    } else {
      setTimeout(onSend, 430);
    }
  };
  type();
}

/* ---------- Chat akışı ---------- */
function chatSend() {
  const ta = document.getElementById('chat-text');
  const scroll = document.getElementById('chat-scroll');
  const text = (ta.value || '').trim();
  if (!text || ta.disabled) return;

  addUserMessage(scroll, text);
  ta.value = '';
  ta.style.height = 'auto';
  scroll.querySelectorAll('.chip-row').forEach(c => c.remove());

  const gen = startGen();

  // 1) shimmer'lı düşünme satırı (adım adım metin değiştirir, sonra kaybolur)
  setStatus('thinking');
  const think = addThinking(scroll);
  gen.cleanup.push(() => { if (think.isConnected) think.remove(); });

  // 2) düşünme bitince cevap (daktilo) + ürün kartları + takip mesajı
  runThinking(think, () => {
    if (gen.aborted) return;
    setStatus('typing');
    const bubble = addBotBubble(scroll);
    const reply = CHAT_REPLY;
    typeText(bubble, reply, 14, () => {
      if (gen.aborted) return;
      showProductCards(scroll, () => {
        if (gen.aborted) return;
        // 3) kısa gerekçeli takip mesajı — neden önerdi + fiyat + Worldpuan hediyesi
        setTimeout(() => {
          if (gen.aborted) return;
          const b2 = addBotBubble(scroll);
          const followup = recFollowup();
          typeText(b2, followup, 14, () => {
            addMsgActions(b2);
            endGen(gen);
          }, gen);
        }, 700);
      }, gen);
    }, gen);
  }, gen);
}

/* Henüz hazır olmayan akışlar için çip cevabı (Setur, Boyner, Opet) */
function chipOtherFlow(key) {
  const flow = CHIP_FLOWS[key];
  if (!flow) return;
  const scroll = document.getElementById('chat-scroll');
  scroll.querySelectorAll('.chip-row').forEach(c => c.remove());
  addUserMessage(scroll, flow.user);

  const gen = startGen();
  setStatus('typing');
  const typing = addTyping(scroll);
  gen.cleanup.push(() => typing.remove());
  setTimeout(() => {
    if (gen.aborted) return;
    typing.remove();
    const bubble = addBotBubble(scroll);
    typeText(bubble, flow.reply, 14, () => {
      addMsgActions(bubble);
      addChips(scroll);
      endGen(gen);
    }, gen);
  }, 900);
}

/* ===================================================================
   OTONOM SETUR AKIŞI — yetki ver → arka planda ara → bildirim → son onay
   =================================================================== */

/* Yetki çerçevesi kartı (chat içinde) — agent neyi, hangi sınırlarla yapacak */
function SeturAuthCardHTML() {
  const a = SETUR_AUTH;
  return `
  <div class="auth-card anim-in" id="setur-auth">
    <div class="auth-head">
      <span class="auth-ico"><img src="assets/mandate.png" alt=""></span>
      <div>
        <div class="auth-title">Agent'a yetki ver</div>
        <div class="auth-sub">Setur · senin adına otonom arama</div>
      </div>
    </div>
    <div class="auth-grid">
      <div class="auth-row"><span>Tarih</span><b>${a.dates} · ${a.nights} gece</b></div>
      <div class="auth-row"><span>Kişi</span><b>${a.guests}</b></div>
      <div class="auth-row"><span>Bölge</span><b>${a.region}</b></div>
      <div class="auth-row"><span>Bütçe</span><b>En çok ${fmtTL(a.budget)}</b></div>
      <div class="auth-row"><span>Kriter</span><b>${a.criteria.join(' · ')}</b></div>
      <div class="auth-row"><span>Ödeme</span><b class="auth-pay">${I.spark} En avantajlısını agent seçer</b></div>
      <div class="auth-row"><span>Kart havuzu</span><b>${a.cardPool} · en çok ${a.maxInst} taksit</b></div>
    </div>
    <div class="auth-rule">${I.lock} ${a.rule}</div>
    <button class="auth-btn" data-action="setur-grant">${I.shield} Yetki ver ve aramaya başla</button>
    <button class="auth-edit" data-action="toast" data-msg="Bu prototipte kriterler sabittir">Kriterleri düzenle</button>
  </div>`;
}

/* Tatil seçeneği kartı (chat içinde) — son onay butonlarıyla */
function SeturHotelCardHTML() {
  const h = seturHotel();
  return `
  <div class="hotel-card anim-in" id="setur-hotel">
    <div class="hotel-img">
      ${h.img ? imgOrFallback(h.img, h.emoji, 'hotel-photo') : `<span class="img-fallback" style="display:grid">${h.emoji}</span>`}
      <span class="tag world">Setur · World'e Özel</span>
      <span class="tag stock ok">${I.check} Uygun</span>
    </div>
    <div class="hotel-body">
      <div class="hotel-name">${h.name}</div>
      <div class="hotel-loc">${I.pin} ${h.loc}</div>
      <div class="hotel-rating">★ ${h.rating} <span>(${h.reviews} değerlendirme)</span></div>
      <div class="hotel-tags">
        <span class="htag">${SETUR_AUTH.dates}</span>
        <span class="htag">${h.nights} gece</span>
        <span class="htag">Havuz</span>
        <span class="htag">${h.view}</span>
        <span class="htag">${h.board}</span>
      </div>
      <div class="hotel-old">${h.old} TL</div>
      <div class="hotel-price">${fmtTL(h.priceNum)} <span>/ ${h.nights} gece, 2 kişi</span></div>
      <div class="hotel-meta">
        <span class="mtag inst">${I.card} ${h.inst}</span>
        <span class="mtag puan"><img src="assets/world.webp" class="puan-logo" alt="World"> ${h.puan}</span>
      </div>
      <div class="hotel-cancel">${I.check} ${h.cancel}</div>
      <button class="hotel-buy" data-action="setur-approve">${I.shield} Onayla ve rezerve et</button>
      <button class="hotel-alt" data-action="setur-swap">Başka seçenek göster</button>
    </div>
  </div>`;
}

/* 1) Setur çipi → talebi kullanıcı yazıyormuş gibi giriş kutusuna yaz, sonra gönder */
function seturStart() {
  state.seturAuthorized = false;
  state.seturOptionIdx = 0;
  typeInInput(SETUR_REQUEST, seturSend);
}
function seturSend() {
  const ta = document.getElementById('chat-text');
  const scroll = document.getElementById('chat-scroll');
  if (ta) { ta.value = ''; ta.style.height = 'auto'; }
  addUserMessage(scroll, SETUR_REQUEST);

  const gen = startGen();
  setStatus('thinking');
  const think = addThinking(scroll);
  gen.cleanup.push(() => { if (think.isConnected) think.remove(); });
  runThinking(think, () => {
    if (gen.aborted) return;
    setStatus('typing');
    const bubble = addBotBubble(scroll);
    const reply = 'Tabii, bunu senin için ben halledebilirim. 🏖️ Setur üzerinden, tarif ettiğin kriterlere uyan otelleri tarayıp en uygun fiyatı yakalayabilirim. Önce bana bu işi şu sınırlarla devretmeni rica edeyim — onaylarsan arka planda aramaya başlarım:';
    typeText(bubble, reply, 14, () => {
      if (gen.aborted) return;
      const holder = document.createElement('div');
      holder.innerHTML = SeturAuthCardHTML();
      scroll.appendChild(holder.firstElementChild);
      scrollChatBottom();
      endGen(gen);
    }, gen);
  }, gen, SETUR_THINK);
}

/* 2) Yetki verildi → agent arka planda aramaya başlar, sonra bildirim düşer */
function seturGrant() {
  if (state.seturAuthorized) return;
  state.seturAuthorized = true;
  const scroll = document.getElementById('chat-scroll');

  // Yetki kartını "verildi" durumuna kilitle
  const card = document.getElementById('setur-auth');
  if (card) {
    const btn = card.querySelector('.auth-btn');
    if (btn) { btn.innerHTML = `${I.check} Yetki verildi`; btn.classList.add('done'); btn.removeAttribute('data-action'); }
    const edit = card.querySelector('.auth-edit');
    if (edit) edit.remove();
    card.classList.add('granted');
  }

  const gen = startGen();
  setStatus('typing');
  const typing = addTyping(scroll);
  gen.cleanup.push(() => typing.remove());
  setTimeout(() => {
    if (gen.aborted) return;
    typing.remove();
    const bubble = addBotBubble(scroll);
    const reply = `Teşekkürler, yetkini aldım ✅ Kriterlerini not ettim; ödemede de kartların arasından en avantajlısını (en yüksek Worldpuan + uygun taksit) senin için ben seçeceğim. Setur’da uygun otelleri tarıyorum; birkaç saat içinde en iyi fiyatı yakaladığımda bildirim göndereceğim. Uygulamayı kapatabilirsin, ben arka planda devam ederim.`;
    typeText(bubble, reply, 14, () => {
      // Arıyor durum kartı
      const s = document.createElement('div');
      s.className = 'setur-search anim-in';
      s.id = 'setur-search';
      s.innerHTML = `<span class="ss-spin"></span><div><div class="ss-t">Setur taranıyor…</div><div class="ss-d">320+ otel, 18 bölge · uygun fiyat bekleniyor</div></div>`;
      scroll.appendChild(s);
      scrollChatBottom();
      endGen(gen);

      // Kullanıcı uygulamadan çıkmış gibi: birkaç saniye sonra kilit ekranına geç
      setTimeout(goToLockScreen, 2200);
    }, gen);
  }, 900);
}

/* Kilit ekranı — "uygulamadan çıktık" hissi. Saat 5 dakika ileriye akar,
   sonra push bildirimi düşer (zaman geçtiğini görsel olarak anlatır). */
function fmtClock(mins) {
  mins = ((Math.round(mins) % 1440) + 1440) % 1440;
  return String(Math.floor(mins / 60)).padStart(2, '0') + ':' + String(mins % 60).padStart(2, '0');
}
function goToLockScreen() {
  const d = new Date();
  const dateStr = d.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' });
  const startMin = d.getHours() * 60 + d.getMinutes();
  const targetMin = startMin + 5;                // 5 dakika sonrası
  lockEl.innerHTML = `
    <div class="lock-top">
      <div class="lock-lockico">${I.lock}</div>
      <div class="lock-date">${dateStr.charAt(0).toUpperCase() + dateStr.slice(1)}</div>
      <div class="lock-time spinning" id="lock-time">${fmtClock(startMin)}</div>
      <div class="lock-elapsed" id="lock-elapsed"></div>
    </div>
    <div class="lock-notif-slot" id="lock-notif-slot"></div>
    <div class="lock-bottom"><div class="lock-bar"></div></div>`;
  lockEl.classList.add('show');
  // Saat akışı: 1 sn dur, sonra ~3.4 sn boyunca 5 dakika ileri sar
  setTimeout(() => animateClock(startMin, targetMin, 3400, () => {
    const el = document.getElementById('lock-elapsed');
    if (el) { el.textContent = '⏳ 5 dakika sonra'; el.classList.add('show'); }
    setTimeout(fireSeturNotification, 750);
  }), 1000);
}
function animateClock(from, to, dur, done) {
  const start = performance.now();
  const step = (t) => {
    if (!lockEl.classList.contains('show')) return;   // kilit kapandıysa dur
    const p = Math.min((t - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);             // ease-out (hızlı başlar, yavaşlar)
    const el = document.getElementById('lock-time');
    if (el) el.textContent = fmtClock(from + (to - from) * eased);
    if (p < 1) { requestAnimationFrame(step); }
    else {
      const e = document.getElementById('lock-time');
      if (e) { e.textContent = fmtClock(to); e.classList.remove('spinning'); e.classList.add('settle'); }
      if (done) done();
    }
  };
  requestAnimationFrame(step);
}
function dismissLockScreen() { lockEl.classList.remove('show'); }

/* 3) Push bildirimi — kilit ekranına düşer (kullanıcı uygulamada değilken) */
function fireSeturNotification() {
  const h = seturHotel();
  const slot = document.getElementById('lock-notif-slot');
  if (!slot) return;
  slot.innerHTML = `
    <div class="notif-card pop-in" data-action="notif-open">
      <div class="notif-app"><img src="assets/yk-app-icon.jpg" class="notif-appicon" alt=""><span>Yapı Kredi Asistanı</span><span class="notif-time">şimdi</span></div>
      <div class="notif-title">Sana uygun bir tatil buldum 🏖️</div>
      <div class="notif-body">${h.loc.split('·')[0].trim()} · ${h.nights} gece — ${fmtTL(h.priceNum)}. Aç ve onayla, rezerve edeyim.</div>
      <div class="notif-hint">Detay ve onay için dokun ›</div>
    </div>`;
}

/* 4) Bildirime dokunuldu → uygulama ANA SAYFASINA dön ve ödeme onay popup'ını çıkar.
   Kullanıcı buradan direkt rezerve edebilir ya da "Asistanda aç" ile sohbete geçebilir. */
function seturOpenResult() {
  dismissLockScreen();
  const search = document.getElementById('setur-search');
  if (search) search.remove();
  state.nav = [];                       // temiz dön: ana sayfadayız
  state.screen = 'home';
  render();
  setTimeout(openSeturOfferPopup, 460); // ana sayfa görünür, sonra popup
}

/* Ana sayfada / sohbette açılan teklif + ödeme onay popup'ı */
function openSeturOfferPopup() {
  const h = seturHotel();
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="offer-head">
      <span class="offer-ai">${I.spark}</span>
      <div><div class="offer-t">Yapı Kredi Asistanı</div><div class="offer-s">Senin için bir tatil buldu 🏖️</div></div>
    </div>
    <div class="offer-match">${I.spark} Kriterlerinle <b>%${SETUR_AUTH.match} uyumlu</b> · 320 otel içindeki en iyi eşleşme</div>
    <div class="offer-hotel">
      <div class="offer-thumb">${h.img ? `<img src="${h.img}" class="offer-thumb-img" alt="">` : h.emoji}</div>
      <div class="offer-hinfo">
        <div class="offer-name">${h.name}</div>
        <div class="offer-loc">${I.pin} ${h.loc}</div>
        <div class="offer-feat">${SETUR_AUTH.dates} · ${h.nights} gece · ${SETUR_AUTH.guests}</div>
        <div class="offer-feat sub">Havuz · ${h.view} · ${h.board}</div>
      </div>
    </div>
    <div class="sheet-amount-label">Rezervasyon tutarı</div>
    <div class="sheet-amount">${fmtTL(h.priceNum)}</div>
    <div class="sheet-disc">${I.check} ${h.cancel}</div>
    <div class="offer-paynote"><img src="assets/mandate.png" class="paynote-ico" alt=""> Agent'ın senin yetkinle seçtiği ödeme</div>
    <div class="sheet-pay-row"><span>${I.card} ${SETUR_AUTH.card}</span><span class="spr-r">${SETUR_AUTH.inst}</span></div>
    <div class="offer-paywhy">${SETUR_AUTH.cardWhy}</div>
    <button class="sheet-btn" id="setur-confirm-btn" data-action="setur-book">${I.shield} Onayla ve rezerve et</button>
    <button class="sheet-btn ghost" data-action="setur-open-chat">Asistanda aç</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}

/* "Asistanda aç" → sohbete geç, Setur konuşmasını sonucuyla hazır göster */
function seturOpenChat() {
  closeSheet();
  state.seturSeed = true;
  go('chat');   // mevcut ekran (ana sayfa) geri yığınına eklenir
}

/* Sohbet kartındaki "Onayla ve rezerve et" → aynı onay popup'ını aç */
function openSeturConfirm() { openSeturOfferPopup(); }

function renderSeturHotel(scroll) {
  const old = document.getElementById('setur-hotel');
  const holder = document.createElement('div');
  holder.innerHTML = SeturHotelCardHTML();
  const card = holder.firstElementChild;
  if (old) { old.replaceWith(card); } else { scroll.appendChild(card); }
  scrollChatBottom();
}

/* "Başka seçenek göster" → alternatif oteli yerinde göster (sohbette) */
function seturSwap() {
  state.seturOptionIdx = (state.seturOptionIdx + 1) % SETUR_HOTELS.length;
  const scroll = document.getElementById('chat-scroll');
  if (scroll) renderSeturHotel(scroll);
  toast('Alternatif seçenek getirildi');
}

/* Onayla → rezervasyonu yap, popup'ı başarı durumuna çevir (her ekranda çalışır) */
function seturBook() {
  const btn = document.getElementById('setur-confirm-btn');
  if (btn) { btn.innerHTML = `<span class="spinner"></span> Rezervasyon yapılıyor…`; btn.style.pointerEvents = 'none'; }
  const h = seturHotel();
  // Sohbetteki otonom kart varsa pasifleştir
  const card = document.getElementById('setur-hotel');
  if (card) card.classList.add('booked');
  setTimeout(() => {
    sheetEl.innerHTML = `
      <div class="sheet-handle"></div>
      <div class="bd-check">${I.checkBig}</div>
      <div class="bd-title" style="text-align:center">Rezervasyonun tamam!</div>
      <div class="bd-sub" style="text-align:center">${h.name}</div>
      <div class="bd-rows">
        <div><span>Tarih</span><b>${SETUR_AUTH.dates} · ${h.nights} gece</b></div>
        <div><span>Tutar</span><b>${fmtTL(h.priceNum)} · ${SETUR_AUTH.inst}</b></div>
        <div><span>Ödeme</span><b>${SETUR_AUTH.card}</b></div>
        <div><span>İptal</span><b>${h.cancel}</b></div>
        <div><span>Onay No</span><b>STR${String(Math.floor(100000 + Math.random() * 899999))}</b></div>
      </div>
      <div class="bd-note" style="text-align:center">Rezervasyon belgen e-posta ve uygulama bildirimlerine gönderildi.</div>
      <button class="sheet-btn" data-action="close-sheet">Tamam</button>`;
    toast('Setur rezervasyonu onaylandı 🏖️');
  }, 1500);
}

/* "Asistanda aç" yolundan gelindiğinde sohbeti sonucuyla anında kurar */
function seedSeturChat(scroll) {
  const divider = document.createElement('div');
  divider.className = 'day-divider';
  divider.innerHTML = '<span>Bugün</span>';
  scroll.appendChild(divider);
  const setMsg = (txt) => { const b = addBotBubble(scroll); b.classList.remove('typing-caret'); b.textContent = txt; return b; };

  addUserMessage(scroll, SETUR_REQUEST);
  setMsg('Tabii, bunu senin için ben halledebilirim. 🏖️ Setur üzerinden kriterlerine uyan otelleri tarayıp en uygun fiyatı yakaladım. İşte sana uygun seçenek 👇 Onaylarsan rezerve ediyorum.');
  renderSeturHotel(scroll);
  scrollChatBottom();
}

/* Asistanın önerdiği ürün */
const REC_ID = 'p1'; // Fakir Robert RS 700

/* Ürün kartlarını sırayla göster */
function showProductCards(scroll, done, gen) {
  const wrap = document.createElement('div');
  wrap.className = 'products';
  scroll.appendChild(wrap);
  const items = PRODUCTS.map(p => ProductCardHTML(p));
  let idx = 0;
  const addOne = () => {
    if (gen && gen.aborted) return;
    if (idx >= items.length) { if (done) done(); return; }
    const holder = document.createElement('div');
    holder.innerHTML = items[idx];
    const card = holder.firstElementChild;
    card.classList.add('anim-in');
    wrap.appendChild(card);
    scrollChatBottom();
    idx++;
    setTimeout(addOne, 280);
  };
  addOne();
}

/* ---------- Ödeme akışı ---------- */
function selectMethod(method, el) {
  state.payMethod = method;
  document.querySelectorAll('.method').forEach(m => m.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('inst-box').classList.toggle('show', method === 'worldcard');
  document.getElementById('bank-box').classList.toggle('show', method === 'bank');
  updatePayState();
}

function selectInst(id, el) {
  state.installment = id;
  document.querySelectorAll('.inst-opt').forEach(o => o.classList.remove('active'));
  el.classList.add('active');
}

/* Öde butonu: yöntem seçili VE her iki yasal onay verilmişse aktif olur */
function updatePayState() {
  const btn = document.getElementById('pay-btn');
  if (!btn) return;
  btn.disabled = !(state.payMethod && state.preInfoOk && state.contractOk);
}

/* Sözleşme/ön bilgilendirme onay kutucukları */
function toggleContract(key, el) {
  state[key] = !state[key];
  el.classList.toggle('on', state[key]);
  updatePayState();
}
function toggleBilling(el) {
  state.billingSame = !state.billingSame;
  el.classList.toggle('on', state.billingSame);
}

/* Worldpuan ile öde — tutarı ve finansal özeti günceller */
function togglePuan() {
  state.usePuan = !state.usePuan;
  replaceById('fin-box', FinanceBoxHTML());
  // Banka kutusunu da tazele ama açık/kapalı (show) durumunu koru
  const bb = document.getElementById('bank-box');
  if (bb) {
    const shown = bb.classList.contains('show');
    replaceById('bank-box', BankBoxHTML());
    if (shown) document.getElementById('bank-box').classList.add('show');
  }
  const amt = document.getElementById('pay-amt');
  if (amt) amt.textContent = payableStr();
}
/* Bir elemanı id'siyle, verilen HTML'in ilk elemanıyla değiştirir */
function replaceById(id, html) {
  const old = document.getElementById(id);
  if (!old) return;
  const tmp = document.createElement('div');
  tmp.innerHTML = html.trim();
  old.replaceWith(tmp.firstElementChild);
}

/* Adres kartını yerinde tazele (tüm ekranı render etmeden — yöntem seçimi korunur) */
function refreshAddressCard() {
  const old = document.getElementById('addr-card');
  if (!old) return;
  const tmp = document.createElement('div');
  tmp.innerHTML = AddressCardHTML().trim();
  old.replaceWith(tmp.firstElementChild);
}

/* "Adres Seçiniz" sheet'i — radio'lu adres kartları + yeni adres ekle */
let tmpAddressId = null;
function openAddressSheet() {
  tmpAddressId = state.addressId;
  const cards = ADDRESSES.map(a => `
    <div class="addr-pick ${a.id === tmpAddressId ? 'sel' : ''}" data-action="pick-address" data-id="${a.id}">
      <span class="ap-radio"></span>
      <div class="ap-info">
        <div class="ap-title">${a.title}</div>
        <div class="ap-line">${a.name} · ${a.line}</div>
        <div class="ap-city">${a.city}</div>
      </div>
    </div>`).join('');
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>Adres Seçiniz</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="addr-list">
      ${cards}
      <div class="addr-add" data-action="toast" data-msg="Yeni adres ekleme prototipte aktif değil">
        <span class="aa-plus">${I.plus}</span><span>Yeni Adres Ekle</span>
      </div>
    </div>
    <button class="sheet-btn" data-action="confirm-address">Adresi Seç</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function pickAddress(id) {
  tmpAddressId = id;
  document.querySelectorAll('.addr-pick').forEach(c => c.classList.toggle('sel', c.dataset.id === id));
}
function confirmAddress() {
  state.addressId = tmpAddressId || state.addressId;
  refreshAddressCard();
  closeSheet();
}

/* Yasal metin sheet'i — ön bilgilendirme formu / mesafeli satış sözleşmesi */
function openLegalSheet(kind) {
  const a = getAddress();
  const p = state.selectedProduct;
  const title = kind === 'preinfo' ? 'Ön Bilgilendirme Formu' : 'Mesafeli Satış Sözleşmesi';
  const intro = kind === 'preinfo'
    ? 'İşbu form, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği uyarınca, siparişinizi onaylamadan önce sizi bilgilendirmek amacıyla hazırlanmıştır.'
    : 'İşbu sözleşme, aşağıda bilgileri yer alan ALICI ile SATICI arasında, ALICI tarafından elektronik ortamda verilen siparişe ilişkin olarak kurulmuştur.';
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-bar"><h3>${title}</h3><button class="sheet-x" data-action="close-sheet">${I.close}</button></div>
    <div class="legal-scroll">
      <p>${intro}</p>
      <h4>1. Taraflar</h4>
      <p><b>SATICI:</b> World Pay üye iş yeri — ${p.store}<br><b>ALICI:</b> ${a.name}<br>${a.line}, ${a.city}<br>${a.phone}</p>
      <h4>2. Sözleşme Konusu Ürün</h4>
      <p>${p.name}<br>Satış bedeli (KDV dahil): <b>${p.price}</b><br>Ödeme şekli: ${state.payMethod === 'bank' ? 'Vadesiz TL Hesabı · Tek Çekim' : 'Worldcard · ' + instLabel()}<br>Teslimat: Adresinize kargo ile, ortalama 2-4 iş günü.</p>
      <h4>3. Cayma Hakkı</h4>
      <p>ALICI, malın teslim tarihinden itibaren 14 (on dört) gün içinde herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin sözleşmeden cayma hakkına sahiptir. Cayma hakkının kullanıldığına dair bildirimin bu süre içinde SATICI'ya yöneltilmesi yeterlidir.</p>
      <h4>4. Genel Hükümler</h4>
      <p>ALICI, sözleşme konusu ürünün temel nitelikleri, satış fiyatı ve ödeme şekli ile teslimata ilişkin tüm ön bilgileri okuyup bilgi sahibi olduğunu ve elektronik ortamda gerekli teyidi verdiğini kabul, beyan ve taahhüt eder. Bu belge prototip amaçlı örnek bir metindir.</p>
    </div>
    <button class="sheet-btn ghost" data-action="close-sheet">Kapat</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}

/* Onay sheet'i: güvenli alandayız, Face ID yok — bu ikinci dokunuş
   müşterinin ödemeyi bilinçli onayladığını netleştiren son adım. */
function openConfirmSheet() {
  const p = state.selectedProduct;
  const methodLbl = state.payMethod === 'bank'
    ? `Vadesiz TL Hesabım · Tek Çekim`
    : `Worldcard **** 3333 · ${instLabel()}`;
  sheetEl.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-amount-label">Ödenecek tutar</div>
    <div class="sheet-amount">${payableStr()}</div>
    ${state.usePuan ? `<div class="sheet-disc">${fmtTL(puanDiscount())} Worldpuan indirimi uygulandı</div>` : ''}
    <div class="sheet-pay-row"><span>${p.store} · World Pay</span><span class="spr-r">${methodLbl}</span></div>
    <button class="sheet-btn" id="approve-btn" data-action="approve">${I.shield} Ödemeyi Onaylıyorum</button>
    <button class="sheet-btn ghost" data-action="close-sheet">Vazgeç</button>`;
  sheetEl.classList.add('open');
  sheetScrimEl.classList.add('open');
}
function closeSheet() {
  sheetEl.classList.remove('open');
  sheetScrimEl.classList.remove('open');
  mbRuleOpen = false;   // maden "Kuralı değiştir" bağlamını sıfırla
}
function approvePayment() {
  const btn = document.getElementById('approve-btn');
  btn.innerHTML = `<span class="spinner"></span> Ödeme Onaylanıyor…`;
  btn.style.pointerEvents = 'none';
  // Sipariş kaydı oluştur — başarı ve takip ekranları aynı numarayı paylaşır
  state.lastOrder = {
    no: 'YKM' + String(Math.floor(100000000 + Math.random() * 900000000)),
    date: new Date(),
    productId: state.selectedProduct.id,
    addressId: state.addressId,
    payable: payableStr(),
    bank: state.payMethod === 'bank',
    inst: instLabel(),
    cargo: 'YK Kargo',
    track: 'YK' + String(Math.floor(100000000000 + Math.random() * 899999999999)),
  };
  // Yuvarla Biriktir aktifse (ve duraklatılmadıysa) kartla ödemede farkı kumbaraya at
  const r = state.roundup;
  if (r.active && state.payMethod !== 'bank') {
    const add = ruNextUnit(payableNum(), RU_UNIT) - payableNum();
    if (add > 0) {
      const now = new Date();
      const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      r.txns.unshift({
        merchant: `${state.selectedProduct.store} · World Pay`, emoji: '🛍️',
        spent: payableNum(), add, date: `25 Mayıs ${hhmm}`, month: RU_CUR_MONTH,
      });
      r.jar = Math.round((r.jar + add) * 100) / 100;
      state.lastOrder.ruAdd = add;
    }
  }
  // Birikim (birleşik) — aktif "harcamadan yuvarla" planlarını da besle
  if (state.payMethod !== 'bank') svCreditRoundup(payableNum());
  setTimeout(() => {
    closeSheet();
    setTimeout(() => go('success'), 250);
  }, 1500);
}

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

/* ---------- Tema ---------- */
function setTheme(theme) {
  state.theme = theme;
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('ykm-theme', theme);
  document.querySelector('meta[name="theme-color"]').setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff');
  if (state.screen === 'settings') render();
}

/* ===================================================================
   OLAY YÖNETİMİ (event delegation)
   =================================================================== */
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-action]');

  // Scrim'lere tıklanınca kapat
  if (e.target === scrimEl) return closeDrawer();
  if (e.target === sheetScrimEl) return closeSheet();
  if (!t) return;

  const a = t.dataset.action;
  switch (a) {
    case 'open-drawer': return openDrawer();
    case 'close-drawer': return closeDrawer();
    case 'open-search': return go('search');
    case 'close-search': return navBack();
    case 'open-assistant':
      state.chatStarted = true;
      return go('chat');
    case 'nav-back': return navBack();
    case 'go-home': return goHome();
    case 'go-chat': return go('chat');
    case 'go-settings': return go('settings');
    case 'go-tracking': return go('tracking');
    case 'route': e.preventDefault(); return gotoSection(t.dataset.hash);
    case 'open-invoice': return openInvoiceSheet();
    case 'open-return': return openReturnSheet();
    case 'confirm-return': return confirmReturn();

    case 'toggle-bar': {
      const bar = t; const body = document.getElementById('bar-' + t.dataset.bar);
      bar.classList.toggle('open'); body.classList.toggle('open');
      return;
    }

    case 'use-prompt':
      // Öneri çipi: prompt'u input'a elle yazar gibi yaz, sonra otomatik gönder
      return typeInInput(ASSISTANT_PROMPT, chatSend);
    case 'chat-send': return chatSend();
    case 'chat-stop': return abortGen();

    case 'msg-copy': {
      const msg = t.closest('.msg-col')?.querySelector('.msg.bot');
      const txt = msg ? msg.textContent : '';
      if (txt && navigator.clipboard) {
        navigator.clipboard.writeText(txt).then(
          () => toast('Mesaj kopyalandı'),
          () => toast('Kopyalama desteklenmiyor')
        );
      } else toast('Mesaj kopyalandı');
      return;
    }
    case 'msg-like':
    case 'msg-dislike': {
      const wasActive = t.classList.contains('active');
      t.parentElement.querySelectorAll('[data-action="msg-like"],[data-action="msg-dislike"]')
        .forEach(b => b.classList.remove('active'));
      if (!wasActive) {
        t.classList.add('active');
        toast('Geri bildirimin için teşekkürler 💙');
      }
      return;
    }

    case 'buy': {
      state.selectedProduct = PRODUCTS.find(p => p.id === t.dataset.id);
      state.payMethod = null;
      state.installment = 'single';
      state.preInfoOk = false;
      state.contractOk = false;
      state.usePuan = false;
      return go('payment');
    }
    case 'select-method': return selectMethod(t.dataset.method, t);
    case 'select-inst': return selectInst(t.dataset.inst, t);

    case 'open-address': return openAddressSheet();
    case 'pick-address': return pickAddress(t.dataset.id);
    case 'confirm-address': return confirmAddress();
    case 'toggle-billing': return toggleBilling(t);
    case 'toggle-puan': return togglePuan();
    case 'toggle-contract': return toggleContract(t.dataset.key, t);
    case 'open-preinfo': return openLegalSheet('preinfo');
    case 'open-contract': return openLegalSheet('contract');
    case 'chip-other': return chipOtherFlow(t.dataset.key);

    // Otonom Setur akışı
    case 'setur-start': return seturStart();
    case 'setur-grant': return seturGrant();
    case 'notif-open': return seturOpenResult();
    case 'setur-open-chat': return seturOpenChat();
    case 'setur-swap': return seturSwap();
    case 'setur-approve': return openSeturConfirm();
    case 'setur-book': return seturBook();
    case 'step-close': {
      const card = t.closest('.step-card');
      if (card) card.remove();
      return;
    }
    case 'pay': return openConfirmSheet();
    case 'approve': return approvePayment();
    case 'close-sheet': return closeSheet();

    // Karekod ile Öde — ana ekran widget'ı
    case 'qr-start': return qrStart();
    case 'open-widgets': return go('widgets');
    case 'launch-app': return goHome();
    case 'qr-close': return navBack();
    case 'qr-method': return qrMethod(t.dataset.method);
    case 'qr-pay-open': return openQrConfirm();
    case 'qr-approve': return qrApprove();
    case 'qr-home': return qrHome();

    // Yuvarla Biriktir
    case 'ru-open': return go(state.roundup.active ? 'roundup-jar' : 'roundup-apply');
    case 'ru-agree': return ruToggleAgree(t);
    case 'ru-open-form': return ruOpenForm();
    case 'ru-activate': return ruActivate();
    case 'ru-confirm': return ruConfirm();
    case 'ru-open-jar': { closeSheet(); return go('roundup-jar'); }
    case 'ru-open-cardpick': return ruOpenCardPick();
    case 'ru-pick-card': return ruPickCard(t.dataset.val);
    case 'ru-open-acctpick': return ruOpenAcctPick();
    case 'ru-pick-acct': return ruPickAcct(t.dataset.val);
    case 'ru-open-goal': return ruOpenGoalPick();
    case 'ru-pick-goal': return ruPickGoal(t.dataset.val);
    case 'ru-clear-goal': return ruClearGoal();
    case 'ru-txn': return ruOpenTxn(+t.dataset.idx);
    case 'ru-history': return go('roundup-history');
    case 'ru-stop': return ruStop();
    case 'ru-stop-confirm': return ruStopConfirm();

    // Ekstreden Biriktir
    case 'su-open': return go(state.spendup.active ? 'spendup-jar' : 'spendup-apply');
    case 'su-agree': return suToggleAgree(t);
    case 'su-open-form': return suOpenForm();
    case 'su-rate': return suSetRate(t.dataset.val);
    case 'su-activate': return suActivate();
    case 'su-confirm': return suConfirm();
    case 'su-open-jar': { closeSheet(); return go('spendup-jar'); }
    case 'su-open-cardpick': return suOpenCardPick();
    case 'su-pick-card': return suPickCard(t.dataset.val);
    case 'su-open-acctpick': return suOpenAcctPick();
    case 'su-pick-acct': return suPickAcct(t.dataset.val);
    case 'su-open-rule': return suOpenRule();
    case 'su-rule-rate': return suRuleSetRate(t.dataset.val);
    case 'su-rule-save': return suRuleSave();
    case 'su-txn': return suOpenTxn(+t.dataset.idx);
    case 'su-history': return go('spendup-history');
    case 'su-stop': return suStop();
    case 'su-stop-confirm': return suStopConfirm();
    case 'close-sheet-render': { closeSheet(); return render(); }

    // Maden Biriktir
    case 'mb-open': return go(state.metal.active ? 'metal-jar' : 'metal-apply');
    case 'mb-agree': return mbToggleAgree(t);
    case 'mb-open-form': return mbOpenForm();
    case 'mb-open-metalpick': return mbOpenMetalPick();
    case 'mb-pick-metal': return mbPickMetal(t.dataset.val);
    case 'mb-metalpick-cancel': return mbMetalpickCancel();
    case 'mb-unit': return mbSetUnit(t.dataset.val);
    case 'mb-activate': return mbActivate();
    case 'mb-confirm': return mbConfirm();
    case 'mb-open-jar': { closeSheet(); return go('metal-jar'); }
    case 'mb-open-cardpick': return mbOpenCardPick();
    case 'mb-pick-card': return mbPickCard(t.dataset.val);
    case 'mb-open-rule': return mbOpenRule();
    case 'mb-rule-unit': return mbRuleSetUnit(t.dataset.val);
    case 'mb-rule-save': return mbRuleSave();
    case 'mb-txn': return mbOpenTxn(+t.dataset.idx);
    case 'mb-history': return go('metal-history');
    case 'mb-stop': return mbStop();
    case 'mb-stop-confirm': return mbStopConfirm();

    // Birikim (birleşik) — 4 birikim tipi × 3 başvuru tipi
    case 'sv-open': return svOpen();
    case 'sv-open-destpick': return svOpenDestPick();
    case 'sv-pick-dest': return svPickDest(t.dataset.val);
    case 'sv-open-methodpick': return svOpenMethodPick();
    case 'sv-pick-method': return svPickMethod(t.dataset.val);
    case 'sv-set-dest': return svSetDest(t.dataset.val);
    case 'sv-set-fund': return svSetFund(t.dataset.val);
    case 'sv-apply': return svApply();
    case 'sv-open-cardpick': return svOpenCardPick();
    case 'sv-pick-card': return svPickCard(t.dataset.val);
    case 'sv-open-acctpick': return svOpenAcctPick();
    case 'sv-pick-acct': return svPickAcct(t.dataset.val);
    case 'sv-open-metalpick': return svOpenMetalPick();
    case 'sv-pick-metal': return svPickMetal(t.dataset.val);
    case 'sv-open-fundpick': return svOpenFundPick();
    case 'sv-pick-fund': return svPickFund(t.dataset.val);
    case 'sv-open-causepick': return svOpenCausePick();
    case 'sv-pick-cause': return svPickCause(t.dataset.val);
    case 'sv-rate': return svSetRate(t.dataset.val);
    case 'sv-salpct': return svSetSalPct(t.dataset.val);
    case 'sv-unit': return svSetUnit(t.dataset.val);
    case 'sv-agree': return svToggleAgree(t);
    case 'sv-open-form': return svOpenForm();
    case 'sv-activate': return svActivate();
    case 'sv-confirm': return svConfirm();
    case 'sv-manage': return svManage(t.dataset.id);
    case 'sv-history': return go('birikim-history');
    case 'sv-stop': return svStop();
    case 'sv-stop-confirm': return svStopConfirm();

    // Fayda Yolculukları
    case 'fy-open': return faydaOpen(t.dataset.id);
    case 'fy-wallet': return go('fayda-wallet');
    case 'fy-change': return go('fayda');
    case 'fy-step': return faydaStep(t.dataset.b, +t.dataset.i);
    case 'fy-openlevel': return faydaOpenLevel(t.dataset.b, +t.dataset.i);
    case 'fy-pick-opt': return faydaPickOption(t.dataset.b, +t.dataset.i, t.dataset.opt);
    case 'fy-reward': return go('fayda-reward');
    case 'fy-pick-reward': return faydaPickReward(t.dataset.b, +t.dataset.r);
    case 'fy-open-wallet': { closeSheet(); return go('fayda-wallet'); }

    // Harcama analizi & limit
    case 'sp-open': return go('insights');
    case 'sp-seg': return spSeg(t.dataset.seg);
    case 'sp-cat': state.spendCat = t.dataset.id; return go('insights-category');
    case 'sp-allcats': return go('insights-cats');
    case 'sp-cardpick': return spOpenCardPick();
    case 'sp-pick-card': return spPickCard(t.dataset.val);
    case 'sp-period': return toast('Dönem seçimi prototipte aktif değil');
    case 'sp-set-limit': return openLimitSheet(t.dataset.id);
    case 'sp-limit-preset': return spLimitPreset(t.dataset.val);
    case 'sp-save-limit': return spSaveLimit(t.dataset.id);
    case 'sp-remove-limit': return spRemoveLimit(t.dataset.id);
    case 'sp-edit-total': return openTotalLimitSheet();
    case 'sp-save-total': return spSaveTotal();
    case 'sp-add-limit': return spOpenAddPick();
    case 'sp-apply-sugg': return spApplySugg(t.dataset.id, +t.dataset.val);

    // Dijital abonelikler
    case 'subs-open': return go('subs');
    case 'sub-open': state.subId = t.dataset.id; return go('sub-detail');
    case 'sub-remind': return subRemind(t.dataset.id);
    case 'sub-cancel': return openSubCancelSheet(t.dataset.id);
    case 'sub-cancel-confirm': return subCancelConfirm(t.dataset.id);
    case 'sub-resume': return subResume(t.dataset.id);

    // Kart Bilgileri + Dinamik Güvenlik Kodu
    case 'card-open': return go('card-detail');
    case 'dcvv-gen': return dcvvGenerate();
    case 'dcvv-copy':
    case 'cd-copy': {
      const val = t.dataset.val || '';
      const msg = t.dataset.msg || 'Kopyalandı';
      if (val && navigator.clipboard) navigator.clipboard.writeText(val).then(() => toast(msg), () => toast(msg));
      else toast(msg);
      return;
    }

    // Çocuk Ek Kartı
    case 'kid-open': return go('kid');
    case 'kid-freeze': return kidFreeze();
    case 'kid-addmoney': return kidOpenAddMoney();
    case 'kid-save-addmoney': return kidSaveAddMoney();
    case 'kid-editlimit': return kidOpenEditLimit();
    case 'kid-save-limit': return kidSaveLimit();
    case 'kid-contribute': return kidOpenContribute(t.dataset.id);
    case 'kid-save-contribute': return kidSaveContribute();
    case 'kid-addgoal': return kidOpenAddGoal();
    case 'kid-newgoal': return kidNewGoal(t);
    case 'kid-req': return kidOpenReq(t.dataset.id);
    case 'kid-alltxns': return kidOpenAllTxns();
    case 'kid-approve': return kidApprove(t.dataset.id);
    case 'kid-deny': return kidDeny(t.dataset.id);
    case 'kid-editmatch': return kidEditMatch();
    case 'kid-save-match': return kidSaveMatch();
    case 'kid-amt-preset': return kidAmtPreset(t.dataset.val);

    case 'menu-nav': {
      const id = t.dataset.id;
      if (id === 'home') return goHome();
      if (id === 'payments') { closeDrawer(); return gotoSection('toplu-borc'); }   // Ödemeler → Toplu Borç Ödeme (draft)
      if (id === 'world') { closeDrawer(); return go('fayda'); }   // Benim Dünyam → Fayda Yolculukları
      if (id === 'transfer') { closeDrawer(); return gotoSection('split'); }   // Para Transferleri → Harcama Bölüştür / Ödeme İste
      if (id === 'loan') { closeDrawer(); return gotoSection('sky-limit'); }   // Krediler → Sky Limit (draft)
      // Diğer menüler placeholder
      state.placeholderTitle = t.dataset.label;
      return go('placeholder');
    }

    // Harcama Bölüştür / Ödeme İste
    case 'spl-tab': state.split.tab = t.dataset.tab; return render();
    case 'spl-create': return splCreateSheet();
    case 'spl-start': return splStart(t.dataset.mode);
    case 'spl-picktab': state.split.pickTab = t.dataset.tab; return render();
    case 'spl-pick-item': return splToggleItem(t.dataset.id);
    case 'spl-pick-next': return go('split-people');
    case 'spl-amount-next': return splAmountNext();
    case 'spl-peopletab': state.split.peopleTab = t.dataset.tab; return render();
    case 'spl-toggle-person': return splTogglePerson(t.dataset.id);
    case 'spl-pick-group': return splPickGroup(t.dataset.id);
    case 'spl-newcontact': return splMethodSheet();
    case 'spl-method': return splMethodInput(t.dataset.m);
    case 'spl-add-newcontact': return splAddNewContact(t.dataset.m);
    case 'spl-people-next': return go('split-form');
    case 'spl-toggle-myshare': splCaptureNote(); state.split.myShare = !state.split.myShare; return render();
    case 'spl-toggle-partial': splCaptureNote(); state.split.partial = !state.split.partial; return render();
    case 'spl-pick-acct': splCaptureNote(); return splChoiceSheet('Alıcı hesap', SPLIT_ACCTS.map(a => ({ val: a.id, label: a.name + ' · ' + a.iban, on: a.id === state.split.account })), 'spl-set-acct');
    case 'spl-pick-purpose': splCaptureNote(); return splChoiceSheet('İşlem amacı', SPLIT_PURPOSES.map(p => ({ val: p, label: p, on: p === state.split.purpose })), 'spl-set-purpose');
    case 'spl-pick-valid': splCaptureNote(); return splChoiceSheet('İstek geçerlilik süresi seç', SPLIT_VALIDS.map(v => ({ val: v, label: v, on: v === state.split.valid })), 'spl-set-valid');
    case 'spl-pick-due': splCaptureNote(); return splChoiceSheet('Son ödeme süresi', SPLIT_DUES.map(v => ({ val: v, label: v, on: v === state.split.due })), 'spl-set-due');
    case 'spl-set-acct': state.split.account = t.dataset.val; closeSheet(); return render();
    case 'spl-set-purpose': state.split.purpose = t.dataset.val; closeSheet(); return render();
    case 'spl-set-valid': state.split.valid = t.dataset.val; closeSheet(); return render();
    case 'spl-set-due': state.split.due = t.dataset.val; closeSheet(); return render();
    case 'spl-send': return splSend();
    case 'spl-go-out': state.split.tab = 'out'; return gotoSection('split');
    case 'spl-pay-open': state.split.payId = t.dataset.id; return go('split-pay');
    case 'spl-pay-confirm': return splPayConfirm(t.dataset.id);

    // Birlikte Kazan
    case 'bk-new': return bkOpenNew();
    case 'bk-view': return bkOpenGoal(t.dataset.id);
    case 'bk-add-person': return bkAddPersonSheet();
    case 'bk-add-person-do': return bkAddPerson(t.dataset.id);
    case 'bk-remove-person': return bkRemovePerson(t.dataset.id);
    case 'bk-share': bkCaptureNewInputs(); state.bk.share = t.dataset.val; return render();
    case 'bk-start': return bkStart();
    case 'bk-claim': return bkClaim();
    case 'bk-to-wallet': return gotoSection('fayda-wallet');
    case 'bk-done': return gotoSection('reward-goal');

    // Toplu Borç Ödeme (draft)
    case 'debt-info': return debtInfoSheet();
    case 'debt-statement': return go('toplu-borc-ekstre');
    case 'debt-history': return go('toplu-borc-gecmis');
    case 'debt-pay': return go('toplu-borc-odeme');
    case 'debt-acct': return debtSelectAcct(t.dataset.id);
    case 'debt-continue': return go('toplu-borc-onay');
    case 'debt-approve': return debtApprove();
    case 'debt-cancel': return debtCancel();
    case 'debt-home': return debtGoHome();
    case 'debt-history-after': return debtHistoryAfterPay();
    case 'debt-hist-open': return debtHistSheet(t.dataset.id);

    // Erken Maaş Erişimi (draft)
    case 'ewa-info': return ewaInfoSheet();
    case 'ewa-start': return ewaStart();
    case 'ewa-history': return go('erken-maas-gecmis');
    case 'ewa-step': return ewaStep(+t.dataset.dir);
    case 'ewa-chip': return ewaSetAmount(+t.dataset.v);
    case 'ewa-terms': return ewaToTerms();
    case 'ewa-agree': return ewaToggleAgree(t);
    case 'ewa-doc': e.preventDefault(); return ewaDocSheet(t.dataset.doc);
    case 'ewa-review': return go('erken-maas-onay');
    case 'ewa-approve': return ewaApprove();
    case 'ewa-cancel': return ewaCancel();
    case 'ewa-home': return ewaGoHome();
    case 'ewa-history-after': return ewaHistoryAfter();
    case 'ewa-hist-open': return ewaHistSheet(t.dataset.id);

    // Marketplace Taşıt (draft)
    case 'vm-favs': return vmOpenFavs();
    case 'vm-f': vmSetF(t.dataset.k, t.dataset.v); return vmRefreshSearch();
    case 'vm-type': vmToggleType(t.dataset.v); return vmRefreshSearch();
    case 'vm-more': state.vm.more = !state.vm.more; return vmRefreshSearch();
    case 'vm-clear': vmClearFilters(); return vmRefreshSearch();
    case 'vm-pick-brand': vmCommitInputs(); return vmBrandSheet();
    case 'vm-pick-model': vmCommitInputs(); return vmModelSheet();
    case 'vm-set-brand': state.vm.f.brand = t.dataset.v || null; state.vm.f.model = null; return vmPickDone();
    case 'vm-set-model': state.vm.f.model = t.dataset.v || null; return vmPickDone();
    case 'vm-show': return vmShow();
    case 'vm-brand-go': vmClearFilters(); state.vm.f.brand = t.dataset.v; state.vm.favOnly = false; return go('arac-liste');
    case 'vm-show-all': vmClearFilters(); state.vm.favOnly = false; return go('arac-liste');
    case 'vm-filters': return vmFilterSheet();
    case 'vm-unset': vmUnset(t.dataset.k); return vmRefreshList();
    case 'vm-clear-list': vmClearFilters(); return vmRefreshList();
    case 'vm-sort': return vmSortSheet();
    case 'vm-set-sort': state.vm.sort = t.dataset.v; closeSheet(); return vmRefreshList();
    case 'vm-favonly': state.vm.favOnly = !state.vm.favOnly; return vmRefreshList();
    case 'vm-fav': return vmToggleFav(t.dataset.id);
    case 'vm-cmp': return vmToggleCmp(t.dataset.id);
    case 'vm-compare': return vmCompareSheet();
    case 'vm-open': return vmOpen(t.dataset.id);
    case 'vm-start-pre': return vmStartPre();
    case 'vm-continue': return vmContinue();
    case 'vm-pre-pct': return vmPrePct(+t.dataset.v);
    case 'vm-term': return vmSetTerm(+t.dataset.v);
    case 'vm-consent': return vmToggleConsent(t);
    case 'vm-doc': e.preventDefault(); return vmDocSheet(t.dataset.doc);
    case 'vm-pre-run': return vmPreRun();
    case 'vm-pre-edit': state.vm.pre = null; return vmRerender();
    case 'vm-to-plan': return go('arac-kredi');
    case 'vm-scen-save': vmCommitInputs(); return vmSaveScen();
    case 'vm-scen-apply': return vmApplyScen(t.dataset.v);
    case 'vm-scen-del': return vmDelScen(t.dataset.v);
    case 'vm-plan-all': return vmPlanSheet();
    case 'vm-to-apply': vmCommitInputs(); return go('arac-basvuru');
    case 'vm-agree': return vmToggleAgree(t);
    case 'vm-edit-plan': return vmEditPlan();
    case 'vm-submit': return vmSubmit();
    case 'vm-to-kasko': return go('arac-kasko');
    case 'vm-open-apply': return go('arac-basvuru');
    case 'vm-k-pick': return vmKPick(t.dataset.id);
    case 'vm-k-choose': vmKPick(t.dataset.id); return closeSheet();
    case 'vm-k-detail': return vmKDetailSheet(t.dataset.id);
    case 'vm-k-compare': return vmKCompareSheet();
    case 'vm-k-inst': return vmKInst(+t.dataset.n);
    case 'vm-k-agree': return vmKAgree(t);
    case 'vm-k-buy': return vmKBuy();
    case 'vm-k-approve': return vmKApprove();
    case 'vm-track': return vmGoTrack();
    case 'vm-policy': return vmPolicySheet();
    case 'vm-disb': return vmDisbSheet();
    case 'vm-adv': return vmAdvance();
    case 'vm-reset': return vmReset();
    case 'vm-reset-start': return vmResetStart(t.dataset.id);
    case 'vm-home': return vmGoMarket();
    // Marketplace Konut (draft)
    case 'kn-favs': return knOpenFavs();
    case 'kn-f': knSetF(t.dataset.k, t.dataset.v); return knRefreshSearch();
    case 'kn-type': knToggleType(t.dataset.v); return knRefreshSearch();
    case 'kn-more': state.kn.more = !state.kn.more; return knRefreshSearch();
    case 'kn-clear': knClearFilters(); return knRefreshSearch();
    case 'kn-pick-city': vmCommitInputs(); return knCitySheet();
    case 'kn-pick-district': vmCommitInputs(); return knDistrictSheet();
    case 'kn-set-city': state.kn.f.city = t.dataset.v || null; state.kn.f.district = null; return knPickDone();
    case 'kn-set-district': state.kn.f.district = t.dataset.v || null; return knPickDone();
    case 'kn-show': return knShow();
    case 'kn-loc-go': knClearFilters(); Object.assign(state.kn.f, { city: t.dataset.city, district: t.dataset.district }); state.kn.favOnly = false; return go('konut-liste');
    case 'kn-show-all': knClearFilters(); state.kn.favOnly = false; state.kn.sort = 'rec'; return go('konut-liste');
    case 'kn-show-new': knClearFilters(); state.kn.favOnly = false; state.kn.sort = 'new'; return go('konut-liste');
    case 'kn-filters': return knFilterSheet();
    case 'kn-unset': knUnset(t.dataset.k); return knRefreshList();
    case 'kn-clear-list': knClearFilters(); return knRefreshList();
    case 'kn-sort': return knSortSheet();
    case 'kn-set-sort': state.kn.sort = t.dataset.v; closeSheet(); return knRefreshList();
    case 'kn-favonly': state.kn.favOnly = !state.kn.favOnly; return knRefreshList();
    case 'kn-fav': return knToggleFav(t.dataset.id);
    case 'kn-cmp': return knToggleCmp(t.dataset.id);
    case 'kn-compare': return knCompareSheet();
    case 'kn-open': return knOpen(t.dataset.id);
    case 'kn-gal-go': return knGalGo(+t.dataset.i);
    case 'kn-start-sim': return knStartSim();
    case 'kn-pct': return knPct(+t.dataset.v);
    case 'kn-term': return knSetTerm(+t.dataset.v);
    case 'kn-scen-save': vmCommitInputs(); return knSaveScen();
    case 'kn-scen-apply': return knApplyScen(t.dataset.v);
    case 'kn-scen-del': return knDelScen(t.dataset.v);
    case 'kn-plan-all': return knPlanSheet();
    case 'kn-to-apply': return knToApply();
    case 'kn-sug-apply': return knSugApply(+t.dataset.down, +t.dataset.term);
    case 'kn-edit-plan': return knEditPlan();
    case 'kn-agree': return knToggleAgree(t);
    case 'kn-doc': e.preventDefault(); return knDocSheet(t.dataset.doc);
    case 'kn-submit': return knSubmit();
    case 'kn-tapu-doc': return knTapuSheet();
    case 'kn-track': return knGoTrack();
    case 'kn-open-track': return knOpenTrack();
    case 'kn-to-eks': return go('konut-ekspertiz');
    case 'kn-to-ipt': return go('konut-ipotek');
    case 'kn-slot': return knPickSlot(t.dataset.kind, t.dataset.v, +t.dataset.ts);
    case 'kn-ob-start': return go('konut-tahsis');
    case 'kn-th-edit': return knThEdit();
    case 'kn-th-open-edit': return knThOpenEdit();
    case 'kn-th-cancel': return knThCancel();
    case 'kn-th-save': return knThSave();
    case 'kn-th-confirm': return knThConfirm();
    case 'kn-th-pick': vmCommitInputs(); return knThPick(t.dataset.k);
    case 'kn-th-set': return knThSet(t.dataset.v);
    case 'kn-tk-opt': return knTkAnswer(t.dataset.q, t.dataset.v);
    case 'kn-tk-chip': return knTkShareChip(+t.dataset.v);
    case 'kn-tk-share': return knTkShareSubmit();
    case 'kn-tk-edit': return knTkEdit(t.dataset.q);
    case 'kn-tk-back': return knTkBack();
    case 'kn-ob-finish': return knObFinish();
    case 'kn-report': return knReportSheet();
    case 'kn-adv': return knAdvance();
    case 'kn-ipt-book': return knIptBook();
    case 'kn-dask': return knDaskSheet();
    case 'kn-dask-inst': return knDaskInst(+t.dataset.n);
    case 'kn-dask-approve': return knDaskApprove();
    case 'kn-harc': return knHarcSheet();
    case 'kn-harc-approve': return knHarcApprove();
    case 'kn-tapu-book': return knTapuBook();
    case 'kn-disb': return knDisbSheet();
    case 'kn-reset': return knReset();
    case 'kn-reset-start': return knResetStart(t.dataset.id);
    case 'kn-home': return knGoMarket();
    // Akıllı İşletme Sermayesi Finansmanı (draft)
    case 'bf-info': return bfInfoSheet();
    case 'bf-period': return bfPeriodSheet();
    case 'bf-per-set': return bfPerSet(t.dataset.v);
    case 'bf-per-custom': return bfPerCustom();
    case 'bf-per-month': return bfPerMonth(+t.dataset.i);
    case 'bf-per-apply': return bfPerApply();
    case 'bf-flows': return bfOpenFlows();
    case 'bf-flows-side': return bfOpenFlows(t.dataset.side);
    case 'bf-flows-cat': return bfOpenFlows(t.dataset.side, t.dataset.cat);
    case 'bf-side': return bfSetSide(t.dataset.side);
    case 'bf-cat': return bfSetCat(t.dataset.cat);
    case 'bf-cmp': state.bf.cmp = !state.bf.cmp; return vmRerender();
    case 'bf-more': return bfMore();
    case 'bf-analyze': return bfAnalyze();
    case 'bf-analysis': return go('isletme-analiz');
    case 'bf-ai-stop': return bfAIStop();
    case 'bf-fc-fin': return bfFcFin();
    case 'bf-copy': return bfCopy();
    case 'bf-offers': return go('isletme-oneriler');
    case 'bf-offer-focus': return bfFocus(t.dataset.id);
    case 'bf-sel': return bfToggleSel(t.dataset.id);
    case 'bf-compare': return bfCompare();
    case 'bf-choose': return bfChoose(t.dataset.id);
    case 'bf-pick': return bfPick(t.dataset.id);
    case 'bf-apply': return bfToApply();
    case 'bf-change': return bfChange();
    case 'bf-amt': return bfAmt(+t.dataset.d);
    case 'bf-term': return bfTerm(+t.dataset.v);
    case 'bf-plan': return bfPlanSheet();
    case 'bf-agree': return bfToggleAgree(t);
    case 'bf-doc': e.preventDefault(); return bfDocSheet(t.dataset.doc);
    case 'bf-submit': return bfSubmit();
    case 'bf-track': return bfGoTrack();
    case 'bf-home': return bfGoHome();
    case 'bf-contract': return bfContractSheet();
    case 'bf-sign': return bfSignContract();
    case 'bf-draw': return bfDrawSheet();
    case 'bf-draw-set': return bfDraw(+t.dataset.v);
    case 'bf-adv': return bfAdvance();
    case 'bf-reset': return bfReset();

    case 'set-theme': return setTheme(t.dataset.theme);
    case 'toggle-switch': return t.classList.toggle('on');

    // Sky Limit (draft)
    case 'sky-info': return skyInfoSheet();
    case 'sky-manage': return skyOpenManage(false);
    case 'sky-manage-after-pay': return skyOpenManage(true);
    case 'sky-step': return skyStep(t.dataset.id, +t.dataset.dir);
    case 'sky-reset': return skyReset();
    case 'sky-review': return skyReview();
    case 'sky-approve': return skyApprove();
    case 'sky-cancel': return skyCancel();
    case 'sky-home': return skyGoHome();
    case 'sky-pay': return skyPaySheet();
    case 'sky-pay-approve': return skyPayApprove();

    case 'toast': return toast(t.dataset.msg || 'Bu işlem prototipte aktif değil');
  }
});

/* ---------- Saat ---------- */
function updateClock() {
  const el = document.getElementById('sb-time');
  if (el) {
    const d = new Date();
    el.textContent = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }
}

/* ---------- Yönlendirme / derin bağlantı ----------
   Her bölümün kendi hash linki var: #home #assistant #setur #chat #payment
   #success #tracking #search #settings #sections
   Link açıldığında ekran gereken state ile hazır gelir (akışı tekrarlamadan). */
const ROUTES = ['home', 'springboard', 'widgets', 'qr-scan', 'qr-pay', 'qr-success', 'search', 'chat', 'assistant', 'setur', 'payment', 'success', 'tracking', 'settings', 'sections', 'roundup', 'roundup-apply', 'roundup-jar', 'roundup-history', 'spendup', 'spendup-apply', 'spendup-jar', 'spendup-history', 'metal', 'metal-apply', 'metal-jar', 'metal-history', 'fayda', 'fayda-journey', 'fayda-reward', 'fayda-wallet', 'insights', 'insights-category', 'insights-cats', 'limits', 'kid', 'split', 'split-pick', 'split-amount', 'split-people', 'split-form', 'split-pay', 'reward-goal', 'reward-goal-new', 'reward-goal-track', 'reward-goal-win', 'birikim', 'birikim-apply', 'birikim-manage', 'birikim-history', 'sky-limit', 'sky-limit-manage', 'sky-limit-confirm', 'sky-limit-success', 'sky-limit-payment', 'toplu-borc', 'toplu-borc-ekstre', 'toplu-borc-odeme', 'toplu-borc-onay', 'toplu-borc-sonuc', 'toplu-borc-gecmis', 'erken-maas', 'erken-maas-tutar', 'erken-maas-kosullar', 'erken-maas-onay', 'erken-maas-sonuc', 'erken-maas-gecmis', 'arac', 'arac-liste', 'arac-detay', 'arac-on-onay', 'arac-kredi', 'arac-basvuru', 'arac-kasko', 'arac-takip', 'konut', 'konut-liste', 'konut-detay', 'konut-kredi', 'konut-basvuru', 'konut-takip', 'konut-ekspertiz', 'konut-ipotek', 'konut-tanitim', 'konut-tahsis', 'konut-takbis', 'konut-tamam', 'isletme', 'isletme-hareketler', 'isletme-analiz', 'isletme-oneriler', 'isletme-karsilastir', 'isletme-basvuru', 'isletme-takip'];
function routeTo(hash) {
  const h = (hash || '').replace('#', '') || 'home';
  if (!ROUTES.includes(h)) return false;
  // Ödeme/başarı/takip: ürün seçili değilse asistanın önerdiğiyle hazırla
  if (['payment', 'success', 'tracking'].includes(h) && !state.selectedProduct) {
    state.selectedProduct = PRODUCTS.find(p => p.id === REC_ID) || PRODUCTS[0];
  }
  // Ödeme ekranını her zaman temiz (sıfır) halde aç
  if (h === 'payment') {
    state.payMethod = null; state.installment = 'single';
    state.preInfoOk = false; state.contractOk = false; state.usePuan = false;
  }
  // Karekod ile Öde derin-linkleri — işyeri seçili değilse demo işyerini kur
  if (['qr-scan', 'qr-pay', 'qr-success'].includes(h)) qrSeed();
  if (h.startsWith('toplu-borc')) debtSeed(h);   // Toplu Borç Ödeme deep links
  if (h.startsWith('erken-maas')) ewaSeed(h);    // Erken Maaş Erişimi deep links
  if (h.startsWith('arac')) vmSeed(h);          // Marketplace Taşıt deep links
  if (h.startsWith('konut')) knSeed(h);         // Marketplace Konut deep links
  if (h.startsWith('isletme')) bfSeed(h);       // Akıllı İşletme Finansmanı deep links
  if (h === 'assistant') {            // Koçtaş sohbetini dolu göster
    state.chatStarted = true;
    state.chatSeed = true;
    state.seturSeed = false;
    state.screen = 'chat';
    return true;
  }
  if (h === 'setur') {                // Setur otonom akışını sonucuyla dolu göster
    state.chatStarted = true;
    state.chatSeed = false;
    state.seturSeed = true;
    state.seturAuthorized = true;
    state.seturOptionIdx = 0;
    state.screen = 'chat';
    return true;
  }
  if (h === 'roundup') {              // #roundup → aktifse yönet, değilse başvuru
    state.chatSeed = false;
    state.screen = state.roundup.active ? 'roundup-jar' : 'roundup-apply';
    return true;
  }
  if (h === 'roundup-jar' || h === 'roundup-history') { // dolu kumbara/geçmiş — kural yoksa kurup göster (demo linki)
    if (!state.roundup.active) ruSeedJar();
    state.chatSeed = false;
    state.screen = h;
    return true;
  }
  if (h === 'spendup') {             // #spendup → aktifse yönet, değilse başvuru
    state.chatSeed = false;
    state.screen = state.spendup.active ? 'spendup-jar' : 'spendup-apply';
    return true;
  }
  if (h === 'spendup-jar' || h === 'spendup-history') { // dolu birikim/geçmiş — kural yoksa kurup göster (demo linki)
    if (!state.spendup.active) suSeedJar();
    state.chatSeed = false;
    state.screen = h;
    return true;
  }
  if (h === 'metal') {               // #metal → aktifse yönet, değilse başvuru
    state.chatSeed = false;
    state.screen = state.metal.active ? 'metal-jar' : 'metal-apply';
    return true;
  }
  if (h === 'metal-jar' || h === 'metal-history') { // dolu maden hesabı/geçmiş — kural yoksa kurup göster (demo linki)
    if (!state.metal.active) mbSeedJar();
    state.chatSeed = false;
    state.screen = h;
    return true;
  }
  if (h === 'birikim-manage' || h === 'birikim-history') { // dolu birikim/geçmiş — plan yoksa demo plan kur
    if (!state.sv.plans.length) {
      const plan = svSeedPlan({ dest: 'metal', fund: 'mandate', card: 'worldgold', account: 'sav', metalKind: 'gold', fundKind: 'para', cause: 'egitim', unit: 'try', tryAmt: 1000, gram: 0.5, rate: 10, cap: 500, salaryPct: 10 });
      state.sv.plans.push(plan);
    }
    if (!state.sv.view || !state.sv.plans.find(p => p.id === state.sv.view)) state.sv.view = state.sv.plans[0].id;
    state.chatSeed = false;
    state.screen = h;
    return true;
  }
  if (h === 'fayda-journey' || h === 'fayda-reward') {  // görüntülenen fayda yoksa demo (limit)
    if (!state.fayda.view) state.fayda.view = 'limit';
    state.chatSeed = false;
    state.screen = h;
    return true;
  }
  // Harcama Bölüştür derin-linkleri — seçim gerektiren ekranlar boş state ile açılırsa demo seçimi kur
  if (h === 'split-pick') { state.split.mode = 'pick'; }
  if (h === 'split-amount') { state.split.mode = 'amount'; }
  if (h === 'split-people' && !state.split.people.length && !state.split.picked.length && !state.split.amount) {
    state.split.mode = 'pick';
    state.split.picked = [{ id: 'sub:youtube', name: 'YouTube Premium', sub: 'Bireysel', date: '01.07.2026', amount: 159.99 }];
  }
  if ((h === 'split-form') && !state.split.people.length) {
    state.split.mode = state.split.picked.length ? 'pick' : (state.split.amount ? 'amount' : 'pick');
    if (!state.split.picked.length && !state.split.amount) state.split.picked = [{ id: 'sub:youtube', name: 'YouTube Premium', sub: 'Bireysel', date: '01.07.2026', amount: 159.99 }];
    state.split.people = [
      { id: 'k2', name: 'Burak Ünal', bank: 'Papara' },
      { id: 'k4', name: 'Zeynep Kaya', bank: 'İş Bankası' },
    ];
  }
  if (h === 'split-pay' && !state.split.payId) { state.split.payId = splitIn[0] && splitIn[0].id; }
  // Birlikte Kazan derin-linkleri
  if (h === 'reward-goal-new' && !state.bk.people.length) {
    state.bk.name = ''; state.bk.target = 30000; state.bk.share = 'equal';
    state.bk.people = ['k8', 'k3', 'k9'].map(bkMkPerson).filter(Boolean);
  }
  if (h === 'reward-goal-track' && !bkById(state.bk.viewId)) state.bk.viewId = bkGoals[0].id;
  if (h === 'reward-goal-win') { const g = bkView(); g.spent = g.target; g.status = 'done'; bkAwardOnce(g); }
  // Sky Limit deep links: confirm / result / payment screens open with demo state
  if (h.startsWith('sky-limit')) skySeed(h);
  state.chatSeed = false;
  state.screen = h;
  return true;
}
/* Bölüm linkine git: nereden geldiğimizi geri yığınına ekle (geri o ekrana dönsün),
   state'i kur, URL hash'ini güncelle (paylaşılabilir), çiz */
function gotoSection(hash) {
  const back = curFrame();
  if (!routeTo(hash)) return;
  state.nav.push(back);
  closeDrawer();
  history.replaceState(null, '', '#' + hash.replace('#', ''));
  render();
}
// Adres çubuğundan hash değişirse (bookmark / elle düzenleme) taze yönlen (yığın sıfır)
window.addEventListener('hashchange', () => {
  if (routeTo(location.hash)) { state.nav = []; render(); }
});

setTheme(state.theme);
updateClock();
setInterval(updateClock, 30000);
routeTo(location.hash);
render();
