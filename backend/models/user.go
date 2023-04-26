package models

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
)

type User struct {
	Id       string `json:"id,omitempty" bson:"_id,omitempty"`
	*Account `json:"account,inline" bson:"account,inline"`
	Games    []string `json:"game_id_array,omitempty" bson:"game_id_array,omitempty"`
}

type Account struct {
	AcconutName string `json:"account_name" bson:"account_name"`
	Email       string `json:"email" bson:"email"`
	Password    string `json:"password" bson:"password"` //encod
}

var UserDB *DBConnect

func init() {
	connectUserDB()
}

func connectUserDB() {
	UserDB = NewDBConnect("user")
	UserDB.Connect()
}

func GetUser() (*User, error) {
	collection := UserDB.DBClient.Collection("user")
	filter := bson.D{{"_id", "12kddsf34f"}}
	var result User
	var err error
	err = collection.FindOne(context.Background(), filter).Decode(&result)
	if err != nil {
		log.Print(err)
	}
	return &result, err
}

func (u *User) InsertOneUser() error {
	collection := UserDB.DBClient.Collection("user")
	log.Print(*u)
	_, err := collection.InsertOne(context.Background(), u)
	if err != nil {
		log.Print(" InsertOne err", err)
	}
	// defer func() {
	// 	err = UserDB.Client.Disconnect(context.Background())
	// 	if err != nil {
	// 		log.Print("err", err)
	// 	}
	// 	log.Print("db disconnect")
	// }()
	return err
}

func (u *User) PutUser() {

}

func (u *User) DeletUser() {

}
