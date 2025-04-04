
/**
 * Image Optimization Script
 * - Converts images to WebP format
 * - Resizes images to multiple sizes
 * - Compresses images for better performance
 * 
 * Usage: node scripts/image-optimizer.js
 * Requires: npm install sharp fs-extra glob
 */

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

// Check if required packages are installed
try {
  require.resolve('sharp');
  require.resolve('fs-extra');
  require.resolve('glob');
} catch (e) {
  console.log('Installing required dependencies...');
  execSync('npm install --no-save sharp fs-extra glob');
  console.log('Dependencies installed!');
}

// Now that we're sure the packages are installed, require them
const sharp = require('sharp');
const glob = require('glob');

// Configuration
const config = {
  inputDir: 'public/lovable-uploads',
  outputDir: 'public/lovable-uploads',
  sizes: [
    { width: 1200, suffix: '' },          // Full size
    { width: 900, suffix: '-900w' },      // Large screens
    { width: 600, suffix: '-600w' },      // Medium screens
    { width: 450, suffix: '-450w' },      // Mobile screens
    { width: 300, suffix: '-300w' },      // Thumbnails & small screens
    { width: 20, suffix: '-preview' }     // Tiny preview for blur-up technique
  ],
  quality: {
    default: 80,
    preview: 40,
    mobile: 75
  },
  logLevel: 'verbose' // 'verbose' or 'minimal'
};

console.log('Starting image optimization...');

// Find all image files
const imageFiles = glob.sync(`${config.inputDir}/**/*.{jpg,jpeg,png,gif}`);
if (config.logLevel === 'verbose') {
  console.log(`Found ${imageFiles.length} images to process`);
}

// Track progress
let completedImages = 0;
let skippedImages = 0;

// Process a single image with all size variants
async function processImage(filePath) {
  try {
    const fileName = path.basename(filePath);
    const fileExt = path.extname(fileName);
    const baseName = path.basename(fileName, fileExt);
    const relativePath = path.relative(config.inputDir, path.dirname(filePath));
    const outputPath = path.join(config.outputDir, relativePath);
    
    // Ensure output directory exists
    fs.ensureDirSync(outputPath);
    
    if (config.logLevel === 'verbose') {
      console.log(`Processing: ${fileName}`);
    }
    
    // Process each size variant
    const promises = config.sizes.map(async (size) => {
      const outputFilename = `${baseName}${size.suffix}.webp`;
      const outputFilePath = path.join(outputPath, outputFilename);
      
      // Check if file already exists and is newer than source
      if (fs.existsSync(outputFilePath)) {
        const srcStat = fs.statSync(filePath);
        const destStat = fs.statSync(outputFilePath);
        
        if (destStat.mtime > srcStat.mtime) {
          skippedImages++;
          return; // Skip this size as it's already up to date
        }
      }
      
      // Choose quality based on size
      let quality = config.quality.default;
      if (size.suffix === '-preview') {
        quality = config.quality.preview;
      } else if (size.suffix === '-300w' || size.suffix === '-450w') {
        quality = config.quality.mobile;
      }
      
      // Process image with sharp
      await sharp(filePath)
        .resize({ 
          width: size.width,
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ 
          quality,
          reductionEffort: size.suffix === '-preview' ? 6 : 4,
          nearLossless: size.suffix !== '-preview'
        })
        .toFile(outputFilePath);
        
      if (config.logLevel === 'verbose') {
        console.log(`  ✓ Created ${outputFilename}`);
      }
    });
    
    await Promise.all(promises);
    completedImages++;
    
    // Also create mobile-optimized version
    const mobileFilename = `${baseName}-mobile.webp`;
    const mobileFilePath = path.join(outputPath, mobileFilename);
    
    await sharp(filePath)
      .resize({ 
        width: 480,
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ 
        quality: 72,
        reductionEffort: 6,
        nearLossless: false
      })
      .toFile(mobileFilePath);
      
    if (config.logLevel === 'verbose') {
      console.log(`  ✓ Created ${mobileFilename} (mobile optimized)`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Process images in small batches to avoid memory issues
async function processAllImages() {
  const batchSize = 4; // Process 4 images concurrently
  const batches = [];
  
  for (let i = 0; i < imageFiles.length; i += batchSize) {
    batches.push(imageFiles.slice(i, i + batchSize));
  }
  
  let batchCount = 1;
  for (const batch of batches) {
    if (config.logLevel === 'minimal') {
      process.stdout.write(`Processing batch ${batchCount}/${batches.length}...\r`);
    }
    await Promise.all(batch.map(filePath => processImage(filePath)));
    batchCount++;
  }
  
  console.log(`\nImage optimization complete!`);
  console.log(`Processed: ${completedImages} images`);
  console.log(`Skipped: ${skippedImages} images (already up to date)`);
  console.log(`\nTo use these optimized images, update your image components to use the WebP versions.`);
}

// Run the image processing
processAllImages().catch(err => {
  console.error('Error during image processing:', err);
});
