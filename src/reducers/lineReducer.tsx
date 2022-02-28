const reducer = (preState: { type: string; unit: string }, action: any) => {
  console.log(action, "action", preState)
  switch (action.type) {
    case 'change':
      console.log(action.payload, "action.payload")
      return { type: action.payload.type, unit: action.payload.unit };
    case 'clear':
      return { type: '', unit: '' };
    default:
      throw new Error('未知的操作类型, 请联系管理员');
  }
};

export default reducer;
