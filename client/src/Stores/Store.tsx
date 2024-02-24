import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { authReducer } from "./Reducers/authSlice"

const rootReducer = combineReducers({
    authReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,  
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']