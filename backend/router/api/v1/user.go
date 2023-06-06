package v1

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	//"github.com/hunick1234/LIG/middleware/session"
	"github.com/hunick1234/LIG/middleware/session"
	"github.com/hunick1234/LIG/models"
)

func Logout(c *gin.Context) {
	session.ClearSession(c)

	c.JSON(http.StatusOK, gin.H{
		"message": "logout",
	})
}

func Login(c *gin.Context) {
	if session.CheckSession(c) {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "u are login now ",
		})
		return
	}

	user := &models.User{}

	c.BindJSON(user)
	if !user.IsUser() {
		c.JSON(http.StatusBadRequest, gin.H{
			"erreo": "password or account error ",
		})
		return
	}

	user.UpadateUserSessionID()
	session.SaveSession(c, user.SessionID)

	c.JSON(http.StatusOK, gin.H{
		"message": "login success",
		"info": gin.H{"accountName": user.Account.AcconutName,
			"isLogin": true},
	})
}

func Singin(c *gin.Context) {

	user := &models.User{}
	c.BindJSON(user)
	if !user.IsUserVaild() {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "have user",
		})
		return
	}

	err := user.CreatUser()
	if err != nil {
		log.Print(err)
	}
	//session := sessions.Default(c)
	//c.SetCookie("cookie_name", "cookie_value", 3600, "/", "localhost", false, true)
}

func CreatUser() {

}

func UpdateUser(c *gin.Context) {
	id := models.GetUserID(session.GetSession(c))
	user := &models.User{Id: id}
	c.BindJSON(user)
}

func RemoveUser() {

}

func GetUserInfo(c *gin.Context) {
	id := session.GetSession(c)
	c.JSON(http.StatusOK, gin.H{
		"message": id,
	})
}
