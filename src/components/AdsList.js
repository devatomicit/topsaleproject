import React, { useState, useEffect,useContext } from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import Ad from './Ad'
import AuthContext from '../contexts/AuthContext'
import {t} from '../utils/helper'
// grid/menu
const AdsList = ({ ads, initialDisplay = 'grid', displayControls = true , cat,filtredstate }) => {
  const {rechercheddate } = useContext(AuthContext)
  const [display, setDisplay] = useState(initialDisplay)
  const [filtredads , setfiltredads] = useState([])
  const  strOp = (str) => {
    return str
      .toString()
      .replace(/\s/g, '')
      .toLowerCase();
  }
  useEffect(() => {

    if(rechercheddate)
    recherchefilter(rechercheddate,ads)
    else
    setfiltredads(ads)
  }, [rechercheddate,ads.length])
  const   recherchefilter = (val, data) => {
    
    const res  = data.filter(el =>  val ? (strOp(el.title).includes(strOp(val)) ||
     strOp(el.price).includes(strOp(val))) : true)
     setfiltredads(res)
   
    }
   const  sortdata = (val) => {
const sortads= [...filtredads];
    if(val=="1"){
   const filterdat = sortads.sort((a,b)=> a.price - b.price)
   setfiltredads(filterdat)
    }
    if(val==="2"){
    const filterdat =sortads.sort((a,b)=> a.price + b.price)
    setfiltredads(filterdat)
    }
    if(val==="0"){
      const filterdat =sortads.sort((a,b)=>  new Date(b.publishedAt) - new Date(a.publishedAt))
      setfiltredads(filterdat)
      }
   }
   const sortcarcategory = (val) => {
    const sortads= [...filtredads];
    if(val==="1"){
      const filterdat =sortads.sort((a,b)=>  b.carYear - a.carYear)
      setfiltredads(filterdat)
    }
    if(val==="2"){
      const filterdat =sortads.sort((a,b)=>  a.km - b.km)
      setfiltredads(filterdat)

    }
    if(val==="0"){
      const filterdat =sortads.sort((a,b)=>  new Date(b.publishedAt) - new Date(a.publishedAt))
      setfiltredads(filterdat)
      }
    
   }
  return (
    <>
      {displayControls && (
        <div className="mt-3 mb-2 d-flex flex-row  justify-content-between listads">
          {Boolean(ads) && cat?.type==="cars" ?
            <select onChange ={(event) =>sortcarcategory(event.target.value)} className="selectads">
              <option value="0">{t("most_recent")}</option>
              <option value="1">{t("newest_model")}</option>
              <option value="2">{t("Minimum_mileage")}</option>
            
            </select> : 
            <select onChange ={(event) =>sortdata(event.target.value)} className="shadowfilter selectads">
              <option value="0">{t("most_recent")}</option>
              <option value="1">{t("low_to_hight")}</option>
              <option value="2">{t("hight_to_low")}</option>
            </select>
          }
          <div>
            <Button
              className="mx-1 text-white"
              variant={display === 'grid' ? 'primary' : 'secondary'}
              onClick={() => setDisplay('grid')}
            >
              <i className="fas fa-th"></i>
            </Button>
            <Button
              className="mx-1 text-white"
              variant={display === 'list' ? 'primary' : 'secondary'}
              onClick={() => setDisplay('list')}
            >
              <i className="fas fa-bars"></i>
            </Button>
          </div>
        </div>
      )}
      <Row className="content-all-ads">
        {filtredads.map(ad =>
          // <Col key={ad._id} xs={6} xl={4}>
          display === 'grid' ? (
            <Col key={ad._id} xs={6} md={3} xl={4} className="px-2" className="column-ads">
              <Ad display={display} ad={ad} />
            </Col>
          ) : (
            <Col key={ad._id} xs={12} className="column-ads">
              <Ad display={display} ad={ad} />
            </Col>
          )
        )}
      </Row>
    </>
  )
}

export default AdsList
