<template>
  <div>
    <!-- <header-main :message="'培训'"></header-main>
    <div @click="popupVisible=true" class="select">筛选</div>-->
    <mt-header fixed title="培训">
      <router-link to slot="left">
        <mt-button icon="back" @click="$router.back(-1)"></mt-button>
      </router-link>
      <mt-button slot="right" @click="popupVisible=true">筛选</mt-button>
    </mt-header>

    <div class="studenttrain">
      <div class="student_train">
        <div class="student_train_top">
          <!-- <mt-search v-model="value"></mt-search> -->
          <div class="end" v-for="(item, index) in tabledata" :key="index">
            <div class="pxtop">
              <p class="pxtitle">{{item.name}}——培训数据</p>
              <p class="descs">数据截止时间：{{years}}年{{moment}}月</p>
            </div>
            <div class="end_end">
              <div class="end_th">
                <p>培训类型</p>
                <p>发布次数</p>
                <p>参与人数</p>
              </div>
<<<<<<< HEAD
              <div class="endtable">
=======
              <div
                class="endtable"
          
              >
>>>>>>> 0b063521dd23e0abd53622dd74f2074fb177b489
                <div class="end_td" v-for="(student,index) in item.traintypesumlist" :key="index">
                  <p>{{student.traintypename}}</p>
                  <p>{{student. trainsum}}</p>
                  <p>{{student. studentsum}}</p>
                </div>
              </div>
<<<<<<< HEAD
=======
              <!-- <p
                v-else
                style="line-height: 1rem;text-align: center;font-size: 12px;color: #999;"
              >暂无数据</p> -->
>>>>>>> 0b063521dd23e0abd53622dd74f2074fb177b489
            </div>
          </div>
        </div>
      </div>
    </div>
    <mt-popup v-model="popupVisible" position="bottom">
      <div class="popup-box">
        <div class="popup-close" @click="popupVisible = false">
          <img src="@/assets/images/close.png" alt />
        </div>
        <div class="popup-nav">
          <mt-navbar v-model="selected">
            <mt-tab-item id="1">专业基地</mt-tab-item>
            <mt-tab-item id="2">选择科室</mt-tab-item>
          </mt-navbar>
        </div>
        <div style="width:3.75rem;height:0.01rem;background:rgba(242,242,243,1);margin-top:0.1rem"></div>

        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <ul class="popup-down-items">
              <li
              
                :class="majorsubjectIndex == index ? 'popup-down-action':''"
                v-for="(item, index) in selectdata"
                :key="index"
                @click="getValue(index,item.majorsubjectid)"
              >{{item.majorname}}</li>
              <!-- :class="firstId == item.majorsubjectid ? 'popup-down-action':''" -->

              <!-- @click="handleFirst(item.majorsubjectid,item.majorname,item.officelist)" -->
            </ul>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <ul class="popup-down-items" v-if="kswar.length != 0">
              <li
                :class="selectId == index ? 'popup-down-action':''"
                v-for="(item, index) in kswar"
                :key="index"
                @click="handleSelectName(index,item.name,kswar)"
              >{{item.name}}</li>
            </ul>
            <p v-else style="line-height: 1rem;text-align: center;font-size: 12px;color: #999;">暂无数据</p>

            <div class="save" @click="popupVisible = false">确定</div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
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
import { Indicator, Popup, Navbar, TabItem, Search, Header } from "mint-ui";
import moment from "moment";
export default {
  data() {
    return {
<<<<<<< HEAD
      majorsubjectIndex:0,
=======
      majorsubjectIndex: null,
>>>>>>> 0b063521dd23e0abd53622dd74f2074fb177b489
      showRotation: false,
      tabIndex: 2,
      selectId: 0,
      kswar: [],
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
    onNavBarChange(val) {
      console.log(val);
    },
<<<<<<< HEAD
    getValue(index, majorsubjectid) {
      this.majorsubjectIndex = index
=======
    getValue(index, majorsubjectid, name) {
      this.majorsubjectIndex = index;
      this.majorsubjectName = name;

>>>>>>> 0b063521dd23e0abd53622dd74f2074fb177b489
      // console.log(index, majorsubjectid);
      queryMajormanageoffice().then(res => {
        // console.log(JSON.parse(res));
        this.selectdata = JSON.parse(res).majorlist;
        for (var t = 0; t < this.selectdata.length; t++) {
          if (this.selectdata[t].majorsubjectid == majorsubjectid) {
            this.kswar = this.selectdata[t].officelist;
          }
        }
        this.ksid = []
        for (var e = 0; e < this.kswar.length; e++) {
          if (this.kswar[e].officeid == null) {
            console.log("暂无数据");
          } else {
<<<<<<< HEAD
=======
            
>>>>>>> 0b063521dd23e0abd53622dd74f2074fb177b489
            this.ksid.push(this.kswar[e].officeid);
          }
        }

        // console.log(this.ksid);
        queryStudenttraindata(this.moment, this.ksid).then(res => {
          this.singledata = JSON.parse(res).officetrainsumlist;
          console.log(  this.singledata)
          this.tabledata = [];
          // console.log(this.singledata);
          for (var k = 0; k < this.singledata.length; k++) {
            if (this.ksid.indexOf(this.singledata[k].officeid) != -1) {
              this.tabledata.push(this.singledata[k]);
            }
            // console.log(this.singledata[k])
          }
          Indicator.close();
<<<<<<< HEAD
          this.selected = '2'
          this.selectId = 0
=======
          this.selected = "2";
          // this.handleSelectName(0,this.kswar[0].name,this.kswar[0])
>>>>>>> 0b063521dd23e0abd53622dd74f2074fb177b489
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
<<<<<<< HEAD
      let add = [];
      for (let i = 0; i < datas.length; i++) {
        add.push(datas[i].officeid);
      }
      queryStudenttraindata(2, add, this.moment).then(res => {
        // console.log(JSON.parse(res));
        this.singledata = JSON.parse(res).studenttraindata;
=======

      let add = [];
      // for (let i = 0; i < datas.length; i++) {
      //   add.push(datas[i].officeid);
      // }
      // console.log(datas.officeid)
      queryStudenttraindata(this.moment, datas.officeid).then(res => {
        // console.log(JSON.parse(res));
        this.singledata = JSON.parse(res).studenttraindata;
      
        // this.singledata = JSON.parse(res).officetrainsumlist;
>>>>>>> 0b063521dd23e0abd53622dd74f2074fb177b489
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
<<<<<<< HEAD
       this.kswar = this.selectdata[0].officelist;
        
      queryStudenttraindata(2, "", this.moment).then(res => {
=======
      this.kswar = this.selectdata[0].officelist;

      queryStudenttraindata(this.moment).then(res => {
>>>>>>> 0b063521dd23e0abd53622dd74f2074fb177b489
        this.singledata = JSON.parse(res).officetrainsumlist;
        // this.showtab = true
        this.tabledata.push(JSON.parse(res).officetrainsumlist[0]);

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

    this.years = moment().year();
  },
<<<<<<< HEAD
=======
  destroyed: function() {
    console.log("12456");
  },
>>>>>>> 0b063521dd23e0abd53622dd74f2074fb177b489
  components: {
    "header-main": mainHeader,
    // piebar
    trainbar,
    Header
  }
};
</script>

<style lang="less" scoped>
.s-picker {
  margin-top: 0.51rem;
}
.save {
  width: 3.75rem;
  line-height: 0.49rem;
  background: rgba(0, 150, 193, 1);

  font-size: 0.15rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  position: fixed;
  text-align: center;
  left: 0;
  bottom: 0;
}

.popup-down-items {
  background: #fff;
  width: 3.6rem;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  display: flex;
  padding-bottom: 0.1rem;
  padding-left: 0.15rem;
  padding-top: 0.15rem;
  flex-flow: wrap;
  border-top: 1px solid #f2f2f3;
}
.popup-down-items li {
  width: 0.8rem;
  line-height: 0.44rem;
  text-align: center;
  border-radius: 0.06rem;
  background: rgba(242, 242, 243, 1);
  font-size: 0.13rem;
  margin-right: 0.08rem;
  margin-bottom: 0.1rem;
}
.popup-down-action {
  color: rgba(0, 150, 193, 1);
}
/deep/ .mint-navbar .mint-tab-item.is-selected {
  font-size: 0.13rem;
  font-weight: bold;
  color: rgba(0, 150, 193, 1);
  line-height: 0.18rem;
  border-bottom: 2px solid rgba(0, 150, 193, 1);
  margin-bottom: 2px;
}
/deep/ .mint-navbar .mint-tab-item {
  margin-left: 10px;
  padding: 10px 0;
  color: #595959;
}
/deep/.mint-tab-item-label {
  font-size: 0.13rem;
  font-weight: bold;
  line-height: 0.18rem;
}
.popup-close {
  position: absolute;
  right: 0.15rem;
  top: 0.1rem;

  img {
    width: 0.15rem;
    height: 0.15rem;
  }
}
.popup-nav {
  width: 2.8rem;
  margin-top: 0.1rem;
}
.popup-box {
  width: 3.75rem;
  height: 5.22rem;
  background: rgba(255, 255, 255, 1);
  position: relative;
}
.screen-tap-box {
  width: 3.3rem;
  margin: 0.1rem auto;
  .screen-tap {
    display: inline-block;
    padding: 0.05rem 0.1rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.03rem;
    border: 0.01rem solid rgba(0, 150, 193, 1);
    margin-right: 0.08rem;
    font-size: 0.13rem;
    color: rgba(0, 150, 193, 1);
    line-height: 0.18rem;
  }
}
.main-content {
  width: 3.45rem;
  margin: 0 auto;
  margin-top: 0.1rem;
  background: #fff;
  .nav-bar {
    height: 0.64rem;
    border-radius: 0.06rem 0.06rem 0rem 0rem;
    color: #0096c1;
    padding-top: 1px;
    border-bottom: 2px solid #f0f0f7;
    .main-title {
      margin-top: 0.12rem;
      margin-left: 0.24rem;
      font-size: 0.15rem;
      font-weight: bold;
      line-height: 0.21rem;
    }
    .main-title-sub {
      margin-top: 0.04rem;
      margin-left: 0.24rem;
      font-size: 0.11rem;
      font-weight: 400;
      color: #0096c1;
      line-height: 0.16rem;
    }
  }
  .main-table {
    border: 3px solid #f0f0f7;
  }
  .main-table li {
    width: 1.1rem;
    border-left: 2px solid #f0f0f7;
    line-height: 0.44rem;
    font-size: 0.13rem;
    text-align: center;
    background: rgba(255, 255, 255, 1);
    display: inline-block;
    vertical-align: middle;
  }
  .main-table ul {
    border-bottom: 2px solid #f0f0f7;
  }
  .main-table li:first-child {
    border-left: 0px !important;
  }
  .main-table ul:last-child {
    border-bottom: 0px !important;
  }
  .head-table li {
    color: #0096c1;
  }
}
/deep/ .mint-cell-value.is-link {
  margin-right: 0.05rem;
  color: #000;
  font-weight: bold;
  font-size: 0.15rem;
}
/deep/ .mint-cell-wrapper {
  padding: 0rem 0.3rem;
}
.mint-cell {
  border-bottom: 1px solid #f2f2f3;
}
.info-content {
  width: 3.55rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.03rem;
  margin: 0.1rem auto;
  padding-bottom: 0.1rem;
}
.sumks-item {
  position: relative;
}
.sum-right {
  position: absolute;
  width: 0.8rem;
  height: 0.8rem;

  display: inline-block;
  right: 0.33rem;
  top: 0.09rem;
}
.sum-left {
  width: 2.2rem;
  display: inline-block;
  margin-top: 0.2rem;
  margin-left: 0.2rem;

  p {
    font-size: 0.13rem;
    font-weight: 400;
    color: rgba(89, 89, 89, 1);
    line-height: 0.18rem;
  }
}
.sum-item {
  font-size: 0.13rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  line-height: 0.18rem;
  border-left: 4px solid #0096c1;
  margin: 0.2rem 0rem 0 0.1rem;
  padding-left: 0.1rem;
}
.sum-content {
  padding-top: 1px;
  width: 3.55rem;
  height: 2.5rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.03rem;
  margin: 0 auto;
  margin-top: 0.1rem;
}

.main-box {
  margin-top: 0.54rem;
}
.tab-page-btn {
  margin: 0 auto;
  line-height: 0.44rem;
  border-radius: 10px;
  width: 2.98rem;
  font-size: 0.15rem;
  font-weight: bold;
  color: rgba(0, 150, 193, 1);
  span {
    width: 1.46rem;
    display: inline-block;
    text-align: center;
    border-top: 2px solid #0096c1;
    border-bottom: 2px solid #0096c1;
    background: #fff;
  }
}
.tab-action {
  background: rgba(0, 150, 193, 1) !important;
  color: #fff;
}
.mint-header {
  background-color: #fff;
  color: #000;
  height: 44px;
  border-bottom: 1px solid #f2f2f3;
  z-index: 60;
}
/deep/ .mint-header-title {
  font-size: 0.17rem;
  font-weight: bold;
}
.student_examine {
  background: rgba(242, 242, 243, 1);
  min-height: 100vh;
  padding-top: 1px;
}

// 列表开始
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
// 列表结束
.examine_top {
  left: 0.1rem;
  right: 0.1rem;
  background: #ffffff;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  border-radius: 5px;
  overflow: hidden;
  .containter {
    border-top: 1px solid #f0f0f7;
  }
}
.examine1 {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 0.26rem;
  background: #ffffff;
  .examine1_left_top {
    font-family: PingFangSC-Regular;
    font-size: 0.15rem;
    color: #212121;
    letter-spacing: 0;
    text-align: center;
    // line-height: 15px;
    margin-top: 0.14rem;
    margin-bottom: 0.25rem;
  }
}
.examine1_left_end {
  display: flex;
  align-items: center;
  .endleft {
    margin-right: 0.15rem;
    .number {
      font-family: PingFangSC-Medium;
      font-size: 0.3rem;
      // color: #277FFF;
      letter-spacing: 0;
      text-align: center;
      // line-height: 30px;
    }
    .desc {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #212121;
      letter-spacing: 0;
      text-align: center;
      // line-height: 13px;
    }
  }
}
.examine1_left_end2 {
  display: flex;
  align-items: center;
  .endleft {
    margin-right: 0.15rem;
    .number {
      font-family: PingFangSC-Medium;
      font-size: 0.15rem;
      // color: #277FFF;
      letter-spacing: 0;
      text-align: center;
      margin-bottom: 0.1rem;
      // line-height: 30px;
    }
    .desc {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #212121;
      letter-spacing: 0;
      text-align: center;
      // line-height: 13px;
    }
  }
}
.examine_middle {
  top: 2.6rem;
  background: #ffffff;
  width: 100%;
  .end_top {
    display: -webkit-flex;
    // justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    width: 3.55rem;
    height: 0.8rem;
    margin: 0 auto;
    background: #f0f0f7;
    border-radius: 2px;
    border-radius: 2px;
    position: relative;
    p {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #212121;
      letter-spacing: 0;
      // line-height: 13px;
      margin-left: 0.1rem;
      margin-right: 0.1rem;
      line-height: 0.4rem;
    }
  }
  .end_button {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    right: 0.12rem;
    p {
      font-family: PingFangSC-Regular;
      font-size: 0.13rem;
      color: #277fff;
      letter-spacing: 0;
      margin: 0;
      // line-height: 13px;
    }
  }
  .examine_middle_top {
    .black_block {
      width: 100%;
      height: 0.1rem;
      background: #f0f0f7;
    }
    .tops {
      display: flex;
      align-items: center;
      margin-top: 0.2rem;
      margin-bottom: 0.1rem;
      img {
        width: 0.16rem;
        height: 0.16rem;
        position: absolute;
        right: 0.2rem;
      }
    }
    .top {
      background: #f0f0f7;
      display: -webkit-flex;
      flex-direction: row;
      flex-wrap: wrap;
      // padding-top: 0.15rem;
      padding-bottom: 0.08rem;
      border-radius: 5px 5px 0px 0px;
      padding-left: 0.05rem;
      width: 3.55rem;
      margin: 0 auto;

      overflow: hidden;
      position: relative;
      background: #f0f0f7;
      p {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #212121;
        letter-spacing: 0;
        text-align: center;
        margin: 0 0.1rem;
        margin-top: 0.15rem;
        // line-height: 15px;
      }
      .open {
        display: flex;
        align-items: center;
        // margin-left: auto;
        // margin-right: 0.15rem;
        color: #277fff;
        margin-top: 0.15rem;
        position: absolute;
        bottom: 0.1rem;
        right: 0.1rem;
        background: #f0f0f7;
        p {
          margin: 0;
          color: #277fff;
        }
        span {
          font-size: 0.1rem;
          margin-left: 0.05rem;
        }
        img {
          width: 0.1rem;
          height: 0.1rem;
          margin-left: 0.05rem;
        }
        .flex {
          display: flex;
          align-items: center;
        }
      }
    }
    .title {
      font-family: PingFangSC-Regular;
      font-size: 0.15rem;
      color: #212121;
      letter-spacing: 0;
      text-align: center;
      margin-left: auto;
      margin-right: auto;
      // line-height: 15px;
    }
  }
}
.mint-navbar {
  // width: 3.55rem;
  margin: 0 auto;
  background: #fff;
  border-top-left-radius: 0.05rem;
  border-top-right-radius: 0.05rem;
  .mint-tab-item:nth-child(1) {
    // width: 1.1rem;
  }
  .mint-tab-item:nth-child(2) {
    // width: 1.6rem;
  }
  .mint-tab-item:nth-child(3) {
    // width: 1rem;
    overflow: hidden;
  }
}

/deep/.mint-tab-item-label {
  color: #9397ad;
  font-size: 0.13rem;
  height: 0.45rem;
  line-height: 0.45rem;
  span {
    font-size: 0.12rem;
    color: #9397ad;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.12rem;
    opacity: 0.5;
  }
}
/deep/ .is-selected .mint-tab-item-label {
  font-size: 0.18rem;
  color: #212121;
  span {
    color: #9397ad;
    opacity: 1;
  }
}

.mint-navbar {
  position: relative;
  box-sizing: border-box;
  padding: 0 0.1rem;
}

/deep/ .mint-navbar .mint-tab-item {
  // width: 1.3rem;
  padding: 0;
  // height: 0.48rem;
  background: transparent;
  // margin-bottom: 0.01rem;
  margin-bottom: 0;
  // flex: initial;
}
/deep/ .mint-tab-container {
  overflow: inherit;
}
/deep/ .mint-tab-item-label {
  position: relative;
}

.popup-close {
  position: absolute;
  right: 0.15rem;
  top: 0.1rem;

  img {
    width: 0.15rem;
    height: 0.15rem;
  }
}
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
  margin-top: 0.5rem;
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
.descs {
  height: 0.16rem;
  font-size: 0.11rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 0.16rem;
}
.select {
  position: absolute;
  top: 15px;
  right: 20px;
  z-index: 9999;
}
.pxtop {
  height: 0.44rem;
  background: rgba(0, 150, 193, 1);
  border-radius: 0.06rem 0.06rem 0rem 0rem;
  padding: 10px;
}
.pxtitle {
  height: 0.21rem;
  font-size: 0.15rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 0.21rem;
}
/deep/ .is-selected .mint-tab-item-label {
  font-size: 0.13rem;
  color: #0096c1;
}
</style>