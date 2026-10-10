Multi-Language & Framework Expansion Plan

Goal

Expand Coding Cards beyond Python to include TypeScript and React, transforming the app into a comprehensive technical interview and muscle-memory trainer for full-stack developers.

Phase 1: Architectural Preparation

Ensure the core engine supports multi-language decks without rewriting the UI or session logic.

Schema & Grouping Updates:

Update the card schema to fully utilize the existing language field (python, typescript, react).

Modify the Home screen topic selector to support a language switcher filter at the top level before drilling down into categories.

Runtime Isolation:

Abstract the answer-checking pipeline into a modular runner interface (PythonRunner, JSRunner, ReactRunner).

Keep Pyodide localized so it only boots when a Python session is active, saving memory for JS/React sessions.

Phase 2: TypeScript Deck (ts)

Focus on type system quirks, utility types, and everyday syntax patterns.

Core Categories:

Primitives & Unions: Basic types, literal types, type narrowing (typeof, instanceof, user-defined type guards).

Interfaces & Types: Extends, intersections (&), index signatures, readonly properties, optional fields.

Generics: Generic functions, constraints (extends keyof), default type parameters, conditional types.

Utility Types: Partial, Required, Readonly, Record, Pick, Omit, Extract, Exclude, ReturnType.

Traps: any vs unknown, type assertions (as), strict null checks, array mutability (readonly arrays).

Evaluation Strategy:

Leverage Node.js environment or a lightweight AST parser inside Electron to execute code checks or validate type definitions.

Phase 3: React Deck (react)

Focus on hooks, component lifecycle rules, JSX syntax, and state management patterns.

Core Categories:

State & Effects: useState updaters, useEffect cleanup and dependency arrays, useRef for DOM vs mutable values.

Performance Hooks: useMemo, useCallback, preventing unnecessary re-renders.

Context & Custom Hooks: Creating contexts, consuming with custom hook wrappers, avoiding prop drilling.

JSX & Render Patterns: Conditional rendering, fragment usage, mapping arrays with stable keys, children props.

Traps: Stale closures, mutating state directly, calling hooks conditionally, missing dependency warnings.

Evaluation Strategy:

Use strict pattern matching and smart-normalization for JSX templates, or lightweight virtual DOM/component mounting utilities to test behavior assertions.

Phase 4: Unified Polish

Cross-Language Stats: Update the Home screen dashboard to track accuracy and streak statistics independently per language.

Combined Blitz Mode: Introduce an optional "Full Stack Blitz" mode that shuffles cards across Python, TypeScript, and React in a single session.