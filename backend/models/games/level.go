package games

import (
	"context"
	"encoding/json"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	// "go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Level struct {
	FatherID string   `json:"game_id" bson:"game_id"` // 屬於哪個 game
	LevelId  string   `json:"id" bson:"_id"`
	Name     string   `json:"level_name" bson:"level_name"`
	Scenes   []string `json:"scene_id_array,omitempty" bson:"scene_id_array,omitempty"` //`json:"level_sceneList" bson:"level_sceneList"`
	//	SceneContent []Scene  `json:"scenes_content,omitempty" bson:"scenes_content,omitempty"`
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
