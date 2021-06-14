var hash, parts, variables, constants;

// function triggered by the Parse! button
function parseBtn() {
  // initalizing a URL format string and a URL instance
  let formatstring = document.getElementById("formatString").value;
  let url = new URL(document.getElementById("urlInstance").value);
  
  hash = new Object();
  parts,variables,constants = [];

  // working with the URL format string
  let fsparts = formatstring.split("/"); // split it into an array of parts
  fsparts = fsparts.filter(checkEmpty); // filter the array deleting potential empty objects, check function below
  constants = fsparts.filter(findConstants); // new array with the constant parts, check function below
  variables = fsparts.filter(findVariables); // new array with the variable parts, check function below
  variables = variables.map(deleteColons); // deleting the colons in every variable, check function below

  // working with the pathname of the URL instance
  let pathname = url.pathname; // extract the pathname of the url (without domains and params)
  parts = pathname.split("/"); // split it into array of parts
  parts = parts.filter(checkEmpty); //filter the array deleting potential empty objects, check function below
  parts = parts.filter(filterConstants); // filter the array deleting the constant parts, check function below

  variables.forEach(addParts); // add the value part for each variable into the object hash, check function below

  // working with the parameters of the URL instance
  let params = new URLSearchParams(url.search); 
  for(var [key, value] of params.entries()) {
     hash[key] = value; // adding each param into the hash object, with its key and value
  }

  // Final result
  console.log(hash);
  document.getElementById("result").value = JSON.stringify(hash);
}

// --- OTHER FUNCTIONS ---
// filter empty items in arrays
function checkEmpty(x) { 
  return x.length > 0; 
};

// find parts of a format string without colons(:), which are constants
function findConstants(x) {
  return x[0] != ":";
};

// find parts of a format string with colons(:), which are variables
function findVariables(x) {
  return x[0] == ":";
};

// find only variable parts of a pathname, deleting the constants
function filterConstants(x) {
  if (!constants.includes(x)) {
    return x;
  };
};

// delete colons in variables keys
function deleteColons(value, index, array) {
  return value.replace(":","");
}

// function that add the variable parts of the pathname to the hash object
function addParts(value,index,array){
  hash[value] = parts[index];
}