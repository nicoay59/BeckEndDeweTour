
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import React, { useEffect, useState } from 'react';
import { API } from '../config/api';
import item from "../components/mapping";



function FormaddTrip() {


  const title = 'Add trip';
  document.title = 'DumbMerch |' + title;

  let navigate = useNavigate();

  const [countries, setCountry] = useState([]);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    title:'',
    name: '',
    accomodation: '',
    transportation: '',
    eat: '',
    day: '',
    night: '',
    datetrip: '',
    price: '',
    quota: '',
    description: '',
    image: '',
    country_id: '',
  });


  const getCountry = async () => {
    try {
      const response = await API.get('/countries');
      setCountry(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
   console.log(countries);
  const handleChangeCountryId = (e) => {
    const id = e.target.value;
  };

  const handleChange = (e) =>{
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });

    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files [0]);
      setPreview(url);
    }
  };


  const handleSubmit = useMutation(async (e) =>{
    try{
      e.preventDefault();

      const config = {
        Headers: {
          'content-type':'multipart/form-data',
        },
      };

      const formData = new FormData();
      formData.set('title', form.title);
      // formData.set('name', form.name);
      formData.set('acomodation', form.accomodation);
      formData.set('transportation', form.transportation);
      formData.set('eat', form.eat);
      formData.set('day', form.day);
      formData.set('night', form.night);
      formData.set('date_trip', form.datetrip); 
      formData.set('price', form.price);
      formData.set('quota', form.quota);
      formData.set('description', form.description);
      formData.set('image', form.image[0], form.image[0].name);
      // let country_id = form.country_id.map((countryId) => Number(countryId))
      // formData.set('country_id', JSON.stringify(country_id));
      formData.set('country_id', form.country_id);




      const response = await API.post('/trip', formData, config);
      console.log("add trip success : ", response);

      navigate('/incometrip');
    } catch (error) {
      console.log("add trip failed : ", error);
    }
  });

  useEffect(() => {
    getCountry();
  }, []);

  return (
    <div className="pt-5" style={{backgroundColor:'#E5E5E5'}} title={title}>
    <div style={{backgroundColor:'#E5E5E5', textAlign:'start'}}>
      <Container>
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
        <p>
            Title Trip
        </p>
        <input
          class="form-control"
          type="text"
          placeholder="Default input"
          aria-label="default input example"
          name="title"
          onChange={handleChange}
        ></input>
        <p>
            Country
        </p>
        <select class="form-select" aria-label="Default select example" name="country_id" onChange={handleChange}>
          <option selected disabled value="placeholder">pilih aja dibawah</option>
          {/* <option>select country</option> */}
          {countries.map((item, index) => (
            <option value={item.id} key={index} style={{color:'black'}}>{item.country_name}</option>
            
            ))}

            </select>
        <p>
            Acomodation
        </p>
        <input
          class="form-control"
          type="text"
          placeholder="Default input"
          aria-label="default input example"
          name="accomodation"
          onChange={handleChange}
        ></input>
        <p>
            Transportation
        </p>
        <input
          class="form-control"
          type="text"
          placeholder="Default input"
          aria-label="default input example"
          name="transportation"
          onChange={handleChange}
        ></input>
        <p>
            Eat
        </p>
        <input
          class="form-control"
          type="text"
          placeholder="Default input"
          aria-label="default input example"
          name="eat"
          onChange={handleChange}
        ></input>
        <div class="row">

          <div class="col">
            <p>
                Duration
            </p>
            <input
              type="text"
              class="form-control"
              placeholder="Day"
              aria-label="Day"
              name="day"
              onChange={handleChange}
            ></input><span>Day</span>
          </div>
          <div class="col" style={{marginTop:'41px'}}>
            <input
              type="text"
              class="form-control"
              placeholder="Night"
              aria-label="Night"
              name="night"
              onChange={handleChange}
            ></input> <span>Night</span>
          </div>
        </div>
        <p>
            Date Trip
        </p>
        <input
          class="form-control"
          type="text"
          placeholder="Default input"
          aria-label="default input example"
          name="datetrip"
          onChange={handleChange}
        ></input>
        <p>
            Price
        </p>
        <input
          class="form-control"
          type="text"
          placeholder="Default input"
          aria-label="default input example"
          name="price"
          onChange={handleChange}
        ></input>
        <p>
            Quota
        </p>
        <input
          class="form-control"
          type="text"
          placeholder="Default input"
          aria-label="default input example"
          name="quota"
          onChange={handleChange}
        ></input>
        <div class="mb-3">
            <p>
                Description
            </p>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            name="description"
            onChange={handleChange}
          ></textarea>
        </div>
        <div class="input-group mb-3">
              <input type="file" class="form-control" id="inputGroupFile02" hidden></input>
              <input type="file" class="form-control" id="upload" name="image"  onChange={handleChange}></input>
          <div>

          </div>
        </div>
                    {preview && (
                <div className="d-flex justify-content-center pb-3">
                  <img
                    src={preview}
                    style={{
                      Width: '100%',
                      maxHeight: '450px',
                      objectFit: 'cover',
                    }}
                    alt={preview}
                    />
                </div>
              )}
        <Container className="mb-3">
            <div className="d-flex justify-content-center">
                <button className="btn btn-warning text-white" type="submit">
                    Add Trip
                </button>
            </div>
        </Container>
        </form>
      </Container>
    </div>
    </div>
  );
}

export default FormaddTrip;
