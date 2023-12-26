/* START IMPORTS    
- import PropTyps
- write Header function function, takes:
    - text as prop
    - bgColor as prop
    - textColor as prop

    - create const from HeaderStyles
    - backgroundColor takes bgColor prop as value
    - color: takes textColor prop as value

- return header tag with inline style from headerStyles
- wrapping a div className="container"
- wrapping h2 with text prop

- Header.defaultProps
    - text: feedbackUi
    - bgColor: 'rgba(0, 0, 0, 0.4)
    - textColor: '#ff6a95'

- Header.propTypes
    - text: string
    - bgColor: string
    textColor: string

- export default header
END IMPORTS*/

import PropTypes from 'prop-types'

function Header({ text, bgColor, textColor }) {
    const headerStyles = {
        backgroundColor: bgColor,
        color: textColor 
    }

  return (
    <header style={headerStyles}>
        <div className="container">
            <h2>{ text }</h2>
        </div>
    </header>
  )
}

Header.defaultProps = {
    text: "Feedback UI",
    bgColor: 'rgba(0, 0, 0, 0.4)',
    textColor: '#ff6a95'
}


Header.propTypes = {
    text: PropTypes.string,
    bgColor: PropTypes.string,
    textColor: PropTypes.string
}

export default Header