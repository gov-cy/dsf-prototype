function checkEmail(){
    if ((document.forms["components"]["emailRadio"].value == "custom") 
        && document.forms["components"]["emailAddress"].value =="") return false;
    else if ((document.forms["components"]["emailRadio"].value == "custom") 
    && !is.email( document.forms["components"]["emailAddress"].value )) return false;
    else return true;
}