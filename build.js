const fs = require('fs');
const path = require('path');

const files = [
  'src/data/tripData.js',
  'src/data/checklistData.js',
  'src/data/budgetData.js',
  'src/services/storage.js',
  'src/services/navigation.js',
  'src/components/Modal.js',
  'src/components/Timeline.js',
  'src/components/Checklist.js',
  'src/components/Budget.js',
  'src/components/Notes.js',
  'src/app.js'
];

const output = files.map(f => fs.readFileSync(path.join(__dirname, f), 'utf8')).join('\n\n');
fs.writeFileSync(path.join(__dirname, 'script.js'), output);
console.log('Built script.js');
