import { extend } from '@react-three/fiber';
import * as THREE from 'three';

// Extend react-three-fiber to include all THREE namespace elements.
// Using a try-catch block prevents the entire app from crashing if three.js initialization fails.
try {
  // @ts-ignore
  extend(THREE as any);
} catch (error) {
  console.error("Vision: Failed to extend THREE namespace. 3D elements may not render.", error);
}