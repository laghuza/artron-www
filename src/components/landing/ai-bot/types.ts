export interface BotAction {
  id: string;
  label: string;
  actionType: 'omnichannel' | 'whatsapp' | 'phone' | 'email';
  href?: string;
  iconType: 'calendar' | 'whatsapp' | 'phone' | 'mail';
}

export interface BotReply {
  text: string;
  actions?: BotAction[];
}

export type SupportedLocale = 'ka' | 'en' | 'ru';

export type SectionTopicId =
  | 'pure-sports-mirror'
  | 'ecosystem'
  | 'dashboard-features'
  | 'mobile-app'
  | 'ai-intelligence'
  | 'partner-ecosystem'
  | 'faq';
