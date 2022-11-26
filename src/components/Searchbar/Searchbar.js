import { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'components/IconButton/IconButton';
import { ReactComponent as IconSearch } from '../../icons/search.svg';
import css from './Searchbar.module.css';

export default function Searchbar({ onSubmit, isSubmitting }) {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const correctQuery = query.trim();
    if (!correctQuery) {
      return alert('Field cannot be empty');
    }

    onSubmit(correctQuery);
    setQuery('');
  };


  return (
    <header className={css.searchBar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <IconButton aria-label="submit search query" disabled={isSubmitting}>
          <IconSearch width="20px" height="20px" />
        </IconButton>

        <input
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          value={query}
          onChange={handleChange}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

