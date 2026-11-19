/* RIG Tech wordmark: types itself once per session, then the cursor blinks. Every so often
   it backspaces the whole thing and quickly types it back. Static under reduced motion.
   Loaded synchronously in <head> so the hidden state is set before first paint. */
(function () {
  var KEY = "rigtech:wordmark-typed";
  var IDLE = 14000;        // how long the wordmark sits before it retypes
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  var firstVisit = false;

  try {
    firstVisit = !sessionStorage.getItem(KEY);
    if (firstVisit) sessionStorage.setItem(KEY, "1");
  } catch (e) {
    firstVisit = false; // storage blocked: just show the full wordmark, still retype later
  }
  if (firstVisit) root.classList.add("wm-pending");

  var el, full;
  function busy(on) { root.classList.toggle("wm-typing", on); }

  // Type from the current text up to the full wordmark.
  function typeIn(speed, done) {
    busy(true);
    (function step() {
      var i = el.textContent.length;
      if (i >= full.length) { busy(false); if (done) done(); return; }
      el.textContent = full.slice(0, i + 1);
      setTimeout(step, full.charAt(i + 1) === " " ? speed * 1.6 : speed);
    })();
  }
  // Backspace to nothing.
  function erase(speed, done) {
    busy(true);
    (function step() {
      var t = el.textContent;
      if (!t.length) { if (done) done(); return; }
      el.textContent = t.slice(0, -1);
      setTimeout(step, speed);
    })();
  }
  function loop() {
    setTimeout(function () {
      if (document.hidden) { loop(); return; } // don't animate in a background tab
      erase(45, function () { setTimeout(function () { typeIn(55, loop); }, 260); });
    }, IDLE);
  }

  function start() {
    el = document.querySelector(".wm-text");
    if (!el) { root.classList.remove("wm-pending"); return; }
    full = el.textContent;
    if (!firstVisit) { loop(); return; }
    // Wait briefly for the Tomorrow font so it doesn't swap mid-type.
    var wait = new Promise(function (r) { setTimeout(r, 700); });
    var font = document.fonts && document.fonts.load ? document.fonts.load('600 1em "Tomorrow"') : wait;
    function go() {
      el.textContent = "";
      root.classList.remove("wm-pending");
      setTimeout(function () { typeIn(95, loop); }, 180);
    }
    Promise.race([font, wait]).then(go, go);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();

/* CoinOp trailer: autoplay (muted) unless the visitor prefers reduced motion;
   if the file isn't there yet, show the poster with a "coming soon" note. */
document.addEventListener("DOMContentLoaded", function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  Array.prototype.forEach.call(document.querySelectorAll("video[data-trailer]"), function (v) {
    var box = v.closest(".trailer");
    function missing() { if (box) box.classList.add("missing"); v.removeAttribute("controls"); v.pause(); }
    var src = v.querySelector("source");
    if (src) src.addEventListener("error", missing);
    v.addEventListener("error", missing);
    if (v.networkState === 3) missing(); // NETWORK_NO_SOURCE: failed before we got here
    if (!reduce) {
      var p = v.play(); // starts loading too; a missing file just rejects
      if (p && p.catch) p.catch(function () {});
    }
  });
});

/* Games dropdown in the main nav. Hover opens it on desktop (CSS); the button toggles it
   for touch and keyboard. Escape or a click elsewhere closes it. */
document.addEventListener("DOMContentLoaded", function () {
  Array.prototype.forEach.call(document.querySelectorAll(".nav-drop"), function (drop) {
    var btn = drop.querySelector(".nav-drop-btn");
    if (!btn) return;
    function set(open) {
      drop.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    }
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      set(btn.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("click", function (e) { if (!drop.contains(e.target)) set(false); });
    drop.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { set(false); btn.focus(); }
    });
    drop.addEventListener("focusout", function (e) { if (!drop.contains(e.relatedTarget)) set(false); });
  });
});
