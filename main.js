#! /usr/bin/env node
import inquirer from "inquirer";
console.log("\t\n WELCOME TO MY STUDENT SYSTEM MANAGEMENT ");
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++,
            this.name = name,
            this.courses = [],
            this.balance = 100;
    }
    // METHOD TO ENROLL A STUDENT IN COURSE
    enroll_course(course) {
        this.courses.push(course);
    }
    // METHOD TO VIEW BALANCE
    view_balance() {
        console.log(`Balance for ${this.name}: ${this.balance}`);
    }
    // METHOD TO PAY STUDENT FEES
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`${amount} Fees paid Sucessfully for ${this.name}. Your balance is ${this.balance}`);
    }
    // METHOD TO DISPLAY STATUS
    show_status() {
        console.log(`ID: ${this.id}`);
        console.log(`NAME:${this.name}`);
        console.log(`COURSES: ${this.courses}`);
        console.log(`BALANCE:${this.balance}`);
    }
}
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    // METHOD TO ADD STUDENT
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student ${name} added sucessfully.Student ID:${student.id}`);
    }
    // METHOD TO FIND STUDENT BY STUDENT ID
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
    enroll_course(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} sucessfully.`);
        }
    }
    // METHOD TO VIEW A STUDENT BALANCE
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("Student not found.Please enter a correct ID");
        }
    }
    //METHOD TO PAY FEES
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Student not found.Please enter a correct ID");
        }
    }
    // METHOD TO DISPLAY STUDENT STATUS
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
}
// MAIN FUNCTION TO RUN THE PROGRAM
async function main() {
    console.log("-".repeat(70));
    console.log("\t Welcome to 'CodewithAreeba' - Student Management System");
    console.log("-".repeat(70));
    let student_manager = new Student_manager();
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select An Option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);
        // USING SWITCH STATEMENT TO HANDLE USER CHOICE
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name"
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID:"
                    }, {
                        name: "course",
                        type: "string",
                        message: "Enter course you want to enroll:"
                    }
                ]);
                student_manager.enroll_course(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter student ID:"
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID to pay fees:"
                    }, {
                        name: "amount",
                        type: "number",
                        message: "Enter amount to pay:"
                    }
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID:"
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("Exiting..");
                process.exit();
        }
    }
}
main();
