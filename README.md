# مُمثلي — Cinematic Ad (Mumathli)

A premium, Apple-commercial-style 30-second cinematic advertisement for
**Mumathli (ممثلي)**, the AI-powered university student app. Built with
[Remotion](https://remotion.dev) so it renders to a real **4K Ultra HD, 60 FPS,
16:9** MP4 — no editor, fully code-driven and reproducible.

> Tagline: **تطبيقك الجامعي الذكي**

## The film (30s · 1800 frames @ 60fps)

| Scene | Time | Content |
|------|------|---------|
| 1 · Logo | 0.0–3.5s | Glowing logo reveal, `ممثلي` + tagline, slow camera push-in |
| 2 · Campus | 3.5–8.0s | Students on campus, cinematic pan across 5 app screens (Home, Timetable, Subjects, Notifications, AI Chat) with depth-of-field |
| 3 · Features | 8.0–12.5s | Phone rotating in 3D, six feature cards orbiting: Course Materials, Weekly Timetable, Homework Tracking, Instant Notifications, Representative Communication, Subject Files |
| 4 · Memo AI | 12.5–17.5s | Hero moment for **ميمو** — `ذكاؤك الجامعي`. A live chat answers `شنو عندي واجبات اليوم؟` with a glowing AI aura |
| 5 · Announcements | 17.5–21.5s | Representative publishes → push notifications cascade in, homework & timetable update instantly |
| 6 · Stats | 21.5–25.0s | Animated counters: **١٦٠٠+** students · **١٠٠+** sections · **١٠+** universities |
| 7 · CTA | 25.0–30.0s | Centered phone, strong blue glow, logo, `حمّل ممثلي الآن`, Google Play badge, `mumathli.app`, slow fade-out |

## Design system

Defined once in [`src/mumathli/theme.ts`](src/mumathli/theme.ts):

- **Dark Navy** `#081526` · **Blue** `#2F80ED` · **Gold** `#F5C542` · **White** text
- Glassmorphism surfaces, Apple-style lighting, floating golden particles,
  moving blue glow, cinematic vignette, soft bloom.
- Modern Arabic typography via bundled **Cairo** / **Tajawal** fonts
  (`public/fonts/`) — loaded locally so renders are self-contained and
  watermark-free.

## Structure

```
src/mumathli/
  theme.ts              brand colours, timeline, dimensions
  fonts.ts              local Arabic font loading
  MumathliAd.tsx        master composition (assembles all scenes)
  ui/                   CinematicBackground, PhoneMockup, Glass, LogoMark, GooglePlayBadge, fade
  screens/Screens.tsx   in-app phone screens (Home, Timetable, Subjects, Notifications, Chat)
  scenes/               Scene1..Scene7
```

## Commands

```bash
npm i                 # install dependencies
npm run dev           # open Remotion Studio to preview/scrub
npm run render        # render the full 4K 60fps MP4 → out/Mumathli_4K.mp4
npm run render:1080   # faster 1080p preview render → out/Mumathli_1080.mp4
```

In sandboxed environments that block Remotion's Chrome download, point it at a
pre-installed browser:

```bash
export REMOTION_BROWSER_EXECUTABLE=/path/to/chrome
```

## Music

The brief calls for a modern, inspirational, premium cinematic electronic
soundtrack. Audio is intentionally left out of the code render (no licensed
track is bundled); drop an `.mp3` into `public/` and add an `<Audio>` tag in
`MumathliAd.tsx` to score the final export.
