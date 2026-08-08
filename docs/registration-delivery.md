# Registration delivery configuration

The public registration form currently validates locally and does not transmit or store student information.

Before enabling delivery, complete a privacy and security review covering data minimization, retention, access controls, parent/guardian consent, breach handling, the approved internal recipient, and the student confirmation message. Configure a verified server-side sender and secrets in Vercel; never expose an email-provider key in the Vite client.

The approved implementation should return explicit loading, success and error states, issue a non-sensitive registration reference, send the student only the information required for confirmation, and send internal staff only the minimum fields approved by the privacy review.
