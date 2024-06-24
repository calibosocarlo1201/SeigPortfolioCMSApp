import { PROJECTS_URL } from "../constants";
import apiSlice from "./apiSlice";

export const projectApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: (data) => PROJECTS_URL,
            keepUnusedDataFor: 5,
            providesTags: ['Projects']
        }),
        getProjectDetails: builder.query({
            query: (projId) => ({
                url: `${PROJECTS_URL}/${projId}`
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Projects']
        })
    })
})

export const { useGetProjectsQuery, useGetProjectDetailsQuery } = projectApiSlice;