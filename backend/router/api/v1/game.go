package v1

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hunick1234/LIG/middleware/session"
	"github.com/hunick1234/LIG/models"
)

func GetGameList(c *gin.Context) {
	gameInfo, err := models.GetGames("game")

	if err != nil {

	}
	c.JSON(http.StatusOK, gin.H{
		"message": gameInfo,
	})

}

func GetUserGameList(c *gin.Context) {
	userid := models.GetUserID(session.GetSession(c))
	gameInfo, err := models.GetUserGames("game", userid)

	if err != nil {

	}
	c.JSON(http.StatusOK, gin.H{
		"message": gameInfo,
	})

}

func GetGameInfo(c *gin.Context) {
	gameid := c.Param("gameid")
	gameInfo, err := models.GetGame("game", gameid)

	if err != nil {

	}
	c.JSON(http.StatusOK, gin.H{
		"message": gameInfo,
	})
}

// create game
func CreatGame(c *gin.Context) {
	game := &models.Game{}
	c.ShouldBindJSON(game)
	game.CreatUserID = models.GetUserID(session.GetSession(c))
	game.GameId = c.Param("gameid")
	game.IsUpload = false

	game.CreatGame("game")

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
	})
}

func DeleteGame(c *gin.Context) {
	gameid := c.Param("gameID")
	game := &models.Game{GameId: gameid}

	err := game.RemoveGame("game")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"erroe": "remove game error",
		})
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "success",
	})
}
func UpdateGame() {

}

func RemoveGame() {

}
