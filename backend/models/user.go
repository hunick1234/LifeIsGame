package models

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

func GetUser() *User {
	//connet db find user
	return &User{}
}

func (u *User) InsertOneUser() error {

	return nil
}

func (u *User) PutUser() {

}

func (u *User) DeletUser() {

}
