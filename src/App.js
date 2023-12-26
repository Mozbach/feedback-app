/* START IMPORTS 
- BrowserRouter
- Header
- FeedbackList
- FeedbackForm
- FeedbackStats
- FeedbackProvider
- AboutPage
- AboutIconLink
END IMPORTS*/

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import FeedbackList from './components/FeedbackList.jsx';
import FeedbackForm from './components/FeedbackForm.jsx';
import FeedbackStats from './components/FeedbackStats.jsx';
import { FeedbackProvider } from './context/FeedbackContext.js';
import AboutPage from './components/pages/AboutPage.jsx';
import AboutIconLink from './components/AboutIconLink.jsx';

/* START App()
- return FeedbackProvider holding a Router, FeedbackProvider Wraps ALL of the return contents - nothing outside of it
- Router Holds Header, and a <div className="container"></div>
- <div className="container"></div> holds:
    - Routes
    - Route with exact path to Home
    - Home holds 3 components
        - FeedbackForm
        - FeedbackStats
        - FeedbackList
            * No props needed as we useContext and the FeedbackProvider
    - Close that Route, and make a route for About Page as well
    - Close FeedbackProvider
END App*/

function App() {

    return (
        <FeedbackProvider>
        <Router>
        <Header  />
        <div className="container">
            <Routes>
            <Route exact path='/' element={
            <>
                <FeedbackForm />
                <FeedbackStats/>
                <FeedbackList />
            </>
            }>
            </Route>
            <Route path='/about' element={<AboutPage />} />
            </Routes>
        </div>
        <AboutIconLink />
        </Router>
        </FeedbackProvider>
    )
}

export default App;