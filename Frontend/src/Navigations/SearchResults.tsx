import React from 'react';

interface SearchResultsProps {
    results: {
        instructors: any[];
        products: any[];
    };
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
    return (
        <div className="search-results">
            <h2>Search Results</h2>
            <h3>Instructors</h3>
            <ul>
                {results.instructors.map(instructor => (
                    <li key={instructor._id}>
                        {instructor.role === 'content_creater' && (
                            <p>{instructor.firstname}</p>
                        )}
                    </li>
                ))}
            </ul>
            <h3>Products</h3>
            <ul>
                {results.products.map(product => (
                    <li key={product._id}>
                        <p>{product.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;
