<template>
  <v-container>    
    <v-layout row wrap >
      <v-flex xs12 md8 offset-md2 class="mt-3">
        <v-layout row v-if="error">
          <!-- error預設false，若為true時才會顯現Alert -->
          <v-flex sm10 offset-sm1>
            <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
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
                        label="帳號Mail"
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
                        label="密碼Password"
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
                        label="確認密碼Confirm Password"
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
                        <!-- loading為true值時，btn為"disabled"狀態並且會執行 "loading" -->
                        <!-- dataNotReady不為true值時，btn為"disabled"狀態 -->
                        <v-btn type="submit" :disabled="loading||!SignupData" :loading="loading">Sign up
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
    </v-layout>


  </v-container>

</template>

<script>
  export default {
    data (){
      return {
        signUpEmail: '', /* 註冊帳號 */
        signUpPassword: '', /* 註冊密碼 */
        confirmPassword: '' /* 再次確認密碼 */
      }
    },
    computed: {
      /* 確認註冊資料是否填寫完整 */
      SignupData(){
          return this.signUpPassword == this.confirmPassword && /* 確認密碼輸入是否相同 */
          this.signUpPassword !== ''&&
          this.confirmPassword !== ''&&
          this.signUpEmail !== ''
      },

      /* 確認密碼是否輸入正確*/
      comparePasswords(){
        return this.signUpPassword !== this.confirmPassword ? 'Passwords do not match' : 'ok'
      },

      /* user值原為null，會在store mutation "setUser"commit時被改變 *
       * 傳入 "newUser"後，watch監聽user值 決定頁面跳轉 */
      user(){
        return this.$store.getters.user
      },

      /* error值原為null(false)，會在store mutation "setError"commit時被改變 *
       * 並將 firebase 的 "error"傳入，error值變為!null(true)時Alert視窗會出現 */
      error(){
        return this.$store.getters.error
      },

      /* loading值原為false，會在store mutation "setLoading" commit時被改變 *
       * 此處作用為決定送出按鈕是否有loading效果，並且在loading為true按鈕無法點擊 */
      loading(){
        return this.$store.getters.loading
      },

    },
    watch:{
      /* 監聽user值不會null或undefined時頁面跳轉回首頁 */
      user (value){
        if(value !== null && value !== undefined){
          this.$router.push('/')
        }
      },

    },
    methods:{
      /* 點擊註冊按鈕後調度store signUserUp */

      onSignup(){
        /* click送出btn(@submit)，執行onSignup dispatch store "signUserUp"，並傳入email＆password */
        this.$store.dispatch('signUserUp',{email: this.signUpEmail, password: this.signUpPassword})
      },

      /* click Alert視窗的'X'btn(@dismissed)，執行onDismissed 去調度 store "clearError" */
      onDismissed() {
        this.$store.dispatch('clearError')
      }
    }
  }
</script> 