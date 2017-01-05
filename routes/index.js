var express = require('express');
var request = require('request');
var router = express.Router();
var Agent = require("../models/agent_query")
var username;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});
router.post('/login',(req,res) =>{
//   var o = {};
//   o.url = "http://localhost:3000/ ";
//   o.method = "GET";
//   o.json = true;
// console.log("res:", res);
//
//   request(o, (err, rsp, body)=>{
//     console.log('body is----' , body);
//   });


//<td><p class="indent"></p><label>password:</label><label><b>{element.password_carrier.replace(/[a-zA-Z0-9]/g,"*").replace(/[^a-zA-Z0-9]/g,'*')}</b></td><td><p class="indent"></p><EditComponet result={setResult}  carrier = {element.carrier} ref="EditComponet"/></td>
  var obj = {}
  username = req.body.username
  var password = req.body.password
  console.log("     haaa      ",username,password);
  Agent.findByName(username , (err,data) =>{
   if(data.length && data[0].user_name == username && password == data[0].password){
      console.log("success");
      obj["username"] = username
      obj["password"] = password
      res.json(obj)
   }else {

     res.json(obj)
   }
  })
})
router.get('/dashboard',function(req,res){
  Agent.findByName(username,function(err,data){
      console.log('entering in fuction');
    if(!data[0].flag){
      Agent.updateFlag(username,function(err,update){
        console.log("update",data[0].state);
        Agent.fetchCarrier(data[0].state,function(err,carriers){
              console.log("carrier",carriers);
            carriers.forEach(function(element){
                Agent.insertCredential(username,element.carrier,element.state,function(err,doc){
                   console.log("done");
                })

          })
          Agent.fetchCredential(username,function(err,credential){

            res.json(credential);
            //  console.log('credential is-------------',credential);
          })
        })
      })
      }
      else{
      Agent.fetchCredential(username,function(err,credential){

        res.json(credential);
        //  console.log('credential is-------------',credential);
      })
    }

    })
})
router.post('/add',(req,res) =>{
   console.log("comming add");
   var AgentUsername = req.body.username
  var password = req.body.password
  var carrier = req.body.carrier
  console.log("     haaahhehehehhheheheehheeh     ",AgentUsername,password, carrier);
  Agent.addCredential(AgentUsername,password,carrier,username, function(err, data){
    res.json({})
  })
})


module.exports = router;
