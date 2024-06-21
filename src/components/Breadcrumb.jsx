import { ChevronRight } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <nav className="flex my-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li key="home" className="inline-flex items-center">
                    <Link to="/" className="text-gray-700 hover:text-blue-600">
                        Home
                    </Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    return (
                        <React.Fragment key={to}>
                            <ChevronRight className='h-4 w-4' />
                            <li key={to + index} className="inline-flex items-center">
                                {isLast ? (
                                    <span className="text-gray-500">{value.charAt(0).toUpperCase() + value.slice(1)}</span>
                                ) : (
                                    <Link to={to} className="text-gray-700 hover:text-blue-600">
                                        {value.charAt(0).toUpperCase() + value.slice(1)}
                                    </Link>
                                )}
                            </li>
                        </React.Fragment>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
