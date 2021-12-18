import { post, postB} from "_utils/require";

// index

//新版本新增接口
export const classifyImg = params => post('/api/image/index',params);   //按分类返回图片列表
export const tagsIndex = params => post('/api/tags/index',params);      //新分类列表
export const hotImg = params => post('/api/image/hot',params);   //上周热图列表
export const searchImg = params => post('/api/image/search',params);  //搜索
export const newIndex = params => post('/api/index/newindex',params);  //新首页
export const delCollection = params => post('/api/index/delCollection',params);  //批量取消收藏

export const loadMore = params => post('/api/index/loadMore',params);  //加载更多
export const submitDemand = params => post('/api/index/submitDemand',params);  //提交需求
export const seeMyBought = params => post('/api/index/seeMyBoughtce',params);  //我购买的图片
export const seeMyCollection = params => post('/api/index/seeMyCollectionPc',params);  //查看我收藏的图片
export const seeClassifyDetail = params => post('/api/index/seeClassifyDetail',params);  //分类筛选
export const classifyBrowse = params => post('/api/index/classifyBrowse',params);  //分类列表
export const index = params => post('/api/index/index',params);  //首页
export const upload = params => post('/api/common/upload',params); //上传图片
export const collection = params => post('/api/index/collection',params) //收藏图片/取消收藏
export const seeImageDetail = params => post('/api/index/seeImageDetail',params) //查看图片详情

// User
export const useRedeemCode = params => post('/api/user/useRedeemCode',params);   //使用兑换码
export const vipList = params => post('/api/index/vipList',params);   //会员卡列表
export const purchaseMember = params => post('/api/user/purchaseMember',params);   //下单购买(VIP)
export const userIndex = params => post('/api/user/index',params);   //根据token获取用户信息
export const purchaseImage = params => post('/api/user/purchaseImage',params);   //下单购买(图片)
export const download = params => post('/api/index/download',params);   //下载
export const download2 = params => post('/api/index/download2',params);   //下载2
export const resetPwdt = params => post('/api/user/resetPwdt',params);   //修改密码
export const profile = params => post('/api/user/profile',params);   //修改个人信息
export const logOut = params => post('/api/user/logout',params);   //退出登录
export const resetPwd = params => post('/api/user/resetpwd',params);   //重置密码
export const changeMobile = params => post('/api/user/changemobile',params);   //修改手机号
export const register = params => post('/api/user/register',params);   //注册
export const login = params => post('/api/user/login',params);   //登录
// Sms
export const smsSend = params => post('/api/sms/send',params);   //发送短信
// export const sms_check = params => post('/api/sms/check',params);   //验证短信
// 新增接口(5.16)
export const feedback = params => post('/api/feedback/save',params);   //提需求

// 新增接口(5.20)
export const verify = params => postB('/api/user/verify',params);   //图片验证码
export const feedbackAdd = params => post('/api/feedback/add',params);   //PC端提需求
export const pclogin = params => post('/api/user/pclogin',params);   //PC端登录
export const checkPaySuccess = params => post('/api/user/checkPaySuccess',params);   //PC端登录
export const imageCollection = params => post('/api/image/collection',params);   //PC端登录
export const wxLoginPc = params => post('/api/user/wxLoginPc',params);   //微信登录二维码信息接口
export const wxGetUserInfo = params => post('/api/user/wxGetUserInfo',params);   //微信登录二维码信息接口



