/* eslint-disable react-hooks/purity */
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AnimatedBackground: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-linear-to-r from-purple-500 via-pink-500 to-red-500 bg-size-[200%_200%] animate-[gradientBG_15s_ease_infinite]">
      
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-70 animate-[floatParticles_10s_linear_infinite]"
          style={{
            width: `${2 + Math.random() * 6}px`,
            height: `${2 + Math.random() * 6}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 10}s`,
          }}
        ></div>
      ))}

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedBackground;
