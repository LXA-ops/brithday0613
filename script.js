/* ── Constants (original) ── */
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

/* ── Lunar Calendar (original) ── */
function getLeapMonth(year) { return LUNAR_INFO[year - 1900] & 0xf; }

function getLeapMonthDays(year) {
  const info = LUNAR_INFO[year - 1900];
  return (info & 0xf) ? ((info & 0x10000) ? 30 : 29) : 0;
}

function getMonthDays(year, month) {
  return (LUNAR_INFO[year - 1900] & (0x10000 >> month)) ? 30 : 29;
}

function getLunarYearDays(year) {
  let sum = 348;
  const info = LUNAR_INFO[year - 1900];
  for (let bit = 0; bit < 12; bit++) { if (info & (1 << (4 + bit))) sum++; }
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
  for (; year < 2101 && offset > 0; year++) { yearDays = getLunarYearDays(year); offset -= yearDays; }
  if (offset < 0) { offset += yearDays; year--; }
  if (year > 2100) return null;
  const leap = getLeapMonth(year);
  let month, isLeap = false, monthDays;
  for (month = 1; month < 13 && offset > 0; month++) {
    if (leap > 0 && month === leap + 1 && !isLeap) { month--; isLeap = true; monthDays = getLeapMonthDays(year); }
    else { monthDays = getMonthDays(year, month); }
    if (isLeap && month === leap + 1) isLeap = false;
    offset -= monthDays;
  }
  if (offset === 0 && leap > 0 && month === leap + 1) { if (isLeap) isLeap = false; else { isLeap = true; month--; } }
  if (offset < 0) { offset += monthDays; month--; }
  return { year, month, day: offset + 1, isLeap };
}

function formatLunar(lunar) {
  if (!lunar) return '';
  const prefix = lunar.isLeap ? '闰' : '';
  return prefix + LUNAR_MONTHS[lunar.month - 1] + '月' + LUNAR_DAYS[lunar.day - 1];
}

function getHolidays(year, month, day, lunar) {
  const results = [];
  const md = String(month + 1).padStart(2, '0') + String(day).padStart(2, '0');
  if (SOLAR_HOLIDAYS[md]) results.push(SOLAR_HOLIDAYS[md]);
  if (lunar) {
    const ld = String(lunar.month).padStart(2, '0') + String(lunar.day).padStart(2, '0');
    if (LUNAR_HOLIDAYS[ld]) results.push(LUNAR_HOLIDAYS[ld]);
    if (lunar.month === 12 && lunar.day === getMonthDays(lunar.year, 12)) results.push('除夕');
  }
  return results;
}

/* ── Built-in Suggestions ── */
const SUGGESTIONS = [
  { id:'s1', text:'早晨起床后喝一杯温水，唤醒身体的新陈代谢。', cat:'health' },
  { id:'s2', text:'每天深呼吸5分钟，能有效降低焦虑感。', cat:'health' },
  { id:'s3', text:'久坐1小时记得站起来活动5分钟，保护腰椎。', cat:'health' },
  { id:'s4', text:'每天吃够5种颜色的蔬菜水果，营养更均衡。', cat:'health' },
  { id:'s5', text:'午休20分钟比喝咖啡更能恢复精力。', cat:'health' },
  { id:'s6', text:'睡前1小时远离屏幕，蓝光会抑制褪黑素分泌。', cat:'health' },
  { id:'s7', text:'保持规律作息，比任何补品都重要。', cat:'health' },
  { id:'s8', text:'每天步行6000步，是最好的运动方式之一。', cat:'health' },
  { id:'s9', text:'工作时使用番茄钟法：25分钟专注+5分钟休息。', cat:'efficiency' },
  { id:'s10', text:'每天先做最重要的三件事，而不是最紧急的。', cat:'efficiency' },
  { id:'s11', text:'定期整理桌面和文件，整洁的环境提升效率。', cat:'efficiency' },
  { id:'s12', text:'写待办清单时，把大任务拆解成小步骤。', cat:'efficiency' },
  { id:'s13', text:'设置固定的时间检查邮件和消息，避免频繁中断。', cat:'efficiency' },
  { id:'s14', text:'每天花10分钟做明日计划，第二天从容不迫。', cat:'efficiency' },
  { id:'s15', text:'手机通知关掉大部分，只保留真正重要的。', cat:'efficiency' },
  { id:'s16', text:'一次只做一件事，多任务处理反而更慢。', cat:'efficiency' },
  { id:'s17', text:'每周留半天给自己，做真正喜欢的事。', cat:'mind' },
  { id:'s18', text:'写感恩日记：每天记下三件值得感恩的小事。', cat:'mind' },
  { id:'s19', text:'接受不完美，完成比完美更重要。', cat:'mind' },
  { id:'s20', text:'对镜子里的自己微笑，心情会好起来。', cat:'mind' },
  { id:'s21', text:'放下手机看天空5分钟，让大脑放空。', cat:'mind' },
  { id:'s22', text:'与人相处时多倾听少评判，关系会更融洽。', cat:'mind' },
  { id:'s23', text:'偶尔断舍离，扔掉不用的东西，心情也轻松。', cat:'mind' },
  { id:'s24', text:'每天给自己一个肯定：今天我也做得很棒。', cat:'mind' },
  { id:'s25', text:'收拾房间也是整理心情，试试看。', cat:'mind' },
  { id:'s26', text:'学一个新技能不用急于求成，每天进步一点点。', cat:'mind' },
  { id:'s27', text:'写下自己的优点，低落时翻出来看看。', cat:'mind' },
  { id:'s28', text:'做一个善良的人，但不必委屈自己。', cat:'mind' },
  { id:'s29', text:'周末去公园散步，接触自然能治愈疲惫。', cat:'health' },
  { id:'s30', text:'喝水不够？在水瓶上画刻度线提醒自己。', cat:'health' },
  { id:'s31', text:'每天靠墙站立10分钟，改善体态。', cat:'health' },
  { id:'s32', text:'使用"两分钟法则"：能在两分钟内完成的事，立刻去做。', cat:'efficiency' },
  { id:'s33', text:'给每件物品固定位置，找东西不浪费时间。', cat:'efficiency' },
  { id:'s34', text:'每月复盘一次，看看时间都花在了哪里。', cat:'efficiency' },
  { id:'s35', text:'遇到困难时问自己：这件事一年后还重要吗？', cat:'mind' },
  { id:'s36', text:'睡前读几页书，比刷手机更容易入睡。', cat:'health' },
];

/* ── Notes (original, for star indicators) ── */
function getNotes() {
  try { return JSON.parse(localStorage.getItem('notes') || '{}'); } catch { return {}; }
}

/* ── Schedules CRUD (new) ── */
function getAllSchedules() {
  try { return JSON.parse(localStorage.getItem('schedules_v2') || '{}'); } catch { return {}; }
}
function getSchedulesForDate(dateStr) {
  const all = getAllSchedules();
  return all[dateStr] || [];
}
function saveScheduleForDate(dateStr, schedule) {
  const all = getAllSchedules();
  if (!all[dateStr]) all[dateStr] = [];
  const idx = all[dateStr].findIndex(s => s.id === schedule.id);
  if (idx >= 0) all[dateStr][idx] = schedule;
  else all[dateStr].push(schedule);
  localStorage.setItem('schedules_v2', JSON.stringify(all));
}
function deleteScheduleForDate(dateStr, id) {
  const all = getAllSchedules();
  if (all[dateStr]) {
    all[dateStr] = all[dateStr].filter(s => s.id !== id);
    if (!all[dateStr].length) delete all[dateStr];
  }
  localStorage.setItem('schedules_v2', JSON.stringify(all));
}

/* ── Theme (original) ── */
function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme === 'dark' ? 'dark' : '');
  localStorage.setItem('darkMode', newTheme === 'dark' ? '1' : '0');
}

/* ── Suggestion Logic ── */
let suggestionIndex = -1;

function getTodaySuggestionIndex() {
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  return seed % SUGGESTIONS.length;
}
function getRandomSuggestion() {
  if (suggestionIndex < 0) suggestionIndex = getTodaySuggestionIndex();
  return SUGGESTIONS[suggestionIndex % SUGGESTIONS.length];
}
function refreshSuggestion() {
  suggestionIndex = (suggestionIndex + 1) % SUGGESTIONS.length;
  renderHomeSuggestion();
}


/* ── State ── */
let currentDate = new Date();
const today = new Date();
let currentView = 'month';
let currentPage = 'home';
let editingDate = null;
let editingSchedId = null;

/* ── Format helpers ── */
function fmtDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日';
}
function formatDateStr(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function genId() { return 's_' + Date.now() + '_' + Math.random().toString(36).slice(2,6); }
function escHtml(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

/* ═══════════════ PAGE NAVIGATION ═══════════════ */
function switchPage(page) {
  if (page === currentPage) return;
  currentPage = page;
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });
  // Reset nav on page switch
  document.getElementById('mainNav').classList.remove('hidden');
  navLastScroll = 0;
  if (page === 'home') renderHome();
  else if (page === 'calendar') render();
  else if (page === 'about') renderAbout();
}

/* ═══════════════ HOME PAGE ═══════════════ */
function updateTime() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('heroTime').textContent = h + ':' + m;
}

function renderHome() {
  const weekStr = '星期' + ['日','一','二','三','四','五','六'][today.getDay()];
  document.getElementById('heroDate').textContent =
    today.getFullYear() + '.' + String(today.getMonth() + 1).padStart(2, '0') + '.' + String(today.getDate()).padStart(2, '0') + ' ' + ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][today.getDay()];

  updateTime();
  const lunar = solarToLunar(today.getFullYear(), today.getMonth(), today.getDate());
  document.getElementById('heroLunar').textContent = lunar ? '农历' + formatLunar(lunar) : '';

  // Collect this week's schedules
  const weekStart = new Date(today);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const allScheds = getAllSchedules();
  const weekItems = [];
  for (let d = new Date(weekStart); d <= weekEnd; d.setDate(d.getDate() + 1)) {
    const ds = formatDateStr(d);
    const dayScheds = allScheds[ds] || [];
    for (const s of dayScheds) {
      weekItems.push({ ...s, dateStr: ds, day: d.getDate(), weekday: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()] });
    }
  }
  const listEl = document.getElementById('todayScheduleList');
  const emptyEl = document.getElementById('todayEmpty');
  if (weekItems.length) {
    emptyEl.style.display = 'none';
    listEl.style.display = '';
    listEl.innerHTML = weekItems.slice(0, 10).map(s => {
      const timeStr = s.time ? ` ${s.time}` : '';
      return `<div class="schedule-item" data-date="${s.dateStr}" data-id="${s.id}">
        <div class="schedule-prio ${s.priority || 'medium'}"></div>
        <div class="schedule-info">
          <div class="s-title">${s.weekday} ${s.day}日${timeStr} ${escHtml(s.title)}</div>
        </div>
      </div>`;
    }).join('');
  } else {
    emptyEl.style.display = '';
    listEl.style.display = 'none';
  }

  renderHomeSuggestion();
  renderWeekPreview();
  document.querySelector('#page-home .page-scroll').scrollTop = 0;
}

function renderHomeSuggestion() {
  const sug = getRandomSuggestion();
  const badge = document.getElementById('suggestionCat');
  badge.textContent = ({health:'健康', efficiency:'效率', mind:'心灵'})[sug.cat] || sug.cat;
  badge.dataset.cat = sug.cat;
  document.getElementById('suggestionText').textContent = sug.text;
}

function renderWeekPreview() {
  const container = document.getElementById('weekPreview');
  const start = new Date(today);
  start.setDate(start.getDate() - start.getDay());
  const allScheds = getAllSchedules();
  let html = '';
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const ds = formatDateStr(d);
    const isToday = d.toDateString() === today.toDateString();
    const hasSched = !!(allScheds[ds] && allScheds[ds].length);
    html += `<button class="week-preview-item${isToday ? ' today' : ''}" data-date="${ds}">
      <span class="wp-weekday">${['日','一','二','三','四','五','六'][d.getDay()]}</span>
      <span class="wp-day">${d.getDate()}</span>
      ${hasSched ? '<span class="wp-dot"></span>' : ''}
    </button>`;
  }
  container.innerHTML = html;
  container.querySelectorAll('.week-preview-item').forEach(el => {
    el.addEventListener('click', () => {
      currentDate = new Date(el.dataset.date + 'T00:00:00');
      switchPage('calendar');
    });
  });
}

function renderScheduleItem(s, dateStr) {
  const timeStr = s.time ? `<span class="s-meta">${s.time}</span>` : '';
  return `<div class="schedule-item" data-date="${dateStr}" data-id="${s.id}">
    <div class="schedule-prio ${s.priority || 'medium'}"></div>
    <div class="schedule-info">
      <div class="s-title">${escHtml(s.title)}</div>
      ${timeStr}
    </div>
  </div>`;
}

/* ═══════════════ CALENDAR (original, restored) ═══════════════ */
function navigate(delta) {
  if (currentView === 'month') { currentDate.setMonth(currentDate.getMonth() + delta); }
  else if (currentView === 'week') { currentDate.setDate(currentDate.getDate() + delta * 7); }
  else { currentDate.setFullYear(currentDate.getFullYear() + delta); }
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

function triggerAnimation(container) {
  container.classList.remove('animate');
  void container.offsetWidth;
  container.classList.add('animate');
}

function updateTodayBtn() {
  const btn = document.getElementById('todayBtn');
  if (currentView === 'month') {
    const diff = today.getFullYear() * 12 + today.getMonth() - (currentDate.getFullYear() * 12 + currentDate.getMonth());
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

/* ── Render month grid (original + schedule dots) ── */
function getMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();
  const notes = getNotes();
  const allScheds = getAllSchedules();
  const cells = [];

  const prevM = month === 0 ? 11 : month - 1;
  const prevY = month === 0 ? year - 1 : year;
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevDays - i;
    cells.push({ day: d, other: true, dateStr: `${prevY}-${String(prevM + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`, lunar: null, holidays: [], schedules: [] });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const lunar = solarToLunar(year, month, d);
    const holidays = getHolidays(year, month, d, lunar);
    const scheds = (allScheds[dateStr] && allScheds[dateStr].length) ? allScheds[dateStr] : [];
    cells.push({
      day: d, other: false, dateStr, lunar, holidays,
      isToday: year === today.getFullYear() && month === today.getMonth() && d === today.getDate(),
      hasNote: !!notes[dateStr] || scheds.length > 0, schedules: scheds
    });
  }

  const remaining = (7 - cells.length % 7) % 7;
  const nextM = month === 11 ? 0 : month + 1;
  const nextY = month === 11 ? year + 1 : year;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, other: true, dateStr: `${nextY}-${String(nextM + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`, lunar: null, holidays: [], schedules: [] });
  }
  return cells;
}

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
  container.querySelectorAll('span:not(.other-month):not(.wd-header)').forEach(el => {
    el.addEventListener('click', () => openScheduleModal(el.dataset.date, null));
  });
}

function renderWeek(date) {
  const container = document.getElementById('daysContainer');
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  const notes = getNotes();
  const allScheds = getAllSchedules();
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
    const hasSched = !!(allScheds[dateStr] && allScheds[dateStr].length);
    html += `<span class="note-star${notes[dateStr] || hasSched ? ' has-note' : ''}">★</span>`;
    html += `</span>`;
  }

  container.innerHTML = html;
  container.style.display = 'grid';
  document.getElementById('calendarContainer').classList.remove('year-active');
  triggerAnimation(container);
  container.querySelectorAll('span:not(.wd-header)').forEach(el => {
    el.addEventListener('click', () => openScheduleModal(el.dataset.date, null));
  });
}

function renderYear(year) {
  const container = document.getElementById('daysContainer');
  const notes = getNotes();
  const allScheds = getAllSchedules();

  let html = '<div class="year-grid">';
  for (let m = 0; m < 12; m++) {
    const firstDay = new Date(year, m, 1).getDay();
    const daysInMonth = new Date(year, m + 1, 0).getDate();
    const prevDays = new Date(year, m, 0).getDate();
    const grid = [];

    for (let i = firstDay - 1; i >= 0; i--) { grid.push({ day: prevDays - i, other: true }); }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const hasSched = !!(allScheds[dateStr] && allScheds[dateStr].length);
      grid.push({
        day: d, other: false,
        isToday: year === today.getFullYear() && m === today.getMonth() && d === today.getDate(),
        hasNote: !!notes[dateStr] || hasSched, hasSched
      });
    }
    const rem = (7 - grid.length % 7) % 7;
    for (let d = 1; d <= rem; d++) { grid.push({ day: d, other: true }); }

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
      document.querySelectorAll('.view-btn').forEach(b => b.classList.toggle('active', b.dataset.view === 'month'));
      render();
    });
  });
}

function render() {
  updateHeader();
  updateTodayBtn();
  if (currentView === 'month') { renderMonth(currentDate.getFullYear(), currentDate.getMonth()); }
  else if (currentView === 'week') { renderWeek(currentDate); }
  else { renderYear(currentDate.getFullYear()); }
}

/* ═══════════════ SCHEDULE MODAL ═══════════════ */
function openScheduleModal(dateStr, sched) {
  editingDate = dateStr;
  editingSchedId = sched ? sched.id : null;
  document.getElementById('modalDateLabel').textContent = fmtDate(dateStr);

  if (sched) {
    document.getElementById('scheduleTitle').value = sched.title || '';
    document.getElementById('scheduleTime').value = sched.time || '';
    document.getElementById('scheduleNote').value = sched.note || '';
    document.querySelectorAll('.prio-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.prio === (sched.priority || 'medium'));
    });
    document.getElementById('deleteSchedule').style.display = 'block';
  } else {
    document.getElementById('scheduleTitle').value = '';
    document.getElementById('scheduleTime').value = '';
    document.getElementById('scheduleNote').value = '';
    document.querySelectorAll('.prio-btn').forEach((b, i) => b.classList.toggle('active', i === 1));
    document.getElementById('deleteSchedule').style.display = 'none';
  }
  document.getElementById('scheduleModal').classList.add('show');
  document.getElementById('scheduleTitle').focus();
}

function closeScheduleModal() {
  document.getElementById('scheduleModal').classList.remove('show');
  editingDate = null;
  editingSchedId = null;
}

function saveScheduleFromModal() {
  if (!editingDate) return;
  const title = document.getElementById('scheduleTitle').value.trim();
  if (!title) { document.getElementById('scheduleTitle').focus(); return; }
  const time = document.getElementById('scheduleTime').value;
  const note = document.getElementById('scheduleNote').value.trim();
  const priority = document.querySelector('.prio-btn.active')?.dataset.prio || 'medium';
  saveScheduleForDate(editingDate, { id: editingSchedId || genId(), title, time, priority, note });
  closeScheduleModal();
  if (currentPage === 'home') renderHome();
  else render();
}

function deleteScheduleFromModal() {
  if (!editingDate || !editingSchedId) return;
  deleteScheduleForDate(editingDate, editingSchedId);
  closeScheduleModal();
  if (currentPage === 'home') renderHome();
  else render();
}

/* ═══════════════ ABOUT PAGE ═══════════════ */
function renderAbout() {
  // Static content via HTML, nothing to render dynamically
}

/* ═══════════════ EVENT LISTENERS ═══════════════ */
document.getElementById('themeBtn').addEventListener('click', toggleTheme);

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => switchPage(btn.dataset.page));
});

document.getElementById('prevBtn').addEventListener('click', () => navigate(-1));
document.getElementById('nextBtn').addEventListener('click', () => navigate(1));
document.getElementById('todayBtn').addEventListener('click', goToToday);

document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('click', () => switchView(btn.dataset.view));
});

document.querySelector('.card-link[data-page="calendar"]')?.addEventListener('click', () => switchPage('calendar'));
document.getElementById('refreshSuggestion')?.addEventListener('click', refreshSuggestion);

document.getElementById('fabBtn')?.addEventListener('click', () => {
  openScheduleModal(formatDateStr(today), null);
});

// Schedule card click (delegated)
document.addEventListener('click', (e) => {
  const item = e.target.closest('.schedule-item');
  if (item) {
    const dateStr = item.dataset.date;
    const id = item.dataset.id;
    const scheds = getSchedulesForDate(dateStr);
    const sched = scheds.find(s => s.id === id);
    if (sched) openScheduleModal(dateStr, sched);
  }
});

// Modal
document.getElementById('saveSchedule').addEventListener('click', saveScheduleFromModal);
document.getElementById('deleteSchedule').addEventListener('click', deleteScheduleFromModal);
document.getElementById('closeModal').addEventListener('click', closeScheduleModal);
document.getElementById('scheduleModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeScheduleModal();
});

// Priority buttons
document.querySelectorAll('.prio-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.prio-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeScheduleModal(); return; }
  if (document.getElementById('scheduleModal').classList.contains('show')) return;
  if (currentPage === 'calendar') {
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  }
});

document.getElementById('scheduleNote')?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.ctrlKey) saveScheduleFromModal();
});

/* ── Scroll: nav auto-hide ── */
let navLastScroll = 0;
document.querySelectorAll('.page-scroll').forEach(el => {
  el.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    const st = el.scrollTop;
    if (st > navLastScroll && st > 10) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }
    navLastScroll = Math.max(0, st);
  });
});

/* ── Init ── */
if (localStorage.getItem('darkMode') === '1') {
  document.documentElement.setAttribute('data-theme', 'dark');
}

renderHome();
render();

// Clock refresh every 30s
setInterval(updateTime, 30000);
