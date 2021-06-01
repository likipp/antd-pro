

const reducer = (preState:  {
  key: number,
  uuid: string,
  username: string,
  nickname: string,
  deptID: string,
  remark: string,
  sex: string,
  status: number,
  DeptName: string,
  createdAt: number,
  updatedAt: number,
  roles: any[]
}, action: any) => {
  switch (action.type) {
    case 'change':
      if (action.payload === undefined) {
        return {
          key: 0,
          uuid: '',
          username: '',
          nickname: '',
          deptID: '',
          remark: '',
          sex: '',
          status: 0,
          DeptName: '',
          createdAt: 0,
          updatedAt: 0,
          roles: []
        }
      }
      return action.payload;
    default:
      throw new Error('未知的操作类型, 请联系管理员');
  }
};

export default reducer;
