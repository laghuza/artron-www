/**
 * 🤖 ARTRON AI KNOWLEDGE BASE & REASONING ENGINE
 * 
 * Orchestrates domain knowledge matching, contextual affirmative responses,
 * and smart contact deflection for external inquiries.
 */

import { BotAction, BotReply, SupportedLocale } from './types';
import { matchQueryToReply } from './intentMatcher';

export type { BotAction, BotReply, SupportedLocale };

/**
 * Matches user query against full site knowledge and generates domain-accurate reply.
 * Context-aware: understands follow-up answers ("დიახ", "კი", "yes", etc.) relative to the previous bot prompt.
 */
export function getArtronAiReply(
  rawQuery: string,
  locale: SupportedLocale = 'ka',
  lastBotPrompt?: string
): BotReply {
  return matchQueryToReply(rawQuery, locale, lastBotPrompt);
}
