<template>
  <v-container fluid>

    <v-layout row wrap id="about" class="mt-5 pl-4 pr-4">
      <v-flex class="md12">
          <div class="about-thumb">
                <div>
                    <h1>About Me</h1>
                </div>
                <div>
                    <p class="color-yellow">我叫<strong class="color-yellow">卓竫雯</strong>（Jani Cho)。1990年10月出生。</p>
                    
                <p>大學就讀<strong><em>台灣大學圖書資訊學系</em></strong>，擅長<strong>資訊檢索與資料管理</strong>。<br>自學網頁程式（html、css、js）、平面設計（Ps和Ai）等。

                雖非本科系，但進入職場後從企劃設計、網路行銷開始探索，一邊自學前端技術，一邊研究網路行銷與社群平台經營（SEO、GA）。而後成功轉職前端設計師，有兩年切版及接案經驗。

                <br>對於前端技術很感興趣，持續在學習新技術中，目前於內湖科技公司，擔任<strong><em>前端工程師</em></strong>，主要負責<strong>切版、功能撰寫，網站重構</strong>等，較擅長使用<strong>vue框架及原生js</strong>撰寫網頁。

                <br>曾參與PGG購物商城、營養師帶你吃外食、Lavoya旅遊平台等，擔任<strong>網站企劃與前端相關作業</strong>。<br>

                目前希望工作方面可以專心於研究技術，並希望有接觸不同專案並累積實力的機會，未來希望可以往全端發展。 </p>
                </div>
          </div>
      </v-flex>
    </v-layout>

 
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
  }
</script>

<style>
.container {
  padding: 0;
}

main {
  margin-top: 0 ;
}

/*---------------------------------------
   About&Skills section              
-----------------------------------------*/

#about .about-img {
    background: url('http://cristal-cho.com/2018web/images/S__21078144.jpg') no-repeat;
}
#about .about-img2 {
    background: url('') no-repeat;
}



#about .about-thumb,
#skills .skill-thumb {
  padding: 30px 32px 32px 32px;
}

#skills .progress {
  background: #f3e8cb;
  border-radius: 0px;
  box-shadow: none;
  height: 2px;
}

#skills .progress-bar-primary {
    background: #9b251a;
    /* background: #232B2B; */
}

#skills strong,
#skills span {
  font-weight: bold;
  display: inline-block;
  padding-bottom: 8px;
}

#skills .skill-thumb .fa {
  font-size: 30px;
  padding-bottom: 22px;
  margin-right: 20px;
}
</style>
