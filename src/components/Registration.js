import React, {Component} from 'react';


class Register extends Component{

    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
            name:""
        }
      }
    
    
      onEmailChange=(event)=>{
        this.setState({email:event.target.value})
    }

    onPasswordChange=(event)=>{
        this.setState({password:event.target.value})
    }

    onNameChange=(event)=>{
        this.setState({name:event.target.value})
    }

    onRegister = ()=>{
        const {email,password,name} = this.state;
        if(!email||!password||!name){
            return alert("Please fill up the form")
        }
        fetch('http://localhost:3001/register',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                email,
                password,
                name
            }) 
        })
            .then(res=>res.json())
            .then(user=>{
                if(user.id){
                    this.props.loadUser(user)
                    this.props.onRouteChange("home");
                }
            })
            .catch(err=>alert("Invalid credentials"))  
    }

    render(){  
    return(
    <div >
        <article className=" br3 ba dark-gray shadow-5 b--black-10 mv4 w-100 w-50-m w-25-1 mw6 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="text" 
                                    onChange={this.onNameChange}
                                    name="name"  
                                    id="name" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    onChange={this.onEmailChange}
                                    id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    onChange={this.onPasswordChange}
                                    id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                     <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register" 
                            onClick={this.onRegister} />
                    </div>
                    
                </div>
            </main>
        </article>
          
    </div>
      
    );
    }
}

export default Register;