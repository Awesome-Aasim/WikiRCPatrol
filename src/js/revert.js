/**
 * Rolls back edits on diffs
 * @param {*} page the page to revert the edits on
 * @param {*} user the user to revert
 * @param {*} afterSuccess what to do after the revert is successful
 * @param {*} afterFail what to do if the revert fails
 */
rcpatrol.revert = function (page, user, afterSuccess, afterFail) {
    if (!rcpatrol.rcpatrolbutton.isDisabled()) {
        var summary = rcpatrol.rcpatrolbox.getValue();
        rcpatrol.rcpatrolbutton.setLabel("Rolling back...");
        rcpatrol.setDisabled(true);
        $.get(mw.config.get("wgScriptPath") + "/api.php", {
            "action": "query",
            "format": "json",
            "meta": "tokens",
            "type": "rollback"
        }).done(function (result) {
            if (result.error) {
                rcpatrol.rcpatrolbutton.setLabel("Rollback failed");
                alert(result.error.info);
                afterFail();
            } else {
                $.post(mw.config.get("wgScriptPath") + "/api.php", {
                    "action": "rollback",
                    "format": "json",
                    "title": page,
                    "token": result.query.tokens.rollbacktoken,
                    "user": user,
                    "summary": "[[User:Awesome Aasim/rcpatrol|RCP]] reverted edits by [[Special:Contributions/$2|$2]] ([[User_talk:$2|Talk]]); changed back to last revision by [[Special:Contributions/$1|$1]]" + (summary ? ": " + summary : "")
                }).done(function (result) {
                    if (result.error) {
                        rcpatrol.rcpatrolbutton.setLabel("Rollback failed");
                        alert(result.error.info);
                        afterFail();
                    } else {
                        rcpatrol.rcpatrolbutton.setLabel("Rollback complete");
                        afterSuccess();
                    }
                }).fail(function () {
                    console.log(result);
                    alert("Lost connection.");
                    rcpatrol.rcpatrolbutton.setLabel("Rollback failed");
                    afterFail();
                });
            }
        });
    }
};