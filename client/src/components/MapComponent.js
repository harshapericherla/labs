import React, { Component } from 'react';
import {GoogleMap,withScriptjs,withGoogleMap,Marker,InfoWindow} from 'react-google-maps';

export default class MapComponent extends Component {

    constructor()
    {
        super();
        this.state = {
            delat:0,
            delng:0,
            defaultZoom:2
        }
    }

    static defaultProps = {
        googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`
    }

    componentDidMount()
    {
         this.assignDefaultPosition();
    } 

    componentWillReceiveProps(props)
    {
         this.assignDefaultPosition();
    }

    CMap = withScriptjs(withGoogleMap(props =>
        {
            return (
               <GoogleMap zoom = {props.positionMap.defaultZoom} center = {{lat:props.positionMap.delat,lng:props.positionMap.delng}}>
                    {props.children}
               </GoogleMap>
            );
        }
      ));

    assignDefaultPosition = () =>  
    {
        let lab = this.props.defaultLab;
        let zoom = this.props.zoom;
        if(lab)
        {
            let lat  = parseFloat(lab.latitude);
            let lng =  parseFloat(lab.longitude);

            if(!zoom)
            {
                zoom = 2;
            }
            this.setState({delat:lat,delng:lng,defaultZoom:parseInt(zoom)});
        }
    }


    render() {

        return (
            <div style={{marginBottom:"3%"}}>
                 <div>   
                         <this.CMap 
                             googleMapURL={this.props.googleMapURL}
                             loadingElement={<div style={{ height: `500px`,width:'100%',margin:'auto' }} />}
                                     containerElement={<div style={{ height: `500px`,width:'100%',margin:'auto' }} />}
                                     mapElement={<div style={{ height: `500px`,width:'100%',margin:'auto' }} />}
                                     positionMap={this.state}
                         >
                        {  
                            this.props.labs.map( lab => (
                                <Marker 
                                key = {lab.id}
                                position = {{lat:parseFloat(lab.latitude),lng:parseFloat(lab.longitude)}}
                                />
                            ))
                        }
                         </this.CMap>
                 </div>
            </div>
         );
    }
}
