package ui

import (
	"embed"
	"io/fs"
)

//go:embed all:build
var dirFS embed.FS

var DirFS, _ = fs.Sub(dirFS, "build")
