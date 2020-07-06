<template>
  <div  class="student_examine">
    <mt-header fixed title="考核">
      <router-link to slot="left">
        <mt-button icon="back" @click="$router.back(-1)"></mt-button>
      </router-link>
    </mt-header>

    <div class="main-box">
      <div class="tab-page-btn">
        <span style="    border-left: 2px solid #0096c1;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;" :class="selected == 1?'tab-action':''" @click="selected = 1">出科考试</span>
        <span style="border-right: 2px solid #0096c1;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;" :class="selected == 2?'tab-action':''" @click="selected = 2">日常考试</span>
      </div>
    </div>
    <div class="sum-content">
      <div v-for="(item,index) in topSwipeData" :key="index">
        
         <div class="sumks-item" v-if="item.typename == '理论'">
        <div >
          <p class="sum-item">理论考试</p>
        <div class="sum-left" style="    margin-bottom: 0.10rem;">
          <p>参加人次：<span style="color:#0096C1">{{item.zrc}}</span></p>
          <p style="margin-top: 0.1rem;">得分率：&#12288;<span style="color:#0096C1;">{{(item.dfl2).toFixed(2)}}%</span></p>

        </div>
        <div class="sum-right"  >
          <cycle
                
                  v-if="showcycle"
                  :cycleValue="(item.dfl2).toFixed(2)"
                  :cyclewidth="cyclewidth"
                  
                  cycleColor="#0096C1"
                  :borderWidth="8"
                  :isShowBgBorder="true"
                ></cycle>
        </div>
        </div>
        
      </div>
      <div v-if="index == 0" style="width:3.35rem;height:0.01rem;background:rgba(242,242,243,1);margin: 0.12rem auto;"></div>
        
        <div class="sumks-item" v-if="item.typename == '技能'">
        <p class="sum-item" style="border-left: 4px solid #FF9B00;margin-top:0">技能考试</p>
        <div class="sum-left">
         <p>参加人次：<span style="color:#FF9B00">{{item.zrc}}</span></p>
         <p  style="margin-top: 0.1rem;">得分率：&#12288;<span style="color:#FF9B00;">{{(item.dfl2).toFixed(2)}}%</span></p>
        </div>
        <div class="sum-right" >
          <cycle
                  
                  v-if="showcycle"
                  :cycleValue="(item.dfl2).toFixed(2)"
                  :cyclewidth="cyclewidth"
                  cycleColor="#FF9B00"
                  :borderWidth="8"
                  :isShowBgBorder="true"
                ></cycle>
        </div>
      </div>
      </div>
     
      
    </div>

    <div class="info-content">
      <mt-cell title="选择专业基地"  is-link @click.native="openPopup(1)" :value="firstName"></mt-cell>

      <div class="screen-tap-box">
        <p class="screen-tap" @click="openPopup(2)">科室-{{secondName}}</p>
        <p class="screen-tap" @click="openPopup(3)">{{String(new Date().getFullYear())+'年'+thirdName}}  </p>

      </div>
      <div class="main-content"> 
        
        <div class="main-table">
          <div class="nav-bar">
          <p class="main-title">
            专业基地-{{firstName}}
              <span v-show="showSecond">科室-{{secondName}}</span>
              <span v-show="showThird"> {{thirdName}}</span>
          </p>
          <p class="main-title-sub">{{String(new Date().getFullYear())+'年'+thirdName}}</p>
        </div>
          <ul class="head-table">
              <li>学员姓名</li>
              <li>理论成绩</li>
              <li>
                技能成绩
              </li>
            </ul>
             <div v-if="allStudentlist.length != 0">
                <ul v-for="(item, index) in allStudentlist" :key="index">
              <li > {{item.personname}}</li>
              <li>{{item.finishtheoryscore}}</li>
              <li>
                {{item.finishskillscore}}
              </li>
            </ul>
             </div>
            <p v-else style="line-height: 1rem;text-align: center;font-size: 12px;color: #999;">暂无数据</p>
            
        </div>
      </div>
    </div>
     <mt-popup v-model="zyjdPopup" position="bottom">
      <div class="popup-box">
        <div class="popup-close" @click="zyjdPopup = false">
          <img src="@/assets/images/close.png" alt />
        </div>
        <div class="popup-nav">
          <mt-navbar v-model="selected1">
            <mt-tab-item id="1">专业基地</mt-tab-item>
            <mt-tab-item id="2">所属科室</mt-tab-item>
            <mt-tab-item id="3">选择时间</mt-tab-item>
          </mt-navbar>
        </div>
        <div style="width:3.75rem;height:0.01rem;background:rgba(242,242,243,1);margin-top:0.1rem"></div>

        <mt-tab-container v-model="selected1">
          <mt-tab-container-item id="1">
            <ul class="popup-down-items">
              <li
                :class="firstId == item.majorsubjectid ? 'popup-down-action':''"
                v-for="(item, index) in typeDate1"
                :key="index"
                @click="handleFirst(item.majorsubjectid,item.majorname,item.officelist)"
              >{{item.majorname}}</li>
            </ul>
          </mt-tab-container-item>
          <mt-tab-container-item id="2"> 
            <mt-cell title="专业基地" :value="firstName"></mt-cell>
            <mt-cell :title="firstName+'科室'" :value="secondName"></mt-cell>
            <div class="s-picker">
              <mt-picker :slots="[{values:typeDate2}]" valueKey="officename" @change="onZyjdChange"></mt-picker>
            </div>
            <div class="save" @click="onSave(2)">确定</div>
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <mt-cell title="专业基地" :value="firstName"></mt-cell>
            <mt-cell :title="firstName+'科室'" :value="secondName"></mt-cell>
            <div class="s-picker">
              <mt-picker :slots="popDate" valueKey="number" @change="onValuesChange"></mt-picker>
            </div>
            <div class="save" @click="onSave()">确定</div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
      
    </mt-popup>

   
  </div>
</template>

<script>
import mainHeader from "../../../components/mainHeader.vue";
import cycle from "../../../components/mecharts/cycle.vue";
import {
  queryStudentexamdata,
  queryStudentexamdataOffice,
  queryNotpassstudentdata
} from "../../../api/studentexame";
import moment from "moment";
import { Indicator,Header, Cell,Popup,Picker,Navbar,TabItem    } from "mint-ui";
export default {
  data() {
    return {
      allStudentlist:[],
      popDate: [
        {
          flex: 1,
          values: [String(new Date().getFullYear()) + "年"],
          className: "slot1",
          textAlign: "center"
        },
        {
          flex: 1,
          
          values: [
            {
              number: "12月",
              index: 0
            },
            {
              number: "11月",
              index: 1
            },
            {
              number: "10月",
              index: 2
            },
            {
              number: "9月",
              index: 3
            },
            {
              number: "8月",
              index: 4
            },
            {
              number: "7月",
              index: 5
            },
            {
              number: "6月",
              index: 6
            },
            {
              number: "5月",
              index: 7
            },
            {
              number: "4月",
              index: 8
            },
            {
              number: "3月",
              index: 9
            },
            {
              number: "2月",
              index: 10
            },
            {
              number: "1月",
              index: 11
            }
          ],
          className: "number",
          textAlign: "center"
        }
      ],
      selected1:'1',
      zyjdPopup:false,
        tabActionIndex:1,
      selected: "1",
      cyclewidth: "0.8rem",
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
      choice2Id: 5,
      choice2Number: "6",
      choice2Numbers: "6",
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
      moment: 5
    };
  },
  watch: {
      
    selected(val) {
      Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
      // Indicator.open("加载中...");
      // this.moment = moment().month() + 1;
      this.showSecond = true;
      this.showThird = true;
      this.openList = false;
      // this.choice2Number = moment().month() + 1;
      // this.thirdName = moment().month() + 1 + "月";
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
        // this.singlenumber = parseInt(
        //   JSON.parse(res).studentexamdata.lltgl2 * 100
        // );
        // this.showcycle = true;
        // this.typeDate1 = JSON.parse(res).majorlist;
        // this.firstName = JSON.parse(res).majorlist[0].majorname;
        if (JSON.parse(res).majorlist[0].officelist.length == 0) {
          console.log("暂无数据");
        } else {
          // this.typeDate2 = JSON.parse(res).majorlist[0].officelist;
          // this.secondName = JSON.parse(
          //   res
          // ).majorlist[0].officelist[0].officename;
          // this.choice1Name = JSON.parse(
          //   res
          // ).majorlist[0].officelist[0].officename;
          // this.secondId = JSON.parse(res).majorlist[0].officelist[0].officeid;
          // this.choice1Id = JSON.parse(res).majorlist[0].officelist[0].officeid;
          // this.firstId = JSON.parse(res).majorlist[0].majorsubjectid;
          // console.log('this.choice2Number',this.choice2Number)
          // queryStudentexamdataOffice(
          //   JSON.parse(res).majorlist[0].officelist[0].officeid,
          //   val,
          //   this.choice2Number
          // ).then(res => {
          //   this.singlelistData = JSON.parse(res).officestudentexamdatalist;
          //   this.singlelistData2 = JSON.parse(res).officefinishtscorelist;
          //    this.getAllStudentList(this.singlelistData2)
          //   Indicator.close();
          // });
        }
        Indicator.close();
      });
    }
  },
  methods: {
    onZyjdChange(p, v) {
      console.log(!v[0]);
      if (v[0]) {
        console.log(12312)
        this.choice1(p.getValues()[0].officeid,p.getValues()[0].officename)
        this.slectType();
      }
    },
    onValuesChange(p, v) {
      //s改变
      console.log('onValuesChange',p.getValues());
      this.choice2(p.getValues()[1].index, p.getValues()[1].number);
      this.slectType();
    },
    openPopup(val) {
      this.zyjdPopup = true;
      this.selected1 = String(val);
    },
  
    onSave(val) {
       if(val){
         if(val == 2){
         this.selected1 = '3'
      }
      }else{
        this.zyjdPopup = false;
        
      }
      this.slectType();
    },
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
                 this.getAllStudentList(this.singlelistData2)
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
               this.getAllStudentList(this.singlelistData2)
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
            this.getAllStudentList(this.singlelistData2)
                console.log(this.singlelistData2);
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
      Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
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
        Indicator.close();
        this.singlelistData = JSON.parse(res).officestudentexamdatalist;
        this.singlelistData2 = JSON.parse(res).officefinishtscorelist;
         this.getAllStudentList(this.singlelistData2)
         //判断当前筛选位置
          if(this.selected1 == 1){
            this.selected1 = '2'
          }else if(this.selected1 == 2){
            this.selected1 = '3'

          }
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
    getAllStudentList(arr){
       let list = []
      if(arr.length == 0){
        this.allStudentlist = list
      }else{
         for (let index = 0; index < arr.length; index++) {
        for (let n = 0; n < arr[index].studentlist.length; n++) {
          list.push(arr[index].studentlist[n])
          
        }
      }
      this.allStudentlist = list
      }
     
      
      
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
                this.getAllStudentList(this.singlelistData2)
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
                 this.getAllStudentList(this.singlelistData2)
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
                 this.getAllStudentList(this.singlelistData2)
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
             this.getAllStudentList(this.singlelistData2)
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
    
    for (let index = 0; index < this.popDate[1].values.length; index++) {
      if( this.moment ==  this.popDate[1].values[index].number.substr(0,this.popDate[1].values[index].number.length -1)){
        this.$set( this.popDate[1],'defaultIndex',index)
    }
    console.log( this.moment ==  this.popDate[1].values[index].number.substr(0,this.popDate[1].values[index].number.length -1))
    }
    
  },
  created() {
    if (moment().date() < 20) {
      if (moment().month() == 0) {
        this.moment = 7;
      } else {
        this.moment = moment().month();
      }
    } else {
      this.moment = moment().month() + 1;
    }
    
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
         
        // queryStudentexamdataOffice(
        //   JSON.parse(res).majorlist[0].officelist[0].officeid,
        //   1,
        //   this.moment
        // ).then(res => {
        //   // console.log(JSON.parse(res));
        //   this.singlelistData = JSON.parse(res).officestudentexamdatalist;
        //   this.singlelistData2 = JSON.parse(res).officefinishtscorelist;
        // });
      }
    });
  },
  components: {
    "header-main": mainHeader,
    cycle,
    Header, Cell,Popup,Picker,Navbar,TabItem
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
.screen-tap-box{
  width: 3.3rem;
  margin: 0.1rem auto;
  .screen-tap{
    display: inline-block;
    padding: 0.05rem 0.1rem;
    background:rgba(255,255,255,1);
    border-radius:0.03rem;
    border:0.01rem solid rgba(0,150,193,1);
  margin-right: 0.08rem;
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

.main-box{
  margin-top: 0.54rem;
}
.tab-page-btn{
  margin: 0 auto;
  line-height: 0.44rem;
  border-radius: 10px;
  width: 2.98rem;
    font-size:0.15rem;
    font-weight:bold;
    color:rgba(0,150,193,1);
  span{
    width: 1.46rem;
    display: inline-block;
    text-align: center;
    border-top: 2px solid #0096c1;
    border-bottom: 2px solid #0096c1;
    background: #FFF;
  }
}
 .tab-action{
  background: rgba(0,150,193,1) !important;
  color: #FFF;
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
  font-size: 0.15rem;
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


</style>
