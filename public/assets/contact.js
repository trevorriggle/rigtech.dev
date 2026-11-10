/* Contact form: client-side checks, then POST to /api/contact (Cloudflare Pages Function). */
(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;
  var statusEl = document.getElementById("cf-status");
  var submit = document.getElementById("cf-submit");
  var success = document.getElementById("cf-success");
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Preselect subject from ?subject=coinop etc.
  var pre = new URLSearchParams(location.search).get("subject");
  var select = form.elements.subject;
  if (pre && select.querySelector('option[value="' + pre.replace(/[^a-z]/g, "") + '"]')) select.value = pre;

  function show(msg) {
    statusEl.textContent = msg;
    statusEl.hidden = false;
  }

  function resetTurnstile() {
    try { if (window.turnstile) window.turnstile.reset(); } catch (e) {}
  }

  function check() {
    var f = form.elements;
    if (!f.name.value.trim()) return [f.name, "Please add your name."];
    if (!EMAIL.test(f.email.value.trim())) return [f.email, "Please enter a valid email address so we can reply."];
    if (f.message.value.trim().length < 10) return [f.message, "Your message looks a little short. Add a bit more detail?"];
    var token = form.querySelector('[name="cf-turnstile-response"]');
    if (!token || !token.value) return [null, "Please complete the spam check above the button."];
    return null;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    statusEl.hidden = true;
    Array.prototype.forEach.call(form.querySelectorAll("[aria-invalid]"), function (el) { el.removeAttribute("aria-invalid"); });

    var problem = check();
    if (problem) {
      if (problem[0]) { problem[0].setAttribute("aria-invalid", "true"); problem[0].focus(); }
      show(problem[1]);
      return;
    }

    submit.disabled = true;
    submit.textContent = "Sending…";

    fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) { return { ok: res.ok, data: data }; });
      })
      .then(function (r) {
        if (r.ok && r.data.ok) {
          form.hidden = true;
          success.hidden = false;
          success.focus();
          return;
        }
        throw new Error(r.data.error || "");
      })
      .catch(function (err) {
        show((err && err.message) || "Something went wrong sending your message. Please try again, or email hello@rigtech.dev.");
        resetTurnstile();
        submit.disabled = false;
        submit.textContent = "Send message";
      });
  });
})();
