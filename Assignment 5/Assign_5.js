console.log("Question 1:");
let a = parseInt(prompt("Enter first number:"));
let b = parseInt(prompt("Enter second number:"));
function computeTwoNumbers(a, b) {
    console.log("Number 1:", a, " Number 2:", b);
    console.log("Sum:", a + b);
    console.log("Difference (a - b):", a - b);
    console.log("Product:", a * b);
    if (b === 0) {
        console.log("Quotient: Cannot divide by zero");
    } else {
        console.log("Quotient (a / b):", a / b);
    }
}

computeTwoNumbers(a,b);

console.log("Question 2:");
function arrayTasks(arr) {
    console.log("Array:", arr);
    console.log("Largest:", Math.max(...arr));
    console.log("Smallest:", Math.min(...arr));
    console.log("Ascending order:", [...arr].sort((a, b) => a - b));
    console.log("Descending order:", [...arr].sort((a, b) => b - a));
}

arrayTasks([5, 1, 3, 9, 2]);

console.log("Question 3:");
function CheckForm(name, email, age) {
    if (!name || name.trim() === "") {
    console.log("Name cannot be empty.");
    return;
    }


    function simpleEmailCheck(email) {
    if (email.includes("@") && email.includes(".")) {
        console.log("Valid email");
        } else {
        console.log("Invalid email");
        }
    }


    if (isNaN(age) || age < 18 || age > 100) {
    console.log("Age must be between 18 and 100.");
    return;
    }

console.log("Validation successful:", { name, email, age });

}

CheckForm("Gaganbir Singh", "gsingh1_be23@gmail.com", 21);

console.log("Question 4:");

let student = {
name: "Amit",
age: 20,
grades:{ math: 85, 
        english: 90 }
};
function addProperty(key, value) {
student[key] = value;
}
function updateGrade(subject, grade) {
student.grades[subject] = grade;
}
function display() {
console.log("Student info:", student);
}
addProperty("class", "12A");
updateGrade("science", 92);
display();

console.log("Question 5:");
function processArray(arr) {
const evens = arr.filter(n => n % 2 === 0);
const doubled = evens.map(n => n * 2);
const sum = doubled.reduce((acc, cur) => acc + cur, 0);
console.log("Original array:", arr);
console.log("Evens :", evens);
console.log("After doubling:", doubled);
console.log("Sum:", sum);
}
processArray([4, 2, 3, 8, 6]);