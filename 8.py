# Aim: Develop a Python program that takes a numerical input and identifies whether it is even or odd, utilizing conditional statements and loops.

import datetime

current_time = datetime.datetime.now()
print("Name of student: [Your Name]")
print("Roll no:         Batch: D1  Branch: AI&DS")
print("Current date and time is:", current_time)
print("*" * 70)

while True:
    number = int(input("Enter a number: "))
    if number % 2 == 0:
        print(f"{number} is even.")
    else:
        print(f"{number} is odd.")
    cont = input("Do you want to check another number? (yes/no): ").strip().lower()
    if cont != 'yes':
        print("Goodbye!")
        break