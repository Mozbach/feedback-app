// Import useContext
// import FeedbackContext 

import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

/* START FeedbackStats
    - extract feedback from FeedbackContext 

    - create const average averageto get average score among ratings
    - fix average's scpre tp be no more than 1 decimal
    
    - return
        - div.feedback-stats
            > h4 with feedback's length to show the number of current reviews
            > h4 which shows the average rating: if isNan, show 0, else show average

    - export default
    END FeedbackStats*/

function FeedbackStats() {

    const { feedback } = useContext(FeedbackContext);

    // Calculate ratings average
    let average = feedback.reduce((acc, cur) => {
        return acc + cur.rating
    }, 0) / feedback.length;

        average = average.toFixed(1).replace(/[.,]0$/, '');
        // sets decimal to maximum 1 digit. IE: 5.6. Not 5.6657
        // Regex replaces possible 0 at end of output to be nothing instead

    return <div className='feedback-stats'>
        <h4>{feedback.length} Reviews</h4>
        <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
    </div>
}

export default FeedbackStats;