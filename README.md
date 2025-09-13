# OSRM API Express Project

This project is a **Node.js + Express** application that integrates with the **OSRM API** (Open Source Routing Machine) to provide:

- Reverse geocoding (get address from coordinates)
- Route calculation (get route map between start and end coordinates)

It also includes a simple frontend (`index.html`) to visualize API responses.

---

## 🚀 Features

- REST APIs using Express.js
- Integration with OSRM API for routing & geocoding
- Frontend HTML page to test API results
- Dockerized for easy deployment
- GitHub Actions CI/CD pipeline with:
  - Build & dependency install
  - Security scans (Trivy, Gitleaks)
  - Docker build & push to Docker Hub
  - Run container in self-hosted runner
  - (Optional) SonarQube integration for code quality

---

## 📦 Installation

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/osrm-api.git
cd osrm-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run locally
```bash
npm start
```

App will be available at:  
👉 http://localhost:3000

---

## 🌍 API Endpoints

### 1. Get Address from Coordinates
**GET** `/api/address?lat=<latitude>&lon=<longitude>`

Example:
```bash
curl "http://localhost:3000/api/address?lat=52.5200&lon=13.4050"
```

Response:
```json
{
  "address": "Pariser Platz, Berlin, Germany"
}
```

---

### 2. Get Route Between Two Points
**GET** `/api/route?startLat=<lat1>&startLon=<lon1>&endLat=<lat2>&endLon=<lon2>`

Example:
```bash
curl "http://localhost:3000/api/route?startLat=52.5200&startLon=13.4050&endLat=52.5206&endLon=13.3862"
```

Response:
```json
{
  "distance": 2300,
  "duration": 320,
  "geometry": "polyline..."
}
```

---

## 🐳 Docker

### Build image
```bash
docker build -t rahulkallur/osrm-api:latest .
```

### Run container
```bash
docker run -d -p 3000:3000 --name osrm-api rahulkallur/osrm-api:latest
```

App will be available at:  
👉 http://localhost:3000

---

## ⚙️ CI/CD Pipeline

This project uses **GitHub Actions** for CI/CD.

### Workflow Highlights
- **Build**: Install dependencies on Node.js versions `18.x`, `20.x`, `22.x`
- **Security Checks**: Run **Trivy** (filesystem scan) and **Gitleaks** (secrets detection)
- **Docker**: Build and push image to Docker Hub
- **Run Container**: Start the built image in the self-hosted runner
- **SonarQube**: (Optional, documented but commented out for now)

You can find the pipeline in `.github/workflows/cicd.yml`.

---

## 📊 SonarQube Integration

This project is ready for **SonarQube integration**.  
- Config file: `sonar-project.properties`  
- GitHub Actions step: `sonar-scan` (currently in docs, not active in pipeline)  

Refer to [SonarQube Docs](https://docs.sonarsource.com/) for setup details.

---

## 📂 Project Structure

```
.
├── public/
│   └── index.html        # Frontend UI
├── src/
│   └── app.js            # Express app with OSRM APIs
├── Dockerfile
├── package.json
├── sonar-project.properties
└── .github/
    └── workflows/
        └── cicd.yml      # CI/CD pipeline
```

---

## 📝 License
MIT License
