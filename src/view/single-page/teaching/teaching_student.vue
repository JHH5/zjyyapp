<template>
  <div class="teaching-student">
    <mt-header fixed title="带教学员">
      <router-link to slot="left">
        <mt-button icon="back" @click="$router.back(-1)"></mt-button>
      </router-link>
    </mt-header>
    <div class="main-box">
      <mt-cell
        title="选择专业基地"
        is-link
        @click.native="openPopup(1)"
        :value="alltype[firstId].majorname"
      ></mt-cell>
      <mt-cell title="选择科室" is-link @click.native="openPopup(2)" :value="secondName"></mt-cell>
      <mt-cell
        title="选择时间"
        is-link
        @click.native="openPopup(3)"
        :value="String(new Date().getFullYear())+'年'+choice2Number+'月'"
      ></mt-cell>
      <div class="main-content">
        <div class="nav-bar">
          <p class="main-title">
            {{firstName}}
            <span v-show="showSecond">{{secondName}}</span>
          </p>
          <p
            class="main-title-sub"
            v-show="showThird"
          >{{String(new Date().getFullYear())+'年'}}{{thirdName}}</p>
        </div>
        <div class="main-table" v-if="tableData">
          <ul>
            <li>教师</li>
            <li>副主任医师</li>
            <li>
              <p>学生姓名</p>
            </li>
          </ul>
          <ul v-for="(item, index) in tableData" :key="index">
            <li>{{item.personname}}</li>
            <li
              :style="'line-height: '+(0.44 *(item.studentlist.length == 0 ? 1 :item.studentlist.length)) +'rem;'"
            >{{item.professionaltitle}}</li>
            <li v-if="item.studentlist.length != 0">
              <p
                v-for="(student,index) in item.studentlist"
                :key="index"
                :style="item.studentlist.length > 1 &&index != (item.studentlist.length-1)?'border-bottom: 2px solid #f0f0f7;':''"
              >{{student.personname}}</p>
            </li>
            <li v-else>
              <p style="color:#999">暂无</p>
            </li>
          </ul>
        </div>
        <p v-else style="line-height: 1rem;text-align: center;font-size: 12px;color: #999;">暂无数据</p>
      </div>
    </div>
    <mt-popup v-model="zyjdPopup" position="bottom">
      <div class="popup-box">
        <div class="popup-close" @click="zyjdPopup = false">
          <img src="@/assets/images/close.png" alt />
        </div>
        <div class="popup-nav">
          <mt-navbar v-model="selected">
            <mt-tab-item id="1">专业基地</mt-tab-item>
            <mt-tab-item id="2">所属科室</mt-tab-item>
            <mt-tab-item id="3">选择时间</mt-tab-item>
          </mt-navbar>
        </div>
        <div style="width:3.75rem;height:0.01rem;background:rgba(242,242,243,1);margin-top:0.1rem"></div>

        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <ul class="popup-down-items">
              <li
                :class="firstId == index ? 'popup-down-action':''"
                v-for="(item, index) in alltype"
                :key="index"
                @click="handleFirst(index,item.majorname,item.officelist[0].officeid,item.officelist[0].name)"
              >{{item.majorname}}</li>
            </ul>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <mt-cell title="专业基地" :value="alltype[firstId].majorname"></mt-cell>
            <mt-cell :title="alltype[firstId].majorname+'科室'" :value="secondName"></mt-cell>
            <div class="s-picker">
              <mt-picker :slots="[{values:typeData}]" defaultIndex="0" valueKey="officename" @change="onZyjdChange"></mt-picker>
            </div>
            <div class="save" @click="onSave(2)">确定</div>
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <mt-cell title="专业基地" :value="alltype[firstId].majorname"></mt-cell>
            <mt-cell :title="alltype[firstId].majorname+'科室'" :value="secondName"></mt-cell>
            <div class="s-picker">
              <!-- <mt-picker :slots="dateSlots" @change="onValuesChange"></mt-picker> -->
              <mt-picker :slots="popDate" valueKey="number"  :defaultIndex="new Date().getMonth()" @change="onValuesChange"></mt-picker>
            </div>
            <div class="save" @click="onSave()">确定</div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </mt-popup>
    <!-- 老版本 -->
    <!-- <header-main :message="'带教学员'"></header-main> -->
    <!-- <div class="teaching_student">
      <div style="background:#f0f0f7; text-align: center;border-radius: 5px 5px 0px 0px;">
        <u>专业基地</u>
      </div>
      <div id="teachingtop" :style="!openList ?'height: 0.68rem':'height: auto'" class="top">
        <p
          @click="handleFirst(index,item.majorname,item.officelist[0].officeid,item.officelist[0].name)"
          :style="firstId == index ? 'color: #277FFF;':'color: #212121;'"
          v-for="(item, index) in alltype"
          :key="index"
        >{{item.majorname}}</p>
        <div class="open">
          <div class="flex" v-show="!openList" @click="handleOpenList(1)">
            <p>展开</p>
            <img src="../../../assets/images/downarrow.png" alt />
          </div>
          <div class="flex" @click="handleOpenList(2)" v-show="openList">
            <p>收起</p>
            <img src="../../../assets/images/uparrow.png" alt />
          </div>
        </div>
      </div>
      <div class="middle">
        <div v-show="showSecond" class="single">
          <p>{{secondName}}</p>
          <img @click="closeSecond()" src="../../../assets/images/blueclose.png" alt />
        </div>
        <div v-show="showThird" class="single">
          <p>{{thirdName}}</p>
          <img @click="closeThird()" src="../../../assets/images/blueclose.png" alt />
        </div>
        <div class="right">
          <p>筛选</p>
          <img @click="selectWindow = true" src="../../../assets/images/todaywork/select.png" alt />
        </div>
      </div>
      <div class="end">
        <div class="end_top">
          <p>
            {{firstName}}
            <span v-show="showSecond">-{{secondName}}</span>
            <span v-show="showThird">-{{thirdName}}</span>
          </p>
        </div>
        <div class="end_end">
          <div class="end_th">
            <p>带教老师</p>
            <p>带教学员</p>
          </div>
          <div class="endtable">
            <div v-for="(item, index) in tableData" :key="index" class="end_td">
              <p>{{item.personname}} {{item.professionaltitle}}</p>
              <p>
                <span v-for="(student,index) in item.studentlist" :key="index">
                  {{student.personname}}
                  <br />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="selectWindow" class="select_main">
      <div @click="hideWindow()" style="height: 100%;width: 1.75rem;" class="select_window_black"></div>
      <div class="select_window">
        <div class="select_window_main">
          <div class="select_window_first">
            <p class="title">{{firstName}}科室：</p>
            <div class="flex">
              <p
                @click="choice1(index,item2.officename,item2.officeid)"
                :style="item2.officename.length>6?'line-height: 0.13rem;':''"
                :class="choice1Id == index ? 'active':'less'"
                v-for="(item2, index) in typeData"
                :key="index"
              >{{item2.officename}}</p>
            </div>
          </div>
          <div class="select_window_third">
            <p class="title">选择时间：</p>
            <div class="flex2">
              <p
                @click="choice2(index,item3.number)"
                :class="choice2Id == index ? 'active':'less'"
                v-for="(item3, index) in typeDate3"
                :key="index"
              >20/{{item3.number}}</p>
            </div>
          </div>
        </div>
        <div @click="slectType()" class="select_window_btn">
          <p>确定</p>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
import mainHeader from "../../../components/mainHeader.vue";
import moment from "moment";
import {
  queryMajormanageOffice,
  queryTeacherTeachingdata
} from "../../../api/teaching";
import {Indicator,Header, Cell, Popup, Picker, Navbar, TabItem } from "mint-ui";
export default {
  data() {
    return {
      dateSlots: [
        {
          flex: 1,
          values: ["2018年", "2019年", "2020年", "2021年"],
          className: "slot1",
          textAlign: "right"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "0月",
            "11月",
            "12月"
          ],
          className: "slot3",
          textAlign: "left"
        }
      ],
      popDate: [
        {
          flex: 1,
          values: [String(new Date().getFullYear()) + "年"],
          className: "slot1",
          textAlign: "center"
        },
        {
          flex: 1,
          defaultIndex:6,
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
      moment:6,
      selected: "1",
      zyjdPopup: false,
      selectWindow: false,
      openList: false,
      firstName: "内科",
      firstId: 0,
      secondName: "呼吸科",
      secondId: 0,
      thirdName: "6月",
      thirdId: 0,
      choice1Name: "呼吸科",
      choice1Id: 0,
      choice2Name: "6月",
      choice2Id: 6,
      choice2Number: "6",
      choice2Numbers: "6",
      showSecond: true,
      showThird: true,
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
      typeDate2: [
        {
          title: "呼吸科"
        },
        {
          title: "感染科"
        },
        {
          title: "心内科"
        },
        {
          title: "消化科"
        },
        {
          title: "内分泌科"
        },
        {
          title: "血液科"
        },
        {
          title: "肾内科"
        },
        {
          title: "风湿科"
        },
        {
          title: "重症医学科"
        },
        {
          title: "滨江合ICU"
        },
        {
          title: "脑科重症医学科"
        },
        {
          title: "外科重症医学科"
        },
        {
          title: "肿瘤内科"
        },
        {
          title: "干部保健科"
        }
      ],
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
      typeData: "",
      alltype: "",
      tableData: [],
      valueId: 0,
      valueIds: 0
    };
  },
  mounted(){
     if (moment().date() < 20) {
      if (moment().month() == 0) {
        this.moment = 6;
      } else {
        this.moment = moment().month();
      }
    } else {
      this.moment = moment().month() + 1;
    }
    this.years = moment().year();
  },
  methods: {
    onZyjdChange(p, v) {
       
      // console.log(p.getValues());
      if (p.getValues()[0]) {
        this.choice1(
          p.getValues()[0].index,
          p.getValues()[0].officename,
          p.getValues()[0].officeid
        );
        this.slectType();
      }
    },
    onValuesChange(p, v) {
      //s改变
      // console.log(p.getValues());
      // p.setSlotValue(1, 0)
      this.choice2(p.getValues()[1].index, p.getValues()[1].number);
      this.slectType();
    },
    openPopup(val) {
      this.zyjdPopup = true;
      this.selected = String(val);
    },

    onSave(val) {
      if(val){
         if(val == 2){
         this.selected = '3'
      }
      }else{
        this.zyjdPopup = false;
        
      }
      this.slectType();
     
      
    },
    slectType() {
      Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
      this.secondName = this.choice1Name;
      this.thirdName = this.choice2Name;
      this.secondId = this.choice1Id;
      this.thirdId = this.choice2Id;
      this.choice2Numbers = this.choice2Number;
      this.selectWindow = false;
      this.valueId = this.valueIds;
      // console.log(this.choice1Id,this.choice2Id);
      if (this.choice1Id == 99 && this.choice2Id == 99) {
        queryMajormanageOffice(this.firstName).then(res => {
          console.log(JSON.parse(res));
          var adds = "";
          for (
            let i = 0;
            i < JSON.parse(res).majorlist[0].officelist.length;
            i++
          ) {
            adds += JSON.parse(res).majorlist[0].officelist[i].officeid + ",";
          }
          // console.log(adds.slice(0,adds.length-1));
          queryTeacherTeachingdata(adds.slice(0, adds.length - 1), " ").then(
            res => {
              // console.log(res);
              this.tableData = JSON.parse(res).teachingdatalist;
              Indicator.close();
            }
          );
        });
      } else {
        if (this.choice1Id == 99) {
          queryMajormanageOffice(this.firstName).then(res => {
            // console.log(JSON.parse(res));
            var adds = "";
            for (
              let i = 0;
              i < JSON.parse(res).majorlist[0].officelist.length;
              i++
            ) {
              adds += JSON.parse(res).majorlist[0].officelist[i].officeid + ",";
            }
            // console.log(adds.slice(0,adds.length-1));
            queryTeacherTeachingdata(
              adds.slice(0, adds.length - 1),
              this.choice2Number
            ).then(res => {
              // console.log(res);
              this.tableData = JSON.parse(res).teachingdatalist;
              Indicator.close();
            });
          });
        } else if (this.choice2Id == 99) {
          queryTeacherTeachingdata(this.valueId, " ").then(res => {
            this.tableData = JSON.parse(res).teachingdatalist;
            Indicator.close();
          });
        } else {
          queryTeacherTeachingdata(this.valueId, this.choice2Number).then(
            res => {
              this.tableData = JSON.parse(res).teachingdatalist;
              Indicator.close();
            }
          );
        }
      }
      if (this.secondId != 99) {
        this.showSecond = true;
      }
      if (this.thirdId != 99) {
        this.showThird = true;
      }
    },
    choice1(id, name, ids) {
      //筛选框里的科室
      (this.choice1Id = id), (this.choice1Name = name), (this.valueIds = ids);
      // alert("choice1");
    },
    choice2(id, name) {
      //筛选框里的日期
      (this.choice2Id = id), (this.choice2Name = name);
      if (name.length > 2) {
        this.choice2Number = name.slice(0, 2);
      } else {
        this.choice2Number = "0" + name.slice(0, 1);
        // aler("what");
      }
    },
    handleOpenList(_index) {
      if (_index == 1) {
        this.openList = true;
      } else {
        this.openList = false;
      }
    },
    handleFirst(id, name, ids, secendname) {
      Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
      // (this.firstName = name),
      (this.firstId = id),
        (this.secondName = secendname),
        (this.choice1Name = secendname),
        (this.valueId = ids),
        (this.choice2Number = "6"),
        (this.thirdName = "6月"),
        (this.choice2Name = "6月"),
        (this.secondId = 0),
        (this.choice1Id = 0),
        (this.choice2Id = 0),
        (this.thirdId = 0),
        (this.showThird = true),
        (this.showSecond = true),
        queryMajormanageOffice(name).then(res => {

          if(JSON.parse(res).majorlist.length > 0){
             let typeData = JSON.parse(res).majorlist[0].officelist.filter(n => n);
            console.log(typeData)
          
          for (let index = 0; index < typeData.length; index++) {
               typeData[index].index = index;
          }
          this.typeData = typeData;
          
          //判断当前筛选位置
          if(this.selected == 1){
            this.selected = '2'
          }else if(this.selected == 2){
            this.selected = '3'

          }
          }
         Indicator.close();
          // console.log(JSON.parse(res));
        })
      queryTeacherTeachingdata(ids, 6).then(res => {
        // console.log(res);
        this.tableData = JSON.parse(res).teachingdatalist;
      });
    },
    hideWindow() {
      this.choice1Id = this.secondId;
      this.choice2Id = this.thirdId;
      this.choice1Name = this.secondName;
      this.choice2Name = this.thirdName;
      this.choice2Number = this.choice2Numbers;
      this.valueIds = this.valueId;
      // this.valueId = 0
      // this.valueId = 0
      this.selectWindow = false;
    },
    closeSecond() {
      (this.secondId = 99), (this.choice1Id = 99), (this.showSecond = false);
      if (this.showThird == false) {
        queryMajormanageOffice(this.firstName).then(res => {
          // console.log(JSON.parse(res));
          var adds = "";
          for (
            let i = 0;
            i < JSON.parse(res).majorlist[0].officelist.length;
            i++
          ) {
            adds += JSON.parse(res).majorlist[0].officelist[i].officeid + ",";
          }
          // console.log(adds.slice(0,adds.length-1));
          queryTeacherTeachingdata(adds.slice(0, adds.length - 1), " ").then(
            res => {
              // console.log(res);
              this.tableData = JSON.parse(res).teachingdatalist;
            }
          );
        });
      } else {
        queryMajormanageOffice(this.firstName).then(res => {
          // console.log(JSON.parse(res));
          var adds = "";
          for (
            let i = 0;
            i < JSON.parse(res).majorlist[0].officelist.length;
            i++
          ) {
            adds += JSON.parse(res).majorlist[0].officelist[i].officeid + ",";
          }
          // console.log(adds.slice(0,adds.length-1));
          queryTeacherTeachingdata(
            adds.slice(0, adds.length - 1),
            this.choice2Number
          ).then(res => {
            // console.log(res);
            this.tableData = JSON.parse(res).teachingdatalist;
          });
        });
      }

      // queryTeacherTeachingdata(this.valueId,this.choice2Number).then(res => {
      //   // console.log(res);
      //   this.tableData = JSON.parse(res).teachingdatalist
      // })
    },
    closeThird() {
      (this.choice2Id = 99), (this.thirdId = 99), (this.showThird = false);
      if (this.showSecond == false) {
        queryMajormanageOffice(this.firstName).then(res => {
          // console.log(JSON.parse(res));
          var adds = "";
          for (
            let i = 0;
            i < JSON.parse(res).majorlist[0].officelist.length;
            i++
          ) {
            adds += JSON.parse(res).majorlist[0].officelist[i].officeid + ",";
          }
          // console.log(adds.slice(0,adds.length-1));
          queryTeacherTeachingdata(adds.slice(0, adds.length - 1), " ").then(
            res => {
              // console.log(res);
              this.tableData = JSON.parse(res).teachingdatalist;
            }
          );
        });
      } else {
        queryTeacherTeachingdata(this.valueId, " ").then(res => {
          // console.log(res);
          this.tableData = JSON.parse(res).teachingdatalist;
        });
      }
    }
  },

  created() {
    queryMajormanageOffice("").then(res => {
      let majorlist = JSON.parse(res).majorlist;
      // console.log(JSON.parse(res).majorlist);
      this.alltype = majorlist;
      this.firstName = JSON.parse(res).majorlist[0].majorname;
      console.log(this.firstName);
      this.secondName = JSON.parse(res).majorlist[0].officelist[0]
        ? JSON.parse(res).majorlist[0].officelist[0].name
        : "未知";
      // console.log(JSON.parse(res).majorlist[0]);
      if ((JSON.parse(res).majorlist[0].officelist = [])) {
        console.log("暂无数据");
      } else {
        this.choice1Name = JSON.parse(res).majorlist[0].officelist[0].name;
        this.typeData = JSON.parse(res).majorlist[0].officelist;
        this.valueId = JSON.parse(res).majorlist[0].officelist[0].officeid;
      }

      queryTeacherTeachingdata(this.valueId, "6").then(res => {
        // console.log(JSON.parse(res));
        this.tableData = JSON.parse(res).teachingdatalist;
      });
      // console.log(this.alltype);
      // console.log(JSON.parse(res).majorlist[0]);
    });
   
  },
  components: {
    // "header-main": mainHeader
    "mt-header": Header,
    "mt-cell": Cell,
    "mt-popup": Popup,
    "mt-picker": Picker,
    "mt-navbar": Navbar,
    "mt-tabitem": TabItem
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

.main-content {
  width: 3.45rem;
  margin: 0 auto;
  margin-top: 0.15rem;
  background: #fff;
  .nav-bar {
    height: 0.64rem;
    background: rgba(0, 150, 193, 1);
    border-radius: 0.06rem 0.06rem 0rem 0rem;
    color: #fff;
    padding-top: 1px;
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
      color: rgba(255, 255, 255, 1);
      line-height: 0.16rem;
    }
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
}
.main-box {
  margin-top: 0.44rem;
  padding-bottom: 1rem;
}
/deep/ .mint-cell-value.is-link {
  margin-right: 0.05rem;
}
/deep/ .mint-cell-wrapper {
  padding: 0rem 0.3rem;
}
.mint-cell {
  border-bottom: 1px solid #f2f2f3;
}
.teaching-student {
  background: rgba(242, 242, 243, 1);
  min-height: 100vh;
  padding-top: 1px;
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
//老版本
.teaching_student {
  position: absolute;
  width: 3.55rem;
  // margin: 0 auto;
  // border-radius: 5px 5px 0px 0px;
  left: 0;
  right: 0;
  margin: auto;

  .top {
    background: #f0f0f7;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: wrap;
    // padding-top: 0.15rem;
    padding-bottom: 0.08rem;
    // border-radius: 5px 5px 0px 0px;
    padding-left: 0.05rem;

    overflow: hidden;
    position: relative;

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
      color: #277fff;
      position: absolute;
      right: 0.05rem;
      bottom: 0.1rem;

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
        width: 0.5rem;
        background: #f0f0f7;
        padding-left: 0.1rem;
      }
    }
  }

  .middle {
    display: flex;
    align-items: center;
    height: 0.45rem;
    background: #ffffff;
    padding-left: 0.15rem;
    padding-right: 0.15rem;
    border-bottom: 1px solid #f0f0f7;

    .single {
      display: flex;
      align-items: center;
      background: rgba(39, 127, 255, 0.15);
      border-radius: 2px;
      border-radius: 2px;
      padding-left: 0.05rem;
      padding-top: 0.04rem;
      padding-bottom: 0.04rem;
      margin-right: 0.1rem;

      p {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #277fff;
        letter-spacing: 0;
        margin-right: 0.05rem;
        // line-height: 18px;
      }

      img {
        width: 0.1rem;
        height: 0.1rem;
        margin-right: 0.05rem;
      }
    }

    .right {
      display: flex;
      align-items: center;
      margin-left: auto;

      p {
        font-family: PingFangSC-Regular;
        font-size: 0.15rem;
        color: #474c63;
        letter-spacing: 0;
        text-align: right;
        // line-height: 15px;
      }

      img {
        width: 0.16rem;
        height: 0.16rem;
        margin-left: 0.05rem;
      }
    }
  }

  .end {
    background: #ffffff;
    padding-top: 0.09rem;
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
          // height: 0.35rem;
          // line-height: 0.35rem;
          width: 1.61rem;
          text-align: center;
        }
      }
    }
  }
}

.endtable {
  overflow: auto;
  height: 4rem;
}

.select_main {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;

  .select_window {
    width: 2rem;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    background: #ffffff;

    .select_window_main {
      margin-top: 0.15rem;
      margin-left: 0.15rem;
      margin-right: 0.13rem;

      .title {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #212121;
        letter-spacing: 0;
        line-height: 0.18rem;
        margin-bottom: 0.15rem;
      }

      .flex {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        p {
          font-family: PingFangSC-Regular;
          font-size: 0.13rem;
          color: #212121;
          letter-spacing: 0;
          // line-height: 0.18rem;
          height: 0.18rem;
          background: #f0f0f7;
          border-radius: 2px;
          border-radius: 2px;
          // padding-top: 0.04rem;
          // padding-bottom: 0.06rem;
          // padding-left: 0.08rem;
          // padding-right: 0.08rem;
          // margin-right: 0.1rem;
          margin-bottom: 0.1rem;
          width: 0.8rem;
          height: 0.28rem;
          line-height: 0.28rem;
          text-align: center;
        }

        .active {
          background: rgba(33, 135, 255, 0.15);
          color: #2187ff;
        }
      }

      .select_window_first {
        margin-bottom: 0.1rem;
        border-bottom: 1px solid #f0f0f7;
      }

      .select_window_second {
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
        border-top: 1px solid #f0f0f7;
        border-bottom: 1px solid #f0f0f7;
      }

      .select_window_third {
        margin-top: 0.15rem;

        .flex2 {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;

          p {
            font-family: PingFangSC-Regular;
            font-size: 0.13rem;
            color: #212121;
            letter-spacing: 0;
            // line-height: 0.18rem;
            height: 0.18rem;
            background: #f0f0f7;
            border-radius: 2px;
            border-radius: 2px;
            // padding-top: 0.04rem;
            // padding-bottom: 0.06rem;
            // padding-left: 0.08rem;
            // padding-right: 0.08rem;
            // margin-right: 0.1rem;
            margin-bottom: 0.1rem;
            width: 0.5rem;
            height: 0.28rem;
            line-height: 0.28rem;
            text-align: center;
          }

          .active {
            background: rgba(33, 135, 255, 0.15);
            color: #2187ff;
          }
        }
      }
    }

    .select_window_btn {
      width: 1.6rem;
      height: 0.4rem;
      background: #277fff;
      border-radius: 20px;
      border-radius: 20px;
      display: block;
      margin: 0 auto;
      position: absolute;
      bottom: 0.2rem;
      right: 0.2rem;
      left: 0.2rem;

      p {
        font-family: PingFangSC-Regular;
        font-size: 0.16rem;
        color: #ffffff;
        letter-spacing: 0;
        line-height: 0.4rem;
        text-align: center;
      }
    }
  }
}
</style>