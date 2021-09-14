new Vue({
    el: '#app',
    data() {
        return {
            editableTabsValue: "0", // tabs 默认展开下标
            editableTabs: [{
                title: '游戏流程配置',
                name: '0',
            }],
            currentIndex: 0, // 题库默认下标
            config: {
                bgm: "",
                bgmUrl_utils: "",
                bgImg: "",
                bgImgUrl_utils: "",
                plot: false,
                controlTwinkle: false,
                question: [], // 题库
            },
            questionJson: {
                layout: "A", // 布局
                questionText: "", // 题目文字
            } // 题库模板
        };
    },
    computed: {
        /** 当前题库 */
        currentQuestion() {
            return this.config.question[this.currentIndex] || {};
        },
        /** tab数量 */
        tabIndex() {
            return this.editableTabs.length;
        }
    },
    // 页面加载完成
    mounted() {
        // this.init();
    },
    // 方法集合
    methods: {
        handleAvatarSuccess(e) {
            this.config.bgImg = e.file.name;
            this.config.bgImgUrl_utils = "http://10.0.30.67/block2.png";
        },
        submit(e) {
            setTimeout(() => {
                this.config.bgm = e.file.name;
                this.config.bgmUrl_utils = "http://ting6.yymp3.net:82/new15/lizhi/5.mp3";
            }, 500);
        },
        /** 预览 */
        preview() {

        },
        /** 导出 */
        exportConfig() {
            console.log(this.config);
        },
        // 切换题库
        changTabs(e) {
            // 第一页为游戏流程配置，所以题库下标减一
            this.currentIndex = (e.index - 1);
        },
        beforeUpload(type, e) {
            return Utils.verifyFileType(e.name, type);
        },
        addTab() {
            this.editableTabs.push({
                title: `题库${this.tabIndex}`,
                name: this.tabIndex + "",
            });
            // 新增面板时，增加对象
            this.config.question.push(JSON.parse(JSON.stringify(this.questionJson)));
            // 题库下标切换到新增页
            this.currentIndex = (this.tabIndex - 2);
            this.editableTabsValue = this.tabIndex - 1 + "";
        },
        removeTab() {
            this.editableTabs.splice(this.currentIndex + 1, 1);
            this.config.question.splice(this.currentIndex, 1);
            this.editableTabsValue = this.currentIndex + "";
            this.editableTabs.map((item, index) => {
                if (index != 0) {
                    item.title = `题库${index}`;
                    item.name = index + "";
                }
            })
            console.log(this.editableTabs);
            this.currentIndex--;
        }
    }
});