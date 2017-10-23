var express = require('express');
var reports = express.Router()
var request = require ('request')

const invoiceReport = reports.get('/', function (req,res,next) {
    
    console.log(req)
    var data = {
        template: {'shortid':'rkJTnK2ce'},
        data: {
            "number": "123",
            "seller": {
                "name": "Dan's Amazing Website",
                "road": "12345 Sunny Road",
                "country": "Sunnyville, TX 12345"
            },
            "buyer": {
                "name": "Pat's Company",
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
            },
            {
                "name": "This Works!",
                "price": .01
            },
            {
                "name": "Apples",
                "price": 150.02
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


module.exports = {
    invoiceReport
}