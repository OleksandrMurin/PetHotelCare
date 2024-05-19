import React from 'react';
import { IoCloseCircleSharp, IoHammerSharp } from 'react-icons/io5';
import AddUser from './AddUser';

class User extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            editForm: false
        }
    }
    render(){
      return(
        <div className='user'>
            <IoCloseCircleSharp className='delete-icon' onClick={() => this.props.onDelete(this.props.user.id)}/>
            <IoHammerSharp className='edit-icon' onClick={() => this.setState({editForm: !this.state.editForm})}/>
            <h3>{this.props.user.fname} {this.props.user.lname}</h3>
            <p>{this.props.user.age}</p>
            <b>{this.props.user.isHappy ? 'That gay is happy' : 'That guy is imposter'}</b>
            {this.state.editForm && <AddUser user = {this.props.user} onAdd={this.props.onEdit}/>}
            </div>
      )
    }
}

export default User