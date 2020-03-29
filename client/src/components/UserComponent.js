import React, { Component } from 'react'
import axios from 'axios';
import '../css/user.css';
import UserDetailsComponent from './UserDetailsComponent';

export default class UserComponent extends Component {

    constructor()
    {
        super();
        this.state ={
            userState: window.storage,
            token: '',
            labs: [],
            searchLabs: [],
            message: ''
        }
    }

    componentDidMount()
    {
          this.redirectIfNotAuth();
          this.getLabRecords();
    }

    redirectIfNotAuth = () =>
    {
        let appState = this.state.userState;
        if(!this.state.userState || !appState || !appState.isLoggedIn || appState.user.is_admin == 1)
        {
            this.props.history.push('/');
        }
    }

    getLabRecords = async () =>
    {
        let token = '';
        if(this.state.userState)
        { 
            token = this.state.userState.user.auth_token;
            this.setState({token:token})
            let res = await axios.get(`${process.env.REACT_APP_URL}/labs?token=${token}`);
            let labs = res.data.labs;
            this.setState({labs,searchLabs:labs})
        }
    }

    openGoogleMaps = (lab) =>
    {
        let url =`https://www.google.com/maps/search/?api=1&query=${lab.latitude},${lab.longitude}`;
        window.open(url, "_blank");
    }


    logout = () => {
        window.storage = {};
        this.props.history.push('/');
    }


    filterRecords = (event) => {
         let input = event.target.value.trim();
         let labs = this.state.labs;

         let isFound = false;
         labs = labs.filter( (lab) => { 
              isFound = false;
              Object.keys(lab).forEach( (key) => {
                   let value = lab[key] || '';
                   value = value == null ? '' : value.toString();
                   if(input === '' || value.toLowerCase().includes(input.toLowerCase()))
                   {
                       isFound = true;
                       return;
                   }
              });
              if(isFound)
                 return true;
              return false;
         });

         if(labs.length == 0)
         {
            this.setState({searchLabs:labs,message:'No records Found'});
         }
         else
         {
            this.setState({searchLabs:labs,message: ''});
         }
    }

    navigateToDetails(lab)
    {
        this.props.history.push(`/userDetails/${lab.id}`);
    }

    render() {

        let labs = this.state.searchLabs;
        let renderHtml = 'Loading...';
        let message = this.state.message;

        if(message !== '')
        {
            renderHtml = <div className="info-msg">
                            {message}
                         </div>
        }

        if(labs && labs.length > 0)
        {
            let renderDiv = labs.map( (lab) => {
                return(
                    <div key={lab.id} className="card">
                        <div className="card-body">
                           <h5 className="card-title">{lab.title}</h5>
                           <p className="card-text">Category: {lab.category}</p>
                        </div>
                        <div className="card-footer">
                               <button type="button" className="btn btn-secondary" onClick={() => {this.navigateToDetails(lab)}}>View Details</button>
                               <button className="btn btn-success" onClick={() => {this.openGoogleMaps(lab)}}>View on Maps</button>
                        </div>
                    </div>
                );   
            });

            renderHtml = 
                <div className="card-columns">
                        {renderDiv}
                </div>
           
        }

        return (
            <div className = "container">
                
                <div className="form-group has-search">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input type="text" className="form-control" placeholder="Search for Labs" onChange={this.filterRecords}/>
                    <button className="btn btn-danger" onClick= {this.logout}>Logout</button>
                </div>
                <div>
                      {renderHtml}
                </div>    
            </div>
            
        )
    }
}
