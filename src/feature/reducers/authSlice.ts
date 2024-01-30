import {
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { IUser, TUser } from "../interface";
import { loginUser, logoutUser, registerUser } from "../services";


interface IAuthState {
  isUserLogin: boolean;
  isLoginFormActive: boolean;
  firstName: string;
  lastName: string;
  photo: string;
  token: string;
  notificationMessage: string;
}

const authAdapter = createEntityAdapter({
  selectId: (user: IUser) => user._id || "",
});

const initialState: IAuthState & EntityState<IUser, string> =
  authAdapter.getInitialState({
    isUserLogin: false,
    isLoginFormActive: false,
    firstName: "",
    lastName: "",
    photo: "",
    token: "",
    notificationMessage: "",
  });

export const registerApiUser = createAsyncThunk(
  "/auth/registerApiUser",
  async (initialUser: TUser) => {
    try {
      const response = await registerUser(initialUser);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const loginApiUser = createAsyncThunk(
  "/auth/loginApiUser",
  async (initialUser: TUser, { dispatch }) => {
    try {
      const response = await loginUser(initialUser);
      dispatch(setToken(response.data.accessToken));
      localStorage.setItem("token", response.data.accessToken);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const logoutApiUser = createAsyncThunk(
  "/auth/logoutApiUser",
  async (_, { dispatch }) => {
    try {
      const response = await logoutUser();
      localStorage.removeItem("token");
      dispatch(setToken(""));
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsUserLogin: (state, action) => {
      state.isUserLogin = action.payload;
    },
    setisLoginFormActive: (state, action) => {
      state.isLoginFormActive = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setPhoto: (state, action) => {
      state.photo = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setNotificationMessage: (state, action) => {
      state.notificationMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerApiUser.fulfilled, authAdapter.addOne)
      .addCase(loginApiUser.fulfilled, authAdapter.addOne)
      .addCase(logoutApiUser.fulfilled, authAdapter.removeOne);
  },
});

export const {
  setIsUserLogin,
  setisLoginFormActive,
  setFirstName,
  setLastName,
  setPhoto,
  setToken,
  setNotificationMessage,
} = authSlice.actions;
export default authSlice.reducer;
