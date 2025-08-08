import { useEffect, useState } from 'react';
import { isInStudio } from '~/utils/studioDetection';

export function DisablePreviewMode() {
  const [inStudio, setInStudio] = useState(false);

  useEffect(() => {
    setInStudio(isInStudio());
  }, []);

  // Only show the banner when NOT in studio
  if (inStudio) {
    return null;
  }

  return (
    <div style={{ 
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#f39c12', 
      color: 'white', 
      padding: '8px 16px', 
      textAlign: 'center', 
      fontSize: '14px',
      zIndex: 1000
    }}>
      🔍 Preview Mode Active - <a href="/api/preview-mode/disable" style={{ color: 'white', textDecoration: 'underline' }}>Exit Preview</a>
    </div>
  );
}