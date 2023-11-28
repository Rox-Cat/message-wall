import { defineStore } from 'pinia'
// 不同的仓库要分开吗？
export const useWallInfoStore = defineStore('wallInfo', {
	state: () => {
		return {
			allNoteCardMessages: [], // 所有的留言卡片信息
			wallId: 0, // 当前是哪个留言墙
			cardColors: [
				'rgba(252,175,162,1)',
				'rgba(255,227,148,1)',
				'rgba(146,230,245,1)',
				'rgba(168,237,138,1)',
				'rgba(202,167,247,1)'
			],
			openFlyout: false,
			noteMessage: null, // 当前留言卡片的留言信息
			noteComment: [], // 当前留言卡片的评论信息
			selectedCardIndex: -1,
			// 弹出框的信息
			isShowTips: false,
			tipsType: 'success',
			tipsContent: '操作成功'
		}
	},
	actions: {
		closeFlyout() {
			this.openFlyout = false
			this.selectedCardIndex = -1
		},
		addNoteMessage(noteMessage) {
			this.allNoteCardMessages.unshift(noteMessage)
			console.log(this.allNoteCardMessages)
		},
		showTips(type, content) {
			this.isShowTips = true
			this.tipsType = type
			this.tipsContent = content
			setTimeout(() => {
				this.isShowTips = false
			}, 3000)
		}
	}
})

// 建立一个用户仓库
export const useUserInfoStore = defineStore('userInfo', {
	state: () => {
		return {
			userId: 0
		}
	}
})
