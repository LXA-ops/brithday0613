const MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'];

let currentDate = new Date();
const today = new Date();

function render(year, month) {
  document.getElementById('yearDisplay').textContent = year + '年';
  document.getElementById('monthDisplay').textContent = MONTHS[month];

  const container = document.getElementById('daysContainer');
  container.innerHTML = '';

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = firstDay.getDay(); // 0=Sun ... 6=Sat

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
