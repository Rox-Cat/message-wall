import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		redirect: '/messageWall',
		name: 'home',
		component: () => import('@/views/YiKeIndex.vue'),
		children: [
			{
				path: 'messageWall',
				component: () => import('@/views/WallMessage.vue'),
				meta: {
					wallId: 0,
					tagsType: [
						'留言',
						'目标',
						'理想',
						'过去',
						'未来',
						'爱情',
						'亲情',
						'友情',
						'秘密',
						'信条',
						'无题'
					],
					title: '留言墙',
					slogan: '很多事情值得记录，当然也值得回味。'
				}
			},
			{
				path: '/photoWall',
				component: () => import('@/views/WallMessage.vue'),
				meta: {
					wallId: 1,
					tagsType: [
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
					],
					title: '照片墙',
					slogan: '很多事情值得记录，当然也值得回味。'
				}
			}
		]
	}
]
const router = createRouter({
	// ??? import.meta.env.BASE_URL
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes
})

export default router
