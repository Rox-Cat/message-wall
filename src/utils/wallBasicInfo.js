export const tagsType = [
	['留言', '目标', '理想', '过去', '未来', '爱情', '亲情', '友情', '秘密', '信条', '无题'],
	[
		'我',
		'ta',
		'喜欢的',
		'有意义的',
		'值得纪念的',
		'母校',
		'生活',
		'天空',
		'我在的城市',
		'大海',
		'无题'
	]
]

export const wallType = [
	{
		title: '留言墙',
		slogan: '很多事情值得记录，当然也值得回味。'
	},
	{
		title: '照片墙',
		slogan: '很多事情值得记录，当然也值得回味。'
	}
]

// 生成随机颜色
// 生成随机整数
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

// 生成随机颜色
function getRandomColor() {
	var r = getRandomInt(0, 255)
	var g = getRandomInt(0, 255)
	var b = getRandomInt(0, 255)
	var a = Math.random().toFixed(2) // 保留两位小数，生成随机透明度
	return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')'
}

// 存储随机颜色的数组
var colors = []

// 生成并存储随机颜色
for (var i = 0; i < 14; i++) {
	var randomColor = getRandomColor()
	colors.push(randomColor)
}
export const availableColors = colors
