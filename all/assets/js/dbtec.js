
        

var url;

function createform(cols,model)
{

    if (cols)
    {
        var dathtml = "" ;
        var tmp = cols[0];
        var campo = [];
        var title = [];
        var validate = [];
        var required = [];
        var tipodato = [];
        var url = [];


              for (let i in tmp) {
                  for (let j in tmp[i]) {
                       campo[i] = tmp[i]['field'];
                       title[i] = tmp[i]['title'];
                       validate[i] = tmp[i]['validate'];
                       required[i] = tmp[i]['required'];
                       tipodato[i] = tmp[i]['tipodato'];
                       url[i] = tmp[i]['url'];
                       //console.log(tipodato);
                  }
              }

              for (var i = 0; i < campo.length; i++) 
              {


                   var c = "";
                   var t = "";
                   var v = "";
                   var td = "";
                   var dop = "";
                   var u = "";
                   var w = "width:100%"
                   c = campo[i];
                   t = title[i];
                   v = validate[i];
                   r = required[i]; 
                   td = tipodato[i];
                   u = url[i];
                   extpro = "input";
                   v2 = "";
                   v3 = "";


                   if (td == "easyui-checkbox")
                   {
                      extpro = 'type="checkbox"';
                      w = "width:10%"
                   } 
                   if (td == "easyui-textarea")
                   {
                      extpro = 'textarea';
                      v2 = "</textarea>";
                      v3 = "<div></div>";
                   }                   
                  
                   if (td == "easyui-hidden")
                   {
                      if (c != "act")
                      {  
                            dathtml = dathtml + `
                            <input type="hidden" name="`+ c +`" id="`+ c +`" >
                            `;
                      }       
                   } 

                  if (td != "easyui-combobox" && td != "easyui-hidden")
                   { 
                      if (c != "act")
                      { 
                          dathtml = dathtml + ` 
                          <div class="col-sm-12">` + t +`<br>
                          ` + v3 +  `
                          <`+ extpro + ` id="` +  c + `" class="` + td +`" name="` + c + `" style="  ` + w + ` " 
                          data-options="label:'',
                          required:` + r + `,validType:'` +  v + `'"
                          >` + v2 + `
                          </div>
                          `;
                      }    

                    } 

                    if (td == "easyui-combobox")
                    {
                    
                        type  = "GET"
                        
                       
                        headers = {
                            "Content-Type" : "application/json",
                            "x-access-token" : "",
                            "model" : u,
                            "schema" : "0"

                         }

                         u = "http://192.168.0.16:3003/api/v1/universal"
                        rst   = sendAJAXformApi(type,u,'',headers)
                        xdata  = rst.data;
                        var blist = "";
                        var svalue = "";
                        var sname = "";
                        var sselect = "";


                        for (var ii = 0; ii < xdata.length; ii++) 
                        {
                         
                            if (c == "country" )
                            {
                                      svalue = xdata[ii].name;
                                      sname  = xdata[ii].name
                            }
                            else
                            {
                                      svalue = xdata[ii].id;
                                      sname  = xdata[ii].desc_tipo_aeronave

                            } 

                            
                            blist = blist + `
                             <option value=" `+ svalue +` ">` + sname + `</option>
                                      `;
                            }
                                
                            dathtml = dathtml + ` 
                            <div class="col-sm-12">` + t +`
                            ` + v3 +  `
                            <select class="easyui-combobox"  name="` +  c +`" id="` +  c +`" label="" style="width:100%">
                            `+  blist+`
                            </select>
                            </div>
                            `;

                         } 








              }
              $("#bodyform").html(dathtml);
              /*

              for (var i = 0; i < campo.length; i++) 
              {
                   var c = "";
                   var t = "";
                   var v = "";
                   var td = "";
                   var dop = "";
                   var u = "";
                   var w = "width:100%"
                   c = campo[i];
                   t = title[i];
                   v = validate[i];
                   r = required[i]; 
                   td = tipodato[i];
                   u = url[i];
                   extpro = "input";
                   v2 = "";
                   v3 = "";

                   if (td == "easyui-checkbox")
                   {
                      extpro = 'type="checkbox"';
                      w = "width:10%"
                   } 
                   if (td == "easyui-textarea")
                   {
                      extpro = 'textarea';
                      v2 = "</textarea>";
                      v3 = "<div></div>";
                   }
                   if (td == "easyui-hidden")
                   {
                      if (c != "act")
                      {  
                            dathtml = dathtml + `
                            <input type="hidden" name="`+ c +`" id="`+ c +`" >
                            `;
                      }       

                      
                   } 
                   if (td != "easyui-combobox" && td != "easyui-hidden")
                   { 
                      if (c != "act")
                      { 
                          dathtml = dathtml + ` 
                          <div class="col-sm-12">` + t +`<br>
                          ` + v3 +  `
                          <`+ extpro + ` id="` +  c + `" class="` + td +`" name="` + c + `" style="  ` + w + ` " 
                          data-options="label:'',
                          required:` + r + `,validType:'` +  v + `'"
                          >` + v2 + `
                          </div>
                          `;
                      }    

                    } 

                    if (td == "easyui-combobox")
                    {
                    
                        type  = "GET"
                        rst   = sendAJAXformApi(type,u,'')
                        //console.log(rst);
                    
                         
                        if (c == "country" ) 
                        {
                          rst = rst;
                        }
                        else{rst = rst.docs;}
                        
                        //rst = rst.docs;       
                          

                        var blist = "";
                        var svalue = "";
                        var sname = "";
                        var sselect = "";

                    
                        for (var ii = 0; ii < rst.length; ii++) 
                        {
                         
                            if (c == "country" )
                            {
                                      svalue = rst[ii].name;
                                      sname  = rst[ii].name
                                    }
                                    else
                                    {
                                      svalue = rst[ii]._id;
                                      sname  = rst[ii].name

                                    } 

                                    blist = blist + `
                                    <option value=" `+ svalue +` ">` + sname + `</option>
                                      `;
                            }
                                
                                    dathtml = dathtml + ` 
                                    <select class="easyui-combobox"  name="` +  c +`" id="` +  c +`" label="` + t + `" style="width:100%">
                                    `+  blist+`
                                    </select>`;

                        } 

                   //alert(model);
                   
                }
             
                    //model = "tsa_combustiblebitacoravuelos";
                    /*
                    if (model == "tsa_bitacoravuelo")
                    { 

                        var w = $('#w');
                        w.window('resize',{width:'50%',height:'auto'});

                        $("#bodyform").html('');
                        $("#bodyform").load('./template/tsa_bitacoravuelo.html');
                    }
                    
                    if (model == "tsa_rutabitacoravuelo")
                    {

                        var w = $('#w');
                        w.window('resize',{width:'25%',height:'auto'});

                        $("#bodyform").html('');
                        $("#bodyform").load('./template/tsa_rutabitacoravuelo.html');
                    }

                    if (model == "tsa_combustiblebitacoravuelos")
                    {

                        var w = $('#w');
                        w.window('resize',{width:'25%',height:'auto'});

                        $("#bodyform").html('');
                        $("#bodyform").load('./template/tsa_combustiblebitacoravuelos.html');

                    }

                    if (model == "tsa_pasajeroscargabitacoravuelos")
                    {

                        var w = $('#w');
                        w.window('resize',{width:'25%',height:'auto'});

                        $("#bodyform").html('');
                        $("#bodyform").load('./template/tsa_pasajeroscargabitacoravuelos.html');

                    }

                    if (model == "users")
                    {

                        var w = $('#w');
                        w.window('resize',{width:'25%',height:'auto'});

                        $("#bodyform").html('');
                        $("#bodyform").load('./template/users.html');
                        

                    }

                    if (model == "tsa_aeronaves")
                    {

                        var w = $('#w');
                        w.window('resize',{width:'25%',height:'auto'});

                        $("#bodyform").html('');
                        $("#bodyform").load('./template/tsa_aeronave.html');
                        

                    }

                    if (model == "tsa_tipoaeronave")
                    {

                        var w = $('#w');
                        w.window('resize',{width:'25%',height:'auto'});

                        $("#bodyform").html('');
                        $("#bodyform").load('./template/tsa_tipoaeronave.html');
                        

                    }


                    if (model == "tsa_notificaciones")
                    {

                        var w = $('#w');
                        w.window('resize',{width:'25%',height:'auto'});

                        $("#bodyform").html('');
                        $("#bodyform").load('./template/notificaciones.html');
                        

                    }


                    */
                   // else
                   // {
                        //console.log(dathtml);
                        //$("#bodyform").html(dathtml);            
                    //}

   
   }
}



function createlist(data,cols)
{
 
    //data = changeIDlist(data,model);
    //data = addbOP(data,model,id);

         
    $('#dg').datagrid({


          data:data,
          columns:cols,
 
         
          onClickCell: function(index,field,value)
          {
              var row = $(this).datagrid('getRows')[index];
              row._selecting = true;
              $(this).datagrid('selectRow', index);
          }

    });
    
    $('#dg').datagrid({
        singleSelect: true,
        checkOnSelect: false,
        selectOnCheck: false,
    })
    
    
    var tmp = cols;
    var tipodato = "";
    var campo = "";
    for (let i in tmp) {
          for (let j in tmp[i]) {
               tipodato = tmp[i][j]['tipodatolst'];
               if (tipodato == "easyui-hidden")
               {
                    $('#dg').datagrid('hideColumn',tmp[i][j]['field'] ); 
               }     
          }
      }
    

      //$('#dg').datagrid('toExcel','dg.xls');    // export to excel
                
}
function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}

function cambiaTituloGrid(id,txt,op){

    txt.replace('tsa_', '')
    let xtxt = txt.replace(/tsa_/, ''); 
    if (op == 1) txt = " Registros módulo " + capitalize(xtxt)
    if (op == 1) $(id).datagrid({ title: txt });
    //if (op == 2) $(id).window({ setTitle: txt });
    if (op == 2) $('#dlg').dialog('setTitle','lala');
    return(capitalize(xtxt)); 
}

function detectaDispositivo(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) return(true);
}


function sendAJAXformApi(type,url,data,headers)
{

 //try {   
    var theResponse = null;
    url = url,
    $.ajax({
      url: url,
      type: type,
      async : false,
      headers : headers,
      //headers: { Authorization: $`Bearer ${localStorage.getItem("token")}` },
      data: data,
      error: function(err) {
        switch (err.status) {
          case "400":
            // bad request
            break;
          case "401":
            // unauthorized
            break;
          case "403":
            // forbidden
            break;
          case "422":
            // datos repetidos
            break; 
          default:
            error = err.responseText;
            error = JSON.parse(error)
            var html = "";
            var t = error.errors.msg.length;
            var html = "error";
            /*
            for (var i = 0; i < t; i++){ 
            //console.log(total);
                console.log(error.errors.msg[i].msg);
                console.log(error.errors.msg[i].param);
                html = html + "<i class='fas fa-exclamation-circle'></i> Campo<b> '" + error.errors.msg[i].param + "'</b>  " + error.errors.msg[i].msg + ".<br>";   
            }
            */
            $("#msgerrorTXT").html(html);
            //$('#msgerror').show();
            $("#msgerror").slideUp( 300 ).delay( 800 ).fadeIn( 400 );
            //$("#msgerror").slideUp( 1300 ).delay( 11800 ).fadeOut( 4400 );
            $('#loading').hide();
            $('#url').val($('#ord_url').val());
            break;

        }
      },
      success: function(data) 
      {

        theResponse = data;
        //console.log(data);
      }

    });
    return theResponse;

    /*
    }
    catch(err) {
        $.messager.alert('ERROR', "No se pudo conectar con la API");
        rst = [{_id:'error'}];
        return rst;
    }*/    

}


var type = "get"
var url = "http://192.168.0.16:3003/api/v1/universal"
var data = "";
var model = "tsa_aeronaves"
headers = {
              "Content-Type" : "application/json",
              "x-access-token" : "",
              "model" : model,
              "schema" : "1"

          }


var rst = sendAJAXformApi(type,url,data,headers) // Se obtiene el esquema del modelo indicado
var xrst = [];
xrst[0] = rst;


headers.schema = 0;
var data = sendAJAXformApi(type,url,data,headers) // Se obtiene los datos del modelo indicado
var xdata = [];
xdata  = data.data;
createlist(xdata,xrst); // Creamos los encabezados de la grilla
cambiaTituloGrid('#dg',model,1); //cambia el titulo de la ventana
if (detectaDispositivo())
{
    $('#dlg').window({
    width:"100%",
    height:400,
    modal:true
    });
}

createform(xrst,model) //Creamos los formularios 
let xtxt = "Formulario " + cambiaTituloGrid('#dlg',model);





        function newUser(){
            $('#dlg').dialog('open').dialog('center').dialog('setTitle',xtxt,2);
            $('#fm').form('clear');
            url = 'save_user.php';
        }
        function editUser(){
            var row = $('#dg').datagrid('getSelected');
            if (row){
                $('#dlg').dialog('open').dialog('center').dialog('setTitle','Edit User');
                $('#fm').form('load',row);
                url = 'update_user.php?id='+row.id;
            }
        }
        function saveUser(){
            $('#fm').form('submit',{
                url: url,
                onSubmit: function(){
                    return $(this).form('validate');
                },
                success: function(result){
                    var result = eval('('+result+')');
                    if (result.errorMsg){
                        $.messager.show({
                            title: 'Error',
                            msg: result.errorMsg
                        });
                    } else {
                        $('#dlg').dialog('close');        // close the dialog
                        $('#dg').datagrid('reload');    // reload the user data
                    }
                }
            });
        }
        function destroyUser(){
            var row = $('#dg').datagrid('getSelected');
            if (row){
                $.messager.confirm('Confirm','Are you sure you want to destroy this user?',function(r){
                    if (r){
                        $.post('destroy_user.php',{id:row.id},function(result){
                            if (result.success){
                                $('#dg').datagrid('reload');    // reload the user data
                            } else {
                                $.messager.show({    // show error message
                                    title: 'Error',
                                    msg: result.errorMsg
                                });
                            }
                        },'json');
                    }
                });
            }
        }
