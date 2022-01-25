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
              appView.renderPage(appModel.siteOptions.defaultPage);
          });
          //------------#p/Pages---------------------------
          $.each(appModel.siteOptions["pages"], function (i, route_args) {
              app.get('#p/' + route_args.id, function () {
                  appView.renderPage(route_args.id);
              });
          });
          //------------#r/:routeId/:routeNo---------------------------
          this.get('#r/:routeId/:routeNo', function () {
            appView.renderPage(appModel.siteOptions.routes[this.params['routeId']][this.params['routeNo']]
                ,this.params['routeId'], this.params['routeNo']);
          });
          //-------------/----------------------------
          //default
          this.get('', function () { this.app.runRoute('get', '#home') });
      }).run();
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
            //attach evevrnts
            $( "#"+DSFComponent.id ).on( 
                DSFComponent.events[i].on,
                    {"actions":DSFComponent.events[i].actions
                    ,"routeId":routeId
                    ,"routeNo":routeNo}, 
                appController.runActions );
        }
    }    
  },
  /**
   * Runs the actions defined on events of a component
   * 
   * @param {array} actions the actions defined on the event of a component
   */
  runActions: function (actions ) {
    appModel.stopScripts = false;
    //for all actions
    for (var i=0; i < actions.data.actions.length; i++) {
        //run appropriate action 
        if (!appModel.stopScripts) {
            switch (actions.data.actions[i].action) {
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
}

/**
* The model class
*/
var appModel = {
  /** The site options object as loaded from the server */
  siteOptions: null,
  /** The current pages form id */
  currentPageId : null,
  /** The current submit id */
  currentSubmitId : null,
  /** The current form object */
  currentFormObj : null,
  /** The current route */
  currentRoute: null,
  /** The count of the fetch requests */
  fetchCount : 0,
  stopScripts: false
  
};

/**
* The view class
**/

var appView = {
  /**
   * Render site stuff like menus header and footer
   **/
  renderSiteStuff : function(DSFPage){
      //render header footer
      if (DSFTemplates.header) $('#headerContainer').html(DSFTemplates.header[localStorage.DDSlanguageCode]);
      if (DSFTemplates.footer) $('#footerContainer').html(DSFTemplates.footer[localStorage.DDSlanguageCode]);
      //render layouts
      $('#mainContainer').html(DSFTemplates.layouts[DSFPage.layout]);
      //render menus
      for (var i = 0; i < DSFPage.menus.length; i++) {
        appView.showMenu(appModel.siteOptions.menus[DSFPage.menus[i]]);
      }
  },
  /**
   * Clears the screen
   **/
  clearScreen: function() {
      $('#mainContainer').html("");
      $('#headerContainer').html("");
      $('#footerContainer').html("");
      $('#sideMenu').html("");
      $('#topMenu').html("");
      $('#main').html("");
  },
  /**
   * Creates a `langConent` with the language selected content data. 
   * 
   * @param {*} obj the component data object
   */
  prepareMultiLanguage (obj) {
    //if content exits in object
    if (obj.content){
        //if content exist in specific language
        if (obj.content[localStorage.DDSlanguageCode]) {
            // set obj.langContent to specific language
            obj.langConent = obj.content[localStorage.DDSlanguageCode];
        } else {
            obj.langConent = obj.content[DSFTemplates.defaultLang];
        }
    }
  },
  /**
   * Renders the page 
   * 
   * @param {string} pageId the id of the page to be rendered
   * @param {string} routeId The id of the route 
   * @param {int} routeNo The number of the route 
   */
  renderPage:function(pageId,routeId,routeNo) {
      //default parameters
      routeId = typeof routeId !== 'undefined' ? routeId : "";
      routeNo = typeof routeNo !== 'undefined' ? routeNo : 0;
      //set current values
      appModel.currentPageId = pageId;
      //clear everything
      appView.clearScreen();      
      
      //------ DSF Components START------------------

          //get data from json
        $.getJSON( "data/prototypes/"+pageId+".json", function( data ) {
            //render site stuff
            appView.renderSiteStuff(data);
            //page bindings
            appView.globalBindings(routeId,routeNo);

            var DSFComponents = "";
            var DSFEvents = [];
            //Render components
            if (data.DSFcomponents) {
                //register scipt 
                appModel.stopScripts = false;
                if (data.preScript) {
                    //$.getScript("data/prototypes/"+data.preScript);
                    $.ajax({
                        async: false,
                        type:"GET",
                        url: "data/prototypes/"+data.preScript,
                        dataType: "script"
                    });
                }
                if (appModel.stopScripts) {return null;}
                //for all components
                for (var i = 0; i < data.DSFcomponents.components.length; i++) {
                    
                    //take care of multilanguage hasle 
                    appView.prepareMultiLanguage(data.DSFcomponents.components[i]);
                    
                    //render using mustache
                    DSFComponents += Mustache.render
                    (DSFTemplates.componentTemplates[data.DSFcomponents.components[i].type]
                        , data.DSFcomponents.components[i]);
                    
                    //register events in array
                    if (data.DSFcomponents.components[i].events) {
                        DSFEvents.push(data.DSFcomponents.components[i]);
                    }
                }

                //render on page
                $("#"+data.DSFcomponents.DOMId).html(DSFComponents);

                //attach events
                for (var i = 0; i < DSFEvents.length; i++) {
                    appController.attachEvents(DSFEvents[i],routeId,routeNo);
                }
                
                //register scipt 
                if (data.postScript) {
                    $.getScript("data/prototypes/"+data.postScript);
                }
            }
        });
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
          var classHTML = (value.id==appModel.currentPageId?'class="nav-link active" aria-current="page"':'class="nav-link"')
          mainNavItems += '<li class="nav-item"><a '+classHTML+' href="'+value.url+'">'+value.label[localStorage.DDSlanguageCode]+'</a></li>';
          });
      $('#'+menuElementId).html(mainNavItems);
  }, 
  /**
   * Handles global bindings such as change language
   * 
   * @param {string} routeId The id of the route 
   * @param {int} routeNo The number of the route 
   */
  globalBindings:function(routeId,routeNo) {
      //bindings change language
      $('#changeLangSel').on('change', function() {
          //change language id
          localStorage.DDSlanguageCode = this.value;
          // re render 
          appView.renderPage(appModel.currentPageId,routeId,routeNo);
      });
  }
};