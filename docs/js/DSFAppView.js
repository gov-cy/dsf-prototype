/**
* The view class
**/
var DSFAppView = {
    /** The page id */
    pageId : "",
    /** The page data*/
    data : null,
    /** The site data */
    site : null,
    /** The id of the route */
    routeId : "",
    /** The number of the route */
    routeNo : 0,
    /** The DOM Id of the main */
    mainDOMId : "main",
    /** The current pages form id */
    currentPageId : null,
    /** The current form object unchanged*/
    currentFormObj : null,
    /** The DSF Components HTML */
    DSFComponentsHTML : "",
    /** The DOM Id of the header */
    headerDOMId : "headerContainer",
    /** The DOM Id of the footer */
    footerDOMId : "footerContainer",
    /** The DOM Id of the mainContainer */
    mainContainerDOMId : "mainContainer",
    /** The DOM Id of the sideMenu */
    sideMenuDOMId : "sideMenu",
    /** The DOM Id of the before-main */
    beforeMainDOMId : "before-main",
    /** The DOM Id of the backLink */
    backLinkDOMId : "backLink",
    /** The DOM Id of the beforeMainContainerUsername */
    beforeMainContainerUsernameDOMId : "beforeMainContainerUsername",

    /**
     * The constructor method when creating an instance 
     * @param {string} pageId the id of the page to be rendered
     * @param {object} data the page data
     * @param {object} site The site data
     * @param {string} routeId The id of the route 
     * @param {int} routeNo The number of the route 
     */
    constructor: function (pageId, data, site, routeId, routeNo) {
        // instanciate default values
        pageId = typeof pageId !== 'undefined' ? this.pageId : "";
        data = typeof data !== 'undefined' ? this.data : null;
        site = typeof site !== 'undefined' ? this.site : null;
        routeId = typeof routeId !== 'undefined' ? this.routeId : "";
        routeNo = typeof routeNo !== 'undefined' ? this.routeNo : 0;
        //deep copy current page data to model
        this.currentFormObj = JSON.parse(JSON.stringify(data));
    },

    /**
     * Render site stuff like menus header and footer
     **/
    renderSiteStuff: function () {
        //render header footer
        if (this.DSFTemplates.header) $('#' + this.headerDOMId).html(this.DSFTemplates.header[localStorage.DDSlanguageCode]);
        if (this.DSFTemplates.footer) $('#' + this.footerDOMId).html(this.DSFTemplates.footer[localStorage.DDSlanguageCode]);
        //render layouts
        $('#' + this.mainContainerDOMId).html(this.DSFTemplates.layouts[this.data.layout]);
        //render back link
        if (this.data.hasBack) {
            var content = {};
            //prepare based on commonContent
            for (const key in this.site.commonContent.back) {
                content[key] = { "label": this.site.commonContent.back[key] };
            }
            //prepare user data object 
            var backLinkData = {
                "type": "backLink",
                "content": content
            };
            //take care of multilanguage hasle 
            this.prepareMultiLanguage(backLinkData);

            //render using mustache
            var userDataContent = Mustache.render
                (this.DSFTemplates.componentTemplates[backLinkData.type]
                    , backLinkData);

            //render on page
            $("#" + this.backLinkDOMId).html(userDataContent);
        }

        //render menus
        for (var i = 0; i < this.data.menus.length; i++) {
            this.showMenu(this.site.menus[this.data.menus[i]]);
        }
    },
    /**
     * Clears the screen
     **/
    clearScreen: function () {
        $('#' + this.mainContainerDOMId).html("");
        $('#' + this.headerDOMId).html("");
        $('#' + this.footerDOMId).html("");
        $('#' + this.sideMenuDOMId).html("");
        $('#' + this.beforeMainDOMId).html("");
        $('#' + this.backLinkDOMId).html("");
        $('#' + this.beforeMainContainerUsernameDOMId).html("&nbsp");
        $('#' + this.mainDOMId).html("");
    },
    /**
     * Creates a `langConent` with the language selected content data 
     * 
     * @param {*} obj the component data object
     */
    prepareMultiLanguage(obj) {
        //if content exits in object
        if (obj.content) {
            //if content exist in specific language
            if (obj.content[localStorage.DDSlanguageCode]) {
                // set obj.langContent to specific language
                obj.langConent = obj.content[localStorage.DDSlanguageCode];
            } else {
                obj.langConent = obj.content[this.DSFTemplates.defaultLang];
            }
        }
    },
    /**
     * Renders the page 
     */
    renderPage: function () {
        
        //clear everything
        this.clearScreen();

        //------ DSF Components START------------------
        //get data from json
        if (this.data) {
            //render site stuff
            this.renderSiteStuff();

            var DSFComponents = "";
            var DSFEvents = [];
            //Render components
            if (this.data.DSFcomponents) {
                //register script 
                DSFStopScripts = false;
                if (this.data.preScript) {

                    $.ajax({
                        async: false,
                        type: "GET",
                        url: "data/prototypes/" + this.data.preScript,
                        dataType: "script"
                    });
                }
                if (DSFStopScripts) { return null; }
                //for all components
                for (var i = 0; i < this.data.DSFcomponents.components.length; i++) {

                    //take care of multi-language hassle
                    this.prepareMultiLanguage(this.data.DSFcomponents.components[i]);
                    // create HTML with mustache
                    var componentHTML = Mustache.render
                        (this.DSFTemplates.componentTemplates[this.data.DSFcomponents.components[i].type]
                            , this.data.DSFcomponents.components[i]);

                    //append HTML
                    DSFComponents += componentHTML;

                    //register events in array
                    if (this.data.DSFcomponents.components[i].events) {
                        DSFEvents.push(this.data.DSFcomponents.components[i]);
                    }

                }

                this.DSFComponentsHTML = DSFComponents;
                //render on page
                $("#" + this.data.DSFcomponents.DOMId).html(DSFComponents);

                //attach events
                for (var i = 0; i < DSFEvents.length; i++) {
                    this.attachEvents(DSFEvents[i]);
                }

                //register script 
                if (this.data.postScript) {
                    $.getScript("data/prototypes/" + this.data.postScript);
                }
                //styles
                for (var key in this.data.styles) {
                    $(key).attr('style', this.data.styles[key]);
                }
            }

            //page bindings
            this.globalBindings();
        }
        //------ DSF Components END------------------
    },
    /**
     * Show the  menu according to the data 
     * @param {*} menuObj the menu object 
     * @param {*} menuElementId the DOM element id to render the menu
     */
    showMenu: function (menuObj, menuElementId) {
        var menuItems = menuObj.items;
        var menuElementId = menuObj.DOMId;
        var mainNavItems = "";
        $.each(menuItems, function (index, value) {
            var classHTML = (value.id == this.pageId ? 'class="nav-link active" aria-current="page"' : 'class="nav-link"')
            mainNavItems += '<li class="nav-item"><a ' + classHTML + ' href="' + value.url + '">' + value.label[localStorage.DDSlanguageCode] + '</a></li>';
        });
        $('#' + menuElementId).html(mainNavItems);
    },
    /**
     * Handles global bindings such as change language
     * 
     */
    globalBindings: function () {
        //bindings change language
        $('#changeLangSel').on('change', function () {
            //change language id
            localStorage.DDSlanguageCode = this.value;
            // re render 
            this.renderPage();
        });
    },
    /**
     * Attaches events on the component that the page listens to. 
     * Uses the component.id to to and jquery $("").on funtion 
     * 
     * @param {object} DSFComponent The component object 
     */
    attachEvents: function (DSFComponent) {
        if (DSFComponent.id) {
            //for all events
            for (var i = 0; i < DSFComponent.events.length; i++) {
                //attach events
                $("#" + DSFComponent.id).on(
                    DSFComponent.events[i].on,
                    {
                        "actions": DSFComponent.events[i].actions
                        , "routeId": this.routeId
                        , "routeNo": this.routeNo
                        , "component": DSFComponent
                    },
                    this.runActions);
            }
        }
    },
    /**
     * Runs the actions defined on events of a component
     * 
     * @param {array} actions the actions defined on the event of a component
     */
    runActions: function (actions) {
        DSFStopScripts = false;
        //for all actions
        for (var i = 0; i < actions.data.actions.length; i++) {
            //run appropriate action 
            if (!DSFStopScripts) {
                switch (actions.data.actions[i].action) {
                    case "validate":
                        DSFStopScripts = !appValidator.validate(actions.data.component);
                        break;
                    case "alert": alert(actions.data.actions[i].data); break;
                    case "customScript":
                        //$.getScript("data/prototypes/"+actions.data.actions[i].data); 
                        $.ajax({
                            async: false,
                            type: "GET",
                            url: "data/prototypes/" + actions.data.actions[i].data,
                            dataType: "script"
                        });
                        break;
                    case "link": window.location = actions.data.actions[i].data; break;
                    case "goBack": history.back(); break;
                    case "previousOnRoute":
                        var nextRoutId = parseInt(actions.data.routeNo) - 1;
                        var newURL = "#r/" + actions.data.routeId + '/' + nextRoutId;
                        window.location = newURL;
                        break;
                    case "nextOnRoute":
                        var nextRoutId = parseInt(actions.data.routeNo) + 1;
                        var newURL = "#r/" + actions.data.routeId + '/' + nextRoutId;
                        window.location = newURL;
                        break;
                    case "getData":
                        var formData = new FormData(document.querySelector("#components"));
                        // Display the key/value pairs
                        for (var pair of formData.entries()) {
                            var inputKey = pair[0];
                            var inputValue = formData.getAll(inputKey);
                            console.log(inputKey + ', ' + inputValue);
                            //save in session store
                            sessionStorage[inputKey] = inputValue;
                        }
                        break;
                    case "alertData":
                        var formData = new FormData(document.querySelector("#components"));
                        var formDataValues = "";
                        // Display the key/value pairs
                        for (var pair of formData.entries()) {
                            var inputKey = pair[0];
                            var inputValue = formData.getAll(inputKey);
                            formDataValues += inputKey + ', ' + inputValue + '\n';
                        }
                        alert(formDataValues);
                        break;
                }
            }
        }
    }, 
    /**
     * The Templates
     */
    DSFTemplates : 
    {
        "defaultLang" : "en",
        "markdownFile" : "<div{{#id}} id='{{id}}'{{/id}}></h1>",
        "layouts": {
            "Max-width" : "<article class='row' id='main'><form id='components' class='govcy-form'></form></article>",
            "Two-thirds" : "<div class='row'><article class='govcy-col-8' id='main'><form id='components' class='govcy-form'></form></article></div>"
            ,"One-third + Two-thirds + Sidemenu" : "<div class='row'><article class='col-md-9 order-md-last' id='main'><form id='components' class='govcy-form'></form></article>"
                +"<aside class='col-md-3 order-md-first'><nav class='nav flex-column' id='sideMenu'></nav></aside></div>"
        },
        "header" : {
            "en": 
                "<div class='row'>"
                + "<header id='headerContainerIn' class='govcy-header govcy-bg-primary govcy-text-white govcy-bg-primary-right'>"
                + "<a href='#' class='govcy-logo'> <img/></a>"
                + "<form class='govcy-text-white govcy-bg-primary'>     "
                + "<select id='changeLangSel' name='govcy-lang-menu' class='govcy-lang-menu govcy-text-white'>"
                + "<option value='en' selected>English</option>"
                + "<option value='el'>Ελληνικά</option>"
                + "</select>"
                + "</form>"
                + "<span class='govcy-service-name'>Prototypes</span>"
                + "</header>"
                + "</div>"
            ,"el" : 
                "<div class='row'>"
                + "<header id='headerContainerIn' class='govcy-header govcy-bg-primary govcy-text-white govcy-bg-primary-right'>"
                + "<a href='#' class='govcy-logo'> <img/></a>"
                + "<form class='govcy-text-white govcy-bg-primary'>"
                + "<select id='changeLangSel' name='govcy-lang-menu' class='govcy-lang-menu govcy-text-white'>"
                + "<option value='en'>English</option>"
                + "<option value='el' selected>Ελληνικά</option>"
                + "</select>"
                + "</form>"
                + "<span class='govcy-service-name'>Πρωτότυπα</span>"
                + "</header>"
                + "</div>"
        },
        "footer" : {
            "en" : 
                "<div id='footerContainerIn' class='govcy-container-fluid govcy-br-top-8 govcy-br-top-primary govcy-p-3 govcy-bg-light'>"
                + "<div class='govcy-container'>"
                + " <div class='row'>"
                + "<footer  class='govcy-footer'>"
                + "<span class='govcy-d-inline-block govcy-valign-top govcy-pb-2'><img alt='govcy-logo' /></span>"
                + "<ul class='govcy-d-inline-block  govcy-m-0 govcy-pl-3 govcy-efs-medium'>"
                + "<li><a href='#' onclick='return false;'>Privacy statement</a></li>"
                + "<li><a href='#' onclick='return false;'>Cookie policy</a></li>"
                + "<li><a href='#' onclick='return false;'>Accessibility statement</a></li>"
                + "<li class='govcy-d-block govcy-text-dark'>© Republic of Cyprus, 2021</li>"
                + "</ul>"
                + "</footer>"
                + "</div>"
                + "</div>"
                + "</div>"
            ,"el" : 
            "<div id='footerContainerIn' class='govcy-container-fluid govcy-br-top-8 govcy-br-top-primary govcy-p-3 govcy-bg-light'>"
                + "<div class='govcy-container'>"
                + " <div class='row'>"
                + "<footer  class='govcy-footer'>"
                + "<span class='govcy-d-inline-block govcy-valign-top govcy-pb-2'><img alt='govcy-logo' /></span>"
                + "<ul class='govcy-d-inline-block  govcy-m-0 govcy-pl-3 govcy-efs-medium'>"
                + "<li><a href='#' onclick='return false;'>Όροι Χρήσης</a></li>"
                + "<li><a href='#' onclick='return false;'>Προστασία Προσωπικών Δεδομένων</a></li>"
                + "<li><a href='#' onclick='return false;'>Προσβασιμότητα</a></li>"
                + "<li class='govcy-d-block govcy-text-dark'>© Κυπριακή Δημοκρατία, 2021</li>"
                + "</ul>"
                + "</footer>"
                + "</div>"
                + "</div>"
                + "</div>"
        },
        "componentTemplates" : {
            "date": 
            "<div {{#id}}id='{{id}}'{{/id}} class='govcy-form-control{{#classes}} {{.}}{{/classes}}'>"
            +" <label class='govcy-label govcy-mb-1' for=''>{{{langConent.label}}}</label>"
            + "<span class='govcy-input-error-msg govcy-mb-3'></span>"
            + "{{#langConent.hint}}<span class='govcy-hint govcy-mb-3'>{{langConent.hint}}</span>{{/langConent.hint}}"
                + "<div class='govcy-d-flex'>"
                    + "<div class='govcy-d-block'>"
                        + "<label class='govcy-label govcy-mb-1 govcy-fw-normal govcy-mb-2' for=''>{{langConent.day}}</label>"
                        + "<input type='text' name='{{name}}-day' class='govcy-text-input govcy-text-input-char_3 govcy-p-2' placeholder='' maxlength='2'>"
                    + "</div>"
                    + "<div class='govcy-d-block govcy-ml-2'>"
                        + "<label class='govcy-label govcy-mb-1 govcy-fw-normal govcy-mb-2' for=''>{{langConent.month}}</label>"
                        + "<input type='text' name='{{name}}-month' class='govcy-text-input govcy-text-input-char_3 govcy-p-2' placeholder='' maxlength='2'>"
                    + "</div>"
                    + "<div class='govcy-d-block govcy-ml-2'>"
                        + "<label class='govcy-label govcy-mb-1 govcy-fw-normal govcy-mb-2' for=''>{{langConent.year}}</label>"
                        + "<input type='text' name='{{name}}-year' class='govcy-text-input govcy-text-input-char_6 govcy-p-3' placeholder='' maxlength='4'>"
                    + "</div>"
                + "</div>"
            + "</div>",
            "text": 
                "<div {{#id}}id='{{id}}'{{/id}} class='govcy-form-control{{#classes}} {{.}}{{/classes}}'>"
                + "<label{{#id}} for='{{id}}'{{/id}} class='govcy-label' for='input'>{{{langConent.label}}}</label>"
                + "<span {{#id}}id='{{id}}_error'{{/id}} class='govcy-input-error-msg'></span>"
                + "{{#langConent.hint}}<span class='govcy-hint'>{{langConent.hint}}</span>{{/langConent.hint}}"
                + "<input type='text' class='govcy-text-input{{#charSubType}} govcy-text-input-char_{{charSubType}}{{/charSubType}}' name='{{name}}'"
                +"{{#langConent.placeholder}}placeholder='{{langConent.placeholder}}'{{/langConent.placeholder}}"
                +"{{#maxlength}} maxlength={{maxlength}}{{/maxlength}}>"
                + "</div>",
            "password": 
                "<div {{#id}}id='{{id}}'{{/id}} class='govcy-form-control{{#classes}} {{.}}{{/classes}}'>"
                + "<label{{#id}} for='{{id}}'{{/id}} class='govcy-label' for='input'>{{{langConent.label}}}</label>"
                + "<span {{#id}}id='{{id}}_error'{{/id}} class='govcy-input-error-msg'></span>"
                + "{{#langConent.hint}}<span class='govcy-hint'>{{langConent.hint}}</span>{{/langConent.hint}}"
                + "<input type='password' class='govcy-text-input' name='{{name}}'"
                +"{{#langConent.placeholder}}placeholder='{{langConent.placeholder}}'{{/langConent.placeholder}}"
                +"{{#maxlength}} maxlength={{maxlength}}{{/maxlength}}>"
                + "</div>",
            "button" : "<button type='button' class='govcy-btn-{{subtype}}{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>{{langConent.label}}</button>",
            "link" : "<div class='govcy-mb-4{{#classes}} {{.}}{{/classes}}'><a href='{{href}}'{{#id}} id='{{id}}'{{/id}}>{{langConent.label}}</a></div>",
            "backLink" : 
                "<span class='bi bi-chevron-left'></span>"
                    + "<a href='javascript:history.back()'{{#id}} id='{{id}}'{{/id}}href='#' class='govcy-back-link'>{{langConent.label}}</a>",
            "userNamesSignOut" : 
                "{{langConent.userName}} | "
                + "<a href='#p/signOut' {{#id}} id='{{id}}'{{/id}}href='#' class='govcy-back-link'>{{langConent.logout}}</a>",
            "paragraph" : "<p class='{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>{{langConent.label}}</p>", 
            /*"spanHTML" : "<span class='{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>{{{langConent.label}}}</span>",*/ 
            "spanHTML" : "<div class='{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>{{{langConent.label}}}</div>", 
            "unorderedList" : "<ul class='{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>"
                + "{{#langConent.data}}<li>{{{.}}}</li>{{/langConent.data}}"
                + "</ul>", 
            "orderedList" : "<ol class='{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>"
                + "{{#langConent.data}}<li>{{{.}}}</li>{{/langConent.data}}"
                + "</ol>", 
            "h1" : "<h1 class='{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>{{langConent.label}}</h1>",
            "h2" : "<h2 class='{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>{{langConent.label}}</h2>",
            "h3" : "<h3 class='{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>{{langConent.label}}</h3>",
            "h4" : "<h4 class='{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>{{langConent.label}}</h4>",
            "h5" : "<h5 class='{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>{{langConent.label}}</h5>",
            "h6" : "<h6 class='{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>{{langConent.label}}</h6>",
            "table" : "<p>{{{langConent.label}}}</p>"
            + "<div class='govcy-table-responsive{{#classes}} {{.}}{{/classes}}'>"
            + "<table class='govcy-table govcy-mb-4'>"
            + "<thead><tr>"
                + "{{#langConent.head}}<th>{{.}}</th>{{/langConent.head}}"
            + "</tr></thead>"
            + "<tbody>"
                + "{{#langConent.data}}<tr>{{#.}}<td>{{{.}}}</td>{{/.}}</tr>{{/langConent.data}}"
            + "</tbody>"
            + "</table>"
            + "</div>"
            ,"checkboxes" : 
                "<fieldset class='govcy-fieldset govcy-mb-0'>"
                + "<legend class='govcy-legend'>{{{langConent.label}}}</legend>"
                + "{{#langConent.hint}}<span class='govcy-hint'>{{{langConent.hint}}}</span>{{/langConent.hint}}"
                + "<div {{#id}} id='{{id}}'{{/id}}class='govcy-form-control'>"
                + "<span {{#id}} id='{{id}}_error'{{/id}}class='govcy-input-error-msg'></span>"
                + "{{#langConent.options}}"
                    + "<label class='govcy-checkbox'>"
                    + "{{{option_label}}}"
                    + "<input name='{{name}}' value='{{option_value}}' id='{{option_id}}'{{#option_checked}}checked{{/option_checked}} class='govcy-checkbox-input' type='checkbox'>"
                    + "<span class='govcy-tickbox'></span>"
                    + "{{#option_hint}}<span class='govcy-hint govcy-mt-2'>{{{option_hint}}}</span>{{/option_hint}}"
                    + "</label>"
                + "{{/langConent.options}}"
                + "</div>"
                + "</fieldset>"
            ,"file" : "<div class='govcy-form-control{{#classes}} {{.}}{{/classes}}'>"
                + "<label{{#id}} for='{{id}}'{{/id}}class='govcy-label'>{{langConent.label}}</label>"
                + "<span {{#id}}id='{{id}}_error'{{/id}} class='govcy-input-error-msg'></span>"
                + "<input type='file' name='{{name}}' {{#id}}id='{{id}}'{{/id}}>"
                + "</div>"            
            ,"radio" : 
                "<fieldset class='govcy-fieldset govcy-mb-0'>"
                + "<legend class='govcy-legend'>{{{langConent.label}}}</legend>"
                + "{{#langConent.hint}}<span class='govcy-hint govcy-mt-2'>{{{langConent.hint}}}</span>{{/langConent.hint}}"
                + "<div {{#id}} id='{{id}}'{{/id}}class='govcy-form-control'>"
                + "<span {{#id}} id='{{id}}_error'{{/id}}class='govcy-input-error-msg'></span>"
                + "{{#langConent.options}}"
                    + "<label class='govcy-radio'>"
                    + "{{{option_label}}}"
                    + "<input name='{{name}}' value='{{option_value}}' id='{{option_id}}'{{#option_checked}}checked{{/option_checked}} class='govcy-radio-input' type='radio'>"
                    + "<span class='govcy-radio-checked'></span>"
                    + "{{#option_hint}}<span class='govcy-hint govcy-mt-2'>{{{option_hint}}}</span>{{/option_hint}}"
                    + "</label>"
                + "{{/langConent.options}}"
                + "</div>"
                + "</fieldset>"
            ,"successPanel" : 
                "<div class='row govcy-px-2{{#classes}} {{.}}{{/classes}}'>"
                    + "<div class='govcy-alert-completed-notification govcy-px-0'>"
                        + "<div class='govcy-alert-completed-notification-body govcy-bg-success'>"
                            + "<h1>{{langConent.head}}</h1>"
                            + "<p class='govcy-mb-0 govcy-fs-3'>{{{langConent.label}}}</p>"
                        + "</div>"
                    + "</div>"
                + "</div>"
            ,"alertError" : 
                "<div class='row govcy-px-2{{#classes}} {{.}}{{/classes}}'>"
                + "<div class='govcy-alert-error govcy-br-5 govcy-br-danger govcy-p-3'>"
                + "<h2>{{{langConent.label}}}</h2>"
                + "<p class='govcy-mb-0'>{{#langConent.data}}<a class='errorSummaryLink' href='#'{{#elementName}} data-element-name='{{elementName}}'{{/elementName}}>{{{message}}}</a>{{/langConent.data}}</p>"
                + "</div>"
                + "</div>"
            ,"alertImportant" : 
                "<div class='row govcy-px-2{{#classes}} {{.}}{{/classes}}'>"
                + "<div class='govcy-alert-notification govcy-br-5 govcy-br-info govcy-px-0'>"
                    + "<div class='govcy-alert-notification-header govcy-bg-info'>{{{langConent.label}}}</div>"
                    + "<div class='govcy-alert-notification-body'>"
                + "{{#langConent.data}}<p class='govcy-pl-4 govcy-pt-3 govcy-fw-bold'>{{{.}}}</p>{{/langConent.data}}"
                + "</div>"
                + "</div>"
                + "</div>"
            ,"alertSuccess" : 
                "<div class='row govcy-px-2{{#classes}} {{.}}{{/classes}}'>"
                + "<div class='govcy-alert-notification govcy-br-5 govcy-br-success govcy-px-0'>"
                    + "<div class='govcy-alert-notification-header govcy-bg-success'>{{{langConent.label}}}</div>"
                    + "<div class='govcy-alert-notification-body'>"
                + "{{#langConent.data}}<p class='govcy-pl-4 govcy-pt-3 govcy-fw-bold'>{{{.}}}</p>{{/langConent.data}}"
                + "</div>"
                + "</div>"
                + "</div>"
            ,"warning" :
                "<div class='row {{#classes}} {{.}}{{/classes}}'>"
                + "<div class='govcy-alert-warning'>"
                + "<span class='material-icons govcy-alert-warning-icon'>error</span>"
                + "<span class='govcy-alert-warning-text' >{{{langConent.label}}}</span>"
                + "</div>"
                + "</div>"
            ,"fieldsetOpen" : "<fieldset class='govcy-fieldset{{#classes}} {{.}}{{/classes}}' {{#id}} id='{{id}}'{{/id}}>" 
                + "<legend class='govcy-legend'>{{{langConent.legend}}}</legend>"
            ,"fieldsetClose" : "</fieldset>"
            ,"divEmpty" : "<div class='{{#classes}} {{.}}{{/classes}}' {{#id}} id='{{id}}'{{/id}}></div>"
            ,"divContainerOpen" : "<div class='govcy-container{{#classes}} {{.}}{{/classes}}' {{#id}} id='{{id}}'{{/id}}>"
            ,"divContainerFluidOpen" : "<div class='govcy-container-fluid{{#classes}} {{.}}{{/classes}}' {{#id}} id='{{id}}'{{/id}}>"
            ,"divRowOpen" : "<div class='row{{#classes}} {{.}}{{/classes}}' {{#id}} id='{{id}}'{{/id}}>"
            ,"divColumnOpen" : "<div class='govcy-col{{#colnum}}-{{colnum}}{{/colnum}}{{#classes}} {{.}}{{/classes}} '{{#id}} id='{{id}}'{{/id}}>"
            ,"divClose" : "</div>"
        } 
    }
};
