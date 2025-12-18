# The Haunted Mansion Mystery - Web Version

A text-based adventure game with a beautiful web UI, originally written in C++, now available in your browser!

## 🎮 How to Play

### Method 1: Simple (Just open in browser)
1. Simply double-click `index.html` to open it in your default browser
2. Or right-click → "Open with" → Choose your browser

### Method 2: Using a Local Web Server (Recommended for best experience)
```bash
# If you have Python installed:
cd web
python -m http.server 8000

# Then open: http://localhost:8000
```

```bash
# If you have Node.js installed:
cd web
npx serve

# Then open the URL shown in terminal
```

## 🎯 Game Features

- **Interactive Story**: Make choices that affect the outcome
- **Inventory System**: Collect and use items to progress
- **Combat Mechanics**: Face a terrifying ghost encounter
- **Puzzles**: Solve mysteries to unlock the final chamber
- **4 Different Endings**:
  - ✨ Good Ending: Banish the evil and save the town
  - 😈 Evil Ending: Join the darkness for power
  - 🏃 Neutral Ending: Escape but leave the mystery unsolved
  - 💀 Bad Ending: Fall to the mansion's evil

## 🗺️ Walkthrough (SPOILERS!)

### Path to Good Ending:
1. Go to **Library** → Take the Ancient Book
2. Read the book to learn about the ritual
3. Go to **Kitchen** → Search cabinet for Holy Water
4. Investigate scratching → Use Holy Water on ghost → Get Silver Key
5. Go to **Bedroom** → Use Silver Key
6. Choose to **Perform the banishment ritual**

### Items Needed:
- 📖 Ancient Book (Library)
- 💧 Holy Water (Kitchen cabinet)
- 🔑 Silver Key (Defeat ghost with Holy Water)

## 🎨 UI Features

- **Health Bar**: Visual health indicator with color changes
- **Inventory System**: Click the inventory button to see collected items
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Beautiful Animations**: Smooth transitions and effects
- **Color-Coded Choices**: Different button colors for different action types

## 📁 Project Structure

```
web/
├── index.html    - Main HTML structure
├── style.css     - Beautiful UI styling
├── game.js       - Game logic (JavaScript version of C++ code)
└── README.md     - This file
```

## 🔄 C++ vs Web Version

Both versions have identical gameplay:
- **C++ Version**: Terminal-based, compiled to `.exe`
- **Web Version**: Browser-based with graphical UI
- Same story, choices, and endings in both versions!

## 🎓 University Project Notes

This project demonstrates:
- Object-Oriented Programming (Player and Game classes)
- State Management (tracking game progress, inventory, health)
- User Interface Design (both console and web)
- Game Design (branching narrative, multiple endings)
- Cross-platform development (C++ and Web)

## 🛠️ Technologies Used

- **HTML5**: Structure
- **CSS3**: Styling with gradients, animations, flexbox
- **JavaScript (ES6+)**: Game logic with classes

No external libraries or frameworks required - pure vanilla JavaScript!

---

Made with ❤️ for a university project
