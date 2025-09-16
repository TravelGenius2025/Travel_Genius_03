# TravelGenius — HAVIH Luxury MVP v5

- Vibe-first search, India highlights, Events/Experiences.
- Skyscanner & Booking deep links (affiliate-ready).
- Razorpay (demo/real), Supabase-backed Polls & Saves (fallback local).
- `/setup` page to check env presence and set local affiliate tags.

## Deploy (no local install)
1. Create a GitHub repo and upload this folder’s contents.
2. Go to vercel.com → Add New Project → select repo → Deploy.
3. Optional: In Project → Settings → Environment Variables, add keys:
   - `NEXT_PUBLIC_GEODB_API_HOST`, `NEXT_PUBLIC_GEODB_API_KEY`
   - `VIATOR_API_KEY`
   - `TICKETMASTER_API_KEY`
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SKYSCANNER_AFFILIATE_PARAMS`, `NEXT_PUBLIC_HOTEL_AFFILIATE_PARAMS`
4. Visit your live site → `/setup` to verify and optionally set affiliate params locally.

## Supabase schema (optional)
```sql
create extension if not exists pgcrypto;
create table if not exists public.polls ( id uuid primary key default gen_random_uuid(), title text not null, created_at timestamptz default now() );
create table if not exists public.poll_options ( id uuid primary key default gen_random_uuid(), poll_id uuid references public.polls(id) on delete cascade, text text not null );
create table if not exists public.poll_votes ( id bigserial primary key, poll_id uuid references public.polls(id) on delete cascade, option_id uuid references public.poll_options(id) on delete cascade, created_at timestamptz default now() );
create table if not exists public.saves ( id uuid primary key default gen_random_uuid(), device_id text, item jsonb, created_at timestamptz default now() );
```


---

# ZERO‑CONFIG MODE (MVP v6)

This build requires **no environment variables**. Everything works out of the box:

- City autosuggest → local dataset
- Experiences & Events → curated local data
- Flights & Hotels → live deep links (Skyscanner/Booking) with optional affiliate params stored locally on `/setup`
- Group polls & saved items → browser-local (no Supabase needed)
- Razorpay → demo mode (opens checkout without server keys)

## One‑click deploy (browser only)
1) Create a GitHub repo → upload this folder’s contents.
2) Vercel → Add New Project → select repo → Deploy → get `*.vercel.app`.
3) Visit `/setup` (optional) to add affiliate params locally in your browser.

You can later switch to API-powered mode by adding keys in Vercel and removing the local datasets if you wish.


## Global mode (no keys)
- City autosuggest via **Teleport Cities API** (no key)
- Geocoding via **Nominatim** (no key)
- Attractions via **Wikipedia GeoSearch** + extracts (no key)
- Weather via **Open‑Meteo** (no key)
- Events via **Eventbrite / Meetup** deep links (no key)

These services are free and require no credentials, suitable for light traffic MVPs. For scale/SLAs, upgrade to commercial APIs later.


## v8 additions — global, multilingual, SEO-ready
- **Multilingual UI** (EN/HI/ES) with auto-detect + header switcher.
- **Currency auto-detect** with a switcher; prices shown in your currency (indicative FX).
- **Pre-rendered SEO pages** for top cities at `/dest/<slug>` (Paris, Tokyo, New York, London, Dubai, Sydney, Singapore, Bangkok, Mumbai, Delhi).
- **Sitemap** includes those city pages automatically.

### Deploy (still zero-config)
Same as before: upload to GitHub → Vercel → Deploy. Live immediately.

### Add more cities
Edit `app/dest/[slug]/page.tsx` → extend the `CITIES` array (slug, name, hero, blurb).


## v9 additions — Arabic + RTL, IP currency auto, 50+ SEO cities
- **Arabic UI** with proper **RTL** direction.
- **IP-based currency auto-detect** (no keys; uses `/api/geoip` with ipwho.is).
- **50+ pre-rendered city pages** for stronger SEO (`/dest/<slug>`).
- **Sitemap** now includes all SEO cities.

No configuration required. Upload to GitHub → Vercel → Deploy.


## GitHub + Vercel quick buttons

After you upload this folder to GitHub:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

If you prefer Netlify, this build also works there (Next.js 14).
