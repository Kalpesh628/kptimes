# Aim: Write a Python program to calculate the gross salary of an employee.

import datetime

current_time = datetime.datetime.now()
print("Name of student: [Your Name]")
print("Roll no:         Batch: D1  Branch: AI&DS")
print("Current date and time is:", current_time)
print("*" * 70)

name = input("Enter the name of employee Mr/Mrs: ")
basic_salary = float(input("Enter basic salary in Rs.: "))

dearness_allowance = 0.70 * basic_salary
travel_allowance = 0.30 * basic_salary
house_rent_allowance = 0.10 * basic_salary
provident_fund = 0.10 * basic_salary
gross_salary = round(
    basic_salary
    + dearness_allowance
    + travel_allowance
    + house_rent_allowance
    - provident_fund,
    2,
)

print(f"\nSalary details of employee {name}:")
print(f"Basic Salary: Rs. {basic_salary}")
print(f"DA: Rs. {dearness_allowance}")
print(f"TA: Rs. {travel_allowance}")
print(f"HRA: Rs. {house_rent_allowance}")
print(f"PF Deduction: Rs. {provident_fund}")
print(f"Gross Salary: Rs. {gross_salary}")
