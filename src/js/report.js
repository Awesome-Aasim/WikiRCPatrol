/**
 * Reports any user to a preconfigured project page
 * If admin, blocks the user for a preset time
 * @param {*} user user to report
 */
rcpatrol.report = function(user) {
    
    if (mw.config.get("wgUserGroups").includes("sysop")) {
        //TODO:  get block suggestion for vandals (24 hrs for first block, 72 hrs for second block, 3^(n-1) days for the (nth block))
        //also:  block API
        var blockwindow = window.open(mw.config.get("wgArticlePath").replace("$1", "Special:Block/" + user));
        blockwindow.alert("The user has received a final warning in the last 24 hours, so this window was opened.  When you are done blocking the user, you can close this tab and go back to RC patrol.");
    } else {
        if (aivreportuser) {
            var reportinfo = prompt("Enter information about the report here: ");
            reportinfo = reportinfo ? reportinfo : "Vandalism after final warning.";
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
                    "uselang": mw.config.get("wgUserLanguage")
                }).done(function (result) {
                    if (result.error) {
                        alert(result.error.info);
                    } else {
                        mw.notify("User successfully reported to admins.");
                    }
                });
            });
        }
    }
}