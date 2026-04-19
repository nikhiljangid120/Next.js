🤖 Interview AI: Full-Stack Question GeneratorAn automated platform that generates role-specific interview questions using high-speed AI inference. This project demonstrates a production-ready full-stack architecture with secure authentication, real-time AI processing, and persistent storage.🚀 Key Features
AI-Powered Generation: Real-time generation of interview questions tailored to specific roles and experience levels using the Groq SDK.
Secure Authentication: Integrated with Clerk for reliable session management and identity verification.
Persistent Storage: Automatically saves user history and generated questions to Supabase.
Performance Focused: Optimized for low-latency responses using Groq's high-speed inference engine.

🛠️ Technical Stack
Frontend: Next.js / React
Backend: API Routes (POST /api/generate)
Authentication: Clerk Auth Middleware
Database: Supabase
AI Inference: Groq LPU™ Inference Engine

🔄 System Architecture & Data FlowThis application follows a strict data pipeline to ensure security, data integrity, and a clean user experience:
Request Initiation: The user inputs their role and level. The frontend sends a JSON payload to the /api/generate endpoint.
Auth Layer: Clerk Middleware intercepts the request. If no valid session exists, it returns a 401 Unauthorized response.
Context Extraction: Upon successful authentication, the system extracts the userId via auth() and parses the request body to retrieve user parameters.
AI Processing: The Groq SDK is triggered with a custom-engineered prompt. The raw output is received as a high-velocity text stream.
Data Sanitization: To ensure a clean UI, the raw string is split by newlines and filtered to remove empty artifacts, resulting in a clean string[] array.
Persistence: The processed questions are saved to Supabase along with the userId, role, and a timestamp for future reference.
Final Rendering: The sanitized JSON is returned to the frontend, where setQuestions() updates the state and renders the list to the user.

⚙️ Installation & Setup
git clone <your-repo-url>Use code with caution.
npm installUse code with caution.
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...CLERK_SECRET_KEY=...GROQ_API_KEY=...SUPABASE_URL=...SUPABASE_SERVICE_ROLE_KEY=...Use code with caution.
npm run dev




