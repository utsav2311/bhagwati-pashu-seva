# Bhagwati Ayurved Bhawan

Hindi-first, mobile-friendly website for **भगवती आयुर्वेद भवन — मवेशी दवा खाना एवं परामर्श केन्द्र**.

**Live website:** https://bhagwati-pashu-seva.vercel.app/

## Shop address

बसौली चौक, मवेशी हटिया रोड, रहिका  
मधुबनी (बिहार), पिन कोड - 847211

**Phone:** 9546439494 / 6205132944  
**Maps:** https://maps.app.goo.gl/ubb5b2DSY6kuZeqy5

## Features

- Hindi by default, with an English language switch.
- Veterinary medicine information by animal category and supplied brand logos.
- Cattle feed catalog with direct WhatsApp price enquiries.
- Shop walkthrough video with muted automatic playback and a continuous loop.
- Photo and video gallery with filters, pagination and a larger viewer.
- Call buttons, prescription enquiries, full shopfront photo and Google Maps directions.
- Responsive layouts, compressed images and support for reduced motion.

This is an informational catalog and local lead-generation website. Purchases take place at the shop; there is no online checkout or home delivery.

## Run locally

No package installation or build step is required. Use Python 3:

```sh
python3 -m http.server 4174 --directory dist
```

Open http://localhost:4174 in a browser. Automatic video playback depends on browser and device settings.

## Project files

- `dist/index.html`: page content, business details and structured data.
- `dist/style.css`: desktop and mobile layouts.
- `dist/app.js`: language switching, catalogue enquiries and video behavior.
- `dist/gallery-data.js`: gallery media and captions.
- `dist/gallery.js`: gallery filtering, pagination and viewer.
- `dist/assets/`: website images, brand logos and videos.

## Hosting

The site is configured for deployment on Vercel via `vercel.json` (pointing to `dist/`). You can also serve the `dist/` directory from any static web host. Keep its file structure intact so media and scripts resolve correctly.

Brand names and logos belong to their respective owners.
