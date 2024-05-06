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

// Function to update school name in the CSV file
function updateSchool(studentId, newSchool, filepath) {
  const CSV_FILE_PATH = path.join(__dirname, filepath);
  const csvData = readCSV(filepath); // Read CSV data as array of objects

  // Update school name at index studentId using splice
  if (studentId >= 0 && studentId < csvData.length) {
    csvData.splice(studentId, 1, { name: csvData[studentId].name, school: newSchool });
  } else {
    throw new Error('Invalid student ID');
  }

  // Convert array of objects back to CSV format
  const updatedCSV = ['name;school'];
  csvData.forEach(student => {
    updatedCSV.push(`${student.name};${student.school}`);
  });

  // Write updated CSV data back to the file
  fs.writeFileSync(CSV_FILE_PATH, updatedCSV.join('\n'));
}


module.exports = { readcsv, addStudent, updateSchool };

