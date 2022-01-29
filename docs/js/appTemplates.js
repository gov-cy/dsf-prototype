DSFTemplates = 
{
    "defaultLang" : "en",
    "markdownFile" : "<div{{#id}} id='{{id}}'{{/id}}></h1>",
    "layouts": {
        "Max-width" : "<section class='row'><div id='before-main'></div></section><div style='color:red'>This is just for demonstration purposes. It is not a real service.</div><article class='row' id='main'><form id='components' class='govcy-form'></form></article>",
        "Two-thirds" : "<section class='row'><div id='before-main'></div></section><div style='color:red'>This is just for demonstration purposes. It is not a real service.</div><article class='row' id='main'><form id='components' class='govcy-form col-md-9'></form></article>"
        ,"One-third + Two-thirds + Sidemenu" : "<div style='color:red'>This is just for demonstration purposes. It is not a real service.</div><div class='row'><article class='col-md-9 order-md-last' id='main'></article>"
            +"<aside class='col-md-3 order-md-first'><nav class='nav flex-column' id='sideMenu'></nav></aside></div>"
    },
    "header" : {
        "en": 
            "<div class='row'>"
            + "<header id='headerContainerIn' class='govcy-header govcy-bg-primary govcy-text-white govcy-bg-primary-right'>"
            + "<a href='#' class='govcy-logo'> <img/></a>"
            + "<form class='govcy-text-white govcy-bg-primary'>     "
            + "<select id='changeLangSel' name='govcy-lang-menu' class='govcy-lang-menu govcy-text-white'>"
            + "<option value='en' selected>En</option>"
            + "<option value='el'>El</option>"
            + "</select>"
            + "</form>"
            + "<input class='govcy-menu-btn govcy-d-none' type='checkbox' id='menu-btn' />"
            + "<label class='govcy-menu-icon govcy-d-md-none' for='menu-btn'>Menu"
            + "<span class='material-icons govcy-my-3'>arrow_drop_down</span>"
            + "</label>"
            + "<span class='govcy-service-name'>Prototypes</span>"
            + "<ul class='govcy-menu govcy-bg-sub-menu govcy-bg-md-primary'>"
            + "<li><a href='#'>Help</a></li>"
            + "</ul>"
            + "</header>"
            + "</div>"
        ,"el" : 
            "<div class='row'>"
            + "<header id='headerContainerIn' class='govcy-header govcy-bg-primary govcy-text-white govcy-bg-primary-right'>"
            + "<a href='#' class='govcy-logo'> <img/></a>"
            + "<form class='govcy-text-white govcy-bg-primary'>"
            + "<select id='changeLangSel' name='govcy-lang-menu' class='govcy-lang-menu govcy-text-white'>"
            + "<option value='en'>En</option>"
            + "<option value='el' selected>El</option>"
            + "</select>"
            + "</form>"
            + "<input class='govcy-menu-btn govcy-d-none' type='checkbox' id='menu-btn' />"
            + "<label class='govcy-menu-icon govcy-d-md-none' for='menu-btn'>Menu"
            + "<span class='material-icons govcy-my-3'>arrow_drop_down</span>"
            + "</label>"
            + "<span class='govcy-service-name'>Πρωτότυπα</span>"
            + "<ul class='govcy-menu govcy-bg-sub-menu govcy-bg-md-primary'>"
            + "<li><a href='#'>Βοήθεια</a></li>"
            + "</ul>"
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
            + "<li><a href='#'>Privacy statement</a></li>"
            + "<li><a href='#'>Cookie policy</a></li>"
            + "<li><a href='#'>Accessibility statement</a></li>"
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
            + "<li><a href='#'>Όροι Χρήσης</a></li>"
            + "<li><a href='#'>Προστασία Προσωπικών Δεδομένων</a></li>"
            + "<li><a href='#'>Προσβασιμότητα</a></li>"
            + "<li class='govcy-d-block govcy-text-dark'>© Κυπριακή Δημοκρατία, 2021</li>"
            + "</ul>"
            + "</footer>"
            + "</div>"
            + "</div>"
            + "</div>"
    },
    "componentTemplates" : {
        "text": 
            "<div class='govcy-form-control {{#classes}} {{.}}{{/classes}}'>"
            + "<label{{#id}} for='{{id}}'{{/id}} class='govcy-label' for='input'>{{{langConent.label}}}</label>"
            + "{{#langConent.hint}}<span class='govcy-hint'>{{langConent.hint}}</span>{{/langConent.hint}}"
            + "<input type='text' class='govcy-text-input' name='{{name}}'"
            +"{{#id}}id='{{id}}'{{/id}}"
            +"{{#langConent.placeholder}}placeholder='{{langConent.placeholder}}'{{/langConent.placeholder}}"
            +"{{#maxlength}} maxlength={{maxlength}}{{/maxlength}}>"
            + "</div>",
        "password": 
            "<div class='govcy-form-control {{#classes}} {{.}}{{/classes}}'>"
            + "<label{{#id}} for='{{id}}'{{/id}} class='govcy-label' for='input'>{{{langConent.label}}}</label>"
            + "{{#langConent.hint}}<span class='govcy-hint'>{{langConent.hint}}</span>{{/langConent.hint}}"
            + "<input type='password' class='govcy-text-input' name='{{name}}'"
            +"{{#id}}id='{{id}}'{{/id}}"
            +"{{#langConent.placeholder}}placeholder='{{langConent.placeholder}}'{{/langConent.placeholder}}"
            +"{{#maxlength}} maxlength={{maxlength}}{{/maxlength}}>"
            + "</div>",
        "button" : "<button type='button' class='govcy-btn-{{subtype}}{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>{{langConent.label}}</button>",
        "link" : "<a class='{{#classes}} {{.}}{{/classes}}' href='{{href}}'{{#id}} id='{{id}}'{{/id}}>{{langConent.label}}</a>",
        "backLink" : 
            "<div class='{{#classes}} {{.}}{{/classes}}'><span class='bi bi-chevron-left'></span>"
            + "<a href='javascript:history.back()'{{#id}} id='{{id}}'{{/id}}href='#' class='govcy-back-link'>{{langConent.label}}</a></div>",
        "userNamesSignOut" : 
            "<div class='govcy-text-end{{#classes}} {{.}}{{/classes}}'>{{langConent.userName}} | "
            + "<a href='#p/ariadniSignOut' {{#id}} id='{{id}}'{{/id}}href='#' class='govcy-back-link'>{{langConent.logout}}</a></div>",
        "paragraph" : "<p class='{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>{{langConent.label}}</p>", 
        "spanHTML" : "<span class='{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>{{{langConent.label}}}</span>", 
        "paragraphHTML" : "<div class='{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>{{{langConent.label}}}</div>", 
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
        "table" : "<p>{{langConent.label}}</p>"
        + "<table class='table{{#classes}} {{.}}{{/classes}}'>"
        + "<thead><tr>"
            + "{{#langConent.head}}<th>{{.}}</th>{{/langConent.head}}"
        + "</tr></thead>"
        + "<tbody>"
            + "{{#langConent.data}}<tr>{{#.}}<td>{{{.}}}</td>{{/.}}</tr>{{/langConent.data}}"
        + "</tbody>"
        + "</table>"
        ,"checkboxes" : 
            "<fieldset {{#id}} id='{{id}}'{{/id}}class='govcy-fieldset'>"
            + "<legend class='govcy-legend'>{{{langConent.label}}}</legend>"
            + "{{#langConent.hint}}<span class='govcy-hint'>{{{langConent.hint}}}</span>{{/langConent.hint}}"
            + "<div class='govcy-form-control'>"
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
        ,"file" : "<div class='govcy-mb-3 {{#classes}} {{.}}{{/classes}}'>"
            + "<label{{#id}} for='{{id}}'{{/id}}class='form-label'>{{langConent.label}}</label>"
            + "<input class='form-control' type='file' name='{{name}}' {{#id}}id='{{id}}'{{/id}}>"
            + "</div>"            
        ,"radio" : 
            "<fieldset {{#id}} id='{{id}}'{{/id}}class='govcy-fieldset'>"
            + "<legend class='govcy-legend'>{{{langConent.label}}}</legend>"
            + "{{#langConent.hint}}<span class='govcy-hint govcy-mt-2'>{{{langConent.hint}}}</span>{{/langConent.hint}}"
            + "<div class='govcy-form-control'>"
            + "{{#langConent.options}}"
                + "<label class='govcy-radio-btn'>"
                + "{{{option_label}}}"
                + "<input name='{{name}}' value='{{option_value}}' id='{{option_id}}'{{#option_checked}}checked{{/option_checked}} class='govcy-radio-input' type='radio'>"
                + "<span class='govcy-radio'></span>"
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
                        + "<p class='govcy-mb-0'>{{{langConent.label}}}</p>"
                    + "</div>"
                + "</div>"
            + "</div>"
        ,"alertError" : 
            "<div class='row govcy-px-2{{#classes}} {{.}}{{/classes}}'>"
            + "<div class='govcy-alert-error govcy-br-5 govcy-br-danger govcy-p-3'>"
            + "<h2>{{{langConent.label}}}</h2>"
            + "<p class='govcy-mb-0'>{{#langConent.data}}<a href='#'>{{{.}}}</a>{{/langConent.data}}</p>"
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
            "<div class='row{{#classes}} {{.}}{{/classes}}'>"
            + "<div class='govcy-alert-warning'>"
            + "<span class='material-icons govcy-alert-warning-icon'>error</span>"
            + "<span class='govcy-alert-warning-text' >{{{langConent.label}}}</span>"
            + "</div>"
            + "</div>"
        ,"fieldsetOpen" : "<fieldset class='govcy-fieldset{{#classes}} {{.}}{{/classes}}' {{#id}} id='{{id}}'{{/id}}>" 
            + "<legend class='govcy-legend'>{{{langConent.legend}}}</legend>"
        ,"fieldsetClose" : "</fieldset>"
        ,"divContainerOpen" : "<div class='govcy-container{{#classes}} {{.}}{{/classes}}' {{#id}} id='{{id}}'{{/id}}>"
        ,"divContainerFluidOpen" : "<div class='govcy-container-fluid{{#classes}} {{.}}{{/classes}}' {{#id}} id='{{id}}'{{/id}}>"
        ,"divRowOpen" : "<div class='row{{#classes}} {{.}}{{/classes}}' {{#id}} id='{{id}}'{{/id}}>"
        ,"divColumnOpen" : "<div class='govcy-col{{#colnum}}-{{colnum}}{{/colnum}}{{#classes}} {{.}}{{/classes}} '{{#id}} id='{{id}}'{{/id}}>"
        ,"divClose" : "</div>"
    } 
};