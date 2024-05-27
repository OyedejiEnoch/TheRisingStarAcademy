import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userApi } from './userApi'

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

type User ={
    success:boolean,
    userDetails:UserDetails
}

type Register ={
    name:string,
    email:string,
    password:string

}

type Login ={
    email:string,
    password:string
}


export const authApi =createApi({
    reducerPath:"authApi",
    baseQuery: fetchBaseQuery({baseUrl: 'https://therisingstaracademy.onrender.com/api', credentials: 'include' }),
    endpoints: (builder)=>({
        login: builder.mutation<User, Login>({
            query:(body)=>({
                url:"/auth/login",
                method:"POST",
                body
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}){
                try{
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.userProfile.initiate(null))

                }catch(error){
                    console.log(error)
                }
            }
        }),

        register: builder.mutation<User, Register>({
            query:(body)=>({
                url:"/auth/register",
                body,
                method:"POST"
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}){
                try {
                    await queryFulfilled
                    await dispatch(userApi.endpoints.userProfile.initiate(null))
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
})



export const {useLoginMutation, useRegisterMutation} =authApi
