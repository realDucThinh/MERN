# Workout Management App

Ứng dụng quản lý bài tập thể dục với MERN Stack (MongoDB, Express, React, Node.js)

## Cấu trúc dự án

```
MERN/
├── backend/          # Backend API (Node.js + Express + MongoDB)
│   ├── controllers/  # Controllers xử lý logic
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   └── server.js     # Entry point
│
└── frontend/         # Frontend (React + TypeScript + Vite)
    ├── src/
    │   ├── components/  # React components
    │   ├── config.ts    # API configuration
    │   └── App.tsx      # Main app component
    └── package.json
```

## Cài đặt và chạy

### Backend

1. Di chuyển vào thư mục backend:
```bash
cd backend
```

2. Cài đặt dependencies (nếu chưa):
```bash
npm install
```

3. Tạo file `.env` với nội dung:
```
PORT=4000
MONGO_URL=your_mongodb_connection_string
```

4. Chạy server:
```bash
npm start
```

Server sẽ chạy tại: http://localhost:4000

### Frontend

1. Di chuyển vào thư mục frontend:
```bash
cd frontend
```

2. Cài đặt dependencies (đã cài):
```bash
npm install
```

3. File `.env` đã được tạo với cấu hình:
```
VITE_API_URL=http://localhost:4000
```

4. Chạy dev server:
```bash
npm run dev
```

Frontend sẽ chạy tại: http://localhost:5173 (hoặc cổng khác do Vite chỉ định)

## API Endpoints

Backend cung cấp các endpoints sau:

- `GET /api/workouts` - Lấy tất cả workouts
- `GET /api/workouts/:id` - Lấy một workout
- `POST /api/workouts` - Tạo workout mới
- `PATCH /api/workouts/:id` - Cập nhật workout
- `DELETE /api/workouts/:id` - Xóa workout

## Công nghệ sử dụng

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- CORS
- dotenv

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI Components
- Lucide React (icons)
- Sonner (toast notifications)

## Lưu ý

- Đảm bảo MongoDB đang chạy và connection string trong `.env` của backend là chính xác
- Backend phải chạy trước khi chạy frontend
- CORS đã được enable trên backend để cho phép frontend kết nối
