# dsf-prototype
Gov.cy DSF prototype tool. Use this tool to create pages using the styling and the components of the GOV.CY DSF team and routes to link them together. 

This is the readme for the dsf-prototype repository. 
Demo: https://gov-cy.github.io/dsf-prototype

## Creating pages and routes

Evrything resides in the `docs` folder and is controlled by the `data\pages.json` where the *site options* and all *pages* are listed. *Routes* are also defined here. 

For each page listed in the pages.json a `data\prototypes\{{id}}.json` file must exist with the definition of the page. The system uses templates defined in the `js\appTemplates.js` file. 

### pages.json

Check below a sample structure of the file with comments to help identify what is each element

```json
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
            "id":"index" //page id
        }
        ,"service1/start":{ "id":"service1/start"}
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

### data/prototypes/{{id}}.json

This file defines the page configuration and it's components. Note that the `{{id}}` must be the same as defined in the pages.json file. Also you can define in a subdirectory, i.e. if the {{id}} defined in the pages.json is `service1/page1` the corresponding page definition file must be `prototypes/service1/page1`.

```json

{ 
    "id":"service1/page1", //page id
    "menus" : ["general"], //the menus of the page. Empty array if non 
    "layout" : "Max-width", // template reference
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
                            {"action" : "nextOnRoute","data":"#p/page2"}
                        ]
                    }
                ]
            }
        ]
    }

```

### appTemplates.js

This file defines the templates used by the app. Check below a sample structure of the file with comments to help identify what is each element.

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

### How to add a page?

1. Update `pages.json` file with details under `pages`.
2. Create a `data/prototypes/{{id}}.json` file with wheer `{{id}}` must be the same as defined in pages.json.
3. If you need to add it to a menu, make sure to update the appropriate entry in the `menus` as needed. 

### How to add a component?

Update the `js/appTemplates.js` file and add the template (in mustache js format) under the `componentTemplates`.

## URL rules

- All pages can be rendered using the prefix `#p/` and their `id` as defined in `pages.json`. i.e:
  - `#p/index`
  - `#p/service1/start`
- All route steps can be rendered using the prefix `#r/` their `id/` as defined in `pages.json` and the `array index number` for the specific step. Note that array index starts with 0.
  - `#r/scenario1/0`  
  - `#r/scenario2/1`

URLs are relative.

## Todo

- Explain events and actions more
- Explain routes
- multilanguage data, head
- use of page data connected with session (load with mustache)
- Add custom actions (custom js file)
- Explain how to use data in custom actions
- Add more components
- Add validations