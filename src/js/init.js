if (!rcpatrol) { // stops multiple instances of RC patrol from running
    //necessary resources
    if ((mw.config.get("wgPageName").toLowerCase() == "Special:BlankPage/RCPatrol".toLowerCase())) {
        /**
         * Initialize variables related to RC patrol
         */
        var rcpatrol = {};
        rcpatrol.changes = [];
        rcpatrol.currentChange = 0;
        window.setInterval(() => {
            $("#rcpatroldiff").find("a").attr("target", "_blank");
            $(".mw-rollback-link").hide();
            $(".ve-init-mw-diffPage-diffMode").hide();
            $(".mw-revslider-container").hide();
            if (rcpatrol.currentChange == 0) {
                rcpatrol.previouseditbutton.setDisabled(true);
            } else if (!rcpatrol.isDisabled) {
                rcpatrol.previouseditbutton.setDisabled(false);
            }
        }, 100);
        $(document).ready(function () {
            rcpatrol.fetch();
            $("#firstHeading, #section_0").html("Recent Changes Patrol");
            $("title").text("Recent Changes Patrol - " + mw.config.get("wgSiteName"));
            if (mw.config.get("skin") == "minerva") {
                $("body").html($("main").html());
                $("#siteNotice").prepend('<a id="rcpatrolexit" href="/">Exit</a>');
                $("#rcpatrolexit").click(function () {
                    window.history.back();
                })
            }
            $("#mw-content-text").html("");
            $("#mw-content-text").append('<div class="rcpatrolbuttons"></div>');
            $("#mw-content-text").append('<div id="rcpatroldiff"></div>');
            $(".rcpatrolbuttons").prepend(rcpatrol.rcpatrolbar.$element);
            $(".rcpatrolbuttons").prepend(rcpatrol.rollbackbar.$element);
            $(".rcpatrolbuttons").prepend(rcpatrol.dropdownmenu.$element);
            $(".rcpatrolbuttons").prepend('<a href="/wiki/Special:BlankPage/RCPatrol?oresreview=1">Only show edits that likely need review</a><br>');
            if (mw.config.get('wgUserGroups').includes('sysop')) {
                $(".rcpatrolbuttons").append('Admin tools: <span id="rcpatroladmintools"></span>');
            }
            $(".rcpatrolbuttons").append('Page tools: <span id="rcpatrolpagetools"></span>');
            $("#rcpatroldiff").css({
                overflow: "auto"
            });
        })
    }
}
if (mw.config.get("wgPageName").toLowerCase() == "Special:RecentChanges".toLowerCase() && !rcpatrollocation) {
    $(document).ready(function () {
        var rcpatrollocation = mw.config.get("wgArticlePath").replace("$1", "Special:BlankPage/RCPatrol")
        $("#mw-content-text").prepend('<a href="' + rcpatrollocation + '">RC patrol</a> (<a href="' + rcpatrollocation + '?oresreview=1">ORES</a>)');
    });
}