import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


type Course ={
    _id:string,
    title:string,
    description:string,
    summary:string,
    body:string,
    about:string,
    benefits:[],
    topics:[{
        title:string,
        body:string,
        summary:string
    }],
    author:string,
    subCourses:string[],
    image:{
        public_id:string,
        url:string
    }
}

type getCourses={
    courses:Course[]
}

type getSingleCourse={
    course:Course
}

export const courseApi =createApi({
    reducerPath:"courseApi",
    baseQuery: fetchBaseQuery({baseUrl: 'https://therisingstaracademy.onrender.com/api', }),
    endpoints: (builder)=>({
        allCourse:builder.query<getCourses, void>({
            query:()=> "/courses/all"
        }),
        latestCourses:builder.query<getCourses, void>({
            query:()=> "/courses/all/latest"
        }),
        singleCourse: builder.query<getSingleCourse, string>({
            query:(id)=>`/courses/single/${id}`
        }),
        enrollCourse: builder.query<getSingleCourse, string>({
            query:(id)=>`/courses/enroll/${id}`
        }),

    })
})

export const {useAllCourseQuery, useLatestCoursesQuery,useSingleCourseQuery, useLazyEnrollCourseQuery} = courseApi