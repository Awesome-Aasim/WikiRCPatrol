/**
 * Reports any user to a preconfigured project page
 * If admin, blocks the user for a preset time
 * @param {*} user user to report
 */
rcpatrol.report = function (user, reason) {
    if (mw.config.get("wgUserGroups").includes("sysop")) {
        //TODO:  get block suggestion for vandals 1 day initially, then double the block if the user commits another infraction after getting unblocked
        //also:  block API
        var blockwindow = window.open(mw.config.get("wgArticlePath").replace("$1", "Special:Block/" + user) + "?wpReason-other=" + encodeURI(reason));
        blockwindow.onload = function () {
            alert("The user has received a final warning in the last 24 hours, so this window was opened.  When you are done blocking the user, you can close this tab and go back to RC patrol.");
        }
    } else {
        var reportwindow = window.open(mw.config.get("wgArticlePath").replace("$1", rcpatrol.reportpage));
        reportwindow.onload = function () {
            var reportinfo = reportwindow.prompt("This user has received a final warning in the last 24 hours or was recently unblocked, so RC patrol is proceeding to report to AIV. Enter information about the report here, leave blank for \"" + reason + ": after final warning.\". If you think a report is inappropriate, click 'Cancel' and proceed to report on your own accord.");
            if (reportinfo == null || reportinfo == undefined) return;
            reportinfo = reportinfo ? reportinfo : reason + ": after final warning.";
            $.get(mw.config.get("wgScriptPath") + "/api.php", {
                "action": "query",
                "format": "json",
                "meta": "tokens",
                "type": "csrf",
                "uselang": mw.config.get("wgUserLanguage")
            }).done(function (result) {
                $.post(mw.config.get("wgScriptPath") + "/api.php", {
                    "action": "edit",
                    "format": "json",
                    "title": rcpatrol.reportpage,
                    "summary": "[[User:Awesome Aasim/rcpatrol|RCP]] report " + user,
                    "appendtext": rcpatrol.reportstring.replace("$1", user).replace("$2", reportinfo) + " ~~" + "~~",
                    "uselang": mw.config.get("wgUserLanguage"),
                    "token": result.query.tokens.csrftoken
                }).done(function (result) {
                    if (result.error) {
                        reportwindow.alert(result.error.info);
                    } else {
                        mw.notify("User successfully reported to admins.");
                    }
                    reportwindow.close();
                });
            });
        }
    }
}