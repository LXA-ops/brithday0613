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
  { id:'s37', text:'每天喝够8杯水，皮肤和身体都会感谢你。', cat:'health' },
  { id:'s38', text:'在办公桌上放一个大水杯，看到就会想喝水。', cat:'health' },
  { id:'s39', text:'饭后半小时散步，有助消化和控制血糖。', cat:'health' },
  { id:'s40', text:'每坐45分钟就起身接杯水，既补水又活动。', cat:'health' },
  { id:'s41', text:'少喝含糖饮料，用白开水或淡茶代替。', cat:'health' },
  { id:'s42', text:'早起先喝一杯水再吃早餐，唤醒肠胃。', cat:'health' },
  { id:'s43', text:'手边常备温水，想起来就喝一小口。', cat:'health' },
  { id:'s44', text:'每天晒太阳15分钟，补充维生素D。', cat:'health' },
  { id:'s45', text:'用爬楼梯代替乘电梯，不知不觉锻炼身体。', cat:'health' },
  { id:'s46', text:'工作间隙做做眼保健操，缓解视疲劳。', cat:'health' },
  { id:'s47', text:'晚饭后不再进食，给消化系统足够的休息时间。', cat:'health' },
  { id:'s48', text:'把手机放在伸手够不到的地方，专注当下的事。', cat:'efficiency' },
  { id:'s49', text:'每天花5分钟整理桌面，保持工作区整洁。', cat:'efficiency' },
  { id:'s50', text:'重要的文件及时备份，防患于未然。', cat:'efficiency' },
  { id:'s51', text:'列一个"不做清单"，减少无意义的时间消耗。', cat:'efficiency' },
  { id:'s52', text:'周末给自己做一顿好吃的，享受烹饪的乐趣。', cat:'mind' },
  { id:'s53', text:'给远方的朋友发条消息，维系珍贵的友谊。', cat:'mind' },
  { id:'s54', text:'听一首很久没听的歌，回忆美好的过去。', cat:'mind' },
  { id:'s55', text:'关掉手机一小时，完全属于自己。', cat:'mind' },
  { id:'s56', text:'在窗边发呆十分钟，什么也不想也是充电。', cat:'mind' },
  { id:'s57', text:'买一束花放在房间里，让心情变好。', cat:'mind' },
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
  const prevPage = currentPage;
  currentPage = page;
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });
  // Theme button: show on home only for mobile
  if (isMobile()) {
    document.getElementById('themeBtn').style.display = page === 'home' ? '' : 'none';
  } else {
    document.getElementById('themeBtn').style.display = page === 'birthday' ? 'none' : '';
  }
  // Hide nav on birthday page, show/hide on mobile by page
  if (page === 'birthday') {
    document.getElementById('mainNav').classList.add('hidden');
  } else if (isMobile()) {
    if (page === 'home') {
      document.getElementById('mainNav').classList.remove('hidden');
    } else {
      document.getElementById('mainNav').classList.add('hidden');
    }
  } else {
    document.getElementById('mainNav').classList.remove('hidden');
  }
  navLastScroll = 0;
  if (page === 'home') renderHome();
  else if (page === 'calendar') render();
  else if (page === 'about') renderAbout();
  else if (page === 'birthday' && prevPage !== 'birthday') initBirthday();
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
  weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
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
        <button class="schedule-done" data-action="done" title="标记完成">✓</button>
      </div>`;
    }).join('');
  } else {
    emptyEl.style.display = '';
    listEl.style.display = 'none';
  }

  renderHomeSuggestion();
  renderWeekPreview();
  renderBirthdayLink();
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
  // Monday as first day of week
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  const allScheds = getAllSchedules();
  const wdLabels = ['一','二','三','四','五','六','日'];
  let html = '';
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const ds = formatDateStr(d);
    const isToday = d.toDateString() === today.toDateString();
    const hasSched = !!(allScheds[ds] && allScheds[ds].length);
    html += `<button class="week-preview-item${isToday ? ' today' : ''}" data-date="${ds}">
      <span class="wp-weekday">${wdLabels[i]}</span>
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

function renderBirthdayLink() {
  const m = today.getMonth(), d = today.getDate();
  // June 13
  if (m === 5 && d === 13) {
    const container = document.getElementById('todayScheduleList').parentElement;
    const old = container.querySelector('.birthday-link');
    if (old) old.remove();
    const link = document.createElement('button');
    link.className = 'birthday-link';
    link.innerHTML = '🎂 今天是你的生日！点击查看惊喜 →';
    link.addEventListener('click', () => switchPage('birthday'));
    container.appendChild(link);
  }
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
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === currentView);
  });
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
    weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
    const todayStart = new Date(today);
    todayStart.setDate(todayStart.getDate() - ((todayStart.getDay() + 6) % 7));
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
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
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
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
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
  const wds = ['一', '二', '三', '四', '五', '六', '日'];
  let html = '';

  wds.forEach((wd, i) => {
    const cls = (i === 5 || i === 6) ? 'wd-header weekend' : 'wd-header';
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

  // renderMonth
  container.innerHTML = html;
  container.style.display = 'grid';
  const cc = document.getElementById('calendarContainer');
  cc.classList.remove('year-active', 'week-active');
  triggerAnimation(container);
  container.querySelectorAll('span:not(.other-month):not(.wd-header)').forEach(el => {
    el.addEventListener('click', () => openScheduleModal(el.dataset.date, null));
  });
}

function renderWeek(date) {
  const container = document.getElementById('daysContainer');
  const start = new Date(date);
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  const notes = getNotes();
  const allScheds = getAllSchedules();
  const wds = ['一', '二', '三', '四', '五', '六', '日'];

  let html = '';
  wds.forEach((wd, i) => {
    const cls = (i === 5 || i === 6) ? 'wd-header weekend' : 'wd-header';
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

  // renderWeek
  container.innerHTML = html;
  container.style.display = 'grid';
  const cc = document.getElementById('calendarContainer');
  cc.classList.remove('year-active');
  cc.classList.add('week-active');
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
    const firstDay = (new Date(year, m, 1).getDay() + 6) % 7;
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
    html += `<div class="ym-weekdays"><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span></div>`;
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
  const cc = document.getElementById('calendarContainer');
  cc.classList.remove('week-active');
  cc.classList.add('year-active');
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
  // Handle completion
  const doneBtn = e.target.closest('[data-action="done"]');
  if (doneBtn) {
    const item = doneBtn.closest('.schedule-item');
    const dateStr = item.dataset.date;
    const id = item.dataset.id;
    deleteScheduleForDate(dateStr, id);
    renderHome();
    render();
    return;
  }
  // Open schedule modal
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
function isMobile() { return window.innerWidth <= 660; }

// On mobile, nav starts visible
if (isMobile()) {
  document.getElementById('mainNav').classList.remove('hidden');
}

document.querySelectorAll('.page-scroll').forEach(el => {
  el.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    const st = el.scrollTop;

    if (isMobile()) {
      if (currentPage === 'home') {
        // Home: hide on scroll down, show on scroll up
        if (st > navLastScroll && st > 10) {
          nav.classList.add('hidden');
        } else {
          nav.classList.remove('hidden');
        }
        navLastScroll = Math.max(0, st);
      } else {
        // Other pages: only show when pulled to top
        if (st <= 5) {
          nav.classList.remove('hidden');
        } else {
          nav.classList.add('hidden');
        }
      }
      // Desktop: auto-hide on scroll down, show on scroll up
      if (st > navLastScroll && st > 10) {
        nav.classList.add('hidden');
      } else {
        nav.classList.remove('hidden');
      }
      navLastScroll = Math.max(0, st);
    }
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

/* ── About More Toggle ── */
document.getElementById('aboutMoreBtn').addEventListener('click', function() {
  const content = document.getElementById('aboutMoreContent');
  const isOpen = content.classList.toggle('open');
  this.textContent = isOpen ? '收起' : '更多';
});

// ============================================================
//  BIRTHDAY PAGE
// ============================================================
let bdayParticles = [];
let bdayFrame = 0;
let bdayBalloonInterval = null;
let bdayCandlesBlown = false;
let bdayInitialized = false;

function initBirthday() {
  if (bdayInitialized) {
    // Reset steps
    document.querySelectorAll('.bday-step').forEach(s => s.classList.remove('active'));
    document.getElementById('bstep1').classList.add('active');
    document.getElementById('bdayWish').classList.remove('show');
    document.getElementById('bdayBackBtn').style.display = 'block';
    document.getElementById('bdayCandle').classList.remove('out');
    document.getElementById('bdayHint').textContent = '点击蛋糕吹蜡烛 🕯️';
    document.getElementById('bdayHint').style.opacity = '';
    bdayCandlesBlown = false;
    return;
  }
  bdayInitialized = true;

  const canvas = document.getElementById('bdayCanvas');
  const ctx = canvas.getContext('2d');
  let W, H;
  function resize() { W = canvas.width = canvas.clientWidth; H = canvas.height = canvas.clientHeight; }
  resize();
  window.addEventListener('resize', resize);

  // Particles
  class BdayParticle {
    constructor(x, y, color) {
      this.x = x; this.y = y;
      this.color = color;
      const a = Math.random() * Math.PI * 2;
      const s = Math.random() * 5 + 2;
      this.vx = Math.cos(a) * s;
      this.vy = Math.sin(a) * s;
      this.life = 1;
      this.decay = Math.random() * 0.018 + 0.008;
      this.size = Math.random() * 3 + 1.5;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      this.vy += 0.04; this.vx *= 0.99;
      this.life -= this.decay;
    }
    draw() {
      ctx.globalAlpha = Math.max(0, this.life);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * Math.max(0.1, this.life), 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  const PALETTES = [
    ['#e94560','#f0e68c','#fff'],
    ['#74b9ff','#55efc4','#fff'],
    ['#fd79a8','#f0e68c','#c084fc'],
    ['#ff9a8b','#fbbf24','#f472b6'],
    ['#34d399','#60a5fa','#a78bfa'],
  ];

  function burst(cx, cy, count, colors) {
    for (let i = 0; i < count; i++) {
      bdayParticles.push(new BdayParticle(cx, cy, colors[Math.floor(Math.random() * colors.length)]));
    }
  }

  function autoBurst() {
    const p = PALETTES[Math.floor(Math.random() * PALETTES.length)];
    const x = Math.random() * W * 0.6 + W * 0.2;
    const y = Math.random() * H * 0.5 + H * 0.05;
    burst(x, y, 60, p);
    setTimeout(() => burst(x, y, 30, p), 120);
  }

  function celebrateBursts() {
    const centers = [
      [W/2, H/3, 90, ['#e94560','#f0e68c','#74b9ff','#fd79a8','#fff']],
      [W*0.25, H*0.35, 60, ['#f472b6','#f0e68c','#fff']],
      [W*0.75, H*0.35, 60, ['#74b9ff','#55efc4','#fff']],
      [W*0.4, H*0.2, 50, ['#ff9a8b','#fbbf24','#c084fc']],
      [W*0.6, H*0.2, 50, ['#34d399','#60a5fa','#a78bfa']],
    ];
    centers.forEach(([x, y, c, pal], i) => {
      setTimeout(() => burst(x, y, c, pal), i * 150);
    });
  }

  function animLoop() {
    if (!document.getElementById('page-birthday').classList.contains('active')) {
      requestAnimationFrame(animLoop);
      return;
    }
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(15,12,41,0.25)';
    ctx.fillRect(0, 0, W, H);

    bdayFrame++;
    if (bdayFrame % 12 === 0 && Math.random() < 0.35) autoBurst();
    if (bdayFrame % 40 === 0 && Math.random() < 0.3) autoBurst();

    for (let i = bdayParticles.length - 1; i >= 0; i--) {
      const p = bdayParticles[i];
      p.update(); p.draw();
      if (p.life <= 0) bdayParticles.splice(i, 1);
    }
    requestAnimationFrame(animLoop);
  }
  animLoop();

  // Click fireworks on birthday page only
  document.getElementById('page-birthday').addEventListener('click', (e) => {
    if (!document.getElementById('page-birthday').classList.contains('active')) return;
    const rect = document.getElementById('page-birthday').getBoundingClientRect();
    const cx = e.clientX - rect.left, cy = e.clientY - rect.top;
    const colors = ['#e94560','#f0e68c','#74b9ff','#55efc4','#fd79a8','#fbbf24','#34d399'];
    for (let i = 0; i < 3; i++) {
      setTimeout(() => burst(cx + (Math.random()-0.5)*50, cy + (Math.random()-0.5)*50, 30, colors), i * 100);
    }
  });

  // Balloons
  const BALLOON_CHARS = ['🎈','🎈','🎈','⭐','💫','🎉','🎊','💖'];
  function spawnBalloon() {
    const area = document.getElementById('bdayBalloonArea');
    const el = document.createElement('div');
    el.className = 'bday-balloon';
    el.textContent = BALLOON_CHARS[Math.floor(Math.random() * BALLOON_CHARS.length)];
    el.style.left = Math.random() * 92 + '%';
    el.style.fontSize = (Math.random() * 16 + 28) + 'px';
    const dur = Math.random() * 6 + 10;
    el.style.animationDuration = dur + 's';
    area.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000 + 200);
  }

  function startBalloons() {
    if (bdayBalloonInterval) return;
    for (let i = 0; i < 3; i++) setTimeout(spawnBalloon, i * 200);
    bdayBalloonInterval = setInterval(spawnBalloon, 600);
    setTimeout(() => {
      if (bdayBalloonInterval) {
        clearInterval(bdayBalloonInterval);
        bdayBalloonInterval = setInterval(spawnBalloon, 2000);
      }
    }, 30000);
  }

  // Confetti
  function spawnConfetti(count) {
    const colors = ['#e94560','#f0e68c','#74b9ff','#55efc4','#fd79a8','#34d399','#fbbf24','#c084fc'];
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'bday-confetti';
      el.style.left = Math.random() * 100 + '%';
      el.style.top = '-10px';
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      const s = Math.random() * 6 + 4;
      el.style.width = s + 'px';
      el.style.height = s + 'px';
      el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      el.style.animationDuration = (Math.random() * 2 + 3) + 's';
      el.style.animationDelay = (Math.random() * 2) + 's';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 6000);
    }
  }

  // Typewriter
  function startTypewriter() {
    const el = document.getElementById('bdayTypewriter');
    const text = 'Happy Birthday';
    el.textContent = '';
    let i = 0;
    const tw = setInterval(() => {
      if (i < text.length) { el.textContent += text[i]; i++; }
      else { clearInterval(tw); el.classList.add('done'); }
    }, 100);
  }

  // Step 1 → Step 2
  document.getElementById('bdayStartBtn').addEventListener('click', () => {
    document.querySelectorAll('.bday-step').forEach(s => s.classList.remove('active'));
    document.getElementById('bstep2').classList.add('active');
    startBalloons();
    startTypewriter();
    for (let i = 0; i < 4; i++) setTimeout(autoBurst, i * 300);
    for (let i = 0; i < 8; i++) setTimeout(spawnBalloon, i * 120);
    setTimeout(() => {
      for (let i = 0; i < 5; i++) setTimeout(spawnBalloon, i * 150);
    }, 1500);
  });

  // Blow candles
  document.getElementById('bdayCake').addEventListener('click', () => {
    if (bdayCandlesBlown) return;
    bdayCandlesBlown = true;
    document.getElementById('bdayCandle').classList.add('out');
    document.getElementById('bdayHint').textContent = '🎉 许个愿吧！';
    document.getElementById('bdayHint').style.opacity = '0.5';
    setTimeout(() => {
      celebrateBursts();
      spawnConfetti(80);
      setTimeout(() => spawnConfetti(60), 600);
      setTimeout(() => spawnConfetti(40), 1200);
      for (let i = 0; i < 6; i++) setTimeout(spawnBalloon, i * 150);
    }, 700);
    setTimeout(() => {
      document.getElementById('bdayWish').classList.add('show');
    }, 1400);
  });

  // Back to home
  document.getElementById('bdayBackBtn').addEventListener('click', () => {
    switchPage('home');
  });
}
