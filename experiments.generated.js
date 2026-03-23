window.EXPERIMENTS = [
  {
    "number": 1,
    "fileName": "1.py",
    "title": "Personalized Greeting",
    "aim": "Write a python code to generate Personalized Greeting.",
    "code": "# Aim: Write a python code to generate Personalized Greeting.\n\nimport datetime\n\ncurrent_time = datetime.datetime.now()\nprint(\"Name of student: [Your Name]\")\nprint(\"Roll no:         Batch: D1  Branch: AI&DS\")\nprint(\"Current date and time is:\", current_time)\nprint(\"*\" * 70)\n\nprint(\"Welcome to the name and greet program!\")\nname = input(\"Please enter your name: \")\nmessage = input(\"Please enter greeting message: \")\nprint(f\"{message}\", name)\n",
    "available": true,
    "premiumLocked": false
  },
  {
    "number": 2,
    "fileName": "2.py",
    "title": "Area of Geometric Figures",
    "aim": "Write a python program to calculate areas of any geometric figures like circle, rectangle and triangle.",
    "code": "# Aim: Write a python program to calculate areas of any geometric figures like circle, rectangle and triangle.\n\nimport datetime\nimport math\n\ncurrent_time = datetime.datetime.now()\nprint(\"Name of student: [Your Name]\")\nprint(\"Roll no:         Batch: D1  Branch: AI&DS\")\nprint(\"Current date and time is:\", current_time)\nprint(\"*\" * 70)\n\nprint(\"**********Program to calculate area of geometric figures*********\")\n\nprint(\"\\n1: Area of the Circle\")\nradius = float(input(\"Enter the radius of the Circle: \"))\narea = math.pi * radius * radius\nprint(f\"The area of the circle with radius {radius} is:\", area)\n\nprint(\"\\n2: Area of the Rectangle\")\nwidth = float(input(\"Enter the width of the rectangle: \"))\nlength = float(input(\"Enter the length of the rectangle: \"))\narea = width * length\nprint(f\"The area of the rectangle with {width} and {length} is\", area)\n\nprint(\"\\n3: Area of the Triangle\")\na = float(input(\"Enter the first side of the triangle: \"))\nb = float(input(\"Enter the second side of the triangle: \"))\nc = float(input(\"Enter the third side of the triangle: \"))\ns = (a + b + c) / 2\narea = math.sqrt(s * (s - a) * (s - b) * (s - c))\nprint(f\"The area of the triangle with sides {a},{b},{c} is\", area)\n\nprint(\"\\n4: Area of the Square\")\nside = float(input(\"Enter the side of the square: \"))\narea = side * side\nprint(f\"The area of the square with side {side} is\", area)\n\nprint(\"\\n5: Area of the Parallelogram\")\nbase = float(input(\"Enter the base of the parallelogram: \"))\nheight = float(input(\"Enter the height of the parallelogram: \"))\narea = base * height\nprint(f\"The area of the parallelogram with {base} and {height} is\", area)\n",
    "available": true,
    "premiumLocked": false
  },
  {
    "number": 3,
    "fileName": "3.py",
    "title": "Gross Salary Calculator",
    "aim": "Write a Python program to calculate the gross salary of an employee.",
    "code": "# Aim: Write a Python program to calculate the gross salary of an employee.\n\nimport datetime\n\ncurrent_time = datetime.datetime.now()\nprint(\"Name of student: [Your Name]\")\nprint(\"Roll no:         Batch: D1  Branch: AI&DS\")\nprint(\"Current date and time is:\", current_time)\nprint(\"*\" * 70)\n\nname = input(\"Enter the name of employee Mr/Mrs: \")\nbasic_salary = float(input(\"Enter basic salary in Rs.: \"))\n\ndearness_allowance = 0.70 * basic_salary\ntravel_allowance = 0.30 * basic_salary\nhouse_rent_allowance = 0.10 * basic_salary\nprovident_fund = 0.10 * basic_salary\ngross_salary = round(\n    basic_salary\n    + dearness_allowance\n    + travel_allowance\n    + house_rent_allowance\n    - provident_fund,\n    2,\n)\n\nprint(f\"\\nSalary details of employee {name}:\")\nprint(f\"Basic Salary: Rs. {basic_salary}\")\nprint(f\"DA: Rs. {dearness_allowance}\")\nprint(f\"TA: Rs. {travel_allowance}\")\nprint(f\"HRA: Rs. {house_rent_allowance}\")\nprint(f\"PF Deduction: Rs. {provident_fund}\")\nprint(f\"Gross Salary: Rs. {gross_salary}\")\n",
    "available": true,
    "premiumLocked": false
  },
  {
    "number": 4,
    "fileName": "4.py",
    "title": "Arithmetic Operations",
    "aim": "Write a Python program to explore basic arithmetic operations.",
    "code": "# Aim: Write a Python program to explore basic arithmetic operations.\n\nimport datetime\n\ncurrent_time = datetime.datetime.now()\nprint(\"Name of student: [Your Name]\")\nprint(\"Roll no:         Batch: D1  Branch: AI&DS\")\nprint(\"Current date and time is:\", current_time)\nprint(\"*\" * 70)\n\nnum1 = int(input(\"Enter first number: \"))\nnum2 = int(input(\"Enter second number: \"))\n\naddition = num1 + num2\nsubtraction = num1 - num2\nmultiplication = num1 * num2\npower = num1 ** num2\n\nprint(\"1. Addition:\")\nprint(f\"Sum of {num1} and {num2} is: {addition}\")\n\nprint(\"2. Subtraction:\")\nprint(f\"Difference of {num1} and {num2} is: {subtraction}\")\n\nprint(\"3. Multiplication:\")\nprint(f\"Product of {num1} and {num2} is: {multiplication}\")\n\nprint(\"4. Exponent:\")\nprint(f\"{num1} raised to the power {num2} is: {power}\")\n\nif num2 == 0:\n    print(\"5. Division:\")\n    print(\"Division is not possible because the second number is 0.\")\n    print(\"6. Floor Division:\")\n    print(\"Floor division is not possible because the second number is 0.\")\n    print(\"7. Modulus:\")\n    print(\"Modulus is not possible because the second number is 0.\")\nelse:\n    division = num1 / num2\n    floor_division = num1 // num2\n    modulus = num1 % num2\n\n    print(\"5. Division:\")\n    print(f\"Division of {num1} and {num2} is: {division}\")\n\n    print(\"6. Floor Division:\")\n    print(f\"Floor division of {num1} and {num2} is: {floor_division}\")\n\n    print(\"7. Modulus:\")\n    print(f\"Modulus of {num1} and {num2} is: {modulus}\")\n",
    "available": true,
    "premiumLocked": false
  },
  {
    "number": 5,
    "fileName": "5.py",
    "title": "Premium Access Required",
    "aim": "Premium access required for this experiment.",
    "code": "",
    "available": false,
    "premiumLocked": true
  },
  {
    "number": 6,
    "fileName": "6.py",
    "title": "Set Operations",
    "aim": "Create a Python code to demonstrate the use of sets and perform set operations (union, intersection, difference) to manage student enrollments in multiple courses / appearing for multiple entrance exams like CET, JEE, NEET etc.",
    "code": "# Aim: Create a Python code to demonstrate the use of sets and perform set operations (union, intersection, difference) to manage student enrollments in multiple courses / appearing for multiple entrance exams like CET, JEE, NEET etc.\n\nimport datetime\n\ncurrent_time = datetime.datetime.now()\nprint(\"Name of student: [Your Name]\")\nprint(\"Roll no:         Batch: D1  Branch: AI&DS\")\nprint(\"Current date and time is:\", current_time)\nprint(\"*\" * 70)\n\nCET = {0, 2, 4, 6, 8}\nJEE = {1, 2, 3, 4, 11}\nNEET = {2, 4, 3, 7, 9, 8}\n\nprint(\"Students Enrolled for CET examination :\", CET)\nprint(\"Students Enrolled for JEE examination :\", JEE)\nprint(\"Students Enrolled for NEET examination :\", NEET)\n\nUnion = CET | JEE | NEET\nprint(\"Total Number Of Students Registered For CET, JEE & NEET Examination All Together :\", Union)\n\nIntersection = CET & JEE & NEET\nprint(\"Common Number Of Students Registered For CET, JEE & NEET Examination :\", Intersection)\n\nIntersection1 = CET & JEE\nprint(\"Common Number Of Students Registered For CET & JEE Examination :\", Intersection1)\n\nIntersection2 = CET & NEET\nprint(\"Common Number Of Students Registered For CET & NEET Examination :\", Intersection2)\n\nIntersection3 = JEE & NEET\nprint(\"Common Number Of Students Registered For JEE & NEET Examination :\", Intersection3)\n\nDifference = CET - JEE - NEET\nprint(\"Number Of Students Registered For CET Examination only :\", Difference)\n\nDifference = JEE - NEET - CET\nprint(\"Number Of Students Registered For JEE Examination only :\", Difference)\n\nDifference = NEET - CET - JEE\nprint(\"Number Of Students Registered For NEET Examination only :\", Difference)\n",
    "available": true,
    "premiumLocked": false
  },
  {
    "number": 7,
    "fileName": "7.py",
    "title": "Student Record Dictionary",
    "aim": "Write a Python program to create, update, and manipulate a dictionary of student records, including their grades and attendance.",
    "code": "# Aim: Write a Python program to create, update, and manipulate a dictionary of student records, including their grades and attendance.\n\nimport datetime\n\ncurrent_time = datetime.datetime.now()\nprint(\"Name of student: [Your Name]\")\nprint(\"Roll no:         Batch: D1  Branch: AI&DS\")\nprint(\"Current date and time is:\", current_time)\nprint(\"*\" * 70)\n\nstudent_dict = {}\n\ndef calculate_grade(marks):\n    if marks >= 85:\n        return 'A'\n    elif marks >= 70:\n        return 'B'\n    elif marks >= 50:\n        return 'C'\n    else:\n        return 'F'\n\nn = int(input(\"Enter the number of students: \"))\n\nfor i in range(n):\n    roll_number = input(\"Enter roll number: \")\n    name = input(\"Enter name: \")\n    marks = float(input(\"Enter marks: \"))\n    attendance = float(input(\"Enter attendance: \"))\n    grade = calculate_grade(marks)\n    student_dict[roll_number] = {'name': name, 'marks': marks, 'attendance': attendance, 'grade': grade}\n\nprint(\"\\nStudents with marks above 75 and attendance above 75:\")\nprint(\"-\" * 60)\nprint(f\"{'Name':<20} {'Marks':<10} {'Attendance':<10} {'Grade':<10}\")\nprint(\"-\" * 60)\nfor roll_number, student in student_dict.items():\n    if student['marks'] > 75 and student['attendance'] > 75:\n        print(f\"{student['name']:<20} {student['marks']:<10} {student['attendance']:<10} {student['grade']:<10}\")\nprint(\"-\" * 60)\n\nupdate_roll = input(\"\\nEnter the roll number of the student to update: \")\nif update_roll in student_dict:\n    new_marks = float(input(f\"Enter new marks for {student_dict[update_roll]['name']}: \"))\n    new_attendance = float(input(f\"Enter new attendance for {student_dict[update_roll]['name']}: \"))\n    new_grade = calculate_grade(new_marks)\n    student_dict[update_roll]['marks'] = new_marks\n    student_dict[update_roll]['attendance'] = new_attendance\n    student_dict[update_roll]['grade'] = new_grade\n    print(f\"\\nUpdated details for {student_dict[update_roll]['name']}:\")\n    print(f\"Marks: {new_marks}, Attendance: {new_attendance}, Grade: {new_grade}\")\nelse:\n    print(\"Student with this roll number does not exist.\")\n\nprint(\"\\nAll Student Records (Updated):\")\nprint(\"-\" * 70)\nprint(f\"{'Roll Number':<15} {'Name':<20} {'Marks':<10} {'Attendance':<10} {'Grade':<10}\")\nprint(\"-\" * 70)\nfor roll_number, student in student_dict.items():\n    print(f\"{roll_number:<15} {student['name']:<20} {student['marks']:<10} {student['attendance']:<10} {student['grade']:<10}\")\nprint(\"-\" * 70)\n",
    "available": true,
    "premiumLocked": false
  },
  {
    "number": 8,
    "fileName": "8.py",
    "title": "Even or Odd Checker",
    "aim": "Develop a Python program that takes a numerical input and identifies whether it is even or odd, utilizing conditional statements and loops.",
    "code": "# Aim: Develop a Python program that takes a numerical input and identifies whether it is even or odd, utilizing conditional statements and loops.\n\nimport datetime\n\ncurrent_time = datetime.datetime.now()\nprint(\"Name of student: [Your Name]\")\nprint(\"Roll no:         Batch: D1  Branch: AI&DS\")\nprint(\"Current date and time is:\", current_time)\nprint(\"*\" * 70)\n\nwhile True:\n    number = int(input(\"Enter a number: \"))\n    if number % 2 == 0:\n        print(f\"{number} is even.\")\n    else:\n        print(f\"{number} is odd.\")\n    cont = input(\"Do you want to check another number? (yes/no): \").strip().lower()\n    if cont != 'yes':\n        print(\"Goodbye!\")\n        break\n",
    "available": true,
    "premiumLocked": false
  },
  {
    "number": 9,
    "fileName": "9.py",
    "title": "Factorial of N",
    "aim": "Design a Python program to compute the factorial of a given integer N.",
    "code": "# Aim: Design a Python program to compute the factorial of a given integer N.\n\nimport datetime\n\ncurrent_time = datetime.datetime.now()\nprint(\"Name of student: [Your Name]\")\nprint(\"Roll no:         Batch: D1  Branch: AI&DS\")\nprint(\"Current date and time is:\", current_time)\nprint(\"*\" * 70)\n\nwhile True:\n    num = int(input(\"Enter the number: \"))\n    if num < 0:\n        print(\"Factorial is not defined for negative numbers.\")\n        continue\n    factorial = 1\n    for i in range(1, num + 1):\n        factorial *= i\n    print(f\"The factorial of {num} is {factorial}\")\n    choice = input(\"Do you want to check another number? (yes/no): \").strip().lower()\n    if choice not in ['yes', 'y']:\n        print(\"Goodbye!\")\n        break\n",
    "available": true,
    "premiumLocked": false
  },
  {
    "number": 10,
    "fileName": "10.py",
    "title": "Prime Number Checker",
    "aim": "Using function, write a Python program to analyze the input number is prime or not.",
    "code": "# Aim: Using function, write a Python program to analyze the input number is prime or not.\n\nimport datetime\n\ncurrent_time = datetime.datetime.now()\nprint(\"Name of student: [Your Name]\")\nprint(\"Roll no:         Batch: D1  Branch: AI&DS\")\nprint(\"Current date and time is:\", current_time)\nprint(\"*\" * 70)\n\ndef is_prime(number):\n    if number < 2:\n        return False\n    for i in range(2, int(number ** 0.5) + 1):\n        if number % i == 0:\n            return False\n    return True\n\nnum = int(input(\"Enter a number to check if it is prime: \"))\nif is_prime(num):\n    print(f\"{num} is a prime number.\")\nelse:\n    print(f\"{num} is not a prime number.\")\n",
    "available": true,
    "premiumLocked": false
  }
];
window.EXPERIMENTS_LAST_UPDATED = "";
