/* =====================================================================
   INFORMATION MODULE — all left sidebar menu items live here.
   Independent module: delete this file and the app keeps working
   (the left menu simply disappears). Talks to the shell only via DV.
   ===================================================================== */
(function() {
  try {
    if (!window.DV) return;

    /* ===== DEVELOPER PROFILE ===== */
    // Paste your photo link between the quotes. Leave empty to show the placeholder.
    var dvDevPhotoUrl = '';
    var dvDevPlaceholder = 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><rect width="160" height="160" fill="#CED0D4"/><circle cx="80" cy="62" r="28" fill="#fff"/><path d="M24 160c0-34 25-56 56-56s56 22 56 56z" fill="#fff"/></svg>');

    var dvDevCSS = '' +
      '.dv-dev-wrap{position:relative;width:196px;height:196px;margin:4px auto 14px}' +
      '.dv-gear{position:absolute;inset:0;width:100%;height:100%;animation:dvGearSpin 14s linear infinite}' +
      '.dv-dev-photo{position:absolute;top:18px;left:18px;width:160px;height:160px;border-radius:50%;object-fit:cover;background:var(--dv-bg)}' +
      '@keyframes dvGearSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}' +
      '@media (prefers-reduced-motion:reduce){.dv-gear{animation:none}}' +
      '.dv-dev-name{font-size:1.5rem;font-weight:800;color:var(--dv-text);text-align:center;line-height:1.3}' +
      '.dv-dev-role{font-size:1.05rem;font-weight:700;color:var(--dv-primary);text-align:center;margin:6px 0 18px;line-height:1.4}' +
      '.dv-dev-bio{position:relative;overflow:hidden;font-size:1rem;line-height:1.65rem;color:var(--dv-text-sub)}' +
      '.dv-dev-bio.dv-clamp{max-height:calc(8 * 1.65rem)}' +
      '.dv-dev-bio.dv-clamp::after{content:"";position:absolute;left:0;right:0;bottom:0;height:2.4rem;background:linear-gradient(to bottom,transparent,var(--dv-surface))}' +
      '.dv-dev-bio h4{font-size:1.2rem;font-weight:800;color:var(--dv-text);margin:.5rem 0 0;padding-left:10px;border-left:4px solid var(--dv-primary);line-height:1.65rem}' +
      '.dv-dev-bio p{margin:0 0 .3rem}' +
      '.dv-dev-bio ul{margin:0 0 .3rem;padding-left:22px}' +
      '.dv-dev-hl{color:var(--dv-primary);font-weight:700}' +
      '.dv-dev-more[hidden]{display:none}' +
      '.dv-dev-more{background:none;border:none;color:var(--dv-primary);font-weight:700;font-size:1rem;font-family:inherit;cursor:pointer;padding:10px 0;display:block;margin:0 auto}';
    var dvDevStyle = document.createElement('style');
    dvDevStyle.textContent = dvDevCSS;
    document.head.appendChild(dvDevStyle);

    function dvDevGear() {
      var teeth = '';
      for (var i = 0; i < 24; i++) teeth += '<rect x="-5" y="-99" width="10" height="13" rx="2" transform="rotate(' + (i * 15) + ')"/>';
      return '<svg class="dv-gear" viewBox="-100 -100 200 200" aria-hidden="true"><g fill="var(--dv-primary)">' + teeth + '<circle r="87" fill="none" stroke="var(--dv-primary)" stroke-width="9"/></g></svg>';
    }
    function dvDevHTML() {
      return '<div class="dv-dev-wrap">' + dvDevGear() +
          '<img class="dv-dev-photo" id="dvDevPhoto" width="160" height="160" alt="Rev. Dr. Chris Johnson, PhD" src="' + (dvDevPhotoUrl || dvDevPlaceholder) + '" onerror="this.onerror=null;this.src=\'' + dvDevPlaceholder + '\'">' +
        '</div>' +
        '<div class="dv-dev-name">Rev. Dr. Chris Johnson, PhD</div>' +
        '<div class="dv-dev-role">Ordained Minister &middot; Theologian &middot; Technology Innovator</div>' +
        '<div class="dv-dev-bio dv-clamp" id="dvDevBio">' +
          '<h4>About</h4>' +
          '<p>Rev. Dr. Chris Johnson, PhD is an <span class="dv-dev-hl">ordained minister, theologian, and technology innovator</span>.</p>' +
          '<h4>Founder Of</h4>' +
          '<ul><li><span class="dv-dev-hl">Biblefirm Christian Tech Ministry</span></li><li><span class="dv-dev-hl">CEMLCA</span> (Centre for Ministry and Leadership Christian Academy)</li><li><span class="dv-dev-hl">Chris Ministries Online Community</span></li></ul>' +
          '<h4>Mission</h4>' +
          '<p>Reaching <span class="dv-dev-hl">six million souls across six continents</span> through digital ministry technology.</p>' +
          '<h4>Approach</h4>' +
          '<p>Rev. Dr. Johnson builds all applications personally on Android &mdash; believing that the most effective ministry tools are built by those who <span class="dv-dev-hl">understand the ministry firsthand</span>.</p>' +
          '<h4>Vision</h4>' +
          '<p>His work <span class="dv-dev-hl">bridges theology and technology</span>, making God\'s Word accessible to every generation.</p>' +
        '</div>' +
        '<button class="dv-dev-more" id="dvDevMore" hidden>Show more</button>';
    }
    function dvDevInit() {
      var bio = document.getElementById('dvDevBio'), btn = document.getElementById('dvDevMore');
      if (!bio || !btn) return;
      requestAnimationFrame(function() {
        if (bio.scrollHeight <= bio.clientHeight + 2) { bio.classList.remove('dv-clamp'); btn.hidden = true; return; }
        btn.hidden = false;
        btn.onclick = function() {
          var open = bio.classList.toggle('dv-clamp');
          btn.textContent = open ? 'Show more' : 'Show less';
        };
      });
    }

    /* ===== MODAL CONTENT ===== */
    var dvModalContent = {

      about_us: {
        title: "About Us",
        html: "<p><strong>Verse For My Situation</strong> is a ministry-grade Scripture tool built by DV Biblefirm Christian Tech Ministry.</p><p>Our mission is reaching six million souls across six continents through digital ministry technology. This application is one instrument in that mission — providing immediate, offline-accessible Scripture for every human situation.</p><p>Every verse is carefully selected from trusted Bible translations to speak directly into real-life circumstances faced by believers around the world.</p>"
      },

      about_dev: {
        title: "About Developer",
        html: dvDevHTML(),
        onOpen: dvDevInit
      },

      copyright: {
        title: "Proprietary Software Copyright Notice",
        html: "<div class='dv-copy-box'><strong>PROPRIETARY SOFTWARE COPYRIGHT NOTICE</strong><br><br>Copyright &copy; " + new Date().getFullYear() + " Rev. Dr. Chris Johnson, PhD. All Rights Reserved.<br><br>This software, including all associated source code, design elements, application logic, and content, is the exclusive proprietary property of Rev. Dr. Chris Johnson, PhD and DV Biblefirm.<br><br>No part of this software may be reproduced, distributed, reverse-engineered, decompiled, disassembled, modified, or transmitted in any form or by any means without the prior written permission of Rev. Dr. Chris Johnson, PhD.<br><br>Unauthorized use, copying, or distribution of this software, in whole or in part, may result in severe civil and criminal penalties and will be prosecuted to the maximum extent permitted by law.</div><p>All Bible verse content is used for non-commercial ministry purposes. All translation rights remain with their respective copyright holders.</p>"
      },

      community: {
        title: "About Our Online Community",
        html: "<p><strong>Chris Ministries Online Community</strong> is a vibrant WhatsApp-based fellowship connecting believers across six continents.</p><p>Our community is a space for:</p><ul style='padding-left:18px;color:var(--dv-text-sub);line-height:2;'><li>Daily Scripture meditation and devotion</li><li>Prayer requests and intercession</li><li>Ministry training and leadership development</li><li>Evangelism and soul-winning outreach</li></ul><p>Join thousands of believers already growing in faith together.</p><a href='https://chat.whatsapp.com/placeholder' style='display:inline-block;margin-top:12px;padding:12px 20px;background:var(--dv-primary);color:#fff;border-radius:10px;text-decoration:none;font-weight:700;'>Join WhatsApp Community</a>"
      },

      support: {
        title: "Support Us",
        html: "<p>Verse For My Situation is provided completely free as part of our ministry commitment to make God's Word accessible to everyone, everywhere, at no cost.</p><p>Your support helps us:</p><ul style='padding-left:18px;color:var(--dv-text-sub);line-height:2;'><li>Maintain and improve this application</li><li>Add more verses, situations, and translations</li><li>Build more ministry-grade tools</li><li>Reach six million souls across six continents</li></ul><p>If this app has been a blessing to you, please consider sharing it with others — that is the greatest support you can give.</p>"
      },

      terms: {
        title: "Terms of Use",
        html: "<p>By using Verse For My Situation, you agree to the following terms:</p><h3>1. Ministry Use</h3><p>This application is provided for personal spiritual growth, ministry, and non-commercial use only.</p><h3>2. No Warranty</h3><p>This application is provided 'as is' without warranty of any kind. Rev. Dr. Chris Johnson, PhD and DV Biblefirm make no representations regarding accuracy or fitness for a particular purpose.</p><h3>3. Prohibited Use</h3><p>You may not redistribute, resell, or claim ownership of this application or any portion thereof.</p><h3>4. Data Privacy</h3><p>This application stores data locally on your device only. No personal data is transmitted to any server.</p>"
      },

      privacy: {
        title: "Privacy Policy",
        html: "<p>Your privacy is important to us. This Privacy Policy explains how Verse For My Situation handles your information.</p><h3>Data Collection</h3><p>We do not collect any personal data. All verse data, favorites, and preferences are stored locally on your device using IndexedDB and localStorage.</p><h3>No Analytics</h3><p>We do not use any analytics, tracking pixels, or telemetry of any kind.</p><h3>Offline First</h3><p>This application functions completely offline. No data leaves your device during normal use.</p><h3>Full Policy</h3><p><a href='https://biblefirm.example.com/privacy' style='color:var(--dv-primary);'>View full Privacy Policy at biblefirm.example.com/privacy</a></p>"
      },

      contact: {
        title: "Contact Us",
        html: "<p>Reach out to Rev. Dr. Chris Johnson, PhD and the DV Biblefirm team through any of the channels below.</p><p>We read every message and respond to every genuine inquiry in the name of Jesus.</p><div class='dv-contact-row'><button class='dv-contact-btn dv-email' onclick=\"window.location.href='mailto:info@biblefirm.example.com'\" aria-label='Email'><svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'/><polyline points='22,6 12,13 2,6'/></svg></button><button class='dv-contact-btn dv-phone' onclick=\"window.location.href='tel:+2347000000000'\" aria-label='Phone'><svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.13 12a19.79 19.79 0 01-3.07-8.67A2 2 0 012.07 1h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z'/></svg></button><button class='dv-contact-btn dv-wa' onclick=\"window.open('https://wa.me/2347000000000','_blank')\" aria-label='WhatsApp'><svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'><path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'/></svg></button><button class='dv-contact-btn dv-fb' onclick=\"window.open('https://facebook.com/biblefirm','_blank')\" aria-label='Facebook'><svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'><path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/></svg></button></div><p style='text-align:center;color:var(--dv-text-sub);font-size:1rem;'>Office Hours: Monday — Friday, 9:00 AM — 5:00 PM WAT</p>"
      },

      notification: {
        title: "Proprietary Software Notification",
        html: "<div class='dv-copy-box'><strong>IMPORTANT NOTICE</strong><br><br>This is a proprietary software product developed exclusively by Rev. Dr. Chris Johnson, PhD and DV Biblefirm.<br><br>You are authorized to use this application for personal and ministry purposes only. Any unauthorized reproduction, distribution, or modification of this application is strictly prohibited and constitutes a violation of intellectual property law.<br><br>DV Biblefirm actively monitors for unauthorized use and will take appropriate legal action where necessary.</div><p>Thank you for respecting the work that goes into building ministry-grade technology for God's Kingdom.</p>"
      }

    };

    /* ===== LEFT NAV ITEMS (route = clean deep-link slug) ===== */
    var dvLeftNavItems = [
      { key:'about_us', route:'about-us', label:'About Us', icon:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>' },
      { key:'about_dev', route:'about-developer', label:'About Developer', icon:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>' },
      { key:'copyright', route:'copyright-notice', label:'Proprietary Copyright Notice', icon:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>' },
      { key:'community', route:'online-community', label:'Online Community (WhatsApp)', icon:'<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15"/>' },
      { key:'support', route:'support-us', label:'Support Us', icon:'<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>' },
      { key:'terms', route:'terms-of-use', label:'Terms of Use', icon:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>' },
      { key:'privacy', route:'privacy-policy', label:'Privacy Policy', icon:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' },
      { key:'contact', route:'contact-us', label:'Contact Us', icon:'<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>' },
      { key:'notification', route:'software-notification', label:'Software Notification', icon:'<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>' },
      { key:'close_left', label:'Exit Sidebar', icon:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' }
    ];

    /* ===== REGISTER WITH THE SHELL ===== */
    dvLeftNavItems.forEach(function(item) {
      if (item.route) {
        var data = dvModalContent[item.key];
        DV.route(item.route, {
          title: data.title,
          open: function() { DV.openModal(data.title, data.html, data.onOpen); },
          close: function() { DV.closeModal(); }
        });
      }
      DV.addLeftItem(item);
    });
  } catch (e) {}
})();
