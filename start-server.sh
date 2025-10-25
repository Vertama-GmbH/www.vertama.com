#!/bin/bash

echo "======================================"
echo "  Vertama Static Site Local Server"
echo "======================================"
echo ""
echo "Starting local web server..."
echo ""

# Check which Python version is available
if command -v python3 &> /dev/null; then
    echo "✓ Using Python 3"
    echo "✓ Server starting at http://localhost:8000"
    echo ""
    echo "Pages available:"
    echo "  • German:  http://localhost:8000"
    echo "  • English: http://localhost:8000/healthcare-services/"
    echo "  • French:  http://localhost:8000/fr/healthcare-services-2/"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    cd docs && python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✓ Using Python 2"
    echo "✓ Server starting at http://localhost:8000"
    echo ""
    cd docs && python -m SimpleHTTPServer 8000
else
    echo "❌ Python not found. Please install Python or use another method:"
    echo ""
    echo "Alternative commands:"
    echo "  • PHP:    php -S localhost:8000"
    echo "  • Node:   npx http-server -p 8000"
    echo ""
fi
