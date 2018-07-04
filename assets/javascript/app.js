$(document).ready( function(){

    $("#submitSearch").on('click', function(event) {
        var searchInput = $("#searchInput").val();
        event.preventDefault();
        $.ajax({
          url: `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${searchInput}&limit=20&callback=?`,
          method: "GET",
          dataType: "jsonp",
          success: function(data) {
            console.log(data);
            $("#dump").html(""); // clears out contents from earlier searches
            $("#dump").append("<h5>Click to open in Wikipedia:</h5>")
            for (var i = 0; i < data[1].length; i++) {
              $("#dump").append(`<a href='${data[3][i]}' target='_blank'><div class='card horizontal hoverable'><div class='row'><div id='image${i}' class='card-image col s3 valign-wrapper'></div><div class='card-stacked col s9'><div class='card-content'><span class='card-title truncate'>${data[1][i]}</span><p>${data[2][i]}&nbsp;</p></div></div></div></div></a>`);
            console.log(data[3][i])
            }
            $.ajax({
              url: `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&wbptterms=description&gpssearch=${searchInput}&gpslimit=20`,
              method: "GET",
              dataType: "jsonp",
              success: function(newData) {
                for (var i = 0; i < 20; i++) {
                  if (newData.query.pages[i].hasOwnProperty("thumbnail") === true) {
                    $("#image" + (newData.query.pages[i].index - 1)).html(`<img src='${newData.query.pages[i].thumbnail.source}' class='responsive-img valign'>`);
                  } else {
                    $("#image" + (newData.query.pages[i].index - 1)).html("<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Article_icon_cropped.svg/512px-Article_icon_cropped.svg.png' class='responsive-img valign articleIcon'>");
                  }
                }
              },
              error: function() {
                console.log("second call unsuccessful");
              }
            })
          },
          error: function() {
            alert("Error, please try again");
          }
        });
      });
      
      $("#clear").click(function() {
        $("#searchInput").val("").focus();
        $("#dump").html("");
      });


    // $("#submitSearch").on('click', function(event) {
    //     var searchInput = $("#searchInput").val();
    //     event.preventDefault();

    //     var queryUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${searchInput}&limit=20&callback=?`;

    //     $.ajax({
    //       url: queryUrl,
    //       method: "GET",
    //       dataType: "jsonp"
    //     }).then( function(response){

    //         console.log(response);

    //         var results = response.data;
            
    //         for (var i = 0; i < results[1].length; i++) {

    //             var authorCard = $(`<div class="card border-dark"><img id="images${i}" class="card-img-top" src="" alt="author photo"><div class="card-body text-dark"><h5 class="card-title">${results[1][i]}</h5><p class="card-text">${results[2][i]}&nbsp;</p><a target="_blank" href="${results[3][i]}" class="btn btn-outline-primary">download</a></div></div>`);

    //             $('#dump').append(authorCard);
    //         }

    //     }); // closing then function
          
    //       success: function(data) {
    //         // var data;
    //         // clears out contents from earlier searches
    //         $("#output").html("");
    //         for (var i = 0; i < data[1].length; i++) {
    //           $("#output").append(`<a href='${data[3][i]}' target='_blank'><div class='card horizontal hoverable'><div class='row'><div id='image${i}' class='card-image col s3 valign-wrapper'></div><div class='card-stacked col s9'><div class='card-content'><span class='card-title truncate'>${data[1][i]}</span><p>${data[2][i]}&nbsp;</p></div></div></div></div></a>`);
    //         }
            
    //         $.ajax({
    //           url: `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&wbptterms=description&gpssearch=${searchInput}&gpslimit=10`,
    //           method: "GET",
    //           dataType: "jsonp",
              
    //           success: function(newData) {
    //             for (var i = 0; i < 20; i++) {
    //               if (newData.query.pages[i].hasOwnProperty("thumbnail") === true) {
    //                 $("#image" + (newData.query.pages[i].index - 1)).html(`<img src='${newData.query.pages[i].thumbnail.source}' class='responsive-img valign'>`);
    //               }
    //             }
    //           }
              
            
    //         })
    //       }
    //     });
    //   });
      
      $("#clear").click(function() {
        $("#searchInput").val("").focus();
        $("#output").html("");
      }); // closing clear button function












































}); // closing ready function