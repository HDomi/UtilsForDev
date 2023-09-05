<template>
    <div v-if="postingPage" class="footer-wrap">
      <div class="footer-title">Domi-Blog</div>
      <div class="footer-title">Copyrightⓒ2023.Domi.All rights reserved.</div>
    </div>
</template>
  
  <script lang="ts">
  
  export default {
    components: {
    },
    mixins: [
    ],
    props: {
      dummy: Boolean 
    },
    data () {
      return {
        postingPage: false,
      }
    },
    computed: {
    },
    presets: {
    },
    watch: {
      $route(to: any, from: any) {
        if(to.name === 'posting'){
          this.postingPage = true;
        }else{
          this.postingPage = false;
        }
      },
    },
    mounted () {
    },
    methods: {
    }
  }
  </script>

  <style scoped>
  .footer-wrap{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-height: 50px;
    background: rgba(32, 32, 36, 0.5);
    padding: 5px 15px 5px 15px;
    z-index: 997;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .footer-title{
    color: rgb(101, 101, 104);
  }
  @media (max-width: 510px) {
    .footer-wrap{
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }
    .footer-title{
      font-size: 13px;
      text-align: left;
    }
  }
  </style>
  