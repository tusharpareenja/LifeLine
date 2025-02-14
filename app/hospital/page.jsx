import AddHospitalForm from "../Components/addHositalForm";
import HospitalList from "../Components/listHospitals";

const Home = () => {
  return (
    <div>
      <h1>Decentralized Hospital Registry</h1>
      <AddHospitalForm />
      <HospitalList />
    </div>
  );
};

export default Home;
