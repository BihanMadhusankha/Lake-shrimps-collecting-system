import * as React from 'react';
import Navigation from '../Navigations/nav';
 import UsersLAnding from '../LandingContent.tsx/UsersLAnding';
import '../CSS/navCSS.css'


function Landing() {
    return (
        <div>
            <Navigation />
            <UsersLAnding/>
            
        </div>

    )
}
export default Landing;