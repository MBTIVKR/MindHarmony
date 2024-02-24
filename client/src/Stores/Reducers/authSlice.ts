import { PayloadAction, UnknownAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../Types/IUser";
import {AuthService } from "@/Services/Http";
import Cookies from "universal-cookie";


interface AuthState {
    isAuth: boolean,
    user: IUser
    isLoading: boolean
    status: string | null
    error: string | null
}
interface IData {
    email: string
    password: string
}

const initialState: AuthState = {
    isAuth: false,
    user: {} as IUser,
    isLoading: false,
    status: null,
    error: null
}

export const logIn = createAsyncThunk<IUser, IData, {rejectValue: string}>(
    'auth/login',
    async ({email, password}, { rejectWithValue }) => {
        try {
            const data = await AuthService.login(email, password);
            return data
        } catch (e) {
            if (e instanceof Error) {
                throw rejectWithValue(e.message);
            }
            throw rejectWithValue('An unknown error occurred');
        }
    }
)
export const SignUp = createAsyncThunk<string, IData, {rejectValue: string}>(
    'auth/register',
    async ({email, password}, { rejectWithValue }) => {
        try {
            const data = await AuthService.registration(email, password);
            console.log(data)
            return data;
        } catch (e) {
            if (e instanceof Error) {
                return rejectWithValue('ебани сир')
            }
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getCookie(state) {
            const cookies = new Cookies();
            const token = cookies.get('token')
            if (token) {
                console.log(token);
                state.isAuth = true
            }
        } 
    },
    extraReducers: builder => {
        builder
        .addCase(SignUp.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        .addCase(SignUp.fulfilled, (state, action: PayloadAction<string>) => {
            state.status = action.payload
            state.isLoading = false
        })
        .addCase(logIn.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        .addCase(logIn.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
            state.isLoading = false
            state.isAuth = true
        })
        .addMatcher(IsError, (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false
        })
    }
})


export const { reducer: authReducer, actions: authActions } = authSlice

function IsError (action: UnknownAction) {
    return action.type.endsWith('rejected')
}