import React, { useState } from 'react'
import ScreenHeader from '../components/ScreenHeader'
import { useGetProjectDetailsQuery } from '../slices/projectsSlice';
import { useParams } from 'react-router-dom';
import DetailsLoading from '../components/DetailsLoading';
import InputComponent from '../components/InputComponent';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const ProjectDetailsScreen = () => {

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const {id: productId} = useParams(); 

  const {data: project, isLoading: isLoadingProject, error, refetch} = useGetProjectDetailsQuery(productId);

  return (
    <>
      { isLoadingProject ? (
        <DetailsLoading />
      ) : error ? (
        error
      ) : (
        <>
          <ScreenHeader title={project.title} showGoBackBtn className="mb-5" />
          
          <div className="flex">

            <div className="w-full xl:w-1/2">
              <InputComponent inputLabel="Project Title" defaultVal={project.title} />
              <InputComponent inputLabel="Description" defaultVal={project.description} isTextArea />
              <DateRangePicker
                ranges={state}
                onChange={item => setState([item.selection])}
              />
            </div>

            <div className="w-full xl:w-1/2"></div>

          </div>

        </>

      )}
    
    </>
  )
}

export default ProjectDetailsScreen