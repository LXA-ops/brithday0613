const MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'];

const LUNAR_MONTHS = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];

const LUNAR_DAYS = [
  '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
  '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'
];

const SOLAR_HOLIDAYS = {
  '0101': '元旦', '0214': '情人节', '0308': '妇女节', '0312': '植树节',
  '0401': '愚人节', '0501': '劳动节', '0504': '青年节', '0601': '儿童节',
  '0701': '建党节', '0801': '建军节', '0910': '教师节', '1001': '国庆节',
  '1225': '圣诞节'
};

const LUNAR_HOLIDAYS = {
  '0101': '春节', '0115': '元宵节', '0505': '端午节', '0707': '七夕节',
  '0715': '中元节', '0815': '中秋节', '0909': '重阳节'
};

/* ── Lunar calendar data 1900-2100 ── */
const LUNAR_INFO = [
  0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
  0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
  0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
  0x06566,0x0d4a0,0x0ea50,0x16a95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
  0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
  0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,
  0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
  0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,
  0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
  0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x05ac0,0x0ab60,0x096d5,0x092e0,
  0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
  0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
  0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
  0x05aa0,0x076a3,0x096d0,0x04afb,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
  0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,
  0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50,0x06aa0,0x1a6c4,0x0aae0,
  0x092e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,
  0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,
  0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,
  0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a4d0,0x0d150,0x0f252,
  0x0d520
];

function getLeapMonth(year) {
  return LUNAR_INFO[year - 1900] & 0xf;
}

function getLeapMonthDays(year) {
  const info = LUNAR_INFO[year - 1900];
  return (info & 0xf) ? ((info & 0x10000) ? 30 : 29) : 0;
}

function getMonthDays(year, month) {
  const info = LUNAR_INFO[year - 1900];
  // bits 15..4 encode months 1..12 (0x10000 >> month)
  return (info & (0x10000 >> month)) ? 30 : 29;
}

function getLunarYearDays(year) {
  let sum = 348;
  const info = LUNAR_INFO[year - 1900];
  for (let bit = 0; bit < 12; bit++) {
    if (info & (1 << (4 + bit))) sum++;
  }
  const leap = info & 0xf;
  if (leap) sum += (info & 0x10000) ? 30 : 29;
  return sum;
}

function solarToLunar(sy, sm, sd) {
  const base = new Date(1900, 0, 31);
  const target = new Date(sy, sm, sd);
  let offset = Math.round((target - base) / 86400000);
  if (offset < 0) return null;

  let year = 1900, yearDays;
  for (; year < 2101 && offset > 0; year++) {
    yearDays = getLunarYearDays(year);
    offset -= yearDays;
  }
  if (offset < 0) { offset += yearDays; year--; }
  if (year > 2100) return null;

  const leap = getLeapMonth(year);
  let month, isLeap = false;
  let monthDays;

  for (month = 1; month < 13 && offset > 0; month++) {
    if (leap > 0 && month === leap + 1 && !isLeap) {
      month--;
      isLeap = true;
      monthDays = getLeapMonthDays(year);
    } else {
      monthDays = getMonthDays(year, month);
    }
    if (isLeap && month === leap + 1) isLeap = false;
    offset -= monthDays;
  }

  if (offset === 0 && leap > 0 && month === leap + 1) {
    if (isLeap) isLeap = false;
    else { isLeap = true; month--; }
  }
  if (offset < 0) { offset += monthDays; month--; }

  return { year, month, day: offset + 1, isLeap };
}

function formatLunar(lunar) {
  if (!lunar) return '';
  const prefix = lunar.isLeap ? '闰' : '';
  return prefix + LUNAR_MONTHS[lunar.month - 1] + '月' + LUNAR_DAYS[lunar.day - 1];
}

/* ── Holidays ── */
function getHolidays(year, month, day, lunar) {
  const results = [];
  const md = String(month + 1).padStart(2, '0') + String(day).padStart(2, '0');
  if (SOLAR_HOLIDAYS[md]) results.push(SOLAR_HOLIDAYS[md]);
  if (lunar) {
    const ld = String(lunar.month).padStart(2, '0') + String(lunar.day).padStart(2, '0');
    if (LUNAR_HOLIDAYS[ld]) results.push(LUNAR_HOLIDAYS[ld]);
    // 除夕: last day of lunar year (12th month)
    if (lunar.month === 12 && lunar.day === getMonthDays(lunar.year, 12)) {
      results.push('除夕');
    }
  }
  return results;
}

/* ── Notes ── */
function getNotes() {
  try { return JSON.parse(localStorage.getItem('notes') || '{}'); } catch { return {}; }
}

function saveNote(dateStr, text) {
  const notes = getNotes();
  if (text.trim()) {
    notes[dateStr] = text.trim();
  } else {
    delete notes[dateStr];
  }
  localStorage.setItem('notes', JSON.stringify(notes));
}

function deleteNote(dateStr) {
  const notes = getNotes();
  delete notes[dateStr];
  localStorage.setItem('notes', JSON.stringify(notes));
}

/* ── Theme ── */
function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme === 'dark' ? 'dark' : '');
  localStorage.setItem('darkMode', newTheme === 'dark' ? '1' : '0');
}

/* ── State ── */
let currentDate = new Date();
const today = new Date();
let currentView = 'month';
let editingDate = null;

/* ── Navigation ── */
function navigate(delta) {
  if (currentView === 'month') {
    currentDate.setMonth(currentDate.getMonth() + delta);
  } else if (currentView === 'week') {
    currentDate.setDate(currentDate.getDate() + delta * 7);
  } else {
    currentDate.setFullYear(currentDate.getFullYear() + delta);
  }
  render();
}

function goToToday() {
  currentDate = new Date();
  currentView = 'month';
  render();
}

function switchView(view) {
  if (view === currentView) return;
  currentView = view;
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === view);
  });
  render();
}

/* ── Animations ── */
function triggerAnimation(container) {
  container.classList.remove('animate');
  void container.offsetWidth;
  container.classList.add('animate');
}

/* ── Update helpers ── */
function updateTodayBtn() {
  const btn = document.getElementById('todayBtn');
  if (currentView === 'month') {
    const diff = today.getFullYear() * 12 + today.getMonth() -
                 (currentDate.getFullYear() * 12 + currentDate.getMonth());
    btn.style.display = diff === 0 ? 'none' : 'block';
  } else if (currentView === 'week') {
    const weekStart = new Date(currentDate);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const todayStart = new Date(today);
    todayStart.setDate(todayStart.getDate() - todayStart.getDay());
    btn.style.display = +weekStart === +todayStart ? 'none' : 'block';
  } else {
    btn.style.display = currentDate.getFullYear() === today.getFullYear() ? 'none' : 'block';
  }
}

function updateHeader() {
  const yearEl = document.getElementById('yearDisplay');
  const monthEl = document.getElementById('monthDisplay');
  if (currentView === 'year') {
    yearEl.textContent = currentDate.getFullYear() + '年';
    monthEl.textContent = '全年';
  } else if (currentView === 'week') {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    const sy = start.getFullYear(), sm = start.getMonth(), sd = start.getDate();
    const ey = end.getFullYear(), em = end.getMonth(), ed = end.getDate();
    if (sy === ey && sm === em) {
      yearEl.textContent = sy + '年';
      monthEl.textContent = (sm + 1) + '月' + sd + '日 - ' + ed + '日';
    } else if (sy === ey) {
      yearEl.textContent = sy + '年';
      monthEl.textContent = (sm + 1) + '月' + sd + '日 - ' + (em + 1) + '月' + ed + '日';
    } else {
      yearEl.textContent = sy + '年 - ' + ey + '年';
      monthEl.textContent = (sm + 1) + '月' + sd + '日 - ' + (em + 1) + '月' + ed + '日';
    }
  } else {
    yearEl.textContent = currentDate.getFullYear() + '年';
    monthEl.textContent = MONTHS[currentDate.getMonth()];
  }
}

/* ── Render month grid data ── */
function getMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();
  const notes = getNotes();
  const cells = [];

  const prevM = month === 0 ? 11 : month - 1;
  const prevY = month === 0 ? year - 1 : year;
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevDays - i;
    const dateStr = `${prevY}-${String(prevM + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    cells.push({ day: d, other: true, dateStr, lunar: null, holidays: [] });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const lunar = solarToLunar(year, month, d);
    const holidays = getHolidays(year, month, d, lunar);
    cells.push({
      day: d, other: false, dateStr, lunar, holidays,
      isToday: year === today.getFullYear() && month === today.getMonth() && d === today.getDate(),
      hasNote: !!notes[dateStr]
    });
  }

  const remaining = (7 - cells.length % 7) % 7;
  const nextM = month === 11 ? 0 : month + 1;
  const nextY = month === 11 ? year + 1 : year;
  for (let d = 1; d <= remaining; d++) {
    const dateStr = `${nextY}-${String(nextM + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    cells.push({ day: d, other: true, dateStr, lunar: null, holidays: [] });
  }

  return cells;
}

/* ── Render Month View ── */
function renderMonth(year, month) {
  const container = document.getElementById('daysContainer');
  const cells = getMonthGrid(year, month);
  const wds = ['日', '一', '二', '三', '四', '五', '六'];
  let html = '';

  wds.forEach((wd, i) => {
    const cls = (i === 0 || i === 6) ? 'wd-header weekend' : 'wd-header';
    html += `<div class="${cls}">${wd}</div>`;
  });

  for (const cell of cells) {
    let cls = '';
    if (cell.other) cls = 'other-month';
    if (cell.isToday) cls = 'today';
    const lunarStr = cell.lunar ? formatLunar(cell.lunar) : '';
    const holidayStr = cell.holidays.length ? cell.holidays[0] : '';

    html += `<span class="${cls}" data-date="${cell.dateStr}">`;
    html += `<span class="day-num">${cell.day}</span>`;
    html += `<span class="day-lunar">${lunarStr}</span>`;
    html += `<span class="day-holiday">${holidayStr}</span>`;
    html += `<span class="note-star${cell.hasNote ? ' has-note' : ''}">★</span>`;
    html += `</span>`;
  }

  container.innerHTML = html;
  container.style.display = 'grid';
  document.getElementById('calendarContainer').classList.remove('year-active');
  triggerAnimation(container);

  // Click to open notes
  container.querySelectorAll('span:not(.other-month)').forEach(el => {
    el.addEventListener('click', () => openNoteModal(el.dataset.date));
  });
}

/* ── Render Week View ── */
function renderWeek(date) {
  const container = document.getElementById('daysContainer');
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  const notes = getNotes();
  const wds = ['日', '一', '二', '三', '四', '五', '六'];

  let html = '';
  wds.forEach((wd, i) => {
    const cls = (i === 0 || i === 6) ? 'wd-header weekend' : 'wd-header';
    html += `<div class="${cls}">${wd}</div>`;
  });

  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const y = d.getFullYear(), m = d.getMonth(), day = d.getDate();
    const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const lunar = solarToLunar(y, m, day);
    const holidays = getHolidays(y, m, day, lunar);
    const isToday = y === today.getFullYear() && m === today.getMonth() && day === today.getDate();
    const lunarStr = lunar ? formatLunar(lunar) : '';
    const holidayStr = holidays.length ? holidays[0] : '';

    let cls = isToday ? 'today' : '';
    html += `<span class="${cls}" data-date="${dateStr}">`;
    html += `<span class="day-num">${day}</span>`;
    html += `<span class="day-lunar">${lunarStr}</span>`;
    html += `<span class="day-holiday">${holidayStr}</span>`;
    html += `<span class="note-star${notes[dateStr] ? ' has-note' : ''}">★</span>`;
    html += `</span>`;
  }

  container.innerHTML = html;
  container.style.display = 'grid';
  document.getElementById('calendarContainer').classList.remove('year-active');
  triggerAnimation(container);

  container.querySelectorAll('span').forEach(el => {
    el.addEventListener('click', () => openNoteModal(el.dataset.date));
  });
}

/* ── Render Year View ── */
function renderYear(year) {
  const container = document.getElementById('daysContainer');
  const notes = getNotes();

  let html = '<div class="year-grid">';
  for (let m = 0; m < 12; m++) {
    const firstDay = new Date(year, m, 1).getDay();
    const daysInMonth = new Date(year, m + 1, 0).getDate();
    const prevDays = new Date(year, m, 0).getDate();
    const grid = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      grid.push({ day: prevDays - i, other: true });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      grid.push({
        day: d, other: false,
        isToday: year === today.getFullYear() && m === today.getMonth() && d === today.getDate(),
        hasNote: !!notes[dateStr]
      });
    }
    const rem = (7 - grid.length % 7) % 7;
    for (let d = 1; d <= rem; d++) {
      grid.push({ day: d, other: true });
    }

    html += `<div class="year-month" data-year="${year}" data-month="${m}">`;
    html += `<div class="ym-title">${MONTHS[m]}</div>`;
    html += `<div class="ym-weekdays"><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div>`;
    html += `<div class="ym-days">`;
    for (const cell of grid) {
      let cls = cell.other ? 'other-month' : '';
      if (cell.isToday) cls = 'today';
      html += `<span class="${cls}">${cell.day}<span class="note-star${cell.hasNote ? ' has-note' : ''}">★</span></span>`;
    }
    html += `</div></div>`;
  }
  html += '</div>';

  container.innerHTML = html;
  container.style.display = 'block';
  document.getElementById('calendarContainer').classList.add('year-active');
  triggerAnimation(container.querySelector('.year-grid'));

  container.querySelectorAll('.year-month').forEach(el => {
    el.addEventListener('click', () => {
      currentDate = new Date(parseInt(el.dataset.year), parseInt(el.dataset.month), 1);
      currentView = 'month';
      document.querySelectorAll('.view-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.view === 'month');
      });
      render();
    });
  });
}

/* ── Main Render ── */
function render() {
  updateHeader();
  updateTodayBtn();
  if (currentView === 'month') {
    renderMonth(currentDate.getFullYear(), currentDate.getMonth());
  } else if (currentView === 'week') {
    renderWeek(currentDate);
  } else {
    renderYear(currentDate.getFullYear());
  }
}

/* ── Notes Modal ── */
function openNoteModal(dateStr) {
  editingDate = dateStr;
  const d = new Date(dateStr + 'T00:00:00');
  document.getElementById('notesDateLabel').textContent =
    `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;

  const notes = getNotes();
  const text = notes[dateStr] || '';
  document.getElementById('notesInput').value = text;
  document.getElementById('deleteNotes').style.display = text ? 'block' : 'none';
  document.getElementById('notesModal').classList.add('show');
  document.getElementById('notesInput').focus();
}

function closeNoteModal() {
  document.getElementById('notesModal').classList.remove('show');
  editingDate = null;
}

/* ── Event Listeners ── */
document.getElementById('themeBtn').addEventListener('click', toggleTheme);

document.getElementById('prevBtn').addEventListener('click', () => navigate(-1));
document.getElementById('nextBtn').addEventListener('click', () => navigate(1));
document.getElementById('todayBtn').addEventListener('click', goToToday);

document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('click', () => switchView(btn.dataset.view));
});

document.getElementById('saveNotes').addEventListener('click', () => {
  if (!editingDate) return;
  const text = document.getElementById('notesInput').value;
  saveNote(editingDate, text);
  closeNoteModal();
  render();
});

document.getElementById('deleteNotes').addEventListener('click', () => {
  if (!editingDate) return;
  deleteNote(editingDate);
  closeNoteModal();
  render();
});

document.getElementById('closeModal').addEventListener('click', closeNoteModal);
document.getElementById('notesModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeNoteModal();
});

/* ── Keyboard shortcuts ── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeNoteModal(); return; }
  if (document.getElementById('notesModal').classList.contains('show')) return;
  if (e.key === 'ArrowLeft') navigate(-1);
  if (e.key === 'ArrowRight') navigate(1);
});

/* ── Init ── */
if (localStorage.getItem('darkMode') === '1') {
  document.documentElement.setAttribute('data-theme', 'dark');
}

render();
