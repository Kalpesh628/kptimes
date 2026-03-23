# Aim: Write a python program to calculate areas of any geometric figures like circle, rectangle and triangle.

import datetime
import math

current_time = datetime.datetime.now()
print("Name of student: [Your Name]")
print("Roll no:         Batch: D1  Branch: AI&DS")
print("Current date and time is:", current_time)
print("*" * 70)

print("**********Program to calculate area of geometric figures*********")

print("\n1: Area of the Circle")
radius = float(input("Enter the radius of the Circle: "))
area = math.pi * radius * radius
print(f"The area of the circle with radius {radius} is:", area)

print("\n2: Area of the Rectangle")
width = float(input("Enter the width of the rectangle: "))
length = float(input("Enter the length of the rectangle: "))
area = width * length
print(f"The area of the rectangle with {width} and {length} is", area)

print("\n3: Area of the Triangle")
a = float(input("Enter the first side of the triangle: "))
b = float(input("Enter the second side of the triangle: "))
c = float(input("Enter the third side of the triangle: "))
s = (a + b + c) / 2
area = math.sqrt(s * (s - a) * (s - b) * (s - c))
print(f"The area of the triangle with sides {a},{b},{c} is", area)

print("\n4: Area of the Square")
side = float(input("Enter the side of the square: "))
area = side * side
print(f"The area of the square with side {side} is", area)

print("\n5: Area of the Parallelogram")
base = float(input("Enter the base of the parallelogram: "))
height = float(input("Enter the height of the parallelogram: "))
area = base * height
print(f"The area of the parallelogram with {base} and {height} is", area)