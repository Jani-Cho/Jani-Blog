<template>

  <v-container fluid grid-list-xs>
    <!-- 所有作品列表 Page1-->
    <v-layout row wrap class="page1">
      <v-flex sm12 md6 offset-md0 v-for="(work, index) in works" :key="index" class="mb-4 text--left pl-3 pr-3">
        <v-card>
          <v-card-title>
            <h2 class="dark--text">{{work.Title}}</h2>
          </v-card-title>
          <v-img
            :src="work.ImgUrl"
            height="300px"
          ></v-img>
          <v-card-text class="work-content">
            <div class="error--text">{{work.Content}}</div>
            <div >{{work.Subtitle}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn 
            dark 
            color="orange" 
            @click="goDetail(index)">查看內容</v-btn>
          </v-card-actions>
        </v-card>
        

      </v-flex>

    </v-layout>
    <!-- 所有作品列表 Page1 End-->

    <!-- 作品詳細內容 Page2-->
    <v-layout class="page2" style="display: none; z-index: 1;">
      <v-flex md10 offset-md1>
        <v-card>
          <v-card-title>
            <h2 class="dark--text">{{workData.Title}}</h2>

            <!-- 修改按鈕 : 按鈕要在登入狀態才會顯現 -->
            <template v-if="userIsAuthenticated">
              <v-spacer></v-spacer>
              <app-edit-work :workData="workData"></app-edit-work>
            </template>
            <!-- 修改按鈕 End -->
          </v-card-title>
          <v-img
            :src="workData.ImgUrl"
            height="400px"
          ></v-img>
          <v-card-text>
            <div class="error--text">{{workData.Content}}</div>
            <div>{{workData.Subtitle}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="orange" @click="goBack()"  >Go Back</v-btn>
            <v-btn flat color="orange" @click="openLink(workData.View)"  >VIEW</v-btn>
            <v-btn flat color="orange" @click="openLink(workData.Github)" >GITHUB</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>      
    </v-layout>
    <!-- 作品詳細內容 Page2 End-->
  </v-container>

</template>

<script>
import workType from './workType'

  export default {
    components:{
      'work-type': workType
    },
    data() {
      return {
        currentPage: 1, /* 現在頁面，畫面左右切換使用 */
        workData:{
          Title: '',/* 作品標題 */
          Subtitle: '',/* 作品副標題：作品主要功能或效果 */
          ImgUrl: '', /* 現為base64 */
          Content: '',/* 作品使用到的技術 */
          Github: '',/* 作品Github網址 */
          View: '',/* 作品展示網址 */
          id: ''/* 使用者(發文者)id */
        }
      }
    },
    computed: {
      /* 將作品資料載入 */
      works () {
        return this.$store.getters.loadedWorks
      },

      /* 確認是否為登入狀態 */
      userIsAuthenticated() {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },

    },
    methods:{
      openLink(site){
        window.open(site , '', 'height=1000,width=500');
      },
      /* 前往作品內容(.page2)的內容 */
      goDetail(id) {
        // console.log('id', id)
        // console.log('which', this.works)
        const showPage2 = document.querySelector('.page2');
        showPage2.style.display =  `block`;

        this.nextContent(2, id);
      },

      /* 頁面切換 */
      nextContent(next, id) {
        const curPage = ".page"+this.currentPage; //.page1
        const nextPage =".page"+next; //.page2
        const curPageClass = document.querySelector(curPage); //抓取.page1的section
        const nextPageClass = document.querySelector(nextPage); //抓取.page2的section

        if(this.currentPage == next){
          return;
        
        }
        if(this.currentPage < next){
          nextPageClass.classList.add('rightToleft'); //page2加入滑動特效
          curPageClass.style.display = 'none' ; //page1隱藏
          curPageClass.style.zIndex = '2' ; 
          nextPageClass.style.zIndex = '1' ; 

          this.currentPage = next; //現在頁面> 2
          setTimeout(function(){
            // curPageClass.style.display = 'none' ;  
            curPageClass.classList.remove('leftToright');


          }, 500)

          //選取正確的內容展示
          this.workData.Title = this.$store.state.loadedWorks[id].Title;
          this.workData.Subtitle = this.$store.state.loadedWorks[id].Subtitle;
          // this.Github = this.$store.state.loadedWorks[id].Github;
          this.workData.ImgUrl = this.$store.state.loadedWorks[id].ImgUrl;
          this.workData.Content = this.$store.state.loadedWorks[id].Content;
          this.workData.Github = this.$store.state.loadedWorks[id].Github;
          this.workData.View = this.$store.state.loadedWorks[id].View;
          this.workData.id = this.$store.state.loadedWorks[id].creatorId;
        }else{
          //現在nextPageClass是page1
          nextPageClass.classList.add('leftToright');
          nextPageClass.style.display = '' ;
          curPageClass.style.zIndex = '1' ; 
          nextPageClass.style.zIndex = '2' ; 
          this.currentPage = next; //現在頁面> 1

          //移除現在頁面

          setTimeout(function(){
            curPageClass.classList.remove('rightToleft');


          }, 500)
        }
        
        window.document.documentElement.scrollTop = 0; //視窗會回到最頂端


      },

      /* 返回作品列表(.page1)的內容 */
      goBack() {
        const hidePage2 = document.querySelector('.page2');
        hidePage2.style.display = `none`;
        const showPage1 = document.querySelector('.page1');
        showPage1.style.display = `block`;
        this.nextContent(1);
      },

      /* 返回作品頁 */
      goBackToWorks() {
        this.$router.push('/works')

      }
    }
  }
</script>
<style>
  .work-content{
    min-height: 100px;
  }
  /* 頁面由右往左滑動特效 */
  @-moz-keyframes rightToleft {
	from {
	  transform: translateX(100%);
	}
	to {
	  transform: translateX(0);
	}
  }
  @-webkit-keyframes rightToleft {
	from {
	  transform: translateX(100%);
	}
	to {
	  transform: translateX(0);
	}
  }
  @keyframes rightToleft {
	from {
	  transform: translateX(100%);
	}
	to {
	  transform: translateX(0);
	}
  }

  .rightToleft {
	-moz-animation: rightToleft 0.5s linear 0s 1 alternate;
	-webkit-animation: rightToleft 0.5s linear 0s 1 alternate;
	animation: rightToleft 0.5s linear 0s 1 alternate;
	-moz-animation-fill-mode: forwards;
	-webkit-animation-fill-mode: forwards;
	animation-fill-mode: forwards;
  }
  

  /* 頁面由左往右滑動特效 */
  @-moz-keyframes leftToright {
	from {
	  transform: translateX(-100%);
	}
	to {
	  transform: translateX(0);
	}
  }
  @-webkit-keyframes leftToright {
	from {
	  transform: translateX(-100%);
	}
	to {
	  transform: translateX(0);
	}
  }
  @keyframes leftToright {
	from {
	  transform: translateX(-100%);
	}
	to {
	  transform: translateX(0);
	}
  }

  .leftToright {
	-moz-animation: leftToright 0.5s linear 0s 1 alternate;
	-webkit-animation: leftToright 0.5s linear 0s 1 alternate;
	animation: leftToright 0.5s linear 0s 1 alternate;
	-moz-animation-fill-mode: forwards;
	-webkit-animation-fill-mode: forwards;
	animation-fill-mode: forwards;
  }



</style>

