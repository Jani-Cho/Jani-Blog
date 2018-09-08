<template>
  <v-container>    
    <v-layout row wrap >
      <v-flex xs12 v-if="member">
        <sign-in></sign-in>
        <h4 class="text-xs-center">您還沒有帳號嗎？請<v-btn small color="primary" dark @click="changeToSignup">按此註冊</v-btn></h4>
      </v-flex>
      <v-flex xs12 v-else>
        <sign-up ></sign-up>
        <h4 class="text-xs-center">您已經有帳號了<v-btn small color="success" dark @click="changeToSignup">按此登入</v-btn></h4>
      </v-flex>
      <!-- <v-flex xs12 sm6 class="mt-3">
        <v-layout row v-if="SignInError" >
          <v-flex sm10 offset-sm1>
            <app-alert @dismissed="onDismissed" :text="SignInError.message"></app-alert>
          </v-flex>
        </v-layout>    
        <v-layout row>
          <v-flex sm10 offset-sm1>
            <v-card>
              <v-card-text>
                <v-container>
                  <form @submit.prevent="onSignin">
                    <h2>Sign In 登入</h2>
                    <v-layout row>
                      <v-flex xs12>
                        <v-text-field
                        name="email"
                        label="Mail"
                        id="signInEmail"
                        v-model="signInEmail"
                        type="email"
                        required
                        >
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12>
                        <v-text-field
                        name="password"
                        label="Password"
                        id="signInPassword"
                        v-model="signInPassword"
                        type="password"
                        required
                        >
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12>
                        <v-btn type="submit" :disabled="SignInLoading||!SigninData" :loading="SignInLoading">Sign in
                          <span slot="loader" class="custom-loader">
                          <v-icon light>cached

                          </v-icon>
                          </span>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm6 class="mt-3">
        <v-layout row v-if="SignUpError">
          <v-flex sm10 offset-sm1>
            <app-alert @dismissed="onDismissed" :text="SignUpError.message"></app-alert>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex sm10 offset-sm1>
            <v-card>
              <v-card-text>
                <v-container>
                  <form @submit.prevent="onSignup">
                    <h2>Sign Up 註冊</h2>
                    <v-layout row>
                      <v-flex xs12>
                        <v-text-field
                        name="email"
                        label="Mail"
                        id="signUpEmail"
                        v-model="signUpEmail"
                        type="email"
                        required
                        >
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12>
                        <v-text-field
                        name="password"
                        label="Password"
                        id="signUpPassword"
                        v-model="signUpPassword"
                        type="password"
                        required
                        > 
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12>
                        <v-text-field
                        name="confirmPassword"
                        label="Confirm Password"
                        id="confirmPassword"
                        v-model="confirmPassword"
                        type="password"
                        :rules="[comparePasswords]"
                        >
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12>
                        <v-btn type="submit" :disabled="SignUpLoading||!SignupData" :loading="SignUpLoading">Sign up
                          <span slot="loader" class="custom-loader">
                          <v-icon light>cached

                          </v-icon>
                          </span>
                        </v-btn>

                      </v-flex>
                    </v-layout>
                  </form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>

      </v-flex> -->
    </v-layout>


  </v-container>

</template>

<script>
import signIn from './signIn'
import signUp from './signUp'
  export default {
    components:{
      'sign-in': signIn,
      'sign-up': signUp,
    },
    data(){
      return{
        member: true,
      }
    },
    methods:{
      changeToSignup(){
        console.log('i am clicked')
        this.member = !this.member 
      }
    }
  //   data (){
  //     return {
  //       signInEmail: '',
  //       signUpEmail: '',
  //       signInPassword: '',
  //       signUpPassword: '',
  //       confirmPassword: ''
  //     }
  //   },
  //   computed: {
  //     //確認資料填寫正確與否
  //     SigninData(){
  //         return this.signInPassword !== ''&& this.signInEmail !== ''
  //     },
  //     SignupData(){
  //         return this.signUpPassword == this.confirmPassword && 
  //         this.signUpPassword !== ''&&
  //         this.confirmPassword !== ''&&
  //         this.signUpEmail !== ''
  //     },
  //     //確認密碼是否輸入正確
  //     comparePasswords(){
  //       return this.signUpPassword !== this.confirmPassword ? 'Passwords do not match' : 'ok'
  //     },

  //     // user值原為null> 會在store mutation "setUser" 被傳入 "newUser"
  //     // 決定頁面跳轉> watch
  //     user (){
  //       return this.$store.getters.user
  //     },

  //     // error值原為null(false)> 會在store mutation "setError" 被傳入 firebase 的 "error"> error值變為!null(true)
  //     // 此處作用為 決定Alert視窗是否顯現
  //     SignInError(){
  //       return this.$store.getters.SignInError

  //     },
  //     SignUpError(){
  //       return this.$store.getters.SignUpError

  //     },
  //     // loading值原為false> 會在store mutation "setLoading" 時被改變
  //     // 此處作用為 決定送出Btn是否有loading效果
  //     SignInLoading(){
  //       return this.$store.getters.SignInloading

  //     },
  //     SignUpLoading(){
  //       return this.$store.getters.SignUploading

  //     } 

  //   },
  //   watch:{
  //     user (value){
  //       if(value !== null && value !== undefined){
  //         this.$router.push('/')
  //       }
  //     }
  //   },
  //   methods:{
  //     onSignin (){
  //       //Vuex
  //       this.$store.dispatch('signUserIn',{email: this.signInEmail, password: this.signInPassword})

  //     },

  //     //click送出btn(@submit) > 執行onSignup > dispatch $store action "signUserUp" 並傳入email＆password
  //     onSignup (){
  //       //Vuex
  //       this.$store.dispatch('signUserUp',{email: this.signUpEmail, password: this.signUpPassword})

  //     },
  //     //click Alert視窗的'X'btn(@dismissed) > 執行onDismissed > dispatch $store action "clearError" 
  //     onDismissed() {
  //       // console.log('Dismissed Alert!')
  //       this.$store.dispatch('clearError')
  //     }
  //   }
   }
</script> 