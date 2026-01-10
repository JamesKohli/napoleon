# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Rally the Troops is a web platform for playing historical board games. Single-process Node.js server using Express.js and SQLite3, handling HTTP (meta-site) and WebSocket (gameplay) connections.

## Commands

```bash
# Install dependencies
npm install

# Initialize database
sqlite3 db < schema.sql

# Start server (development)
node server.js

# Start with auto-reload
npx nodemon server.js

# Register a game module
sqlite3 db < public/[title-id]/title.sql

# Lint
npx eslint .

# Test a module with fuzzer
node bin/rtt-fuzz.js [title-id]
```

Server runs at http://localhost:8080/. First account created gets admin privileges.

## Architecture

**Two-part system:**
- **Meta-site (HTTP)**: Login, game creation, forums. Pug templates in `/views`.
- **Game Engine (WebSocket)**: Real-time gameplay via `/play-socket?title=X&game=Y&role=Z`.

**Game state flow:**
1. Client sends action `[verb, noun]` via WebSocket
2. Server processes through module's `rules.js`
3. Server generates role-specific view object
4. Server broadcasts view to all connected clients

**Key globals in rules framework:**
- `G` - Game state object
- `L` - Local scope (current state/procedure)
- `R` - Current role index
- `V` - View object being generated

## Module Structure

Modules live in `public/[title-id]/`:

| File | Purpose |
|------|---------|
| `rules.js` | Game logic (server-side). Must export: `scenarios`, `roles`, `setup`, `view`, `action` |
| `play.js` | Client display. Must provide: `on_init()`, `on_update()` |
| `play.html` | Game board HTML |
| `play.css` | Game styling |
| `title.sql` | DB registration: `insert into titles (title_id, title_name, bgg) values (...)` |
| `about.html` | Game description |
| `create.html` | Custom game options form |
| `cover.png` | Cover image |

Copy `public/common/framework.js` into the end of `rules.js` to get state machine, undo, and utility functions.

## Code Style

- No semicolons (ESLint enforced)
- Tab indentation
- Named constants for role indices: `const R_WHITE = 0`
- SQL query constants prefixed with `SQL_`

## Key Files

- `server.js` - Main server, all routes and WebSocket handling
- `schema.sql` - Database schema
- `public/common/framework.js` - Shared rules engine (copy into modules)
- `public/common/client.js` - Client WebSocket and UI runtime

## Example Modules

- `public/field-cloth-gold/` - Simple 2-player game
- `public/paths-of-glory/` - Complex card-driven wargame
- `public/1989-dawn-of-freedom/` - Card-driven game with events

## Database

SQLite database at `./db`. Key tables:
- `users`, `logins` - Authentication
- `games`, `players` - Game metadata and role assignments
- `game_state` - JSON game state blob
- `game_replay` - Action log for replay/undo
- `titles` - Registered game modules
