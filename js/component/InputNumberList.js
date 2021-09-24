Vue.component('my-inputnumber-list', {
    props: {
        selectcallback: Function,
        data: [],
    },
    data() {
        return {};
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
        <div class="item" v-for="element in data">
            <span class="tips">{{element.key}}</span>
            <el-tooltip :disabled="!Boolean(element.tip)" :content="element.tip" placement="top" effect="light">
                <el-input-number class="myinput" v-model="element.value" controls-position="right" @change="selectcallback($event,element.route)" :step="element.step?element.step:1" :precision="element.precision?element.precision:0" :min="element.min?element.min:0" :max="element.max?element.max:999"></el-input-number>
            </el-tooltip>        
            </div>
    </div>
    `
});