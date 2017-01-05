var Header = React.createClass({
 render() {
   return (
     <h1>Agent - Login</h1>
   )
 }
});
 var state
var LoginForm = React.createClass({

 getInitialState() {
  return {username:null,password:null,action: 'login',err : '',addList:''}

},
 ValidateLogin() {
   var email = this.state.username
   var password = this.state.password
   if(email && password){
   var params ={username: email,password:password};
   var xhttp = new XMLHttpRequest();
   var updateState = this.setState.bind(this);
   console.log('state is', this.state)
   xhttp.onreadystatechange = function(res) {
    if (this.readyState == 4 && this.status == 200) {
        //console.log('before update', JSON.parse(res.target.response), JSON.parse(res.target.response).username)
        if(JSON.parse(res.target.response).username){

        var oReq =  new XMLHttpRequest();
        oReq.onreadystatechange = function(response) {
          if (this.readyState == 4 && this.status == 200) {
             var result = JSON.parse(response.target.response)
             updateState({action:'success',addList:result})
             }
       }

        oReq.open("GET", "/dashboard", true);
        oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        oReq.send(null);
       }

        else{
          updateState({err:'Invalid credentials'})
          }
        //this.setState();
        console.log('after update')
    }
    else {
      console.log('this.readyState',this.readyState)
    }
  };
  xhttp.open("POST", "/login", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(params));
  }
  else{
  if(!email)
   this.setState({err:'Enter username !!!'})
  else if(!password)
   this.setState({err:'Enter password !!!'})
  else
    this.setState({err:'Enter values !!!'})
  }
 },
 onChangeUsername(e){
   this.setState({username:e.target.value})
 },
 onChangePassword(e){
   this.setState({password:e.target.value})
 },
 setResult(result){
   this.setState({addList:result})

 },
 onClick(){
   this.setState({action:"login",err:"",addList:null,username:null,password:null})
 },
 render() {
    console.log('inside render')
  switch(this.state.action){
  case 'login':
             return (
               <div>
               <div id="centeredheader">


               </div>

               <div id="outPopUp">
                <table id = "border">
                <thead>
                <tr>
                <td >
                   <h1 id="h1pad">Agent</h1>
                </td>
                <td>
                   <h1 id="h1pad">Login</h1>
                </td>
                </tr>
                </thead>
                <tbody>
                  <tr>
                     <td>
                        <label id="label">Username:</label>
                     </td>
                     <td>
                        <input type="text" id= "txt"  onChange={this.onChangeUsername}/>
                     </td>
                  </tr>
                  <br></br>
                  <tr>
                     <td>
                        <label id="label">Password:</label>
                     </td>
                     <td>
                        <input type="password" id= "txt" onChange={this.onChangePassword}/>
                     </td>
                  </tr>
                    <br></br>
                  <tr>
                     <td>
                     </td>
                     <td>
                       <button id="but" onClick={this.ValidateLogin}>Login</button>
                     </td>
                  </tr>
                    <br></br>
                  <tr>
                     <td>
                     </td>
                     <td>
                       <label id = "error"><font color="red">{this.state.err}</font></label>
                     </td>
                  </tr>

                </tbody>
                </table>
                </div>
               </div>
             )
  case 'success':
               var list = this.state.addList.filter(element => element.flag == 0)
               var edit = this.state.addList.filter(element => element.flag == 1)
              var obj = []
               var name = list[0].agent_name;
               var obj1 = []
               var setResult = this.setResult


               list.forEach(function(element){
                  obj.push(<tr><td><p class="indent"></p><b>{element.carrier} :</b></td><td><AddComponet  result={setResult}  carrier = {element.carrier} ref="AddComponet"/></td></tr>)

               })
               edit.forEach(function(element){
                  obj1.push(<tr><td><p class="indent"></p><b>{element.carrier} :</b></td><td><EditComponet  result={setResult}  carrier = {element.carrier} username ={element.username_carrier} password={element.password_carrier} ref="EditComponet"/></td></tr>);
               })


               return (
               <div >
               <div id= "patty">
                <div id="leftd">
                   <h1>Ivantage CAMP</h1>
                 </div>
                 <div id="rightd">
                   <p>Hi , {name.toUpperCase()} (Agent) <button id="butlogout" onClick={this.onClick}>Logout</button> </p>
                 </div>
               </div>

                <div id="putpadd" >
                  <table id="border">
                   <thead>
                     <tr>
                        <td><b><u>Carrier</u></b> </td>
                        <td><center><b><u>Credential</u></b></center></td>
                     </tr>
                  </thead>

                   <tbody>


                     {obj}

                    <br></br><br></br><br></br><br></br><br></br><br></br>
                      {obj1}


                     </tbody>
                 </table>
                </div>
               </div>
               )
}
}
});
var AddComponet = React.createClass({
getInitialState() {
  return {username: "",password:"",err:""}
},
onChangeUsername(e) {
  this.setState({username: e.target.value});
},
onChangePassword(e) {
  this.setState({password: e.target.value});
},
onClick() {
var update = this.setState.bind(this);
var updateState = this.props.result
var user = this.refs.username.value;
var password = this.refs.password.value;



var carrier = this.props.carrier
 if(user && password){
   this.refs.username.value="";
   this.refs.password.value="";
   update({err:""});
var result ={username: user,password:password,carrier:carrier};
var httpInsert = new XMLHttpRequest();
httpInsert.onreadystatechange = function(res) {
 if (this.readyState == 4 && this.status == 200) {
           var reqD =  new XMLHttpRequest();
           reqD.onreadystatechange = function(response) {
             if (this.readyState == 4 && this.status == 200) {
                  update({err:''})
                  var result = JSON.parse(response.target.response)
                  updateState(result)
                }
          }

           reqD.open("GET", "/dashboard", true);
           reqD.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
           reqD.send(null);



 }
 }
httpInsert.open("POST", "/add", true);
httpInsert.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
httpInsert.send(JSON.stringify(result));
}
else{
        if(!user)
         update({err:'Enter username !!!'})
        else if(!password)
         update({err:'Enter password !!!'})
        else
          update({err:'Enter values !!!'})
}
},
render(){
  return(
     <div>
     <p class="indent"></p>
     <label id="label">username:</label><input ref="username" type="text" id= "txt" onChange={this.onChangeUsername}/>

      <label id="label">  password:</label><input ref="password" type="password" id= "txt"  onChange={this.onChangePassword}/><tab2></tab2>

      <button id="but" onClick={this.onClick}>Add</button>
      <label><tab2></tab2><font color="red">{this.state.err}</font></label>

     </div>
  )
}
});

var EditComponet = React.createClass({
getInitialState() {
   return {username: null,password:null,action: "normal",err:""}
},
onChangeUsername(e) {
  this.setState({username: e.target.value});
},
onChangePassword(e) {
  this.setState({password: e.target.value});
},
onClick() {
  var update = this.setState.bind(this)
  update({action : "edit"})
},
add() {
            var updateAction = this.setState.bind(this)
            var updateState = this.props.result
            var user = this.refs.username.value;
            var password = this.refs.password.value;
            var carrier = this.props.carrier
            if(user && password){
                  updateAction({err:""})
                  var result ={username: user,password:password,carrier:carrier};
                  var httpInsert = new XMLHttpRequest();
                  httpInsert.onreadystatechange = function(res) {
                   if (this.readyState == 4 && this.status == 200) {
                             var reqD =  new XMLHttpRequest();
                             reqD.onreadystatechange = function(response) {
                               if (this.readyState == 4 && this.status == 200) {
                                    var result = JSON.parse(response.target.response)
                                    updateState(result)
                                    updateAction({action : "normal"})
                                  }
                            }

                             reqD.open("GET", "/dashboard", true);
                             reqD.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                             reqD.send(null);



                   }
                   }
                  httpInsert.open("POST", "/add", true);
                  httpInsert.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                  httpInsert.send(JSON.stringify(result));
     }
     else{
         if(!user)
          updateAction({err:'Enter username !!!'})
         else if(!password)
          updateAction({err:'Enter password !!!'})
         else
           updateAction({err:'Enter values !!!'})

     }



  },
render(){
  switch(this.state.action){
    case "normal":return(

                        <div>
                        <p class="indent"></p>
                        <label id="label">username:</label><label id="report-upload-form">{this.props.username}</label>

                         <label id="label">  password:</label><label id="report-upload-form">{this.props.password}</label><tab2></tab2>

                         <button id="but" onClick={this.onClick}>Edit</button>
                         <label><tab2></tab2><font color="red">{this.state.err}</font></label>

                        </div>
                   )
    case "edit":return(
                        <div>
                        <p class="indent"></p>
                        <label id="label">username:</label><input ref = "username" type="text" id= "txt" onChange={this.onChangeUsername}/>

                         <label id="label">  password:</label><input ref="password" type="password" id= "txt"  onChange={this.onChangePassword}/><tab2></tab2>

                         <button id="but" onClick={this.add}>Add</button>
                         <label><tab2></tab2><font color="red">{this.state.err}</font></label>

                        </div>
                      )
}
}
});
ReactDOM.render(
 <LoginForm />,
 document.getElementById("entrance-point")
);
