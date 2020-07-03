<template>
  <div  class="student_examine">
    <mt-header fixed title="考核">
      <router-link to slot="left">
        <mt-button icon="back" @click="$router.back(-1)"></mt-button>
      </router-link>
    </mt-header>

    <div class="main-box">
      <div class="tab-page-btn">
        <span class="tab-action">出科考试</span>
        <span>日常考试</span>
      </div>
    </div>
    <div class="sum-content">
      
      <div class="sumks-item">
        <p class="sum-item">理论考试</p>
        <div class="sum-left" style="    margin-bottom: 0.10rem;">
          <p>参加人次：<span style="color:#0096C1">895445</span></p>
          <p style="margin-top: 0.1rem;">得分率：&#12288;<span style="color:#0096C1;">134222%</span></p>

        </div>
        <div class="sum-right"  style="background: #0096C1;">

        </div>
      </div>
      <div style="width:3.35rem;height:0.01rem;background:rgba(242,242,243,1);margin: 0.12rem auto;"></div>
      <div class="sumks-item">
        <p class="sum-item" style="border-left: 4px solid #FF9B00;margin-top:0">技能考试</p>
        <div class="sum-left">
         <p>参加人次：<span style="color:#FF9B00">895445</span></p>
         <p  style="margin-top: 0.1rem;">得分率：&#12288;<span style="color:#FF9B00;">134222%</span></p>
        </div>
        <div class="sum-right" style="background: #ff9b00;">
        </div>
      </div>
    </div>

    <div class="info-content">
      <mt-cell title="选择时间"  is-link @click.native="openPopup(3)" value="带链接"></mt-cell>

      <div class="screen-tap-box">
        <p class="screen-tap">2020-10-20 <img src="" alt=""></p>
      </div>
      <div class="main-content"> 
        
        <div class="main-table">
          <div class="nav-bar">
          <p class="main-title">{{'标题'}}</p>
          <p class="main-title-sub">时间信息</p>
        </div>
          <ul class="head-table">
              <li>教师</li>
              <li>副主任医师</li>
              <li>
                <p>学生A</p>
               
              </li>
            </ul>
            <ul>
              <li>教师</li>
              <li>副主任医师</li>
              <li>
                <p>学生A</p>
               
              </li>
            </ul>
            <ul>
              <li>教师</li>
              <li>副主任医师</li>
              <li>
                <p>学生A</p>
                <p>学生B</p>
                <p>学生C</p>
              </li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mainHeader from "../../../components/mainHeader.vue";
import cycle from "../../../components/mecharts/cycle.vue";
import { Indicator } from "mint-ui";
import {
  queryStudentexamdata,
  queryStudentexamdataOffice,
  queryNotpassstudentdata
} from "../../../api/studentexame";
import moment from "moment";
import { Header, Cell,Popup,Picker,Navbar,TabItem    } from "mint-ui";
export default {
  data() {
    return {
      selected: "1",
      cyclewidth: "0.7rem",
      peopledetial: false,
      selectWindow: false,
      sumscore: "",
      openList: false,
      firstName: "内科",
      firstId: 0,
      secondName: "呼吸科",
      endName: "出科考试",
      secondId: 0,
      thirdName: "6月",
      thirdId: 0,
      choice1Name: "",
      choice1Id: 0,
      choice2Name: "6月",
      choice2Id: 0,
      choice2Number: "12",
      choice2Numbers: "12",
      showSecond: true,
      showThird: true,
      singlenumber: 0,
      showcycle: false,
      typeDate1: [
        {
          name: "内科",
          show: true
        },
        {
          name: "外科",
          show: true
        },
        {
          name: "口腔科",
          show: true
        },
        {
          name: "妇产科",
          show: true
        },
        {
          name: "神经内科",
          show: true
        },
        {
          name: "精神科",
          show: true
        },
        {
          name: "急诊科",
          show: true
        },
        {
          name: "病理科",
          show: true
        },

        {
          name: "皮肤性科",
          show: true
        },
        {
          name: "康复医学科",
          show: true
        },
        {
          name: "麻醉科",
          show: false
        },
        {
          name: "眼科",
          show: false
        },
        {
          name: "放射科",
          show: false
        }
      ],
      typeDate2: [],
      typeDate3: [
        {
          number: "12月"
        },
        {
          number: "11月"
        },
        {
          number: "10月"
        },
        {
          number: "9月"
        },
        {
          number: "8月"
        },
        {
          number: "7月"
        },
        {
          number: "6月"
        },
        {
          number: "5月"
        },
        {
          number: "4月"
        },
        {
          number: "3月"
        },
        {
          number: "2月"
        },
        {
          number: "1月"
        }
      ],
      topSwipeData: "",
      singlelistData: [],
      singlelistData2: [],
      winlistdata: [],
      moment: 0
    };
  },
  watch: {
    selected(val) {
      // Indicator.open("加载中...");
      this.moment = moment().month() + 1;
      this.showSecond = true;
      this.showThird = true;
      this.openList = false;
      this.choice2Number = moment().month() + 1;
      this.thirdName = moment().month() + 1 + "月";
      this.choice2Id = 0;
      this.thirdId = 0;
      if (val == 1) {
        this.endName = "出科考试";
      } else if (val == 2) {
        this.endName = "日常考试";
      }
      // else {
      //   this.endName = "结业考试";
      // }
      queryStudentexamdata(val).then(res => {
        // console.log(JSON.parse(res));
        this.topSwipeData = JSON.parse(res).studentexamdata;
        this.singlenumber = parseInt(
          JSON.parse(res).studentexamdata.lltgl2 * 100
        );
        this.showcycle = true;
        this.typeDate1 = JSON.parse(res).majorlist;
        this.firstName = JSON.parse(res).majorlist[0].majorname;
        if (JSON.parse(res).majorlist[0].officelist.length == 0) {
          console.log("暂无数据");
        } else {
          this.typeDate2 = JSON.parse(res).majorlist[0].officelist;
          this.secondName = JSON.parse(
            res
          ).majorlist[0].officelist[0].officename;
          this.choice1Name = JSON.parse(
            res
          ).majorlist[0].officelist[0].officename;
          this.secondId = JSON.parse(res).majorlist[0].officelist[0].officeid;
          this.choice1Id = JSON.parse(res).majorlist[0].officelist[0].officeid;
          this.firstId = JSON.parse(res).majorlist[0].majorsubjectid;
          queryStudentexamdataOffice(
            JSON.parse(res).majorlist[0].officelist[0].officeid,
            val,
            this.choice2Number
          ).then(res => {
            this.singlelistData = JSON.parse(res).officestudentexamdatalist;
            this.singlelistData2 = JSON.parse(res).officefinishtscorelist;
            Indicator.close();
          });
        }
      });
    }
  },
  methods: {
    slectType() {
      this.secondName = this.choice1Name;
      this.thirdName = this.choice2Name;
      this.secondId = this.choice1Id;
      this.thirdId = this.choice2Id;
      this.choice2Numbers = this.choice2Number;
      this.selectWindow = false;
      // console.log(this.secondName,this.thirdName,this.secondId,this.thirdId);

      if (this.secondId == 999 && this.thirdId == 99) {
        queryStudentexamdata(this.selected).then(res => {
          for (let i = 0; i < JSON.parse(res).majorlist.length; i++) {
            if (JSON.parse(res).majorlist[i].majorsubjectid == this.firstId) {
              let ads = [];
              for (
                let p = 0;
                p < JSON.parse(res).majorlist[i].officelist.length;
                p++
              ) {
                ads.push(JSON.parse(res).majorlist[i].officelist[p].officeid);
              }
              queryStudentexamdataOffice(ads, this.selected, " ").then(res => {
                // console.log(JSON.parse(res));
                this.singlelistData = JSON.parse(res).officestudentexamdatalist;
                this.singlelistData2 = JSON.parse(res).officefinishtscorelist;
                console.log(this.singlelistData2);
              });
            }
          }
        });
      } else {
        if (this.secondId == 999) {
          queryStudentexamdata(this.selected).then(res => {
            for (let i = 0; i < JSON.parse(res).majorlist.length; i++) {
              if (JSON.parse(res).majorlist[i].majorsubjectid == this.firstId) {
                let ads = [];
                for (
                  let p = 0;
                  p < JSON.parse(res).majorlist[i].officelist.length;
                  p++
                ) {
                  ads.push(JSON.parse(res).majorlist[i].officelist[p].officeid);
                }
                queryStudentexamdataOffice(
                  ads,
                  this.selected,
                  this.choice2Number
                ).then(res => {
                  // console.log(JSON.parse(res));
                  this.singlelistData = JSON.parse(
                    res
                  ).officestudentexamdatalist;
                });
              }
            }
          });
        } else if (this.thirdId == 99) {
          queryStudentexamdataOffice(this.secondId, this.selected, " ").then(
            res => {
              // console.log(JSON.parse(res));
              this.singlelistData = JSON.parse(res).officestudentexamdatalist;
              this.singlelistData2 = JSON.parse(res).officefinishtscorelist;
            }
          );
        } else {
          queryStudentexamdataOffice(
            this.secondId,
            this.selected,
            this.choice2Number
          ).then(res => {
            // console.log(JSON.parse(res));
            this.singlelistData = JSON.parse(res).officestudentexamdatalist;
            this.singlelistData2 = JSON.parse(res).officefinishtscorelist;
          });
        }
      }
      if (this.secondId != 999) {
        this.showSecond = true;
      }
      if (this.thirdId != 99) {
        this.showThird = true;
      }
      // queryStudentexamdataOffice(this.choice1Id,this.selected).then(res => {
      //   this.singlelistData = JSON.parse(res).officestudentexamdatalist
      // })
      // console.log(this.singlelistData);
    },
    isshowdata(data) {
      // console.log(data);
      let numa = 0;
      for (let k = 0; k < data.length; k++) {
        if (data[k].wtgrs != 0) {
          numa += 1;
        }
      }
      if (numa == 0) {
        return true;
      } else {
        return false;
      }
    },
    // getlength(text){
    //   console.log(text);

    // },
    choice1(id, name) {
      (this.choice1Id = id), (this.choice1Name = name);
    },
    choice2(id, name) {
      (this.choice2Id = id), (this.choice2Name = name);
      if (name.length > 2) {
        this.choice2Number = name.slice(0, 2);
      } else {
        this.choice2Number = "0" + name.slice(0, 1);
      }
    },
    handleOpenList(_index) {
      if (_index == 1) {
        this.openList = true;
        // for (let d = 0; d < this.typeDate1.length; d++) {
        //   this.typeDate1[d].show = true
        // }
      } else {
        this.openList = false;
        // for (let p = 0; p < this.typeDate1.length; p++) {
        //   this.typeDate1[p].show = false
        // }
        // for (let i = 0; i < 10; i++) {
        //   this.typeDate1[i].show = true
        // }
      }
    },
    handleFirst(id, name, data) {
      this.moment = moment().month() + 1;
      this.showSecond = true;
      this.showThird = true;
      this.firstName = name;
      this.firstId = id;
      // console.log(data);
      this.typeDate2 = data;
      if (data[0] == null) {
        console.log("暂无数据")
      } else {
        this.secondName = data[0].officename;
        this.secondId = data[0].officeid;
        this.choice1Id = data[0].officeid;
        this.choice1Name = data[0].officename;
      }

      // this.thirdName = moment().month() + 1 + '月'
      (this.choice2Number =moment().month() + 1),
        (this.thirdName =moment().month() + 1 + '月'),
        (this.choice2Id = 0),
        (this.thirdId = 0);
      queryStudentexamdataOffice(
        data[0].officeid,
        this.selected,
        this.choice2Number
      ).then(res => {
        this.singlelistData = JSON.parse(res).officestudentexamdatalist;
        this.singlelistData2 = JSON.parse(res).officefinishtscorelist;
      });
    },
    hideWindow() {
      this.choice1Id = this.secondId;
      this.choice2Id = this.thirdId;
      this.choice1Name = this.secondName;
      this.choice2Name = this.thirdName;
      this.choice2Number = this.choice2Numbers;
      this.selectWindow = false;
    },
    closeSecond() {
      (this.secondId = 999), (this.choice1Id = 999), (this.showSecond = false);
      // console.log(this.firstId);

      if (this.showThird == false) {
        queryStudentexamdata(this.selected).then(res => {
          for (let i = 0; i < JSON.parse(res).majorlist.length; i++) {
            if (JSON.parse(res).majorlist[i].majorsubjectid == this.firstId) {
              let ads = [];
              for (
                let p = 0;
                p < JSON.parse(res).majorlist[i].officelist.length;
                p++
              ) {
                ads.push(JSON.parse(res).majorlist[i].officelist[p].officeid);
              }
              queryStudentexamdataOffice(ads, this.selected, " ").then(res => {
                // console.log(JSON.parse(res));
                this.singlelistData = JSON.parse(res).officestudentexamdatalist;
                this.singlelistData2 = JSON.parse(res).officefinishtscorelist;
              });
            }
          }
        });
      } else {
        queryStudentexamdata(this.selected).then(res => {
          for (let i = 0; i < JSON.parse(res).majorlist.length; i++) {
            if (JSON.parse(res).majorlist[i].majorsubjectid == this.firstId) {
              let ads = [];
              for (
                let p = 0;
                p < JSON.parse(res).majorlist[i].officelist.length;
                p++
              ) {
                ads.push(JSON.parse(res).majorlist[i].officelist[p].officeid);
              }
              queryStudentexamdataOffice(
                ads,
                this.selected,
                this.choice2Number
              ).then(res => {
                // console.log(JSON.parse(res));
                this.singlelistData = JSON.parse(res).officestudentexamdatalist;
                this.singlelistData2 = JSON.parse(res).officefinishtscorelist;
              });
            }
          }
        });
      }
    },
    closeThird() {
      (this.choice2Id = 99), (this.thirdId = 99), (this.showThird = false);
      if (this.showSecond == false) {
        queryStudentexamdata(this.selected).then(res => {
          for (let i = 0; i < JSON.parse(res).majorlist.length; i++) {
            if (JSON.parse(res).majorlist[i].majorsubjectid == this.firstId) {
              let ads = [];
              for (
                let p = 0;
                p < JSON.parse(res).majorlist[i].officelist.length;
                p++
              ) {
                ads.push(JSON.parse(res).majorlist[i].officelist[p].officeid);
              }
              queryStudentexamdataOffice(ads, this.selected, " ").then(res => {
                // console.log(JSON.parse(res));
                this.singlelistData = JSON.parse(res).officestudentexamdatalist;
                this.singlelistData2 = JSON.parse(res).officefinishtscorelist;
              });
            }
          }
        });
      } else {
        queryStudentexamdataOffice(this.secondId, this.selected, " ").then(
          res => {
            // console.log(JSON.parse(res));
            this.singlelistData = JSON.parse(res).officestudentexamdatalist;
            this.singlelistData2 = JSON.parse(res).officefinishtscorelist;
          }
        );
      }
    },
    openPeopleDetial(id) {
      queryNotpassstudentdata(id).then(res => {
        console.log(JSON.parse(res));
        this.winlistdata = JSON.parse(res).officestudentexamdatalist;
        this.noScroll();
        this.peopledetial = true;
      });
    },
    hidePeopleDetial() {
      this.peopledetial = false;
      this.canScroll();
    },
    changeNumber(number) {
      return parseInt(number) * 100;
    }
  },
  mounted() {
    // this.moment = moment().month() + 1
    queryStudentexamdata(1).then(res => {
      // console.log(JSON.parse(res));
      this.topSwipeData = JSON.parse(res).studentexamdata;
      this.singlenumber = parseInt(
        JSON.parse(res).studentexamdata.lltgl2 * 100
      );
      this.showcycle = true;
      this.typeDate1 = JSON.parse(res).majorlist;
      this.firstName = JSON.parse(res).majorlist[0].majorname;
      if (JSON.parse(res).majorlist[0].officelist.length == 0) {
        console.log("暂无数据");
      } else {
        this.typeDate2 = JSON.parse(res).majorlist[0].officelist;
        this.secondName = JSON.parse(res).majorlist[0].officelist[0].officename;
        this.choice1Name = JSON.parse(
          res
        ).majorlist[0].officelist[0].officename;
        this.secondId = JSON.parse(res).majorlist[0].officelist[0].officeid;
        this.choice1Id = JSON.parse(res).majorlist[0].officelist[0].officeid;
        this.firstId = JSON.parse(res).majorlist[0].majorsubjectid;
        queryStudentexamdataOffice(
          JSON.parse(res).majorlist[0].officelist[0].officeid,
          1,
          this.moment
        ).then(res => {
          // console.log(JSON.parse(res));
          this.singlelistData = JSON.parse(res).officestudentexamdatalist;
          this.singlelistData2 = JSON.parse(res).officefinishtscorelist;
        });
      }
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
    cycle,
    Header, Cell,Popup,Picker,Navbar,TabItem
  }
};
</script>

<style lang="less" scoped>
.screen-tap-box{
  width: 3.3rem;
  margin: 0.1rem auto;
  .screen-tap{
    display: inline-block;
    padding: 0.05rem 0.1rem;
    background:rgba(255,255,255,1);
    border-radius:0.03rem;
    border:0.01rem solid rgba(0,150,193,1);

  font-size:0.13rem;
  color:rgba(0,150,193,1);
  line-height:0.18rem;
  }
}
.main-content{
  width:3.45rem;
  margin: 0 auto;
  margin-top: 0.1rem;
  background: #fff;
  .nav-bar{
      height:0.64rem;
      border-radius:0.06rem 0.06rem 0rem 0rem;
      color: #0096C1;
      padding-top: 1px;
      border-bottom:2px solid #f0f0f7 ;
      .main-title{
        margin-top: 0.12rem;
        margin-left: 0.24rem;
        font-size:0.15rem;
        font-weight:bold;
        line-height:0.21rem;
      }
      .main-title-sub{
        margin-top: 0.04rem;
        margin-left: 0.24rem;
        font-size:0.11rem;
        font-weight:400;
        color:#0096C1;
        line-height:0.16rem;
      }
  }
  .main-table{
    border:3px solid #f0f0f7 ;
  }
   .main-table li{
    width:1.1rem;
    border-left:2px solid #f0f0f7 ;
    line-height:0.44rem;
    font-size:0.13rem;
    text-align: center;
    background:rgba(255,255,255,1);
    display:inline-block;
    vertical-align: middle;
    
    }
  .main-table ul{
    border-bottom:2px solid #f0f0f7 ;
  }
  .main-table li:first-child{
    border-left:0px !important;
  }
  .main-table ul:last-child{
    border-bottom:0px !important;
  }
  .head-table li{
    color: #0096C1;
  }
    
}
/deep/ .mint-cell-value.is-link{
  margin-right: 0.05rem;
  color: #000;
  font-weight: bold;
  font-size:0.15rem;
}
/deep/ .mint-cell-wrapper{
  padding: 0rem 0.3rem;
}
.mint-cell{
  border-bottom: 1px solid #f2f2f3;
}
.info-content{
  width:3.55rem;
background:rgba(255,255,255,1);
border-radius:0.03rem;
margin: 0.1rem auto;
padding-bottom: 0.1rem;

}
.sumks-item{
  position: relative;
}
.sum-right{
  position: absolute;
    width: 0.8rem;
    height: 0.8rem;
    
    display: inline-block;
    right: 0.33rem;
    top: 0.09rem;
}
.sum-left{
  width: 2.2rem;
  display: inline-block;
  margin-top: 0.2rem;
  margin-left: 0.2rem;

  p{
font-size:0.13rem;
font-weight:400;
color:rgba(89,89,89,1);
line-height:0.18rem;
  }
}
.sum-item{
font-size:0.13rem;
font-weight:bold;
color:rgba(0,0,0,1);
line-height:0.18rem;
border-left: 4px solid #0096C1;
margin: 0.2rem 0rem 0 0.1rem;
padding-left: 0.10rem;
}
.sum-content{
  padding-top: 1px;
  width:3.55rem;
  height:2.5rem;
  background:rgba(255,255,255,1);
  border-radius:0.03rem;
  margin: 0 auto;
  margin-top: 0.1rem;
}
.tab-action{
  background: rgba(0,150,193,1);
  color: #FFF;
}
.main-box{
  margin-top: 0.54rem;
}
.tab-page-btn{
  margin: 0 auto;
  line-height: 0.44rem;
  border: 2px solid #0096C1;
  border-radius: 10px;
  width: 2.92rem;
  background: #FFF;
  overflow: hidden;
    font-size:0.15rem;
    font-weight:bold;
    color:rgba(0,150,193,1);
  span{
    width: 1.46rem;
    display: inline-block;
    text-align: center;
  }
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
.student_examine{
  background: rgba(242, 242, 243, 1);
  min-height: 100vh;
  padding-top: 1px;
}
</style>
