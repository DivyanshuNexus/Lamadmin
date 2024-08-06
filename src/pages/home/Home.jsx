import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";

const Home = () => {
  const handlesubmit = async () => {
    const values={
      firstName:'Divyanshu',
      lastName:'Kumar',
      message:'My name is Divyanshu',
      subtext:'Admin',
    }
    await fetch(
      "https://lamadmin-five.vercel.app/send-notification",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      }
    )
      .then((response) => response.text())
      .then((data) => console.log(data));
  };
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <button onClick={handlesubmit}>Click Me</button>
      </div>
    </div>
  );
};

export default Home;
