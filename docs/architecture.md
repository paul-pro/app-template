# Architecture

## Tech Stack
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle
- **Authentication**: Better Auth with OAuth support
- **API Layer**: tRPC
- **Styling**: Tailwind CSS with minimal theme system
- **Package Manager**: Bun
- **Code Quality**: Biome (formatting, linting)

## Project Structure
```
src/
├── app/                      # Next.js App Router
│   ├── _components/         # Shared React components
│   │   ├── login-button.tsx    # Auth UI components
│   │   └── sign-out-button.tsx
│   ├── api/                # API routes
│   │   ├── auth/          # Auth API endpoints
│   │   │   └── [...all]
│   │   └── trpc/         # tRPC API handler
│   │       └── [trpc]
│   ├── dashboard/        # App routes
│   ├── layout.tsx       # Root layout
│   └── page.tsx        # Home page
├── env.js              # Environment variables schema
├── lib/               # Shared utilities
│   ├── auth.ts       # Auth configuration
│   ├── auth-client.ts # Auth client utilities
│   └── middleware.ts # Request middleware
├── server/          # Server-side code
│   ├── api/        # tRPC API definitions
│   │   ├── root.ts      # Root router
│   │   ├── routers/    # API route handlers
│   │   └── trpc.ts    # tRPC configuration
│   └── db/        # Database layer
│       ├── index.ts   # Database client
│       └── schema.ts # Database schema
├── styles/       # Global styles
│   └── globals.css
└── trpc/       # tRPC client setup
    ├── query-client.ts
    ├── react.tsx
    └── server.ts
```

## Core Features

### Authentication
- OAuth providers support via Better Auth
- Token-based session strategy
- HTTP-only cookies for security
- Type-safe session data
- Protected routes and API endpoints
- Client and server utilities for auth state
- Middleware-based route protection

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

### Theme System
- Minimal CSS variables
- Basic color scheme:
  - Background/Foreground colors
  - Border colors
- Tailwind utility classes
- Easy to extend

## Security Considerations

### Authentication
- OAuth 2.0 providers support
- Token-based session strategy
- Origin-checked redirects
- HTTP-only cookies
- CSRF protection
- Session management

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
- Error handling
- Loading states
- Proper session handling

## Development Workflow
- Type checking with TypeScript
- Code formatting with Biome
- Linting with Biome
- Git hooks (optional)
- Database migrations with Drizzle
- Edge-first development
- Server components by default

## Template Customization
- Easy to add UI libraries
- Extensible theme system
- Configurable auth providers
- Modular component structure
- Clear separation of concerns
- Minimal dependencies