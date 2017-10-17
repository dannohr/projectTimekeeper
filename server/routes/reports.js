var express = require('express');
var reports = express.Router()
var request = require ('request')

reports.get('/', function (req,res,next) {

    var data = {
        template: {'shortid':'rkJTnK2ce'},
        data: {
            "number": "123",
            "seller": {
                "name": "Next Step Webs, Inc.",
                "road": "12345 Sunny Road",
                "country": "Sunnyville, TX 12345"
            },
            "buyer": {
                "name": "Acme Corp.",
                "road": "16 Johnson Road",
                "country": "Paris, France 8060"
            },
            "items": [{
                "name": "Website design",
                "price": 300
            },
            {
                "name": "Another Thing",
                "price": 500
            },
            {
                "name": "This Works!",
                "price": .01
            }
        
        ]
        },
        options: {
            preview:true
        }
    }

    var options = {
        uri: 'http://localhost:8001/api/report',
        method: 'POST',
        json: data
    }

    request(options).pipe(res);

})

module.exports = reports