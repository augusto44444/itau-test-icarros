import { Card } from '../../components/Card';
import { Header } from '../../components/Header';
import { Modal } from '../../components/Modal';
import { useCarContext } from '../../contexts/Cars/useCarsContext';
import styles from './styles.module.css';

export function Home() {
  const { state } = useCarContext();
  return (
    <>
      <div className={styles.mainContainer}>
        <Header />
        <div className={styles.content}>
          {state.cars.map(car => {
            return <Card car={car} key={car.id} />;
          })}
        </div>
      </div>
      <Modal />
    </>
  );
}
