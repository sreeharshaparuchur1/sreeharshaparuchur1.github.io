#!/usr/bin/env python3
"""
Script to create placeholder images for Ishita Gupta's portfolio projects.
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder_image(text, filename, size=(160, 160), bg_color=(240, 240, 240), text_color=(100, 100, 100)):
    """Create a placeholder image with text."""
    # Create image
    img = Image.new('RGB', size, bg_color)
    draw = ImageDraw.Draw(img)
    
    # Try to use a default font, fallback to basic if not available
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 12)
    except:
        font = ImageFont.load_default()
    
    # Calculate text position to center it
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (size[0] - text_width) // 2
    y = (size[1] - text_height) // 2
    
    # Draw text
    draw.text((x, y), text, fill=text_color, font=font)
    
    # Save image
    img.save(filename)
    print(f"Created: {filename}")

def main():
    """Create all placeholder images."""
    # Ensure images directory exists
    if not os.path.exists('images'):
        os.makedirs('images')
    
    # Project images to create
    projects = [
        ("Humanoid Robotics", "humanoid_before.jpg"),
        ("Humanoid Robotics", "humanoid_after.jpg"),
        ("LLM Self-Correction", "llm_before.jpg"),
        ("LLM Self-Correction", "llm_after.jpg"),
        ("Visual SLAM", "vslam_before.jpg"),
        ("Visual SLAM", "vslam_after.jpg"),
        ("Robotics Simulator", "simulator_before.jpg"),
        ("Robotics Simulator", "simulator_after.jpg"),
        ("Multi-Robot GUI", "gui_before.jpg"),
        ("Multi-Robot GUI", "gui_after.jpg"),
        ("Warehouse System", "warehouse_before.jpg"),
        ("Warehouse System", "warehouse_after.jpg"),
        ("Google Cloud", "google_before.jpg"),
        ("Google Cloud", "google_after.jpg"),
        ("Speech Recognition", "asr_before.jpg"),
        ("Speech Recognition", "asr_after.jpg"),
        ("Face Recognition", "face_before.jpg"),
        ("Face Recognition", "face_after.jpg"),
        ("Music Segmentation", "music_before.jpg"),
        ("Music Segmentation", "music_after.jpg"),
    ]
    
    # Create each placeholder image
    for text, filename in projects:
        create_placeholder_image(text, f"images/{filename}")
    
    # Create a placeholder for Ishita's profile photo
    create_placeholder_image("Ishita\nGupta", "images/IshitaGupta.jpg", size=(200, 200), bg_color=(200, 220, 240), text_color=(80, 80, 80))

if __name__ == "__main__":
    main() 