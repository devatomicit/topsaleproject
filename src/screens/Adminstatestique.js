import React,{useEffect,useState} from 'react'
import {Container,Card,Row,Col} from 'react-bootstrap'
import {stat} from '../services/profileService'
import Loader from '../components/Loader'
export default function Adminstatestique() {
  const [state, setstate] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    stat()
    .then(res =>{
      setIsLoading(false)
      if(res.data.success)
      setstate(res.data.data.stats) 
    })
    .catch(err=> {console.log(err);
      setIsLoading(false)})
  }, [])
    return (
      <Container className="mt-5">
        <Loader isLoading={isLoading}>
        <Row>
          {state.map((el,i) => {return (
        <Col md={4}> 
  <Card
    bg={"lieght"}
    text={ 'dark'}
    className="mb-2"
  >
    <Card.Header>{el.key_en}</Card.Header>
    <Card.Body>
      <Card.Title>{el.value}  </Card.Title>
    </Card.Body>
  </Card>
 
</Col>
)}
          )
          }

        </Row>
        </Loader>
        </Container>
    )
}
