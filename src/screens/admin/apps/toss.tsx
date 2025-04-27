import { useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import head from '../../../assets/images/heads.png'
import tail from '../../../assets/images/tails.png'
const Toss = () => {
  const [angle, setAngle] = useState<number>(0);

  const flipCoin = () => {
    if (Math.random() > 0.5) setAngle((prev) => prev + 180);
    else setAngle((prev) => prev + 360);
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard-app-container">
        <h1>Toss</h1>
        <section>
          <article
            // className="tosscoin"
            onClick={flipCoin}
            style={{
              transform: `rotateY(${angle}deg)`,
            }}
          > 
           <img src={head} width={200} height={200} alt="" style={{margin:"3rem",marginBottom:"40%"}}/>
           <img src={tail} width={200} height={200} alt="" style={{margin:"3rem",marginBottom:"40%"}}/>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Toss;
