import React,{useEffect} from 'react'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { t} from '../../utils/helper'
import { yupResolver } from "@hookform/resolvers/yup";
import {updateedminregion} from '../../services/regionsService'
import { toast } from 'react-toastify'
export default function UserFormupdate({hideSideBar,rowdata,refrechdata}) {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required(t("form.champsrequird")
        ),
    
        nameen: Yup.string().required(
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
        reset({
          name:rowdata.title?.ar,
          nameen:rowdata.title?.en
        })
      
      }, [])
    const onSubmit = async (data) => {
        const updateregion = {
          id:rowdata._id,
          title:{
            ar:data.name ,
            en:data.nameen
          }
        }
        updateedminregion(updateregion)
        .then(res => {
          toast.success(res.data.message);
        refrechdata()
        hideSideBar()})
    }
    return (
        <div className="containerform">
            
            <form onSubmit={handleSubmit(onSubmit)}>
               <h6>{t("region.formupdate")} </h6>
               <div className="form-group">
    <label className="client-label">
    {t("region.namear")}
    </label>

    <input
   
      name="name"
      type="text"
      placeholder= {t("region.namear")}
      {...register("name")}
      className={`form-control custom-input-org ${
        errors.name ? "is-invalid" : ""
      }`}
    />
    <div className="invalid-feedback">
    {errors.name && <i class="fal fa-info-circle mr-1"></i>}
      {errors.name?.message}
    </div>
  </div>
  <div className="form-group">
    <label className="client-label">
    {t("region.namean")}
    </label>

    <input
   
      name="nameen"
      type="text"
      placeholder= {t("region.namean")}
      {...register("nameen")}
      className={`form-control custom-input-org ${
        errors.nameen ? "is-invalid" : ""
      }`}
    />
    <div className="invalid-feedback">
    {errors.nameen && <i class="fal fa-info-circle mr-1"></i>}
      {errors.nameen?.message}
    </div>
  </div>
               <div className="d-flex justify-content-around">
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
