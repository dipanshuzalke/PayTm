import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useState } from "react"

export default function Signup () {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox placeholder="John" label={"First Name"} onChange={e => {
          setFirstName(e.target.value)
        }}/>
        <InputBox placeholder="Doe" label={"Last Name"} onChange={e => {
          setLastName(e.target.value)
        }}/>
        <InputBox placeholder="harkirat@gmail.com" label={"Username"} onChange={e => 
          setUsername(e.target.value)
        } />
        <InputBox placeholder="123456" label={"Password"} onChange={e => {
          setPassword(e.target.value)
        }} />
        <div className="pt-4">
          <Button label={"Sign up"} onClick={async () => {
             await axios.post("http://localhost:3000/api/v1/user/signup", {
              firstName,
              lastName,
              username,
              password
            }).then(res => {
              console.log(res)
              localStorage.setItem("token", res.data.token)
            }).catch(err => {
              console.log(err)
            })
          }}/>
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}