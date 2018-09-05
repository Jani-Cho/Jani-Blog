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
                            <v-text-field
                                name="imageUrl"
                                label="ImageUrl"
                                id="imageUrl"
                                v-model="img"
                                required
                                
                            >
                            </v-text-field>
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
                                label="Content"
                                id="content"
                                v-model="content"
                                
                            >
                            </v-textarea>
                        </v-flex>
                    </v-layout>
                    <!-- <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                        <h4>Choose a Data & Time</h4>
                        </v-flex>
                    </v-layout>
                    <v-layout row class="mb-2">
                        <v-flex xs12 sm6 offset-sm3>
                        <v-date-picker v-model="date"></v-date-picker>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                        <v-time-picker v-model="time" format="24hr"></v-time-picker>
                        </v-flex>
                    </v-layout> -->
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
                github: ''
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
                // if (!this.formIsValid) {
                // return
                // }
                const workData={
                    title: this.title,
                    subtitle: this.subtitle,
                    img: this.img,
                    content: this.content,
                    view: this.view,
                    github: this.github
                }
                // console.log('I add work')
                this.$store.dispatch('addToWork', workData)
                this.$router.push('/works')

            }
        }
    }
</script>