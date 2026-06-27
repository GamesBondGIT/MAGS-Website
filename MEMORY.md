# MAGS Digital Services - Project Memory

## Project Overview
This repository contains the source code for the **MAGS Digital Services** website, a highly interactive, animated, and fluid web experience. 

## Current Status
- **Phase**: V6 Dark Cinematic Return & UI Polish Completed.
- **Goal**: Reverted to a high-end, dark cinematic theme with raining fire particles. Unified the typography to match the MAGS brand, perfected the contact UI, and resolved complex GSAP horizontal scrolling and flexbox alignment bugs.
- **Theme Support**: Pure dark mode cinematic aesthetic.

## History of Major Iterations

### Phase 1 & 2: Initial Setup & Cinematic Theme
- Initialized the `assets/` directory structure and migrated resources (videos, images, logos) from the raw `MAGS_resources` folder.
- Built a highly cinematic, dark-themed website featuring a "Flying Random Mosquito" that followed the mouse and could be squashed on click.
- Implemented heavy GSAP animations, including a "Skill Tree" horizontal pin scroll for services.

### Phase 3: The Sticky & Bubble Iteration (V2/V3)
- Scrapped the horizontal skill tree in favor of a "Sticky Vertical Split" layout for services.
- Replaced the boxed portfolio with a "Bubble Constellation" (floating circular video frames).
- Cleaned up the Contact section into expanding accordion bars.

### Phase 4: The "Fresh Start" Playful Rewrite (V4)
- Wiped the slate clean, pivoting from a dark/corporate vibe to a bright, colorful, and playful theme (`#f4f9fc` background) using the exact Cyan, Magenta, Yellow, and Blue palette from the logo.
- Replaced the mosquito with an animated "Assistant Butterfly".
- Introduced the **Emoji Cursor** (hiding the system cursor and replacing it with dynamic emojis) and the **Water Ripple Click** effect.

### Phase 5: The Edge Monkey & TV Redesign (V5)
- **Light/Dark Theme Toggle**: Added a moon/sun icon in the nav bar that toggles the `<html data-theme="dark">` attribute, instantly swapping colors via CSS variables.
- **The Hero Retro TV**: Embedded the `MAGSshowreel.mp4` video inside a custom CSS `retro-tv` frame (orange chassis, antennas, screen border, dials, speaker grill, and a vintage CRT "scanline" overlay).
- **The Edge Monkey**: Replaced the butterfly with a custom SVG monkey face that hangs fixed on the left or right edge of the screen.
- **Services Slider**: Scrapped the grid layout. Packaged all 13 sub-services into individual `slider-card`s inside a custom horizontal scrolling carousel.
- **Portfolio Dense Bubbles**: Built a `bubble-cloud-container` filled with densely packed, randomly sized floating bubbles containing video screenshots (using HTML5 media fragments `#t=X`).
- **Clean Contact Cards**: Removed the profile visiting card images in favor of ultra-clean, text-focused frosted glass cards.

### Phase 6: The Dark Cinematic Return & Polish (Current - V6)
- **Typography Unification**: Downloaded and applied the **Nasalization** font (inspired by the 1975 NASA worm logo) across all website headers to perfectly match the custom MAGS banner graphic.
- **Contact Card Polish**: Overhauled the contact tiles. Hard-locked their width to exactly 320px for a perfect grid, removed visible phone numbers, and implemented sleek font-awesome `phone` and `envelope` icons linked directly to auto-dialers and `admin.magsdigital@gmail.com`.
- **Hero Spacing**: Increased the MAGS banner size (max-width 1200px) and adjusted the flex-box split to pull both the Retro TV and the banner closer to the absolute center of the screen, removing awkward dead space.
- **Services GSAP Fix**: Rewrote the horizontal scroll logic. Removed a conflicting flex-center wrapper and 100vw invisible spacer. The section now features a standard "OUR SERVICES" header, takes up exactly `100vh` to vertically center the content, and seamlessly pins and scrolls sideways until the final card without breaking anchor offsets.

## Code Architecture
- `index.html`: The core single-page HTML structure containing the 4 main sections (Home, Services, Portfolio, Contact), the Edge Monkey, and the Custom Cursor.
- `assets/css/style.css`: Contains all styling, including the CSS variables for the Light/Dark theme toggle, the Retro TV styling, Edge Monkey positioning, Ripple animations, and slider layout.
- `assets/js/main.js`: Handles global logic such as the Theme Toggle, Header scroll effect, Emoji Cursor tracking, Water Ripple click effect, and generating the Portfolio Bubble Cloud.
- `assets/js/services.js`: Contains the data array of services and handles the logic for the horizontal slider carousel.
- `assets/js/edgemonkey.js`: Dedicated entirely to the complex interactions of the Edge Monkey (the boasting interval loop, mouse tracking for the eyes, and GSAP jumping animations).
- `assets/js/mosquito.js` & `assets/js/butterfly.js`: Deleted during phase transitions.

## Known Bugs
- None reported at this time. 

## Immediate Next Steps
- Await client feedback on the final layout polish, the Nasalization font integration, and the seamless transition between the Services horizontal scroll and the Portfolio masonry grid.
