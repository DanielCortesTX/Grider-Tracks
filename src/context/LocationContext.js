import createDataContext from './createDataContext'

const locationReducer = (state, action) => {
  const { type, payload } = action
  switch(type){
    case 'add_current_location':
      return {...state, currentLocaction: payload}
    default:
      return state
  }
}

const startRecording = dispatch => () => {}
const stopRecording = dispatch => () => {}
const addLocation = dispatch => (location) => {
  dispatch({ type: 'add_current_location', payload: location })
}

export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation},
  { recording: false, locations: [], currentLocaction: null }
)