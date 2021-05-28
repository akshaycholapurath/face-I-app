import React, {Component} from 'react';


class Signin extends Component{

    constructor(props){
        super(props);
        this.state={
          email:"",
          password:""
        }
      }

    onEmailChange=(event)=>{
        this.setState({email:event.target.value})
    }

    onPasswordChange=(event)=>{
        this.setState({password:event.target.value})
    }

    onSubmitSignin = ()=>{
        const {email,password} = this.state;
        if(!email||!password){
            return alert("Please fill up the sign-in form")
        }
        fetch('https://face-i-appserver.herokuapp.com/signin',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                email,
                password
            })
        })
            .then(res=>res.json())
            .then(user=>{
                if(user.id){
                    this.props.loadUser(user);
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
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    onChange={this.onEmailChange}
                                    name="email-address" 
                                    id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    onChange={this.onPasswordChange}
                                    name="password"  
                                    id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                     <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in" 
                            onClick={this.onSubmitSignin} />
                    </div>
                    <div className="lh-copy mt3 shadow-5">
                      <p onClick={()=>this.props.onRouteChange("register")} className="f4 link dim black db pointer">Register</p>
                    </div>
                </div>
            </main>
        </article>
          
    </div>
      
    );
    }
}

export default Signin;