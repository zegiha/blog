# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `pnpm dev` (uses Turbopack for fast builds)
- **Build**: `pnpm build`
- **Lint**: `pnpm lint` (uses Next.js ESLint config)
- **Start production**: `pnpm start`
- **Icon generation**: `pnpm icons:build` (normalizes SVGs and generates React components)

## Architecture Overview

This is a Next.js 15 blog application with a sophisticated content editing system built around a block-based editor architecture.

### Core Technologies
- **Framework**: Next.js 15 with App Router
- **Styling**: CSS Modules with a comprehensive design system
- **Database**: Prisma with MySQL
- **State Management**: Zustand for global state (theme management)
- **Package Manager**: pnpm

### Design System Structure

The application has a mature design system located in `shared/design/`:

- **Palette**: Consistent color tokens in `palette.ts` (gray scale + brand colors)
- **Typography**: Type-safe text sizing system with `TTextSize` and `TTextColor` types
- **Theme**: Dynamic light/dark theme switching with server-side persistence via `/api/theme`
- **Components**: Atomic design pattern (atom/molecule/organism)

### Content Management Architecture

The core feature is a block-based content editor similar to Notion:

#### Block System (`components/_chan/renew/`)
- **RenewWrapper**: Main container managing block state and operations
- **ValueTypeText**: Text blocks with command palette (slash commands)
- **ValueTypeMedia**: Image blocks with alignment controls
- **ControlSection**: Block manipulation controls (drag, delete, type change)

#### Key Patterns:
- Each block type has its own value type, control components, and styling
- Drag and drop functionality for block reordering (`shared/hook/dragAndDrop/`)
- Command palette system for quick block insertion and formatting
- Editable typography components with content-editable support

### Database Schema
```prisma
Article {
  uuid        String   @id
  title       String
  description String
  content     Json     // Stores block-based content
  tags        Tag[]    // M:N relationship
}
```

### Component Conventions
- Use CSS Modules for styling (`.module.css`)
- Type-safe props with TypeScript interfaces
- Atomic design pattern: `atom/` → `molecule/` → `organism/`
- Custom hooks pattern: `use[ComponentName].ts`
- Design system integration through shared utilities

### Development Patterns
- Import paths use `@/` alias for root directory
- Consistent file naming: PascalCase for components, camelCase for utilities
- CSS classes follow BEM-like naming within modules
- Theme-aware components using CSS custom properties

### Icon System
- SVG icons in `public/icon/` are auto-generated into React components
- Use `pnpm icons:build` after adding new SVG files
- Generated components available at `components/atom/icon/`

### API Routes
- `/api/theme`: POST endpoint for theme persistence
- `/api/article`: Article CRUD operations
- `/api/proxy`: Proxy endpoint for external resources