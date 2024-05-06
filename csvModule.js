const fs = require('fs');
const path = require('path');


// Function to get students from CSV file
function readcsv(filepath) {
  const CSV_FILE_PATH = path.join(__dirname, filepath);
  const data = fs.readFileSync(CSV_FILE_PATH, 'utf8');
  const rows = data.split('\n');
  const csvdata = [];

  rows.forEach(row => {
    const cells = row.trim().split(';');
    if (cells.length > 0) {
      const name = cells[0];
      const school = cells[1];
      csvdata.push({ name, school });
    }
  });

  return csvdata;
}

// Function to add a new student to the CSV file
function addStudent(name, school) {
  const CSV_FILE_PATH = path.join(__dirname, ('students_info.csv'));
  const newStudentCSV = `\n${name};${school}`;
  fs.appendFileSync(CSV_FILE_PATH, newStudentCSV);
}

module.exports = { readcsv, addStudent };
