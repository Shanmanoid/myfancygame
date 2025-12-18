// All achievements in the game
const ALL_ACHIEVEMENTS = [
    { id: 'Armed and Ready', icon: '⚔️', description: 'Find the Rusty Sword' },
    { id: 'Explorer', icon: '🗺️', description: 'Find the Basement Key' },
    { id: 'Master Explorer', icon: '🌟', description: 'Visit all 5+ rooms' },
    { id: 'Healer', icon: '💊', description: 'Use a Health Potion' },
    { id: 'Hero of the Town', icon: '🏆', description: 'Get the good ending' },
    { id: 'Flawless Victory', icon: '💯', description: 'Win with full health' },
    { id: 'Survivor', icon: '🛡️', description: 'Complete the game' }
];

// Language translations
const translations = {
    en: {
        title: "The Haunted Mansion Mystery",
        health: "Health:",
        inventory: "Inventory",
        achievements: "Achievements",
        yourInventory: "Your Inventory",
        itemCount: "items",
        emptyInventory: "Your inventory is empty",
        gameSaved: "Game Saved! 💾",
        saveDeleted: "Save Deleted! 🗑️",
        achievementUnlocked: "Achievement Unlocked!",
        playAgain: "🔄 Play Again",
        tryAgain: "🔄 Try Again",

        // Endings
        goodEndingTitle: "✨ GOOD ENDING: Hero",
        goodEndingText: "The town is safe. The disappearances will stop. You are hailed as a hero!",
        goodEndingFinal: "🏆 THE END - You saved the town!",

        evilEndingTitle: "⚫ DARK ENDING: Corrupted",
        evilEndingText: "You have become the new master of the Haunted Mansion. The disappearances will continue...",
        evilEndingFinal: "😈 THE END - You joined the darkness",

        neutralEndingTitle: "🚪 NEUTRAL ENDING: Survivor",
        neutralEndingText: "Others may not be so lucky to escape...",
        neutralEndingFinal: "🏃 THE END - You escaped with your life",

        badEndingTitle: "💀 BAD ENDING: Defeat",
        badEndingFinal: "💀 GAME OVER",

        // UI
        statistics: "Your Statistics",
        gamesPlayed: "Games Played",
        goodEndings: "Good Endings",
        evilEndings: "Evil Endings",
        neutralEndings: "Neutral Endings",
        badEndings: "Bad Endings",
        bestHealth: "Best Health Score",
        totalAchievements: "Total Achievements Unlocked",

        // Difficulty
        selectDifficulty: "Select Difficulty",
        easy: "Easy",
        easyDesc: "More health, less damage - Perfect for beginners",
        normal: "Normal",
        normalDesc: "Balanced experience - Standard gameplay",
        hard: "Hard",
        hardDesc: "Less health, more damage - For experienced players",
        difficulty: "Difficulty",
    },
    ru: {
        title: "Тайна Проклятого Особняка",
        health: "Здоровье:",
        inventory: "Инвентарь",
        achievements: "Достижения",
        yourInventory: "Ваш инвентарь",
        itemCount: "предметов",
        emptyInventory: "Ваш инвентарь пуст",
        gameSaved: "Игра сохранена! 💾",
        saveDeleted: "Сохранение удалено! 🗑️",
        achievementUnlocked: "Достижение получено!",
        playAgain: "🔄 Играть снова",
        tryAgain: "🔄 Попробовать снова",

        // Endings
        goodEndingTitle: "✨ ХОРОШАЯ КОНЦОВКА: Герой",
        goodEndingText: "Город в безопасности. Исчезновения прекратятся. Вас превозносят как героя!",
        goodEndingFinal: "🏆 КОНЕЦ - Вы спасли город!",

        evilEndingTitle: "⚫ ТЁМНАЯ КОНЦОВКА: Развращённый",
        evilEndingText: "Вы стали новым хозяином Проклятого особняка. Исчезновения продолжатся...",
        evilEndingFinal: "😈 КОНЕЦ - Вы присоединились к тьме",

        neutralEndingTitle: "🚪 НЕЙТРАЛЬНАЯ КОНЦОВКА: Выживший",
        neutralEndingText: "Другим может не так повезти сбежать...",
        neutralEndingFinal: "🏃 КОНЕЦ - Вы сбежали живым",

        badEndingTitle: "💀 ПЛОХАЯ КОНЦОВКА: Поражение",
        badEndingFinal: "💀 ИГРА ОКОНЧЕНА",

        // UI
        statistics: "Ваша статистика",
        gamesPlayed: "Игр сыграно",
        goodEndings: "Хорошие концовки",
        evilEndings: "Злые концовки",
        neutralEndings: "Нейтральные концовки",
        badEndings: "Плохие концовки",
        bestHealth: "Лучший результат здоровья",
        totalAchievements: "Всего достижений разблокировано",

        // Difficulty
        selectDifficulty: "Выберите сложность",
        easy: "Легко",
        easyDesc: "Больше здоровья, меньше урона - Для новичков",
        normal: "Нормально",
        normalDesc: "Сбалансированный опыт - Стандартная игра",
        hard: "Сложно",
        hardDesc: "Меньше здоровья, больше урона - Для опытных игроков",
        difficulty: "Сложность",
    }
};

// Audio Manager
class AudioManager {
    constructor() {
        this.enabled = true;
        this.musicVolume = 0.3;
        this.sfxVolume = 0.5;
        this.currentMusic = null;
        this.audioElement = null;
    }

    playMusic(musicName) {
        if (!this.enabled) return;

        // Stop current music if playing
        this.stopMusic();

        // Create new audio element
        this.audioElement = new Audio();

        // Set the music file path
        if (musicName === 'ambient') {
            this.audioElement.src = 'audio/ambient.mp3';
        }

        // Configure audio
        this.audioElement.volume = this.musicVolume;
        this.audioElement.loop = true;

        // Play the music
        this.audioElement.play().catch(err => {
            console.log('Music playback failed:', err);
            // Fallback to generated sound if file doesn't exist
            this.playGeneratedMusic();
        });

        this.currentMusic = { playing: true };
    }

    playGeneratedMusic() {
        // Fallback: Generate simple ambient music if audio file is missing
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const osc1 = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const osc3 = audioContext.createOscillator();

        const gain1 = audioContext.createGain();
        const gain2 = audioContext.createGain();
        const gain3 = audioContext.createGain();
        const masterGain = audioContext.createGain();

        // Low drone
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(110, audioContext.currentTime);
        gain1.gain.setValueAtTime(this.musicVolume * 0.03, audioContext.currentTime);

        // Mid harmonic
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(165, audioContext.currentTime);
        gain2.gain.setValueAtTime(this.musicVolume * 0.02, audioContext.currentTime);

        // High whisper
        osc3.type = 'sine';
        osc3.frequency.setValueAtTime(220, audioContext.currentTime);
        gain3.gain.setValueAtTime(this.musicVolume * 0.015, audioContext.currentTime);

        // Fade in
        masterGain.gain.setValueAtTime(0, audioContext.currentTime);
        masterGain.gain.linearRampToValueAtTime(1, audioContext.currentTime + 2);

        osc1.connect(gain1);
        osc2.connect(gain2);
        osc3.connect(gain3);
        gain1.connect(masterGain);
        gain2.connect(masterGain);
        gain3.connect(masterGain);
        masterGain.connect(audioContext.destination);

        osc1.start();
        osc2.start();
        osc3.start();

        this.currentMusic = {
            oscillators: [osc1, osc2, osc3],
            context: audioContext,
            playing: true
        };
    }

    stopMusic() {
        // Stop HTML5 audio
        if (this.audioElement) {
            this.audioElement.pause();
            this.audioElement.currentTime = 0;
            this.audioElement = null;
        }

        // Stop generated audio
        if (this.currentMusic && this.currentMusic.oscillators) {
            this.currentMusic.oscillators.forEach(osc => {
                try { osc.stop(); } catch(e) {}
            });
        }

        if (this.currentMusic) {
            this.currentMusic.playing = false;
            this.currentMusic = null;
        }
    }

    playSFX(soundName) {
        if (!this.enabled) return;

        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        // Much softer volume and smoother fade
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.sfxVolume * 0.05, ctx.currentTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

        switch(soundName) {
            case 'click':
                oscillator.frequency.setValueAtTime(600, ctx.currentTime);
                oscillator.type = 'sine';
                break;
            case 'item':
                oscillator.frequency.setValueAtTime(800, ctx.currentTime);
                oscillator.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.1);
                oscillator.type = 'sine';
                break;
            case 'damage':
                oscillator.frequency.setValueAtTime(150, ctx.currentTime);
                oscillator.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.2);
                oscillator.type = 'sine';
                break;
            case 'heal':
                oscillator.frequency.setValueAtTime(400, ctx.currentTime);
                oscillator.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.15);
                oscillator.type = 'sine';
                break;
            case 'achievement':
                oscillator.frequency.setValueAtTime(800, ctx.currentTime);
                oscillator.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.1);
                oscillator.type = 'sine';
                break;
            case 'ghost':
                oscillator.frequency.setValueAtTime(200, ctx.currentTime);
                oscillator.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.3);
                oscillator.type = 'sine';
                break;
            case 'door':
                oscillator.frequency.setValueAtTime(300, ctx.currentTime);
                oscillator.frequency.linearRampToValueAtTime(250, ctx.currentTime + 0.15);
                oscillator.type = 'sine';
                break;
        }

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.4);
    }

    toggle() {
        this.enabled = !this.enabled;
        if (!this.enabled) {
            this.stopMusic();
        } else {
            // If game has started, resume music
            if (window.game && !window.game.gameOver) {
                this.playMusic('ambient');
            }
        }
        return this.enabled;
    }

    setMusicVolume(volume) {
        this.musicVolume = volume;
        // Update current playing music volume
        if (this.audioElement) {
            this.audioElement.volume = volume;
        }
    }

    setSFXVolume(volume) {
        this.sfxVolume = volume;
    }
}

class Player {
    constructor(difficulty = 'normal') {
        // Difficulty modifiers
        const difficultySettings = {
            easy: { health: 150, damageMultiplier: 0.7 },
            normal: { health: 100, damageMultiplier: 1.0 },
            hard: { health: 75, damageMultiplier: 1.5 }
        };

        const settings = difficultySettings[difficulty];
        this.difficulty = difficulty;
        this.health = settings.health;
        this.maxHealth = settings.health;
        this.damageMultiplier = settings.damageMultiplier;
        this.inventory = [];
        this.visitedRooms = new Set();
        this.achievements = new Set();
    }

    takeDamage(amount) {
        const actualDamage = Math.round(amount * this.damageMultiplier);
        this.health -= actualDamage;
        if (this.health < 0) this.health = 0;
        this.updateHealthBar();

        // Play damage sound
        if (window.game && window.game.audio) {
            window.game.audio.playSFX('damage');
        }

        // Flash effect
        document.querySelector('.story-text').classList.add('damage-flash');
        setTimeout(() => {
            document.querySelector('.story-text').classList.remove('damage-flash');
        }, 500);
    }

    heal(amount) {
        this.health += amount;
        if (this.health > this.maxHealth) this.health = this.maxHealth;
        this.updateHealthBar();

        // Play heal sound
        if (window.game && window.game.audio) {
            window.game.audio.playSFX('heal');
        }
    }

    isAlive() {
        return this.health > 0;
    }

    addItem(item) {
        this.inventory.push(item);
        this.updateInventoryDisplay();

        // Play item pickup sound
        if (window.game && window.game.audio) {
            window.game.audio.playSFX('item');
        }
    }

    hasItem(item) {
        return this.inventory.includes(item);
    }

    removeItem(item) {
        const index = this.inventory.indexOf(item);
        if (index > -1) {
            this.inventory.splice(index, 1);
            this.updateInventoryDisplay();
        }
    }

    updateHealthBar() {
        const healthBar = document.getElementById('healthBar');
        const healthText = document.getElementById('healthText');
        const percentage = (this.health / this.maxHealth) * 100;

        healthBar.style.width = percentage + '%';
        healthText.textContent = `${this.health}/${this.maxHealth}`;

        // Change color based on health
        healthBar.className = 'health-fill';
        if (percentage > 60) {
            healthBar.classList.add('healthy');
        } else if (percentage > 30) {
            healthBar.classList.add('warning');
        }
    }

    updateInventoryDisplay() {
        const itemCount = document.getElementById('itemCount');
        const inventoryItems = document.getElementById('inventoryItems');

        itemCount.textContent = this.inventory.length;

        if (this.inventory.length === 0) {
            const emptyText = window.game ? window.game.t('emptyInventory') : 'Your inventory is empty';
            inventoryItems.innerHTML = `<p class="empty-inventory">${emptyText}</p>`;
        } else {
            inventoryItems.innerHTML = this.inventory.map((item, index) => {
                const isUsable = item === 'Health Potion';
                const useText = window.game && window.game.language === 'ru' ? 'Использовать' : 'Use';
                return `
                    <div class="item ${isUsable ? 'usable' : ''}">
                        <div class="item-name">${this.getItemIcon(item)} ${item}</div>
                        ${isUsable ? `<button class="use-btn" onclick="game.useItem('${item}', ${index})">${useText}</button>` : ''}
                    </div>
                `;
            }).join('');
        }
    }

    useItem(itemName, index) {
        if (itemName === 'Health Potion') {
            if (this.health >= this.maxHealth) {
                alert('Your health is already full!');
                return;
            }
            this.heal(50);
            this.inventory.splice(index, 1);
            this.updateInventoryDisplay();
            this.unlockAchievement('Healer');
            alert('You used the Health Potion and restored 50 HP!');
        }
    }

    getItemIcon(item) {
        const icons = {
            'Ancient Book': '📖',
            'Holy Water': '💧',
            'Silver Key': '🔑',
            'Health Potion': '🧪',
            'Rusty Sword': '⚔️',
            'Basement Key': '🗝️'
        };
        return icons[item] || '📦';
    }

    visitRoom(roomName) {
        this.visitedRooms.add(roomName);
    }

    unlockAchievement(achievement) {
        if (!this.achievements.has(achievement)) {
            this.achievements.add(achievement);
            this.showAchievementNotification(achievement);

            // Play achievement sound
            if (window.game && window.game.audio) {
                window.game.audio.playSFX('achievement');
            }
        }
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <span class="achievement-icon">🏆</span>
                <div>
                    <div class="achievement-title">Achievement Unlocked!</div>
                    <div class="achievement-name">${achievement}</div>
                </div>
            </div>
        `;
        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

class Game {
    constructor() {
        this.difficulty = localStorage.getItem('gameDifficulty') || 'normal';
        this.player = new Player(this.difficulty);
        this.gameOver = false;
        this.currentRoom = 'entrance';
        this.audio = new AudioManager();
        this.stats = this.loadStats();
        this.language = localStorage.getItem('gameLanguage') || 'en';

        // Load saved volume
        const savedVolume = localStorage.getItem('musicVolume') || '30';
        this.audio.setMusicVolume(parseInt(savedVolume) / 100);
        document.getElementById('volumeSlider').value = savedVolume;
        document.getElementById('volumeValue').textContent = savedVolume + '%';

        // Setup inventory button
        document.getElementById('inventoryBtn').addEventListener('click', () => {
            this.toggleInventory();
        });

        // Load saved game if exists
        this.loadGame();
    }

    loadStats() {
        const savedStats = localStorage.getItem('hauntedMansionStats');
        if (savedStats) {
            return JSON.parse(savedStats);
        }
        return {
            gamesPlayed: 0,
            goodEndings: 0,
            evilEndings: 0,
            neutralEndings: 0,
            badEndings: 0,
            totalAchievements: 0,
            bestHealthScore: 0
        };
    }

    saveStats() {
        localStorage.setItem('hauntedMansionStats', JSON.stringify(this.stats));
    }

    t(key) {
        return translations[this.language][key] || translations['en'][key] || key;
    }

    toggleLanguage() {
        this.language = this.language === 'en' ? 'ru' : 'en';
        localStorage.setItem('gameLanguage', this.language);
        this.updateUILanguage();
        return this.language;
    }

    updateUILanguage() {
        // Update header
        document.querySelector('h1').textContent = `🏚️ ${this.t('title')}`;
        const healthLabel = document.querySelector('.label');
        if (healthLabel) healthLabel.textContent = this.t('health');

        // Update inventory button
        const inventoryBtn = document.getElementById('inventoryBtn');
        if (inventoryBtn) {
            inventoryBtn.innerHTML = `🎒 ${this.t('inventory')} (<span id="itemCount">${this.player.inventory.length}</span>)`;
        }

        // Update achievements button
        const achievementsBtn = document.querySelector('.inventory-btn[onclick*="toggleAchievements"]');
        if (achievementsBtn) {
            const count = achievementsBtn.querySelector('#achievementsCount');
            const countText = count ? count.textContent : '0/7';
            achievementsBtn.innerHTML = `🏆 ${this.t('achievements')} (<span id="achievementsCount">${countText}</span>)`;
        }

        // Update inventory panel header
        const inventoryHeader = document.querySelector('#inventoryPanel .inventory-header h3');
        if (inventoryHeader) {
            inventoryHeader.textContent = `🎒 ${this.t('yourInventory')}`;
        }

        // Update achievements panel header
        const achievementsHeader = document.querySelector('#achievementsPanel .inventory-header h3');
        if (achievementsHeader) {
            achievementsHeader.textContent = `🏆 ${this.t('achievements')}`;
        }

        // Update empty inventory text
        this.player.updateInventoryDisplay();
    }

    updateVolume(value) {
        const volume = value / 100;
        this.audio.setMusicVolume(volume);
        document.getElementById('volumeValue').textContent = value + '%';

        // Save volume preference
        localStorage.setItem('musicVolume', value);
    }

    saveGame() {
        const saveData = {
            health: this.player.health,
            inventory: this.player.inventory,
            visitedRooms: Array.from(this.player.visitedRooms),
            achievements: Array.from(this.player.achievements),
            currentRoom: this.currentRoom,
            gameOver: this.gameOver,
            difficulty: this.difficulty
        };
        localStorage.setItem('hauntedMansionSave', JSON.stringify(saveData));
        this.showNotification(this.t('gameSaved'));
    }

    loadGame() {
        const savedData = localStorage.getItem('hauntedMansionSave');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);

                // Load difficulty if saved, otherwise use current
                if (data.difficulty) {
                    this.difficulty = data.difficulty;
                    this.player = new Player(data.difficulty);
                }

                this.player.health = data.health;
                this.player.inventory = data.inventory || [];
                this.player.visitedRooms = new Set(data.visitedRooms || []);
                this.player.achievements = new Set(data.achievements || []);
                this.currentRoom = data.currentRoom || 'entrance';
                this.gameOver = data.gameOver || false;
                this.player.updateHealthBar();
                this.player.updateInventoryDisplay();
            } catch (e) {
                console.error('Failed to load save:', e);
            }
        }
    }

    deleteSave() {
        localStorage.removeItem('hauntedMansionSave');
        this.showNotification(this.t('saveDeleted'));
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'save-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    toggleInventory() {
        const panel = document.getElementById('inventoryPanel');
        panel.classList.toggle('active');
    }

    toggleAchievements() {
        const panel = document.getElementById('achievementsPanel');
        panel.classList.toggle('active');
        this.updateAchievementsDisplay();
    }

    updateAchievementsDisplay() {
        const achievementsContainer = document.getElementById('achievementsList');

        achievementsContainer.innerHTML = ALL_ACHIEVEMENTS.map(achievement => {
            const isUnlocked = this.player.achievements.has(achievement.id);
            return `
                <div class="achievement-item ${isUnlocked ? 'unlocked' : 'locked'}">
                    <div class="achievement-icon-large">${isUnlocked ? achievement.icon : '🔒'}</div>
                    <div class="achievement-details">
                        <div class="achievement-name">${isUnlocked ? achievement.id : '???'}</div>
                        <div class="achievement-desc">${isUnlocked ? achievement.description : 'Hidden achievement'}</div>
                    </div>
                    ${isUnlocked ? '<div class="achievement-checkmark">✓</div>' : ''}
                </div>
            `;
        }).join('');

        // Update counter
        const unlockedCount = this.player.achievements.size;
        const totalCount = ALL_ACHIEVEMENTS.length;
        document.getElementById('achievementsCount').textContent = `${unlockedCount}/${totalCount}`;
    }

    showScene(title, text, choices) {
        const storyText = document.getElementById('storyText');
        const choicesDiv = document.getElementById('choices');

        storyText.innerHTML = `
            <h2>${title}</h2>
            ${text}
        `;

        choicesDiv.innerHTML = choices.map(choice =>
            `<button class="choice-btn ${choice.class || ''}" onclick="${choice.action}">${choice.text}</button>`
        ).join('');

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    start() {
        this.showDifficultySelection();
    }

    showDifficultySelection() {
        this.showScene(
            this.t('selectDifficulty'),
            `
                <p>Choose your preferred difficulty level. This will affect your starting health and damage taken.</p>
            `,
            [
                {
                    text: `🟢 ${this.t('easy')} - ${this.t('easyDesc')}`,
                    action: 'game.startWithDifficulty("easy")',
                    class: 'success'
                },
                {
                    text: `🟡 ${this.t('normal')} - ${this.t('normalDesc')}`,
                    action: 'game.startWithDifficulty("normal")'
                },
                {
                    text: `🔴 ${this.t('hard')} - ${this.t('hardDesc')}`,
                    action: 'game.startWithDifficulty("hard")',
                    class: 'danger'
                }
            ]
        );
    }

    startWithDifficulty(difficulty) {
        this.difficulty = difficulty;
        localStorage.setItem('gameDifficulty', difficulty);
        this.player = new Player(difficulty);
        this.gameOver = false;
        this.player.updateHealthBar();
        this.player.updateInventoryDisplay();

        // Start ambient music (this IS a user interaction - button click)
        if (this.audio.enabled) {
            this.audio.playMusic('ambient');
        }

        this.entranceHall();
    }

    entranceHall() {
        this.currentRoom = 'entrance';
        this.player.visitRoom('Entrance Hall');
        this.audio.playSFX('door');
        this.saveGame();

        const choices = [
            { text: '🚪 Go to the Library (left door)', action: 'game.library()' },
            { text: '🚪 Go to the Kitchen (right door)', action: 'game.kitchen()' },
            { text: '🚪 Go upstairs to the Bedroom', action: 'game.bedroom()' },
            { text: '🚪 Go down to the Basement', action: 'game.basement()' },
            { text: '🚪 Go upstairs to the Attic', action: 'game.attic()' }
        ];

        this.showScene(
            'Entrance Hall',
            `
                <p>You find yourself in a dusty entrance hall. Moonlight filters through broken windows.</p>
                <p>You see multiple doors and passages before you...</p>
                <p class="objective">Where will you go?</p>
            `,
            choices
        );
    }

    library() {
        if (!this.player.hasItem('Ancient Book')) {
            this.showScene(
                'Library',
                `
                    <p>The library is filled with ancient books and scrolls covered in dust.</p>
                    <p>You notice a peculiar book glowing faintly on the shelf. Strange symbols emanate from its cover...</p>
                `,
                [
                    { text: '📖 Take the Ancient Book', action: 'game.takeBook()', class: 'success' },
                    { text: '👁️ Read the book here', action: 'game.readBook()' },
                    { text: '← Return to Entrance Hall', action: 'game.entranceHall()' }
                ]
            );
        } else {
            this.showScene(
                'Library',
                `
                    <p>The library is quiet now. You've already taken the ancient book.</p>
                    <p>Nothing else here seems useful.</p>
                `,
                [
                    { text: '← Return to Entrance Hall', action: 'game.entranceHall()' }
                ]
            );
        }
    }

    takeBook() {
        this.player.addItem('Ancient Book');
        this.showScene(
            'Library',
            `
                <p>You take the Ancient Book. It feels warm to the touch, as if it's alive.</p>
                <p>Opening it reveals strange symbols and diagrams. This could be important...</p>
            `,
            [
                { text: 'Continue exploring the Library', action: 'game.library()' }
            ]
        );
    }

    readBook() {
        this.showScene(
            'Library',
            `
                <p>You carefully read through the ancient pages...</p>
                <p style="color: #ffcc00; font-weight: bold;">The book contains a ritual to banish evil spirits!</p>
                <p>According to the text, you'll need:</p>
                <ul style="margin-left: 20px; line-height: 2;">
                    <li>✦ A Silver Key (to unlock the ritual chamber)</li>
                    <li>✦ Holy Water (to purify the area)</li>
                    <li>✦ This Ancient Book (for the incantation)</li>
                </ul>
            `,
            [
                { text: 'Continue exploring the Library', action: 'game.library()' }
            ]
        );
    }

    kitchen() {
        this.showScene(
            'Kitchen',
            `
                <p>The kitchen is dark and smells of decay. Rusty utensils hang from hooks on the walls.</p>
                <p>You see an old cabinet in the corner. You also hear strange scratching sounds coming from the shadows...</p>
            `,
            this.player.hasItem('Holy Water') ? [
                { text: '🔍 Investigate the scratching sound', action: 'game.ghostEncounter()', class: 'danger' },
                { text: '← Return to Entrance Hall', action: 'game.entranceHall()' }
            ] : [
                { text: '🗄️ Search the cabinet', action: 'game.searchCabinet()', class: 'success' },
                { text: '🔍 Investigate the scratching sound', action: 'game.ghostEncounter()', class: 'danger' },
                { text: '← Return to Entrance Hall', action: 'game.entranceHall()' }
            ]
        );
    }

    searchCabinet() {
        this.player.addItem('Holy Water');
        this.showScene(
            'Kitchen',
            `
                <p>You open the dusty cabinet and find a bottle of Holy Water!</p>
                <p>The label reads: "Blessed by the Blackwood Church - Use against evil spirits"</p>
                <p style="color: #44ff44;">✓ Holy Water added to inventory</p>
            `,
            [
                { text: 'Continue exploring the Kitchen', action: 'game.kitchen()' }
            ]
        );
    }

    ghostEncounter() {
        this.audio.playSFX('ghost');

        if (this.player.hasItem('Holy Water')) {
            this.showScene(
                '👻 Ghost Encounter!',
                `
                    <p style="color: #ff4444; font-weight: bold;">A terrifying ghost materializes from the shadows!</p>
                    <p>Its hollow eyes lock onto you. The temperature drops instantly. It lunges forward!</p>
                    <p>You have Holy Water - you could use it, or try something else...</p>
                `,
                [
                    { text: '💧 Use Holy Water', action: 'game.useHolyWater()', class: 'success' },
                    { text: '🏃 Run away!', action: 'game.runFromGhost()' },
                    { text: '👊 Try to fight it', action: 'game.fightGhost()', class: 'danger' }
                ]
            );
        } else {
            this.showScene(
                '👻 Ghost Encounter!',
                `
                    <p style="color: #ff4444; font-weight: bold;">A terrifying ghost appears from the darkness!</p>
                    <p>You have nothing to defend yourself with!</p>
                    <p>The ghost attacks you! <strong style="color: #ff4444;">-25 HP</strong></p>
                `,
                [
                    { text: 'Escape back to Entrance Hall', action: 'game.escapeFromGhost()' }
                ]
            );
            this.player.takeDamage(25);
            if (!this.player.isAlive()) {
                setTimeout(() => this.badEnding('You were defeated by the ghost...'), 1000);
            }
        }
    }

    useHolyWater() {
        this.player.removeItem('Holy Water');
        this.player.addItem('Silver Key');
        this.showScene(
            'Victory!',
            `
                <p>You throw the Holy Water at the ghost!</p>
                <p style="color: #44ff44; font-weight: bold;">The ghost shrieks in agony and begins to dissolve!</p>
                <p>As it vanishes, something metallic clatters to the floor...</p>
                <p style="color: #ffcc00;">✓ You found a Silver Key!</p>
            `,
            [
                { text: 'Continue exploring the Kitchen', action: 'game.kitchen()' }
            ]
        );
    }

    runFromGhost() {
        this.player.takeDamage(15);
        this.showScene(
            'Escape!',
            `
                <p>You run as fast as you can!</p>
                <p>The ghost scratches your back as you flee! <strong style="color: #ff4444;">-15 HP</strong></p>
                <p>You make it back to the entrance hall, breathing heavily...</p>
            `,
            [
                { text: 'Catch your breath', action: 'game.entranceHall()' }
            ]
        );
    }

    fightGhost() {
        this.player.takeDamage(30);
        if (!this.player.isAlive()) {
            this.badEnding('You tried to fight the ghost with your bare hands. It was a fatal mistake...');
        } else {
            this.showScene(
                'Failed Attack!',
                `
                    <p>Your fists pass harmlessly through the ghost's ethereal form!</p>
                    <p style="color: #ff4444; font-weight: bold;">The ghost counterattacks viciously! -30 HP</strong></p>
                    <p>You barely escape with your life, stumbling back to the entrance hall...</p>
                `,
                [
                    { text: 'Recover in the Entrance Hall', action: 'game.entranceHall()' }
                ]
            );
        }
    }

    escapeFromGhost() {
        this.entranceHall();
    }

    bedroom() {
        const hasKey = this.player.hasItem('Silver Key');
        const hasBook = this.player.hasItem('Ancient Book');

        if (hasKey && hasBook) {
            this.showScene(
                'Master Bedroom',
                `
                    <p>You enter a lavish but decayed bedroom. Dust covers everything.</p>
                    <p>At the far end, there's a door that glows with an eerie, pulsing light.</p>
                    <p style="color: #ffcc00; font-weight: bold;">You have both the Silver Key and the Ancient Book!</p>
                    <p>You can sense powerful magic beyond this door...</p>
                `,
                [
                    { text: '🔑 Use the Silver Key on the glowing door', action: 'game.finalChoice()', class: 'success' },
                    { text: '← Return to Entrance Hall', action: 'game.entranceHall()' }
                ]
            );
        } else {
            let missingItems = [];
            if (!hasKey) missingItems.push('Silver Key');
            if (!hasBook) missingItems.push('Ancient Book');

            this.showScene(
                'Master Bedroom',
                `
                    <p>You enter a lavish but decayed bedroom.</p>
                    <p>There's a door at the far end that glows with an eerie light, but it's locked with a mystical seal.</p>
                    <p style="color: #ff4444;">You're missing: ${missingItems.join(', ')}</p>
                    <p>You need to explore more...</p>
                `,
                [
                    { text: '← Return to Entrance Hall', action: 'game.entranceHall()' }
                ]
            );
        }
    }

    basement() {
        this.currentRoom = 'basement';
        this.player.visitRoom('Basement');
        this.saveGame();

        if (!this.player.hasItem('Rusty Sword')) {
            this.showScene(
                '🕯️ Basement',
                `
                    <p>You descend creaky wooden stairs into a damp, dark basement.</p>
                    <p>The smell of mold fills your nostrils. Water drips from the ceiling.</p>
                    <p>In the corner, you spot an old weapon rack with a rusty sword!</p>
                    <p>There's also a dusty crate in the corner...</p>
                `,
                [
                    { text: '⚔️ Take the Rusty Sword', action: 'game.takeRustySword()', class: 'success' },
                    { text: '📦 Search the crate', action: 'game.searchCrate()' },
                    { text: '← Return to Entrance Hall', action: 'game.entranceHall()' }
                ]
            );
        } else if (!this.player.hasItem('Health Potion')) {
            this.showScene(
                '🕯️ Basement',
                `
                    <p>The dark basement feels less threatening now that you have a weapon.</p>
                    <p>The crate in the corner still remains unopened...</p>
                `,
                [
                    { text: '📦 Search the crate', action: 'game.searchCrate()' },
                    { text: '← Return to Entrance Hall', action: 'game.entranceHall()' }
                ]
            );
        } else {
            this.showScene(
                '🕯️ Basement',
                `
                    <p>The basement is empty now. Nothing else of value remains.</p>
                `,
                [
                    { text: '← Return to Entrance Hall', action: 'game.entranceHall()' }
                ]
            );
        }
    }

    takeRustySword() {
        this.player.addItem('Rusty Sword');
        this.player.unlockAchievement('Armed and Ready');
        this.showScene(
            '🕯️ Basement',
            `
                <p>You take the rusty sword. It's old but still sharp!</p>
                <p style="color: #44ff44;">✓ Rusty Sword added to inventory</p>
                <p>You feel more confident now that you have a weapon.</p>
            `,
            [
                { text: 'Continue exploring the Basement', action: 'game.basement()' }
            ]
        );
    }

    searchCrate() {
        this.player.addItem('Health Potion');
        this.showScene(
            '🕯️ Basement',
            `
                <p>You pry open the old crate. Inside, you find a glowing red potion!</p>
                <p style="color: #44ff44;">✓ Health Potion added to inventory</p>
                <p>This could restore your health when you need it most.</p>
            `,
            [
                { text: 'Continue exploring the Basement', action: 'game.basement()' }
            ]
        );
    }

    attic() {
        this.currentRoom = 'attic';
        this.player.visitRoom('Attic');
        this.saveGame();

        if (!this.player.hasItem('Basement Key')) {
            this.showScene(
                '🏚️ Attic',
                `
                    <p>You climb up to the dusty attic. Cobwebs hang everywhere.</p>
                    <p>Old furniture and forgotten memories fill this space.</p>
                    <p>You find an old journal on a desk. Reading it reveals:</p>
                    <p style="color: #ffcc00; font-style: italic;">"The darkness came from below... the basement holds secrets..."</p>
                    <p>You also notice a small key hanging on the wall.</p>
                `,
                [
                    { text: '🗝️ Take the Basement Key', action: 'game.takeBasementKey()', class: 'success' },
                    { text: '← Return to Entrance Hall', action: 'game.entranceHall()' }
                ]
            );
        } else {
            this.showScene(
                '🏚️ Attic',
                `
                    <p>The attic is quiet. The journal sits on the desk, but you've already read it.</p>
                    <p>Nothing else here seems useful.</p>
                `,
                [
                    { text: '← Return to Entrance Hall', action: 'game.entranceHall()' }
                ]
            );
        }
    }

    takeBasementKey() {
        this.player.addItem('Basement Key');
        this.player.unlockAchievement('Explorer');
        this.showScene(
            '🏚️ Attic',
            `
                <p>You take the basement key. It's old and covered in rust.</p>
                <p style="color: #44ff44;">✓ Basement Key added to inventory</p>
                <p>This might unlock something important...</p>
            `,
            [
                { text: 'Continue exploring the Attic', action: 'game.attic()' }
            ]
        );
    }

    finalChoice() {
        // Check if player visited all rooms
        if (this.player.visitedRooms.size >= 5) {
            this.player.unlockAchievement('Master Explorer');
        }

        this.showScene(
            '⚡ The Ritual Chamber',
            `
                <p>The Silver Key turns in the lock. The door swings open...</p>
                <p>Inside, you find a dark ritual chamber lit by ethereal blue flames.</p>
                <p>In the center, a powerful dark spirit is bound in chains of pure light.</p>
                <p style="color: #ff4444; font-style: italic;">"Free me, mortal, and I shall grant you power beyond your wildest imagination..."</p>
                <p>You remember the banishment ritual from the Ancient Book.</p>
                <p class="objective">This is it. Your choice will determine everything.</p>
            `,
            [
                { text: '✨ Perform the banishment ritual (Destroy the spirit)', action: 'game.goodEnding()', class: 'success' },
                { text: '🔓 Free the spirit (Accept its offer)', action: 'game.evilEnding()', class: 'danger' },
                { text: '🏃 Run away and escape the mansion', action: 'game.escapeEnding()' }
            ]
        );
    }

    goodEnding() {
        this.gameOver = true;
        this.player.unlockAchievement('Hero of the Town');
        if (this.player.health === 100) {
            this.player.unlockAchievement('Flawless Victory');
        }

        // Update stats
        this.stats.gamesPlayed++;
        this.stats.goodEndings++;
        this.stats.totalAchievements = Math.max(this.stats.totalAchievements, this.player.achievements.size);
        this.stats.bestHealthScore = Math.max(this.stats.bestHealthScore, this.player.health);
        this.saveStats();
        this.deleteSave();

        this.showScene(
            this.t('goodEndingTitle'),
            `
                <div class="ending good">
                    <p>You open the Ancient Book and begin reciting the sacred words...</p>
                    <p>Brilliant light fills the chamber as the dark spirit screams in fury!</p>
                    <p>"NO! You cannot do this! I am eternal!"</p>
                    <p style="color: #44ff44; font-weight: bold;">But the light grows stronger. The spirit dissolves into nothingness.</p>
                    <p>The mansion begins to shake and crumble around you. You run!</p>
                    <p>You burst through the front door just as the mansion collapses behind you.</p>
                    <p>The storm has cleared. The sun is rising.</p>
                    <p class="objective">${this.t('goodEndingText')}</p>
                    <h3 style="color: #44ff44; margin-top: 20px;">${this.t('goodEndingFinal')}</h3>
                    <p style="margin-top: 20px;">${this.t('achievements')}: ${this.player.achievements.size}/7</p>
                    <div style="margin-top: 20px; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 10px;">
                        <h4 style="color: #ffa500;">📊 ${this.t('statistics')}</h4>
                        <p>${this.t('gamesPlayed')}: ${this.stats.gamesPlayed}</p>
                        <p>${this.t('goodEndings')}: ${this.stats.goodEndings}</p>
                        <p>${this.t('evilEndings')}: ${this.stats.evilEndings}</p>
                        <p>${this.t('neutralEndings')}: ${this.stats.neutralEndings}</p>
                        <p>${this.t('badEndings')}: ${this.stats.badEndings}</p>
                        <p>${this.t('bestHealth')}: ${this.stats.bestHealthScore} HP</p>
                        <p>${this.t('totalAchievements')}: ${this.stats.totalAchievements}/7</p>
                    </div>
                </div>
            `,
            [
                { text: this.t('playAgain'), action: 'game.start()' }
            ]
        );
    }

    evilEnding() {
        this.gameOver = true;

        // Update stats
        this.stats.gamesPlayed++;
        this.stats.evilEndings++;
        this.stats.totalAchievements = Math.max(this.stats.totalAchievements, this.player.achievements.size);
        this.saveStats();
        this.deleteSave();

        this.showScene(
            this.t('evilEndingTitle'),
            `
                <div class="ending evil">
                    <p>You approach the spirit and break the chains binding it...</p>
                    <p>Dark energy explodes outward, flowing into your body!</p>
                    <p>Power! Unimaginable power courses through your veins!</p>
                    <p style="color: #ff44ff; font-weight: bold;">But at what cost...?</p>
                    <p>You look at your reflection in a nearby mirror.</p>
                    <p>Your eyes... they're completely black. Empty. Like the spirit's.</p>
                    <p>You feel no remorse. No fear. Only hunger for more power.</p>
                    <p class="objective">${this.t('evilEndingText')}</p>
                    <h3 style="color: #8b008b; margin-top: 20px;">${this.t('evilEndingFinal')}</h3>
                </div>
            `,
            [
                { text: this.t('playAgain'), action: 'game.start()' }
            ]
        );
    }

    escapeEnding() {
        this.gameOver = true;

        // Update stats
        this.stats.gamesPlayed++;
        this.stats.neutralEndings++;
        this.stats.totalAchievements = Math.max(this.stats.totalAchievements, this.player.achievements.size);
        this.saveStats();
        this.deleteSave();

        this.showScene(
            this.t('neutralEndingTitle'),
            `
                <div class="ending neutral">
                    <p>This is too much. This is beyond you.</p>
                    <p>You back away from the ritual chamber and run.</p>
                    <p>Down the stairs, through the entrance hall, and out the front door.</p>
                    <p>You don't look back. Not even once.</p>
                    <p style="color: #ffaa00; font-weight: bold;">You survive. That's what matters, right?</p>
                    <p>But as you drive away, you can see the mansion in your rearview mirror.</p>
                    <p>It still stands. The mystery remains unsolved.</p>
                    <p class="objective">${this.t('neutralEndingText')}</p>
                    <h3 style="color: #ffa500; margin-top: 20px;">${this.t('neutralEndingFinal')}</h3>
                </div>
            `,
            [
                { text: this.t('playAgain'), action: 'game.start()' }
            ]
        );
    }

    badEnding(message) {
        this.gameOver = true;

        // Update stats
        this.stats.gamesPlayed++;
        this.stats.badEndings++;
        this.stats.totalAchievements = Math.max(this.stats.totalAchievements, this.player.achievements.size);
        this.saveStats();
        this.deleteSave();

        this.showScene(
            this.t('badEndingTitle'),
            `
                <div class="ending bad">
                    <p style="color: #ff4444; font-weight: bold;">${message}</p>
                    <p>Your vision fades to black...</p>
                    <p>You have fallen in the Haunted Mansion.</p>
                    <p>Your story ends here...</p>
                    <p>Perhaps in another life, you will make different choices.</p>
                    <h3 style="color: #dc143c; margin-top: 20px;">${this.t('badEndingFinal')}</h3>
                </div>
            `,
            [
                { text: this.t('tryAgain'), action: 'game.start()' }
            ]
        );
    }
}

// Initialize game
const game = new Game();
window.game = game; // Make game accessible globally for audio/sound effects

// Initialize UI language
game.updateUILanguage();
