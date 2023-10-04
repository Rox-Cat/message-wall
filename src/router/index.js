import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		redirect: '/wall',
		name: 'home',
		component: () => import('@/views/YiKeIndex.vue'),
		children: [
			{
				path: 'wall',
				component: () => import('@/views/WallMessage.vue')
			}
		]
	}
]
const router = createRouter({
	// ???
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

export default router
