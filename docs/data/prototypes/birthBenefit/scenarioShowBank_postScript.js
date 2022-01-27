//reset option for isBankCorrect
sessionStorage.removeItem("isBankCorrect");
//if bank was changed change the details on the screen
if (sessionStorage["Bank"]) {
    $("#bankInfo").text(sessionStorage["Bank"]);
}
//if IBAN was changed change the details on the screen
if (sessionStorage["IBAN"]) {
    $("#IBANInfo").text(sessionStorage["IBAN"]);
}