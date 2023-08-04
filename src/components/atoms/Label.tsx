'use client'

type LabelVariant = keyof typeof LabelVariants
type ContainerVariant = keyof typeof containerVariants

interface ILabel {
  text1: string,
  text2?: string,
  size: ContainerVariant | LabelVariant
}

const containerVariants = {
  m_menu_pagelink: 'pl-3 pt-4 pb-3',
  m_m: '',
  m_lg: '',
  sm: '',
  m: '',
  lg: '',
}
const LabelVariants = {
  m_menu_pagelink: 'font-sans weight-500 text-[16px]',
  m_m: '',
  m_lg: 'h-[8px] bg-[#D9D9D9]',
  sm: '',
  m: '',
  lg: '',
}

const styles = {
  container: ({ size }: { size: ContainerVariant }) => [containerVariants[size]].filter(Boolean).join(' '),
  label: ({ size }: { size: LabelVariant }) => [LabelVariants[size], "pointer-events-none select-none"].filter(Boolean).join(' '),
}

export default function Label({ text1, text2, size }: ILabel) {
  return (
    <>
      <div className={styles.container({ size })}>
        <span className={`${styles.label({ size })} text-gray-4 pr-[3px]`}>{text1}</span>
        <span className={styles.label({ size })}>{text2}</span>
      </div>
    </>
  )
}
