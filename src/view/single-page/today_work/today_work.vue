<template>
  <div>
    <mt-header fixed title="今日直通">
      <router-link to="" slot="left">
        <mt-button icon="back" @click="$router.back(-1)"></mt-button>
      </router-link>
    </mt-header>
    <div class="filter-boxs">
      <ul class="filter-list">
        <li @click="onOpneColseFilter(1)">
          工作类型
          <img v-if="filterPopType == 2" src="@/assets/images/todaywork/t.png" alt />
          <img v-if="filterPopType == 1" src="@/assets/images/todaywork/d.png" alt />
        </li>
        <li @click="onOpneColseFilter(2)">
          完成状态
          <img v-if="filterPopStatus == 2" src="@/assets/images/todaywork/t.png" alt />
          <img v-if="filterPopStatus != 2" src="@/assets/images/todaywork/d.png" alt />
        </li>
        <li @click="selectThird(thirdid == 1?2:1)">
          时间排序
          <img
            v-if="thirdid == 1"
            src="@/assets/images/todaywork/p.png"
            alt
            style="width: 0.08rem; height: 0.16rem;vertical-align: middle;display: inline-block; margin-left: 0.01rem;"
          />
          <img
            v-if="thirdid == 2"
            src="@/assets/images/todaywork/np.png"
            alt
            style="width: 0.08rem; height: 0.16rem;vertical-align: middle;display: inline-block; margin-left: 0.01rem;"
          />
        </li>
      </ul>
      <div class="pop-down" @click="onColseFilter" v-show="isFilterPop">
        <ul class="pop-down-items" v-if="filterPopNumber == 1">
          <li :class="firstid == item.ids ? 'pop-down-action':''" v-for="(item, index) in selecttab" :key="index" @click="selectFirst(item.ids,item.name)">{{item.name}}</li>
        </ul>
        <ul class="pop-down-items" v-if="filterPopNumber == 2">
          <li :class="secoendname == '全部' ? 'pop-down-action':''" @click="selectSecond('全部')">全部</li>
          <li :class="secoendname == '已完成' ? 'pop-down-action':''" @click="selectSecond('已完成')">已完成</li>
          <li :class="secoendname == '进行中' ? 'pop-down-action':''" @click="selectSecond('进行中')">进行中</li>
          <li :class="secoendname == '未开始' ? 'pop-down-action':''" @click="selectSecond('未开始')">未开始</li>
      
        </ul>
    
      </div>
    </div>
    <div class="main-boxs" >
      <div class="main-item" v-for="(item, index) in tabledata" :key="index">
        <div class="main-item-top">
          <div class="main-item-top-left">
            <p class="main-item-title">{{item.title}}</p>
            <ul class="main-info">
              <li>
                <p class="main-info-title">开始时间</p>
                <p class="main-info-content">
                  <img src="@/assets/images/todaywork/date.png" alt />
                  {{ String(item.starttime).substring(0,String(item.starttime).length - 3)}}
                </p>
                <div class="hr-y"></div>
              </li>
              <li>
                <p class="main-info-title">参加人数</p>
                <p class="main-info-content">
                  <i></i>
                  {{item.cjrs}}
                </p>
                <div class="hr-y" v-if=" item.qdl != '不需要签到'"></div>
              </li>
              <li v-if="item.qdl != '不需要签到'">
                <p class="main-info-title">签到率</p>
                <p class="main-info-content">{{item.qdl}}</p>
              </li>
            </ul>
          </div>
          <div class="main-item-top-right">
            <img v-if="item.state == '已完成'" src="@/assets/images/todaywork/ywc.png" alt />
            <img v-if="item.state == '未开始'" src="@/assets/images/todaywork/wks.png" alt />
            <img v-if="item.state == '进行中'" src="@/assets/images/todaywork/jxz.png" alt />
          </div>
        </div>
        <div class="taps">
          <ul>
            <li class="taps-info">{{item.tasktype}}</li>
          </ul>
        </div>
        <div class="main-item-bottom">
          <img src="@/assets/images/todaywork/l.png" alt />
          <span>{{item.addressname}}</span>
        </div>
      </div>
    </div>

    <!-- 老版本 -->

    <!-- <header-main :message="'今日直通'"></header-main>
    <div class="todaywork">
      <div class="todaywork_top">
        <p class="title">今日工作</p>
        <p @click="handleSelect()" class="select">筛选</p>
        <img @click="handleSelect()" src="../../../assets/images/todaywork/select.png" alt />
      </div>
      
      <div style="width:100%;height:4rem;display:none">
        <p style="text-align: center; line-height: 4rem; color: #dddddd;">暂无数据</p>
      </div>
      <div v-show="realsecondname == '全部' ? 1:item.state == realsecondname" v-for="(item, index) in tabledata" :key="index" class="today_main">
        <div class="today_main_top">
          <p v-show="item.state == '已完成'" class="type1">已完成</p>
          <p v-show="item.state == '未开始'" class="type2">未开始</p>
          <p v-show="item.state == '进行中'" class="type3">进行中</p>
          <p class="name">{{item.title}}</p>
          <p class="right">{{item.tasktype}}</p>
        </div>
        <div class="today_main_middle">
          <img src="../../../assets/images/todaywork/addres.png" alt />
          <p>{{item.addressname}}</p>
        </div>
        <div class="today_main_end">
          <div class="end_first disalign">
            <img src="../../../assets/images/todaywork/time.png" alt />
            <p>{{item.starttime}}</p>
          </div>
          <div class="end_second disalign">
            <p>参加人数：</p>
            <p>{{item.cjrs}}</p>
          </div>
          <div class="end_third disalign">
            <p>签到率：</p>
            <p style="color: #2187FF;">{{item.qdl}}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-show="selectWindow" class="select_main">
      <div @click="closeWind()" style="height: 100%;width: 1.75rem;" class="select_window_black"></div>
      <div class="select_window">
        <div class="select_window_main">
          <div class="select_window_first">
            <p class="title">工作类型：</p>
            <div class="flex">
              <p :class="firstid == item.ids ? 'active':''" v-for="(item, index) in selecttab" :key="index" @click="selectFirst(item.ids,item.name)">{{item.name}}</p>
            </div>
          </div>
          <div class="select_window_second">
            <p class="title">完成状态：</p>
            <div class="flex">
              <p :class="secoendname == '全部' ? 'active':''" @click="selectSecond('全部')">全部</p>
              <p :class="secoendname == '已完成' ? 'active':''" @click="selectSecond('已完成')">已完成</p>
              <p :class="secoendname == '进行中' ? 'active':''" @click="selectSecond('进行中')">进行中</p>
              <p :class="secoendname == '未开始' ? 'active':''" @click="selectSecond('未开始')">未开始</p>
            </div>
          </div>
          <div class="select_window_third">
            <p class="title">时间排序：</p>
            <div class="flex">
              <p :class="thirdid == 1 ? 'active':''" @click="selectThird(1)">时间正序</p>
              <p :class="thirdid == 2 ? 'active':''" @click="selectThird(2)">时间倒序</p>
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
// import mainHeader from "../../../components/mainHeader.vue";
import { Header } from "mint-ui";
import { workToday } from "../../../api/main";
export default {
  data() {
    return {
      filterPopSort: 1,
      filterPopStatus: 1,
      filterPopType: 1,
      isFilterPop: false,
      filterPopNumber: 1,
      tabledata: [
        {
          name: "住培大纲“鼻咽部疾病”解读（一）",
          type: 1,
          dress: "1501会议室",
          time: "2019-08-26 08:20",
          people: "27",
          percent: "92.59%"
        },
        {
          name: "呼吸机的临床应用",
          type: 2,
          dress: "浙医二院1号楼9层外科ICU医生办公室",
          time: "2019-08-26 10:00",
          people: "4",
          percent: "100%"
        },
        {
          name: "肺多原发癌的诊治进展",
          type: 3,
          dress: "解放路2号楼4楼胸外科示教室",
          time: "2019-08-26 12:00",
          people: "10",
          percent: "80%"
        }
      ],
      selecttab: [
        {
          ids: 0,
          name: "全部"
        },
        {
          ids: 1,
          name: "理论培训"
        },
        {
          ids: 2,
          name: "技能培训"
        },
        {
          ids: 3,
          name: "小讲课"
        },
        {
          ids: 4,
          name: "病例讨论"
        },
        {
          ids: 5,
          name: "教学查房"
        },
        {
          ids: 7,
          name: "入科教育"
        },
        {
          ids: 9,
          name: "阅片会"
        },
        {
          ids: 10,
          name: "教学会诊"
        },
        {
          ids: 11,
          name: "读书报告"
        },
        {
          ids: 12,
          name: "岗前培训"
        },
        {
          ids: 13,
          name: "会议"
        },
        {
          ids: 14,
          name: "师资培训"
        },
        {
          ids: 99,
          name: "考试"
        }
      ],
      selectWindow: false,
      realfirstid: 0,
      realsecondname: "全部",
      realthirdid: 1,
      firstid: 0,
      secoendname: "全部",
      thirdid: 1,
      thirdname: "全部",
      selectname: "全部"
    };
  },
  methods: {
    onColseFilter(){
      this.isFilterPop = false
       this.filterPopType = 1;
        this.filterPopStatus = 1;
    },
    //打开or关闭筛选pop
    onOpneColseFilter(val) {
      if(val != 3){
           if (val == 1) {
              if (!this.isFilterPop) {
                this.filterPopType = 2;
                this.filterPopStatus = 1;
              } else {
                this.filterPopType = 1;
                this.filterPopStatus = 1;
              }
            }
            if (val == 2) {
              if (!this.isFilterPop) {
                this.filterPopType = 1;
                this.filterPopStatus = 2;
              } else {
                this.filterPopType = 1;
                this.filterPopStatus = 1;
              }
            }

            if(this.filterPopNumber != val){
              if (val == 1) {
              if (this.isFilterPop) {
                this.filterPopType = 2;
                this.filterPopStatus = 1;
              }
            }
            if (val == 2) {
              if (!this.isFilterPop) {
                this.filterPopType = 1;
                this.filterPopStatus = 2;
              } else {
                this.filterPopType = 1;
                this.filterPopStatus = 1;
              }
            }
            }

            this.filterPopNumber = val;
            this.isFilterPop = !this.isFilterPop;
      }else{
        //排序
        
      }
     
    },
    slectType() {
      this.canScroll();
      this.selectWindow = false;
      this.realfirstid = this.firstid;
      this.realsecondname = this.secoendname;
      this.realthirdid = this.thirdid;
      this.thirdname = this.selectname;
      if (this.thirdid == 1) {
        workToday("", this.firstid).then(res => {
          this.tabledata = JSON.parse(res).worktodaylist;
        });
      } else {
        workToday("desc", this.firstid).then(res => {
          this.tabledata = JSON.parse(res).worktodaylist;
        });
      }
    },
    closeWind() {
      this.firstid = this.realfirstid;
      this.secoendname = this.realsecondname;
      this.thirdid = this.realthirdid;
      this.selectWindow = false;
      this.canScroll();
    },
    selectFirst(id, name) {
      (this.firstid = id), (this.selectname = name);
      this.slectType()
    },
    selectSecond(name) {
      this.secoendname = name;
     this.slectType()
    },
    selectThird(id) {
      this.thirdid = id;
     this.slectType()
    },
    handleSelect() {
      this.noScroll();
      this.selectWindow = true;
      
    }
  },
  mounted() {
    workToday("", "", "").then(res => {
      this.tabledata = JSON.parse(res).worktodaylist;
    });
  },
  components: {
    // "header-main": mainHeader
    "mt-header": Header
  }
};
</script>

<style lang="less" scoped>
.main-item-bottom {
  height: 0.18rem;
  font-size: 0.13rem;
  font-weight: 400;
  color: rgba(89, 89, 89, 1);
  line-height: 0.18rem;
  margin-left: 0.25rem;
  margin-top: 0.1rem;
  img {
    width: 0.16rem;
    height: 0.16rem;
    vertical-align: middle;
    display: inline-block;
    margin-right: 0.05rem;
  }
}
.taps {
  margin-top: 0.1rem;
  margin-left: 0.25rem;
}
.taps-info {
  width: 0.7rem;
  text-align: center;
  border-radius: 0.03rem;
  border: 0.01rem solid #0096c1;
  font-size: 0.13rem;
  color: rgba(0, 150, 193, 1);
  line-height: 0.18rem;
}
.main-item-top {
  position: relative;
}
.main-item-top-right {
  background-color: #eee;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 5px;
  position: absolute;
  right: 0.2rem;
  top: 0.35rem;
}
.main-item-top-right img {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 5px;
}
.hr-y {
  width: 0.02rem;
  height: 0.3rem;
  background: rgba(242, 242, 243, 1);
  position: absolute;
  right: 0;
  top: 0.06rem;
}
.main-info-title {
  font-size: 0.13rem;
  color: rgba(140, 140, 140, 1);
  line-height: 0.18rem;
  margin-bottom: 0.05rem;
}
.main-info-content {
  font-size: 0.13rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  line-height: 0.18rem;
  img {
    width: 0.16rem;
    height: 0.16rem;
    vertical-align: middle;
    display: inline-block;
    margin-right: 0.01rem;
  }
}
.main-info li {
  display: inline-block;
  text-align: center;
  position: relative;
  width: 0.8rem;
}
.main-info {
  margin-top: 0.1rem;
  margin-left: 0.1rem;
}
.main-item-title {
  font-size: 0.17rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  line-height: 0.24rem;
  margin-left: 0.25rem;
  margin-top: 0.15rem;
}
.pop-down {
  position: absolute;
  height: 100vh;
  width: 3.75rem;
  background: #fff;
  top: 0.6rem;
  z-index: 999;
  background: rgba(0, 0, 0, 0.1);
}
// .pop-down{
//   position: absolute;
//   min-height: 1.4rem;
//   width: 3.75rem;
//   background: #FFF;
//   border-bottom-right-radius: 10px;
//   border-bottom-left-radius: 10px;
// }
.pop-down-items {
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
.pop-down-items li {
  width: 0.8rem;
  line-height: 0.44rem;
  text-align: center;
  border-radius: 0.06rem;
  background: rgba(242, 242, 243, 1);
  font-size: 0.13rem;
  margin-right: 0.08rem;
  margin-bottom: 0.1rem;
}
.pop-down-action {
  color: rgba(0, 150, 193, 1);
}
.filter-boxs {
  display: flex;
  justify-content: center;
  position: fixed;
  background-color: #fff;
  z-index: 50;
  top: 0.34rem;
  height: 0.6rem;
  width: 3.75rem;
  border-bottom: 1px solid #f2f2f3;
}
.filter-list {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0.03rem;
  left: 0;
  background-color: #fff;
}
.filter-list li {
  width: 1.25rem;
  text-align: center;
  font-size: 0.13rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 0.44rem;
  img {
    width: 0.12rem;
    height: 0.08rem;
    vertical-align: middle;
    display: inline-block;
    margin-left: 0.01rem;
  }
}
.main-boxs {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.main-item {
  padding: 1px;
  width: 3.35rem;
  height: 1.66rem;
  margin: 0 auto;
  margin-top: 0.1rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0rem 0.05rem 0.01rem rgba(0, 0, 0, 0.06);
  border-radius: 0.06rem;
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
.disalign {
  display: flex;
  align-items: center;
}
.todaywork {
  position: absolute;
  left: 0.1rem;
  right: 0.1rem;
  background: #ffffff;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  border-radius: 5px;
  .todaywork_top {
    display: flex;
    align-items: center;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    height: 0.49rem;
    border-bottom: 1px solid #f0f0f7;
    .title {
      font-family: PingFangSC-Regular;
      font-size: 0.15rem;
      color: #212121;
      letter-spacing: 0;
      text-align: center;
      line-height: 0.15rem;
      margin-right: auto;
    }
    .select {
      font-family: PingFangSC-Regular;
      font-size: 0.15rem;
      color: #474c63;
      letter-spacing: 0;
      text-align: right;
      line-height: 0.15rem;
    }
    img {
      width: 0.16rem;
      height: 0.16rem;
      margin-left: 0.05rem;
    }
  }
  .today_main {
    margin-left: 0.1rem;
    margin-right: 0.1rem;
    border-bottom: 1px solid #f0f0f7;
    .today_main_top {
      display: flex;
      align-items: center;
      margin-top: 0.15rem;
      .type1 {
        width: 0.5rem;
        height: 0.18rem;
        text-align: center;
        background: rgba(46, 191, 7, 0.2);
        border-radius: 11.5px;
        border-radius: 11.5px;
        font-family: PingFangSC-Medium;
        font-size: 0.13rem;
        color: #00a874;
        letter-spacing: 0;
        line-height: 0.18rem;
        align-items: center;
        justify-content: center;
        display: flex;
      }
      .type2 {
        width: 0.5rem;
        height: 0.18rem;
        text-align: center;
        background: #f0f0f7;
        border-radius: 11.5px;
        border-radius: 11.5px;
        font-family: PingFangSC-Medium;
        font-size: 0.13rem;
        color: #9397ad;
        letter-spacing: 0;
        line-height: 0.18rem;
        align-items: center;
        justify-content: center;
        display: flex;
      }
      .type3 {
        width: 0.5rem;
        height: 0.18rem;
        text-align: center;
        background: rgba(33, 135, 255, 0.2);
        border-radius: 11.5px;
        border-radius: 11.5px;
        font-family: PingFangSC-Medium;
        font-size: 0.13rem;
        color: #2187ff;
        letter-spacing: 0;
        line-height: 0.18rem;
        align-items: center;
        justify-content: center;
        display: flex;
      }
      .name {
        margin-left: 0.09rem;
        font-family: PingFangSC-Regular;
        font-size: 0.16rem;
        color: #212121;
        letter-spacing: 0;
        line-height: 0.16rem;
        width: 2.3rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        // width: 3rem;
      }
      .right {
        margin-left: auto;
        font-size: 0.13rem;
        color: #212121;
        width: 0.55rem;
        text-align: right;
      }
    }
    .today_main_middle {
      display: flex;
      align-items: center;
      margin-top: 0.15rem;
      margin-bottom: 0.15rem;
      img {
        width: 0.16rem;
        height: 0.16rem;
        margin-right: 0.05rem;
      }
      p {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #9397ad;
        letter-spacing: 0;
        line-height: 0.13rem;
      }
    }
    .today_main_end {
      display: flex;
      align-items: center;
      padding-bottom: 0.15rem;
      p {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #212121;
        letter-spacing: 0;
        line-height: 0.13rem;
      }
      img {
        width: 0.16rem;
        height: 0.16rem;
        margin-right: 0.05rem;
      }
      .end_second {
        // margin-left: 0.32rem;
        // margin-right: 0.32rem;
        margin: 0 auto;
      }
    }
  }
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
    overflow: auto;
    .select_window_main {
      margin-top: 0.3rem;
      margin-left: 0.15rem;
      margin-right: 0.13rem;
      .title {
        font-family: PingFangSC-Regular;
        font-size: 0.13rem;
        color: #212121;
        letter-spacing: 0;
        line-height: 0.18rem;
        margin-bottom: 0.2rem;
      }
      .flex {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
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
          padding-top: 0.04rem;
          padding-bottom: 0.06rem;
          padding-left: 0.08rem;
          padding-right: 0.08rem;
          // margin-right: 0.1rem;
          margin-bottom: 0.1rem;
        }
        .active {
          background: rgba(33, 135, 255, 0.15);
          color: #2187ff;
        }
      }
      .select_window_first {
        margin-bottom: 0.1rem;
      }
      .select_window_second {
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
        border-top: 1px solid #f0f0f7;
        border-bottom: 1px solid #f0f0f7;
      }
      .select_window_third {
        margin-top: 0.2rem;
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
      margin-top: 0.3rem;
      margin-bottom: 0.2rem;
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