import AddHospitalForm from "./addHositalForm";
import HospitalList from "./listHospitals";

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
