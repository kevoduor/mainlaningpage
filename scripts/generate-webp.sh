
#!/bin/bash

# Script to convert PNG/JPG images to WebP format with multiple resolutions
# Requires cwebp (from webp package)
# Install on Ubuntu: sudo apt-get install webp
# Install on macOS: brew install webp

echo "Starting WebP conversion..."

# Source directory
SOURCE_DIR="public/lovable-uploads"

# Quality setting for WebP (0-100)
QUALITY=82
MOBILE_QUALITY=78

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "Error: cwebp is not installed. Please install the webp package."
    exit 1
fi

# Process images in parallel (but limit to CPU count)
MAX_JOBS=$(nproc 2>/dev/null || sysctl -n hw.ncpu 2>/dev/null || echo 4)

# Create WebP versions at different sizes
process_image() {
    local input_file="$1"
    local filename=$(basename -- "$input_file")
    local name="${filename%.*}"
    local output_dir=$(dirname "$input_file")
    
    echo "Processing: $filename"
    
    # Check if WebP versions already exist and if source is newer
    if [ -f "$output_dir/$name.webp" ] && [ "$input_file" -ot "$output_dir/$name.webp" ]; then
        echo "✓ WebP versions up to date for: $filename, skipping..."
        return 0
    fi
    
    # Create standard WebP version (max width 1200px)
    cwebp -quiet -q $QUALITY -resize 1200 0 "$input_file" -o "$output_dir/$name.webp"
    
    # Create 900w version
    cwebp -quiet -q $QUALITY -resize 900 0 "$input_file" -o "$output_dir/$name-900w.webp"
    
    # Create 600w version - optimized for mobile
    cwebp -quiet -q $MOBILE_QUALITY -resize 600 0 "$input_file" -o "$output_dir/$name-600w.webp"
    
    # Create 300w version - highly optimized for mobile
    cwebp -quiet -q $MOBILE_QUALITY -resize 300 0 "$input_file" -o "$output_dir/$name-300w.webp"
    
    # Create a tiny placeholder/preview version (extra compressed for faster loading)
    cwebp -quiet -q 25 -resize 20 0 "$input_file" -o "$output_dir/$name-preview.webp"
    
    # Optimize for mobile screens specifically - 450px width
    cwebp -quiet -q $MOBILE_QUALITY -resize 450 0 "$input_file" -o "$output_dir/$name-mobile.webp"
    
    echo "✓ Generated WebP versions for: $filename"
}

export -f process_image
export QUALITY
export MOBILE_QUALITY
export SOURCE_DIR

# Allow specifying a single file to process
if [ "$1" ]; then
    if [ -f "$1" ]; then
        process_image "$1"
        echo "WebP conversion complete for $1!"
        exit 0
    else
        echo "Error: File $1 not found"
        exit 1
    fi
fi

# Find all PNG and JPG files and process them in parallel
find "$SOURCE_DIR" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) | xargs -n 1 -P "$MAX_JOBS" -I{} bash -c 'process_image "$@"' _ {}

echo "WebP conversion complete!"
echo "Don't forget to update your HTML to use picture elements or srcset attributes for responsive images."
