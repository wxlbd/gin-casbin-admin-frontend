import { reactive } from "vue";
import { isPhone } from "@pureadmin/utils";
import { $t, transformI18n } from "@/plugins/i18n";
/** 6位数字验证码正则 */
export const REGEXP_SIX = /^\d{6}$/;
/** 密码正则（密码格式应为8-18位数字、字母、符号的任意两种组合） */
export const REGEXP_PWD = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/;
/** 登录校验 */
const loginRules = reactive({
    password: [
        {
            validator: (rule, value, callback) => {
                if (value === "") {
                    callback(new Error(transformI18n($t("login.purePassWordReg"))));
                }
                else {
                    callback();
                }
            },
            trigger: "blur"
        }
    ],
    verifyCode: [
        {
            validator: (rule, value, callback) => {
                if (value === "") {
                    callback(new Error(transformI18n($t("login.pureVerifyCodeReg"))));
                }
                else {
                    callback();
                }
            },
            trigger: "blur"
        }
    ]
});
/** 手机登录校验 */
const phoneRules = reactive({
    phone: [
        {
            validator: (rule, value, callback) => {
                if (value === "") {
                    callback(new Error(transformI18n($t("login.purePhoneReg"))));
                }
                else if (!isPhone(value)) {
                    callback(new Error(transformI18n($t("login.purePhoneCorrectReg"))));
                }
                else {
                    callback();
                }
            },
            trigger: "blur"
        }
    ],
    verifyCode: [
        {
            validator: (rule, value, callback) => {
                if (value === "") {
                    callback(new Error(transformI18n($t("login.pureVerifyCodeReg"))));
                }
                else if (!REGEXP_SIX.test(value)) {
                    callback(new Error(transformI18n($t("login.pureVerifyCodeSixReg"))));
                }
                else {
                    callback();
                }
            },
            trigger: "blur"
        }
    ]
});
/** 忘记密码校验 */
const updateRules = reactive({
    phone: [
        {
            validator: (rule, value, callback) => {
                if (value === "") {
                    callback(new Error(transformI18n($t("login.purePhoneReg"))));
                }
                else if (!isPhone(value)) {
                    callback(new Error(transformI18n($t("login.purePhoneCorrectReg"))));
                }
                else {
                    callback();
                }
            },
            trigger: "blur"
        }
    ],
    verifyCode: [
        {
            validator: (rule, value, callback) => {
                if (value === "") {
                    callback(new Error(transformI18n($t("login.pureVerifyCodeReg"))));
                }
                else if (!REGEXP_SIX.test(value)) {
                    callback(new Error(transformI18n($t("login.pureVerifyCodeSixReg"))));
                }
                else {
                    callback();
                }
            },
            trigger: "blur"
        }
    ],
    password: [
        {
            validator: (rule, value, callback) => {
                if (value === "") {
                    callback(new Error(transformI18n($t("login.purePassWordReg"))));
                }
                else if (!REGEXP_PWD.test(value)) {
                    callback(new Error(transformI18n($t("login.purePassWordRuleReg"))));
                }
                else {
                    callback();
                }
            },
            trigger: "blur"
        }
    ]
});
export { loginRules, phoneRules, updateRules };
//# sourceMappingURL=rule.js.map