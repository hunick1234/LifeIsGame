package games

import (
	"context"
	"encoding/json"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	// "go.mongodb.org/mongo-driver/bson/primitive"
)

type Scene struct {
	FatherID  string          `json:"level_id" bson:"level_id"` //屬於哪個 level scene
	SceneId   string          `json:"id" bson:"_id"`
	Name      string          `json:"scene_name" bson:"scene_name"`
	SenceType string          `json:"scene_type" bson:"scene_type"`
	Content   json.RawMessage `json:"scene_content" bson:"scene_content"`
}

func (s *Scene) CreatScene() error {
	var err error
	collection := GameDB.DBClient.Collection("scene")
	updateLevelByID(s.FatherID, bson.M{"$addToSet": bson.M{"scene_id_array": s.SceneId}})

	_, err = collection.InsertOne(context.Background(), s)

	if err != nil {
		log.Print(" InsertOne err", err)
		return err
	}
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
	update := bson.M{"$push": bson.M{"scene_id_array": s.SceneId}}
	updateLevelByID(s.FatherID, update)
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
