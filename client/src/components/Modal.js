import React, { Component } from 'react'
import '../css/modal.css';

export default class Modal extends Component {

    constructor(props)
    {
       super(props);
      
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#myModal${this.props.id}`}>
                     Details
                </button>
                <div className="modal fade" id={`myModal${this.props.id}`}>
                    <div className="modal-dialog" style={{width:'1000px'}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{this.props.title}</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                             <div><label style={{fontWeight:"bold"}}>Category: </label>{this.props.category}</div>
                             <div><label style={{fontWeight:"bold"}}>Address: </label>{this.props.address}</div>
                             <div><label style={{fontWeight:"bold"}}>City: </label>{this.props.city}</div>
                             <div><label style={{fontWeight:"bold"}}>Country: </label>{this.props.country}</div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                    </div>
                </div>
          </div>
        )
    }
}
