DSFTemplates = 
{
    "markdownFile" : "<div{{#id}} id='{{id}}'{{/id}}></h1>",
    "layouts": {
        "Max-width" : "<article id='main'></article><form id='components'></form>"
        ,"One-third + Two-thirds + Sidemenu" : "<div class='row'><article class='col-md-9 order-md-last' id='main'></article>"
            +"<aside class='col-md-3 order-md-first'><nav class='nav flex-column' id='sideMenu'></nav></aside></div>"
    },
    "header" : {
        "en": "<nav class='navbar navbar-expand-md' aria-label='Top navigation bar'>"
            +"<div class='container-md'><a class='navbar-brand' href='#'>"
            +"<img class='p-3' src='img/thyreos.gif' alt='Cyprus Government'>gov.cy</a>"
            +"<button class='navbar-toggler navbar-light' type='button' data-bs-toggle='collapse' data-bs-target='#navbarsTopLevel' aria-controls='navbarsTopLevel' aria-expanded='false' aria-label='Toggle navigation'>"
            +"<span class='navbar-toggler-icon'></span></button>"
            +"<div class='collapse navbar-collapse' id='navbarsTopLevel'>"
            +"<ul class='navbar-nav me-auto mb-2 mb-lg-0' id='headerNavBar'>"
            +"<li class='nav-item'><a class='nav-link active' aria-current='page' href='#'>Home</a></li>"
            +"</ul><form><select class='form-control w-100-px' id='changeLangSel'><option value='en' selected>English</option><option value='el'>Ελληνικά</option></select></form></div></div></nav>"
        ,"el" : "<nav class='navbar navbar-expand-md' aria-label='Top navigation bar'>"
            +"<div class='container-md'><a class='navbar-brand' href='#'>"
            +"<img class='p-3' src='img/thyreos.gif' alt='Cyprus Government'>gov.cy</a>"
            +"<button class='navbar-toggler navbar-light' type='button' data-bs-toggle='collapse' data-bs-target='#navbarsTopLevel' aria-controls='navbarsTopLevel' aria-expanded='false' aria-label='Toggle navigation'>"
            +"<span class='navbar-toggler-icon'></span></button>"
            +"<div class='collapse navbar-collapse' id='navbarsTopLevel'>"
            +"<ul class='navbar-nav me-auto mb-2 mb-lg-0' id='headerNavBar'>"
            +"<li class='nav-item'><a class='nav-link active' aria-current='page' href='#'>Αρχική</a></li>"
            +"</ul><form><select class='form-control w-100-px' id='changeLangSel'><option value='en'>English</option><option value='el' selected>Ελληνικά</option></select></form></div></div></nav>"
    },
    "footer" : {
        "en" : "<footer class='py-3 my-4 bg-light border-top'>  <p class='justify-content-center mb-0 text-muted text-center'> <a class='text-muted' href='#'>Terms and Conditions</a>&nbsp;/&nbsp;      <a class='text-muted' href='#'>Accessibility</a>&nbsp;/&nbsp;      <a class='text-muted' href='#'>Data protection</a>  </p> <p class='justify-content-center mb-0 text-muted text-center'>     Built by the <a class='text-muted' href='#'>DSF Design System team</a>&nbsp;/&nbsp; </p>  <p class='justify-content-center mb-0 text-muted text-center'>     <img class='pe-3' src='img/thyreos.gif' alt='Cyprus Government'> © Republic of Cyprus, 2021 </p> </footer>"
        ,"el" : "<footer class='py-3 my-4 bg-light border-top'>  <p class='justify-content-center mb-0 text-muted text-center'> <a class='text-muted' href='#'> Όροι χρήσης</a>&nbsp;/&nbsp;      <a class='text-muted' href='#'>Προσβασιμότητα</a>&nbsp;/&nbsp;      <a class='text-muted' href='#'>Προστασία Προσωπικών Δεδομένων</a>  </p> <p class='justify-content-center mb-0 text-muted text-center'>     Ανάπτυξη <a class='text-muted' href='#'>DSF Design System team</a>&nbsp;/&nbsp; </p>  <p class='justify-content-center mb-0 text-muted text-center'>     <img class='pe-3' src='img/thyreos.gif' alt='Cyprus Government'> © Κυπριακή Δημοκρατία, 202 </p> </footer>"
    },
    "componentTemplates" : {
        "text": "<label for='{{name}}' class='form-label'>{{langLabel}}</label>"
            +"<input type='text' class='form-control' name='{{name}}'"
                +"{{#id}}id='{{id}}'{{/id}}"
                +"{{#placeholder}}placeholder='{{placeholder}}'{{/placeholder}}"
                +"{{#maxlength}} maxlength={{maxlength}}{{/maxlength}}>",
        "button" : "<button type='button' class='btn btn-primary'{{#id}} id='{{id}}'{{/id}}>{{langLabel}}</button>",
        "paragraph" : "<p{{#id}} id='{{id}}'{{/id}}>{{langLabel}}</p>", 
        "spanHTML" : "<span{{#id}} id='{{id}}'{{/id}}>{{{langLabel}}}</span>", 
        "paragraphHTML" : "<p{{#id}} id='{{id}}'{{/id}}>{{{langLabel}}}</p>", 
        "h1" : "<h1{{#id}} id='{{id}}'{{/id}}>{{langLabel}}</h1>",
        "h2" : "<h2{{#id}} id='{{id}}'{{/id}}>{{langLabel}}</h2>",
        "h3" : "<h3{{#id}} id='{{id}}'{{/id}}>{{langLabel}}</h3>",
        "h4" : "<h4{{#id}} id='{{id}}'{{/id}}>{{langLabel}}</h4>",
        "h5" : "<h5{{#id}} id='{{id}}'{{/id}}>{{langLabel}}</h5>",
        "h6" : "<h6{{#id}} id='{{id}}'{{/id}}>{{langLabel}}</h6>",
        "table" : "<p>{{langLabel}}</p>"
        + "<table class='table'>"
        + "<thead><tr>"
            + "{{#head}}<th>{{.}}</th>{{/head}}"
        + "</tr></thead>"
        + "<tbody>"
            + "{{#data}}<tr>{{#.}}<td>{{.}}</td>{{/.}}</tr>{{/data}}"
        + "</tbody>"
        + "</table>"
    } 
};