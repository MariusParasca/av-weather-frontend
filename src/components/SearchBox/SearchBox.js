import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(() => ({
  searchRoot: {
    backgroundColor: '#FFFFFF',
    borderRadius: '6px',
    fontSize: '1.1em',
  },
}));

const SearchBox = props => {
  const { placeholder, className } = props;

  const classes = useStyles();

  return (
    <div className={className}>
      <TextField
        type="search"
        variant="outlined"
        margin="dense"
        placeholder={placeholder}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          classes: { root: classes.searchRoot },
        }}
      />
    </div>
  );
};

SearchBox.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

SearchBox.defaultProps = {
  placeholder: '',
  className: '',
};

export default SearchBox;
