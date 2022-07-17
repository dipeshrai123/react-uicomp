import styled from 'styled-components';

const Container = styled.div``;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Loader = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid ${(props) => props.color};
  border-top: 2px solid transparent};
  animation: loaderAnimation 1s linear infinite;

  @keyframes loaderAnimation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export function LoadingIndicator({ color }: { color: string }) {
  return (
    <Container>
      <LoaderWrapper>
        <Loader color={color} />
      </LoaderWrapper>
    </Container>
  );
}
