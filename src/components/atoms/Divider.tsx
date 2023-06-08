'use client'

type DividerVariant = keyof typeof DividerVariants

const DividerVariants = {
  m_transparent: "h-[1px] bg-transparent",
  m_sm: "mx-[1rem] h-[1px] bg-gray-1",
  m_m: "h-[1px] bg-gray-2",
  m_lg: "h-[6px] bg-gray-1",
  sm: "",
  m: "",
  lg: "",
}

const styles = {
  container: ({ size, mt = '0', mb = '0', my = '0' }: { size: DividerVariant; mt?: string; mb?: string; my?: string }) => [
    DividerVariants[size],
    mt !== '0' && `mt-[${mt}]`,
    mb !== '0' && `mb-[${mb}]`,
    my !== '0' && `my-[${my}]`,
  ].filter(Boolean).join(' '),
};

export default function Divider({ size, mt = '0', mb = '0', my = '0' }: { size: DividerVariant; mt?: string; mb?: string; my?: string }) {
  return (
    <>
      <div className={styles.container({ size, mt, mb, my })} />
    </>
  )
}
