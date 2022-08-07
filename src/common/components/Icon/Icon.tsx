/* eslint-disable indent */
import { ReactSVG } from 'react-svg';
import styled, { css } from 'styled-components';
import cx from 'classnames';

import { IconNames } from './iconNames';

import './Icon.less';

const StyledSVGIcon = styled(ReactSVG)<{ size: number; color: string; rotate: number }>`
  ${({ size }) =>
    size &&
    css`
      width: ${size}px;
      height: ${size}px;
    `}

  @media only screen and (max-width: 991.98px) {
    width: 24px;
    height: 24px;
  }

  svg {
    fill: '#324457';
    ${({ color }) =>
      color &&
      css`
        color: ${color};
      `}
    ${({ size }) =>
      size &&
      css`
        width: ${size}px;
        height: ${size}px;

        @media only screen and (max-width: 991.98px) {
          width: 24px;
          height: 24px;
        }
      `}
    ${({ rotate }) =>
      rotate &&
      css`
        transform: rotate(${rotate}deg);
      `}
  }
`;

const Icon = ({ className, color, size, rotate, name, dataTestId }: IProps): JSX.Element | null => {
  if (!name) return null;

  return (
    <StyledSVGIcon
      className={cx('sq--icon', className, name)}
      src={`/images/${name}.svg`}
      color={color}
      size={size}
      rotate={rotate}
      data-testid={dataTestId}
    />
  );
};

export interface IProps {
  /**
   * The icon name.
   */
  name: IconNames;

  /**
   * The CSS class name.
   */
  className?: string;

  /**
   * The color of `svg`.
   */
  color?: string;

  /**
   * The `svg` `height` and `width` attribute.
   */
  size?: number;

  /**
   * Rotate `svg` attribute
   */
  rotate?: number;

  /**
   * Data test id
   */
  dataTestId?: string;
}

Icon.defaultProps = {
  color: 'inherit',
  size: 16,
  rotate: 0,
  dataTestId: 'icon',
};

export default styled(Icon)``;
