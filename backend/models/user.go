package models

import (
	"context"
	"log"

	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	//"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	SessionID string `json:"session_id,omitempty" bson:"session_id,omitempty"`
	Id        string `json:"id,omitempty" bson:"_id,omitempty"`
	*Account  `json:"account,inline" bson:"account,inline"`
	Games     []string `json:"game_id_array,omitempty" bson:"game_id_array,omitempty"`
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

func (u *User) GetUser(userid string) (*User, error) {
	collection := UserDB.DBClient.Collection("user")
	filter := bson.D{{Key: "_id", Value: "df"}}
	var result User
	var err error
	err = collection.FindOne(context.Background(), filter).Decode(&result)
	if err != nil {
		log.Print(err)
	}
	return &result, err
}

func insertOneUser(u *User) error {
	collection := UserDB.DBClient.Collection("user")
	newUserID(u)
	newUserSessionID(u)
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

func newUserID(u *User) {
	u.Id = uuid.NewString()
}

func newUserSessionID(u *User) {
	u.SessionID = uuid.NewString()
}

// UpdateUserSessionID 更新user sessionID
func (u *User) UpadateUserSessionID() {
	newUserSessionID(u)
	collection := UserDB.DBClient.Collection("user")
	filter := bson.D{{Key: "_id", Value: u.Id}}
	update := bson.D{{Key: "$set", Value: bson.D{{Key: "session_id", Value: u.SessionID}}}}
	_, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Print(" UpdateOne err", err)
	}
}

func GetUserID(session any) string {
	collection := UserDB.DBClient.Collection("user")
	filter := bson.D{{Key: "session_id", Value: session}}
	var result struct {
		ID string `bson:"_id,omitempty"`
	}
	var err error
	err = collection.FindOne(context.Background(), filter).Decode(&result)
	if err != nil {
		log.Print(err)
	}
	return result.ID
}

// find uers by userid
func (u *User) FindUserbyID() {

}

func (u *User) CreatUser() error {
	insertOneUser(u)
	return nil
}

func (u *User) updateUser() {

}

func (u *User) DeletUser() {

}

func (u *User) IsUserVaild() bool { // 註冊user是否合法
	collection := UserDB.DBClient.Collection("user")
	isAccountVaild := func() bool {
		var result bson.M
		err := collection.FindOne(context.TODO(), bson.D{{"email", u.Account.Email}}).Decode(&result)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				return true
			}

		}
		return false
	}
	return isAccountVaild()

}

func (u *User) IsUser() bool { //user 是否登入正確
	collection := UserDB.DBClient.Collection("user")
	isAccountVaild := func() bool {
		var result bson.M

		err := collection.FindOne(context.TODO(), bson.D{{"email", u.Account.Email}}).Decode(&result)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				return false
			}
		}
		return true
	}
	isPasswordVaild := func() bool {
		var result bson.M

		err := collection.FindOne(context.TODO(), bson.D{{"password", u.Account.Password}}).Decode(&result)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				return false
			}
		}
		return true
	}
	//if is user return user id
	if isAccountVaild() && isPasswordVaild() {
		var result bson.M

		err := collection.FindOne(context.TODO(), bson.D{{"password", u.Account.Password}, {"email", u.Account.Email}}).Decode(&result)
		if err != nil {
			if err == mongo.ErrNoDocuments {

			}
		}
		u.Id = result["_id"].(string)
		return true
	}

	return false
}
