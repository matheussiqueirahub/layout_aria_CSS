(() => {
  const root = document.body;
  const demo = document.getElementById('demo-container');
  const selJustify = document.getElementById('control-justify');
  const selAlign = document.getElementById('control-align');
  const rangeGap = document.getElementById('control-gap');
  const gapValue = document.getElementById('gap-value');
  const announce = document.getElementById('announce');
  const btnReset = document.getElementById('reset');
  const btnCopy = document.getElementById('copy-css');
  const btnTheme = document.getElementById('theme-toggle');

  // Theme handling
  const THEME_KEY = 'layout_aria_css_theme';
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      root.classList.add('theme-dark');
      btnTheme.setAttribute('aria-pressed', 'true');
      btnTheme.textContent = '☀️';
    } else {
      root.classList.remove('theme-dark');
      btnTheme.setAttribute('aria-pressed', 'false');
      btnTheme.textContent = '🌙';
    }
  };
  const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
  applyTheme(savedTheme);
  btnTheme?.addEventListener('click', () => {
    const now = root.classList.contains('theme-dark') ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, now);
    applyTheme(now);
  });

  // Controls handling
  function updateDemo() {
    const j = selJustify.value;
    const a = selAlign.value;
    const g = `${rangeGap.value/16}rem`;
    gapValue.textContent = g;
    demo.style.justifyContent = j;
    demo.style.alignItems = a;
    demo.style.gap = g;
    announce.textContent = `justify-content: ${j}; align-items: ${a}; gap: ${g}`;
  }
  selJustify?.addEventListener('change', updateDemo);
  selAlign?.addEventListener('change', updateDemo);
  rangeGap?.addEventListener('input', updateDemo);

  btnReset?.addEventListener('click', (e) => {
    e.preventDefault();
    selJustify.value = 'center';
    selAlign.value = 'center';
    rangeGap.value = '20'; // 20px -> 1.25rem
    updateDemo();
  });

  btnCopy?.addEventListener('click', async (e) => {
    e.preventDefault();
    const j = selJustify.value;
    const a = selAlign.value;
    const g = `${rangeGap.value/16}rem`;
    const css = `.flex-container {\n  display: flex;\n  justify-content: ${j};\n  align-items: ${a};\n  min-height: 70vh;\n  gap: ${g};\n}`;
    try {
      await navigator.clipboard.writeText(css);
      btnCopy.textContent = 'Copiado!';
      setTimeout(() => { btnCopy.textContent = 'Copiar CSS'; }, 1200);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = css; document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
      btnCopy.textContent = 'Copiado!';
      setTimeout(() => { btnCopy.textContent = 'Copiar CSS'; }, 1200);
    }
  });

  // Initialize state
  updateDemo();
})();