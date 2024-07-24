if (sessionStorage["isBankCorrect"] == "no"){
    window.location="#p/birthBenefit/changeBank";
    //use this to stop all other events
    DSFStopScripts = true;  
}


// ,{
//     "type": "link",
//     "href" : "#p/birthBenefit/changeBank",
//     "content" : {
//         "en" : {"label" : "Is this information not correct?"},
//         "el" : {"label" : "Δεν είναι σωστές αυτές οι πληροφορίες;"}
//     }
// }