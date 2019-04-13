/**
* 替换回车
**/
function repenter(value) {
    return value.replace(/\r\n/gi, "");
}

/**
**  替换特殊字符
**/
function rep(str) {
    /**
    *  替换'+'
    */
    var index = 0;
    while (str.indexOf('+', index) != -1) {
        str = str.replace('+', '%2B');
        index = str.indexOf('+', index);
    }

    var index1 = 0;
    while (str.indexOf('/', index1) != -1) {
        str = str.replace('/', '%2F');
        index1 = str.indexOf('/', index1);
    }
    var index2 = 0;
    while (str.indexOf('?', index2) != -1) {
        str = str.replace('?', '%3F');
        index2 = str.indexOf('?', index2);
    }

    var index4 = 0;
    while (str.indexOf('#', index4) != -1) {
        str = str.replace('#', '%23');
        index4 = str.indexOf('#', index4);
    }
    var index5 = 0;
    while (str.indexOf('&', index5) != -1) {
        str = str.replace('&', '%26');
        index5 = str.indexOf('&', index5);
    }
    return str;
}

String.prototype.trim = function () {
    // 用正则表达式将前后空格
    // 用空字符串替代。
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
//学籍学历校验结果
var xjxlConfig = {
  "00": {
    name: "WAIT_JYJG",
    type: "0",
    title: "校验正在进行中",
    des:
      "校验结果将在 <strong style='color: #f76260'>48</strong> 小时内反馈，考生可随时上网查看，<strong style='color: #f76260'>目前可继续填写其他信息</strong>。"
  },
  "01": {
    name: "PASS_XJ ",
    type: "1",
    title: "学籍校验通过",
    des: "报考资格审查在现场确认及复试阶段由相关部门进行。"
  },
  "02": {
    name: "FAIL_XJ",
    type: "2",
    title: "学籍校验未通过",
    des:
      "可能的原因如下：<br>1、报名时输入的学历(学籍)相关信息有误；2、学历(学籍)电子注册信息有误；3、学历(学籍)未注册；详情请看页面下方的注意事项。"
  },
  "03": {
    name: "PASS_XL",
    type: "1",
    title: "学历校验通过",
    des: "报考资格审查在现场确认及复试阶段由相关部门进行。"
  },
  "04": {
    name: "FAIL_XL",
    type: "2",
    title: "学历校验未通过",
    des:
      "可能的原因如下：<br>1、报名时输入的学历(学籍)相关信息有误；2、学历(学籍)电子注册信息有误；3、学历(学籍)未注册；详情请看页面下方的注意事项。"
  },
  "05": {
    name: "FAIL_XJ_MALICE",
    type: "2",
    title: "学籍校验未通过",
    des: ""
  },
  "06": {
    name: "FAIL_XL_MALICE",
    type: "2",
    title: "学历校验未通过",
    des: ""
  },
  "99": {
    //des取值根据后台返回
    name: "",
    type: "2",
    title: "系统发生错误",
    des: ""
  }
};
//校验配置
VeeValidate.Validator.localize('zh_CN');
VeeValidate.Validator.localize({
    zh_CN: {
        messages: {
            required: function (field) {
                return field + "不允许为空";
            },
            max: function (field,arg) {
                return field + "长度不能超过" + arg[0] + "个字节的字符";
            },
            min: function (field, arg) {
                return field + "长度不能低于" + arg[0] + "个字节的字符";
            },
            numeric: function (field, arg) {
                return field + "只能是数字";
            }
        }
    }
});
//取得最后学历
VeeValidate.Validator.extend("xlm", {
    getMessage: function () {
        return "普通全日制应届本科和应届本科毕业生应选择“本科毕业”"
    },
    validate: function (value, args) {
        if (args[0] == "5" || args[0] == "6") {
            return args[1] == "2";
        } else {
            return true;
        }
    }
});
//取得最后学历学习形式
VeeValidate.Validator.extend("xxxs", {
    getMessage: function (field, args) {
        if (args[0] == "5" && args[1] != "1") {
            return "普通全日制应届本科毕业生取得最后学历的学习形式应为普通全日制！";
        } else if (args[0] == "6" && args[1] != "2") {
            return "成人应届本科毕业生取得最后学历的学习形式应为成人教育！";
        } else {
            return "";
        }
    },
    validate: function (value, args) {
        if (args[0] == "5" && args[1] != "1") {
            return false;
        } else if (args[0] == "6" && args[1] != "2") {
            return false;
        } else {
            return true;
        }
    }
});
//现役军人证件
VeeValidate.Validator.extend("xyjrm", {
    getMessage: function () {
        return "证件类型为军人证件时，现役军人应为军队在职干部或军校应届本科毕业生";
    },
    validate: function (value, args) {
        return args[1] == '02' && !(args[0] == '1' || args[0] == '2');
    }
});
//固定长度校验
VeeValidate.Validator.extend("len", {
    getMessage: function (field, args) {
        return "请输入" + args[0] + "位" + field;
    },
    validate: function (value, args) {
        return value.length == args[0];
    }
});
//入伍退役校验
VeeValidate.Validator.extend("rwtyny1", {
    getMessage: function () {
        return "批准入伍年月必须在批准退役年月之前";
    },
    validate: function (value, args) {
        if (value && args[0]) {
            return (new Date(value).getTime()) < (new Date(args[0]).getTime());
        } else {
            return true
        }
    }
});
//入伍退役校验
VeeValidate.Validator.extend("rwtyny2", {
    getMessage: function () {
        return "批准退役年月必须在批准入伍年月之后";
    },
    validate: function (value, args) {
        if (value && args[0]) {
            return (new Date(args[0]).getTime()) < (new Date(value).getTime());
        } else {
            return true
        }
    }
});
//是否含有空格
VeeValidate.Validator.extend("hasSpace", {
    getMessage: function (field) {
        return field + "不允许含有空格";
    },
    validate: function(value) {
        return !/\s/g.test(value);
    }
});
//是否含有空格
VeeValidate.Validator.extend("xmpy", {
    getMessage: function (field) {
        return field + "必须为[2-80]个字母(不允许含有空格)";
    },
    validate: function (value) {
        return /^([a-zA-Z]){2,80}$/.test(value);
    }
});
VeeValidate.Validator.extend("maxlen", {
    getMessage: function (field, args) {
        return field + "最多输入" + args[0] + "个字节（相当于" + args[0] / 2 + "个汉字）！";
    },
    validate: function(value,args) {
        var newvalue = value.replace(/[^\x00-\xff]/g, "**"), //匹配双字节字符，计算长度
            _length = newvalue.length;
        return args[0] >= _length;
    }
});
VeeValidate.Validator.extend("minlen", {
    getMessage: function (field, args) {
        return field + "不能低于" + args[0] + "个字节的字符";
    },
    validate: function (value, args) {
        var newvalue = value.replace(/[^\x00-\xff]/g, "**"), //匹配双字节字符，计算长度
            _length = newvalue.length;
        return _length >= args[0];
    }
});
VeeValidate.Validator.extend("num", {
    getMessage: function (field) {
        return field + "只能是数字";
    },
    validate: function (value) {
        return /^[0-9]*$/.test(value);
    }
});
VeeValidate.Validator.extend("hasEqualSign", {
    getMessage: function (field) {
        return field + "不允许含有等于号";
    },
    validate: function (value) {
        return !/\=/g.test(value);
    }
});
VeeValidate.Validator.extend("hasBackslash", {
    getMessage: function (field) {
        return field + "不允许含有\\";
    },
    validate: function (value) {
        if (value.indexOf('\\')!=-1) {
            return false;
        } else {
            return true;
        }
    }
});
VeeValidate.Validator.extend("yddh", { //电话校验
  getMessage: function(field) {
      return field + "不符合要求";
  },
  validate: function(value) {
      return /^[0-9]*$/.test(value.replace(/\-/g, "").replace(/\,/g, ""));
  }
});
Vue.use(VeeValidate);