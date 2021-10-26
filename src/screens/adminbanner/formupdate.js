import React,{useEffect,useState} from 'react'
import {updatebanner} from '../../services/bannerService'
import { t ,getLang} from '../../utils/helper'
import { toast } from 'react-toastify'
function Formupdate({hideSideBar,refrechdata,rowdata}) {
    const   i18n  = getLang();
    const [file, setfile] = useState("") 
    const [filetosend, setfiletosend] = useState("")
      const onSubmit = async (event) => {
        event.preventDefault()
        let formData = new FormData();
          formData.append('image',filetosend[0])
          updatebanner(rowdata._id,formData)
          .then(res =>{toast(res.data.message)
            refrechdata()
            hideSideBar()})
            .catch(err =>toast.error(err.response.data.message))
      }
useEffect(() => {
   setfile(rowdata.photo)
  setfiletosend([rowdata.photo])
}, [])
const handleFileChange = ({target: {files}}) =>  {
  setfiletosend(files)
  setfile(URL.createObjectURL(files[0]))
}
const deletefile = () => {
  setfile('') ;
  setfiletosend('')
}
    return (
        <div className="containerform">
           <form onSubmit={onSubmit}>
           <h6>{t("banner.formupdate")}</h6> 
       
           {file.length > 0 ?
          <div  style={{margin: "10px 140px"}}>
            
              <img
                alt="Preview"
               src={file}
               width="132px"
               height="132px"
              
               className=" rounded-circle"
                
              />
            <i className="far fa-minus-hexagon" style={{color:'red',cursor:'pointer'}} onClick={deletefile} />
          </div>:

                    <label className="labelfile myLabel" for="namefile"><i className="fas fa-plus"></i>
                    <input name="namefile" id="namefile"  type="file" hidden onChange={handleFileChange} />
                   </label>
                     }
  <div className="group-button d-flex justify-content-around">
    <button
      type="reset"
      className="btn btn-light custom-btn-cancel"
      onClick={() => hideSideBar(false)}
    > {t("form.btncancel")}
     
    </button>
    <input
      value= {t("form.btnupdat")}
      type="submit"
      className="btn btn-primary custom-btn-save"
    />
  </div>
        </form>
        </div>
    )
}

export default Formupdate
