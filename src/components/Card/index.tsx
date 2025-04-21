import { HeartIcon } from 'lucide-react';
import { CarModel } from '../../Models/car.model';
import styles from './styles.module.css';
import { Carrouseel } from '../Carroussel';
import { Button } from '../Button';
import { useCarContext } from '../../contexts/Cars/useCarsContext';
import { CarsActionTypes } from '../../contexts/Cars/CarsActions';

type cardProps = {
  car: CarModel;
};

export function Card({ car }: cardProps) {
  const { dispatch } = useCarContext();

  const carPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(car.price);

  function handleLike(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    dispatch({ type: CarsActionTypes.INTERACT_CAR, payload: car });
  }

  function handleSetCar(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    dispatch({ type: CarsActionTypes.SET_CAR, payload: car });
  }

  return (
    <div className={styles.cardContainer}>
      {/* imagens vao vir primeiro */}
      <div className={styles.imagesContainer}>
        <Carrouseel full_name={car.full_name} images={car.images} />
      </div>
      {/* Aqui vem a primeira informacao do carro com o botao de favorito */}
      <div className={styles.infoContainer}>
        <div className={styles.firstInfoContainer}>
          <div className={styles.firstInfo}>
            <span className={styles.title}>{car.short_name}</span>
            <span className={styles.secondary}>{car.full_name}</span>
            <span className={styles.secondary}>{car.transmission}</span>
          </div>
          <div className={`${styles.icon}`}>
            <a href='#' onClick={handleLike}>
              <HeartIcon className={car.liked ? styles.liked : ''} />
            </a>
          </div>
        </div>
        {/* Aqui vem a segunda informacao do carro com preco */}
        <div className={styles.priceContainer}>
          <span className={styles.title}>{carPrice}</span>
        </div>
        {/* agora vem o revendedor com o ano e localizacao e kms */}
        <div className={styles.lastItensContainer}>
          <div className={styles.lastInfoContainer}>
            <span
              className={
                !car.dealer.company ? styles.secondary : styles.vendedor
              }
            >
              {car.dealer.company ? car.dealer.name : 'vendedor particular'}
            </span>
            <span className={styles.secondary}>{car.year}</span>
          </div>
          <div className={styles.lastInfoContainer}>
            <span className={styles.secondary}>{car.location}</span>
            <span className={styles.secondary}>
              km {car.kilometers.toLocaleString('pt-BR')}
            </span>
          </div>
        </div>
        <Button onClick={handleSetCar}>Contanto</Button>
      </div>
    </div>
  );
}
//   );
