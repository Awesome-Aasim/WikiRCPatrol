/**
 * Handles global events, including clicks, keypresses, etc.
 */
rcpatrol.fetchbutton.$element.click(rcpatrol.fetch);
rcpatrol.rcpatrolbutton.$element.click(function (e) {
    rcpatrol.revert(rcpatrol.changes[rcpatrol.currentChange].title, rcpatrol.changes[rcpatrol.currentChange].user, function () {
        rcpatrol.currentChange++;
        rcpatrol.loadChange(rcpatrol.changes[rcpatrol.currentChange]);
    },
        function () {
            rcpatrol.loadChange(rcpatrol.changes[rcpatrol.currentChange]);
        });
});
rcpatrol.nexteditbutton.$element.click(function (e) {
    if (!rcpatrol.nexteditbutton.isDisabled()) {
        e.preventDefault();
        rcpatrol.currentChange++;
        if (rcpatrol.currentChange >= rcpatrol.changes.length) {
            mw.notify("Reached end of list.  Loading next batch...")
            rcpatrol.fetch();
        } else {
            rcpatrol.loadChange(rcpatrol.changes[rcpatrol.currentChange]);
        }
    }
});
rcpatrol.previouseditbutton.$element.click(function (e) {
    if (!rcpatrol.previouseditbutton.isDisabled()) {
        e.preventDefault();
        rcpatrol.currentChange--;
        if (rcpatrol.currentChange < 0) {
            rcpatrol.currentChange = 0;
        }
        rcpatrol.loadChange(rcpatrol.changes[rcpatrol.currentChange]);
    }
});
rcpatrol.thankbutton.$element.click(function (e) {
    if (!rcpatrol.thankbutton.isDisabled()) {
        e.preventDefault();
        rcpatrol.thankbutton.setDisabled(true);
        $.get(mw.config.get("wgScriptPath") + "/api.php", {
            "action": "query",
            "format": "json",
            "meta": "tokens",
            "type": "csrf"
        }).done(function (result) {
            $.post(mw.config.get("wgScriptPath") + "/api.php", {
                "action": "thank",
                "format": "json",
                "rev": rcpatrol.changes[rcpatrol.currentChange].revid,
                "token": result.query.tokens.csrftoken
            }).done(function (result) {
                if (result.error) {
                    alert(result.error.info);
                } else {
                    mw.notify("Thanks sent!");
                }
            })
        })
    }
});
/**
 * Mark the edit as patrolled
 **/
rcpatrol.patrolbutton.$element.click(function (e) {
    rcpatrol.patrolbutton.setLabel('Marking as patrolled');
    if (!rcpatrol.patrolbutton.isDisabled()) {
        e.preventDefault();
        rcpatrol.patrolbutton.setDisabled(true);
        $.get(mw.config.get("wgScriptPath") + "/api.php", {
            "action": "query",
            "format": "json",
            "meta": "tokens",
            "type": "patrol"
        }).done(function (result) {
            $.post(mw.config.get("wgScriptPath") + "/api.php", {
                "action": "patrol",
                "format": "json",
                "rcid": rcpatrol.changes[rcpatrol.currentChange].rcid,
                "token": result.query.tokens.patroltoken,
                "formatversion": 2
            }).done(function (result) {
                if (result.error) {
                    mw.notify(result.error.info);
                } else {
                    mw.notify("The version (rcid "+rcpatrol.changes[rcpatrol.currentChange].rcid+") has been marked as patrolled!");
                    rcpatrol.patrolbutton.setLabel('Marked as patrolled');
                }
            })
        })
    }
})
rcpatrol.rcpatrolbox.$element.keypress(function (e) {

    if (e.which == 13) {
        rcpatrol.revert(rcpatrol.changes[rcpatrol.currentChange].title, rcpatrol.changes[rcpatrol.currentChange].user, function () {
            rcpatrol.currentChange++;
            rcpatrol.loadChange(rcpatrol.changes[rcpatrol.currentChange]);
        },
            function () {
                rcpatrol.loadChange(rcpatrol.changes[rcpatrol.currentChange]);
            });
    }
});

rcpatrol.dropdownmenu.getMenu().on('select', function () {
    var val = rcpatrol.dropdownmenu.getLabel();
    for (var option of rcpatrol.dropdown) {
        if (option.val == val) {
            rcpatrol.rcpatrolbox.setValue(option.summary);
            rcpatrol.revert(rcpatrol.changes[rcpatrol.currentChange].title, rcpatrol.changes[rcpatrol.currentChange].user, function () {
                rcpatrol.warn(rcpatrol.changes[rcpatrol.currentChange].user, option.template, rcpatrol.changes[rcpatrol.currentChange].title, option.val);
                rcpatrol.currentChange++;
                rcpatrol.loadChange(rcpatrol.changes[rcpatrol.currentChange]);
                rcpatrol.dropdownmenu.getMenu().unselectItem();
                rcpatrol.dropdownmenu.setLabel("Rollback and warn...");
            }, function () {
                rcpatrol.dropdownmenu.getMenu().unselectItem();
                rcpatrol.dropdownmenu.setLabel("Rollback and warn...");
                rcpatrol.loadChange(rcpatrol.changes[rcpatrol.currentChange]);
            });
            break;
        } else {
            continue;
        }
    }
});
