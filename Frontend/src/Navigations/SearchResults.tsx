import React from 'react';
import { useState } from 'react';

interface SearchResultsProps {
    results: {
        instructors: any[];
        products: any[];
    };
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const modalStyles = {
        display: isModalOpen ? 'block' : 'none',
        position: 'fixed' as const,
        zIndex: 1000,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto' as const,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    };

    const modalContentStyles = {
        backgroundColor: '#fefefe',
        margin: '15% auto',
        padding: '20px',
        border: '1px solid #888',
        width: '80%',
        borderRadius: '10px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    };

    const headerStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #ddd',
        paddingBottom: '10px',
        marginBottom: '20px',
    };

    const titleStyles = {
        margin: 0,
    };

    const closeButtonStyles = {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px',
        cursor: 'pointer',
    };

    const listStyles = {
        listStyleType: 'none' as const,
        padding: 0,
    };

    const listItemStyles = {
        marginBottom: '10px',
    };

    return (
        <div style={modalStyles}>
            <div style={modalContentStyles}>
                <div style={headerStyles}>
                    <h2 style={titleStyles}>Search Results</h2>
                    <button style={closeButtonStyles} onClick={closeModal}>Cancel</button>
                </div>
                <h3>Instructors</h3>
                <ul style={listStyles}>
                    {results.instructors.map(instructor => (
                        <li key={instructor._id} style={listItemStyles}>
                            {instructor.role === 'content_creater' && (
                                <p>{instructor.firstname}</p>
                            )}
                        </li>
                    ))}
                </ul>
                <h3>Products</h3>
                <ul style={listStyles}>
                    {results.products.map(product => (
                        <li key={product._id} style={listItemStyles}>
                            <p>{product.title}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchResults;
