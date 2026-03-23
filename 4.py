# Aim: Write a Python program to explore basic arithmetic operations.

import datetime

current_time = datetime.datetime.now()
print("Name of student: [Your Name]")
print("Roll no:         Batch: D1  Branch: AI&DS")
print("Current date and time is:", current_time)
print("*" * 70)

num1 = int(input("Enter first number: "))
num2 = int(input("Enter second number: "))

addition = num1 + num2
subtraction = num1 - num2
multiplication = num1 * num2
power = num1 ** num2

print("1. Addition:")
print(f"Sum of {num1} and {num2} is: {addition}")

print("2. Subtraction:")
print(f"Difference of {num1} and {num2} is: {subtraction}")

print("3. Multiplication:")
print(f"Product of {num1} and {num2} is: {multiplication}")

print("4. Exponent:")
print(f"{num1} raised to the power {num2} is: {power}")

if num2 == 0:
    print("5. Division:")
    print("Division is not possible because the second number is 0.")
    print("6. Floor Division:")
    print("Floor division is not possible because the second number is 0.")
    print("7. Modulus:")
    print("Modulus is not possible because the second number is 0.")
else:
    division = num1 / num2
    floor_division = num1 // num2
    modulus = num1 % num2

    print("5. Division:")
    print(f"Division of {num1} and {num2} is: {division}")

    print("6. Floor Division:")
    print(f"Floor division of {num1} and {num2} is: {floor_division}")

    print("7. Modulus:")
    print(f"Modulus of {num1} and {num2} is: {modulus}")
