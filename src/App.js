import './App.css';
import React, {Component} from 'react';
import Navigation from './components/Navigation';
import Imagelink from './components/Imagelinkform';
import Rank from './components/Rank';
import Facerecog from './components/Facerecog';
import Signin from './components/Signin';
import Register from './components/Registration';
import Logo from './components/logo';
import Particles from 'react-particles-js';



const initialstate = {
  input: '',
  imageURL:'',
  box:{},
  route:'signin',
  isSignedIn:false,
  user:{
        id:"",
        name:'',
        email:'',
        entries:0,
        joined: ""
  }
}

const particlesparam={
  particles:{number:{
                      value:80,
                      density:{
                        enable:true,
                        value_area:800
                      }
                    },
              color: {
                value: "#ffffff",
              },
              opacity: {
                value: 0.4,
              },
              shape: {
                type: "circle",
              }       
            },
    interactivity: {
              detectsOn: "window",
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              }
      }     
}



class App extends Component{
  constructor(){
    super();
    this.state=initialstate;
  }

  loadUser = (user)=>{
    this.setState({user:{
            id:user.id,
            name:user.name,
            email:user.email,
            entries:user.entries,
            joined: user.joined
    }})
  }


  calculateFaceLoc = (data)=>{
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('image');
    const width = Number(image.width);
    const height = Number(image.height);

    return({
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)
    })

  }

  displayFaceBox = (data) =>{
    this.setState({box:data})
  }

  onInputChange=(event)=>{
    this.setState({input:event.target.value})
  }

  onButtonsubmit =()=>{
    this.setState({imageURL:this.state.input})
    fetch('https://face-i-appserver.herokuapp.com/imageUrl',{
              method:'post',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({
                  url:this.state.input
              })
            })
    .then(res=> res.json())
    .then(res=>{
          if(res){
            fetch('https://face-i-appserver.herokuapp.com/image',{
              method:'put',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({
                  id:this.state.user.id
              })
            })
            .then(res=>res.json())
            .then(count=>{this.setState(Object.assign(this.state.user,{entries:count}))
          })
          .catch(console.log)
          }
          this.displayFaceBox(this.calculateFaceLoc(res))
        })
    .catch(err=> console.log(err))
  }

  onRouteChange = (route)=>{
    if (route ==='signout'){
      this.setState(initialstate)
    }else if(route ==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route});
  }

  render(){
    return(
      <div className="App">
        <Particles className='particles'
                params={particlesparam} />
        
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route==='home'
          ? <div className="app-container">
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries} />
                <Imagelink 
                  onInputChange={this.onInputChange}
                  onButtonsubmit={this.onButtonsubmit}
                />
                <Facerecog box={this.state.box} imageURL={this.state.imageURL} />
            </div>
          :(
            this.state.route ==='signin'
            ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )         
        }
      </div>
    );
  }
}

export default App;
