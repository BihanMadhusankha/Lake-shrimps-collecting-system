import React from 'react';
import { MDBCol, MDBRow, } from 'mdb-react-ui-kit';
import UserNavigation from '../Navigations/userNav';
import DetailsImage from '../assets/bike.jpg';
export default function App() {
    return (React.createElement("div", null,
        React.createElement(UserNavigation, null),
        React.createElement(MDBRow, { className: "align-items-center" },
            React.createElement(MDBCol, { lg: 8, md: 12, className: 'mb-4 mb-lg-0 d-flex justify-content-between align-items-start' },
                React.createElement("img", { src: DetailsImage, alt: "Image", className: "Image-container", style: { width: '75%', height: 'auto' } }),
                React.createElement("div", { className: "ml-3" },
                    React.createElement("ul", null,
                        React.createElement("li", null, "List Item 1"),
                        React.createElement("li", null, "List Item 2"),
                        React.createElement("li", null, "List Item 3")),
                    React.createElement("br", null),
                    React.createElement("p", null,
                        React.createElement("b", null, "Do you want to delivery?")),
                    React.createElement("br", null))))));
}
