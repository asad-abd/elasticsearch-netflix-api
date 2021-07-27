var elasticsearch = require("elasticsearch");

var client = new elasticsearch.Client({
  hosts: ["https://yckd5kiwbh:koejqf0pwn@ir-express-elasticse-4727300251.us-east-1.bonsaisearch.net:443"]
});
// "http://localhost:9200"

module.exports = client;
