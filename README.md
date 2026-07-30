# Battleship

A classic two-player strategy game built with vanilla JavaScript, HTML5, and CSS3, bundled using Webpack. Play against a smart AI in single-player mode or challenge a friend locally in two-player mode!

---

## Overview & Features

- **Single-Player Mode**: Play against an AI player equipped with smart adjacent-targeting logic upon landing a hit.
- **Two-Player Mode**: Play locally against a friend with clean turn transitions and a 5-second turn buffer screen to prevent screen-sniping.
- **Interactive Ship Placement**: Interactive grid placement supporting horizontal and vertical orientations.
- **Responsive Layout**: Built with CSS Grid (`auto-fit`) and Flexbox, allowing the game boards to adjust and stack seamlessly on smaller screens and mobile viewports.
- **Dynamic DOM Rendering**: UI dynamically updates hit/miss stats, ship statuses, turn information, and game results.

---

## Built With

* **JavaScript (ES6+)** - Modular OOP architecture, async/await flow control, and dynamic DOM manipulation.
* **HTML5 & CSS3** - Modern layout techniques using CSS Grid and Flexbox.
* **Webpack** - Asset bundling and build tooling.

---

## Project Structure

```text
├── dist/                   # Production build outputs
├── src/
│   ├── GameBoard.js        # GameBoard class: grid matrix, attack management, ship placement
│   ├── gameDOM.js          # DOM rendering: board creation, metrics, end screen UI
│   ├── index.html          # Main HTML structure
│   ├── index.js            # Main entry point & game loops (single/two-player, event listeners)
│   ├── placeShipDOM.js     # Ship placement UI handlers
│   ├── Player.js           # Player class & AI bot attack/placement logic
│   ├── Ship.js             # Ship factory/class (length, hits, sunk status)
│   └── styles.css          # Global styling, responsive grid layouts
├── package.json
└── webpack.config.js