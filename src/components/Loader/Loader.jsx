import React from "react";

// Loader component displaying a spinning and filling box as a loading indicator
const Loader = () => {
  return (
    // Container with background and text styles
    <div className="bg-slate-900 text-white min-h-screen flex justify-center items-center">
      {/* SVG element for the loader animation */}
      <svg
        className="w-32 h-32"
        version="1.1"
        id="L6"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enableBackground="new 0 0 100 100"
        xmlSpace="preserve"
      >
        {/* Border rectangle for the spinning effect */}
        <rect
          fill="none"
          stroke="#fff"
          strokeWidth="4"
          x="25"
          y="25"
          width="50"
          height="50"
        >
          {/* Rotation animation for the border rectangle */}
          <animateTransform
            attributeName="transform"
            dur="0.5s"
            from="0 50 50"
            to="180 50 50"
            type="rotate"
            id="strokeBox"
            attributeType="XML"
            begin="rectBox.end"
          />
        </rect>
        {/* Filling rectangle for the filling effect */}
        <rect x="27" y="27" fill="#fff" width="46" height="50">
          {/* Height reduction animation for the filling rectangle */}
          <animate
            attributeName="height"
            dur="1.3s"
            attributeType="XML"
            from="50"
            to="0"
            id="rectBox"
            fill="freeze"
            begin="0s;strokeBox.end"
          />
        </rect>
      </svg>
    </div>
  );
};

export default Loader;
