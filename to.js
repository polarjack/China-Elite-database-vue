// var aCard = new Vue({
//   el: '#card-example',
//   data: {
//     newWord: '',
//     words: [],
//     mode: 'include',
//     fromDate: '',
//     toDate: ''
//   },
//   methods: {
//     addNewWord: function () {
//       this.words.push(this.newWord)
//       this.newWord = ''
//     }
//   }
// });


new Vue({
	el: '#field',
	data: {
		cards: [{
      inputWord: '',
      mode: 'include',
      fromDate: '',
      toDate: '',
			words: [{
				content: 'a'
			}, {
				content: 'b'
			}]
		}]
	},
	methods: {
		addWord: function(cindex) {
			this.cards[cindex].words.push({
				content: this.cards[cindex].inputWord
			})
      this.cards[cindex].inputWord = ""
		},
		addCard: function() {
			this.cards.push({
        inputWord: '',
        mode: 'include',
        fromDate: '',
        toDate: '',
				words: []
			})
		},
    deleteCard: function(cindex) {
			this.cards.splice(cindex, 1)
		},
    deleteWord: function(cindex, windex) {
      this.cards[cindex].words.splice(windex, 1)
    }
	}
})
