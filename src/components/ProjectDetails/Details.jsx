import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { useUpdateProjectMutation } from '../../slices/projectsSlice';
import { useGetSkillsQuery } from '../../slices/skillsSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import ScreenHeader from '../ScreenHeader';
import InputComponent from '../InputComponent'
import TagInputComponent from '../TagInputComponent'

const schema = z.object({
    title: z.string().min(1, 'Project title is required'),
    description: z.string(),
    skills: z.array(z.object({
      value: z.string(),
      label: z.string()
    }))
  });

const Details = ({project, refetch, images, setImages, projectId}) => {

    const navigate = useNavigate();

    const { data: skills, isLoading: isLoadingSkills, error: skillsErr } = useGetSkillsQuery();
    const [updateProject, { isLoading: loadingUpdate, error: updateErr }] = useUpdateProjectMutation();

    const [options, setOptions] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);

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
            projId: projectId
        };

        console.log(transformedData)

        // try {
        //     const response = await updateProject(transformedData).unwrap();
        //     toast.success('Project has been updated successfully');
        //     navigate('/projects');
        // } catch (error) {
        //     toast.error(error.data?.message);
        // }
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

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full xl:w-1/2 pr-10">
          
          <div className="flex">
            <div className='w-full'>
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
          </div>
        </form>
    )
}

export default Details