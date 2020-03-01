import { OnInitialize } from 'overmind'
import { myFirebase } from '../firebase/firebase'
import { User } from './state'

export const onInitialize: OnInitialize = async ({ actions }) => {
  await myFirebase.auth().onAuthStateChanged((user: any) => {
    if (user) {
      // @ts-ignore
      actions.setUser({
        uid: user?.uid,
        displayName: user?.displayName,
        photoURL: user?.photoURL,
        username: user?.email?.split('@deleteme.com')[0]
      } as any)
    }
  })
}
