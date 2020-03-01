import { OnInitialize } from 'overmind'
import { myFirebase } from '../firebase/firebase'

export const onInitialize: OnInitialize = async ({ state }) => {
  await myFirebase.auth().onAuthStateChanged(user => {
    if (user) {
      state.user = {
        uid: user?.uid,
        displayName: user?.displayName,
        photoURL: user?.photoURL,
        username: user?.email?.split('@deleteme.com')[0]
      }
    }
  })
}
