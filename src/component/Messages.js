import React from 'react'
import { Button, Form } from 'react-bootstrap';

class Messages extends React.Component{

    constructor(props){
        super(props);

        this.state={
            title:'',
            description:'',
            priority:''
        }
    }

    formInput = (key,val) => {
       this.setState({
           [key]:val
       })
    }

    submitMessage = () => {
        const newMessage={
            title: this.state.title,
            description: this.state.description,
            priority: this.state.priority
        }
        
        addMessage(newMessage)
        this.setState({
            title:'',
            description:'',
            priority:''
        })
    }
    
render(){
    return(
        <div>
             <Form>
                <Form.Group controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                    <Form.Control type="text" onChange={(event)=>{this.formInput("Title",event.target.value)}}placeholder="Enter title" />
                </Form.Group>
                
                <Form.Group controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control  as="textarea" rows={3} type="text" onChange={(event)=>{this.formInput("Description",event.target.value)}}placeholder="Enter description" />
                </Form.Group>

                <Form.Group controlId="formBasicPriority">
                    <Form.Label>Priority</Form.Label>
                    <Form.Control as="select" value={this.state.value} onChange={(event)=>{this.formInput("Description",event.target.value)}}>
                      <option value="">select priority</option>
                      <option value="important">Important</option>
                      <option value="info">Info</option>
                    </Form.Control>
                </Form.Group>

                <Button type="button" onClick={this.submitMessage}></Button>
                </Form>

                {this.state.value}
        </div>
    )
}
    
}

export default Messages