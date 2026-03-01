# FlavorIQ 🍳

**[Live Demo: FlavorIQ](https://flavor-958ag94ke-alokkumar-05s-projects.vercel.app)** 

FlavorIQ is an AI-powered full-stack application that helps you discover and generate personalized recipes based on the ingredients you currently have in your pantry. By utilizing Google Gemini AI, FlavorIQ eliminates food waste and brings creativity to your everyday cooking.

## 🚀 Features
- **Pantry Management:** Keep track of the ingredients and products you have at home.
- **AI Recipe Generation:** Get instant, personalized recipe suggestions based on your available ingredients directly from Google Generative AI.
- **Secure Authentication:** User accounts, single-session logins, and secure data handling powered by Clerk.
- **Export to PDF:** Read and download your AI-generated recipes as pristine PDF documents.
- **Responsive Design:** Beautiful, fast, and accessible user interface built with modern web standards and `shadcn/ui`.

## 🛠️ Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS, shadcn/ui
- **Backend & CMS:** Strapi, Node.js
- **Database:** NeonDB (PostgreSQL)
- **Authentication:** Clerk
- **AI Integration:** Google Generative AI
- **Deployment:** Vercel

## ⚙️ Getting Started

First, install the dependencies for both frontend and backend:

```bash
# In frontend directory
npm install

# In backend directory
npm install
```

### Environment Variables

Before starting the applications, you'll need to set up the environment variables.

#### Frontend (`frontend/.env`)
Create a `.env` file in the `frontend` directory and add the following keys. You will need to obtain API keys from Clerk, Arcjet, Strapi, Google Gemini, and Unsplash:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Arcjet Security
ARCJET_KEY=your_arcjet_key

# Strapi Backend Connection
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337 # or your production Strapi URL
STRAPI_API_TOKEN=your_strapi_api_token

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Unsplash Images
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

#### Backend (`backend/.env`)
Create a `.env` file in the `backend` directory. Generate random base64 strings for the secrets:

```env
# Server
HOST=0.0.0.0
PORT=1337

# Secrets (Generate your own secure random strings)
APP_KEYS=your_app_keys_comma_separated
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_token_salt
ENCRYPTION_KEY=your_encryption_key
JWT_SECRET=your_jwt_secret

# Database Configurations (NeonDB/PostgreSQL Example)
DATABASE_CLIENT=postgres
DATABASE_HOST=your_database_host
DATABASE_PORT=5432
DATABASE_NAME=your_database_name
DATABASE_USERNAME=your_database_username
DATABASE_PASSWORD=your_database_password
DATABASE_SSL=true
```

Then, run the development servers:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
