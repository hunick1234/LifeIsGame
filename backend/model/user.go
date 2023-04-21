package model

type user struct {
	Name     string `json:"name"`
	Accout   string `json:"account"`
	Password string `json:"password"` //encode
	Games    []Game
}
