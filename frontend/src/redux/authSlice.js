import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// -----------------------------
// Fonction asynchrone pour se connecter
// -----------------------------

// createAsyncThunk = permet de gérer les appels API avec Redux Toolkit
// 'auth/loginUser' = nom de l'action
// userData = données envoyées (email, password)
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, thunkAPI) => {
    try {
      // Requête POST vers le backend
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData) // { email, password }
      })

      // Si réponse mauvaise -> Erreur
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Erreur lors de la connexion')
      }
      
      // Récupération des données de la réponse
      const data = await response.json()

      // Stockage Token dans localStorage
      localStorage.setItem('token', data.body.token)
      
      // Envoi des données à Redux
      return data 
    } catch (error) {
      // Si erreur, on renvoie le message d'erreur
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)


// -----------------------------
// Slice Redux (authentification)
// -----------------------------

const authSlice = createSlice({
  name: 'auth', // Nom du slice
  initialState: {
    user: null, // Les infos de l'utilisateur (nom, email etc.)
    token: localStorage.getItem('token') || null, // Token récupéré au chargement si déjà connecté
    loading: false, // Etat de chargement pour afficher un loader
    error: null // Message d'erreur s'il y a un problème
  },

  reducers: {
    // Action de déconnexion
    logout: (state) => {
      state.user = null // Reset de l'utilisateur
      state.token = null // Reset du token
      localStorage.removeItem('token') // Suppression du token dans le localStorage
    }
  },

  extraReducers: (builder) => {
    builder
      // Quand la fonction loginUser est en cours => loading true
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      // Quand la fonction loginUser est un succès
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.body.token // Stockage du token dans Redux
      })
      // Quand la fonction loginUser échoue
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload // Stockage du message d'erreur
      })
  }
})

// -----------------------------
// Export des actions et reducer
// -----------------------------

export const { logout } = authSlice.actions // export de l'action logout
export default authSlice.reducer // export du reducer pour le store Redux
