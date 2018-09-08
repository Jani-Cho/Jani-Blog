<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <h2 class="secondary--text">新增作品</h2>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <form @submit.prevent="onAddWork">
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="title"
                                label="Title"
                                id="title"
                                v-model="title"
                                required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="subtitle"
                                label="Subtitle"
                                id="subtitle"
                                v-model="subtitle"
                                required
                            >
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="githubUrl"
                                label="githubUrl"
                                id="githubUrl"
                                v-model="github"
                                required
                                
                            >
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="viewUrl"
                                label="viewUrl"
                                id="viewUrl"
                                v-model="view"
                                required
                                
                            >
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <!-- 原本的input被隱藏，透過onPickFile來觸發 -->
                            <v-btn raised class="primary" @click="onPickFile">上傳圖片</v-btn>
                            <input 
                            type="file" 
                            ref="fileInput"
                            style="display:none" 
                            accept="image/*"
                            @change="onFilePicked"
                            >
                    
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <img :src="imgurl" width="100%">
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-textarea
                                name="content"
                                label="Content"
                                id="content"
                                v-model="content"
                                
                            >
                            </v-textarea>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn class="error" :disabled="!formIsValid" type="submit">送出</v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default{
        data(){
            return{
                title: '',
                subtitle: '',
                imgurl: '',
                content: '',
                view: '',
                github: '',
                image: null
            }
        },
        computed:{
            formIsValid(){
                return this.title !== ''&& 
                this.subtitle !== '' &&
                this.imgurl !== ''&&
                this.view !== ''&&
                this.github !== ''
            },
        },
        methods:{

            /* 新增文章 */
            onAddWork(){
                // console.log('送出') 

                if (!this.image){
                    // console.log('image失敗')
                    return
                }
                // console.log('image成功')
                const workData={
                    title: this.title,
                    subtitle: this.subtitle,
                    image: this.image,
                    imgurl: this.imgurl,
                    content: this.content,
                    view: this.view,
                    github: this.github
                }

                /* 此處workData並沒有imgurl，只有將files[0](image)傳入*/


                // console.log('workData',workData)
                // console.log('I add work')
                this.$store.dispatch('addToWork', workData)
                this.$router.push('/works')

            },

            /* 新增圖片 */
            onPickFile(){
                /* fileInput為上傳圖片原input的ref，原來的input被隱藏，透過onPickFile來觸發 */
                this.$refs.fileInput.click(); 
            },

            /* 上傳圖片的input監聽change */
            onFilePicked(event){
                // console.log('event', event)
                // console.log('files', files)
                const files = event.target.files
                // console.log('files', files)
                let filename = files[0].name
                // console.log('filename', filename)
                /* lastIndexOf() 方法可返回一个指定的字符串值最后出现的位置 */
                if (filename.lastIndexOf('.') <= 0){
                    return alert('Please add a valid file!')
                }
                const fileReader = new FileReader()
                // console.log('fileReader',fileReader)

                /* load 事件發生在加載完目標資源、該資源依賴的其他資源時 */
                fileReader.addEventListener('load', () => {
                    this.imgurl = fileReader.result
                })
                
                /* FileReader對象的readAsDataURL方法可以將讀取到的文檔編碼成Data URL */
                fileReader.readAsDataURL(files[0])
                // console.log('files[0]',files[0])

                this.image = files[0]
                // console.log('image',this.image)

                // console.log('img',this.img)
            }
        }
    }
</script>