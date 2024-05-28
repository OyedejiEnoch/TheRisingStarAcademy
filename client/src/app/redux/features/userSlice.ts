import {createSlice, PayloadAction} from "@reduxjs/toolkit"

type UserDetails ={
    _id:string,
    name:string,
    email:string,
    avatar:{
        public_id:string,
        url:string
    },
    myCourses:string[],
    role:string,
    createdAt:string
}


type InitialState ={
    isLoading:boolean,
    user:UserDetails | null,
    isAuthenticated:boolean
}

const initialState:InitialState ={
    isLoading:true,
    user:null,
    isAuthenticated:false
}

export const userSlice =createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state, action:PayloadAction<UserDetails>)=>{
            state.user=action.payload
            state.isAuthenticated = true
        },
        setLoading:(state, action:PayloadAction<boolean>)=>{
            state.isLoading =action.payload
        }

    }
})

export const {setUser, setLoading} =userSlice.actions

export default userSlice.reducer