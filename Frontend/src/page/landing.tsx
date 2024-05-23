import * as React from 'react';
import Navigation from '../Navigations/nav';
import Notfoundedlanding from '../LandingContent.tsx/Notfoundedlanding';
import '../CSS/navCSS.css'


function Landing() {
    return (
        <div>
            <Navigation />
            <Notfoundedlanding/>
            
        </div>

    )
}
export default Landing;