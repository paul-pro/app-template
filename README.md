# Next.js T3 Stack Template

A modern, full-stack template built with the T3 Stack, featuring type-safe APIs, authentication, and a beautiful UI. Perfect for building scalable web applications.

## Features

- 🚀 **Next.js 14+** with App Router
- 📘 **TypeScript** for type safety
- 🔒 **Auth.js** for authentication
- 🔄 **tRPC** for type-safe APIs
- 💾 **Drizzle ORM** with Neon Database
- 🎨 **Radix UI** + Tailwind CSS
- 🔍 **Biome** for linting and formatting
- ✅ **Zod** for validation
- 🌐 **Edge-ready**
- 📚 **Comprehensive documentation**

## Quick Start

```bash
# Create a new project
bunx create-next-app@latest -e https://github.com/[your-repo]/next-t3-app-template

# Install dependencies
bun install

# Set up your environment
cp .env.example .env

# Start development server
bun run dev
```

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── _components/    # Shared React components
│   ├── api/           # API routes (if needed)
│   └── (routes)/      # App routes and pages
├── server/
│   ├── api/           # tRPC API definitions
│   ├── auth/          # Authentication config
│   └── db/            # Database schema and config
└── lib/               # Shared utilities
```

## Development Tools

```bash
# Format code
bun run format

# Type check
bun run typecheck

# Lint
bun run lint

# Build
bun run build

# Start production server
bun run start

# Database migrations
bunx drizzle-kit generate:pg
bunx drizzle-kit push
```

## Authentication

1. Copy `.env.example` to `.env`
2. Configure your OAuth provider in `src/server/auth/config.ts`
3. Update environment variables:
   ```env
   AUTH_SECRET="your-secret"
   AUTH_PROVIDER_ID="your-provider-id"
   AUTH_PROVIDER_SECRET="your-provider-secret"
   ```

## Database Setup

1. Create a database (we recommend [Neon](https://neon.tech))
2. Update `DATABASE_URL` in `.env`
3. Run migrations:
   ```bash
   bunx drizzle-kit push
   ```

## Documentation

- [Architecture](docs/architecture.md)
- [Requirements](docs/requirements.md)
- [Changelog](docs/changelog.md)

## Deployment

Ready to deploy on:
- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- Docker
- Self-hosted

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

MIT License - feel free to use this template for any project!
