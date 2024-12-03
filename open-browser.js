const { exec } = require('child_process');
const platform = process.platform;

if (process.env.OPEN_BROWSER) {
  const url = 'http://localhost:8080/main.html';

  if (platform === 'darwin') {
    exec(`open ${url}`);
  } else if (platform === 'win32') {
    exec(`start ${url}`);
  } else if (platform === 'linux') {
    exec(`xdg-open ${url}`);
  } else {
    console.error('Unsupported platform');
  }
} else {
  console.log('No browser to open.');
}
