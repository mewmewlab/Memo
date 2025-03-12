package models

import "github.com/pocketbase/pocketbase/tools/types"

type Files struct {
	Id      string         `db:"id" json:"id"`
	Created types.DateTime `db:"created" json:"created"`
}
