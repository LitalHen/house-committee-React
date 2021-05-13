import React from 'react'
import { Button, Container, Form, Jumbotron, Table } from 'react-bootstrap';
// import { v4 as uuid } from 'uuid';

class TenantsAccount extends React.Component{
    constructor(props){
        super(props);
        
        this.state={
            name:'',
            email:'',
            aptNumber:'',
            errMessage:''
        }
        
    }
    
    formInput = (key,val) => {
        
        this.setState({
            [key]:val
        })
    }
    
    addTenants = () =>{

        const userExist=this.props.buildingUsers.find((user) => {
            return parseInt(this.state.aptNumber) === parseInt(user.aptNumber)
        })
        
        if (userExist){
            this.setState({
                    errMessage :"user already exist, check tenants list"
                });
                return 
            }
            else{

                this.setState(
                    {
                        errMessage :''
                    })
                    
                }
        
        const newUserObj={

            name: this.state.name,
            email: this.state.email,
            aptNumber: this.state.aptNumber,
            owner: false,
            pwd:'123'
            // pwd: uuid()
        }

        this.props.addUser(newUserObj)
        
        this.setState={
            name:'',
            email:'',
            aptNumer:'',
            
        }
        
    }
    
    render(){
                 
                const tenantsTable=this.props.buildingUsers.map((tenant) => {
                    
                    return  <tr>
                    <td>{tenant.aptNumber}</td>
                    <td>{tenant.name}</td>
                    <td>{tenant.email}</td>
                    <td>{tenant.pwd}</td>
                    </tr>
                })
            
                return(     
                    <Container>
                    <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={this.state.name} onChange={(event)=>{this.formInput("name",event.target.value)}}placeholder="Enter full name" />
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" onChange={(event)=>{this.formInput("email",event.target.value)}}placeholder="Enter Email" />
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Apartement Number</Form.Label>
                        <Form.Control type="text" onChange={(event)=>{this.formInput("aptNumber",event.target.value)}}placeholder="Enter apartement number" />
                    </Form.Group>
                    
                    <Button variant="success" type="button" onClick={this.addTenants}>create tenant account!</Button>
                    </Form>

                    <div style={{color:"red"}}>
                        {this.state.errMessage}
                     </div>
                  
                        <Jumbotron>
                            <h1>All Tenants Users</h1>
                      </Jumbotron>
                    <Table>
                        <thead>
                            <td>Appartment number</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Password</td>
                        </thead>
                        <tbody>
                             {tenantsTable}
                        </tbody>
                    </Table>
                </Container>
                    
                    
                    )
                    
                }       
            }
            
            export default TenantsAccount