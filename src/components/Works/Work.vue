<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img
            src="https://jani-cho.github.io/javascript30/images/js01.png"
            aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Javascript30</h3>
              <div>參考線上免費資源Javascript30練習項目，加上個人創意的作品集</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark color="orange">查看內容</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <!-- PC版本 -->
      <!-- <v-flex xs12>
        <v-card>
          <v-container fluid>
            <v-layout row>
              <v-flex xs12 sm10>
                <v-card-media
                  src="https://jani-cho.github.io/javascript30/images/js01.png"
                  height="250px"
                  width="100%"
                >
                </v-card-media>
              </v-flex>
              <v-flex xs0 sm12 class="ml-3">
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">Javascript30</h3>
                    <div>參考線上免費資源Javascript30練習項目，加上個人創意的作品集</div>
                  </div>

                </v-card-title>
                <v-card-actions class="mt-5">
                  <v-btn flat color="orange">Share</v-btn>
                  <v-btn flat color="orange">Explore</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>

      </v-flex> -->
    </v-layout>      
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h2 class="dark--text">Javascript30</h2>
          </v-card-title>
          <v-card-media
            src="https://jani-cho.github.io/javascript30/images/js01.png"
            height="400px"
          ></v-card-media>
          <v-card-text>
            <div class="error--text">Aug 2018 - Javascript, VueJs, Css</div>
            <div>參考線上免費資源Javascript30練習項目，加上個人創意的作品集</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="orange" to="">VIEW</v-btn>
            <v-btn flat color="orange">GITHUB</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

