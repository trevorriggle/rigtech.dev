/* RIG Tech wordmark: types itself once per session, then the cursor blinks.
   Loaded synchronously in <head> so the hidden state is set before first paint. */
(function () {
  var KEY = "rigtech:wordmark-typed";
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var shouldType = false;

  try {
    shouldType = !reduce && !sessionStorage.getItem(KEY);
    if (shouldType) sessionStorage.setItem(KEY, "1");
  } catch (e) {
    shouldType = false; // storage blocked: just show the full wordmark
  }
  if (!shouldType) return;

  root.classList.add("wm-pending");

  function type() {
    var el = document.querySelector(".wm-text");
    if (!el) { root.classList.remove("wm-pending"); return; }
    var full = el.textContent;
    var i = 0;
    el.textContent = "";
    root.classList.remove("wm-pending");
    root.classList.add("wm-typing");
    (function step() {
      el.textContent = full.slice(0, ++i);
      if (i < full.length) {
        setTimeout(step, full.charAt(i) === " " ? 150 : 95);
      } else {
        root.classList.remove("wm-typing");
      }
    })();
  }

  function start() {
    // Wait briefly for the Tomorrow font so it doesn't swap mid-type.
    var wait = new Promise(function (r) { setTimeout(r, 700); });
    var font = document.fonts && document.fonts.load ? document.fonts.load('600 1em "Tomorrow"') : wait;
    Promise.race([font, wait]).then(function () { setTimeout(type, 180); }, type);
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
