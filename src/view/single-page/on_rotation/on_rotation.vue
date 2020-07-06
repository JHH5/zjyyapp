<template>
  <div style="height:100%">
    <header-main :message="'轮转'"></header-main>

    <div class="jdbox">
      <!-- <div @click="handleShowRotation()">
        <p class="boxtitle">轮转学员名单</p>
      </div>-->
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">退培学员</mt-tab-item>
        <mt-tab-item id="2">未排轮转学员</mt-tab-item>
        <mt-tab-item id="3">本月未入科学员</mt-tab-item>
        <mt-tab-item id="4">轮转异常</mt-tab-item>
      </mt-navbar>

      <p class="jdmc">基地名称</p>
      <div class="jdcell" v-for="(item, index) in selectdata" :key="index">
        <p class="jdcelldiv">{{item.majorname}}</p>
        <div class="jdstudent">
          <p v-for="(studentname,index) in item.studentlist" :key="index">{{studentname.personname}}</p>
        </div>
      </div>
      
      <div class="jdcell" v-for="(item, index) in selectdata2" :key="index">
        <p class="jdcelldiv">{{item.name}}</p>
        <div class="jdstudent">
          <p v-for="(studentname,index) in item.studentlist" :key="index">{{studentname.personname}}</p>
        </div>
      </div>


      <!-- <div @click="handleHideRotation()" v-show="showRotation" class="rotation_wind">
        <div class="rotation_wind_main">
          <mt-navbar v-model="selected">
            <mt-tab-item id="1">退培学员清单</mt-tab-item>
            <mt-tab-item id="2">轮转学员清单</mt-tab-item>
            <mt-tab-item id="3">本月未入科清单</mt-tab-item>
            <mt-tab-item id="4">轮转异常人员</mt-tab-item>
          </mt-navbar>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import mainHeader from "../../../components/mainHeader.vue";
import { Collapse } from "element-ui";
import { Navbar, TabItem, TabContainer, TabContainerItem, Cell } from "mint-ui";
import {
  queryMajormanageoffice,
  queryMajorstudentrounddata
} from "../../../api/studentcomment";
export default {
  data() {
    return {
      showRotation: false,
      showjdlist: false,
      selectId: 0,
      selected: "1",
      selectName: "内科基地",
      selectdata: "",
      selectdata2: "",
      traindata: [
        {
          name: "麻醉科",
          number: 100,
          color: "#E28A4A",
          before: 25,
          now: 25
        },
        {
          name: "急诊科",
          number: 100,
          color: "#E6A062",
          before: 22,
          now: 22
        },
        {
          name: "放射科",
          number: 100,
          color: "#ECB987",
          before: 30,
          now: 30
        },
        {
          name: "滨江口腔外科",
          number: 92,
          color: "#F2CEAE",
          before: 23,
          now: 25
        },
        {
          name: "耳鼻咽喉科",
          number: 66.6,
          color: "#F7E8D7",
          before: 20,
          now: 30
        },
        {
          name: "产科",
          number: 50,
          color: "#DADBF0",
          before: 15,
          now: 30
        },
        {
          name: "妇科",
          number: 46.1,
          color: "#B2BBDD",
          before: 12,
          now: 26
        },
        {
          name: "全科医学科",
          number: 41.7,
          color: "#8496CC",
          before: 10,
          now: 24
        },
        {
          name: "生殖医学科",
          number: 36.4,
          color: "#5D74BC",
          before: 8,
          now: 22
        },
        {
          name: "中医康复科",
          number: 30,
          color: "#4877CA",
          before: 5,
          now: 15
        }
      ],

      offid: 0,
      majorlists: {}
    };
  },
  watch: {
    selected(val) {
      // console.log(val);
      queryMajorstudentrounddata(val).then(res => {
        // console.log(JSON.parse(res));
        this.selectdata = JSON.parse(res).majorlist;
          this.selectdata2 = JSON.parse(res).officelist;
      });
    }
  },
  methods: {
    handleShowRotation() {
      this.noScroll();
      this.showRotation = true;
    },
    // jdshow(index) {
    //   this.noScroll();
    //   this.showjdlist = true;
    //   console.log(index);
    // },
    // jdhide(index) {
    //   this.noScroll();
    //   this.showjdlist = false;
    //   console.log(index)
    // },
    handleHideRotation() {
      this.showRotation = false;
      this.canScroll();
    }
    // handleSelectName(index, name, data) {
    //   (this.selectId = index), (this.selectName = name);
    //   let addp = [];
    //   for (let p = 0; p < data.length; p++) {
    //     addp.push(data[p].officeid);
    //   }
    // }
  },
  mounted() {
    queryMajorstudentrounddata(1).then(res => {
      // console.log(JSON.parse(res));
      this.selectdata = JSON.parse(res).majorlist;
      this.selectdata2 = JSON.parse(res).officelist;
    });
    // queryMajormanageoffice().then(res => {
    //   this.selectdata = JSON.parse(res).majorlist;
    //   let ads = [];
    //   for (
    //     let i = 0;
    //     i < JSON.parse(res).majorlist[0].officelist.length;
    //     i++
    //   ) {
    //     ads.push(JSON.parse(res).majorlist[0].officelist[i].officeid);
    //   }
    //   this.selectName = JSON.parse(res).majorlist[0].majorname;
    // });
  },
  components: {
    "header-main": mainHeader
  }
};
</script>

<style lang="less" scoped>
.end {
  background: #ffffff;
  margin-top: 0.09rem;
  padding-bottom: 0.1rem;

  .end_top {
    border-left: 3px solid #277fff;
    margin-left: 0.15rem;
    padding-left: 0.05rem;
    margin-bottom: 0.1rem;

    p {
      font-family: PingFangSC-Medium;
      font-size: 0.16rem;
      color: #474c63;
      letter-spacing: 0;
      // line-height: 18px;
    }
  }

  .end_end {
    width: 3.25rem;
    margin: 0 auto;

    .end_th {
      display: flex;
      align-items: center;

      p {
        font-family: PingFangSC-Medium;
        font-size: 0.13rem;
        color: #212121;
        letter-spacing: 0;
        // line-height: 16px;
        border: 1px solid #f0f0f7;
        // height: 0.35rem;
        // line-height: 0.35rem;
        width: 2rem;
        text-align: center;
      }
    }

    .end_td {
      display: flex;
      border: 1px solid #f0f0f7;
      align-items: center;

      p {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #212121;
        letter-spacing: 0;
        // line-height: 16px;
        // border: 1px solid #f0f0f7;
        // height: 0.35rem;
        line-height: 0.35rem;
        width: 1.61rem;
        text-align: center;
      }
    }
  }
}
.endtable {
  overflow: auto;
  height: 4.5rem;
}
.rotation {
  position: absolute;
  background: #ffffff;
  left: 0.1rem;
  right: 0.1rem;
  background: #ffffff;
  border-radius: 5px;
  border-radius: 5px;
  .rotation_top {
    padding-right: 0.1rem;
    padding-left: 0.1rem;
    border-bottom: 1px solid #f0f0f7;
    height: 0.47rem;
    display: flex;
    align-items: center;
    .bluetitle {
      background: #277fff;
      width: 0.03rem;
      height: 0.14rem;
      margin-right: 0.05rem;
    }
    img {
      width: 0.2rem;
      height: 0.2rem;
    }
    p {
      font-family: PingFangSC-Medium;
      font-size: 0.18rem;
      color: #212121;
      letter-spacing: 0;
      // line-height: 0.18rem;
      margin-right: auto;
    }
  }
  .rotation_middle {
    // display: flex;
    // flex-wrap: wrap;
    margin-right: 0.2rem;
    margin-left: 0.2rem;
    margin-top: 0.15rem;
    // margin-bottom: 0.1rem;
    .flex {
      display: flex;
      align-items: center;
      margin-bottom: 0.1rem;
    }
    p {
      font-family: PingFangSC-Regular;
      font-size: 0.15rem;
      color: #212121;
      letter-spacing: 0;
      // line-height: 0.13rem;
      margin-bottom: 0.1rem;
      span {
        color: #5d74bc;
        font-size: 0.15rem;
      }
    }
    span {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #0f0f0f;
      letter-spacing: 0;
      // line-height: 0.13rem;
    }
    .middle2 {
      margin-left: 0.15rem;
      margin-right: 0.15rem;
    }
    .middle5 {
      margin-left: 0.15rem;
    }
  }
  .rotation_main {
    p {
      font-family: PingFangSC-Regular;
      font-size: 0.15rem;
      color: #212121;
      letter-spacing: 0;
      //   text-align: center;
      //   line-height: 0.15rem;
      //   margin-bottom: 0.2rem;
    }
    img {
      width: 3.35rem;
      display: block;
      margin: 0 auto;
    }
  }
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
    padding-top: 0.29rem;
    padding-bottom: 0.11rem;
    height: 3rem;
    overflow: scroll;
    p {
      font-family: PingFangSC-Regular;
      font-size: 0.16rem;
      color: #212121;
      text-align: center;
      line-height: 0.17rem;
      margin-bottom: 0.18rem;
    }
    .active {
      color: #277fff;
    }
  }
}
.yraybar {
  .title {
    font-family: PingFangSC-Regular;
    font-size: 0.15rem;
    color: #212121;
    letter-spacing: 0;
    text-align: center;
    // line-height: 15px;
    margin-top: 0.2rem;
    margin-bottom: 0.15rem;
  }
  .bartop {
    width: 3.08rem;
    display: flex;
    align-items: center;
    margin-left: 0.57rem;
    margin-bottom: 0.09rem;
    .xray {
      margin-left: auto;
      margin-right: 0.23rem;
    }

    p {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #9397ad;
      letter-spacing: 0;
      // line-height: 13px;
    }
  }
  .barmiddle_center {
    display: flex;
    align-items: flex-start;
    .barleft {
      width: 0.57rem;
      .barleft_block {
        width: 0.36rem;
        margin: 0 auto;
        margin-top: 0.11rem;
        height: 0.42rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
      p {
        font-family: PingFangSC-Regular;
        font-size: 0.12rem;
        color: #9397ad;
        letter-spacing: 0;
        text-align: center;
        // line-height: 13px;
      }
    }
    .barmiddle {
      width: 3.08rem;
      // height: 2.72rem;
      border-top: 1px solid #d7dde4;
      border-left: 1px solid #d7dde4;
      padding-bottom: 0.1rem;
      margin-right: 0.1rem;
      .barmiddle_single {
        display: flex;
        align-items: center;
        .block {
          height: 0.42rem;
          // width: 2.72rem;
          background: #e28a4a;
          margin-top: 0.11rem;
        }
        p {
          font-family: PingFangSC-Regular;
          font-size: 0.12rem;
          color: #212121;
          letter-spacing: 0;
          margin-left: 0.05rem;
          // line-height: 12px;
        }
      }
    }
  }
}
.jdmc {
  height: 0.18rem;
  font-size: 0.13rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(89, 89, 89, 1);
  line-height: 0.18rem;
  padding-left: 20px;
  margin-top: 20px;
}
.jdcell {
  width: 90%;
  margin: auto;
}
.jdbox {
  background: rgba(242, 242, 243, 1);
  height: 100%;
}
.jdcelldiv {
  height: 0.5rem;
  background: rgba(255, 255, 255, 1);
  line-height: 0.5rem;
  border-radius: 0.01rem;
  border-bottom: 1px solid #f2f2f2;
  font-size: 0.13rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  padding-left: 10px;
}
.jdstudent {
  background: #fff;

  p {
    width: 0.7rem;
    height: 0.32rem;
    line-height: 0.32rem;
    font-size: 0.13rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(89, 89, 89, 1);
    text-align: center;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.03rem;
    border: 0.01rem solid rgba(238, 238, 239, 1);
    margin: 5px;
    display: inline-block;
  }
}
.boxtitle {
  font-size: 0.15rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 150, 193, 1);
  line-height: 0.21rem;
  text-align: center;
}
</style>