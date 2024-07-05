import React, { useEffect, useState } from 'react';
import { useGetProjectDetailsQuery, useUpdateProjectMutation } from '../slices/projectsSlice';
import DetailsLoading from '../components/DetailsLoading';
import Details from '../components/ProjectDetails/Details';
import { useParams } from 'react-router-dom';
import ScreenHeader from '../components/ScreenHeader';
import ProjectDetailsImages from '../components/ProjectDetails/ProjectDetailsImages';

const ProjectDetailsScreen = () => {

  const { id: projectId } = useParams();
  const { data: project, isLoading: isLoadingProject, error, refetch } = useGetProjectDetailsQuery(projectId);

  const [images, setImages] = useState([]);
  const [thumbnailImage, setThumbnailImage] = useState()

  useEffect(() => {
    if(project){
      if(project.images) setImages(project.images);
      if(project.thumbnailImage) setThumbnailImage(project.thumbnailImage);
    }
  }, [project])

  return (
    <>
      {isLoadingProject ? (
        <DetailsLoading />
      ) : error ? (
        error
      ) : (
        <>
          <ScreenHeader title={project.title} showGoBackBtn className="mb-5" />
          <div className="flex">
            <Details project={project} projectId={projectId} images={images} setImages={setImages} refetch={refetch} />
            <ProjectDetailsImages images={images} setImages={setImages} thumbnail={thumbnailImage} isLoading={isLoadingProject} />
          </div>
        </>
      )}
    </>
  );
};

export default ProjectDetailsScreen;
