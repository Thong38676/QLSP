import React, {Component} from 'react';
import axios from 'axios';
import Wrapper from './layout_admin/wrapper.js';
import Banner from './layout_admin/banner.js';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class ProductList extends Component {
	constructor(props){
        super(props)
        this.state = {
           contacts : [],
        }
    }

    componentDidMount(){
      axios({
        method: 'GET',
        url :'http://localhost:3000/contacts',
        data : null
      }).then(res =>{
        console.log(res);
        this.setState({
          contacts :res.data
        });
      }).catch( err =>{
        console.log(err);
      });
    }  

    findIndex =(contacts, id) =>{
        var {contacts} = this.state;
        var result = -1;
        contacts.forEach((contact, index) =>{
            if(contact.id === id){
                result =index;
            }
        });
        return result;
    }
    onChange = (event) =>{
      var target = event.target;
      var name = target.name;
      var value = target.value;
      this.setState({
        [name] : value
      });
    }
 



 render() {
 	var { contacts,keyword } = this.state;
  	return (
  		<React.Fragment>
  		<div>
        <div id="wrapper">
          <Wrapper />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="contentt">
           <Banner />      	        	 
  			<table className="table table-bordered table-hover mt-6 ml-5">
                  <thead>
                    <tr>
                      <th className="text-center">STT</th>
                      <th className="text-center">Tên chủ phản hồi</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">Nội dung</th>
                      <th className="text-center">Trạng thái</th>
                      <th className="text-center">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.contacts.map((contact,index) => {
                                return < Item key={index} index ={index} contact={contact}/>
                       	})}
                  </tbody>
           	</table>

            </div>
          </div>
        </div>
      	</div>
        </React.Fragment>   	
   		);
	}
}

class Item extends Component {
   onUpdate = (id) =>{
    this.props.onUpdate(id);   
  }
    render() {
    	var { contact , index} = this.props;
        return (
          		  <tr>
                      <td>{index + 1}</td>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.messages}</td>
                      <td className="text-center">
                        <span className={ contact.status === '' ? 'badge badge-danger' : 'badge badge-success'}>
                        	{ contact.status === ''  ? 'Chưa xác nhận' : 'Xác nhận'}
                        </span>
                      </td>
                      <td className="text-center">
        				        <NavLink to={`/contacts/${this.props.contact.id}/contactdetail`}><button type="button" className="btn btn-primary ml-1">Chi tiết</button></NavLink>
                      </td>
                </tr>

        );
    }
}
export default ProductList;