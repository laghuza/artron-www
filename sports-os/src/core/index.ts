/**
 * ARTRON SPORTS OS // CENTRAL CORE MATRIX HUB
 * Re-exports all core registries, RBAC maps, effect definitions, theme tokens, and content adapters
 * Exposes single-barrel import hub via `@/core`
 */

export * from './registry/site.config';
export * from './registry/rbac.config';
export * from './registry/effects.config';
export * from './registry/node-registry.config';
export * from './theme/theme.config';
export * from './adapters/node-content';
export * from './security/env';
