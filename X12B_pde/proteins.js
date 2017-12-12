//Proteins
var proteins = [];

//Listenenr for input proteins
document.getElementById('file-input').addEventListener('change', proteinImport, false);

//Importation of the file with proteins
function proteinImport(e)
{
  var file = e.target.files[0];
  if (!file)
  {
    document.getElementById("file_error").innerHTML = "Invalid file";
    return;
  }
  document.getElementById("file_error").innerHTML = "";
    
  var reader = new FileReader();
  reader.onload = function(e)
  {
    displayProteins(e.target.result);
    parsing(e.target.result);
  };
  reader.readAsText(file); 
}

//Parsing the proteins
function parsing(text)
{
  console.log("Parsing ...");
  proteins = [];
  var proteinsStringArray = text.split('\n');
  
  proteinsStringArray.forEach( function(proteinString)
  {
    var tmpProtein = proteinString.split(',');
    var protein = {name: tmpProtein[0], sequence: tmpProtein[3]};
    proteins.push(protein); 
  });
}