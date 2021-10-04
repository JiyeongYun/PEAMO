import './PerfumeDetail.css';
import CloseIcon from '@mui/icons-material/Close';

function PerfumeDetail({ togglePerfumeDetail }) {
  const closePerfumeDetail = () => {
    togglePerfumeDetail();
  };
  return (
    <div className="perfume_detail_container">
      <div className="perfume_detail_box">
        <CloseIcon
          className="close_icon"
          onClick={() => closePerfumeDetail()}
        />
        <div className="detail_wrapper">
          <div className="detail_info1">
            <img
              src="/images/perfume_hermes.jpeg"
              className="detail_info1_image"
              alt="perfumeImage"
            >
              image
            </img>
            <div>Name Le Jardin de Monsieur Li</div>
            <div>Brand Hermes</div>
          </div>
          <div className="detail_info2">
            <div className="detail_info2_title"> Flowers/CitrusSmells</div>
            <table className="detail_info2_table">
              <thead>
                <tr>
                  <th>TOP</th>
                  <th>MIDDLE</th>
                  <th>BOTTOM</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Orange</td>
                  <td>Musk</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Rose</td>
                </tr>
              </tbody>
            </table>
            <div className="detail_info2_seasons">
              <img src="/images/spring.png" alt="spring"></img>
              <img src="/images/summer.png" alt="summer"></img>
              <img src="/images/fall.png" alt="fall"></img>
              <img src="/images/winter.png" alt="winter"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfumeDetail;
