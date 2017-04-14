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
    allselected: false,
    people: []
  },
  methods: {
    selectAllOrNot: function() {
      var self = this;

      if (self.allselected === false) {
        self.people.forEach(i => {
          i.checked = true
        });
      } else {
        self.people.forEach(i => {
          i.checked = false;
        });
      }
      self.allselected = !self.allselected;
    },
    exportData: function() {
      var self = this;

      var BOM = '\uFEFF';

      var firstRow = [BOM + '姓名,漢語拼音,出生地,專業頭銜,最高學歷,留學經驗,留學國家,現任職務,工作經歷,學習經歷,民族,出生,死亡,祖籍,政黨,入黨時間,共青團,資料庫連結,特殊關係,備註'];

      // unused code
      // var otherRows = self.people
      //   .filter(i => i.checked === true)
      //   .map((i) => [i.name, i.pingyingname,
      //     i.hometown, i.profession, i.degree, i.abroadexp, i.abroadcountry,
      //     i.currentStatusSet.map((c) => {
      //       return [c.startTime.concat("~@").concat(" ").concat(c.content)];
      //     }).join(' || '),
      //     i.careerHistorySet.map((c) => {
      //       return c.startTime.concat("~@").concat(c.endTime).concat(" ").concat(c.content);
      //     }).join(' || '),
      //     i.studyHistorySet.map((c) => {
      //       return c.startTime.concat("~@").concat(c.endTime).concat(" ").concat(c.content);
      //     }).join(' || '),
      //     i.race, i.birthday, i.alive, i.zuzhi, i.party, i.enterparty, i.gongchintuan, i.url, i.relation, i.other
      //   ].join(','))

      var coma = "\/" //prevent excel change the date to english
      var otherRows = self.people
      .filter(i => i.checked ==  true)
      .map((i) => [i.name, i.pingyingname, i.hometown, i.profession, i.degree, i.abroadexp, i.abroadcountry,
      i.currentStatusSet.map((c) => [c.startTime.concat("~@").concat(" ").concat(c.content)]).join(' || '),
      i.careerHistorySet.map((c) => [c.startTime.concat("~@").concat(c.endTime).concat(" ").concat(c.content)]).join(' || '),
      i.studyHistorySet.map((c) =>  [c.startTime.concat("~@").concat(c.endTime).concat(" ").concat(c.content)]).join(' || '),
      i.race,i.birthday+coma, i.alive, i.zuzhi, i.party, i.enterparty, i.gongchintuan, i.url, i.relation, i.other
      ].join(','))

      var rows = firstRow.concat(otherRows)
      
      generateBlobAndSave(rows, "下載資料")
    }
  }
})

function generateBlobAndSave(contentArray, exportInfo) {
  var blob = new Blob(contentArray.map(function(line) {
    return line + '\n';
  }), {
    type: 'text/csv; charset=utf-8',
    endings: 'native'
  });

  var url = URL.createObjectURL(blob);

  var a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';

  a.href = url;
  a.download = Date.now() + '-' + exportInfo + '-中共菁英資料庫匯出.csv';
  a.click();

  window.URL.revokeObjectURL(url);
}

jQuery(function() {
  var cards = JSON.parse(window.localStorage.getItem('card-search-cards'))

  POST('//140.119.164.155:1081/cards', cards, function(res) {
    people.people = res.map(function(r) {
      r.checked = false
      return r
    })
  })
})

function goBack() {
  window.location.href = window.location.origin + '/index.html'
}
