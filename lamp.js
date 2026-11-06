// ── kptimes Study Engine: Student Onboarding, Lock In / Locked In & Study Time Tracker ──
(function () {
  function initStudyEngine() {
    // 1. Clean up any obsolete lamp/banner/RGB laser elements
    var oldLamp = document.getElementById('studyLamp');
    if (oldLamp) oldLamp.remove();
    var oldBanner = document.getElementById('lockedInBanner');
    if (oldBanner) oldBanner.remove();
    var oldLaser = document.getElementById('navLaserBorder');
    if (oldLaser) oldLaser.remove();

    var nav = document.querySelector('.nav');
    if (!nav) return;
    retryPendingEnrollment();

    // ── 2. USER PROFILE & VISIT LOGGING ──────────────────────
    function getUser() {
      try {
        var raw = localStorage.getItem('kptimes-user');
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        return null;
      }
    }

    function saveUser(name, email) {
      var cleanName = (name || '').trim();
      var cleanEmail = (email || '').trim();
      if (!cleanName) cleanName = 'Student';
      var user = {
        name: cleanName,
        email: cleanEmail,
        joinedAt: new Date().toISOString()
      };
      try {
        localStorage.setItem('kptimes-user', JSON.stringify(user));
        logVisit(user);
      } catch (e) {}
      updateUserUI(user);
      return user;
    }

    function logVisit(user) {
      try {
        var visits = JSON.parse(localStorage.getItem('kptimes-visits') || '[]');
        visits.push({
          name: user.name,
          email: user.email,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          page: document.title,
          userAgent: navigator.userAgent
        });
        if (visits.length > 50) visits = visits.slice(-50);
        localStorage.setItem('kptimes-visits', JSON.stringify(visits));
      } catch (e) {}
    }

    // ── 2b. ENROLLMENT SYNC (Cloudflare Worker + D1) ─────────
    var ENROLL_URL = 'https://kptimes-enroll.kalpeshvpatil0210.workers.dev/enroll';
    function sendEnrollment(name, email) {
      var payload = { name: (name || '').trim(), email: (email || '').trim(), page: window.location.pathname };
      if (!payload.name || payload.name === 'Student') return; // guests are not enrolled
      function queuePending() {
        try { localStorage.setItem('kptimes-pending-enroll', JSON.stringify(payload)); } catch (e) {}
      }
      try {
        fetch(ENROLL_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true
        }).then(function (res) {
          if (res && res.ok) {
            try {
              var raw = localStorage.getItem('kptimes-pending-enroll');
              if (raw) {
                var p = JSON.parse(raw);
                if (p && p.name === payload.name && (p.email || '') === payload.email) {
                  localStorage.removeItem('kptimes-pending-enroll');
                }
              }
            } catch (e) {}
          } else { queuePending(); }
        }).catch(queuePending);
      } catch (e) { queuePending(); }
    }
    function retryPendingEnrollment() {
      try {
        var raw = localStorage.getItem('kptimes-pending-enroll');
        if (!raw) return;
        var p = JSON.parse(raw);
        if (p && p.name) sendEnrollment(p.name, p.email || '');
      } catch (e) {}
    }

    // ── 3. ONBOARDING MODAL INJECTION ────────────────────────
    function showOnboardModal() {
      if (document.getElementById('userOnboardModal')) {
        document.getElementById('userOnboardModal').style.display = 'flex';
        return;
      }
      var modal = document.createElement('div');
      modal.id = 'userOnboardModal';
      modal.className = 'user-modal-backdrop';
      modal.innerHTML = [
        '<div class="user-modal-box">',
        '  <div class="user-modal-glow"></div>',
        '  <div class="user-modal-header">',
        '    <span class="user-modal-badge">✨ Student Setup</span>',
        '    <h2>Welcome to <span class="lime">kptimes</span><span class="dot" style="color:var(--color-accent)">.</span></h2>',
        '    <p class="user-modal-sub">Personalize your Sem III study dashboard &amp; track your daily study hours.</p>',
        '  </div>',
        '  <form id="userOnboardForm" class="user-modal-form">',
        '    <div class="form-group">',
        '      <label for="inputUserName">Your Name / Nickname</label>',
        '      <input type="text" id="inputUserName" placeholder="e.g. KP" required autocomplete="name" maxlength="32">',
        '    </div>',
        '    <div class="form-group">',
        '      <label for="inputUserEmail">Your Email Address <span style="opacity:.65">(optional)</span></label>',
        '      <input type="email" id="inputUserEmail" placeholder="Only if you want updates — otherwise leave blank" autocomplete="email">',
        '    </div>',
        '    <p class="user-modal-sub" style="margin:2px 0 0;font-size:12px;">Your name (and email, if you add it) goes to a private list only the site owner sees — never posted publicly.</p>',
        '    <div class="user-modal-actions">',
        '      <button type="submit" class="user-submit-btn">🚀 Lock In &amp; Study</button>',
        '      <button type="button" class="user-guest-btn" id="btnContinueGuest">Continue as Guest</button>',
        '    </div>',
        '  </form>',
        '</div>'
      ].join('');
      document.body.appendChild(modal);

      var form = document.getElementById('userOnboardForm');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var n = document.getElementById('inputUserName').value;
        var em = document.getElementById('inputUserEmail').value;
        saveUser(n, em);
        sendEnrollment(n, em);
        modal.style.display = 'none';

        var toast = document.getElementById('toast');
        if (toast) {
          toast.textContent = '👋 Welcome, ' + n + '! Your study dashboard is personalized.';
          toast.classList.add('show');
          setTimeout(function () { toast.classList.remove('show'); }, 2500);
        }
      });

      var guestBtn = document.getElementById('btnContinueGuest');
      if (guestBtn) {
        guestBtn.addEventListener('click', function () {
          saveUser('Student', 'guest@kptimes.in');
          modal.style.display = 'none';
        });
      }
    }

    // ── 4. CHATGPT-STYLE GREETINGS & NAVBAR PROFILE PILL ─────
    function updateUserUI(user) {
      if (!user) return;
      var name = user.name || 'Student';

      document.querySelectorAll('.user-name-fill').forEach(function (el) {
        el.textContent = name;
      });

      var pill = document.getElementById('navUserPill');
      if (pill) {
        var nameEl = pill.querySelector('.nav-user-name');
        if (nameEl) nameEl.textContent = name;
      }

      var greetingText = document.getElementById('chatgptGreetingText');
      if (greetingText) {
        greetingText.innerHTML = 'Hey, welcome back <b class="user-name-fill">' + name + '</b>! Ready to lock in? Pick your subject below or hit <b>Lock In</b> to track your hours today.';
      }
    }

    // Inject Nav User Profile Pill
    if (!document.getElementById('navUserPill')) {
      var userPill = document.createElement('button');
      userPill.id = 'navUserPill';
      userPill.className = 'nav-user-pill';
      userPill.type = 'button';
      userPill.title = 'Click to edit your name & email';
      userPill.innerHTML = '👋 Hey, <b class="nav-user-name">Student</b>';
      userPill.addEventListener('click', function () {
        showOnboardModal();
        var currentUser = getUser();
        if (currentUser) {
          var nameInput = document.getElementById('inputUserName');
          var emailInput = document.getElementById('inputUserEmail');
          if (nameInput) nameInput.value = currentUser.name || '';
          if (emailInput) emailInput.value = currentUser.email || '';
        }
      });

      var brand = nav.querySelector('.brand');
      if (brand && brand.nextSibling) {
        nav.insertBefore(userPill, brand.nextSibling);
      } else {
        nav.appendChild(userPill);
      }
    }

    // Inject ChatGPT Greeting in Hero if present
    var heroWrap = document.querySelector('.hero .wrap');
    if (heroWrap && !document.getElementById('chatgptGreeting')) {
      var chatBubble = document.createElement('div');
      chatBubble.id = 'chatgptGreeting';
      chatBubble.className = 'chatgpt-greeting';
      chatBubble.innerHTML = [
        '<div class="chatgpt-avatar">🤖</div>',
        '<div class="chatgpt-content">',
        '  <div class="chatgpt-text" id="chatgptGreetingText">',
        '    Hey, welcome <b class="user-name-fill">Student</b>! Ready to lock in for Sem III? Pick your subject below or hit <b>Lock In</b> to track your hours today.',
        '  </div>',
        '  <div class="chatgpt-meta">',
        '    <span>⏱️ <span id="chatgptStudyStats">0 mins studied today</span></span>',
        '    <span>🎯 Target: 35+ Marks</span>',
        '  </div>',
        '</div>'
      ].join('');

      var stats = heroWrap.querySelector('.stats') || heroWrap.querySelector('.countdown-box');
      if (stats) {
        heroWrap.insertBefore(chatBubble, stats);
      } else {
        heroWrap.appendChild(chatBubble);
      }
    }

    // ── 5. LOCK IN / LOCKED IN & LIVE STUDY TIME TRACKER ──────
    var studyStorageKey = 'kptimes-study-tracker';

    function getTodayString() {
      var d = new Date();
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    }

    function getStudyData() {
      var today = getTodayString();
      try {
        var raw = localStorage.getItem(studyStorageKey);
        var data = raw ? JSON.parse(raw) : null;
        if (!data || data.date !== today) {
          data = {
            date: today,
            todaySeconds: 0,
            allTimeSeconds: data ? (data.allTimeSeconds || 0) : 0,
            active: false,
            lastStart: 0
          };
          localStorage.setItem(studyStorageKey, JSON.stringify(data));
        }
        return data;
      } catch (e) {
        return { date: today, todaySeconds: 0, allTimeSeconds: 0, active: false, lastStart: 0 };
      }
    }

    function saveStudyData(data) {
      try {
        localStorage.setItem(studyStorageKey, JSON.stringify(data));
      } catch (e) {}
    }

    function formatTime(totalSeconds) {
      var h = Math.floor(totalSeconds / 3600);
      var m = Math.floor((totalSeconds % 3600) / 60);
      var s = totalSeconds % 60;
      var hh = (h < 10 ? '0' : '') + h;
      var mm = (m < 10 ? '0' : '') + m;
      var ss = (s < 10 ? '0' : '') + s;
      return hh + ':' + mm + ':' + ss;
    }

    // Inject "Lock In" Button in Navbar (Starts as "Lock In")
    var studyBtn = document.getElementById('studyModeBtn');
    if (!studyBtn) {
      studyBtn = document.createElement('button');
      studyBtn.id = 'studyModeBtn';
      studyBtn.className = 'study-mode-btn';
      studyBtn.type = 'button';
      studyBtn.title = 'Click to Lock In & track your study time (Shortcut: Alt+L)';
      studyBtn.innerHTML = '<span class="study-icon">🔒</span> <span id="studyBtnText">Lock In</span>';

      var navTimer = nav.querySelector('.nav-timer');
      if (navTimer) {
        nav.insertBefore(studyBtn, navTimer);
      } else {
        nav.appendChild(studyBtn);
      }
    }

    var timerPill = document.getElementById('studyTimerPill');
    if (!timerPill) {
      timerPill = document.createElement('div');
      timerPill.id = 'studyTimerPill';
      timerPill.className = 'study-timer-pill';
      timerPill.title = "Today's Study Time";
      timerPill.innerHTML = '<span class="timer-dot"></span> <span id="studyTimerDisplay">00:00:00</span>';

      if (studyBtn && studyBtn.nextSibling) {
        nav.insertBefore(timerPill, studyBtn.nextSibling);
      } else {
        nav.appendChild(timerPill);
      }
    }

    // Inject Study HUD right below navbar
    var hud = document.getElementById('studyHud');
    if (!hud) {
      hud = document.createElement('div');
      hud.id = 'studyHud';
      hud.className = 'study-hud';
      hud.innerHTML = [
        '<div class="study-hud-wrap">',
        '  <div class="study-hud-msg">',
        '    <span>⚡ <b>LOCKED IN</b> · Focus on 35+ Marks, <span class="user-name-fill">Student</span>!</span>',
        '  </div>',
        '  <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">',
        '    <span>Session: <span class="study-hud-time" id="hudSessionTimer">00:00:00</span></span>',
        '    <span>Today: <span class="study-hud-time" id="hudTodayTimer">00:00:00</span></span>',
        '    <div class="study-hud-actions">',
        '      <button class="study-hud-btn" id="hudPauseBtn" type="button">⏸ Pause</button>',
        '      <button class="study-hud-btn finish" id="hudFinishBtn" type="button">⏹ Finish Session</button>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join('');

      if (nav.parentNode) {
        nav.parentNode.insertBefore(hud, nav.nextSibling);
      }
    }

    // ── 6. SOUND SYNTHESIS ───────────────────────────────────
    function playChime(isStart) {
      try {
        var AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        var ctx = new AudioCtx();
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        var t = ctx.currentTime;
        if (isStart) {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(523.25, t);
          osc.frequency.exponentialRampToValueAtTime(1046.5, t + 0.1);
          gain.gain.setValueAtTime(0.15, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        } else {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, t);
          osc.frequency.exponentialRampToValueAtTime(440, t + 0.12);
          gain.gain.setValueAtTime(0.12, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
        }
        osc.start(t);
        osc.stop(t + 0.14);
      } catch (e) {}
    }

    // ── 7. TIMER ENGINE ──────────────────────────────────────
    var activeTimerInterval = null;

    function renderTimers(sessionSecs, todaySecs) {
      var navDisplay = document.getElementById('studyTimerDisplay');
      var hudSession = document.getElementById('hudSessionTimer');
      var hudToday = document.getElementById('hudTodayTimer');
      var statText = document.getElementById('chatgptStudyStats');

      var formattedToday = formatTime(todaySecs);
      var formattedSession = formatTime(sessionSecs);

      if (navDisplay) navDisplay.textContent = formattedToday;
      if (hudSession) hudSession.textContent = formattedSession;
      if (hudToday) hudToday.textContent = formattedToday;
      if (statText) {
        var mins = Math.floor(todaySecs / 60);
        statText.textContent = mins + ' min' + (mins === 1 ? '' : 's') + ' studied today';
      }
    }

    function tick() {
      var data = getStudyData();
      if (!data.active) return;
      var now = Date.now();
      var elapsedSinceLast = Math.floor((now - (data.lastTick || now)) / 1000);
      if (elapsedSinceLast < 0) elapsedSinceLast = 0;

      data.todaySeconds += (elapsedSinceLast > 0 ? elapsedSinceLast : 1);
      data.allTimeSeconds += (elapsedSinceLast > 0 ? elapsedSinceLast : 1);
      data.lastTick = now;
      saveStudyData(data);

      var currentSessionSecs = Math.floor((now - (data.lastStart || now)) / 1000);
      renderTimers(currentSessionSecs, data.todaySeconds);
    }

    function startStudyMode(playAudio) {
      var data = getStudyData();
      var now = Date.now();
      data.active = true;
      data.lastStart = data.lastStart || now;
      data.lastTick = now;
      saveStudyData(data);

      document.body.classList.add('study-mode-active');
      var btnText = document.getElementById('studyBtnText');
      if (btnText) btnText.textContent = 'Locked In';
      var studyIcon = studyBtn ? studyBtn.querySelector('.study-icon') : null;
      if (studyIcon) studyIcon.textContent = '⚡';

      if (activeTimerInterval) clearInterval(activeTimerInterval);
      activeTimerInterval = setInterval(tick, 1000);
      tick();

      if (playAudio !== false) playChime(true);

      var toast = document.getElementById('toast');
      if (toast && playAudio !== false) {
        toast.textContent = '⚡ Locked In! Deep focus session started.';
        toast.classList.add('show');
        setTimeout(function () { toast.classList.remove('show'); }, 2200);
      }
    }

    function pauseStudyMode(playAudio) {
      var data = getStudyData();
      data.active = false;
      data.lastTick = Date.now();
      saveStudyData(data);

      document.body.classList.remove('study-mode-active');
      var btnText = document.getElementById('studyBtnText');
      if (btnText) btnText.textContent = 'Lock In';
      var studyIcon = studyBtn ? studyBtn.querySelector('.study-icon') : null;
      if (studyIcon) studyIcon.textContent = '🔒';

      if (activeTimerInterval) {
        clearInterval(activeTimerInterval);
        activeTimerInterval = null;
      }
      if (playAudio !== false) playChime(false);
    }

    function finishStudySession() {
      var data = getStudyData();
      var user = getUser();
      var name = user ? user.name : 'Student';
      var sessionMins = Math.floor((Date.now() - (data.lastStart || Date.now())) / 60000);

      pauseStudyMode(false);
      data.lastStart = 0;
      saveStudyData(data);

      var btnText = document.getElementById('studyBtnText');
      if (btnText) btnText.textContent = 'Lock In';
      var studyIcon = studyBtn ? studyBtn.querySelector('.study-icon') : null;
      if (studyIcon) studyIcon.textContent = '🔒';

      var toast = document.getElementById('toast');
      if (toast) {
        toast.textContent = '🎉 Great study session, ' + name + '! You studied for ' + (sessionMins < 1 ? 'under a min' : sessionMins + ' mins') + '. Keep going!';
        toast.classList.add('show');
        setTimeout(function () { toast.classList.remove('show'); }, 3500);
      }
    }

    // Event Listeners for Lock In Controls
    if (studyBtn) {
      studyBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var data = getStudyData();
        if (data.active) {
          pauseStudyMode(true);
        } else {
          startStudyMode(true);
        }
      });
    }

    var pauseBtn = document.getElementById('hudPauseBtn');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', function (e) {
        e.preventDefault();
        pauseStudyMode(true);
      });
    }

    var finishBtn = document.getElementById('hudFinishBtn');
    if (finishBtn) {
      finishBtn.addEventListener('click', function (e) {
        e.preventDefault();
        finishStudySession();
      });
    }

    // Keyboard shortcut: Alt + L or Alt + S toggles Lock In
    window.addEventListener('keydown', function (e) {
      if (e.altKey && (e.key === 'l' || e.key === 'L' || e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        var data = getStudyData();
        if (data.active) {
          pauseStudyMode(true);
        } else {
          startStudyMode(true);
        }
      }
    });

    // ── 8. INITIALIZE ON PAGE LOAD ───────────────────────────
    var currentUser = getUser();
    if (currentUser) {
      updateUserUI(currentUser);
      logVisit(currentUser);
    } else {
      // First time entering website: prompt onboarding modal after 600ms
      setTimeout(showOnboardModal, 600);
    }

    // Restore timer & state if active
    var initialData = getStudyData();
    var currentSessionSecs = initialData.lastStart ? Math.floor((Date.now() - initialData.lastStart) / 1000) : 0;
    renderTimers(currentSessionSecs, initialData.todaySeconds);

    if (initialData.active) {
      startStudyMode(false);
    }

    // Eye-Care night paper theme default
    try {
      var savedPaper = localStorage.getItem('kptimes-paper-theme') || 'dark';
      if (!document.body.classList.contains('paper-theme-sepia') && !document.body.classList.contains('paper-theme-white')) {
        document.body.classList.add('paper-theme-' + savedPaper);
      }
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStudyEngine);
  } else {
    initStudyEngine();
  }
})();
