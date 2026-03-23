# Aim: Write a python code to generate Personalized Greeting.

import datetime

current_time = datetime.datetime.now()
print("Name of student: [Your Name]")
print("Roll no:         Batch: D1  Branch: AI&DS")
print("Current date and time is:", current_time)
print("*" * 70)

print("Welcome to the name and greet program!")
name = input("Please enter your name: ")
message = input("Please enter greeting message: ")
print(f"{message}", name)