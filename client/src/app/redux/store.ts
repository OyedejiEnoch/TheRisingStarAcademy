import {configureStore} from "@reduxjs/toolkit"
import {authApi} from "./api/authApi"
import { userApi } from "./api/userApi"
import { courseApi } from "./api/coursesApi"
import UserReducer from "./features/userSlice"


export const store =configureStore({
    reducer:{
        auth:UserReducer,
        [authApi.reducerPath]:authApi.reducer,
        [userApi.reducerPath]:userApi.reducer,
        [courseApi.reducerPath]:courseApi.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat([ authApi.middleware, userApi.middleware, courseApi.middleware])
})

export type RootState= ReturnType<typeof store.getState>
export type AppDispatch =typeof store.dispatch