#include <SFML/Graphics.hpp>
#include <iostream>


struct Agent
{
    int x;
    int y;
    float angle;
};


//Agent updateAgent(Agent agent) {

//    agent.x++;
//    return agent;

//}

const int WIDTH = 256;
const int HEIGHT = 160;
int canvas[WIDTH][HEIGHT] = {0};

int main()
{
    //##########################
    //		SETUP
    //##########################
    sf::RenderWindow window( sf::VideoMode(WIDTH, HEIGHT), "Test" );
    window.setFramerateLimit(60);



    //##################################
    //		INIT object
    //##################################
    sf::RectangleShape r1;
    r1.setSize(sf::Vector2f(3, 3));
    r1.setPosition(0, 0);

    std::vector<Agent> agents(20);


    int i = 0;
    for (auto& agent : agents)
    {
	//agent.x = rand() % 100;
	//agent.y = rand() % 100;
	agent.x = i+20;
	agent.y = i+20;
	agent.angle = i;
	i++;
    }



    // loop over canvas, fade and blur



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

	for (auto& agent : agents) {
	    // move agent

	    int newx = static_cast<int>(round(5 * sin(agent.angle)));
	    int newy = static_cast<int>(round(5 * cos(agent.angle)));
	    agent.y += newx;
	    agent.y += newy;
	    //std::cout << newx << std::endl;
	    //agent.x += static_cast<int>(round(5 * sin(agent.angle)));
	    //agent.y += static_cast<int>(round(5 * sin(agent.angle)));
	    //agent.y += 1;
	    //agent.y += 1;


	    // update canvas
	    canvas[agent.x][agent.y] = 255;
	}

	window.clear(); // clear the frame -- draw below




	window.draw(r1);
	//r1.move(1, 1);

	//for (auto& agent : agents)
	//{
	//    agent = updateAgent(agent);
	//    sf::RectangleShape r2;
	//    r2.setSize(sf::Vector2f(3, 3));
	//    r2.setPosition(agent.x, agent.y);
	//    window.draw(r2);
	//}
	for(int x = 0; x < WIDTH; x++) // Iterating over rows
	{
	    for(int y = 0; y < HEIGHT; y++)
	    {
		if (canvas[x][y] != 0)
		{
		    sf::RectangleShape r2;
		    r2.setSize(sf::Vector2f(1, 1));
		    r2.setPosition(x, y);
		    r2.setFillColor(sf::Color(canvas[x][y], canvas[x][y], canvas[x][y], 225));
		    window.draw(r2);
		}
	    }
	}

        window.display(); // display

    }

}


//std::vector<Agent> updateLocations(std::vector<Agent> agents) {

//    // modify agents

//    int i = 0;
//    for (auto& agent : agents)
//    {
//        agent.x++;
//        i++;
//    }

//    return agents
//}



