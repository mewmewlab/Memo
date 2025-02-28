package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	app := pocketbase.New()

	app.OnServe().BindFunc(func(se *core.ServeEvent) error {

		api := se.Router.Group("/-/api")
		{
			v1 := api.Group("/v1")
			{
				v1.GET("/id", func(c *core.RequestEvent) error {
					currentTime := time.Now().UnixMicro()
					random := rand.Intn(1000000)
					hashStr := fmt.Sprintf("%d%d", currentTime, random)
					hash := sha256.Sum256([]byte(hashStr))
					return c.JSON(http.StatusOK, map[string]interface{}{
						"id": strings.ToLower(hex.EncodeToString(hash[:8])),
					})
				})
			}
		}

		// serves static files from the provided public dir (if exists)
		se.Router.GET("/{path...}", apis.Static(os.DirFS("./pb_public"), false))

		return se.Next()
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
