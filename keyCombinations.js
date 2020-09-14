/**
 * Page for processing key combinations
 */

$(document).keydown(function (e) {
    if (e.ctrlKey && e.altKey) {
        switch (e.which) {
            case 82: e.preventDefault(); //rollback (r)
                rcpatrol.revert(rcpatrol.changes[rcpatrol.currentChange].title, rcpatrol.changes[rcpatrol.currentChange].user, function () {
                    rcpatrol.currentChange++;
                    rcpatrol.loadChange(rcpatrol.changes[rcpatrol.currentChange]);
                },
                    function () {
                        rcpatrol.loadChange(rcpatrol.changes[rcpatrol.currentChange]);
                    });
                break;
            case 32: e.preventDefault(); //next edit ( )
                rcpatrol.nexteditbutton.$element.click();
                break;
            case 188: e.preventDefault(); //previous edit (<)
                rcpatrol.previouseditbutton.$element.click();
                break;
            case 187: e.preventDefault(); //thanks (+)
                rcpatrol.thankbutton.$element.click();
                break;
            default:
                for (var option of rcpatrol.dropdown) {
                    if (option.keycode == e.which) {
                        rcpatrol.rcpatrolbox.setValue(option.summary);
                        rcpatrol.revert(rcpatrol.changes[rcpatrol.currentChange].title, rcpatrol.changes[rcpatrol.currentChange].user, function () {
                            rcpatrol.warn(rcpatrol.changes[rcpatrol.currentChange].user, option.template, rcpatrol.changes[rcpatrol.currentChange].title);
                            rcpatrol.currentChange++;
                            rcpatrol.loadChange(rcpatrol.changes[rcpatrol.currentChange]);
                        }, function () {
                            rcpatrol.loadChange(rcpatrol.changes[rcpatrol.currentChange]);
                        });
                        break;
                    } else {
                        continue;
                    }
                }
                break;
        }
    }
});