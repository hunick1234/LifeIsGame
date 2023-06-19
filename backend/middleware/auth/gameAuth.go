package auth

import (
	"log"

	"github.com/gin-gonic/gin"
)

func AuthAcessGameEditUser() gin.HandlerFunc {

	return func(c *gin.Context) {
		log.Println("AuthAcessGameEditUser")
		c.Next()
	}

}
