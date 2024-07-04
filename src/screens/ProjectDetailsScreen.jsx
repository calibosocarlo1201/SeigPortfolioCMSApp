import React, { useEffect, useState } from 'react';
import ScreenHeader from '../components/ScreenHeader';
import { useGetProjectDetailsQuery, useUpdateProjectMutation } from '../slices/projectsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import DetailsLoading from '../components/DetailsLoading';
import InputComponent from '../components/InputComponent';
import { useGetSkillsQuery } from '../slices/skillsSlice';
import TagInputComponent from '../components/TagInputComponent';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(1, 'Project title is required'),
  description: z.string(),
  skills: z.array(z.object({
    value: z.string(),
    label: z.string()
  }))
});

const ProjectDetailsScreen = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const [options, setOptions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const { data: project, isLoading: isLoadingProject, error, refetch } = useGetProjectDetailsQuery(productId);
  const { data: skills, isLoading: isLoadingSkills, error: skillsErr } = useGetSkillsQuery();

  const [updateProject, { isLoading: loadingUpdate, error: updateErr }] = useUpdateProjectMutation();

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      skills: []
    }
  });

  const onSubmit = async (data) => {
    const transformedData = {
      ...data,
      skills: data.skills.map(skill => skill.value),
      projId: productId
    };

    console.log(transformedData)

    try {
      const response = await updateProject(transformedData).unwrap();
      toast.success('Project has been updated successfully');
      navigate('/projects');
    } catch (error) {
      toast.error(error.data?.message);
    }
  };

  useEffect(() => {
    if (skills && project) {
      const formattedSkills = skills.map(skill => ({ value: skill._id, label: skill.name }));
      const filteredSkills = formattedSkills.filter(skill => !project.skills.includes(skill.value));
      setOptions(filteredSkills);

      const selectedSkillsFormatted = formattedSkills.filter(skill => project.skills.includes(skill.value));
      setSelectedSkills(selectedSkillsFormatted);

      // Reset the form with the fetched project data
      reset({
        title: project.title,
        description: project.description,
        skills: selectedSkillsFormatted
      });
    }
  }, [skills, project, reset]);

  const handleChange = (selectedOptions) => {
    setSelectedSkills(selectedOptions || []);
  };

  return (
    <>
      {isLoadingProject ? (
        <DetailsLoading />
      ) : error ? (
        error
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ScreenHeader title={project.title} showGoBackBtn className="mb-5" />
          
          <div className="flex">
            <div className="w-full xl:w-1/2">
              <Controller 
                name="title" 
                control={control} 
                render={({ field }) => (
                  <InputComponent inputLabel="Project Title" errorMessage={errors.title?.message} {...field} />
                )}
              />
              <Controller 
                name="description" 
                control={control} 
                render={({ field }) => (
                  <InputComponent inputLabel="Description" errorMessage={errors.skills?.message} isTextArea {...field} />
                )}
              />
              <Controller 
                name="skills" 
                control={control} 
                render={({ field }) => (
                  <TagInputComponent label="Skills" isLoading={isLoadingSkills} error={skillsErr} options={options} value={field.value} errorMessage={errors.skills?.message} onChangeHandler={field.onChange} />
                )}
              />

              <button type="submit" className="bg-[#082f49] text-white py-2 px-4 rounded-lg flex gap-2 items-center" disabled={loadingUpdate}>
                { loadingUpdate ? 'Saving...' : 'Submit'}
              </button>
            </div>
            <div className="w-full xl:w-1/2"></div>
          </div>
        </form>
      )}
    </>
  );
};

export default ProjectDetailsScreen;
