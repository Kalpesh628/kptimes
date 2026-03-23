# Aim: Write a Python program to create, update, and manipulate a dictionary of student records, including their grades and attendance.

import datetime

current_time = datetime.datetime.now()
print("Name of student: [Your Name]")
print("Roll no:         Batch: D1  Branch: AI&DS")
print("Current date and time is:", current_time)
print("*" * 70)

student_dict = {}

def calculate_grade(marks):
    if marks >= 85:
        return 'A'
    elif marks >= 70:
        return 'B'
    elif marks >= 50:
        return 'C'
    else:
        return 'F'

n = int(input("Enter the number of students: "))

for i in range(n):
    roll_number = input("Enter roll number: ")
    name = input("Enter name: ")
    marks = float(input("Enter marks: "))
    attendance = float(input("Enter attendance: "))
    grade = calculate_grade(marks)
    student_dict[roll_number] = {'name': name, 'marks': marks, 'attendance': attendance, 'grade': grade}

print("\nStudents with marks above 75 and attendance above 75:")
print("-" * 60)
print(f"{'Name':<20} {'Marks':<10} {'Attendance':<10} {'Grade':<10}")
print("-" * 60)
for roll_number, student in student_dict.items():
    if student['marks'] > 75 and student['attendance'] > 75:
        print(f"{student['name']:<20} {student['marks']:<10} {student['attendance']:<10} {student['grade']:<10}")
print("-" * 60)

update_roll = input("\nEnter the roll number of the student to update: ")
if update_roll in student_dict:
    new_marks = float(input(f"Enter new marks for {student_dict[update_roll]['name']}: "))
    new_attendance = float(input(f"Enter new attendance for {student_dict[update_roll]['name']}: "))
    new_grade = calculate_grade(new_marks)
    student_dict[update_roll]['marks'] = new_marks
    student_dict[update_roll]['attendance'] = new_attendance
    student_dict[update_roll]['grade'] = new_grade
    print(f"\nUpdated details for {student_dict[update_roll]['name']}:")
    print(f"Marks: {new_marks}, Attendance: {new_attendance}, Grade: {new_grade}")
else:
    print("Student with this roll number does not exist.")

print("\nAll Student Records (Updated):")
print("-" * 70)
print(f"{'Roll Number':<15} {'Name':<20} {'Marks':<10} {'Attendance':<10} {'Grade':<10}")
print("-" * 70)
for roll_number, student in student_dict.items():
    print(f"{roll_number:<15} {student['name']:<20} {student['marks']:<10} {student['attendance']:<10} {student['grade']:<10}")
print("-" * 70)