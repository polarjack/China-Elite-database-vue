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
		}
	}
})

function POST(url, data, callback, failback) {
  return jQuery
    .ajax(url, {
      method: 'POST',
      cache: false,
      data: data,
      crossDomain: true
    })
    .done(callback)
    .fail(failback)
}

jQuery(function () {
	jQuery('#submit-button').on('click', function () {
		POST('//140.119.164.162:1081/cards', {
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
		}, function (res) {
			console.log(JSON.stringify(res, null, 2))
		})
	})
})
