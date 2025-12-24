# Deployment Guide

## 1. Backend (FastAPI)
**Platform**: Render / Railway / Fly.io

### Docker Method (Recommended)
1. Create a `Dockerfile` in `/backend`:
```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
# Expose port
EXPOSE 8000
# Run command (Note: adjusting for directory structure)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```
2. Build and push to your container registry.
3. Set environment variables:
   - `DATABASE_URL`: Your Postgres connection string.

### Manual / Shell Method
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port 8000`

## 2. Frontend (React + Vite)
**Platform**: Vercel / Netlify

1. **Connect Repository**: Link your GitHub repo to Vercel.
2. **Build Settings**:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. **Environment Variables**:
   - `VITE_API_URL`: The URL of your deployed Backend (e.g., `https://maketronics-api.onrender.com/api/v1`).
   - *Note*: You will need to update `src/lib/api.ts` to use this variable instead of hardcoded localhost.

## 3. Environment Configuration
### Modify `frontend/src/lib/api.ts` for Production
Update the `API_BASE` const:
```typescript
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";
```
