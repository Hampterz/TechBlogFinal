import React, { useState } from 'react';

import { cva } from "class-variance-authority";
import { motion } from 'framer-motion';
import { cn } from "../../utils/cn";
import Icon from '../AppIcon';

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-lg",
                outline: "border border-input hover:bg-accent hover:text-accent-foreground hover:shadow-md",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md",
                ghost: "hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
                link: "text-primary underline-offset-4 hover:underline",
                success: "bg-success text-success-foreground hover:bg-success/90 hover:shadow-lg",
                warning: "bg-warning text-warning-foreground hover:bg-warning/90 hover:shadow-lg",
                danger: "bg-error text-error-foreground hover:bg-error/90 hover:shadow-lg",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-lg px-3",
                lg: "h-11 rounded-xl px-8",
                icon: "h-10 w-10",
                xs: "h-8 rounded-lg px-2 text-xs",
                xl: "h-12 rounded-2xl px-10 text-base",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const Button = React.forwardRef(({ 
  className = '', 
  variant = 'default', 
  size = 'default', 
  iconName = null,
  iconPosition = 'left',
  iconSize = 16,
  children,
  fullWidth = false,
  animated = false,
  loading = false,
  disabled = false,
  onClick,
  ...props 
}, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const baseStyles = cn(
    'inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none',
    // Instant hover response
    'hover:scale-105 active:scale-95',
    {
      'w-full': fullWidth,
      'opacity-50 cursor-not-allowed': disabled || loading,
    }
  );

  const handleMouseEnter = () => {
    if (!disabled && !loading) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };

  const handleMouseDown = () => {
    if (!disabled && !loading) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleClick = (e) => {
    if (disabled || loading) {
      e?.preventDefault();
      return;
    }
    onClick?.(e);
  };

  // Icon size mapping based on button size
  const iconSizeMap = {
    xs: 12,
    sm: 14,
    default: 16,
    lg: 18,
    xl: 20,
    icon: 16,
  };

  const calculatedIconSize = iconSize || iconSizeMap?.[size] || 16;

  // Add variant and size style mappings
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-lg",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground hover:shadow-md",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md",
    ghost: "hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
    link: "text-primary underline-offset-4 hover:underline",
    success: "bg-success text-success-foreground hover:bg-success/90 hover:shadow-lg",
    warning: "bg-warning text-warning-foreground hover:bg-warning/90 hover:shadow-lg",
    danger: "bg-error text-error-foreground hover:bg-error/90 hover:shadow-lg",
  };

  const sizes = {
    default: "h-10 px-4 py-2 rounded-xl",
    sm: "h-9 rounded-lg px-3",
    lg: "h-11 rounded-xl px-8",
    icon: "h-10 w-10 rounded-xl",
    xs: "h-8 rounded-lg px-2 text-xs",
    xl: "h-12 rounded-2xl px-10 text-base",
  };

  // Loading spinner with animation
  const LoadingSpinner = () => (
    <motion.svg 
      className="animate-spin -ml-1 mr-2 h-4 w-4" 
      fill="none" 
      viewBox="0 0 24 24"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </motion.svg>
  );

  const renderIcon = () => {
    if (!iconName) return null;
    try {
      return (
        <motion.div
          whileHover={animated ? { 
            scale: 1.1, 
            rotate: 5,
            transition: { duration: 0.15, ease: "easeOut" }
          } : {}}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={cn(
            children && iconPosition === 'left' && "mr-2",
            children && iconPosition === 'right' && "ml-2"
          )}
        >
          <Icon
            name={iconName}
            size={calculatedIconSize}
          />
        </motion.div>
      );
    } catch {
      return null;
    }
  };

  if (animated) {
    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants?.[variant], sizes?.[size], className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
        disabled={disabled || loading}
        whileHover={{ 
          scale: disabled || loading ? 1 : 1.05,
          transition: { duration: 0.15, ease: "easeOut" }
        }}
        whileTap={{ 
          scale: disabled || loading ? 1 : 0.95,
          transition: { duration: 0.1, ease: "easeIn" }
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        {...props}
      >
        {/* Button shine effect on hover */}
        {animated && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
            whileHover={{ 
              opacity: [0, 0.1, 0],
              x: ["-100%", "100%"]
            }}
            transition={{ duration: 0.6 }}
            style={{ width: "50%" }}
          />
        )}
        {loading && <LoadingSpinner />}
        {iconName && iconPosition === 'left' && renderIcon()}
        <motion.span
          className="relative z-10"
          animate={loading ? { opacity: 0.7 } : { opacity: 1 }}
        >
          {children}
        </motion.span>
        {iconName && iconPosition === 'right' && renderIcon()}
      </motion.button>
    );
  }

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants?.[variant], sizes?.[size], className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
      disabled={disabled || loading}
      style={{
        transform: `scale(${isPressed ? '0.95' : isHovered ? '1.05' : '1'})`,
        transition: 'transform 0.1s ease' // Instant response
      }}
      {...props}
    >
      {/* Button shine effect on hover */}
      {animated && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
          whileHover={{ 
            opacity: [0, 0.1, 0],
            x: ["-100%", "100%"]
          }}
          transition={{ duration: 0.6 }}
          style={{ width: "50%" }}
        />
      )}
      {loading && <LoadingSpinner />}
      {iconName && iconPosition === 'left' && renderIcon()}
      <motion.span
        className="relative z-10"
        animate={loading ? { opacity: 0.7 } : { opacity: 1 }}
      >
        {children}
      </motion.span>
      {iconName && iconPosition === 'right' && renderIcon()}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;