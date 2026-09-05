// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Lead/collab forms -> Web3Forms (https://web3forms.com), which emails
  // submissions straight to Lloyd08@aol.com. Get a free access key by
  // entering that email at web3forms.com, then paste it in below.
  const WEB3FORMS_ACCESS_KEY = '9eb184f9-1098-4598-b06b-e1713e9b0cfa';

  document.querySelectorAll('.lead-form').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Honeypot: real visitors never see this field. If it's checked,
      // something filled it in automatically -- drop the submission
      // instead of sending it.
      const honeypot = form.querySelector('input[name="botcheck"]');
      if (honeypot && honeypot.checked) {
        form.reset();
        return;
      }

      const base = form.id.replace('-form', '');
      const successEl = document.getElementById(`${base}-success`);
      const errorEl = document.getElementById(`${base}-error`);
      const submitBtn = form.querySelector('button[type="submit"]');

      if (errorEl) errorEl.classList.remove('visible');
      if (submitBtn) {
        submitBtn.dataset.originalText = submitBtn.dataset.originalText || submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      const data = Object.fromEntries(new FormData(form));
      data.access_key = WEB3FORMS_ACCESS_KEY;

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await res.json();

        if (!result.success) throw new Error(result.message || 'Submission failed');

        form.classList.add('submitted');
        form.reset();
        if (successEl) {
          successEl.classList.add('visible');
          successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } catch (err) {
        console.error('Form submission failed:', err);
        if (errorEl) {
          errorEl.classList.add('visible');
          errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.dataset.originalText;
        }
      }
    });
  });
});
