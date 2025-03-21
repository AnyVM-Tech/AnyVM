import 'framer-motion';

declare module 'framer-motion' {
  export interface HTMLMotionProps<T extends HTMLElement> {
    className?: string;
  }
}