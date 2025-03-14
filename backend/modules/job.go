package modules

import (
	"fmt"

	"github.com/miRemid/memo/backend/models"
	"github.com/miRemid/memo/backend/types"
	"github.com/pocketbase/pocketbase"
)

const (
	JOB_CLEAN_OUTDATE_FILES = "clean outdate files"
)

func RegisterJobs(app *pocketbase.PocketBase) {

	// Delete out-dated files in 7 days
	app.Cron().MustAdd(JOB_CLEAN_OUTDATE_FILES, "0 1 * * *", func() {
		files := make([]models.Files, 0)
		app.Logger().Info(fmt.Sprintf("JOB: '%s' START", JOB_CLEAN_OUTDATE_FILES))
		defer func() {
			app.Logger().Info(fmt.Sprintf("JOB: '%s' FINISH", JOB_CLEAN_OUTDATE_FILES))
		}()
		err := app.DB().
			NewQuery(fmt.Sprintf("SELECT id from %s where created <= date('now', 'localtime', '-7 day')", types.TABLE_FILE)).
			All(&files)
		if err != nil {
			app.Logger().Error(err.Error())
		} else {
			for _, file := range files {
				record, _ := app.FindRecordById(types.TABLE_FILE, file.Id)
				if err := app.Delete(record); err == nil {
					app.Logger().Info(fmt.Sprintf("JOB: '%s' DELETE FILEID = %s", JOB_CLEAN_OUTDATE_FILES, file.Id))
				}
			}
		}
	})
}
