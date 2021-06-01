import {UserDetailInfo} from "@/pages/base/user/data";

const reducer = (preState: UserDetailInfo, action: any) => {
  switch (action.type) {
    case 'change':
      return { key: 0,
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
        roles: [], };
    // case 'clear':
    //   return { type: '', unit: '' };
    default:
      throw new Error('未知的操作类型, 请联系管理员');
  }
};

export default reducer;
