import React from 'react';
import styles from './styles.module.css';
import { useCarContext } from '../../contexts/Cars/useCarsContext';
import { XIcon } from 'lucide-react';
import { CarsActionTypes } from '../../contexts/Cars/CarsActions';

export function Modal() {
  const { state, dispatch } = useCarContext();
  const { car } = state;
  function handleCloseModal(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    dispatch({ type: CarsActionTypes.SET_CAR, payload: null });
  }

  if (car) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContainer}>
          <button className={styles.modalClose} onClick={handleCloseModal}>
            <XIcon />
          </button>
          <div className={styles.modalContent}>
            <h1>Contato do anuncionate</h1>
            <br />
            <span>Nome: {car.dealer.name}</span>
            <span>email: {car.dealer.email}</span>
            <span>phone: {car.dealer.phone}</span>
          </div>
        </div>
      </div>
    );
  } else {
    return;
  }
}
