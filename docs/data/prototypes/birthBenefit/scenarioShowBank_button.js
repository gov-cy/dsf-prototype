if (sessionStorage["isBankCorrect"] == "no"){
    window.location="#p/birthBenefit/changeBank";
    //use this to stop all other events
    appModel.stopScripts = true;  
}


// ,{
//     "type": "link",
//     "href" : "#p/birthBenefit/changeBank",
//     "content" : {
//         "en" : {"label" : "Is this information not correct?"},
//         "el" : {"label" : "Δεν είναι σωστές αυτές οι πληροφορίες;"}
//     }
// }