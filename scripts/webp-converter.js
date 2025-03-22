
/**
 * WebP Converter Utility Script
 * 
 * This script helps convert various image formats to WebP format with
 * multiple resolutions for responsive image handling.
 * 
 * Usage: 
 * 1. Install required packages:
 *    npm install sharp fs-extra glob
 * 
 * 2. Run the script:
 *    node scripts/webp-converter.js
 */

const sharp = require('sharp');
const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');

// Configuration
const config = {
  inputDir: 'public/lovable-uploads',
  outputDir: 'public/lovable-uploads',
  sizes: [
    { suffix: '', width: 1200 },
    { suffix: '-900w', width: 900 },
    { suffix: '-600w', width: 600 },
    { suffix: '-300w', width: 300 }
  ],
  quality: 80, // WebP quality (0-100)
  includeOriginal: true // Keep original files
};

// Ensure output directory exists
fs.ensureDirSync(config.outputDir);

// Find all image files
const imageFiles = glob.sync(`${config.inputDir}/**/*.{jpg,jpeg,png,gif}`);

console.log(`Found ${imageFiles.length} images to process`);

// Process each image
async function processImages() {
  for (const filePath of imageFiles) {
    const filename = path.basename(filePath);
    const fileExt = path.extname(filename);
    const baseName = path.basename(filename, fileExt);
    const relativeDir = path.relative(config.inputDir, path.dirname(filePath));
    const outputPath = path.join(config.outputDir, relativeDir);
    
    // Ensure output subdirectory exists
    fs.ensureDirSync(outputPath);
    
    // Process each size
    for (const size of config.sizes) {
      try {
        const outputFilename = `${baseName}${size.suffix}.webp`;
        const outputFilePath = path.join(outputPath, outputFilename);
        
        // Skip if file already exists
        if (fs.existsSync(outputFilePath)) {
          console.log(`Skipping existing file: ${outputFilename}`);
          continue;
        }
        
        console.log(`Converting: ${filename} to ${outputFilename} @ ${size.width}px`);
        
        await sharp(filePath)
          .resize({ 
            width: size.width,
            withoutEnlargement: true,
            fit: 'inside'
          })
          .webp({ quality: config.quality })
          .toFile(outputFilePath);
          
        console.log(`✓ Generated: ${outputFilename}`);
      } catch (err) {
        console.error(`Error processing ${filename} at size ${size.width}px:`, err);
      }
    }
  }
}

processImages()
  .then(() => {
    console.log('Image conversion complete!');
  })
  .catch(err => {
    console.error('Error during image conversion:', err);
    process.exit(1);
  });
