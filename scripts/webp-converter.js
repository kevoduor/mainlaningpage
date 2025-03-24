
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
    { suffix: '', width: 1200, quality: 82 },
    { suffix: '-900w', width: 900, quality: 82 },
    { suffix: '-600w', width: 600, quality: 78 }, // Mobile optimized
    { suffix: '-450w', width: 450, quality: 78 }, // Mobile specific
    { suffix: '-300w', width: 300, quality: 78 }, // Mobile optimized
    { suffix: '-mobile', width: 480, quality: 72 }, // Highly optimized for mobile
    { suffix: '-preview', width: 20, quality: 25 } // Tiny preview for blur-up technique
  ],
  includeOriginal: true, // Keep original files
  avifSupport: false, // Set to true to also generate AVIF files (better compression but slower)
  concurrency: 4, // Number of concurrent operations
  mobileOptimized: true // Enable special mobile optimizations
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
    
    // Skip if file already exists and is newer than source
    if (fs.existsSync(outputFilePath)) {
      const srcStat = fs.statSync(filePath);
      const destStat = fs.statSync(outputFilePath);
      
      if (destStat.mtime > srcStat.mtime) {
        console.log(`Skipping existing file: ${outputFilename}`);
        return;
      }
    }
    
    console.log(`Converting: ${filename} to ${outputFilename} @ ${size.width}px`);
    
    const resizeOptions = {
      width: size.width,
      withoutEnlargement: true,
      fit: 'inside'
    };
    
    // For mobile-specific images, use different optimization settings
    const sharpInstance = sharp(filePath)
      .resize(resizeOptions);
    
    // Mobile-specific optimizations
    if (config.mobileOptimized && (size.suffix === '-mobile' || size.suffix === '-300w' || size.suffix === '-450w')) {
      // Apply more aggressive compression for mobile
      await sharpInstance
        .webp({ 
          quality: size.quality, 
          reductionEffort: 6,  // Max compression effort
          nearLossless: false, // Use lossy compression for smaller files
          smartSubsample: true // Better chroma subsampling
        })
        .toFile(outputFilePath);
    } 
    // Preview image (tiny blur-up placeholder)
    else if (size.suffix === '-preview') {
      await sharpInstance
        .webp({ 
          quality: size.quality,
          reductionEffort: 6,
          nearLossless: false,
          alphaQuality: 50, // Lower alpha quality for preview
          smartSubsample: true
        })
        .toFile(outputFilePath);
    } 
    // Regular images
    else {
      await sharpInstance
        .webp({ 
          quality: size.quality,
          reductionEffort: 4
        })
        .toFile(outputFilePath);
    }
    
    // Also generate AVIF if configured (much better compression but slower)
    if (config.avifSupport) {
      const avifFilename = `${baseName}${size.suffix}.avif`;
      const avifFilePath = path.join(outputPath, avifFilename);
      
      // Skip if AVIF exists and is newer
      if (!fs.existsSync(avifFilePath) || 
          (fs.existsSync(avifFilePath) && fs.statSync(filePath).mtime > fs.statSync(avifFilePath).mtime)) {
        await sharp(filePath)
          .resize(resizeOptions)
          .avif({ 
            quality: size.quality,
            effort: 7 // Higher quality for AVIF (max is 9, but very slow)
          })
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
