import React from "react";

function Logo() {
  return (
    <div className="relative h-12 w-44 mt-5 overflow-hidden">
      <img
        src="/cv-logo.png"
        alt="CV Genie logo"
        className="absolute left-0 top-1/2 h-44 w-44 -translate-y-1/2 object-contain"
      />
    </div>
  );
}

export default Logo;
