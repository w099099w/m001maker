Vue.component('my-select-list', {
    props: {
        selectcallback: Function,
        file: Object,
        data: [],
        open: undefined,
        question: Object
    },
    data() {
        return {
            that: this
        };
    },
    watch: {
        // file: { //深度监听，可监听到对象、数组的变化
        //     handler(val, oldVal) {
        //         // if (this.data == []) return;
        //         // this.data.some((item) => {
        //         //     if (item.value) {
        //         //         let result;
        //         //         val[`${item.type}`].some(citem => {
        //         //             if (citem === item.value) {
        //         //                 result = citem;
        //         //                 return true;
        //         //             }
        //         //         });
        //         //         if (!result) {
        //         //             this.$message.error("图片的引用资源已被删除,涉及的配置项为:" + item.key);
        //         //             item.value = "";
        //         //         }
        //         //     }
        //         // });
        //     },
        //     deep: true //true 深度监听
        // }
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

            // }
        }
    },
    mounted() {

    },
    methods: {},
    computed: {
        subData() {
            return (dataStruct) => {
                let route = dataStruct.value.split(".");
                let data = this.question;
                route.forEach(element => {
                    data = data[element];
                });
                return data;
            };
        },
        getList() {
            return (type) => {
                switch (type) {
                    case 'image':
                        return this.file.image;
                    case 'sound':
                        return this.file.sound;
                    case 'spine':
                        return this.file.spine;
                    case 'particle':
                        return this.file.particle;
                }
            };
        }
    },
    template: `
    <div>
        <div v-if="open!=undefined">
            <el-collapse-transition>
                <div v-if="open">
                    <div class="item" v-for="item in data">
                        <span class="tips">{{item.key}}</span>
                        <el-tooltip :disabled="!Boolean(item.tip)" :content="item.tip" placement="top" effect="light">
                            <el-select class="my-el-select" v-if="item.target=='question'"  v-model="question[item.route]" filterable placeholder="请选择" @change="selectcallback($event,item.type,item.route)" clearable>
                                <el-option v-for="citem in getList(item.type)" :key="citem" :label="citem" :value="citem">
                                </el-option>
                            </el-select>    
                            <el-select class="my-el-select" v-else-if="item.target=='subData'"  v-model="subData(item)[item.bindValue]" filterable placeholder="请选择" @change="selectcallback($event,item.type,item.route)" clearable>
                                <el-option v-for="citem in getList(item.type)" :key="citem" :label="citem" :value="citem">
                                </el-option>
                            </el-select>    
                            <el-select v-else class="my-el-select" v-model="item.value" filterable placeholder="请选择" @change="selectcallback($event,item.type,item.route)" clearable>
                                <el-option v-for="citem in getList(item.type)" :key="citem" :label="citem" :value="citem">
                                </el-option>
                            </el-select>
                        </el-tooltip>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div v-else>
            <div class="item" v-for="item in data">
                <span class="tips">{{item.key}}</span>
                <el-tooltip :disabled="!Boolean(item.tip)" :content="item.tip" placement="top" effect="light">
                    <el-select class="my-el-select" v-if="item.target=='question'"  v-model="question[item.route]" filterable placeholder="请选择" @change="selectcallback($event,item.type,item.route)" clearable>
                        <el-option v-for="citem in getList(item.type)" :key="citem" :label="citem" :value="citem">
                        </el-option>
                    </el-select>    
                    <el-select class="my-el-select" v-else-if="item.target=='subData'"  v-model="subData(item)[item.bindValue]" filterable placeholder="请选择" @change="selectcallback($event,item.type,item.route)" clearable>
                        <el-option v-for="citem in getList(item.type)" :key="citem" :label="citem" :value="citem">
                        </el-option>
                    </el-select>    
                    <el-select v-else class="my-el-select" v-model="item.value" filterable placeholder="请选择" @change="selectcallback($event,item.type,item.route)" clearable>
                        <el-option v-for="citem in getList(item.type)" :key="citem" :label="citem" :value="citem">
                        </el-option>
                    </el-select>
                </el-tooltip>
            </div>
        </div>
    </div>
    `
});