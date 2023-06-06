package models

import (
	"context"
	"encoding/json"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	// "go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Game struct {
	GameId      string   `json:"id" bson:"_id"`
	Name        string   `json:"game_name,omitempty" bson:"game_name,omitempty"`
	Levels      []string `json:"level_id_array,omitempty" bson:"level_id_array,omitempty"` //`json:"game_levelList" bson:"game_levelList"`
	CreatUserID string   `json:"creatUser_id,omitempty" bson:"creatUser_id,omitempty"`     //屬於哪個user id
	CreatUser   string   `json:"creatUser,omitempty" bson:"creatUser,omitempty"`           //屬於哪個user id
	IsUpload    bool     `json:"is_upload" bson:"is_upload"`
	Intro       string   `json:"game_intro,omitempty" bson:"game_intro"`
	CreateTime  string   `json:"create_time,omitempty" bson:"create_time"`
	UpdateTime  string   `json:"update_time,omitempty" bson:"update_time"`
}

type Level struct {
	FatherID string   `json:"game_id" bson:"game_id"` // 屬於哪個 game
	LevelId  string   `json:"id" bson:"_id"`
	Name     string   `json:"level_name" bson:"level_name"`
	Scenes   []string `json:"scene_id_array,omitempty" bson:"scene_id_array,omitempty"` //`json:"level_sceneList" bson:"level_sceneList"`
	//	SceneContent []Scene  `json:"scenes_content,omitempty" bson:"scenes_content,omitempty"`
}

type Scene struct {
	FatherID  string          `json:"level_id" bson:"level_id"` //屬於哪個 level scene
	SceneId   string          `json:"id" bson:"_id"`
	Name      string          `json:"scene_name" bson:"scene_name"`
	SenceType string          `json:"scene_type" bson:"scene_type"`
	Content   json.RawMessage `json:"scene_content" bson:"scene_content"`
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
	//oid, err := primitive.ObjectIDFromHex(gameid)

	//muti filter bson.D{{Key: "is_upload", Value: true},{Key: "_id", Value: gameid}}
	filter := bson.D{{Key: "is_upload", Value: true}, {Key: "_id", Value: gameid}}
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

/*
**
func (l *Level) GetLevelScenes() {

	re := []Scene{}
	pipeline := bson.A{
		bson.D{{"$match", bson.D{{"_id", l.LevelId}}}},
		bson.D{
			{Key: "$lookup",
				Value: bson.D{
					{"from", "scene"},
					{"localField", "scene_id_array"},
					{"foreignField", "_id"},
					{"as", "scenes_content"},
				},
			},
		},
	}

	err := pipelineLevelByID(&re, pipeline)
	if err != nil {
		return nil, err
	}

}
*/

func GetLevels(gameID string) (*[]Level, error) {

	type Result struct {
		Id     string   `json:"id" bason"_id"`
		Levels *[]Level `json:"levels" bson:"levels"`
	}
	collection := GameDB.DBClient.Collection("game")
	pipeline := bson.A{
		bson.D{{"$match", bson.D{{"_id", gameID}}}},
		bson.D{
			{"$lookup",
				bson.D{
					{"from", "level"},
					{"localField", "level_id_array"},
					{"foreignField", "_id"},
					{"as", "levels"},
				},
			},
		},
		bson.D{{"$project", bson.D{{"levels", 1}}}},
	}
	cursor, err := collection.Aggregate(context.TODO(), pipeline)

	if err != nil {
		log.Print("err GetGameInfo :", err)
		return nil, err
	}

	defer cursor.Close(context.TODO())
	var result Result
	for cursor.Next(context.Background()) {
		if err := cursor.Decode(&result); err != nil {
			// 處理解碼錯誤
		}
		if err := cursor.Err(); err != nil {
			// 處理游標錯誤
		}

	}
	return result.Levels, nil
}

func GetLevelById(levelID string, collection *mongo.Collection) (*Level, error) {
	var result Level

	filter := bson.D{{Key: "_id", Value: levelID}}
	err := collection.FindOne(context.Background(), filter).Decode(&result)

	if err != nil {
		log.Print("err GetGameInfo :", err)
	}
	return &result, nil
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

func (g *Game) UpdateGame() error {
	var err error
	update := g.toBSON()
	updateGameByID(g.GameId, bson.M{"$set": update})
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
		return err
	}
	//delet level and scene

	return err
}

func (g *Game) toBSON() bson.M {
	bsonData := bson.M{
		"game_name":   g.Name,
		"is_upload":   g.IsUpload,
		"game_intro":  g.Intro,
		"update_time": g.UpdateTime,
	}

	return bsonData
}

func updateGameByID(gameid string, update bson.M) error {
	var err error
	collection := GameDB.DBClient.Collection("game")
	_, err = collection.UpdateOne(context.Background(), bson.M{"_id": gameid}, update)
	if err != nil {
		log.Print(" InsertOne err", err)
	}
	return err
}
func (l *Level) CreatLevel() error {
	var err error
	collection := GameDB.DBClient.Collection("level")
	updateGameByID(l.FatherID, bson.M{"$addToSet": bson.M{"level_id_array": l.LevelId}})
	_, err = collection.InsertOne(context.Background(), l)
	if err != nil {
		log.Print(" InsertOne err", err)
	}
	return err
}
func (l *Level) UpdateLevel() error {
	var err error
	collection := GameDB.DBClient.Collection("level")
	_, err = collection.UpdateOne(context.Background(), bson.M{"_id": l.LevelId}, bson.M{})
	if err != nil {
		log.Print(" InsertOne err", err)
	}
	return err
}
func (l *Level) DeleteLevel() error {

	update := bson.M{"$push": bson.M{"level_id_array": l.LevelId}}
	updateGameByID(l.FatherID, update)
	collection := GameDB.DBClient.Collection("level")
	filter := bson.M{"_id": l.LevelId}
	_, err := collection.DeleteOne(context.TODO(), filter)
	if err != nil {
		log.Println("Failed to delete levelDB level ID:", err)
		return err
	}
	return nil
}

func updateLevelByID(levelid string, update bson.M) error {
	var err error
	collection := GameDB.DBClient.Collection("level")
	_, err = collection.UpdateOne(context.Background(), bson.M{"_id": levelid}, update)
	if err != nil {
		log.Print(" InsertOne err", err)
	}
	return err
}

func pipelineLevelByID(levels *[]Level, pipeline interface{}) error {
	var err error
	collection := GameDB.DBClient.Collection("level")
	cursor, err := collection.Aggregate(context.TODO(), pipeline)
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var level Level
		if err := cursor.Decode(&level); err != nil {
			// Handle error
		}

		*levels = append(*levels, level)
	}

	if err := cursor.Err(); err != nil {
		// Handle error
	}
	return err
}

func GetScenesbyLevel(levelID string) (*[]Scene, error) {
	var err error
	type Result struct {
		Id     string   `json:"id" bson:"_id"`
		Scenes *[]Scene `json:"scenes" bson:"scenes"`
	}
	pipeline := bson.A{
		bson.D{{"$match", bson.D{{"_id", levelID}}}},
		bson.D{
			{Key: "$lookup",
				Value: bson.D{
					{"from", "scene"},
					{"localField", "scene_id_array"},
					{"foreignField", "_id"},
					{"as", "scenes"},
				},
			},
		},
	}
	collection := GameDB.DBClient.Collection("level")
	cursor, err := collection.Aggregate(context.Background(), pipeline)
	if err != nil {
		log.Print("err get scene  :", err)
	}
	defer cursor.Close(context.Background())
	var scene Result
	for cursor.Next(context.Background()) {
		if err := cursor.Decode(&scene); err != nil {
			// Handle error
		}
		if err := cursor.Err(); err != nil {
			// 處理游標錯誤
		}
	}

	b, err := json.MarshalIndent(&scene.Scenes, "", "\t")
	if err != nil {
		log.Print("err get scene :", err)
	}
	log.Print("scene", string(b))
	return scene.Scenes, err
}

func (s *Scene) CreatScene() error {
	var err error
	collection := GameDB.DBClient.Collection("scene")
	_, err = collection.InsertOne(context.Background(), s)

	if err != nil {
		log.Print(" InsertOne err", err)
		return err
	}
	updateLevelByID(s.FatherID, bson.M{"$addToSet": bson.M{"scene_id_array": s.SceneId}})
	return nil
}
func (s *Scene) UpdateScene() error {
	var err error
	update := s.toBSON()
	//_, err = collection.InsertOne(context.Background(), s)
	updateSceneByID(s.SceneId, bson.M{"$set": update})
	if err != nil {
		log.Print(" Updata err", err)
		return err
	}
	return nil
}

func (s *Scene) DeleteScene() error {
	var err error
	collection := GameDB.DBClient.Collection("scene")
	filter := bson.M{"_id": s.SceneId}
	_, err = collection.DeleteOne(context.Background(), filter)

	if err != nil {
		log.Println("Failed to delete SceneDB sceneID:", err)
		return err
	}
	return nil
}

func updateSceneByID(sceneid string, update bson.M) error {
	var err error
	collection := GameDB.DBClient.Collection("scene")
	_, err = collection.UpdateOne(context.Background(), bson.M{"_id": sceneid}, update)
	if err != nil {
		log.Print(" InsertOne err", err)
	}
	return err
}

func (s *Scene) toBSON() bson.M {
	bsonData := bson.M{
		"scene_type":    s.SenceType,
		"scene_name":    s.Name,
		"scene_content": s.Content,
	}

	return bsonData
}
func PostGame() {

}

// patch game
func PatchGame() {

}
