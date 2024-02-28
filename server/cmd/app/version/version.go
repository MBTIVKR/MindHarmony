package version

import (
	"lps/cemetery/pkg/vars"

	"github.com/Avdushin/gogger/logger"
)

func Version() {
	logger.Info("🚀 %s@%s has been started!", vars.APP_NAME, vars.APP_VERSION)
}
