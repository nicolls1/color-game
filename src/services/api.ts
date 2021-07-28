import FirebaseService from './firebaseService'
import MockService from './mock'

let api = FirebaseService
if (
  process.env.REACT_APP_MOCK_API === 'true' ||
  process.env.STORYBOOK_MOCK_API === 'true'
) {
  // @ts-ignore
  api = MockService
}
export default api
