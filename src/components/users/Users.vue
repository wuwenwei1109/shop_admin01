<template>
  <div>
    <el-table
      :data="userList"
      stripe>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="用户状态">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  created () {
    this.getUserLists()
  },

  data() {
      return {
        userList: []
      }
    },

  methods: {
    getUserLists() {
      this.$http.get('/users', {
        params: {
          // 当前页
          pagenum: 1,
          // 每页展示多少条数据
          pagesize: 3
        }
        // 将 token 作为请求头，传递给服务器接口
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      })
      .then(res => {
        console.log(res);
        const { data, meta } = res.data;
        if (meta.status === 200) {
          this.userList = data.users
        }
      })
    }
  }
}
</script>

<style>
</style>