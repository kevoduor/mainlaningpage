
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

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "Error: cwebp is not installed. Please install the webp package."
    exit 1
fi

# Create WebP versions at different sizes
process_image() {
    local input_file="$1"
    local filename=$(basename -- "$input_file")
    local name="${filename%.*}"
    local output_dir=$(dirname "$input_file")
    
    echo "Processing: $filename"
    
    # Check if WebP versions already exist
    if [ -f "$output_dir/$name.webp" ] && [ -f "$output_dir/$name-900w.webp" ] && [ -f "$output_dir/$name-600w.webp" ] && [ -f "$output_dir/$name-300w.webp" ]; then
        echo "✓ WebP versions already exist for: $filename, skipping..."
        return 0
    fi
    
    # Create standard WebP version (max width 1200px)
    cwebp -q $QUALITY -resize 1200 0 "$input_file" -o "$output_dir/$name.webp"
    
    # Create 900w version
    cwebp -q $QUALITY -resize 900 0 "$input_file" -o "$output_dir/$name-900w.webp"
    
    # Create 600w version
    cwebp -q $QUALITY -resize 600 0 "$input_file" -o "$output_dir/$name-600w.webp"
    
    # Create 300w version
    cwebp -q $QUALITY -resize 300 0 "$input_file" -o "$output_dir/$name-300w.webp"
    
    # Create a placeholder/preview version (tiny, blurred version for faster loading)
    cwebp -q 60 -resize 20 0 "$input_file" -o "$output_dir/$name-preview.webp"
    
    echo "✓ Generated WebP versions for: $filename"
}

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

# Find all PNG and JPG files
find "$SOURCE_DIR" -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) | while read -r file; do
    process_image "$file"
done

echo "WebP conversion complete!"
echo "Don't forget to update your HTML to use picture elements or srcset attributes for responsive images."
