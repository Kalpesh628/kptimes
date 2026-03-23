# Aim: Develop a Python program to manage a task list using lists and tuples, including adding, removing, updating, and sorting tasks.

import datetime

current_time = datetime.datetime.now()
print("Name of student: [Your Name]")
print("Roll no:         Batch: D1  Branch: AI&DS")
print("Current date and time is:", current_time)
print("*" * 70)

# ─────────────────────────────────────────────────────────────
# PART 1: Task List Manager using a Class (Main Experiment)
# ─────────────────────────────────────────────────────────────

class ListManager:
    def __init__(self):
        # Initialize an empty list to store tasks
        self.items = []

    def add_item(self, item):
        # Add a new task to the end of the list
        self.items.append(item)
        print(f"Item '{item}' added to the list.")

    def remove_item(self, item):
        # Remove a task if it exists, else show error
        if item in self.items:
            self.items.remove(item)
            print(f"Item '{item}' removed from the list.")
        else:
            print(f"Item '{item}' not found in the list.")

    def update_item(self, old_item, new_item):
        # Find the task and replace it with the updated value
        if old_item in self.items:
            index = self.items.index(old_item)
            self.items[index] = new_item
            print(f"Item '{old_item}' updated to '{new_item}'.")
        else:
            print(f"Item '{old_item}' not found in the list.")

    def sort_list(self):
        # Sort all tasks alphabetically
        self.items.sort()
        print("List sorted.")

    def display_list(self):
        # Print all current tasks
        print("Current list:", self.items)


def main():
    manager = ListManager()
    while True:
        print("\nMenu:")
        print("1. Add item")
        print("2. Remove item")
        print("3. Update item")
        print("4. Sort list")
        print("5. Display list")
        print("6. Exit")
        choice = input("Enter your choice (1-6): ")

        if choice == '1':
            item = input("Enter the item to add: ")
            manager.add_item(item)
        elif choice == '2':
            item = input("Enter the item to remove: ")
            manager.remove_item(item)
        elif choice == '3':
            old_item = input("Enter the item to update: ")
            new_item = input("Enter the new item: ")
            manager.update_item(old_item, new_item)
        elif choice == '4':
            manager.sort_list()
        elif choice == '5':
            manager.display_list()
        elif choice == '6':
            print("Exiting the program.")
            break
        else:
            print("Invalid choice, please try again.")

if __name__ == "__main__":
    main()

# ─────────────────────────────────────────────────────────────
# PART 2: List & Tuple Operations Demo
# ─────────────────────────────────────────────────────────────

print("\n" + "=" * 70)
print("LIST OPERATIONS DEMO")
print("=" * 70)

# Create a list
ages = [19, 26, 29]
print("Created list:", ages)

# Access elements by index
languages = ['Python', 'Swift', 'C++']
print("First element  (index 0):", languages[0])
print("Last element   (index -1):", languages[-1])

# Slicing
my_list = ['p', 'r', 'o', 'g', 'r', 'a', 'm']
print("Original list:", my_list)
print("Slice [2:5]   :", my_list[2:5])
print("Slice [:3]    :", my_list[:3])
print("Slice [5:]    :", my_list[5:])

# Append - adds to end
fruits = ['apple', 'banana', 'orange']
fruits.append('cherry')
print("After append  :", fruits)

# Insert at specific index
fruits.insert(1, 'mango')
print("After insert at index 1:", fruits)

# Extend with another list
numbers = [1, 3, 5]
numbers.extend([2, 4, 6])
print("After extend  :", numbers)

# Update an element
colors = ['Red', 'Black', 'Green']
colors[2] = 'Blue'
print("After update  :", colors)

# Remove a specific element
numbers_list = [2, 4, 7, 9]
numbers_list.remove(4)
print("After remove  :", numbers_list)

# Sort the list
sample = [5, 2, 8, 1, 9, 3]
sample.sort()
print("After sort    :", sample)

# Length of list
print("Length of list:", len(sample))

print("\n" + "=" * 70)
print("TUPLE OPERATIONS DEMO")
print("=" * 70)

# Create a tuple
numbers_tuple = (1, 2, -5)
print("Tuple created :", numbers_tuple)

# Tuple with mixed data types
mixed_tuple = (2, 'Hello', 'Python')
print("Mixed tuple   :", mixed_tuple)

# Access tuple elements by index
lang_tuple = ('Python', 'Swift', 'C++')
print("First element :", lang_tuple[0])
print("Last element  :", lang_tuple[-1])

# Tuple slicing
tu = ("W", "S", "C", "U", "B", "E")
print("Full tuple    :", tu[::])
print("Reversed      :", tu[::-1])
print("Slice [2:6]   :", tu[2:6])

# Concatenation of tuples
x = (1, 2, 3, 4)
y = (5, 6, 7, 8)
z = x + y
print("Concatenated  :", z)

# Check if item exists in tuple
colors_t = ('red', 'orange', 'blue')
print("'red' in tuple:", 'red' in colors_t)
print("'yellow' in tuple:", 'yellow' in colors_t)

# Tuple is immutable - cannot modify
# Demonstrating via try/except
try:
    lang_tuple[0] = 'Java'
except TypeError as e:
    print("Tuples are immutable! Error:", e)