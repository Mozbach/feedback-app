/* START IMPORTS
    - FaTimes, FaEdit
    - PropTypes
    - Card
    - useContext
    - FeedbackContext
    END IMPORT */

import { FaTimes, FaEdit } from 'react-icons/fa';
import PropTypes from 'prop-types';
import Card from './shared/Card.jsx';
import { useContext} from 'react';
import FeedbackContext from '../context/FeedbackContext.js';

/* START FeedbackItem
    - Takes item as prop (Is it needed?)
    - create context object for
      - deleteFeedback
      - editFeedback
    
    - return 
      - Card component to wrap 
        - div.num-display
          > item.rating (So yes, prop is needed)
        - button
          - onClick deleteFeedback item.id
          - className = close
          - Holds FaTimes color='purple
        - Button
          - onClick editFeedback item
          - className = edit
          - Holds FaEdit color='purple'
        - div.text-display 
          - Holds item.text

      - Set up propTypes from item which is an object
    
    END */

function FeedbackItem({item}) {

  const { deleteFeedback, editFeedback } = useContext(FeedbackContext);

  
  return (
    <Card>
        <div className="num-display">{item.rating}</div>
        <button onClick={ () => deleteFeedback(item.id)} className="close"><FaTimes color='purple'/></button>
        <button onClick={() => editFeedback(item)} className='edit'><FaEdit color='purple' /></button>
        <div className="text-display">{item.text}</div>
    </Card>
  )
}

FeedbackItem.propTypes = {
    item: PropTypes.object.isRequired
}

export default FeedbackItem