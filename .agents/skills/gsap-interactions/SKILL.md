---
name: gsap-interactions
description: Add GSAP-powered animations, scroll effects, parallax, parallax floating sections, video scrubbing, and typography animations to websites. Use this skill when the user asks to animate elements, add scroll-triggered effects, create parallax sections, create floating/drifting element layouts, animate text/typography, scrub video on scroll, build timelines, or add any motion/interaction using GSAP. Works with vanilla JS, React, Next.js, and any frontend framework.
---

This skill guides the creation of polished, performant GSAP animations for websites and web applications. It covers scroll-triggered animations, parallax effects, video scrubbing, typography animation, staggered reveals, timelines, and responsive motion design.

## Asset Reuse Policy [CRITICAL]

**NEVER repeat the same image or video across multiple sections.** Each asset should appear in exactly ONE section of the site. Before building, audit available assets and assign each to its highest-impact section.

- **Images:** If a site has 4 images (A, B, C, D), use each once — e.g., A in hero poster, B in a card, C in another card, D in a gallery. Do NOT reuse A.png as both the hero poster and a gallery image.
- **Videos:** If only one video is available, assign it to the single most impactful video section (hero scrub OR mid-page scrub, not both). Do NOT use the same video file in multiple `<video>` elements.
- **When assets run out:** Use **animated CSS gradients**, **solid color blocks**, **gradient shapes**, or **SVG patterns** as visual fills for remaining sections. These look intentional and premium — repeating the same photo does not.

**Gradient fallback examples for sections that need visuals but have no remaining assets:**
```css
/* Animated mesh gradient background */
.gradient-visual {
  background: linear-gradient(135deg, #18181b 0%, #1e3a5f 50%, #09090b 100%);
  border-radius: 20px;
}
/* Accent-tinted solid fill */
.solid-visual {
  background: linear-gradient(160deg, var(--accent), rgba(var(--accent-rgb), 0.4));
  border-radius: 20px;
}
```

This policy applies to all sections: hero backgrounds, card visuals, gallery items, parallax floating elements, case study images, and poster fallbacks.

### Parallax Floating Sections: Element Types & Density
- **NEVER mix SVG icons and raster images (PNG/JPG) in the same floating section.** They have completely different visual languages — raster photos are photographic/textured while SVGs are flat/geometric. Mixing them looks disjointed and cheap.
- **Choose ONE type per section:**
  - **All raster images** — use when you have 6+ photos available. Add gradient shapes to fill gaps if needed.
  - **All SVG icons** — use when SVG assets are available. This creates a cohesive holographic/illustrative feel.
  - **All gradient shapes** — use when no images or SVGs are available (fallback).
- **Target 8–12 total floating elements** + 1 center text element for a full section.
- **SVG icons must be large and visible** — use `width: 80–160px`, not tiny 40–50px. They should be clearly recognizable shapes that contribute to the composition.
- **Size hierarchy for SVGs**: Detailed shapes like astronauts/rockets (130–160px) > medium shapes like moons/kites (100–130px) > simple shapes like stars/dots (80–100px).
- All SVG floaters use `box-shadow: none`. Full opacity (or 0.6+ for duplicates) — they are the primary visual, not background decoration.

### Center Clear Zone & Circular Distribution [CRITICAL]
- **Floating elements must NEVER overlap with the center text.** The center ~30% of the container must be kept clear.
- **Distribute elements evenly in a circle** around the center text, like clock positions. Do NOT cluster them in corners (left/right bunching looks unbalanced).
- **Clock position layout** for 8–10 elements:
  - 12:00 (top center): `top:0%;left:50%;transform:translateX(-50%)`
  - 1:30 (top-right): `top:8%;right:10%`
  - 3:00 (right center): `top:42%;right:2%`
  - 4:30 (bottom-right): `bottom:10%;right:10%`
  - 6:00 (bottom center): `bottom:0%;left:50%;transform:translateX(-50%)`
  - 7:30 (bottom-left): `bottom:10%;left:10%`
  - 9:00 (left center): `top:42%;left:2%`
  - 10:30 (top-left): `top:8%;left:10%`
- **Inner ring** for extra elements: place 1–2 smaller icons at `top:22%;left:28%` or `bottom:22%;right:26%` — still outside the center 30% zone but closer in than the outer ring.
- **Vary sizes**: outer ring elements 110–150px, inner ring 80–100px for depth hierarchy.

### Video Scroll Scrub: Duration & Pacing
- **`end: "+=3000"` is too short** for most hero videos. The video finishes before the user has spent meaningful time with the content.
- **Default to `end: "+=5000"` or longer** for hero video scrub sections. This gives ~5000px of scroll for the full video duration, creating a slow cinematic reveal.
- Match the hero content fade-out to roughly 60% of the video scrub distance (e.g., `end: "top+3000 top"` for a 5000px scrub) so content disappears while video still plays.
- For shorter mid-page video sections, `+=3000` to `+=4500` is acceptable.

### Preventing Empty Scroll Gaps
- **Pinned sections (video scrub, horizontal scroll) add their scroll distance to the page.** Sections immediately after them must NOT have excessive padding, or users scroll through blank space.
- After a pinned hero (`+=5000`), the next section should use **padding: 80–120px**, not 160–200px.
- After horizontal scroll sections, reduce following section padding similarly.
- **Test mentally**: if you're pinning for 5000px, the total page scroll is already very long. Keep non-pinned section padding tight (80–120px) to avoid "dead zones" where nothing animates and nothing is visible.
- **Horizontal scroll after a pinned hero**: The horizontal scroll `end` value is calculated from `scrollWidth - innerWidth`. Use **function-based values** (`end: () => "+=" + (wrap.scrollWidth - window.innerWidth)`) plus `invalidateOnRefresh: true` so it recalculates correctly after the hero pin resolves. Never cache the `totalWidth` in a variable at load time — it will be wrong.
- **Defer post-hero ScrollTriggers**: When a pinned hero video scrub is created inside a `loadedmetadata` callback, subsequent ScrollTriggers (horizontal scroll, sticky stack) may be created before the hero pin adds its spacing. **Listen for `ScrollTrigger.addEventListener("refresh", ...)` and create downstream ScrollTriggers inside that callback**, then call `ScrollTrigger.refresh()` again. This ensures all measurements account for pin spacing.

### Floating SVG Overlay Icons (Section Decoration)

SVG holographic icons can be used as **subtle parallax-scrolling background decorations** across multiple content sections (case studies, philosophy, CTA, etc.). These are NOT the parallax float section — they're low-opacity atmospheric accents behind content.

#### Key Principles
- **Use `position: absolute`** inside sections with `position: relative; overflow: hidden`
- **Opacity 0.06–0.10** — they should be barely visible, adding texture without competing with content
- **Size 80–140px** — large enough to register as shapes, not noise
- **2–3 icons per section max** — subtle accent, not a busy pattern
- **Scroll parallax with GSAP** — gentle `yPercent` shift + slight rotation as the section scrolls through viewport
- **Different icons per section** — don't repeat the same SVG in adjacent sections

#### CSS
```css
.section-icon {
  position: absolute;
  pointer-events: none;
  opacity: 0.08;
  will-change: transform;
  z-index: 0;   /* behind content */
}
```

#### HTML (inside any section)
```html
<section class="my-section" style="position:relative;overflow:hidden">
  <img src="brain.svg" class="section-icon" style="width:130px;top:8%;right:5%">
  <img src="orbit.svg" class="section-icon" style="width:100px;bottom:15%;left:4%">
  <!-- section content here -->
</section>
```

#### JavaScript
```js
document.querySelectorAll(".section-icon").forEach((ic, i) => {
  const speed = 0.3 + ((i % 3) * 0.15);
  gsap.to(ic, {
    yPercent: -40 * speed,
    rotation: 8 * (i % 2 === 0 ? 1 : -1),
    ease: "none",
    scrollTrigger: {
      trigger: ic.parentElement,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});
```

This pattern is distinct from the dedicated parallax floating section — overlays are background decoration with very low opacity, while the float section is the primary interactive experience.

## Color Derivation from Assets [CRITICAL]

**NEVER pick arbitrary accent or UI colors.** Before choosing any color palette, you MUST visually inspect the provided images and video frames, then extract the dominant and accent colors from them. The site's entire palette should feel like it belongs to the same visual world as the assets.

### Process
1. **Read/view every image and video poster** provided in the project assets folder
2. **Identify the dominant tones** — are they warm (amber, orange, red) or cool (blue, cyan, teal)? Dark or light? Saturated or muted?
3. **Extract 1-2 accent colors** directly from the most vibrant elements in the images (e.g., a glowing cyan light, a pink mountain ridge, a teal horizon line)
4. **Build the palette from what you see**, not from generic defaults:
   - If images are deep blue/cyan/purple → accent should be cyan (`#22d3ee`), electric blue (`#3b82f6`), or cool teal (`#14b8a6`)
   - If images are warm sunset/fire tones → accent should be amber (`#d97706`), rose (`#e11d48`), or warm orange
   - If images are monochrome/neutral → accent should be a single high-contrast pop from any subtle color in the images
5. **Background tones should match** — if images are cool-toned, use cool grays (Slate/Zinc). If warm-toned, use warm grays (Stone/Neutral)

### What NOT to do
- Do NOT use orange/amber accents when all images are blue/cyan
- Do NOT use purple/neon when images are warm and earthy
- Do NOT default to a "brand color" that clashes with the provided visual assets
- Do NOT pick colors based on the site's industry — pick them from the actual pixels in the assets

### Gradient shapes must also match
When building gradient shape fallbacks (for parallax floating, card visuals, etc.), pull gradient colors from the same image-derived palette — not from a generic set.

## Auto-Installation (MANDATORY FIRST STEP)

Before writing any GSAP code, you MUST check if GSAP is installed and install it if missing:

1. **Detect project type**: Check for `package.json` in the working directory (npm/React/Next.js project) or look for HTML files (vanilla project).

2. **For npm/React/Next.js projects**: Run these checks and install automatically:
   ```bash
   # Check if gsap is already in dependencies
   grep -q '"gsap"' package.json 2>/dev/null
   # If not found, install it:
   npm install gsap @gsap/react
   ```
   - Always install both `gsap` and `@gsap/react` for React/Next.js projects.
   - For vanilla JS projects using a bundler, install just `gsap`.

3. **For vanilla HTML projects** (no package.json): Add CDN script tags to the HTML `<head>` or before `</body>`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/SplitText.min.js"></script>
   ```
   Only add the plugin scripts (ScrollTrigger, SplitText) that are actually needed for the requested animation.

4. **Verify installation**: After installing, confirm by checking `node_modules/gsap` exists or that the CDN scripts were added.

**Do NOT skip this step.** Always ensure GSAP is available before writing animation code.

## FFmpeg Auto-Installation (FOR VIDEO SCRUBBING)

When video scrubbing is requested, you MUST check for and install ffmpeg:

1. **Check if ffmpeg exists**:
   ```bash
   which ffmpeg 2>/dev/null || where ffmpeg 2>/dev/null
   ```

2. **If NOT found, install automatically based on platform**:
   - **Windows (winget)**: `winget install Gyan.FFmpeg`
   - **Windows (choco)**: `choco install ffmpeg`
   - **macOS (brew)**: `brew install ffmpeg`
   - **Linux (apt)**: `sudo apt-get install -y ffmpeg`
   - **Linux (dnf)**: `sudo dnf install -y ffmpeg`

3. **After installing, verify**: `ffmpeg -version`

4. **Optimize video for scroll scrubbing** (every frame = keyframe, HIGH RESOLUTION):
   ```bash
   ffmpeg -i input.mp4 -movflags faststart -vcodec libx264 -crf 18 -g 1 -pix_fmt yuv420p -an -y output.mp4
   ```
   - `-g 1` = every frame is a keyframe (CRITICAL for scrubbing — without this, seeking produces blank/frozen frames)
   - `-crf 18` = high quality (18 is near-lossless for hero backgrounds; 20-23 for secondary sections)
   - `-an` = strip audio (not needed for scroll-driven video)
   - `-movflags faststart` = metadata at start for fast loading
   - **Do NOT downscale** — preserve original resolution for crisp full-screen hero backgrounds
   - **Do NOT add `-vf scale=`** unless user explicitly requests downscaling
   - If user wants upscaling: `ffmpeg -i input.mp4 -vf scale=1920:-1:flags=lanczos ...`

**Do NOT skip ffmpeg installation.** Video scrubbing requires keyframe-every-frame encoding to work smoothly.

### Plugin Registration (REQUIRED before use)
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);
```

All GSAP plugins (ScrollTrigger, SplitText, ScrollSmoother, MorphSVG, etc.) are now 100% free — no Club GreenSock membership needed.

---

## Core GSAP Methods

Use `gsap.to()`, `gsap.from()`, and `gsap.fromTo()` as the building blocks for all animations:

```js
// Animate TO a state
gsap.to(".element", { x: 100, opacity: 1, duration: 1, ease: "power2.out" });

// Animate FROM a state (element starts at these values, animates to its natural CSS state)
gsap.from(".element", { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" });

// Animate FROM one state TO another
gsap.fromTo(".element",
  { opacity: 0, y: 30 },   // from
  { opacity: 1, y: 0, duration: 1, ease: "power2.out" }  // to
);
```

### Key Properties
| Property | Description |
|----------|-------------|
| `x`, `y` | Transform translate (px). Use `xPercent`, `yPercent` for % |
| `rotation` | Degrees. Also `rotationX`, `rotationY` for 3D |
| `scale` | Uniform scale. Also `scaleX`, `scaleY` |
| `opacity` | 0 to 1 |
| `duration` | Seconds |
| `delay` | Seconds before start |
| `ease` | Easing curve (see Easing section) |
| `stagger` | Delay between each target in a set |
| `overwrite` | "auto" prevents conflicting tweens |

### Easing Reference
- **Smooth**: `"power1.out"`, `"power2.out"`, `"power3.out"`, `"power4.out"`
- **Bounce**: `"bounce.out"`, `"elastic.out(1, 0.3)"`
- **Snap**: `"back.out(1.7)"`, `"steps(5)"`
- **Linear**: `"none"` or `"linear"`
- **Custom**: `"expo.inOut"`, `"circ.out"`, `"sine.inOut"`
- Suffix `.in` = slow start, `.out` = slow end, `.inOut` = both

---

## ScrollTrigger

ScrollTrigger links animations to scroll position. Always register the plugin first.

### Basic Scroll-Triggered Animation
```js
gsap.from(".card", {
  y: 60,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".card",
    start: "top 80%",    // trigger top hits 80% of viewport
    end: "top 30%",
    toggleActions: "play none none reverse"
  }
});
```

### ScrollTrigger Configuration Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `trigger` | String/Element | — | Element whose position triggers |
| `start` | String | `"top bottom"` | `"triggerPosition viewportPosition"` |
| `end` | String | `"bottom top"` | Same format as start |
| `scrub` | Boolean/Number | `false` | `true` = 1:1 scroll link; number = smoothing seconds |
| `pin` | Boolean/Element | `false` | Pin element in viewport while active |
| `pinSpacing` | Boolean/String | `true` | Add padding to compensate for pinned element |
| `snap` | Number/Array/Function | — | Snap to progress values (e.g., `0.25` = quarter intervals) |
| `toggleActions` | String | `"play none none none"` | `"onEnter onLeave onEnterBack onLeaveBack"` |
| `toggleClass` | String/Object | — | CSS class to add/remove |
| `markers` | Boolean | `false` | Show debug markers (dev only) |
| `once` | Boolean | `false` | Kill after first trigger |
| `horizontal` | Boolean | `false` | Horizontal scroll mode |
| `invalidateOnRefresh` | Boolean | `false` | Reset start values on resize |
| `anticipatePin` | Number | `0` | Seconds to start pin early |

**toggleActions values**: `play`, `pause`, `resume`, `reset`, `restart`, `complete`, `reverse`, `none`

### Start/End Position Syntax
Format: `"elementEdge viewportEdge"` or `"elementEdge viewportPercentage"`
- Element edges: `top`, `center`, `bottom`
- Viewport: `top`, `center`, `bottom`, or percentage like `80%`
- Offset: `"top+=100 center"` (100px below element top)
- Relative end: `"+=1500"` (1500px after start)

### Callbacks
```js
scrollTrigger: {
  onEnter: (self) => {},       // scroll forward past start
  onLeave: (self) => {},       // scroll forward past end
  onEnterBack: (self) => {},   // scroll backward past end
  onLeaveBack: (self) => {},   // scroll backward past start
  onUpdate: (self) => {        // every progress change
    console.log(self.progress, self.direction, self.getVelocity());
  },
  onToggle: (self) => {},      // active state changed
  onRefresh: (self) => {},     // recalculated on resize
}
```

---

## GSAP Timeline

Timelines sequence multiple animations. Use position parameters to control timing.

```js
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section",
    start: "top top",
    end: "+=2000",
    scrub: 1,
    pin: true
  }
});

tl.from(".heading", { y: 50, opacity: 0, duration: 0.5 })
  .from(".subtext", { y: 30, opacity: 0, duration: 0.4 }, "-=0.2")  // overlap by 0.2s
  .from(".cta", { scale: 0.8, opacity: 0, duration: 0.3 })
  .to(".bg", { backgroundPosition: "50% 100%", duration: 1 }, "<");  // start with previous
```

### Position Parameters
| Syntax | Meaning |
|--------|---------|
| `">"`  | After previous ends (default) |
| `"<"`  | Same start as previous |
| `"-=0.3"` | 0.3s before previous ends (overlap) |
| `"+=0.5"` | 0.5s after previous ends (gap) |
| `"<0.2"` | 0.2s after previous starts |
| `1.5` | Absolute time of 1.5s |

---

## Stagger Animations

Stagger creates cascading effects across multiple elements.

### Basic Stagger
```js
gsap.from(".card", {
  y: 40,
  opacity: 0,
  duration: 0.6,
  stagger: 0.15,   // 150ms between each
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".cards-grid",
    start: "top 75%"
  }
});
```

### Advanced Stagger Object
```js
gsap.from(".grid-item", {
  scale: 0,
  opacity: 0,
  duration: 0.5,
  stagger: {
    each: 0.1,          // time between each
    from: "center",      // "start", "end", "center", "edges", "random", or index
    grid: [4, 5],        // row x col grid pattern
    axis: "x",           // "x", "y", or null (both)
    ease: "power2.in"    // easing of the stagger distribution
  }
});
```

### ScrollTrigger.batch (Stagger on Scroll)
```js
ScrollTrigger.batch(".card", {
  onEnter: (elements) => {
    gsap.from(elements, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    });
  },
  start: "top 85%",
  interval: 0.1   // minimum time between batch triggers
});
```

---

## SplitText — Typography Animation

SplitText splits text into animatable characters, words, and lines.

### Basic Text Reveal
```js
const split = SplitText.create(".hero-title", {
  type: "chars,words",
  mask: "chars"      // clip wrapper for reveal effects
});

gsap.from(split.chars, {
  y: "100%",
  opacity: 0,
  duration: 0.6,
  stagger: 0.03,
  ease: "power3.out"
});
```

### Line-by-Line Reveal on Scroll
```js
const split = SplitText.create(".paragraph", {
  type: "lines",
  mask: "lines",
  autoSplit: true,   // re-split on resize
  onSplit() {
    gsap.from(split.lines, {
      y: "100%",
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".paragraph",
        start: "top 80%"
      }
    });
  }
});
```

### Character Wave Animation
```js
const split = SplitText.create(".wavy-text", { type: "chars" });

gsap.from(split.chars, {
  y: -20,
  opacity: 0,
  duration: 0.4,
  stagger: {
    each: 0.04,
    from: "start"
  },
  ease: "back.out(1.7)"
});
```

### Typewriter Effect
```js
const split = SplitText.create(".typewriter", { type: "chars" });

gsap.from(split.chars, {
  opacity: 0,
  duration: 0.05,
  stagger: 0.06,
  ease: "none"
});
```

### Scrub Text on Scroll (Word-by-Word Highlight)
```js
const split = SplitText.create(".scroll-text", {
  type: "words",
  propIndex: true    // adds --word CSS variable per word
});

gsap.fromTo(split.words,
  { opacity: 0.2, color: "#666" },
  {
    opacity: 1,
    color: "#fff",
    stagger: 0.05,
    scrollTrigger: {
      trigger: ".scroll-text",
      start: "top 70%",
      end: "bottom 30%",
      scrub: true
    }
  }
);
```

### SplitText Config Reference
| Option | Description |
|--------|-------------|
| `type` | `"chars"`, `"words"`, `"lines"` (comma-delimited) |
| `mask` | `"chars"`, `"words"`, `"lines"` — adds clip wrapper for reveal effects |
| `autoSplit` | `true` — re-splits on font load/resize. **Must use `onSplit` callback** |
| `onSplit` | Callback after splitting — create animations HERE when using autoSplit |
| `tag` | HTML tag for wrappers (default: `"div"`) |
| `charsClass` | CSS class for chars. `"char++"` auto-increments: `char1`, `char2`... |
| `wordsClass` | Same for words |
| `linesClass` | Same for lines |
| `propIndex` | Adds `--char`, `--word`, `--line` CSS custom properties |
| `aria` | `"auto"` (default), `"hidden"`, `"none"` |

### Blur-to-Sharp Text Reveal (textGenerateEffect)

A cinematic text reveal where each word transitions from blurred and invisible to sharp and visible, scrubbed to scroll position. Creates a "materializing" effect.

#### Vanilla JS Implementation
```js
function textGenerateEffect(selector, options = {}) {
  const {
    duration = 2,
    filter = true,
    stagger = 0.05,
    scrub = true,
    onComplete = null
  } = options;

  const el = document.querySelector(selector);
  const split = SplitText.create(el, { type: "words" });

  const tween = gsap.fromTo(split.words,
    {
      opacity: 0,
      filter: filter ? "blur(8px)" : "none"
    },
    {
      opacity: 1,
      filter: filter ? "blur(0px)" : "none",
      duration: duration,
      stagger: stagger,
      ease: "power2.out",
      onComplete: onComplete,
      scrollTrigger: scrub ? {
        trigger: el,
        start: "top 65%",
        end: "bottom 35%",
        scrub: true
      } : undefined
    }
  );

  return { split, tween };
}

// Usage:
textGenerateEffect(".my-text", {
  duration: 2,
  filter: true,       // blur-to-sharp per word
  stagger: 0.05,
  onComplete: () => console.log("done"),
});
```

#### Non-Scroll Version (plays on enter)
```js
textGenerateEffect(".my-text", {
  duration: 1.5,
  filter: true,
  stagger: 0.04,
  scrub: false,  // plays once on scroll-enter instead of scrubbing
});
```

#### Key Notes
- `filter: true` adds `blur(8px) → blur(0px)` per word — the signature "materializing" look
- `filter: false` does opacity-only reveal (lighter performance)
- Works with `scrub: true` (tied to scroll) or `scrub: false` (plays once on trigger)
- Combine with color transition for extra impact: add `color: "#2a2a32"` in `from` and `color: "#fff"` in `to`
- **Performance**: `filter: blur()` is GPU-accelerated but can be heavy with 50+ words. For long paragraphs, use `type: "lines"` instead of `"words"`

### Creative Philosophy/Statement Section (Blur + Rise + Glow + Keyword Highlight)

A multi-layered text reveal for long-form statement paragraphs. Combines blur-to-sharp with y-rise, a background glow pulse, and automatic keyword accent coloring.

#### HTML
```html
<section class="philosophy-section">
  <div class="philosophy-glow" id="philo-glow"></div>
  <div class="philosophy-inner">
    <p class="philosophy-text" id="philo-text">
      Your long-form statement paragraph here...
    </p>
  </div>
</section>
```

#### CSS
```css
.philosophy-section {
  padding: 200px 0;
  position: relative;
  overflow: hidden;
}
.philosophy-glow {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(var(--accent-rgb), 0.08) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 0;
}
.philosophy-inner {
  position: relative;
  z-index: 1;
}
```

#### JavaScript
```js
(function() {
  const sp = SplitText.create("#philo-text", { type: "words" });

  // Set initial state
  gsap.set(sp.words, { opacity: 0, filter: "blur(12px)", y: 20 });

  // Word-by-word blur-to-sharp + rise + color shift, scrubbed to scroll
  gsap.fromTo(sp.words,
    { opacity: 0, filter: "blur(12px)", y: 20, color: "#1e2233" },
    {
      opacity: 1, filter: "blur(0px)", y: 0, color: "#dfe4ed",
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".philosophy-section",
        start: "top 70%",
        end: "bottom 20%",
        scrub: true
      }
    }
  );

  // Background glow: scales up as words reveal
  gsap.fromTo("#philo-glow",
    { scale: 0.6, opacity: 0 },
    {
      scale: 1.2, opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".philosophy-section",
        start: "top 70%",
        end: "bottom 30%",
        scrub: true
      }
    }
  );

  // Highlight key words with accent color at the end
  const keywords = ["never", "improves", "accelerates", "removes"];
  sp.words.forEach(w => {
    if (keywords.includes(w.textContent.toLowerCase())) {
      ScrollTrigger.create({
        trigger: ".philosophy-section",
        start: "bottom 40%",
        once: true,
        onEnter: () => {
          gsap.to(w, { color: "var(--accent)", duration: 0.6, ease: "power2.out" });
        }
      });
    }
  });
})();
```

#### Key Features
- **Blur + Rise**: Each word goes from `blur(12px) + y:20` to `blur(0px) + y:0` — materializes upward
- **Background glow**: A radial gradient pulse behind the text that scales up as words reveal, creating a soft spotlight effect
- **Keyword highlighting**: Specific important words automatically shift to the accent color once the section is mostly scrolled, drawing the eye to key concepts
- **Give it space**: Use `padding: 200px 0` — this section needs vertical room for the scrub to feel cinematic, not rushed

### Vertical Text Marquee (Rotating Words)

A vertical word-carousel where words continuously scroll upward in a masked viewport, creating a "We build [interfaces / experiences / products]" typewriter-on-steroids effect. Uses GSAP `modifiers` for seamless infinite looping.

#### HTML
```html
<div class="marquee-wrap">
  <span class="marquee-prefix">We build</span>
  <div class="marquee-viewport">
    <div class="marquee-track">
      <div class="marquee-item" style="color:#4aeadc">interfaces</div>
      <div class="marquee-item" style="color:#a78bfa">experiences</div>
      <div class="marquee-item" style="color:#f472b6">products</div>
      <div class="marquee-item" style="color:#fbbf24">platforms</div>
      <div class="marquee-item" style="color:#34d399">systems</div>
    </div>
  </div>
</div>
```

#### CSS
```css
.marquee-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}
.marquee-prefix {
  font-size: 42px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: rgba(255,255,255,0.85);
  white-space: nowrap;
  line-height: 1;
}
.marquee-viewport {
  position: relative;
  overflow: hidden;
  height: 200px;                /* shows ~4 items with fade */
  /* Fade mask: transparent at top/bottom edges */
  -webkit-mask-image: linear-gradient(
    rgba(0,0,0,0) 0%, rgb(0,0,0) 35%, rgb(0,0,0) 65%, rgba(0,0,0,0) 100%);
  mask-image: linear-gradient(
    rgba(0,0,0,0) 0%, rgb(0,0,0) 35%, rgb(0,0,0) 65%, rgba(0,0,0,0) 100%);
}
.marquee-track {
  position: relative;
  height: 100%;
}
.marquee-item {
  height: 48px;                 /* must match itemHeight in JS */
  display: flex;
  align-items: center;
  font-size: 42px;
  font-weight: 700;
  letter-spacing: -0.03em;
  white-space: nowrap;
  will-change: transform;
  line-height: 1;
}
```

#### JavaScript
```js
function initMarquee(containerSelector, itemHeight, speed) {
  const container = document.querySelector(containerSelector);
  const items = gsap.utils.toArray('.marquee-item', container);
  const count = items.length;
  const totalDuration = speed * count;

  items.forEach((item, index) => {
    const originY = (count - index) * itemHeight;
    const destinationY = -(index + 1) * itemHeight;
    const totalTravel = originY - destinationY;
    const delay = (totalDuration / count) * index - totalDuration;

    gsap.set(item, { y: originY });
    gsap.to(item, {
      y: destinationY,
      duration: totalDuration,
      delay: delay,
      ease: 'none',
      repeat: -1,
      modifiers: {
        y: gsap.utils.unitize(
          gsap.utils.wrap(destinationY, destinationY + totalTravel)
        ),
      },
    });
  });
}

// Usage:
initMarquee('#my-marquee', 48, 1);    // container, itemHeight (px), speed (seconds per item)
```

#### Key Parameters
- **`itemHeight`**: Must match the CSS `.marquee-item { height }` exactly
- **`speed`**: Seconds per item cycle. `1` = normal, `0.5` = fast, `2` = slow
- **Viewport height**: Controls how many items are visible. `200px` with `48px` items shows ~4 with fade
- **Mask gradient**: The `mask-image` fade at top/bottom creates elegant entry/exit. Adjust `35%/65%` for narrower/wider visible zone
- **Colors**: Give each `.marquee-item` a unique accent color for visual variety
- **Monospace variant**: Use smaller `itemHeight: 28`, `font-size: 16px`, monospace font for a code/terminal feel

### Animated Gradient Orbs (Section Background Texture)

Soft, blurred color orbs that drift and pulse behind section content, adding depth and atmosphere to otherwise flat dark backgrounds. Especially useful for horizontal scroll sections, feature sections, or any area that feels too empty.

#### CSS
```css
.section-grad { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
.grad-orb { position: absolute; border-radius: 50%; filter: blur(60px); will-change: transform; }
.grad-orb.a { width: 800px; height: 800px; background: rgba(148,179,206,.35); top: -25%; left: -15%; }
.grad-orb.b { width: 700px; height: 700px; background: rgba(167,139,250,.25); bottom: -25%; right: 0%; }
.grad-orb.c { width: 550px; height: 550px; background: rgba(142,235,255,.2); top: 15%; right: 25%; }
/* Optional grain overlay on the section */
.my-section::after {
  content: ''; position: absolute; inset: 0; z-index: 2; pointer-events: none; opacity: .04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
}
/* Content must sit above orbs */
.my-section .content { position: relative; z-index: 1; }
```

#### HTML
```html
<section class="my-section" style="position:relative;overflow:hidden">
  <div class="section-grad">
    <div class="grad-orb a"></div>
    <div class="grad-orb b"></div>
    <div class="grad-orb c"></div>
  </div>
  <div class="content"><!-- section content --></div>
</section>
```

#### JavaScript
```js
document.querySelectorAll(".grad-orb").forEach((orb, i) => {
  // Large looping drift
  gsap.fromTo(orb,
    { x: 0, y: 0 },
    { x: (i % 2 === 0 ? 150 : -120), y: (i % 2 === 0 ? -120 : 100),
      duration: 6 + i * 2, ease: "sine.inOut", repeat: -1, yoyo: true });
  // Breathing scale
  gsap.fromTo(orb,
    { scale: 1 },
    { scale: 1.3, duration: 4 + i * 1.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: i * 1.5 });
  // Slow rotation for organic shape shift
  gsap.to(orb, { rotation: 360, duration: 30 + i * 10, ease: "none", repeat: -1 });
});
```

#### Key Guidelines
- **Use solid `rgba` fills** not `radial-gradient` — gradients get washed out when blurred
- **Opacity 0.20–0.35** — must be clearly visible on dark backgrounds, not invisible wisps
- **Blur 50–80px** — less blur = more visible color; too much blur diffuses to nothing
- **3 orbs minimum** — creates color mixing where they overlap
- **Colors from the site's image-derived palette** — not arbitrary
- **Always add grain overlay** (`::after` pseudo with SVG noise) at 3–5% opacity for tactile depth
- **Content z-index: 1** above orbs at z-index: 0, grain at z-index: 2 above everything as a subtle texture

### Marquee Text Readability [CRITICAL]
- **NEVER use stroke-only text** (`color: transparent; -webkit-text-stroke: 1px`) for marquee bands at low opacity. The result is unreadable thin outlines.
- Instead, use **low-opacity solid fill**: `color: rgba(255,255,255, 0.08)` — this creates readable ghost text that's subtle but legible.
- If you want the outline aesthetic, use a higher stroke width (`2px+`) with higher opacity (`rgba(255,255,255, 0.12)+`).

---

## Video Scrubbing on Scroll

Tie video playback to scroll position using ScrollTrigger. Video frames advance as the user scrolls — creating a cinematic, frame-by-frame reveal controlled entirely by scroll position.

### Video Preparation (FFmpeg) — CRITICAL FOR SMOOTH SCRUBBING

For smooth scrub-based playback, every frame must be a keyframe. **Resolution must stay high** — do NOT downscale unless the user explicitly asks.

**High-resolution encode (RECOMMENDED — preserves original resolution):**
```bash
ffmpeg -i input.mp4 -movflags faststart -vcodec libx264 -crf 18 -g 1 -pix_fmt yuv420p -an -y output.mp4
```
- `-g 1` = every frame is a keyframe (CRITICAL for scrubbing — without this, seeking to non-keyframes produces blank/frozen frames)
- `-crf 18` = high quality (18 is near-lossless; use 18-20 for hero backgrounds, 20-23 for secondary sections)
- `-movflags faststart` = metadata at start for faster loading
- `-an` = strip audio (not needed for scroll-driven video)
- **No `-vf scale=`** = preserves original resolution for crisp full-screen display
- No `loop` or `autoplay` needed on the `<video>` element

**Only downscale if explicitly requested:**
```bash
ffmpeg -i input.mp4 -vf scale=1920:-1:flags=lanczos -movflags faststart -vcodec libx264 -crf 18 -g 1 -pix_fmt yuv420p -an -y output.mp4
```

### Hero Background Video Scroll Scrub (Pinned Full-Screen)

The most impactful use of video scrubbing: a full-viewport hero where the background video frames advance as you scroll. The section pins in place, content overlays fade in/out, and the video reveals frame-by-frame. Text and UI float above with a semi-transparent overlay for readability.

#### Key Principles
- **Pin the hero** so it stays fixed while the video scrubs through `+=3000` (or more) of scroll distance
- **Overlay is mandatory** — semi-transparent gradient between video and text for WCAG readability
- **`scrub: 0.5`** gives a smooth, slightly lagging feel (not jerky 1:1)
- **Content parallax** — fade out and translate hero text/CTAs as the user scrolls deeper into the video
- **Poster fallback** — always set a `poster` attribute so content is readable before video loads
- **No autoplay, no loop** — the video is entirely scroll-driven
- **`preload="auto"`** — ensures frames are buffered for smooth scrubbing

#### HTML Structure
```html
<section class="hero">
  <div class="hero-bg">
    <video id="hero-video" muted playsinline preload="auto" poster="fallback.jpg">
      <source src="hero-scrub.mp4" type="video/mp4">
    </video>
    <div class="hero-overlay"></div>
  </div>
  <div class="hero-content">
    <h1 class="hero-title">Your headline here</h1>
    <p class="hero-desc">Supporting copy that sits over the video.</p>
    <div class="hero-cta-row">
      <button class="btn-primary">Primary action</button>
      <button class="btn-secondary">Secondary</button>
    </div>
  </div>
</section>
```

#### CSS
```css
.hero {
  position: relative;
  height: 100vh;
  min-height: 100dvh;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero-bg video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  /* Strong gradient overlay for text readability over ANY video frame */
  background: linear-gradient(
    to top,
    rgba(9, 9, 11, 0.9) 0%,
    rgba(9, 9, 11, 0.4) 40%,
    rgba(9, 9, 11, 0.2) 100%
  );
}
.hero-content {
  position: relative;
  z-index: 2;
  /* position your content as needed */
}
```

#### JavaScript
```js
(function() {
  const heroVid = document.getElementById("hero-video");

  // Fallback if optimized video fails to load
  heroVid.addEventListener("error", function() {
    this.src = "original-video.mp4";
  });

  heroVid.addEventListener("loadedmetadata", () => {
    // Pin the hero and scrub the video frame-by-frame with scroll
    gsap.to(heroVid, {
      currentTime: heroVid.duration,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "+=3000",     // 3000px of scroll = full video duration
        scrub: 0.5,        // smooth 0.5s lag
        pin: true           // hero stays pinned while video plays
      }
    });
  });

  // Fade out hero content as user scrolls deeper
  gsap.to(".hero-content", {
    y: -80,
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "top+2000 top",
      scrub: true
    }
  });
})();
```

#### React Version
```jsx
"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroVideoScrub({ videoSrc, poster, children }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useGSAP(() => {
    const vid = videoRef.current;
    const onReady = () => {
      gsap.to(vid, {
        currentTime: vid.duration,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 0.5,
          pin: true
        }
      });
    };
    vid.readyState >= 1 ? onReady() : vid.addEventListener("loadedmetadata", onReady);
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <video ref={videoRef} muted playsInline preload="auto" poster={poster}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}>
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,9,11,0.9), rgba(9,9,11,0.2))" }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        {children}
      </div>
    </section>
  );
}
```

#### Customization
- **Scroll distance**: `end: "+=3000"` controls how much scroll = full video. Increase for slower scrub, decrease for faster
- **Scrub smoothness**: `scrub: 0.5` is smooth; `scrub: true` is 1:1; `scrub: 1.5` is very cinematic/laggy
- **Content fade**: Adjust `end: "top+2000 top"` to control when hero text fully disappears
- **Multiple overlays**: Stack additional text that fades in/out at different scroll positions (see Video Scrub with Text Overlay below)
- **Curtain transition**: Add a clip-path shape that wipes over the video at the end of the scrub to transition cleanly into the next section

---

### Standalone Video Scrub Section (Non-Hero)

For mid-page video scrub sections (not the hero), use a dedicated section with its own pin:

### Basic Video Scrub
```html
<video id="video" src="output.mp4" muted playsinline></video>
```

```js
const video = document.querySelector("#video");

video.addEventListener("loadedmetadata", () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: video,
      start: "top top",
      end: "+=3000",
      scrub: true,
      pin: true
    }
  });

  tl.to(video, {
    currentTime: video.duration,
    ease: "none"
  });
});
```

### Video Scrub with Text Overlay
```js
const video = document.querySelector("#video");
const texts = gsap.utils.toArray(".video-text");

video.addEventListener("loadedmetadata", () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".video-section",
      start: "top top",
      end: "+=5000",
      scrub: true,
      pin: true
    }
  });

  // Scrub video
  tl.to(video, { currentTime: video.duration, ease: "none" }, 0);

  // Overlay text appears/disappears mapped to scroll
  texts.forEach((text, i) => {
    const startPos = i / texts.length;
    const endPos = (i + 1) / texts.length;
    tl.fromTo(text,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.1 },
      startPos
    );
    tl.to(text,
      { opacity: 0, y: -30, duration: 0.1 },
      endPos - 0.1
    );
  });
});
```

---

## Parallax Effects

### Basic Parallax Layers
```js
gsap.utils.toArray(".parallax-layer").forEach((layer, i) => {
  const speed = layer.dataset.speed || (i + 1) * 0.3;
  gsap.to(layer, {
    yPercent: -50 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: ".parallax-section",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});
```

### Parallax with Timeline (Multiple Layers Moving at Different Speeds)
```js
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "top 30%",
    end: "bottom 80%",
    scrub: true
  }
});

tl.to(".bg-layer", { y: -100 }, 0)
  .to(".mid-layer", { y: -200 }, 0)
  .to(".fg-layer", { y: -300 }, 0)
  .to(".text-layer", { y: -50, opacity: 0 }, 0);
```

### Image Parallax Inside Container
```css
.img-container { overflow: hidden; height: 400px; }
.img-container img { height: 120%; object-fit: cover; }
```
```js
gsap.utils.toArray(".img-container").forEach((container) => {
  const img = container.querySelector("img");
  gsap.fromTo(img,
    { yPercent: -15 },
    {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    }
  );
});
```

---

## Parallax Floating Section (Mouse-Driven)

A full-section interactive experience where elements float and drift based on cursor position. Each element has a `data-depth` that controls parallax intensity — higher depth = more movement. NOT scroll-driven; purely cursor-reactive with ambient idle motion.

### Key Principles
- **`overwrite: "auto"`** is critical — lets each new mouse position smoothly interrupt the previous tween, creating buttery lerp/easing without manually tracking `currentPosition` or calculating deltas. GSAP handles interpolation internally.
- **`duration: 0.8 + depth * 0.15`** — deeper elements have slightly longer tweens, creating natural parallax lag
- **`sensitivity`** scales overall movement range (40–60 is a good default)
- **Global mouse tracking** — track on `document`, not just the container, so elements respond to cursor anywhere on the page
- **Idle floating** — sine-wave ambient motion so elements feel alive even without mouse input

### Decision: Images vs Gradient Shapes

Before building the floating section, check if images are available in the project directory. If images exist, use `<img>` tags. If no images are available, use **gradient-colored shapes** (rectangles, circles, rounded squares) as the floating elements instead.

**Gradient shape fallback examples** (use varied shapes and vibrant gradients that match the site's color palette):
```html
<!-- Rounded rectangle -->
<div class="float-el" data-depth="1.5" style="width:200px; height:160px; top:8%; left:5%;
  background: linear-gradient(135deg, #7B2FF7, #5B1FA6); border-radius:16px;"></div>

<!-- Circle -->
<div class="float-el" data-depth="3" style="width:180px; height:180px; top:45%; left:50%;
  background: linear-gradient(160deg, #FFD700, #FFA500); border-radius:50%;"></div>

<!-- Tall rectangle -->
<div class="float-el" data-depth="2" style="width:160px; height:240px; bottom:15%; left:12%;
  background: linear-gradient(180deg, #00C853, #009624); border-radius:14px;"></div>

<!-- Wide rectangle with subtle gradient -->
<div class="float-el" data-depth="1.2" style="width:260px; height:180px; top:12%; right:8%;
  background: linear-gradient(145deg, #1565C0, #0D47A1); border-radius:20px;"></div>

<!-- Ellipse -->
<div class="float-el" data-depth="3.5" style="width:220px; height:160px; bottom:10%; right:12%;
  background: linear-gradient(135deg, #E53935, #FF7043); border-radius:50%;"></div>

<!-- Small accent square -->
<div class="float-el" data-depth="0.8" style="width:120px; height:120px; top:2%; left:42%;
  background: linear-gradient(150deg, #4A5568, #2D3748); border-radius:10px;"></div>

<!-- Medium rectangle -->
<div class="float-el" data-depth="2.5" style="width:200px; height:200px; bottom:30%; right:28%;
  background: linear-gradient(135deg, #00897B, #26A69A); border-radius:14px;"></div>

<!-- Soft purple rectangle -->
<div class="float-el" data-depth="2" style="width:220px; height:180px; bottom:5%; right:5%;
  background: linear-gradient(140deg, #CE93D8, #AB47BC); border-radius:16px;"></div>
```

**When using images:**
```html
<img src="photo1.jpg" alt="" class="float-el" data-depth="1.5"
  style="width:220px; top:8%; left:5%; border-radius:16px;">
<img src="photo2.jpg" alt="" class="float-el" data-depth="3"
  style="width:300px; top:12%; right:8%; border-radius:20px;">
```

**Guidelines for gradient shapes:**
- Use 6–9 shapes for a full section
- Mix shapes: rectangles, circles, ellipses, squares
- Use vibrant, varied gradients — pull from the site's accent colors when possible
- Vary sizes: small (120px), medium (180px), large (260px+)
- Vary `data-depth` from 0.5 (subtle) to 4.0 (dramatic)
- Add subtle box-shadow for depth: `box-shadow: 0 20px 60px rgba(0,0,0,0.4)`

### HTML Structure
```html
<section class="parallax-float">
  <div class="parallax-float-inner">
    <div class="parallax-float-header">
      <div class="section-tag">Visual Playground</div>
      <h2 class="section-title">Move your cursor</h2>
    </div>
    <div class="parallax-float-container" id="parallax-container">
      <!-- Floating elements (images OR gradient shapes) scattered with absolute positioning -->
      <img src="A.png" alt="" class="float-el" data-depth="1.2" style="width:220px; top:8%; left:5%; border-radius:16px;">
      <img src="B.png" alt="" class="float-el" data-depth="3" style="width:300px; top:12%; right:8%; border-radius:20px;">
      <img src="C.png" alt="" class="float-el" data-depth="1.8" style="width:180px; bottom:18%; left:12%; border-radius:14px;">
      <img src="D.png" alt="" class="float-el" data-depth="4" style="width:260px; bottom:8%; right:10%; border-radius:18px;">
      <!-- more elements... -->

      <!-- Center focal text (low depth for subtle motion) -->
      <div class="float-el float-center-text" data-depth="0.5">
        <span>Explore</span>
        <span class="accent">Depth</span>
      </div>
    </div>
  </div>
</section>
```

### CSS
```css
.parallax-float {
  position: relative;
  padding: 100px 0;
  overflow: hidden;
  background: #0a0a0f;
}
.parallax-float-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 48px;
}
.parallax-float-header {
  text-align: center;
  margin-bottom: 60px;
}
.parallax-float-container {
  position: relative;
  width: 100%;
  height: 80vh;
  min-height: 600px;
}
.float-el {
  position: absolute;
  object-fit: cover;
  will-change: transform;
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
}
.float-el:hover {
  box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 0 0 2px rgba(205,255,0,0.3);
}
.float-center-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4rem;
  font-weight: 800;
  text-transform: uppercase;
  color: rgba(255,255,255,0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
  pointer-events: none;
  box-shadow: none;
}
.float-center-text:hover { box-shadow: none; }
.float-center-text .accent { color: rgba(205,255,0,0.15); }
```

### JavaScript
```js
(function() {
  const container = document.getElementById("parallax-container");
  const floatEls = container.querySelectorAll(".float-el");
  const sensitivity = 50;

  // ── Idle floating: gentle ambient motion per element ──
  floatEls.forEach(el => {
    const depth = parseFloat(el.dataset.depth) || 1;
    const range = 6 + depth * 3;
    const dur = 3 + Math.random() * 2;

    gsap.to(el, {
      y: "+=" + range,
      duration: dur,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });
    gsap.to(el, {
      x: "+=" + (range * 0.6),
      duration: dur * 1.3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: dur * 0.3
    });
  });

  // ── Mouse-driven parallax: tracks cursor across entire page ──
  document.addEventListener("mousemove", (e) => {
    const cx = (e.clientX / window.innerWidth) - 0.5;
    const cy = (e.clientY / window.innerHeight) - 0.5;

    floatEls.forEach(el => {
      const depth = parseFloat(el.dataset.depth) || 1;
      const targetX = cx * sensitivity * depth;
      const targetY = cy * sensitivity * depth;

      gsap.to(el, {
        x: targetX,
        y: targetY,
        duration: 0.8 + depth * 0.15,
        ease: "power2.out",
        overwrite: "auto"
      });
    });
  });

  // ── Entrance animation (scroll-triggered) ──
  gsap.from(floatEls, {
    opacity: 0,
    scale: 0.8,
    y: 60,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: { trigger: ".parallax-float", start: "top 75%", once: true }
  });
})();
```

### React Version
```jsx
"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Gradient shape data (fallback when no images)
const defaultShapes = [
  { depth: 1.5, style: { width: 200, height: 160, top: "8%", left: "5%", background: "linear-gradient(135deg, #7B2FF7, #5B1FA6)", borderRadius: 16 } },
  { depth: 3,   style: { width: 180, height: 180, top: "45%", left: "50%", background: "linear-gradient(160deg, #FFD700, #FFA500)", borderRadius: "50%" } },
  { depth: 2,   style: { width: 160, height: 240, bottom: "15%", left: "12%", background: "linear-gradient(180deg, #00C853, #009624)", borderRadius: 14 } },
  { depth: 1.2, style: { width: 260, height: 180, top: "12%", right: "8%", background: "linear-gradient(145deg, #1565C0, #0D47A1)", borderRadius: 20 } },
  { depth: 3.5, style: { width: 220, height: 160, bottom: "10%", right: "12%", background: "linear-gradient(135deg, #E53935, #FF7043)", borderRadius: "50%" } },
  { depth: 0.8, style: { width: 120, height: 120, top: "2%", left: "42%", background: "linear-gradient(150deg, #4A5568, #2D3748)", borderRadius: 10 } },
];

export default function ParallaxFloat({ items, sensitivity = 50, centerText }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const els = containerRef.current.querySelectorAll(".float-el");

    // Idle floating
    els.forEach(el => {
      const depth = parseFloat(el.dataset.depth) || 1;
      const range = 6 + depth * 3;
      const dur = 3 + Math.random() * 2;
      gsap.to(el, { y: "+=" + range, duration: dur, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(el, { x: "+=" + (range * 0.6), duration: dur * 1.3, ease: "sine.inOut", repeat: -1, yoyo: true, delay: dur * 0.3 });
    });

    // Mouse parallax
    const onMove = (e) => {
      const cx = (e.clientX / window.innerWidth) - 0.5;
      const cy = (e.clientY / window.innerHeight) - 0.5;
      els.forEach(el => {
        const depth = parseFloat(el.dataset.depth) || 1;
        gsap.to(el, { x: cx * sensitivity * depth, y: cy * sensitivity * depth, duration: 0.8 + depth * 0.15, ease: "power2.out", overwrite: "auto" });
      });
    };
    document.addEventListener("mousemove", onMove);

    // Entrance
    gsap.from(els, { opacity: 0, scale: 0.8, y: 60, duration: 0.8, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: containerRef.current, start: "top 75%", once: true } });

    return () => document.removeEventListener("mousemove", onMove);
  }, { scope: containerRef });

  const shapes = items || defaultShapes;

  return (
    <section className="parallax-float" ref={containerRef}>
      <div style={{ position: "relative", width: "100%", height: "80vh", minHeight: 600 }}>
        {shapes.map((item, i) => (
          item.src
            ? <img key={i} src={item.src} alt="" className="float-el" data-depth={item.depth} style={{ position: "absolute", objectFit: "cover", ...item.style }} />
            : <div key={i} className="float-el" data-depth={item.depth} style={{ position: "absolute", ...item.style }} />
        ))}
        {centerText && (
          <div className="float-el float-center-text" data-depth={0.5}
            style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
              fontSize: "4rem", fontWeight: 800, color: "rgba(255,255,255,0.12)", pointerEvents: "none",
              display: "flex", flexDirection: "column", alignItems: "center", boxShadow: "none" }}>
            <span>{centerText[0]}</span>
            <span style={{ color: "rgba(205,255,0,0.15)" }}>{centerText[1]}</span>
          </div>
        )}
      </div>
    </section>
  );
}
```

---

## Responsive Animations (matchMedia)

Handle different screen sizes and mobile:

```js
const mm = gsap.matchMedia();

mm.add({
  isDesktop: "(min-width: 1024px)",
  isTablet: "(min-width: 768px) and (max-width: 1023px)",
  isMobile: "(max-width: 767px)",
  reduceMotion: "(prefers-reduced-motion: reduce)"
}, (context) => {
  const { isDesktop, isMobile, reduceMotion } = context.conditions;

  if (reduceMotion) {
    // Minimal or no animation for accessibility
    gsap.set(".animate", { opacity: 1, y: 0 });
    return;
  }

  if (isDesktop) {
    gsap.from(".hero-content", {
      x: -100, opacity: 0, duration: 1,
      scrollTrigger: { trigger: ".hero", start: "top center", pin: true, end: "+=1000" }
    });
  }

  if (isMobile) {
    // Simpler, shorter animations on mobile
    gsap.from(".hero-content", {
      y: 30, opacity: 0, duration: 0.5,
      scrollTrigger: { trigger: ".hero", start: "top 80%" }
    });
  }

  return () => {
    // Cleanup runs automatically when conditions change
  };
});
```

---

## React / Next.js Integration

### useGSAP Hook (Required in React)

Always use `useGSAP` from `@gsap/react` instead of `useEffect` — it handles cleanup automatically.

```jsx
"use client"; // Required in Next.js App Router

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function AnimatedSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".card");
    gsap.from(cards, {
      y: 50,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%"
      }
    });
  }, { scope: containerRef }); // scope limits queries to this container

  return (
    <section ref={containerRef}>
      <div className="card">Card 1</div>
      <div className="card">Card 2</div>
      <div className="card">Card 3</div>
    </section>
  );
}
```

### Centralized Plugin Config (Recommended)
Create `lib/gsapConfig.ts`:
```ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };
```

Then import from this file across components:
```ts
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
```

### Critical Rules for React/Next.js
1. **Always use `"use client"`** — GSAP manipulates the DOM directly
2. **Always use `useGSAP` hook** — NOT `useEffect`. It handles GSAP cleanup/revert automatically
3. **Use `scope`** — Pass a ref to `{ scope: ref }` so `.querySelector` is scoped to that component
4. **Never animate React state with GSAP** — GSAP works on the real DOM; React manages virtual DOM
5. **Register plugins once** — Use a shared config file, not per-component registration

---

## Common Patterns & Recipes

### Fade-Up on Scroll (Most Common)
```js
gsap.utils.toArray("[data-animate]").forEach((el) => {
  gsap.from(el, {
    y: 40,
    opacity: 0,
    duration: 0.7,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });
});
```

### Horizontal Scroll Section
```js
const panels = gsap.utils.toArray(".panel");

gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-container",
    pin: true,
    scrub: 1,
    snap: 1 / (panels.length - 1),
    end: () => "+=" + document.querySelector(".horizontal-container").offsetWidth
  }
});
```

### Progress Bar Tied to Scroll
```js
gsap.to(".progress-bar", {
  scaleX: 1,
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});
```

### Pinned Section with Sequential Content
```js
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".pinned-section",
    start: "top top",
    end: "+=3000",
    pin: true,
    scrub: 1
  }
});

tl.from(".step-1", { opacity: 0, y: 30 })
  .to(".step-1", { opacity: 0, y: -30 })
  .from(".step-2", { opacity: 0, y: 30 })
  .to(".step-2", { opacity: 0, y: -30 })
  .from(".step-3", { opacity: 0, y: 30 });
```

### Sticky Scroll Stack (Cards Stacking on Scroll)

Cards that stick to the viewport and physically stack on top of each other as you scroll. Each card pins at a slightly offset `top` value, creating a deck-of-cards effect. Previous cards scale down and dim as new cards stack on top.

#### Key Principles
- **CSS `position: sticky`** handles the pinning — each card gets a progressively larger `top` value (e.g., `15vh`, `18vh`, `21vh`) so they visually stack with slight offsets
- **GSAP ScrollTrigger** adds the interactive layer: scaling down previous cards, dimming opacity, and adding subtle rotation as they get "pushed back" in the stack
- **`padding-bottom`** on the container provides enough scroll runway for all cards to stack
- Cards should have solid backgrounds (not transparent) so they visually cover each other
- Use inner image parallax (`yPercent` scrub) for depth within each card

#### HTML Structure
```html
<section class="stack-section">
  <div class="stack-inner">
    <div class="stack-header">
      <div class="section-tag">Selected work</div>
      <h2>Proof compounds</h2>
    </div>
    <div class="stack-cards">
      <div class="stack-card">
        <div class="stack-card-visual">
          <img src="project-1.jpg" alt="">
        </div>
        <div class="stack-card-content">
          <div class="stack-client">Client Name</div>
          <h3 class="stack-title">Project headline here</h3>
          <p class="stack-desc">Brief description of the work performed and the approach taken.</p>
          <div class="stack-metric-row">
            <div>
              <div class="stack-metric-val">3.2x</div>
              <div class="stack-metric-label">Key metric</div>
            </div>
            <div>
              <div class="stack-metric-val">18 days</div>
              <div class="stack-metric-label">Timeline</div>
            </div>
          </div>
        </div>
      </div>
      <!-- More stack-cards... each stacks on top of the previous -->
      <div class="stack-card"><!-- card 2 --></div>
      <div class="stack-card"><!-- card 3 --></div>
    </div>
  </div>
</section>
```

#### CSS
```css
.stack-section {
  padding: 160px 0 0;
  background: #111114;
}
.stack-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 48px;
}
.stack-cards {
  position: relative;
  padding-bottom: 60vh; /* scroll runway for stacking */
}
.stack-card {
  position: sticky;
  top: 15vh;
  padding: 48px;
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,0.06);
  background: #18181b; /* solid bg so cards cover each other */
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 48px;
  align-items: center;
  will-change: transform;
  transform-origin: center top;
}
/* Offset each card's sticky position so they peek above */
.stack-card:nth-child(2) { top: 18vh; }
.stack-card:nth-child(3) { top: 21vh; }
.stack-card:nth-child(4) { top: 24vh; }
.stack-card:nth-child(5) { top: 27vh; }

.stack-card-visual {
  aspect-ratio: 16/10;
  border-radius: 14px;
  overflow: hidden;
}
.stack-card-visual img {
  width: 100%;
  height: 120%; /* extra height for parallax */
  object-fit: cover;
  display: block;
}
```

#### JavaScript — GSAP ScrollTrigger Enhancement
```js
// Scale down + dim previous cards as the next card scrolls into view
const stackCards = gsap.utils.toArray(".stack-card");

stackCards.forEach((card, i) => {
  // Skip the last card — nothing stacks on top of it
  if (i < stackCards.length - 1) {
    ScrollTrigger.create({
      trigger: stackCards[i + 1], // triggered by the NEXT card
      start: "top 80%",
      end: "top 20%",
      scrub: true,
      onUpdate: (self) => {
        // Scale down and dim the current card as the next one approaches
        const scale = 1 - (self.progress * 0.05); // shrink to 0.95
        const opacity = 1 - (self.progress * 0.3); // dim to 0.7
        gsap.set(card, {
          scale: scale,
          opacity: opacity,
          filter: `brightness(${1 - self.progress * 0.2})`
        });
      }
    });
  }

  // Entrance animation: slide up from below
  gsap.from(card, {
    y: 80,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      once: true
    }
  });

  // Inner image parallax
  const img = card.querySelector(".stack-card-visual img");
  if (img) {
    gsap.fromTo(img,
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  }
});
```

#### React Version
```jsx
"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function StickyStack({ cards }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const stackCards = gsap.utils.toArray(".stack-card");

    stackCards.forEach((card, i) => {
      if (i < stackCards.length - 1) {
        ScrollTrigger.create({
          trigger: stackCards[i + 1],
          start: "top 80%",
          end: "top 20%",
          scrub: true,
          onUpdate: (self) => {
            const scale = 1 - (self.progress * 0.05);
            const opacity = 1 - (self.progress * 0.3);
            gsap.set(card, {
              scale, opacity,
              filter: `brightness(${1 - self.progress * 0.2})`
            });
          }
        });
      }

      gsap.from(card, {
        y: 80, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 85%", once: true }
      });

      const img = card.querySelector("img");
      if (img) {
        gsap.fromTo(img, { yPercent: -10 }, {
          yPercent: 10, ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true }
        });
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef}>
      <div style={{ position: "relative", paddingBottom: "60vh" }}>
        {cards.map((card, i) => (
          <div key={i} className="stack-card"
            style={{
              position: "sticky",
              top: `${15 + i * 3}vh`,
              padding: 48,
              borderRadius: 24,
              border: "1px solid rgba(255,255,255,0.06)",
              background: "#18181b",
              marginBottom: 40,
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: 48,
              alignItems: "center",
              willChange: "transform",
              transformOrigin: "center top"
            }}>
            <div style={{ aspectRatio: "16/10", borderRadius: 14, overflow: "hidden" }}>
              <img src={card.image} alt="" style={{ width: "100%", height: "120%", objectFit: "cover" }} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "0.6875rem", color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>{card.client}</div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 12 }}>{card.title}</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.7 }}>{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

#### Customization Options
- **Stack offset**: Change the `3vh` increment between cards (e.g., `15vh`, `18vh`, `21vh`) for tighter or looser stacking
- **Scale reduction**: Adjust `self.progress * 0.05` — larger values create more dramatic shrinking
- **Brightness dim**: The `filter: brightness()` creates the "pushed back into shadow" effect
- **Scroll runway**: The `padding-bottom: 60vh` controls how much scroll space is available — increase for more cards
- **Mobile**: On screens `< 768px`, switch to single-column layout inside each card (`grid-template-columns: 1fr`)

---

### Reveal Image on Scroll (Clip-path)
```js
gsap.fromTo(".reveal-image",
  { clipPath: "inset(100% 0 0 0)" },
  {
    clipPath: "inset(0% 0 0 0)",
    duration: 1.2,
    ease: "power3.inOut",
    scrollTrigger: {
      trigger: ".reveal-image",
      start: "top 70%"
    }
  }
);
```

---

## Performance Best Practices

1. **Animate transforms and opacity** — These are GPU-accelerated. Avoid animating `width`, `height`, `top`, `left`, `margin`, `padding`
2. **Use `will-change: transform`** sparingly — Only on elements that will animate
3. **Kill ScrollTriggers on cleanup** — Especially in SPAs/React
4. **Use `overwrite: "auto"`** — Prevents conflicting tweens on the same element
5. **Batch DOM reads/writes** — GSAP handles this internally, but avoid manual DOM reads mid-animation
6. **Use `gsap.set()`** for instant property changes (no animation) — more performant than CSS for GSAP-managed elements
7. **Debounce `ScrollTrigger.refresh()`** — Call after layout changes, not on every resize
8. **Use `scrub: 0.5`** instead of `scrub: true`** for smoother feel on most animations

---

## Debugging

- **`markers: true`** — Add to any ScrollTrigger to see start/end/trigger markers
- **`GSDevTools.create()`** — Visual timeline debugger (import from `gsap/GSDevTools`)
- **Check `ScrollTrigger.getAll()`** — List all active ScrollTriggers in console
- **`console.log(self.progress)`** — Log in `onUpdate` to verify scroll math
