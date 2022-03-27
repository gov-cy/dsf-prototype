DSFTemplates = 
{
    "defaultLang" : "en",
    "markdownFile" : "<div{{#id}} id='{{id}}'{{/id}}></h1>",
    /*"layouts": {
        "Max-width" : "<section class='row'><div id='before-main'></div></section><div style='color:red'>This is just for demonstration purposes. It is not a real service.</div><article class='row' id='main'><form id='components' class='govcy-form'></form></article>",
        "Two-thirds" : "<section class='row'><div id='before-main'></div></section><div style='color:red'>This is just for demonstration purposes. It is not a real service.</div><article class='row' id='main'><form id='components' class='govcy-form col-md-9'></form></article>"
        ,"One-third + Two-thirds + Sidemenu" : "<div style='color:red'>This is just for demonstration purposes. It is not a real service.</div><div class='row'><article class='col-md-9 order-md-last' id='main'></article>"
            +"<aside class='col-md-3 order-md-first'><nav class='nav flex-column' id='sideMenu'></nav></aside></div>"
    },*/
    "layouts": {
        "Max-width" : "<article class='row' id='main'><form id='components' class='govcy-form'></form></article>",
        "Two-thirds" : "<article class='row' id='main'><form id='components' class='govcy-form col-md-9'></form></article>"
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
            "<div class='govcy-float-start{{#classes}} {{.}}{{/classes}}'>"
                +"<span class='bi bi-chevron-left'></span>"
                + "<a href='javascript:history.back()'{{#id}} id='{{id}}'{{/id}}href='#' class='govcy-back-link'>{{langConent.label}}</a></div>",
        "userNamesSignOut" : 
            "<div class='govcy-text-end govcy-float-end{{#classes}} {{.}}{{/classes}}'>{{langConent.userName}} | "
            + "<a href='#p/signOut' {{#id}} id='{{id}}'{{/id}}href='#' class='govcy-back-link'>{{langConent.logout}}</a></div>",
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
};