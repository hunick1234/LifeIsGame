package models

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Game struct {
	GameId      string   `json:"id,omitempty" bson:"_id,omitempty"`
	Name        string   `json:"game_name" bson:"game_name,omitempty"`
	Levels      []string `json:"level_id_array,omitempty" bson:"level_id_array,omitempty"` //`json:"game_levelList" bson:"game_levelList"`
	CreatUserID string   `json:"creatUser_id,omitempty" bson:"creatUser_id,omitempty"`     //屬於哪個user id
	CreatUser   string   `json:"creatUser,omitempty" bson:"creatUser,omitempty"`           //屬於哪個user id
	IsUpload    bool     `json:"is_upload" bson:"is_upload"`
	Intro       string   `json:"game_intro,omitempty" bson:"game_intro"`
	CreateTime  string   `json:"create_time,omitempty" bson:"create_time"`
	UpdateTime  string   `json:"update_time,omitempty" bson:"update_time"`
}

type Level struct {
	FatherID string   `json:"father_id" bson:"father_id"` // 屬於哪個 game
	LevelId  string   `json:"level_id" bson:"level_id"`
	Name     string   `json:"level_name" bson:"level_name"`
	Scenes   []string `json:"inline" bson:"inline"` //`json:"level_sceneList" bson:"level_sceneList"`
}

type Scene struct {
	FatherID string `json:"father_id" bson:"father_id` //屬於哪個 level scene
	SceneId  string `json:"scene_id" bson:"scene_id"`
	Name     string `json:"scene_name" bson:"scene_name"`
}

var GameDB *DBConnect

func init() {
	connectGameDB()

}

func connectGameDB() {
	GameDB = NewDBConnect("games")
	GameDB.Connect()
}

func GetGames(Collection string) (*[]Game, error) {

	var err error

	var results []Game
	//oid, err := primitive.ObjectIDFromHex("643f8aff342516bffc5a6a88")
	filter := bson.D{{Key: "is_upload", Value: true}}
	collection := GameDB.DBClient.Collection(Collection)
	cursor, err := collection.Find(context.Background(), filter)
	if err != nil {
		log.Print("err GetGameInfo :", err)
	}
	err = cursor.All(context.TODO(), &results)
	if err != nil {
		return nil, err
	}

	// defer func() {
	// 	err = UserDB.Client.Disconnect(context.Background())
	// 	if err != nil {
	// 		log.Print("err", err)
	// 	}
	// 	log.Print("db disconnect")
	// }()
	return &results, err
}

func GetUserGames(Collection string, userid string) (*[]Game, error) {

	var err error
	var results []Game

	filter := bson.D{{Key: "creatUser_id", Value: userid}}
	collection := GameDB.DBClient.Collection(Collection)
	cursor, err := collection.Find(context.Background(), filter)
	if err != nil {
		log.Print("err GetGameInfo :", err)
	}
	err = cursor.All(context.TODO(), &results)
	if err != nil {
		return nil, err
	}

	// defer func() {
	// 	err = UserDB.Client.Disconnect(context.Background())
	// 	if err != nil {
	// 		log.Print("err", err)
	// 	}
	// 	log.Print("db disconnect")
	// }()
	return &results, err
}

func GetGame(Collection string, gameid string) (*Game, error) {
	var err error
	var game Game
	oid, err := primitive.ObjectIDFromHex(gameid)

	//muti filter bson.D{{Key: "is_upload", Value: true},{Key: "_id", Value: gameid}}
	filter := bson.D{{Key: "is_upload", Value: true}, {Key: "_id", Value: oid}}
	collection := GameDB.DBClient.Collection(Collection)
	err = collection.FindOne(context.Background(), filter).Decode(&game)
	if err != nil {
		log.Print("err GetGameInfo :", err)
	}
	log.Print("game", game)
	// defer func() {
	// 	err = UserDB.Client.Disconnect(context.Background())
	// 	if err != nil {
	// 		log.Print("err", err)
	// 	}
	// 	log.Print("db disconnect")
	// }()
	return &game, err

}

func (g *Game) CreatGame(Collection string) error {
	var err error
	collection := GameDB.DBClient.Collection(Collection)
	_, err = collection.InsertOne(context.Background(), g)
	if err != nil {
		log.Print(" InsertOne err", err)
	}
	return err
}

func (g *Game) UpdateGame(Collection string) error {
	var err error
	collection := GameDB.DBClient.Collection(Collection)
	_, err = collection.UpdateOne(context.Background(), bson.M{"_id": g.GameId}, bson.M{"$set": bson.M{"name": g.Name}})
	if err != nil {
		log.Print(" InsertOne err", err)
	}
	return err
}

func (l *Level) CreatLevel(Collection string) error {
	var err error
	collection := GameDB.DBClient.Collection(Collection)
	_, err = collection.InsertOne(context.Background(), l)
	if err != nil {
		log.Print(" InsertOne err", err)
	}
	return err
}
func (l *Level) UpdateLevel(Collection string) error {
	var err error
	collection := GameDB.DBClient.Collection(Collection)
	_, err = collection.UpdateOne(context.Background(), bson.M{"_id": l.LevelId}, bson.M{})
	if err != nil {
		log.Print(" InsertOne err", err)
	}
	return err
}

func (s *Scene) CreatScene(Collection string) error {
	var err error
	collection := GameDB.DBClient.Collection(Collection)
	_, err = collection.InsertOne(context.Background(), s)
	if err != nil {
		log.Print(" InsertOne err", err)
	}
	return err
}
func (s *Scene) UpdateScene(Collection string) error {
	var err error
	collection := GameDB.DBClient.Collection(Collection)
	_, err = collection.UpdateOne(context.Background(), bson.M{"_id": s.SceneId}, bson.M{})
	if err != nil {
		log.Print(" InsertOne err", err)
	}
	return err
}

func (g *Game) RemoveGame(Collection string) error {
	var err error
	collection := GameDB.DBClient.Collection(Collection)
	_, err = collection.DeleteOne(context.Background(), bson.M{"_id": g.GameId})
	if err != nil {
		log.Print(" InsertOne err", err)
	}
	//delet level and scene

	return err
}

func PostGame() {

}

// patch game
func PatchGame() {

}
