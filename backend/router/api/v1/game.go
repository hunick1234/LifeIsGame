package v1

import (
	// "encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/hunick1234/LIG/middleware/session"
	"github.com/hunick1234/LIG/models"
)

func GetGameList(c *gin.Context) {
	gameList, err := models.GetGames("game")

	if err != nil {

	}
	c.JSON(http.StatusOK, gin.H{
		"message": gameList,
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
	game.GameId = c.Param("gameID")
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
func UpdateGame(c *gin.Context) {
	gameid := c.Param("gameID")
	game := &models.Game{GameId: gameid}
	c.ShouldBindJSON(game)
	err := game.UpdateGame()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"erroe": "update game error",
		})
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "success",
	})
}

func RemoveGame() {

}

func GetLevels(c *gin.Context) {
	gameID := c.Param("gameID")
	levelList, err := models.GetLevels(gameID)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{
			"error":   err,
			"message": nil,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": levelList,
	})
}

// creat level
func CreatLevel(c *gin.Context) {
	level := &models.Level{}
	c.ShouldBindJSON(level)
	level.FatherID = c.Param("gameID")
	level.LevelId = c.Param("levelID")

	level.CreatLevel()

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
	})
}

func DeleteLevel(c *gin.Context) {
	level := &models.Level{}
	level.FatherID = c.Param("gameID")
	level.LevelId = c.Param("levelID")

	err := level.DeleteLevel()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "success Delet",
	})
}

func UpdateLevel(c *gin.Context) {

}
func GetScenes(c *gin.Context) {
	levelID := c.Param("levelID")

	sceneList, err := models.GetScenesbyLevel(levelID)

	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{
			"error":   err,
			"message": nil,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": sceneList,
	})
}

func CreatScene(c *gin.Context) {
	// levelID := c.Param("levelID")
	scene := &models.Scene{}
	c.ShouldBindJSON(scene)

	scene.CreatScene()
	c.JSON(http.StatusOK, gin.H{
		"message": "success",
	})
}

func DeleteScene(c *gin.Context) {
	scene := &models.Scene{}
	scene.FatherID = c.Param("levelID")
	scene.SceneId = c.Param("sceneID")

	err := scene.DeleteScene()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "success Delet",
	})
}

func UpdateScene(c *gin.Context) {
	scene := &models.Scene{}
	c.ShouldBindJSON(scene)
	scene.FatherID = c.Param("levelID")
	scene.SceneId = c.Param("sceneID")

	err := scene.UpdateScene()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "success Updata",
	})
}
