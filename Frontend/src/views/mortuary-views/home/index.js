import { Card, Popover, Button, Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import mortuaryService from 'services/MortuaryService';

const text = <span>Title</span>;
const content = (props) => {

  function nextPage(props) {
    localStorage.setItem("cabinetNumber", props.letter + props.number)
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

const GridList = (props)=> {

  const RowSet = [];
  for (let i = 0; i < props.data.length; i += 8) {
    const rowObj = props.data.slice(i, i + 8);
    
    const rowList = [];
    for(let j = 0; j < rowObj.length; j ++){

      rowList.push(
        <Col span={3}> {rowObj[j]} </Col>
      );
    }

     RowSet.push(<Row gutter={[48, 16]}>{rowList}</Row>);

}

  return(
    <>
    {RowSet}
    </>
  )

}
const Home = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState();

  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8];


  useEffect(() => {
    mortuaryService.getOccupiedData().then((res) => {

      setData(res.payload);
      setLoading(false);

    }).catch((err) => {
      setLoading(false);
      setError(true);
      setData();
    });
  }, []);


  if (loading) {
    return (
      <>
        <center><h1>Mortuary Space Allocation</h1></center>
        <p>Data Loading</p>
      </>
    )
  }
  else if (error) {
    return (
      <>
        <center><h1>Mortuary Space Allocation</h1></center>
        <p>Error</p>

      </>
    )
  }
  else {
    const cabinetArray = [];
    for (var i = 0; i < letters.length; i++) {

      for (var j = 0; j < numbers.length; j++) {

        const spaceNumber = letters[i] + numbers[j];

        const isFound = data.find((corpse) => { return corpse.cabinet_number == spaceNumber });

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

    return (
      <>
        <center><h1>Mortuary Space Allocation</h1></center>
        <GridList data= {cabinetArray}></GridList>
      </>
    )
  }

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
