
// Bundle optimization script
// Run with: node scripts/optimize-bundle.js

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Configuration
const config = {
  purgeCSS: true,
  minifyJS: true,
  optimizeImages: true,
  outputStats: true
};

console.log('Starting bundle optimization...');

// Run PurgeCSS to remove unused styles
if (config.purgeCSS) {
  console.log('Running PurgeCSS...');
  exec('npx purgecss --css dist/**/*.css --content dist/index.html dist/**/*.js --output dist', 
    (err, stdout, stderr) => {
      if (err) {
        console.error('PurgeCSS error:', stderr);
      } else {
        console.log('CSS optimized successfully');
        reportSavings('CSS');
      }
    });
}

// Minify JavaScript if needed
if (config.minifyJS) {
  console.log('Optimizing JavaScript bundles...');
  exec('npx terser dist/**/*.js --compress --mangle --output dist',
    (err, stdout, stderr) => {
      if (err) {
        console.error('JavaScript optimization error:', stderr);
      } else {
        console.log('JavaScript optimized successfully');
        reportSavings('JavaScript');
      }
    });
}

// Report file size savings
function reportSavings(type) {
  const beforeSize = getFolderSize('dist/assets');
  console.log(`${type} optimization complete. Bundle size: ${(beforeSize / 1024).toFixed(2)} KB`);
}

// Get folder size recursively
function getFolderSize(folderPath) {
  let totalSize = 0;
  
  function getAllFiles(dirPath) {
    const files = fs.readdirSync(dirPath);
    
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      if (fs.statSync(filePath).isDirectory()) {
        getAllFiles(filePath);
      } else {
        totalSize += fs.statSync(filePath).size;
      }
    });
  }
  
  getAllFiles(folderPath);
  return totalSize;
}

console.log('Bundle optimization complete!');
