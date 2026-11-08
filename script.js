// Contact form opens the visitor's email app addressed to this email.
const CONTACT_EMAIL = "qiratiqbal987@gmail.com";

(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // ---- Data ----
  const CERTS = [
    ["codealpha-completion.jpg", "C Programming Internship — Certificate of Completion", "CodeAlpha", "21 Apr 2026", "internship", "Completion"],
    ["codealpha-offer-letter.jpg", "C Programming Internship — Offer Letter", "CodeAlpha", "11 Mar 2026", "internship", "Offer Letter"],
    ["arch-offer-letter.jpg", "C++ Programming Internship & Training Program", "Arch Technologies", "1 Jul – 30 Aug 2026", "internship", "Offer Letter"],
    ["c-programming-basics.jpg", "C Programming Basics", "Simplilearn SkillUP", "11 Apr 2026", "dev", "Course"],
    ["web-development-chatgpt.jpg", "Introduction to Web Development with ChatGPT", "Simplilearn SkillUP", "11 Apr 2026", "dev", "Course"],
    ["power-query-excel.jpg", "Introduction to Power Query in Excel Basics", "Microsoft × Simplilearn", "12 Apr 2026", "dev", "Course"],
    ["chatgpt-101.jpg", "ChatGPT 101: What is ChatGPT?", "Simplilearn SkillUP", "30 Mar 2026", "ai", "Course"],
    ["prompt-engineering-copilot.jpg", "Introduction to Prompt Engineering with GitHub Copilot", "Microsoft × Simplilearn", "31 Mar 2026", "ai", "Course"],
    ["generative-ai-studio.jpg", "Introduction to Generative AI Studio", "Google Cloud × Simplilearn", "1 Apr 2026", "ai", "Course"],
    ["hp-ai-for-beginners.jpg", "AI for Beginners", "HP LIFE · HP Foundation", "9 Apr 2026", "ai", "Course"],
    ["generative-ai-literacy.jpg", "SkillQuest — Generative AI Literacy", "Simplilearn SkillUP", "12 Oct 2026", "ai", "Assessment"],
    ["cloud-computing.jpg", "Introduction to Cloud Computing", "Simplilearn SkillUP", "28 Mar 2026", "sec", "Course"],
    ["cyber-security.jpg", "Introduction to Cyber Security", "Simplilearn SkillUP", "11 Apr 2026", "sec", "Course"],
    ["hp-cybersecurity-awareness.jpg", "Introduction to Cybersecurity Awareness", "HP LIFE · HP Foundation", "9 Apr 2026", "sec", "Course"]
  ];
  const FILTERS = [["all", "All"], ["internship", "Internships"], ["dev", "Dev & Tools"], ["ai", "AI"], ["sec", "Cloud & Security"]];
  const GENRES = {
    "Web": ["HTML", "CSS", "JavaScript", "Git", "GitHub", "VS Code"],
    "Programming": ["C", "C++", "Python"],
    "Data & AI": ["Excel", "Power Query", "ChatGPT", "GitHub Copilot", "Prompt Engineering"],
    "Cloud & Security": ["Cloud Basics", "Cybersecurity"]
  };

  // ---- Skills ----
  $("#genres").innerHTML = Object.entries(GENRES).map(([g, items]) =>
    `<div class="genre"><h3>${g}</h3><div>${items.map(i => `<span>${i}</span>`).join("")}</div></div>`).join("");

  // ---- Certificates ----
  const rail = $("#certRail");
  const filters = $("#filters");
  const esc = s => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  filters.innerHTML = FILTERS.map(([k, label]) =>
    `<button type="button" data-f="${k}">${label} <span>${k === "all" ? CERTS.length : CERTS.filter(c => c[4] === k).length}</span></button>`).join("");

  function showCerts(f) {
    $$("button", filters).forEach(b => b.classList.toggle("on", b.dataset.f === f));
    rail.innerHTML = CERTS.filter(c => f === "all" || c[4] === f).map((c, i) =>
      `<article class="cert" style="--i:${i}"><button type="button" data-full="${c[0]}" data-title="${esc(c[1])}" aria-label="View ${esc(c[1])}"><img src="${c[0]}" alt="${esc(c[1])}" loading="lazy"></button>` +
      `<div><em>${c[5]}</em><h3>${esc(c[1])}</h3><p>${esc(c[2])}</p><p>${c[3]}</p></div></article>`).join("");
    rail.scrollTo({ left: 0 });
  }
  filters.addEventListener("click", e => { const b = e.target.closest("button"); if (b) showCerts(b.dataset.f); });
  $$("[data-f]").forEach(a => a.tagName === "A" && a.addEventListener("click", () => showCerts(a.dataset.f)));
  showCerts("all");
  const step = () => rail.clientWidth * 0.8;
  $("#prev").addEventListener("click", () => rail.scrollBy({ left: -step(), behavior: "smooth" }));
  $("#next").addEventListener("click", () => rail.scrollBy({ left: step(), behavior: "smooth" }));

  // ---- Lightbox ----
  const lb = $("#lb"), lbImg = $("#lbImg"), lbCap = $("#lbCap");
  const closeLb = () => { lb.hidden = true; lbImg.src = ""; document.body.style.overflow = ""; };
  rail.addEventListener("click", e => {
    const b = e.target.closest("button[data-full]");
    if (!b) return;
    lbImg.src = b.dataset.full; lbImg.alt = lbCap.textContent = b.dataset.title;
    lb.hidden = false; document.body.style.overflow = "hidden";
  });
  lb.addEventListener("click", closeLb);
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !lb.hidden) closeLb(); });

  // ---- Opening intro (plays once per visit) ----
  const intro = $("#intro");
  const endIntro = () => {
    intro.classList.add("out");
    try { sessionStorage.setItem("qirat-intro", "1"); } catch (e) { /* storage unavailable */ }
    document.body.style.overflow = "";
  };
  let seen = false;
  try { seen = sessionStorage.getItem("qirat-intro") === "1"; } catch (e) { /* ignore */ }
  if (seen) intro.classList.add("out"); else document.body.style.overflow = "hidden";
  $("#introPlay").addEventListener("click", endIntro);
  $("#introSkip").addEventListener("click", endIntro);
  document.addEventListener("keydown", e => { if ((e.key === "Escape" || e.key === "Enter") && !intro.classList.contains("out")) endIntro(); });

  // ---- Nav: hide on scroll down, solid after hero, mobile menu, active link ----
  const nav = $("#nav"), links = $("#navLinks"), menu = $("#menu");
  let lastY = 0;
  addEventListener("scroll", () => {
    const y = scrollY;
    nav.classList.toggle("solid", y > 40);
    nav.classList.toggle("hide", y > lastY && y > 300 && !links.classList.contains("open"));
    lastY = y;
  }, { passive: true });
  menu.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
  });
  $$("a", links).forEach(a => a.addEventListener("click", () => { links.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); }));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) $$("a", links).forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id));
    }), { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach(s => io.observe(s));
  }

  // ---- Contact form (opens email app) ----
  const form = $("#form"), note = $("#note");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const d = new FormData(form);
    const body = `${d.get("message")}\n\n— ${d.get("name")} (${d.get("email")})`;
    location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(d.get("subject"))}&body=${encodeURIComponent(body)}`;
    note.textContent = "Opening your email app…";
    form.reset();
  });
})();

// ---- Effects & animations ----
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(pointer: fine)").matches;
  document.documentElement.classList.add("js");

  // Hero entrance + count-up start once the intro is gone
  const intro = $("#intro");
  let started = false;
  function start() {
    if (started) return;
    started = true;
    document.body.classList.add("ready");
    $$(".stats b").forEach(b => {
      const end = +b.textContent, t0 = performance.now();
      if (reduce) return;
      (function tick(t) {
        const p = Math.min((t - t0) / 1400, 1);
        b.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }
  if (intro.classList.contains("out")) start();
  else new MutationObserver(() => intro.classList.contains("out") && start()).observe(intro, { attributes: true, attributeFilter: ["class"] });

  // Scroll reveal (class is removed afterwards so hover effects stay snappy)
  const targets = $$(".row h2,.poster,.ep,.genre,.filters,.rail-wrap,.end>*,.form");
  targets.forEach(el => el.classList.add("rv"));
  targets.forEach(el => el.style.setProperty("--i", [...el.parentElement.children].filter(c => c.classList.contains("rv")).indexOf(el)));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
      setTimeout(() => e.target.classList.remove("rv", "in"), 1500);
    }), { threshold: 0.12 });
    targets.forEach(el => io.observe(el));
  } else targets.forEach(el => el.classList.remove("rv"));

  // Scroll progress bar
  const bar = document.createElement("div");
  bar.id = "bar";
  document.body.appendChild(bar);
  addEventListener("scroll", () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
  }, { passive: true });

  if (reduce) return;

  // Floating gold dust in the hero
  const hero = $("#home");
  for (let i = 0; i < 18; i++) {
    const d = document.createElement("span");
    d.className = "dust";
    d.style.cssText = `left:${Math.random() * 100}%;--s:${2 + Math.random() * 4}px;--t:${8 + Math.random() * 8}s;--d:${-Math.random() * 12}s;--x:${(Math.random() - 0.5) * 120}px`;
    hero.appendChild(d);
  }

  if (!fine) return;

  // Cursor glow
  const glow = document.createElement("div");
  glow.id = "glow";
  document.body.appendChild(glow);
  let gx = 0, gy = 0, tx = 0, ty = 0;
  addEventListener("pointermove", e => { tx = e.clientX; ty = e.clientY; glow.style.opacity = 1; });
  document.addEventListener("pointerleave", () => glow.style.opacity = 0);
  (function loop() {
    gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
    glow.style.transform = `translate(${gx}px,${gy}px)`;
    requestAnimationFrame(loop);
  })();

  // Hero photo parallax
  const img = $(".hero-photo img");
  hero.addEventListener("pointermove", e => {
    const r = hero.getBoundingClientRect();
    img.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5) * -26 + "px");
    img.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5) * -16 + "px");
  });
  hero.addEventListener("pointerleave", () => { img.style.setProperty("--px", "0px"); img.style.setProperty("--py", "0px"); });

  // 3D tilt on project and certificate cards
  document.addEventListener("pointermove", e => {
    const c = e.target.closest(".poster,.cert");
    if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty("--ry", ((e.clientX - r.left) / r.width - 0.5) * 12 + "deg");
    c.style.setProperty("--rx", ((e.clientY - r.top) / r.height - 0.5) * -12 + "deg");
  });
  document.addEventListener("pointerout", e => {
    const c = e.target.closest(".poster,.cert");
    if (c) { c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); }
  });
})();
