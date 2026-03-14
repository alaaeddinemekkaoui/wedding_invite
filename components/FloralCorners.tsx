'use client'

import { motion } from 'framer-motion'

type FloralCornersProps = {
  subtle?: boolean
  compact?: boolean
}

function CornerFlower({
  src,
  className,
  duration,
}: {
  src: string
  className: string
  duration: number
}) {
  return (
    <motion.img
      src={src}
      alt=""
      className={`absolute object-contain ${className}`}
      animate={{ y: [0, -5, 0], rotate: [0, 1, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

export default function FloralCorners({ subtle = false, compact = false }: FloralCornersProps) {
  const opacityClass = subtle ? 'opacity-70' : 'opacity-100'
  const topSizeClass = compact
    ? 'top-0 h-[12rem] w-[12rem] sm:h-[15rem] sm:w-[15rem]'
    : '-top-8 h-[18rem] w-[18rem] sm:h-[24rem] sm:w-[24rem]'
  const topLeftClass = compact ? 'left-8 sm:left-20' : '-left-8'
  const topRightClass = compact ? 'right-8 sm:right-20' : '-right-8'

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <CornerFlower
        src="/flower_left_up.png.png"
        className={`${topLeftClass} ${topSizeClass} ${opacityClass}`}
        duration={7.4}
      />
      <CornerFlower
        src="/flower_right_up.png.png"
        className={`${topRightClass} ${topSizeClass} ${opacityClass}`}
        duration={8.1}
      />
      <CornerFlower
        src="/flower_left_down.png.png"
        className={`-left-8 -bottom-8 h-[18rem] w-[18rem] sm:h-[24rem] sm:w-[24rem] hidden ${opacityClass}`}
        duration={7.8}
      />
      <CornerFlower
        src="/flower_right_downpng.png"
        className={`-right-8 -bottom-8 h-[18rem] w-[18rem] sm:h-[24rem] sm:w-[24rem] hidden ${opacityClass}`}
        duration={8.5}
      />
    </div>
  )
}
