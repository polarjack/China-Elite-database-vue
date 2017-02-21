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

var people = new Vue({
    el: '#table-body',
    data: {
        people: []
    },
    methods: {

    }
})

jQuery(function () {
    var cards = JSON.parse(window.localStorage.getItem('card-search-cards'))

    POST('//140.119.164.162:1081/cards', cards, function (res) {
        people.people = res.map(function (r) {
            r.checked = false
            return r
        })
    })
})