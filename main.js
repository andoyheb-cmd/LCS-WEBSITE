/* ============================================================
   Lucban Christian School — Main Script
   main.js
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════════════════════
   PROGRAM DATA
══════════════════════════════════════════════════════════ */
const PROGRAMS = {
  nursery: {
    icon: '🌱',
    badge: 'Pre-School',
    title: 'Nursery',
    grade: 'Age 3–4 years old',
    description: 'Our Nursery program is the first step in your child\'s educational journey at LCS. We create a warm, loving, and safe environment where children learn through structured play, songs, stories, and Bible-based activities.',
    objectives: 'Develop basic social skills, introduce concepts of letters, numbers, and shapes, build confidence, and nurture a love for God and learning from an early age.',
    subjects: ['Bible Stories & Values', 'Language Readiness', 'Number Concepts', 'Arts & Crafts', 'Music & Movement', 'Physical Education', 'Science Exploration', 'Social Skills']
  },
  kinder1: {
    icon: '📚',
    badge: 'Pre-School',
    title: 'Kinder 1',
    grade: 'Age 4–5 years old',
    description: 'Kinder 1 builds upon the Nursery foundation with a more structured introduction to literacy and numeracy. Students engage in hands-on activities that integrate faith with foundational academic skills.',
    objectives: 'Strengthen literacy and numeracy readiness, develop fine motor skills, build friendship and community values, and deepen early understanding of biblical principles.',
    subjects: ['Bible & Character Education', 'Filipino Literacy', 'English Literacy', 'Mathematics', 'Arts & Crafts', 'Music & Worship', 'Physical Education', 'Environmental Awareness']
  },
  kinder2: {
    icon: '✏️',
    badge: 'Pre-School',
    title: 'Kinder 2',
    grade: 'Age 5–6 years old',
    description: 'Kinder 2 prepares students for formal Grade 1 education. The curriculum includes reading readiness, writing, and foundational mathematics alongside Christian formation and character development.',
    objectives: 'Ensure students are academically and emotionally ready for elementary school, strengthen communication skills, and deepen commitment to God and community.',
    subjects: ['Bible & Christian Living', 'Filipino Reading & Writing', 'English Reading & Writing', 'Mathematics', 'Science Readiness', 'Araling Panlipunan', 'MAPEH', 'Computer Basics']
  },
  elementary: {
    icon: '🏫',
    badge: 'Primary',
    title: 'Elementary School',
    grade: 'Grade 1 – Grade 6',
    description: 'LCS Elementary School has been offering quality Christian education since 1995. The program follows the DepEd K–12 curriculum integrated with Bible-based values formation, producing well-rounded learners who love God and excel academically.',
    objectives: 'Develop strong academic foundations in all core subjects, form godly character and Christian values, cultivate critical thinking and creativity, and prepare students for Junior High School.',
    subjects: ['Bible / Christian Living', 'Filipino', 'English', 'Mathematics', 'Science', 'Araling Panlipunan', 'MAPEH', 'ICT / Computer', 'EPP / TLE', 'Mother Tongue (Gr. 1–3)']
  },
  jhs: {
    icon: '🎓',
    badge: 'Secondary',
    title: 'Junior High School',
    grade: 'Grade 7 – Grade 10',
    description: 'Established in 2016 through the partnership of LCS and the Kyungnam Layman\'s Association (KLA), our Junior High School program is DepEd recognized under S-007 s. 2019. It provides a transformative secondary education grounded in Christian faith and academic excellence.',
    objectives: 'Equip students with advanced academic knowledge, deepen spiritual maturity, develop leadership and life skills, and prepare graduates for Senior High School and beyond.',
    subjects: ['Bible / Christian Living', 'Filipino', 'English', 'Mathematics', 'Science', 'Araling Panlipunan', 'MAPEH', 'TLE / Technology', 'Computer Science', 'Values Education']
  }
};

/* ══════════════════════════════════════════════════════════
   PROGRAM DETAIL MODAL
══════════════════════════════════════════════════════════ */
window.openProgramModal = function(key) {
  const p = PROGRAMS[key];
  if (!p) return;

  const subjectList = p.subjects.map(s => `<li>${s}</li>`).join('');

  document.getElementById('program-modal-content').innerHTML = `
    <div class="modal-program-header">
      <div class="modal-program-icon">${p.icon}</div>
      <div class="modal-program-badge">${p.badge}</div>
      <div class="modal-program-title">${p.title}</div>
      <div class="modal-program-grade">${p.grade}</div>
    </div>
    <div class="modal-program-body">
      <h4>About This Program</h4>
      <p>${p.description}</p>
      <h4>Program Objectives</h4>
      <p>${p.objectives}</p>
      <h4>Subjects Offered</h4>
      <ul>${subjectList}</ul>
    </div>
    <div class="modal-program-footer">
      <a href="#contact" class="btn-outline btn-modal-ask" onclick="closeProgramModal(); prefillInquiry('${p.title}')">
        <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
        Ask a Question
      </a>
    </div>
  `;

  document.getElementById('program-modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeProgramModal = function() {
  document.getElementById('program-modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
};

document.getElementById('program-modal-close').addEventListener('click', closeProgramModal);

document.getElementById('program-modal-overlay').addEventListener('click', function(e) {
  if (e.target === this) closeProgramModal();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeProgramModal();
});

/* ══════════════════════════════════════════════════════════
   PRE-FILL INQUIRY FROM PROGRAM CARD
══════════════════════════════════════════════════════════ */
window.prefillInquiry = function(programName) {
  const subjectField = document.getElementById('iq-subject');
  if (subjectField && !subjectField.value) {
    subjectField.value = `Inquiry about ${programName}`;
  }

  const levelMap = {
    'Nursery': 'Nursery (Age 3–4)',
    'Kinder 1': 'Kinder 1 (Age 4–5)',
    'Kinder 2': 'Kinder 2 (Age 5–6)',
    'Elementary School': 'Elementary (Grade 1–6)',
    'Junior High School': 'Junior High School (Grade 7–10)'
  };
  const levelField = document.getElementById('iq-level');
  if (levelField && levelMap[programName]) {
    for (let i = 0; i < levelField.options.length; i++) {
      if (levelField.options[i].text === levelMap[programName]) {
        levelField.selectedIndex = i;
        break;
      }
    }
  }
};

/* ══════════════════════════════════════════════════════════
   MOBILE NAVIGATION
══════════════════════════════════════════════════════════ */
(function initMobileNav() {
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.getElementById('nav-links');
  const navOverlay = document.getElementById('nav-overlay');

  function openMenu() {
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    navOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    navOverlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function() {
    this.classList.contains('open') ? closeMenu() : openMenu();
  });

  navOverlay.addEventListener('click', closeMenu);

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
})();

/* ══════════════════════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════════════════════ */
(function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ══════════════════════════════════════════════════════════
   ACTIVE NAV LINK ON SCROLL
══════════════════════════════════════════════════════════ */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  function setActive() {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();

/* ══════════════════════════════════════════════════════════
   NAV SOLID ON SCROLL
══════════════════════════════════════════════════════════ */
(function initNavScroll() {
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60
      ? 'rgba(15,32,68,1)'
      : 'rgba(15,32,68,0.97)';
  }, { passive: true });
})();

/* ══════════════════════════════════════════════════════════
   SMOOTH SCROLL
══════════════════════════════════════════════════════════ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

/* ══════════════════════════════════════════════════════════
   INQUIRY CATEGORY TABS
══════════════════════════════════════════════════════════ */
(function initCategoryTabs() {
  const catBtns = document.querySelectorAll('.cat-btn');
  const subjectInput = document.getElementById('iq-subject');

  const prefixes = {
    tuition:     'Tuition & Fees — ',
    academics:   'Academics — ',
    scholarship: 'Scholarship Inquiry — ',
    other:       '',
  };

  catBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      catBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      if (subjectInput) {
        const cat    = this.dataset.cat;
        const prefix = prefixes[cat] || '';
        const current = subjectInput.value;
        const hasPrefix = Object.values(prefixes).some(p => p && current.startsWith(p));

        if (!current || hasPrefix) {
          subjectInput.value = prefix;
          subjectInput.focus();
          subjectInput.setSelectionRange(prefix.length, prefix.length);
        }
      }
    });
  });
})();

/* ══════════════════════════════════════════════════════════
   INQUIRY FORM SUBMISSION (FIREBASE FIRESTORE)
══════════════════════════════════════════════════════════ */
(function initInquiryForm() {
  const submitBtn = document.getElementById('iq-submit');
  if (!submitBtn) return;

  submitBtn.addEventListener('click', function() {
    const firstName  = (document.getElementById('iq-firstname').value || '').trim();
    const lastName   = (document.getElementById('iq-lastname').value  || '').trim();
    const email      = (document.getElementById('iq-email').value     || '').trim();
    const phone      = (document.getElementById('iq-phone').value     || '').trim();
    const relation   = (document.getElementById('iq-relation').value  || '').trim();
    const gradeLevel = (document.getElementById('iq-level').value     || '').trim();
    const subject    = (document.getElementById('iq-subject').value   || '').trim();
    const message    = (document.getElementById('iq-message').value   || '').trim();

    const activeCat   = document.querySelector('.cat-btn.active');
    const catKey      = activeCat ? activeCat.dataset.cat : 'other';
    const catLabels   = {
      tuition:    'Tuition & Fees',
      academics:  'Academics',
      scholarship:'Scholarship',
      other:      'Other',
    };
    const category = catLabels[catKey] || 'Other';

    // Validation
    if (!firstName || !lastName) {
      showToast('Please enter your full name.', 'error'); return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Please enter a valid email address.', 'error'); return;
    }
    if (!subject) {
      showToast('Please enter a subject for your inquiry.', 'error'); return;
    }
    if (!message) {
      showToast('Please write your message before submitting.', 'error'); return;
    }

    // Submit to Firebase
    submitBtn.innerHTML = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:var(--navy);animation:spin 1s linear infinite"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg> Submitting…';
    submitBtn.disabled = true;

    db.collection('inquiries').add({
      firstName,
      lastName,
      email,
      phone,
      relation,
      gradeLevel,
      category,
      subject,
      message,
      read: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      submitBtn.innerHTML = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:var(--navy)"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg> Submit Inquiry';
      submitBtn.disabled = false;

      // Clear form
      ['iq-firstname','iq-lastname','iq-email','iq-phone','iq-subject','iq-message'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
      document.getElementById('iq-relation').selectedIndex = 0;
      document.getElementById('iq-level').selectedIndex = 0;
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      document.querySelector('.cat-btn[data-cat="tuition"]').classList.add('active');

      showToast('✅ Inquiry submitted! We\'ll respond within 1–2 business days.', 'success');
    })
    .catch(err => {
      console.error('Firestore error:', err);
      submitBtn.innerHTML = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:var(--navy)"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg> Submit Inquiry';
      submitBtn.disabled = false;
      showToast('Submission failed. Please try again or contact us directly.', 'error');
    });
  });
})();

/* ══════════════════════════════════════════════════════════
   TOAST NOTIFICATIONS
══════════════════════════════════════════════════════════ */
function showToast(message, type) {
  const existing = document.querySelector('.lcs-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'lcs-toast';
  toast.textContent = message;

  const isSuccess = type === 'success';

  Object.assign(toast.style, {
    position:      'fixed',
    bottom:        '32px',
    right:         '32px',
    zIndex:        '9999',
    padding:       '16px 28px',
    background:    isSuccess ? '#1a3260' : '#5c1a1a',
    color:         '#ffffff',
    fontFamily:    "'Raleway', sans-serif",
    fontSize:      '0.82rem',
    fontWeight:    '500',
    letterSpacing: '0.05em',
    borderLeft:    isSuccess ? '4px solid #c9a84c' : '4px solid #e07070',
    boxShadow:     '0 8px 32px rgba(0,0,0,0.35)',
    opacity:       '0',
    transform:     'translateY(12px)',
    transition:    'opacity 0.3s ease, transform 0.3s ease',
    maxWidth:      '380px',
    lineHeight:    '1.5',
    borderRadius:  '2px',
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity   = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity   = '0';
    toast.style.transform = 'translateY(12px)';
    setTimeout(() => toast.remove(), 350);
  }, 5000);
}

/* ══════════════════════════════════════════════════════════
   FOOTER YEAR
══════════════════════════════════════════════════════════ */
(function setFooterYear() {
  const copy = document.querySelector('.footer-copy');
  if (copy) {
    copy.textContent = copy.textContent.replace(/\d{4}/, new Date().getFullYear());
  }
})();

/* ══════════════════════════════════════════════════════════
   SPIN KEYFRAME (for loading button)
══════════════════════════════════════════════════════════ */
const spinStyle = document.createElement('style');
spinStyle.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
document.head.appendChild(spinStyle);
