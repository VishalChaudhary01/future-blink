# Future Blink - AI Flow Builder

A node-based AI prompt interface built with the MERN stack. Where user can type a prompt into a box, click "Run", and see the AI's response in another box, connected by a line.

## How to Run

### 1. Clone the repo

```bash
git clone https://github.com/VishalChaudhary01/future-blink.git
cd future-blink
```

### 2. Backend Setup

```bash
cd backend
cp .env.example .env    # then fill in your MONGO_URI and OPENROUTER_API_KEY
npm install
npm run dev             # runs on http://localhost:5000
```

`.env` variables:

```env
PORT=5000
DATABASE_URL=your_mongodb_connection_uri
OPENROUTER_API_KEY=your_openrouter_api_key
```

### 3. Frontend Setup

Open a new terminal from the project root:

```bash
cd frontend
npm install
npm run dev             # runs on http://localhost:5173
```

### 4. Open in your browser

```
http://localhost:5173
```
