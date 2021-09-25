
import react from 'react';
import './App.css';
import UserStore from './stores/UserStore';
import LoginForm from './LoginForm';
import InputField from './InputField';
import SubmitButton from './SubmitButton';

class App extends react.Component{

  async componentDidMount(){

    try{
      let res = await fetch('/isLoggedIn',{
        method: 'post',
        headers:{
          'Accept': 'application/json',
          'Content-type': 'applicaiton/json'
        }
      });

      let result = await res.json();

      if(result && result.success){
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      }
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

  async doLogout(){

    try{
      let res = await fetch('/logout',{
        method: 'post',
        headers:{
          'Accept': 'application/json',
          'Content-type': 'applicaiton/json'
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
      return (
        <div className="App">
        
        </div>
      );
    }
  }
}

export default App;
