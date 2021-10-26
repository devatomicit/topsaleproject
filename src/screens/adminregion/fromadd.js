import React from 'react'
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { t ,getLang} from '../../utils/helper'
import { yupResolver } from "@hookform/resolvers/yup";
import {postnewadminregion} from "../../services/regionsService"
import { toast } from 'react-toastify'
export default function UserFromadd({hideSideBar,refrechdata}) {
    const validationSchema = Yup.object().shape({
        namear: Yup.string().required(t("form.champsrequird")
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
      const onSubmit = async (data) => {

          const regiondata = {
            title:{
              ar:data.namear ,
              en:data.nameen
            }
          }
          //var formData = new FormData("image");
          postnewadminregion(regiondata)
          .then(res => {toast.success(res.data.message);

             refrechdata()})

      }
    return (
        <div className="containerform">
        <form onSubmit={handleSubmit(onSubmit)}>
           <h6>{t("region.formadd")}</h6> 
           <div className="form-group">
    <label className="client-label">
    {t("region.namear")}
    </label>

    <input
   
      name="namear"
      type="text"
      placeholder= {t("region.namear")}
      {...register("namear")}
      className={`form-control custom-input-org ${
        errors.name ? "is-invalid" : ""
      }`}
    />
    <div className="invalid-feedback">
    {errors.namear && <i class="fal fa-info-circle mr-1"></i>}
      {errors.namear?.message}
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
  <div className="group-button d-flex justify-content-around">
    <button
      type="reset"
      className="btn btn-light custom-btn-cancel"
      onClick={() => hideSideBar(false)}
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
    )
}
