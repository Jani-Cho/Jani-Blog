<template>
  <v-container>    
    <v-layout row wrap >
      <v-flex xs12 md8 offset-md2 class="mt-3">
          <!-- error預設false，若為true時才會顯現Alert -->
        <v-layout row v-if="error" >
          <v-flex sm10 offset-sm1>
            <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
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
                        label="帳號Mail"
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
                        label="密碼Password"
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
                        <v-btn type="submit" :disabled="loading||!SigninData" :loading="loading">Sign in
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
  export default{
    data (){
      return {
        signInEmail: '', /* 登入帳號 */
        signInPassword: '', /* 登入密碼 */
      }
    },
    computed: {
      /* 確認登入資料是否填寫完整 */
      SigninData(){
          return this.signInPassword !== ''&& this.signInEmail !== ''
      },

      /* user值原為null，會在store mutation "setUser"commit時被改變 *
       * 傳入 "newUser"後，watch監聽user值 決定頁面跳轉 */
      user (){
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
      }
    },

    methods:{
      /* 點擊登入按鈕後調度store signUserIn */
      onSignin (){
        this.$store.dispatch('signUserIn',{email: this.signInEmail, password: this.signInPassword})

      },

      /* click Alert視窗的'X'btn(@dismissed)，執行onDismissed 去調度 store "clearError" */
      onDismissed() {
        // console.log('Dismissed Alert!')
        this.$store.dispatch('clearError')
      }
    }
  }
</script> 