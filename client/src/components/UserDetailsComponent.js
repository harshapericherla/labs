import React, { Component } from 'react'
import axios from 'axios';
import MapComponent from './MapComponent';
import '../css/userdetails.css';

export default class UserDetailsComponent extends Component {

    constructor(props)
    {
       super(props);
       this.state = {
           labId: props.match.params.labId,
           lab: {},
           userState: window.storage,
           token:'',
            defaultLab:{
                latitude:0,
                longitude:0
            },
            labs:[]
       }
    }


   componentDidMount()
   {
      this.redirectIfNotAuth();
      this.getLabRecord();
   }

   redirectIfNotAuth = () =>
   {
       let appState = this.state.userState;
       if(!this.state.userState || !appState || !appState.isLoggedIn || appState.user.is_admin == 1)
       {
           this.props.history.push('/');
       }
   }

   getLabRecord = async () =>
   {
        let token = '';
        if(this.state.userState)
        { 
            token = this.state.userState.user.auth_token;
            this.setState({token:token})
            let res = await axios.get(`${process.env.REACT_APP_URL}/getLab?token=${token}&labId=${this.state.labId}`);
            if(res.data.status == 200)
            {
                let lab = res.data.lab;
                let labs = this.state.labs;

                labs.push(lab);
                let defaultLab = this.state.defaultLab;
                defaultLab.latitude = parseFloat(lab.latitude);
                defaultLab.longitude = parseFloat(lab.longitude);

                this.setState({lab,defaultLab,labs});
            }
        }
   }


   navigateToUser = () => {
       this.props.history.push('/user');
   }

    render() {

        let renderHtml = 'Loading...';
        let lab = this.state.lab;
        if(Object.keys(lab).length > 0)
        {
            renderHtml = 
            <div id="detailsDiv">
                <div id="details">
                    <button type="button" id="backBtn" className="btn btn-secondary" onClick={this.navigateToUser}>Back</button>
                    <div className="contentGroup">
                         <div className="label">Title</div>
                         <div className="value">{lab.title}</div>
                    </div>
                    <div className="contentGroup">
                         <div className="label">Category</div>
                         <div className="value">{lab.category}</div>
                    </div>
                    <div className="contentGroup">
                         <div className="label">Address</div>
                         <div className="value">{lab.address}</div>
                    </div>
                    <div className="contentGroup">
                         <div className="label">City</div>
                         <div className="value">{lab.city}</div>
                    </div>
                    <div className="contentGroup">
                         <div className="label">Country</div>
                         <div className="value">{lab.country}</div>
                    </div>
                </div>
                <div id="map">
                     <MapComponent zoom="11"{...this.state} />
                </div>
            </div>
        }

        return (
            <div>
               {renderHtml}
            </div>
        )
    }
}
