import Mock from 'mockjs'

// 留言node
export const note = Mock.mock({
	'data|19': [
		{
			// 创建时间
			"monment": new Date().toLocaleString(),
			// id
			'id|+1': 1,
			'userId|+1': 1,
			//内容
			'message|24-96': '@cword',
			//label
			'label|0-10': 0,
			//name
			"name": '@cname',
			//like
			'like|0-120': 0,
			//评论
			'comment|0-120': 0,
			//背景色
			'imgUrl|0-4': 0,
			//是否撤销
			'revoke|0-20': 0,
			//是否举报
			'report|0-20': 0,
			"wallType": 0
		}
	]
})

// 留言node
export const photo = Mock.mock({
	'data|19': [
		{
			// 创建时间
			"monment": new Date().toLocaleString(),
			// id
			'id|+1': 1,
			'userId|+1': 1,
			//内容
			'message|24-96': '@cword',
			//label
			'label|0-10': 0,
			//name
			"name": '@cname',
			//like
			'like|0-120': 0,
			//评论
			'comment|0-120': 0,
			//背景色
			'imgUrl|1-8': 1,
			//是否撤销
			'revoke|0-20': 0,
			//是否举报
			'report|0-20': 0,
			"wallType": 0
		}
	]
})


export const cardComment = Mock.mock({
	'data|19': [
		{
			// 创建时间
			"monment": new Date().toLocaleString(),
			// id
			'id|+1': 1,
			'userId|+1': 1,
			//内容
			'message|24-96': '@cword',
			//name
			"name": '@cname',
			//背景色
			'imgUrl|0-10': 0,

		}
	]
})