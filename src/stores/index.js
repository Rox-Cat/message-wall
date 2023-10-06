import { defineStore } from 'pinia'

export const useWallInfoStore = defineStore('wallInfo', {
	state: () => {
		return {
			wallId: 0,
			openFlyout: true,
			noteMessage: {

			}
		}
	}
})
