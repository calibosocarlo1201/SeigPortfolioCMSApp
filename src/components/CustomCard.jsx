
import React from 'react';
import limitDescription from '../utils/descriptionLimiter';

const CustomCard = ({dataObj}) => {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img className="rounded-t-lg" src={dataObj.thumbnailImage} alt={dataObj.title} />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{dataObj.title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{limitDescription(dataObj.description, 50  ) }</p>
            </div>
        </div>
    );
};

export default CustomCard
