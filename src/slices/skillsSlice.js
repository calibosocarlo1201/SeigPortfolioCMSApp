import { SKILLS_URL } from "../constants";
import apiSlice from "./apiSlice";

export const skillsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSkills: builder.query({
            query: () => SKILLS_URL,
            keepUnusedDataFor: 5,
            providesTags: ['Skills']
        })
    })
})

export const { useGetSkillsQuery } = skillsApiSlice