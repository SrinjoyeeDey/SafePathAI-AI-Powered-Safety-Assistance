#!/bin/bash

# SafePathAI Docker Setup Test Script
# This script validates the Docker configuration

echo "🐳 SafePathAI Docker Setup Test"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    if [ $2 -eq 0 ]; then
        echo -e "${GREEN}✅ $1${NC}"
    else
        echo -e "${RED}❌ $1${NC}"
    fi
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Check if Docker is running
echo "Checking Docker status..."
docker info > /dev/null 2>&1
print_status "Docker is running" $?

# Check Docker Compose configuration
echo "Validating docker-compose.yml..."
docker-compose config > /dev/null 2>&1
print_status "docker-compose.yml is valid" $?

# Check if required files exist
echo "Checking required files..."

files=(
    "docker-compose.yml"
    "backend/Dockerfile"
    "frontend/Dockerfile"
    "backend/.dockerignore"
    "frontend/.dockerignore"
    "frontend/nginx.conf"
    "backend/env.example"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        print_status "$file exists" 0
    else
        print_status "$file exists" 1
    fi
done

# Check if .env file exists (optional)
if [ -f "backend/.env" ]; then
    print_status "backend/.env exists" 0
else
    print_warning "backend/.env not found - you'll need to create it from env.example"
fi

# Test Docker build contexts
echo "Testing Docker build contexts..."

# Test backend build context
echo "Checking backend build context..."
if [ -f "backend/package.json" ]; then
    print_status "backend/package.json found" 0
else
    print_status "backend/package.json found" 1
fi

# Test frontend build context
echo "Checking frontend build context..."
if [ -f "frontend/package.json" ]; then
    print_status "frontend/package.json found" 0
else
    print_status "frontend/package.json found" 1
fi

# Check port availability
echo "Checking port availability..."
ports=(3000 4000 27017)

for port in "${ports[@]}"; do
    if lsof -i :$port > /dev/null 2>&1; then
        print_warning "Port $port is in use"
    else
        print_status "Port $port is available" 0
    fi
done

echo ""
echo "🎉 Docker setup validation complete!"
echo ""
echo "Next steps:"
echo "1. Create backend/.env file from backend/env.example"
echo "2. Update environment variables with your API keys"
echo "3. Run: docker-compose up -d"
echo "4. Access the app at http://localhost:3000"
echo ""
echo "For more information, see DOCKER.md"
