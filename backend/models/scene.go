package models

type Story struct {
	Content string `json:"story_content" bson:"story_content"`
}
type Character struct {
	ID    string `json:"id" bson:"_id"`
	Name  string `json:"character_name" bson:"character_name"`
	Image []byte `json:"character_image" bson:"character_image"`
}

type Talker struct {
	*Character
	Content string `json:"talk_content" bson:"talk_content"`
}
type Talk struct {
	t *[]Talker
}
