import { useState } from "react";
import axios from "axios"
import * as XLSX from "xlsx"

function App() {

  const [msg, setmsg] = useState("")
  const [emailList, setemailList] = useState([])
  const [status, setstatus] = useState(false)

  function handlemsg(evt) {
    setmsg(evt.target.value)
  }

  function handleFile(event) {
    const file = event.target.files[0]


    const reader = new FileReader()

    reader.onload = function (e) {

      const data = e.target.result
      const workbook = XLSX.read(data, { type: "binary" })
      const sheetname = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetname]
      const emailList = XLSX.utils.sheet_to_json(worksheet, { header: 'A' })
      const totalemail = emailList.map(function (item) { return item.A })
      console.log(totalemail)
      setemailList(totalemail)
    }

    reader.readAsBinaryString(file);

  }

  function send() {
    setstatus(true)
    axios.post("https://mail-app-backend-blond.vercel.app", { msg: msg, emailList: emailList })
      .then(function (data) {
        if (data.data === true) {
          alert("E-mail sended successfuly")
          setstatus(false)
        }
        else {
          alert("E-mail sending was failiure..!")
          setstatus(false)
        }
      })
  }

  return (
    <div>
      <div className="bg-orange-400 text-white text-center">
        <h1 className="text-2xl text-red-600 font-medium p-3" style={{ fontFamily: "fantasy" }}><s>B</s>ULK <s style={{ fontFamily: "cursive" }}>M</s>AIL <i class="fa-solid fa-envelopes-bulk"></i></h1>
      </div>

      <div className="bg-orange-300 text-blue text-center">
        <h1 className=" text-[10px] p-3">We can Help Your bussinuss with sending Multiple E-mails At a Time </h1>
      </div>

      <div className="bg-orange-200 text-white text-center">
        <h1 className=" text-[10px] p-3 text-black">Drag And Drop   <i class="fa-solid fa-envelope-circle-check"></i></h1>
      </div>

      <div className="flex flex-col items-center text-black py-5">
        <div>
          <textarea onChange={handlemsg} value={msg} className="w-[70%] h-32 outline-none border border-black rounded" placeholder="Enter the Text"></textarea>
        </div>
        <div>
          <input onChange={handleFile} type="file" className="border border-dashed border-[3px] p-2 mt-2 mb-2  "></input>

        </div>
        <p>Total E-mails in the selected File : {emailList.length}</p>
        <button onClick={send} className="bg-yellow-700 w-fit px-1 rounded text-white " style={{ borderTop: "solid grey 3px", borderLeft: "solid grey 6px", fontFamily: "cursive" }} >{status ? "sending" : <i class="fa-solid fa-paper-plane"></i>}</button>
      </div>
      <div className="bg-green-400 h-[50px] text-white text-center">
        <h1 className="text-2xl font-medium p-3"></h1>
      </div>
      <div className="bg-green-700 h-[40px] text-white text-center">
        <h1 className="text-2xl font-medium p-3"></h1>
      </div>
      <div className="bg-green-950 h-[50px] text-white text-center">
        <p className="text-[10px]  p-3"></p>
      </div>

    </div>
  );
}

export default App;
