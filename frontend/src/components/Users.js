import React from 'react';
import User from './User';

class Users extends React.Component{
    render(){
      return(
      <div>
        {this.props.users.map((el) =>
            (
                <User key = {el.id} user = {el} onDelete = {this.props.onDelete} onEdit ={this.props.onEdit}/>
            )
        )}
      </div>    
      )
    }
}

export default Users