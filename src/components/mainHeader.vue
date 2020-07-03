<template>
  <div>
    <div class="header">
      <img class="backicon" @click="goback" src="../assets/images/header/backup.png" alt />
      <p>{{message}}</p>
    </div>
    <div class="block"></div>
    <div style="width:100%;height:0.5rem"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    message: {
      type: String,
      default: ""
    }
  },
  methods: {
    goback() {
      this.$router.back(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.block {
  width: 100%;
  // height: 2.07rem;
  // background-image: url("../assets/images/back.png");
  background-size: 100%;
  position: fixed;
}
.header {
  width: 100%;
  height: 0.5rem;
  // background-image: url("../assets/images/back.png");
  background-size: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  border-bottom: 1px solid #f2f2f3;
  background: #fff;
  .backicon {
    width: 0.14rem;
    height: 0.17rem;
    position: absolute;
    left: 0.16rem;
    top: 0.18rem;
  }
  p {
    text-align: center;
    line-height: 0.49rem;
    font-family: PingFangSC-Regular;
    font-size: 0.16rem;
    font-weight: 500;
    color: #000;
    letter-spacing: 0;
  }
  .backimg {
    width: 100%;
    height: 2.07rem;
  }
}
</style>