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
    case 'signout':
      return {token: null, errorMessage: ''}  
    default:
      return state
  }
}

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token')

  if(token){
    dispatch({ type: 'signin', payload: token })
    navigate('TrackList')
  } else {
    navigate('Signup')
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


const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token')
  dispatch({
    type: 'signout'
  })  
  navigate('loginFlow')
}


export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: '' }
)