import { PROJECTS_URL } from "../constants";
import apiSlice from "./apiSlice";

export const projectApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: (data) => PROJECTS_URL,
            keepUnusedDataFor: 5,
            providesTags: ['Projects']
        })
    })
})

export const { useGetProjectsQuery } = projectApiSlice;