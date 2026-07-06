# Todo App

Ứng dụng Todo App với frontend React + TypeScript và backend Express + MongoDB.

## Yêu cầu
- Node.js 20+
- npm
- Docker + Docker Compose (nếu chạy bằng container)

## Chạy local

### 1. Cài đặt dependencies và môi trường

Backend:
```bash
cd backend
cp .env.example .env
npm install
```

Frontend:
```bash
cd frontend
npm install
```

### 2. Chạy backend
```bash
cd backend
npm run start
```

Backend sẽ chạy tại:
- http://localhost:5001
- API health: http://localhost:5001/api/health

### 3. Chạy frontend
```bash
cd frontend
npm run dev
```

Frontend sẽ chạy tại:
- http://localhost:5173

## Chạy bằng Docker

Từ thư mục gốc:
```bash
docker compose up --build
```

Sau khi container chạy xong:
- Frontend: http://localhost:5173
- Backend: http://localhost:5001
- API health: http://localhost:5001/api/health

## Dừng Docker
```bash
docker compose down
```

## Xóa dữ liệu MongoDB volume
```bash
docker compose down -v
```
