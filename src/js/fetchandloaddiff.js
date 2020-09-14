/**
 * Fetches a list of recent changes and loads it onto RC patrol
 */
rcpatrol.fetch = function () {
    if (!rcpatrol.fetchbutton.isDisabled()) {
        $("#rcpatroldiff").fadeOut();
        rcpatrol.setDisabled(true);
        $.get(mw.config.get("wgScriptPath") + "/api.php", {
            "action": "query",
            "format": "json",
            "list": "recentchanges",
            "rcprop": "title|timestamp|flags|loginfo|parsedcomment|user|ids|tags",
            "rcshow": "!bot" + ((new URL(window.location.href)).searchParams.get("oresreview") ? "|oresreview" : ""),
            "rctoponly": true,
            "rclimit": "max",
            "rctype": "edit|new",
            "uselang": mw.config.get("wgUserLanguage")
        }).done(function (result) {
            rcpatrol.changes = result.query.recentchanges;
            console.log(result.query.recentchanges);
            rcpatrol.setDisabled(false);
            rcpatrol.currentChange = 0;
            rcpatrol.loadChange(rcpatrol.changes[rcpatrol.currentChange]);
        }).fail(function () {
            window.setTimeout(rcpatrol.fetch, 1000);
        });
    }
};
/**
 * Loads a change and places it in the RC patrol diff output.
 * @param {*} change the diff of the change to load
 */
rcpatrol.loadChange = function (change) {
    $("#rcpatroldiff").fadeOut();
    $("#rcpatroladmintools").fadeOut();
    $("#rcpatrolpagetools").fadeOut();
    rcpatrol.setDisabled(true);
    $.get(mw.config.get("wgScriptPath") + "/api.php", {
        "action": "query",
        "format": "json",
        "prop": "revisions",
        "titles": change.title,
        "rvlimit": "1",
        "uselang": mw.config.get("wgUserLanguage")
    }).done(function (result) {
        for (var pageid in result.query.pages) {
            change.revid = result.query.pages[pageid].revisions[0].revid;
            change.user = result.query.pages[pageid].revisions[0].user;
            break;
        }
        $.get(mw.config.get("wgScriptPath") + "/api.php", {
            "action": "query",
            "format": "json",
            "prop": "revisions",
            "titles": change.title,
            "rvexcludeuser": change.user,
            "rvlimit": "1",
            "uselang": mw.config.get("wgUserLanguage")
        }).done(function (result) {
            console.log(result);
            var oldid;
            try {
                for (var pageid in result.query.pages) {
                    oldid = result.query.pages[pageid].revisions[0].revid;
                    break;
                }
            } catch (Error) {
                var temp = oldid;
                oldid = change.revid;
                change.revid = "";
            }
            console.log(mw.config.get("wgScriptPath") + "/index.php?oldid=" + oldid + "&diff=" + change.revid);
            var scriptpath = mw.config.get('wgScriptPath');
            var loadurl = mw.config.get("wgScriptPath") + "/index.php?useskin=fallback&safemode=1&oldid=" + oldid + (change.revid ? "&diff=" + change.revid : "") + "&uselang=" + mw.config.get("wgUserLanguage");
            if (location.href.split(".").includes("m")) {
                loadurl = mw.config.get("wgArticlePath").replace("$1", "Special:MobileDiff/" + oldid + (change.revid ? "..." + change.revid : "")) + "?useskin=fallback&safemode=1&uselang=" + mw.config.get("wgUserLanguage");
            }
            $("#rcpatroldiff").load(loadurl, function (response, status, xhr) {
                if (status == "error") {
                    $("#rcpatroldiff").fadeIn(1000);
                    $("#rcpatroldiff").text("Could not load diff.  Please check your Internet connection.  The diff will automatically reload when the connection is reestablished.");
                    window.setTimeout(function () {
                        rcpatrol.loadChange(change);
                    }, 1000);
                } else {
                    $("#rcpatroldiff").find("form").hide();
                    $("#rcpatroldiff").find("#firstHeading").hide();
                    $("#firstHeading, #section_0").html('Recent Changes Patrol \"<a target=\"_blank\" href=\"' + scriptpath + '/index.php?title=' + change.title + '\">' + change.title + "</a>\"");
                    $("title").text("Recent Changes Patrol \"" + change.title + "\" - " + mw.config.get("wgSiteName"));

                    $("#rcpatroldiff").fadeIn();
                    $("#rcpatroladmintools").fadeIn();
                    $("#rcpatrolpagetools").fadeIn();
                    rcpatrol.rcpatrolbox.setValue("");
                    rcpatrol.rcpatrolbutton.setLabel("Rollback");
                    rcpatrol.setDisabled(false);
                    $("#rcpatroladmintools").html('');
                    $("#rcpatroladmintools").append('<a target="_blank" href="' + scriptpath + '/index.php?title=' + change.title + '&action=delete">Delete</a>');
                    $("#rcpatroladmintools").append(' &bull; ');
                    $("#rcpatroladmintools").append('<a target="_blank" href="' + scriptpath + '/index.php?title=' + change.title + '&action=protect">Protect</a>');
                    $("#rcpatroladmintools").append(' &bull; ');
                    $("#rcpatroladmintools").append('<a target="_blank" href="' + scriptpath + '/index.php?title=Special:Block/' + change.user + '">Block poster</a>');
                    $("#rcpatrolpagetools").html('');
                    $("#rcpatrolpagetools").append('<a target="_blank" href="' + scriptpath + '/index.php?title=' + change.title + '&action=history">View page history</a>');
                    $("#rcpatrolpagetools").append(' &bull; ');
                    $("#rcpatrolpagetools").append('<a target="_blank" href="' + scriptpath + '/index.php?oldid=' + oldid + '&diff=' + change.revid + '">View diff</a>');
                }
            });
        }).fail(function (result) {
            $("#rcpatroldiff").fadeIn(1000);
            $("#rcpatroldiff").text("Could not load diff.  Please check your Internet connection.  The diff will automatically reload when the connection is reestablished.");
            window.setTimeout(function () {
                rcpatrol.loadChange(change)
            }, 1000);
        });
    }).fail(function (result) {
        $("#rcpatroldiff").fadeIn(1000);
        $("#rcpatroldiff").text("Could not load diff.  Please check your Internet connection.  The diff will automatically reload when the connection is reestablished.");
        window.setTimeout(function () {
            rcpatrol.loadChange(change)
        }, 1000);
    });
};