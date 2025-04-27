import { useRef } from 'react';
import { CarsActionTypes } from '../../contexts/Cars/CarsActions';
import { useCarContext } from '../../contexts/Cars/useCarsContext';
import styles from './styles.module.css';
import { SearchIcon } from 'lucide-react';

export function Header() {
  const { dispatch } = useCarContext();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputRef.current) return;

    dispatch({
      type: CarsActionTypes.SEARCH_CAR,
      payload: inputRef.current!.value.trim(),
    });
  }

  return (
    <header className={styles.container} aria-label='cabeçalho'>
      <div className={styles.logoContainer}>
        <h1 className={styles.logo}  aria-label='Logo icarros'>Icarros</h1>
      </div>
      <div className={styles.searchContainer}>
        <form onSubmit={handleSubmit} aria-label="Formulário de Pesquisa">
          <div className={styles.searchBox}>
            <SearchIcon  className={styles.searchIcon}/>
            <input
              type='text'
              placeholder='Pesquisar por marca'
              ref={inputRef}
            />
          </div>
        </form>
      </div>
    </header>
  );
}
