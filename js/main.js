
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

var arrArticles, priorityAreas, team; //An object to hold all the articles and the priority areas
//var priorityAreas = []; //An object to hold the priority areas
$.getJSON("json/articles.json", function (data) { //get the articles from the json file
  console.log(data);
  arrArticles = data;
  $.getJSON("json/priorityAreas.json", function (data) { //get the priorityAreas from the json file
  console.log(data);
  priorityAreas = data;
  $.getJSON("json/team.json", function (data) { //get the priorityAreas from the json file
    console.log(data);
  team = data;
  $(start);
  });
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
  this.team = '/team';
  
  showPage(arrArticles.slice(0, 2), "home"); //show the 1st 2 elements of the array arrArticles 

  var router = new Router({

      '/home': ()=>{ 
        showPage(arrArticles.slice(0, 2), "idArticle_home"); 
        },

        '/about': ()=>{ 
          showPage(arrArticles[0], "idAboutus");
        },

        '/membership': ()=>{ 
          showPage(arrArticles[1], "idMembership");
        },

        '/priority_areas': ()=>{ 
          showPage(priorityAreas, "idPriority_areas");         
        },

        '/team': ()=>{ 
         showPage(team, "idTeam"); 
        },
        
       '/kontakt': ()=>{ 
         showPage(showContact);
        }
  });


}

function showPage(eachObject, idItem){
    $('.page-content').empty();
    $('.page-content').append(displayNavbar());
    var $sections = $('<section id="'+ idItem +'"></section>');

    switch(idItem){
      case "idArticle_home": 
                    $('.page-content').append(article(eachObject));
                    $('.page-content').append(displayFooter());
                    break;

      case "idAboutus": 
                    $('.page-content').append($sections);
                    $('#' + idItem).append(about_us(eachObject));  
                     $('.page-content').append(displayFooter());                  
                    break; 

      case "idMembership": 
                    $('.page-content').append($sections);
                    $('#' + idItem).append(membership(eachObject)); 
                     $('.page-content').append(displayFooter());                   
                    break;       
       case "idTeam":   //display team tab 
                     $('.page-content').append($sections);
                     /*var counterColumn = 0;  //to count td in the table
                     var tableTeam = $(`<table class="tableTeam_class"></table>`);//creating a table
                     $('#' + idItem).append(tableTeam); //putting the table on the section
                     this.tableTeam_row; //declaring the row
                      
                     //displaying every team member in the table
                     for (var prop in eachObject) {
                      this.tableTeam_row = $('<tr class=" rowTeam_'+ counterColumn + '"></tr>');                      
                      
                      if(counterColumn%2 ===0){ //To creat a new row, 1 row has 2 columns
                        
                        $(tableTeam).append(this.tableTeam_row); 
                        $(this.tableTeam_row).append('<td class="columnTableTeam col-xs-6 ">'+ displayTeam(eachObject[prop]) + '</td>'); 
                        counterColumn++;  
                      }
                       else { //add a column on the row
                        $('.rowTeam_'+ (counterColumn-1)).append('<td class="columnTableTeam  col-xs-6">'+ displayTeam(eachObject[prop]) + '</td>'); 
                        counterColumn++;
                        }

                      }*/
                      for (var prop in eachObject) {
                        $('#' + idItem).append(displayTeam(eachObject[prop]));
                      }
                       $(displayFooter()).insertAfter('#' + idItem);//displaying the footer
                      //$('#' + idItem).append(displayTeam(eachObject[prop]));
                    //}
                    break;

      case "idPriority_areas": 
                     $('.page-content').append($sections);
                     for (var prop in eachObject) {
                      $('#' + idItem).append(priority_areas(eachObject[prop]));
                    }
                    $('.page-content').append(displayFooter());
                    break;
      default: break
    }
   
  }


