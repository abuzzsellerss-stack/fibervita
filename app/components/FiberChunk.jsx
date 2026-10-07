'use client';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FiberChunk({ y, rotate, style, className }) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const img = new Image();
    img.src = '/api/image';
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      
      // Algorithm to remove the white background and feather the edges of the AI image
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];
        
        // Calculate distance from pure white (255, 255, 255)
        const distance = Math.sqrt(
          Math.pow(255 - r, 2) + 
          Math.pow(255 - g, 2) + 
          Math.pow(255 - b, 2)
        );
        
        if (distance < 50) {
          // Pure white background -> fully transparent
          data[i+3] = 0; 
        } else if (distance < 90) {
          // Soft edge feathering for smooth cutouts
          data[i+3] = Math.floor(((distance - 50) / 40) * 255);
        }
      }
      ctx.putImageData(imgData, 0, 0);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      style={{
        ...style,
        y,
        rotate,
      }}
      className={className}
    />
  );
}
