import React from 'react';
import CustomCard from '../components/CustomCard';
import { useGetProjectsQuery } from '../slices/projectsSlice';
import CardLoader from '../components/CardLoader';

const ProjectsScreen = () => {
    const { data, isLoading, error, refetch } = useGetProjectsQuery();
    const projects = data?.projects || [];
    // console.log(projects);

    return (
        <div>
            <h1 className='text-3xl'>Projects</h1>
            
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                {isLoading ? (
                    <>
                        <CardLoader key='1' />
                        <CardLoader key='2' />
                        <CardLoader key='3' />
                    </>
                ) : error ? (
                    <p className='text-red-700'>Something went Wrong.</p>
                ) : (
                    projects.map((project) => (
                        <CustomCard key={project.id} dataObj={project} />
                    ))
                )}
            </div>
        </div>
    );
};

export default ProjectsScreen;
