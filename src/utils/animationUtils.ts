
import { cn } from '@/lib/utils';

// Animation class generator for fade in with configurable delay
export const fadeIn = (delay?: number) => {
  return cn(
    "animate-fade-in",
    delay === 1 ? "animate-delay-1" : 
    delay === 2 ? "animate-delay-2" : 
    delay === 3 ? "animate-delay-3" : ""
  );
};

// Animation class generator for scale in with configurable delay
export const scaleIn = (delay?: number) => {
  return cn(
    "animate-scale-in", 
    delay === 1 ? "animate-delay-1" : 
    delay === 2 ? "animate-delay-2" : 
    delay === 3 ? "animate-delay-3" : ""
  );
};

// Animation class generator for slide in with configurable delay
export const slideIn = (delay?: number) => {
  return cn(
    "animate-slide-in",
    delay === 1 ? "animate-delay-1" : 
    delay === 2 ? "animate-delay-2" : 
    delay === 3 ? "animate-delay-3" : ""
  );
};

// Animation for list items with staggered delays
export const getStaggeredAnimation = (index: number, baseDelay: number = 50) => {
  return {
    animationDelay: `${baseDelay * index}ms`
  };
};
