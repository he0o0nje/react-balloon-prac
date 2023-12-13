import { useEffect, useState, useRef } from "react";
import "../styles/Balloon.scss";

const Balloon = ({ onClick, onPositionChange, id }) => {
  const [balloonShape, setBalloonShape] = useState("");
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [color, setColor] = useState("");
  const [handleColor, setHandleColor] = useState("");
  // const [animation, setAnimation] = useState("");
  // const [animationDuration, setAnimationDuration] = useState("");
  // const [animationDelay, setAnimationDelay] = useState("");
  // 많은 계산이 필요해서 렉걸림, .move로 대체
  const ref = useRef(null);

  // 풍선의 위치를 업데이트하는 함수
  useEffect(() => {
    const updatePosition = () => {
      if (ref.current) {
        const { offsetTop, offsetLeft, offsetWidth, offsetHeight } =
          ref.current;
        // 풍선의 중심 좌표를 계산하고, 이를 onPositionChange 콜백을 통해 상위 컴포넌트에 전달
        onPositionChange({
          id,
          position: {
            x: offsetLeft + offsetWidth / 2,
            y: offsetTop + offsetHeight / 2,
          },
        });
      }
      // 다음 프레임에서 updatePosition 함수를 다시 호출
      requestAnimationFrame(updatePosition);
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    // 컴포넌트가 언마운트될 때 이벤트 리스너와 requestAnimationFrame을 제거합니다.
    return () => {
      window.removeEventListener("resize", updatePosition);
      cancelAnimationFrame(updatePosition);
    };
  }, [onPositionChange, id]);

  // 풍선의 모양, 위치, 색상을 랜덤하게 결정하는 함수
  useEffect(() => {
    const shapes = ["heart", "circle", "flower", "bear"];
    const randomIndex = Math.floor(Math.random() * shapes.length);

    const shape = shapes[randomIndex];
    setBalloonShape(shape);

    const randomTop = Math.random() * 40;
    const randomLeft = Math.random() * (90 - 2 * randomTop) + randomTop;
    setPosition({ top: randomTop, left: randomLeft });

    if (shape !== "heart" && shape !== "flower" && shape !== "bear") {
      const colors = ["crimson", "yellowgreen", "navy", "gold", "hotpink"];
      const randomColorIndex = Math.floor(Math.random() * colors.length);
      setColor(colors[randomColorIndex]);
      if (shape === "circle") {
        setHandleColor(colors[randomColorIndex]);
      }
    }

    // const animations = ["move1", "move2", "move3", "move4"];
    // const animation = animations[randomIndex];
    // setAnimation(animation);

    // const randomDuration = (Math.random() * 2 + 1).toFixed(2);
    // setAnimationDuration(randomDuration);

    // const randomDelay = (Math.random() * 2).toFixed(2);
    // setAnimationDelay(randomDelay);
    // 많은 계산이 필요해서 렉걸림, .move로 대체
  }, []);

  return (
    <div
      className={`balloon ${balloonShape} move `} // ${animation} -> move
      style={{
        top: `${position.top}vh`,
        left: `${position.left}vw`,
        backgroundColor: balloonShape === "circle" ? color : "",
        // animationDuration: `${animationDuration}s`,
        // animationDelay: `${animationDelay}s`,
        // 많은 계산이 필요해서 렉걸림, .move로 대체
      }}
      onClick={onClick}
    >
      {/* ref가 설정된 요소. 이 요소의 위치를 기준으로 선을 그림. */}
      <div
        className="handle"
        style={
          balloonShape === "circle" ? { backgroundColor: handleColor } : {}
        }
        ref={ref}
      />
    </div>
  );
};

export default Balloon;
