import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate';
import zh_TW from 'vee-validate/dist/locale/zh_TW';

Vue.use(VeeValidate, {
    events: 'input|blur', //這是為了讓使用者離開該欄位時觸發驗證
});
Validator.localize('zh_TW', zh_TW); // VeeValidate 使用中文文檔
/* 自定義驗證格式: mobile */
Validator.extend("mobile", {
    getMessage: field => "手機格式不正確",
    validate: value =>
        value.length === 10 && /^09\d{8}$/.test(value)
});
// 自定義 VeeValidate 空欄位時的提示訊息
const Dictionary = {
    zh_TW: {
        messages: {
            required: field => "请输入" + field
        },
        attributes: {
            tel: "手機號碼",
            address: "地址"
        }
    }
};
Validator.localize(Dictionary);