<template>
    <div id="content-body" class="content-body">


        <!-- 搜索开始 -->
        <div class="z-search-box">
            <el-form :model="redpacketForm" label-width="120px" :rules="rules" ref="redpacketForm" onsubmit="return false">
                <el-row>
                    <el-col :span="8">
                        <div class="z-span-20">
                            <el-form-item label="红包名称：" prop="name">
                                <el-input v-model="redpacketForm.name"
                                          placeholder="请输入红包名称"
                                          @keyup.enter.native="search('redpacketForm')"
                                ></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="8" >
                        <div class="z-span-20" style="padding-left:20px">
              <span class="z-btn-span">
                <el-button type="primary"
                           icon="search"
                           @click="search('redpacketForm')"
                >查询</el-button>
              </span>
                            <span class="z-btn-span"><el-button @click="resetForm('redpacketForm')">重置</el-button> </span>
                        </div>
                    </el-col>


                </el-row>

            </el-form>
        </div>
        <!-- 搜索结束 -->

        <!-- 列表开始 -->
        <el-table
                :data="tableData"
                type="expand"
                border
                style="width: 100%">

            <el-table-column
                    prop="name"
                    label="红包名称"
            >
            </el-table-column>
            <el-table-column
                    prop="amount"
                    label="金额(元)"
            >
            </el-table-column>
            <el-table-column
                    prop="validLimit"
                    label="有效期(天)"
            >
            </el-table-column>

            <el-table-column
                    prop="productType"
                    label="限投产品类型"
                    width="170">
            </el-table-column>
            <el-table-column
                    label="起投金额(元)"
            >

            </el-table-column>
            <el-table-column
                    label="投资产品最低期限(天)"
            >
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="操作"
                    >
            </el-table-column>
        </el-table>
        <!-- 列表结束 -->
        <!-- 分页开始 -->
        <div class="z-pager">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[5, 10, 20, 40]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
            </el-pagination>
        </div>
        <!-- 分页结束 -->


    </div>
</template>
<style lang="less" scope>
    .table-line{
        width:100%;
        padding:0 18px ;
        li{
            width:100%;
            margin-left: -18px;
            padding:0 18px ;
            text-align: center;
            border-bottom: 1px solid #dfe6ec;
        }
        li:last-child{
            border-bottom: none;
        }

    }

</style>
<script>
    import {mapGetters,mapActions} from 'vuex'

    export default {
        data () {
            return {
                searchBtnViable:false,
                addBtnViable:false,
                updateBtnViable:false,
                delBtnViable:false,
                deldisabled:false,
                myComVisable:this.comVisable,
                dataIsNotDeleteVisable:false,
                popMessage:"",
                pageNo: 1,
                pageSize: 10,
                currentPage4: 1,
                totalCount:0,
                updataDialogVisible: false,
                delDialogVisible: false,
                redpacketForm: {
                    name: ''
                },
                rules: {
                    name: [
                        {min: 0, max: 20, message: '长度在20个字符以内', trigger: 'blur'}
                    ]
                },
//                tableData: [],
                multipleSelection:[],
                currentId:0,
                currentIndex:0
            }
        },
        mounted () {
            this.getRedpacketList(this.pageNo,this.pageSize,this.redpacketForm.name);
        },
        computed:mapGetters(['tableData']),
        methods: {
            //获取红包列表
            getRedpacketList(pageNo,pageSize,redpacketName){
                this.$store.dispatch('GET_REDPACKET_LIST',{
                    "pageNo":pageNo,
                    "pageSize":pageSize,
                    "name":redpacketName,
                });





               /* $queryRedpacket(pageNo,pageSize,redpacketName,res=>{
                    this.tableData=res.list;
                    this.totalCount=res.totalCount;
                })*/
            },
            handleSizeChange (val) {
                this.pageSize=val;
                this.getRedpacketList(this.pageNo,this.pageSize,this.redpacketForm.name);
            },
            handleCurrentChange (val) {
                this.currentPage = val
                this.getRedpacketList(val,this.pageSize,this.redpacketForm.name);
            },
            //搜索
            search(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.getRedpacketList(this.pageNo,this.pageSize,this.redpacketForm.name);
                    } else {
                        TOOLS.log('error submit!!');
                        return false;
                    }
                });


            },
            resetForm(formName) {

                this.$refs[formName].resetFields();
                this.getRedpacketList(this.pageNo,this.pageSize,this.redpacketForm.name);
            }


        }
    }
</script>
