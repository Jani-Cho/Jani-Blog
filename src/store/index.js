import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedWorks : [], /* 載入的其他作品資料 */
        // loadedJsWorks : [], /* 載入的Js作品資料 */
        // loadedCssWorks : [], /* 載入的Css作品資料 */
        // loadedVueWorks : [], /* 載入的Vue作品資料 */
        user: null, /* 使用者資料 */


        loading: false, /* 載入狀態 */
        error: null, /* 錯誤 */


        SignInloading: false, /* 登入與登出在同一個頁面 */
        SignUploading: false, /* 所以將兩個分別獨立出來 */
        SignInError: null,
        SignUpError: null,
    },
    mutations: {


        /* 網頁載入時由loadWorks commit，重新載入並渲染頁面 */
        setLoadedWorks (state, payload){
            state.loadedWorks = payload
            // console.log('loadedWorks', state.loadedWorks)
        },
        // setLoadedJsWorks (state, payload){
        //     state.loadedJsWorks = payload
        //     // console.log('loadedWorks', state.loadedWorks)
        // },
        // setLoadedCssWorks (state, payload){
        //     state.loadedCssWorks = payload
        //     // console.log('loadedWorks', state.loadedWorks)
        // },
        // setLoadedVueWorks (state, payload){
        //     state.loadedVueWorks = payload
        //     // console.log('loadedWorks', state.loadedWorks)
        // },
        
        /* 資料上傳firebase成功後 commit，重新載入並渲染頁面 */
        addWork (state , payload){
            // if( payload.worktype === "Javascript"){
            //     state.loadedJsWorks.push(payload)
            //     console.log('資料上傳成功後加入loadedWorks', state.loadedWorks)
            // }
            // if( payload.worktype === "Html5+Css"){
            //     state.loadedCssWorks.push(payload)
            // }
            // if ( payload.worktype === "Vue"){
            //     state.loadedVueWorks.push(payload)
            // }
            // else 
                state.loadedWorks.push(payload)
            
        },

        /* 資料上傳firebase成功後 commit，傳入"newUser"，將state的 user改成 newUser */
        setUser (state, payload){
            state.user = payload

        },

        updateWork(state, payload){

            /* 從載入的資料中找尋id和更新資料相同的該筆資料回傳為workToUpdate */

        

            // if( payload.worktype === "Javascript"){
            //     console.log('資料被更新的是JS')
            //     this.workToUpdate = state.loadedJsWorks.find(work => {
            //         return work.Key = payload.id
            //     })
            // }
            // if( payload.worktype === "Html5+Css"){
            //     console.log('資料被更新的是Css')
            //     this.workToUpdate = state.loadedCssWorks.find(work => {
            //         return work.Key = payload.id
            //     })
            // }
            // if ( payload.worktype === "Vue"){
            //     console.log('資料被更新的是Vue')
            //     this.workToUpdate = state.loadedVueWorks.find(work => {
            //         return work.Key = payload.id
            //     })            
            // }
            // else 
            //     console.log('資料被更新的是其他')
            console.log('payload', payload)

            const workToUpdate = state.loadedWorks.find(work => {
                return work.Id === payload.Id
              })

            console.log('載入更新資料workToUpdate', workToUpdate)

            if(payload.Title){
                workToUpdate.Title = payload.Title
                // workToUpdate.Worktype = payload.Worktype
                // workToUpdate.Content = payload.Content
                // workToUpdate.Jsframe = payload.Jsframe
                // workToUpdate.Uiframe = payload.Uiframe
                // workToUpdate.ImgUrl = payload.ImgUrl
                // workToUpdate.Github = payload.Github
                // workToUpdate.View = payload.View
            }
            if(payload.Worktype){
                workToUpdate.Worktype = payload.Worktype
            }
            if(payload.Content){
                workToUpdate.Content = payload.Content
            }
            if(payload.Jsframe){
                workToUpdate.Jsframe = payload.Jsframe
            }
            if(payload.Uiframe){
                workToUpdate.Uiframe = payload.Uiframe
            }
            if(payload.ImgUrl){
                workToUpdate.ImgUrl = payload.ImgUrl
            }
            if(payload.Github){
                workToUpdate.Github = payload.Github
            }
            if(payload.View){
                workToUpdate.View = payload.View
            }

        },
        

        /* 透過signUserUp 或 signUserIn commit，傳入"true" 值，將state的 loading改成 true  *
         * 資料上傳firebase成功後(or失敗) commit，傳入"false"值，將state的 loading改成 false */
        
        /* 改變loading狀態 */
        setLoading(state, payload){
            state.loading = payload
            
        },
        
        // setSignInLoading(state, payload){
        //     state.SignInloading = payload

        // },
        // setSignUpLoading(state, payload){
        //     state.SignUploading = payload

        // },


        /* 透過signUserUp/signUserIn commit，傳入"error" */
        setError (state, payload){
            state.error = payload

        },
        // setSignInError (state, payload){
        //     state.SignInError = payload
        //     // console.log("SignInError",state.SignInError)

        // },
        // setSignUpError (state, payload){
        //     state.SignUpError = payload

        // },
  
        /* 透過signUserUp/signUserIn or clearError commit，將error 改成 null */
        clearError (state){
            state.error = null
        },
        
        
        // clearSignInError (state){
        //     state.SignInError = null
        // },
        // clearSignUpError (state){
        //     state.SignUpError = null

        // },
        



    },
    actions: {
        /* 網頁載入時(main.js)即觸發此Action */
        loadedWorks ({commit}) {
            commit('setLoading', true)
            firebase.database().ref('works-list').once('value')
              .then((data) => {
                const worksList = []

                /* val() 方法返回或设置被选元素的值 */
                const obj = data.val()
                console.log('網頁載入時obj')
                for (let key in obj) {
                 worksList.push({
                    Id: key,
                    Title: obj[key].Title,
                    Worktype: obj[key].Worktype,
                    Content: obj[key].Content,
                    ImgUrl: obj[key].ImgUrl,
                    Jsframe: obj[key].Jsframe,
                    Uiframe: obj[key].Uiframe,
                    Github: obj[key].Github,
                    View: obj[key].View,
                    // Image: obj[key].Image,
                    CreatorId: obj[key].CreatorId
                  })
                }
                console.log('載入成功後得到的worksList',worksList)
                commit('setLoadedWorks', worksList)
                commit('setLoading', false)
              })
              .catch(
                (error) => {
                  console.log(error)
                  commit('setLoading', false)
                }
              )
        },
        // loadJsWorks ({commit}) {
        //     commit('setLoading', true)
        //     firebase.database().ref('works-list/js-works-list/').once('value')
        //       .then((data) => {
        //         const worksList = []

        //         /* val() 方法返回或设置被选元素的值 */
        //         const obj = data.val()
        //         console.log('網頁載入時JS obj')
        //         for (let key in obj) {
        //          worksList.push({
        //             Id: key,
        //             Title: obj[key].Title,
        //             Worktype: obj[key].Worktype,
        //             Content: obj[key].Content,
        //             ImgUrl: obj[key].ImgUrl,
        //             Jsframe: obj[key].Jsframe,
        //             Uiframe: obj[key].Uiframe,
        //             Github: obj[key].Github,
        //             View: obj[key].View,
        //             // Image: obj[key].Image,
        //             CreatorId: obj[key].CreatorId
        //           })
        //         }
        //         console.log('載入成功後得到的JS worksList',worksList)
        //         commit('setLoadedJsWorks', worksList)
        //         commit('setLoading', false)
        //       })
        //       .catch(
        //         (error) => {
        //           console.log(error)
        //           commit('setLoading', false)
        //         }
        //       )
        // },
        // loadCssWorks ({commit}) {
        //     commit('setLoading', true)
        //     firebase.database().ref('works-list/css-works-list/').once('value')
        //       .then((data) => {
        //         const worksList = []

        //         /* val() 方法返回或设置被选元素的值 */
        //         const obj = data.val()
        //         console.log('網頁載入時CSS obj')
        //         for (let key in obj) {
        //          worksList.push({
        //             Id: key,
        //             Title: obj[key].Title,
        //             Worktype: obj[key].Worktype,
        //             Content: obj[key].Content,
        //             ImgUrl: obj[key].ImgUrl,
        //             Jsframe: obj[key].Jsframe,
        //             Uiframe: obj[key].Uiframe,
        //             Github: obj[key].Github,
        //             View: obj[key].View,
        //             // Image: obj[key].Image,
        //             CreatorId: obj[key].CreatorId
        //           })
        //         }
        //         console.log('載入成功後得到的CSS worksList',worksList)
        //         commit('setLoadedCssWorks', worksList)
        //         commit('setLoading', false)
        //       })
        //       .catch(
        //         (error) => {
        //           console.log(error)
        //           commit('setLoading', false)
        //         }
        //       )
        // },
        // loadVueWorks ({commit}) {
        //     commit('setLoading', true)
        //     firebase.database().ref('works-list/vue-works-list/').once('value')
        //       .then((data) => {
        //         const worksList = []

        //         /* val() 方法返回或设置被选元素的值 */
        //         const obj = data.val()
        //         console.log('網頁載入時VUE obj')
        //         for (let key in obj) {
        //          worksList.push({
        //             Id: key,
        //             Title: obj[key].Title,
        //             Worktype: obj[key].Worktype,
        //             Content: obj[key].Content,
        //             ImgUrl: obj[key].ImgUrl,
        //             Jsframe: obj[key].Jsframe,
        //             Uiframe: obj[key].Uiframe,
        //             Github: obj[key].Github,
        //             View: obj[key].View,
        //             // Image: obj[key].Image,
        //             CreatorId: obj[key].CreatorId
        //           })
        //         }
        //         console.log('載入成功後得到的Vue worksList',worksList)
        //         commit('setLoadedVueWorks', worksList)
        //         commit('setLoading', false)
        //       })
        //       .catch(
        //         (error) => {
        //           console.log(error)
        //           commit('setLoading', false)
        //         }
        //       )
        // },

        /* 新增文章時onAddWork時觸發此Action */
        addToWork ({commit, getters}, payload) {
            const work = {
                Title: payload.title,
                Worktype: payload.worktype,
                Content: payload.content,
                Jsframe: payload.jsframe,
                Uiframe: payload.uiframe,
                ImgUrl: payload.imgurl,
                Github: payload.github,
                View: payload.view,
                Image: payload.image,
                CreatorId: getters.user.id /* 抓取使用者id */
            }

            /* 這裏尚未定義ImgUrl，傳入的image作用為設定圖片路徑名稱 */

            // console.log('送出前的work資料', work)
            // let Img
            let Key
            // let uploadTask

            // if( payload.worktype === "Javascript"){
            //     firebase.database().ref('works-list/js-works-list').push(work)
            // }
            // if( payload.worktype === "Html5+Css"){
            //     firebase.database().ref('works-list/css-works-list').push(work)
            // }
            // if ( payload.worktype === "Vue"){
            //     firebase.database().ref('works-list/vue-works-list').push(work)
            // }
            // else 
                firebase.database().ref('works-list').push(work)
            

            .then((data)=>{
                // console.log('push 後 data（原work資料）', data)
                // console.log('push 後該筆data 產生的key', data.key)

                /* 指定Key 為 上傳時自動產生的key */
                Key = data.key

                return Key
            })
            
            
            .then(Key => {

                /* payload.img.name 為 files[0].name */
                const filename =payload.image.name

                /* slice() 方法會回傳一個新陣列物件，為原陣列選擇之begin 至end *
                 * 抓取原檔名的副檔名稱(.)之後的部分                         */
                const ext = filename.slice(filename.lastIndexOf('.'))

                // console.log('filename 原檔名',filename)
                // console.log('ext 副檔名',ext)

                /* 將檔案上傳至firebase.storage 指定路徑為"works-list/key.副檔名" */
                // if( payload.worktype === "Javascript"){
                //     return firebase.storage().ref('works-list/js-works-list/' + Key + ext).put(payload.image)
                // }
                // if( payload.worktype === "Html5+Css"){
                //     return firebase.storage().ref('works-list/css-works-list/' + Key + ext).put(payload.image)
                // }
                // if ( payload.worktype === "Vue"){
                //     return firebase.storage().ref('works-list/vue-works-list/' + Key + ext).put(payload.image)
                // }
                // else 
                    return firebase.storage().ref('works-list/' + Key + ext).put(payload.image)
                //  uploadTask = firebase.storage().ref('works-list/' + Key + ext).put(payload.image)

                //  return uploadTask
            })
            // .then(fileData => {
            //     console.log('fileData',fileData)
            //     /* 指定圖片路徑（ImgUrl）為 */
            //     const ImgPath = fileData.metadata.fullPath
            //     console.log('ImgPath',ImgPath)
                
            //     /* 將ImgUrl上傳(update)到 firebase.database裡面      “works-list”資料中child.Key的資料*/
            //     // return firebase.storage().ref('works-list').child(Key).getDownloadURL();
            //     // return fileData.snapshot.ref('works-list').child(Key).getDownloadURL()

            //     uploadTask.snapshot.ref.getDownloadURL()
            // })
            // .then(url => {
            //     console.log('url',url)

            //     ImgUrl = url

            //     return firebase.database().ref('works-list').child(Key).update({ImgUrl : ImgUrl})
            // })
            .then(() => {
                commit('addWork', {
                    ...work,
                    // ImgUrl: ImgUrl,
                    Id: Key
                })
            })
            .catch((error)=>{
                console.log(error)
            })
        },

        /* 更新作品onSaveChanges時觸發此Action */
        updateWorkData({commit}, payload){
            
            console.log('更新要求送出成功')
            commit('setLoading', true)

            /* 將更新資料定義為updateObj物件 */
            const updateObj = {}

            if(payload.Title){
                updateObj.Title = payload.Title
                // updateObj.Worktype = payload.Worktype
                // updateObj.Content = payload.Content
                // updateObj.Jsframe = payload.Jsframe
                // updateObj.Uiframe = payload.Uiframe
                // updateObj.ImgUrl = payload.ImgUrl
                // updateObj.Github = payload.Github
                // updateObj.View = payload.View
            }
            if(payload.Worktype){
                updateObj.Worktype = payload.Worktype
            }
            if(payload.Content){
                updateObj.Content = payload.Content
            }
            if(payload.Jsframe){
                updateObj.Jsframe = payload.Jsframe
            }
            if(payload.Uiframe){
                updateObj.Uiframe = payload.Uiframe
            }
            if(payload.ImgUrl){
                updateObj.ImgUrl = payload.ImgUrl
            }
            if(payload.Github){
                updateObj.Github = payload.Github
            }
            if(payload.View){
                updateObj.View = payload.View
            }

            console.log('這是要重新上傳的updateObj',updateObj)
            /* 比對work資料的id後更新 */
            // if( payload.worktype === "Javascript"){
            //     firebase.database().ref('works-list/js-works-list').child(payload.id).update(updateObj)
            // }
            // if( payload.worktype === "Html5+Css"){
            //     firebase.database().ref('works-list/css-works-list').child(payload.id).update(updateObj)
            // }
            // if ( payload.worktype === "Vue"){
            //     firebase.database().ref('works-list/vue-works-list').child(payload.id).update(updateObj)
            // }
            // else 
                firebase.database().ref('works-list').child(payload.Id).update(updateObj)
            .then((data) => {
                
                console.log('重新上傳成功！',data)
                commit('setLoading', false)
                

                /* 資料更新至firebbase成功後，commit "updateWork" 來更新網頁資料*/
                commit('updateWork', payload)
            })
            .catch(error => {
                console.log(error)
                commit('setLoading', false)
            })
        },

        /* 註冊SignUp時觸發此Action */
        signUserUp ({commit}, payload){
            // commit('setSignUpLoading', true)
            commit('setLoading', true)
            // commit('clearSignUpError')
            commit('clearError')

            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(
                user => {
                    // commit('setSignUpLoading', false)
                    commit('setLoading', false)

                    /* 註冊成功後回傳user值 */
                    const newUser = {
                        id: user.uid,
                        registerdUser: []
                    }
                    commit('setUser',newUser)

                }
            )
            /* catch() 方法只處理 Promise 的被拒絕狀態，並回傳一個新的 Promise 物件 */
            .catch(
                error => {
                    commit('setLoading', false)
                    commit('setError', error)
                }
            )

        },

        /* 登入SignIn時觸發此Action */
        signUserIn ({commit}, payload){
            // commit('setSignInLoading', true)
            commit('setLoading', true)
            // commit('clearSignInError')
            commit('clearError')

            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(
                user => {
                    commit('setLoading', false)

                    /* 登入firebase成功後回傳user值 */
                    const newUser = {
                        id: user.uid,
                        registerdUser: []
                    }
                    commit('setUser',newUser)
                }
            )
            .catch(
                error => {
                    commit('setLoading', false)
                    commit('setError', error)
             
                }
            )

        },

        /* 關閉提示窗時onDismissed時觸發此Action */
        clearError ({commit}){
            /* commit mutation 'clearError'，設定error為null(false)關閉alert視窗 */      
            commit('clearError')

            // commit('clearSignInError')
            // commit('clearSignUpError')
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
        /* 按照Title排序文章 */
        loadedWorks (state){
            return state.loadedWorks
        },
        // loadedCssWorks (state){
        //     return state.loadedCssWorks

        // },
        // loadedVueWorks (state){
        //     return state.loadedVueWorks

        // },

        /* 只選擇了前五筆 */
        fearuredWorks (state, getters) {
            return getters.loadedWorks.slice(0, 5);
        },

        /* 載入作品資料*/
        loadedWork (state, worktype) {
            return (worktype) => {
                return state.loadedWork.filter((work) => {
                    return work.Worktype === worktype
                })
            }
        },
        user (state){
            return state.user
        },

        // SignInloading (state) {
        //     return state.SignInloading
        // },
        // SignUploading (state) {
        //     return state.SignUploading
        // },
        loading (state) {
            return state.loading
        },

        // SignInError (state) {
        // return state.SignInError
        // },        
        // SignUpError (state) {
        // return state.SignUpError
        // },        
        error (state) {
        return state.error
        },        
    }

})