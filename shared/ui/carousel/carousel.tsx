import {
  Children,
  FC,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  isValidElement,
} from 'react';
import { SwiperProps, SwiperSlide } from 'swiper/react';
import { SwiperStyled } from './carouselStyles';
import 'swiper/css';

export type CarouselProps = SwiperProps;

export const Carousel: FC<PropsWithChildren<CarouselProps>> = ({
  children,
  ...rest
}) => {
  return (
    <SwiperStyled
      grabCursor={true}
      slidesPerView={'auto'}
      spaceBetween={16}
      {...rest}
    >
      {Children.toArray(children)
        .filter((child) => isValidElement(child))
        .map((child) => (
          <SwiperSlide key={(child as { key?: string })?.key}>
            {({ isActive }) =>
              cloneElement(child as ReactElement, { isActive })
            }
          </SwiperSlide>
        ))}
    </SwiperStyled>
  );
};
