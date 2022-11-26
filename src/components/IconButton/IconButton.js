import PropTypes from 'prop-types';
import css from './IconButton.module.css';

const IconButton = ({
  children,
  type = 'submit',
  disabled = false,
  ...allyProps
}) => {
  return (
    <button
      className={css.searchFormButton}
      type={type}
      disabled={disabled}
      {...allyProps}
    >
      {children}
    </button>
  );
};

IconButton.propTypes = {
  disabled: PropTypes.bool,
  type: PropTypes.string,
  'aria-label': PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default IconButton;
