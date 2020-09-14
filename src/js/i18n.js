/**
 * Internationalization here
 */
rcpatrol.i18n = {
    reasontorollback: {
        en: 'Reason to rollback (optional)'
    },
    rollback: {
        en: 'Rollback'
    },
    rollingback: {
        en: 'Rolling back...'
    },
    rollbackfailed: {
        en: 'Rollback failed'
    },
    rollbacksuccess: {
        en: 'Rollback complete'
    },
    rollbacksummary: {
        en: '[[w:User:Awesome Aasim/rcpatrol|RCP]] reverted edits by [[Special:Contributions/$2|$2]] ([[User_talk:$2|Talk]]); changed back to last revision by [[Special:Contributions/$1|$1]]'
    },
    warnsummary: {
        en: '[[w:User:Awesome Aasim/rcpatrol|RCP]] send warning to $1 about [[$2]]'
    },
    reportsummary: {
        en: '[[w:User:Awesome Aasim/rcpatrol|RCP]] report $1'
    },
    rollbacktitle: {
        en: "Revert this user's edits",
    },
    previousedit: {
        en: 'Previous edit'
    },
    previousedittitle: {
        en: 'Load the previous edit in the batch'
    },
    nextedit: {
        en: 'Next edit'
    },
    nextedittitle: {
        en: 'Load the next edit in the batch'
    },
    refresh: {
        en: 'Refresh'
    },
    connectionlost: {
        en: 'Lost connection'
    },
    connectionlostdiffmessage: {
        en: "Could not load diff.  Please check your Internet connection.  The diff will automatically reload when the connection is reestablished."
    },
    thank: {
        en: 'Thank'
    },
    thanktitle: {
        en: "Thank this user for their edits"
    },
    rollbackandwarn: {
        en: 'Rollback and warn'
    },
    endoflist: {
        en: 'Reached end of list.  Loading next batch...'
    },
    thankssent: {
        en: 'Thanks sent!'
    },
    rcpatroltitle: {
        en: 'Recent Changes Patrol'
    },
    rcpatroltitlewithdiff: {
        en: 'Recent Changes Patrol "$1"'
    },
    delete: {
        en: 'Delete'
    },
    protect: {
        en: 'Protect'
    },
    block: {
        en: 'Block poster'
    },
    history: {
        en: 'View page history'
    },
    diff: {
        en: 'View diff'
    }
}
/**
 * End of internationaliztaion.  DO NOT EDIT BELOW THIS LINE
 */
rcpatrol.msgs = {};
for (var i in rcpatrol.i18n) {
    rcpatrol.msgs[i] = rcpatrol.i18n[mw.config.get("wgUserLanguage")] ? rcpatrol.i18n[mw.config.get("wgUserLanguage")] : rcpatrol.i18n["en"]; //always fall back to English if the message translation is incomplete
}