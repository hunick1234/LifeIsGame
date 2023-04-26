package models

import (
	"context"
	"fmt"
	"log"
	"sync"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var CONNECT_TIME = 10 * time.Second

type DBConnect struct {
	Client   *mongo.Client
	DBClient *mongo.Database
	DBName   string
	lock     sync.Locker
}

/*
*
name[0] = db name
name[1] = doucment name
*/
func NewDBConnect(name ...string) *DBConnect {
	return &DBConnect{DBName: name[0]}
}

func (db *DBConnect) Connect() {
	var err error
	// ctx, cancel := context.WithTimeout(context.Background(), CONNECT_TIME)
	// defer cancel()
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	db.Client, err = mongo.NewClient(clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	err = db.Client.Connect(context.Background())
	if err != nil {
		// 處理錯誤
	}
	db.DBClient = db.Client.Database(db.DBName)

}

func Connext() {
	ctx, cancel := context.WithTimeout(context.Background(), CONNECT_TIME)
	defer cancel()
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}
	collection := client.Database("login").Collection("login")
	// collection.InsertOne(ctx, bson.D{{"name", "nicjk"}, {"value", 123}})
	// collection.InsertOne(ctx, bson.M{"foo": "bar", "hello": "world", "pi": 3.14159})

	address1 := Address{"jjj", "jjj", "jjj"}
	student1 := Student{Id: "asdsdgsdfgsdgdfgr", FirstName: "Arthur", Address: address1, LastName: "hu", Age: 8}
	_, err = collection.InsertOne(ctx, student1)
	fmt.Println("Connected to MongoDB!", *collection)
}

type Address struct {
	Street string
	City   string
	State  string
}
type Student struct {
	Id        string  `bson:"_id,omitempty"`
	FirstName string  `bson:"first_name,omitempty"`
	LastName  string  `bson:"last_name,omitempty"`
	Address   Address `bson:"inline"`
	Age       int
}
