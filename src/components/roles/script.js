export default {
  data() {
    return {
      rolesList: [],
      // 修改对话框的展示和隐藏
      roleEditDialog: false,

      roleEditForm: {
        id: -1,
        roleName: '',
        roleDesc: ''
      },

      // 分配权限对话框的展示和隐藏
      rightsDialog: false,
      // 所有的权限（树形结构）
      rightsTree: [],

      defaultProps: {
        // children 用来指定使用哪个属性来指定子节点
        children: 'children',
        // label 用来指定使用数据中的哪个属性展示树形控制中每个节点的名字
        label: 'authName'
      },

      // 当前分配权限的角色id
      curRoleId: -1
    }
  },

  created () {
    this.getRolesList()
    this.getAllRightsTree()
  },

  methods: {
    // 获取到所有的权限树形列表
    async getAllRightsTree() {
      const res = await this.$http.get('/rights/tree')
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.rightsTree = data
      }
    },

    // 获取角色列表数据
    async getRolesList() {
      const res = await this.$http.get('/roles')
      // console.log(res);
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.rolesList = data
      }
    },

    async delRolesById(id) {
      try {
        await this.$confirm('确认删除该角色吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        })
        
        const res = await this.$http.delete(`/roles/${id}`)
        if (res.data.meta.status === 200) {
          const index = this.rolesList.findIndex(item => item.id === id)
          this.rolesList.splice(index, 1)
        }
      } catch (err) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }

      // this.$confirm('确认删除该角色吗?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(async () => {
      //   // 发送请求，删除当前角色
      //   const res = await this.$http.delete(`/roles/${id}`)
      //   // console.log(res);
      //   if (res.data.meta.status === 200) {
      //     const index = this.rolesList.findIndex(item => item.id === id)
      //     this.rolesList.splice(index, 1)
      //   }
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   });          
      // });
    },

    // 展示修改角色对话框
    showRolesEditDailog(curRole) {
      this.roleEditDialog = true

      // 获取到当前角色的数据
      for (const key in this.roleEditForm) {
        this.roleEditForm[key] = curRole[key]
      }
    },

    // 修改角色信息
    async editRole() {
      const { id, roleName, roleDesc } = this.roleEditForm
      const res = await this.$http.put(`/roles/${id}`, {
        roleName,
        roleDesc
      })
      
      const { data, meta } = res.data
      if (meta.status === 200) {
        // 关闭对话框
        this.roleEditDialog = false
        // 更新列表数据
        const editRole = this.rolesList.find(item => item.id === id)
        editRole.roleName = data.roleName
        editRole.roleDesc = data.roleDesc
      }
    },

    // 删除指定角色的权限
    async delRoleRightById(roleId, rightId) {
      const res = await this.$http.delete(`roles/${roleId}/rights/${rightId}`)
      const { data, meta } = res.data
      if (meta.status === 200) {
        const curRole = this.rolesList.find(item => item.id === roleId)
        curRole.children = data
      }
    },

    showRightsDialog(curRoleRights, id) {
      // 展示对话框
      this.rightsDialog = true
      // 暂存当前角色id
      this.curRoleId = id
      
      this.$nextTick(() => {
        // 三级菜单id数组
        const level3Ids = []
        curRoleRights.forEach(level1 => {
          level1.children.forEach(level2 => {
            level2.children.forEach(level3 => {
              level3Ids.push(level3.id)
            })
          })
        })
        // 指定选中节点的id数组
        this.$refs.rightsTree.setCheckedKeys(level3Ids)
      })
    },

    // 给角色分配权限
    async assignRights() {
      // 获取到当前角色选中的权限id数组
      // 获取全选项
      const checkedKeys = this.$refs.rightsTree.getCheckedKeys()
      // 获取半选项
      const halfCheckedKeys = this.$refs.rightsTree.getHalfCheckedKeys()
      // 将全选和半选合并到一起
      const allCheckedIds = [...checkedKeys, ...halfCheckedKeys]

      const res = await this.$http.post(`/roles/${this.curRoleId}/rights`, {
        rids: allCheckedIds.join(',')
      })
      if (res.data.meta.status === 200) {
        this.rightsDialog = false
        // 重新获取角色列表
        this.getRolesList()
      }
    }
  }
}