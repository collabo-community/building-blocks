const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

const scssDir = path.join(__dirname, 'scss');
const cssDir = path.join(__dirname, 'css');

const watcher = chokidar.watch(scssDir, { persistent: true });

watcher
  .on('unlink', filePath => {
    const relativePath = path.relative(scssDir, filePath);
    const cssMapPath = path.join(cssDir, relativePath.replace(/\.scss$/, '.css.map'));
    const cssPath = path.join(cssDir, relativePath.replace(/\.scss$/, '.css'));

    // Delete the corresponding .css and .css.map files
    if (fs.existsSync(cssMapPath)) {
      fs.unlinkSync(cssMapPath);
      console.log(`Deleted ${cssMapPath}`);
    }

    if (fs.existsSync(cssPath)) {
      fs.unlinkSync(cssPath);
      console.log(`Deleted ${cssPath}`);
    }
  })
  .on('error', error => console.error(`Watcher error: ${error}`));
