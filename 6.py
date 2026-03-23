# Aim: Create a Python code to demonstrate the use of sets and perform set operations (union, intersection, difference) to manage student enrollments in multiple courses / appearing for multiple entrance exams like CET, JEE, NEET etc.

import datetime

current_time = datetime.datetime.now()
print("Name of student: [Your Name]")
print("Roll no:         Batch: D1  Branch: AI&DS")
print("Current date and time is:", current_time)
print("*" * 70)

CET = {0, 2, 4, 6, 8}
JEE = {1, 2, 3, 4, 11}
NEET = {2, 4, 3, 7, 9, 8}

print("Students Enrolled for CET examination :", CET)
print("Students Enrolled for JEE examination :", JEE)
print("Students Enrolled for NEET examination :", NEET)

Union = CET | JEE | NEET
print("Total Number Of Students Registered For CET, JEE & NEET Examination All Together :", Union)

Intersection = CET & JEE & NEET
print("Common Number Of Students Registered For CET, JEE & NEET Examination :", Intersection)

Intersection1 = CET & JEE
print("Common Number Of Students Registered For CET & JEE Examination :", Intersection1)

Intersection2 = CET & NEET
print("Common Number Of Students Registered For CET & NEET Examination :", Intersection2)

Intersection3 = JEE & NEET
print("Common Number Of Students Registered For JEE & NEET Examination :", Intersection3)

Difference = CET - JEE - NEET
print("Number Of Students Registered For CET Examination only :", Difference)

Difference = JEE - NEET - CET
print("Number Of Students Registered For JEE Examination only :", Difference)

Difference = NEET - CET - JEE
print("Number Of Students Registered For NEET Examination only :", Difference)