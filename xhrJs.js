﻿function clickIt(){
var first = document.forms["nameForm"]["firstName"].value;
var last = document.forms["nameForm"]["lastName"].value;
if((first == null || first == "") || (last == null || last == "")){
alert("Both fields are mandatory");
}else{
var abc = getActorId(first,last);

var ad = getMovieId(abc.responseText);

var mov = ad.responseText;
result = $(mov).find(".lister-item-image");
var jsonObjects = [];
 	for(var i=0; i<3;i++){
 		var movieId = $(result[i]).attr('data-tconst');
 	//	alert(id);
 		var details = fetchDetails(movieId);	
 		var reviews = fetchReviews(movieId);
 		populateReviews(reviews.responseText,i);
 		var obj = jQuery.parseJSON(details.responseText);
 		jsonObjects.push(obj);
 		details.abort();

 	}
 	abc.abort(); 
 	ad.abort();
 	populateDetails(jsonObjects);  
 	
}
}

function populateReviews(htmlResponse,i){
	div = $(htmlResponse).find("#tn15content");
	divs = $(div[0]).find("div");
	var para = $(div[0]).find("p");
	var para_len = $(para).size();
	if(para_len > 0){
		for(var j=0;j<para_len&&j<3;j++){
				var	review = $(para[j]).html();
				var h2 = $(divs[0]).find("h2");
				var small = $(divs[0]).find("small");
				var totalReviews = $(small[0]).html();
				var reviewCount = totalReviews.split(":")[0];
				var user = $($(divs[0]).find("a")[1]).html(); 
				var location = $(small[1]).html();
				var date = $(small[2]).html(); 
				var title = $(h2).html();
				var cell_data = '<b>'+title+'</b> by '+user+' '+location+' ('+reviewCount+')<br>'+review;
				$('#rc-'+(i+1)+'-'+(j+1)).html(cell_data);
		}		
	}else{
	
	
	}
}

function populateDetails(obj){
for(var i=1; i<4;i++){
result = obj[i-1];
            var thumb = result.Poster;
            var title = result.Title;
            var year = result.Year;
            var rated = result.Rated;
            var genre = result.Genre;
            var runtime = result.Runtime;
            var imdbRating = result.imdbRating;
            var imdbVotes = result.imdbVotes;
                   var details= "Title: "+title+"</br>Year: "+year+"</br>Rated: "+rated+"</br>Genre: "+genre+"</br>Runtime: "+runtime+"</br>IMDB Rating: "+imdbRating+"</br>IMDB Votes: "+imdbVotes;
				   $( "#r-"+i+"-3" ).html(details);
				   if(thumb != 'N/A'){
				   $( "#r-"+i+"-2" ).html('<img src='+thumb+'></img>');
				   }else{
				   $( "#r-"+i+"-2" ).html('No Image');
				   }
				   $( "#r-"+i+"-1" ).html(i);
          	}   
 	}

function fetchDetails(movieId){

return $.ajax({
  url: "http://www.omdbapi.com/?i="+movieId,
  dataType:'json',
  async:false
  })
  .done(function( data ){
  });

}

function fetchReviews(movieId){
return $.ajax({
  url: "phpPlusJs/fetchReviews.php?movieId="+movieId,
  async:false
  })
  .done(function( data ){
  });
}

function getActorId(first,last){
return $.ajax({
  url: "http://localhost/Kuliza_IMDB_Assignment/phpPlusJs/actorId.php?first="+first+"&last="+last,
  async:false
  })
  .done(function( data ){
  });
}

function getMovieId(actorId){
//alert("Movie"+actorId);
var arr;
return $.ajax({
  url: "http://localhost/Kuliza_IMDB_Assignment/phpPlusJs/topMovies.php?actorId="+actorId,
  async: false,
  })
  .done(function( data ) {
  });
}

