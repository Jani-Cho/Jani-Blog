<template>
    <v-dialog width="500px" persistent v-model="editDialog">
        <v-btn small flat  accent slot="activator" @click="dataprint">
            
            <v-icon >edit</v-icon>編輯
        </v-btn>
        
        <!--  編輯視窗： 如果使用者(user.id)為發文者(creatorId)，則顯示編輯視窗 -->
        <v-card v-if="userIsCreator">
            <v-container row wrap>
                <v-layout>                    
                    <v-flex xs12>
                        <v-card-title>Edit Work</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout>
                    <v-flex xs12  >
                        <v-card-text >
                            <v-text-field
                                name="title"
                                label="作品名稱 Title"
                                id="title"
                                v-model="editedtitle"
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
                                v-model="editedcontent"
                            >
                            </v-text-field>

                            <!-- JS框架 -->
                            <v-text-field
                                name="jsframe"
                                label="JS框架 JsFrame"
                                id="jsframe"
                                v-model="editedjsframe"
                            >
                            </v-text-field>

                            <!-- UI框架 -->
                            <v-text-field
                                name="uiframe"
                                label="UI框架 UiFrame"
                                id="uiframe"
                                v-model="editeduiframe"
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
                            <img :src="editedimgurl" width="100%">

                            <!-- github -->
                            <v-text-field
                                name="githubUrl"
                                label="Github連結 githubUrl"
                                id="githubUrl"
                                v-model="editedgithub"
                                required
                            >
                            </v-text-field>

                            <!-- 預覽網址 -->
                            <v-text-field
                                name="viewUrl"
                                label="預覽網址 viewUrl"
                                id="viewUrl"
                                v-model="editedview"
                                required
                            >
                            </v-text-field>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat class="red--text darken-1" @click="editDialog = false">Close</v-btn>
                            <v-btn flat class="primary darken-1" @click="onSaveChanges">Save</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
        <!--  編輯視窗 End -->
        <!--  提示視窗： 若非發文者則提示無權限修改 -->
        <v-card v-else>
            <v-container row wrap>

                <v-layout>
                    <v-flex xs12  >
                        <h3>非發文者無修改權限！</h3>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat class="red--text darken-1" @click="editDialog = false">Close</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
        <!--  提示視窗 End  -->

    </v-dialog>
</template>

<script>
    export default {
        props: ['work'],
        data() {
            return {
                userIsCreator: true,
                editDialog: false,
                value: '',  /* 作品類型 */
                editedtitle: '', /* 作品名稱 */
                editedcontent: '',  /* 作品內容 */
                editedjsframe: '',  /* js框架 */
                editeduiframe: '',  /* ui框架 */
                editedimgurl: '',  /* 圖片Data URL(base64) */
                editedgithub: '',  /* giithub連結 */
                editedview: '',  /* 預覽連結 */
                editedimage: '', /* 重新上傳的圖片資訊 */
                types: [  /* 類型列表 */
                    'Html5+Css',
                    'Javascript',
                    'Vue',
                ],

            }
        },
        computed: {

            /* 確認是否為該作品發文者 */
            // userIsCreator() {
            //     return this.$store.getters.user.id === this.work.CreatorId
            // },

        },
        methods:{
            /* 重新作品詳細資料 */
            dataprint(){
                let apple = this.$store.getters.user
                console.log('work', this.work)
                console.log('user', apple)
                this.editedtitle = this.work.Title,
                this.value = this.work.Worktype
                this.editedcontent = this.work.Content
                this.editedjsframe = this.work.Jsframe
                this.editeduiframe = this.work.Uiframe
                this.editedimgurl = this.work.ImgUrl
                this.editedgithub = this.work.Github
                this.editedview = this.work.View
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
                    this.editedimgurl = fileReader.result
                })
                
                /* FileReader對象的readAsDataURL方法可以將讀取到的文檔編碼成Data URL */
                fileReader.readAsDataURL(files[0])
                // console.log('files[0]',files[0])

                this.editedimage = files[0]
                // console.log('image',this.image)

                // console.log('img',this.img)
            },
            
            /* 儲存作品資料變更 */
            onSaveChanges(){
                /* trim()移除所有的開頭和結尾空白字元 */
                if(this.editedtitle.trim() === '' && 
                this.editedcontent.trim() === '' && this.editedimgurl.trim() === ''){
                    return
                }

                /* 關閉修改視窗 */
                this.editDialog = false

                /* 跳回列表頁 */
                this.$router.push('/works/all')

                /* 調度store的 updateWorkData *
                 * 把更新的作品資料 &作品id傳入  */
                console.log('有來嗎？')
                
                this.$store.dispatch('updateWorkData', {
                    Id: this.work.Id, /* 作品ID */

                    Title: this.editedtitle, /* 作品名稱 */
                    Worktype: this.value,  /* 作品類型 */
                    Content: this.editedcontent,  /* 作品內容 */
                    Jsframe: this.editedjsframe,  /* js框架 */
                    Uiframe: this.editeduiframe,  /* ui框架 */
                    ImgUrl: this.editedimgurl,  /* 圖片Data URL(base64) */
                    Github: this.editedgithub,  /* giithub連結 */
                    View: this.editedview,  /* 預覽連結 */
                })
            }
        }
    }
</script>