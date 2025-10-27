#!/bin/bash

PORT=${1:-8000}

echo "======================================"
echo "  Vertama Static Site Local Server"
echo "======================================"
echo ""
echo "Starting local web server..."
echo ""

# Check which Python version is available
if command -v python3 &> /dev/null; then
    echo "✓ Using Python 3"
    echo "✓ Server starting at http://localhost:${PORT}"
    echo ""
    echo "Pages available:"
    echo "  • German:  http://localhost:${PORT}"
    echo "  • English: http://localhost:${PORT}/healthcare-services/"
    echo "  • French:  http://localhost:${PORT}/fr/healthcare-services-2/"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    cd docs && python3 -m http.server ${PORT}
elif command -v python &> /dev/null; then
    echo "✓ Using Python 2"
    echo "✓ Server starting at http://localhost:${PORT}"
    echo ""
    cd docs && python -m SimpleHTTPServer ${PORT}
else
    echo "❌ Python not found. Please install Python or use another method:"
    echo ""
    echo "Alternative commands:"
    echo "  • PHP:    php -S localhost:${PORT}"
    echo "  • Node:   npx http-server -p ${PORT}"
    echo ""
fi
