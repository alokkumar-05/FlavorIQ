<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Strapi-5-blue?logo=strapi" alt="Strapi" />
  <img src="https://img.shields.io/badge/Gemini_AI-Powered-orange?logo=google" alt="Gemini AI" />
  <img src="https://img.shields.io/badge/Clerk-Auth-purple?logo=clerk" alt="Clerk" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss" alt="Tailwind CSS" />
</p>

# 🍳 FlavorIQ — AI-Powered Smart Kitchen Assistant

**Turn your leftovers into masterpieces.** Snap a photo of your fridge, and FlavorIQ tells you what to cook — saving money, reducing waste, and making dinner exciting again.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📸 **AI Pantry Scanner** | Upload a photo of your fridge/pantry and Gemini Vision identifies every ingredient automatically |
| 🤖 **AI Recipe Generation** | Get personalized recipe suggestions based on what you actually have on hand |
| 🗂️ **Digital Pantry** | Track your ingredients with quantities, categories, and expiry awareness |
| 🌍 **Explore Cuisines** | Browse recipes by category (Chicken, Seafood, Pasta…) or cuisine (Italian, Indian, Japanese…) |
| 🔥 **Recipe of the Day** | A fresh random recipe served daily via TheMealDB |
| 💾 **Save & Bookmark** | Save your favourite AI-generated recipes to revisit later |
| 📄 **PDF Export** | Download any recipe as a beautifully formatted PDF |
| 🔐 **Authentication** | Secure sign-up/sign-in powered by Clerk with neobrutalism theme |
| 🛡️ **Rate Limiting & Bot Protection** | Arcjet-powered WAF, bot detection, and tiered usage limits |
| 💎 **Free & Pro Tiers** | Free users get 15 pantry scans + 10 recipe generations/month; Pro is virtually unlimited |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                     Frontend                        │
│              Next.js 16 (App Router)                │
│  ┌───────────┐  ┌───────────┐  ┌────────────────┐  │
│  │  Clerk    │  │  Arcjet   │  │  Server Actions│  │
│  │  Auth     │  │  Security │  │  (AI + CRUD)   │  │
│  └───────────┘  └───────────┘  └────────┬───────┘  │
│                                         │          │
│  UI: shadcn/ui · Radix · Tailwind 4 · Lucide      │
└─────────────────────────────┬───────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
                ▼             ▼             ▼
        ┌──────────┐  ┌────────────┐  ┌──────────┐
        │ Strapi 5 │  │ Gemini AI  │  │TheMealDB │
        │ CMS/API  │  │ (Vision +  │  │  Public  │
        │ (Postgres)│  │  Text Gen) │  │   API    │
        └──────────┘  └────────────┘  └──────────┘
                           │
                     ┌─────┘
                     ▼
               ┌──────────┐
               │ Unsplash │
               │   API    │
               └──────────┘
```

---

## 🧰 Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** — React framework with App Router & Server Actions
- **[React 19](https://react.dev/)** — UI library
- **[Tailwind CSS 4](https://tailwindcss.com/)** — Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)** — Accessible component primitives
- **[Lucide React](https://lucide.dev/)** — Icon library
- **[Clerk](https://clerk.com/)** — Authentication & user management
- **[Arcjet](https://arcjet.com/)** — Rate limiting, bot protection, WAF
- **[Google Generative AI SDK](https://ai.google.dev/)** — Gemini Vision & text generation
- **[@react-pdf/renderer](https://react-pdf.org/)** — Client-side PDF generation
- **[Sonner](https://sonner.emilkowal.dev/)** — Toast notifications
- **[next-themes](https://github.com/pacocoursey/next-themes)** — Theme management

### Backend
- **[Strapi 5](https://strapi.io/)** — Headless CMS with REST API
- **PostgreSQL** — Production database (SQLite for local dev)
- **Strapi Cloud** — Managed deployment

### External APIs
- **[Google Gemini](https://ai.google.dev/)** — AI-powered ingredient detection & recipe generation
- **[TheMealDB](https://www.themealdb.com/)** — Public recipe database (categories, cuisines, random recipes)
- **[Unsplash](https://unsplash.com/developers)** — High-quality recipe images

---

## 📂 Project Structure

```
FlavorIQ/
├── frontend/                    # Next.js 16 application
│   ├── app/
│   │   ├── (auth)/              # Auth routes (sign-in, sign-up)
│   │   ├── (main)/              # Protected app routes
│   │   │   ├── dashboard/       # Home — recipe of the day, browse cuisines
│   │   │   ├── pantry/          # AI pantry scanner & ingredient manager
│   │   │   ├── recipe/          # AI recipe generation from pantry items
│   │   │   └── recipes/         # Browse & discover recipes
│   │   ├── layout.js            # Root layout (Clerk, Header, Toaster)
│   │   └── page.jsx             # Landing page
│   ├── actions/                 # Server Actions
│   │   ├── mealdb.actions.js    # TheMealDB API integration
│   │   ├── pantry.actions.js    # Pantry CRUD + Gemini Vision scanning
│   │   └── recipe.actions.js    # AI recipe generation + Strapi persistence
│   ├── components/              # React components
│   │   ├── ui/                  # shadcn/ui primitives
│   │   ├── Header.jsx           # Navigation bar
│   │   ├── RecipeCard.jsx       # Recipe display card
│   │   ├── ImageUploader.jsx    # Drag-and-drop image upload
│   │   ├── AddToPantryModal.jsx # Pantry item management modal
│   │   └── ...
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utilities
│   │   ├── arcjet.js            # Rate limiting configuration
│   │   ├── checkUser.js         # User sync (Clerk ↔ Strapi)
│   │   ├── data.js              # Static data & constants
│   │   └── utils.js             # Helpers (cn, etc.)
│   └── public/                  # Static assets
│
├── backend/                     # Strapi 5 CMS
│   ├── config/
│   │   ├── database.js          # DB config (SQLite / Postgres)
│   │   └── server.js            # Server settings
│   └── src/
│       └── api/                 # Content types
│           ├── pantry-item/     # Pantry item schema & controllers
│           ├── recipe/          # Recipe schema & controllers
│           └── saved-recipe/    # Saved/bookmarked recipes
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20.x
- **npm** ≥ 6.x
- API keys for: [Clerk](https://clerk.com/), [Google Gemini](https://ai.google.dev/), [Unsplash](https://unsplash.com/developers), [Arcjet](https://arcjet.com/)

### 1. Clone the repository

```bash
git clone https://github.com/alokkumar-05/FlavorIQ.git
cd FlavorIQ
```

### 2. Set up the Backend (Strapi)

```bash
cd backend
npm install
```

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Edit `.env` and fill in your secrets:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=<generate-random-keys>
API_TOKEN_SALT=<generate-random-salt>
ADMIN_JWT_SECRET=<generate-random-secret>
TRANSFER_TOKEN_SALT=<generate-random-salt>
JWT_SECRET=<generate-random-secret>
ENCRYPTION_KEY=<generate-random-key>
```

Start the Strapi dev server:

```bash
npm run dev
```

> Strapi admin panel will be available at `http://localhost:1337/admin`. Create an admin account on first run, then generate a **Full-access API Token** under *Settings → API Tokens*.

### 3. Set up the Frontend (Next.js)

```bash
cd ../frontend
npm install
```

Create a `.env` file:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Strapi CMS
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=<your-strapi-api-token>

# Google Gemini AI
GEMINI_API_KEY=<your-gemini-api-key>

# Unsplash (recipe images)
UNSPLASH_ACCESS_KEY=<your-unsplash-access-key>

# Arcjet (rate limiting & security)
ARCJET_KEY=<your-arcjet-key>
```

Start the Next.js dev server:

```bash
npm run dev
```

> The app will be available at `http://localhost:3000`.

---

## 🔑 API Keys Setup Guide

| Service | Where to get it | Used for |
|---|---|---|
| **Clerk** | [clerk.com/dashboard](https://dashboard.clerk.com/) | User authentication |
| **Google Gemini** | [aistudio.google.com](https://aistudio.google.com/apikey) | Pantry scanning (Vision) & recipe generation |
| **Unsplash** | [unsplash.com/developers](https://unsplash.com/developers) | Recipe cover images |
| **Arcjet** | [arcjet.com](https://app.arcjet.com/) | Rate limiting, WAF, bot protection |
| **Strapi** | Generated locally in Strapi Admin | Backend API access |

---

## 📊 Usage Tiers

| | Free | Pro |
|---|---|---|
| **Pantry Scans** | 15 / month | Unlimited |
| **Recipe Generations** | 10 / month | Unlimited |
| **Save Recipes** | ✅ | ✅ |
| **PDF Export** | ✅ | ✅ |
| **Browse Recipes** | ✅ | ✅ |

---

## 🧪 Content Types (Strapi)

| Content Type | Fields | Description |
|---|---|---|
| **Pantry Item** | name, quantity, unit, category, clerkId | User's pantry ingredients |
| **Recipe** | title, ingredients, instructions, cookTime, servings, image, clerkId | AI-generated recipes |
| **Saved Recipe** | recipe (relation), clerkId | Bookmarked/favourited recipes |

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

---

<p align="center">
  Made with ❤️ by <strong>FlavorIQ</strong>
</p>
