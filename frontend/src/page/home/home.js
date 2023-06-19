import React from "react";
import MarqueePanel from "../../components/home/MarqueePanel";

const Home = () => {
  const messages = ["Message 1", "Message 2", "Message 3"];
  const speed = 2;

  return (
    <div>
      <h1 >每日推薦</h1>
      <MarqueePanel messages={messages} speed={speed} />
    </div>
  );
};

export default Home;
