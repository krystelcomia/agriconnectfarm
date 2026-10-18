/* Forgot-password flow: email -> EmailJS-delivered 6-digit code -> verify -> new password */
(function () {
  const CODE_TTL_MS = 10 * 60 * 1000;
  const MAX_ATTEMPTS = 5;
  const RESEND_COOLDOWN_MS = 30 * 1000;
  const STORE_KEY = 'agri_pwd_reset';
  const ADMIN_EMAIL = 'comiakrystel@gmail.com';

  const inputStyle = 'width: 100%; padding: 0.65rem 0.85rem; border: 1px solid var(--border-strong); border-radius: var(--radius-sm); font-size: 0.875rem; font-family: inherit;';
  const labelStyle = 'display: block; font-size: 0.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.35rem;';

  function toast(msg) {
    if (typeof showToast === 'function') showToast(msg); else alert(msg);
  }

  function getState() {
    try { return JSON.parse(sessionStorage.getItem(STORE_KEY) || 'null'); } catch (e) { return null; }
  }
  function setState(s) { sessionStorage.setItem(STORE_KEY, JSON.stringify(s)); }
  function clearState() { sessionStorage.removeItem(STORE_KEY); }

  function randomCode() {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return String(100000 + (buf[0] % 900000));
  }

  function ensureSection() {
    let section = document.getElementById('resetFormSection');
    if (section) return section;
    const login = document.getElementById('loginFormSection');
    if (!login) return null;

    section = document.createElement('section');
    section.id = 'resetFormSection';
    section.style.cssText = 'padding: 2rem 1.75rem 1.75rem; display: none;';
    section.innerHTML = `
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <h2 style="font-size: 1.45rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">Reset Password</h2>
        <p id="resetIntro" style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5; margin: 0 auto; max-width: 380px;"></p>
      </div>

      <form id="resetStepEmail" style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <label for="resetEmail" style="${labelStyle}">Email Address</label>
          <input type="email" id="resetEmail" required placeholder="juan@example.com" autocomplete="email" style="${inputStyle}">
        </div>
        <button type="submit" id="resetSendBtn" class="btn-primary" style="width: 100%; padding: 0.75rem; font-size: 0.95rem;">Send Reset Code</button>
      </form>

      <form id="resetStepCode" style="display: none; flex-direction: column; gap: 1rem;">
        <div>
          <label for="resetCode" style="${labelStyle}">6-Digit Code</label>
          <input type="text" id="resetCode" required inputmode="numeric" pattern="[0-9]{6}" maxlength="6" placeholder="123456" autocomplete="one-time-code" style="${inputStyle} letter-spacing: 0.4em; text-align: center; font-size: 1.1rem;">
        </div>
        <div>
          <label for="resetNewPassword" style="${labelStyle}">New Password</label>
          <input type="password" id="resetNewPassword" required minlength="8" placeholder="At least 8 characters" autocomplete="new-password" style="${inputStyle}">
        </div>
        <div>
          <label for="resetConfirmPassword" style="${labelStyle}">Confirm New Password</label>
          <input type="password" id="resetConfirmPassword" required minlength="8" placeholder="Re-enter new password" autocomplete="new-password" style="${inputStyle}">
        </div>
        <button type="submit" class="btn-primary" style="width: 100%; padding: 0.75rem; font-size: 0.95rem;">Verify Code &amp; Reset Password</button>
        <div style="text-align: center; font-size: 0.8rem;">
          <a href="#" id="resetResendLink" style="color: var(--primary); font-weight: 600; text-decoration: none;">Resend code</a>
        </div>
      </form>

      <div style="text-align: center; margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle); font-size: 0.875rem;">
        <a href="#" id="resetBackLink" style="color: var(--primary); font-weight: 700; text-decoration: none;">&larr; Back to Log in</a>
      </div>
    `;
    login.parentNode.insertBefore(section, login.nextSibling);

    document.getElementById('resetStepEmail').addEventListener('submit', onSendCode);
    document.getElementById('resetStepCode').addEventListener('submit', onVerifyCode);
    document.getElementById('resetResendLink').addEventListener('click', (e) => { e.preventDefault(); onResend(); });
    document.getElementById('resetBackLink').addEventListener('click', (e) => { e.preventDefault(); hideForgotPassword(); });
    return section;
  }

  function showStep(step) {
    const intro = document.getElementById('resetIntro');
    const emailForm = document.getElementById('resetStepEmail');
    const codeForm = document.getElementById('resetStepCode');
    if (step === 'code') {
      const st = getState();
      intro.textContent = `We sent a 6-digit code to ${st ? st.email : 'your email'}. Enter it below with your new password.`;
      emailForm.style.display = 'none';
      codeForm.style.display = 'flex';
    } else {
      intro.textContent = 'Enter the email address of your account. We will email you a 6-digit code to verify it\u2019s you.';
      codeForm.style.display = 'none';
      emailForm.style.display = 'flex';
    }
  }

  window.showForgotPassword = function () {
    const section = ensureSection();
    if (!section) return;
    document.getElementById('loginFormSection').style.display = 'none';
    const signup = document.getElementById('signupFormSection');
    if (signup) signup.style.display = 'none';
    section.style.display = 'block';
    const loginEmail = document.querySelector('#loginFormSection input[name="email"]');
    const emailInput = document.getElementById('resetEmail');
    if (loginEmail && loginEmail.value && !emailInput.value) emailInput.value = loginEmail.value;
    showStep('email');
  };

  function hideForgotPassword() {
    const section = document.getElementById('resetFormSection');
    if (section) section.style.display = 'none';
    document.getElementById('loginFormSection').style.display = 'block';
    clearState();
  }

  async function sendCodeEmail(email, name, code) {
    const cfg = window.EMAILJS_CONFIG || {};
    if (!cfg.publicKey || !cfg.serviceId || !cfg.templateId) {
      throw new Error('EMAILJS_NOT_CONFIGURED');
    }
    if (!window.emailjs) throw new Error('EMAILJS_NOT_LOADED');
    window.emailjs.init({ publicKey: cfg.publicKey });
    return window.emailjs.send(cfg.serviceId, cfg.templateId, {
      to_email: email,
      email: email,
      to_name: name || email,
      passcode: code,
      expires_in: String(CODE_TTL_MS / 60000)
    });
  }

  async function issueCode(email) {
    const users = JSON.parse(localStorage.getItem('agri_users') || '[]');
    const user = users.find(u => u && u.email && u.email.toLowerCase() === email);
    if (!user) {
      toast('No account found with that email address.');
      return false;
    }
    if (email === ADMIN_EMAIL) {
      toast('The administrator password cannot be reset here.');
      return false;
    }

    const code = randomCode();
    try {
      await sendCodeEmail(email, user.full_name, code);
    } catch (err) {
      console.error('EmailJS error:', err);
      if (err && err.message === 'EMAILJS_NOT_CONFIGURED') {
        toast('Email service is not configured yet. Add your EmailJS keys in assets/emailjs-config.js.');
      } else if (err && err.message === 'EMAILJS_NOT_LOADED') {
        toast('Could not load the email service. Check your connection and try again.');
      } else {
        toast('Could not send the reset email. Please try again later.');
      }
      return false;
    }

    setState({
      email,
      codeHash: await agriHashPassword(code),
      expiresAt: Date.now() + CODE_TTL_MS,
      attempts: 0,
      sentAt: Date.now()
    });
    return true;
  }

  async function onSendCode(e) {
    e.preventDefault();
    const btn = document.getElementById('resetSendBtn');
    const email = document.getElementById('resetEmail').value.trim().toLowerCase();
    if (!email) return;
    btn.disabled = true;
    btn.textContent = 'Sending...';
    const ok = await issueCode(email);
    btn.disabled = false;
    btn.textContent = 'Send Reset Code';
    if (ok) {
      toast(`Reset code sent to ${email}. Check your inbox (and spam folder).`);
      showStep('code');
    }
  }

  async function onResend() {
    const st = getState();
    if (!st) { showStep('email'); return; }
    if (Date.now() - st.sentAt < RESEND_COOLDOWN_MS) {
      toast('Please wait a few seconds before requesting another code.');
      return;
    }
    if (await issueCode(st.email)) toast(`A new code was sent to ${st.email}.`);
  }

  async function onVerifyCode(e) {
    e.preventDefault();
    const st = getState();
    if (!st) { toast('Please request a reset code first.'); showStep('email'); return; }
    if (Date.now() > st.expiresAt) {
      clearState();
      toast('That code has expired. Please request a new one.');
      showStep('email');
      return;
    }
    if (st.attempts >= MAX_ATTEMPTS) {
      clearState();
      toast('Too many incorrect attempts. Please request a new code.');
      showStep('email');
      return;
    }

    const code = document.getElementById('resetCode').value.trim();
    const pwd = document.getElementById('resetNewPassword').value;
    const confirm = document.getElementById('resetConfirmPassword').value;

    if (await agriHashPassword(code) !== st.codeHash) {
      st.attempts += 1;
      setState(st);
      toast(`Incorrect code. ${MAX_ATTEMPTS - st.attempts} attempt(s) left.`);
      return;
    }
    if (pwd.length < 8) { toast('Password must be at least 8 characters long.'); return; }
    if (pwd !== confirm) { toast('Passwords do not match.'); return; }

    const users = JSON.parse(localStorage.getItem('agri_users') || '[]');
    const idx = users.findIndex(u => u && u.email && u.email.toLowerCase() === st.email);
    if (idx < 0) { toast('Account not found.'); return; }
    users[idx].password_hash = await agriHashPassword(pwd);
    localStorage.setItem('agri_users', JSON.stringify(users));

    clearState();
    toast('Password reset successful! You can now log in with your new password.');
    document.getElementById('resetStepCode').reset();
    const loginEmail = document.querySelector('#loginFormSection input[name="email"]');
    if (loginEmail) loginEmail.value = st.email;
    hideForgotPassword();
  }
})();
