#ifndef PLAYER_H
#define PLAYER_H

#include <string>
#include <vector>
#include <algorithm>

class Player {
private:
    int health;
    int maxHealth;
    std::vector<std::string> inventory;

public:
    Player() : health(100), maxHealth(100) {}

    int getHealth() const { return health; }
    int getMaxHealth() const { return maxHealth; }

    void takeDamage(int damage) {
        health -= damage;
        if (health < 0) health = 0;
    }

    void heal(int amount) {
        health += amount;
        if (health > maxHealth) health = maxHealth;
    }

    bool isAlive() const {
        return health > 0;
    }

    void addItem(const std::string& item) {
        inventory.push_back(item);
    }

    bool hasItem(const std::string& item) const {
        return std::find(inventory.begin(), inventory.end(), item) != inventory.end();
    }

    void removeItem(const std::string& item) {
        auto it = std::find(inventory.begin(), inventory.end(), item);
        if (it != inventory.end()) {
            inventory.erase(it);
        }
    }

    const std::vector<std::string>& getInventory() const {
        return inventory;
    }

    void showInventory() const {
        if (inventory.empty()) {
            std::cout << "Your inventory is empty.\n";
        } else {
            std::cout << "\nYour inventory:\n";
            for (size_t i = 0; i < inventory.size(); i++) {
                std::cout << "  " << (i + 1) << ". " << inventory[i] << "\n";
            }
        }
    }
};

#endif
