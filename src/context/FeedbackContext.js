/* START IMPORTS
    - createContext, useState
    - v4 as uuidv4
    - const FeedbackContext = createContext();
        ? I want to get more information on this above point
    
        export const FeedbackProvider, with ({children}) => {}
    - within FeedbackProvider
        - create data object as a state
            > const [feedback, setFeedback] = useState([ {id: 1, text: 'Sample Text', rating }, * 5 ])
        - create [feedbackEdit, setFeedbackEdit] = useState({item: {}, edit false})

        - create deleteFeedback function
        - create addFeedback function
        - create editFeedback function
        - create updateFeedback function
            - above functions are all const methods
            - they will take some pracice, but master them individually
        - finally, return ( 
            <FeedbackContext.Provider
                value={{ *PASS IN ALL METHODS TO EXPORT*
                    feedback,
                    feedbackEdit, // this is the actual state that holds the item and boolean
                    deleteFeedback,
                    addFeedback,
                    editFeedback, //This is the function that runs when we click the button
                    updateFeedback
                }}
            >
            - pass {children}
            - close <FeedbackContext.provider />
        )
    END IMPORTS*/

import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState([
      {
        id: 1,
        text: 'This is feedbackItem 1',
        rating: 10
      },
      {
        id: 2,
        text: 'This is feedbackItem 2',
        rating: 8
      },
      {
        id: 3,
        text: 'This is feedbackItem 3',
        rating: 5
      },
      {
        id: 4,
        text: 'This is feedbackItem 4',
        rating: 7
      },
      {
        id: 5,
        text: 'This is feedbackItem 5',
        rating: 5
      },
    ]);

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    });

    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete this entry?')) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback])
    }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    const updateFeedback = (id, updItem) => {
        // Call setFeedback and return an array with the newly updated item
        // do this by mapping through the item in feedback
        // is the item id === the id of the item we want to update
        // if so spread across current item and the new updItem
        // else, just return item -> I get it more now
        setFeedback(feedback.map((item) => item.id === id ? {...item, ...updItem} : item))
    }

   
    return (
      <FeedbackContext.Provider
        value={{
          feedback,
          feedbackEdit, // this is the actual state that holds the item and boolean
          deleteFeedback,
          addFeedback,
          editFeedback, //This is the function that runs when we click the button
          updateFeedback
        }}
      >
        {children}
      </FeedbackContext.Provider>
    )
  }

export default FeedbackContext