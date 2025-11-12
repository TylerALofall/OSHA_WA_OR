#!/bin/bash

# Sandra's Roofing Safety Platform - Easy Starter Script
# Double-click this file to start the platform!

clear
echo "=================================="
echo "☕ Sandra's Safety Platform ☕"
echo "=================================="
echo ""
echo "Starting up your safety platform..."
echo "Grab a coffee, this takes 10 seconds! ☕"
echo ""

# Navigate to the roofing platform directory
cd "$(dirname "$0")/roofing-safety-platform"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 First time setup - installing dependencies..."
    echo "This will take 2-3 minutes. Go get that coffee! ☕"
    npm install
    echo ""
    echo "✅ Setup complete!"
    echo ""
fi

# Start the development server
echo "🚀 Starting the platform..."
echo ""
echo "=================================="
echo "✅ PLATFORM IS READY!"
echo "=================================="
echo ""
echo "👉 Open your web browser and go to:"
echo ""
echo "    http://localhost:3000"
echo ""
echo "=================================="
echo ""
echo "💡 Tips:"
echo "   - Keep this window open while using the platform"
echo "   - Press Ctrl+C to stop the platform"
echo "   - Close the browser to exit"
echo ""
echo "☕ Coffee-fueled compliance starts now!"
echo ""

# Start the dev server
npm run dev
