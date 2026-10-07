/* =====================================================================
   NEW VERSION MODULE — shown to every user whenever the app is updated.
   Independent module: delete this file and the app keeps working
   (users simply stop seeing the update notice).
   To publish a new version: change dvAppVersion below.
   ===================================================================== */
(function() {
  try {
    /* ===== APP VERSION CONTROL ===== */
    var dvAppVersion = "1.4";

    function dvBuildUpdateModal() {
      var wrap = document.createElement('div');
      wrap.id = 'dvUpdateModal';
      wrap.setAttribute('style', 'display:none; position:fixed; inset:0; z-index:999999; background:rgba(0,0,0,0.78); align-items:center; justify-content:center; padding:20px;');
      wrap.innerHTML =
        '<div class="dv-card" style="width:100%; max-width:340px; text-align:center; padding:28px 24px; margin:0 auto; box-shadow:var(--dv-shadow-lg);">' +
          '<div style="font-size:1.45rem; font-weight:800; color:var(--dv-primary); margin-bottom:12px;">Notice</div>' +
          '<div style="font-size:1.2rem; color:var(--dv-text); margin-bottom:24px; line-height:1.5;">There\'s a new version, update to use the latest version.</div>' +
          '<button class="dv-btn dv-btn-primary" id="dvUpdateOkayBtn" style="width:100%;">Okay</button>' +
        '</div>';
      document.body.appendChild(wrap);
      document.getElementById('dvUpdateOkayBtn').addEventListener('click', function() {
        try { localStorage.setItem('dv-app-version', dvAppVersion); } catch (e) {}
        document.getElementById('dvUpdateModal').style.display = 'none';
      });
    }

    function dvCheckForUpdates() {
      var savedVersion = null;
      try { savedVersion = localStorage.getItem('dv-app-version'); } catch (e) {}
      if (savedVersion && savedVersion !== dvAppVersion) {
        dvBuildUpdateModal();
        document.getElementById('dvUpdateModal').style.display = 'flex';
      } else if (!savedVersion) {
        try { localStorage.setItem('dv-app-version', dvAppVersion); } catch (e) {} // First time install, set silently
      }
    }

    // Fire the update enforcer
    dvCheckForUpdates();
  } catch (e) {}
})();
