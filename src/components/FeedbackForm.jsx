/* START IMPORTS 
- useState, usecontext, useEffect
- RatingSelect
- Card
- Button
- FeedbackContext
END IMPORTS*/
import { useState, useContext, useEffect } from 'react';
import RatingSelect from './RatingSelect.jsx';
import Card from './shared/Card.jsx';
import Button from './shared/Button.jsx';
import FeedbackContext from '../context/FeedbackContext.js';

/* START FeedbackForm
- Create FeedbackForm function, no props required since we are using useContext
- Create State Variables
    - text
    - rating
    - btnDisabled
    - message

- Call Context methods
    - addFeedback
    - feedbackEdit
    - updateFeedback
        * = useContext(FeedbackContext);

- useEffect function
- Create handleTextChange function
- Create handleSubmit function
- return (
    - Card
    - form
    - H2
    - RatingSelect
    - div.input-group
    - input
        > onChange handleTextChange
        > vlaue = text state variable 
    - Submit button isDisabled = btnDisabled state
    - /div.input-group
    - message true? Create div.message {message} 
)
end FeedbackForm*/

function FeedbackForm() {
    // Set up state variables
    const [text, setText] = useState('');
    const [rating, setRating] = useState(10);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState('');

    // Set up useContext
    const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext);

    /*START useEffect
     - call useEffect with a callback Function
     - if feedbackEdit's edit boolean is true:
        - setBtnDisabled to false
        - setText to feedbackEdit.item.text
        - setRating to feedbackEdit.item.rating
        - dependency: feedbackEdit
    END useEffect*/
    useEffect(() => {
        if(feedbackEdit.edit === true) {
            setBtnDisabled(false);
            setText(feedbackEdit.item.text);
            setRating(feedbackEdit.item.rating);
        }
    }, [feedbackEdit]) // array of dependencies. If none is provided, it will run on page load -> In this case

// Then create handleTextChange function, an event (e) driven arrow function which checks if text === '', setBtnDisabled(true), setMessage(null). else if text !== '' && text.trim().length <= 10, setMessage to indicate minimum of 10 char length, setBtnDisabled(true). else setMessage(null) (this clears the message state variable) and setBtnDisabled(false) -> Making the button clickable. Then, setText(e.target.value)
    /*START handleTextChange
    - event driven function

    - if text is '':
        - setBtnDisabled boolean to true
        - setMessage to null
    - else if text is not '' but the length is <= 10
        - setMessage to explain minimum char length is 10
        - setBtnDisabled boolean to true
    - else 
        - setMessage to null
        - setBtnDisabled boolean to false (making the button clickable)

    - setText e.target.value
    
     END handleTextChange */
    const handleTextChange = (e) => {
        if(text === '') {
            setBtnDisabled(true);
            setMessage(null);
        } else if(text !== '' && text.trim().length <= 10) {
            setMessage("Text must be at least 10 characters");
            setBtnDisabled(true);
        } else {
            setMessage(null);
            setBtnDisabled(false)
        }
        setText(e.target.value);
    }

// Then create the handleSubmit function. An event (e) driven function which prevents default of the form
// if text.trim().length > 10 create a new object called 'newFeedback' holding text and rating: const newFeedback = {text, rating}.
//run handleAdd function passed as prop from App, giving it newFeedback as parameter
// clear setText value: setText('')
    /* START handleSubmit
    - event driven function
    - prevent form default

    - if text's lenth > 10, create newFeedback object
        - Holding text
        - holding rating
    
    - if feedbackEdit.edt boolean is true
        - uppdateFeedback(feedbackEdit.item.id, newFeedback) (I need an explanation) -> passes the item's id and the newFeedback item to feedbackEdit method in context
            > To My mind... if the 'edit' button is true for THAT entry, take the newFeedback and make it THAT feedback, so - overwrite
    - else 
        - addFeedback(newFeedback) 

    - setText ''
    END handleSubmit */
    const handleSubmit = (e) => {
        e.preventDefault();
        if(text.trim().length > 10) {
            const newFeedback = {
                text,
                rating
            }

            if(feedbackEdit.edit === true) {
                updateFeedback(feedbackEdit.item.id, newFeedback)
            } else {
                addFeedback(newFeedback);
            }
            setText('');
            setBtnDisabled(true);
        } else {
            setMessage("Your review must have at least 10 characters.");
        }
    }
    /*
    - finally launch the return 
    - within return , use Card to wrap the form
    - form should have onsubmit={handleSubmit}
    - give h2 title in the form
    - use RatingSelect component, passing select={(rating) => setRating(rating)} as prop
    - create input-group div
    - within input-group, create input field which has onChange={handleTextChange} method, and a type of 'text' with placeholder of 'Write a review'... and importantly, value={text}
    - Place Button component using isDisabled={btnDisabled} state variable
    - outside the div, still within the form, create {message && <div className="message">{message}</div>
    */
  return (
        <Card> 
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your service with us?</h2>
                <RatingSelect select={(rating) => setRating(rating)} />
                <div className="input-group">
                    <input onChange={handleTextChange} type="text" placeholder="Write a review!" value={text}/>
                    <Button type="submit" isDisabled={btnDisabled}>
                        Submit
                    </Button>
                </div>

                {message && <div className="message">{message}</div>}
            </form>
        </Card>
  )
}

export default FeedbackForm