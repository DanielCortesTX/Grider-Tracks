import { AsyncStorage } from 'react-native'
import createDataContext from './createDataContext'
import trackerApi from '../api/tracker'
import { navigate } from '../navigationRef'

const authReducer = (state, action) => {
  const { type, payload } = action
  switch(type){
    case 'add_error':
      return { ...state, errorMessage: payload }
    case 'signip':
      return { errorMessage: '', tokem: payload }    
    case 'clear_error_message':
      return { ...state, errorMessage: ''}  
    default:
      return state
  }
}

const clearErrorMessage = dispatch => () => {
  dispatch({
    type: 'clear_error_message'
  })
}

const signup = dispatch => async ({ email, password }) => {
  // make api request to sign up
  try {
    const response = await trackerApi.post('/signup', { email, password })

    // if it works, change state to authenticated
    await AsyncStorage.setItem('token', response.data.token)
    dispatch({ type: 'signin', payload: response.data.token})

    navigate('TrackList')
  } catch (err) {
    // if signup fails, reflect error
    dispatch({ type: 'add_error', payload: 'Something went wrong with sign up'})
  }
}


const signin = (dispatch) => async ({ email, password }) => {
  try {
    // try to sign in
    const response = await trackerApi.post('/signin', { email, password })
    // hande success 
    await AsyncStorage.setItem('token', response.data.token)
    dispatch({ type: 'signin', payload: response.data.token})

    navigate('TrackList')
  } catch (err) {
    // or error message     
    dispatch({ type: 'add_error', payload: 'Something went wrong with sign in'}) 
  }
}


const signout = (dispatch) => {
  return () => {
    // somehow sign out
  }
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage },
  { token: null, errorMessage: '' }
)