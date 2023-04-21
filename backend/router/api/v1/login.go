package v1

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Login(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{
		"message": "send ok",
	})

}
