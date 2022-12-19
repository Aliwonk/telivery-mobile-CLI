import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {UserResultFetch, LoginUser, CreateUser} from '../../types/user';
import {RootState} from '../store';

interface AuthState {
  user: UserResultFetch | null;
  isLoading: boolean;
  errorFetch: any;
  message: string;
  successAuth: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  errorFetch: null,
  message: '',
  successAuth: false,
};

export const loginUser = createAsyncThunk<UserResultFetch, LoginUser>(
  'auth/loginUser',
  async (userData: LoginUser): Promise<any> => {
    const response = await fetch('http://10.0.2.2:3000/auth/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    return result;
  },
);

export const registerUser = createAsyncThunk<UserResultFetch, CreateUser>(
  'auth/registerUser',
  async (userData: CreateUser): Promise<any> => {
    const response = await fetch(
      'http://10.0.2.2:3000/auth/user/registration',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      },
    );
    const result = await response.json();
    return result;
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearValueMessage: state => {
      state.message = '';
    },
  },
  extraReducers(builder) {
    // LOGIN

    builder.addCase(loginUser.pending, state => {
      state.isLoading = true;
    }),
      builder.addCase(loginUser.fulfilled, (state, action) => {
        const {statusCode, token, role, expiresToken} = action.payload;
        state.isLoading = false;

        // if (token) {
        //   const dateExpiresToken = Date.now() + parseInt(expiresToken!) * 1000;
        //   saveDataInCookie('token', token);
        //   saveDataInCookie('role', role);
        //   saveDataInCookie('expiresToken', dateExpiresToken.toString());
        // }

        switch (statusCode) {
          case 404:
            state.message = 'Пользователь не найден';
            break;
          case 401:
            state.message = 'Неправильный логин или пароль';
            break;
        }
      }),
      builder.addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        if (action.error?.message === 'Network request failed') {
          state.message = 'Ошибка запроса. Проверьте подключение к сети';
        }
        state.errorFetch = action.error;
      });

    // REGISTRATION

    builder.addCase(registerUser.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      const {statusCode, role, token, expiresToken} = action.payload;
      state.isLoading = false;

      //   if (token) {
      //     const dateExpiresToken = Date.now() + parseInt(expiresToken!) * 1000;
      //     saveDataInCookie('token', token);
      //     saveDataInCookie('role', role);
      //     saveDataInCookie('expiresToken', dateExpiresToken.toString());
      //   }

      switch (statusCode) {
        case 409:
          state.message = 'Пользователь уже существует';
          break;
      }
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;

      if (action.error?.message === 'Network request failed') {
        state.message = 'Ошибка запроса. Проверьте подключение к сети';
      }
      state.errorFetch = action.error;
    });
  },
});

export const {clearValueMessage} = authSlice.actions;
export const userData = (state: RootState) => state.auth.user;
export default authSlice.reducer;
