<template>

  <v-container fluid grid-list-xs>
    <v-layout row wrap class="mt-3 mb-5">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/works/css" class="secondary">HTML5+ CSS3作品</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/works/vue" class="secondary">VUE作品</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="page1">
      <v-flex xs12 sm6 v-for="(work, index) in updateWorks" :key="index" class="pl-2 pr-2 mb-4">
        <v-card>
          <v-card-title>
            <h2 class="dark--text">{{work.Title}}</h2>
          </v-card-title>
          <v-img
            :src="work.Img"
            height="400px"
          ></v-img>
          <v-card-text>
            <div class="error--text">{{work.Content}}</div>
            <div>{{work.Subtitle}}</div>
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
    <v-layout class="page2" style="display: none; z-index: 1;">
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h2 class="dark--text">{{Title}}</h2>
          </v-card-title>
          <v-img
            :src="Img"
            height="400px"
          ></v-img>
          <v-card-text>
            <div class="error--text">{{Content}}</div>
            <div>{{Subtitle}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="orange" @click="goBack()">Go Back</v-btn>
            <v-btn flat color="orange" @click="openLink(View)"  >VIEW</v-btn>
            <v-btn flat color="orange" @click="openLink(Github)" >GITHUB</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>      
    </v-layout>
  </v-container>

</template>

<script>
  export default {
    data() {
      return {
        currentPage: 1, //現在頁面
        Title: '',
        Subtitle: '',
        Img: '',
        Content: '',
        Github: '',
        View: '',
        id: ''
      }
    },
    computed: {
      updateWorks () {
        return this.$store.getters.loadedWorks
      },
    },
    methods:{
      openLink(site){
        window.open(site , '', 'height=1000,width=500');
      },
      //顯示頁(.page2)的內容
      goDetail(id) {
        // console.log('id', id)
        // console.log('which', this.updateWorks)
        const showPage2 = document.querySelector('.page2');
        showPage2.style.display =  `block`;

        this.nextContent(2, id);
      },

      //頁面切換
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
          this.Title = this.$store.state.loadedWorks[id].Title;
          this.Subtitle = this.$store.state.loadedWorks[id].Subtitle;
          // this.Github = this.$store.state.loadedWorks[id].Github;
          this.Img = this.$store.state.loadedWorks[id].Img;
          this.Content = this.$store.state.loadedWorks[id].Content;
          this.Github = this.$store.state.loadedWorks[id].Github;
          this.View = this.$store.state.loadedWorks[id].View;
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



      // 返回Works頁(.page1)的內容
      goBack() {
        const hidePage2 = document.querySelector('.page2');
        hidePage2.style.display = `none`;
        const showPage1 = document.querySelector('.page1');
        showPage1.style.display = `block`;
        this.nextContent(1);
      }
    }
  }
</script>
<style>
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
  /* line 14, ../sass/_leftAndright.scss */
  .rightToleft {
	-moz-animation: rightToleft 0.5s linear 0s 1 alternate;
	-webkit-animation: rightToleft 0.5s linear 0s 1 alternate;
	animation: rightToleft 0.5s linear 0s 1 alternate;
	-moz-animation-fill-mode: forwards;
	-webkit-animation-fill-mode: forwards;
	animation-fill-mode: forwards;
  }
  

  
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
  /* line 32, ../sass/_leftAndright.scss */
  .leftToright {
	-moz-animation: leftToright 0.5s linear 0s 1 alternate;
	-webkit-animation: leftToright 0.5s linear 0s 1 alternate;
	animation: leftToright 0.5s linear 0s 1 alternate;
	-moz-animation-fill-mode: forwards;
	-webkit-animation-fill-mode: forwards;
	animation-fill-mode: forwards;
  }
</style>

