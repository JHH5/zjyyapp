<template>
  <div class="arrowimg">
    <div class="right_block">
      <div class="top">
        <img
          class="left_arrow"
          :style="this.open == 5?'height:3rem':'height:5rem'"
          src="../../assets/images/appraise/toparrow.png"
          alt
        />
        <div v-for="(item, index) in selectdata.slice(0,irs)" :key="index">
          <div class="right_block_top">
            <p class="title">最佳评价项</p>
            <div class="descbox">
              <div class="desc">
                评价得分率：
                <span>{{((item.pjpjf)*100).toFixed(2)}}%</span>
              </div>
            </div>
          </div>
          <div
            v-for="(itemtext,index) in item.itemlist.slice(0,irs)"
            :key="index"
            class="single_block"
          >
            <div class="block"></div>
            <div style="border-right:0.1rem solid rgb(0 150 193 / 20%);" class="square"></div>
            <div style="background:rgb(0 150 193 / 20%);" class="single_block_right">
              <p class="single_title">{{index + 1}}. {{itemtext.typename}}</p>
              <p class="titletxt">{{itemtext.itemtitle}}</p>
              <hr />
              <div class="end_desc">
                <p>满分{{itemtext.itemff}}分，得分率{{((itemtext.pjdel)*100).toFixed(2)}}%，{{itemtext.zz}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="end">
        <img
          class="right_arrow"
          :style="this.open == 5?'height:3rem':'height:5rem'"
          src="../../assets/images/appraise/endarrow.png"
          alt
        />
        <div v-for="(item, index) in selectdata" :key="index">
          <div
            v-for="(itemtext,index) in item.itemlist.slice(ids,10)"
            :key="index"
            class="single_block"
          >
            <div class="block2"></div>
            <div style="border-right:0.1rem solid #F8FBFF;" class="square"></div>
            <div style="background:rgba(255,74,74,0.05);" class="single_block_right">
              <p class="single_title">{{index + ids + 1}}. {{itemtext.typename}}</p>
              <p class="titletxt">{{itemtext.itemtitle}}</p>
              <div class="end_desc2">
                <p>满分{{itemtext.itemff}}分，得分率{{((itemtext.pjdel)*100).toFixed(2)}}%，{{itemtext.zz}}</p>
              </div>
            </div>
          </div>
          <p class="end_title">最差评价项</p>
        </div>
      </div>
    </div>
    <div v-show="showBar" class="line_bar">
      <div style="background: rgba(0,0,0,0.50);" @click.stop="hideLinebar()" class="line_bar"></div>
      <div class="line_bar_win">
        <p>
          “{{barTitle}}”
          <br />12个月分数变化情况
        </p>
        <img @click="hideLinebar()" src="../../assets/images/close.png" alt />
        <linebar ref="linebars" :linebardata="databar"></linebar>
      </div>
    </div>
  </div>
</template>

<script>
import linebar from "../mecharts/linebar.vue";
import {
  queryTeachereValuationitem,
  queryTeachereValuationitemNew
} from "../../api/teachercomment";
import {
  queryStudentevaluationitem,
  queryStudentevaluationitemNew
} from "../../api/studentcomment";
import moment from "moment";
export default {
  data() {
    return {
      open: 0,
      showBar: false,
      barTitle: "",
      selectdata: "",
      irs: 5, //好评
      ids: 5, //差评
      topnumber: 0,
      databar: [],
      linebars: "",
      moment: 0
    };
  },
  watch: {
    singledata(newVal) {
      // console.log(newVal);
      this.selectdata = newVal;
    }
  },
  props: {
    singledata: {}
  },
  methods: {
    // openWind(){
    //   this.open = 0   //展开
    //   this.irs = 5,
    //   this.ids = 5
    // },
    // hideWind(){      //隐藏
    //   this.open = 0
    //   this.irs = 3,
    //   this.ids = 7
    // },
    showLinebar(title, id1, id2) {
      this.barTitle =
        title.slice(0, 3) + "..." + title.slice(title.length - 3, title.length);
      if (this.$route.name == "comment") {
        queryStudentevaluationitemNew(id1, id2).then(res => {
          this.linebars = JSON.parse(res).evaluationitemmonth;
          for (let i = 0; i < this.linebars.length; i++) {
            this.databar.push({
              value: this.linebars[i].pjf
            });
          }
          this.$refs.linebars.drawLine();
        });
      } else {
        queryTeachereValuationitemNew(id1, id2).then(res => {
          //  console.log(JSON.parse(res));
          this.linebars = JSON.parse(res).evaluationitemmonth;
          for (let i = 0; i < this.linebars.length; i++) {
            this.databar.push({
              value: this.linebars[i].pjf
            });
          }
          this.$refs.linebars.drawLine();
        });
      }
      this.showBar = true;
      this.noScroll();
    },
    hideLinebar() {
      this.showBar = false;
      this.databar = [];
      this.canScroll();
    },
    teacherFunc() {
      this.selectdata = this.singledata;
      console.log(this.selectdata);
      queryTeachereValuationitem(0, this.moment).then(res => {
        // console.log(JSON.p  arse(this.users));
        // this.selectdata = JSON.parse(res).teacherevaluationitem
        // this.selectdatatext = JSON.parse(res).itemtypeconfiglist
        this.topnumber = JSON.parse(res).pjpjf;
      });
      // console.log(this.selectdata)
    },
    studentFunc() {
      queryStudentevaluationitem(this.moment).then(res => {
        this.selectdata = this.singledata;
        // console.log(JSON.parse(res));
        // this.selectdata = JSON.parse(res).studentevaluationitem
        // this.topnumber = JSON.parse(res).pjpjf
      });
    }
  },
  mounted() {
    // console.log(this.$route.name);
    if (this.$route.name == "comment") {
      this.studentFunc();
    } else {
      this.teacherFunc();
    }
  },
  created() {
    if (moment().date() < 20) {
      if (moment().month() == 0) {
        this.moment = 12;
      } else {
        this.moment = moment().month();
      }
    } else {
      this.moment = moment().month() + 1;
    }
  },
  components: {
    linebar
  }
};
</script>

<style lang="less" scoped>
.arrowimg {
  display: flex;
  align-items: center;
  //   margin-top: 0.2rem;
  .right_block {
    .left_arrow {
      width: 0.18rem;
      height: 4rem;
      position: absolute;
      top: 0.2rem;
    }
    .right_arrow {
      width: 0.18rem;
      // height: 5rem;
      position: absolute;
      bottom: 0.2rem;
    }
    .top {
      display: flex;
      align-items: center;
    }
    .end {
      display: flex;
      align-items: center;
    }
    .single_button {
      font-size: 0.1rem;
      margin-bottom: 0.1rem;
      p {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #9397ad;
        letter-spacing: 0;
        // line-height: 14px;
        text-align: center;
      }
    }
    .right_block_top {
      // display: flex;
      line-height: 0.4rem;
      align-items: center;
      margin-bottom: 0.1rem;
      margin-left: 0.4rem;
      .title {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #0096c1;
        letter-spacing: 0;
        // line-height: 16px;
      }
      .descbox {
        height: 0.4rem;
        background: rgba(0, 150, 193, 1);
        border-radius: 0.03rem;
        .desc {
          width: 90%;
          margin: auto;
          font-size: 0.15rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          span {
            float: right;
            font-size: 0.21rem;
            font-family: DINAlternate-Bold, DINAlternate;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
    .single_block {
      // width: 3.3rem;
      border-radius: 10px;
      display: flex;
      align-items: flex-start;
      margin-bottom: 0.1rem;
      margin-left: 0.2rem;
      .block {
        background: #fff;
        border: 1px solid #0096c1;
        width: 0.08rem;
        height: 0.08rem;
        border-radius: 50%;
        margin-top: 0.15rem;
        position: absolute;
        left: 0.18rem;
      }
      .block2 {
        background: #fff;
        border: 1px solid #0096c1;
        width: 0.08rem;
        height: 0.08rem;
        border-radius: 50%;
        margin-top: 0.15rem;
        position: absolute;
        left: 0.18rem;
      }
      .single_block_right {
        border-radius: 10px;
        width: 3rem;
        hr {
          width: 90%;
          margin: 0.1rem auto;
          border: 1px dashed rgb(0, 150, 193);
          opacity: 0.5;
        }
        .single_title {
          margin-left: 0.1rem;
          margin-top: 0.08rem;
          margin-bottom: 0.01rem;
          font-size: 0.15rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
        }
        p {
          font-family: PingFangSC-Regular;
          font-size: 0.13rem;
          color: #212121;
          letter-spacing: 0;
          // line-height: 18px;
          // width: 2.9rem;
          text-align: left;
        }
        .end_desc {
          display: flex;
          align-items: center;
          padding-top: 0.05rem;
          margin-bottom: 0.05rem;
          padding-left: 0.1rem;
          // padding-left: 0.31rem;
          // margin-right: 0.16rem;
          p {
            font-family: PingFangSC-Regular;
            font-size: 0.11rem;
            color: #f57c00;
            letter-spacing: 0;
            text-align: left;
          }
          img {
            width: 0.08rem;
            height: 0.1rem;
          }
        }
        .end_desc2 {
          display: flex;
          align-items: center;
          // width: 3rem;
          border-top: 1px solid rgba(147, 151, 173, 0.4);
          border-top-style: dashed;
          padding-top: 0.05rem;
          margin-bottom: 0.05rem;
          padding-left: 0.1rem;
          p {
            font-family: PingFangSC-Regular;
            font-size: 0.11rem;
            color: #239eff;
            letter-spacing: 0;
            text-align: left;
          }
          img {
            width: 0.08rem;
            height: 0.1rem;
          }
        }
      }
      .square {
        width: 0;
        height: 0;
        border-top: 0.1rem solid transparent;
        border-bottom: 0.1rem solid transparent;
        border-right: 0.1rem solid red;
        margin-top: 0.1rem;
      }

      span {
        font-family: PingFangSC-Regular;
        font-size: 0.1rem;
        color: #212121;
        letter-spacing: 0;
      }
    }
  }
  .end_title {
    font-family: PingFangSC-Regular;
    font-size: 0.13rem;
    color: #ff4a4a;
    letter-spacing: 0;
    margin-left: 0.4rem;
  }
}
.titletxt {
  width: 85%;
  margin: auto;
  font-size: 0.13rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(89, 89, 89, 1);
}
.line_bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  .line_bar_win {
    width: 3.5rem;
    height: 2.77rem;
    background: #ffffff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 10px;
    border-radius: 10px;
    z-index: 9999;
    p {
      width: 1.68rem;
      height: 0.4rem;
      font-family: PingFangSC-Medium;
      font-size: 0.15rem;
      color: #212121;
      letter-spacing: 0;
      text-align: center;
      display: block;
      margin: 0 auto;
      margin-top: 0.05rem;
      margin-bottom: 0.1rem;
    }
    img {
      position: absolute;
      top: 0.15rem;
      right: 0.15rem;
      width: 0.12rem;
      height: 0.12rem;
    }
  }
}
</style>