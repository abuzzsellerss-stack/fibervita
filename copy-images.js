const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\manis\\.gemini\\antigravity-ide\\brain\\9ecbea94-86db-40d8-9dea-8af1611d705a';
const destDir = path.join(__dirname, 'public');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
}

// Copying the exactly generated images from the user's provided files
fs.copyFileSync(path.join(srcDir, 'orange_actual_gen_1791391613338.png'), path.join(destDir, 'orange.png'));
fs.copyFileSync(path.join(srcDir, 'strawberry_actual_gen_1791391651881.png'), path.join(destDir, 'strawberry.png'));
fs.copyFileSync(path.join(srcDir, 'plain_actual_gen_1791391680675.png'), path.join(destDir, 'plain.png'));
fs.copyFileSync(path.join(srcDir, 'hero_drink_1791391383102.png'), path.join(destDir, 'hero.png'));
fs.copyFileSync(path.join(srcDir, 'science_1791391443469.png'), path.join(destDir, 'science.png'));
fs.copyFileSync(path.join(srcDir, 'recipes_1791391456481.png'), path.join(destDir, 'recipes.png'));

console.log('Images derived strictly from your provided photos have been successfully copied!');
