import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';          // uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { BsEmojiTear } from "react-icons/bs";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const SaveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos)) 
  }

  const handleEdit = (e, id) => {
    let t_to_get = todos.filter((item) => {
      return item.id === id
    })
    setTodo(t_to_get[0].todo)
    let newTodos = todos.filter((item) => {
      return item.id !== id
    })
    setTodos(newTodos)
    SaveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id
    })
    setTodos(newTodos)      //setTodos(newTodos) is asynchronous. It schedules the update, but doesn’t apply it immediately. SaveToLS() runs right after setTodos(newTodos)—but since the update isn’t done yet, it saves the old todos state to localStorage. Adding useEffect with [todos] listens for actual changes in the todos state. It waits for React to finish updating the state, then runs SaveToLS(), ensuring the correct data is saved. React’s goal is to be fast and efficient. To achieve this, it batches multiple state updates together instead of processing them one by one. This approach reduces unnecessary re-renders, making the app more performant.
    SaveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])   // creates a new array containing all previous todos (from todos) and the new todo { todo, isCompleted: false } added at the end. The square brackets [] are used because todos is an array. As, { todo: "Buy milk", isCompleted: false }.
    setTodo("")
    SaveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
    // console.log("The TODO IS ",todos)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name
    let indexOf = todos.findIndex((item) => {       //What its doing? It is returning what? 
      return item.id === id
    })
    let newTodos = [...todos]       //Why it didnt worked with let newTodos = todos 
    newTodos[indexOf].isCompleted = !newTodos[indexOf].isCompleted
    setTodos(newTodos)
    SaveToLS()      //Why handleCheckbox here
  }

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }
  

  return (
    <>

      <Navbar />

      <div className="md:container mx-auto my-5 rounded-3xl bg-emerald-100 px-6 py-4 min-h-[80vh]">

        <div className="addTodo">
          <h2 className="font-bold text-xl sm:text-2xl my-3">Add a Todo</h2>
          <div className="flex items-center">
            <input type="text" onChange={handleChange} value={todo} className='bg-white w-[95%] rounded-xl py-3 px-2' />
            <button onClick={handleAdd} disabled={todo.length<=3} className='bg-emerald-500 hover:bg-emerald-600 p-2 cursor-pointer rounded-full text-white mx-4 font-bold'><MdAdd className='text-4xl'/></button>
            {/* Use of Disabled in above */}  
          </div>
          
        </div>

        <div className='flex justify-between items-center mt-14 mb-5'>
          <h2 className='font-bold text-xl sm:text-2xl'>Your Todos</h2>
          <div className="checkbox_toshowfinished flex gap-1 sm:gap-3 mx-2 items-center">
            <input type="checkbox" onChange={toggleFinished} checked={showFinished} className="mt-0.5 sm:mt-1 appearance-none w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-emerald-500 checked:border-transparent cursor-pointer transition-all" />
            <span className='hidden sm:block sm:text-xl font-bold'>Show Finished</span>
          </div>
        </div>


        <div className="todos">
          
          {todos.length === 0 && <div className='flex items-center justify-center my-20'>
            <div className='flex flex-col items-center gap-5'>
              <BsEmojiTear className='text-9xl'/>
              <div className='text-2xl sm:text-3xl font-bold'>No Todos to Display</div>
            </div>
            </div>}       
          {/* HOW IS THE ABOVE WORKING? */}

          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex items-center my-1.5 w-full justify-between">
              
              <div className='flex gap-5 sm:gap-20'>
                <input type="checkbox" onChange={handleCheckbox} checked={item.isCompleted} name={item.id} id="" className="mt-1 appearance-none w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-green-500 checked:border-transparent cursor-pointer transition-all"/>
                {/* How can we assign a  */}
                <div className="text-lg">
                  <span className={item.isCompleted ? "line-through" : ""}>{item.todo}</span>
                </div>     {/* It checks if item.isCompleted is true or false: ✅ If item.isCompleted is true → Assigns "" (empty string → no class). ❌ If item.isCompleted is false → Assigns "line-through" (adds a CSS class). */}
              </div>

              <div className="buttons flex flex-col gap-2 sm:gap-0 sm:flex-row">
                <button onClick={(e) => {handleEdit(e, item.id)}} className='bg-emerald-500 hover:bg-emerald-600 p-2 cursor-pointer rounded-full text-white mx-1.5 font-bold'><MdEdit className='text-xl'/></button>
                <button onClick={(e) => {handleDelete(e, item.id)}} className='bg-emerald-500 hover:bg-emerald-600 p-2 cursor-pointer rounded-full text-white mx-1.5 font-bold'><MdDelete className='text-xl'/></button>
                {/* Understand the working of this function handleDelete what does it do? It takes an event obj onclick and.... and how it is able to get item.id wont it get the value of item.id only when onClick is activated on both so how does it get the value of item.id before the firing of onclick function */}
              </div>

            </div>

          })}

        </div>

      </div>

    </>
  )
}

export default App
