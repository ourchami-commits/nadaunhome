type Props = {
  topColor: string;
  bottomColor: string;
  flip?: boolean;
};

/* 두 섹션 사이에 삽입하는 웨이브 전환 컴포넌트.
   topColor = 위 섹션 배경색, bottomColor = 아래 섹션 배경색 */
export default function WaveDivider({ topColor, bottomColor, flip = false }: Props) {
  return (
    <div style={{ backgroundColor: bottomColor, marginTop: "-2px", lineHeight: 0 }}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: "block",
          width: "100%",
          height: "56px",
          transform: flip ? "scaleX(-1)" : undefined,
        }}
      >
        <path
          d="M0,0 L0,52 C280,80 560,20 840,50 C1040,68 1260,32 1440,52 L1440,0 Z"
          fill={topColor}
        />
      </svg>
    </div>
  );
}
