// import { ContentHeader } from '@components';

import { useState } from "react";
import DashboardCard from "../components/UI/DashboardCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate=useNavigate()
const [show,setShow]=useState({
  MyView: false,
  ViewIssues:false,
  Reportissue:false
})

  return (
    <div>
      {/* <ContentHeader title="Dashboard"  /> */}
      <section className="content p-2 my-1">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-success">
                <div  className="inner" style={{padding:"20px",cursor:'pointer'}} onClick={()=>navigate('/MyView')}>
                  <h3></h3>
                  <p>My View</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag" />
                </div>
                <a href="/" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner" style={{padding:"20px",cursor:'pointer'}}  onClick={()=>navigate('/viewissues')}>
                  <h3></h3>

                  <p>View Issues</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag" />
                </div>
                <a href="/" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* <div className="col-lg-4 col-6">
              <div className="small-box dashboard_box_logininfo">
                <div className="inner">

                  < DashboardCard card_heading={"Last Login Time "}  card_value={"5-May-2024 3:06 PM"} icon={<i className="ion ion-clock" />}/>

                  < DashboardCard card_heading={"Last Login IP Address"}  card_value={"111.223.44.55"} icon={<i className="fa fa-globe" aria-hidden="true"></i>}/>

                  < DashboardCard card_heading={"Total Login Attempts"}  card_value={"5-May-2024 3:06 PM"} icon={<i className="fa fa-users" aria-hidden="true"></i>}/>

                  < DashboardCard card_heading={"Last Password Change"}  card_value={"5-May-2024 3:06 PM"} icon={<i className="ion ion-clock" />}/>
                </div>
              </div>
            </div> */}
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner" style={{padding:"20px",cursor:'pointer'}} onClick={()=>navigate('/reportissue')}>
                  <h3></h3>

                  <p>Report Issue</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <a href="/" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* <div className="col-lg-3 col-6">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>65</h3>

                  <p>Unique Visitors</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph" />
                </div>
                <a href="/" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
