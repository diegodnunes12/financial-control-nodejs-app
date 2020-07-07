const request = require('request')

const orders = (url, callback) => {   

    request({url: url, json: true}, (err, response) => {
        if(err){
            callback({
                message : `Something went wrong ${err}`,
                code : 500
            }, undefined)           
        }
        
        if(response.body === undefined){
            callback({
                message : `No data found`,
                code : 404
            }, undefined)
        }else{
            const parseJson = response.body

            const data = {  _id, name, description, value, date, revenue, settled, category_id } = parseJson

            callback(undefined, data)     
        }   
    })
}

module.exports = orders