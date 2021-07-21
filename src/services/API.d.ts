declare namespace API {
  export interface CurrentUser {
    // data: any;
    avatar?: string;
    nickname?: string;
    title?: string;
    // group?: string;
    // signature?: string;
    // tags?: {
    //   key: string;
    //   label: string;
    // }[];
    name?: string
    uuid?: string;
    access?: 'user' | 'guest' | 'admin';
    // unreadCount?: number;
  }

  export interface LoginStateType {
    success?: boolean;
    status?: 'ok' | 'error';
    type?: string;
    code: number;
    data: any;
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }
}
