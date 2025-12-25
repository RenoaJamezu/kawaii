/* eslint-disable react-hooks/purity */
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AnimatedBackground: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-[floatParticles_10s_linear_infinite] text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 10}s`,
          }}
        >🩷</div>
      ))}

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedBackground;
