import React, { useEffect, useState } from "react";
import { IoMdMusicalNote } from "react-icons/io";
import { motion } from "framer-motion";

const FloatingMusicNotes = () => {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    const generatedIcons = Array.from({ length: 5 }).map(() => ({
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
      delay: Math.random() * 5, 
    }));
    setIcons(generatedIcons);
  }, []);

  return (
    <>
      {icons.map(({ top, left, delay }, i) => (
        <motion.div
          key={i}
          className="absolute text-[#FFFFFF] opacity-20 text-[150px] select-none pointer-events-none"
          style={{ top, left }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay,
          }}
        >
          <IoMdMusicalNote />
        </motion.div>
      ))}
    </>
  );
};

export default FloatingMusicNotes;
