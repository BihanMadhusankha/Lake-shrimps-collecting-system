import * as React from 'react';
import Navigation from '../Navigations/nav';
import Notfoundedlanding from '../LandingContent/Notfoundedlanding';
import '../CSS/navCSS.css';
function Landing() {
    return (React.createElement("div", null,
        React.createElement(Navigation, null),
        React.createElement(Notfoundedlanding, null)));
}
export default Landing;
