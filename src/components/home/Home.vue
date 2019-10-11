<template>
  <el-container class="home-wrapper">
    <el-header>
      <el-row>
        <el-col :span="8" class="logo">
          <!-- <img src="@/assets/logo.png" alt="黑马logo"> -->
          <p></p>
        </el-col>
        <el-col :span="8">
          <h1 class="title">电商后台管理系统</h1>
        </el-col>
        <el-col :span="8">
          <div class="welcome">
            <span>欢迎前端会员</span>
            <a href="javascript:;" @click.prevent="logout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!-- 
          default-active 当前激活菜单的 index 值 
          @open 菜单展开事件
          @close 菜单收起事件
        -->
        <el-menu :router="true"
          default-active="/home/users"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/home/users">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
              <el-menu-item index="/home/roles">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>角色列表</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/home/rights">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>权限列表</span>
                </template>
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 子路由出口 -->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    // 退出功能
    logout() {
      this.$confirm('您是否确认退出？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 点击确认按钮
        .then(() => {
          localStorage.removeItem('token')
          this.$router.push('/login')
        })
        // 点击取消按钮
        // .catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   });          
        // });
    },

    handleOpen(key, keyPath) {
        console.log('open', key, keyPath);
      },
    handleClose(key, keyPath) {
      console.log('close', key, keyPath);
    }
  }
}
</script>

<style scoped lang="less">
 .home-wrapper {
    height: 100%;

    .el-header {
      padding: 0;
      background-color: #b3c1cd;
      color: #333;
      text-align: center;

      .logo {
        text-align: left;
      }

      .title {
      margin: 0;
      line-height: 60px;
      color: #fff;
      font-size: 36px;
      }

      .welcome {
        line-height: 60px;
        font-weight: bold;
        text-align: right;
        padding-right: 30px;

        a {
          color: #b07a17;
          text-decoration: none;
        }
      }
    }

    
    .el-aside {
      background-color: #545c64;
      color: #333;
      line-height: 200px;
    }
    
    .el-main {
      background-color: #E9EEF3;
      color: #333;
    }
    
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
      line-height: 260px;
    }
    
    .el-container:nth-child(7) .el-aside {
      line-height: 320px;
    }
  }
</style>