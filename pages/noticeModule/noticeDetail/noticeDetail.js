import esRequest from '../../../utils/esRequest';
Page({
	data: {
		id: '',
		noticeForm: {}
	},

	onLoad: function (option) {
		this.setData({
			id: option.id
		})
		this.getInfo()
	},

	// 文章详细
	getInfo: function () {
		wx.showLoading({
			title: '加载中',
			icon: 'none'
		})
		esRequest('article', '', this.data.id).then(res => {
			this.data.noticeForm = res.data.data
			this.data.noticeForm.contents = this.data.noticeForm.contents.replace(/\<img style="/gi, '<img style="max-width:100%; height:auto; ')
			this.setData({
				noticeForm: this.data.noticeForm
			})
			wx.hideLoading()
		}).catch((err) => {
			wx.hideLoading()
			wx.showToast({
				title: err.message,
				icon: 'none'
			})
		})
	},

	// 富文本点击事件
	richTextClick() {
		// 富文本
		const richContent = this.data.noticeForm.contents;
		// 判断含有图片
		if (richContent.indexOf("src") >= 0) {
			const imgs = [];
			richContent.replace(/]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
				imgs.push(capture);
			})
	 		wx.previewImage({
				current: imgs[0], // 当前显示图片的http链接
				urls: imgs
			})
		}
	},
})