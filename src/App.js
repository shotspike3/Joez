
import react from 'react';
import './App.css';
import UserStore from './stores/UserStore';
import LoginForm from './LoginForm';
import SubmitButton from './SubmitButton';
import { observer } from 'mobx-react';
import joez from'./Joezdotgov.png';

class App extends react.Component{
  //methods to handle logging in and out
  async componentDidMount(){

    try{
      let res = await fetch('/isLoggedIn',{
        method: 'post',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'applicaiton/json'
        }
      });

      let result = await res.json();
      //succesful login
      if(result && result.success){
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      }
      //unsuccesful login attempt
      else{
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    }
    catch(e){
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }

  }
  //logout function
  async doLogout(){

    try{
      let res = await fetch('/logout',{
        method: 'post',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'applicaiton/json'
        }
      });

      let result = await res.json();

      if(result && result.success){
        UserStore.isLoggedIn = false;
        UserStore.isLoggedIn = '';
      }
    }
    catch(e){
      console.log(e);
    }

  }

  render(){
    //rendering logic
    //Checks if user is still loading webpage
    if(UserStore.loading){
      return(
        <div className="App">
          <div className="container">
            Loading, please wait...
          </div>
        </div>
      );
    }
    else{
      //Checks if user is logged in
      if(UserStore.isLoggedIn){
        return(
          <div className="App">
            <div className="container">
              Welcome {UserStore.username}
              <SubmitButton
                text={'Log out'}
                disables={false}
                onClick={ () => this.doLogout()}
              />

            </div>
          </div>
        );
      }
      //main page
      return (
        <div className="App">
          <div className='container'>
          <img className='joez' src={joez}/>
            <LoginForm/>
            
          </div>
        </div>
      );
    }
  }
}

export default observer(App);
