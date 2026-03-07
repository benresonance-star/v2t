import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Mic, Pause, Play } from 'lucide-react';
import clsx from 'clsx';
import { MicButtonProps } from './MicButton.types';
import styles from './MicButton.module.css';

export const MicButton: React.FC<MicButtonProps> = ({
  state = "idle",
  icon = "mic",
  size = 84,
  disabled = false,
  onClick,
  ariaLabel = "Microphone",
  className,
}) => {
  const isListening = state === "listening";
  const isDisabled = disabled || state === "disabled";

  const renderIcon = () => {
    const iconSize = size * 0.4;
    const strokeWidth = 2.5;

    switch (icon) {
      case "pause":
        return <Pause size={iconSize} strokeWidth={strokeWidth} fill="currentColor" />;
      case "play":
        return <Play size={iconSize} strokeWidth={strokeWidth} fill="currentColor" />;
      case "mic":
      default:
        return <Mic size={iconSize} strokeWidth={strokeWidth} />;
    }
  };

  // Animation variants
  const containerVariants: Variants = {
    idle: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -1 },
    pressed: { scale: 0.97, y: 1 },
    disabled: { scale: 1, y: 0 }
  };

  const bloomVariants: Variants = {
    idle: { opacity: 0.4, scale: 1 },
    listening: { 
      opacity: [0.4, 0.8, 0.4],
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.button
      className={clsx(
        styles.container,
        isListening && styles.listening,
        isDisabled && styles.disabled,
        className
      )}
      style={{ width: size, height: size }}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
      initial="idle"
      whileHover={!isDisabled ? "hover" : undefined}
      whileTap={!isDisabled ? "pressed" : undefined}
      variants={containerVariants}
    >
      {/* Background Bloom (The soft red energy) */}
      <motion.div 
        className={styles.bloom}
        variants={bloomVariants}
        animate={isListening ? "listening" : "idle"}
      />

      {/* Lower Edge Glow (The tighter red tint) */}
      <div className={styles.edgeGlow} />

      {/* The Glass Shell */}
      <div className={styles.shell}>
        {/* Top Reflection */}
        <div className={styles.reflection} />
        
        {/* Icon */}
        <div className={styles.iconWrapper}>
          {renderIcon()}
        </div>
      </div>
    </motion.button>
  );
};
