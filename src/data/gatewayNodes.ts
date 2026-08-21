import { ArtronNode } from '@/types/gateway';
import { NODES_PART_1 } from './nodes/nodesPart1';
import { NODES_PART_2 } from './nodes/nodesPart2';

export const GATEWAY_NODES: ArtronNode[] = [
  ...NODES_PART_1,
  ...NODES_PART_2,
];
