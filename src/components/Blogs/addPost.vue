<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <h2 class="secondary--text">新增文章</h2>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <form @submit.prevent="onAddWork">
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="title"
                                label="文章標題"
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
                                label="文章摘要"
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
                                name="viewUrl"
                                label="文章網址"
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
                            style="display:none" 
                            ref="fileInput" 
                            accept="image/*"
                            @change="onFilePicked"
                            >
                    
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <img :src="img" width="100%">
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-textarea
                                name="content"
                                label="內容"
                                id="content"
                                v-model="content"
                                
                            >
                            </v-textarea>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn class="error" :disabled="!fornIsValid" type="submit">送出</v-btn>
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
                img: '',
                content: '',
                view: '',
                github: '',
                image: null
            }
        },
        computed:{
            fornIsValid(){
                return this.title !== ''&& 
                this.subtitle !== '' &&
                this.img !== ''&&
                this.view !== ''&&
                this.github !== ''
            },
            // submittableDateTime () {
            //     const date = new Date(this.date)
            //     if (typeof this.time === 'string') {
            //     let hours = this.time.match(/^(\d+)/)[1]
            //     const minutes = this.time.match(/:(\d+)/)[1]
            //     date.setHours(hours)
            //     date.setMinutes(minutes)
            //     } else {
            //     date.setHours(this.time.getHours())
            //     date.setMinutes(this.time.getMinutes())
            //     }
            //     return date
            // }
        },
        methods:{
            onAddWork(){
                console.log('送出')

                if (!this.image){
                    console.log('image失敗')
                    return
                }
                console.log('image成功')
                const workData={
                    title: this.title,
                    subtitle: this.subtitle,
                    img: this.image,
                    content: this.content,
                    view: this.view,
                    github: this.github
                }
                console.log('workData',workData)
                // console.log('I add work')
                this.$store.dispatch('addToWork', workData)
                this.$router.push('/works')

            },
            onPickFile(){
                //fileInput為上傳圖片原input的ref，原來的input被隱藏，透過onPickFile來觸發
                this.$refs.fileInput.click(); 
            },
            onFilePicked(event){
                // console.log('event', event)
                const files = event.target.files
                console.log('files', files)
                let filename = files[0].name
                console.log('filename', filename)
                //lastIndexOf() 方法可返回一个指定的字符串值最后出现的位置
                if (filename.lastIndexOf('.') <= 0){
                    return alert('Please add a valid file!')
                }
                const fileReader = new FileReader()
                console.log('fileReader',fileReader)
                fileReader.addEventListener('load', () => {
                    this.img = fileReader.result
                console.log('img',this.img)
                })
                // FileReader對象的readAsDataURL方法可以將讀取到的文檔編碼成Data URL
                fileReader.readAsDataURL(files[0])
                console.log('files[0]',files[0])
                // const dataUrl = fileReader.readAsDataURL(files[0])
                // console.log('dataUrl',dataUrl)
                this.image = files[0]
                console.log('image',this.image)

            }
        }
    }
</script>