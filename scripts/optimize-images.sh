
#!/bin/bash

# Image optimization script for WebP conversion
# This script converts all PNG/JPG images to optimized WebP format
# Usage: ./optimize-images.sh [directory]

# Default source directory
SOURCE_DIR=${1:-"public/lovable-uploads"}
echo "Starting image optimization for $SOURCE_DIR..."

# Check if required tools exist
if ! command -v convert &> /dev/null; then
  echo "ImageMagick not found. Please install it:"
  echo "  Ubuntu: sudo apt-get install imagemagick"
  echo "  macOS: brew install imagemagick"
  exit 1
fi

if ! command -v cwebp &> /dev/null; then
  echo "WebP tools not found. Please install them:"
  echo "  Ubuntu: sudo apt-get install webp"
  echo "  macOS: brew install webp"
  exit 1
fi

# Create optimized WebP versions with different sizes for responsive images
process_image() {
  local input_file="$1"
  local filename=$(basename -- "$input_file")
  local name="${filename%.*}"
  local dir=$(dirname "$input_file")
  
  echo "Processing: $input_file"
  
  # Create full-size WebP version
  cwebp -q 82 "$input_file" -o "$dir/$name.webp"
  
  # Create 600w version
  cwebp -q 80 -resize 600 0 "$input_file" -o "$dir/$name-600w.webp"
  
  # Create 450w version for mobile
  cwebp -q 78 -resize 450 0 "$input_file" -o "$dir/$name-450w.webp"
  
  # Create 300w version for mobile thumbnails
  cwebp -q 75 -resize 300 0 "$input_file" -o "$dir/$name-300w.webp"
  
  # Create tiny preview (20px) for blur-up technique
  cwebp -q 40 -resize 20 0 "$input_file" -o "$dir/$name-preview.webp"
  
  echo "✓ Created WebP versions for $filename"
}

# Process all images
find "$SOURCE_DIR" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) | while read file; do
  process_image "$file"
done

echo "Image optimization complete!"
