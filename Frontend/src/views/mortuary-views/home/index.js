
import { Card, Popover } from 'antd';


const text = <span>Title</span>;
const content = (props) => {

  if (props.isOccupied == true) {

    return (
      <div>
        <p>OCCUPIED</p>
        <p>{props.letter}{props.number}</p>
        <button>More Info</button>
      </div>
    )

  }
  else {

    return (
      <div>
        <p>{props.letter}{props.number}</p>
        <button>Add Corpse</button>
      </div>
    )

  }


};

const Home = () => {

  const letters = ['A', 'B','C','D','E','F'];
  const numbers = [1,2,3,4,5,6,7,8,9];
  const response = [
    {
      number: 'A1',
      NIC : '200013400692',
      Name : 'Susith Rupasinghe'
    },
    {
      number: 'A2',
      NIC : '8873783838738V',
      Name : 'Gotabaya Rajapakshe'
    }
  ]
  
  const cabinetArray = []
  for(var i=0; i<letters.length; i++){

    for(var j=0; j<numbers.length; j++){

      const spaceNumber = letters[i] + numbers[j];

      const isFound = response.find( (sayumi) => {  return sayumi.number == spaceNumber  } );

      if( isFound == undefined){

        cabinetArray.push(
          <Cabinet letter={letters[i]} number={numbers[j]} isOccupied={false}></Cabinet>
        );
      }
      else{

        cabinetArray.push(
          <Cabinet letter={letters[i]} number={numbers[j]} isOccupied={true}></Cabinet>
        );

      }

    }
  }

  return (
    <>
      <center><h1>Mortuary Space Allocation</h1></center>
      {cabinetArray}
    </>
  )
}


const Cabinet = (props) => {

  return (
    <>
      <Popover placement="bottomRight" title={text} content={content({ letter: props.letter, number: props.number , isOccupied: props.isOccupied})} arrowPointAtCenter>
        <Card style={{ width: 100, borderColor: '#ff6b72', borderWidth: '3px' }} hoverable>
          <h1 className='text-center'>{props.letter}{props.number}</h1>
        </Card>
      </Popover>
    </>
  )

}
export default Home;
