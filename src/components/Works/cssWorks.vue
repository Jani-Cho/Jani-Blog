<template>

  <v-container fluid grid-list-xs>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <!-- 所有作品列表 Page1-->
    <v-layout row wrap v-else class="workCard">
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
            <!-- <div >{{work.Datatype}}</div> -->
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
    <v-layout class="workDetail" style="display: none; z-index: 1;">
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
            <v-btn flat color="orange" @click="goBack()">Go Back</v-btn>
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

  export default {
    data() {
      return {
        currentPage: 'Card', /* 現在頁面，畫面左右切換使用 */
        type: 'Html5+Css',
        workData:{
          Title: '', /* 作品名稱 */
          Worktype: '',  /* 作品類型 */
          Content: '',  /* 作品內容 */
          Jsframe: '',  /* js框架 */
          Uiframe: '',  /* ui框架 */
          ImgUrl: '',  /* 圖片Data URL(base64) */
          Github: '',  /* giithub連結 */
          View: '',  /* 預覽連結 */
          CreatorId: '', /* 使用者(發文者)id */
          Key: '', /* 該筆資料在firebase上的id */
        }
      }
    },
    computed: {
      /* 將作品資料載入 */
      works () {
        // console.log('js預載works:loadedWorks', this.$store.getters.loadedWorks)
        return this.$store.getters.loadedWorks.filter((work) => {
          return work.Worktype === this.type
        })   
      },

      /* 確認是否為登入狀態 */
      userIsAuthenticated() {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods:{
      /* 前往作品內容(.workDetail)的內容 */
      goDetail(id) {
        // console.log('id', id)
        // console.log('which', this.works)

        const showDetail = document.querySelector('.workDetail');
        showDetail.style.display =  `block`;

        let next = 'Detail'

        this.showContent(next, id);
      },

      /* 頁面切換 */
      showContent(next, id) {
        const curPage = ".work"+this.currentPage; /* goDetail:.workCard */ /* goBack:.workDetail */
        const nextPage =".work"+next; /* goDetail:.workDetail */ /* goBack:.workCard */
        const curPageClass = document.querySelector(curPage); /* 抓取.workCard/.workDetail的section */
        const nextPageClass = document.querySelector(nextPage); /* 抓取.workDetail/.workCard的section */

        // console.log('執行showContent')

        if(this.currentPage == next){
          // console.log('被return')
          return;
        }
        if(this.currentPage === 'Card'){
          // console.log('currentPage === "Card"',)
          nextPageClass.classList.add('rightToleft'); /* .workDetail加入滑動特效*/
          curPageClass.style.display = 'none' ; /* .workCard隱藏 */
          curPageClass.style.zIndex = '1' ; /* .workCard zindex 為 1 */
          nextPageClass.style.zIndex = '2' ; /* .workDetail zindex 為 2 */

          this.currentPage = 'Detail'; /* 現在頁面為Detail */
          // console.log('currentPage 改成 "Detail"')

          setTimeout(function(){
            curPageClass.classList.remove('leftToright');
          }, 500)

          /* 選取正確的內容展示 */
          this.workData.Title = this.$store.state.loadedWorks[id].Title;
          this.workData.Worktype = this.$store.state.loadedWorks[id].Worktype;
          this.workData.Content = this.$store.state.loadedWorks[id].Content;
          this.workData.Jsframe = this.$store.state.loadedWorks[id].Jsframe;
          this.workData.Uiframe = this.$store.state.loadedWorks[id].Uiframe;
          this.workData.ImgUrl = this.$store.state.loadedWorks[id].ImgUrl;
          this.workData.Github = this.$store.state.loadedWorks[id].Github;
          this.workData.View = this.$store.state.loadedWorks[id].View;
          this.workData.CreatorId = this.$store.state.loadedWorks[id].CreatorId;
          this.workData.Key = this.$store.state.loadedWorks[id].Id;

          // console.log('被點擊要展示的作品內容workData',this.workData)
        }else{
          // console.log('currentPage 不是 "Card"',)
          /* 現在nextPageClass是.workCard */
          nextPageClass.classList.add('leftToright');
          /* nextPageClass.style.display = '' ; */
          curPageClass.style.zIndex = '1' ;  /* .workDetail zindex 為 1 */
          nextPageClass.style.zIndex = '2' ;  /* .workCard zindex 為 2 */
          this.currentPage = next; /* 現在頁面為Card */

          /* 移除現在頁面 */
            // console.log('currentPage 改成 "Card"')

          setTimeout(function(){
            curPageClass.classList.remove('rightToleft');
          }, 500)
        }
        
        window.document.documentElement.scrollTop = 0; //視窗會回到最頂端
            // console.log('視窗會回到最頂端')


      },
      /* 開啟新視窗 */
      openLink(site){
        window.open(site , '', 'height=1000,width=500');
      },

      /* 返回作品列表(.workCard)的內容 */
      goBack() {
        const hideDetail = document.querySelector('.workDetail');
        hideDetail.style.display = `none`;

        const showCard = document.querySelector('.workCard');
        showCard.style.display = ``;

        let next = 'Card'

        this.showContent(next);
        // console.log('next', next) 
      },

    }
  }
</script>
<style>
  .work-content{
    min-height: 70px;
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

