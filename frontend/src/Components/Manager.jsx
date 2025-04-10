import React, { useEffect, useState } from 'react'
import Inputs from './Inputs'
import { useForm } from "react-hook-form"


const Manager = () => {
  const [Data, setData] = useState([])
  const [EditId, setEditId] = useState(false);
  const [showDataPassword, setShowDataPassword] = useState(false);
  const [showInputPassword, setShowInputPassword] = useState(false);
  const [Copy, setCopy] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setData(passwords);
}

  useEffect(() => {
    getPasswords();
  }, [])

  // const saveToLS = (newData) => {
  //   // Update the state by appending newData
  //   setData((prevData) => {
  //     const updatedData = [...prevData, newData];
  //     // Optionally, save updatedData to localStorage
  //     localStorage.setItem("data", JSON.stringify(updatedData));
  //     return updatedData;
  //   });
  // };

  // const saveToLS = async (newData) => {
    
  //   let req = await fetch("http://localhost:3000/")
  //   let passwords = await req.json()
  //   setData(passwords)
  //   // console.log(data, res)
  //   // localStorage.setItem("data", JSON.stringify(newData));
  // };
  // Log Data whenever it changes



  const onSubmit = async (data) => {
    setValue("site", "");
    setValue("username", "");
    setValue("password", "");
    // setEditId(e.id);
    console.log(data)
    const trimmedData = {};

    for (const key in data) {
      trimmedData[key] = data[key].trim();
    }
    let newData;
    if (EditId) {
      trimmedData.id = EditId;
      newData = Data.map(item =>
        item.id === EditId ? trimmedData : item
      )
      await handleDelete(EditId)
      // await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: EditId }) })
      setEditId(false);
      await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({...trimmedData}) })
    }
    else {
      let post={
        id: Date.now(),
        site: trimmedData.site,
        username: trimmedData.username,
        password: trimmedData.password
      }
      newData = [...Data,post]
      await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({...post}) })
    }
    setData(newData);
    // setCurrentInput('');
    // await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({...trimmedData}) })
  }
  



  // Function to handle mouse up event


  const handleDelete = async (id) => {
    let newData = Data.filter((item) => item.id !== id);
    setData(newData);
    // saveToLS(newData)
            
    await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
  }

  const handleCopy = async (name) => {

    navigator.clipboard.writeText(name);

    setCopy(true)



  }

  const handleEdit = (e) => {
    const itemToEdit = Data.find(item => item.id === e.id)
    if (itemToEdit) {
      setValue("site", e.site);
      setValue("username", e.username);
      setValue("password", e.password);
      setEditId(e.id);
    }

  };

  return (
    <div className='self-center justify-self-center w-full flex-grow bg-[var(--ocean-bg)] flex justify-center items-center'>
      <div className='min-w-[320px] max[500px]:w-[90%] w-[50%] min-h-[500px] p-3 flex justify-start items-center flex-col gap-3'>

        <div>
          <h1 className='text-3xl text-black font-bold'>
            <span className='text-green-400'>&lt;</span>
            <span>PassManager</span>
            <span className='text-green-400'>/</span>
            <span className='text-green-400'>&gt;</span>
          </h1>
          <p>Your passwords in one place.</p>
        </div>

        <div>
          {isSubmitting && <div>Loading...</div>}
          <form action="" onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center'>

            <input placeholder='https://example.com'
              className='textBox w-[100%] m-1 '

              {...register("site", { required: { value: true, message: "This field is required" } })} type="text" />
            {errors.site && <div className='red'>{errors.site.message}</div>}

            <div className='flex'>
              <div className='m-1' >

                <input placeholder='username'
                  className='textBox w-[100%] '
                  {...register("username", { required: { value: true, message: "This field is required" } })} type="text" />
                {errors.username && <div className='red'>{errors.username.message}</div>}

              </div>
              <div className=' m-1 relative'>

                <input placeholder='password'
                  className='textBox w-[100%] pr-10'
                  {...register("password",
                    {
                      required: {
                        value: true,
                        message: "This field is required"
                      }
                    }
                  )}
                  type={showInputPassword ? "text" : "password"} />
                <span
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowInputPassword(!showInputPassword)}
                // onMouseUp={()=>setShowInputPassword(!showInputPassword)}
                >
                  <img className="invert" src={showInputPassword ? "/visibilityOff.svg" : "/visibilityOn.svg"} alt="" />
                </span>

                {errors.password && <div className='red'>
                  {errors.password.message}</div>}

              </div>
            </div>

            <input disabled={isSubmitting}
              className='buttonStyle m-1'
              type="submit" value="Submit" />

          </form>
        </div>


        <div>
          <p>All your Passwords: </p>
        </div>
        {Copy ? (
          <div>Copied Successfully</div>
        ) :
          null}


        <div className='w-full'>
          <table className='w-full'>
            <thead>
              <tr>
                <th>Site URL</th>
                <th>Username</th>
                <th>Password</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>

              {Data.map((entry) => (
                <tr key={entry.id} className='w-full'>
                  <td>
                    <div className='flex justify-around w-full'>
                      <span>{entry.site}</span>
                      <span
                        className="copy-button cursor-pointer"
                        onClick={() => handleCopy(entry.site)}

                      >
                        <img className="invert" src="/copy.svg" alt="" />
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className='flex justify justify-around w-full'>
                      <span>{entry.username}</span>
                      <span
                        className="copy-button cursor-pointer"
                        onClick={() => handleCopy(entry.username)}
                      >
                        <img className="invert" src="/copy.svg" alt="" />
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className='flex justify-around w-full'>
                      <span
                        className="cursor-pointer w-max"
                        onClick={() => setShowDataPassword(!showDataPassword)}
                      >
                        <img className="invert" src={showDataPassword ? "/visibilityOff.svg" : "/visibilityOn.svg"} alt="" />
                      </span>
                      <span>{showDataPassword ? entry.password : "•".repeat(8)}</span>
                      <span
                        className="copy-button cursor-pointer"
                        onClick={() => handleCopy(entry.password)}

                      >
                        <img className="invert" src="/copy.svg" alt="" />
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className='flex justify-around'>
                      <span className="cursor-pointer" onClick={() => handleEdit(entry)}><img className="invert" src="/edit.svg" /></span>
                      <span className="cursor-pointer" onClick={() => handleDelete(entry.id)}><img className="invert" src="/delete.svg" /></span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default Manager
