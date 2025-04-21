import React, { useState } from 'react';
import { Car } from '../../Models/car.model';
import styles from './styles.module.css';

type CarrousselType = {
  full_name: Car['full_name'];
  images: Car['images'];
};

export function Carrouseel({ full_name, images }: CarrousselType) {
  const defaultSrc =
    'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg';

  const [image, setImage] = useState(() => {
    if (images && images.length > 0) {
      return images[0];
    } else {
      return defaultSrc;
    }
  });

  function handleChangeImage(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    index: number,
  ) {
    e.preventDefault();
    const src = images ? images[index] : defaultSrc;
    setImage(src);
  }

  return (
    <div className={styles.CarrousselContainer}>
      <img src={image} alt={full_name} />
      <div className={styles.CarrousselMenu}>
        {images &&
          Array.from(Array(images.length).keys()).map(i => {
            return (
              <a
                className={`${styles.carrousselItemMenu} ${
                  image == images[i] ? styles.selected : ''
                }`}
                key={i}
                onClick={e => handleChangeImage(e, i)}
              ></a>
            );
          })}
      </div>
    </div>
  );
}
