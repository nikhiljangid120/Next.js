What it does
This app helps people prep for interviews. You tell it the job role and your seniority level, and it spits out a list of relevant interview questions. Behind the scenes, it handles the login security, talks to an AI to get the questions, cleans up the text so it looks good, and saves everything to a database so you don't lose your history.
Tech stack
Framework: Next.js
Auth: Clerk
AI: Groq SDK
Database: Supabase
Styling: Tailwind CSS
How to run it
Clone and Install:
bash
git clone [your-repo-link]
cd [project-folder]
npm install
Use code with caution.
Env Setup:
Create a .env file and add your keys for Clerk, Groq, and Supabase.
Start:
bash
npm run dev
Use code with caution.
How it works
Input: User fills in their role and level and hits "Generate."
Handover: The frontend sends a POST request to /api/generate with that data.
Security Check: Clerk middleware looks at the request. If you aren’t logged in, it kills the process with a 401 error.
Identification: If you’re cleared, auth() grabs your unique userId.
Parsing: The backend opens up the request body and pulls out the role and level.
AI Call: The app sends a prompt to Groq. It uses the role/level to get a big string of questions back.
Cleanup: That big string is messy, so the code splits it by newlines and filters out any empty gaps.
Array Conversion: It turns that cleaned-up text into a proper list (an array of strings).
Storage: The app saves that list to Supabase, tagged with your userId and a timestamp.
Delivery: The final JSON list goes back to the frontend, updates the state, and shows up on your screen.
