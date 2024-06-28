import React, { useEffect, useState } from 'react'
import InputComponent from '../components/InputComponent'
import ScreenHeader from '../components/ScreenHeader'
import { useGetSkillsQuery } from '../slices/skillsSlice';
import TagInputComponent from '../components/TagInputComponent';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  title: z.string().min(1, 'Project title is required'),
  description: z.string(),
  skills: z.array(z.object({
    value: z.string(),
    label: z.string()
  })).nonempty('Atleast 1 skill is required.')
})

const CreateProjectScreen = () => {

  const [options, setOptions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const { data: skills, isLoading: isLoadingSkills, erro: skillsErr } = useGetSkillsQuery();

  useEffect(() => {
    if(skills){
      const formattedSkills = skills.map(skill => ({ value: skill._id, label: skill.name }));
      setOptions(formattedSkills);
    
    }
  }, [skills]);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      skills: [],
    }
  });

  const onSubmit = data => {
    console.log('Form Data', data)
  }

  return (
    <>
      <ScreenHeader title="Create Project" showGoBackBtn className="mb-5" />
      
      <form className="flex" onSubmit={handleSubmit(onSubmit)}>

        <div className="w-full xl:w-1/2">
          <Controller name="title" control={control} render={({field}) => (
            <InputComponent inputLabel="Project Title" errorMessage={errors.title?.message} {...field} />
          )} />

          <Controller name='description' control={control} render={({field}) => (
            <InputComponent inputLabel="Description" errorMessage={errors.description?.message} {...field} isTextArea />
          )} />
          
          <Controller name='skills' control={control} render={({field}) => (
            <TagInputComponent label="Skills" errorMessage={errors.skills?.message} isLoading={isLoadingSkills} error={skillsErr} options={options} value={field.value} onChangeHandler={field.onChange} />
          )} />

          <button type="submit" className="bg-[#082f49] text-white py-2 px-4 rounded-lg flex gap-2 items-center">Submit</button>
          
        </div>

        <div className="w-full xl:w-1/2"></div>

      </form>

    </>
  )
}

export default CreateProjectScreen