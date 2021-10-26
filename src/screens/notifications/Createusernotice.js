import React , {useState , useEffect} from 'react'
import {postonenotification} from '../../services/notofication'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { t ,getLang} from '../../utils/helper'
import { yupResolver } from "@hookform/resolvers/yup";
import {getadminuser} from '../../services/userService';
import { toast } from 'react-toastify'
export default function Createusernotice() {

    const  [userstate, setuserstate] = useState([])
    const validationSchema = Yup.object().shape({
        ar_message: Yup.string().required(t("form.champsrequird")
        ),
    
        en_message: Yup.string().required(
          t("form.champsrequird")
        ),
        user: Yup.string().required(
            t("form.champsrequird")
          ),
      });
      const {
        register,
        handleSubmit,
        reset,
        control,
    
        formState: { errors },
      } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: "",
      });

      useEffect(() => {
        getadminuser()
        .then(res => {if(res.data.success){
            setuserstate(res.data.data.users)
        }})
      }, [])
      const onSubmit = async (data) => {
        //var formData = new FormData("image");
        postonenotification(data)
        .then(res => {toast.success(res.data.message);
          console.log(res.data);
         })

    }
    return (
        <div>
             <div className="container mt-5">

    <h3>{t("notice.title_allnotice")}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
        <label className="client-label">
    {t("notice.listuser")}
    </label>
        <select       name="user"   {...register("user")}
                        className={`form-control custom-input-org `}
                      
                    
                        >
                           <option value="">    {t("category.catlist")}</option>
                            {userstate.map((el,index) => {
                                return (
                                    <option value={el._id} key={index}>{  el?.name +'('+el.mobile+ ')'}</option>
                                )
                            })}
                        </select>
                        <div className="invalid-feedback">
    {errors.user && <i class="fal fa-info-circle mr-1"></i>}
      {errors.user?.message}
    </div>
                        </div>
        <div className="form-group">
    <label className="client-label">
    {t("notice.arabemessage")}
    </label>

    <input
   
      name="ar_message"
      type="text"
      placeholder= {t("notice.arabemessage")}
      {...register("ar_message")}
      className={`form-control custom-input-org ${
        errors.ar_message ? "is-invalid" : ""
      }`}
    />
    <div className="invalid-feedback">
    {errors.ar_message && <i className="fal fa-info-circle mr-1"></i>}
      {errors.ar_message?.message}
    </div>
  </div>
  <div className="form-group">
    <label className="client-label">
    {t("notice.englishmessage")}
    </label>

    <input
   
      name="en_message"
      type="text"
      placeholder= {t("notice.englishmessage")}
      {...register("en_message")}
      className={`form-control custom-input-org ${
        errors.en_message ? "is-invalid" : ""
      }`}
    />
    <div className="invalid-feedback">
    {errors.en_message && <i className="fal fa-info-circle mr-1"></i>}
      {errors.en_message?.message}
    </div>
  </div>
  <div className="group-button d-flex justify-content-around">
    <button
      type="reset"
      className="btn btn-light custom-btn-cancel"
    > {t("form.btncancel")}
     
    </button>
    <input
      value= {t("from.btnadd")}
      type="submit"
      className="btn btn-primary custom-btn-save"
    />
  </div>
            </form>
            </div>
        </div>
    )
}
