import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setLoading, setUser } from '../features/userSlice'

type UserDetails ={
    _id:string,
    name:string,
    email:string,
    avatar:{
        public_id:string,
        url:string
    },
    role:string,
    createdAt:string
}

type tutorDetails ={
    _id:string,
    name:string,
    email:string,
    phoneNo:string,
    bio:string,
    profession:string,
    course:string,
    avatar:{
        public_id:string,
        url:string
    },
}

type SingleTutor ={
    singleTutor:tutorDetails
}

export const userApi =createApi({
    reducerPath:"userApi",
    tagTypes:["User"],
    baseQuery:fetchBaseQuery({baseUrl: "https://therisingstaracademy.onrender.com/api", credentials: 'include'}),
    endpoints:(builder)=>({
        userProfile: builder.query<UserDetails, void | null>({
            query:()=> "/users/my-profile",
            // we are transforming the data received by going deep into the exact data we want, e.g
            // our api is success:true, user message, what we really want is the user, so we can pass the details into our
            // state 
            transformResponse: (result:any) =>result.user,
            async onQueryStarted(_, {dispatch, queryFulfilled}){
                try{
                
                    const {data}=await queryFulfilled
                    dispatch(setUser(data))
                    dispatch(setLoading(false))


                }catch(error){
                    dispatch( setLoading(false))
                }
            },
            providesTags:["User"]
        }),
        getSingleTutor:builder.query<SingleTutor, string>({
            query:(id)=> `/users/tutor/tutor/${id}`
        })
    })
})

export const {useUserProfileQuery, useGetSingleTutorQuery} =userApi