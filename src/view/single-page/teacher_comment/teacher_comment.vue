<template>
  <div class="content">
    <Header-bar :message="'师资评价'"></Header-bar>

    <!-- <mt-navbar v-model="selected">
      <mt-tab-item :id="index" v-for="(item,index) in singledata" :key="index">{{item.typename}}</mt-tab-item>
    </mt-navbar>-->
    <!-- <mt-tab-container v-model="selected" v-for="(item,index) in singledata" :key="index">
      <mt-tab-container-item :id="index">
       
        <div class="comment-box">
          <div class="comments_top">
            <appraise v-if="showchildren" v-bind:singledata="singledata" style="margin-top:0.2rem"></appraise>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>-->

    <div class="bannerbox">
      <div class="tabbar_right">
        <span>选择专业基地</span>
        <span class="title" @click="handleShowRotation()">{{selectName}}></span>
      </div>
      <hr style="backgroud:#f2f2f2;border:1px solid #f2f2f2;" />
      <div class="jdraderbox">
        <div class="jdrader">
          <div
            class="comment"
            v-for="(item, index) in swipeTopData"
            :key="index"
            v-if="item.majorsubjectid==datas"
          >
            <radar
              ref="radars"
              :maintitle="item.majorname + '基地对老师评价雷达图'"
              :barnumber="winrainbardata"
            ></radar>
            <div class="teacher_radar_detial">
              <div class="rader_detial_left">
                <div class="rader_detial_left_top">
                  <p class="title">评价得分率</p>
                  <p class="number">{{(commentdata.pjpjf)*100}}%</p>
                </div>
                <div class="rader_detial_left_end">
                  <p class="title">评价最低分</p>
                  <p class="number">{{commentdata.zdf}}</p>
                </div>
              </div>
              <div class="rader_detial_middle"></div>
              <div class="rader_detial_right">
                <div class="rader_detial_left_top">
                  <p class="title">评价总次数</p>
                  <p class="number">{{commentdata.pjzs}}</p>
                </div>
                <div class="rader_detial_left_end">
                  <p class="title">评价表提交率</p>
                  <p class="number">{{commentdata.tjl}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="comment-box">
        <div class="conbox_title">123</div>
        <div class="comments_top">
          <appraise v-if="showchildren" v-bind:singledata="singledata" style="margin-top:0.2rem"></appraise>
        </div>
      </div>
    </div>

    <div class="comment-box"></div>
    <div @click="handleHideRotation()" v-show="showRotation" class="rotation_wind">
      <div class="rotation_wind_main">
        <div class="jd">
          <div class="title">
            请选择基地
            <p @click="showRotation">X</p>
          </div>
          <div
            class="jdbox"
            @click="handleSelectName(index,item,item.majorlist)"
            v-for="(item, index) in selectmajorlist"
            :style="selectId == index?'color: #0096C1':'color: #212121'"
            :key="index"
          >{{item.majorname}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import HeaderBar from "@/components/mainHeader";
import { Header, Cell } from "mint-ui";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import radar from "../../../components/mecharts/radar.vue";
import appraise from "../../../components/appraise/appraise.vue";
import { Indicator, Navbar, TabItem } from "mint-ui";
import {
  queryMajorFavorablerate,
  queryMajorTeacherevaluatedata,
  queryMajorTeacherevaluatedataitem,
  getoffice,
  queryTeachereValuationitem,
  getmajor
} from "../../../api/teachercomment";
import moment from "moment";

export default {
  components: {
    HeaderBar,
    radar,
    swiper,
    swiperSlide,
    appraise,
    Header,
    Cell
  },
  data() {
    const self = this;
    return {
      selected: 0,
      showRotation: false,
      openmore: false,
      openWind: false,
      swipeTopData: "",
      selectId: -1,
      firstid: 0,
      commentdata: "",
      teacherdata: "",
      flag: true,
      winflag: false,
      endName: "麻醉科",
      windata: "",
      wincommentdata: "",
      winteacherdata: "",
      teachername: "王老师",
      selectName: "教学部",
      selectmajorlist: "",
      datas: 0,
      singledata: [],
      showchildren: false,
      winrainbardata: [
        {
          name: "学员满意",
          value: 161
        },
        {
          name: "教学态度",
          value: 162
        },
        {
          name: "沟通反馈",
          value: 162
        },
        {
          name: "教学技巧",
          value: 159
        },
        {
          name: "教学氛围",
          value: 158
        },
        {
          name: "职业素养",
          value: 158
        }
      ],
      rainbardata: [
        {
          name: "学员满意",
          value: 161
        },
        {
          name: "教学态度",
          value: 162
        },
        {
          name: "沟通反馈",
          value: 162
        },
        {
          name: "教学技巧",
          value: 159
        },
        {
          name: "教学氛围",
          value: 158
        },
        {
          name: "职业素养",
          value: 158
        }
      ],
      closeid: 99,
      radardata1: [
        {
          name: "学员满意",
          value: 161
        },
        {
          name: "教学态度",
          value: 162
        },
        {
          name: "沟通反馈",
          value: 162
        },
        {
          name: "教学技巧",
          value: 159
        },
        {
          name: "教学氛围",
          value: 158
        },
        {
          name: "职业素养",
          value: 158
        }
      ],
      moment: 12,

      selectdata: [
        {
          name: "内科基地"
        },
        {
          name: "外科基地"
        },
        {
          name: "儿科基地"
        },
        {
          name: "全科基地"
        },
        {
          name: "中医基地"
        },
        {
          name: "麻醉科基地"
        },
        {
          name: "眼科基地"
        },
        {
          name: "皮肤科基地"
        },
        {
          name: "放射科基地"
        }
      ]
    };
  },
  methods: {
    handleShowRotation() {
      this.noScroll();
      this.showRotation = true;
    },
    handleHideRotation() {
      this.showRotation = false;
      this.canScroll();
    },
    handleSelectName(index, name, datas) {
      Indicator.open("加载中...");
      this.selectId = index;
      this.selectName = name.majorname;
      this.datas = name.majorsubjectid;
      let add = [];
      add.push(this.datas);
      getmajor(add, this.moment).then(res => {
        this.swipeTopData = JSON.parse(res).majorlist;
        this.firstid = JSON.parse(res).majorlist[0].majorsubjectid;
        this.showtab = true;
        Indicator.close();
      });
      queryMajorTeacherevaluatedata(this.firstid, this.moment, this.datas).then(
        res => {
          this.winrainbardata = JSON.parse(res).majordimensionevaluatelist;
          this.commentdata = JSON.parse(res).majorevaluateoverview;
          // console.log(this.winrainbardata)
          var arrsd = [];
          for (
            let i = 0;
            i < JSON.parse(res).majordimensionevaluatelist.length;
            i++
          ) {
            arrsd.push({
              name:
                JSON.parse(res).majordimensionevaluatelist[i].typename +
                "\n" +
                JSON.parse(res).majordimensionevaluatelist[i].averagescore,
              value: parseFloat(
                JSON.parse(res).majordimensionevaluatelist[i].averagescore
              )
            });
          }

            this.winrainbardata = arrsd;
            // this.winflag = true;
            // this.$refs.winradars.drawLine();
  console.log(arrsd)
          Indicator.close();
        }
      );
    },
    handleClickSelect() {
      this.showModal = true;
    }
  },
  mounted() {
    Indicator.open("加载中...");
    queryMajorFavorablerate(this.moment).then(res => {
      this.swipeTopData = JSON.parse(res).major;
      // console.log(JSON.parse(res));
      this.firstid = JSON.parse(res).major[0].majorsubjectid;
    });

    getmajor().then(res => {
      // console.log(JSON.parse(res));
      this.selectmajorlist = JSON.parse(res).majorlist;
      queryTeachereValuationitem(1, 1, this.moment).then(res => {
        // console.log(JSON.parse(res));
        this.singledata = JSON.parse(res).teacherevaluationitem;
        this.showchildren = true;
        this.showtab = true;
        Indicator.close();
      });
    });
    getoffice().then(res => {
      this.selectdata = JSON.parse(res).officelist;
      let ads = [];
      for (let i = 0; i < JSON.parse(res).officelist[0].length; i++) {
        ads.push(JSON.parse(res).officelist[i].name);
      }

      queryTeachereValuationitem(1, 1, this.moment).then(res => {
        // console.log(JSON.parse(res));
        this.singledata = JSON.parse(res).teacherevaluationitem;
        this.showchildren = true;
        this.showtab = true;
        Indicator.close();
      });
    });
    Indicator.close();
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
  }
};
</script>

<style scoped lang="less">
.content {
  height: 100%;
}
.tabbar_right {
  height: 0.5rem;
  line-height: 0.5rem;
  width: 90%;
  margin: auto;
  .title {
    margin-left: auto;
    float: right;
  }
  img {
    width: 0.16rem;
    height: 0.16rem;
    margin-left: 0.05rem;
  }
}
.bannerbox {
  height: 100%;
}
.rotation_wind {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);

  .rotation_wind_main {
    background: #ffffff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    // padding-top: 0.19rem;
    padding-bottom: 0.11rem;
    height: 6rem;
    overflow: scroll;

    .active {
      color: #0096c1;
    }
  }
}
.jd {
  width: 96%;
  margin: auto;
  .title {
    font-size: 0.13rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    border-bottom: 1px solid #f2f2f2;
    line-height: 0.4rem;
    p {
      float: right;
    }
  }
}
.jdbox {
  width: 0.8rem;
  height: 0.44rem;
  background: rgba(242, 242, 243, 1);
  border-radius: 0.06rem;
  display: inline-block;
  margin: 5px;
  text-align: center;
  line-height: 0.44rem;
  font-size: 0.13rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  overflow: hidden;
}
.jdraderbox {
  background: #f2f2f2;
  height: 3.8rem;
  padding: 0.15rem;
}
.jdrader {
  height: 3.76rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.06rem;
}
.comments_top {
  // position: absolute;
  width: 3.55rem;
  padding: 0.13rem;
  padding-top: 0.2rem;
  background: #ffffff;
  /*box-shadow: 0 0 0.1rem 0 rgba(0, 0, 0, 0.08);*/
  // border-radius: 5px;
  box-sizing: border-box;
  margin-bottom: 0.05rem;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
}

.comments_end {
  background: #ffffff;
  position: relative;
  width: 3.55rem;
  margin: 0 auto;
  border-radius: 5px;
  padding-top: 10px;
}

.content {
  padding-bottom: 0.15rem;
}

// img {
//   width: 90%;
//   display: block;
//   margin: 0 auto;
//   padding-bottom: 0.2rem;
// }

.top-img {
  width: 3.55rem;
  padding: 0.13rem;
  padding-top: 0.2rem;
  background: #ffffff;
  box-shadow: 0 0 0.12rem 0 rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  border-radius: 5px;
  box-sizing: border-box;
  // margin-top: 0.49rem;
  margin-bottom: 0.05rem;
  position: relative;
}

.navbar {
  font-size: 0.15rem;
  color: #9397ad;
}

.mint-navbar {
  width: 3.55rem;
  text-align: center;
  margin: 0 auto;
  background: #fff;
  border-top-left-radius: 0.05rem;
  border-top-right-radius: 0.05rem;
  position: relative;

  /*.mint-tab-item:nth-child(1) {*/
  /*    width: 1.1rem;*/
  /*}*/

  /*.mint-tab-item:nth-child(2) {*/
  /*    width: 1.6rem;*/
  /*}*/

  /*.mint-tab-item:nth-child(3) {*/
  /*    width: 1rem;*/
  /*    overflow: hidden;*/
  /*}*/
}

/deep/ .mint-tab-item {
  height: auto !important;
}

/deep/ .mint-tab-item-label {
  color: #9397ad;
  font-size: 0.13rem;
  height: 0.25rem;
  line-height: 0.24rem;
  position: relative;

  p {
    font-size: 0.1rem;
    color: #9397ad;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.12rem;
    opacity: 0.5;
  }
}

/deep/ .is-selected .mint-tab-item-label {
  font-size: 0.15rem;
  color: #212121;

  p {
    color: #212121;
    opacity: 1;
    font-size: 0.12rem;
  }
}

/deep/ .mint-navbar .mint-tab-item {
  /*width: 1.3rem;*/
  padding: 0.06rem;
  height: 0.48rem;
  background: transparent;
  margin-bottom: 0.01rem;
  // flex: initial;
}

/deep/ .mint-tab-container {
  overflow: inherit;
}

.comment-box {
  // position: absolute;
  border-radius: 0.2rem 0.2rem 0rem 0rem;
}
.comment_top {
  display: flex;
  align-items: center;
  padding-top: 0.15rem;
  padding-bottom: 0.2rem;
  padding-right: 0.18rem;

  .comment_top_left {
    border-left: 3px solid #277fff;
    margin-left: 0.1rem;
    padding-left: 0.05rem;
  }

  p {
    font-family: PingFangSC-Medium;
    font-size: 0.16rem;
    color: #474c63;
    letter-spacing: 0;
    // line-height: 18px;
  }
}

.teacher_radar_detial {
  display: flex;
  align-items: center;
  margin-bottom: 0.15rem;

  .title {
    font-family: PingFangSC-Regular;
    font-size: 0.13rem;
    color: #212121;
    letter-spacing: 0;
  }

  .desc {
    font-family: PingFangSC-Regular;
    font-size: 0.1rem;
    color: #9397ad;
    letter-spacing: 0;
  }

  .number {
    font-family: PingFangSC-Regular;
    font-size: 0.13rem;
    color: #2187ff;
    letter-spacing: 0;
    margin-left: auto;
  }

  .rader_detial_left {
    margin: 0 auto;
    margin-left: 0.15rem;
  }

  .rader_detial_right {
    margin: 0 auto;
    margin-left: 0.15rem;
  }

  .rader_detial_left_top {
    display: flex;
    align-items: center;
    margin-bottom: 0.1rem;
  }

  .rader_detial_left_end {
    display: flex;
    align-items: center;
    margin-top: 0.1rem;
  }

  .rader_detial_middle {
    width: 1px;
    height: 0.4rem;
    background: #dddddd;
  }
}

.comment_table {
  .title {
    font-family: PingFangSC-Regular;
    font-size: 0.15rem;
    color: #212121;
    letter-spacing: 0;
    // line-height: 15px;
    text-align: center;
    margin-top: 0.3rem;

    span {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #9397ad;
      letter-spacing: 0;
      // line-height: 13px;
    }
  }

  .table {
    margin-left: 0.1rem;
    margin-right: 0.1rem;
    overflow: hidden;

    .table_top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.2rem;
      border-bottom: 1px solid #f0f0f7;
      padding-bottom: 0.07rem;

      p {
        font-family: PingFangSC-Medium;
        font-size: 0.13rem;
        color: #9397ad;
        letter-spacing: 0;
        width: 0.52rem;
        text-align: center;
        // line-height: 15px;
      }
    }

    .table_single {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f0f0f7;
      margin-top: 0.07rem;
      padding-bottom: 0.07rem;

      p {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #212121;
        letter-spacing: 0;
        width: 0.52rem;
        text-align: center;
        // line-height: 15px;
      }
    }
  }

  .showmore {
    font-family: PingFangSC-Regular;
    font-size: 0.12rem;
    color: #9397ad;
    letter-spacing: 0;
    text-align: center;
    // margin-top: 0.08rem;
    // line-height: 14px;
    padding-top: 0.3rem;
  }
}

.comment_bar {
  .comment_bar_top {
    font-family: PingFangSC-Regular;
    font-size: 0.15rem;
    color: #212121;
    letter-spacing: 0;
    // line-height: 15px;
    text-align: center;
  }

  .comment_bar_middle {
    width: 2.8rem;
    height: 1.2rem;
    margin: 0 auto;
    border-left: 1px solid #d7dde4;
    border-bottom: 1px solid #d7dde4;
    position: relative;

    .bar_singgle {
      width: 0.14rem;
      height: 0.88rem;
      position: absolute;
      bottom: 0;
      left: 0.12rem;
      background: #f9953f;

      .number {
        font-family: PingFangSC-Medium;
        font-size: 0.1rem;
        color: #f9953f;
        letter-spacing: 0;
        text-align: center;
        position: absolute;
        top: -0.16rem;
        left: -0.03rem;
        // line-height: 10px;
      }
    }

    .bar_center {
      p {
        font-family: PingFangSC-Regular;
        font-size: 0.11rem;
        color: #9397ad;
        letter-spacing: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 0.8rem;
        height: 0.11rem;
      }
    }
  }

  .comment_bar_end {
    width: 2.8rem;
    margin: 0 auto;
    margin-top: 0.1rem;

    p {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #9397ad;
      letter-spacing: 0;
      // text-align: center;
      // line-height: 13px;
    }
  }
}

.student_top_box {
  /deep/ .swiper-slide {
    font-family: PingFangSC-Regular;
    font-size: 0.14rem;
    color: #9397ad;
    letter-spacing: 0;
    text-align: center;
    // line-height: 14px;
  }

  /deep/ .swiper-slide-active {
    font-family: PingFangSC-Regular;
    font-size: 0.16rem;
    color: #474c63;
    letter-spacing: 0;
    text-align: center;
    border-bottom: 3px solid #277fff;
    height: 0.45rem;

    .title {
      font-size: 0.18rem;
    }

    .number {
      font-size: 0.12rem;
    }

    // line-height: 16px;
  }

  .nav_single {
    p {
      font-family: PingFangSC-Regular;
      font-size: 0.14rem;
      color: #9397ad;
      letter-spacing: 0;
      text-align: center;
      // line-height: 14px;
    }
  }

  .active {
    width: 0.7rem;
    height: 0.3rem;
    border-bottom: 3px solid #277fff;

    p {
      font-family: PingFangSC-Regular;
      font-size: 0.16rem;
      color: #474c63;
      letter-spacing: 0;
      text-align: center;
      line-height: 0.3rem;
    }
  }

  .title {
    font-size: 0.15rem;
  }

  .number {
    font-size: 0.12rem;
  }
}

.wind {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;

  .teacher_radar_detial {
    margin-left: 0.15rem;
    margin-right: 0.15rem;
    border-bottom: 1px solid #f0f0f7;
    padding-bottom: 0.2rem;
  }

  .open_window {
    width: 3.55rem;
    height: 6rem;
    background: #ffffff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: #ffffff;
    border-radius: 10px;
    border-radius: 10px;
    overflow: auto;

    .win_top {
      display: flex;
      align-items: center;
      // margin-left: 0.15rem;
      margin-top: 0.2rem;
      margin-right: 0.15rem;
      // margin-bottom: 0.2rem;
      img {
        width: 0.12rem;
        height: 0.12rem;
        margin-bottom: 0.2rem;
        margin-left: auto;
        padding: 0;
      }
    }

    .win_title {
      font-family: PingFangSC-Regular;
      font-size: 0.15rem;
      color: #212121;
      letter-spacing: 0;
      border-left: 3px solid #277fff;
      padding-left: 0.05rem;
      margin-left: 0.15rem;
      margin-bottom: 0.2rem;
      // text-align: center;
      // line-height: 15px;
    }

    .win_end_block {
      margin-left: 0.16rem;
      border-left: 1px solid #deedff;
      padding-left: 0.12rem;

      .win_end_block_single {
        .top {
          display: flex;
          align-items: center;

          .block {
            width: 0.05rem;
            height: 0.05rem;
            border-radius: 50%;
            background: #277fff;
            border: 1px solid #277fff;
            margin-right: 0.1rem;
            position: absolute;
            left: 0.13rem;
          }

          p {
            font-family: PingFangSC-Medium;
            font-size: 13px;
            color: #212121;
            letter-spacing: 0;
            // line-height: 15px;
          }
        }

        .middle {
          width: 3.11rem;

          p {
            font-family: PingFangSC-Regular;
            font-size: 0.13rem;
            color: #474c63;
            letter-spacing: 0;
            padding-top: 0.1rem;
            padding-bottom: 0.1rem;
            // opacity: 0.3;
            background: rgba(240, 240, 247, 0.3);
            border-radius: 5px;
            border-radius: 5px;
            padding-left: 0.08rem;
            padding-right: 0.08rem;
            // text-align: center;
            // line-height: 15px;
          }
        }
      }
    }
  }
}
.conbox_title {
  height: 0.6rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.2rem 0.2rem 0rem 0rem;
}
</style>