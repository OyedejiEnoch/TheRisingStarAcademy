import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


type Course ={
    _id:string,
    title:string,
    description:string,
    summary:string,
    body:string,
    topics:[{
        title:string,
        body:string,
        summary:string
    }],
    subCourses:[],
    image:{
        public_id:string,
        url:string
    }
}

type getCourses={
    courses:Course[]
}

export const courseApi =createApi({
    reducerPath:"courseApi",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000/api', }),
    endpoints: (builder)=>({
        allCourse:builder.query<getCourses, void>({
            query:()=> "/courses/all"
        }),
        latestCourses:builder.query<getCourses, void>({
            query:()=> "/courses/all/latest"
        }),
        singleCourse: builder.query<Course, void>({
            query:(id)=>`/courses/single/${id}`
        })
    })
})

export const {useAllCourseQuery, useLatestCoursesQuery,useSingleCourseQuery} = courseApi