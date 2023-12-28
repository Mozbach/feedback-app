/* START IMPORTS
    - createContext, useState
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

import { createContext, useState, useEffect } from 'react';
const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState([]);

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    });

    // useEffect to launch data as soon as page loads
    useEffect(() => {
        fetchFeedback();
    }, [])

    // Fetch Feedback
    const fetchFeedback = async () => {
        const response = await fetch(`/feedback?_sort=id&_order=desc`);
        const data = await response.json();

        setFeedback(data);
        setIsLoading(false);
    }

    const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure you want to delete this entry?')) {
            await fetch(`/feedback/${id}`, { method: 'DELETE' })
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    // add feedback
    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        });
        const data = await response.json();
        setFeedback([data, ...feedback])
    }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    const updateFeedback = async (id, updItem) => {
        // Call setFeedback and return an array with the newly updated item
        // do this by mapping through the item in feedback
        // is the item id === the id of the item we want to update
        // if so spread across current item and the new updItem
        // else, just return item -> I get it more now
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updItem)
        });

        const data = await response.json()

        setFeedback(feedback.map((item) => item.id === id ? {...item, ...data} : item))
    }

   
    return (
      <FeedbackContext.Provider
        value={{
          feedback,
          feedbackEdit, // this is the actual state that holds the item and boolean
          isLoading, //to be extracted in the list component
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