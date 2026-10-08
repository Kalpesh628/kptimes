/* KPTimes — interactions. Vanilla JS, no dependencies. */
(function(){
  'use strict';

  /* ---------- config: wire a real form endpoint here later ----------
     CONTACT_ENDPOINT: set to a Formspree/FormSubmit URL to POST enquiries.
     Until then, the form opens the visitor's email app (mailto) instead —
     nothing is ever "sent" silently. */
  var CONFIG = {
    CONTACT_ENDPOINT: '',            // e.g. 'https://formspree.io/f/xxxx'
    CONTACT_EMAIL: 'hello@kptimes.in' // placeholder — replace with real inbox
  };

  /* ---------- nav scroll state ---------- */
  var nav = document.getElementById('nav');
  function onScroll(){ nav.classList.toggle('scrolled', window.scrollY > 24); }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* ---------- mobile menu ---------- */
  var menuBtn = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  function setMenu(open){
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileMenu.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  }
  menuBtn.addEventListener('click', function(){
    setMenu(mobileMenu.hidden);
  });
  mobileMenu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ setMenu(false); });
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && !mobileMenu.hidden) setMenu(false);
  });

  /* ---------- scroll reveals ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  /* ---------- capability detail cards ---------- */
  var CAPS = {
    website:   ['Website', 'A fast, credible home for your business online. We design around your customers — what they need to see, in the order they need to see it — and build it to load quickly on the phones most of them use.'],
    mobile:    ['Mobile App', 'When your business needs to live on a customer\u2019s home screen. We scope honestly — native or cross-platform — and build the smallest app that does the job well.'],
    webapp:    ['Web App', 'Your spreadsheet-and-register workflow, turned into software your team actually opens. Designed around the process, not the other way around.'],
    dashboard: ['Dashboard', 'One screen that answers "how is my business doing?" Orders, stock, leads, money — pulled together so you stop digging through five places.'],
    assistant: ['AI Assistant', 'Answers your customers\u2019 repeat questions instantly, qualifies enquiries, and hands over to a human gracefully when it should. Trained on your business, not the whole internet.'],
    automation:['Business Automation', 'The repetitive work nobody should be doing by hand: follow-ups, data entry, notifications, report generation. We find it, then we automate it.'],
    tool:      ['Custom Tool', 'One sharp tool for one real job — a calculator, a booking flow, an internal tracker. Small scope, done properly, shipped fast.'],
    product:   ['Digital Product', 'You bring the idea; we bring the build. Design, development, launch, and iteration — a working product you can put in front of real users.']
  };
  var capDetail = document.getElementById('capDetail');
  var capTitle = document.getElementById('capTitle');
  var capBody = document.getElementById('capBody');
  document.querySelectorAll('.cap').forEach(function(btn){
    btn.addEventListener('click', function(){
      var c = CAPS[btn.getAttribute('data-cap')];
      if(!c) return;
      capTitle.textContent = c[0];
      capBody.textContent = c[1];
      capDetail.hidden = false;
      capDetail.scrollIntoView({behavior:'smooth', block:'nearest'});
    });
  });
  document.getElementById('capClose').addEventListener('click', function(){
    capDetail.hidden = true;
  });

  /* ---------- contact form ---------- */
  var form = document.getElementById('contactForm');
  var formErr = document.getElementById('formErr');
  function showErr(msg){
    formErr.textContent = msg;
    formErr.hidden = false;
    formErr.focus();
  }
  form.addEventListener('submit', function(e){
    e.preventDefault();
    formErr.hidden = true;
    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var business = form.business.value.trim();
    var want = form.want.value;
    var budget = form.budget.value;
    var message = form.message.value.trim();

    if(!name){ showErr('Please tell us your name.'); form.name.focus(); return; }
    if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){ showErr('Please enter a valid email address.'); form.email.focus(); return; }
    if(!want){ showErr('Please choose what you want to build.'); form.want.focus(); return; }
    if(message.length < 10){ showErr('A line or two about your idea helps us reply properly.'); form.message.focus(); return; }

    var subject = 'Project enquiry: ' + want + ' — ' + name;
    var body = 'Name: ' + name + '\nEmail: ' + email +
      (business ? '\nBusiness: ' + business : '') +
      '\nWants to build: ' + want +
      (budget ? '\nBudget: ' + budget : '') +
      '\n\nMessage:\n' + message;

    function done(){
      form.innerHTML = '<div class="form-done"><h3>Thanks, ' + escapeHtml(name.split(' ')[0]) + '.</h3>' +
        '<p>Your enquiry is ready to send — just press send in your email app. We read every message personally and reply within a couple of days.</p>' +
        '<a class="btn ghost" href="#top">Back to top</a></div>';
    }

    if(CONFIG.CONTACT_ENDPOINT){
      fetch(CONFIG.CONTACT_ENDPOINT, {
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify({name:name, email:email, business:business, want:want, budget:budget, message:message})
      }).then(function(r){
        if(r.ok){ done(); }
        else { window.location.href = 'mailto:' + CONFIG.CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body); }
      }).catch(function(){
        window.location.href = 'mailto:' + CONFIG.CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      });
    } else {
      window.location.href = 'mailto:' + CONFIG.CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      done();
    }
  });
  function escapeHtml(s){
    return s.replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  /* ---------- footer year ---------- */
  // (year is fixed to 2026 in markup; update annually)
})();

