/**
 * ARTRON SPORTS OS // CENTRAL CORE MATRIX HUB
 * Re-exports all core registries, RBAC maps, effect definitions, theme tokens, sports taxonomy, i18n, and branding.
 * Exposes single-barrel import hub via `@/core`
 */

export * from './registry/site.config';
export * from './registry/rbac.config';
export * from './registry/effects.config';
export * from './registry/node-registry.config';
export * from './theme/theme.config';
export * from './adapters/node-content';
export * from './security/env';
export * from './sports/sports.taxonomy';
export * from './i18n/i18n.registry';
export * from './branding/branding.tokens';
