<template>
  <div>
    <header-main :message="'培训'"></header-main>
    <div class="studenttrain">
      <div class="student_train">
        <div class="student_train_top">
          <div @click="popupVisible=true">筛选</div>
          <!-- <mt-search v-model="value"></mt-search> -->
          <div class="end" v-for="(item, index) in tabledata" :key="index">
            <p>{{item.name}}</p>
            <div class="end_end">
              <div class="end_th">
                <p>培训类型</p>
                <p>发布次数</p>
                <p>参与人数</p>
              </div>
              <div class="endtable">
                <div class="end_td" v-for="(student,index) in item.traintypesumlist" :key="index">
                  <p>{{student.traintypename}}</p>
                  <p>{{student. trainsum}}</p>
                  <p>{{student. studentsum}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <mt-popup v-model="popupVisible" position="bottom">
      <mt-navbar class="page-part" v-model="selected">
        <mt-tab-item id="1">专业基地</mt-tab-item>
        <mt-tab-item id="2">选择科室</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div class="wadu">
            <ul>
              <li
                v-for="(item,index) in selectdata"
                :key="index"
                @click="getValue(index,item.majorsubjectid)"
              >{{item.majorname}}</li>
            </ul>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="wadu">
            <ul>
              <li v-for="(item,index) in  kswar" :key="index">{{item.name}}</li>
            </ul>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </mt-popup>
  </div>
</template>

<script>
import mainHeader from "../../../components/mainHeader.vue";
import trainbar from "../../../components/mecharts/trainbar.vue";
import {
  queryStudenttraindata,
  queryMajormanageoffice
} from "../../../api/studentcomment";
import { Indicator, Popup, Navbar, TabItem, Search } from "mint-ui";
import moment from "moment";
export default {
  data() {
    return {
      showRotation: false,
      tabIndex: 2,
      selectId: -1,
      kswar: "",
      tabledata: [],
      selected: "1",
      popupVisible: false,
      selectName: "内科基地",
      value: "",
      bardata: [
        {
          color: "#395275",
          title: "小讲堂",
          percent: "25%"
        },
        {
          color: "#5E7AB8",
          title: "教学查房",
          percent: "37%"
        },
        {
          color: "#C9D5EC",
          title: "疑难病症",
          percent: "37%"
        },
        {
          color: "#7ED5BC",
          title: "阅片会",
          percent: "37%"
        }
      ],
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
      ],
      singledata: [
        {
          bypxcs: 0,
          grade: 1,
          ljrs: 401,
          rjpxcs: "22",
          studenttraintypedata: [],
          zrs: 399
        },
        {
          bypxcs: 0,
          grade: 1,
          ljrs: 401,
          rjpxcs: "22",
          studenttraintypedata: [],
          zrs: 399
        },
        {
          bypxcs: 0,
          grade: 1,
          ljrs: 401,
          rjpxcs: "22",
          studenttraintypedata: [],
          zrs: 399
        }
      ],
      showtab: false,
      moment: 0,
      ksid: []
    };
  },
  methods: {
    getValue(index, majorsubjectid) {
      // console.log(index, majorsubjectid);
      queryMajormanageoffice().then(res => {
        // console.log(JSON.parse(res));
        this.selectdata = JSON.parse(res).majorlist;
        for (var t = 0; t < this.selectdata.length; t++) {
          if (this.selectdata[t].majorsubjectid == majorsubjectid) {
            this.kswar = this.selectdata[t].officelist;
          }
        }
        for (var e = 0; e < this.kswar.length; e++) {
          if (this.kswar[e].officeid == null) {
            console.log("暂无数据");
          } else {
            this.ksid.push(this.kswar[e].officeid);
          }
        }
        let ads = [];
        // console.log(this.kswar);
        queryStudenttraindata(this.moment, this.ksid).then(res => {
          this.singledata = JSON.parse(res).officetrainsumlist;
          // console.log(this.singledata);
          for (var k = 0; k < this.singledata.length; k++) {
            if (this.ksid.indexOf(this.singledata[k].officeid) != -1) {
              this.tabledata.push(this.singledata[k]);
            }
          }
          Indicator.close();
        });
      });
    },

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
      this.selectName = name;
      let add = [];
      for (let i = 0; i < datas.length; i++) {
        add.push(datas[i].officeid);
      }
      queryStudenttraindata(2, add, this.moment).then(res => {
        // console.log(JSON.parse(res));
        this.singledata = JSON.parse(res).studenttraindata;
        this.showtab = true;
        Indicator.close();
      });
    }
  },
  mounted() {
    Indicator.open("加载中...");
    queryMajormanageoffice().then(res => {
      // console.log(JSON.parse(res));
      this.selectdata = JSON.parse(res).majorlist;
      let ads = [];
      // for (let i = 0; i < JSON.parse(res).majorlist[0].officelist.length; i++) {
      //   ads.push(JSON.parse(res).majorlist[0].officelist[i].officeid);
      // }
      queryStudenttraindata(2, "", this.moment).then(res => {
        // console.log(JSON.parse(res));
        this.singledata = JSON.parse(res).officetrainsumlist;
        // this.showtab = true
        Indicator.close();
      });
    });
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
    "header-main": mainHeader,
    // piebar
    trainbar
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
        height: 0.35rem;
        line-height: 0.35rem;
        width: 2rem;
        text-align: center;
      }
    }

    .end_td {
      display: flex;
      align-items: center;

      p {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #212121;
        letter-spacing: 0;
        // line-height: 16px;
        border: 1px solid #f0f0f7;
        height: 0.35rem;
        line-height: 0.35rem;
        width: 1.61rem;
        text-align: center;
      }
    }
  }
}
.endtable {
  overflow: auto;
  // height: 4rem;
}
.studenttrain {
  position: absolute;
  width: 100%;
  /deep/ .pie_single {
    margin-left: 0.1rem;
    margin-right: 0.1rem;
  }
  .student_train {
    width: 3.55rem;
    background: #ffffff;
    // position: absolute;
    border-radius: 5px;
    margin: 0 auto;
    padding-top: 0.01rem;
    .student_train_top {
      // display: flex;
      align-items: center;
      margin-top: 0.1rem;
      margin-left: 0.1rem;
      margin-right: 0.1rem;
      padding-bottom: 0.1rem;
      border-bottom: 1px solid #f0f0f7;
      .tabbar {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 2.6rem;
        height: 0.3rem;
        border: 1px solid #dddddd;
        p {
          font-family: PingFangSC-Regular;
          font-size: 15px;
          color: #9397ad;
          letter-spacing: 0;
          text-align: center;
          width: 100%;
          height: 100%;
          line-height: 0.3rem;
        }
        .active {
          background: #277fff;
          color: #ffffff;
        }
      }
      .tabbar_right {
        display: flex;
        align-items: center;
        margin-left: auto;
        img {
          width: 0.16rem;
          height: 0.16rem;
          margin-left: 0.05rem;
        }
      }
    }
    .student_train_main {
      // padding-left: 0.1rem;
      // margin-right: 0.1rem;
      // margin-top: 0.21rem;
      // display: none;
      .student_train_main_single {
        padding-bottom: 0.2rem;
        border-bottom: 1px solid #f0f0f7;
        .top {
          font-family: PingFangSC-Regular;
          font-size: 0.15rem;
          color: #212121;
          letter-spacing: 0;
          // line-height: 15px;
          border-left: 3px solid #277fff;
          margin-left: 0.1rem;
          padding-left: 0.05rem;
          margin-bottom: 0.2rem;
          margin-top: 0.2rem;
        }
        .middle {
          display: flex;
          align-items: flex-start;
          justify-content: space-around;
          margin-bottom: 0.32rem;
          .right_top {
            // display: flex;
            // align-items: flex-end;
            // margin: 0 auto;
            // margin-bottom: 0.1rem;
            // margin-top: 0.1rem;
            // width: 60px;

            .right_number {
              font-family: PingFangSC-Medium;
              font-size: 0.38rem;
              color: #7ed5bc;
              letter-spacing: 0;
              text-align: center;
              // line-height: 38px;
              // line-height: 0.38rem;
            }
            .right_percent {
              font-family: PingFangSC-Medium;
              font-size: 0.16rem;
              color: #326699;
              letter-spacing: 0;
              text-align: center;
              // line-height: 16px;
            }
          }
          .number {
            font-family: PingFangSC-Medium;
            font-size: 0.38rem;
            // color: #F9953F;
            letter-spacing: 0;
            text-align: center;
            // line-height: 38px;
            span {
              font-family: PingFangSC-Medium;
              font-size: 0.16rem;
              // color: #326699;
              letter-spacing: 0;
              text-align: center;
              // line-height: 16px;
            }
          }
          .desc {
            font-family: PingFangSC-Regular;
            font-size: 0.12rem;
            color: #212121;
            letter-spacing: 0;
            text-align: center;
            span {
              color: #326699;
            }
            // line-height: 13px;
          }
        }
      }
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
/deep/ .mint-popup {
  width: 100%;
  height: 5rem;
  background: #fff;
}
.wadu ul {
  width: 96%;
  margin: auto;
}
.wadu ul li {
  width: 0.8rem;
  height: 0.44rem;
  line-height: 0.44rem;
  text-align: center;
  background: rgba(242, 242, 243, 1);
  border-radius: 0.06rem;
  margin: 5px;
  display: inline-block;
  overflow: hidden;
  font-size: 0.13rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(89, 89, 89, 1);
}
</style>