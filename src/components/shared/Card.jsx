import PropTypes from 'prop-types';

function Card({ children, reverse }) {
    // return <div className={`card  ${reverse && 'reverse'} `}>{children}</div>
    // ${reverse && reverse} basically says "if the component has the prop of reverse, add the class of 'reverse' "
    return (
        <div className="card" style={{
            backgroundColor: reverse ? 'rgba(0, 0, 0, 0.4)' : '#fff',
            // above reads "if reverse is prop is passed in as true, set backgroundColor to rgba(0,0,0,0.4), else white"
            color: reverse ? '#fff' : '#000'
            // Above reads: "if reverse prop is passed in as true, set color as white, else black"
            // So this is an example of conditional styling as opposed to the conditional class
        }}>
            {children}
        </div>
    )
}


Card.defaultProps = {
    reverse: false
}
// above in defaultProps for card we set default props for Card component.

Card.propTypes = {
    children: PropTypes.node.isRequired,
    reverse: PropTypes.bool
}
export default Card;