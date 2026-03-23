# Aim: Design a Python program to compute the factorial of a given integer N.

import datetime

current_time = datetime.datetime.now()
print("Name of student: [Your Name]")
print("Roll no:         Batch: D1  Branch: AI&DS")
print("Current date and time is:", current_time)
print("*" * 70)

while True:
    num = int(input("Enter the number: "))
    if num < 0:
        print("Factorial is not defined for negative numbers.")
        continue
    factorial = 1
    for i in range(1, num + 1):
        factorial *= i
    print(f"The factorial of {num} is {factorial}")
    choice = input("Do you want to check another number? (yes/no): ").strip().lower()
    if choice not in ['yes', 'y']:
        print("Goodbye!")
        break