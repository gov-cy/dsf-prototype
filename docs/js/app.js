
var DSFStopScripts = false;
/**
 * On window load
 */
 $(window).on('load', function() { 

  //dissable cache on ajax
  $.ajaxSetup({ cache: false });
  
  //get data from json
  $.getJSON( "data/pages.json", function( data ) {
      //set data to model
      appModel.siteOptions = data;
      //language code
      if ((!localStorage.DDSlanguageCode) || (localStorage.DDSlanguageCode == 'undefined')) {
          localStorage.DDSlanguageCode = "en";
      }
      //initialize router
      appController.init();    
  });

});


/**
* Controller class
*/
var appController = {
  /**
   * Initializes the router
   */
  init : function() {
      //use sammy for hashed urls
      Sammy(function () {
          var app = this;
          //-------------#home----------------------------
          this.get('#home', function () {
            appController.getPageDataAndRoute('#home',appModel.siteOptions.defaultPage);
            //REFACTORING: here
            //appView.renderPage(appModel.siteOptions.defaultPage);
          });
          //------------#edit/Pages---------------------------
          $.each(appModel.siteOptions["pages"], function (i, route_args) {
              app.get('#edit/' + route_args.id, function () {
                  //REFACTORING: here //appView.renderPage(route_args.id,"",0,true);
                  appController.getPageDataAndRoute('#edit',route_args.id,"",0,true);
              });
          });
          //------------#p/Pages---------------------------
          $.each(appModel.siteOptions["pages"], function (i, route_args) {
              app.get('#p/' + route_args.id, function () {
                  //REFACTORING: here//appView.renderPage(route_args.id);
                  appController.getPageDataAndRoute('#p',route_args.id);
              });
          });
          //------------#r/:routeId/:routeNo---------------------------
          this.get('#r/:routeId/:routeNo', function () {
            //REFACTORING: here// appView.renderPage(appModel.siteOptions.routes[this.params['routeId']][this.params['routeNo']]
            //     ,this.params['routeId'], this.params['routeNo']);
            appController.getPageDataAndRoute('#r',appModel.siteOptions.routes[this.params['routeId']][this.params['routeNo']]
            ,this.params['routeId'], this.params['routeNo']);
          });
          //-------------/----------------------------
          //default
          this.get('', function () { this.app.runRoute('get', '#home') });
      }).run();
  },
  /**
   * Gets the page data and manages the routing 
   * 
   * @param {string} route the route
   * @param {string} pageId the id of the page to be rendered
   * @param {string} routeId The id of the route 
   * @param {int} routeNo The number of the route 
   */
  getPageDataAndRoute:function(route,pageId,routeId,routeNo) {

    //get data from json
    $.getJSON( "data/prototypes/"+pageId+".json", function( data ) {
        switch (route) {
            case "#home":
                appView.renderPage(pageId,data,appModel.siteOptions);
                break;
            case "#edit":
                appView.renderPage(pageId,data,appModel.siteOptions,"",0,true);
                break;
            case "#p":
                appView.renderPage(pageId,data,appModel.siteOptions);
                break;
            case "#r":
                appView.renderPage(pageId,data,appModel.siteOptions,routeId,routeNo);
                break;
        }
    });
  }
}

/**
* The model class
*/
var appModel = {
  /** The site options object as loaded from the server */
  siteOptions: null,
  /** The current submit id */
  currentSubmitId : null,
  /** The current route */
  currentRoute: null,
  /** The count of the fetch requests */
  fetchCount : 0
  
};

/**
* The view class
**/

var appView = {
    /** The DOM Id of the header */
    headerDOMId: "headerContainer",
    /** The DOM Id of the footer */
    footerDOMId: "footerContainer",
    /** The DOM Id of the mainContainer */
    mainContainerDOMId: "mainContainer",
    /** The DOM Id of the sideMenu */
    sideMenuDOMId: "sideMenu",
    /** The DOM Id of the before-main */
    beforeMainDOMId: "before-main",
    /** The DOM Id of the backLink */
    backLinkDOMId: "backLink",
    /** The DOM Id of the beforeMainContainerUsername */
    beforeMainContainerUsernameDOMId: "beforeMainContainerUsername",
    /** The DOM Id of the main */
    mainDOMId: "main",
    /** The current pages form id */
    currentPageId : null,
    /** The current form object */
    currentFormObj : null,
    /** The DSF Components HTML */
    DSFComponentsHTML : null,
  /**
   * Render site stuff like menus header and footer
   **/
  renderSiteStuff : function(DSFPage,site){
      //render header footer
      if (DSFTemplates.header) $('#'+this.headerDOMId).html(DSFTemplates.header[localStorage.DDSlanguageCode]);
      if (DSFTemplates.footer) $('#'+this.footerDOMId).html(DSFTemplates.footer[localStorage.DDSlanguageCode]);
      //render layouts
      $('#'+this.mainContainerDOMId).html(DSFTemplates.layouts[DSFPage.layout]);
      //render back link
      if (DSFPage.hasBack) { 
        var content = {};
        //prepare based on commonContent
        for (const key in site.commonContent.back) {
            content[key] =  {"label" : site.commonContent.back[key] };
        }
        //prepare user data object 
        var backLinkData = {
            "type": "backLink",
            "content" : content
        };
        //take care of multilanguage hasle 
        appView.prepareMultiLanguage(backLinkData);
                        
        //render using mustache
        var userDataContent = Mustache.render
        (DSFTemplates.componentTemplates[backLinkData.type]
            , backLinkData);

        //render on page
        $("#"+this.backLinkDOMId).html(userDataContent);
      }
      
      //render menus
      for (var i = 0; i < DSFPage.menus.length; i++) {
        appView.showMenu(site.menus[DSFPage.menus[i]]);
      }
  },
  /**
   * Clears the screen
   **/
  clearScreen: function() {
      $('#'+this.mainContainerDOMId).html("");
      $('#'+this.headerDOMId).html("");
      $('#'+this.footerDOMId).html("");
      $('#'+this.sideMenuDOMId).html("");
      $('#'+this.beforeMainDOMId).html("");
      $('#'+this.backLinkDOMId).html("");
      $('#'+this.beforeMainContainerUsernameDOMId).html("&nbsp");
      $('#'+this.mainDOMId).html("");
  },
  /**
   * Creates a `langConent` with the language selected content data and `editMode`. 
   * 
   * @param {*} obj the component data object
   * @param {boolean} editMode Indicates whether this is in edit mode. Default value `false`
   */
  prepareMultiLanguage (obj,editMode) {
    //if content exits in object
    if (obj.content){
        //if content exist in specific language
        if (obj.content[localStorage.DDSlanguageCode]) {
            // set obj.langContent to specific language
            obj.langConent = obj.content[localStorage.DDSlanguageCode];
        } else {
            obj.langConent = obj.content[DSFTemplates.defaultLang];
        }
        //set edit mode
            obj.editMode = editMode;
    }
  },
  /**
   * Renders the page 
   * 
   * @param {string} pageId the id of the page to be rendered
   * @param {object} data the page data
   * @param {object} site The site data
   * @param {string} routeId The id of the route 
   * @param {int} routeNo The number of the route 
   * @param {boolean} editMode Indicates whether this is in edit mode. Default value `false`
   */
  renderPage:function(pageId,data,site,routeId,routeNo,editMode) {
      //default parameters
      routeId = typeof routeId !== 'undefined' ? routeId : "";
      routeNo = typeof routeNo !== 'undefined' ? routeNo : 0;
      editMode = typeof editMode !== 'undefined' ? editMode : false;
      //set current values
      appView.currentPageId = pageId;
      //clear DSFComponents HTML
      appView.DSFComponentsHTML = "";
      //clear everything
      appView.clearScreen();      
      
      //------ DSF Components START------------------

        //get data from json
        if (data) {
        //REFACTORING: here
        //$.getJSON( "data/prototypes/"+pageId+".json", function( data ) {
            //deep copy current page data to model
            appView.currentFormObj = JSON.parse(JSON.stringify(data));
            
            //render site stuff
            appView.renderSiteStuff(data,site);

            var DSFComponents = "";
            var DSFEvents = [];
            //Render components
            if (data.DSFcomponents) {
                //register scipt 
                DSFStopScripts = false;
                if (data.preScript) {
                    
                    $.ajax({
                        async: false,
                        type:"GET",
                        url: "data/prototypes/"+data.preScript,
                        dataType: "script"
                    });
                }
                if (DSFStopScripts) {return null;}
                //for all components
                for (var i = 0; i < data.DSFcomponents.components.length; i++) {
                    
                    //take care of multilanguage hasle and edit mode
                    appView.prepareMultiLanguage(data.DSFcomponents.components[i],editMode);
                    // render in mustache
                    var componentHTML = Mustache.render
                    (DSFTemplates.componentTemplates[data.DSFcomponents.components[i].type]
                        , data.DSFcomponents.components[i]);

                    //if there is a DOMId object then append that area
                    if (data.DSFcomponents.components[i].DOMId) {
                        $("#"+data.DSFcomponents.components[i].DOMId).append(componentHTML);
                    }else {
                        //render using mustache
                        DSFComponents += componentHTML
                    }

                    
                    
                    //register events in array
                    if (data.DSFcomponents.components[i].events) {
                        DSFEvents.push(data.DSFcomponents.components[i]);
                    }
                    
                }

                appView.DSFComponentsHTML = DSFComponents;
                //render on page
                $("#"+data.DSFcomponents.DOMId).html(DSFComponents);

                //attach events
                for (var i = 0; i < DSFEvents.length; i++) {
                    appView.attachEvents(DSFEvents[i],routeId,routeNo);
                }
                
                //register script 
                if (data.postScript) {
                    $.getScript("data/prototypes/"+data.postScript);
                }
                //styles
                for (var key in data.styles){
                    $(key).attr('style',data.styles[key]);
                }

                //if editMode ---------------------------
                if (editMode) {
                    //create editable list
                    appEditor.enableSortComponents(data.DSFcomponents.DOMId);
                    //append page JSON on screen
                    appEditor.createPageJSONDisplay(data.DSFcomponents.DOMId);
                    //render and highlight
                    appEditor.renderPageJSON(appView.currentFormObj);
                    //render the HTML code
                    appEditor.renderPageHTMLCode(appView.DSFComponentsHTML);

                    // var x="<div class='row'><article class='col-md-9 order-md-last' id='main'><form id='components' class='govcy-form'></form></article>";
                    // var xHTML = $.parseHTML(x);
                    
                    // alert($(xHTML).html());
                    // $(xHTML).find("#main").html("sss");
                    // alert($(xHTML).html());
                }
                //END if editMode ---------------------------
            }

            //page bindings
            appView.globalBindings(appView.currentFormObj, site, routeId,routeNo,editMode);
        //REFACTORING: here
        //});
        }
      //------ DSF Components END------------------
      
      //highlight hack to display html highlighter
      document.querySelectorAll("code").forEach(function(element) {
          element.innerHTML = element.innerHTML.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
      });
  },
  /**
   * Render Markdown content 
   * @param {string} MDFile markdown content file
   * @param {string} MDDOMId DOM element id to render markdown
   */
  renderMarkDownContent: function (MDFile, MDDOMId){
    //Markdown with Pagedown		
    // create a pagedown converter - regular and sanitized versions are both supported
    //var converter = new Markdown.getSanitizingConverter();
    var converter = new Markdown.Converter();
    // tell the converter to use Markdown Extra
    Markdown.Extra.init(converter, {highlighter: "highlight"});
        
    //get markdown .MD
    $.get(MDFile, function(textData, status) { 
        //render markdown
        $("#"+MDDOMId).html(converter.makeHtml(textData ));
        
        hljs.highlightAll(); 
    });    
  },
  /**
   * Show the  menu according to the data 
   * @param {*} menuObj the menu object 
   * @param {*} menuElementId the DOM element id to render the menu
   */
  showMenu: function  (menuObj,menuElementId) {
      var menuItems=menuObj.items;
      var menuElementId = menuObj.DOMId;
      var mainNavItems ="";
      $.each( menuItems, function( index, value ){
          var classHTML = (value.id==appView.currentPageId?'class="nav-link active" aria-current="page"':'class="nav-link"')
          mainNavItems += '<li class="nav-item"><a '+classHTML+' href="'+value.url+'">'+value.label[localStorage.DDSlanguageCode]+'</a></li>';
          });
      $('#'+menuElementId).html(mainNavItems);
  }, 
  /**
   * Handles global bindings such as change language
   * 
   * @param {object} data the page data
   * @param {object} site the site data
   * @param {string} routeId The id of the route 
   * @param {int} routeNo The number of the route 
   * @param {boolean} editMode Indicates whether this is in edit mode. Default value `false`
   */
  globalBindings:function(data, site, routeId,routeNo,editMode) {
      //bindings change language
      $('#changeLangSel').on('change', function() {
          //change language id
          localStorage.DDSlanguageCode = this.value;
          // re render 
          appView.renderPage(appView.currentPageId,data, site, routeId,routeNo,editMode);
      });
  }, 
  /**
   * Attaches events on the component that the page listens to. 
   * Uses the component.id to to and jquery $("").on funtion 
   * 
   * @param {object} DSFComponent The component object 
   * @param {string} routeId The id of the route 
   * @param {int} routeNo The number of the route 
   */
  attachEvents: function (DSFComponent,routeId,routeNo ){
    if (DSFComponent.id){
        //for all events
        for (var i = 0; i < DSFComponent.events.length; i++) {
            //attach events
            $( "#"+DSFComponent.id ).on( 
                DSFComponent.events[i].on,
                    {"actions":DSFComponent.events[i].actions
                    ,"routeId":routeId
                    ,"routeNo":routeNo
                    ,"component": DSFComponent}, 
                appView.runActions );
        }
    }    
  },
  /**
   * Runs the actions defined on events of a component
   * 
   * @param {array} actions the actions defined on the event of a component
   */
  runActions: function (actions ) {
    DSFStopScripts = false;
    //for all actions
    for (var i=0; i < actions.data.actions.length; i++) {
        //run appropriate action 
        if (!DSFStopScripts) {
            switch (actions.data.actions[i].action) {
                case "validate": 
                DSFStopScripts=!appValidator.validate(actions.data.component);
                    break;
                case "alert": alert(actions.data.actions[i].data); break;
                case "customScript": 
                    //$.getScript("data/prototypes/"+actions.data.actions[i].data); 
                    $.ajax({
                        async: false,
                        type:"GET",
                        url: "data/prototypes/"+actions.data.actions[i].data,
                        dataType: "script"
                    });
                    break;
                case "link": window.location=actions.data.actions[i].data; break;
                case "goBack": history.back(); break;
                case "previousOnRoute": 
                    var nextRoutId=parseInt(actions.data.routeNo) - 1;
                    var newURL= "#r/"+actions.data.routeId+'/'+nextRoutId;
                    window.location=newURL;
                    break;
                case "nextOnRoute": 
                    var nextRoutId=parseInt(actions.data.routeNo) + 1;
                    var newURL= "#r/"+actions.data.routeId+'/'+nextRoutId;
                    window.location=newURL;
                    break;
                case "getData": 
                    var formData = new FormData(document.querySelector("#components"));
                    // Display the key/value pairs
                    for(var pair of formData.entries()) {
                        var inputKey = pair[0];
                        var inputValue = formData.getAll(inputKey);
                        console.log(inputKey+ ', '+ inputValue);
                        //save in session store
                        sessionStorage[inputKey] = inputValue;
                    }
                    break;
                case "alertData": 
                    var formData = new FormData(document.querySelector("#components"));
                    var formDataValues="";
                    // Display the key/value pairs
                    for(var pair of formData.entries()) {
                        var inputKey = pair[0];
                        var inputValue = formData.getAll(inputKey);
                        formDataValues += inputKey+ ', '+ inputValue + '\n';
                    }
                    alert(formDataValues);
                    break;
            }
        }
    }
  }
};

/**
 * editor class
 */
var appEditor = {
    /** The DOM Id of the element to render the JSON object on the screen */
    JSONDOMId: "DSFComponentsObj",
    /** The DOM Id of the element to render the HTML code on the screen */
    HTMLDOMId: "DSFComponentsHTML",
    /**
     * Uses the `Sortable.min.js` to create sortable components on the screen. All child elements 
     * of `#{DOMId}` with child element with class`#DSFMoveButton` will be created as sortable component 
     * 
     * @param {String} DOMId The DOM ID to be used to enable the sortable components
     */
    enableSortComponents:function(DOMId) {
        //create editable list
        var editableList = Sortable.create(document.getElementById(DOMId), {
            handle: '.DSFMoveButton'
            , onEnd: function (/**Event*/evt) {
               //alert(evt.to + " -- " +  evt.from + " -- oldIndex: " +  evt.oldIndex + " -- newIndex: " +  evt.newIndex + " -- oldDraggableIndex: " +  evt.oldDraggableIndex + " -- newDraggableIndex: " + evt.newDraggableIndex );
               // reorder array https://stackoverflow.com/questions/2440700/reordering-arrays
            }
          });
    },
    /**
     * Creates the area on the screen that dispays the page's JSON
     * 
     * @param {String} DOMId The DOM ID to be used to enable the sortable components
     */
    createPageJSONDisplay: function(DOMId) {
        //add `<pre>` to display the pageObject
        $("#"+DOMId).after(DSFReusableStuff.editPageObject);
    },
    /**
     * Render's the page's JSON on the screen. MUST have area created on page (so run createPageJSONDisplay first)
     * 
     * @param {*} obj The object to render
     */
    renderPageJSON: function(obj) {
        $("#"+this.JSONDOMId).html(
            hljs.highlight(
                JSON.stringify(obj,null, 2),
                { language: 'json' }
              ).value
           
        );
    },
    /**
     * Render's the DSF components HTML on the screen. MUST have area created on page (so run createPageJSONDisplay first)
     * 
     * @param {*} obj The object to render
     */
    renderPageHTMLCode: function(obj) {
        $("#"+this.HTMLDOMId).html(hljs.highlight(
            html_beautify(obj, { indent_size: 2, space_in_empty_paren: true }),
            { language: 'html' }
              ).value);
    }
}


/**
 * validator class
 */
var appValidator = {
    /**
     * Perfoms the validations 
     * 
     * @param {*} component The component object that contains all the validation data
     * @returns {Boolean}, false if one of the validations has failed
     */
    validate:function(component) {
        //for all validation in component
        var isValid=true;
        var errorMessages =[];
        //clear validation summary
        appValidator.clearValidationSummary(component.validationsSummary);
        //for all validations
        for (var i=0; i < component.validations.length; i++) {
            var isOneValid = true;
            var validation = component.validations[i];
            //clear error message
            appValidator.clearValidationError(validation.elementName,validation.elementId,validation.elementType)
            //depending on validation
            switch (validation.validation) {
                case "required": 
                    let x = document.forms["components"][validation.elementName].value;
                    if (x == "") isOneValid = false
                break;
                case "custom":
                    //run custom function 
                     if (!window[validation.functionName]()) isOneValid=false;
                break;
                default:
                    // if validation starts with `is.` run `is.js` commands https://is.js.org/
                    if (validation.validation.indexOf("is.") === 0) {
                        if (!is[validation.validation.split("is.")[1]](document.forms["components"][validation.elementName].value)) isOneValid=false;
                    }
                break;
            }
            //if is not valid
            if (!isOneValid) {
                var message=component.langConent.validationsLabels[validation.validation+"."+validation.elementId];
                appValidator.showValidationError(validation.elementName,validation.elementId,validation.elementType
                    ,message);
                isValid = false;
                errorMessages.push({
                    "message" : message,
                    "elementName" : validation.elementName
                });
            }
        }
        //show validation summary
        if (!isValid) {
            appValidator.showValidationSummary(errorMessages,component.langConent.validationSummaryTitle,component.validationsSummary);
        }
        return isValid;
    },
    /**
     * Shows the validation message
     * 
     * @param {String} elementName The input's name 
     * @param {String} elementId The outer div ID
     * @param {String} elementType The type of the element (must be consistend with what was defined)
     * @param {String} message The message to be displayed
     */
    showValidationError:function(elementName,elementId,elementType,message){
      switch (elementType) {
          case "radio":
          case "checkboxes":
              $("#"+elementId).addClass("govcy-form-control-error");
              $("#"+elementId+"_error").append(message);
              //$("#"+elementId +" :input").addClass("govcy-form-control-error")
          break;
          case "text":
          case "password":
              $("#"+elementId).addClass("govcy-form-control-error");
              $("#"+elementId+"_error").append(message);
              $("#"+elementId +" :input").addClass("govcy-text-input-error");
          break;
      }
    },
    /**
     * Clears the validation message
     * 
     * @param {String} elementName The input's name 
     * @param {String} elementId The outer div ID
     * @param {String} elementType The type of the element (must be consistend with what was defined) 
     */
    clearValidationError:function(elementName,elementId,elementType){
      switch (elementType) {
          case "radio":
          case "checkboxes":
              $("#"+elementId).removeClass("govcy-form-control-error");
              $("#"+elementId+"_error").html("");
          break;
          case "text":
          case "password":
              $("#"+elementId).removeClass("govcy-form-control-error");
              $("#"+elementId+"_error").html("");
              $("#"+elementId +" :input").removeClass("govcy-text-input-error");
          break;
      }
    },
    /**
     * Shows the validation error summary
     * 
     * @param {Array} messages The messages object ({message, elementName})
     * @param {String} validationSummaryTitle The title of the alert 
     * @param {String} validationsAlert The element ID that will render the errors
     */
    showValidationSummary(messages, validationSummaryTitle, validationsAlert){
      var obj = {
          "type": "alertError",
          "langConent" : {"label" : validationSummaryTitle,"data" : messages}
      };
                      
      //render using mustache
      var content = Mustache.render
      (DSFTemplates.componentTemplates[obj.type]
          , obj);
  
      //render on page
      $("#"+validationsAlert).html(content);
      
      //bindings on error summary links
      $('.errorSummaryLink').on('click', function() {
        //focus on input
        $('[name="'+$(this).data("element-name")+'"]').first().focus();
        
        return false;
      });
      //scroll to top
      window.scrollTo(0, 0);
    },
    /**
     * Clears the validation error summary
     * 
     * @param {String} validationsAlert The element ID that will render the errors
     */
    clearValidationSummary(validationsAlert){
      //render on page
      $("#"+validationsAlert).html("");
    }
};
