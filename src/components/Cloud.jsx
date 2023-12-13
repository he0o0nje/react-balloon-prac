import { useRef, memo } from "react";
import "../styles/Cloud.scss";

const Cloud = () => {
  const clouds = Array(10).fill(null); // 구름 배열 크기를 10으로 변경
  const positionsRef = useRef([]); // 생성된 위치를 저장하는 배열

  function generatePosition() {
    let position;

    for (let attempts = 0; attempts < 1000; attempts++) {
      const newPosition = {
        top: 45 + Math.random() * 45,
        left: Math.random() * 80,
      };

      const overlaps = positionsRef.current.some(
        (p) =>
          Math.abs(p.top - newPosition.top) < 10 &&
          Math.abs(p.left - newPosition.left) < 10
      );

      if (!overlaps) {
        position = newPosition; // 겹치지 않는 경우 position을 newPosition으로 업데이트
        break;
      } // 겹치지 않는 경우 루프를 빠져나옴
    }

    // 1000번 시도 후에도 겹치지 않는 위치를 찾지 못한 경우, 랜덤한 위치를 반환
    if (!position) {
      console.warn("랜덤 위치 반환");
      position = {
        top: 45 + Math.random() * 45,
        left: Math.random() * 80,
      };
    }

    positionsRef.current.push(position); // 생성된 위치를 배열에 추가
    return position;
  }

  return (
    <>
      {clouds.map((_, i) => {
        const position = generatePosition();
        return (
          <div
            key={i}
            className="cloud"
            style={{
              left: `${position.left}vw`,
              top: `${position.top}vh`,
            }}
          >
            <div className="extra" />
            <div className="line" />
          </div>
        );
      })}
    </>
  );
};

export default memo(Cloud);
