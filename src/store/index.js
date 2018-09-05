import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedWorks : [],
        user: null,
        SignInloading: false,
        SignUploading: false,
        SignInError: null,
        SignUpError: null
    },
    mutations: {
        setLoadedWorks (state, payload){
            state.loadedWorks = payload
            // console.log('loadedWorks', state.loadedWorks)
        },
        addWork (state , payload){
            state.loadedWorks.push(payload)
        },

        //資料上傳firebase成功後 commit >傳入"newUser"> 將state的 user改成 newUser
        setUser (state, payload){
            state.user = payload

        },

        //透過signUserUp/signUserIn commit >傳入"true"值> 將state的 loading改成 true
        //資料上傳firebase成功後(or失敗後)第二次 commit >傳入"false"值> 將state的 loading改成 false
        setSignInLoading(state, payload){
            state.SignInloading = payload

        },
        setSignUpLoading(state, payload){
            state.SignUploading = payload

        },

        //透過signUserUp/signUserIn commit >傳入"error"
        setSignInError (state, payload){
            state.SignInError = payload
            // console.log("SignInError",state.SignInError)

        },
        setSignUpError (state, payload){
            state.SignUpError = payload

        },

        //透過signUserUp/signUserIn or clearError commit >將error 改成 null
        clearSignInError (state){
            state.SignInError = null
        },
        clearSignUpError (state){
            state.SignUpError = null
        },


    },
    actions: {
        //載入時即觸發此Action
        loadWorks ({commit}) {
            // commit('setLoading', true)
            firebase.database().ref('works-list').once('value')
              .then((data) => {
                const worksList = []
                // /val() 方法返回或设置被选元素的值
                
                const obj = data.val()
                // console.log('obj', obj)
                for (let key in obj) {
                 worksList.push({
                    id: key,
                    Title: obj[key].Title,
                    Subtitle: obj[key].Subtitle,
                    Img: obj[key].Img,
                    Content: obj[key].Content,
                    View: obj[key].View,
                    Github: obj[key].Github
                    // creatorId: obj[key].creatorId
                  })
                }
                // console.log('worksList',worksList)
                commit('setLoadedWorks', worksList)
                // commit('setLoading', false)
              })
              .catch(
                (error) => {
                  console.log(error)
                //   commit('setLoading', true)
                }
              )
          },

        //新增文章時onAddWork時觸發此Action
        addToWork({commit}, payload){
            const work = {
                Title: payload.title,
                Subtitle: payload.subtitle,
                Img: payload.img,
                Content: payload.content,
                View: payload.view,
                Github: payload.github
            }
            firebase.database().ref('works-list').push(work)
            .then((data)=>{
                const key =data.key
                commit('addWork', {
                    ...work,
                    id: key
                })
            })
            .catch((error)=>{
                // console.log(error)
            })
        },

        //註冊SignUp時觸發此Action
        signUserUp ({commit}, payload){
            //commit mutation 'setLoading' > 傳入 true
            commit('setSignUpLoading', true)
            //commit mutation 'clearError' > 設定error為null(false)關閉alert視窗
            commit('clearSignUpError')

            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(
                user => {
                    //commit mutation 'setLoading' > 傳入 false
                    //資料上傳firebase成功，loading結束，所以改成false
                    commit('setSignUpLoading', false)

                    const newUser = {
                        id: user.uid,
                        registerdUser: []
                    }
                    //commit mutation 'setUser' > 傳入 newUser
                    commit('setUser',newUser)

                    // console.log(user)
                }
            )
            //catch() 方法只處理 Promise 的被拒絕狀態，並回傳一個新的 Promise 物件
            //失敗時回傳"error"
            .catch(
                error => {
                    //commit mutation 'setLoading' > 傳入 false
                    //資料上傳firebase失敗，loading結束，所以改成false
                    commit('setSignUpLoading', false)

                    //commit mutation 'setError' > 傳入 error
                    commit('setSignUpError', error)
                    // console.log(error)
                }
            )

        },

        //登入SignIn時觸發此Action
        signUserIn ({commit}, payload){
            commit('setSignInLoading', true)
            commit('clearSignInError')

            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(
                user => {
                    commit('setSignInLoading', false)
                    const newUser = {
                        id: user.uid,
                        registerdUser: []
                    }
                    commit('setUser',newUser)
                }
            )
            .catch(
                error2 => {
                    commit('setSignInLoading', false)
                    commit('setSignInError', error2)
                    // console.log(error2)                
                }
            )

        },

        //關閉提示窗時onDismissed時觸發此Action
        clearError ({commit}){
            //commit mutation 'clearError' > 設定error為null(false)關閉alert視窗            
            commit('clearSignInError')
            commit('clearSignUpError')
        },

        autoSignIn ({commit}, payload) {
            commit('setUser', {id: payload.uid, registerdUser: []})
        },
        logout ({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)
        },

    },
    getters: {
        //按照日期排序文章
        loadedWorks (state){
            return state.loadedWorks.sort((workA, workB) => {
                return workA.date < workB.date
            })

        },
        //只選擇了前五筆
        fearuredWorks (state, getters) {
            return getters.loadedWorks.slice(0, 5);
        },
        loadedWork (state) {
            return (workId) => {
                return state.loadedWork.find((work) => {
                    return work.id === workId
                })
            }
        },
        user (state){
            return state.user
        },
        SignInloading (state) {
            return state.SignInloading
        },
        SignUploading (state) {
            return state.SignUploading
        },
        SignInError (state) {
        return state.SignInError
        },        
        SignUpError (state) {
        return state.SignUpError
        },        
    }

})