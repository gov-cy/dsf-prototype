
//--------------- fill data on form -------
if (sessionStorage["emailAddress"]) {
    if (sessionStorage["emailAddress"] != "") $("#emailInfo").text(sessionStorage["emailAddress"]);
}
if (sessionStorage["BankAccountName"]) {
    if (sessionStorage["BankAccountName"] != "") $("#bankAccountNameInfo").text(sessionStorage["BankAccountName"]);
}
if (sessionStorage["Bank"]) {
    if (sessionStorage["Bank"] != "") $("#bankInfo").text(sessionStorage["Bank"]);
}
if (sessionStorage["IBAN"]) {
    if (sessionStorage["IBAN"] != "") $("#IBANInfo").text(sessionStorage["IBAN"]);
}