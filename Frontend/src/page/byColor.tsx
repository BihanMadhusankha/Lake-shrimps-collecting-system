import React from 'react';
import '../CSS/shrimpscategory.css'; // Make sure to adjust the path based on your project structure
import UserNavigation from '../Navigations/userNav';
import shrimps_color from '../assets/shrimps color.jpg';
import shrimps_size from '../assets/shrimp-sizes-chart.jpg';
import shrimps_preparation from '../assets/Preparation_shrimps.jpg';
import shrimps_Species from '../assets/Species_shrimps.jpg';

const shrimpData = [
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
    Explanation: "There are numerous species of shrimp found worldwide, each with its own distinct flavor profile, texture, and habitat. For example, tiger shrimp are known for their large size and slightly sweet flavor, while Gulf shrimp have a more robust taste and firmer texture. By exploring shrimp by species, you can learn about the specific attributes of each type, allowing you to select the best variety for your culinary needs. Whether you're looking for something delicate and sweet or bold and savory, understanding shrimp species can help you create dishes that cater to your taste preferences."
  },
  {
    id: 'preparation',
    title: 'By Preparation',
    imageUrl: shrimps_preparation,
    Explanation: "Shrimp can be purchased in various preparations, including head-on, peeled and deveined, frozen, or fresh. Each preparation method offers its own set of conveniences and considerations. Head-on shrimp, for example, are prized for their flavor and can be used to make flavorful stocks or broths. Peeled and deveined shrimp save time in meal preparation and are often preferred for dishes where convenience is key. Frozen shrimp offer the advantage of extended storage life and can be readily available year-round, while fresh shrimp are prized for their superior taste and texture. By understanding different shrimp preparation options, you can choose the best option for your cooking needs, ensuring optimal flavor and quality in your dishes."
  },
];

const ShrimpCategories: React.FC = () => {
  return (
    <div className="container">
      <UserNavigation />
      <header className="header mt-3">
        <h1>Explore Shrimp Categories</h1>
      </header>
      <main className="main">
        {shrimpData.map(({ id, title, imageUrl, Explanation }) => (
          <section key={id} className="section fade-in">
            <img src={imageUrl} alt={title} className="image" />
            <h2>{title}</h2>
            <p>{Explanation}</p>
          </section>
        ))}
      </main>
    </div>
  );
};

export default ShrimpCategories;
