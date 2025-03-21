import TypeIt from "typeit";
import { ref, defineComponent, onMounted } from "vue";
// 打字机效果组件（配置项详情请查阅 https://www.typeitjs.com/docs/vanilla/usage#options）
export default defineComponent({
    name: "TypeIt",
    props: {
        options: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props, { slots, expose }) {
        /**
         * 输出错误信息
         * @param message 错误信息
         */
        function throwError(message) {
            throw new TypeError(message);
        }
        /**
         * 获取浏览器默认语言
         */
        function getBrowserLanguage() {
            return navigator.language;
        }
        const typedItRef = ref(null);
        onMounted(() => {
            const $typed = typedItRef.value.querySelector(".type-it");
            if (!$typed) {
                const errorMsg = getBrowserLanguage() === "zh-CN"
                    ? "请确保有且只有一个具有class属性为 'type-it' 的元素"
                    : "Please make sure that there is only one element with a Class attribute with 'type-it'";
                throwError(errorMsg);
            }
            const typeIt = new TypeIt($typed, props.options).go();
            expose({
                typeIt
            });
        });
        return () => (<div ref={typedItRef}>
        {slots.default?.() ?? <span class="type-it"></span>}
      </div>);
    }
});
//# sourceMappingURL=index.jsx.map