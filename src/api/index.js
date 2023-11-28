import request from '../utils/request'

const API = {
	INSERTWALL_URL: '/insertWall',
	INSERTFEEDBACK_URL: '/insertFeedback',
	INSERTCOMMENT_URL: '/insertComment',
	DELETEWALL_URL: '/deleteWall',
	DELETEFEEDBACK_URL: '/deleteFeedback',
	DELETECOMMENT_URL: '/deleteComment',
	FINDWALLPAGE_URL: '/findWallPage',
	FINDCOMMENTPAGE_URL: '/findCommentPage'
}

export const reqInsertWall = (data) => request.post(API.INSERTWALL_URL, data)
export const reqInsertComment = (data) => request.post(API.INSERTCOMMENT_URL, data)
export const reqDeleteWall = (data) => request.post(API.DELETEWALL_URL, data)
export const reqDeleteFeedback = (data) => request.post(API.DELETEFEEDBACK_URL, data)
export const reqDeleteComment = (data) => request.post(API.DELETECOMMENT_URL, data)
export const reqFindWallPage = (data) => request.post(API.FINDWALLPAGE_URL, data)
export const reqFindCommentPage = (data) => request.post(API.FINDCOMMENTPAGE_URL, data)
export const insertFeedback = (data) => request.post(API.INSERTFEEDBACK_URL, data)
// 获取用户的IP地址
export const reqUserIp = () => request.get('/userIp')
export const reqUploadPhoto = (data) => request.post('/upload/photo', data)