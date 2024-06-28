import React, { useEffect, useState } from 'react'
import ScreenHeader from '../components/ScreenHeader'
import { useGetProjectDetailsQuery } from '../slices/projectsSlice';
import { useParams } from 'react-router-dom';
import DetailsLoading from '../components/DetailsLoading';
import InputComponent from '../components/InputComponent';
import { useGetSkillsQuery } from '../slices/skillsSlice';
import TagInputComponent from '../components/TagInputComponent';

const ProjectDetailsScreen = () => {

  const [options, setOptions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const {id: productId} = useParams(); 

  const { data: project, isLoading: isLoadingProject, error, refetch } = useGetProjectDetailsQuery(productId);
  const { data: skills, isLoading: isLoadingSkills, erro: skillsErr } = useGetSkillsQuery();

  // console.log(project)

  useEffect(() => {
    if(skills && project){
      const formattedSkills = skills.map(skill => ({ value: skill._id, label: skill.name }));
      const filteredSkills = formattedSkills.filter(skill => !project.skills.includes(skill.value));
      setOptions(filteredSkills);
      
      const selectedSkillsFormatted = formattedSkills.filter(skill => project.skills.includes(skill.value));
      setSelectedSkills(selectedSkillsFormatted);
    }
  }, [skills, project]);

  const handleChange = (selectedOptions ) => {
    setSelectedSkills(selectedOptions || []);
  }


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
              <TagInputComponent label="Skills" isLoading={isLoadingSkills} error={skillsErr} options={options} value={selectedSkills} onChangeHandler={handleChange} />
            </div>

            <div className="w-full xl:w-1/2"></div>

          </div>

        </>

      )}
    
    </>
  )
}

export default ProjectDetailsScreen