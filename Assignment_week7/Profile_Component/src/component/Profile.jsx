export default function Profile({data}) {
    return (
      <div
        style={{
          boxShadow: "0 0 4px grey",
          height: "300px",
          width: "300px",
          margin: "4% auto 0 auto",
          backgroundColor:"white"
        }}
      >
        {/* profile image */}
        <img
          src={data.profile}
          alt="profile image"
          style={{
            border: "1px solid grey",
            borderRadius: "50%",
            position: "absolute",
            height: "100px",
            width: "100px",
            marginTop: "40px",
            marginLeft: "95px",
            zIndex: "2",
            objectFit: "cover",
          }}
        />
  
        {/* background image */}
        <img
          src={data.background}
          style={{ height: "35%", objectFit: "cover", width: "100%" }}
        />
  
        {/* Name plate */}
        <main
          style={{
            height: "35%",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div>
            <div style={{ display: "flex" }}>
              <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                {data.Name}
              </div>
              <div style={{ margin: "5px" }}>{data.age}</div>
            </div>
            <div>{data.origin}</div>
          </div>
        </main>
  
        {/* follower like following */}
        <footer
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "space-around",
            borderTop: "1px solid grey",
            height: "30%",
            padding: "10px",
          }}
        >
          <div>
            <div style={{ fontWeight: "bold", fontSize: "20px" }}>{data.follower}</div>
            <div>Followers</div>
          </div>
          <div>
            <div style={{ fontWeight: "bold", fontSize: "20px" }}>{data.likes}</div>
            <div>Likes</div>
          </div>
          <div>
            <div style={{ fontWeight: "bold", fontSize: "20px" }}>{data.following}</div>
            <div>Following</div>
          </div>
        </footer>
      </div>
    );
}