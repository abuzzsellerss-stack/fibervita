const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\manis\\.gemini\\antigravity-ide\\brain\\9ecbea94-86db-40d8-9dea-8af1611d705a';
const destDir = path.join(__dirname, 'public');

const filesToCopy = [
  { src: 'strongman_wheat_1791397557995.png', dest: 'strongman_wheat.png' },
  { src: 'vintage_strongman_1791394822136.png', dest: 'strongman.png' }
];

filesToCopy.forEach(file => {
  const srcPath = path.join(srcDir, file.src);
  const destPath = path.join(destDir, file.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file.src} to ${file.dest}`);
  } else {
    console.error(`File not found: ${srcPath}`);
  }
});
