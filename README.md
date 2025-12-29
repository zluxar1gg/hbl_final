# HappyBox Logistics - Next.js Website

Professional shipping agent website from China & Hong Kong, built with Next.js for optimal SEO and performance.

## 🌐 Live Site

- English: https://happyboxlogistics.com/
- Russian: https://happyboxlogistics.com/ru

## 🚀 Features

- **Next.js 16** with App Router for modern React development
- **TypeScript** for type safety
- **Tailwind CSS** for responsive styling
- **Internationalization** (i18n) with EN and RU language routes
- **SEO Optimized** with proper meta tags, Open Graph, and structured data
- **Server-Side Rendering** for better performance and SEO
- **Automatic Sitemap** generation
- **Responsive Design** optimized for all devices

## 🛠️ Tech Stack

- **Framework:** Next.js 16.1.1
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Deployment:** Ready for Vercel, Netlify, or any Node.js hosting

## 📦 Prerequisites

- Node.js 20+ 
- npm or yarn

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Start production server:**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── layout.tsx      # Root layout with metadata
│   │   ├── page.tsx        # English home page
│   │   ├── globals.css     # Global styles
│   │   ├── sitemap.ts      # Dynamic sitemap
│   │   ├── robots.ts       # Robots.txt
│   │   └── ru/             # Russian language routes
│   │       ├── layout.tsx  # Russian layout with localized metadata
│   │       └── page.tsx    # Russian home page
│   ├── components/         # Reusable React components
│   ├── utils/              # Utility functions and translations
│   ├── services/           # API services
│   ├── i18n/              # Internationalization config
│   ├── types.ts           # TypeScript type definitions
│   └── middleware.ts       # Next.js middleware for routing
├── public/                 # Static assets
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🌍 Internationalization

The site supports two languages with separate URLs:
- **English (default):** `/` → https://happyboxlogistics.com/
- **Russian:** `/ru` → https://happyboxlogistics.com/ru

Each language route has its own:
- Localized metadata and SEO tags
- Language-specific content
- Proper hreflang alternates for search engines

## 🔍 SEO Features

- Optimized metadata for each language
- Open Graph tags for social media
- Twitter Card support
- Canonical URLs
- XML sitemap with language alternates
- Robots.txt
- Structured data ready
- Fast page loads with Next.js optimization

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🚢 Deployment

This Next.js application can be deployed to:

### Vercel (Recommended)
```bash
vercel
```

### Other Platforms
Build the application and deploy the `.next` folder with a Node.js server.

## 📄 License

© 2025 HappyBox Logistics. All rights reserved.

