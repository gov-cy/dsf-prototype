DSFTemplates = 
{
    "markdownFile" : "<div{{#id}} id='{{id}}'{{/id}}></h1>",
    "layouts": {
        "Max-width" : "<div style='color:red'>This is just for demonstration purposes. It is not a real service.</div><article id='main'></article><form id='components'></form>"
        ,"One-third + Two-thirds + Sidemenu" : "<div style='color:red'>This is just for demonstration purposes. It is not a real service.</div><div class='row'><article class='col-md-9 order-md-last' id='main'></article>"
            +"<aside class='col-md-3 order-md-first'><nav class='nav flex-column' id='sideMenu'></nav></aside></div>"
    },
    "header" : {
        "en": "<div class='row'>"
        + "<header class='govcy-header'>"
        + "<a href='#' class='govcy-header-logo'> <img/></a>"
        + "<form>"
        + "<select id='changeLangSel' name='govcy-header-lang-menu' class='govcy-header-lang-menu'>"
        + "<option value='en' selected>EN</option>"
        + "<option value='el'>EL</option>"
        + "</select>"
        + "</form>"
        + "<input class='govcy-header-menu-btn' type='checkbox' id='menu-btn' />"
        + "<label class='govcy-header-menu-icon' for='menu-btn'>Menu<a><span class='material-icons carot-icon'>"
        + "arrow_drop_down"
        + "</span></a></label>"
        + "<label class='govcy-header-service-name'> <span>Prototypes</span></label>"
        + "<ul class='govcy-header-menu'>"
        + "<li><a href='#'>Guidance</a></li>"
        + "<li><a href='#'>Help</a></li>"
        + "<li><a href='#'>Login</a></li>"
        + "</ul>"
        + "</header>"
        + "</div>"
        ,"el" : "<div class='row'>"
        + "<header class='govcy-header'>"
        + "<a href='#' class='govcy-header-logo'> <img/></a>"
        + "<form>"
        + "<select id='changeLangSel' name='govcy-header-lang-menu' class='govcy-header-lang-menu'>"
        + "<option value='en'>EN</option>"
        + "<option value='el' selected>EL</option>"
        + "</select>"
        + "</form>"
        + "<input class='govcy-header-menu-btn' type='checkbox' id='menu-btn' />"
        + "<label class='govcy-header-menu-icon' for='menu-btn'>Μενού<a><span class='material-icons carot-icon'>"
        + "arrow_drop_down"
        + "</span></a></label>"
        + "<label class='govcy-header-service-name'> <span>Πρωτότυπα</span></label>"
        + "<ul class='govcy-header-menu'>"
        + "<li><a href='#'>Guidance</a></li>"
        + "<li><a href='#'>Βοήθεια</a></li>"
        + "<li><a href='#'>Σύνδεση</a></li>"
        + "</ul>"
        + "</header>"
        + "</div>"
    },
    "footer" : {
        "en" : "<div class='row'>"
        + "<footer class='govcy-footer govcy-br-top-8 govcy-br-top-primary govcy-p-3 govcy-bg-light'>"
        + "<span class='govcy-d-inline-block govcy-valign-top govcy-pb-2'><img alt='govcy-logo'></span>"
        + "<ul class='govcy-d-inline-block  govcy-m-0 govcy-pl-3 govcy-efs-medium'>"
        + "<li><a href='#'>Privacy statement</a></li>"
        + "<li><a href='#'>Cookie policy</a></li>"
        + "<li><a href='#'>Accessibility statement</a></li>"
        + "<li class='govcy-d-block govcy-text-dark'>© Republic of Cyprus, 2021</li>"
        + "</ul>"
        + "</footer>"
        + "</div>"
        ,"el" : "<div class='row'>"
        + "<footer class='govcy-footer govcy-br-top-8 govcy-br-top-primary govcy-p-3 govcy-bg-light'>"
        + "<span class='govcy-d-inline-block govcy-valign-top govcy-pb-2'><img alt='govcy-logo'></span>"
        + "<ul class='govcy-d-inline-block  govcy-m-0 govcy-pl-3 govcy-efs-medium'>"
        + "<li><a href='#'>Όροι Χρήσης</a></li>"
        + "<li><a href='#'>Προστασία Προσωπικών Δεδομένων</a></li>"
        + "<li><a href='#'>Προσβασιμότητα</a></li>"
        + "<li class='govcy-d-block govcy-text-dark'>© Κυπριακή Δημοκρατία, 2021</li>"
        + "</ul>"
        + "</footer>"
        + "</div>"
    },
    "componentTemplates" : {
        "text": "<div class='govcy-mb-3{{#classes}} {{.}}{{/classes}}'><label{{#id}} for='{{id}}'{{/id}} class='form-label'>{{langLabel}}</label>"
            +"<input type='text' class='form-control' name='{{name}}'"
                +"{{#id}}id='{{id}}'{{/id}}"
                +"{{#placeholder}}placeholder='{{placeholder}}'{{/placeholder}}"
                +"{{#maxlength}} maxlength={{maxlength}}{{/maxlength}}></div>",
        "button" : "<button type='button' class='govcy-btn-{{subtype}}{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>{{langLabel}}</button>",
        "link" : "<a class='{{#classes}} {{.}}{{/classes}}' href='{{href}}'{{#id}} id='{{id}}'{{/id}}>{{langLabel}}</a>",
        "backLink" : "<div class='govcy-mb-3{{#classes}} {{.}}{{/classes}}'>< <a href='javascript:history.back()'{{#id}} id='{{id}}'{{/id}}>{{langLabel}}</a></div>",
        "paragraph" : "<p class='{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>{{langLabel}}</p>", 
        "spanHTML" : "<span class='{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>{{{langLabel}}}</span>", 
        "paragraphHTML" : "<div class='{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>{{{langLabel}}}</div>", 
        "h1" : "<h1 class='{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>{{langLabel}}</h1>",
        "h2" : "<h2 class='{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>{{langLabel}}</h2>",
        "h3" : "<h3 class='{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>{{langLabel}}</h3>",
        "h4" : "<h4 class='{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>{{langLabel}}</h4>",
        "h5" : "<h5 class='{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>{{langLabel}}</h5>",
        "h6" : "<h6 class='{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>{{langLabel}}</h6>",
        "footer" : "<p class='{{#classes}} {{.}}{{/classes}}'{{#id}} id='{{id}}'{{/id}}>FOOTER: {{langLabel}}</p>",
        "table" : "<p>{{langLabel}}</p>"
        + "<table class='table{{#classes}} {{.}}{{/classes}}'>"
        + "<thead><tr>"
            + "{{#head}}<th>{{.}}</th>{{/head}}"
        + "</tr></thead>"
        + "<tbody>"
            + "{{#data}}<tr>{{#.}}<td>{{{.}}}</td>{{/.}}</tr>{{/data}}"
        + "</tbody>"
        + "</table>"
        ,"checkboxes" : "<p{{#id}} id='{{id}}'{{/id}}>{{{langLabel}}}</p>"
            + "{{#data}}"
            + "<div class='form-check {{#classes}} {{.}}{{/classes}}'>"
            + "<input name='{{name}}' class='form-check-input' type='checkbox' value='{{option_value}}' id='{{option_id}}'{{#option_checked}}checked{{/option_checked}}>"
            + "<label class='form-check-label' for='{{option_id}}'>{{option_label}}</label>"
            + "</div>{{/data}}"
        ,"file" : "<div class='govcy-mb-3 {{#classes}} {{.}}{{/classes}}'>"
            + "<label{{#id}} for='{{id}}'{{/id}}class='form-label'>{{langLabel}}</label>"
            + "<input class='form-control' type='file' name='{{name}}' {{#id}}id='{{id}}'{{/id}}>"
            + "</div>"            
        ,"radio" : "<p{{#id}} id='{{id}}'{{/id}}>{{{langLabel}}}</p>"
            + "{{#data}}"
            + "<div class='form-check {{#classes}} {{.}}{{/classes}}'>"
            + "<input name='{{name}}' class='form-check-input' type='radio' value='{{option_value}}' id='{{option_id}}'{{#option_checked}}checked{{/option_checked}}>"
            + "<label class='form-check-label' for='{{option_id}}'>{{option_label}}</label>"
            + "</div>{{/data}}"
        ,"successPanel" : "<div class='row{{#classes}} {{.}}{{/classes}}'>"
            +"<div class='govcy-panel'>"
            +"<div class='col'>"
            +"<div class='row'>"
            +"<div class='col align-items-center justify-content-center d-flex'>"
            +"<h1>{{head}}</h1>"
            +"</div></div>"
            +"<div class='row'>"
            +"<div class='col align-items-center align-content-center justify-content-center d-flex'>"
            +"<p> {{{langLabel}}} </p>"
            +"</div></div></div></div></div>"
        ,"alertError" : "<div class='row{{#classes}} {{.}}{{/classes}}'>"
            + "<div class='govcy-alert-error'>"
            + "<h2>"
            + "{{{langLabel}}}"
            + "</h2>"
            + "{{#data}}<p><a href='#'>{{{.}}}</a></p>{{/data}}"
            + "</div>"
            + "</div>"
        ,"alertImportant" : "<div class='row{{#classes}} {{.}}{{/classes}}'>"
            + "<div class='govcy-alert-important'>"
            + "<h2>"
            + "{{{langLabel}}}"
            + "</h2>"
            + "{{#data}}<p>{{{.}}}</p>{{/data}}"
            + "</div>"
            + "</div>"
        ,"alertSuccess" : "<div class='row{{#classes}} {{.}}{{/classes}}'>"
            + "<div class='govcy-alert-success'>"
            + "<h2>"
            + "{{{langLabel}}}"
            + "</h2>"
            + "{{#data}}<p>{{{.}}}</p>{{/data}}"
            + "<div class='govcy-link-text'>"
            + "{{#links}}<p>{{{.}}}</p>{{/links}}"
            + "</div>"
            + "</div>"
            + "</div>"
        ,"warning" : "<div class='row{{#classes}} {{.}}{{/classes}}'>"
            + "<div class='govcy-warning'>"
            + "<div class='col align-items-center justify-content-start d-flex'>"
            + "<p>"
            + "<i class='bi bi-exclamation-circle-fill'></i>"
            + "{{{langLabel}}}"
            + "</p>"
            + "</div>"
            + "</div>"
            + "</div>"
        ,"divContainerOpen" : "<div class='govcy-container{{#classes}} {{.}}{{/classes}}' >"
        ,"divContainerFluidOpen" : "<div class='govcy-container-fluid{{#classes}} {{.}}{{/classes}}' >"
        ,"divRowOpen" : "<div class='row{{#classes}} {{.}}{{/classes}}' >"
        ,"divColumnOpen" : "<div class='govcy-col{{#colnum}}-{{colnum}}{{/colnum}}{{#classes}} {{.}}{{/classes}} '>"
        ,"divClose" : "</div>"
    } 
};