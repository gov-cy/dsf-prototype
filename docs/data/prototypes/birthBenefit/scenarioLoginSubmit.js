//not the right user
if (!(((sessionStorage["id"]) === "elena") 
    && ((sessionStorage["password"]) === "pass"))){
    window.location="#p/birthBenefit/badLogin";
    //use this to stop all other events
    appModel.stopScripts = true;  
//if is the right user
} else {
    //prepare user data object 
    var useData = {
        "type": "userNamesSignOut",
        "content" : {
            "en" : {"userName" : sessionStorage["id"],"logout":"Sign Out"},
            "el" : {"userName" : sessionStorage["id"],"logout":"Αποσύνδεση"}
        }
    };
    //take care of multilanguage hasle 
    appView.prepareMultiLanguage(useData);
                    
    //render using mustache
    var userDataContent = Mustache.render
    (DSFTemplates.componentTemplates[useData.type]
        , useData);

    //render on page
    $("#before-main").html(userDataContent);
}