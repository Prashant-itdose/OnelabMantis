import React from "react";
import { Tooltip } from "primereact/tooltip";
import { useTranslation } from "react-i18next";
import Heading from "../../Heading";
import Tables from "..";

const DepartmentWiseBillDetailTable = (props) => {
  const { THEAD, tbody, handleClickDepartmentWiseBillDetail } = props;

  const [t] = useTranslation();
  return (
    <>
     
  
        <>
          {/* <Heading title={t("DepartmentWise Bill Details")} /> */}
          {/* <Tables /> */}
          <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
          {/* <Tables
            thead={THEAD}
            tbody={tbody}
            // tableHeight={"tableHeight"}
            // style={{ height: "auto" }}
          /> */}
        </>
  
    </>
  );
};

export default DepartmentWiseBillDetailTable;
