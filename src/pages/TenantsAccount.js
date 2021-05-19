import React from 'react'
import { Accordion, Button, Card, Container, Form, Jumbotron, Table } from 'react-bootstrap';
// import { v4 as uuid } from 'uuid';

class TenantsAccount extends React.Component{
    constructor(props){
        super(props);
        
        this.state={
            name:'',
            email:'',
            aptNumber:'',
            errMessage:'',
            pwd:'Aa1234Z3'
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
                })
                return 
            }
            else{

                this.setState(
                    {
                        errMessage:''
                    })
                    
                }
        
        const newUserObj={

            name: this.state.name,
            email: this.state.email,
            aptNumber: this.state.aptNumber,
            owner: false,
            pwd:this.state.pwd
        }

        this.props.addUser(newUserObj)
        
        this.setState({
            name:'',
            email:'',
            aptNumber:'',
            
        })
        
    }
    
    render(){
                 
                const tenantsTable=this.props.buildingUsers.map((tenant) => {
                    
                    return <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Apartement number: {tenant.aptNumber}
                            </Accordion.Toggle>
                        </Card.Header>
                            <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            <h6>Tenant Name:</h6> {tenant.name}   
                            <h6>Tenant Email:</h6> {tenant.email}  
                            <h6>Tenant Password:</h6> {tenant.pwd}  
                            <h6>Tenant Apt Number:</h6> {tenant.aptNumber}    
                          </Card.Body>
                        </Accordion.Collapse>
                        </Card>
                        </Accordion>
                })
            
                return(     
                    <Container>
                    <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control  value={this.state.name} type="text" onChange={(event)=>{this.formInput("name",event.target.value)}}placeholder="Enter full name" />
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={this.state.email} type="email" onChange={(event)=>{this.formInput("email",event.target.value)}}placeholder="Enter Email" />
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Apartement Number</Form.Label>
                        <Form.Control  value={this.state.aptNumber} type="text" onChange={(event)=>{this.formInput("aptNumber",event.target.value)}}placeholder="Enter apartement number" />
                    </Form.Group>
                    <div style={{marginTop:'10px', marginBottom:'10px'}}>
                    <Button variant="success" type="button" onClick={this.addTenants}>create tenant account!</Button>
                    </div>
                    </Form>

                    <div style={{color:"red"}}>
                        {this.state.errMessage}
                     </div>
                  
                        <Jumbotron>
                           All Tenants Users
                      </Jumbotron>
                  
                        
                             {tenantsTable}
 
                </Container>
                    
                    
                    )
                    
                }       
            }
            
            export default TenantsAccount