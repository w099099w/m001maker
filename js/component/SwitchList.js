Vue.component('my-switch-list', {
    props: {
        selectcallback: Function,
        data: [],
        open: undefined,
        question: Object,
    },
    data() {
        return {
            color: "#ff4949",
            that: this
        };
    },
    directives: {
        'content': {
            // bind(el, binding) {
            //     let evarStr = 'binding.value.element.value = binding.value.that.question';
            //     binding.value.element.route.split('.').forEach(element => {
            //         evarStr += `["${element}"]`;
            //     });
            //     eval(evarStr);
            // },
            // update(el, binding) {
            //     let evarStr = 'binding.value.that.question';
            //     binding.value.element.route.split('.').forEach(element => {
            //         evarStr += `["${element}"]`;
            //     });
            //     eval(evarStr += '= binding.value.element.value');
            // }
        }
    },
    watch: {

        // data: {
        //     handle() {

        //     }
        // }
    },
    mounted() {

    },
    computed: {
        current(a, b) {
            console.log(a, b);
            return false;
        },
        subData() {
            return (item) => {
                let route = item.value.split(".");
                let data = this.question;
                route.forEach(element => {
                    data = data[element];
                });
                return data;
            };
        }
    },
    method: {
        send() {

        },
    },
    template: `
    <div>
        <div v-if="open!=undefined">
            <el-collapse-transition>
                <div v-if="open">
                    <div class="item" v-for="element in data">
                        <span class="tips">{{element.key}}</span>
                        <el-tooltip :disabled="!Boolean(element.tip)" :content="element.tip" placement="top" effect="light">
                            <el-switch v-if="element.target=='question'"  v-model="question[element.value]" :active-color="element.activeColor?element.activeColor:'#13ce66'" :inactive-color="element.inactiveColor?element.inactiveColor:'#808080'" :active-text="element.activeStr?element.activeStr:'有'" :inactive-text="element.inactiveStr?element.inactiveStr:'无'" @change="selectcallback($event,'bool',element.route)" >
                            </el-switch>
                            <el-switch v-else-if="element.target=='subData'"  v-model="subData(element)[element.bindValue]" :active-color="element.activeColor?element.activeColor:'#13ce66'" :inactive-color="element.inactiveColor?element.inactiveColor:'#808080'" :active-text="element.activeStr?element.activeStr:'有'" :inactive-text="element.inactiveStr?element.inactiveStr:'无'" @change="selectcallback($event,'bool',element.route)" >
                            </el-switch>
                            <el-switch v-else v-model="element.value" :active-color="element.activeColor?element.activeColor:'#13ce66'" :inactive-color="element.inactiveColor?element.inactiveColor:'#808080'" :active-text="element.activeStr?element.activeStr:'有'" :inactive-text="element.inactiveStr?element.inactiveStr:'无'" @change="selectcallback($event,'bool',element.route)" >
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
                    <el-switch v-if="element.target=='question'"  v-model="question[element.value]" :active-color="element.activeColor?element.activeColor:'#13ce66'" :inactive-color="element.inactiveColor?element.inactiveColor:'#808080'" :active-text="element.activeStr?element.activeStr:'有'" :inactive-text="element.inactiveStr?element.inactiveStr:'无'" @change="selectcallback($event,'bool',element.route)" >
                    </el-switch>
                    <el-switch v-else-if="element.target=='subData'"  v-model="subData(element)[element.bindValue]" :active-color="element.activeColor?element.activeColor:'#13ce66'" :inactive-color="element.inactiveColor?element.inactiveColor:'#808080'" :active-text="element.activeStr?element.activeStr:'有'" :inactive-text="element.inactiveStr?element.inactiveStr:'无'" @change="selectcallback($event,'bool',element.route)" >
                    </el-switch>
                    <el-switch v-else v-model="element.value" :active-color="element.activeColor?element.activeColor:'#13ce66'" :inactive-color="element.inactiveColor?element.inactiveColor:'#808080'" :active-text="element.activeStr?element.activeStr:'有'" :inactive-text="element.inactiveStr?element.inactiveStr:'无'" @change="selectcallback($event,'bool',element.route)" >
                    </el-switch>
                </el-tooltip>
            </div>
        </div>
    </div>
    `
});