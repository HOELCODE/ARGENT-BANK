import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// -----------------------------
// Fonction asynchrone pour se connecter
// -----------------------------
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Erreur lors de la connexion')
      }

      const data = await response.json()
      localStorage.setItem('token', data.body.token)

      return data // Contient le token
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// -----------------------------
// Fonction asynchrone pour récupérer le profil
// -----------------------------
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (token, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 401) {
        // Token invalide -> logout auto
        thunkAPI.dispatch(logout())
        return thunkAPI.rejectWithValue('Token invalide')
      }

      const data = await response.json()
      return data.body // { firstName, lastName, email }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// -----------------------------
// Slice Redux (authentification)
// -----------------------------

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
  },

  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.body.token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Gestion du fetchUserProfile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
