import React from 'react';
import '../styles/Home.css';
import MenuBar from '../components/Menubar';

const Home: React.FC = () => {

    const returnComputerImage = () => {
        return (
          <pre>
      {`         ______________
        /             /|
       /             / |
      /____________ /  |
      | ___________ |  |
      ||           ||  |
      ||           ||  |
      ||           ||  |
      ||___________||  |
      |   _______   | //
      |  (_______)  |//
      |_____________|/ ))
       (               ((              
        )               ==============__         
      .======================.       /  \\
      | :::::::::::::::: ::: |      | || |
      | ::::::::::::::[] ::: |      |    |
      | --------------- :::  |       \\__/
      \`----------------------'`}
          </pre>
        );
      };

  return (
    <div className="main-wrapper">
        <div className="header">
            <MenuBar
                items={[
                    { id: 'home', label: 'Home', href: '/' },
                    { id: 'blog', label: 'Blog', href: '/blog' },
                ]}
                className="header-menu"
                onItemClick={(item) => console.log(`Clicked on ${item.label}`)}
                themeButton={{
                    label: 'Switch it up',
                    onClick: () => console.log('Theme toggled')
                }}
                />
        </div>
        <div className="content">
            <div className="content-split">
                <div className="content-left content-column">
                    <div className="content-bubble">
                        <div className="content-split">
                            <p>{returnComputerImage()}</p>
                            <div>
                                <h1>Lavinder</h1>
                            </div>
                        </div>
                    </div>
                    <div className="content-bubble">
                        <h1>about me</h1>
                        <p></p>
                    </div>
                    <div className="content-bubble">
                        <h1>my tastes</h1>
                        <p>This is the main content area where you can add your text, images, and other elements.</p>
                    </div>
                </div>
                <div className="content-right content-column">
                    <div className="content-bubble">
                        <h1>where to find me</h1>
                    </div>
                    <div className="content-bubble">
                        <h1>recent blog</h1>
                        <p>This is the main content area where you can add your text, images, and other elements.</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
  );
};

export default Home;
