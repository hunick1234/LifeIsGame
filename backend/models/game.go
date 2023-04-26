package models

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
)

type Game struct {
	GameId string  `json:"game_id" bson:"game_id"`
	Name   string  `json:"game_name" bson:"game_name"`
	Levels []Level `json:"level_id_array" bson:"level_array"` //`json:"game_levelList" bson:"game_levelList"`
}

type Level struct {
	LevelId string  `json:"level_id" bson:"level_id"`
	Name    string  `json:"level_name" bson:"level_name"`
	Scenes  []Scene `json:"inline" bson:"inline"` //`json:"level_sceneList" bson:"level_sceneList"`
}

type Scene struct {
	SceneId string `json:"scene_id" bson:"scene_id"`
	Name    string `json:"scene_name" bson:"scene_name"`
}

var GameDB *DBConnect

func init() {
	connectGameDB()
}

func connectGameDB() {
	GameDB = NewDBConnect("games")
	GameDB.Connect()
}

func GetGameInfo(gameCollection string) (*Game, error) {
	var err error
	var game Game
	collection := UserDB.DBClient.Collection(gameCollection)
	games, err := collection.Find(context.Background(), bson.D{})
	if err != nil {
		log.Print("err", err)
	}
	log.Print("game", games)
	// defer func() {
	// 	err = UserDB.Client.Disconnect(context.Background())
	// 	if err != nil {
	// 		log.Print("err", err)
	// 	}
	// 	log.Print("db disconnect")
	// }()
	return &game, err
}

func PostGame() {

}
