import { useEffect } from 'react';
import { useAnimatedValue, AnimatedBlock, interpolate } from 'react-ui-animate';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 45px;
`;

const LoadingItem = styled(AnimatedBlock)`
  width: 5px;
  height: 5px;
  border-radius: 20px;
`;

const AnimatingItem = ({ color, index }: { color: string; index: number }) => {
  const animation = useAnimatedValue(0, {
    delay: index * 40,
    animationType: 'elastic',
    onAnimationEnd: function (value: any) {
      if (value === 1) {
        animation.value = 0;
      } else {
        animation.value = 1;
      }
    },
  });

  useEffect(() => {
    animation.value = 1;
  }, [animation]);

  return (
    <LoadingItem
      style={{
        backgroundColor: color,
        opacity: animation.value,
        height: interpolate(animation.value, [0, 1], [5, 16]),
      }}
    />
  );
};

export function LoadingIndicator() {
  return (
    <Wrapper>
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <AnimatingItem key={i} index={i} color="#c23dff" />
        ))}
    </Wrapper>
  );
}
