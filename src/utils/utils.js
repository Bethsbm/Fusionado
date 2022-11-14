import Swal from "sweetalert2";


 function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(array[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach(item => {
        let ctr = 0;
        keys.forEach(key => {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            
            ctr++;
        });
        result += lineDelimiter;
    });
 console.log('resul',result)
    return result;
}

function downloadCSV(array,titleReport) {
  console.log('Array',array)
  // console.log('Colum Report',columReport)
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
  console.log('csv',csv)
    if (csv == null) return;

    const filename = titleReport+((new Date()).toDateString())+'.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
}

function toUpperCaseField(word) {
  return String(word).trim().toUpperCase()
}




function toReplaceSpace(word) {
  return String(word).replace(/\s/g, '')
}



const getOneParam = (objectJson,nameParam) => {
  return objectJson.filter(
    (item) => item.parametro === nameParam,
  )[0] || {};
}

 /**
   ** get settign params
   * obteniendo todos los parametros de configuracion del sistema
   * */
   const urlAPi="http://localhost:3001"
   const getAllSettingsParams = async () => {
    return fetch(urlAPi + "/ms_parametros/getall", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      
  };


  
  const showAlerts = (alerta) =>{
    switch (alerta){
      case 'guardado':
        Swal.fire({
          title: '¡Guardado!',
          text: "Los cambios se guardaron con éxito",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        })

      break;

      case 'error': 
      Swal.fire({
        title: 'Error',
        text:  'No se pudieron guardar los cambios',
        icon: 'error',
        confirmButtonColor: 'red',
        confirmButtonText: 'Ok'
      })
      break;

      default: break;
    }
  };


  // function translateUperCase(text) {
  //   console.log('text',text)
  //   try {
  //     (text.toString()).toUpperCase();
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  

export {
  downloadCSV,
  toUpperCaseField,
  // translateUperCase,
  getOneParam,
  getAllSettingsParams,
  toReplaceSpace,
  showAlerts
}