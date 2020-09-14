/**
 * Configuration for English Wikipedia
 * Eventually this will be stored elsewhere on a separate page, maybe at [[Project:RC Patrol Script/config.js]]
 * The idea is that any particular modules that need to be disabled or reconfigured can be done so on a wiki by wiki basis by simply "reprogramming" it here.
 * The configuration file should be locked so that only administrators can edit it.
 */
rcpatrol.reportpage = "Wikipedia:Administrator intervention against vandalism"; //the page that users should be reported on
rcpatrol.reportstring = "\n\n* {{vandal|1=$1}} - $2"; //the string pattern to use for the report
rcpatrol.dropdown = [
    {
        keycode: 84, //t
        val: "Test edit",
        summary: "Test edit",
        template: "uw-test"
    },
    {
        keycode: 69, //e
        val: "Disruptive edit",
        summary: "[[WP:DE|Disruptive edit]]",
        template: "uw-disruptive"
    },
    {
        keycode: 77, //m
        val: "Manual of style violation",
        summary: "Violates [[WP:MOS|manual of style]]",
        template: "uw-mos"
    },
    {
        keycode: 65, //a
        val: "Personal attack",
        summary: "[[WP:NPA|Personal attack]]",
        template: "uw-npa"
    },
    {
        keycode: 76, //l
        val: "BLP violation",
        summary: "Violation of the [[WP:BLP|biographies of living people policy]]",
        template: "uw-biog"
    },
    {
        keycode: 78, //n
        val: "Neutral point of view violation",
        summary: "Violates [[WP:NPOV|neutral point of view]]",
        template: "uw-npov"
    },
    {
        keycode: 85, //u
        val: "Unsourced",
        summary: "[[WP:UNSOURCED|Unsourced]]",
        template: "uw-unsourced"
    },
    {
        keycode: 68, //d
        val: "Unexplained content removal",
        summary: "Unexplained removal of content",
        template: "uw-delete"
    },
    {
        keycode: 66, //b
        val: "Page blanking",
        summary: "Blanking the page",
        template: "uw-blank"
    },
    {
        keycode: 86, //v
        val: "Vandalism",
        summary: "Unconstructive edit",
        template: "uw-vandalism"
    },
    {
        keycode: 83, //s
        val: "Link spam",
        summary: "Inappropriate external link",
        template: "uw-spam"
    },
    {
        keycode: 80, //p
        val: "Advertising",
        summary: "Promotional language in article",
        template: "uw-advert"
    }
];