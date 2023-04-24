package models

import (
	"context"
	"log"

	"github.com/hunick1234/LIG/controller"
)

type User struct {
	Id string `json:"id,omitempty" bson:"_id,omitempty"`
	*Account
	Games []Game `json:"games,omitempty" bson:"games,omitempty"`
}

type Account struct {
	AcconutName string `json:"account" bson:"account"`
	Email       string `json:"email" bson:"email"`
	Password    string `json:"password" bson:"password"` //encod
}

var connectDB controller.DBConnect

func init() {
	connetUserDB()
}

func connetUserDB() {
	connectDB = *controller.NewDBConnect("user")
	connectDB.Connect()
}

func GetUser() *User {
	//connet db find user
	return &User{}
}

func (u *User) InsertOneUser() error {
	collection := connectDB.DBClient.Collection("user")

	_, err := collection.InsertOne(context.Background(), u)

	defer func() {
		err = connectDB.Client.Disconnect(context.Background())
		if err != nil {
			log.Print("err", err)
		}
		log.Print("db disconnect")
	}()
	return err
}

func (u *User) PutUser() {

}

func (u *User) DeletUser() {

}
