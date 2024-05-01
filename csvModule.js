const fs = require('fs');
const path = require('path');

const CSV_FILE_PATH = path.join(__dirname, 'students_info.csv');

// Function to get students from CSV file
function getStudents() {
  const data = fs.readFileSync(CSV_FILE_PATH, 'utf8');
  const rows = data.split('\n');
  const students = [];

  rows.forEach(row => {
    const cells = row.trim().split(';');
    if (cells.length > 0) {
      const name = cells[0];
      const school = cells[1];
      students.push({ name, school });
    }
  });

  return students;
}

// Function to add a new student to the CSV file
function addStudent(name, school) {
  const newStudentCSV = `\n${name};${school}`;
  fs.appendFileSync(CSV_FILE_PATH, newStudentCSV);
}

module.exports = { getStudents, addStudent };
