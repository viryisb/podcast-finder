import styles from './SearchBar.module.css';

export default function SearchBar() {
  return (
    <div className={styles.filterForm}>
      <form
        className={styles.inputContainer}
        role='search'
        title='Filter podcast'
      >
        <img
          className={styles.logo}
          src='../images/search.svg'
          alt=''
          width='40'
        />
        <input
          type='search'
          role='searchbox'
          id='search-input'
          name='search-input'
          placeholder='Filter podcast'
          className={styles.input}
        />
      </form>
    </div>
  );
}
