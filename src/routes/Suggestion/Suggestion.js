import React from 'react';
// import PropTypes from 'prop-types';

import SuggestionList from 'components/SuggestionList/SuggestionList';
import styles from './Suggestion.module.css';

const Suggestion = () => {
  return (
    <div className={styles.container}>
      <SuggestionList />
    </div>
  );
};

Suggestion.propTypes = {};

export default Suggestion;
