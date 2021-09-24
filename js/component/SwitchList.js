Vue.component('my-switch-list', {
    props: {
        selectcallback: Function,
        data: [],
        open: undefined
    },
    data() {
        return {
            color: "#ff4949"
        };
    },
    watch: {

        // data: {
        //     handle() {

        //     }
        // }
    },
    mounted() {
        //@change="selectcallback($event,'bool',item.route)"
    },
    template: `
    <div>
        <div v-if="open!=undefined">
            <el-collapse-transition>
                <div v-if="open">
                    <div class="item" v-for="element in data">
                        <span class="tips">{{element.key}}</span>
                        <el-tooltip :disabled="!Boolean(element.tip)" :content="element.tip" placement="top" effect="light">
                            <el-switch v-model="element.value" :active-color="element.activeColor?element.activeColor:'#13ce66'" :inactive-color="element.inactiveColor?element.inactiveColor:'#808080'" :active-text="element.activeStr?element.activeStr:'有'" :inactive-text="element.inactiveStr?element.inactiveStr:'无'" @change="selectcallback($event,'bool',element.route)" >
                            </el-switch>
                        </el-tooltip>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div v-else>
            <div class="item" v-for="element in data">
                <span class="tips">{{element.key}}</span>
                <el-tooltip :disabled="!Boolean(element.tip)" :content="element.tip" placement="top" effect="light">
                    <el-switch v-model="element.value" :active-color="element.activeColor?element.activeColor:'#13ce66'" :inactive-color="element.inactiveColor?element.inactiveColor:'#808080'" :active-text="element.activeStr?element.activeStr:'有'" :inactive-text="element.inactiveStr?element.inactiveStr:'无'" @change="selectcallback($event,'bool',element.route)" >
                    </el-switch>
                </el-tooltip>
            </div>
        </div>
    </div>
    `
});