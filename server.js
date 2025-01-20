const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Gas Station Salary Calculator API!');
});

// Example salary calculation route
app.post('/calculate-salary', (req, res) => {
    const { baseSalary, hoursWorked, overtimeHours, bonus, deductions } = req.body;

    // Default rates
    const hourlyRate = baseSalary / 160; // Assuming 160 working hours in a month
    const overtimeRate = hourlyRate * 1.5; // Overtime rate: 1.5 times the hourly rate

    // Calculate salary based on hours worked and overtime hours
    const regularSalary = hourlyRate * hoursWorked; // Regular salary for hours worked
    const overtimeSalary = overtimeHours * overtimeRate; // Overtime salary
    const totalSalary = regularSalary + overtimeSalary + bonus - deductions;

    // Return the result as plain numbers (no formatting)
    res.json({
        baseSalary,
        hoursWorked,
        overtimeHours,
        bonus,
        deductions,
        totalSalary: totalSalary.toFixed(0)  // Remove decimals for simplicity
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
