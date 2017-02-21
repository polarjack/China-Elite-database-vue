Vue.component('word-item', {
  template: '\
    <div class="collection-item">\
      {{title}}\
      <i class="material-icons right" v-on:click="$emit(\'remove\')" >delete</i>\
    </div>',
  props: ['title']
});

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
});

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

Vue.component('new-field', {
  template: '\
  <div class="row">\
    <div class="col s12 m8">\
      <div id="card-example" class="card">\
        <div class="card-content">\
        <span class="card-title" style="display:inline">New Card<i class="material-icons" style="float:right;">close</i></span>\
        <div class="row">\
          <div>\
            <label for="last_name1">INPUT</label>\
            <input v-on:keyup.enter="addNewWord" placeholder="" id="last_name1" type="text" class="validate">\
            <div class="collection">\
              <div class="collection-item" is="new-item" v-for="(word, index) in words" v-bind:title="word" v-on:remove="words.splice(index, 1)"><i class="material-icons right">delete</i></div>\
            </div>\
          </div>\
        </div>\
        </div>\
      </div>\
    </div>\
  </div>\
  '
  ,
  component: {
    'new-item' : {
      template: '\
        <div class="collection-item">\
          testtest\
          <i class="material-icons right">delete</i>\
        </div>'
    }
  }
});

new Vue({
  el:'#all-card'
})

new Vue({
  el:'#new-field-test'
})

//
// jQuery(function () {
//   jQuery('#submit-button').on('click', function () {
//     POST('//localhost:1081/cards', {
//       cards: [{
//         fromDate: aCard.fromDate,
//         toDate: aCard.toDate,
//         mode: aCard.mode,
//         words: aCard.words
//       }]
//     }, function (res) {
//       console.log(JSON.stringify(res, null, 2))
//     })
//   })
// })
