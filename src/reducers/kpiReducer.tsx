const reducer = (preState: { initDept: string; initKPI: string }, action: any) => {
  switch (action.type) {
    case 'reset':
      return { initDept: '', initKPI: '' };
    case 'setKPI':
      return { initDept: preState.initDept, initKPI: action.payload };
    case 'setDept':
      return { initDept: action.payload, initKPI: '' };
    case 'clearKPI':
      return { initDept: preState.initDept, initKPI: '' };
    default:
      throw new Error('未知的操作类型, 请联系管理员');
  }
};

export default reducer;
