#include <SFML/Graphics.hpp>
#include <iostream>


struct Agent
{
    int x;
    int y;
    float angle;
};


int main()
{
    //##########################
    //		SETUP
    //##########################
    sf::RenderWindow window( sf::VideoMode(2560, 1600), "Test" );
    window.setFramerateLimit(60);


    //##################################
    //		INIT object
    //##################################
    sf::RectangleShape r1;
    r1.setSize(sf::Vector2f(3, 3));
    r1.setPosition(0, 0);

    std::vector<Agent> agents(20);

    //for (auto i = agents.begin(); i != agents.end(); i++)
    //{
    //    agents[i].x = i;
    //    agents[i].y = i;
    //}
    int i = 0;
    for (auto& agent : agents)
    {
	agent.x = i;
	agent.y = i;
	i++;
    }



    //#################################
    //		MAIN LOOP
    //#################################
    while ( window.isOpen( ) )
    {
        sf::Event event;

        while ( window.pollEvent( event ))
        {
            switch( event.type ) {
                case sf::Event::Closed:
                    window.close();
                    break;
            }
        }
	//####################################
	//		DRAW STEP
	//####################################


        window.clear(); // clear the frame -- draw below




        //window.draw(r1);
	//r1.move(1, 1);

	for (auto& agent : agents)
	{
	    sf::RectangleShape r2;
	    r2.setSize(sf::Vector2f(3, 3));
	    r2.setPosition(agent.x, agent.y);
	    window.draw(r2);
	}


        window.display(); // display

    }

}






