/* =====================================================================
   SETTINGS MODULE — all right sidebar menu items live here.
   Independent module: delete this file and the app keeps working
   (the right menu simply disappears). Talks to the shell only via DV.
   ===================================================================== */
(function() {
  try {
    if (!window.DV) return;
    var dvState = DV.state;

    /* ===== 10 THEMES ===== */
    var dvThemes = [
      { name:'blue',   hex:'#1877F2' },
      { name:'purple', hex:'#7C3AED' },
      { name:'green',  hex:'#16A34A' },
      { name:'red',    hex:'#DC2626' },
      { name:'orange', hex:'#EA580C' },
      { name:'teal',   hex:'#0D9488' },
      { name:'pink',   hex:'#DB2777' },
      { name:'indigo', hex:'#4F46E5' },
      { name:'amber',  hex:'#D97706' },
      { name:'slate',  hex:'#475569' }
    ];

    /* ===== RIGHT NAV ITEMS ===== */
    var dvRightNavItems = [
      { key:'todo', label:'To-Do List', icon:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>' },
      { key:'install', label:'Install App', icon:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>' },
      { key:'share_app', label:'Share App', icon:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>' },
      { key:'close_right', label:'Exit Sidebar', icon:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' }
    ];

    /* ===== THEME ===== */
    function dvSetTheme(name) {
      dvState.theme = name;
      document.documentElement.setAttribute('data-dv-theme', name);
      localStorage.setItem('dv-theme', name);
      // Update color dot active states
      document.querySelectorAll('.dv-color-dot').forEach(function(d) {
        d.classList.toggle('dv-active-dot', d.getAttribute('data-dv-theme') === name);
      });
      var found = dvThemes.filter(function(t) { return t.name === name; });
      if (found.length) {
        document.getElementById('dvMetaTheme').setAttribute('content', found[0].hex);
      }
    }

    /* ===== DARK MODE ===== */
    function dvSetDark(on) {
      dvState.darkMode = on;
      if (on) document.documentElement.setAttribute('data-dv-dark', '1');
      else document.documentElement.removeAttribute('data-dv-dark');
      localStorage.setItem('dv-dark', on ? '1' : '0');
      var toggle = document.getElementById('dvDarkToggle');
      if (toggle) toggle.classList.toggle('dv-on', on);
    }

    /* ===== BUILD RIGHT SIDEBAR CONTENT ===== */
    function dvBuildRightNav() {
      var box = document.getElementById('dvRightSidebar');
      box.innerHTML =
        '<!-- Color picker -->' +
        '<div class="dv-color-row" id="dvColorRow"></div>' +
        '<!-- Dark mode -->' +
        '<div class="dv-toggle-row">' +
          '<span class="dv-toggle-label">Dark Mode</span>' +
          '<button class="dv-toggle-switch" id="dvDarkToggle" aria-label="Toggle dark mode">' +
            '<span class="dv-toggle-thumb"></span>' +
          '</button>' +
        '</div>' +
        '<!-- Right menu items -->' +
        '<div id="dvRightNav"></div>';

      // Color dots
      var colorRow = document.getElementById('dvColorRow');
      var colorHtml = '';
      for (var i = 0; i < dvThemes.length; i++) {
        var t = dvThemes[i];
        colorHtml += '<button class="dv-color-dot' + (dvState.theme === t.name ? ' dv-active-dot' : '') +
          '" style="background:' + t.hex + ';" data-dv-theme="' + t.name + '" aria-label="' + t.name + ' theme"></button>';
      }
      colorRow.innerHTML = colorHtml;
      colorRow.querySelectorAll('.dv-color-dot').forEach(function(dot) {
        dot.addEventListener('click', function() {
          dvSetTheme(dot.getAttribute('data-dv-theme'));
          DV.closeSidebars();
        });
      });

      // Dark toggle state
      var darkToggle = document.getElementById('dvDarkToggle');
      if (dvState.darkMode) darkToggle.classList.add('dv-on');
      else darkToggle.classList.remove('dv-on');
      darkToggle.addEventListener('click', function() {
        dvSetDark(!dvState.darkMode);
      });

      // Right nav items
      var nav = document.getElementById('dvRightNav');
      var html = '';
      for (var j = 0; j < dvRightNavItems.length; j++) {
        var item = dvRightNavItems[j];
        html += '<button class="dv-right-item" data-dv-rkey="' + item.key + '">' +
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' + item.icon + '</svg>' +
          item.label + '</button>';
      }
      nav.innerHTML = html;
      nav.querySelectorAll('.dv-right-item').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var key = btn.getAttribute('data-dv-rkey');
          DV.closeSidebars();
          if (key === 'close_right') return;
          if (key === 'install') { dvHandleInstall(); return; }
          if (key === 'share_app') { dvShareApp(); return; }
          if (key === 'todo') { DV.navigate('to-do'); return; }
        });
      });
    }

    /* ===== INSTALL ===== */
    function dvHandleInstall() {
      if (dvState.deferredInstall) {
        dvState.deferredInstall.prompt();
        dvState.deferredInstall.userChoice.then(function(r) {
          if (r.outcome === 'accepted') DV.toast('App installed successfully!');
          dvState.deferredInstall = null;
        });
      } else {
        DV.toast('Use browser menu to install this app');
      }
    }
    window.addEventListener('beforeinstallprompt', function(e) {
      e.preventDefault();
      dvState.deferredInstall = e;
    });

    /* ===== SHARE APP ===== */
    function dvShareApp() {
      if (navigator.share) {
        navigator.share({ title:'Verse For My Situation', text:'Scripture for every situation — 100+ Bible verses, fully offline.', url: window.location.href }).catch(function(){});
      } else {
        navigator.clipboard && navigator.clipboard.writeText(window.location.href).then(function() {
          DV.toast('App link copied');
        });
      }
    }

    /* ===== TODO MODAL ===== */
    var dvTodos = [];
    function dvLoadTodos() {
      try { dvTodos = JSON.parse(localStorage.getItem('dv-todos') || '[]'); } catch(e) { dvTodos = []; }
    }
    function dvSaveTodos() {
      try { localStorage.setItem('dv-todos', JSON.stringify(dvTodos)); } catch(e) {}
    }
    function dvBuildTodoHTML() {
      var html = '<div style="margin-bottom:14px;">' +
        '<div style="display:flex;gap:8px;width:100%;box-sizing:border-box;">' +
        '<input type="text" id="dvTodoInput" style="flex:1;min-width:0;padding:12px;border:2px solid var(--dv-border);border-radius:10px;background:var(--dv-bg);color:var(--dv-text);font-size:1rem;font-family:inherit;box-sizing:border-box;" placeholder="Add a task...">' +
        '<button id="dvTodoAdd" style="flex-shrink:0;padding:12px 18px;background:var(--dv-primary);color:#fff;border:none;border-radius:10px;font-size:1rem;font-family:inherit;cursor:pointer;font-weight:700;">Add</button>' +
        '</div></div>' +
        '<div id="dvTodoList"></div>';
      return html;
    }
    function dvRenderTodos() {
      var list = document.getElementById('dvTodoList');
      if (!list) return;
      if (!dvTodos.length) {
        list.innerHTML = '<div class="dv-empty"><div class="dv-empty-text">No tasks yet. Add one above.</div></div>';
        return;
      }
      var html = '';
      for (var i = 0; i < dvTodos.length; i++) {
        var t = dvTodos[i];
        html += '<div style="display:flex;align-items:center;gap:10px;padding:12px;background:var(--dv-surface);border-radius:10px;margin-bottom:8px;border:1px solid var(--dv-border);">' +
          '<input type="checkbox" ' + (t.done ? 'checked' : '') + ' data-dv-ti="' + i + '" style="width:22px;height:22px;accent-color:var(--dv-primary);cursor:pointer;">' +
          '<span style="flex:1;font-size:1rem;' + (t.done ? 'text-decoration:line-through;color:var(--dv-text-sub);' : '') + '">' + t.text + '</span>' +
          '<button data-dv-tdel="' + i + '" style="background:transparent;border:none;color:#DC2626;cursor:pointer;padding:4px;font-size:1.1rem;">X</button>' +
          '</div>';
      }
      list.innerHTML = html;
    }
    function dvBindTodoEvents() {
      dvLoadTodos();
      dvRenderTodos();
      var addBtn = document.getElementById('dvTodoAdd');
      var input = document.getElementById('dvTodoInput');
      if (addBtn) addBtn.addEventListener('click', function() {
        var val = input.value.trim();
        if (!val) return;
        dvTodos.push({ text: val, done: false });
        dvSaveTodos();
        input.value = '';
        dvRenderTodos();
        dvBindTodoCheckboxes();
      });
      if (input) input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') addBtn.click();
      });
      dvBindTodoCheckboxes();
    }
    function dvBindTodoCheckboxes() {
      var list = document.getElementById('dvTodoList');
      if (!list) return;
      list.querySelectorAll('input[data-dv-ti]').forEach(function(cb) {
        cb.addEventListener('change', function() {
          var idx = parseInt(cb.getAttribute('data-dv-ti'));
          dvTodos[idx].done = cb.checked;
          dvSaveTodos();
          dvRenderTodos();
          dvBindTodoCheckboxes();
        });
      });
      list.querySelectorAll('button[data-dv-tdel]').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var idx = parseInt(btn.getAttribute('data-dv-tdel'));
          dvTodos.splice(idx, 1);
          dvSaveTodos();
          dvRenderTodos();
          dvBindTodoCheckboxes();
        });
      });
    }

    /* ===== REGISTER WITH THE SHELL ===== */
    DV.route('to-do', {
      title: 'To-Do List',
      open: function() { DV.openModal('To-Do List', dvBuildTodoHTML(), dvBindTodoEvents); },
      close: function() { DV.closeModal(); }
    });

    // Load persisted settings
    var savedTheme = localStorage.getItem('dv-theme') || 'blue';
    var savedDark = localStorage.getItem('dv-dark') === '1';
    dvSetTheme(savedTheme);
    dvSetDark(savedDark);
    dvLoadTodos();

    DV.addRightSection(function() { dvBuildRightNav(); });
  } catch (e) {}
})();
