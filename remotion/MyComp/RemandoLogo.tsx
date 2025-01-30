import { evolvePath } from "@remotion/paths";
import React, { useMemo } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

// Path untuk huruf "R", "M", dan "D" yang lebih detail dan proporsional
const rPath = "M50 80 L50 20 L80 20 L80 50 L60 50 L90 80";  
const mPath = "M110 80 L130 20 L150 80";  
const dPath = "M170 20 L200 20 L200 80 L170 80 L200 40 ";  




export const RMDLogo: React.FC<{
  outProgress: number;
}> = ({ outProgress }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Animasi spring untuk masing-masing huruf
  const evolve1 = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
  });
  const evolve2 = spring({
    fps,
    frame: frame - 15,
    config: {
      damping: 200,
    },
  });
  const evolve3 = spring({
    fps,
    frame: frame - 30,
    config: {
      damping: 200,
      mass: 3,
    },
    durationInFrames: 30,
  });

  // Style untuk SVG, menyesuaikan ukuran dan skala
  const style: React.CSSProperties = useMemo(() => {
    return {
      height: 150, // Tinggi SVG diperkecil
      width: "100%", // Lebar penuh
      scale: String(1 - outProgress),
      borderRadius: "20px", // Border radius untuk container
      overflow: "hidden", // Memastikan border radius terlihat
    };
  }, [outProgress]);

  // Path untuk masing-masing huruf
  const firstPath = rPath;
  const secondPath = mPath;
  const thirdPath = dPath;

  // Evolusi path untuk animasi
  const evolution1 = evolvePath(evolve1, firstPath);
  const evolution2 = evolvePath(evolve2, secondPath);
  const evolution3 = evolvePath(
    interpolate(evolve3, [0, 1], [0, 0.7]),
    thirdPath,
  );

  return (
    <svg
      style={style}
      fill="none"
      viewBox="0 0 250 100" // ViewBox disesuaikan agar logo lebih besar dan ke tengah
    >
      {/* Grup utama untuk logo */}
      <g>
        {/* Huruf "R" */}
        <path
          stroke="url(#gradient0)"
          strokeWidth="8" // Stroke dipertebal
          d={firstPath}
          strokeDasharray={evolution1.strokeDasharray}
          strokeDashoffset={evolution1.strokeDashoffset}
        />

        {/* Huruf "M" */}
        <path
          stroke="url(#gradient1)"
          strokeWidth="8" // Stroke dipertebal
          d={secondPath}
          strokeDasharray={evolution2.strokeDasharray}
          strokeDashoffset={evolution2.strokeDashoffset}
        />

        {/* Huruf "D" */}
        <path
          stroke="url(#gradient2)"
          strokeWidth="8" // Stroke dipertebal
          d={thirdPath}
          strokeDasharray={evolution3.strokeDasharray}
          strokeDashoffset={evolution3.strokeDashoffset}
        />
      </g>

      {/* Gradien untuk warna huruf */}
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="gradient0"
          x1="50"
          x2="90"
          y1="20"
          y2="80"
        >
          <stop stopColor="#FF0000" /> {/* Warna merah untuk "R" */}
          <stop offset="1" stopColor="#FF0000" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="gradient1"
          x1="110"
          x2="150"
          y1="20"
          y2="80"
        >
          <stop stopColor="#00FF00" /> {/* Warna hijau untuk "M" */}
          <stop offset="1" stopColor="#00FF00" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="gradient2"
          x1="170"
          x2="220"
          y1="20"
          y2="80"
        >
          <stop stopColor="#0000FF" /> {/* Warna biru untuk "D" */}
          <stop offset="1" stopColor="#0000FF" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};