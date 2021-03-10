import React,{useState, useEffect} from 'react'
import { Modal, Button,Form,Row,Col,Table,ListGroup} from 'react-bootstrap'
import axios from 'axios'
import Schedule from './components/Schedule'
import Loader from './components/Loader'
const App = () => {
  const [showModal, setShow] = useState(false);
  const [email, setemail] = useState('')
  const [success,setsuccess]=useState("")
  const [schedule,setschedule]=useState([])
  const [loading,setLoading]=useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)
  const [failedemails, setfailedEmails]=useState([])
  const [viewemail,setviewemail]=useState(false)

  const handleCreate = async() => {
    try{
    const { data } = await axios.post(
      '/api/users/schedule',
      {email },

    )
    console.log(data)
    } catch(error){ console.log(error.response && error.response.data.message
    ? error.response.data.message
    : error.message)}
    setShow(false)
  } 


  const handleView = async()=>{
     setLoading(true)
     try{
      const { data } = await axios.get(
        '/api/users/schedule',
      
      )
      
      setschedule(data)
      setviewemail(true)
      setLoading(false)
      setfailedEmails([])
      console.log(schedule)
     }catch(error){ console.log(error.response && error.response.data.message
      ? error.response.data.message
      : error.message)}
  }

const handleSendEmail=async()=>{
  setsuccess(true)
  setTimeout(() => {
    setsuccess(false)
  }, 2000);
  try{
    const { data } = await axios.post(
      '/api/users/sendEmail',

    )
 
    } catch(error){ console.log(error.response && error.response.data.message
    ? error.response.data.message
    : error.message)}
  } 

  const handledelete=async(id)=>{
    try{
      const { data } = await axios.delete(
        `/api/users/schedule/${id}`,
      )
      handleView()
      } catch(error){ console.log(error.response && error.response.data.message
      ? error.response.data.message
      : error.message)}
    } 

 const handlefailedEmails= async()=>{
 
     try{
      const { data } = await axios.get(
        '/api/users/failedEmails',
      
      )
      
      setfailedEmails(data)
      setviewemail(false)
      console.log(data)
     }catch(error){ console.log(error.response && error.response.data.message
      ? error.response.data.message
      : error.message)}
  
 }


  return (
    <>
    <center>
    <h2>Email Scheduler</h2></center>

<div class="container">
  <div class="row justify-content-md-center">
    <div class="col col-lg-2">
    <Button type='button' variant='primary' onClick={handleShow}>
  Add Email Address
 </Button>
    </div>
    <div class="col-md-auto">
    <Button type='button' variant='primary' onClick={handleView}>
   View email Address
 </Button>
    </div>
    <div class="col col-lg-2">
    <Button type='button' variant='primary' onClick={handleSendEmail}>
   Send emails
 </Button>
    </div>
    <div class="col col-lg-2">
    <Button type='button' variant='primary' onClick={handlefailedEmails}>
   failed emails
 </Button>
    </div>

  </div>{success ? 
  <div class="alert alert-success" role="alert">
  Email sent
</div>:""}
</div>


      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Email Address</Modal.Title>
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
          <Button variant="primary" onClick={handleCreate}>
           Create
          </Button>
        </Modal.Footer>
      </Modal>


      {loading ? (
      <Loader />
    ) :
    schedule.length>0 && viewemail? (
      <>
      <h1>List of schedules</h1>
      
      <Row>
      <Table style={{paddingLeft:'100px'}}>
          <thead>
            <tr>
              <th>Email address</th>
             
            </tr>
          </thead>
        {schedule.map((item) => (
          
          <Schedule item={item}  handledelete={handledelete} handleview={handleView} />
                
        ))}
          </Table>
      </Row></>): ""}


          { failedemails.length>0 ? 
          failedemails.map((item)=>(
            <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{item.emailAddress}</h3>
                </ListGroup.Item></ListGroup>
          ))
                : failedemails.message ? <h3>{failedemails.message}</h3>:""}

 </>
  )
}

export default App
