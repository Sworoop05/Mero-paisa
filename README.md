# 💸 Mero Paisa

> A full-stack personal finance and transaction management application built with a modern monorepo architecture.

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=flat-square&logo=turborepo&logoColor=white)](https://turbo.build/)

---

## 📌 Overview

**Mero Paisa** (meaning *My Money* in Nepali) is a full-stack transaction management app that helps users track, manage, and review personal finances. Built with **Next.js 14 App Router**, it leverages server actions for type-safe data mutations and a **Turborepo monorepo** structure for clean separation of concerns.

---

## ✨ Features

- 💰 Track income and expense transactions
- 📊 View transaction history with filters and summaries
- 🔐 Server-side validation with type-safe API routes via Next.js server actions
- 🗃️ Relational data modelling with Prisma ORM and PostgreSQL
- 🧩 Monorepo architecture with shared UI component library
- 🎨 Clean, responsive UI built with Tailwind CSS and shadcn/UI

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Styling | Tailwind CSS, shadcn/UI |
| Monorepo | Turborepo |
| Package Manager | pnpm |

---

## 📁 Project Structure

```
mero-paisa/
├── apps/
│   └── web/          # Next.js frontend + server actions
├── packages/
│   ├── ui/           # Shared React component library
│   ├── db/           # Prisma schema & database client
│   └── eslint-config/
├── turbo.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Sworoop05/Mero-paisa.git
cd Mero-paisa

# Install dependencies
pnpm install

# Set up environment variables
cp apps/web/.env.example apps/web/.env
# Add your DATABASE_URL to the .env file

# Push the database schema
pnpm db:push

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🔑 Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mero_paisa"
```

---

## 📜 Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps and packages |
| `pnpm db:push` | Push Prisma schema to database |
| `pnpm db:studio` | Open Prisma Studio |

---

## 👤 Author

**Sworoop Bhandari**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sworoop-bhandari-942444316/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Sworoop05)
