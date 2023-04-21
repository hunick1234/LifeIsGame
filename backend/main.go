package main

import (
	//"net/http"

	//"github.com/gin-gonic/gin"
	"net/http"

	//"github.com/hunick1234/LIG/db"
	"github.com/hunick1234/LIG/router"
)

func main() {
	//db.Connext()

	server := &http.Server{
		Addr:    ":8080",
		Handler: router.Router(),
	}
	server.ListenAndServe()

}
