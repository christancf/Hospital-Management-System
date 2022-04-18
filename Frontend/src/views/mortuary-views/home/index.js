import { Card, Popover, Button } from 'antd';
import mortuaryService from 'services/MortuaryService';

const text = <span>Title</span>;
const content = (props) => {

  function nextPage(props) {
    localStorage.setItem("cabinetNumber", props.letter+props.number)
    // window.location.href='/mortuary/add'
  }

  if (props.isOccupied == true) {

    return (
      <div>
        <p>OCCUPIED</p>
        <p>{props.letter}{props.number}</p>
        <Button type='primary'>More Info</Button>
        
      </div>
    )

  }
  else {
     
    return (
      <div>
        <p>{props.letter}{props.number}</p>
        <Button type='primary' onClick={nextPage(props)}>Add Corpse</Button>
      </div>
    )

  }


};

const Home = () => {

  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  const cabinetArray = []
  
  mortuaryService.getOccupiedData().then(value => {
    var response = value.payload
    for (var i = 0; i < letters.length; i++) {

      for (var j = 0; j < numbers.length; j++) {
  
        const spaceNumber = letters[i] + numbers[j];
  
        const isFound = response.find((corpse) => { return corpse.cabinet_number == spaceNumber });
  
        if (isFound == undefined) {
  
          cabinetArray.push(
            <Cabinet letter={letters[i]} number={numbers[j]} isOccupied={false}></Cabinet>
          );
        }
        else {
  
          cabinetArray.push(
            <Cabinet letter={letters[i]} number={numbers[j]} isOccupied={true}></Cabinet>
          );
  
        }
  
      }
    }
    // console.log(response)
  }
  )
console.log(cabinetArray)
  return (
    <>
      <center><h1>Mortuary Space Allocation</h1></center>
      {cabinetArray}
    </>
  )
}


const Cabinet = (props) => {
  const isOccupied = props.isOccupied
  if (isOccupied) {
    return (
      <Popover placement="bottomRight" title={text} content={content({ letter: props.letter, number: props.number, isOccupied: props.isOccupied })} arrowPointAtCenter>
        <Card style={{ width: 100, borderColor: '#ff6b72', borderWidth: '3px' }} hoverable>
          <h1 className='text-center'>{props.letter}{props.number}</h1>
        </Card>
      </Popover>
    )
  } else {
    return (
      <Popover placement="bottomRight" title={text} content={content({ letter: props.letter, number: props.number, isOccupied: props.isOccupied })} arrowPointAtCenter>
        <Card style={{ width: 100, borderColor: 'green', borderWidth: '3px' }} hoverable>
          <h1 className='text-center'>{props.letter}{props.number}</h1>
        </Card>
      </Popover>
    )
  }


}
export default Home;
