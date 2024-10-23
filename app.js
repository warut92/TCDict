function getDictionary() {

  //thai - dict
  var csvURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQv41M_4H4e-IzASRjEAEhhc6H9ayGsUdBXOuQ2rQQYTOhOn4b8PWaz4WPDWtT530eTWvfzijSuqxfV/pub?gid=0&single=true&output=csv";
  var searchPlaceholder = 'ค้นหา';

  //chinese english
  //https://docs.google.com/spreadsheets/d/e/2PACX-1vQv41M_4H4e-IzASRjEAEhhc6H9ayGsUdBXOuQ2rQQYTOhOn4b8PWaz4WPDWtT530eTWvfzijSuqxfV/pub?gid=1452748587&single=true&output=csv

  $("#parsed_csv_list").empty();
  $("#search").empty();
  $("#search").html("<input id='targetLang_search' placeholder=" + searchPlaceholder + " type='search'>");

  Papa.parse(csvURL, {
    download: true,
    header: false,
    //worker: true,
    //step: function(row) {
    //  console.log("Row:", row.data);
    //},
    complete: displayHTMLTable
  });
}

function displayHTMLTable(results) {
  var table = "<table class='table'><thead><tr>";
  var data = results.data;
  var header = data.shift();
  for(h=0;h<header.length;h++){
    table+= "<th>" + header[h] + "</th>";
  }
  table+= "</tr></thead><tbody id='jetsContent'>";

  for(i=0;i<data.length;i++){
    table+= "<tr>";
    var row = data[i];
    for(j=0;j<row.length;j++){
      var cell = row[j];
      table+= "<td>" + cell + "</td>";
    }
    table+= "</tr>";
  }
  table+= "</tbody></table>";
  $("#parsed_csv_list").html(table);
  var jets = new Jets({
    contentTag: '#jetsContent',
    searchInSpecificColumn: true,
    callSearchManually: true,
    columns: [0,2],
    diacriticsMap: {
      a: "ÁÀÃÂÄáàãâäāǎ",
      я: "я́",
      e: "ÉÈÊËéèêëēě",
      i: "ÍÌÎÏíìîïīǐ",
      o: "ÓÒÕÔÖóòõôöōǒ",
      u: "ÚÙÛÜúùûŭüū",
      c: "ĉ",
      g: "ĝ",
      h: "ĥ",
      j: "ĵ",
      s: "ŝ",
    }
  });
  $("#targetLang_search").on("input", function(event) { jets.search(event.target.value, [0][1]) } );
}