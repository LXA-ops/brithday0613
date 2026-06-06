const MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'];

const THEMES = [
  { name: '紫蓝',  start: '#667eea', end: '#764ba2' },
  { name: '日落',  start: '#f093fb', end: '#f5576c' },
  { name: '森林',  start: '#11998e', end: '#38ef7d' },
  { name: '海洋',  start: '#0575e6', end: '#021b79' },
  { name: '极光',  start: '#0b8793', end: '#360033' },
  { name: '暖阳',  start: '#f2994a', end: '#f2c94c' },
  { name: '樱花',  start: '#ffecd2', end: '#fcb69f' },
  { name: '深空',  start: '#0f0c29', end: '#302b63' },
  { name: '青草',  start: '#56ab2f', end: '#a8e063' },
];

let currentDate = new Date();
const today = new Date();
let savedTheme = localStorage.getItem('theme');

function applyTheme(idx) {
  const t = THEMES[idx];
  document.documentElement.style.setProperty('--bg-start', t.start);
  document.documentElement.style.setProperty('--bg-end', t.end);
  document.documentElement.style.setProperty('--today-bg', t.start);
  localStorage.setItem('theme', idx);
  // Mark active swatch
  document.querySelectorAll('.theme-palette div').forEach((el, i) => {
    el.classList.toggle('active', i === idx);
  });
}

/* ── Theme palette ── */
const palette = document.getElementById('themePalette');
THEMES.forEach((t, i) => {
  const swatch = document.createElement('div');
  swatch.style.background = `linear-gradient(135deg, ${t.start}, ${t.end})`;
  swatch.title = t.name;
  swatch.addEventListener('click', () => applyTheme(i));
  palette.appendChild(swatch);
});

document.getElementById('themeBtn').addEventListener('click', () => {
  palette.classList.toggle('show');
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('#themeBtn') && !e.target.closest('.theme-palette')) {
    palette.classList.remove('show');
  }
});

function render(year, month) {
  document.getElementById('yearDisplay').textContent = year + '年';
  document.getElementById('monthDisplay').textContent = MONTHS[month];

  const container = document.getElementById('daysContainer');
  container.innerHTML = '';

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = firstDay.getDay();

  // Previous month's tail
  const prevLast = new Date(year, month, 0);
  for (let i = startOffset - 1; i >= 0; i--) {
    const span = document.createElement('span');
    span.className = 'other-month';
    span.textContent = prevLast.getDate() - i;
    container.appendChild(span);
  }

  // Current month
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const span = document.createElement('span');
    if (year === today.getFullYear() && month === today.getMonth() && d === today.getDate()) {
      span.className = 'today';
    }
    span.textContent = d;
    container.appendChild(span);
  }

  // Next month's head
  const totalCells = startOffset + lastDay.getDate();
  const remaining = (7 - totalCells % 7) % 7;
  for (let d = 1; d <= remaining; d++) {
    const span = document.createElement('span');
    span.className = 'other-month';
    span.textContent = d;
    container.appendChild(span);
  }
}

document.getElementById('prevBtn').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  render(currentDate.getFullYear(), currentDate.getMonth());
});

document.getElementById('nextBtn').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  render(currentDate.getFullYear(), currentDate.getMonth());
});

render(currentDate.getFullYear(), currentDate.getMonth());

// Apply saved theme after render
if (savedTheme !== null) {
  applyTheme(parseInt(savedTheme));
} else {
  applyTheme(0);
}
