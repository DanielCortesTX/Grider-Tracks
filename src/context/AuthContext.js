import { AsyncStorage } from 'react-native'
import createDataContext from './createDataContext'
import trackerApi from '../api/tracker'
import { navigate } from '../navigationRef'

const authReducer = (state, action) => {
  const { type, payload } = action
  switch(type){
    case 'add_error':
      return { ...state, errorMessage: payload }
    case 'signup':
      return { errorMessage: '', tokem: payload }  
    default:
      return state
  }
}

const signup = dispatch => async ({ email, password }) => {
  // make api request to sign up
  try {
    const response = await trackerApi.post('/signup', { email, password })

    // if it works, change state to authenticated
    await AsyncStorage.setItem('token', response.data.token)
    dispatch({ type: 'signup', payload: response.data.token})

    navigate('TrackList')
  } catch (err) {
    // if signup fails, reflect error
    dispatch({ type: 'add_error', payload: 'Something went wrong with sign up'})
  }
}


const signin = (dispatch) => {
  return ({ email, password }) => {
    // try to sign in

    // hande success

    // or error message
  }
}

const signout = (dispatch) => {
  return () => {
    // somehow sign out
  }
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup },
  { token: null, errorMessage: '' }
)