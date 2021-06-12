import NextNProgress from "nextjs-progressbar";
import React from "react";

const ProgressBar: React.FC = () => {
  return (
    <>
      <NextNProgress
        color="#ff572f"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        // showOnShallow={true}
      />
    </>
  );
};

export default ProgressBar;
