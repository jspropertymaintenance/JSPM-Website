# JS Property Maintenance website

Next.js (App Router) rebuild of [jspropertymaintenance.com](https://www.jspropertymaintenance.com/), exported as a fully static site and deployed on Netlify.

- Theme: `#121212` (ink) and `#dcdcdc` (paper), defined as CSS variables in `app/globals.css`.
- Logo: `public/logo-light.png` (for dark backgrounds) and `public/logo-dark.png` (for light backgrounds); favicons in `public/`.
- Business details, services, areas and copy live in `lib/site.ts`.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static output in ./out
```

## Netlify

`netlify.toml` is already configured: build command `npm run build`, publish directory `out`, Node 22. Connect the repository in Netlify and deploy, with no extra settings needed.

### Forms

The quote, contact, work-with-us and referral forms use **Netlify Forms**. They are declared in `public/__forms.html` (which Netlify scans at deploy time) and the React forms post to that file. If you add or rename a field in `lib/forms.ts`, update `public/__forms.html` to match.

After the first deploy, open **Site configuration → Forms** in Netlify to enable form detection if it isn't on already. Then set up email notifications (for example to contact@jspm.uk) under **Forms → Form notifications**.
