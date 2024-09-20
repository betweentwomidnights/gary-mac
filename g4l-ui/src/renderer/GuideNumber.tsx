// GuideNumber.tsx
import React, { useState, useRef, useEffect } from 'react';

interface GuideNumberProps {
  number: number;
  blurb: string;
}

const GuideNumber: React.FC<GuideNumberProps> = ({ number, blurb }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (showTooltip && tooltipRef.current) {
        const tooltip = tooltipRef.current;

        // Reset styles to defaults
        tooltip.style.left = '50%';
        tooltip.style.right = 'auto';
        tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.top = ''; // Remove any previous top settings
        tooltip.style.maxHeight = ''; // Reset maxHeight
        tooltip.style.overflowY = ''; // Reset overflowY

        // Hide tooltip temporarily to prevent flicker
        tooltip.style.visibility = 'hidden';
        tooltip.style.display = 'block';

        // Allow the browser to render the tooltip before calculating position
        setTimeout(() => {
          const tooltipRect = tooltip.getBoundingClientRect();
          const guideNumberRect = tooltip.parentElement?.getBoundingClientRect();

          // Calculate space above and below the guide number
          const spaceAbove = guideNumberRect ? guideNumberRect.top : 0;
          const spaceBelow = guideNumberRect
            ? window.innerHeight - guideNumberRect.bottom
            : 0;

          // Decide whether to place tooltip above or below
          if (spaceBelow >= tooltipRect.height) {
            tooltip.style.top = '100%';
          } else if (spaceAbove >= tooltipRect.height) {
            tooltip.style.top = `-${tooltipRect.height}px`;
          } else {
            if (spaceBelow >= spaceAbove) {
              tooltip.style.top = '100%';
              tooltip.style.maxHeight = `${spaceBelow}px`;
              tooltip.style.overflowY = 'auto';
            } else {
              tooltip.style.top = `-${spaceAbove}px`;
              tooltip.style.maxHeight = `${spaceAbove}px`;
              tooltip.style.overflowY = 'auto';
            }
          }

          // Now check left/right edges and adjust accordingly
          const updatedTooltipRect = tooltip.getBoundingClientRect();
          
          if (updatedTooltipRect.right > window.innerWidth) {
            tooltip.style.left = 'auto';
            tooltip.style.right = '0';
            tooltip.style.transform = 'translateX(0)';
          }

          if (updatedTooltipRect.left < 0) {
            tooltip.style.left = '0';
            tooltip.style.right = 'auto';
            tooltip.style.transform = 'translateX(0)';
          }

          // Restore visibility after positioning
          tooltip.style.visibility = 'visible';
        }, 10); // Add a short delay to allow DOM rendering
      }
    }, [showTooltip]);


  return (
    <div
      className="guide-number"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {number}
      {showTooltip && (
        <div className="tooltip" ref={tooltipRef}>
          {blurb}
        </div>
      )}
    </div>
  );
};

export default GuideNumber;
