class Player {
    constructor() {
        this.health = 100;
        this.maxHealth = 100;
        this.inventory = [];
        this.visitedRooms = new Set();
        this.achievements = new Set();
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health < 0) this.health = 0;
        this.updateHealthBar();

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
    }

    isAlive() {
        return this.health > 0;
    }

    addItem(item) {
        this.inventory.push(item);
        this.updateInventoryDisplay();
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
            inventoryItems.innerHTML = '<p class="empty-inventory">Your inventory is empty</p>';
        } else {
            inventoryItems.innerHTML = this.inventory.map((item, index) => {
                const isUsable = item === 'Health Potion';
                return `
                    <div class="item ${isUsable ? 'usable' : ''}">
                        <div class="item-name">${this.getItemIcon(item)} ${item}</div>
                        ${isUsable ? `<button class="use-btn" onclick="game.useItem('${item}', ${index})">Use</button>` : ''}
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
        this.player = new Player();
        this.gameOver = false;
        this.currentRoom = 'entrance';

        // Setup inventory button
        document.getElementById('inventoryBtn').addEventListener('click', () => {
            this.toggleInventory();
        });

        // Load saved game if exists
        this.loadGame();
    }

    saveGame() {
        const saveData = {
            health: this.player.health,
            inventory: this.player.inventory,
            visitedRooms: Array.from(this.player.visitedRooms),
            achievements: Array.from(this.player.achievements),
            currentRoom: this.currentRoom,
            gameOver: this.gameOver
        };
        localStorage.setItem('hauntedMansionSave', JSON.stringify(saveData));
        this.showNotification('Game Saved! 💾');
    }

    loadGame() {
        const savedData = localStorage.getItem('hauntedMansionSave');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
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
        this.showNotification('Save Deleted! 🗑️');
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
        this.player = new Player();
        this.gameOver = false;
        this.player.updateHealthBar();
        this.player.updateInventoryDisplay();
        this.entranceHall();
    }

    entranceHall() {
        this.currentRoom = 'entrance';
        this.player.visitRoom('Entrance Hall');
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
        this.deleteSave();

        this.showScene(
            '✨ GOOD ENDING: Hero',
            `
                <div class="ending good">
                    <p>You open the Ancient Book and begin reciting the sacred words...</p>
                    <p>Brilliant light fills the chamber as the dark spirit screams in fury!</p>
                    <p>"NO! You cannot do this! I am eternal!"</p>
                    <p style="color: #44ff44; font-weight: bold;">But the light grows stronger. The spirit dissolves into nothingness.</p>
                    <p>The mansion begins to shake and crumble around you. You run!</p>
                    <p>You burst through the front door just as the mansion collapses behind you.</p>
                    <p>The storm has cleared. The sun is rising.</p>
                    <p class="objective">The town is safe. The disappearances will stop. You are hailed as a hero!</p>
                    <h3 style="color: #44ff44; margin-top: 20px;">🏆 THE END - You saved the town!</h3>
                    <p style="margin-top: 20px;">Achievements: ${this.player.achievements.size}/7 unlocked</p>
                </div>
            `,
            [
                { text: '🔄 Play Again', action: 'game.start()' }
            ]
        );
    }

    evilEnding() {
        this.gameOver = true;
        this.showScene(
            '⚫ DARK ENDING: Corrupted',
            `
                <div class="ending evil">
                    <p>You approach the spirit and break the chains binding it...</p>
                    <p>Dark energy explodes outward, flowing into your body!</p>
                    <p>Power! Unimaginable power courses through your veins!</p>
                    <p style="color: #ff44ff; font-weight: bold;">But at what cost...?</p>
                    <p>You look at your reflection in a nearby mirror.</p>
                    <p>Your eyes... they're completely black. Empty. Like the spirit's.</p>
                    <p>You feel no remorse. No fear. Only hunger for more power.</p>
                    <p class="objective">You have become the new master of the Haunted Mansion. The disappearances will continue...</p>
                    <h3 style="color: #8b008b; margin-top: 20px;">😈 THE END - You joined the darkness</h3>
                </div>
            `,
            [
                { text: '🔄 Play Again (Try a different path?)', action: 'game.start()' }
            ]
        );
    }

    escapeEnding() {
        this.gameOver = true;
        this.showScene(
            '🚪 NEUTRAL ENDING: Survivor',
            `
                <div class="ending neutral">
                    <p>This is too much. This is beyond you.</p>
                    <p>You back away from the ritual chamber and run.</p>
                    <p>Down the stairs, through the entrance hall, and out the front door.</p>
                    <p>You don't look back. Not even once.</p>
                    <p style="color: #ffaa00; font-weight: bold;">You survive. That's what matters, right?</p>
                    <p>But as you drive away, you can see the mansion in your rearview mirror.</p>
                    <p>It still stands. The mystery remains unsolved.</p>
                    <p class="objective">Others may not be so lucky to escape...</p>
                    <h3 style="color: #ffa500; margin-top: 20px;">🏃 THE END - You escaped with your life</h3>
                </div>
            `,
            [
                { text: '🔄 Play Again (Face your fears?)', action: 'game.start()' }
            ]
        );
    }

    badEnding(message) {
        this.gameOver = true;
        this.showScene(
            '💀 BAD ENDING: Defeat',
            `
                <div class="ending bad">
                    <p style="color: #ff4444; font-weight: bold;">${message}</p>
                    <p>Your vision fades to black...</p>
                    <p>You have fallen in the Haunted Mansion.</p>
                    <p>Your story ends here...</p>
                    <p>Perhaps in another life, you will make different choices.</p>
                    <h3 style="color: #dc143c; margin-top: 20px;">💀 GAME OVER</h3>
                </div>
            `,
            [
                { text: '🔄 Try Again', action: 'game.start()' }
            ]
        );
    }
}

// Initialize game
const game = new Game();
