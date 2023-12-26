// import propTypes

import PropTypes from 'prop-types';

// create Button function with children, version, type and isDisabled as props
function Button({children, version, type, isDisabled}) {
// in return, create abutton with className={`btn btn-${version}`}>, button's content must hold {children}
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
        {children}
    </button>
  )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    version: PropTypes.string,
    type: PropTypes.string,
    isDisabled: PropTypes.bool
}

Button.defaultProps = {
    version: 'primary',
    type: 'button',
    isDisabled: false
}

export default Button