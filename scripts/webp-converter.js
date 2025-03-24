
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
    { suffix: '-300w', width: 300 },
    { suffix: '-preview', width: 30, quality: 60 } // Tiny preview for blur-up technique
  ],
  quality: 82, // WebP quality (0-100)
  includeOriginal: true, // Keep original files
  avifSupport: false, // Set to true to also generate AVIF files (better compression but slower)
  concurrency: 4 // Number of concurrent operations
};

// Ensure output directory exists
fs.ensureDirSync(config.outputDir);

// Find all image files
const imageFiles = glob.sync(`${config.inputDir}/**/*.{jpg,jpeg,png,gif}`);

console.log(`Found ${imageFiles.length} images to process`);

// Process each size variant of an image
async function processImageSize(filePath, size) {
  try {
    const filename = path.basename(filePath);
    const fileExt = path.extname(filename);
    const baseName = path.basename(filename, fileExt);
    const relativeDir = path.relative(config.inputDir, path.dirname(filePath));
    const outputPath = path.join(config.outputDir, relativeDir);
    
    // Ensure output subdirectory exists
    fs.ensureDirSync(outputPath);
    
    const outputFilename = `${baseName}${size.suffix}.webp`;
    const outputFilePath = path.join(outputPath, outputFilename);
    
    // Skip if file already exists
    if (fs.existsSync(outputFilePath)) {
      console.log(`Skipping existing file: ${outputFilename}`);
      return;
    }
    
    console.log(`Converting: ${filename} to ${outputFilename} @ ${size.width}px`);
    
    const resizeOptions = {
      width: size.width,
      withoutEnlargement: true,
      fit: 'inside'
    };
    
    // For the preview image, we use a different quality setting
    const quality = size.quality || config.quality;
    
    await sharp(filePath)
      .resize(resizeOptions)
      .webp({ quality })
      .toFile(outputFilePath);
    
    // Also generate AVIF if configured
    if (config.avifSupport) {
      const avifFilename = `${baseName}${size.suffix}.avif`;
      const avifFilePath = path.join(outputPath, avifFilename);
      
      if (!fs.existsSync(avifFilePath)) {
        await sharp(filePath)
          .resize(resizeOptions)
          .avif({ quality })
          .toFile(avifFilePath);
        console.log(`✓ Generated AVIF: ${avifFilename}`);
      }
    }
    
    console.log(`✓ Generated: ${outputFilename}`);
  } catch (err) {
    console.error(`Error processing size ${size.width}px:`, err);
  }
}

// Process each image with all its size variants
async function processImage(filePath) {
  const promises = config.sizes.map(size => processImageSize(filePath, size));
  await Promise.all(promises);
}

// Process images in batches to limit concurrent operations
async function processImagesInBatches() {
  const batchSize = config.concurrency;
  const batches = [];
  
  for (let i = 0; i < imageFiles.length; i += batchSize) {
    batches.push(imageFiles.slice(i, i + batchSize));
  }
  
  for (const batch of batches) {
    await Promise.all(batch.map(filePath => processImage(filePath)));
  }
}

processImagesInBatches()
  .then(() => {
    console.log('Image conversion complete!');
  })
  .catch(err => {
    console.error('Error during image conversion:', err);
    process.exit(1);
  });
