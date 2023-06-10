import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import search1 from "../components/assets/image/search1.png";
import CardPayment from "../components/Payment";
import { API } from '../config/api';
import { useQuery } from 'react-query';

function IncomingTrans() {



  // const [index, setIndex] = useState(null);
  // const [isi, setIsi] = useState("");


  
  const { data : transaction } = useQuery('transactionsCache', async () => {
    const response = await API.get('/transactions');
    // setIsi(response.data.data)
    return response.data.data;
  });
  
  console.log(transaction, "ini log transactions");
  
  // useEffect(()=> {
  //   transaction?.filter((pay) =>{
  //     if(  transaction?.id == pay ){
  //       return (
  //         setIndex(),
  //         setIsi(pay)
  //       )

  //     } 
  //   } 
  //   )
  // },[index]);
  
  // console.log(isi, "isipapay");





  return (
    <div style={{ backgroundColor: "#E5E5E5", minHeight: "800hv", height:"800px"}}>
      <div style={{ backgroundColor: "#E5E5E5", paddingTop: "100px" }}>
        <Container>
          <table
            className="table-striped table hover table-hover"
            style={{
              borderBottom: "solid 1px",
              borderLeft: "solid 0.5px",
              borderRight: "solid 0.5px",
              borderTop: "solid 0.5px",
            }}
          >
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Users</th>
                <th scope="col">Trip</th>
                <th scope="col">Bukti Transfer</th>
                <th scope="col">Status Payment</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {transaction?.map((kont, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{kont?.userdata?.fullname}</td>
                <td>{kont?.trip?.title}</td>
                <td>BRI.png</td>
                <td>pending</td>
                <td>
                  <button
                    type="button"
                    class="btn"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <img src={search1}></img>
                  </button>
                </td>
              </tr>
                ))}
            </tbody>
          </table>
        </Container>
      </div>
      <div
        class="modal modal-xl fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
                <CardPayment />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" class="btn btn-success">
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomingTrans;
