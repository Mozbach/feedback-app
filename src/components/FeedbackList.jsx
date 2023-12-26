/* START IMPORTS
    - useContext
    - FeedbackItem
    - FeedbackContext
    END IMPORTS*/

import {motion, AnimatePresence} from 'framer-motion'
import { useContext } from 'react';
import FeedbackItem from './FeedbackItem.jsx';
import FeedbackContext from '../context/FeedbackContext.js';

/* START FeedbackList
    - create FeedbackList function
    - extract feedback from useContext(FeedbackContext)
    - check if !feedback or feedback's length is 0, then return <p>No Feedback Message</p>
    - return (
        - div.feedback-list
        - feedback.map((item) => (
            <FeedbackItem key={item.id} item={item} />
        ))
    )
    - I can wrap the map in AnimatePresence, but that is a bit besides the point right now
    
    END */
function FeedbackList() {

    const {feedback} = useContext(FeedbackContext);

    if(!feedback || feedback.length === 0) {
        return <p>No Feedback just yet...</p>
    }

    return (
        <div className="feedback-list">
            <AnimatePresence>
                {feedback.map((item) => (
                    <motion.div
                    key={item.id}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    >
                        <FeedbackItem key={item.id} item={item} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
      )

//   return (
//     <div className="feedback-list">
//         {feedback.map((item) => (
//             <FeedbackItem key={item.id}
//             item={item}
//             handleDelete={handleDelete} />
//         ))}
//     </div>
//   )
}

export default FeedbackList