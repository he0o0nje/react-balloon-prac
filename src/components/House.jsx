import { useEffect, useRef } from "react";
import "../styles/House.scss";

const House = ({ onClick, onPositionChange }) => {
  // useRef를 사용하여 house 컴포넌트에 대한 참조를 저장
  const ref = useRef(null);

  useEffect(() => {
    // house 컴포넌트의 위치를 업데이트하는 함수
    const updatePosition = () => {
      // ref.current가 존재할 경우, 즉 house 컴포넌트가 DOM에 마운트된 경우에만 실행
      if (ref.current) {
        const { offsetTop, offsetLeft, offsetWidth, offsetHeight } =
          ref.current;
        // house 컴포넌트의 중심 좌표를 계산하고, 이를 onPositionChange 콜백을 통해 상위 컴포넌트에 전달
        onPositionChange({
          x: offsetLeft + offsetWidth / 2,
          y: offsetTop + offsetHeight / 2,
        });
      }
    };

    // 컴포넌트가 마운트되거나 윈도우 크기가 변경될 때마다 updatePosition 함수를 호출
    updatePosition();
    window.addEventListener("resize", updatePosition);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [onPositionChange]);

  return (
    <>
      <div className="house" onClick={onClick}>
        <div className="roof">
          {/* ref가 설정된 요소. 이 요소의 위치를 기준으로 선을 그림. */}
          <div className="roof-top" ref={ref}></div>
          <div className="roof-bottom"></div>
        </div>
        <div className="home">
          <div className="home-roof">
            <div className="home-roof-top"></div>
            <div className="home-roof-bot"></div>
          </div>
          <div className="home-back"></div>
          <div className="home-front">
            <div className="window">
              <div className="window-inner"></div>
              <div className="window-inner-lft"></div>
              <div className="window-inner-rgt"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default House;
