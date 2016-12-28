
var Header = React.createClass({
 render() {
   return (
     <h1>Web App - Login</h1>
   )
 }
});
 var state
var LoginForm = React.createClass({

 getInitialState() {
  return {action: 'login',err : '',addList:''}
},
 ValidateLogin() {
   var email = this.refs.LoginEmail.state.value;
   var password = this.refs.LoginPassword.state.value;
   var params ={username: email,password:password};
   var xhttp = new XMLHttpRequest();
   var updateState = this.setState.bind(this);
   console.log('state is', this.state)
   xhttp.onreadystatechange = function(res) {
    if (this.readyState == 4 && this.status == 200) {
        //console.log('before update', JSON.parse(res.target.response), JSON.parse(res.target.response).username)
        if(JSON.parse(res.target.response).username){
        //  updateState({action:'success'})
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
          updateState({err:'Failure!!!'})
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

 },
 render() {
    console.log('inside render')
  switch(this.state.action){
  case 'login':
             return (
               <div className="loginDiv">
                 <Header />
                 <LoginEmail ref="LoginEmail"/>
                 <br></br>
                 <LoginPassword ref="LoginPassword"/>
                 <br></br>
                 <LoginSubmit ValidateLogin={this.ValidateLogin}/>
                 <p>{this.state.err}</p>
               </div>
             )
  case 'success':
               var list = this.state.addList.filter(element => element.flag == 0)
               var edit = this.state.addList.filter(element => element.flag == 1)

               var obj = []

               var obj1 = []
                var validate = this.ValidateLogin()
               var carrier = []
               list.forEach(function(element){
                  obj.push(<tr><td>{element.carrier}</td><td><AddComponet ValidateLogin={validate} carrier = {element.carrier} ef="AddComponet"/></td></tr>)

               })
               edit.forEach(function(element){
                  obj1.push(<div><EditComponet carrier={element.carrier} username={element.username} password={element.password} ref="EditComponet"/><p class="indent"></p></div>)

               })


               return (
               <div className="loginDiv">

               <table>
                 <thead>
                   <tr>
                      <td><b><u>Carrier</u></b> </td>
                      <td><center><b><u>Credential</u></b></center></td>
                   </tr>
                </thead>

                 <tbody>
                   {obj}
                   </tbody>
        </table>

        <table>
          <thead>
            <tr>
               <td><b><u>Carrier</u></b> </td>
               <td><center><b><u>Credential</u></b></center></td>
            </tr>
         </thead>

          <tbody>
            {obj1}
            </tbody>
      </table>

               </div>
               )
}
}
});

var LoginEmail = React.createClass({
 getInitialState() {
 console.log('inside initialstate')
   return {value: null}
 },
 onChange(e) {
   this.setState({value: e.target.value});
 },
 render() {
   return (
     <div className="LoginEmailDiv">
       <label/>Email: <input type="text" onChange={this.onChange}/>
       </div>
   )
 }
});

var AddComponet = React.createClass({
getInitialState() {
  return {username: null,password:null}
},
onChangeUsername(e) {
  this.setState({username: e.target.value});
},
onChangePassword(e) {
  this.setState({password: e.target.value});
},
onClick() {
var user = this.state.username;
console.log('username is--------', user);
var password = this.state.password;
console.log('pasword is--------', password);
var carrier = this.props.carrier
console.log(carrier)
var result ={username: user,password:password,carrier:carrier};
console.log('result is---',result);
var httpInsert = new XMLHttpRequest();
httpInsert.onreadystatechange = function(res) {
 if (this.readyState == 4 && this.status == 200) {
   this.props.ValidateLogin;
 }
 }
httpInsert.open("POST", "/add", true);
httpInsert.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
httpInsert.send(JSON.stringify(result));

},
render(){
  return(
     <div>

     <input type="text" onChange={this.onChangeUsername}/>

      <input type="password" onChange={this.onChangePassword}/>

      <button onClick={this.onClick}>Add</button>
      <p class="indent"></p>
     </div>
  )
}
});

var EditComponet = React.createClass({

onClick() {
  console.log("reached here")
},
render(){
  return(
     <div>
     <tr>
     <td><label/>{this.props.carrier}</td>
     <td><label/>{this.props.username}</td>
     <td><label/>{this.props.password}</td>
     <td><button onClick={this.onClick}>Edit</button></td>

     </tr>
     </div>
  )
}
});


var LoginPassword = React.createClass({
 getInitialState() {
   return {value: null}
 },
 onChange(e) {
   this.setState({value: e.target.value});
 },
 render() {
   return (
     <div className="LoginEmailDiv">
       <label/>Password :<input type="password" onChange={this.onChange}/>

     </div>
   )
 }
});

var LoginSubmit = React.createClass({
 onClick() {
   this.props.ValidateLogin();
 },
 render() {
   return (
     <button onClick={this.onClick}>Login</button>
   )
 }
});


ReactDOM.render(
 <LoginForm />,
 document.getElementById("entrance-point")
);
