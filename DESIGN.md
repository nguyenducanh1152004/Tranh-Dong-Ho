---
name: Đức Anh
description: A one-page portfolio printed like a Đông Hồ woodblock picture, one colour plate per scroll step, the black key plate last.
colors:
  vang: "#f2c230"
  hong: "#e8697f"
  xanh: "#9cc56f"
  cham: "#23356e"
  son: "#c8352b"
  luc: "#3e7d4a"
  den: "#171310"
  diep: "#f7f0de"
typography:
  display:
    fontFamily: "Phudu, Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "clamp(5rem, 12.5vw, 11.25rem)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Phudu, Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "clamp(2.8rem, 6.6vw, 5.6rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Phudu, Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)"
    fontWeight: 800
    lineHeight: 1.2
  numeral:
    fontFamily: "Phudu, Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 3.6vw, 3.2rem)"
    fontWeight: 900
    lineHeight: 1
    fontFeature: "tnum"
  lead:
    fontFamily: "Be Vietnam Pro, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.3rem, 2.3vw, 1.85rem)"
    fontWeight: 600
    lineHeight: 1.42
  body:
    fontFamily: "Be Vietnam Pro, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Phudu, Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    letterSpacing: "0.01em"
rounded:
  none: "0px"
  rod: "6px"
spacing:
  frame: "9px"
  frame-mobile: "5px"
  gutter: "clamp(28px, 6vw, 112px)"
  gutter-mobile: "22px"
  chip-gap: "8px"
  stack: "22px"
  block: "30px"
  sub-break: "84px"
  section: "24vh"
components:
  button-ink:
    backgroundColor: "{colors.den}"
    textColor: "{colors.vang}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "50px"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.den}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "50px"
  button-line-hover:
    backgroundColor: "{colors.den}"
    textColor: "{colors.vang}"
  title-box:
    textColor: "{colors.den}"
    typography: "{typography.headline}"
    rounded: "{rounded.none}"
    padding: "0.18em 0.38em 0.22em"
  seal:
    backgroundColor: "{colors.son}"
    textColor: "{colors.vang}"
    rounded: "{rounded.none}"
    size: "56px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.den}"
    rounded: "{rounded.none}"
    padding: "5px 13px"
  print-card:
    backgroundColor: "{colors.diep}"
    textColor: "{colors.den}"
    rounded: "{rounded.none}"
    width: "clamp(290px, 29vw, 400px)"
  input:
    backgroundColor: "#fffaf0"
    textColor: "{colors.den}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
  nav-link:
    textColor: "{colors.den}"
    typography: "{typography.label}"
    padding: "8px 12px"
---

# Design System: Đức Anh

## Overview

**Creative North Star: "The Đông Hồ Print Run"**

The page is a woodblock picture being printed as you read it. Each section is a sheet of dyed dó paper; each illustration is cut into flat colour plates that land slightly out of register and slide home as the reader scrolls, and the black key plate presses down last. Everything that moves is driven by scroll position, so scrolling back un-prints the sheet. Only one moment runs on a clock: the first yellow sheet printing itself once on load.

The surface is loud, flat and hand-made: saturated dye grounds, near-black charcoal ink, square edges, thick black rules, a double black frame around the whole viewport, caption boxes for headings and a red seal stamp for the signature. There is no gradient, no frosted glass, no glow. Depth comes from paper stacked on paper and from plates sitting off register, never from light. The former space and planet theme is retired and must not return.

Density is generous between sections (around a quarter of the viewport of air) and tight inside them, the way a print packs its picture and inscription into one frame.

**Key Characteristics:**
- One dyed paper per section, cross-faded by scroll; ink flips to light paper-white on the indigo sheet.
- Flat colour plates with deliberate misregistration that converges, almost to register, at full progress.
- A fixed double black frame around the viewport, like the border of a folk print.
- Headings sit in double-ruled caption boxes; signatures and step numbers are red seals.
- Phudu (heavy, capitals) for everything carved; Be Vietnam Pro for everything read.
- All motion is scroll-scrubbed and reversible; reduced motion shows every sheet fully printed.

## Colors

A folk-print palette: four dyed papers, three plate colours, one ink, one paper-white, all flat and fully saturated.

### Primary
- **Vermilion Seal Red** (son): the stamp colour. Seals, progress diamonds in the nav, timeline and list markers, filled skill meters, the misregistered plate under the ink button, focus rings, link underlines on the email, error text. Small marks only, never a ground.

### Secondary
- **Leaf Green Plate** (luc): second plate colour in illustrations (carp fins, lotus leaves, waves) and the availability diamond.
- **Indigo Plate** (cham): third plate colour in illustrations, and the one dark paper: the projects sheet is printed on indigo.

### Tertiary (dyed papers)
- **Pagoda-Tree Yellow** (vang): the hero and experience paper, the projects progress bar, the result block in project detail, and the text colour on seals.
- **Lotus Pink** (hong): the about and contact paper.
- **Rice-Seedling Green** (xanh): the skills paper.

### Neutral
- **Bamboo-Charcoal Ink** (den): all text, rules, frames and key-plate line work on light papers; the fill of the ink button.
- **Dó Paper White** (diep): the paper of cards, hanging scrolls, the form and dialogs; the ink colour on the indigo sheet; highlights in illustrations.

### Named Rules
**The Dye-Per-Sheet Rule.** Each section owns exactly one paper colour, set on `--paper` and cross-faded by scroll (hero vang → about hong → skills xanh → projects cham → experience vang → contact hong). Never place two dyed papers side by side in the same viewport except mid-transition.

**The Ink Follows Paper Rule.** `--ink` is den on every light paper and diep on indigo; the swap happens in the middle of the paper cross-fade, and focus rings switch from son to vang on the dark sheet. A new dark paper must be added through the same luminance test (relative luminance under 0.2), not hand-coloured.

**The Stamp Not Ground Rule.** Seal red is for marks the size of a seal or smaller. It never fills a section, a card or a button face.

## Typography

**Display Font:** Phudu (with Be Vietnam Pro, system-ui)
**Body Font:** Be Vietnam Pro (with system-ui, -apple-system, Segoe UI)

**Character:** Phudu is a heavy, capital-only face that reads like letters cut into a block; Be Vietnam Pro is a clear humanist sans with full Vietnamese diacritics for anything meant to be read at length.

### Hierarchy
- **Display** (900, clamp(5rem, 12.5vw, 11.25rem), 0.86): the name on the hero sheet, one word per line, each letter rising into place on load.
- **Headline** (900, clamp(2.8rem, 6.6vw, 5.6rem), 0.95): section titles inside the caption box, letters carved upward one by one on scroll.
- **Title** (800, clamp(1.4rem, 2.2vw, 1.8rem), 1.2): sub-headings within a section, about 84px above their block.
- **Numeral** (900, clamp(2.2rem, 3.6vw, 3.2rem), 1, tabular figures): stats and highlights that count up with scroll; experience highlights go larger, up to 4.4rem.
- **Lead** (Be Vietnam Pro 600, clamp(1.3rem, 2.3vw, 1.85rem), 1.42): the opening paragraph of a section, max 30–34ch; words ink in from 18% opacity as the reader scrolls.
- **Body** (400, 17px / 16px on phones, 1.65): running text, max 58–64ch.
- **Label** (Phudu 700–800, 15–17px): nav, buttons, card titles' companions, FAQ questions, years.

### Named Rules
**The Carved And Read Rule.** Phudu is for things carved (names, titles, numbers, labels, buttons); Be Vietnam Pro is for things read. Never set a paragraph in Phudu.

**The Readable Once Reached Rule.** Text animation may hold words back, but at full scroll progress every word is at full opacity, and lead text never drops below 18% opacity even before it is reached.

## Layout

The viewport is a framed sheet: a fixed double frame inset by the frame token (9px, 5px on phones) wraps everything, the top bar sits 12px inside it on the paper colour with a 3px ink rule beneath, and content runs between gutters of clamp(28px, 6vw, 112px) (22px on phones).

Sections are tall sheets (24vh top, 22vh bottom padding; 18vh/16vh on phones). Inside a section, blocks stack on a loose rhythm of 22–30px, with 84px before each sub-heading. Content widths are capped by role: 680px for the about column, 940px for the experience column, 1180px for wide sections.

Recurring grids: a text column with a sticky illustration (1fr / 0.72fr), stats in 4 columns (2 under 1100px), a process row of 4 seal-numbered steps joined by a drawn line, skill groups in a 0.8fr / 1.4fr split, and a pinned projects sheet whose cards run sideways on a horizontal track while the page scrolls vertically.

Breakpoints: at 1100px nav tightens, stats go to 2 columns and skill groups stack. At 760px wide **or** any portrait viewport taller than 4:5, the layout goes single-column, the nav moves to a fixed bottom bar inside the frame with short labels, the hero illustration moves above the name, and sticky art becomes static. Below 700px tall on phones, card tech tags hide.

## Elevation & Depth

The system is flat print. Depth is conveyed three ways: paper laid on paper (cream dó sheets on dyed grounds), plates sitting off register, and a fixed paper-grain overlay (fractal-noise texture, 0.32 opacity, multiply; soft-light at 0.5 on indigo). Only sheets of dó paper that physically sit on top of the page cast a soft drop shadow.

### Shadow Vocabulary
- **Sheet lift** (`box-shadow: 0 20px 34px -22px rgba(23, 19, 16, .55)`): hanging scrolls and the contact form.
- **Sheet lift on indigo** (`box-shadow: 0 22px 36px -18px rgba(5, 8, 25, .75)`): project print cards on the dark sheet.
- **Dialog lift** (`box-shadow: 0 30px 60px -24px rgba(0, 0, 0, .6)`): the project detail sheet over a 62% ink scrim.
- **Plate offset** (`box-shadow: 0 6px 0 -1px var(--son)`): a red plate printed out of register under the ink button and the toast. It deepens to 9px on hover and closes to 2px on press, the button pressing its own plate.
- **Double rule** (`box-shadow: inset 0 0 0 4px var(--paper), inset 0 0 0 7px var(--ink)`): not depth but line, used to draw the second rule of the frame and caption box.

### Named Rules
**The Paper Not Light Rule.** Shadows are cast only by dó-paper sheets lying on the page. No glows, no coloured blur, no shadows on text, seals or illustrations.

**The Register Rule.** Misregistration is driven by progress: plates start far off register (5.6× their offset) and converge as `--p` reaches 1, settling at a residual 0.6× so the print still looks hand-pulled. A fixed, unconverging plate is reserved for the ink button and the toast.

## Shapes

Everything is square-cut (0px radius): buttons, chips, cards, inputs, dialogs, seals. The only curve is the 6px-rounded black rod at the top and bottom of a hanging scroll. Borders are thick and black: 2px on chips, inputs and list rules, 3px on outline buttons and bars, 4px on cards, sheets and caption boxes, 5px on the viewport frame and dialogs. Dotted 2px rules separate skill meters; dashed borders mark things that are provisional (sample-content notes, "still learning" chips, the demo form notice, services not currently offered).

Small markers are squares turned 45°: nav progress diamonds, skill meter pips, timeline nodes, bullet points, the status dot. Seals are squares rotated −4°, the only element allowed to sit crooked at rest.

## Components

### Buttons
Heavy carved labels on square slabs.
- **Shape:** square (0px), 50px tall, 24px side padding; small variant 40px / 14px.
- **Ink:** den face, paper-colour label, Phudu 800 17px, with the red plate offset beneath.
- **Hover / Active:** ink button lifts 3px and its plate deepens; on press it drops 3px and the plate closes. Transitions 0.35s on the system ease.
- **Line:** 3px ink border, ink label; fills solid ink with paper label on hover.
- **Icon button:** 44px square, 3px den border on diep, inverting on hover.

### Chips
- **Style:** 2px ink border, no fill, 15px Be Vietnam Pro 600, 5px 13px padding; small variant 13.5px.
- **State:** dashed border means provisional. In the availability list a filled ink chip means "open", dashed means "not now", each with a hidden spoken suffix.
- **Entrance:** chips pop in from 60% scale and −10° with a per-chip stagger.

### Cards / Containers
- **Corner Style:** square (0px).
- **Background:** diep with den text, whatever the section paper.
- **Shadow Strategy:** sheet lift (see Elevation).
- **Border:** 4px den; the cover is separated by a second 4px rule.
- **Internal Padding:** 18px 20px 20px on print cards, 34px clamp(22px, 4vw, 48px) on hanging scrolls, 30px on the form.
- **Print card:** cover is a woodcut drawn on one of the four light dyes in rotation; cards curve along an arc (`--dx`) and only reach full register when centred.
- **Hanging scroll:** experience entries, with black rods 14px wider than the sheet top and bottom, unrolling downward by clip-path.

### Inputs / Fields
- **Style:** 2px den stroke, square, 12px 14px padding, warm paper fill, labels in 15px 700.
- **Focus:** native outline removed, replaced by a 3px son ring as box-shadow.
- **Error:** border goes son at 3px; message in son 700 below the form. Topic pickers are square chips that fill den when checked.

### Navigation
- **Style:** Phudu 700 16px labels beside a 14px outlined diamond per section; the diamond fills son when the section has been printed (passed) and the current one gets a 3px underline drawn from the left.
- **Brand:** a 46px red seal "ĐA" plus name and role, top left.
- **Mobile:** a fixed bottom bar inside the frame with short labels, 10px diamonds and a 3px ink rule on top.

### Caption-Box Title (signature)
Section headings set in Headline inside a 4px ink box with an inner second rule, like the inscription cartouche on a folk print. On scroll it straightens from −5° and 1.14 scale while letters rise into place one by one.

### Seal (signature)
A red square stamped with yellow Phudu letters and an inset yellow rule, rotated −4°. Sizes 36 / 56 / 112 / clamp(120px, 16vw, 200px). Used for the brand mark, process step numbers, the hero corner stamp and the large contact stamp, which presses down from 2.4× scale and −36° as the reader arrives.

### Woodcut Plate System (signature)
Every illustration is generated from shapes grouped by fill colour: one `<g>` plate per colour plus a black key plate of outlines. Each plate carries an order (`--k`) and an offset from a fixed set ([9,−6], [−8,5], [6,8], [−6,−8], [8,4]). As `--p` goes 0→1, plates fade in in order and their offset shrinks from 5.6× to 0.6× (never perfectly flush), then the key plate presses from 1.08 scale to 1. Line weight is 5 units on large pictures, 4 on covers, clouds and waves.

### Scroll Motion Grammar
JavaScript writes `--p` (raw progress) and `--e` (cubic ease-out of it) on every `[data-r]` element; CSS turns them into one of seven verbs: **carve** (title letters), **rise** (46px lift), **slide** (54px from the left), **stamp** (scale from 1.3 and −7°), **pop** (staggered chips), **unroll** (clip from the top), **press** (the big seal). Wheel input is smoothed exponentially so plates glide rather than tick. The system ease is cubic-bezier(.16, 1, .3, 1); the one time-based print uses 2.8s cubic-bezier(.3, .6, .2, 1). Without JavaScript every element sits at full progress.

**Reduced motion:** progress is pinned to 1 everywhere, the hero is printed immediately, wave and parallax drift stop, cards drop their arc, anchor jumps are instant, and all transitions collapse to 0.01ms.

## Do's and Don'ts

### Do:
- **Do** give each new section exactly one dyed paper from the palette and let the scroll engine cross-fade `--paper` and `--ink`.
- **Do** build new illustrations as woodcut plates: flat fills from vang, hong, xanh, cham, son, luc, diep, with den outlines as the key plate printed last.
- **Do** head every section with the caption-box title and drive its entrance from `--p` / `--e`, never from a timer.
- **Do** use square corners and 2 / 3 / 4px black rules; turn small markers 45° into diamonds.
- **Do** set carved text (names, titles, numbers, buttons) in Phudu and anything read in Be Vietnam Pro.
- **Do** make every motion reversible by scrolling back, and show everything at full progress under reduced motion or without JavaScript.
- **Do** mark provisional or sample content with a dashed border, never by hiding it.

### Don't:
- **Don't** use gradients, frosted glass or glowing shadows anywhere.
- **Don't** round corners; the scroll rod (6px) is the only curve.
- **Don't** use seal red as a ground; it is for stamps, markers and the offset plate.
- **Don't** add shadows to anything that is not a sheet of dó paper lying on the page.
- **Don't** leave a plate more than its residual 0.6× offset at full progress, except the ink button's and toast's fixed red plate.
- **Don't** set paragraphs in Phudu.
- **Don't** bring back the space or planet theme in any form.
