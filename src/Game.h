#ifndef GAME_H
#define GAME_H

#include <iostream>
#include <string>
#include <limits>
#include "Player.h"

class Game {
private:
    Player player;
    bool gameOver;

    void clearInput() {
        std::cin.clear();
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
    }

    int getChoice(int min, int max) {
        int choice;
        while (true) {
            std::cout << "\nYour choice: ";
            if (std::cin >> choice && choice >= min && choice <= max) {
                clearInput();
                return choice;
            }
            std::cout << "Invalid choice. Please enter a number between " << min << " and " << max << ".\n";
            clearInput();
        }
    }

    void waitForEnter() {
        std::cout << "\nPress Enter to continue...";
        std::cin.get();
    }

    void showStatus() {
        std::cout << "\n[Health: " << player.getHealth() << "/" << player.getMaxHealth() << "]\n";
    }

public:
    Game() : gameOver(false) {}

    void start() {
        introduction();
        if (!gameOver) {
            entranceHall();
        }
    }

    void introduction() {
        std::cout << "\n========================================\n";
        std::cout << "     THE HAUNTED MANSION MYSTERY\n";
        std::cout << "========================================\n\n";

        std::cout << "You are a detective investigating mysterious disappearances\n";
        std::cout << "in the old Blackwood Mansion. As you approach the mansion,\n";
        std::cout << "a sudden storm forces you inside. The door slams shut behind you...\n\n";

        std::cout << "Your goal: Uncover the mansion's secrets and escape alive!\n";
        waitForEnter();
    }

    void entranceHall() {
        std::cout << "\n=== ENTRANCE HALL ===\n";
        std::cout << "You find yourself in a dusty entrance hall. Moonlight filters\n";
        std::cout << "through broken windows. You see three doors:\n\n";
        std::cout << "1. Go to the Library (left door)\n";
        std::cout << "2. Go to the Kitchen (right door)\n";
        std::cout << "3. Go upstairs to the Bedroom\n";
        std::cout << "4. Check your inventory\n";

        int choice = getChoice(1, 4);

        switch (choice) {
            case 1: library(); break;
            case 2: kitchen(); break;
            case 3: bedroom(); break;
            case 4:
                player.showInventory();
                entranceHall();
                break;
        }
    }

    void library() {
        std::cout << "\n=== LIBRARY ===\n";
        std::cout << "The library is filled with ancient books and scrolls.\n";
        std::cout << "You notice a peculiar book glowing on the shelf.\n\n";

        if (!player.hasItem("Ancient Book")) {
            std::cout << "1. Take the Ancient Book\n";
            std::cout << "2. Read the book here\n";
            std::cout << "3. Return to Entrance Hall\n";

            int choice = getChoice(1, 3);

            switch (choice) {
                case 1:
                    player.addItem("Ancient Book");
                    std::cout << "\nYou take the Ancient Book. It feels warm to the touch.\n";
                    std::cout << "You notice strange symbols inside...\n";
                    waitForEnter();
                    library();
                    break;
                case 2:
                    std::cout << "\nThe book contains a ritual to banish evil spirits!\n";
                    std::cout << "You'll need: A Silver Key and Holy Water.\n";
                    waitForEnter();
                    library();
                    break;
                case 3:
                    entranceHall();
                    break;
            }
        } else {
            std::cout << "The library is quiet. Nothing else of interest here.\n\n";
            std::cout << "1. Return to Entrance Hall\n";
            int choice = getChoice(1, 1);
            entranceHall();
        }
    }

    void kitchen() {
        std::cout << "\n=== KITCHEN ===\n";
        std::cout << "The kitchen is dark and smells of decay.\n";
        std::cout << "You see a cabinet and hear scratching sounds...\n\n";

        if (!player.hasItem("Holy Water")) {
            std::cout << "1. Search the cabinet\n";
            std::cout << "2. Investigate the scratching sound\n";
            std::cout << "3. Return to Entrance Hall\n";

            int choice = getChoice(1, 3);

            switch (choice) {
                case 1:
                    std::cout << "\nYou find a bottle of Holy Water!\n";
                    player.addItem("Holy Water");
                    waitForEnter();
                    kitchen();
                    break;
                case 2:
                    ghostEncounter();
                    break;
                case 3:
                    entranceHall();
                    break;
            }
        } else {
            std::cout << "1. Investigate the scratching sound\n";
            std::cout << "2. Return to Entrance Hall\n";

            int choice = getChoice(1, 2);
            if (choice == 1) ghostEncounter();
            else entranceHall();
        }
    }

    void ghostEncounter() {
        std::cout << "\n=== GHOST ENCOUNTER! ===\n";
        std::cout << "A terrifying ghost appears from the shadows!\n";
        std::cout << "It lunges at you!\n\n";

        if (player.hasItem("Holy Water")) {
            std::cout << "1. Use Holy Water\n";
            std::cout << "2. Run away\n";
            std::cout << "3. Try to fight it\n";

            int choice = getChoice(1, 3);

            switch (choice) {
                case 1:
                    std::cout << "\nYou splash the Holy Water! The ghost shrieks and vanishes!\n";
                    std::cout << "It drops a Silver Key as it disappears!\n";
                    player.removeItem("Holy Water");
                    player.addItem("Silver Key");
                    waitForEnter();
                    kitchen();
                    break;
                case 2:
                    std::cout << "\nYou run back to the entrance hall!\n";
                    player.takeDamage(15);
                    std::cout << "The ghost scratches you as you flee! (-15 HP)\n";
                    showStatus();
                    waitForEnter();
                    entranceHall();
                    break;
                case 3:
                    std::cout << "\nYour fists pass through the ghost! It attacks you!\n";
                    player.takeDamage(30);
                    showStatus();
                    if (!player.isAlive()) {
                        badEnding("You were defeated by the ghost...");
                    } else {
                        std::cout << "You barely escape back to the entrance hall!\n";
                        waitForEnter();
                        entranceHall();
                    }
                    break;
            }
        } else {
            std::cout << "The ghost attacks! You have nothing to defend yourself!\n";
            player.takeDamage(25);
            showStatus();
            if (!player.isAlive()) {
                badEnding("You were defeated by the ghost...");
            } else {
                std::cout << "You manage to escape back to the entrance hall!\n";
                waitForEnter();
                entranceHall();
            }
        }
    }

    void bedroom() {
        std::cout << "\n=== MASTER BEDROOM ===\n";
        std::cout << "You enter a lavish but decayed bedroom.\n";
        std::cout << "There's a locked door at the far end - it glows with an eerie light.\n\n";

        if (player.hasItem("Silver Key") && player.hasItem("Ancient Book")) {
            std::cout << "You have both the Silver Key and the Ancient Book!\n\n";
            std::cout << "1. Use the Silver Key on the glowing door\n";
            std::cout << "2. Return to Entrance Hall\n";

            int choice = getChoice(1, 2);

            if (choice == 1) {
                finalChoice();
            } else {
                entranceHall();
            }
        } else {
            std::cout << "The door is locked with a mystical seal.\n";
            if (!player.hasItem("Silver Key")) {
                std::cout << "You need a Silver Key to unlock it.\n";
            }
            if (!player.hasItem("Ancient Book")) {
                std::cout << "You sense you need more knowledge to proceed...\n";
            }
            std::cout << "\n1. Return to Entrance Hall\n";
            getChoice(1, 1);
            entranceHall();
        }
    }

    void finalChoice() {
        std::cout << "\n=== THE RITUAL CHAMBER ===\n";
        std::cout << "The door opens to reveal a dark ritual chamber.\n";
        std::cout << "In the center, a dark spirit is bound in chains of light.\n";
        std::cout << "It speaks: 'Free me, and I shall grant you power beyond imagination...'\n";
        std::cout << "You remember the banishment ritual from the Ancient Book.\n\n";

        std::cout << "1. Perform the banishment ritual (Destroy the spirit)\n";
        std::cout << "2. Free the spirit (Accept its offer)\n";
        std::cout << "3. Run away and escape the mansion\n";

        int choice = getChoice(1, 3);

        switch (choice) {
            case 1:
                goodEnding();
                break;
            case 2:
                evilEnding();
                break;
            case 3:
                escapeEnding();
                break;
        }
    }

    void goodEnding() {
        std::cout << "\n========================================\n";
        std::cout << "          GOOD ENDING: HERO\n";
        std::cout << "========================================\n\n";
        std::cout << "You recite the ancient words from the book.\n";
        std::cout << "Light fills the chamber as the dark spirit screams!\n";
        std::cout << "The mansion begins to crumble around you...\n\n";
        std::cout << "You run outside just as the mansion collapses.\n";
        std::cout << "The town is safe, and the disappearances will stop.\n";
        std::cout << "You are hailed as a hero!\n\n";
        std::cout << "THE END - You saved the town!\n";
        std::cout << "========================================\n";
        gameOver = true;
    }

    void evilEnding() {
        std::cout << "\n========================================\n";
        std::cout << "          DARK ENDING: CORRUPTED\n";
        std::cout << "========================================\n\n";
        std::cout << "You break the chains binding the spirit.\n";
        std::cout << "Dark energy flows into you - power beyond imagination!\n";
        std::cout << "But at what cost...?\n\n";
        std::cout << "Your reflection in the mirror shows only darkness.\n";
        std::cout << "You have become the new master of the mansion.\n";
        std::cout << "The disappearances will continue...\n\n";
        std::cout << "THE END - You joined the darkness\n";
        std::cout << "========================================\n";
        gameOver = true;
    }

    void escapeEnding() {
        std::cout << "\n========================================\n";
        std::cout << "        NEUTRAL ENDING: SURVIVOR\n";
        std::cout << "========================================\n\n";
        std::cout << "You decide this is beyond your abilities.\n";
        std::cout << "You flee the mansion and never look back.\n\n";
        std::cout << "You survive, but the mansion still stands.\n";
        std::cout << "The mystery remains unsolved...\n";
        std::cout << "Others may not be so lucky.\n\n";
        std::cout << "THE END - You escaped with your life\n";
        std::cout << "========================================\n";
        gameOver = true;
    }

    void badEnding(const std::string& message) {
        std::cout << "\n========================================\n";
        std::cout << "           BAD ENDING: DEFEAT\n";
        std::cout << "========================================\n\n";
        std::cout << message << "\n\n";
        std::cout << "You have fallen in the Haunted Mansion.\n";
        std::cout << "Your story ends here...\n\n";
        std::cout << "GAME OVER\n";
        std::cout << "========================================\n";
        gameOver = true;
    }
};

#endif
