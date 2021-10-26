import React , {useEffect,useState} from 'react'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { t} from '../../utils/helper'
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify'
import {updatebanner} from '../../services/topbannerService'
export default function Formupdate({hideSideBar,rowdata,refrechdata}) {
  const [file, setfile] = useState("") 
  const [filetosend, setfiletosend] = useState("")
    const validationSchema = Yup.object().shape({
      titelar: Yup.string().required(t("form.champsrequird")
        ),
    
        titelen: Yup.string().required(
          t("form.champsrequird")
        ),
      
      });
      const {
        register,
        handleSubmit,
        reset,
    
        formState: { errors },
      } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: "",
      });
      useEffect(() => {
        setfile(rowdata.photo)
      reset({
        titelar:rowdata.title?.ar,
        titelen:rowdata.title?.en
        
      })
      }, [])
      const onSubmit = async (data) => {
     
        let formData = new FormData();
        formData.append('image', filetosend[0]);
        formData.append('ad', rowdata.note);
        formData.append('note', rowdata.note);
        formData.append('type', rowdata.type);
        formData.append('title[ar]', data.titelar);
        formData.append('title[en]', data.titelen);
        formData.append('category', rowdata?.category?._id);
        updatebanner(rowdata._id,formData)
        .then(res => {refrechdata()
          hideSideBar()
          toast.success(res.data.message)

        })
      }
      const deletefile = () => {
        setfile('') ;
        setfiletosend('')
      }
      const handleFileChange = ({target: {files}}) =>  {
        setfiletosend(files)
        setfile(URL.createObjectURL(files[0]))
      }
    return (
        <div className="containerform">
             <form onSubmit={handleSubmit(onSubmit)}>
           <h6>{t("category.formupdate")}</h6> 
           <div className="form-group">
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
    <label className="client-label">
    {t("category.namear")}
    </label>

    <input
   
      name="name"
      type="text"
      placeholder= {t("category.namear")}
      {...register("titelar")}
      className={`form-control custom-input-org ${
        errors.titelar ? "is-invalid" : ""
      }`}
    />
    <div className="invalid-feedback">
    {errors.titelar && <i class="fal fa-info-circle mr-1"></i>}
      {errors.titelar?.message}
    </div>
  </div>
  <div className="form-group">
    <label className="client-label">
    {t("category.nameen")}
    </label>

    <input
   
      name="titelen"
      type="text"
      placeholder= {t("category.nameen")}
      {...register("titelen")}
      className={`form-control custom-input-org ${
        errors.titelen ? "is-invalid" : ""
      }`}
    />
    <div className="invalid-feedback">
    {errors.titelen && <i className="fal fa-info-circle mr-1"></i>}
      {errors.titelen?.message}
    </div>
  </div>
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
