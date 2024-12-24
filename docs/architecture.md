# Architecture

## Tech Stack
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle
- **Authentication**: Auth.js (NextAuth)
- **API Layer**: tRPC
- **UI Components**: Radix UI Themes + Tailwind CSS
- **Package Manager**: Bun
- **Code Quality**: Biome (formatting, linting)

## Project Structure
```
.
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── _components/       # Shared React components
│   │   ├── api/              # API routes (if needed)
│   │   └── (routes)/         # App routes and pages
│   ├── server/
│   │   ├── api/             # tRPC API definitions
│   │   │   ├── routers/    # API route handlers
│   │   │   └── root.ts     # Root router configuration
│   │   ├── auth/           # Auth.js configuration
│   │   └── db/             # Database configuration
│   │       ├── index.ts    # Database client
│   │       └── schema.ts   # Database schema
│   ├── styles/             # Global styles
│   │   └── globals.css     # Tailwind and global CSS
│   └── lib/                # Shared utilities
├── drizzle/                # Database migrations
│   ├── meta/              # Migration metadata
│   └── 0000_*.sql        # Migration files
├── docs/                  # Project documentation
└── .env                  # Environment variables
```

## Data Flow Architecture

### Authentication
- Configurable OAuth providers via Auth.js
- JWT-based session strategy
- HTTP-only cookies for security
- Type-safe session data
- Automatic token refresh
- Protected routes and API endpoints

### API Layer
- Type-safe API with tRPC
- Automatic input validation with Zod
- Error handling with type safety
- Real-time capabilities
- Edge-compatible

### Database Layer
- Type-safe queries with Drizzle ORM
- Automatic timestamps
- Optimized indexes
- Migration management
- Edge-ready with Neon

## Security Considerations

### Authentication
- OAuth 2.0 providers support
- JWT session strategy
- Origin-checked redirects
- HTTP-only cookies
- CSRF protection

### Data Safety
- Environment variables for secrets
- Type-safe operations
- Protected API routes
- Input validation with Zod
- Rate limiting support

### Best Practices
- No client-side secrets
- Parameterized queries
- Regular security updates
- Error boundaries
- Loading states

## Development Workflow
- Type checking with TypeScript
- Code formatting with Biome
- Linting with Biome
- Git hooks (optional)
- Database migrations with Drizzle
- Edge-first development
- Server components by default