angular.module("starter.configs", [])

.constant("BaseConfiguration", {
	"url": "https://www.example.com",
	"debug": false
})

.constant("APP", {
	"devMode": false
})

.constant("ServerConfiguration", {
	"baseApiUrl": "http://www.production.com/api/v1/",
	"domain": "http://www.production.com"
})

;