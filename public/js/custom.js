$('#newOrder').click( () => {
    
    var settings = {
        "url": "http://localhost:3000/orders",
        "method": "POST",
        "crossDomain": true,
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({"date":"2020-06-29","name":"Almoço","description":"","value":15,"revenue":false,"settled":false,"category_id":"5effb2b80b241e1830fa098e"}),
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });


})