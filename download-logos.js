const fs = require('fs');
const https = require('https');

if (!fs.existsSync('public/logos')) {
  fs.mkdirSync('public/logos', { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        console.error('Failed to download ' + url, response.statusCode);
        resolve();
      }
    }).on('error', (err) => {
      console.error('Error downloading ' + url, err);
      resolve();
    });
  });
}

async function run() {
  await download('https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', 'public/logos/amazon.svg');
  await download('https://upload.wikimedia.org/wikipedia/commons/e/e1/Flipkart_logo.svg', 'public/logos/flipkart.svg');
  await download('https://upload.wikimedia.org/wikipedia/commons/9/91/Blinkit-yellow-rounded.svg', 'public/logos/blinkit.svg');
  await download('https://upload.wikimedia.org/wikipedia/commons/5/53/Zepto_Logo.svg', 'public/logos/zepto.svg');
  await download('https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png', 'public/logos/instamart.png');
  console.log('Logos downloaded successfully!');
}

run();
