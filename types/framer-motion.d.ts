import 'framer-motion';

declare module 'framer-motion' {
  // This extends the correct interface that's used by the motion components
  export interface MotionProps {
    className?: string;
  }
  
  // Keep the existing interface augmentation as well
  export interface HTMLMotionProps<T extends HTMLElement> {
    className?: string;
  }
}