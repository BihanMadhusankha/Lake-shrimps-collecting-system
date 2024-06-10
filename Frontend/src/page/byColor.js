import React from 'react';
import UserNavigation from '../Navigations/userNav';
import shrimps_color from '../assets/shrimps color.jpg';
import shrimps_size from '../assets/shrimp-sizes-chart.jpg';
import shrimps_preparation from '../assets/Preparation_shrimps.jpg';
import shrimps_Species from '../assets/Species_shrimps.jpg';
var shrimpData = [
    {
        id: 'color',
        title: 'By Color',
        imageUrl: shrimps_color,
        Explanation: "Shrimp come in various colors, ranging from pink and red to brown and even blue. These colors can often indicate different species of shrimp as well as their freshness levels. For instance, pink shrimp are typically found in warmer waters and have a sweet flavor, while brown shrimp tend to have a stronger taste and are often harvested from colder waters. By exploring shrimp by color, you can not only identify different species but also gauge their freshness, as vibrant colors often signify that the shrimp is fresher."
    },
    {
        id: 'size',
        title: 'By Size',
        imageUrl: shrimps_size,
        Explanation: "Shrimp sizes vary widely, from tiny salad shrimp to jumbo prawns. The size of shrimp you choose can significantly impact your dish's flavor, texture, and cooking time. Larger shrimp, such as jumbo or extra-large, are often preferred for grilling or as a standalone dish, as they have a meatier texture and can withstand more robust cooking methods. On the other hand, smaller shrimp are ideal for soups, stir-fries, or salads, as they cook quickly and evenly. By selecting the right size of shrimp, you can enhance the overall dining experience of your dish."
    },
    {
        id: 'species',
        title: 'By Species',
        imageUrl: shrimps_Species,
        Explanation: "There are numerous species of shrimp found worldwide, each with its own distinct flavor profile, texture, and habitat. For example, tiger shrimp are known for their large size and slightly sweet flavor, while Gulf shrimp have a more robust taste and firmer texture. By exploring shrimp by species, you can learn about the specific attributes of each type, allowing you to select the best variety for your culinary needs. Whether you're looking for something delicate and sweet or bold and savory, understanding shrimp by species can help you create dishes that cater to your taste preferences."
    },
    {
        id: 'preparation',
        title: 'By Preparation',
        imageUrl: shrimps_preparation,
        Explanation: "Shrimp can be purchased in various preparations, including head-on, peeled and deveined, frozen, or fresh. Each preparation method offers its own set of conveniences and considerations. Head-on shrimp, for example, are prized for their flavor and can be used to make flavorful stocks or broths. Peeled and deveined shrimp save time in meal preparation and are often preferred for dishes where convenience is key. Frozen shrimp offer the advantage of extended storage life and can be readily available year-round, while fresh shrimp are prized for their superior taste and texture. By understanding different shrimp preparation options, you can choose the best option for your cooking needs, ensuring optimal flavor and quality in your dishes."
    },
];
var ShrimpCategories = function () {
    return (React.createElement("div", null,
        React.createElement(UserNavigation, null),
        React.createElement("header", { style: { textAlign: 'center', marginTop: '20px' } },
            React.createElement("h1", { style: { fontSize: '28px', marginBottom: '20px' } }, "Explore Shrimp Categories")),
        React.createElement("main", { style: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center' } }, shrimpData.map(function (_a) {
            var id = _a.id, title = _a.title, imageUrl = _a.imageUrl, Explanation = _a.Explanation;
            return (React.createElement("section", { key: id, style: { width: '35%', margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', transition: 'transform 0.3s' }, className: "fade-in hoverable" },
                React.createElement("img", { src: imageUrl, alt: title, style: { width: '40%', height: '40%', borderRadius: '8px' } }),
                React.createElement("h2", { style: { marginTop: '10px', fontSize: '20px' } }, title),
                React.createElement("p", { style: { marginTop: '10px', fontSize: '16px', lineHeight: '1.5' } }, Explanation)));
        }))));
};
export default ShrimpCategories;
