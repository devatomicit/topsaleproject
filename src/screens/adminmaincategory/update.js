import React,{useEffect} from 'react'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { t} from '../../utils/helper'
import { yupResolver } from "@hookform/resolvers/yup";
import {updatemaincat} from '../../services/maincategory'
import { toast } from 'react-toastify'
export default function Update({hideSideBar,rowdata,refrechdata}) {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required(t("form.champsrequird")
        ),
    
        nameen: Yup.string().required(
          t("form.champsrequird")
        ),
        order:Yup.string().required(
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
          nameen:rowdata.title?.en,
          order:rowdata.order
        })
      
      }, [])
    const onSubmit = async (data) => {

        const updatemain = {
          id:rowdata._id,
          title:{
            ar:data.name ,
            en:data.nameen
          },
          order:data.order
        }
        updatemaincat(updatemain)
        .then(res => {
          toast.success(res.data.message);
        refrechdata()
        hideSideBar()})
    }
   
    return (
        <div className="containerform">
            
            <form onSubmit={handleSubmit(onSubmit)}>
               <h6>{t("maincategory.formupdate")} </h6>
               <div className="form-group">
    <label className="client-label">
    {t("maincategory.namear")}
    </label>

    <input
   
      name="name"
      type="text"
      placeholder= {t("maincategory.namear")}
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
    {t("maincategory.nameen")}
    </label>

    <input
   
      name="nameen"
      type="text"
      placeholder= {t("maincategory.nameen")}
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
  <div className="form-group">
    <label className="client-label">
    {t("maincategory.order")}
    </label>

    <input
   
      name="order"
      type="text"
      placeholder= {t("maincategory.order")}
      {...register("order")}
      className={`form-control custom-input-org ${
        errors.order ? "is-invalid" : ""
      }`}
    />
    <div className="invalid-feedback">
    {errors.order && <i class="fal fa-info-circle mr-1"></i>}
      {errors.order?.message}
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
