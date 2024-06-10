import React from 'react';
import '../CSS/adminCard.css'; // Import styles for the card
var Card = function (_a) {
    var path = _a.path, label = _a.label;
    return (React.createElement("div", { className: "card" },
        React.createElement("a", { href: path, className: "card-link" },
            React.createElement("h3", null, label))));
};
export default Card;
