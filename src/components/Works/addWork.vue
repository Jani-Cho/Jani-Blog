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
                            <!-- 作品標題 -->
                            <v-text-field
                                name="title"
                                label="作品名稱 Title"
                                id="title"
                                v-model="title"
                                required>
                            </v-text-field>

                            <!-- 作品類型 -->
                            <v-select
                                :items="types"
                                v-model="value"
                                label="作品類型 WorkType"
                                data-vv-name="select"
                                required
                            ></v-select>

                            <!-- 作品內容 -->
                            <v-text-field
                                name="content"
                                label="作品內容 Content"
                                id="content"
                                v-model="content"
                            >
                            </v-text-field>

                            <!-- JS框架 -->
                            <v-text-field
                                name="jsframe"
                                label="JS框架 JsFrame"
                                id="jsframe"
                                v-model="jsframe"
                            >
                            </v-text-field>

                            <!-- UI框架 -->
                            <v-text-field
                                name="uiframe"
                                label="UI框架 UiFrame"
                                id="uiframe"
                                v-model="uiframe"
                            >
                            </v-text-field>
                            
                            <!-- 上傳圖片 -->
                            <v-btn raised class="secondary" @click="onPickFile">上傳圖片</v-btn>
                            <!-- 原本的input被隱藏，透過onPickFile來觸發 -->
                            <input 
                                type="file" 
                                ref="fileInput"
                                style="display:none" 
                                accept="image/*"
                                @change="onFilePicked"
                            >

                            <!-- 預覽圖片 -->
                            <img :src="imgurl" width="100%">

                            <!-- github -->
                            <v-text-field
                                name="githubUrl"
                                label="Github連結 githubUrl"
                                id="githubUrl"
                                v-model="github"
                                required
                            >
                            </v-text-field>

                            <!-- 預覽網址 -->
                            <v-text-field
                                name="viewUrl"
                                label="預覽網址 viewUrl"
                                id="viewUrl"
                                v-model="view"
                                required
                            >
                            </v-text-field>

                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn class="primary" :disabled="!formIsValid" type="submit">送出</v-btn>
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
                title: '', /* 作品名稱 */
                value: null,  /* 作品類型 */
                content: '',  /* 作品內容 */
                // subtitle: '',  /* */
                jsframe: '',  /* js框架 */
                uiframe: '',  /* ui框架 */
                imgurl: '',  /* 圖片Data URL(base64) */
                github: '',  /* giithub連結 */
                view: '',  /* 預覽連結 */
                image: '', /* 圖片資訊 */
                types: [  /* 類型列表 */
                    'Html5+Css',
                    'Javascript',
                    'Vue'
                ],
            }
        },
        computed:{
            /* 確認表單必填項目是否完整 */
            formIsValid(){
                return this.title !== ''&& 
                this.value !== null &&
                this.imgurl !== '' &&
                this.github !== '' &&
                this.view !== ''
            },

        },
        methods:{
            /* 新增文章 */
            onAddWork(){

                const workData={
                    title: this.title,
                    worktype: this.value,
                    content: this.content,
                    jsframe: this.jsframe,
                    uiframe: this.uiframe,
                    imgurl: this.imgurl,
                    github: this.github,
                    view: this.view,
                    image: this.image
                }

                /* 此處workData並沒有imgurl，只有將files[0](image)傳入*/


                console.log('新增文章workData',workData)
                // console.log('I add work')
                this.$store.dispatch('addToWork', workData)
                this.$router.push('/works/all')

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