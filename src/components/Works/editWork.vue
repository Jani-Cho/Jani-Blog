<template>
    <v-dialog width="350px" persistent v-model="editDialog">
        <v-btn small flat  accent slot="activator">
            
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
                        <v-card-text>
                            <v-text-field
                                name="title"
                                label="Title"
                                id="title"
                                v-model="editedTitle"
                                required>
                                {{ editedTitle }}
                            </v-text-field>
                            <v-textarea
                                name="content"
                                label="Content"
                                id="content"
                                v-model="editedContent"
                            >
                            {{ editedContent }}
                            </v-textarea>
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
        props: ['workData'],
        data() {
            return {
                editDialog: false,
                editedTitle: this.workData.Title,
                editedContent: this.workData.Content

            }
        },
        computed: {

            /* 確認是否為該作品發文者 */
            userIsCreator() {
                console.log('workData',this.workData)

                return this.$store.getters.user.id === this.workData.id
            }            
        },
        methods:{
            onSaveChanges(){
                if(this.editedTitle.trim() === '' && this.editedContent.trim() === ''){
                    return
                }

                /* 關閉修改視窗 */
                this.editDialog = false

                /* 調度store的 updateWorkData *
                 * 把更新的作品資料 &作品id傳入  */
                
                this.$store.dispatch('updateWorkData', {
                    id: this.workData.id,
                Title: this.editedTitle,
                Content: this.editedContent
                })
                console.log('有來嗎？')
            }
        }
    }
</script>