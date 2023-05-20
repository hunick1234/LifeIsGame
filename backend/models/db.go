package models

import (
	"context"
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
	log.Print(db.DBName, ", connection")

}
