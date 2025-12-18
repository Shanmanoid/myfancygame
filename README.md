# 🏚️ The Haunted Mansion Mystery

A text-based adventure game available in both **C++ (Desktop)** and **Web** versions. Explore a haunted mansion, solve puzzles, fight ghosts, and uncover dark secrets!

![Game Type](https://img.shields.io/badge/Type-Text%20Adventure-blue)
![Language](https://img.shields.io/badge/C++-17-00599C?logo=cplusplus)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20Linux%20%7C%20Web-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📖 Story

You are a detective investigating mysterious disappearances in the old Blackwood Mansion. As a storm forces you inside, the door slams shut behind you. Now you must uncover the mansion's dark secrets and escape alive!

## ✨ Features

### Game Features
- 🎮 **Multiple Endings** - 4 different endings based on your choices
- 🎒 **Inventory System** - Collect and use items strategically
- ⚔️ **Combat Mechanics** - Face terrifying ghost encounters
- 🧩 **Puzzle Solving** - Find clues and unlock the ritual chamber
- 🗺️ **Exploration** - Multiple rooms with unique events

### Technical Features
- 📱 **Two Versions**: Desktop (C++) and Web (HTML/CSS/JS)
- 🎨 **Beautiful Web UI** with animations and responsive design
- 💾 **OOP Design** with clean, modular code
- 🏗️ **CMake Build System** for easy compilation

## 🎯 Endings

1. **✨ Good Ending (Hero)** - Banish the evil spirit and save the town
2. **😈 Evil Ending (Corrupted)** - Join the darkness for ultimate power
3. **🏃 Neutral Ending (Survivor)** - Escape but leave the mystery unsolved
4. **💀 Bad Ending (Defeat)** - Fall to the mansion's evil forces

## 🚀 Quick Start

### C++ Desktop Version

#### Prerequisites
- C++17 compatible compiler (g++, MSVC, Clang)
- CMake 3.10 or higher (optional, for CMake build)

#### Build & Run

**Using CMake:**
```bash
mkdir build
cd build
cmake ..
cmake --build .

# Windows
.\Debug\MyProject.exe

# Linux/Mac
./MyProject
```

**Direct compilation with g++:**
```bash
g++ -std=c++17 src/main.cpp -o MyProject.exe
./MyProject.exe
```

### Web Version

**No installation needed!** Just open in your browser:

1. Navigate to `web/` folder
2. Double-click `index.html`
3. Or use a local server for best experience:

```bash
# Using Python
cd web
python -m http.server 8000
# Open http://localhost:8000

# Using Node.js
cd web
npx serve
```

## 🗂️ Project Structure

```
MyNewProject/
├── src/
│   ├── main.cpp          # Entry point
│   ├── Game.h            # Game logic and scenes
│   └── Player.h          # Player class with inventory
├── web/
│   ├── index.html        # Web UI structure
│   ├── style.css         # Beautiful styling
│   ├── game.js           # JavaScript game logic
│   └── README.md         # Web version docs
├── build/                # Build output (gitignored)
├── CMakeLists.txt        # CMake configuration
├── CLAUDE.md             # Project instructions
└── README.md             # This file
```

## 🎮 How to Play

### Controls
- **C++ Version**: Type numbers to make choices
- **Web Version**: Click buttons to choose your actions

### Gameplay Tips
1. Explore all rooms to find items
2. Read the Ancient Book in the Library
3. Search the Kitchen for supplies
4. You need specific items to reach the final chamber
5. Your choices determine your fate!

### Walkthrough (SPOILERS!)

<details>
<summary>Click to reveal the path to the Good Ending</summary>

1. Go to **Library** → Take the Ancient Book
2. Read the book to learn about the banishment ritual
3. Go to **Kitchen** → Search the cabinet for Holy Water
4. Investigate the scratching sound → Use Holy Water on the ghost
5. Collect the **Silver Key** dropped by the ghost
6. Go to **Bedroom** → Use the Silver Key on the glowing door
7. Choose to **Perform the banishment ritual**

**Required Items:**
- 📖 Ancient Book (Library)
- 💧 Holy Water (Kitchen)
- 🔑 Silver Key (Defeat ghost)

</details>

## 🎓 Educational Value

This project demonstrates:
- **Object-Oriented Programming** (Classes, encapsulation)
- **Game State Management** (Inventory, health, scenes)
- **Control Flow** (Branching narratives, decision trees)
- **Cross-Platform Development** (C++ and Web)
- **UI/UX Design** (Console and graphical interfaces)
- **Build Systems** (CMake)

Perfect for university projects in:
- Introduction to Programming
- Object-Oriented Design
- Game Development
- Software Engineering

## 🛠️ Technologies Used

### C++ Version
- C++17
- CMake
- Standard Template Library (STL)

### Web Version
- HTML5
- CSS3 (Gradients, Animations, Flexbox)
- Vanilla JavaScript (ES6+)
- No external libraries or frameworks!

## 📸 Screenshots

### Web Version
- Beautiful gradient UI with dark theme
- Animated health bar with color changes
- Interactive inventory panel
- Color-coded choice buttons
- Responsive design for all devices

### C++ Version
- Clean console interface
- Input validation
- Real-time health tracking
- Interactive menu system

## 🤝 Contributing

This is a university project, but suggestions and improvements are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Ideas for Enhancement

- [ ] Save/Load game functionality
- [ ] More rooms and items
- [ ] Sound effects and music
- [ ] Additional endings
- [ ] Difficulty levels
- [ ] Achievement system
- [ ] Compile C++ to WebAssembly for true cross-platform web version

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Yunus Huseynkhanov**
- University Project
- Created with assistance from Claude Code

## 🙏 Acknowledgments

- Inspired by classic text adventure games
- Built as a demonstration of C++ and web development skills
- Thanks to the open-source community

---

⭐ If you enjoyed this game or found it helpful for learning, please star this repository!

🎮 **Have fun exploring the Haunted Mansion!** 👻
