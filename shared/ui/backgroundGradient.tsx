import styled from 'styled-components';
import { Component } from 'shared/ui/components';

export type BackgroundGradientComponent = Component<
  'svg',
  {
    width: number;
    height: number;
  }
>;

export const BackgroundGradientSvgStyle = styled.svg<{
  width: number;
  height: number;
}>`
  position: fixed;
  z-index: -1;
  top: 50%;
  left: 50%;
  margin: ${({ height }) => -height / 2}px 0 0 ${({ width }) => -width / 2}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  pointer-events: none;
`;

export const BackgroundGradientStartStyle = styled.stop`
  stop-color: var(--lido-color-primary);
`;

export const BackgroundGradientStopStyle = styled.stop`
  stop-color: var(--lido-color-background);
`;

// svg gradient looks better than css gradient in some browsers

export const BackgroundGradient: BackgroundGradientComponent = (props) => {
  const { width, height, ...rest } = props;

  return (
    <BackgroundGradientSvgStyle width={width} height={height} {...rest}>
      <radialGradient id="background-gradient" cx="50%" y="50%">
        <BackgroundGradientStartStyle offset="0%" />
        <BackgroundGradientStopStyle offset="100%" />
      </radialGradient>
      <rect
        width={width}
        height={height}
        opacity=".1"
        fill="url(#background-gradient)"
      />
    </BackgroundGradientSvgStyle>
  );
};
