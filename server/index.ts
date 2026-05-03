/**
 * Backend API for contact form — POST /api/contact sends mail via Resend.
 */
import path from 'node:path';
import {config as loadDotenv} from 'dotenv';
import express from 'express';

// Explicit .env path so the API always loads keys regardless of cwd (e.g. tsx from another folder).
loadDotenv({path: path.resolve(process.cwd(), '.env')});

const app = express();
const PORT = Number(process.env.API_PORT) || 3001;
const HOST = process.env.API_HOST || '0.0.0.0';

app.use(express.json({ limit: '64kb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    hasResendKey: Boolean(process.env.RESEND_API_KEY),
    hasNotifyEmail: Boolean(process.env.CONTACT_NOTIFY_EMAIL),
  });
});

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

app.post('/api/contact', async (req, res) => {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFY_EMAIL;
  const from =
    process.env.RESEND_FROM_EMAIL ?? 'Macy Site <onboarding@resend.dev>';

  if (!apiKey) {
    res.status(500).json({ error: 'Missing RESEND_API_KEY' });
    return;
  }
  if (!to) {
    res.status(500).json({ error: 'Missing CONTACT_NOTIFY_EMAIL' });
    return;
  }

  const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
  const email =
    typeof req.body?.email === 'string' ? req.body.email.trim() : '';
  const message =
    typeof req.body?.message === 'string' ? req.body.message.trim() : '';

  if (!name || name.length > 200) {
    res.status(400).json({ error: 'Please enter a valid name.' });
    return;
  }
  if (!email || email.length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'Please enter a valid email address.' });
    return;
  }
  if (!message || message.length > 5000) {
    res.status(400).json({ error: 'Please enter a message (max 5000 characters).' });
    return;
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `[Macy site] Message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
      `,
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      const hint =
        process.env.NODE_ENV !== 'production'
          ? (error as {message?: string}).message
          : undefined;
      res.status(502).json({
        error: 'Could not send email. Try again later.',
        ...(hint ? {detail: hint} : {}),
      });
      return;
    }

    res.json({ ok: true });
  } catch (e) {
    console.error('[contact]', e);
    res.status(500).json({ error: 'Server error.' });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`API listening on http://${HOST}:${PORT}`);
});
