import axios from "axios";
let config = {};
const { VITE_PUBLIC_PATH } = import.meta.env;
const setConfig = (cfg) => {
    config = Object.assign(config, cfg);
};
const getConfig = (key) => {
    if (typeof key === "string") {
        const arr = key.split(".");
        if (arr && arr.length) {
            let data = config;
            arr.forEach(v => {
                if (data && typeof data[v] !== "undefined") {
                    data = data[v];
                }
                else {
                    data = null;
                }
            });
            return data;
        }
    }
    return config;
};
/** 获取项目动态全局配置 */
export const getPlatformConfig = async (app) => {
    app.config.globalProperties.$config = getConfig();
    return axios({
        method: "get",
        url: `${VITE_PUBLIC_PATH}platform-config.json`
    })
        .then(({ data: config }) => {
        let $config = app.config.globalProperties.$config;
        // 自动注入系统配置
        if (app && $config && typeof config === "object") {
            $config = Object.assign($config, config);
            app.config.globalProperties.$config = $config;
            // 设置全局配置
            setConfig($config);
        }
        return $config;
    })
        .catch(() => {
        throw "请在public文件夹下添加platform-config.json配置文件";
    });
};
/** 本地响应式存储的命名空间 */
const responsiveStorageNameSpace = () => getConfig().ResponsiveStorageNameSpace;
export { getConfig, setConfig, responsiveStorageNameSpace };
//# sourceMappingURL=index.js.map