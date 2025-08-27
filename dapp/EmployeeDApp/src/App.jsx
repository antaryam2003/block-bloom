import { useState } from 'react'
import { Contract,BrowserProvider } from 'ethers'
import { abi, contractAddress } from './Employee.json'
import './App.css';



function App() {
  const [output, setOutput] = useState("")
  const [queryID, setQueryID] = useState(0)

  const [Data, setData] = useState({
    id:0,
    name:"",
    gender:"",
    role:"",
    date_of_joining:"",
    email:""
  })
  
  const provider = new BrowserProvider(window.ethereum)

  const connectMetamask = async () => {
    const signer = await provider.getSigner()

    alert(`Connected to Metamask with address: ${signer.address}`)
  }

  const resetData = () => {
    setData({
      id:0,
      name:"",
      gender:"",
      role:"",
      date_of_joining:"",
      email:""
    })
  }

  const handleSubmit = async (event)=>{
    event.preventDefault()

    const signer = await provider.getSigner()
    const instance = new Contract(contractAddress, abi, signer)

    const existingEmployee = await instance.Employee_details(Data.id);
    console.log(existingEmployee)
    if (existingEmployee && existingEmployee[0] !== "") {
      alert(`Employee with ID ${Data.id} already exists!`)

      return; // Prevent creating a new employee
    }

    const trx = await instance.issue(Data.id, Data.name, Data.gender, Data.role, Data.date_of_joining, Data.email)
    console.log('Transaction Hash:', trx.hash)
  }

  const getEmployee = async () => {

    const signer = await provider.getSigner()
    const instance = new Contract(contractAddress, abi, signer)

    const result = await instance.Employee_details(queryID)
    console.log(result)
    if((!result) || (result && result[0]==="")){
      setOutput(`Employee with ID ${queryID} doesn't exist!`)
      
    }
    else {
      setOutput(`Name: ${result[0]}, Gender: ${result[1]}, Role: ${result[2]}, Date of joining: ${result[3]}, Email: ${result[4]}`)
    }
  }

  return (
    <>
        <div className="center-container">

          <h1>Employee Search</h1>
          <button onClick={connectMetamask}>Connect to Metamask</button>
          <form onSubmit={handleSubmit}>
            <div>
              <label>ID:</label>
              <input type="number" value={Data.id} onChange={(e) => setData({ ...Data, id: e.target.value })} />
              <br />
              <label>Name:</label>
              <input type="text" value={Data.name} onChange={(e) => setData({ ...Data, name: e.target.value })} />
              <br />
              <label>Gender:</label>
              <input type="text" value={Data.gender} onChange={(e) => setData({ ...Data, gender: e.target.value })} />
              <br />
              <label>Role:</label>
              <input type="text" value={Data.role} onChange={(e) => setData({ ...Data, role: e.target.value })} />
              <br />
              <label>Date of joining:</label>
              <input type="date" value={Data.date_of_joining} onChange={(e) => setData({ ...Data, date_of_joining: e.target.value })} />
              <br />
              <label>Email:</label>
              <input type="text" value={Data.email} onChange={(e) => setData({ ...Data, email: e.target.value })} />
            </div>
            <div>
              <button type="submit">Submit</button>
              <button type="button" onClick={resetData}>Reset</button>
            </div>
          </form>
          <div>
            <label>ID:</label>
            <input type="number" value={queryID} onChange={(e) => setQueryID(e.target.value)} />
          </div>
          <button onClick={getEmployee}>Get Employee Details</button>
          <p>{output}</p>
        </div>

    </>
  )

}

export default App
