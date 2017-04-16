
// Examples on various routes via node backend (queries) to mysql

/*$.ajax({
    type: 'POST',
    url: '/queries/read-lorem',
    data: JSON.stringify([1]),
    contentType: "application/json"
}).done(function(data){
  console.log('reading the lorems row with id 1', data);
});


$.ajax({
  type: 'POST',
  url:'/queries/read-lorem-ipsums',
  contentType: "application/json",
  data: JSON.stringify([2]),
  contentType: "application/json"
}).done(function(data){
  console.log('reading the lorem-ipsums full joins with lorem id 2', data);
});

$.ajax({
    type: 'POST',
    url: '/queries/write-ipsum',
    data: JSON.stringify({"blabla": "hejhuj", "lorem": 20}),
    contentType: "application/json"
}).done(function(result){
  console.log('writing an ipsums row', result);
});

$.ajax({
    type: 'GET',
    url: '/queries/read-lorems'
}).done(function(data){
  console.log('reading all the the lorems rows', data);
});

$.ajax({
    type: 'GET',
    url: '/queries/read-ipsums'
}).done(function(data){
  console.log('reading all the the ipsums rows', data);
});

$.ajax({
    type: 'GET',
    url: '/queries/read-lorems-ipsums'
}).done(function(data){
  console.log('reading all the the lorems-ipsums left joins', data);
});
*/

var arrArticles, priorityAreas; //An object to hold all the articles and the priority areas
//var priorityAreas = []; //An object to hold the priority areas
$.getJSON("json/articles.json", function (data) { //get the articles from the json file
  console.log(data);
  arrArticles = data;
  $.getJSON("json/priorityAreas.json", function (data) { //get the priorityAreas from the json file
  console.log(data);
  priorityAreas = data;
  $(start);
  });
});

function start(){
  var showContact = contact();
  /*routing*/
  this.home = '/home'; 
  this.kontakt = '/kontakt';
  this.about = '/about';
  this.about = '/membership';
  this.priority_areas = '/priority_areas';
  
  $('.page-content').append(displayNavbar());
  console.log(arrArticles[arrArticles.length -1]);
  $('.page-content').append(article(arrArticles[0],arrArticles[1]));
  $('.page-content').append(displayFooter());

  var router = new Router({

      '/home': ()=>{ 
        console.log("********** test in router");
        $('.page-content').empty(); 
        $('.page-content').append(displayNavbar());
        $('.page-content').append(article(arrArticles[0],arrArticles[1]));
        $('.page-content').append(displayFooter());
        },
      '/kontakt': ()=>{ 
        console.log("********** test in router");
        $('.page-content').empty(); 
        $('.page-content').append(displayNavbar());
        $('.page-content').append(showContact);
        $('.page-content').append(displayFooter());

        },

        '/about': ()=>{ 
          $('.page-content').empty(); 
          $('.page-content').append(displayNavbar());
          $('.page-content').append(about_us(arrArticles[0]));
          $('.page-content').append(displayFooter());

        },
        '/membership': ()=>{ 
          $('.page-content').empty(); 
          $('.page-content').append(displayNavbar());
          $('.page-content').append(membership(arrArticles[1]));
          $('.page-content').append(displayFooter());

        },
        '/priority_areas': ()=>{ 
          $('.page-content').empty(); 
          $('.page-content').append(displayNavbar());
          $('.page-content').append(priority_areas(priorityAreas));
          $('.page-content').append(displayFooter());

        }
  });



}

$(document).on('click', '#home', function(){

  $('.col-md-8').remove(); 
  $('.footer').remove();
  $('.page-content').append(article(arrArticles[0]));
  $('.page-content').append(displayFooter());

});
