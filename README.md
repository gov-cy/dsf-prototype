# dsf-prototype
Gov.cy DSF prototype tool. Use this tool to create pages using the styling and the components of the GOV.CY DSF team and routes to link them together. 

This is the readme for the dsf-prototype repository. 
Demo: https://gov-cy.github.io/dsf-prototype

## Install 

You need to have [Node.js](https://nodejs.org/en/) installed.

### 1. Download the tool

[Download](https://github.com/gov-cy/dsf-prototype/archive/refs/heads/master.zip)

### 2. Unzip  

Unzip the file in a new folder on a local drive. Do not install the kit on a cloud-based drive (for example, Dropbox, Microsoft OneDrive), as this may cause permissions issues.

### 3. Install modules

Navigate to the unziped `dsf-prototype-master` folder though the command line and Run the following command `npm install`

## Run

To run the tool Navigate to the unziped `dsf-prototype-master` folder though the command line and Run the following command `npm start`.

After the tool has started, you should see a message telling you that the tool is running:

```
Listening on port 3000 url: http://localhost:3000
```

A page should open in a new tab in your browser.

-----

## Creating pages and routes

Everything resides in the `docs` folder and is controlled by the `data\pages.json` where the *site options* and all *pages* are listed. *Routes* are also defined here. 

For each page listed in the pages.json a `data\prototypes\{{id}}.json` file must exist with the definition of the page. The system uses templates defined in the `js\appTemplates.js` file. 

### How to add a page?

A page consists of a group of components to be rendered on the screen and DOM events that trigger predefined or custom actions. To create a page do the following.
 
1. Update `pages.json` file with details under `pages`. More details and examples in the [pages.json](#pagesjson) section. For example add the following under `pages`:
  ```js
  ,"service1/page1":{ "id":"service1/page1"}
  ```

2. Create a `data/prototypes/{{id}}.json` file where `{{id}}` must be the same as defined in pages.json. More details and examples in the [data/prototypes/{{id}}.json](#dataprototypesidjson) section. For example create the following file under `data/prototypes/service1/page1.json`
  ```js
    {
        "id":"service1/page1",
        "menus" : [],
        "layout" : "Max-width",
        "DSFcomponents" : 
        {
            "DOMId": "components",
            "components" : [
                {
                    "type": "h1",
                    "label": {"en":"Welcome", "el":"Καλωσορίσατε"}
                }
                ,{
                    "type": "paragraph",
                    "label": {"en":"Welcome to this test.", "el":"Καλώς ήρθατε σε αυτό το τεστ."}
                }
                ,{
                    "type": "button",
                    "subtype": "primary",
                    "label":  {"en":"Next", "el":"Επόμενο"},
                    "id":"nextRoutebtn",
                    "events" : [
                        {
                            "on":"click","actions" : [
                                {"action" : "nextOnRoute","data":""}
                            ]
                        }
                    ]
                }
            ]
        }
    }
  ```
  - To find which component you can use and sample code to add to the `DSFComponents` of the page check the [Components](#components) section.
  - To find out more about events you can add to a component, check the [Events and actions](#events-and-actions) section.

3. If you need to add it to a menu, make sure to update the appropriate entry in the `menus` as needed. More details and examples in the [pages.json](#pagesjson) section.

To access the page directly from your browser use `#p/{{id}}` URL, for example `http://127.0.0.1:3000/docs/#p/cheatsheet`. More details and examples in the [URL rules](#url-rules) section.

You can also use a page define with the method here on a route.

-----

### How to add a route?
A route consists of a pages to be displayed in a specific order. To create a route do the following.
 
1. Update `pages.json` file with details under `routes`.  More details and examples in the [pages.json](#pagesjson) section. For example add the following under `pages`:
  ```js
    "routes" : { 
        "scebario1" : [ 
            "service1/start"  
            ,"service1/page1"
        ]
    }
  ```

You can use the `nextOnRoute` and `previousOnRoute` actions to got to navigate thourgh the route (see [Events and actions](#events-and-actions)). 

To access the route from your browser use `#r/{{route_id}}/{{route_step}}` URL, for example `http://127.0.0.1:3000/docs/#r/scenario1/0`. More details and examples in the [URL rules](#url-rules) section.

-----

## URL rules

- All pages can be rendered using the prefix `#p/` and their `id` as defined in `pages.json`. i.e:
  - `#p/index`
  - `#p/service1/start`
- All route steps can be rendered using the prefix `#r/` their `id/` as defined in `pages.json` and the `array index number` for the specific step. Note that array index starts with 0.
  - `#r/scenario1/0`  
  - `#r/scenario2/1`

URLs are relative.

-----

## Definition files

### pages.json

Check below a sample structure of the file with comments to help identify what is each element

<details>
  <summary>code</summary>

```js
{
    "defaultPage" : "index", //defines the default page if no page id is defined in url
    "menus" : //define the menus here to be referenced in the `pages` section
        {//can define different menus.
            "general": { 
                "DOMId": "headerNavBar" //the DOM id of the element that the menu will be rendered in 
                ,"items" : [//the menu items. Always define label in all languages and appropriate url. URL is `#p/{page.id}`
                    {"id" :"homeMenu", "label":{"en":"Home","el":"Αρχική"}, "url" :"#"}
                ]
            }
        }
    ,
    "pages" : {// define the pages 
        "index":{ //index must be the same as id 
            "id":"index" //page id. //in this example the file is located under data/prototypes/index.json
        }
        ,"service1/start":{ "id":"service1/start"} //in this example the file is located under data/prototypes/service1/start.json
        ,"service1/page1":{ "id":"service1/page1"}
        ,"service1/page2":{ "id":"service1/page2"}
        ,"service1/end":{ "id":"service1/end"}
    }
    ,
    "routes" : { // all routes are defined here
        "scebario1" : [ //id of the scenario
            "service1/start" // page to be rendered in step 0 
            ,"service1/end" // page to be rendered in step 1
        ]
        ,"scebario2" : [
            "service1/start"
            ,"service1/page1"
            ,"service1/end"
        ]
        
    }
}
```
</details>

### data/prototypes/{{id}}.json

This file defines the page configuration and it's components. Note that the `{{id}}` must be the same as defined in the pages.json file. Also you can define in a subdirectory, i.e. if the {{id}} defined in the pages.json is `service1/page1` the corresponding page definition file must be `prototypes/service1/page1`.

<details>
  <summary>code</summary>

```js

{ 
    "id":"service1/page1", //page id
    "menus" : ["general"], //the menus of the page. Empty array if non 
    "layout" : "Max-width", // template reference
    "preScript" : "birthBenefit/test.js", // javascript to be executed before loading the components. File must be located under `data/prototypes/`
    "postScript" : "birthBenefit/test.js", // javascript to be executed after loading the components. File must be located under `data/prototypes/`
    "DSFcomponents": //Components definitions  
        {
        "DOMId": "components", //the DOM id of the element that the components will be rendered in 
        "components" : [ // components array
            {
                "type": "h1", //TYPE Required. Matches the types defined in appTemplates.js
                "label": {"en":"Enter your details", "el":"Εισαγάγετε τα στοιχεία σας"}, //labels in all languages
                "id" : "header1" //the prevailing HTML element's id
            },
            {
                "type": "text",
                "required": false,
                "label": {"en":"ID Number", "el":"Αρ. Ταυτότητας"},
                "placeholder": "XXXXXX",
                "name": "id", //NAME is important for HTML Inputs to get the values
                "id" : "id",
                "maxlength": 10
            },
            {
                "type": "text",
                "required": false,
                "label": {"en":"Name", "el":"Όνομα"},
                "name": "name",
                "id" : "id"
            },
            {
                "type": "button",
                "label":  {"en":"Next", "el":"Επόμενο"},
                "id":"nextRoutebtn",
                "events" : [//some components such as buttons can have events on them
                // these events are triggered on HTML events. For example with the definition below
                // the event will triger on 'click' of the button and will run all the actions defined.
                    {
                        "on":"click","actions" : [
                            {"action" : "getData","data":""},
                            {"action" : "customScript","data":"birthBenefit/scenarioLoginSubmit.js"}, //custom javascript action. Runs code in js file. File must be located under `data/prototypes/` 
                            {"action" : "nextOnRoute","data":""}
                        ]
                    }
                ]
            }
        ]
    }

```
</details>

### appTemplates.js

This file defines the templates used by the app. Check below a sample structure of the file with comments to help identify what is each element.

<details>
  <summary>code</summary>

```js

DSFTemplates = 
{
    "layouts": {//contains the template HTML to be referenced in the `pages` section
        "3_3" : "<main id='main'></main><form id='components'></form>"
        ,"1_3_sidemenu" : "<div class='row'><main class='col-md-9 order-md-last' id='main'></main>"
            +"<aside class='col-md-3 order-md-first'><nav class='nav flex-column' id='sideMenu'></nav></aside></div>"
    },
    "header" : { //Header HTML for each language. Use the appropriate language code. This is global for all pages
        "en": "<div>Header <form><select id='changeLangSel'><option value='en' selected>English</option><option value='el'>Ελληνικά</option></select></form></div>"
        ,"el" : "<div>Τίτλος <form><select id='changeLangSel'><option value='en'>English</option><option value='el' selected>Ελληνικά</option></select></form></div>"
    },
    "footer" : { //the footer HTML for each language. Use the appropriate language code. This is global for all pages
        "en": "<div>Footer</div>"
        ,"el" : "<div>Φούτερ</div>"
    },
    "componentTemplates" : { //templates of the components. Uses mustache js  
        "button" : "<button type='button' class='btn btn-primary'{{#id}} id='{{id}}'{{/id}}>{{langLabel}}</button>",
        "paragraph" : "<p{{#id}} id='{{id}}'{{/id}}>{{langLabel}}</p>"
    }    
};

```
</details>

-----

## Components

Check out below the list of components you can use in your pages and their JSON text that needs to be added under the `DSFcomponents` in the page definition file.

### Components List
This list contains HTML and GOVCY components.

<details>
  <summary>h1 to h6</summary>
  
Creates an an HTML header element i.e. `<h2>`. Code example: 

```js
,{
    "type": "h2", 
    "id" : "header2", //OPTIONAL, useful if you are adding an event
    "classes": ["govcy-bg-danger","govcy-text-white"], //OPTIONAL add CSS classes to an element
    "content" : {//multilanguage content
        "en" : {"label" : "Header 2"}, //label
        "el" : {"label" : "Τίτλος 2"}
    }
    
}
```
</details>

<details>
  <summary>link</summary>
  
Creates an an HTML anchor element i.e. `<a href={{href}}>`. Code example: 

```js
,{
    "type": "link",
    "href" : "#p/page", //can also be an absolute URL.
    "id" : "link1", //OPTIONAL, useful if you are adding an event
    "classes": ["govcy-bg-danger","govcy-text-white"], //OPTIONAL add CSS classes to an element
    "content" : {//multilanguage content
        "en" : {"label" : "This is a link"}, //label
        "el" : {"label" : "This is a link"}
    }
}
```
</details>

<details>
  <summary>backLink</summary>
  
Creates an an HTML anchor element that redircects back in the browser's hisoty i.e. `<a href='javascript:history.back()'>`. Code example: 

```js
,{
    "type": "backLink",
    "id" : "link1", //OPTIONAL, useful if you are adding an event
    "classes": ["govcy-bg-danger","govcy-text-white"], //OPTIONAL add CSS classes to an element
    "content" : {//multilanguage content
        "en" : {"label" : "Back"}, //label
        "el" : {"label" : "Πίσω"}
    }
}
```
</details>

<details>
  <summary>text</summary>
  
Creates an an HTML text input element and it's label i.e. `<input type='text' ..`. Code example: 

```js
,{
    "type": "text",
    "name": "text1", // NAME is important for HTML Inputs to get the values
    "id" : "text1", //OPTIONAL, useful if you are adding an event
    "classes": ["govcy-bg-danger","govcy-text-white"] //OPTIONAL add CSS classes to an element. Applies to the top div
    "maxlength": 10, // OPTIONAL, defines the maximum length of the input
    "content" : {//multilanguage content
        "en" : {"label" : "Text Box" //label
            "placeholder": "XXXXXX", // the input placeholder
            "hint": "This is a hint", //hint for the entire input
        }, 
        "el" : {"label" : "Πεδίο text" //label
            "placeholder": "XXXXXX", // the input placeholder
            "hint": "This is a hint", //hint for the entire input
        }
    }
}
```
</details>

<details>
  <summary>button</summary>
  
Creates an an HTML button element as defined in GOVCY design system `<button type='button' ..`. Usually buttons are accompabied with click events. Code example: 

```js
,{
    "type": "button",
    "subtype":"primary" //i.e. primary or secondaty 
    "id" : "button1", //OPTIONAL, useful if you are adding an event
    "classes": ["govcy-bg-danger","govcy-text-white"] //OPTIONAL add CSS classes to an element
    "events" : [ //OPTIONAL events that trigger actions
        {
            "on":"click","actions" : [ //on click 
                {"action" : "getData","data":""}, // save data
                {"action" : "link","data":"#p/index"} // redirect to new page
            ]
        }
    ],
    "content" : {//multilanguage content
        "en" : {"label" : "label", //label
            "hint": "This is a hint", //hint for the entire input
        }, 
        "el" : {"label" : "Επιγραφή" //label
            "hint": "This is a hint", //hint for the entire input
        }
    }
}
```

NOTE: [Validations](#validations) and [Events and actions](#events-and-actions) are usually defined in buttons. 

</details>

<details>
  <summary>paragraph</summary>
  
Creates a paragpraph element i.e. `<p>`. Label can only be text. Code example: 

```js
,{
    "type": "paragraph",
    "id" : "p1", //OPTIONAL, useful if you are adding an event
    "classes": ["govcy-bg-danger","govcy-text-white"], //OPTIONAL add CSS classes to an element
    "content" : {//multilanguage content
        "en" : {"label" : "Lorem 13 ipsum dolor sit amet", }, //label
        "el" : {"label" : "Lorem 13 ipsum dolor sit amet"}
    }
}
```
</details>

<details>
  <summary>spanHTML</summary>
  
Creates a span element i.e. `<span>`. Label can be HTML. Code example: 

```js
,{
    "type": "spanHTML",
    "id" : "span1", //OPTIONAL, useful if you are adding an event
    "classes": ["govcy-bg-danger","govcy-text-white"], //OPTIONAL add CSS classes to an element
    "content" : {//multilanguage content
        "en" : {"label" : "<b>Lorem 13 ipsum dolor sit amet</b>", }, //label
        "el" : {"label" : "<b>Lorem 13 ipsum dolor sit amet</b>"}
    }
}
```
</details>

<details>
  <summary>paragraphHTML</summary>
  
Creates a div element i.e. `<div>`. Label can be HTML. Code example: 

```js
,{
    "type": "paragraphHTML",
    "id" : "p1", //OPTIONAL, useful if you are adding an event
    "classes": ["govcy-bg-danger","govcy-text-white"], //OPTIONAL add CSS classes to an element
    "content" : {//multilanguage content
        "en" : {"label" : "<b>Lorem 13 ipsum dolor sit amet</b>", }, //label
        "el" : {"label" : "<b>Lorem 13 ipsum dolor sit amet</b>"}
    }
}
```
</details>

<details>
  <summary>unorderedList</summary>
  
Creates a unordered list element i.e. `<ul>`. Content can be HTML. Code example: 

```js
,{
    "type": "unorderedList",
    "id" : "p1", //OPTIONAL, useful if you are adding an event
    "classes": ["govcy-bg-danger","govcy-text-white"], //OPTIONAL add CSS classes to an element
    "content" : {//multilanguage content
        "en" : {
            "data" :[ // list items 
                "list item 1",
                "list item 2",
                "list item 3"
                ]
            },
        "el" : {
            "data" :[ 
                "list item 1 Ελληνικά",
                "list item 2 Ελληνικά",
                "list item 3 Ελληνικά"
            ]
        }
    }
}
```
</details>

<details>
  <summary>orderedList</summary>
  
Creates a ordered list element i.e. `<ol>`. Content can be HTML. Code example: 

```js
,{
    "type": "orderedList",
    "id" : "p1", //OPTIONAL, useful if you are adding an event
    "classes": ["govcy-bg-danger","govcy-text-white"], //OPTIONAL add CSS classes to an element
    "content" : {//multilanguage content
        "en" : {
            "data" :[ // list items 
                "list item 1",
                "list item 2",
                "list item 3"
                ]
            },
        "el" : {
            "data" :[ 
                "list item 1 Ελληνικά",
                "list item 2 Ελληνικά",
                "list item 3 Ελληνικά"
            ]
        }
    }
}
```
</details>

<details>
  <summary>table</summary>
  
Creates a table element i.e. `<table>`. Data my contain HTML. Code example: 

```js
,{
    "type": "table", 
    "classes": ["govcy-bg-danger","govcy-text-white"], //OPTIONAL add CSS classes to an element,
    "content" : {//multilanguage content
        "en" : {"label" : "Table", //label
                "head": ["#","Date","Data"], // the headings of the table
                "data" :  //the data of the table. Each row is a different array
                [
                    ["1","2021-12-01","Lorem ipsum dolor sit amet, consectetur adipiscing elit. "],
                    ["2","2021-12-21","In hendrerit nisl quis facilisis dapibus. Fusce pulvinar metus in nunc placerat tincidunt. "],
                    ["3","2021-12-31","Ut lacus diam, tempus molestie laoreet ut, lobortis vitae mi."]
                ]
            },
        "el" : {"label" : "Πίνακας",
            "head": ["#","Ημερομηνία","Δεδομένα"],
            "data" : 
            [
                ["1","2021-12-01","Ελληνικά Lorem ipsum dolor sit amet, consectetur adipiscing elit. "],
                ["2","2021-12-21","Ελληνικά In hendrerit nisl quis facilisis dapibus. Fusce pulvinar metus in nunc placerat tincidunt. "],
                ["3","2021-12-31","Ελληνικά Ut lacus diam, tempus molestie laoreet ut, lobortis vitae mi."]
            ]
        }
    }
}
```
</details>

<details>
  <summary>checkboxes</summary>
  
Creates checkboxes elements i.e. `<input name='{{name}}' type='checkbox'`. 

```js
,{
    "type": "checkboxes",
    "name": "checkboxes1",// NAME is important for HTML Inputs to get the values
    "id" : "checkboxes1", //OPTIONAL, useful if you are adding an event
    "classes": ["govcy-bg-danger","govcy-text-white"], //OPTIONAL add CSS classes to an element. Applies to the top div
    "content" : {//multilanguage content
        "en" : {"label" : "Checkboxes", //label
                "hint" : "This is a hint on top check", //hint for the entire input
                "options": [ //the data. Each checkbox must have {"option_id": "chbox1","option_value":"1", "option_label":"Check 1", "option_checked":true},
                    {"option_id": "chbox1","option_value":"check 1", "option_label":"Check 1", "option_checked":true}, //use `option_checked`:true if this option is checked 
                    {"option_hint":"This is a hint","option_id": "chbox2","option_value":"check 2", "option_label":"Check 2", "option_checked":false}, //use `option_hint` to add a hint for this option
                    {"option_hint":"This is a hint","option_id": "chbox3","option_value":"check 3", "option_label":"Check 3", "option_checked":false}//dont't add an `option_hint` i the option has no hint  
                ]
            },
        "el" : {"label" : "Επιλογές Checkbox",
            "hint" : "Αυτό είναι ένα hint on top check",
            "options": [
                {"option_id": "chbox1","option_value":"check 1", "option_label":"Επιλογή 1", "option_checked":true},
                {"option_hint":"Αυτό είναι ένα hint","option_id": "chbox2","option_value":"check 2", "option_label":"Επιλογή 2", "option_checked":false},
                {"option_hint":"Αυτό είναι ένα hint","option_id": "chbox3","option_value":"check 3", "option_label":"Επιλογή 3", "option_checked":false}
            ]
        }
    }
}
```
</details>

<details>
  <summary>radio</summary>
  
Creates radio elements i.e. `<input name='{{name}}' type='radio'`. 

```js
,{
    "type": "radio",
    "name": "radio1",// NAME is important for HTML Inputs to get the values
    "id" : "radio1", //OPTIONAL, useful if you are adding an event
    "classes": ["govcy-bg-danger","govcy-text-white"], //OPTIONAL add CSS classes to an element. Applies to the top div
    "content" : { //multilanguage content
        "en" : {"label" : "Radio Buttons", //label
                "hint" : "This is a hint on top check", //hint for the entire input
                "options": [//the data. Each checkbox must have {"option_id": "chbox1","option_value":"1", "option_label":"Check 1", "option_checked":true},
                    {"option_id": "chbox1","option_value":"check 1", "option_label":"Check 1", "option_checked":true},//use `option_checked`:true if this option is checked 
                    {"option_hint":"This is a hint","option_id": "chbox2","option_value":"check 2", "option_label":"Check 2", "option_checked":false},//use `option_hint` to add a hint for this option
                    {"option_hint":"This is a hint","option_id": "chbox3","option_value":"check 3", "option_label":"Check 3", "option_checked":false}//dont't add an `option_hint` i the option has no hint  
                ]
            },
        "el" : {"label" : "Επιλογές Radio Buttons",
            "hint" : "Αυτό είναι ένα hint on top check",
            "options": [
                {"option_id": "chbox1","option_value":"check 1", "option_label":"Επιλογή 1", "option_checked":true},
                {"option_hint":"Αυτό είναι ένα hint","option_id": "chbox2","option_value":"check 2", "option_label":"Επιλογή 2", "option_checked":false},
                {"option_hint":"Αυτό είναι ένα hint","option_id": "chbox3","option_value":"check 3", "option_label":"Επιλογή 3", "option_checked":false}
            ]
        }
    }
}
```
</details>

<details>
  <summary>file</summary>
  
Creates file elements i.e. `<input name='{{name}}' type='file'`. 

```js
,{
    "type": "file",
    "label": {"en":"Upload", "el":"Ανέβασμα"}, 
    "name": "file", // NAME is important for HTML Inputs to get the values
    "id" : "file", //OPTIONAL, useful if you are adding an event
    "classes": ["govcy-bg-danger","govcy-text-white"], //OPTIONAL add CSS classes to an element. Applies to the top div
    "content" : { //multilanguage content
        "en" : {"label" : "Upload"},//label
        "el" : {"label" : "Ανέβασμα"}
    }
}
```
</details>

<details>
  <summary>alertSuccess</summary>
  
Creates a success alert GOVCY component. 

```js

,{
    "type": "alertSuccess",
    "classes": ["govcy-bg-danger","govcy-text-white"], //OPTIONAL add CSS classes to an element. Applies to the top div. 
    "content" : { //multilanguage content
        "en" : {"label" : "Success", //label displayed in alert head
            "data" : //array of lines in the body of the  alert
            [
                "Success: AIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
                ,"Contact <a href='mailto:support@gov.cy'>support@gov.cy</a> if you think your application has a problem"
            ]
        },
        "el" : {"label" : "Επιτυχία",
            "data" : 
            [
                "Επιτυχία: Η τεχνητή νοημοσύνη είναι ένα από καιρό καθιερωμένο γεγονός ότι ο αναγνώστης αποσπάται από το αναγνώσιμο περιεχόμενο μιας σελίδας όταν κοιτάζει τη διάταξή της."
                ,"Επικοινωνήστε με το <a href='mailto:support@gov.cy'>support@gov.cy</a> εάν πιστεύετε ότι η αίτησή σας έχει πρόβλημα" 
            ]
        }
    }
}
```
</details>

<details>
  <summary>alertImportant</summary>
  
Creates a important alert GOVCY component. 

```js

,{
    "type": "alertImportant",
    "classes": ["govcy-bg-danger","govcy-text-white"], //OPTIONAL add CSS classes to an element. Applies to the top div. 
    "content" : { //multilanguage content
    "en" : {"label" : "Important",//label displayed in alert head
        "data" : //array of lines in the body of the alert. Can be HTML
        [
            "Success: AIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
            ,"<a href='#'>View your application</a>"
        ]
    },
    "el" : {"label" : "Συμαντικό",
        "data" : 
        [
            "Επιτυχία: Η τεχνητή νοημοσύνη είναι ένα από καιρό καθιερωμένο γεγονός ότι ο αναγνώστης αποσπάται από το αναγνώσιμο περιεχόμενο μιας σελίδας όταν κοιτάζει τη διάταξή της."
            ,"<a href='#'>Προβολή της αίτησής σας</a>" 
        ]
    }
}
```
</details>

<details>
  <summary>alertError</summary>
  
Creates a error alert GOVCY component. 

```js

,{
    "type": "alertError",
    "classes": ["govcy-bg-danger","govcy-text-white"], //OPTIONAL add CSS classes to an element. Applies to the top div. 
    "content" : { //multilanguage content
        "en" : {"label" : "There is a problem",//label displayed in alert head
            "data" : //array of lines in the body of the alert. Will be disaplayed as links. Can be HTML
            [
                "Enter your fullname",
                "Second Error"
            ]
        },
        "el" : {"label" : "Υπάρχει ένα πρόβλημα",
            "data" : 
            [
                "Εισαγάγετε το όνομά σας",
                "Δεύτερο λάθος"
            ]
        }
    }
}
```
</details>

<details>
  <summary>successPanel</summary>
  
Creates a success panel GOVCY component. 

```js
,{
    "type": "successPanel",
    "classes": ["govcy-bg-danger","govcy-text-white"], //OPTIONAL add CSS classes to an element. Applies to the top div. 
    "content" : { //multilanguage content
        "en" : {
            "head" : "Your application has been completed", // the head of the success panel
            "label" : "The application reference number is:<b>191292</b>" // the body of the success panel
        },
        "el" : {
            "head" : "Η αίτηση έχει ολοκληρωθεί",
            "label" : "Ο αριθμός αναφοράς σας είναι ο εξής:<b>191292a</b>"
        }
    }
}
```
</details>

<details>
  <summary>warning</summary>
  
Creates a warning GOVCY component. 

```js
,{
    "type": "warning",
    "classes": ["govcy-bg-danger","govcy-text-white"], //OPTIONAL add CSS classes to an element. Applies to the top div. 
    "content" : { //multilanguage content
        "en" : {
            "label" : "Warning message here." // the body of the warning
        },
        "el" : {
            "label" : "προειδοποιητικό μήνυμα."
        }
    }
}
```
</details>

### Containers List
This list contains GOVCY containers such as `contaner` `container-fluid` `row` and `col`. It consists of **open** and **close** elements. ALWAYS REMEMBER to close a contaner, otherwise the rendered HTML will be invalid. 

<details>
  <summary>divEmpty</summary>
  
Creates an empty `<div>`.

```js
,{
    "type": "divEmpty",
    "id" : "div1", //OPTIONAL, useful if you are adding an event
    "classes": ["govcy-mx-2"], //OPTIONAL add CSS classes to an element. Applies to the top div. 
}
```
</details>

<details>
  <summary>fieldsetOpen</summary>
  
Opens a GOVCY `<fieldset>`.

```js
,{
    "type": "fieldsetOpen",
    "id" : "fieldset1", //OPTIONAL, useful if you are adding an event
    "classes": ["govcy-mx-2"], //OPTIONAL add CSS classes to an element. Applies to the top div. 
    "content" : { //multilanguage content
        "en" : {"legend" : "Contact Address"}, //The fieldset legend html
        "el" : {"legend" : "Στοιχεία Επικοινωνίας"}
    }
}
```
</details>

<details>
  <summary>fieldsetClose</summary>
  
Closes any `<fieldset>` elements. It is very important to close all fieldsets that you have previously opened. 

```js
,{
    "type": "fieldsetClose"
}
```
</details>

<details>
  <summary>divContainerOpen</summary>
  
Opens a GOVCY container div.

```js
,{
    "type": "divContainerOpen",
    "id" : "container", //OPTIONAL, useful if you are adding an event
    "classes": ["govcy-mx-2"] //OPTIONAL add CSS classes to an element. Applies to the top div. 
}
```
</details>

<details>
  <summary>divContainerFluidOpen</summary>
  
Opens a GOVCY container fluid div.

```js
,{
    "type": "divContainerFluidOpen",
    "id" : "containerOpen", //OPTIONAL, useful if you are adding an event
    "classes": ["govcy-mx-2"] //OPTIONAL add CSS classes to an element. Applies to the top div. 
}
```
</details>

<details>
  <summary>divRowOpen</summary>
  
Opens a GOVCY row div.

```js
,{
    "type": "divRowOpen",
    "id" : "rowOpen", //OPTIONAL, useful if you are adding an event
    "classes": ["govcy-mx-2"] //OPTIONAL add CSS classes to an element. Applies to the top div. 
}
```
</details>

<details>
  <summary>divColumnOpen</summary>
  
Opens a GOVCY col div.

```js
,{
    "type": "divColumnOpen",
    "colnum": "5", // the number of columns, i.e. will get a class `govcy-col-5`
    "id" : "colOpen", //OPTIONAL, useful if you are adding an event
    "classes": ["govcy-mx-2"] //OPTIONAL add CSS classes to an element. Applies to the top div. 
}
```
</details>

<details>
  <summary>divClose</summary>
  
Closes any div. It is very important to close all divs that you have previously opened. 

```js
,{
    "type": "divClose"
}
```
</details>

-----

## Events and actions

You can register `events` on HTML objects and trigger predefined or custom `actions`. This feature uses the HTML element events (i.e. the "onclick" of a button). We uses the jquery `on` function https://api.jquery.com/on/ . 

To register an event a component must have a unique id attribute, so make sure you have an `id` defined. 

An event can have multiple actions. For example when a user clicks on button, you can save data from a from on the browser's `sessionStorage` and then redirect to the next page of the route. This example can be achived by adding the following component on the page `DSFcomponents` :

```js
{
    "type": "button",
    "label":  {"en":"Next", "el":"Επόμενο"},
    "id":"nextRoutebtn",
    "events" : 
        {
            "on":"click","actions" : [
                {"action" : "getData","data":""},
                {"action" : "nextOnRoute","data":""}
            ]
        }
    ]
}
```

### Predefined actions list

This list contains the predefined actions you can use.

<details>
  <summary>validate</summary>
  
perfoms the defined validations. See more in [Validations](#validations) section.

```js
,{
    {"action" : "validate","data":""},
}
```
</details>

<details>
  <summary>alert</summary>
  
Simply alerts the message in the `data`. Code example:

```js
,{
    {"action" : "alert","data":"This is a test alert."},
}
```
</details>

<details>
  <summary>link</summary>
  
Redirects to the page defined in `data` (can be relative or absolute URL). Code example:

```js
,{
    {"link" : "alert","data":"#p/cheatsheet"},
}
```
</details>

<details>
  <summary>getData</summary>
  
Gets all input by the user on the form elements defined in the components and saves them in the browser's `sessionStorage`. Code example:

```js
,{
    {"link" : "getData","data":""},
}
```
</details>

<details>
  <summary>nextOnRoute</summary>
  
Redirects to the next page of the route. For example if you are at page `#r/scenario2/1` this action will redirect you to `#r/scenario2/2`. Code example:

```js
,{
    {"link" : "nextOnRoute","data":""},
}
```
</details>

<details>
  <summary>previousOnRoute</summary>
  
Redirects to the previous page of the route. For example if you are at page `#r/scenario2/1` this action will redirect you to `#r/scenario2/0`. Code example:

```js
,{
    {"link" : "previousOnRoute","data":""},
}
```
</details>


### Custom actions
You can also define *custom actions* using the `customScript` action. This action will load the js file under `data/prototypes/{{data}}`. You can pretty much do anything you want with this feature, like access any element in form, input values or use the `sessionStorage` to access previously saved values. 

The example below saves the data from a from on the browser's `sessionStorage` and then runs the custom script file `data/prototypes/birthBenefit/scenarioLoginSubmit.js`. If the custom script does not force to stop the next actions, it will then redirect to the next page of the route. 

```js
{
    "type": "button",
    "label":  {"en":"Next", "el":"Επόμενο"},
    "id":"nextRoutebtn",
    "events" : [//some components such as buttons can have events on them
    // these events are triggered on HTML events. For example with the definition below
    // the event will triger on 'click' of the button and will run all the actions defined.
        {
            "on":"click","actions" : [
                {"action" : "getData","data":""},
                {"action" : "customScript","data":"birthBenefit/scenarioLoginSubmit.js"}, //custom javascript action. Runs code in js file. File must be located under `data/prototypes/` 
                {"action" : "nextOnRoute","data":""}
            ]
        }
    ]
}
```

To force stop the next actions defined in an event from a custom script you simply need to set this in your code `appModel.stopScripts = true;`. Using the previous example and with the contents of the `data/prototypes/birthBenefit/scenarioLoginSubmit.js` file below, if user is not 'elena' the user is redirected to the 'badlogin' page and the rest of the actions are not triggered.

```js
//check if the user is 'elena'
if ((sessionStorage["id"]) != "elena") {
    //if not then we consider it to be a bad login so redirect to badlogin page
    window.location="#p/birthBenefit/badLogin";
    //use this to stop all other events
    appModel.stopScripts = true;  
} 
```

-----

## Validations

Validations are defined on the element that calls the action, most likely a `button`. If validation fails the next actions will not be executed and error messages should apperar on the screen. 

Note that validations can be performed on `text`, `password`, `radio` and `checkboxes` components only, unless a custom validation is defined. 

The following elements must be defined as shown in the example below `validationsSummary`, `validations` and under content for each laguage `validationSummaryTitle` and `validationsLabels`.

```js 

,{
    "type": "button",
    "subtype": "primary",
    "id":"nextbtn",
    "events" : [
        {
            "on":"click","actions" : [
                {"action" : "validate","data":""},
                {"action" : "getData","data":""},
                {"action" : "goBack","data":""}
            ]
        }
    ],
    "validationsSummary" :"alerts", //the id of the alert that shows the summary of the errors
    "validations" : [ // all validations that must be performed
        {"validation" : "required", //validation type
            "elementName":"Bank", //the input name the validation will run
            "elementId":"Bank",  // the id of the div that contains the input
            "elementType":"text" // the element type (as defined in components)
        },
        {"validation" : "required", "elementName":"IBAN","elementId":"IBAN", "elementType":"text"} // second validation
    ],
    "content" : {
        "en" : {
            "label" : "Next",
            "validationSummaryTitle" : "There is a problem", //The title that will appear in the alert that shows the summary of the errors 
            "validationsLabels" : {
                "required.Bank" : "Please enter the Bank Name.", //The message for the validation. The key here must be 'validationType.elementId'
                "required.IBAN" : "Please enter the ΙΒΑΝ." // second message for validation
            }
        },
        "el" : {
            "label" : "Επόμενο",
            "validationSummaryTitle" : "Υπάρχει ένα πρόβλημα",
            "validationsLabels" : {
                "required.Bank" : "Παρακαλώ περάστε το όνομα της Τράπεζας.",
                "required.IBAN" : "Παρακαλώ περάστε το ΙΒΑΝ."
            }
        }
    }
}

```

To show the validations summary alert, make sure to include in the page a `<div>` component with the same `id` as defined in `validationsSummary`. For example:

```js 
"components" : [
    {
        "type": "backLink",
        "content" : {
            "en" : {"label" : "Back"},
            "el" : {"label" : "Πίσω"}
        }
    }
    ,{
        "type": "divEmpty", //empty div component
        "id" : "alerts" //same id as in `validationsSummary` 
    }
    ...

```

### Validation Types

The following validation types can be defined:

<details>
  <summary>required</summary>
  
Checks if a value was entered for this element. See below a sample definition of this under the `validations` of the component that calls the validation.

```js
"validations" : [ // all validations that must be performed
        {"validation" : "required", //validation type
            "elementName":"Bank", //the input name the validation will run
            "elementId":"Bank",  // the id of the div that contains the input
            "elementType":"text" // the element type (as defined in components)
        }
```
</details>

<details>
  <summary>is.</summary>
  
Use functions from the [is.js](https://is.js.org/) library to validate the value of the input defined by `elementName`. To use this define the validation starting with `is.` as defined in the library.

See below a sample definition of this under the `validations` of the component that calls the validation.

```js

"validations" : [ // all validations that must be performed
        {"validation" : "is.email", //validation type as defined in is.js library
            "elementName":"emailAddress", //the input name the validation will run
            "elementId":"emailAddressIn", // the id of the div that contains the input
            "elementType":"text"// the element type (as defined in components)
        }

```
</details>

<details>
  <summary>custom</summary>
  
Runs a custom function which **must** return `true` or `false`. 

You can do this to make complex validations, such as checking for combination of values. For example:

```js 

/**
 * This function checks if the `custom` radio has been checked and the `emailAddress` text field is empty 
 */
function checkEmail(){
    if ((document.forms["components"]["emailRadio"].value == "custom") 
        && document.forms["components"]["emailAddress"].value =="") return false;
    else return true;
}

```

The definition of this function can be done under the `preScript` or `postScript` of the [page element](#dataprototypesidjson).

See below a sample definition of this under the `validations` of the component that calls the validation.

```js
"validations" : [ // all validations that must be performed
        {"validation" : "custom", //validation type
            "elementName":"emailAddress", //the input name the validation will run
            "elementId":"emailAddressIn",  // the id of the div that contains the input
            "elementType":"text", // the element type (as defined in components)
            "functionName": "checkEmail" // name of the custom function to be run
        }
```

</details>

------


## More How Tos

### How to add a component definition?

Update the `js/appTemplates.js` file and add the template (in mustache js format) under the `componentTemplates`. More details and examples in the [appTemplates.js](#apptemplatesjs) section.

## Todo

- ~~Explain events and actions more~~
- ~~Explain routes~~
- ~~Add custom actions (custom js file)~~
- ~~Explain how to use data in custom actions~~
- Add more components
- ~~Add validations~~
- ~~Explain how to add components in a page~~
- ~~Add custom validations (load js file  )~~
- ~~Add more validation types~~
- Explain more advanced custom actions
    - Handle login data
    - Render stuff on screen based on session variables

Good to have 

- multilanguage data, head
- use of page data connected with session (load with mustache)