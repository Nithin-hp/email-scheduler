import React ,{useState}from 'react'
import { Modal,Table, Form, Button, Row, Col} from 'react-bootstrap'
import axios from 'axios'

const Schedule = ({ item,handledelete,handleview }) => {
  const [showModal, setShow] = useState(false);
  const [email, setemail] = useState(item.emailAddress)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)


  const handleupdate = async() => {
    try{
    const { data } = await axios.put(
      `/api/users/schedule/${item._id}`,
      {email },
      
    )
    setShow(false)
    handleview()
    } catch(error){ console.log(error.response && error.response.data.message
    ? error.response.data.message
    : error.message)}
    setShow(false)
  } 

  return (

        <>
         <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Email Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='Email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setemail(e.target.value)}
              ></Form.Control>
            </Form.Group>


          </Form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleupdate} >
           Update
          </Button>
        </Modal.Footer>
      </Modal>
            
            <tbody>
                <tr>
                 
                  <td>{item.emailAddress}</td>
                  
                   
                  <td>
                    
                      <Button variant='light' className='btn-sm' onClick={handleShow}>
                        <i className='fas fa-edit'></i>
                      </Button>
                   
                    </td>
                   
                    <td>
                   
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={()=>handledelete(item._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                    </td>
                  
                </tr>
              
            </tbody>
     
                     
      
            </>
        
  )
}

export default Schedule
