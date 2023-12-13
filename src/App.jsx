import React, { useEffect, useState, useCallback } from "react";
import "./App.scss";
import Cloud from "./components/Cloud";
import House from "./components/House";
import Balloon from "./components/Balloon";
import Rainbow from "./components/Rainbow";
import Ribbon from "./components/Ribbon";
import BigHeart from "./components/BigHeart";

const App = () => {
  const [balloons, setBalloons] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [housePosition, setHousePosition] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [balloonPositions, setBalloonPositions] = useState({});

  // 초기 풍선 상태 설정
  useEffect(() => {
    const newBalloons = Array.from({ length: 100 }, (_, i) => {
      return { id: i };
    });
    setBalloons(newBalloons);
  }, []);

  // 풍선 클릭 시 해당 풍선 제거
  const handleBalloonClick = useCallback((id) => {
    setBalloons((prevBalloons) =>
      prevBalloons.filter((balloon) => balloon.id !== id)
    );
    setBalloonPositions((prevPositions) => {
      const newPositions = { ...prevPositions };
      delete newPositions[id];
      return newPositions;
    });
  }, []);

  // 집 클릭 시 새 풍선 추가
  const handleHouseClick = useCallback(() => {
    const newId = balloons.length;
    setBalloons((prevBalloons) => [...prevBalloons, { id: newId }]);
    setBalloonPositions((prevPositions) => ({
      ...prevPositions,
      [newId]: { x: 0, y: 0 },
    }));
  }, [balloons.length]);

  // 집 위치 변경 시 새 좌표로 업데이트
  const handleHousePositionChange = useCallback((position) => {
    setHousePosition(position);
  }, []);

  // 풍선 위치 변경 시 새 좌표로 업데이트
  const handleBalloonPositionChange = useCallback((balloonInfo) => {
    setBalloonPositions((prevPositions) => ({
      ...prevPositions,
      [balloonInfo.id]: balloonInfo.position,
    }));
  }, []);

  return (
    <>
      <Cloud />
      <House
        onClick={handleHouseClick}
        onPositionChange={handleHousePositionChange}
      />
      <Rainbow />
      <Ribbon />
      <BigHeart />
      {balloons.map((balloon) => (
        <Balloon
          key={balloon.id}
          id={balloon.id}
          onClick={() => handleBalloonClick(balloon.id)}
          onPositionChange={handleBalloonPositionChange}
        />
      ))}
      {/* {housePosition &&
        Object.values(balloonPositions).map((balloonPosition, index) => (
          <svg id={index} style={{ position: "absolute", top: 0, left: 0 }}>
            <line
              x1={housePosition.x}
              y1={housePosition.y}
              x2={balloonPosition.x}
              y2={balloonPosition.y}
              stroke="black"
            />
          </svg>
        ))} 끈 미완성으로 인한 주석처리 */}
    </>
  );
};

export default App;
