import PropTypes from 'prop-types';

export const Error = ({ message }) => <p className="red darken-4 error">{message}</p>;

Error.propTypes = {
  message: PropTypes.string.isRequired,
};
