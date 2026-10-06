export interface VisionNode {
  id: string;
  code: string;
  title: string;
  description: string;
}

export interface FragmentedActor {
  coord: string;
  text: string;
  mt: string;
}

export interface FragmentedConsequence {
  num: string;
  text: string;
}

export interface ReliabilityCard {
  id: string;
  value: string;
  unit: string;
  title: string;
  description: string;
  spark: boolean;
}

export interface UnityCTA {
  badge: string;
  title: string;
  desc: string;
  action: string;
  href: string;
}

export interface ManifestoContent {
  badge: string;
  geoCoord: string;
  tagline: string;
  chapterBadge: string;
  chapterSub: string;
  scroll: string;
  movementBornInConnection: string;
  articleBadge: string;
  quoteAuthor: string;
  quoteText: string;
  thinkWhatItMeans: string;
  lettersAloneText: string;
  artronTurnsText: string;
  assembleLetters: string[];
  noiseLabel: string;
  syntaxLabel: string;
  syntaxClaim: string;
  fragmentationIntro: string;
  actors: FragmentedActor[];
  isolatedDesc: string;
  isolatedSyntaxWord: string;
  isolatedSyntaxDesc: string;
  whenFragmented: string;
  consequences: FragmentedConsequence[];
  motionWithoutMind: string;
  ultimateGoalTitle: string;
  ultimateGoalP1: string;
  ultimateGoalP2: string;
  ultimateGoalPursuit: string;
  minusArtronBadge: string;
  minusArtronText: string;
  plusArtronBadge: string;
  plusArtronText: string;
}

export interface ArchitectureContent {
  chapterNum: string;
  title: string;
  titleEm: string;
  description: string;
  kineticCore: string;
  linked: string;
  activeNode: string;
  jumpTo: string;
}

export interface ReliabilityContent {
  chapterNum: string;
  title: string;
  titleEm: string;
  descP1: string;
  descBold: string;
  descP2: string;
}

export interface UnityContent {
  chapterNum: string;
  title: string;
  titleEm: string;
  descP1: string;
  descBold: string;
  descP2: string;
  barrierP1: string;
  rulesOneForAll: string;
  barrierP2: string;
  infinitePossibilities: string;
  finalBadge: string;
  finalTitleLine1: string;
  finalTitleLine2: string;
  finalParagraphP1: string;
  finalParagraphBold: string;
  finalParagraphP2: string;
  footnote1?: string;
  footnote2?: string;
  footerRights: string;
  footerTagline: string;
}

export interface AboutVisionLocaleData {
  manifesto: ManifestoContent;
  architecture: ArchitectureContent;
  nodes: VisionNode[];
  reliability: ReliabilityContent;
  vaultCards: ReliabilityCard[];
  unity: UnityContent;
  unityCtas: UnityCTA[];
}
