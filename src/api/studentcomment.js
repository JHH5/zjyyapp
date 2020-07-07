import axios from '@/libs/api.request'
import moment from 'moment';
import { valid } from 'mockjs';

var year = 0

if (moment().month() == 0) {
    year = moment().year()
} else {
    year = moment().year()
}

export const queryStudentevaluationitem = (hospitalofficeid, time) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/querystudentevaluationitem.do',
        data: {
            officeid: hospitalofficeid,
            starttime: year + "-" + time + "-01 00:00:00",
            endtime: year + "-" + time + "-" + moment(year + "-" + time, "YYYY-MM").daysInMonth() + " 23:59:59",

        },
        method: 'post'
    })
}

export const queryMajorstudentdimensionevaluate = (type) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/querymajorstudentdimensionevaluate.do',
        data: {
            beroleid: 2,
            evaluatetype: type
        },
        method: 'post'
    })
}

export const queryMajormanageoffice = () => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/querymajormanageoffice.do',
        // data:{
        //     officeids:ids
        // },
        method: 'post'
    })
}

export const queryMajorstudentrounddata = (val) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/querymajorstudentrounddata.do',
        data: {
            type: val
        },
        method: 'post'
    })
}


export const queryStudenttraindata = (time,officeid) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/querystudenttraindata.do',
        data: {
            // officeid: 101,
            // studenttype: ids,
            starttime: year + "-" + time + "-01 00:00:00",
            endtime: year + "-" + time + "-" + moment(year + "-" + time, "YYYY-MM").daysInMonth() + " 23:59:59",
        },
        method: 'post'
    })
}

export const queryStudentdetailsdata = () => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/querystudentdetailsdata.do',
        method: 'post'
    })
}

export const queryStudentevaluationitemNew = (top, end) => {
    return axios.request({
        url: '/doctor_train/rest/H5Management/querystudentevaluationitem_new.do',
        data: {
            evaluationid: top,
            evaluationitemid: end
        },
        method: 'post'
    })
}