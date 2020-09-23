import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  CustomInput,
  List,
  ButtonGroup
} from "reactstrap";
import "./styles/styles.css";
import { updateRoom } from "./utils/updateRoom";
import { getRoom } from "./utils/getRoom";
import axios from 'axios';

function App() {
  const [data, setData] = useState([])
    

  

  
   

  
    return (
      <div className="button_group">
        
        Queue Rooms
        <ModalExampleB room="1" />
        <div></div>
        <ModalExampleB room="2" />
        <div></div>
        <ModalExampleB room="3" />
        <div></div>
        <ModalExampleB room="4" />
        <div></div>
        <ModalExampleB room="5" />
        <div></div>
        <ModalExampleB room="6" />
        <div></div>
        <ModalExampleB room="7" />
        <div></div>
        <ModalExampleB room="8" />
        <div></div>
        <ModalExampleB room="9" />
        <div></div>
        <ModalExampleB room="10" />
      </div>
    );
  }

 
const ModalExampleA = (props) => {
  const { buttonLabel, userId, className, state, name } = props;
  console.log(userId);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [cSelected, setCSelected] = useState([]);
  const [rSelected, setRSelected] = useState(null);
  function changeRoom(userId, room) {
    console.log(room);
    console.log(userId);
    console.log(updateRoom(userId, room));
  
  }
  const onCheckBoxBtnClick = (selected) => {
    const index = cSelected.indexOf(selected);
    if (index < 0) {
      cSelected.push(selected);
    } else {
      cSelected.splice(index, 1);
    }
    setCSelected({...cSeelected});
  }
  return (
    <div>
      <Button color="primary" onClick={toggle} className="custom-button-style">
        Move {name}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add Candidate to Queue</ModalHeader>
        <ModalBody>
        <ButtonGroup>
        <Button color="primary" onClick={() => setRSelected(1)} active={rSelected === 1}>Room 1</Button>
        <Button color="primary" onClick={() => setRSelected(2)} active={rSelected === 2}>Room 2</Button>
        <Button color="primary" onClick={() => setRSelected(3)} active={rSelected === 3}>Room 3</Button>
        <Button color="primary" onClick={() => setRSelected(4)} active={rSelected === 4}>Room 4</Button>
        <Button color="primary" onClick={() => setRSelected(5)} active={rSelected === 5}>Room 5</Button>
        </ButtonGroup><ButtonGroup>
        <Button color="primary" onClick={() => setRSelected(6)} active={rSelected === 6}>Room 6</Button>
        <Button color="primary" onClick={() => setRSelected(7)} active={rSelected === 7}>Room 7</Button>
        <Button color="primary" onClick={() => setRSelected(8)} active={rSelected === 8}>Room 8</Button>
        <Button color="primary" onClick={() => setRSelected(9)} active={rSelected === 9}>Room 9</Button>
        <Button color="primary" onClick={() => setRSelected(10)} active={rSelected === 10}>Room 10</Button>
      </ButtonGroup>
      <p>Selected: {rSelected}</p>
      
      <Button onClick={() => changeRoom(userId, rSelected)}>Submit Change </Button>
      
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Exit
          </Button>{" "}
          
        </ModalFooter>
      </Modal>
    </div>
  );
};




const ModalExampleB = (props) => {
  const [datum, setData] = useState([])
  const { buttonLabel, room, className, state } = props;
  let jsonData;
  let a = [];
  const getmydata = async () =>{
  const mydata = await axios.get(
    `http://localhost:3000/sortByTime/${room}`
  )
  .then(resp => {
    
    
    return resp.data.user;
  })
  setData(mydata);
  
  
  
  
  //console.log(mydata.user[0]);
  
  return(mydata);
  

};

useEffect( async () => {
  
  getmydata();
  
  
},[])
   


  

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" onClick={toggle} className="custom-button-style">
        Room {room}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          Edit Queue for Room {props.room}
        </ModalHeader>
        <ModalBody>
          <ul>
            <div>Users in Room</div>
            {
              datum!=='undefined' && datum.length>0 &&
              datum.map((b) => (
                
              <li><ModalExampleA userId = {b.id} name={b.candidate.name}/></li>
              ))
            }
          </ul>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Exit
          </Button>{" "}
          
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default (ModalExampleB, ModalExampleA);

ReactDOM.render(<App />, document.getElementById("root"));
