/**
 * Load all OOUI items, including buttons, etc.
 */

rcpatrol.rcpatrolbar = new OO.ui.HorizontalLayout({ align: 'inline' });
rcpatrol.rcpatrolbox = new OO.ui.TextInputWidget({
    autosize: true,
    placeholder: 'Reason to rollback (optional)',
    icon: 'textSummary',
    align: 'inline'
});
rcpatrol.rcpatrolbutton = new OO.ui.ButtonWidget({
    autosize: true,
    label: 'Rollback',
    flags: [
        'primary',
        'progressive'
    ],
    icon: "editUndo",
    align: 'inline'
});
rcpatrol.rollbackbar = new OO.ui.ActionFieldLayout(rcpatrol.rcpatrolbox, rcpatrol.rcpatrolbutton, { align: "inline" });
rcpatrol.previouseditbutton = new OO.ui.ButtonWidget({
    autosize: true,
    label: 'Previous edit',
    icon: "previous",
    align: 'inline'
});
rcpatrol.nexteditbutton = new OO.ui.ButtonWidget({
    autosize: true,
    label: 'Next edit',
    icon: "next",
    align: 'inline'
});
rcpatrol.fetchbutton = new OO.ui.ButtonWidget({
    autosize: true,
    label: 'Refresh',
    icon: "reload",
    align: 'inline'
});
rcpatrol.thankbutton = new OO.ui.ButtonWidget({
    autosize: true,
    label: 'Thank',
    icon: "heart",
    align: 'inline'
});
rcpatrol.dropdownmenu = new OO.ui.DropdownWidget({
    label: "Rollback and warn...",
    icon: "speechBubbleAdd",
    menu: {
        items: []
    }
});
rcpatrol.rcpatrolbar.addItems([
    rcpatrol.previouseditbutton,
    rcpatrol.nexteditbutton,
    rcpatrol.fetchbutton,
    rcpatrol.thankbutton
]);
rcpatrol.rcpatrolbutton.$element.attr("title", "Revert this user's edits [ctrl-alt R]");
rcpatrol.thankbutton.$element.attr("title", "Thank this user for their edits [ctrl-alt =]");
rcpatrol.nexteditbutton.$element.attr("title", "Load the next edit in the batch [ctrl-alt space]");
rcpatrol.previouseditbutton.$element.attr("title", "Load the previous edit in the batch [ctrl-alt ,]");
for (var i in rcpatrol.dropdown) {
    var temp = new OO.ui.MenuOptionWidget({
        data: rcpatrol.dropdown[i].keycode,
        label: rcpatrol.dropdown[i].val
    });
    temp.$element.attr("title", rcpatrol.dropdown[i].val + (String.fromCharCode(rcpatrol.dropdown[i].keycode) ? " [ctrl-alt " + String.fromCharCode(rcpatrol.dropdown[i].keycode) + "]" : ""));
    rcpatrol.dropdownmenu.getMenu().addItems([temp]);
}
/**
 * Disables/enables the RC patrol controls
 * @param {*} bool whether to disable the controls or not
 */
rcpatrol.setDisabled = function (bool) {
    rcpatrol.isDisabled = bool;
    rcpatrol.dropdownmenu.setDisabled(bool);
    rcpatrol.previouseditbutton.setDisabled(bool);
    rcpatrol.nexteditbutton.setDisabled(bool);
    rcpatrol.rcpatrolbutton.setDisabled(bool);
    rcpatrol.rcpatrolbox.setDisabled(bool);
    rcpatrol.thankbutton.setDisabled(bool);
    rcpatrol.fetchbutton.setDisabled(bool);
};