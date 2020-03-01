import { AsyncAction, Action } from 'overmind'
import { myFirebase, twitterAuthProvider, db } from '../firebase/firebase'
import { Environment, User } from './state'

export const loginWithTwitter: AsyncAction = async context => {
  try {
    const result = await myFirebase.auth().signInWithPopup(twitterAuthProvider)
    var user = result.user

    context.state.user = {
      uid: user?.uid,
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      username: result.additionalUserInfo?.username
    }

    var newUser = myFirebase.auth().currentUser
    if (newUser)
      newUser.updateEmail(
        `${result.additionalUserInfo?.username as string}@deleteme.com`
      )
  } catch (e) {}
}

export const setUser: Action = ({ state }, user: null) => {
  state.user = user
}

export const logout: AsyncAction = async ({ state }) => {
  await myFirebase.auth().signOut()
  state.user = null
}

export const addEnvironment: AsyncAction = async ({ state }, data: any) => {
  state.isCreating = true
  await db.collection('environments').add({
    ...data,
    user: state.user
  })
  state.isCreating = false
}

export const getEnvironment: AsyncAction = async ({ state }, id: any) => {
  const newEnv = state.environments.findIndex(e => e.id === id)
  if (state.environments.find(e => e.id === id)) {
    state.environment[id] = state.environments[newEnv]
  } else {
    state.isLoadingEnvironment = true
    var docRef = db.collection('environments').doc(id)
    const doc = await docRef.get()
    state.isLoadingEnvironment = false

    if (doc.exists) {
      state.environment[id] = doc.data() as Environment
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
    }
  }
}

export const getEnvironments: AsyncAction = async ({ state }) => {
  state.isLoadingEnvironments = true
  const snapshot = await db.collection('environments').get()
  state.isLoadingEnvironments = false

  snapshot.forEach(function(doc) {
    const env = doc.data() as Environment
    state.environments.push({ ...env, id: doc.id })
  })
}
