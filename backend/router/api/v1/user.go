package v1

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hunick1234/LIG/models"
)

func Login(ctx *gin.Context) {

	ctx.JSON(http.StatusOK, gin.H{
		"message": "send ok",
	})
}

func CreatUser(c *gin.Context) {
	json := &models.User{}
	c.BindJSON(json)
	log.Print(json)
	json.InsertOneUser()
	c.JSON(http.StatusOK, gin.H{
		"json": *json,
	})
}

func GetUser(c *gin.Context) {
	models.GetUser()
	c.JSON(http.StatusOK, gin.H{
		"message": "send ok",
	})
}

func AddUser() {

}

func UpdateUser() {

}

func RemoveUser() {

}
