package games

import (
	"context"
	"log"

	"github.com/hunick1234/LIG/models"
	"go.mongodb.org/mongo-driver/bson"
	// "go.mongodb.org/mongo-driver/bson/primitive"
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

var GameDB *models.DBConnect

func init() {
	connectGameDB()

}

func connectGameDB() {
	GameDB = models.NewDBConnect("games")
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

func PostGame() {

}

// patch game
func PatchGame() {

}
