export type AnimationType = "fade" | "expand" | "elastic";

// Configuration Animation
export const getAnimationConfig = (animationType: AnimationType) => {
  switch (animationType) {
    case "fade":
      return { duration: 200 };
    case "expand":
      return { mass: 1, friction: 30, tension: 300 };
    case "elastic":
      return { mass: 1, friction: 18, tension: 250 };
  }
};
