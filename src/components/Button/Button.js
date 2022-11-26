import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ children, type = 'button', onClick }) => (
  <button type={type} className={css.button} onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Button;
