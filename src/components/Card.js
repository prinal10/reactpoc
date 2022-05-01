import React from 'react';

const Card = ({cardHeader, cardContent}) => {
    return (
        <>
            <div>
                <h1>{cardHeader}</h1>
                <div>
                    {cardContent}
                </div>
            </div>
        </>
    );
};

export default Card;
