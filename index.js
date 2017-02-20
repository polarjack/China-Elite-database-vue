Vue.component('word-item', {
  template: '\
    <div class="collection-item">\
      {{title}}\
      <i class="material-icons right" v-on:click="$emit(\'remove\')" >delete</i>\
    </div>',
  props: ['title']
})

var aCard = new Vue({
  el: '#card-example',
  data: {
    newWord: '',
    words: [],
    mode: 'include',
    fromDate: '',
    toDate: ''
  },
  methods: {
    addNewWord: function () {
      this.words.push(this.newWord)
      this.newWord = ''
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
    POST('//localhost:1081/cards', {
      cards: [{
        fromDate: aCard.fromDate,
        toDate: aCard.toDate,
        mode: aCard.mode,
        words: aCard.words
      }]
    }, function (res) {
      console.log(JSON.stringify(res, null, 2))
    })
  })
})