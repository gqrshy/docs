# PolarCub Design Elements Analysis

## Overview

This document analyzes the design elements from [polarcub.art](https://polarcub.art) for implementation in GashiStudios docs-site.

---

## 1. Wave Lines (Wavy Grid Pattern)

### Description
Multiple vertical S-curve wave lines creating a decorative pattern behind the hero section.

### Structure
- **SVG Container**: 398x398 viewBox with opacity 0.2
- **Number of Lines**: 12 wavy vertical lines
- **Spacing**: 36px intervals (M2, M38, M74, M110, M146, M182, M218, M254, M290, M326, M362, M398)

### CSS Properties
```css
stroke: #4C75F2;
stroke-width: 2;
stroke-linecap: round;
opacity: 0.2;
```

### Path Pattern
Each wave follows a sinusoidal pattern with Bezier curves:
```
M[x] 400C[x-16] 386.667 [x-16] 373.333 [x] 360C[x+16] 346.667 [x+16] 333.333 [x] 320...
```

### Implementation SVG
```svg
<svg width="398" height="398" viewBox="0 0 398 398" fill="none">
<g opacity="0.2" clip-path="url(#waveClip)">
  <path d="M2 400C-14 386.667 -14 373.333 2 360C18 346.667 18 333.333 2 320C-14 306.667 -14 293.333 1.99999 280C18 266.667 18 253.333 1.99999 240C-14 226.667 -14 213.333 1.99999 200C18 186.667 18 173.333 1.99999 160C-14 146.667 -14 133.333 1.99999 120C18 106.667 18 93.3333 1.99999 80C-14 66.6667 -14 53.3333 1.99998 40C18 26.6667 18 13.3333 1.99998 -5.24537e-07" stroke="#4C75F2" stroke-width="2" stroke-linecap="round"/>
  <path d="M38 400C22 386.667 22 373.333 38 360C54 346.667 54 333.333 38 320C22 306.667 22 293.333 38 280C54 266.667 54 253.333 38 240C22 226.667 22 213.333 38 200C54 186.667 54 173.333 38 160C22 146.667 22 133.333 38 120C54 106.667 54 93.3333 38 80C22 66.6667 22 53.3333 38 40C54 26.6667 54 13.3333 38 -5.24537e-07" stroke="#4C75F2" stroke-width="2" stroke-linecap="round"/>
  <path d="M74 400C58 386.667 58 373.333 74 360C90 346.667 90 333.333 74 320C58 306.667 58 293.333 74 280C90 266.667 90 253.333 74 240C58 226.667 58 213.333 74 200C90 186.667 90 173.333 74 160C58 146.667 58 133.333 74 120C90 106.667 90 93.3333 74 80C58 66.6667 58 53.3333 74 40C90 26.6667 90 13.3333 74 -5.24537e-07" stroke="#4C75F2" stroke-width="2" stroke-linecap="round"/>
  <path d="M110 400C94 386.667 94 373.333 110 360C126 346.667 126 333.333 110 320C94 306.667 94 293.333 110 280C126 266.667 126 253.333 110 240C94 226.667 94 213.333 110 200C126 186.667 126 173.333 110 160C94 146.667 94 133.333 110 120C126 106.667 126 93.3333 110 80C94 66.6667 94 53.3333 110 40C126 26.6667 126 13.3333 110 -5.24537e-07" stroke="#4C75F2" stroke-width="2" stroke-linecap="round"/>
  <path d="M146 400C130 386.667 130 373.333 146 360C162 346.667 162 333.333 146 320C130 306.667 130 293.333 146 280C162 266.667 162 253.333 146 240C130 226.667 130 213.333 146 200C162 186.667 162 173.333 146 160C130 146.667 130 133.333 146 120C162 106.667 162 93.3333 146 80C130 66.6667 130 53.3333 146 40C162 26.6667 162 13.3333 146 -5.24537e-07" stroke="#4C75F2" stroke-width="2" stroke-linecap="round"/>
  <path d="M182 400C166 386.667 166 373.333 182 360C198 346.667 198 333.333 182 320C166 306.667 166 293.333 182 280C198 266.667 198 253.333 182 240C166 226.667 166 213.333 182 200C198 186.667 198 173.333 182 160C166 146.667 166 133.333 182 120C198 106.667 198 93.3333 182 80C166 66.6667 166 53.3333 182 40C198 26.6667 198 13.3333 182 -5.24537e-07" stroke="#4C75F2" stroke-width="2" stroke-linecap="round"/>
  <path d="M218 400C202 386.667 202 373.333 218 360C234 346.667 234 333.333 218 320C202 306.667 202 293.333 218 280C234 266.667 234 253.333 218 240C202 226.667 202 213.333 218 200C234 186.667 234 173.333 218 160C202 146.667 202 133.333 218 120C234 106.667 234 93.3333 218 80C202 66.6667 202 53.3333 218 40C234 26.6667 234 13.3333 218 -5.24537e-07" stroke="#4C75F2" stroke-width="2" stroke-linecap="round"/>
  <path d="M254 400C238 386.667 238 373.333 254 360C270 346.667 270 333.333 254 320C238 306.667 238 293.333 254 280C270 266.667 270 253.333 254 240C238 226.667 238 213.333 254 200C270 186.667 270 173.333 254 160C238 146.667 238 133.333 254 120C270 106.667 270 93.3333 254 80C238 66.6667 238 53.3333 254 40C270 26.6667 270 13.3333 254 -5.24537e-07" stroke="#4C75F2" stroke-width="2" stroke-linecap="round"/>
  <path d="M290 400C274 386.667 274 373.333 290 360C306 346.667 306 333.333 290 320C274 306.667 274 293.333 290 280C306 266.667 306 253.333 290 240C274 226.667 274 213.333 290 200C306 186.667 306 173.333 290 160C274 146.667 274 133.333 290 120C306 106.667 306 93.3333 290 80C274 66.6667 274 53.3333 290 40C306 26.6667 306 13.3333 290 -5.24537e-07" stroke="#4C75F2" stroke-width="2" stroke-linecap="round"/>
  <path d="M326 400C310 386.667 310 373.333 326 360C342 346.667 342 333.333 326 320C310 306.667 310 293.333 326 280C342 266.667 342 253.333 326 240C310 226.667 310 213.333 326 200C342 186.667 342 173.333 326 160C310 146.667 310 133.333 326 120C342 106.667 342 93.3333 326 80C310 66.6667 310 53.3333 326 40C342 26.6667 342 13.3333 326 -5.24537e-07" stroke="#4C75F2" stroke-width="2" stroke-linecap="round"/>
  <path d="M362 400C346 386.667 346 373.333 362 360C378 346.667 378 333.333 362 320C346 306.667 346 293.333 362 280C378 266.667 378 253.333 362 240C346 226.667 346 213.333 362 200C378 186.667 378 173.333 362 160C346 146.667 346 133.333 362 120C378 106.667 378 93.3333 362 80C346 66.6667 346 53.3333 362 40C378 26.6667 378 13.3333 362 -5.24537e-07" stroke="#4C75F2" stroke-width="2" stroke-linecap="round"/>
  <path d="M398 400C382 386.667 382 373.333 398 360C414 346.667 414 333.333 398 320C382 306.667 382 293.333 398 280C414 266.667 414 253.333 398 240C382 226.667 382 213.333 398 200C414 186.667 414 173.333 398 160C382 146.667 382 133.333 398 120C414 106.667 414 93.3333 398 80C382 66.6667 382 53.3333 398 40C414 26.6667 414 13.3333 398 -5.24537e-07" stroke="#4C75F2" stroke-width="2" stroke-linecap="round"/>
</g>
<defs>
  <clipPath id="waveClip">
    <rect width="398" height="398" fill="white"/>
  </clipPath>
</defs>
</svg>
```

---

## 2. Large S-Curve Waves (Bold Decorative Waves)

### Description
Large, bold S-shaped curves used as background decorative elements.

### CSS Properties
```css
stroke: #4C75F2;
stroke-width: 82;
stroke-linecap: round;
```

### Paths Found
Multiple large S-curves with different angles:

**Wave 1** (775x1588 viewBox):
```
M44.4018 18.2341C123.712 42.8872 143.82 91.8525 104.726 165.13C65.6321 238.407 85.7403 287.373 165.051 312.026C244.361 336.679 264.47 385.644 225.375 458.922C186.281 532.199 206.389 581.164 285.7 605.818C365.01 630.471 385.119 679.436 346.024 752.713
```

**Wave 2** (473x853 viewBox):
```
M449.03 24.6557C366.929 37.1979 339.739 82.6143 367.461 160.905C395.183 239.196 367.993 284.612 285.892 297.154C203.79 309.697 176.601 355.113 204.322 433.404C232.044 511.695 204.854 557.111 122.753 569.653C40.6517 582.195 13.4619 627.612 41.1837 705.903
```

---

## 3. Rounded Star Sprites (Rotating)

### Description
Organic, rounded star-like shapes that rotate continuously.

### Colors
- Purple: `#9E99FF`
- Pink: `#FF3C77`

### Sizes Found
| Size | Color | Usage |
|------|-------|-------|
| 301x301 | Purple | Large background |
| 232x232 | Pink | Medium background |
| 159x159 | Purple | Medium decorative |
| 60x60 | Pink | Small accent |
| 57x57 | Purple | Small accent |

### CSS Animation
```css
@keyframes spinStar {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.rotating-star {
  animation: spinStar 20s linear infinite;
}
```

### Example SVG (159x159 Purple Star)
```svg
<svg width="159" height="159" viewBox="-1 -1 159 159" fill="none">
  <path d="M56.927 29.7812C58.6317 24.4249 65.1834 22.4507 69.5637 25.9732L88.6344 41.3096C90.0683 42.4628 91.856 43.0864 93.696 43.0753L118.168 42.9279C123.789 42.894 127.691 48.5149 125.694 53.7693L117.002 76.6459C116.348 78.366 116.308 80.2588 116.887 82.0054L124.589 105.234C126.358 110.569 122.218 116.018 116.604 115.742L92.1611 114.544C90.3232 114.454 88.5105 115.001 87.0283 116.091L67.3168 130.595C62.7893 133.926 56.3284 131.672 54.8552 126.248L48.4412 102.631C47.9589 100.855 46.8792 99.2998 45.3841 98.2272L25.4992 83.9622C20.9319 80.6857 21.0789 73.8447 25.7826 70.7673L46.2616 57.3692C47.8014 56.3618 48.9469 54.8543 49.5049 53.1009L56.927 29.7812Z" fill="#9E99FF"/>
</svg>
```

### Example SVG (60x60 Pink Star)
```svg
<svg width="60" height="60" viewBox="-1 -1 60 60" fill="none">
  <path d="M43.4081 19.217C46.1451 19.8557 47.3873 23.0435 45.8041 25.3656L42.145 30.7325C41.6267 31.4927 41.3863 32.4083 41.4644 33.325L42.0153 39.7972C42.2536 42.5976 39.6057 44.7641 36.908 43.9759L30.673 42.1544C29.7899 41.8964 28.8448 41.9507 27.9971 42.3082L22.0119 44.8322C19.4223 45.9242 16.5435 44.0754 16.4595 41.2661L16.2651 34.7735C16.2376 33.8539 15.8939 32.9718 15.2919 32.276L11.042 27.3638C9.20317 25.2383 10.0719 21.9292 12.7177 20.9811L18.8325 18.7899C19.6987 18.4796 20.4313 17.8801 20.907 17.0926L24.2656 11.5327C25.7187 9.12707 29.1344 8.93074 30.8537 11.154L34.8272 16.2925C35.39 17.0203 36.1865 17.5319 37.0825 17.7409L43.4081 19.217Z" fill="#FF3C77"/>
</svg>
```

---

## 4. Icon Set (Social & UI Icons)

### Files Found
| File | Description | Size |
|------|-------------|------|
| Ci04GBL6gerh3gYit611JR2Uls.svg | TikTok icon | 28x28 |
| brush.svg | Paint brush icon | 28x28 |
| gxgj3hG5nh8NzrurqTbzKv7Ys.svg | Paw print icon | 28x28 |
| MDfrySSwuJfdfnxlBZDvWs4soQ.svg | Crown/tiara icon | 28x28 |
| MF14d5Pg6ExOA4Rv8AXh8Xvwp8.svg | Eye/view icon | 28x28 |
| qvYFGNzvthUtg0cozkZYRn1FQhY.svg | Bird/Twitter icon | 28x28 |
| QXkv7Vt2ATxxvKlXPxCyHay0A3Y.svg | YouTube icon | 28x28 |
| sSCQr9oVGeW24CyLrjKDmpr430.svg | Check circle icon | 29x28 |
| tv80PX9VQuTQsYRxDih6P2rlJeo.svg | Discord icon | 28x28 |
| vCgdiesQ6lEyoodf1e09L9ROpa8.svg | Chat/message icon | 28x28 |
| shop.svg | Shopping cart icon | 24x24 |
| zroDzEq1wcfQot2XHIEItO8i0c.svg | YouTube play button | 28x28 |

### Colors
- Dark: `#454141` (for text/dark mode icons)
- Light: `#FFFCFC` (for light mode icons)

---

## 5. Text Elements

### Files Found
| File | Content |
|------|---------|
| m4wKrCE5QrQbgOu60QRyfqLoQxk.svg | "My Portfolio" text (636x96) |
| uO0wkmQVEEpqhKwwdqBFdFMPbw.svg | "Hey. I'm Dani!" title (655x240) |
| UnQ1ppDriZY6YsuZ7dgVUw1s6K8.svg | "About Dani!" text |
| cYQboymHiZDPFqRzD5JHlCMdKE.svg | "Get in touch" text |
| zwPOtn3nr6EuTRWTOFy1VLCb3I.svg | "Watch some of my vids" text |

### Font
- Font Family: "MADE Okine Sans PERSONAL USE Medium"
- Font Weight: 500

---

## 6. Character Illustration

### File
`kse4KnhByR8RWnujOt9EnvspEo.svg` - Main character mascot (bear/polar cub)

---

## 7. Drop Shadow Element

### Description
Blue-tinted drop/splash shape element

### SVG Path
```svg
<path d="M30.0332 115.3C29.4491 117.841 27.1827 119.878 24.5847 120.183C22.3143 120.449 20.3747 121.943 19.539 124.071C18.7032 126.199 19.1071 128.614 20.5895 130.354C29.9732 141.368 44.9807 143.659 57 138.497C56.5408 131.148 53.1298 130.131 47.5415 128.465C47.0447 128.317 46.5307 128.163 46 128C42.3736 126.884 41.6524 125.367 40.2848 122.49C39.8145 121.5 39.2677 120.35 38.5 119C36.1 114.779 31.8555 114.775 30.0332 115.3Z" fill="#4C75F2"/>
```

---

## 8. Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#4C75F2` | Waves, accents, links |
| Purple | `#9E99FF` | Rounded stars (background) |
| Pink | `#FF3C77` | Rounded stars (accent) |
| Dark Text | `#454141` | Body text, dark icons |
| Light Text | `#FFFCFC` | Light mode icons |
| Gray Accent | `#5F5F5F` | Secondary elements |

---

## 9. Exact CSS Positions from PolarCub

### Wave Grid (framer-18ssq8g)
```css
/* Original PolarCub */
position: absolute;
flex: none;
width: 398px;
height: 398px;
bottom: -164px;
right: 283px;

/* Responsive Conversion */
width: clamp(280px, 26vw, 398px);
height: clamp(280px, 26vw, 398px);
bottom: -12%;
right: 18%;
```

### Wave Grid 2 (framer-e73dtc)
```css
/* Original PolarCub */
position: absolute;
width: 199px;
height: 199px;
top: -19px;
left: -25px;
```

### S-Curve Wave 1 (right side)
```css
/* Original PolarCub */
position: absolute;
width: 573px;
height: 813px;
bottom: 30px;
right: -176px;

/* Responsive Conversion */
width: clamp(280px, 38vw, 573px);
height: clamp(450px, 54vw, 813px);
bottom: 3%;
right: -12%;
```

### S-Curve Wave 2 (left side)
```css
/* Original PolarCub */
position: absolute;
width: 475px;
height: 853px;
bottom: -80px;
left: -220px;

/* Responsive Conversion */
width: clamp(240px, 32vw, 475px);
height: clamp(480px, 56vw, 853px);
bottom: -10%;
left: -20%;
```

### Rotating Stars (POSITIONED AT BOTTOM)
```css
/* Large Purple Star */
position: absolute;
width: 301px;
height: 301px;
bottom: -52px;
right: 45px;
/* Responsive: bottom: -8%; right: 3%; */

/* Medium Purple Star */
position: absolute;
width: 159px;
height: 159px;
bottom: 68px;
left: 210px;
/* Responsive: bottom: 8%; left: 24%; */

/* Small Purple Star */
position: absolute;
width: 57px;
height: 57px;
bottom: -40px;
left: 140px;
/* Responsive: bottom: -5%; left: 15%; */

/* Pink Star */
position: absolute;
width: 60px;
height: 60px;
bottom: -30px;
right: 60px;
/* Responsive: bottom: -4%; right: 4%; */
```

### Key Insight
PolarCub positions decorative elements at the **BOTTOM** of the hero section, extending off the edge. This creates depth and visual interest without obscuring content.

---

## Implementation Status

1. **Completed**
   - [x] 12 wavy vertical lines (stroke-width: 2, opacity: 0.2)
   - [x] Rotating rounded star sprites (with CSS animation)
   - [x] Large S-curve decorative waves
   - [x] Exact positions matching PolarCub

2. **Medium Priority**
   - [ ] Drop shadow element
   - [ ] Social icons with proper colors

3. **Low Priority**
   - [ ] Text SVG elements (can use web fonts instead)
   - [ ] Character illustration (already have Gengar)

---

## Implementation File

All elements implemented in: `src/components/HeroSection.astro`

### Animations Used
- `gridFloat` - Subtle floating for wave grid
- `sCurveFloat1` / `sCurveFloat2` - S-curve floating
- `spinStar` - Continuous 360deg rotation for stars (20s/25s/35s durations)
