import createDataContext from './createDataContext'

const authReducer = (state, action) => {
  const { type, payload } = action
  switch(type){
    default:
      return state
  }
}

const signup = (dispatch) => {
  return ({ email, password }) => {
    // make api request to sign up

    // if it works, change state to authenticated

    // if signup fails, reflect error
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
  { isSignedIn: false }
)