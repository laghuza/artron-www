import { MotionValue, useTransform } from 'framer-motion';

export function useGlyphKinematics(scrollYProgress: MotionValue<number>, isMobile: boolean) {
  // Global flight kinematics: letters disassemble, fly upwards & leftwards directly into Header
  const globalAscendY = useTransform(
    scrollYProgress,
    [0, 0.15, 0.4, 0.6],
    ['0vh', '-12vh', isMobile ? '-42vh' : '-44vh', isMobile ? '-46vh' : '-48vh']
  );

  const globalAscendX = useTransform(
    scrollYProgress,
    [0, 0.15, 0.4, 0.6],
    ['0vw', '-5vw', isMobile ? '-28vw' : '-36vw', isMobile ? '-32vw' : '-40vw']
  );

  const globalGlyphScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.4, 0.6],
    [1, 0.85, isMobile ? 0.35 : 0.22, isMobile ? 0.25 : 0.15]
  );

  const glyphsAlpha = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65], [1, 0.95, 0.4, 0]);

  // Letter A Segments
  const aLeftX = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? -18 : -45]);
  const aLeftY = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? -25 : -60]);
  const aLeftRot = useTransform(scrollYProgress, [0, 0.65], [0, -18]);

  const aRightX = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? 12 : 30]);
  const aRightY = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? 15 : 40]);
  const aRightRot = useTransform(scrollYProgress, [0, 0.65], [0, 14]);

  const aBarX = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? -8 : -20]);
  const aBarY = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? 35 : 75]);
  const aBarRot = useTransform(scrollYProgress, [0, 0.65], [0, 25]);

  // Letter R1 Segments
  const r1StemX = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? -12 : -32]);
  const r1StemY = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? -35 : -80]);
  const r1StemRot = useTransform(scrollYProgress, [0, 0.65], [0, -8]);

  const r1LoopX = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? 16 : 40]);
  const r1LoopY = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? -20 : -45]);
  const r1LoopRot = useTransform(scrollYProgress, [0, 0.65], [0, 22]);

  const r1LegX = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? 22 : 55]);
  const r1LegY = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? 28 : 65]);
  const r1LegRot = useTransform(scrollYProgress, [0, 0.65], [0, -15]);

  // Letter T Segments
  const tTopX = useTransform(scrollYProgress, [0, 0.65], [0, 0]);
  const tTopY = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? -45 : -95]);
  const tTopRot = useTransform(scrollYProgress, [0, 0.65], [0, -6]);

  const tStemX = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? -5 : -12]);
  const tStemY = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? 40 : 85]);
  const tStemRot = useTransform(scrollYProgress, [0, 0.65], [0, 12]);

  // Letter R2 Segments
  const r2StemX = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? -14 : -35]);
  const r2StemY = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? 22 : 50]);
  const r2StemRot = useTransform(scrollYProgress, [0, 0.65], [0, 14]);

  const r2LoopX = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? 18 : 42]);
  const r2LoopY = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? -30 : -70]);
  const r2LoopRot = useTransform(scrollYProgress, [0, 0.65], [0, -20]);

  const r2LegX = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? 24 : 58]);
  const r2LegY = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? 32 : 72]);
  const r2LegRot = useTransform(scrollYProgress, [0, 0.65], [0, 18]);

  // Letter O Segments
  const oLeftX = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? -20 : -50]);
  const oLeftY = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? -22 : -55]);
  const oLeftRot = useTransform(scrollYProgress, [0, 0.65], [0, -28]);

  const oRightX = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? 20 : 50]);
  const oRightY = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? 22 : 55]);
  const oRightRot = useTransform(scrollYProgress, [0, 0.65], [0, 28]);

  // Letter N Segments
  const nLeftX = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? -16 : -38]);
  const nLeftY = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? 25 : 60]);
  const nLeftRot = useTransform(scrollYProgress, [0, 0.65], [0, 10]);

  const nDiagX = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? 6 : 15]);
  const nDiagY = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? -35 : -80]);
  const nDiagRot = useTransform(scrollYProgress, [0, 0.65], [0, -24]);

  const nRightX = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? 25 : 60]);
  const nRightY = useTransform(scrollYProgress, [0, 0.65], [0, isMobile ? -20 : -45]);
  const nRightRot = useTransform(scrollYProgress, [0, 0.65], [0, 16]);

  return {
    globalAscendY,
    globalAscendX,
    globalGlyphScale,
    glyphsAlpha,
    a: { aLeftX, aLeftY, aLeftRot, aRightX, aRightY, aRightRot, aBarX, aBarY, aBarRot },
    r1: { r1StemX, r1StemY, r1StemRot, r1LoopX, r1LoopY, r1LoopRot, r1LegX, r1LegY, r1LegRot },
    t: { tTopX, tTopY, tTopRot, tStemX, tStemY, tStemRot },
    r2: { r2StemX, r2StemY, r2StemRot, r2LoopX, r2LoopY, r2LoopRot, r2LegX, r2LegY, r2LegRot },
    o: { oLeftX, oLeftY, oLeftRot, oRightX, oRightY, oRightRot },
    n: { nLeftX, nLeftY, nLeftRot, nDiagX, nDiagY, nDiagRot, nRightX, nRightY, nRightRot },
  };
}
