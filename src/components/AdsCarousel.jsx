import React, { useEffect, useState } from "react";
import "../css/AdsCarousel.css";
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpeg";
import img3 from "../images/swiggy.jpeg";

const ads = [
  { id: 1, content: <img src={img3}  alt="Ad 1" /> },
  { id: 2, content: <img src={img2} alt="Ad 2" /> },
  { id: 3, content: <img src={img1} alt="Ad 3" /> },
];



function AdsCarousel() {
  const [current, setCurrent] = useState(0);
  const [sliding, setSliding] = useState(false);

  useEffect(() => {
    const stayDuration = 5500;
    const slideDuration = 600;

    const timeout1 = setTimeout(() => setSliding(true), stayDuration);
    const timeout2 = setTimeout(() => {
      setSliding(false);
      setCurrent(prev => (prev + 1) % ads.length);
    }, stayDuration + slideDuration);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [current]);

  return (
    <div className="ads-outer">
      <div className={`ad-slide${sliding ? " sliding" : ""}`}>
        {ads[current].content}
      </div>
    </div>
  );
}

export default AdsCarousel;
