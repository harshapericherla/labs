import React, { Component } from 'react'
import axios from 'axios';
import MapComponent from './MapComponent';
import '../css/admin.css';

export default class AdminComponent extends Component {
    
    constructor()
    {
        super();
        this.state ={
            userState: window.storage,
            token: '',
            labs: [],
            userName: '',
            latitude:'',
            longitude:'',
            category:'',
            address:'',
            city: '',
            country: '',
            title:'',
            defaultLab:{
                latitude:0,
                longitude:0
            }
        }
    }

    textFieldChange = (event) => 
    {
        let name = event.target.name.trim();
        let value = event.target.value.trim();
        this.setState({[name]:value});
    }


    componentDidMount()
    {
          this.redirectIfNotAuth();
          this.getLabRecords();
    }

    redirectIfNotAuth = () =>
    {
        let appState = this.state.userState;
        if(!this.state.userState || !appState || !appState.isLoggedIn || appState.user.is_admin == 0)
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
            this.setState({token:token});
            this.setState({userName:this.state.userState.user.name});
            let res = await axios.get(`${process.env.REACT_APP_URL}/labs?token=${token}`);
            let labs = res.data.labs;
            this.setState({labs})
        }
    }

    addNewRecord = async () => {
        let labs = this.state.labs;
        let category = this.state.category;
        let address = this.state.address;
        let city = this.state.city;
        let country = this.state.country;
        let title = this.state.title;

        if(!isNaN(this.state.latitude) && !isNaN(this.state.longitude) && category && address && city && country && title)
        {
            let latitude = parseFloat(this.state.latitude);
            let longitude = parseFloat(this.state.longitude);
            let labObj = {
              latitude,
              longitude,
              category,
              address,
              city,
              country,
              title
            }
           let res = await axios.post(`${process.env.REACT_APP_URL}/labs?token=${this.state.token}`,labObj);
           let newLab = res.data.lab;
           labs.push(newLab);
           let defaultLab = this.state.defaultLab;
           defaultLab.latitude = newLab.latitude;
           defaultLab.longitude = newLab.longitude;
           this.setState({labs,defaultLab:defaultLab,latitude: '',
            longitude: '',
            category: '',
            address: '',
            city: '',
            country: '',
            title: ''});
        }
    }

    logout = () => {
        window.storage = {};
        this.props.history.push('/');
    }

    render() {
        return (
            <div className = "container">
                
                <div className="form-group">
                    <label id="label">Welcome {this.state.userName}</label>
                    <button className="btn btn-danger" onClick= {this.logout}>Logout</button>
                </div>
                <div>
                    <MapComponent {...this.state} />
                </div>   
                <div className="form2">
                    <input type="text" className="form-control" onChange={this.textFieldChange} name="title" id="formField1" value={this.state.title} placeholder="Title" />
                    <input type="text" className="form-control" onChange={this.textFieldChange} name="category" id="formField2" value={this.state.category} placeholder="Category" />
                    <input type="text" className="form-control" onChange={this.textFieldChange} name="latitude" id="formField1" value={this.state.latitude} placeholder="Latitude" />
                    <input type="text" className="form-control" onChange={this.textFieldChange} name="longitude" id="formField2" value={this.state.longitude} placeholder="Longitude" />
                    <input type="text" className="form-control" onChange={this.textFieldChange} name="address" id="formField1" value={this.state.address} placeholder="Address" />
                    <input type="text" className="form-control" onChange={this.textFieldChange} name="city" id="formField2" value={this.state.city} placeholder="City" />
                    <input type="text" className="form-control" onChange={this.textFieldChange} name="country" id="formField2" value={this.state.country} placeholder="Country" />
                    <button className="btn btn-danger" id="formField3"  onClick={this.addNewRecord}>Add New Lab</button>
                </div>
            </div>
        )
    }
}
