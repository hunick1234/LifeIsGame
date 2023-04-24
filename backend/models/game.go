package models

type Game struct {
	Id     string
	Name   string
	Levels []Level
}

type Level struct {
	Id     string
	Name   string
	Scenes []Scene
}

type Scene struct {
	Id   string
	Name string
}
