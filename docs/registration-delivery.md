# Enrollment, review and inquiry delivery configuration

The public enrollment, review, inquiry, contact and comment forms currently validate locally and do not transmit or store personal information. Their on-screen status explicitly says the submission was not sent.

Before enabling delivery, complete a privacy and security review covering data minimization, retention, access controls, parent/guardian consent, breach handling, the approved internal recipient, and the student confirmation message. Configure a verified server-side sender and secrets in Vercel; never expose an email-provider key in the Vite client.

The approved server-side implementation should:

- validate and rate-limit every request;
- return explicit loading, success and error states;
- issue a non-sensitive enrollment or inquiry reference;
- send the student only the information required for confirmation;
- send internal staff only the minimum fields approved by the privacy review; and
- keep review email addresses private and require moderation before public display.

## Configuration needed

Use a server-side provider such as Resend after the school approves the workflow. Expected Vercel variables are `RESEND_API_KEY`, `EMAIL_FROM`, and `INTERNAL_NOTIFICATION_EMAIL`. The requested internal notification value is `info@mspixelpulse.com`, but it must not be treated as active until the server endpoint, verified sender, consent wording and retention policy are approved and tested.

Do not add provider secrets to client-side `VITE_*` variables. Until this configuration is complete, Review Email and Enrollment Email remain **CONFIG NEEDED**.
