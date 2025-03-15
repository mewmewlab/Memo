package ui

import (
	"embed"
	"io/fs"
)

//go:embed all:build
var disk embed.FS
var DistDirFS, _ = fs.Sub(disk, "build")
