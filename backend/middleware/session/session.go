package session

import (
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/hunick1234/LIG/models"

	"github.com/gin-gonic/gin"
)

const (
	sessionKey = "_session"
)

var sessionDB *models.DBConnect

func init() {

	//sessionConnet()
}
func sessionConnet() {
	sessionDB = models.NewDBConnect("user")
	sessionDB.Connect()
}

func SetSession() gin.HandlerFunc {
	// sessionCollection := sessionDB.DBClient.Collection("sessions")
	// store := mongodriver.NewStore(sessionCollection, 3600, true, []byte("secret"))
	store := cookie.NewStore([]byte("secret"))
	return sessions.Sessions(sessionKey, store)
}

func AuthSession() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		sessionID := session.Get(sessionKey)
		if sessionID == nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "not authorized",
			})
			return
		}
		c.Next()
	}
}

func SaveSession(c *gin.Context, userID any) {
	session := sessions.Default(c)
	session.Set(sessionKey, userID)
	session.Save()
}

func ClearSession(c *gin.Context) {
	session := sessions.Default(c)
	session.Clear()
	session.Save()
}

func GetSession(c *gin.Context) any {
	session := sessions.Default(c)
	sessionID := session.Get(sessionKey)
	if sessionID == nil {
		return ""
	}
	return sessionID
}

func CheckSession(c *gin.Context) bool {
	session := sessions.Default(c)
	sessionID := session.Get(sessionKey)
	return sessionID != nil

}

// LOG OUT delete session
func Logout(c *gin.Context) {
	session := sessions.Default(c)
	session.Clear()
	session.Save()
	c.JSON(http.StatusOK, gin.H{
		"message": "logout",
	})
}

func GetUserid(c *gin.Context) string {
	session := sessions.Default(c)
	id := session.Get("userid")
	return id.(string)
}

// type Session interface {
// 	SET(key interface{}, vaule interface{}) error
// 	GET(key interface{}) interface{}
// 	Delete(key interface{}) error
// }
