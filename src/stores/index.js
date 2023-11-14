import { defineStore } from 'pinia'

export const useWallInfoStore = defineStore('wallInfo', {
	state: () => {
		return {
			wallId: 0,
			openFlyout: false,
			noteMessage: {
			},
			photoIndex: -1
		}
	},
	actions: {
		closeFlyout() {
			this.openFlyout = false
			this.photoIndex = -1
		}
	}
})
