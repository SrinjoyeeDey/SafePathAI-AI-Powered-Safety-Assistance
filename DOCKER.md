# SafePathAI Docker Documentation

## Overview

This document provides comprehensive information about Dockerizing the SafePathAI application. The project uses Docker and Docker Compose to containerize both the frontend (React + Vite) and backend (Node.js + Express) services, along with MongoDB for data persistence.

## Architecture

The Docker setup consists of three main services:

1. **Frontend Service**: React application served by Nginx
2. **Backend Service**: Node.js Express API server
3. **MongoDB Service**: Database for data persistence

## Files Structure

```
SafePathAI/
├── docker-compose.yml          # Development environment
├── docker-compose.prod.yml     # Production environment
├── backend/
│   ├── Dockerfile             # Backend container configuration
│   ├── .dockerignore          # Files to exclude from backend build
│   └── env.example            # Environment variables template
├── frontend/
│   ├── Dockerfile             # Frontend container configuration
│   ├── .dockerignore          # Files to exclude from frontend build
│   └── nginx.conf             # Nginx configuration for frontend
└── nginx/                     # Production reverse proxy config
    ├── nginx.conf
    └── ssl/                   # SSL certificates
```

## Development Setup

### Prerequisites

- Docker 20.10+
- Docker Compose 2.0+
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App.git
   cd SafePathAI-AI-Powered-Safety-Assistance-App
   ```

2. **Configure environment variables**
   ```bash
   cp backend/env.example backend/.env
   # Edit backend/.env with your API keys
   ```

3. **Start all services**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000/api
   - MongoDB: localhost:27017

## Service Details

### Backend Service

**Dockerfile Features:**
- Multi-stage build for optimization
- Node.js 18 Alpine base image
- Non-root user for security
- Health check endpoint
- Production-ready configuration

**Environment Variables:**
- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port (default: 4000)
- `MONGO_URI`: MongoDB connection string
- `JWT_ACCESS_SECRET`: JWT access token secret
- `JWT_REFRESH_SECRET`: JWT refresh token secret
- `OPENAI_API_KEY`: OpenAI API key
- `MAPBOX_API_KEY`: Mapbox API key
- `TWILIO_*`: Twilio SMS service credentials

### Frontend Service

**Dockerfile Features:**
- Multi-stage build with Nginx
- React + Vite build process
- Optimized Nginx configuration
- Static asset caching
- Security headers
- Health check endpoint

**Features:**
- Client-side routing support
- Gzip compression
- Static asset caching
- Security headers
- CSP (Content Security Policy)

### MongoDB Service

**Configuration:**
- MongoDB 7.0 official image
- Persistent data storage
- Authentication enabled
- Health checks
- Initialization scripts support

## Docker Commands

### Basic Commands

```bash
# Start all services
docker-compose up -d

# Start with logs
docker-compose up

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
```

### Build Commands

```bash
# Rebuild all images
docker-compose build

# Rebuild specific service
docker-compose build backend

# Force rebuild without cache
docker-compose build --no-cache backend
```

### Management Commands

```bash
# Restart specific service
docker-compose restart backend

# Scale services
docker-compose up -d --scale backend=2

# Execute commands in running container
docker-compose exec backend sh
docker-compose exec mongodb mongosh
```

## Health Checks

All services include health checks:

```bash
# Check service status
docker-compose ps

# Manual health checks
curl http://localhost:4000/api/health  # Backend
curl http://localhost:3000/health      # Frontend
```

## Troubleshooting

### Common Issues

1. **Port conflicts**
   ```bash
   # Check what's using the port
   lsof -i :3000
   lsof -i :4000
   
   # Stop conflicting services or change ports
   ```

2. **MongoDB connection issues**
   ```bash
   # Check MongoDB container status
   docker-compose ps mongodb
   
   # View MongoDB logs
   docker-compose logs mongodb
   ```

3. **Build failures**
   ```bash
   # Clear Docker cache
   docker system prune -a
   
   # Rebuild without cache
   docker-compose build --no-cache
   ```

4. **Environment variables not loading**
   ```bash
   # Verify .env file exists
   ls -la backend/.env
   
   # Check environment in container
   docker-compose exec backend env
   ```

### Debugging

```bash
# Access container shell
docker-compose exec backend sh
docker-compose exec frontend sh

# View container processes
docker-compose exec backend ps aux

# Check container resources
docker stats
```

## Production Deployment

### Environment Setup

1. **Create production environment file**
   ```bash
   cp backend/env.example backend/.env.prod
   # Update with production values
   ```

2. **Use production compose file**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Security Considerations

1. **Change default passwords**
2. **Use strong JWT secrets**
3. **Enable SSL/TLS**
4. **Use Docker secrets for sensitive data**
5. **Implement proper logging**
6. **Set up monitoring**

### Scaling

```bash
# Scale backend service
docker-compose up -d --scale backend=3

# Use load balancer for multiple instances
```

## Monitoring and Logging

### Log Management

```bash
# View all logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View logs with timestamps
docker-compose logs -t

# Limit log output
docker-compose logs --tail=100
```

### Resource Monitoring

```bash
# Monitor resource usage
docker stats

# Check container health
docker-compose ps
```

## Best Practices

1. **Use multi-stage builds** for smaller images
2. **Run as non-root user** for security
3. **Use .dockerignore** to exclude unnecessary files
4. **Implement health checks** for all services
5. **Use named volumes** for data persistence
6. **Set resource limits** in production
7. **Use environment variables** for configuration
8. **Keep images updated** with security patches

## Contributing

When contributing to Docker configuration:

1. Test changes locally
2. Update documentation
3. Ensure backward compatibility
4. Follow Docker best practices
5. Update environment variable documentation

## Support

For Docker-related issues:

1. Check this documentation
2. Review Docker logs
3. Check GitHub issues
4. Create new issue with Docker logs

---

**Last Updated**: $(date)
**Docker Version**: 20.10+
**Compose Version**: 2.0+
