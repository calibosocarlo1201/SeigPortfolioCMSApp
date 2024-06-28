import React from 'react';
import CustomCard from '../components/CustomCard';
import { useGetProjectsQuery } from '../slices/projectsSlice';
import CardLoader from '../components/CardLoader';
import { Link } from 'react-router-dom';
import ScreenHeader from '../components/ScreenHeader';

const ProjectsScreen = () => {
    const { data, isLoading, error, refetch } = useGetProjectsQuery();
    const projects = data?.projects || [];
    // console.log(projects);

    return (
        <div>
            <ScreenHeader title="Projects" showCreateBtn  />

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-5">
                {isLoading ? (
                    <>
                        <CardLoader key='1' />
                        <CardLoader key='2' />
                        <CardLoader key='3' />
                        <CardLoader key='4' />
                        <CardLoader key='5' />
                        <CardLoader key='6' />
                    </>
                ) : error ? (
                    <p className='text-red-700'>Something went Wrong.</p>
                ) : (
                    projects.map((project) => (
                        <Link to={`./${project._id}`} key={project.id}>
                            <CustomCard dataObj={project} />
                        </Link>
                    ))
                )}
            </div>
        </div>

    );
};

export default ProjectsScreen;
