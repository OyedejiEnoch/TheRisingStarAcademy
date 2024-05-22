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


export const userApi =createApi({
    reducerPath:"userApi",
    tagTypes:["User"],
    baseQuery:fetchBaseQuery({baseUrl: "http://localhost:4000/api", credentials: 'include'}),
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
        })
    })
})

export const {useUserProfileQuery} =userApi