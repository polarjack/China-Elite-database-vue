var cards = new Vue({
	el: '#field',
	data: {
		cards: [{
			inputWord: '',
			mode: 'include',
			fromDate: '',
			toDate: '',
			words: []
		}]
	},
	methods: {
		addWord: function (cindex) {
			this.cards[cindex].words.push({
				content: this.cards[cindex].inputWord
			})
			this.cards[cindex].inputWord = ''
		},
		addCard: function () {
			this.cards.push({
				inputWord: '',
				mode: 'include',
				fromDate: '',
				toDate: '',
				words: []
			})
		},
		deleteCard: function (cindex) {
			this.cards.splice(cindex, 1)
		},
		deleteWord: function (cindex, windex) {
			this.cards[cindex].words.splice(windex, 1)
		},
		changeMode: function (cindex, mode) {
			this.cards[cindex].mode = mode
		}
	}
})

jQuery(function () {
	jQuery('#submit-button').on('click', function () {
		window.localStorage.setItem('card-search-cards', JSON.stringify({
			cards: cards.cards.map(function (card) {
				return {
					mode: card.mode,
					fromDate: card.fromDate,
					toDate: card.toDate,
					words: card.words.map(function (word) {
						return word.content
					})
				}
			})
		}))

		window.location.href = window.location.origin + '/result.html'
	})
})